import activity1 from "../../assets/activity1.jpg";
import activity2 from "../../assets/activity2.jpg";
import activity3 from "../../assets/activity3.jpg";
import activity4 from "../../assets/activity4.jpg";
import activity5 from "../../assets/activity5.jpg";
import activity6 from "../../assets/activity6.jpg";
import activity7 from "../../assets/activity7.jpg";
import activity8 from "../../assets/activity8.jpg";

const commonTourInfo = {
  category: "WATER ACTIVITIES",
  rating: 4.5,
  reviews: 584,
  duration: "2 hours",
  transport: "Transport Facility",
  plan: "Family Plan",
  language: ["English", "French"],
  people: "5 People",
  includes: [
    "Double-decker Routemaster tour",
    "Short trip along the River Thames",
    "Changing of the Guard",
    "Professional tour guide",
  ],
  notIncludes: [
    "Hotel pickup",
    "Lunch",
    "Personal expenses",
    "Extra ticket",
  ],
  safety: [
    "All required protective equipment is provided",
    "All areas that customers touch are frequently cleaned",
    "You must keep social distance while in vehicles",
    "The number of visitors is limited to reduce crowds",
  ],
  activityList: [
    "Discover London on board a classic vintage double decker bus",
    "Cruise down the River Thames",
    "See the Changing of the Guard",
    "Go to Westminster Abbey",
    "Listen to the chimes of Big Ben",
  ],
  meetingPoint:
    "Meet your guide inside the west entrance of Altab Ali Park. Look for a guide wearing Nick's Holiday attire.",
};

export const tours = [
  {
    ...commonTourInfo,
    id: 1,
    image: activity1,
    gallery: [activity1, activity2, activity3, activity4, activity5, activity6],
    title: "Westminster to Greenwich River Thames",
    location: "London",
    price: "$35.00",
    description:
      "Enjoy a relaxing river journey from Westminster to Greenwich while seeing London’s famous landmarks from the water. This activity is suitable for families, couples, and travelers who want a comfortable city tour experience.",
  },
  {
    ...commonTourInfo,
    id: 2,
    image: activity2,
    gallery: [activity2, activity1, activity3, activity4, activity7, activity8],
    title: "London River Cruise Adventure",
    location: "London",
    price: "$42.00",
    description:
      "Explore London through a scenic river cruise adventure. You will enjoy city views, comfortable transport, and a friendly guide who explains the history of famous landmarks.",
  },
  {
    ...commonTourInfo,
    id: 3,
    image: activity3,
    gallery: [activity3, activity2, activity1, activity4, activity5, activity8],
    title: "Greenwich Sightseeing Tour",
    location: "Greenwich",
    price: "$50.00",
    description:
      "Discover Greenwich and its riverside atmosphere with a guided sightseeing experience. This tour is perfect for travelers who enjoy history, architecture, and beautiful photo spots.",
  },
  {
    ...commonTourInfo,
    id: 4,
    image: activity4,
    gallery: [activity4, activity1, activity2, activity3, activity6, activity7],
    title: "Thames Family Holiday Trip",
    location: "London",
    price: "$42.00",
    description:
      "A family-friendly holiday trip along the Thames. Enjoy a safe, comfortable, and memorable travel experience designed for families and small groups.",
  },
  {
    ...commonTourInfo,
    id: 5,
    image: activity5,
    gallery: [activity5, activity1, activity2, activity3, activity4, activity8],
    title: "London Water Activity Package",
    location: "London",
    price: "$35.00",
    description:
      "A simple and enjoyable water activity package for travelers who want to see London from a different perspective. Great for groups, families, and first-time visitors.",
  },
  {
    ...commonTourInfo,
    id: 6,
    image: activity6,
    gallery: [activity6, activity5, activity4, activity3, activity2, activity1],
    title: "Private River Tour London",
    location: "London",
    price: "$45.00",
    description:
      "Enjoy a more private river tour experience with personal comfort and premium travel support. This package is ideal for travelers who want a quieter and more flexible trip.",
  },
  {
    ...commonTourInfo,
    id: 7,
    image: activity7,
    gallery: [activity7, activity8, activity1, activity2, activity3, activity4],
    title: "City Cruise Travel Experience",
    location: "London",
    price: "$55.00",
    description:
      "A relaxing city cruise experience created for travelers who want a memorable tour with beautiful views, local insights, and comfortable facilities.",
  },
  {
    ...commonTourInfo,
    id: 8,
    image: activity8,
    gallery: [activity8, activity7, activity6, activity5, activity4, activity3],
    title: "London Family River Tour",
    location: "London",
    price: "$60.00",
    description:
      "A comfortable family river tour package for customers who want a safe and memorable holiday. Suitable for families, small groups, and casual travelers.",
  },
];

export function getTourById(id) {
  return tours.find((tour) => String(tour.id) === String(id));
}

export function parsePrice(price) {
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
}

export function formatUSD(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}