const collections = await fetch("https://learning.oreilly.com/api/v3/collections/", {
  "headers": {
    "content-type": "application/json",
    "cookie": process.env.COOKIE,
  },
  "body": null,
  "method": "GET"
}).then(res => res.json())
  .then(res => {
    console.log(res);
    console.log(JSON.stringify(res))
  });
