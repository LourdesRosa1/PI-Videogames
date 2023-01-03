/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { conn,Videogame } = require('../../src/db.js');

const agent = session(app);

const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });


});


describe('Videogame routes', () => {

  describe('GET /videogames', () => {
    it('responde con 200', async () => { 
      await agent
      .get('/videogames')
      .expect(200)
      // .expect((res) => {
      //   expect(res.query.name === 'Portal');
      // })
    });

    it('responde con 400', () => { 
      return agent
      .get('/videogames')
      .expect(400)
    })
    
    // it('responde con 400', () => agent.get('/videogames').expect(400));

  });

});
