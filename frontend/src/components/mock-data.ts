// Mock data for demonstration purposes
export const mockItineraries = [
  {
    id: "budget-trip",
    title: "Budget Explorer",
    type: "Budget Friendly",
    duration: "3 Days",
    budget: "₹15,000 - ₹20,000",
    rating: 4,
    summary: "A carefully curated budget-friendly trip that doesn't compromise on experiences. Enjoy the vibrant culture of Mumbai with affordable stays and economical transport options.",
    highlights: ["Local Street Food", "Heritage Walks", "Budget Hotels", "Train Travel", "Free Activities"],
    route: {
      departure: {
        location: "New Delhi Railway Station",
        time: "6:30 PM",
        date: "Dec 15, 2024"
      },
      arrival: {
        location: "Mumbai Central",
        time: "2:30 PM",
        date: "Dec 16, 2024"
      },
      return: {
        departure: {
          location: "Mumbai Central",
          time: "8:45 PM",
          date: "Dec 18, 2024"
        },
        arrival: {
          location: "New Delhi Railway Station",
          time: "4:45 PM",
          date: "Dec 19, 2024"
        }
      }
    },
    vehicles: [
      {
        type: "Train",
        name: "Rajdhani Express",
        price: "₹2,500",
        duration: "20 hours",
        features: ["AC 3-Tier", "Meals included", "Sleeper berth"]
      },
      {
        type: "Flight",
        name: "IndiGo 6E 131",
        price: "₹4,200",
        duration: "2.5 hours",
        features: ["Economy", "Hand baggage", "Online check-in"]
      }
    ],
    hotels: [
      {
        name: "Hotel Sagar",
        rating: 3,
        price: "₹1,800",
        location: "Colaba, South Mumbai",
        amenities: ["Free WiFi", "AC Rooms", "24/7 Front Desk", "Room Service"]
      },
      {
        name: "YMCA International House",
        rating: 3,
        price: "₹1,500",
        location: "Fort, Mumbai",
        amenities: ["Clean rooms", "Central location", "Budget friendly", "Safe"]
      }
    ],
    activities: [
      {
        name: "Gateway of India",
        type: "Heritage",
        duration: "2 hours",
        price: "Free",
        description: "Iconic monument and perfect starting point for exploring Mumbai's colonial heritage."
      },
      {
        name: "Dharavi Slum Tour",
        type: "Cultural",
        duration: "3 hours",
        price: "₹800",
        description: "Eye-opening tour showcasing the entrepreneurial spirit of Asia's largest slum."
      },
      {
        name: "Marine Drive Walk",
        type: "Leisure",
        duration: "1 hour",
        price: "Free",
        description: "Evening stroll along Mumbai's Queen's Necklace with stunning sunset views."
      }
    ],
    mapData: {
      center: { lat: 19.0760, lng: 72.8777 },
      markers: [
        { lat: 28.6139, lng: 77.2090, title: "New Delhi", type: "departure" },
        { lat: 19.0760, lng: 72.8777, title: "Mumbai", type: "destination" },
        { lat: 18.9220, lng: 72.8347, title: "Gateway of India", type: "activity" }
      ]
    }
  },
  {
    id: "comfort-trip",
    title: "Comfort & Culture",
    type: "Mid-Range",
    duration: "4 Days",
    budget: "₹35,000 - ₹45,000",
    rating: 4,
    summary: "Perfect balance of comfort and authentic experiences. Stay in quality accommodations while exploring Mumbai's diverse neighborhoods, cuisine, and cultural landmarks.",
    highlights: ["Boutique Hotels", "Food Tours", "Private Transfers", "Cultural Shows", "Shopping"],
    route: {
      departure: {
        location: "Indira Gandhi International Airport",
        time: "10:15 AM",
        date: "Dec 15, 2024"
      },
      arrival: {
        location: "Chhatrapati Shivaji International Airport",
        time: "1:00 PM",
        date: "Dec 15, 2024"
      },
      return: {
        departure: {
          location: "Chhatrapati Shivaji International Airport",
          time: "4:30 PM",
          date: "Dec 19, 2024"
        },
        arrival: {
          location: "Indira Gandhi International Airport",
          time: "7:15 PM",
          date: "Dec 19, 2024"
        }
      }
    },
    vehicles: [
      {
        type: "Flight",
        name: "Air India AI 131",
        price: "₹6,800",
        duration: "2h 45m",
        features: ["Economy Plus", "Checked baggage", "In-flight meals", "Entertainment"]
      },
      {
        type: "Car",
        name: "Private AC Sedan",
        price: "₹3,500",
        duration: "Airport transfers",
        features: ["AC Vehicle", "Professional driver", "Door-to-door service"]
      }
    ],
    hotels: [
      {
        name: "The Gordon House Hotel",
        rating: 4,
        price: "₹4,500",
        location: "Colaba, Mumbai",
        amenities: ["Boutique Style", "Restaurant", "Bar", "Concierge", "WiFi"]
      },
      {
        name: "Hotel Marine Plaza",
        rating: 4,
        price: "₹5,200",
        location: "Marine Drive",
        amenities: ["Sea View", "Swimming Pool", "Spa", "Multiple Restaurants"]
      }
    ],
    activities: [
      {
        name: "Bollywood Studio Tour",
        type: "Entertainment",
        duration: "4 hours",
        price: "₹2,500",
        description: "Behind-the-scenes look at India's film industry with potential celebrity spotting."
      },
      {
        name: "Mumbai Food Crawl",
        type: "Culinary",
        duration: "4 hours",
        price: "₹1,800",
        description: "Guided tour through Mumbai's street food scene and local restaurants."
      },
      {
        name: "Elephanta Caves Ferry",
        type: "Heritage",
        duration: "Half day",
        price: "₹600",
        description: "UNESCO World Heritage site with ancient rock-cut temples and sculptures."
      }
    ],
    mapData: {
      center: { lat: 19.0760, lng: 72.8777 },
      markers: [
        { lat: 28.5562, lng: 77.1000, title: "Delhi Airport", type: "departure" },
        { lat: 19.0896, lng: 72.8656, title: "Mumbai Airport", type: "destination" },
        { lat: 18.9633, lng: 72.9343, title: "Elephanta Caves", type: "activity" }
      ]
    }
  },
  {
    id: "luxury-trip",
    title: "Mumbai Luxury Experience",
    type: "Premium",
    duration: "5 Days",
    budget: "₹80,000 - ₹1,20,000",
    rating: 5,
    summary: "Indulge in Mumbai's finest offerings with luxury accommodations, private experiences, and exclusive access to the city's premium attractions and dining establishments.",
    highlights: ["5-Star Hotels", "Private Tours", "Fine Dining", "Luxury Shopping", "Spa Treatments"],
    route: {
      departure: {
        location: "Indira Gandhi International Airport",
        time: "9:00 AM",
        date: "Dec 15, 2024"
      },
      arrival: {
        location: "Chhatrapati Shivaji International Airport",
        time: "11:45 AM",
        date: "Dec 15, 2024"
      },
      return: {
        departure: {
          location: "Chhatrapati Shivaji International Airport",
          time: "6:00 PM",
          date: "Dec 20, 2024"
        },
        arrival: {
          location: "Indira Gandhi International Airport",
          time: "8:45 PM",
          date: "Dec 20, 2024"
        }
      }
    },
    vehicles: [
      {
        type: "Flight",
        name: "Vistara UK 995",
        price: "₹12,500",
        duration: "2h 45m",
        features: ["Premium Economy", "Priority check-in", "Lounge access", "Gourmet meals"]
      },
      {
        type: "Car",
        name: "Mercedes-Benz S-Class",
        price: "₹8,000",
        duration: "Full trip",
        features: ["Luxury sedan", "Chauffeur", "WiFi", "Refreshments"]
      }
    ],
    hotels: [
      {
        name: "The Taj Mahal Palace",
        rating: 5,
        price: "₹18,000",
        location: "Colaba, Mumbai",
        amenities: ["Iconic Heritage", "Spa", "Multiple Restaurants", "Butler Service", "Harbor View"]
      },
      {
        name: "Four Seasons Hotel Mumbai",
        rating: 5,
        price: "₹22,000",
        location: "Worli, Mumbai",
        amenities: ["Modern Luxury", "Rooftop Pool", "Michelin Dining", "Spa", "City Views"]
      }
    ],
    activities: [
      {
        name: "Private Helicopter Tour",
        type: "Aerial Sightseeing",
        duration: "1 hour",
        price: "₹15,000",
        description: "Exclusive aerial view of Mumbai's skyline, coastline, and iconic landmarks."
      },
      {
        name: "Exclusive Antilia & Film City Tour",
        type: "VIP Experience",
        duration: "6 hours",
        price: "₹8,500",
        description: "Private guided tour of Bollywood studios and Mumbai's most exclusive neighborhoods."
      },
      {
        name: "Yacht Sunset Cruise",
        type: "Luxury",
        duration: "3 hours",
        price: "₹12,000",
        description: "Private yacht experience with gourmet dinner and Mumbai's skyline views."
      }
    ],
    mapData: {
      center: { lat: 19.0760, lng: 72.8777 },
      markers: [
        { lat: 28.5562, lng: 77.1000, title: "Delhi Airport", type: "departure" },
        { lat: 19.0896, lng: 72.8656, title: "Mumbai Airport", type: "destination" },
        { lat: 18.9067, lng: 72.8147, title: "Antilia", type: "activity" }
      ]
    }
  }
];