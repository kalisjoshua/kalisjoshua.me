
all: css js

css:
	node node_modules/less/bin/lessc -x src/styles/all.less > public/styles.css

js:
	node node_modules/uglify-js/bin/uglifyjs src/js/app.js -o public/scripts.js

server: all
	@node server.js

.PHONY: all css js server
