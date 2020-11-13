// highlight "module"
document.addEventListener('DOMContentLoaded', function codeSyntaxHighlight () {
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

  function highlight (node) {
    node.innerHTML = node.innerHTML
      .split(/\n/)
      .map((line) => parts.reduce((acc, [regex, span]) => acc.replace(regex, span), line))
      .map((line) => `<span>${line}</span>`)
      .join('\n')
  }

  Array.from(document
  	.querySelectorAll('pre code[class="language-js"]'))
    .forEach(highlight)
})
