require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Endpoint principal
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;

  let date;

  // Si no se proporciona una fecha, usar la actual
  if (!dateString) {
    date = new Date();
  } else {
    // Si es número (timestamp)
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
