
all: css js

css:
	lessc -x styles/all.less > assets/styles.css

js:
	node node_modules/uglify-js/bin/uglifyjs js/app.js -o assets/scripts.js

.PHONY: all css js
