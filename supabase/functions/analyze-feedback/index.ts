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

    const { feedback_id, feedback_text } = await req.json();

    if (!feedback_text) {
      throw new Error('feedback_text is required');
    }

    console.log('Analyzing feedback:', feedback_id);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Call Lovable AI for analysis
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an AI feedback analyst. Analyze user feedback and extract:
1. Sentiment (positive, neutral, negative)
2. Sentiment score (0.00 to 1.00, where 0 is most negative, 1 is most positive)
3. Main theme/category
4. Whether it's a pain point or feature request
5. Priority level (low, medium, high, critical)
6. A brief summary

Return ONLY valid JSON in this exact format:
{
  "sentiment": "positive|neutral|negative",
  "sentiment_score": 0.75,
  "category": "category name",
  "is_pain_point": true,
  "is_feature_request": false,
  "priority": "low|medium|high|critical",
  "summary": "brief summary"
}`
          },
          {
            role: 'user',
            content: feedback_text
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_feedback",
              description: "Analyze user feedback and extract structured insights",
              parameters: {
                type: "object",
                properties: {
                  sentiment: { 
                    type: "string", 
                    enum: ["positive", "neutral", "negative"] 
                  },
                  sentiment_score: { 
                    type: "number",
                    minimum: 0,
                    maximum: 1
                  },
                  category: { type: "string" },
                  is_pain_point: { type: "boolean" },
                  is_feature_request: { type: "boolean" },
                  priority: { 
                    type: "string",
                    enum: ["low", "medium", "high", "critical"]
                  },
                  summary: { type: "string" }
                },
                required: ["sentiment", "sentiment_score", "category", "is_pain_point", "is_feature_request", "priority", "summary"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "analyze_feedback" } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    console.log('AI response:', JSON.stringify(aiData));

    const toolCall = aiData.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('No tool call in AI response');
    }

    const analysis = JSON.parse(toolCall.function.arguments);

    // Update feedback with analysis
    if (feedback_id) {
      const { error: updateError } = await supabase
        .from('feedback')
        .update({
          sentiment: analysis.sentiment,
          sentiment_score: analysis.sentiment_score,
          processed_at: new Date().toISOString()
        })
        .eq('id', feedback_id)
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating feedback:', updateError);
      }
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-feedback:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});