export interface Track {
  id: string;
  slug: string;
  title: string;
  releaseDateISO: string;
  coverImage: string;
  duration: string;
  description: string;
  youtubeUrl: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  featured: boolean;
}

export interface AlbumTrack {
  id: string;
  title: string;
  duration: string;
  youtubeUrl?: string;
}

export interface Album {
  id: string;
  slug: string;
  title: string;
  releaseDateISO: string;
  coverImage: string;
  description: string;
  tracks: AlbumTrack[];
}

// Featured Release (optional)
export const featuredRelease: Track = {
  id: "1",
  slug: "kurdish-dawn",
  title: "Kurdish Dawn",
  releaseDateISO: "2026-02-01",
  coverImage: "/images/placeholder.jpg",
  duration: "4:32",
  description: "A powerful anthem celebrating Kurdish heritage and the beauty of our ancestral homeland. This song blends traditional melodies with modern production.",
  youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  spotifyUrl: "https://open.spotify.com/track/example",
  appleMusicUrl: "https://music.apple.com/example",
  featured: true,
};

// Singles
export const singles: Track[] = [
  {
    id: "1",
    slug: "kurdish-dawn",
    title: "Kurdish Dawn",
    releaseDateISO: "2026-02-01",
    coverImage: "/images/placeholder.jpg",
    duration: "4:32",
    description: "A powerful anthem celebrating Kurdish heritage and the beauty of our ancestral homeland.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    spotifyUrl: "https://open.spotify.com/track/example",
    appleMusicUrl: "https://music.apple.com/example",
    featured: true,
  },
  {
    id: "2",
    slug: "mountain-echoes",
    title: "Mountain Echoes",
    releaseDateISO: "2025-12-15",
    coverImage: "/images/placeholder.jpg",
    duration: "3:58",
    description: "An emotional journey through the mountains of Kurdistan, featuring traditional instruments and modern beats.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    spotifyUrl: "https://open.spotify.com/track/example",
    featured: false,
  },
  {
    id: "3",
    slug: "dance-of-freedom",
    title: "Dance of Freedom",
    releaseDateISO: "2025-11-20",
    coverImage: "/images/placeholder.jpg",
    duration: "4:15",
    description: "An uplifting dance track inspired by Kurdish celebrations and the spirit of freedom.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    appleMusicUrl: "https://music.apple.com/example",
    featured: false,
  },
  {
    id: "4",
    slug: "voices-of-mesopotamia",
    title: "Voices of Mesopotamia",
    releaseDateISO: "2025-10-10",
    coverImage: "/images/placeholder.jpg",
    duration: "5:20",
    description: "A tribute to the ancient lands of Mesopotamia, blending historical themes with contemporary sound.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    spotifyUrl: "https://open.spotify.com/track/example",
    featured: false,
  },
  {
    id: "5",
    slug: "newroz-celebration",
    title: "Newroz Celebration",
    releaseDateISO: "2025-09-05",
    coverImage: "/images/placeholder.jpg",
    duration: "4:05",
    description: "A festive song celebrating Newroz, the Kurdish New Year, with traditional rhythms and modern production.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    spotifyUrl: "https://open.spotify.com/track/example",
    appleMusicUrl: "https://music.apple.com/example",
    featured: false,
  },
  {
    id: "6",
    slug: "love-in-duhok",
    title: "Love in Duhok",
    releaseDateISO: "2025-07-18",
    coverImage: "/images/placeholder.jpg",
    duration: "3:42",
    description: "A romantic ballad set in the beautiful city of Duhok, expressing timeless love and devotion.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featured: false,
  },
  {
    id: "7",
    slug: "warrior-soul",
    title: "Warrior Soul",
    releaseDateISO: "2025-06-22",
    coverImage: "/images/placeholder.jpg",
    duration: "4:48",
    description: "An epic track honoring the courage and resilience of Kurdish warriors throughout history.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    spotifyUrl: "https://open.spotify.com/track/example",
    featured: false,
  },
  {
    id: "8",
    slug: "homeland-dreams",
    title: "Homeland Dreams",
    releaseDateISO: "2025-05-10",
    coverImage: "/images/placeholder.jpg",
    duration: "4:28",
    description: "A heartfelt song about longing for home and the deep connection to Kurdish land and culture.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    appleMusicUrl: "https://music.apple.com/example",
    featured: false,
  },
];

