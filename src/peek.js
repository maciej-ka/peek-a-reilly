console.log("hello, v4")

const run = () =>
  fetch("https://learning.oreilly.com/api/v3/collections/")
  .then(res => res.json())
  .then(console.log)

run()
