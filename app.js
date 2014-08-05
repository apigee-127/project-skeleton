'use strict';

/**** Init ****/

var config = require('./config');
var profile = require('./config/profiles/default.json');
var express = require('express');
var _ = require('underscore');


/******* Swagger *******/

var resourceListing = require('./api/swagger/resource-listing.json');
var resource = require('./api/swagger/resource.json');
var swaggerResources = [resource];

var swaggerMetadata = require('swagger-tools/middleware/swagger-metadata');
var swaggerRouter = require('swagger-tools/middleware/swagger-router');
var swaggerValidator = require('swagger-tools/middleware/swagger-validator');

var volosSwagger = require('volos-swagger');


/**** Express ****/

var PORT = process.env.PORT || 10010;

function startExpress() {

  var app = express();

  // Apigee 127 middleware
  app.use(swaggerMetadata(resourceListing, swaggerResources));
  app.use(swaggerValidator());
  app.use(volosSwagger(profile));
  app.use(swaggerRouter({useStubs: true, controllers: './api/controllers'}));

  app.listen(PORT);
}
