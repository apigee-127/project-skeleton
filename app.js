'use strict';


/******* Swagger *******/

var swaggerTools = require('swagger-tools').middleware.v2_0;
var swaggerObject = require('./api/swagger/swagger.json');
var volosSwagger = require('volos-swagger');

// todo: make useStubs configurable via a127
var swaggerRouterConfig = { useStubs: false, controllers: './api/controllers' }


/**** Express ****/

var express = require('express');

var app = express();

app.use(swaggerTools.swaggerMetadata(swaggerObject)); // must be first of swagger middleware
// todo: enable next line when swagger validator is 2.0 compliant
//  app.use(swaggerTools.swaggerValidator()); // include immediately after metadata
app.use(volosSwagger()); // include after validation and before router
app.use(swaggerTools.swaggerRouter(swaggerRouterConfig)); // route requests to your controllers

app.listen(process.env.PORT || 10010);


console.log('try this:\ncurl http://localhost:10010/hello?name=Scott');
