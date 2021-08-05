const fs = require('fs')
const path = require('path')

const handlebars = require('handlebars')
const marked = require('marked')

const package = require('../package.json')

const output = (...args) => path.join(process.cwd(), 'docs', ...args)
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
  ['Notice to recruiters', 'recruiters.html', /^recruiters/],
]

function addPronouns (name) {
  return `
    ${name}
    <small>
      <a href="https://medium.com/gender-inclusivit/why-i-put-pronouns-on-my-email-signature-and-linkedin-profile-and-you-should-too-d3dc942c8743" title="Why I put my pronouns on my email signature and you should too">
        he/him/his</a></small>`
}

function publishPage (file, main, about) {
  const {length} = file.match(/\//g) || []
  const rel = Array(length + 1).join('../')

  const html = render({
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
  })

  fs.writeFileSync(output(file), html, 'utf-8')
}

function treeWalker (dir) {
  return fs.readdirSync(dir)
    .reduce(visitor.bind({dir}), {})
}

function visitor (acc, segment) {
  const currentPath = path.join(this.dir, segment)

  if (fs.statSync(currentPath).isDirectory()) {
    const {html, md} = treeWalker(currentPath)

    acc.html[segment] = html && html._template
    acc.md[segment] = md
  } else if (segment === '.DS_store') {
    // do nothing
  } else {
    const [name, type] = /^(.+?)\.(html|md)/
      .exec(segment)
      .slice(1)

    acc[type] = acc[type] || {}

    acc[type][name] = fs.readFileSync(currentPath, 'utf-8')
  }

  return acc
}

fs.rmdirSync(output(), {recursive: true})
fs.mkdirSync(output())

publishPage('index.html', marked(md.resume), marked(md.about))

fs.mkdirSync(output('articles'))

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

publishPage('recruiters.html', marked(md.recruiters))
