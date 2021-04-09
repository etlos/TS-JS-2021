const expect = require("chai").expect;
import app from "../playground/whattodo";
const request = require("supertest")(app);
import nock from "nock";

describe("### Verify the /whattodo endpoint ###", function () {
  before(() => {
    nock('https://www.boredapi.com')
    .get('/api/activity')
    .reply(200, {
        'activity': 'drink a single beer', 
        'type': 'education', 
        'participants': 1, 
        'price': 0, 
        'link': '', 
        'key': "1", 
        'accessibility': 0
    })
  })
  it("Should eventually provide 'drink a single beer'", async function () {
    const response = await request.get("/whattodo")
    expect(response.body.activity).to.be.equal("drink a single beer");
  })
})

describe("### Verify the /nameinfo endpoint ###", function () {
  before(() => {
    nock('https:/')
    .get('/api.genderize.io?name=donald')
    .reply(200, {
        "name":"donald",
        "gender":"male",
        "probability":0.98,
        "count":12059
    })
    nock('https:/')
    .get('/api.nationalize.io?name=donald')
    .reply(200, {
      "name":"donald",
      "country":[
        {
          "country_id":"US",
          "probability":0.17438037455929797
        },
        {
          "country_id":"CA",
          "probability":0.07862034551799452
        },
        {
          "country_id":"BW",
          "probability":0.0760385272676348
        }]
    })
    nock('https:/')
    .get('/api.agify.io?name=donald')
    .reply(200, {
      "name":"donald",
      "age":61,
      "count":10771
    })
  })
  it("Should eventually provide an object like: {'gender': 'male', 'county': 'US', age: 61}", async function () {
    const response = await request.get("/nameinfo/donald")
    expect(response.body.gender).to.be.equal("male");
    expect(response.body.country).to.be.equal("US");
    expect(response.body.age).to.be.equal(61);
  })
})