// Albums
export const albums: Album[] = [
  {
    id: "1",
    slug: "heritage-voices",
    title: "Heritage Voices",
    releaseDateISO: "2025-12-01",
    coverImage: "/images/placeholder.jpg",
    description: "A comprehensive album exploring the rich musical heritage of Kurdistan, featuring 12 tracks that blend traditional and contemporary styles.",
    tracks: [
      { id: "1", title: "Introduction to Heritage", duration: "2:15", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "2", title: "Ancient Melodies", duration: "4:30", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "3", title: "Songs of the Elders", duration: "5:02", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "4", title: "Kurdish Dawn (Album Version)", duration: "4:45", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "5", title: "Valley Whispers", duration: "3:58", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "6", title: "Dance of the Mountains", duration: "4:20", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "7", title: "Tribal Rhythms", duration: "4:12", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "8", title: "Nomad's Journey", duration: "5:30", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "9", title: "Moonlight Serenade", duration: "3:45", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "10", title: "Celebration Song", duration: "4:05", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "11", title: "Prayer of Peace", duration: "4:50", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "12", title: "Heritage Forever", duration: "5:15", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
  },
  {
    id: "2",
    slug: "modern-kurdistan",
    title: "Modern Kurdistan",
    releaseDateISO: "2025-08-15",
    coverImage: "/images/placeholder.jpg",
    description: "A bold exploration of contemporary Kurdish music, featuring electronic elements and modern production techniques while respecting traditional roots.",
    tracks: [
      { id: "1", title: "New Generation", duration: "3:42", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "2", title: "City Lights", duration: "4:10", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "3", title: "Digital Horizon", duration: "4:25", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "4", title: "Youth Revolution", duration: "3:55", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "5", title: "Electric Dreams", duration: "4:38", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "6", title: "Future Beat", duration: "4:02", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "7", title: "Urban Tales", duration: "3:50", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "8", title: "Tomorrow's Song", duration: "4:48", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
  },
  {
    id: "3",
    slug: "love-and-longing",
    title: "Love and Longing",
    releaseDateISO: "2025-04-20",
    coverImage: "/images/placeholder.jpg",
    description: "A romantic collection of ballads and love songs, expressing the depth of emotion in Kurdish poetry and music.",
    tracks: [
      { id: "1", title: "First Love", duration: "3:28", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "2", title: "Distant Hearts", duration: "4:15", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "3", title: "Love in Duhok (Album Version)", duration: "4:05", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "4", title: "Eternal Promise", duration: "3:52", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "5", title: "Moonlit Romance", duration: "4:30", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "6", title: "Letters to You", duration: "3:38", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "7", title: "Forever Yours", duration: "4:20", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
  },
  {
    id: "4",
    slug: "epic-journeys",
    title: "Epic Journeys",
    releaseDateISO: "2024-11-10",
    coverImage: "/images/placeholder.jpg",
    description: "An ambitious album featuring grand orchestral arrangements and epic storytelling through music, celebrating heroic tales from Kurdish history.",
    tracks: [
      { id: "1", title: "Overture: The Beginning", duration: "2:45", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "2", title: "Mountain Kingdom", duration: "5:20", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "3", title: "Warrior Soul (Epic Version)", duration: "5:45", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "4", title: "Battle Hymn", duration: "4:55", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "5", title: "Quest for Freedom", duration: "6:10", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "6", title: "Heroes' Return", duration: "4:40", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "7", title: "Victory March", duration: "5:05", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "8", title: "Legacy of Legends", duration: "6:30", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
  },
];
