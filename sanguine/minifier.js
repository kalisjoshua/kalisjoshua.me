const fs = require("fs")
const path = require("path")

const rFileExtensions = /\.(?:css|htm[l]?|js)$/
const target = path.join(process.cwd(), process.argv[2])

// source: https://gist.github.com/lovasoa/8691344
async function* walk (dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path
      .join(dir, d.name)

    if (d.isDirectory()) {
      yield* walk(entry)
    } else if (d.isFile()) {
      yield entry
    }
  }
}

(async function main () {
  const {minify} = await import("minify")
  const options = {}
  
  for await (const p of walk(target)) {
    if (rFileExtensions.test(p)) {
      await minify(p)
        .then((data) => {
          fs.writeFileSync(p, data, "utf-8")
        })
        .catch((e) => console.log("\n", p, "\n", e))
    }
  }
}())
