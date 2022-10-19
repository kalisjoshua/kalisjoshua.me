const fs = require('fs')
const path = require('path')

const handlebars = require('handlebars')
const marked = require('marked')

const package = require('../package.json')

const hrefFn = (h, r) => /^http[s]?:\/\//.test(h) ? h : [r, h].join("")
const output = (...args) => path.join(process.cwd(), `${process.argv[2]}`, ...args)
const {html, md} = treeWalker(path.join(process.cwd(), 'content'))
const render = handlebars.compile(html._template)

const meta = {
  author: package.author.name,
  contact: marked.parse(md.contact),
  date: new Date(),
  description: package.description,
  header: addPronouns(package.author.name),
  projects: marked.parse(md.projects),
  version: package.version,
}

const siteMap = [
  {
    cssActive: /^index/,
    href: 'index.html',
    publish: () => publishPage('index.html', marked.parse(md.resume), marked.parse(md.about)),
    text: 'Resume',
  },
  {
    cssActive: /^articles/,
    href: 'articles/index.html',
    publish: () => publishSection('articles', md.articles),
    text: 'Articles',
  },
  {
    cssActive: /^slides/,
    href: 'slides/index.html',
    publish: () => publishSection('slides', md.slides),
    text: 'Slides',
  },
  {
    cssActive: /^--google docs resume--$/,
    href: 'https://docs.google.com/document/d/e/2PACX-1vRQe8YfYK7RYTZ8bpo55MC5xsNLhHDTWCqp8mUN0i_VwKkzbCNT8daAy8XqwbeEIiu_gZdmbeTJ0GXA/pub',
    publish: () => {},
    text: 'Resume (Google Doc)',
  },
  // {
  //   cssActive: /^recruiters/,
  //   href: 'recruiters.html',
  //   publish: () => publishPage('recruiters.html', marked.parse(md.recruiters)),
  //   text: 'Notice to recruiters',
  // },
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
  const navLink = ({href, cssActive: regex, text}) => `
    <li${regex.test(file) ? ' class="active"' : ''}>
      <a href="${hrefFn(href, rel)}">${text}</a>
    </li>
  `

  const html = render({
    ...meta,
    about,
    isArticle: /^articles\/(?!index\.html$)/.test(file),
    main,
    navigation: `<ul>${siteMap.map(navLink).join('\n')}</ul>`,
    rel,
    section: section(file),
  })

  fs.writeFileSync(output(file), html, 'utf-8')
}

function publishSection (label, markdown) {
  const pull = (content, regex) => ((content.match(regex) || []).slice(1))
  const pages = Reflect.ownKeys(markdown)
    .reduce((acc, name) => {
      const content = markdown[name]

      if (/draft/i.test(content)) return acc

      const [date] = pull(content, /### ([^\n]+)/)
      const [intro] = pull(content, /\n(?!#+|(?:\s*[-*+]|\d+\.\s*)[^\n]+)(.+)/)
      const [title] = pull(content, /## ([^\n]+)/)

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

    fs.mkdirSync(output(label))

    publishPage(`${label}/index.html`, marked.parse(pages
      .flatMap(({date, intro, name, title}, index) => [
        `**[${title}](${name}.html)**${date && ' - ' + date}`,
        intro,
      ])
      .join('\n\n')
    ))

    pages
      .forEach(({content, name}) => {
        publishPage(`${label}/${name}.html`, marked.parse(content))
      })
}

function section (file) {
  switch (true) {
    case /^articles/.test(file):

      return "article"
    case /^slides/.test(file):

      return "slides"
    default:

      return "resume"
  }
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
    try {
      const [name, type] = /^(.+?)\.(html|md)/
        .exec(segment)
        .slice(1)

      acc[type] = acc[type] || {}

      acc[type][name] = fs.readFileSync(currentPath, 'utf-8')
    } catch (e) {
      console.error(`Failed for file: "${segment}".`)
    }
  }

  return acc
}

siteMap
  .forEach((section) => section.publish())
