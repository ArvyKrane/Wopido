export interface PuneLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface DemoDriver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  totalRides: number;
  vehicle: string;
  regNo: string;
  category: 'bike' | 'auto' | 'cab';
  verified: boolean;
  photo: string | null;
}

export interface DemoRide {
  id: string;
  date: string;
  pickupName: string;
  dropName: string;
  pickupAddress: string;
  dropAddress: string;
  distanceKm: number;
  fare: number;
  status: 'completed' | 'cancelled';
  driverName: string;
  driverRating: number;
  category: string;
  userRating: number | null;
  paymentMethod: string;
  duration: number;
}

export interface RideCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  multiplier: number;
  eta: string;
}

export const PUNE_LOCATIONS: PuneLocation[] = [
  { id: '1', name: 'Pune Railway Station', address: 'Pune Junction, Pune 411001', lat: 18.5285, lng: 73.8744 },
  { id: '2', name: 'Shivajinagar', address: 'Shivajinagar, Pune 411005', lat: 18.5308, lng: 73.8474 },
  { id: '3', name: 'Hinjewadi IT Park', address: 'Hinjewadi Phase 1, Pune 411057', lat: 18.5912, lng: 73.7389 },
  { id: '4', name: 'Koregaon Park', address: 'Koregaon Park, Pune 411001', lat: 18.5362, lng: 73.8938 },
  { id: '5', name: 'FC Road', address: 'Fergusson College Road, Pune 411004', lat: 18.5196, lng: 73.8396 },
  { id: '6', name: 'Viman Nagar', address: 'Viman Nagar, Pune 411014', lat: 18.5679, lng: 73.9143 },
  { id: '7', name: 'Kothrud', address: 'Kothrud, Pune 411038', lat: 18.5074, lng: 73.8077 },
  { id: '8', name: 'Pune Airport', address: 'Lohegaon Airport, Pune 411032', lat: 18.5822, lng: 73.9197 },
  { id: '9', name: 'Magarpatta City', address: 'Magarpatta, Hadapsar, Pune 411013', lat: 18.5125, lng: 73.9302 },
  { id: '10', name: 'Baner Road', address: 'Baner, Pune 411045', lat: 18.5590, lng: 73.7868 },
];

export const DEMO_DRIVERS: DemoDriver[] = [
  { id: 'd1', name: 'Priya Sharma', phone: '+91 98765 43210', rating: 4.9, totalRides: 847, vehicle: 'Honda Activa 6G', regNo: 'MH12-DEMO-1234', category: 'bike', verified: true, photo: null },
  { id: 'd2', name: 'Sneha Patil', phone: '+91 87654 32109', rating: 4.7, totalRides: 523, vehicle: 'TVS Jupiter', regNo: 'MH12-DEMO-5678', category: 'bike', verified: true, photo: null },
  { id: 'd3', name: 'Kavya Nair', phone: '+91 76543 21098', rating: 4.8, totalRides: 1203, vehicle: 'Bajaj RE Auto', regNo: 'MH12-DEMO-9012', category: 'auto', verified: true, photo: null },
  { id: 'd4', name: 'Meera Iyer', phone: '+91 65432 10987', rating: 4.6, totalRides: 391, vehicle: 'Maruti Swift Dzire', regNo: 'MH12-DEMO-3456', category: 'cab', verified: true, photo: null },
  { id: 'd5', name: 'Anjali Desai', phone: '+91 54321 09876', rating: 4.8, totalRides: 712, vehicle: 'Hyundai Aura', regNo: 'MH12-DEMO-7890', category: 'cab', verified: true, photo: null },
];

export const RIDE_CATEGORIES: RideCategory[] = [
  { id: 'bike', name: 'Bike', icon: '🛵', description: 'Quick & affordable', multiplier: 1.0, eta: '3-5 min' },
  { id: 'auto', name: 'Auto', icon: '🛺', description: 'Comfortable auto ride', multiplier: 1.4, eta: '5-8 min' },
  { id: 'cab', name: 'Cab', icon: '🚖', description: 'AC cab for long routes', multiplier: 2.2, eta: '8-12 min' },
];

