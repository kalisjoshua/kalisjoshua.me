var fs = require('fs'),

    marked = require('marked');

// create the article object
function articleObject(file) {
  var date,
      text,
      title;

  text = fs.readFileSync('articles/' + file)
    .toString();

  try {
    date = text.match(/##\s([^\n]+)/)[1];
  } catch (err) {
    date = '' + new Date(); // force to the top of the list so it is visible
    console.log('[WARNING] Article has no published date.');
  }

  title = text.match(/#\s([^\n]+)/)[1];

  return {
      body      : text,
      draft     : /\[DRAFT\]/.test(title),
      intro     : intro(text),
      link      : '/articles/' + file.match(/.*(?=\.md$)/),
      published : date,
      tags      : tags(text),
      title     : title
    };
}

// get the first paragraph from the markdown
function intro(text) {

  return marked
    .lexer(text)
    // FIXME: use horizontal rule as indicator of end of intro content
    .reduce(function (found, token) {

      return found ||
        // look for paragraph tokens
        /paragraph/i.test(token.type) &&
        // use the text of the first paragraph as the intro on the index page
        token.text;
    }, false);
}

function tags(text) {

  return marked
    .lexer(text)
    .reduce(function (acc, token) {

      if (/text/i.test(token.type) && /#filter=/i.test(token.text)) {
        acc
          .push(token.text.match(/\[([^\]]+)\]/)[1]);
      }

      return acc;
    }, [])
    .join(', ');
}

module.exports = articleObject;
