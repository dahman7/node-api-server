module.exports = exports = function() {
    var config =   arguments['1'];
    var schema = {
        type: 'object',
        properties: {
            "items": {
                "type": 'array',
                "minItems": 9,
                "maxItems": 10,
                items: {

                    type: 'object',
                    properties: {
                        uuid: {
                            type: 'string',
                            faker: 'random.uuid'
                        },
                        uri: {
                            type: 'string',
                            faker: 'internet.url'
                        },
                        titre: {
                            type: 'string',
                            faker: 'name.title'
                        },
                        type: {
                            $ref: '#/definitions/type'
                        }
                    },
                    required: ['uuid','uri', 'titre', 'type']

                }
            },
            page: {
                type: 'integer',
                minimum: config.currentPage,
                maximum: config.currentPage
            },
            nbPerPage: {
                type: 'integer',
                minimum: 5,
                maximum: 20
            },
            nbTotal: {
                type: 'integer',
                minimum: config.nbTotal,
                maximum: config.nbTotal
            }
        },
        required: ['items', 'page', 'nbPerPage', 'nbTotal'],
        definitions: {
            positiveInt: {
                type: 'integer',
                minimum: 0,
                exclusiveMinimum: true
            },
            type: {
                type: 'string',
                "pattern": "file|data"
            }
        }
    };
    return schema;
};
