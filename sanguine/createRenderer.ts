const rBlockIF = /\{\{\?(.*?)\}\}([\w\W]*?)\{\{\?\/}\}/im;

function blocks(context, str) {
  let result = str;
  let match;

  while ((match = result.match(rBlockIF))) {
    result = result.replace(match[0], context[match[1]] ? match[2].trim() : "");
  }

  return result;
}

function create(str, meta) {
  const fill = new Function("context", `with(context){return \`${str}\`}`);

  return (context, fullContext = { ...meta, ...context }) =>
    blocks(fullContext, fill(fullContext));
}

function createRenderer(everything) {
  const { meta, template, ...rest } = everything;
  const render = create(template.raw, meta);

  return { ...rest, render };
}

export { createRenderer };
