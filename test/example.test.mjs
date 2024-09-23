import chai from "chai"; // Import chai as a whole
import chaiHttp from "chai-http";
import app from "../index.js"; // Ensure this imports the app correctly

chai.use(chaiHttp);
const { expect } = chai; // Destructure expect

describe("Wikipedia API Express App", () => {
  it("should render the home page (GET /)", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include("Simple nodejs app"); // Adjust this string if needed
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
