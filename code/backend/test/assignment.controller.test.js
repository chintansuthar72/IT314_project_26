const request = require('supertest');

const baseURL = "http://localhost:5000";

describe('POST /assignment/course/:id', () => {
    test('should return status 201 for valid assignment', async () => {
        const req = {
            body: {
                link : 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                name : 'Assignment new',
                description : 'This is the first assignment',
                due_date : Date.now(),
            }
        };
        const res = await request(baseURL).post('/assignment/course/644956d8a7646c4cd80f5386')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI4Q')
        .send(req.body);
        expect(res.status).toEqual(201);
    });

    test('should return status 400 for no token user', async () => {
        const req = {
            body: {
                link : 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                name : 'Assignment 1',
                description : 'This is the first assignment',
                due_date : Date.now(),
            }
        };
        const res = await request(baseURL).post('/assignment/course/644956d8a7646c4cd80f5386')
        .send(req.body);
        expect(res.status).toEqual(400);
    });

    test('should return status 401 for unauthorised user', async () => {
        const req = {
            body: {
                link : 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                name : 'Assignment 1',
                description : 'This is the first assignment',
                due_date : Date.now(),
            }
        };
        const res = await request(baseURL).post('/assignment/course/644956d8a7646c4cd80f5386')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI41')
        .send(req.body);
        expect(res.status).toEqual(401);
    });

    test('should return status 404 for invalid course id', async () => {
        const req = {
            body: {
                link : 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                name : 'Assignment 1',
                description : 'This is the first assignment',
                due_date : Date.now(),
            }
        };
        const res = await request(baseURL).post('/assignment/course/644956d8a7616c4cd80f5386')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI4Q')
        .send(req.body);
        expect(res.status).toEqual(404);
    });
}
);

describe('GET /assignment', () => {
    test('should return status 200 success response of all assignments', async () => {
        const res = await request(baseURL).get('/assignment')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI4Q')
        expect(res.status).toEqual(200);
    });

    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/assignment')
        expect(res.status).toEqual(400);
    });
}
);

describe('GET /assignment/:id', () => {
    test('should return status 200 for getting single assignment', async () => {
        const res = await request(baseURL).get('/assignment/64495779d3b955b319a23f81')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI4Q')
        expect(res.status).toEqual(200);
    });
    test('should return status 404 for invalid assignment id', async () => {
        const res = await request(baseURL).get('/assignment/64495779d1b955b319a23f81')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI4Q')
        expect(res.status).toEqual(404);
    });
    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/assignment/64495779d3b955b319a23f81')
        expect(res.status).toEqual(400);
    });
}
);

describe('PUT /assignment/:id', () => {
    test('should return status 400 no token user', async () => {
        const req = {
            body: {
                link : 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                name : 'Assignment another',
                description : 'This is the first assignment',
                due_date : Date.now(),
            }
        };
        const res = await request(baseURL).put('/assignment/64495779d3b955b319a23f81')
        .send(req.body);
        expect(res.status).toEqual(400);
    });
    test('should return status 401 for unauthorised user', async () => {
        const req = {
            body: {
                link : 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                name : 'Assignment another',
                description : 'This is the first assignment',
                due_date : Date.now(),
            }
        };
        const res = await request(baseURL).put('/assignment/64495779d3b955b319a23f81')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI41')
        .send(req.body);
        expect(res.status).toEqual(401);
    });
    test('should return status 200 for updating assignment', async () => {
        const req = {
            body: {
                link : 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                name : 'Assignment another',
                description : 'This is the first assignment',
                due_date : Date.now(),
            }
        };
        const res = await request(baseURL).put('/assignment/64495779d3b955b319a23f81')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI4Q')
        .send(req.body);
        expect(res.status).toEqual(200);
    });
    test('should return status 404 for invalid assignment id', async () => {
        const req = {
            body: {
                link : 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                name : 'Assignment ',
                description : 'This is the first assignment',
                due_date : Date.now(),
            }
        };
        const res = await request(baseURL).put('/assignment/64495779d3b955c319a23f81')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI4Q')
        .send(req.body);
        expect(res.status).toEqual(404);
    });
}
);

describe('DELETE /assignment/:id', () => {
    test('should return status 400 no token user', async () => {
        const res = await request(baseURL).delete('/assignment/64495779d3b955b319a23f81')
        expect(res.status).toEqual(400);
    });
    test('should return status 401 unauthorised user', async () => {
        const res = await request(baseURL).delete('/assignment/64495779d3b955b319a23f81')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI41')
        expect(res.status).toEqual(401);
    });
    test('should return status 404 for invalid assignment id', async () => {
        const res = await request(baseURL).delete('/assignment/64491779d3b955b319a23f81')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI4Q')
        expect(res.status).toEqual(404);
    });
    test('should return status 200 for delete single assignment', async () => {
        const res = await request(baseURL).delete('/assignment/64495779d3b955b319a23f81')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI4Q')
        expect(res.status).toEqual(200);
    });
}
);

describe('GET /assignment/course/:id', () => {
    test('should return status 200 for getting assignments of particular course', async () => {
        const res = await request(baseURL).get('/assignment/course/644956d8a7646c4cd80f5386')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDhlYjQ4Y2RjMDc4YWIxZjQ4ODAwOCIsImVtYWlsIjoibWFzYWxhd2FsYXBhcnRoQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyODgyNCwiZXhwIjoxNjgyNTMyNDI0fQ.1xDjX_uIoin7GnoA4v9XKT4yqTe-HenwWWcQExZAI4Q')
        expect(res.status).toEqual(200);
    });
    test('should return status 400 no token user', async () => {
        const res = await request(baseURL).get('/assignment/course/644956d8a7646c4cd80f5386')
        expect(res.status).toEqual(400);
    });
}
);
