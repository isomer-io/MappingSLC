'use strict';

module.exports = function (app) {
    var users = require('../../app/controllers/users.server.controller'),
        censusDatas = require('../controllers/census-data.server.controller.js');

    app.route('/census-data')
        //.get(censusDatas.read)
        .get(censusDatas.censusFindList)
        .post(censusDatas.create);

    app.route('/censusDatas/:censusDataId')
        .get(censusDatas.read)
        .put(users.requiresLogin, censusDatas.hasAuthorization, censusDatas.update)
        .delete(users.requiresLogin, censusDatas.hasAuthorization, censusDatas.delete);


    // Finish by binding the CensusData middleware
    app.param('censusDataId', censusDatas.censusDataByID);
    app.param('censusDataCheckLocal', censusDatas.censusLocalStoreCheck);
};