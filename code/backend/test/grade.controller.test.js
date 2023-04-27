const request = require('supertest');

const baseURL = "http://localhost:5000";

describe('PUT /assignment/:id', () => {
    test('should return status 400 no token user', async () => {
        const req = {
            body: {
                link : 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                name : 'Assignment ',
                description : 'This is the first assignment',
                due_date : Date.now(),
            }
        };
        const res = await request(baseURL).put('/assignment/64495486f0e24f275a6ddabe')
        .send(req.body);
        expect(res.status).toEqual(400);
    });
    test('should return status 401 for unauthorised user', async () => {
        const req = {
            body: {
                link : 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                name : 'Assignment',
                description : 'This is the first assignment',
                due_date : Date.now(),
            }
        };
        const res = await request(baseURL).put('/assignment/64495486f0e24f275a6ddabe')
        .set('Authorization', 'eyJhbGcaOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyNTEyNCwiZXhwIjoxNjgyNTI4NzI0fQ.Tl3noh2GhVUxKvZQI6UN2EpGg8cHwyUKXzgI_p599hE')
        .send(req.body);
        expect(res.status).toEqual(401);
    });
    test('should return status 200 for updating assignment', async () => {
        const req = {
            body: {
                link : 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
                name : 'Assignment ',
                description : 'This is the first assignment',
                due_date : Date.now(),
            }
        };
        const res = await request(baseURL).put('/assignment/64495486f0e24f275a6ddabe')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyNTEyNCwiZXhwIjoxNjgyNTI4NzI0fQ.Tl3noh2GhVUxKvZQI6UN2EpGg8cHwyUKXzgI_p599hE')
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
        const res = await request(baseURL).put('/assignment/12495486f0e24f275a6ddabe')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyNTEyNCwiZXhwIjoxNjgyNTI4NzI0fQ.Tl3noh2GhVUxKvZQI6UN2EpGg8cHwyUKXzgI_p599hE')
        .send(req.body);
        expect(res.status).toEqual(404);
    });
}
);

// describe('GET /assignment', () => {
//     test('should return status 200 success response of all assignments', async () => {
//         const res = await request(baseURL).get('/assignment')
//         .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyNTEyNCwiZXhwIjoxNjgyNTI4NzI0fQ.Tl3noh2GhVUxKvZQI6UN2EpGg8cHwyUKXzgI_p599hE')
//         expect(res.status).toEqual(200);
//     });

//     test('should return status 400 for no token user', async () => {
//         const res = await request(baseURL).get('/assignment')
//         expect(res.status).toEqual(400);
//     });
// }
// );

// describe('GET /assignment/:id', () => {
//     test('should return status 200 for getting single assignment', async () => {
//         const res = await request(baseURL).get('/assignment/64495486f0e24f275a6ddabe')
//         .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyNTEyNCwiZXhwIjoxNjgyNTI4NzI0fQ.Tl3noh2GhVUxKvZQI6UN2EpGg8cHwyUKXzgI_p599hE')
//         expect(res.status).toEqual(200);
//     });
//     test('should return status 404 for invalid assignment id', async () => {
//         const res = await request(baseURL).get('/assignment/14495486f0e24f275a6ddabe')
//         .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM5MDQxM2QxMWJlMTUwZjU3MzQzNSIsImVtYWlsIjoibXJjaGludGFuc3V0aGFyQGdtYWlsLmNvbSIsImlhdCI6MTY4MjUyNTEyNCwiZXhwIjoxNjgyNTI4NzI0fQ.Tl3noh2GhVUxKvZQI6UN2EpGg8cHwyUKXzgI_p599hE')
//         expect(res.status).toEqual(404);
//     });
//     test('should return status 400 for no token user', async () => {
//         const res = await request(baseURL).get('/assignment/64495486f0e24f275a6ddabe')
//         expect(res.status).toEqual(400);
//     });
// }
// );

