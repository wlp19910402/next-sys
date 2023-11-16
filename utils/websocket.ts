function fetchWebSocket(handleMessage: (e: any) => void) {
  const ws = new WebSocket(
    process.env.NEXT_PUBLIC_WS_URL ? process.env.NEXT_PUBLIC_WS_URL : ''
  )

  const init = () => {
    bindEvent()
  }
  function bindEvent() {
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', wsHandleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
  }
  function wsHeartbeat() {
    // ws.send(
    //   JSON.stringify({
    //     cmd: 1,
    //   })
    // );
  }
  function handleOpen(e: any) {
    // console.log('WebSocket open', e)
    // setInterval(wsHeartbeat, 30000);
  }
  function wsHandleClose() {
    console.log('WebSocket close', new Date())
  }
  function handleError(e: any) {
    console.log('WebSocket error')
    setTimeout(async () => {
      await ws.close()
      await fetchWebSocket(() => {})
    }, 1000)
  }
  init()

  return ws
}

export { fetchWebSocket }
