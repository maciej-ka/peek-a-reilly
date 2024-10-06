# peek-a-reilly
Tool to open random book at random chapter from learning.oreilly.com

# how to use
1. `npm run start`
2. visit [learning oreilly com](learning.oreilly.com)
3. open console, import peek script using:

var tag = document.createElement('script');
tag.setAttribute('src', 'http://127.0.0.1:8080/peek.js');
document.head.appendChild(tag);

