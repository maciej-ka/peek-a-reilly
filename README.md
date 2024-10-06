# peek-a-reilly
Open random chapter from learning.oreilly.com user collection

# how to use
visit [learning oreilly com](learning.oreilly.com)

open developer tools, paste:
```js
const rand = (array) => {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

const peekChapter = async (path) => {
  const res = await fetch(`https://learning.oreilly.com${path}`);
  const json = await res.json();
  const url = json.web_url;
  const chapter = rand(json.chapters).split('/chapter/').pop()
  console.log(url+chapter);
}

const peekBook = async () => {
  const res = await fetch("https://learning.oreilly.com/api/v3/collections/");
  const json = await res.json();
  const parseBooks = (collection) => collection.content.map(b => b.api_url);
  const paths = json.reduce((acc, c) => [...acc, ...parseBooks(c)], []);
  peekChapter(rand(paths));
}

peekBook()
```

a link to random chapter of a random book from user collection will be returned

after opening, to scroll to random section:
`window.scrollTo(0, document.body.offsetHeight * Math.random())`
