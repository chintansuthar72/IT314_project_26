const request = require('supertest');

const baseURL = "http://localhost:5000";

describe('GET /comment', () => {
    test('should return status 200 success response of all comments', async () => {
        const res = await request(baseURL).get('/comment')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxNzA1MSwiZXhwIjoxNjgyNTIwNjUxfQ.64WHkhBeJTHUClZ1YOXlSB3AvFhnbhcjKP-Esbs80us')
        expect(res.status).toEqual(200);
    });

    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/comment')
        expect(res.status).toEqual(400);
    });
}
);

describe('POST /comment/announcement/:id', () => {
    test('should return status 200 for valid comment', async () => {
        const req = {
            body: {
                description: 'test comment'
            }
        };
        const res = await request(baseURL).post('/comment/announcement/6443db0baf9580ffda1fcfbb')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxNzA1MSwiZXhwIjoxNjgyNTIwNjUxfQ.64WHkhBeJTHUClZ1YOXlSB3AvFhnbhcjKP-Esbs80us')
        .send(req.body);
        expect(res.status).toEqual(200);
    });

    test('should return status 400 for no token user', async () => {
        const req = {
            body: {
                title: 'test title',
                description: 'test description'
            }
        };
        const res = await request(baseURL).post('/comment/announcement/6443db0baf9580ffda1fcfbb')
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
        const res = await request(baseURL).post('/comment/announcement/6443db0baf9580ffda1fcfbb')
        .set('Authorization', 'eyJhbGciOiJpUzI1NiIsInR5cCI6IkpXVCJ0.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUwNTE2NywiZXhwIjoxNjgyNTA4NzY3fQ.glRRj9Y8F9kJ04WiWOGoLWAguOlVp4flranRaBXQxcA')
        .send(req.body);
        expect(res.status).toEqual(401);
    });
}
);

describe('GET /comment/:id', () => {
    test('should return status 200 for getting single comment', async () => {
        const res = await request(baseURL).get('/comment/64492ec748dbf6463d1169c1')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxNzA1MSwiZXhwIjoxNjgyNTIwNjUxfQ.64WHkhBeJTHUClZ1YOXlSB3AvFhnbhcjKP-Esbs80us')
        expect(res.status).toEqual(200);
    });
    test('should return status 400 for no token user', async () => {
        const res = await request(baseURL).get('/comment/64492ec748dbf6463d1169c1')
        expect(res.status).toEqual(400);
    });
}
);

describe('PUT /comment/:id', () => {
    test('should return status 400 no token user', async () => {
        const req = {
            body: {
                description: 'test description'
            }
        };
        const res = await request(baseURL).put('/comment/64492eef1226029a2152599d')
        .send(req.body);
        expect(res.status).toEqual(400);
    });
    test('should return status 401 for unauthorised user', async () => {
        const req = {
            body: {
                description: 'test description'
            }
        };
        const res = await request(baseURL).put('/comment/64492eef1226029a2152599d')
        .set('Authorization', 'eyJhbxciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxNzA1MSwiZXhwIjoxNjgyNTIwNjUxfQ.64WHkhBeJTHUClZ1YOXlSB3AvFhnbhcjKP-Esbs80us')
        .send(req.body);
        expect(res.status).toEqual(401);
    });
    test('should return status 200 for updating comment', async () => {
        const req = {
            body: {
                description: 'test description'
            }
        };
        const res = await request(baseURL).put('/comment/64492eef1226029a2152599d')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxNzA1MSwiZXhwIjoxNjgyNTIwNjUxfQ.64WHkhBeJTHUClZ1YOXlSB3AvFhnbhcjKP-Esbs80us')
        .send(req.body);
        expect(res.status).toEqual(200);
    });
}
);

describe('DELETE /comment/:id', () => {
    test('should return status 400 no token user', async () => {
        const res = await request(baseURL).delete('/comment/644931eca87ef020abcc82ad')
        expect(res.status).toEqual(400);
    });
    test('should return status 401 unauthorised user', async () => {
        const res = await request(baseURL).delete('/comment/644931eca87ef020abcc82ad')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxNzA1MSwiZXhwIjoxNjgyNTIwNjUxfQ.64WHkhBeJTHUClZ1YOXlSB3AvFhnbhcjKP-Esbs80ub')
        expect(res.status).toEqual(401);
    });
    test('should return status 200 for delete single comment', async () => {
        const res = await request(baseURL).delete('/comment/644931eca87ef020abcc82ad')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUxNzA1MSwiZXhwIjoxNjgyNTIwNjUxfQ.64WHkhBeJTHUClZ1YOXlSB3AvFhnbhcjKP-Esbs80us')
        expect(res.status).toEqual(200);
    });
}
);
