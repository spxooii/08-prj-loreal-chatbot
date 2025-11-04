export default {
    async fetch(request, env) {
      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      };
  
      if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
      }
  
      try {
        const apiKey = env.OPENAI_API_KEY;
        const apiUrl = "https://api.openai.com/v1/chat/completions";
        const userInput = await request.json();
  
        const requestBody = {
          model: "gpt-4o",
          messages: userInput.messages,
          max_tokens: 300,  
          temperature: 0.4,
        };
  
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
  
        const data = await response.text();
        return new Response(data, { status: response.status, headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    },
  };
  