const request = require('supertest');

const baseURL = "http://localhost:5000";

describe('POST /course', () => {
    test('should return status 400 for no token user', async () => {
        const req = {
            body: {
                name : 'test course',
                courseCode : 'TS101',
                description : 'test description'
            }
        };
        const res = await request(baseURL).post('/course')
        .send(req.body);
        expect(res.status).toEqual(400);
    });
    
    test('should return status 401 for unauthorised user', async () => {
        const req = {
            body: {
                name : 'test course',
                courseCode : 'TS101',
                description : 'test description'
            }
        };
        const res = await request(baseURL).post('/course')
        .set('Authorization', 'ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxMTcwNiwiZXhwIjoxNjgyNTE1MzA2fQ.aHMa62u6Ra9zvDwEm-tJ3dRUgCXz1ebwCN30zElNaB4')
        .send(req.body);
        expect(res.status).toEqual(401);
    });

    test('should return status 201 for valid course', async () => {
        const req = {
            body: {
                name : 'International Economics',
                courseCode : 'IE412',
                description : 'test description'
            }
        };
        const res = await request(baseURL).post('/course')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxMjMxNywiZXhwIjoxNjgyNTE1OTE3fQ.ERhtStTzq53-aIhs1eM_VPYNYLV1xtUFax6xFdPHLKY')
        .send(req.body);
        expect(res.status).toEqual(201);
    });

}
);

describe('GET /course', () => {
    test('should return status 200 success response of all courses', async () => {
        const res = await request(baseURL).get('/course')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxMTcwNiwiZXhwIjoxNjgyNTE1MzA2fQ.aHMa62u6Ra9zvDwEm-tJ3dRUgCXz1ebwCN30zElNaB4')
        expect(res.status).toEqual(200);
    },10000);

    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/course')
        expect(res.status).toEqual(400);
    });
}
);

describe('GET /course/:id', () => {
    test('should return status 200 for getting single course', async () => {
        const res = await request(baseURL).get('/course/643c21d04e2263e1432d773f')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxMTcwNiwiZXhwIjoxNjgyNTE1MzA2fQ.aHMa62u6Ra9zvDwEm-tJ3dRUgCXz1ebwCN30zElNaB4')
        expect(res.status).toEqual(200);
    });
    test('should return status 404 for invalid course id', async () => {
        const res = await request(baseURL).get('/course/683c21d04e2263e1432d973f')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxMTcwNiwiZXhwIjoxNjgyNTE1MzA2fQ.aHMa62u6Ra9zvDwEm-tJ3dRUgCXz1ebwCN30zElNaB4')
        expect(res.status).toEqual(404);
    });
    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/course/643c21d04e2263e1432d773f')
        expect(res.status).toEqual(400);
    });
}
);

describe('PUT /course/:id', () => {
    test('should return status 400 no token user', async () => {
        const req = {
            body: {
                name : 'test course',
                courseCode : 'TS101',
                description : 'test description changed'
            }
        };
        const res = await request(baseURL).put('/course/643c21d04e2263e1432d773f')
        .send(req.body);
        expect(res.status).toEqual(400);
    });
    test('should return status 401 for unauthorised user', async () => {
        const req = {
            body: {
                name : 'test course',
                courseCode : 'TS101',
                description : 'test description changed'
            }
        };
        const res = await request(baseURL).put('/course/643c21d04e2263e1432d773f')
        .set('Authorization', 'eyJhbGciOiJIUzIqiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxMTcwNiwiZXhwIjoxNjgyNTE1MzA2fQ.aHMa62u6Ra9zvDwEm-tJ3dRUgCXz1ebwCN30zElNaB4')
        .send(req.body);
        expect(res.status).toEqual(401);
    });
    test('should return status 404 for invalid course id', async () => {
        const req = {
            body: {
                name : 'test course',
                courseCode : 'TS101',
                description : 'test description changed'
            }
        };
        const res = await request(baseURL).put('/course/653c21d04e9263e1432d773f')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxMTcwNiwiZXhwIjoxNjgyNTE1MzA2fQ.aHMa62u6Ra9zvDwEm-tJ3dRUgCXz1ebwCN30zElNaB4')
        .send(req.body);
        expect(res.status).toEqual(404);
    },10000);
    test('should return status 200 for updating course', async () => {
        const req = {
            body: {
                name : 'test course',
                courseCode : 'TS101',
                description : 'test description changed again'
            }
        };
        const res = await request(baseURL).put('/course/643c21d04e2263e1432d773f')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxMTcwNiwiZXhwIjoxNjgyNTE1MzA2fQ.aHMa62u6Ra9zvDwEm-tJ3dRUgCXz1ebwCN30zElNaB4')
        .send(req.body);
        expect(res.status).toEqual(200);
    });
}
);

describe('DELETE /course/:id', () => {
    test('should return status 400 no token user', async () => {
        const res = await request(baseURL).delete('/course/64457c51a318331c1a67f450')
        expect(res.status).toEqual(400);
    });
    test('should return status 401 unauthorised user', async () => {
        const res = await request(baseURL).delete('/course/64457c51a318331c1a67f450')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6qkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxMTcwNiwiZXhwIjoxNjgyNTE1MzA2fQ.aHMa62u6Ra9zvDwEm-tJ3dRUgCXz1ebwCN30zElNaB4')
        expect(res.status).toEqual(401);
    });
    test('should return status 404 for invalid course id', async () => {
        const res = await request(baseURL).delete('/course/64457c51a318331c1a67f451')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxMTcwNiwiZXhwIjoxNjgyNTE1MzA2fQ.aHMa62u6Ra9zvDwEm-tJ3dRUgCXz1ebwCN30zElNaB4')
        expect(res.status).toEqual(404);
    },10000);
    test('should return status 200 for delete single course', async () => {
        const res = await request(baseURL).delete('/course/64457c51a318331c1a67f450')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxMTcwNiwiZXhwIjoxNjgyNTE1MzA2fQ.aHMa62u6Ra9zvDwEm-tJ3dRUgCXz1ebwCN30zElNaB4')
        expect(res.status).toEqual(200);
    });
}
);