import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { csv_data } = await req.json();

    if (!csv_data) {
      throw new Error('csv_data is required');
    }

    console.log('Processing CSV data...');

    // Parse CSV (simple implementation - assumes header row)
    const lines = csv_data.trim().split('\n');
    const headers = lines[0].split(',').map((h: string) => h.trim().toLowerCase());
    
    // Find relevant columns (flexible matching)
    const textIndex = headers.findIndex((h: string) => 
      h.includes('text') || h.includes('comment') || h.includes('feedback') || h.includes('review')
    );
    const ratingIndex = headers.findIndex((h: string) => 
      h.includes('rating') || h.includes('score') || h.includes('stars')
    );
    const authorIndex = headers.findIndex((h: string) => 
      h.includes('author') || h.includes('name') || h.includes('user')
    );
    const dateIndex = headers.findIndex((h: string) => 
      h.includes('date') || h.includes('time') || h.includes('created')
    );

    if (textIndex === -1) {
      throw new Error('Could not find text/comment/feedback column in CSV');
    }

    const feedbackItems = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length <= textIndex) continue;

      const text = values[textIndex]?.trim();
      if (!text || text.length < 3) continue;

      const feedbackItem: any = {
        user_id: user.id,
        source: 'csv_upload',
        raw_text: text,
      };

      if (ratingIndex !== -1 && values[ratingIndex]) {
        const rating = parseInt(values[ratingIndex]);
        if (!isNaN(rating)) {
          feedbackItem.rating = Math.min(5, Math.max(1, rating));
        }
      }

      if (authorIndex !== -1 && values[authorIndex]) {
        feedbackItem.author_name = values[authorIndex].trim();
      }

      feedbackItems.push(feedbackItem);
    }

    if (feedbackItems.length === 0) {
      throw new Error('No valid feedback found in CSV');
    }

    console.log(`Inserting ${feedbackItems.length} feedback items...`);

    // Insert feedback items
    const { data: insertedFeedback, error: insertError } = await supabase
      .from('feedback')
      .insert(feedbackItems)
      .select();

    if (insertError) {
      console.error('Error inserting feedback:', insertError);
      throw insertError;
    }

    console.log(`Successfully inserted ${insertedFeedback.length} feedback items`);

    return new Response(
      JSON.stringify({ 
        success: true,
        count: insertedFeedback.length,
        feedback: insertedFeedback
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in process-csv:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});