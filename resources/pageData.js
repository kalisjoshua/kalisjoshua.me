var fs = require('fs'),

    contact = fs.readFileSync('./src/contact.md', 'utf8'),
    menu = fs.readFileSync('./src/menu.md', 'utf8'),
    notice = fs.readFileSync('./src/notice.md', 'utf8'),
    site = require('../package');

function mergeObjects(acc, key) {
  if (acc[key]) {
    throw new Error('Attempting to reassign data key in PageData.');
  } else {
    acc[key] = this[key];
  }

  return acc;
}

function pageData(data) {

  return Object.keys(data || {})
    .reduce(mergeObjects.bind(data), {
      contact: contact,
      menu: menu,
      notice: notice,
      site: site
    });
}

module.exports = pageData;
