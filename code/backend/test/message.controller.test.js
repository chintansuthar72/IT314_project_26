const request = require('supertest');

const baseURL = "http://localhost:5000";

describe('POST /message/course/:id', () => {
    test('should return status 200 for valid message', async () => {
        const req = {
            body: {
                message: 'test message'
            }
        };
        const res = await request(baseURL).post('/message/course/643c21d04e2263e1432d773f')
        .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxODg1NSwiZXhwIjoxNjgyNTIyNDU1fQ.HUcSBXzzVBtSt9eINm_NNU1yqj31Zfdm1wZ6UBt0d10')
        .send(req.body);
        expect(res.status).toEqual(200);
    });

    test('should return status 400 for no token user', async () => {
        const req = {
            body: {
                message: 'test message'
            }
        };
        const res = await request(baseURL).post('/message/course/643c21d04e2263e1432d773f')
        .send(req.body);
        expect(res.status).toEqual(400);
    });

    test('should return status 401 for unauthorised user', async () => {
        const req = {
            body: {
                message: 'test message'
            }
        };
        const res = await request(baseURL).post('/message/course/643c21d04e2263e1432d773f')
        .set('Authorization','eyJhbGpiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxODg1NSwiZXhwIjoxNjgyNTIyNDU1fQ.HUcSBXzzVBtSt9eINm_NNU1yqj31Zfdm1wZ6UBt0d10')
        .send(req.body);
        expect(res.status).toEqual(401);
    });
}
);

describe('GET /message', () => {
    test('should return status 200 success response of all messages', async () => {
        const res = await request(baseURL).get('/message')
        .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxODg1NSwiZXhwIjoxNjgyNTIyNDU1fQ.HUcSBXzzVBtSt9eINm_NNU1yqj31Zfdm1wZ6UBt0d10')
        expect(res.status).toEqual(200);
    });

    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/message')
        expect(res.status).toEqual(400);
    });
}
);

describe('GET /message/:id', () => {
    test('should return status 200 for getting single message', async () => {
        const res = await request(baseURL).get('/message/6449355438c6d11c28c2b49d')
        .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxODg1NSwiZXhwIjoxNjgyNTIyNDU1fQ.HUcSBXzzVBtSt9eINm_NNU1yqj31Zfdm1wZ6UBt0d10')
        expect(res.status).toEqual(200);
    });
    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/message/6449355438c6d11c28c2b49d')
        expect(res.status).toEqual(400);
    });
}
);

describe('GET /course/:id', () => {
    test('should return status 200 for getting single message', async () => {
        const res = await request(baseURL).get('/course/643c21d04e2263e1432d773f')
        .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxODg1NSwiZXhwIjoxNjgyNTIyNDU1fQ.HUcSBXzzVBtSt9eINm_NNU1yqj31Zfdm1wZ6UBt0d10')
        expect(res.status).toEqual(200);
    });
    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/course/643c21d04e2263e1432d773f')
        expect(res.status).toEqual(400);
    });
}
);

describe('DELETE /message/:id', () => {
    test('should return status 400 no token user', async () => {
        const res = await request(baseURL).delete('/message/64493658e1288beb43e64a65')
        expect(res.status).toEqual(400);
    });
    test('should return status 401 unauthorised user', async () => {
        const res = await request(baseURL).delete('/message/64493658e1288beb43e64a65')
        .set('Authorization','eyJhbGciOiJIUzI1NiqsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxODg1NSwiZXhwIjoxNjgyNTIyNDU1fQ.HUcSBXzzVBtSt9eINm_NNU1yqj31Zfdm1wZ6UBt0d10')
        expect(res.status).toEqual(401);
    });
    test('should return status 200 for delete single message', async () => {
        const res = await request(baseURL).delete('/message/64493658e1288beb43e64a65')
        .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxODg1NSwiZXhwIjoxNjgyNTIyNDU1fQ.HUcSBXzzVBtSt9eINm_NNU1yqj31Zfdm1wZ6UBt0d10')
        expect(res.status).toEqual(200);
    });
}
);
