export default {
  async fetch(request, env, context) {
    const cacheUrl = new URL(
      "https://peercoinexplorer.net/price-ticker"
    );
    const cacheKey = new Request(cacheUrl.toString(), request);
    const cache = await caches.default;
    let response = await cache.match(cacheKey);

    if (!response) {
      console.log(
        `Response not present in cache. Fetching and caching request.`
      );
      const data = await env.peercoin_kv.get("prices", { type: "json" });
      const json = JSON.stringify(data, null, 2);

      response = new Response(json, {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      response.headers.append("Expires", getCachExipres());
      context.waitUntil(cache.put(cacheKey, response.clone()));
    } else {
      console.log(`Cache hit`);
    }
    return response;
  },
};

function getCachExipres() {
  const dt = new Date();
  dt.setHours(dt.getHours() + 1);
  dt.setMinutes(1, 0, 0);
  return dt;
}
