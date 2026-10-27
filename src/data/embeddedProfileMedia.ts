export interface EmbeddedMediaItem {
  url: string;
  mediaType: 'image' | 'video';
  fileName: string;
  updatedAt?: number;
}

export const EMBEDDED_PROFILE_MEDIA: {
  headerPortrait: EmbeddedMediaItem | null;
  cvProfileMedia: EmbeddedMediaItem | null;
} = {
  headerPortrait: null,
  cvProfileMedia: null,
};
