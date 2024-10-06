console.log("peek a reilly, v10")

const rand = (array) => {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
};

const peekSection = () => window.scrollTo(0, document.body.offsetHeight * Math.random())

const peekChapter = async (path) => {
  const res = await fetch(`https://learning.oreilly.com${path}`);
  const json = await res.json();
  const url = json.web_url;
  const chapter = rand(json.chapters).split('/chapter/').pop();
  window.location.href = url + chapter;
};

const peekBook = async () => {
  const res = await fetch("https://learning.oreilly.com/api/v3/collections/");
  const json = await res.json();
  const parseBooks = (collection) => collection.content.map(b => b.api_url);
  const paths = json.reduce((acc, c) => [...acc, ...parseBooks(c)], []);
  peekChapter(rand(paths));
};

document.addEventListener('keydown', (event) => {
  if (
    event.key === 'r' &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  ) {
    peekBook();
  }

  if (
    location.pathname.startsWith('/library/view/') &&
    event.key === 's' &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  ) {
    peekSection();
  }
});

