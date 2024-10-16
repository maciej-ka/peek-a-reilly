const rand = (array) => {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
};

const collectionRegExp = /\/playlists\/([^\/]+)/;
const bookRegExp = /\/library\/view\/[^\/]+\/([^\/]+)\/$/;

const getPageType = () => {
  const path = location.pathname
  if (path.match(bookRegExp)) return 'book'
  if (path.startsWith('/library/view/')) return 'reader'
  if (path.startsWith('/search/')) return 'search'
  if (path.match(collectionRegExp)) return 'collection'
  return 'other'
}

const getCollectionId = () => location.pathname.match(collectionRegExp)?.[1]
const getBookId = () => location.pathname.match(bookRegExp)?.[1]

const fetchJson = (path) => fetch(`https://learning.oreilly.com${path}`).then(x => x.json());

const peekChapterUrl = async (bookPath) => {
  const res = await fetchJson(bookPath);
  const chapter = rand(res.chapters).split('/chapter/').pop();
  return res.web_url + chapter;
};

const getSearchBooks = async () => {
  const stdOptions = 'tzOffset=-2&aia_only=false&feature_flags=improveSearchFilters&report=true&isTopics=false';
  res = await fetchJson(`/search/api/search/${location.search}&${stdOptions}`);
  return res.data.products.map(({ product_id }) => `/api/v1/book/${product_id}`)
}

const getCollectionBooks = async (filterCollections = Boolean) => {
  const res = await fetchJson("/api/v3/collections/");
  const collections = res.filter(filterCollections);
  const filterSections = (entries) => entries.filter(({ content_type }) => content_type !== 'SECTION')
  const parseBooks = (collection) => filterSections(collection.content).map(b => b.api_url);
  return collections.reduce((acc, col) => [...acc, ...parseBooks(col)], []);
};

const getLastBookPaths = () => JSON.parse(localStorage.getItem("lastBookPaths"));
const setLastBookPaths = (bookPaths) => localStorage.setItem("lastBookPaths", JSON.stringify(bookPaths));

const getBookPaths = async () => {
  const sources = {
    book: () => [`/api/v1/book/${getBookId()}`],
    reader: getLastBookPaths,
    search: getSearchBooks,
    collection: () => getCollectionBooks(c => c.id === getCollectionId()),
    other: getCollectionBooks
  }
  const result = await sources[getPageType()]();
  setLastBookPaths(result);
  return result;
}

const peekBook = async () => {
  const bookPaths = await getBookPaths();
  window.location.href = await peekChapterUrl(rand(bookPaths));
};

const peekScroll = () => window.scrollTo(0, document.body.offsetHeight * Math.random())

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
    getPageType() === 'reader' &&
    event.key === 's' &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  ) {
    peekScroll();
  }
});

