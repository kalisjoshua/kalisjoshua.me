/*jshint laxcomma:true*/

$.fn.ready(function () {
  var $articles = $('article')
    , $tagsFilter = $('.tagsFilter')

    , hash = window.location.hash
    , tags = [];

  if (hash && /=/.test(hash)) {
    tags = hash
      .match(/^#filter=(.*)?$/)
      .pop()
      .split(',');
  }

  $articles
    .each(function tagsTextToLinks (indx) {
      var article,
          blockTags,
          tagsBlock;

      article = $(this);

      tagsBlock = article
        .find('.tags');

      blockTags = tagsBlock
        .text()
        .split(', ');

      tagsBlock
        .html(tagLinks(blockTags));
    });

  $(document)
    .on('click', '.addTag', tagClickHandler)
    .on('click', '.drop--handle', dropClickHandler);

  function dropClickHandler () {
    $(this)
      .closest('.drop')
      .find('.drop--content')
      .slideToggle();
  }

  function tagClickHandler (event) {
    var el = event.currentTarget,
        indx = tags.indexOf(el.innerHTML);

    if (!~indx) {
      tags
        .push(el.innerHTML);
    } else {
      tags = tags
        .slice(0, indx)
        .concat(tags.slice(indx + 1));
    }

    tags.sort();

    tagFilter(tags);

    el.href = (tags.length ? '#filter=' + tags.join() : '#');
  }

  function tagFilter (filter) {
    if (!filter.length) {
      $articles.show();
    } else {
      $articles
        .each(function toggleArticleBasedOnFilter (indx, article) {
          var found,
              tagsOnArticle;

          article = $(article);

          tagsOnArticle = article
            .find('.tags')
            .text()
            .split(', ');

          found = tags
            .reduce(function (acc, tag) {
              return acc && !!~tagsOnArticle.indexOf(tag);
            }, true);

          article
            .toggle(found);
        });
    }

    $tagsFilter
      .html(tagLinks(filter, ' , ').replace(/(.*),/, '$1 and'))
      .toggle(!!filter.length);
  }

  function tagLinks (tags, join) {
    return !tags.length ? '' : tags
      .sort()
      .map(function (tag) {
        return '<a class="addTag" href="#filter">' + tag + '</a>';
      })
      .join(join || ', ');
  }

  (function () {
    var rPattern = /~([^~]+?)~@~([^~]+?)~/,
        rString = '@$2 <a href="mailto:$1@$2">$1</a>';

    $('.email')
      .each(function () {
        this.innerHTML = this.innerHTML
          .replace(rPattern, rString);
      });
  }());

  tagFilter(tags);

  $('pre')
    .find('code')
    .each(function () {
      this.innerHTML = this.innerHTML
        .split(/\n/)
        .map(highlight)
        .map(function (line) {
          return '<span>' + line + '</span>';
        })
        .join('\n');
    });
});


function highlight(js) {
  return js
    .replace(/([\[\]\{\}\(\)\.,;])/g, '<span class="punctuation">$1</span>')
    .replace(/(^|\s)(\s*\/\/[^$]*?)(?=\n|$)/g, '$1<span class="comment">$2</span>')
    .replace(/(\/\*[.\D]*?\*\/)/g, '<span class="comment">$1</span>')
    .replace(/('.*?')/gm, '<span class="string">$1</span>')
    .replace(/\s+(\/.+\/)([\.\s;])/g, '<span class="string">$1</span>$2')
    .replace(/((?=[\-+])(?:[\-+]?\d+(?:\.\d+)?)|(?:\b\d+(?:\.\d+)?))/gm, '<span class="number">$1</span>')
    .replace(/\bnew\s+(\w+)/gm, '<span class="keyword">new</span> <span class="init">$1</span>')
    .replace(/\breturn\b/gm, '<span class="init">return</span>')
    .replace(/\b(break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|switch|this|throw|try|typeof|var|void|while|with)\b/gm, '<span class="keyword">$1</span>');
}
