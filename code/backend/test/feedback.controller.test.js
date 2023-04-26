const request = require('supertest');

const baseURL = "http://localhost:5000";

describe('POST /feedback/course/:id', () => {
    test('should return status 404 for invalid course id', async () => {
        const req = {
            body: {
                topic : 'test topic',
                description: 'test description'
            }
        };
        const res = await request(baseURL).post('/feedback/course/643c21d04e2263e1432d773a')
        .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2M0ZjA3MjQ1YmE1ZmY3OTg2YTBjYiIsImVtYWlsIjoia2FtYWxwYXRlbEBnbWFpbC5jb20iLCJpYXQiOjE2ODI1MjAyOTksImV4cCI6MTY4MjUyMzg5OX0.NaG6_tAkevtXU8cl9ZaEIyCKM9NYhQuptyaHdTMTqz8')
        .send(req.body);
        expect(res.status).toEqual(404);
    });

    test('should return status 201 for valid feedback', async () => {
        const req = {
            body: {
                topic : 'test topic',
                description: 'test description'
            }
        };
        const res = await request(baseURL).post('/feedback/course/643c21d04e2263e1432d773f')
        .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2M0ZjA3MjQ1YmE1ZmY3OTg2YTBjYiIsImVtYWlsIjoia2FtYWxwYXRlbEBnbWFpbC5jb20iLCJpYXQiOjE2ODI1MjAyOTksImV4cCI6MTY4MjUyMzg5OX0.NaG6_tAkevtXU8cl9ZaEIyCKM9NYhQuptyaHdTMTqz8')
        .send(req.body);
        expect(res.status).toEqual(201);
    });

    test('should return status 400 for no token user', async () => {
        const req = {
            body: {
                topic : 'test topic',
                description: 'test description'
            }
        };
        const res = await request(baseURL).post('/feedback/course/643c21d04e2263e1432d773f')
        .send(req.body);
        expect(res.status).toEqual(400);
    });

    test('should return status 401 for unauthorised user', async () => {
        const req = {
            body: {
                topic : 'test topic',
                description: 'test description'
            }
        };
        const res = await request(baseURL).post('/feedback/course/643c21d04e2263e1432d773f')
        .set('Authorization','eyJhbGciOiJIUzI1NiIsIna5cCI6IkpXVCJ9.eyJpZCI6IjY0M2M0ZjA3MjQ1YmE1ZmY3OTg2YTBjYiIsImVtYWlsIjoia2FtYWxwYXRlbEBnbWFpbC5jb20iLCJpYXQiOjE2ODI1MjAyOTksImV4cCI6MTY4MjUyMzg5OX0.NaG6_tAkevtXU8cl9ZaEIyCKM9NYhQuptyaHdTMTqz8')
        .send(req.body);
        expect(res.status).toEqual(401);
    });
}
);

describe('GET /feedback/course/:id', () => {
    test('should return status 200 success response of all messages', async () => {
        const res = await request(baseURL).get('/feedback/course/643c21d04e2263e1432d773f')
        .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxODg1NSwiZXhwIjoxNjgyNTIyNDU1fQ.HUcSBXzzVBtSt9eINm_NNU1yqj31Zfdm1wZ6UBt0d10')
        expect(res.status).toEqual(200);
    });

    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/feedback/course/643c21d04e2263e1432d773f')
        expect(res.status).toEqual(400);
    });

    test('should return status 401 for unauthorised user', async () => {
        const res = await request(baseURL).get('/feedback/course/643c21d04e2263e1432d773f').set('Authorization','ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxODg1NSwiZXhwIjoxNjgyNTIyNDU1fQ.HUcSBXzzVBtSt9eINm_NNU1yqj31Zfdm1wZ6UBt0d10')
        expect(res.status).toEqual(401);
    });

    test('should return status 404 for invalid course id', async () => {
        const res = await request(baseURL).get('/feedback/course/643a21d04e2263e1432d773f').set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxODg1NSwiZXhwIjoxNjgyNTIyNDU1fQ.HUcSBXzzVBtSt9eINm_NNU1yqj31Zfdm1wZ6UBt0d10')
        expect(res.status).toEqual(404);
    });
}
);

