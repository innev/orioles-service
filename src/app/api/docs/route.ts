export async function GET() {
    const docs = {
        openapi: '3.0.0',
        info: {
            title: 'Next.js API Service',
            version: '1.0.0',
            description: 'A RESTful API service built with Next.js'
        },
        paths: {
            '/api/2fa': {
                get: {
                    summary: 'Get all 2fa',
                    responses: {
                        '200': {
                            description: 'List of 2fa'
                        }
                    }
                },
                post: {
                    summary: 'Create a new 2fa',
                    responses: {
                        '201': {
                            description: '2fa created successfully'
                        }
                    }
                }
            },
            '/api/2fa/{email}': {
                get: {
                    summary: 'Get a 2fa by Email',
                    parameters: [
                        {
                            name: 'email',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'string'
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: '2fa details'
                        }
                    }
                }
            }
        }
    }

    return Response.json(docs)
}