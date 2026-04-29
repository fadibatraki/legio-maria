# Spotify Integration Setup Guide

This guide will help you set up the Spotify API integration for the "Latest Releases" section on your website.

## Overview

The Latest Releases section now fetches real-time data from Spotify using the Spotify Web API. It displays the top 3 tracks from the artist Imad Selim.

## Prerequisites

- A Spotify account (free or premium)
- Access to the Spotify Developer Dashboard

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click **"Create app"**
4. Fill in the app details:
   - **App name**: `Imad Selim Website` (or any name you prefer)
   - **App description**: `Website integration for displaying latest releases`
   - **Redirect URI**: `http://localhost:3000` (we don't need this for Client Credentials flow, but it's required)
   - **Which API/SDKs are you planning to use?**: Select **Web API**
5. Accept the terms and click **"Save"**

## Step 2: Get Your API Credentials

1. In your app dashboard, click **"Settings"**
2. You'll see two important values:
   - **Client ID**: A long string of characters
   - **Client Secret**: Click **"View client secret"** to reveal it

⚠️ **Important**: Keep your Client Secret private! Never commit it to version control or share it publicly.

## Step 3: Configure Environment Variables

1. In your project root, create a `.env.local` file (if it doesn't exist):
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Spotify credentials:
   ```env
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```

3. Replace `your_client_id_here` and `your_client_secret_here` with the actual values from Step 2

## Step 4: Restart Your Development Server

If your development server is running, restart it to load the new environment variables:

```bash
# Stop the server (Ctrl+C)
# Then restart it
npm run dev
```

## Step 5: Verify It Works

1. Open your browser and go to `http://localhost:3000`
2. Scroll down to the "Latest Releases" section
3. You should see the real top tracks from Imad Selim's Spotify profile:
   - Track titles, album art, and durations from Spotify
   - "Listen" buttons that link directly to Spotify

## How It Works

### Architecture

```
LatestReleases Component (Client)
         ↓
    API Route (/api/spotify/latest-releases)
         ↓
    Spotify Library (/lib/spotify.ts)
         ↓
    Spotify Web API
```

### Files Created/Modified

1. **`/src/lib/spotify.ts`** - Spotify API integration utilities
   - Handles authentication (Client Credentials flow)
   - Fetches artist's top tracks
   - Converts Spotify data to your app's format

2. **`/src/app/api/spotify/latest-releases/route.ts`** - API endpoint
   - Fetches top 3 tracks for artist ID: `7LabWYs3sUqDUmbu18DvVQ`
   - Returns formatted data for the frontend

3. **`/src/components/LatestReleases/index.tsx`** - Updated component
   - Now fetches data from the API route
   - Shows loading state while fetching
   - Displays error messages if something goes wrong

## Customization

### Change the Number of Tracks

Edit `/src/app/api/spotify/latest-releases/route.ts`:

```typescript
// Change from 3 to any number you want
const tracks = spotifyTracks
  .slice(0, 6)  // Shows 6 tracks instead of 3
  .map((track, index) => convertSpotifyTrackToTrack(track, index));
```

Don't forget to update your grid layout in the component if you show more than 3.

### Use Albums Instead of Top Tracks

If you want to show latest album releases instead of top tracks, replace the API route content:

```typescript
import { getArtistAlbums, convertSpotifyAlbumToTrack } from '@/lib/spotify';

// In the GET function:
const spotifyAlbums = await getArtistAlbums(IMAD_SELIM_ARTIST_ID, 3, 'single');
const tracks = spotifyAlbums.map((album, index) => 
  convertSpotifyAlbumToTrack(album, index)
);
```

### Change the Artist

To display releases from a different artist, change the artist ID in `/src/app/api/spotify/latest-releases/route.ts`:

```typescript
const IMAD_SELIM_ARTIST_ID = '7LabWYs3sUqDUmbu18DvVQ'; // Replace with another artist ID
```

## Troubleshooting

### Error: "Missing Spotify credentials"

**Problem**: Environment variables not loaded

**Solutions**:
1. Make sure `.env.local` exists in your project root
2. Verify the variable names are exactly `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`
3. Restart your development server after adding variables

### Error: "Failed to get Spotify access token"

**Problem**: Invalid credentials

**Solutions**:
1. Double-check your Client ID and Client Secret from Spotify Dashboard
2. Make sure there are no extra spaces or quotes around the values
3. Verify your Spotify app is active (not deleted)

### Tracks Not Showing / Shows Old Data

**Problem**: Cache is serving old data

**Solutions**:
1. Clear your browser cache
2. Wait 24 hours (data is cached for performance)
3. For testing, reduce cache time in `/src/lib/spotify.ts`:
   ```typescript
   next: { revalidate: 60 } // Cache for 1 minute instead
   ```

### Album Art Not Displaying

**Problem**: Spotify images need proper Next.js image configuration

**Solution**: Add Spotify's image domain to `next.config.js`:

```javascript
module.exports = {
  images: {
    domains: ['i.scdn.co'], // Spotify's CDN
  },
}
```

## API Rate Limits

Spotify has rate limits:
- Client Credentials flow: No hard limit, but be reasonable
- Recommended: Implement caching (already done with Next.js revalidate)
- Current cache: 24 hours for track data, 1 hour for access tokens

## Additional Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Spotify API Reference](https://developer.spotify.com/documentation/web-api/reference)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Check your terminal for server-side errors
3. Verify all environment variables are set correctly
4. Ensure your Spotify app credentials are valid

---

**Note**: The integration uses the Client Credentials flow, which doesn't require user authentication. It can only access public Spotify data.
