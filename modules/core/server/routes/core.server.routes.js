'use strict';

var core = require('../controllers/core.server.controller'),
    homepageData = require('../controllers/homepageData.server.controller'),
    contact = require('../controllers/contact.server.controller'),
    socialmedia = require('../controllers/socialmedia.server.controller');

module.exports = function (app) {
  // routing for homepage data, needs user restriction
  app.route('/api/homepage-data').get(homepageData.find)
    .put(homepageData.update);

  // routing for contact data, needs user restriction
  app.route('/api/contact/info').get(contact.find)
    .put(contact.update);

  app.route('/api/contact/socialmedia').get(socialmedia.find)
    .put(socialmedia.update);

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  // new api routes must occur before this
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);
};
