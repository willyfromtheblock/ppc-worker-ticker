addEventListener('fetch', (event) => {
  event.respondWith(handleRequest())
})

async function handleRequest() {
  const data = await peercoin_kv.get('prices', { type: 'json' })
  const json = JSON.stringify(data, null, 2)

  return new Response(json, {
    headers: { 'content-type': 'application/json' },
  })
}
