import path from "path";
import { expect } from "chai"
import app from "../src/app"

import supertest from "supertest"
const request = supertest(app)

import bcryptjs from "bcryptjs"
import * as mongo from "mongodb"
import { InMemoryDbConnector } from "../src/config/dbConnector"
let friendCollection: mongo.Collection;

describe("### Verify the Friend Endpoints (/api/friends) ###", function () {
  let URL: string;

  before(async function () {
    const connection = await InMemoryDbConnector.connect()
    const db = connection.db()
    app.set('db',db)
    app.set('db-type', 'TEST-DB')
    friendCollection = db.collection("friends")
  })

  beforeEach(async function () {
    const hashedPW = await bcryptjs.hash("secret", 4)
    await friendCollection.deleteMany({})
    //Last friend below is only necessary if you have added authentications
    await friendCollection.insertMany([
      { firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: hashedPW, role: "user" },
      { firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: hashedPW, role: "user" },
      { firstName: "Ad", lastName: "Admin", email: "aa@a.dk", password: hashedPW, role: "admin" },
    ])
  })

  //In this, and all the following REMOVE tests that requires authentication if you are using the simple version of friendRoutes
  describe("While attempting to get all users", function () {
    
    it("it should get two users when authenticated", async () => {
      const response = await request
        .get('/api/friends/all')
        .auth("pp@b.dk", "secret")
      expect(response.status).to.equal(200)
      expect(response.body.length).to.equal(3)
    })

    it("it should get a 401 when NOT authenticated", async () => {
      const response = await request
        .get('/api/friends/all')
        .auth("pp@b.dk", "wrongPassword")
    expect(response.status).to.equal(401)
    })
  })

  describe("While attempting to add a user", function () {
    
    it("it should Add the user Jan Olsen", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret" }
      const response = await request.post('/api/friends').send(newFriend)
      expect(response.status).to.equal(200)
      expect(response.body.id).to.be.not.null
    })

    it("It should fail to Add user due to wrong password length", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "" }
      const response = await request.post('/api/friends').send(newFriend)
      expect(response.status).to.equal(400)
      expect(response.body.id).to.be.undefined
      const newFriend2 = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "fV8NmKDYPw2DRSuWoDsy5LEHBmDtPzGTZZnVqjy2hmW8fgi2D7Dk54VyPynJ2Z5PKdtHCcqbRKpnKaZarv6MSd2SaYmGvGRS93jzivhF9twpLU2H6TKSMo4eMHnxN5Bh" }
      const response2 = await request.post('/api/friends').send(newFriend2)
      expect(response2.status).to.equal(400)
      expect(response2.body.id).to.be.undefined
    })
  })
  
  describe("While logged in as a user", function () {
    
    it("/me should return the logged in user", async () => {
      const response = await request
        .get('/api/friends/me')
        .auth("pp@b.dk", "secret")
      expect(response.status).to.equal(200)
      expect(response.body.firstName).to.equal('Peter')  
    })
    
    it("/editme should edit the logged in user", async () => {
      const newMe = { firstName: "Kaptain", lastName: "Klo", email: "pp@b.dk", password: 'secret'}
      const response = await request.put('/api/friends/editme').send(newMe).auth("pp@b.dk", "secret")
      expect(response.status).to.equal(200)
      expect(response.body.firstName).to.be.equal('Kaptain')
    })
  })
  
  describe("While verifying the get any user, given a userId (email)", function () {
    
    it("It should allow an admin user to find Donald Duck", async () => {
      const response = await request
        .get('/api/friends/find-user/dd@b.dk')
        .auth("aa@a.dk", "secret")
      expect(response.status).to.equal(200)
      expect(response.body.firstName).to.equal('Donald')
    })
    
    it("It should not, allow admin-users to find a non-existing user", async () => {
      const response = await request
        .get('/api/friends/find-user/rr@b.dk')
        .auth("aa@a.dk", "secret")
      expect(response.status).to.equal(404)
      expect(response.body.firstName).to.not.be.equal('Peter')
    })

    it("It should not let a non-admin user find Donald Duck", async () => {
      const response = await request
      .get('/api/friends/find-user/dd@b.dk')
      .auth("pp@b.dk", "secret")
    expect(response.status).to.equal(401)
    expect(response.body.firstName).to.not.be.null
    })
  })

  describe("While verifying the 'edit any user', given a userId (email)", function () {
    
    it("It should allow an admin-user to edit Peter Pan", async () => {
      const newFriend = { firstName: "Kaptain", lastName: "Klo", email: "pp@b.dk", password: 'secret'}
      const response = await request.put('/api/friends/pp@b.dk').send(newFriend).auth("aa@a.dk", "secret")
      expect(response.status).to.equal(200)
      expect(response.body.firstName).to.be.equal('Kaptain')
    })
    
    it("It should NOT allow a non-admin user to edit Peter Pan", async () => {
      const newFriend = { firstName: "Kaptain", lastName: "Klo", email: "pp@b.dk", password: 'secret'}
      const response = await request.put('/api/friends/pp@b.dk').send(newFriend).auth("dd@b.dk", "secret")
      expect(response.status).to.equal(401)
      expect(response.body.firstName).to.be.undefined
    })
  })
  
  describe("While verifying the delete any user, given a userId (email)", function () {
    
    it("It should allow an admin user to delete Donald Duck", async () => {
      const response = await request
      .delete('/api/friends/dd@b.dk')
      .auth("aa@a.dk", "secret")
    expect(response.status).to.equal(200)
    expect(response.body).to.be.equal('User with id: dd@b.dk has been deleted')
    })
    
    it("It should NOT allow a non-admin user to delete Donald Duck", async () => {
      const response = await request
      .delete('/api/friends/dd@b.dk')
      .auth("pp@b.dk", "secret")
    expect(response.status).to.equal(401)
    expect(response.body.msg).to.be.equal('Not Authorized');
    })
  })
})
