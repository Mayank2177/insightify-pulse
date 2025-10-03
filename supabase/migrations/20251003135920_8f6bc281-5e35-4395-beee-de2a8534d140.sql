-- Create enum for feedback sources
CREATE TYPE feedback_source AS ENUM ('google_play', 'apple_store', 'csv_upload', 'twitter', 'other');

-- Create enum for sentiment
CREATE TYPE sentiment_type AS ENUM ('positive', 'neutral', 'negative');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email text,
  full_name text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create integrations table
CREATE TABLE public.integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  source feedback_source NOT NULL,
  is_connected boolean DEFAULT false NOT NULL,
  config jsonb DEFAULT '{}'::jsonb,
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own integrations"
  ON public.integrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own integrations"
  ON public.integrations FOR ALL
  USING (auth.uid() = user_id);

-- Create feedback table
CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  integration_id uuid REFERENCES public.integrations(id) ON DELETE CASCADE,
  source feedback_source NOT NULL,
  raw_text text NOT NULL,
  sentiment sentiment_type,
  sentiment_score decimal(3, 2),
  author_name text,
  author_id text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  external_id text,
  external_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  processed_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own feedback"
  ON public.feedback FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own feedback"
  ON public.feedback FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX idx_feedback_user_id ON public.feedback(user_id);
CREATE INDEX idx_feedback_sentiment ON public.feedback(sentiment);
CREATE INDEX idx_feedback_created_at ON public.feedback(created_at DESC);

-- Create pain_points table
CREATE TABLE public.pain_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  mention_count integer DEFAULT 0 NOT NULL,
  sentiment_score decimal(3, 2),
  trend_direction text CHECK (trend_direction IN ('up', 'down', 'stable')),
  trend_percentage decimal(5, 2),
  category text,
  priority text CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  first_seen_at timestamptz DEFAULT now() NOT NULL,
  last_seen_at timestamptz DEFAULT now() NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.pain_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pain points"
  ON public.pain_points FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own pain points"
  ON public.pain_points FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX idx_pain_points_user_id ON public.pain_points(user_id);
CREATE INDEX idx_pain_points_mention_count ON public.pain_points(mention_count DESC);

-- Create feature_requests table
CREATE TABLE public.feature_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  mention_count integer DEFAULT 0 NOT NULL,
  interest_score decimal(3, 2),
  category text,
  priority text CHECK (priority IN ('low', 'medium', 'high')),
  status text CHECK (status IN ('new', 'under_review', 'planned', 'in_progress', 'completed', 'rejected')) DEFAULT 'new',
  first_seen_at timestamptz DEFAULT now() NOT NULL,
  last_seen_at timestamptz DEFAULT now() NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.feature_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own feature requests"
  ON public.feature_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own feature requests"
  ON public.feature_requests FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX idx_feature_requests_user_id ON public.feature_requests(user_id);
CREATE INDEX idx_feature_requests_mention_count ON public.feature_requests(mention_count DESC);

-- Create feedback_themes junction table (links feedback to pain points/features)
CREATE TABLE public.feedback_themes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id uuid REFERENCES public.feedback(id) ON DELETE CASCADE NOT NULL,
  pain_point_id uuid REFERENCES public.pain_points(id) ON DELETE CASCADE,
  feature_request_id uuid REFERENCES public.feature_requests(id) ON DELETE CASCADE,
  confidence_score decimal(3, 2),
  created_at timestamptz DEFAULT now() NOT NULL,
  CHECK (
    (pain_point_id IS NOT NULL AND feature_request_id IS NULL) OR
    (pain_point_id IS NULL AND feature_request_id IS NOT NULL)
  )
);

ALTER TABLE public.feedback_themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view feedback themes through feedback"
  ON public.feedback_themes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.feedback
      WHERE feedback.id = feedback_themes.feedback_id
      AND feedback.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage feedback themes through feedback"
  ON public.feedback_themes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.feedback
      WHERE feedback.id = feedback_themes.feedback_id
      AND feedback.user_id = auth.uid()
    )
  );

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at
  BEFORE UPDATE ON public.integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pain_points_updated_at
  BEFORE UPDATE ON public.pain_points
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feature_requests_updated_at
  BEFORE UPDATE ON public.feature_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();