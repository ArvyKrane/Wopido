export const APP_NAME = 'Wopido';
export const APP_TAGLINE = 'Women-First Rides';
export const APP_VERSION = '1.0.0';

export const RIDE_STATUS = {
  IDLE: 'idle',
  SEARCHING: 'searching',
  DRIVER_ARRIVING: 'driver_arriving',
  DRIVER_ARRIVED: 'driver_arrived',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type RideStatus = typeof RIDE_STATUS[keyof typeof RIDE_STATUS];

export const RIDE_STATUS_LABELS: Record<RideStatus, string> = {
  idle: 'Ready',
  searching: 'Searching for driver...',
  driver_arriving: 'Driver on the way',
  driver_arrived: 'Driver has arrived',
  in_progress: 'Ride in progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const RIDE_STATUS_COLORS: Record<RideStatus, string> = {
  idle: 'gray',
  searching: 'blue',
  driver_arriving: 'yellow',
  driver_arrived: 'green',
  in_progress: 'purple',
  completed: 'green',
  cancelled: 'red',
};

export const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash', icon: '💵' },
  { id: 'upi', label: 'UPI', icon: '📱' },
  { id: 'card', label: 'Card', icon: '💳' },
] as const;

export const SAFETY_TIPS = [
  'Share your trip with a trusted contact before every ride.',
  'Always verify the driver name, photo and vehicle number before boarding.',
  'Use the in-app SOS button in case of emergency.',
  'Sit in the back seat for added safety.',
  'Trust your instincts — cancel a ride if anything feels off.',
  'Keep your phone charged before starting a journey.',
  'Avoid sharing personal contact info with drivers.',
];

export const DEMO_MODE_ENABLED =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url';

export const GOOGLE_MAPS_ENABLED =
  !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY &&
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY !== 'your_google_maps_api_key';

export const NAV_LINKS = [
  { href: '/', label: 'Home', icon: 'Home' },
  { href: '/rides', label: 'Rides', icon: 'Clock' },
  { href: '/safety', label: 'Safety', icon: 'Shield' },
  { href: '/profile', label: 'Profile', icon: 'User' },
] as const;

export const SUPPORT_EMAIL = 'support@wopido.com';
export const SUPPORT_PHONE = '+91 1800-WOPIDO';
