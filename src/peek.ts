export type Collection = {
  [key: string]: any;
  content: {
    api_url: string;
    [key: string]: any;
  }[]
}

const queryCollection = () =>
  fetch("https://learning.oreilly.com/api/v3/collections/", {
    headers: new Headers({
      "content-type": "application/json",
      "cookie": process.env.COOKIE || "",
    }),
  })
  .then(res => res.json())

const parseCollectionsBooks(collections) {
}

const getCollectionBooks = async () => {
  if (!process.env.COOKIE) { return {} }
  const books = await queryCollection().then(parseCollectionsBooks)
}
