import * as chai from "chai"; // Import all exports from chai
import chaiHttp from "chai-http";
import app from "../index.js"; // Ensure this imports the app correctly

chai.use(chaiHttp);
const { expect } = chai; // Destructure expect after importing chai

describe("Wikipedia API Express App", () => {
  it("should render the home page (GET /)", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include("Simple nodejs app"); // Adjust this string to match your home page content
        done();
      });
  });

  it("should return 404 for unknown person (GET /index)", (done) => {
    chai
      .request(app)
      .get("/index?person=UnknownPerson")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
