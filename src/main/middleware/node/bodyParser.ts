  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.write(JSON.stringify(responseBody)