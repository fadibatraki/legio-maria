export interface Story {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  dateISO: string;
  readTime: string;
  tags: string[];
  coverImage: string;
  featured: boolean;
}

export const stories: Story[] = [
  {
    id: 1,
    slug: "echoes-of-mountains",
    title: "Echoes of the Mountains",
    excerpt: "A tale of resilience passed down through generations, where ancient melodies carry the spirit of a people across time and valleys.",
    content: [
      "In the heart of Kurdistan's rugged mountains, where peaks touch the sky and valleys whisper ancient secrets, there lived a village elder named Mamosta Rashid. His voice carried stories that had survived centuries, tales woven into the fabric of Kurdish identity.",
      "Every evening, as the sun painted the mountains in shades of gold and crimson, children would gather around him. His weathered hands would dance in the air as he spoke, recreating battles, celebrations, and the everyday magic of Kurdish life.",
      "Among his most cherished stories was that of a young shepherd who discovered a melody so pure, so filled with the essence of the land, that it could move mountains themselves. This wasn't mere folklore—it was the story of how music became the soul of a nation.",
      "The shepherd, named Dilan, would play his flute at dawn, and the mountains would echo his tunes back to him, adding their own harmonies. Over time, these melodies became the traditional songs we know today, each note carrying the weight of history and the lightness of hope.",
      "Mamosta Rashid's stories remind us that our cultural heritage isn't just preserved in books or museums—it lives in every song we sing, every story we tell, and every tradition we pass to the next generation."
    ],
    dateISO: "2026-02-20",
    readTime: "5 min read",
    tags: ["Heritage", "Folk Tales", "Music"],
    coverImage: "/images/stories/mountains.jpg",
    featured: true
  },
  {
    id: 2,
    slug: "the-wandering-poet",
    title: "The Wandering Poet",
    excerpt: "Journey through ancient cities with a traveling bard whose verses preserved history when written words were scarce.",
    content: [
      "Before the age of widespread literacy, knowledge traveled on the tongues of wandering poets. One such poet, known only as Dengbêj Azad, walked from village to village, his repertoire containing thousands of verses memorized over decades.",
      "His gift was extraordinary—he could recite epic tales lasting hours without pause, his voice rising and falling with the drama of each scene. Through his performances, historical events, heroic deeds, and cautionary tales were preserved.",
      "In marketplaces and village squares, crowds would gather as Azad began his recitations. Children sat wide-eyed as he brought ancient heroes to life. Elders nodded knowingly, recognizing the accuracy of events they themselves had witnessed in their youth.",
      "The role of the dengbêj was sacred in Kurdish culture. They were living libraries, guardians of collective memory, and artists who transformed history into art. Each performance was unique, adapted to the audience, yet always faithful to the core truths.",
      "Today, though we have books and recordings, the tradition of oral storytelling continues. It reminds us that stories are meant to be shared, experienced together, and that the human voice carries meanings that written words alone cannot convey."
    ],
    dateISO: "2026-02-18",
    readTime: "6 min read",
    tags: ["Poetry", "Oral Tradition", "History"],
    coverImage: "/images/stories/poet.jpg",
    featured: false
  },
  {
    id: 3,
    slug: "songs-of-resistance",
    title: "Songs of Resistance",
    excerpt: "How music became a powerful tool of cultural preservation and resistance in the face of adversity.",
    content: [
      "Throughout history, when words were forbidden, songs carried messages of hope, resistance, and identity. Kurdish music has always been more than entertainment—it has been a declaration of existence, a refusal to be silenced.",
      "In times when speaking Kurdish was prohibited, mothers still sang lullabies in their native tongue. In moments when gatherings were banned, musicians found ways to perform, turning weddings and celebrations into acts of cultural defiance.",
      "The daf drum's rhythm, the tembûr's strings, the zurna's piercing call—each instrument told stories that official histories tried to erase. Musicians became heroes, not through violence, but through their unwavering commitment to cultural truth.",
      "Songs encoded messages that could be shared openly yet understood only by those who knew. Metaphors of eagles and mountains, rivers and roses, carried meanings that transcended their literal words. This was poetry as resistance, music as memory.",
      "Today, Kurdish music thrives in studios and concert halls, on streaming platforms and in living rooms. But it never forgot its roots as a tool of survival, a bridge across generations, and a testament to the power of cultural persistence."
    ],
    dateISO: "2026-02-15",
    readTime: "7 min read",
    tags: ["Music", "Culture", "Resistance"],
    coverImage: "/images/stories/resistance.jpg",
    featured: false
  },
  {
    id: 4,
    slug: "learning-from-masters",
    title: "Learning from the Masters",
    excerpt: "A personal journey of studying traditional Kurdish music under the guidance of legendary maestros.",
    content: [
      "My journey into Kurdish traditional music began not in a classroom, but in the modest home of Mam Hasan, a master of the tembûr whose fingers had danced across strings for over sixty years.",
      "He didn't start with theory or technique. Instead, he poured tea, settled into his cushion, and began to play. The melody that filled the room spoke of longing, of homeland, of joy found in simple moments. Only when the last note faded did he look at me and say, 'This is what you must learn to feel before you can learn to play.'",
      "Over months, I learned that traditional Kurdish music isn't just about hitting the right notes at the right time. It's about understanding the emotional landscape that gave birth to each melody, the historical context that shaped each mode, the cultural significance of each rhythm.",
      "Mam Hasan would tell stories before teaching songs. He'd explain how a particular melody was created during a time of celebration or sorrow, how it evolved as it traveled from village to village, how different regions added their own flavors while respecting the core essence.",
      "The greatest lesson wasn't musical—it was about legacy. These songs survived because each generation felt a responsibility to honor what came before while making it relevant to their time. We are not just performers; we are links in an unbroken chain stretching back centuries."
    ],
    dateISO: "2026-02-12",
    readTime: "6 min read",
    tags: ["Education", "Tradition", "Personal"],
    coverImage: "/images/stories/masters.jpg",
    featured: false
  },
  {
    id: 5,
    slug: "festivals-of-light",
    title: "Festivals of Light",
    excerpt: "Experience the magic of Newroz through music, dance, and the eternal story of renewal it represents.",
    content: [
      "As March arrives and winter's grip loosens, Kurdish communities around the world prepare for Newroz—the celebration of spring, renewal, and the triumph of light over darkness.",
      "The festival has roots stretching back millennia, commemorating the story of Kawa the Blacksmith who freed his people from tyranny. But beyond the legend, Newroz represents something universal: the human spirit's capacity for renewal, hope, and resistance against oppression.",
      "On Newroz eve, bonfires are lit on hillsides, their flames reaching toward the stars. Families gather to jump over the fires, symbolically burning away the old year's troubles and welcoming fresh beginnings. The air fills with music—traditional songs passed down through generations, new compositions celebrating contemporary Kurdish identity.",
      "Musicians play throughout the night. The daf's rhythm matches the dancing flames, the zurna's call echoes across valleys, voices join in ancient melodies. Each song tells part of the larger story—of survival, of joy, of a culture that refuses to fade.",
      "In cities far from Kurdistan's mountains, the diaspora recreates these traditions, teaching children born in foreign lands about their heritage. Through music and celebration, Newroz becomes a bridge across continents, connecting all Kurds to their shared roots."
    ],
    dateISO: "2026-02-08",
    readTime: "5 min read",
    tags: ["Celebration", "Newroz", "Tradition"],
    coverImage: "/images/stories/newroz.jpg",
    featured: false
  },
  {
    id: 6,
    slug: "instruments-speak",
    title: "When Instruments Speak",
    excerpt: "Exploring the unique voices of traditional Kurdish instruments and the stories they tell without words.",
    content: [
      "Every culture develops instruments that reflect its soul. For Kurds, instruments aren't mere tools for making sound—they're voices that speak when words fall short.",
      "The tembûr, with its long neck and gentle resonance, carries the voice of contemplation and spiritual longing. Traditionally associated with Yarsan religious practices, its sound evokes the mystical connection between earth and sky, human and divine.",
      "The daf, a large frame drum, speaks with power and rhythm. Its deep beats drive celebrations, its complex patterns challenge even master players. In skilled hands, a single daf can sound like entire percussion orchestra, each finger striking a different tone.",
      "The zurna, a double-reed wind instrument, cuts through air with piercing clarity. Its sound announces celebrations from miles away, calls communities together, and leads traditional dances. Joy and sorrow both find expression through its intense voice.",
      "Modern Kurdish musicians are finding new ways to voice these traditional instruments, combining them with contemporary styles while respecting their heritage. In fusion concerts and experimental recordings, ancient instruments prove their timeless relevance."
    ],
    dateISO: "2026-02-05",
    readTime: "5 min read",
    tags: ["Instruments", "Music", "Culture"],
    coverImage: "/images/stories/instruments.jpg",
    featured: false
  },
  {
    id: 7,
    slug: "diaspora-dreams",
    title: "Diaspora Dreams",
    excerpt: "How Kurdish artists in diaspora communities keep their cultural identity alive through music and storytelling.",
    content: [
      "To be Kurdish in diaspora is to live between worlds—rooted in ancient traditions while growing in foreign soil. For many, music becomes the bridge connecting these worlds, a way to honor heritage while embracing new identities.",
      "In London, Berlin, Stockholm, and Toronto, Kurdish cultural centers buzz with activity. Children of immigrants learn traditional instruments their parents and grandparents played, singing in a language that feels both foreign and deeply familiar.",
      "Young artists face unique challenges and opportunities. They can preserve traditional forms with a purity sometimes lost in rapidly modernizing homelands. Yet they also innovate freely, blending Kurdish music with hip-hop, electronic, and rock influences that reflect their multicultural realities.",
      "These fusion experiments aren't dilutions of tradition—they're evolution. They prove that Kurdish culture isn't frozen in the past but alive and adapting. A dengbêj's ancient melody over electronic beats, traditional lyrics in a pop arrangement—these combinations honor roots while claiming space in contemporary global culture.",
      "The diaspora's greatest contribution might be this: showing that cultural identity isn't about maintaining museum-perfect traditions, but about carrying forward the essential spirit while speaking to each new generation in languages they understand."
    ],
    dateISO: "2026-02-01",
    readTime: "6 min read",
    tags: ["Diaspora", "Identity", "Modern"],
    coverImage: "/images/stories/diaspora.jpg",
    featured: false
  },
  {
    id: 8,
    slug: "voice-of-generations",
    title: "Voice of Generations",
    excerpt: "Three generations of one family share their perspectives on preserving and evolving Kurdish musical heritage.",
    content: [
      "In the living room of the Hasan family, three generations sit together—grandfather Bavo, father Azad, and daughter Arin. Each represents a different chapter in Kurdish music's ongoing story.",
      "Bavo learned music in village squares and family gatherings, before conservatories or recording studios existed. His teachers were traveling dengbêjs and local masters who passed knowledge orally. 'We learned by listening, by feeling,' he says, his hands unconsciously moving as if playing an invisible tembûr.",
      "Azad studied formally, attending music schools in Erbil and later in Europe. He learned to read notation, studied music theory, performed in orchestras. 'My father gave me the soul of our music,' he explains. 'School gave me the tools to share it with the world.'",
      "Arin, a teenager with a laptop full of production software, represents music's digital future. She samples her grandfather's voice, layers it over beats she creates, shares results with thousands of followers online. 'I'm not replacing tradition,' she insists. 'I'm translating it for my generation.'",
      "Their conversation reveals both tensions and harmony. Bavo worries about authenticity, Azad mediates between old and new, Arin pushes boundaries. Yet they agree on essentials: music must serve community, honor history, and speak truth. The forms may change, but the heart remains constant."
    ],
    dateISO: "2026-01-28",
    readTime: "7 min read",
    tags: ["Family", "Generations", "Evolution"],
    coverImage: "/images/stories/generations.jpg",
    featured: false
  }
];

export const getStoryBySlug = (slug: string): Story | undefined => {
  return stories.find((story) => story.slug === slug);
};

export const getFeaturedStory = (): Story | undefined => {
  return stories.find((story) => story.featured);
};

export const getLatestStories = (limit: number = 3): Story[] => {
  return stories
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
    .slice(0, limit);
};

export const getRelatedStories = (currentSlug: string, limit: number = 3): Story[] => {
  return stories
    .filter((story) => story.slug !== currentSlug)
    .slice(0, limit);
};
