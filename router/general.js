const express = require('express');
const axios = require('axios');
const public_users = express.Router();

const BASE_URL = 'http://localhost:5000/books';

// Get all books (async/await with Axios)
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get(BASE_URL);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching books' });
  }
});

// Get book by ISBN (promise callbacks with Axios)
public_users.get('/isbn/:isbn', (req, res) => {
  axios.get(BASE_URL)
    .then((response) => {
      const book = response.data[req.params.isbn];
      if (book) return res.status(200).json(book);
      return res.status(404).json({ message: 'Book not found' });
    })
    .catch(() => res.status(500).json({ message: 'Error fetching book' }));
});

// Get books by author (async/await with Axios)
public_users.get('/author/:author', async (req, res) => {
  try {
    const response = await axios.get(BASE_URL);
    const result = Object.values(response.data).filter(
      (b) => b.author.toLowerCase() === req.params.author.toLowerCase()
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching books by author' });
  }
});

// Get books by title (promise callbacks with Axios)
public_users.get('/title/:title', (req, res) => {
  axios.get(BASE_URL)
    .then((response) => {
      const result = Object.values(response.data).filter(
        (b) => b.title.toLowerCase() === req.params.title.toLowerCase()
      );
      return res.status(200).json(result);
    })
    .catch(() => res.status(500).json({ message: 'Error fetching books by title' }));
});

module.exports.general = public_users;
