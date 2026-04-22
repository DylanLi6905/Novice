export interface Expert {
    id: string; //unique ID to identify the expert

    //basic personal info
    name: string;
    
    //professional info
    title: string; //ex: "Software Engineer"
    company: string;
    work_experience: string[]; //list of past work experience
    education: string[];

    //profile info
    bio: string; //short description
    avatar: string; //URL to profile picture


    //metrics
    rating: number; //avg rating from 0-5
    numReviews: number;
    minutes_coached: number; //total minutes coached on the platform

    //availability
    //future task: replace with calendar integration like calendly
    isAvailable: boolean; //whether they are currently available for calls
    availableTimes: string[]; //list of available times (YYYY-MM-DD) 


}