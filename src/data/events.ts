export interface Event {
  id: number;
  slug: string;
  title: string;
  dateISO: string;
  time: string;
  city: string;
  country: string;
  venue: string;
  description: string;
  status: "upcoming" | "past";
  coverImage: string;
  highlights: string[];
}

export const events: Event[] = [
  {
    id: 1,
    slug: "kurdish-heritage-festival-erbil",
    title: "Kurdish Heritage Festival",
    dateISO: "2026-04-15",
    time: "19:00",
    city: "Erbil",
    country: "Iraq",
    venue: "Sami Abdulrahman Park Amphitheater",
    description: "Join us for an unforgettable evening celebrating Kurdish culture through traditional music, poetry, and storytelling. This annual festival brings together artists from across Kurdistan for a night of heritage and artistry.",
    status: "upcoming",
    coverImage: "/images/events/heritage-festival.jpg",
    highlights: [
      "Traditional Kurdish folk songs",
      "Live storytelling performance",
      "Poetry recitals in Kurdish and Arabic",
      "Special guest performers",
      "Cultural exhibition"
    ]
  },
  {
    id: 2,
    slug: "newroz-celebration-london",
    title: "Newroz Celebration Concert",
    dateISO: "2026-03-21",
    time: "18:30",
    city: "London",
    country: "United Kingdom",
    venue: "Barbican Centre",
    description: "Celebrate the Kurdish New Year with an evening of music and cultural performances. Experience the joy of Newroz through traditional and contemporary Kurdish music.",
    status: "upcoming",
    coverImage: "/images/events/newroz-concert.jpg",
    highlights: [
      "Newroz special performance",
      "Traditional dance accompaniment",
      "Multi-generational ensemble",
      "Cultural community gathering"
    ]
  },
  {
    id: 3,
    slug: "stockholm-world-music-series",
    title: "Stockholm World Music Series",
    dateISO: "2026-05-08",
    time: "20:00",
    city: "Stockholm",
    country: "Sweden",
    venue: "Konserthuset Stockholm",
    description: "Part of Stockholm's renowned World Music Series, this performance showcases the rich musical traditions of Kurdistan with modern interpretations.",
    status: "upcoming",
    coverImage: "/images/events/stockholm-concert.jpg",
    highlights: [
      "World premiere of new compositions",
      "Collaboration with Swedish artists",
      "Traditional instruments showcase",
      "Q&A session with the artist"
    ]
  }
];

export const getEventBySlug = (slug: string): Event | undefined => {
  return events.find((event) => event.slug === slug);
};

export const getUpcomingEvents = (): Event[] => {
  return events.filter((event) => event.status === "upcoming");
};

export const getPastEvents = (): Event[] => {
  return events.filter((event) => event.status === "past");
};
