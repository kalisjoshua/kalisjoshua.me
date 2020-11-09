const rTitle = /#+\s+([^\n]+)/

function articleIntro ({contents, page}) {
  const rIntro = /\n(?!#)([^\n]+)/

  try {
    const [intro] = contents.match(rIntro)

    return intro.trim()
  } catch (e) {
    console.log(`Article intro not found for ${page}.`)
  }
}

function articleTitle ({contents, page}) {
  try {
    const [title] = contents.match(rTitle).slice(1)

    return title
  } catch (e) {
    throw new Error(`Missing title (e.g. "# <Title>") in ${page}.`)
  }
}

function sectionIndexes (pages) {
  const titleCase = (str) => str.slice(0, 1).toUpperCase() + str.slice(1)

  function generate (acc, page) {
    if (page.section) {
      const href = `${page.section}/${page.page}.html`
      const intro = articleIntro(page)

      acc[page.section] = `${acc[page.section] || ''}\n\n`
        + `**[${articleTitle(page)}](${href})**\n\n ${intro}`
    }

    return acc
  }

  const indexes = pages
    .reduce(generate, {})

  return Reflect.ownKeys(indexes)
    .map((section) => ({
      contents: `## ${titleCase(section)}\n\n${indexes[section]}`,
      page: section,
      section: '',
    }))
}

module.exports = sectionIndexes
