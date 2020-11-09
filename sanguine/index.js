const fs = require('fs')
const path = require('path')

const handlebars = require('handlebars')
const marked = require('marked')

const package = require('../package.json')
const treeWalker = require('./treeWalker')

const dist = (...args) => path.join(process.cwd(), 'dist', ...args)
const {html, md} = treeWalker(path.join(process.cwd(), 'content'))
const render = handlebars.compile(html._template)

const articles = Reflect.ownKeys(md.articles)
  .reduce((acc, name) => {
    const content = md.articles[name]
    const [date] = content.match(/### ([^\n]+)/).slice(1)
    const [intro] = content.match(/\n(?!#)([^\n]+)/).slice(1)
    const [title] = content.match(/## ([^\n]+)/).slice(1)

    acc.push({
      content,
      date: Date.parse(date) ? date : '',
      intro,
      name,
      sorting: Date.parse(date)
        ? new Date(date).getTime()
        : Number.MAX_SAFE_INTEGER,
      title,
    })

    return acc
  }, [])
  .sort((a, b) => b.sorting - a.sorting)
  // .map(Function('obj', 'with (obj) return {content, date, intro, title}'))

const meta = {
  author: package.author.name,
  contact: marked(md.contact),
  description: package.description,
  header: addPronouns(package.author.name),
  projects: marked(md.projects),
}

const navLinks = [
  ['Resume', 'index.html', /^index/],
  ['Articles', 'articles/index.html', /^articles/],
]

function addPronouns (name) {
  return `
    ${name}
    <small>
      <a href="https://medium.com/gender-inclusivit/why-i-put-pronouns-on-my-email-signature-and-linkedin-profile-and-you-should-too-d3dc942c8743" title="Why I put my pronouns on my email signature and you should too">
        he/him</a></small>`
}

function publishPage (file, main, about) {
  const {length} = file.match(/\//g) || []
  const rel = Array(length + 1).join('../')

  fs.writeFileSync(dist(file), render({
    ...meta,
    about,
    isArticle: /^articles\/(?!index\.html$)/.test(file),
    main,
    navigation: `
      <ul>
        ${navLinks
          .map(([text, href, regex]) => `
            <li${regex.test(file) ? ' class="active"' : ''}><a href="${rel}${href}">${text}</a></li>
          `)
          .join('\n')}
      </ul>
    `,
    rel,
  }), 'utf-8')
}

fs.rmdirSync(dist(), {recursive: true})
fs.mkdirSync(dist())

publishPage('index.html', marked(md.resume), marked(md.about))

fs.mkdirSync(dist('articles'))

publishPage('articles/index.html', marked(articles
  .map(({date, intro, name, title}) => `  1. [${title}](${name}.html)${date && ' - ' + date}

  ${intro}
  `)
  .join('\n')
))

articles
  .forEach(({content, name}) => {
    publishPage(`articles/${name}.html`, marked(content))
  })
