addEventListener('fetch', (event) => {
  event.respondWith(handleRequest())
})

async function handleRequest() {
  const ppc_data = {
    PPC: parseFloat(await peercoin_kv.get('PPC_USD')),
  }
  const fiat_data = await peercoin_kv.get('FIAT_USD', { type: 'json' })
  const data = Object.assign(ppc_data, fiat_data)
  const json = JSON.stringify(data, null, 2)

  return new Response(json, {
    headers: { 'content-type': 'application/json' },
  })
}