export const DEMO_USER = {
  id: 'demo-user-001',
  name: 'Ananya Singh',
  email: 'ananya@example.com',
  phone: '+91 99887 76655',
  avatar: null,
  savedLocations: {
    home: { name: 'Home', address: 'Koregaon Park, Pune 411001', lat: 18.5362, lng: 73.8938 },
    work: { name: 'Work', address: 'Hinjewadi IT Park, Pune 411057', lat: 18.5912, lng: 73.7389 },
  },
  emergencyContacts: [
    { id: 'ec1', name: 'Mom', phone: '+91 98765 11111', relation: 'Mother' },
    { id: 'ec2', name: 'Sister', phone: '+91 87654 22222', relation: 'Sister' },
  ],
};

export const DEMO_RIDES: DemoRide[] = [
  {
    id: 'ride-001',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    pickupName: 'Pune Railway Station',
    dropName: 'Koregaon Park',
    pickupAddress: 'Pune Junction, Pune 411001',
    dropAddress: 'Koregaon Park, Pune 411001',
    distanceKm: 5.8,
    fare: 82.64,
    status: 'completed',
    driverName: 'Priya Sharma',
    driverRating: 4.9,
    category: 'bike',
    userRating: 5,
    paymentMethod: 'UPI',
    duration: 18,
  },
  {
    id: 'ride-002',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    pickupName: 'Hinjewadi IT Park',
    dropName: 'Baner Road',
    pickupAddress: 'Hinjewadi Phase 1, Pune 411057',
    dropAddress: 'Baner, Pune 411045',
    distanceKm: 8.2,
    fare: 183.76,
    status: 'completed',
    driverName: 'Meera Iyer',
    driverRating: 4.6,
    category: 'cab',
    userRating: 4,
    paymentMethod: 'Cash',
    duration: 25,
  },
  {
    id: 'ride-003',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    pickupName: 'FC Road',
    dropName: 'Viman Nagar',
    pickupAddress: 'Fergusson College Road, Pune 411004',
    dropAddress: 'Viman Nagar, Pune 411014',
    distanceKm: 7.1,
    fare: 96.86,
    status: 'completed',
    driverName: 'Kavya Nair',
    driverRating: 4.8,
    category: 'auto',
    userRating: 5,
    paymentMethod: 'UPI',
    duration: 22,
  },
  {
    id: 'ride-004',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    pickupName: 'Kothrud',
    dropName: 'Shivajinagar',
    pickupAddress: 'Kothrud, Pune 411038',
    dropAddress: 'Shivajinagar, Pune 411005',
    distanceKm: 4.3,
    fare: 58.3,
    status: 'cancelled',
    driverName: 'Sneha Patil',
    driverRating: 4.7,
    category: 'bike',
    userRating: null,
    paymentMethod: 'Cash',
    duration: 0,
  },
  {
    id: 'ride-005',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    pickupName: 'Magarpatta City',
    dropName: 'Pune Airport',
    pickupAddress: 'Magarpatta, Hadapsar, Pune 411013',
    dropAddress: 'Lohegaon Airport, Pune 411032',
    distanceKm: 12.4,
    fare: 287.64,
    status: 'completed',
    driverName: 'Anjali Desai',
    driverRating: 4.8,
    category: 'cab',
    userRating: 5,
    paymentMethod: 'Card',
    duration: 35,
  },
];

export function getRandomDriver(category: string): DemoDriver {
  const drivers = DEMO_DRIVERS.filter((d) => d.category === category);
  const pool = drivers.length > 0 ? drivers : DEMO_DRIVERS;
  return pool[Math.floor(Math.random() * pool.length)];
}
