(async () => {
  const webservicesUrl = 'localhost:6000'
  const fetchRes = await fetch(webservicesUrl)

  console.log(fetchRes.ok)

  if (!fetchRes.ok) throw new Error(`HTTP error! Status: ${fetchRes.status}`);
})()
