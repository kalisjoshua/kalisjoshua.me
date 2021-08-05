// highlight "module"

(function () {
  const parts = [
    [
      /([\(\)\.,;])/g,
      '<span class="hightlighter--punctuation">$1</span>',
    ],
    [
      /(^|\s)(\s*\/\/[^$]*?)(?=\n|$)/g,
      '$1<span class="hightlighter--comment">$2</span>',
    ],
    [
      /(\/\*[.\D]*?\*\/)/g,
      '<span class="hightlighter--comment">$1</span>',
    ],
    [
      /('.*?')/gm,
      '<span class="hightlighter--string">$1</span>',
    ],
    [
      /\s+(\/.+\/)([\.\s;])/g,
      '<span class="hightlighter--string">$1</span>$2',
    ],
    [
      /((?=[\-+])(?:[\-+]?\d+(?:\.\d+)?)|(?:\b\d+(?:\.\d+)?))/gm,
      '<span class="hightlighter--number">$1</span>',
    ],
    [
      /\bnew\s+(\w+)/gm,
      '<span class="hightlighter--keyword">new</span> <span class="hightlighter--init">$1</span>',
    ],
    [
      /\breturn\b/gm,
      '<span class="hightlighter--init">return</span>',
    ],
    [
      /\b(break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|switch|this|throw|try|typeof|var|void|while|with)\b/gm,
      '<span class="hightlighter--keyword">$1</span>',
    ],
  ]

  const style = document.createElement('style')

  style.textContent = `
    .hightlighter {
      background: #123123;
      color: #FFFFFF;
      line-height: 1.3em;
    }

    .hightlighter > span {
      counter-increment: line-number;
      float: left;
      white-space: pre;
    }

    .hightlighter > span:before {
      border-right: 1px solid #FFFFFF;
      color: #FFFFFF;
      color: rgba(255, 255, 255, 0.3);
      content: counter(line-number);
      float: left;
      left: 0;
      margin-right: 1em;
      padding: 0 4px;
      position: relative;
      text-align: right;
      top: 0;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      width: 1.25em;
    }

    .hightlighter .hightlighter--comment {color: #999999;}
    .hightlighter .hightlighter--init {color: #9cc54a;}
    .hightlighter .hightlighter--keyword {color: #8cc9d5;}
    .hightlighter .hightlighter--number {color: #fd971f;}
    .hightlighter .hightlighter--punctuation {color: #999999;}
    .hightlighter .hightlighter--string {color: #fd971f;}
  `

  function highlight (node) {
    node.classList.add('hightlighter')

    node.innerHTML = node.innerHTML
      .split(/\n/)
      .map((line) => parts.reduce((acc, [regex, span]) => acc.replace(regex, span), line))
      .map((line) => `<span>${line}</span>`)
      .join('\n')
  }

  function init () {
    Array.from(document
    	.querySelectorAll('pre code[class="language-js"], pre code[class="language-javascript"]'))
      .forEach(highlight)
  }

  document.head.appendChild(style)
  document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0))
}())
