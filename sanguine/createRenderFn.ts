import { Link } from "./createNavigation.ts";
import { createNavigation } from "./createNavigation.ts";

interface PageContext {
  isActive?: (h: string) => string;
  isArticle?: boolean;
  main: string;
  navigation: Array<Link>;
  path?: string;
  rel: string;
  section: string;
}

const rConditionalBlock = /\{\{\?(.*?)\}\}([\w\W]*?)\{\{\?\/}\}/im;

function resolveBlocks(context: PageContext, str: string) {
  let result = str;
  let match;

  while ((match = result.match(rConditionalBlock))) {
    const key = match[1] as keyof PageContext;

    result = result.replace(match[0], context[key] ? match[2].trim() : "");
  }

  return result;
}

function createRenderFn({
  meta,
  template,
  ...rest
}: ReturnType<typeof createNavigation>) {
  const fill = new Function(
    "context",
    `with(context){return \`${template.raw}\`}`,
  );

  return {
    ...rest,
    render: (pageContext: PageContext) => {
      const fullContext: PageContext = { ...meta, ...pageContext };

      return resolveBlocks(fullContext, fill(fullContext));
    },
  };
}

export type { PageContext };
export { createRenderFn };
