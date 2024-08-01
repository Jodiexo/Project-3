const request = require('supertest')
const app = require('./app.js')
const { TextSnippet } = require('@mui/icons-material')

// beforeAll(async () => {
//   await knex.migrate.latest();

//   await knex.seed.run();
// });

// afterAll(async () => {
//   await knex.destroy();
// })

describe('GET /results', () => {
  it('should get all results', (done) => {
    request(app)
      .get('/').expect('Content-Type')})
})

describe('GET /users/1', () => {
  test('should return the user information of the user matching the ID off 1')
    request(app)
        .get('/books')
        .expect('Content-Type', /json/)
        .expect(200)
        .end ((err, res) => {
            if (err) throw err;
            expect(res.body).toEqual(
                expect.
            )
        })
})

describe('GET /admin/users', () => {

})

describe('', () => {

})
