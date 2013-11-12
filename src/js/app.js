/*jshint laxcomma:true*/

$.fn.ready(function ($) {
  var $body = $('body')
    , $doc = $(document);

  // drop 'module'
  (function () {
    var $drops = $('.drop--content')
      , $closer;

    $closer = $drops
      .closest('.drop')
      .find('.drop--close');

    function drops_click () {
      var section = $(this).data('drop');

      $drops
        .not(section)
        .slideUp(showCloser);

      $drops
        .filter(section)
        .slideToggle(showCloser);
    }

    function drops_close () {
      if (/drop-close/.test(this.href)) {
        event.preventDefault();
      }

      $drops
        .slideUp();

      $closer
        .hide();
    }

    function showCloser () {
      $closer.toggle($drops.filter(':visible').length > 0);
    }

    showCloser();

    $doc
      .on('click', '.drop--handle', drops_click)
      .on('click', '.drop--close, [href="#contact"]', drops_close);
  }());

  // highlight 'module'
  (function () {
    var javascript;

    javascript = []
      .concat([[
        /([\(\)\.,;])/g
        , '<span class="punctuation">$1</span>']])
      .concat([[
        /(^|\s)(\s*\/\/[^$]*?)(?=\n|$)/g
        , '$1<span class="comment">$2</span>']])
      .concat([[
        /(\/\*[.\D]*?\*\/)/g
        , '<span class="comment">$1</span>']])
      .concat([[
        /('.*?')/gm
        , '<span class="string">$1</span>']])
      .concat([[
        /\s+(\/.+\/)([\.\s;])/g
        , '<span class="string">$1</span>$2']])
      .concat([[
        /((?=[\-+])(?:[\-+]?\d+(?:\.\d+)?)|(?:\b\d+(?:\.\d+)?))/gm
        , '<span class="number">$1</span>']])
      .concat([[
        /\bnew\s+(\w+)/gm
        , '<span class="keyword">new</span> <span class="init">$1</span>']])
      .concat([[
        /\breturn\b/gm
        , '<span class="init">return</span>']])
      .concat([[
        /\b(break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|switch|this|throw|try|typeof|var|void|while|with)\b/gm
        , '<span class="keyword">$1</span>']]);

    function highlight (syntax) {
      return function highlight_syntax () {
        this.innerHTML = this.innerHTML
          .split(/\n/)
          .map(syntaxes.bind(null, syntax))
          .join('\n');
      };
    }

    function syntaxes (lang, line) {
      var copy = lang.slice(0)
        , current;

      while (copy.length) {
        current = copy.shift();
        line = line.replace(current[0], current[1]);
      }

      return line
        .replace(/(.*)/, '<span>$1</span>');
    }

    $('pre')
      .find('code')
      .each(highlight(javascript));
  }());

  // table of contents in article
  (function () {
    if (!/articles/.test(window.location.pathname)) {
      return;
    }

    var $article = $('article')

      , headings
      , TOC = '<aside class="TOC"><h2>Table Of Contents</h2><ol>%</ol></aside>';

    headings = $article
      .find('h2')
      .has('a')
      .map(function (_, el) {
        el = $(el)
          .find('a');

        return '<li><a href="#%">%</a></li>'
          .replace(/%/, el.attr('name'))
          .replace(/%/, el.text());
      })
      .toArray()
      .join('');

    if (headings.length) {
      $article
        .find('h1')
        .after(TOC.replace(/%/, headings));
    }
  }());

  // tags 'module'
  (function () {
    var hash = window.location.hash
      , tags = []
      , $articles = $('article')
      , $tagsFilter = $('.tags--filter');

    function createTagLinks (indx) {
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

    if (hash && /=/.test(hash)) {
      tags = hash
        .match(/^#filter=(.*)?$/)
        .pop()
        .split(',');
    }

    $articles
      .each(createTagLinks);

    $doc
      .on('click', '.addTag', tagClickHandler);

    tagFilter(tags);
  }());

  function ancientHistory (event) {
    $(this)
      .toggleClass('toggleOpen');

    $('.ancient-history')
      .slideToggle();
  }

  function bodyScrollHandler (event) {
    $body
      .toggleClass('scrolled', $body.scrollTop() > 20);
  }

  $doc
    .on('click', '.ancient-history--title', ancientHistory)
    .on('scroll', bodyScrollHandler);

  if ($('.twitter-share-button').length) {
    (function twitterInit (d,s,id) {
      var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
      if(!d.getElementById(id)){
        js=d.createElement(s);
        js.id=id;
        js.src=p+'://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js,fjs);
      }
    })(document, 'script', 'twitter-wjs');
  }

  if ($('.disqussion').length) {
    (function disqusInit (disqus_shortname) {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }('joshuakalis'));
  }

  $('.resume')
    .find('h3')
    .last()
    .addClass('ancient-history--title')
    .nextUntil()
    .wrapAll('<div>')
    .parent()
    .addClass('ancient-history');
});
