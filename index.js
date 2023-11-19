require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { skip } = require("node:test");
const { title } = require("process");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/comics", async (req, res) => {
  const { limit, skip, title } = req.query;
  try {
    let url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`;
    if (limit && (limit > 0 || limit <= 100)) {
      url = url + `&limit=${limit}`;
    }
    if (skip && skip > 0) {
      url = url + `&skip=${skip}`;
    }
    if (title) {
      url = url + `&title=${title}`;
    }
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/personnages", async (req, res) => {
  //   let filters = {};

  //   if (limit < 1 || limit > 100) {
  //     res.json("Vous devez choisir une limite entre 1 et 100");
  //   }
  //   if (limit) {
  //     filters.limit = limit;
  //   }
  //   if (title) {
  //     filters.title = title;
  //   }

  //   if (page) {
  //     filters.skip = limit * page - limit;
  //   }
  //   let query = "";
  //   console.log(filters);
  //   for (const property in filters) {
  //     query += `&${property}=${filters[property]}`;
  //   }
  const { name, limit, skip } = req.query;
  let url = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`;
  try {
    if (limit && (limit > 0 || limit <= 100)) {
      url = url + `&limit=${limit}`;
    }
    if (skip && skip > 0) {
      url = url + `&skip=${skip}`;
    }
    if (name) {
      url = url + `&name=${name}`;
    }
    const response = await axios.get(url);
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
