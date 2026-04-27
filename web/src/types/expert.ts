//using an object instead of a string like "SWE at Company"
//means the UI can format it however it wants
//like bold the company, grey out dates, etc.
export interface WorkExperience {
  company: string;
  role: string;
  startDate: string; // YYYY-MM
  endDate: string | 'Present';
  description?: string;
}

export interface Education {
  school: string;
  degree: string;
  year: number;
}

export type ExpertAvailability = 'available' | 'limited' | 'unavailable';

export interface Expert {
  id: string; //unique ID to identify the expert

  // Card + profile basics
  name: string;
  //slug is a short readable version of a title used in urls to tell us what the page is about. 
  //Ex: "jon-jones-ufc" instead of "expert/1234"
  slug?: string; 
  avatarUrl: string;

  // Card-first summary line
  // Examples:
  // "Worked at UFC"
  // "Champion"
  // "Expert in Mixed Martial Arts"
  headline?: string;

  // Optional fallback fields in case some data is still in the old shape.
  title?: string;
  company?: string;

  rating: number;
  reviewCount: number;
  availability?: ExpertAvailability;
  availabilityLabel?: string; //custom label like "This week" or "2 spots left"

  // Profile page fields
  bio: string;
  expertise: string[];
  workExperience: WorkExperience[];
  education?: Education[];
  minutesCoached: number;
  availableTimes: string[];
}