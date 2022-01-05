## Refactoring

---

### 1. Very Imperative

**Requirements:**

Count all entries, in data, with the color 'Blue'.

```javascript
var data = require("./data.json");

function countBlue () {
  // Problem 1 - using variables outside it's scope
  // Problem 2 - tightly coupled to accomplishing one task
  var counter = 0, i = 0, len = data.length;

  // performance optimized for loop
  for (i; i < len; i++) {
    if (data[i].Color === "blue") {
      counter++;
    }
  }

  return counter + " Color blue found.";
}

console.log(countBlue()); // Solved, no problem...
```

---

### 2. Imperative (but getting better)

(New) Requirements: The color to be counted is not defined yet, so make it so that the color can be passed in or changed whenever.

Uh ohs.

**Requirements:**

Count all entries, in a given list, with a given color.

```javascript
function countColor (data, color) {
  // Problem 1 - tightly coupled to counting based on a specific attribute
  // Problem 2 - the value of the attribute must be exactly one value ever
  var counter = 0, i = 0, len = data.length;

  // performance optimized for loop
  for (i; i < len; i++) {
    if (data[i].Color === color) {
      counter++;
    }
  }

  return counter + " Color " + color + " found.";
}

console.log(countColor(data, "green")); // Easy, peasy.
```

---

### 3. Absctracted

(New) Requirements: Counting colors has gotten to be boring, lets count something else sometimes. Make it so the attribute can be passed in too.

Drat.

**Requirements:**

Count all entries that have a given attribute with a given value.

```javascript
function countAttributeWithValue (data, attr, test) {
  // Problem 1 - restricted to only one attribute being tested
  // Problem 2 - restricted to only one attribute value tested
  var counter = 0, i = 0, len = data.length;

  // performance optimized for loop
  for (i; i < len; i++) {
    if (data[i][attr] === test) {
      counter++;
    }
  }

  return counter + " " + attr + " " + test + " found.";
}

console.log(countAttributeWithValue(data, "Color", "green")); // doin' good.
```

---

### 4. Much Better

(New) Requirement: Finer grained results are need, multiple values need to be checked per entry. Get it done quick!

Bollocks! (sorry for the profanity)

**Requirements:**

Count all entries that have the color 'green' and an Author containing the letter 'a'.

```javascript
function condition1 (item) {

  return item.Color === "green" && /a/.test(item.Author);
}

function countBasedOnTest (data, fn) {
  // Problem 1 - a lot of code to counting elements in an array
  // Problem 2 - still just a counter function; what about doing something
  //             with the entries found?
  var counter = 0, i = 0, len = data.length;

  // performance optimized for loop
  for (i; i < len; i++) {
    if (fn(data[i])) {
      counter++;
    }
  }

  return counter + " found based on passed in test function.";
}

console.log(countBasedOnTest(data, condition1)); // Under control.
```

---

### 4.1. More Complexity

(New) Requirements: Add another conditon to the result set; add entry with an 'Author' containing a: 'z', 'x', 'y', 'w', or 'q'.

No problem, way ahead of ya.

**Requirements:**

(read above)

```javascript
function condition2 (item) {
  return (/[zxywq]/).test(item.Author);
}

function condition_1_or_2 (item) {
  return condition1(item) || condition2(item);
}

console.log(countBasedOnTest(data, condition_1_or_2));
```

---

### 5. Best

**Reasoning:**

Writing less code provides for fewer CHANCES for bugs. You only have to write the code that actually matters to the desired outcome.

```javascript
console.log(data.filter(condition_1_or_2).length);
```

---

### 6. Go Further

**Requirements:**

Garbage data has infected the 'real' data, that must be filtered out before getting results; 'Hacker, Lee T' is not a valid 'Author'.

```javascript
function notHacker (item) {
  return item.Author !== "Hacker, Lee T.";
}

// Problem 1 - iterating over the array for each filter function
console.log(data.filter(notHacker).filter(condition_1_or_2).length);
```

---

### 6.1. Custom Composition

```javascript
function cleanDataAndConditions (item) {
  return notHacker(item) && (condition1(item) || condition2(item));
}

console.log(data.filter(cleanDataAndConditions).length);
```
