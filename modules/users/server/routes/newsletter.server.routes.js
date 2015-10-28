
var bodyParser = require('body-parser');
var messages = require('../controllers/messages.server.controller');

module.exports = function(app) {
    // Email sign up
    //app.use(bodyParser.urlencoded({ extended: false }));

    app.route('/api/signup')
        .post(messages.subscriber);
};
