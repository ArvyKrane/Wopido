export interface CityLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

// Backward compatibility alias
export type PuneLocation = CityLocation;

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
  category: string;
  driverName: string;
  vehicle: string;
  regNo: string;
  fare: number;
  status: 'completed' | 'cancelled';
  rating?: number;
  driverRating?: number;
  duration?: number;
  paymentMethod?: string;
}

export interface RideCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  multiplier: number;
  eta: string;
}

// Rourkela, Odisha Locations
export const ROURKELA_LOCATIONS: CityLocation[] = [
  { id: '1', name: 'Rourkela Railway Station', address: 'Station Road, Rourkela 769001', lat: 22.2272, lng: 84.8569 },
  { id: '2', name: 'NIT Rourkela', address: 'National Institute of Technology, Sector 1, Rourkela 769008', lat: 22.2530, lng: 84.9010 },
  { id: '3', name: 'RSP Main Gate (Bisra Square)', address: 'Rourkela Steel Plant Gate, Bisra Chowk, 769011', lat: 22.2245, lng: 84.8722 },
  { id: '4', name: 'Koel Nagar', address: 'Sector 20 / Koel Nagar, Rourkela 769014', lat: 22.2618, lng: 84.8975 },
  { id: '5', name: 'Panposh (Hanuman Vatika)', address: 'Hanuman Vatika Road, Panposh, Rourkela 769004', lat: 22.2355, lng: 84.8080 },
  { id: '6', name: 'Sector 19 (IG Park)', address: 'Indira Gandhi Park, Sector 19, Rourkela 769005', lat: 22.2478, lng: 84.8705 },
  { id: '7', name: 'Chhend Colony', address: 'Chhend Basti / Phase 1, Rourkela 769015', lat: 22.2492, lng: 84.8258 },
  { id: '8', name: 'Uditnagar (ADM Office)', address: 'ADM Office Road, Uditnagar, Rourkela 769012', lat: 22.2338, lng: 84.8436 },
  { id: '9', name: 'Rourkela Airport', address: 'Airport Road, Chhend, Rourkela 769014', lat: 22.2592, lng: 84.8145 },
  { id: '10', name: 'Daily Market (Main Road)', address: 'Main Road, Daily Market, Rourkela 769001', lat: 22.2312, lng: 84.8512 },
];

// Compatibility alias for codebase
export const PUNE_LOCATIONS = ROURKELA_LOCATIONS;

export const DEMO_DRIVERS: DemoDriver[] = [
  { id: 'd1', name: 'Priya Sharma', phone: '+91 98765 43210', rating: 4.9, totalRides: 847, vehicle: 'Honda Activa 6G', regNo: 'OD14-DEMO-1234', category: 'bike', verified: true, photo: null },
  { id: 'd2', name: 'Sneha Mohanty', phone: '+91 87654 32109', rating: 4.7, totalRides: 523, vehicle: 'TVS Jupiter', regNo: 'OD14-DEMO-5678', category: 'bike', verified: true, photo: null },
  { id: 'd3', name: 'Kavya Das', phone: '+91 76543 21098', rating: 4.8, totalRides: 1203, vehicle: 'Bajaj RE Auto', regNo: 'OD14-DEMO-9012', category: 'auto', verified: true, photo: null },
  { id: 'd4', name: 'Meera Patnaik', phone: '+91 65432 10987', rating: 4.6, totalRides: 391, vehicle: 'Maruti Swift Dzire', regNo: 'OD14-DEMO-3456', category: 'cab', verified: true, photo: null },
  { id: 'd5', name: 'Ananya Behera', phone: '+91 54321 09876', rating: 4.8, totalRides: 712, vehicle: 'Hyundai Aura', regNo: 'OD14-DEMO-7890', category: 'cab', verified: true, photo: null },
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
    home: { name: 'Home', address: 'Koel Nagar, Rourkela 769014', lat: 22.2618, lng: 84.8975 },
    work: { name: 'Work', address: 'NIT Rourkela, Sector 1, 769008', lat: 22.2530, lng: 84.9010 },
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
    pickupName: 'Rourkela Railway Station',
    dropName: 'NIT Rourkela',
    pickupAddress: 'Station Road, Rourkela 769001',
    dropAddress: 'Sector 1, Rourkela 769008',
    distanceKm: 6.8,
    category: 'bike',
    driverName: 'Priya Sharma',
    vehicle: 'Honda Activa 6G',
    regNo: 'OD14-DEMO-1234',
    fare: 98.4,
    status: 'completed',
    rating: 5,
    driverRating: 4.9,
    duration: 16,
  },
  {
    id: 'ride-002',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    pickupName: 'Panposh (Hanuman Vatika)',
    dropName: 'Rourkela Airport',
    pickupAddress: 'Hanuman Vatika Road, 769004',
    dropAddress: 'Airport Road, Chhend, 769014',
    distanceKm: 5.2,
    category: 'auto',
    driverName: 'Kavya Das',
    vehicle: 'Bajaj RE Auto',
    regNo: 'OD14-DEMO-9012',
    fare: 94.6,
    status: 'completed',
    rating: 5,
    driverRating: 4.8,
    duration: 14,
  },
  {
    id: 'ride-003',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    pickupName: 'Chhend Colony',
    dropName: 'Sector 19 (IG Park)',
    pickupAddress: 'Chhend Phase 1, 769015',
    dropAddress: 'Sector 19, Rourkela 769005',
    distanceKm: 7.1,
    category: 'cab',
    driverName: 'Meera Patnaik',
    vehicle: 'Maruti Swift Dzire',
    regNo: 'OD14-DEMO-3456',
    fare: 182.0,
    status: 'completed',
    rating: 4,
    driverRating: 4.6,
    duration: 20,
  },
  {
    id: 'ride-004',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    pickupName: 'Uditnagar',
    dropName: 'Koel Nagar',
    pickupAddress: 'ADM Office Road, 769012',
    dropAddress: 'Sector 20, 769014',
    distanceKm: 6.4,
    category: 'bike',
    driverName: 'Sneha Mohanty',
    vehicle: 'TVS Jupiter',
    regNo: 'OD14-DEMO-5678',
    fare: 92.8,
    status: 'completed',
    rating: 5,
    driverRating: 4.7,
    duration: 15,
  },
  {
    id: 'ride-005',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    pickupName: 'Daily Market',
    dropName: 'NIT Rourkela',
    pickupAddress: 'Main Road, 769001',
    dropAddress: 'Sector 1, 769008',
    distanceKm: 7.5,
    category: 'auto',
    driverName: 'Kavya Das',
    vehicle: 'Bajaj RE Auto',
    regNo: 'OD14-DEMO-9012',
    fare: 124.0,
    status: 'cancelled',
    driverRating: 4.8,
    duration: 18,
  },
];

export function getRandomPuneLocation(): CityLocation {
  const idx = Math.floor(Math.random() * ROURKELA_LOCATIONS.length);
  return ROURKELA_LOCATIONS[idx];
}

export function getRandomDriver(category?: string): DemoDriver {
  const filtered = category
    ? DEMO_DRIVERS.filter((d) => d.category === category)
    : DEMO_DRIVERS;
  const list = filtered.length > 0 ? filtered : DEMO_DRIVERS;
  return list[Math.floor(Math.random() * list.length)];
}
