/*
// highlight "module"
var rLang = /\s*\/\/\s*lang(?:uage)?\s*=\s*(javascript|js)\n/i,
    syntaxes = {};

syntaxes.js =
syntaxes.javascript = []
  .concat([
    [
      /([\(\)\.,;])/g,
      '<span class="punctuation">$1</span>'
    ]
  ])
  .concat([
    [
      /(^|\s)(\s*\/\/[^$]*?)(?=\n|$)/g,
      '$1<span class="comment">$2</span>'
    ]
  ])
  .concat([
    [
      /(\/\*[.\D]*?\*\/)/g,
      '<span class="comment">$1</span>'
    ]
  ])
  .concat([
    [
      /('.*?')/gm,
      '<span class="string">$1</span>'
    ]
  ])
  .concat([
    [
      /\s+(\/.+\/)([\.\s;])/g,
      '<span class="string">$1</span>$2'
    ]
  ])
  .concat([
    [
      /((?=[\-+])(?:[\-+]?\d+(?:\.\d+)?)|(?:\b\d+(?:\.\d+)?))/gm,
      '<span class="number">$1</span>'
    ]
  ])
  .concat([
    [
      /\bnew\s+(\w+)/gm,
      '<span class="keyword">new</span> <span class="init">$1</span>'
    ]
  ])
  .concat([
    [
      /\breturn\b/gm,
      '<span class="init">return</span>'
    ]
  ])
  .concat([
    [
      /\b(break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|switch|this|throw|try|typeof|var|void|while|with)\b/gm,
      '<span class="keyword">$1</span>'
    ]
  ]);

function highlight() {
  var syntax;

  if (rLang.test(this.innerHTML)) {
    syntax = rLang
      .exec(this.innerHTML)
      .pop();

    $(this.parentNode)
      .attr('lang', syntax);

    this.innerHTML = this.innerHTML
      .replace(rLang, '')
      .split(/\n/)
      .map(process.bind(null, syntaxes[syntax]))
      .join('\n');
  }
}

function process(lang, line) {
  var copy = lang.slice(0),
      current;

  while (copy.length) {
    current = copy.shift();
    line = line.replace(current[0], current[1]);
  }

  return line
    .replace(/(.*)/, '<span>$1</span>');
}

$('pre')
  .find('code')
  .each(highlight);
*/
