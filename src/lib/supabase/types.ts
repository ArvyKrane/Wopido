// Database types for Supabase schema
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          email: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          email?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          email?: string | null;
        };
      };
      rides: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          driver_id: string | null;
          pickup_address: string;
          pickup_lat: number;
          pickup_lng: number;
          drop_address: string;
          drop_lat: number;
          drop_lng: number;
          status: string;
          category: string;
          fare: number | null;
          distance_km: number | null;
          payment_method: string;
          user_rating: number | null;
          driver_rating: number | null;
          started_at: string | null;
          completed_at: string | null;
          cancelled_at: string | null;
          cancellation_reason: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          driver_id?: string | null;
          pickup_address: string;
          pickup_lat: number;
          pickup_lng: number;
          drop_address: string;
          drop_lat: number;
          drop_lng: number;
          status?: string;
          category: string;
          fare?: number | null;
          distance_km?: number | null;
          payment_method?: string;
          user_rating?: number | null;
          driver_rating?: number | null;
          started_at?: string | null;
          completed_at?: string | null;
          cancelled_at?: string | null;
          cancellation_reason?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          driver_id?: string | null;
          pickup_address?: string;
          pickup_lat?: number;
          pickup_lng?: number;
          drop_address?: string;
          drop_lat?: number;
          drop_lng?: number;
          status?: string;
          category?: string;
          fare?: number | null;
          distance_km?: number | null;
          payment_method?: string;
          user_rating?: number | null;
          driver_rating?: number | null;
          started_at?: string | null;
          completed_at?: string | null;
          cancelled_at?: string | null;
          cancellation_reason?: string | null;
        };
      };
      emergency_contacts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          phone: string;
          relation: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          phone: string;
          relation: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          phone?: string;
          relation?: string;
          created_at?: string;
        };
      };
      saved_locations: {
        Row: {
          id: string;
          user_id: string;
          label: string;
          address: string;
          lat: number;
          lng: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          label: string;
          address: string;
          lat: number;
          lng: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          label?: string;
          address?: string;
          lat?: number;
          lng?: number;
          created_at?: string;
        };
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
      ride_status: 'searching' | 'driver_arriving' | 'driver_arrived' | 'in_progress' | 'completed' | 'cancelled';
      ride_category: 'bike' | 'auto' | 'cab';
    };
  };
}
