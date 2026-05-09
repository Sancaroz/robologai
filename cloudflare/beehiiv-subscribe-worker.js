const allowedOrigins = new Set([
  "https://robologai.com",
  "https://www.robologai.com"
]);

function corsHeadersFor(request) {
  const origin = request.headers.get("Origin") || "https://robologai.com";
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://robologai.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function jsonResponse(request, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeadersFor(request),
      "Content-Type": "application/json"
    }
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeadersFor(request) });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || !["/subscribe", "/api/subscribe"].includes(url.pathname)) {
      return jsonResponse(request, { error: "Not found" }, 404);
    }

    if (!env.BEEHIIV_API_KEY) {
      return jsonResponse(request, { error: "Beehiiv API key is not configured." }, 500);
    }

    if (!env.BEEHIIV_PUBLICATION_ID) {
      return jsonResponse(request, { error: "Beehiiv publication ID is not configured." }, 500);
    }

    const payload = await request.json().catch(() => ({}));
    const email = String(payload.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse(request, { error: "Please enter a valid email address." }, 400);
    }

    const beehiivResponse = await fetch(`https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.BEEHIIV_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: "robologai",
        utm_medium: "website",
        utm_campaign: "join_intel_feed"
      })
    });

    if (!beehiivResponse.ok) {
      const detail = await beehiivResponse.text();
      return jsonResponse(request, { error: "Beehiiv subscription failed.", detail }, 502);
    }

    return jsonResponse(request, { ok: true });
  }
};
