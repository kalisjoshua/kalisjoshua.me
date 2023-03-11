type Link = { href: string; text: string };
type RenderFn = (pageContext: pageContext) => string;
type SemVer = `${number}.${number}.${number}`;

interface FileNode {
  key: string;
  raw: string;
}

interface PageNode extends FileNode {
  includeAbout: boolean;
  isArticle: boolean;
  rel: string;
}

interface pageContext {
  includeAbout: boolean;
  isArticle: boolean;
  main: string;
  navigation: Array<Link>;
  rel: string;
  section: string;
}

interface SiteContentBasic {
  meta: Array<FileNode>;
  pages: Array<PageNode>;
  template: FileNode;
}

interface SiteContentExtended extends Omit<SiteContentBasic, "meta"> {
  meta: SiteMeta;
  navigation?: Array<Link>;
}

interface SiteContentComplete
  extends Omit<SiteContentExtended, "meta" | "template"> {
  render: RenderFn;
}

interface SiteMeta {
  about: string;
  author: string;
  contact: string;
  date: Date;
  description: string;
  header: string;
  projects: string;
  version: SemVer;
}

export {
  FileNode,
  Link,
  pageContext,
  PageNode,
  RenderFn,
  SiteContentBasic,
  SiteContentComplete,
  SiteContentExtended,
  SiteMeta,
};
