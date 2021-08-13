addEventListener('fetch', event => {
  event.respondWith(handleRequest())
})

async function handleRequest() {
  const data = {
    ppc_usd: await peercoin_kv.get("ppc_usd")
  }
  const json = JSON.stringify(data, null, 2)

  return new Response(json, {
    headers: { 'content-type': 'application/json' },
  })
}
