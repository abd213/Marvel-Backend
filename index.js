require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/comics", async (req, res) => {
  const { title, limit, page } = req.query;
  let filters = {};
  //   console.log(title);
  //   console.log(limit);
  //   console.log(req.query.skip);

  //   console.log("coucou");
  if (limit < 1 || limit > 100) {
    res.json("Vous devez choisir une limite entre 1 et 100");
  }
  if (limit) {
    filters.limit = limit;
  }
  if (title) {
    filters.title = title;
  }

  if (page) {
    filters.skip = limit * page - limit;
  }
  let query = "";
  //   console.log(filters);
  for (const property in filters) {
    query += `&${property}=${filters[property]}`;
  }
  console.log(query);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=rYjxFzl54HrAokEt${query}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/personnages", async (req, res) => {
  const { title, limit, page } = req.query;
  let filters = {};

  if (limit < 1 || limit > 100) {
    res.json("Vous devez choisir une limite entre 1 et 100");
  }
  if (limit) {
    filters.limit = limit;
  }
  if (title) {
    filters.title = title;
  }

  if (page) {
    filters.skip = limit * page - limit;
  }
  let query = "";
  console.log(filters);
  for (const property in filters) {
    query += `&${property}=${filters[property]}`;
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}${query}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});
app.get("/personnage/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/comic/:comicId", async (req, res) => {
  console.log(req.params);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
