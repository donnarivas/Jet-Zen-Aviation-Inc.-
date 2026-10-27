import {
  EMBEDDED_PROFILE_MEDIA,
  EmbeddedMediaItem,
} from '../data/embeddedProfileMedia';

const DB_NAME = 'jetzen_candidate_media_db';
const STORE_NAME = 'media_blobs';
const DB_VERSION = 1;

export type MediaSlotKey = 'header-portrait' | 'cv-profile-media';

export interface StoredMediaRecord {
  key: string;
  blob: Blob;
  mediaType: 'image' | 'video';
  fileName: string;
  updatedAt: number;
}

interface ProfileMediaManifest {
  headerPortrait?: EmbeddedMediaItem | null;
  cvProfileMedia?: EmbeddedMediaItem | null;
}

function openMediaDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function syncBlobToServer(
  key: MediaSlotKey,
  blob: Blob,
  fileName: string,
  mediaType: 'image' | 'video'
): Promise<void> {
  try {
    const slotParam =
      key === 'cv-profile-media' ? 'cvProfileMedia' : 'headerPortrait';
    const extMatch = fileName.split('.').pop();
    const ext = extMatch
      ? extMatch.toLowerCase()
      : mediaType === 'video'
        ? 'mp4'
        : 'png';
    await fetch(
      `/api/save-profile-media?slot=${encodeURIComponent(
        slotParam
      )}&mediaType=${encodeURIComponent(mediaType)}&ext=${encodeURIComponent(
        ext
      )}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': blob.type || 'application/octet-stream',
        },
        body: blob,
      }
    );
  } catch {
    // Ignore on static hosts where /api/save-profile-media is not running
  }
}

export async function saveCandidateMedia(
  key: MediaSlotKey,
  file: File,
  mediaType: 'image' | 'video'
): Promise<void> {
  // 1. Save to browser IndexedDB immediately
  try {
    const db = await openMediaDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const record: StoredMediaRecord = {
        key,
        blob: file,
        mediaType,
        fileName: file.name,
        updatedAt: Date.now(),
      };
      store.put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // Fallback ignored if IndexedDB is unavailable
  }

  // 2. Sync to project public/assets/aistudio/ via dev server for GitHub/Vercel export
  await syncBlobToServer(key, file, file.name, mediaType);
}

export async function loadCandidateMedia(
  key: MediaSlotKey
): Promise<{ url: string; mediaType: 'image' | 'video'; fileName: string } | null> {
  const slotField =
    key === 'cv-profile-media' ? 'cvProfileMedia' : 'headerPortrait';

  // 1. Check statically embedded TypeScript module first (guaranteed bundled on GitHub & Vercel)
  const embedded = EMBEDDED_PROFILE_MEDIA[slotField];
  if (embedded && embedded.url) {
    return {
      url: embedded.url,
      mediaType: embedded.mediaType,
      fileName: embedded.fileName,
    };
  }

  // 2. Check static deployed manifest in /assets/aistudio/profile-media.json
  let serverHasMedia = false;
  try {
    const res = await fetch(`/assets/aistudio/profile-media.json?t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const manifest = (await res.json()) as ProfileMediaManifest;
      const slotEntry = manifest[slotField];
      if (slotEntry && slotEntry.url) {
        serverHasMedia = true;
        const cacheBust = slotEntry.updatedAt ? `?v=${slotEntry.updatedAt}` : '';
        return {
          url: `${slotEntry.url}${cacheBust}`,
          mediaType: slotEntry.mediaType,
          fileName: slotEntry.fileName || key,
        };
      }
    }
  } catch {
    // Ignore manifest fetch error and fall back to IndexedDB
  }

  // 3. Check browser IndexedDB (and auto-sync back to server if server didn't have it yet!)
  try {
    const db = await openMediaDb();
    const record = await new Promise<StoredMediaRecord | undefined>(
      (resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result as StoredMediaRecord | undefined);
        req.onerror = () => reject(req.error);
      }
    );
    db.close();
    if (!record || !record.blob) return null;

    if (!serverHasMedia) {
      void syncBlobToServer(
        key,
        record.blob,
        record.fileName || `${key}.${record.mediaType === 'video' ? 'mp4' : 'png'}`,
        record.mediaType
      );
    }

    const url = URL.createObjectURL(record.blob);
    return {
      url,
      mediaType: record.mediaType,
      fileName: record.fileName,
    };
  } catch {
    return null;
  }
}
