// highlight "module"

(function () {
  const invert = (obj) => Object.entries(obj)
    .reduce((acc, [key, val]) => ({...acc, [val]: key}), {})
  const unwrap = (regex) => regex.toString().replace(/\\/g, "\\").slice(1, -1)
  const rTokens = [
    [
      ["comment", /\s*?\/\/\s*?.*/],
      ["keyword", /\b(?:break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)\b/],
      ["number", /(?=[\-+])(?:[\-+]?\d+(?:\.\d+)?)|(?:\b\d+(?:\.\d+)?)/],
      ["object", /(?:^|\b)\w[\w\d]+(?=\.)/],
      ["callable", /(?:^|\b)\w[\w\d]+(?=\s*?\()/],
      // ["punctuation", /[\(\)\[\]\.,;]/], // for some reason ";" matches "&"?!
      ["punctuation", /[\(\)\[\]\.,]/],
      ["regex", /(?<=[\b\s\(])\/.+?\/(?=[\b\n\s\)])?/],
      ["string", /(['"`])[^\1]+?\1/],
      ["operator", /[-+=:\?!%<>\/\*]+/],
    ],

    (tokens) => tokens
      .map(([key, regex], index) => [
        key,
        unwrap(regex)
          .replace(/\d/g, (match) => `${parseInt(match) + index + 1}`),
      ]),

    (tokens) => tokens
      .map(([name, regex]) => `(?<${name}>${regex})`)
      .join("|"),

    (pattern) => new RegExp(pattern, "g"),
  ].reduce((acc, fn) => fn(acc))

  const style = document.createElement('style')

  style.textContent = `
    .hightlighter {
      --operator: #E84A5F;
      --callable: #FF847C;
      --comment: #999999;
      --keyword: #99B898;
      --ink: #FECEA8;
      --ink: #FFFFFF;
      --value: #FECEA8;

      background: var(--bg-dark);
      color: var(--ink);
      line-height: 1.3em;
    }

    .hightlighter > div {
      counter-increment: line-number;
      float: left;
      white-space: pre;
    }

    .hightlighter > div:before {
      border-right: 1px solid var(--ink);
      color: var(--ink);
      color: rgba(255, 255, 255, 0.3);
      content: counter(line-number);
      float: left;
      left: 0;
      margin-right: 1em;
      padding-right: 1ex;
      position: relative;
      text-align: right;
      top: 0;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      width: 2em;
    }

    .hightlighter .lum--callable {color: var(--callable);}
    .hightlighter .lum--comment {color: var(--comment);}
    .hightlighter .lum--keyword {color: var(--keyword);}
    .hightlighter .lum--number {color: var(--value);}
    .hightlighter .lum--operator {color: var(--keyword);}
    .hightlighter .lum--object {color: var(--value);}
    .hightlighter .lum--punctuation {color: var(--comment);}
    .hightlighter .lum--regex {color: var(--keyword);}
    .hightlighter .lum--string {color: var(--value);}
  `

  function highlight (node) {
    node.classList.add('hightlighter')

    node.innerHTML = node.innerHTML
      .trim()
      .split("\n")
      .map((line) => {
        const result = line
          .replace(rTokens, (match, ...rest) =>
            `<span class="lum--${invert(rest.pop())[match]}">${match}</span>`
          )

        return `<div>${result}</div>`
      })
      .join("\n")
  }

  function init () {
    Array.from(document
    	.querySelectorAll('pre code[class="language-js"], pre code[class="language-javascript"]'))
      .forEach(highlight)
  }

  document.head.appendChild(style)
  document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0))
}())
