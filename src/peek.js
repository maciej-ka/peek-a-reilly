const collections = await fetch("https://learning.oreilly.com/api/v3/collections/", {
  "headers": {
    "accept": "application/json",
    "accept-language": "en-US,en;q=0.9,de;q=0.8,pl;q=0.7",
    "content-type": "application/json",
    "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": process.env.COOKIE,
    "Referer": "https://learning.oreilly.com/playlists/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}).then(res => res.json())
  .then(res => {
    console.log(res);
    console.log(JSON.stringify(res))
  });
