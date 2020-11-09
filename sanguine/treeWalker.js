const fs = require('fs')
const path = require('path')

const rParts = /^(.+?)\.(html|md)/

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
  } else {
    const [name, type] = rParts
      .exec(segment)
      .slice(1)

    acc[type] = acc[type] || {}

    acc[type][name] = fs.readFileSync(currentPath, 'utf-8')
  }

  return acc
}

module.exports = treeWalker
