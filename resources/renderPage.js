var marked = require('marked'),
    swig = require('swig'),

    contentTypes = require('./contentTypes');

/**
 * Sugar function to make page rendering easier and centralized.
 *
 * @param  {Object} res
 *         The response object for the current request.
 *
 * @param  {Number} code
 *         The HTTP response code to send in the response header.
 *
 * @param  {String} tmpl
 *         A String the corresponds to the filename of the template.
 *
 * @param  {Object} data
 *         An Object to render the page information from.
 *
 * @return {undefined}
 */
function renderPage(res, code, tmpl, data) {
  res.writeHead(code, contentTypes.html);
  res.end(renderTemplate(tmpl, data));
}

/**
 * Sugar function to make calling templating library easier and centralized.
 *
 * @param  {String} tmpl
 *         A String the corresponds to the filename of the template.
 *
 * @param  {Object} data
 *         An Object to render the page information from.
 *
 * @return {String}
 *         Templating output.
 */
function renderTemplate(tmpl, data) {

  return swig
    .compileFile('./src/swig/' + tmpl + '.html')(data || {});
}

swig
  .setFilter('marked', function (input) {

    return marked(input);
  });

module.exports = renderPage;
