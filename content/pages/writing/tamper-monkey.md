## Google Chrome Tampermonkey Scripts
### 23 Oct 2024

Get rid of "promoted" content on some sites.

```javascript
// ==UserScript==
// @name         Simple Promotion Blocker (LinkedIn)
// @version      0.1.0
// @description  Blocks promoted posts on LinkedIn.
// @match        http://linkedin.com/*
// @match        https://linkedin.com/*
// @match        http://www.linkedin.com/*
// @match        https://www.linkedin.com/*
// ==/UserScript==

(function() {
    console.clear();
    console.log("Simple Promotion Blocker running");

    let pending;

    function findParent(el) {
        let parent = el

        do {
            parent = parent.parentNode
        } while (!parent.parentNode.classList.contains("scaffold-finite-scroll__content"))

        return parent
    }

    var observer = new MutationObserver(function () {
        pending && clearTimeout(pending);

        pending = setTimeout(() => {
            Array.from(document.querySelectorAll(`span[aria-hidden="true"]`))
                .filter((el) => /promoted/i.test(el.textContent.trim()) && findParent(el).remove());
        }, 200);
    });

    observer.observe(document, { childList: true, subtree: true });
})();
```

```javascript
// ==UserScript==
// @name         Simple Promotion Blocker (Reddit)
// @version      0.1.0
// @description  Blocks promoted posts on Reddit.
// @match        http://reddit.com/*
// @match        https://reddit.com/*
// @match        http://www.reddit.com/*
// @match        https://www.reddit.com/*
// @match        http://old.reddit.com/*
// @match        https://old.reddit.com/*
// ==/UserScript==

(function() {
    console.log("Simple Promotion Blocker running");

    var observer = new MutationObserver(function() {
        for (const el of document.querySelectorAll(".promotedlink")) {
            el.remove();
        }
    });

    observer.observe(document, { childList: true, subtree: true });
})();
```
