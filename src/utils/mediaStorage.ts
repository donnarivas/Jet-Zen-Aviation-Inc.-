const DB_NAME = 'jetzen_candidate_media_db';
const STORE_NAME = 'media_blobs';
const DB_VERSION = 1;

export interface StoredMediaRecord {
  key: string;
  blob: Blob;
  mediaType: 'image' | 'video';
  fileName: string;
  updatedAt: number;
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

export async function saveCandidateMedia(
  key: string,
  file: File,
  mediaType: 'image' | 'video'
): Promise<void> {
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
    // Fallback ignored if IndexedDB is unavailable in private/sandboxed context
  }
}

export async function loadCandidateMedia(
  key: string
): Promise<{ url: string; mediaType: 'image' | 'video'; fileName: string } | null> {
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
