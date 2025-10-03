export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      feature_requests: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          first_seen_at: string
          id: string
          interest_score: number | null
          last_seen_at: string
          mention_count: number
          priority: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          first_seen_at?: string
          id?: string
          interest_score?: number | null
          last_seen_at?: string
          mention_count?: number
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          first_seen_at?: string
          id?: string
          interest_score?: number | null
          last_seen_at?: string
          mention_count?: number
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          author_id: string | null
          author_name: string | null
          created_at: string
          external_id: string | null
          external_url: string | null
          id: string
          integration_id: string | null
          metadata: Json | null
          processed_at: string | null
          rating: number | null
          raw_text: string
          sentiment: Database["public"]["Enums"]["sentiment_type"] | null
          sentiment_score: number | null
          source: Database["public"]["Enums"]["feedback_source"]
          user_id: string
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          created_at?: string
          external_id?: string | null
          external_url?: string | null
          id?: string
          integration_id?: string | null
          metadata?: Json | null
          processed_at?: string | null
          rating?: number | null
          raw_text: string
          sentiment?: Database["public"]["Enums"]["sentiment_type"] | null
          sentiment_score?: number | null
          source: Database["public"]["Enums"]["feedback_source"]
          user_id: string
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          created_at?: string
          external_id?: string | null
          external_url?: string | null
          id?: string
          integration_id?: string | null
          metadata?: Json | null
          processed_at?: string | null
          rating?: number | null
          raw_text?: string
          sentiment?: Database["public"]["Enums"]["sentiment_type"] | null
          sentiment_score?: number | null
          source?: Database["public"]["Enums"]["feedback_source"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_themes: {
        Row: {
          confidence_score: number | null
          created_at: string
          feature_request_id: string | null
          feedback_id: string
          id: string
          pain_point_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          feature_request_id?: string | null
          feedback_id: string
          id?: string
          pain_point_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          feature_request_id?: string | null
          feedback_id?: string
          id?: string
          pain_point_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_themes_feature_request_id_fkey"
            columns: ["feature_request_id"]
            isOneToOne: false
            referencedRelation: "feature_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_themes_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "feedback"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_themes_pain_point_id_fkey"
            columns: ["pain_point_id"]
            isOneToOne: false
            referencedRelation: "pain_points"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          config: Json | null
          created_at: string
          id: string
          is_connected: boolean
          last_synced_at: string | null
          source: Database["public"]["Enums"]["feedback_source"]
          updated_at: string
          user_id: string
        }
        Insert: {
          config?: Json | null
          created_at?: string
          id?: string
          is_connected?: boolean
          last_synced_at?: string | null
          source: Database["public"]["Enums"]["feedback_source"]
          updated_at?: string
          user_id: string
        }
        Update: {
          config?: Json | null
          created_at?: string
          id?: string
          is_connected?: boolean
          last_synced_at?: string | null
          source?: Database["public"]["Enums"]["feedback_source"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pain_points: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          first_seen_at: string
          id: string
          last_seen_at: string
          mention_count: number
          priority: string | null
          sentiment_score: number | null
          title: string
          trend_direction: string | null
          trend_percentage: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          first_seen_at?: string
          id?: string
          last_seen_at?: string
          mention_count?: number
          priority?: string | null
          sentiment_score?: number | null
          title: string
          trend_direction?: string | null
          trend_percentage?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          first_seen_at?: string
          id?: string
          last_seen_at?: string
          mention_count?: number
          priority?: string | null
          sentiment_score?: number | null
          title?: string
          trend_direction?: string | null
          trend_percentage?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      feedback_source:
        | "google_play"
        | "apple_store"
        | "csv_upload"
        | "twitter"
        | "other"
      sentiment_type: "positive" | "neutral" | "negative"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      feedback_source: [
        "google_play",
        "apple_store",
        "csv_upload",
        "twitter",
        "other",
      ],
      sentiment_type: ["positive", "neutral", "negative"],
    },
  },
} as const
