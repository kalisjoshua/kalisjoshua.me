
all: css js

css:
	lessc -x src/styles/all.less > assets/styles.css

js:
	node node_modules/uglify-js/bin/uglifyjs src/js/app.js -o assets/scripts.js

.PHONY: all css js
