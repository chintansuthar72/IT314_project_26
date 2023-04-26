const request = require('supertest');

const baseURL = "http://localhost:5000";

describe('POST /announcement/course/:id', () => {
    test('should return status 200 for valid announcement', async () => {
        const req = {
            body: {
                title: 'test title',
                description: 'test description'
            }
        };
        const res = await request(baseURL).post('/announcement/course/643c21d04e2263e1432d773f')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUwNTE2NywiZXhwIjoxNjgyNTA4NzY3fQ.glRRj9Y8F9kJ04WiWOGoLWAguOlVp4flranRaBXQxcA')
        .send(req.body);
        expect(res.status).toEqual(201);
    });

    test('should return status 400 for no token user', async () => {
        const req = {
            body: {
                title: 'test title',
                description: 'test description'
            }
        };
        const res = await request(baseURL).post('/announcement/course/643c21d04e2263e1432d773f')
        .send(req.body);
        expect(res.status).toEqual(400);
    });

    test('should return status 401 for unauthorised user', async () => {
        const req = {
            body: {
                title: 'test title',
                description: 'test description'
            }
        };
        const res = await request(baseURL).post('/announcement/course/643c21d04e2263e1432d773f')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ0.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUwNTE2NywiZXhwIjoxNjgyNTA4NzY3fQ.glRRj9Y8F9kJ04WiWOGoLWAguOlVp4flranRaBXQxcA')
        .send(req.body);
        expect(res.status).toEqual(401);
    });
}
);

describe('GET /announcement', () => {
    test('should return status 200 success response of all announcements', async () => {
        const res = await request(baseURL).get('/announcement')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUwNTE2NywiZXhwIjoxNjgyNTA4NzY3fQ.glRRj9Y8F9kJ04WiWOGoLWAguOlVp4flranRaBXQxcA')
        expect(res.status).toEqual(200);
    });

    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/announcement')
        expect(res.status).toEqual(400);
    });
}
);

describe('GET /announcement/:id', () => {
    test('should return status 200 for getting single announcement', async () => {
        const res = await request(baseURL).get('/announcement/644760bfa1c0a265bcd150fe')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUwNTE2NywiZXhwIjoxNjgyNTA4NzY3fQ.glRRj9Y8F9kJ04WiWOGoLWAguOlVp4flranRaBXQxcA')
        expect(res.status).toEqual(200);
    });
    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/announcement/644760bfa1c0a265bcd150fe')
        expect(res.status).toEqual(400);
    });
}
);

describe('PUT /announcement/:id', () => {
    test('should return status 400 no token user', async () => {
        const req = {
            body: {
                title: 'test title changed',
                description: 'test description'
            }
        };
        const res = await request(baseURL).put('/announcement/644760bfa1c0a265bcd150fe')
        .send(req.body);
        expect(res.status).toEqual(400);
    });
    test('should return status 410 for unauthorised user', async () => {
        const req = {
            body: {
                title: 'test title changed',
                description: 'test description'
            }
        };
        const res = await request(baseURL).put('/announcement/644760bfa1c0a265bcd150fe')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ0.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUwNTE2NywiZXhwIjoxNjgyNTA4NzY3fQ.glRRj9Y8F9kJ04WiWOGoLWAguOlVp4flranRaBXQxcA')
        .send(req.body);
        expect(res.status).toEqual(401);
    });
    test('should return status 200 for updating announcement', async () => {
        const req = {
            body: {
                title: 'test title changed',
                description: 'test description'
            }
        };
        const res = await request(baseURL).put('/announcement/644760bfa1c0a265bcd150fe')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUwNTE2NywiZXhwIjoxNjgyNTA4NzY3fQ.glRRj9Y8F9kJ04WiWOGoLWAguOlVp4flranRaBXQxcA')
        .send(req.body);
        expect(res.status).toEqual(200);
    });
}
);

describe('DELETE /announcement/:id', () => {
    test('should return status 400 no token user', async () => {
        const res = await request(baseURL).delete('/announcement/644760bfa1c0a265bcd150fe')
        expect(res.status).toEqual(400);
    });
    test('should return status 401 unauthorised user', async () => {
        const res = await request(baseURL).delete('/announcement/644760bfa1c0a265bcd150fe')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUwNTE2NywiZXhwIjoxNjgyNTA4NzY3fQ.glRRj9Y8F9kJ04WiWOGoLWAguOlVp4flranRaBXQxcB')
        expect(res.status).toEqual(401);
    });
    test('should return status 200 for delete single announcement', async () => {
        const res = await request(baseURL).delete('/announcement/644760bfa1c0a265bcd150fe')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUwNTE2NywiZXhwIjoxNjgyNTA4NzY3fQ.glRRj9Y8F9kJ04WiWOGoLWAguOlVp4flranRaBXQxcA')
        expect(res.status).toEqual(200);
    });
}
);

describe('GET /announcement/course/:id', () => {
    test('should return status 200 for getting announcment of particular course', async () => {
        const res = await request(baseURL).get('/announcement/course/643c21d04e2263e1432d773f')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUwNTE2NywiZXhwIjoxNjgyNTA4NzY3fQ.glRRj9Y8F9kJ04WiWOGoLWAguOlVp4flranRaBXQxcA')
        expect(res.status).toEqual(200);
    });
    test('should return status 400 no token user', async () => {
        const res = await request(baseURL).get('/announcement/course/643c21d04e2263e1432d773f')
        expect(res.status).toEqual(400);
    });
}
);
