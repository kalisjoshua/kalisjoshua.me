[![Deploy static content to Pages](https://github.com/kalisjoshua/kalisjoshua.me/actions/workflows/github-pages-content.yml/badge.svg)](https://github.com/kalisjoshua/kalisjoshua.me/actions/workflows/github-pages-content.yml)

# Joshua T Kalis - Personal Website

  * Resume - always up to date
  * Articles - (very) infrequently published/written
  * Slides - presentation slides


## How To Generate Pages

``` bash
npm run pages
```

This will generate all content pages from the `content` folder.

``` bash
npm run watch
```

Will watch for file changes and re-run the static generation process.


## TODO

  * [ ] unit tests public/js/highlighter.js
  * [ ] unit tests public/js/slides.js
  * [ ] unit tests sanguine/index.js
  * [ ] Add Sass for styles
  * [ ] Modularize sanguine
