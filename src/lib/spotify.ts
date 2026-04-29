/**
 * Spotify Web API Integration
 * Documentation: https://developer.spotify.com/documentation/web-api
 */

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const SPOTIFY_ACCOUNTS_BASE = 'https://accounts.spotify.com/api';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
    release_date: string;
  };
  preview_url: string | null;
}

interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  images: Array<{ url: string; height: number; width: number }>;
  external_urls: {
    spotify: string;
  };
  tracks: {
    items: Array<{
      id: string;
      name: string;
      duration_ms: number;
      preview_url: string | null;
    }>;
  };
}

/**
 * Get Spotify access token using Client Credentials Flow
 */
async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify credentials. Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your .env.local file.');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
    next: { revalidate: 3600 }, // Cache token for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to get Spotify access token: ${response.statusText}`);
  }

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

/**
 * Fetch artist's top tracks
 */
export async function getArtistTopTracks(artistId: string, market: string = 'US') {
  const token = await getAccessToken();

  const response = await fetch(
    `${SPOTIFY_API_BASE}/artists/${artistId}/top-tracks?market=${market}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch artist top tracks: ${response.statusText}`);
  }

  const data = await response.json();
  return data.tracks as SpotifyTrack[];
}

/**
 * Fetch artist's albums (latest releases)
 */
export async function getArtistAlbums(
  artistId: string,
  limit: number = 10,
  includeGroups: string = 'album,single'
) {
  const token = await getAccessToken();

  const response = await fetch(
    `${SPOTIFY_API_BASE}/artists/${artistId}/albums?include_groups=${includeGroups}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch artist albums: ${response.statusText}`);
  }

  const data = await response.json();
  return data.items as SpotifyAlbum[];
}

/**
 * Fetch detailed album information including tracks
 */
export async function getAlbumDetails(albumId: string) {
  const token = await getAccessToken();

  const response = await fetch(`${SPOTIFY_API_BASE}/albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch album details: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Format milliseconds to MM:SS
 */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Convert Spotify track to our Track interface format
 */
export function convertSpotifyTrackToTrack(track: SpotifyTrack, index: number) {
  return {
    id: track.id,
    slug: track.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: track.name,
    releaseDateISO: track.album.release_date,
    coverImage: track.album.images[0]?.url || '/images/placeholder.jpg',
    duration: formatDuration(track.duration_ms),
    description: `From the ${track.album.name}`,
    youtubeUrl: '', // Would need separate YouTube integration
    spotifyUrl: track.external_urls.spotify,
    featured: index === 0, // Mark first track as featured
  };
}

/**
 * Convert Spotify album to our Track interface format (treating album as single)
 */
export function convertSpotifyAlbumToTrack(album: SpotifyAlbum, index: number) {
  // Calculate total duration if tracks are available
  const totalDuration = album.tracks?.items?.reduce(
    (total, track) => total + track.duration_ms,
    0
  ) || 0;

  return {
    id: album.id,
    slug: album.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: album.name,
    releaseDateISO: album.release_date,
    coverImage: album.images[0]?.url || '/images/placeholder.jpg',
    duration: totalDuration > 0 ? formatDuration(totalDuration) : '0:00',
    description: `Released on ${new Date(album.release_date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })}`,
    youtubeUrl: '', // Would need separate YouTube integration
    spotifyUrl: album.external_urls.spotify,
    featured: index === 0,
  };
}
