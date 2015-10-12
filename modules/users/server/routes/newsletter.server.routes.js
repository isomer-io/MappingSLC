
var bodyParser = require('body-parser');

module.exports = function(app) {
    var messages = require('../controllers/messages.server.controller');
    // Email sign up
    app.use(bodyParser.urlencoded({ extended: false }));

    app.route('/api/signup')
        .post(messages.subscriber);
};
