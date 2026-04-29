import type { Expert } from '../types/expert';

// ─────────────────────────────────────────────────────────────────────────────
// COVERAGE MAP
//
// Names:        short (Kai), medium (Jon Jones), long (Alexandria Ocasio-Cortez)
// Headlines:    pipe-separated, sentence, short single word, none (fallback test)
// Ratings:      0.0, 3.2, 4.2, 4.4, 4.6, 4.7, 4.8, 4.9, 5.0
// Reviews:      0, 1, 23, 187, 312, 723, 892, 1847, 3102, 4201, 5621, 10843
// Availability: available, available+customLabel, limited, limited+customLabel, unavailable
// Expertise:    0 tags, exactly 3 tags (no overflow), 4+ tags (overflow pill)
// Education:    none, undergrad only, undergrad + masters, multiple degrees
// Coached:      0 min, 45 min, 420 min, 2100 min, 8760 min, 52400 min
// Slug:         with slug (clean URL), without slug (falls back to id in href)
// avatarUrl:    all provided (required field in current type)
// ─────────────────────────────────────────────────────────────────────────────

export const mockExperts: Expert[] = [

  // ── 1. Jon Jones ────────────────────────────────────────────────────────────
  // Tests: pipe-separated long headline, high rating, high review count,
  //        available state (no custom label), undergrad education only,
  //        expertise overflow (5 tags → shows 3 + "+2 more")
  {
    id: 'jon-jones-001',
    slug: 'jon-jones',
    name: 'Jon Jones',
    avatarUrl: 'https://wallpapers.com/images/high/jon-jones-smiling-with-champ-belt-yg0miw4zi4cn32nk.jpg',
    headline: 'UFC Light Heavyweight Champion | Bones Jones | Mental performance coach',
    rating: 4.9,
    reviewCount: 1847,
    availability: 'available',
    bio: 'Former UFC Light Heavyweight Champion with 27 wins and 1 loss. Known for my striking and grappling expertise. Helping fighters improve their game.',
    expertise: ['Mixed Martial Arts', 'Striking', 'Grappling', 'UFC Strategy','Athletic Training'],
    workExperience: [
      { company: 'UFC', role: 'Heavyweight Champion', startDate: '2011-03', endDate: 'Present' },
      { company: 'Self', role: 'Performance Coach', startDate: '2020-01', endDate: 'Present' },
    ],
    education: [
      { school: 'Iowa Central Community College', degree: 'General Studies', year: 2008 },
    ],
    minutesCoached: 24300,
    availableTimes: ['2026-04-28', '2026-04-29', '2026-04-30'],
  },

  // ── 2. Mark Zuckerberg ──────────────────────────────────────────────────────
  // Tests: limited availability with custom label ("2 spots left"),
  //        sentence-style headline, medium reviews, dropout edge case
  //        for education (shows "dropped out" in degree string)
  {
    id: 'mark-zuckerberg-001',
    slug: 'mark-zuckerberg',
    name: 'Mark Zuckerberg',
    avatarUrl: 'https://wallpapers.com/images/high/mark-zuckerberg-portrait-nnbgym0mxav5jtnb.jpg',
    headline: 'CEO at Meta | Systems thinker | Helping founders build at scale',
    rating: 4.2,
    reviewCount: 312,
    availability: 'limited',
    availabilityLabel: '2 spots left',
    bio: 'Entrepreneur and philanthropist. Founded Facebook in 2004, now leading Meta Platforms.',
    expertise: ['Product Strategy', 'Scaling Startups', 'AI & ML', 'Company Building', 'Social Products', 'Entrepreneurship'],
    workExperience: [
      { company: 'Meta', role: 'CEO & Co-Founder', startDate: '2004-02', endDate: 'Present' },
    ],
    education: [
      { school: 'Harvard University', degree: 'Computer Science — dropped out', year: 2005 },
    ],
    minutesCoached: 8760,
    availableTimes: ['2026-05-01'],
  },

  // ── 3. Serena Williams ──────────────────────────────────────────────────────
  // Tests: unavailable state, perfect 5.0 rating, very high review count,
  //        expertise overflow (6 tags → "+3 more"), no education set
  {
    id: 'serena-williams-001',
    slug: 'serena-williams',
    name: 'Serena Williams',
    avatarUrl: 'https://wallpapers.com/images/high/serena-williams-love-her-curls-qx50wp0aagqeqikl.jpg',
    headline: '23x Grand Slam Champion | Founder at Serena Ventures | Winning mindset coach',
    rating: 5.0,
    reviewCount: 4201,
    availability: 'unavailable',
    bio: 'One of the greatest athletes of all time. Beyond tennis, I\'ve built Serena Ventures to back underrepresented founders. I coach on winning mindset, resilience, and building a brand that outlasts your sport.',
    expertise: ['Athletic Mindset', 'Brand Building', 'VC & Investing', 'Resilience', 'Entrepreneurship', 'Public Speaking'],
    workExperience: [
      { company: 'WTA Tour', role: 'Professional Tennis Player', startDate: '1995-10', endDate: '2022-09' },
      { company: 'Serena Ventures', role: 'Founder & General Partner', startDate: '2014-01', endDate: 'Present' },
    ],
    education: undefined,
    minutesCoached: 52400,
    availableTimes: [],
  },

  // ── 4. MrBeast (Jimmy Donaldson) ────────────────────────────────────────────
  // Tests: long helpful/offer-style headline, no education,
  //        available state, moderate review count, expertise with exactly 3 tags (no overflow)
  {
    id: 'jimmy-donaldson-001',
    slug: 'mrbeast',
    name: 'Jimmy Donaldson',
    avatarUrl: 'https://wallpapers.com/images/high/mr-beast-hands-pressed-together-0udybx572uhq70lz.jpg',
    headline: 'MrBeast | 300M+ subscribers | I\'ll help you grow your channel from zero',
    rating: 4.8,
    reviewCount: 892,
    availability: 'available',
    bio: 'Started posting YouTube videos at 13. Failed a lot. Figured it out. Now I run the biggest channel in the world and a portfolio of companies. Happy to share everything I learned about content, virality, and audience building.',
    expertise: ['YouTube Growth', 'Content Strategy', 'Virality'],
    workExperience: [
      { company: 'MrBeast', role: 'Founder & Creator', startDate: '2012-02', endDate: 'Present' },
      { company: 'Feastables', role: 'Founder', startDate: '2022-01', endDate: 'Present' },
    ],
    education: undefined,
    minutesCoached: 11200,
    availableTimes: ['2026-04-28', '2026-05-01', '2026-05-02'],
  },

  // ── 5. Alexandria Ocasio-Cortez ─────────────────────────────────────────────
  // Tests: LONG NAME — longest real-world name likely to appear,
  //        limited with custom label ("This month"), undergrad education
  {
    id: 'aoc-001',
    slug: 'aoc',
    name: 'Alexandria Ocasio-Cortez',
    avatarUrl: 'https://wallpapers.com/images/high/blue-aesthetic-alexandria-ocasio-cortez-with-flag-6ury9827fxjabuvx.jpg',
    headline: 'U.S. Congresswoman | Grassroots organizer | Run for office without money or connections',
    rating: 4.6,
    reviewCount: 723,
    availability: 'limited',
    availabilityLabel: 'This month',
    bio: 'Former bartender. Now the youngest woman ever elected to Congress. I mentor people interested in grassroots organizing and running for office — especially those who\'ve been told they don\'t belong.',
    expertise: ['Grassroots Organizing', 'Public Speaking', 'Political Strategy', 'Social Media', 'Policy & Advocacy'],
    workExperience: [
      { company: 'U.S. House of Representatives', role: 'Congresswoman, NY-14', startDate: '2019-01', endDate: 'Present' },
      { company: 'Union Square Hospitality Group', role: 'Bartender & Server', startDate: '2017-01', endDate: '2018-11' },
    ],
    education: [
      { school: 'Boston University', degree: 'B.A. Economics & International Relations', year: 2011 },
    ],
    minutesCoached: 6300,
    availableTimes: ['2026-05-10', '2026-05-12'],
  },

  // ── 6. Gordon Ramsay ────────────────────────────────────────────────────────
  // Tests: unavailable, special characters in headline (apostrophes),
  //        very high review count, no education (culinary training, no university),
  //        long work history (multiple past roles)
  {
    id: 'gordon-ramsay-001',
    slug: 'gordon-ramsay',
    name: 'Gordon Ramsay',
    avatarUrl: 'https://wallpapers.com/images/high/gordon-ramsay-show-host-rapj50k6vwzx6epd.jpg',
    headline: '17 Michelin Stars | Hell\'s Kitchen | Brutally honest culinary coaching',
    rating: 4.7,
    reviewCount: 3102,
    availability: 'unavailable',
    bio: 'I\'ve built restaurant empires across the world and dragged countless failing kitchens back from the edge. My coaching style is direct. If you can handle the heat, I\'ll help you build a serious career in food.',
    expertise: ['Culinary Arts', 'Restaurant Operations', 'Leadership', 'Business Scaling', 'Kitchen Management'],
    workExperience: [
      { company: 'Restaurant Gordon Ramsay', role: 'Chef Patron', startDate: '1998-09', endDate: 'Present' },
      { company: 'Hell\'s Kitchen (Fox)', role: 'Host & Executive Producer', startDate: '2005-05', endDate: 'Present' },
      { company: 'Harveys', role: 'Sous Chef under Marco Pierre White', startDate: '1988-01', endDate: '1993-12', description: 'Earned first Michelin star.' },
    ],
    education: undefined,
    minutesCoached: 38900,
    availableTimes: [],
  },

  // ── 7. Simone Biles ─────────────────────────────────────────────────────────
  // Tests: available with custom label ("New to platform"),
  //        perfect 5.0 with very LOW review count (23) — high quality, low volume,
  //        low minutesCoached (barely started), education in progress (future grad year)
  {
    id: 'simone-biles-001',
    slug: 'simone-biles',
    name: 'Simone Biles',
    avatarUrl: 'https://wallpapers.com/images/high/simone-biles-tcidud5cg0ampt6w.jpg',
    headline: '11x Olympic medalist | Mental health advocate | Sports performance coaching',
    rating: 5.0,
    reviewCount: 23,
    availability: 'available',
    availabilityLabel: 'New to platform',
    bio: 'The most decorated American gymnast in history. My story isn\'t just gold medals — it\'s knowing when to step back and protect your mental health. I coach on athletic performance AND the inner game.',
    expertise: ['Athletic Performance', 'Mental Health', 'Resilience', 'Olympic Prep', 'Gymnastics Technique'],
    workExperience: [
      { company: 'World Champions Centre', role: 'Elite Gymnast', startDate: '2011-01', endDate: 'Present' },
      { company: 'Athleta', role: 'Brand Partner', startDate: '2021-06', endDate: 'Present' },
    ],
    education: [
      { school: 'University of the People', degree: 'B.S. Business Administration (enrolled)', year: 2028 },
    ],
    minutesCoached: 420,
    availableTimes: ['2026-04-30', '2026-05-01', '2026-05-02', '2026-05-03'],
  },

  // ── 8. Kai Cenat ────────────────────────────────────────────────────────────
  // Tests: SHORT SINGLE-WORD HEADLINE ("Streamer") — minimum content in headline,
  //        short-ish first name, limited availability without custom label, no education
  {
    id: 'kai-cenat-001',
    slug: 'kai-cenat',
    name: 'Kai Cenat',
    avatarUrl: 'https://wallpapercave.com/wp/wp12167888.jpg',
    headline: 'Streamer',
    rating: 4.3,
    reviewCount: 187,
    availability: 'limited',
    bio: 'Most-subscribed Twitch streamer of all time. Started with nothing and figured out live content through trial and error. I coach on growing a streaming career, building community, and turning followers into fans.',
    expertise: ['Live Streaming', 'Community Building', 'Twitch Growth', 'Content Creation'],
    workExperience: [
      { company: 'Twitch', role: 'Partner & Full-Time Streamer', startDate: '2020-01', endDate: 'Present' },
    ],
    education: undefined,
    minutesCoached: 2100,
    availableTimes: ['2026-05-02'],
  },

  // ── 9. Emma Chamberlain ─────────────────────────────────────────────────────
  // Tests: ZERO REVIEWS, ZERO RATING (brand new, never coached),
  //        0 minutesCoached, available, no education
  {
    id: 'emma-chamberlain-001',
    slug: 'emma-chamberlain',
    name: 'Emma Chamberlain',
    avatarUrl: 'https://wallpapers.com/images/high/emma-chamberlain-in-crap-eyewear-q2ica2buudms5l93.jpg',
    headline: 'OG YouTube creator | Founder at Chamberlain Coffee | Honest talk on creative burnout',
    rating: 0,
    reviewCount: 0,
    availability: 'available',
    bio: 'Started YouTube at 16. Went viral. Burned out. Rebuilt. Now I run a coffee brand and talk honestly about the creator life — the highs, the isolation, and how to build something that actually lasts.',
    expertise: ['Content Creation', 'Brand Building', 'Creative Burnout', 'Entrepreneurship'],
    workExperience: [
      { company: 'Emma Chamberlain Media', role: 'Founder & Creator', startDate: '2016-06', endDate: 'Present' },
      { company: 'Chamberlain Coffee', role: 'Founder & CEO', startDate: '2020-04', endDate: 'Present' },
    ],
    education: undefined,
    minutesCoached: 0,
    availableTimes: ['2026-04-29', '2026-04-30'],
  },

  // ── 10. Jake Paul ───────────────────────────────────────────────────────────
  // Tests: LOW RATING (3.2) with HIGH review count — polarizing, many opinions,
  //        available, no education, single-review-count test (not 0, not high)
  {
    id: 'jake-paul-001',
    slug: 'jake-paul',
    name: 'Jake Paul',
    avatarUrl: 'https://wallpapers.com/images/high/jake-paul-contemplative-look-arbp7s4b4x598ymn.jpg',
    headline: 'Pro boxer | Most Valuable Promotions co-founder | I turned internet fame into a real career',
    rating: 3.2,
    reviewCount: 2104,
    availability: 'available',
    bio: 'Started as a Disney star and a meme. Now I\'m a legitimate professional boxer with a real promotions company. Whether you hate it or respect it, I figured out how to reinvent myself completely. Let\'s talk about that.',
    expertise: ['Personal Branding', 'Career Reinvention', 'Combat Sports', 'Business Ventures'],
    workExperience: [
      { company: 'Most Valuable Promotions', role: 'Co-Founder', startDate: '2021-07', endDate: 'Present' },
      { company: 'Social Gloves', role: 'Creator & Boxer', startDate: '2018-01', endDate: 'Present' },
    ],
    education: undefined,
    minutesCoached: 3400,
    availableTimes: ['2026-04-28', '2026-04-29', '2026-04-30', '2026-05-01'],
  },

  // ── 11. Oprah Winfrey ───────────────────────────────────────────────────────
  // Tests: undergrad + masters education (two degrees),
  //        very high review count, available, sentence-style headline,
  //        highest minutesCoached in the set
  {
    id: 'oprah-winfrey-001',
    slug: 'oprah-winfrey',
    name: 'Oprah Winfrey',
    avatarUrl: 'https://wallpapers.com/images/high/american-host-oprah-winfrey-codcsx5oifyjwn0r.jpg',
    headline: 'Media mogul | Philanthropist | Helping you find your purpose',
    rating: 4.8,
    reviewCount: 5621,
    availability: 'available',
    bio: 'Grew up in poverty. Built a media empire. The through-line was always storytelling and human connection. I mentor leaders, creators, and anyone trying to figure out what they\'re meant to do.',
    expertise: ['Leadership', 'Storytelling', 'Personal Purpose', 'Media & PR', 'Philanthropy', 'Public Speaking'],
    workExperience: [
      { company: 'Harpo Productions', role: 'Founder & Chairman', startDate: '1986-01', endDate: 'Present' },
      { company: 'OWN Network', role: 'Founder & CEO', startDate: '2011-01', endDate: 'Present' },
      { company: 'WLS-TV Chicago', role: 'Talk Show Host', startDate: '1983-01', endDate: '1986-01' },
    ],
    education: [
      { school: 'Tennessee State University', degree: 'B.A. Communication', year: 1987 },
      { school: 'Harvard University', degree: 'Honorary Doctorate of Law', year: 2013 },
    ],
    minutesCoached: 87600,
    availableTimes: ['2026-04-28', '2026-05-01', '2026-05-05'],
  },

  // ── 12. Elon Musk ───────────────────────────────────────────────────────────
  // Tests: NO HEADLINE SET — falls back to getHeadline() → title + company chain,
  //        limited availability, medium reviews, undergrad-only education
  {
    id: 'elon-musk-001',
    slug: 'elon-musk',
    name: 'Elon Musk',
    avatarUrl: 'https://wallpapers.com/images/high/elon-musk-spacex-ceo-lrekknqem1300nyb.jpg',
    // headline intentionally omitted — tests getHeadline() fallback to title + company
    title: 'CEO',
    company: 'SpaceX & Tesla',
    rating: 4.0,
    reviewCount: 1203,
    availability: 'limited',
    bio: 'I think about things in first principles and work backwards from the physics. I\'ve started companies in payments, electric vehicles, space, AI, and tunneling. Happy to talk about ambitious company building and long-term thinking.',
    expertise: ['First Principles Thinking', 'Deep Tech', 'Space & Aerospace', 'Electric Vehicles', 'Company Building'],
    workExperience: [
      { company: 'SpaceX', role: 'Founder & CEO', startDate: '2002-05', endDate: 'Present' },
      { company: 'Tesla', role: 'CEO', startDate: '2008-10', endDate: 'Present' },
      { company: 'PayPal', role: 'Co-Founder & CEO', startDate: '1999-03', endDate: '2002-10' },
    ],
    education: [
      { school: 'University of Pennsylvania', degree: 'B.S. Economics & B.S. Physics', year: 1997 },
    ],
    minutesCoached: 4800,
    availableTimes: ['2026-05-03', '2026-05-07'],
  },

  // ── 13. Ina Garten ──────────────────────────────────────────────────────────
  // Tests: ONE SINGLE REVIEW (reviewCount: 1), very short expertise list (2 tags),
  //        available, two degrees (undergrad + MBA/advanced)
  {
    id: 'ina-garten-001',
    slug: 'ina-garten',
    name: 'Ina Garten',
    avatarUrl: 'https://i.pravatar.cc/300?u=inaGarten',
    headline: 'The Barefoot Contessa | 12 cookbooks | Home cooking that actually impresses people',
    rating: 4.9,
    reviewCount: 1,
    availability: 'available',
    bio: 'Former White House nuclear policy analyst who bought a specialty food store in the Hamptons and never looked back. I believe entertaining should be fun, not stressful. Store-bought is fine.',
    expertise: ['Home Cooking', 'Entertaining'],
    workExperience: [
      { company: 'Barefoot Contessa', role: 'Founder & Owner', startDate: '1978-01', endDate: '1996-12' },
      { company: 'Food Network', role: 'Host, Barefoot Contessa', startDate: '2002-04', endDate: 'Present' },
      { company: 'Office of Management & Budget', role: 'Budget Analyst', startDate: '1974-01', endDate: '1978-01' },
    ],
    education: [
      { school: 'University of Connecticut', degree: 'B.S. (transferred)', year: 1970 },
      { school: 'George Washington University', degree: 'M.B.A.', year: 1974 },
    ],
    minutesCoached: 45,
    availableTimes: ['2026-05-01', '2026-05-08'],
  },

  // ── 14. LeBron James ────────────────────────────────────────────────────────
  // Tests: NO EDUCATION AT ALL (didn't attend college, went straight to NBA),
  //        10,000+ review count (the ceiling test), compound headline with numbers
  {
    id: 'lebron-james-001',
    slug: 'lebron-james',
    name: 'LeBron James',
    avatarUrl: 'https://wallpapers.com/images/high/lebron-nba-white-lakers-jersey-kg7zc557nj671txt.jpg',
    headline: '4x NBA Champion | SpringHill Co-Founder | Building a legacy beyond basketball',
    rating: 4.9,
    reviewCount: 10843,
    availability: 'unavailable',
    bio: 'Went straight from Akron to the NBA at 18. Four championships, four MVP awards, and a media company later — the game I\'m most focused on now is the business one. I mentor athletes transitioning to entrepreneurship.',
    expertise: ['Athlete Branding', 'Business Ventures', 'Leadership', 'Community Impact', 'Media & Entertainment'],
    workExperience: [
      { company: 'Los Angeles Lakers', role: 'NBA Player', startDate: '2018-07', endDate: 'Present' },
      { company: 'SpringHill Company', role: 'Co-Founder', startDate: '2015-01', endDate: 'Present' },
      { company: 'Uninterrupted', role: 'Co-Founder', startDate: '2015-01', endDate: 'Present' },
    ],
    education: undefined,
    minutesCoached: 61200,
    availableTimes: [],
  },

  // ── 15. Malala Yousafzai ────────────────────────────────────────────────────
  // Tests: undergrad + masters (two real degrees), unusual short first name
  //        for initials, available with custom label, very long bio
  {
    id: 'malala-yousafzai-001',
    slug: 'malala',
    name: 'Malala Yousafzai',
    avatarUrl: 'https://wallpapers.com/images/high/malala-yousafzai-vogue-cover-july2021-f52p1y9ey67sc2kj.jpg',
    headline: 'Nobel Peace Prize Laureate | Founder at Malala Fund | Girls\' education advocate',
    rating: 4.8,
    reviewCount: 634,
    availability: 'available',
    availabilityLabel: 'Limited this week',
    bio: 'I was shot for going to school. I kept going anyway. Now I run an organization fighting for 130 million girls around the world who are denied an education. I mentor advocates, nonprofit founders, and anyone who wants to create change from a place of deep conviction.',
    expertise: ['Advocacy & Activism', 'Nonprofit Leadership', 'Public Speaking', 'Policy Change', 'Education Access'],
    workExperience: [
      { company: 'Malala Fund', role: 'Founder & Board Chair', startDate: '2013-01', endDate: 'Present' },
      { company: 'United Nations', role: 'Messenger of Peace', startDate: '2017-04', endDate: 'Present' },
    ],
    education: [
      { school: 'University of Oxford', degree: 'B.A. Philosophy, Politics & Economics', year: 2020 },
      { school: 'University of Oxford', degree: 'M.Phil. Comparative Social Policy', year: 2022 },
    ],
    minutesCoached: 7200,
    availableTimes: ['2026-04-28', '2026-04-30'],
  },

  // ── 16. Emily Mariko ────────────────────────────────────────────────────────
  // Tests: SHORT NAME (two short words), no slug (URL falls back to id),
  //        limited, empty expertise array (card renders no tags — conditional render test)
  {
    id: 'emily-mariko-001',
    // slug intentionally omitted — tests buildProfileHref id fallback
    name: 'Emily Mariko',
    avatarUrl: 'https://i.pravatar.cc/300?u=emilyMariko',
    headline: 'Food creator | 14M followers | Simple cooking for real life',
    rating: 4.5,
    reviewCount: 98,
    availability: 'limited',
    bio: 'My salmon rice bowl got 60 million views and I still don\'t fully understand why. I make simple, approachable food content and I\'m happy to talk about building a food creator brand, cookbook deals, and brand partnerships.',
    expertise: [],
    workExperience: [
      { company: 'Self', role: 'Food Creator & Content Producer', startDate: '2020-08', endDate: 'Present' },
    ],
    education: [
      { school: 'University of Southern California', degree: 'B.A. Communication', year: 2019 },
    ],
    minutesCoached: 1260,
    availableTimes: ['2026-05-06'],
  },

];
