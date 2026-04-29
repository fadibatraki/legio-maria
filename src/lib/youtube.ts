/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  try {
    const urlObj = new URL(url);

    // Handle youtu.be short URLs
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }

    // Handle youtube.com URLs
    if (urlObj.hostname.includes('youtube.com')) {
      // Check for /embed/ format
      if (urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.split('/')[2];
      }

      // Check for /v/ format
      if (urlObj.pathname.startsWith('/v/')) {
        return urlObj.pathname.split('/')[2];
      }

      // Check for ?v= parameter
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return videoId;
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Generates YouTube thumbnail URL from video URL
 * @param youtubeUrl - Full YouTube URL
 * @param quality - Thumbnail quality (default: hqdefault)
 * @returns Thumbnail URL or null if invalid
 */
export function getYouTubeThumbnail(
  youtubeUrl: string,
  quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'
): string | null {
  const videoId = extractYouTubeId(youtubeUrl);
  if (!videoId) return null;

  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Formats ISO date string to readable format
 * @param dateISO - ISO date string (YYYY-MM-DD)
 * @returns Formatted date (e.g., "Apr 15, 2025")
 */
export function formatVideoDate(dateISO: string): string {
  try {
    const date = new Date(dateISO);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateISO;
  }
}
