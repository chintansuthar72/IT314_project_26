const request = require('supertest');

const baseURL = "http://localhost:5000";

describe('POST /user/login', () => {
    test('should return status 200 for valid credentials', async () => {
        const req = {
            body: {
                email: 'mrchintansuthar@gmail.com',
                password: '9898439470'
            }
        };
        const res = await request(baseURL).post('/user/login').send(req.body);
        expect(res.status).toEqual(200);
    });

    test('should return status 400 for invalid credentials', async () => {
        const req = {
            body: {
                email: 'mrchintansuthar@gmail.co',
                password: '9898439470'
            }
        };
        const res = await request(baseURL).post('/user/login').send(req.body);
        expect(res.status).toEqual(400);
    });

    test('should return status 400 for invalid email', async () => {
        const req = {
            body: {
                email: 'mrchintansuthar@gmail.co',
                password: '9898439470'
            }
        };
        const res = await request(baseURL).post('/user/login').send(req.body);
        expect(res.status).toEqual(400);
        // try {
        //     const res = await request(baseURL).post('/user/login').send(req.body);
        // } catch (err) {
        //     expect(err.response.data.error).toEqual('Email does not exist');
        // }
    });

    test('should return status 400 for invalid password', async () => {
        const req = {
            body: {
                email: 'mrchintansuthar@gmail.com',
                password: '989843947'
            }
        };
        const res = await request(baseURL).post('/user/login').send(req.body);
        expect(res.status).toEqual(400);
        // try {
        //     const res = await request(baseURL).post('/user/login').send(req.body);
        // } catch (err) {
        //     expect(err.response.data.error).toEqual('Invalid password');
        // }
    });
});


describe('POST /user/signup', () => {
    test('should return status 201 for Successful signup', async () => {
        const req = {
            body: {
                email: 'chintansuthar23345@gmail.com',
                password: '9898439470',
                phone : '9898439470',
                username : "Chintan N Suthar 12345",
                role : "STUDENT"
            }
        };
        const res = await request(baseURL).post('/user/signup').send(req.body);
        expect(res.status).toEqual(201);
    });

    test('should return status 400 for already exist email', async () => {
        const req = {
            body: {
                email: 'mrchintansuthar@gmail.com',
                password: '9898439470',
                phone : '9898439470',
                username : "Chintan Suthar 1",
                role : "STUDENT"
            }
        };
         try {
            const res = await request(baseURL).post('/user/signup').send(req.body);
        } catch (err) {
            expect(err.response.data.error).toEqual('Email already exists');
        }
    });

    test('should return status 400 for already exist username', async () => {
        const req = {
            body: {
                email: 'chintansuthar1@gmail.com',
                password: '9898439470',
                phone : '9898439470',
                username : "Chintan N Suthar",
                role : "STUDENT"
            }
        };
        const res = await request(baseURL).post('/user/signup').send(req.body);
        expect(res.status).toEqual(400);
        // try {
        //     const res = await request(baseURL).post('/user/signup').send(req.body);
        // } catch (err) {
        //     expect(err.response.data.error).toEqual('Email does not exist');
        // }
    });

    test('should return status 400 for invalid data', async () => {
        const req = {
            body: {
                email: 'mrchintansuthar@gmail.com',
                password: '9898439470',
                phone : '9898439470',
                username : "Chintan Suthar",
                role : "NONE"
            }
        };
        const res = await request(baseURL).post('/user/signup').send(req.body);
        expect(res.status).toEqual(400);
        // try {
        //     const res = await request(baseURL).post('/user/signup').send(req.body);
        // } catch (err) {
        //     expect(err.response.data.error).toEqual('Invalid password');
        // }
    });
});
