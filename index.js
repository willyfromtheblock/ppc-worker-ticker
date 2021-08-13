addEventListener('fetch', event => {
  event.respondWith(handleRequest())
})

async function handleRequest() {
  const data = {
    PPC_USD: parseFloat(await peercoin_kv.get("PPC_USD"))
  }
  const json = JSON.stringify(data, null, 2)

  return new Response(json, {
    headers: { 'content-type': 'application/json' },
  })
}
