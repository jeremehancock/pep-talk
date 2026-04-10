const PEP_TALKS = [
  "You're doing better than you think. The fact that you're worried about it proves you care.",
  "Progress isn't always loud. Sometimes it's just showing up again.",
  "That thing you've been putting off? It'll take less time than you fear. Go.",
  "You don't need to feel ready. You need to start. Ready shows up later.",
  "Future-you is cheering for present-you. Don't let them down — but also, they forgive you.",
  "Rest isn't the opposite of progress. It's part of it.",
  "Every expert you admire was once exactly where you are, wondering if they were cut out for it.",
  "You've survived 100% of your worst days so far. Track record's pretty good.",
  "The gap between where you are and where you want to be is closed one small, boring step at a time.",
  "Comparison is a thief. Run your own race at your own pace.",
  "You're allowed to change your mind. You're allowed to try again. You're allowed to begin.",
  "Done imperfectly beats perfect-in-your-head every single time.",
  "Today doesn't have to be a masterpiece. It just has to happen.",
  "The person you're becoming is proud of the person you are right now for not giving up.",
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/peptalk") {
      const talk = PEP_TALKS[Math.floor(Math.random() * PEP_TALKS.length)];
      return Response.json({
        message: talk,
        timestamp: new Date().toISOString(),
      });
    }

    // Any other /api/* path → 404 JSON
    if (url.pathname.startsWith("/api/")) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    // Non-API requests fall through to static assets (the React app)
    return new Response(null, { status: 404 });
  },
};
