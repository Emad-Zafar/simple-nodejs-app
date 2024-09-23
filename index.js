import express from "express";
import axios from "axios"; // Use axios instead of request

const app = express();

// ejs setup
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/index", async (req, response) => {
  const person = req.query.person;

  if (!person) {
    return response.redirect("404");
  }

  try {
    // Wikipedia API for searching
    const url = "https://en.wikipedia.org/w/api.php";
    const params = {
      action: "opensearch",
      search: person,
      limit: "1",
      namespace: "0",
      format: "json",
    };

    // Request to Wikipedia API using axios
    const wikiSearchResponse = await axios.get(url, { params });
    const result = wikiSearchResponse.data;
    if (!result || result[3].length === 0) {
      return response.redirect("404");
    }

    const pageUrl = result[3][0];
    const pageTitle = pageUrl.split("/").pop(); // Extract title from URL

    // Fetch more detailed data for the specific Wikipedia page
    const pageInfoUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${pageTitle}`;
    const pageInfoResponse = await axios.get(pageInfoUrl);

    const pageInfo = pageInfoResponse.data;

    // Sending Wikipedia page summary back as response
    response.send({
      title: pageInfo.title,
      description: pageInfo.description,
      extract: pageInfo.extract,
    });
  } catch (error) {
    console.error(error);
    response.redirect("404");
  }
});

// 404 page
app.get("/404", (req, res) => {
  res.render("404");
});

// Port listening
app.listen(3000, () => {
  console.log("Listening at port 3000...");
});
export default app;
