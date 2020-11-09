const handlebars = require('handlebars')

const navigation = require('./navigation')
const renderPage = require('./renderPage')
const sectionIndexes = require('./sectionIndexes')
const treeWalker = require('./treeWalker')

function pageBuilder (dir) {
  function contentIsolator (acc, file) {
    if (file.template) {
      acc.templates[file.section || 'root'] = file
    } else {
      delete file.template

      acc.pages.push(file)
    }

    return acc
  }

  const {pages, templates} = treeWalker(dir)
    .reduce(contentIsolator, {pages: [], templates: {}})

  pages.push(...sectionIndexes(pages))

  templates.root.render = handlebars.compile(templates.root.contents)
  templates.articles.render = handlebars.compile(templates.articles.contents)

  return pages
    .map((page) => renderPage(templates, navigation(pages), page))
}

module.exports = pageBuilder
