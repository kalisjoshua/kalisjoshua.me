## Formatting Large Numbers of Seconds for Humans to Read
### 5 Aug 2021

A little exercise in a trivial, and already solved, problem; for the funzies.


``` javascript
function friendlyFormatOfSeconds (seconds) {
  const pluralize = (full, num) => num !== '1' ? `${full}s` : full
  const segments = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second',  1],
  ]
  const templateFill = (acc, [label, limit]) => {
    const count = parseInt(seconds / limit, 10)

    seconds = seconds - limit * count

    return count ? `${acc} ${count} ${label}` : acc
  }

  return segments
    .reduce(templateFill, '')
    .replace(/\b(\d+)\s\w+/g, pluralize)
    .trim()
}

[
  [30, '30 seconds'],
  [60, '1 minute'],
  [102, '1 minute 42 seconds'],
  [3600, '1 hour'],
  [3601, '1 hour 1 second'],
  [86403, '1 day 3 seconds'],
].forEach(([input, output]) => {
  const result = friendlyFormatOfSeconds(input)

  if (result !== output) {
    console.log(input, result)
  } else {
    console.log('Success!', result)
  }
})
```
