const rand = (array) => {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
};

const getCollectionId = () => {
  const split = location.pathname.split('/')
  return split[1] === 'playlists'
    ? split[2]
    : false
}

const peekScroll = () => window.scrollTo(0, document.body.offsetHeight * Math.random())

const peekChapter = async (path) => {
  const res = await fetch(`https://learning.oreilly.com${path}`);
  const json = await res.json();
  const url = json.web_url;
  const chapter = rand(json.chapters).split('/chapter/').pop();
  window.location.href = url + chapter;
};

const peekBook = async () => {
  const res = await fetch("https://learning.oreilly.com/api/v3/collections/");
  let json = await res.json();
  const filterSections = (entries) => entries.filter(({ content_type }) => content_type !== 'SECTION')
  const parseBooks = (collection) => filterSections(collection.content).map(b => b.api_url);

  const collectionId = getCollectionId()
  if (collectionId) {
    json = json.filter(({ id }) => collectionId === id)
  }

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
    peekScroll();
  }
});

