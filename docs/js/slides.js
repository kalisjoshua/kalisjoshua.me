(function () {
  const addToHistory = debounce((slideID) => history.pushState(null, null, `#${slideID}`))
  const arrowKeys = {
    // arrow left
    37: (slideNumber) => goto(Math.max(0, slideNumber - 1)),
    // arrow up
    38: (slideNumber) => goto(0),
    // arrow right
    39: (slideNumber) => goto(Math.min(slideCount - 1, slideNumber + 1)),
    // arrow down
    40: (slideNumber) => goto(slideCount - 1),
  }
  const dqs = (...args) => document.querySelector(...args)
  const goto = (num = 0) => window.location.hash = `slide-${num}`
  const rSlidesURL = /.*slides\/(?!index\.html)/
  let slideCount = 0

  function debounce (fn, delay = 200) {
    let pending

    return function postponed (...args) {
      pending && clearTimeout(pending)
      pending = setTimeout(fn.bind(this, ...args), delay)
    }
  }

  function init () {
    document.body.classList.add("slide-deck")

    const main = dqs("main")
    const [header] = main.children
    const slides = makeSlides(main.innerHTML, header)

    header.remove()
    main.innerHTML = ""
    main.append(...slides)
    slideCount = slides.length

    // set the slide number if none is set already
    !window.location.hash && history.replaceState(null, null, `#slide-0`)

    // navigate the slides with the arrow keys
    window.addEventListener("keydown", keydown)
    // keep location.hash in sync while scrolling through slides
    window.addEventListener("popstate", popstate)

    scrollObserverSetup()
  }

  function keydown (event) {
    if (arrowKeys[event.which]) {
      const slideNumber = parseInt(window.location.hash.match(/\d+/)[0], 10)

      arrowKeys[event.which](slideNumber)
      event.preventDefault()
    }
  }

  function makeSlides (rawContent, header) {
    const alignments = {
      false: "content-aligned--top",
      true: "content-aligned--center",
    }

    return rawContent
      .replace(header.innerHTML, "")
      .split(/<hr(?: \/)?>/i)
      .map((html, index, {length: slideCount}) => {
        const content = document.createElement("div")
        const counter = document.createElement("p")
        const footer = document.createElement("footer")
        const slide = document.createElement("figure")

        content.innerHTML = html.trim()
        counter.innerText = `Slide ${index} of ${slideCount}`
        footer.append(
          ...header.cloneNode(true).children,
          counter,
        )
        slide.classList.add("slide-deck__slide", alignments[/h2/i.test(html)])
        slide.append(content, footer)
        slide.id = `slide-${index}`

        return slide
      })
  }

  function popstate (event) {
    if (/^#slide-\d+$/.test(window.location.hash)) {
      dqs(window.location.hash).scrollIntoView()
    }
  }

  function scrollObserverSetup () {
    const activeClass = "activeSlide"
    const callback = (slides, observer) => {
      const [active, passive] = slides
        .filter(({isIntersecting}) => isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      slides
        .filter(({isIntersecting}) => isIntersecting)
        .forEach((slide) => {
          const ratio = slide.intersectionRatio

          Array.from(slide.target.children)
            .slice(-1)[0].style.opacity = ratio < .8 ? ratio / 4 : ratio
        })

      if (active && active.intersectionRatio > .6) {
        if (active.target.id !== window.location.hash.slice(1)) {
          // console.log("scroll")
          addToHistory(active.target.id)
        }
      }
    }
    const options = {
      root: document.querySelector('main'),
      threshold: Array(10).fill().map((_, i, {length}) => i / length),
    }
    const scrollObserver = new IntersectionObserver(callback, options)

    Array.from(options.root.children)
      .forEach((slide) => scrollObserver.observe(slide))
  }

  rSlidesURL.test(window.location) && window.addEventListener("DOMContentLoaded", init)
}())
