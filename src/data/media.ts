export interface Photo {
  id: number;
  src: string;
  alt: string;
  category: string;
}

export interface Video {
  id: number;
  title: string;
  youtubeUrl: string;
  dateISO: string;
}

export interface Poster {
  id: number;
  src: string;
  title: string;
  dateISO: string;
}

export const photos: Photo[] = [
  {
    id: 1,
    src: "/images/profile/1.jpeg",
    alt: "Live performance at Heritage Festival",
    category: "Concerts"
  },
  {
    id: 2,
    src: "/images/profile/2.jpeg",
    alt: "Portrait session with traditional tembur",
    category: "Portraits"
  },
  {
    id: 3,
    src: "/images/profile/3.jpeg",
    alt: "Newroz celebration performance",
    category: "Concerts"
  },
  {
    id: 4,
    src: "/images/profile/4.jpeg",
    alt: "Recording session in studio",
    category: "Studio"
  },
  {
    id: 5,
    src: "/images/profile/5.jpeg",
    alt: "Stockholm World Music Series",
    category: "Concerts"
  },
  {
    id: 6,
    src: "/images/profile/6.jpeg",
    alt: "Backstage moments",
    category: "Portraits"
  },
  {
    id: 7,
    src: "/images/profile/7.jpeg",
    alt: "Berlin cultural exchange night",
    category: "Concerts"
  },
  
];

export const videos: Video[] = [
  {
    id: 1,
    title: "Imad Selim - Official Music Video",
    youtubeUrl: "https://www.youtube.com/embed/OoNDOBWy8-U",
    dateISO: "2025-12-15"
  },
  {
    id: 2,
    title: "Imad Selim - Latest Release",
    youtubeUrl: "https://www.youtube.com/embed/ZXIKx7Oih3s",
    dateISO: "2025-10-20"
  },
  {
    id: 3,
    title: "Imad Selim - Live Performance",
    youtubeUrl: "https://www.youtube.com/embed/mgzHRYZRqWA",
    dateISO: "2025-08-10"
  },
  {
    id: 4,
    title: "Imad Selim - Traditional Songs",
    youtubeUrl: "https://www.youtube.com/embed/V4vckowqtjI",
    dateISO: "2025-06-05"
  },
   {
    id: 5,
    title: "Imad Selim - Traditional Songs",
    youtubeUrl: "https://www.youtube.com/embed/1Nelxxoxewc",
    dateISO: "2025-06-05"
  },
   {
    id: 6,
    title: "Imad Selim - Traditional Songs",
    youtubeUrl: "https://www.youtube.com/embed/nPcMxAZP2Sk",
    dateISO: "2025-06-05"
  },
];

export const posters: Poster[] = [
  {
    id: 1,
    src: "/images/media/posters/heritage-festival.jpg",
    title: "Kurdish Heritage Festival 2026",
    dateISO: "2026-04-15"
  },
  {
    id: 2,
    src: "/images/media/posters/newroz-concert.jpg",
    title: "Newroz Celebration Concert",
    dateISO: "2026-03-21"
  },
  {
    id: 3,
    src: "/images/media/posters/stockholm-series.jpg",
    title: "Stockholm World Music Series",
    dateISO: "2026-05-08"
  },
  {
    id: 4,
    src: "/images/media/posters/berlin-exchange.jpg",
    title: "Berlin Cultural Exchange Night",
    dateISO: "2025-11-12"
  },
  {
    id: 5,
    src: "/images/media/posters/paris-festival.jpg",
    title: "Paris Oriental Music Festival",
    dateISO: "2025-10-05"
  },
  {
    id: 6,
    src: "/images/media/posters/istanbul-gala.jpg",
    title: "Istanbul Cross-Cultural Gala",
    dateISO: "2026-06-20"
  }
];
