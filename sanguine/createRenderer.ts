import {
  pageContext,
  RenderFn,
  SiteContentComplete,
  SiteContentExtended,
  SiteMeta,
} from "./SanguineTypes";

const rBlockIF = /\{\{\?(.*?)\}\}([\w\W]*?)\{\{\?\/}\}/im;

function blocks(context: pageContext, str: string): string {
  let result = str;
  let match;

  while ((match = result.match(rBlockIF))) {
    result = result.replace(match[0], context[match[1]] ? match[2].trim() : "");
  }

  return result;
}

function create(templateLiteral: string, templateMeta: SiteMeta): RenderFn {
  const fill = new Function(
    "context",
    `with(context){return \`${templateLiteral}\`}`
  );

  return (pageContext: pageContext): string => {
    const fullContext: pageContext = { ...templateMeta, ...pageContext };

    return blocks(fullContext, fill(fullContext));
  };
}

function createRenderer(everything: SiteContentExtended): SiteContentComplete {
  const { meta, template, ...rest } = everything;
  const render = create(template.raw, meta);

  return { ...rest, render };
}

export { createRenderer };
