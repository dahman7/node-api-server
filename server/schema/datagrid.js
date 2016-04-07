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
                        id: {
                            type: 'string',
                            faker: 'random.uuid'
                        },
                        name: {
                            type: 'string',
                            faker: 'internet.userName'
                        },
                        age: {
                            type: 'integer',
                            minimum: 15,
                            maximum: 80,
                            faker: 'random.number'
                        },
                        saved: {
                            type: 'integer',
                            minimum: 1000,
                            maximum: 10000,
                            faker: 'random.number'
                        },
                        crud : {
                            type: 'object',
                            properties: {
                                create: {
                                    $ref: '#/definitions/crud'
                                },
                                read: {
                                    $ref: '#/definitions/crud'
                                },
                                update: {
                                    $ref: '#/definitions/crud'
                                },
                                delete: {
                                    $ref: '#/definitions/crud'
                                }
                            }
                        }
                    },
                    required: ['id','name', 'age', 'saved','crud']

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
                minimum: 50,
                maximum: 100
            }
        },
        required: ['items', 'page', 'nbPerPage', 'nbTotal'],
        definitions: {
            positiveInt: {
                type: 'integer',
                minimum: 0,
                exclusiveMinimum: true
            },
            crud: {
                type: 'string',
                "pattern": "datagrid/read|datagrid/create|datagrid/delete|datagrid/update"
            }
        }
    };
    return schema;
};
