const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// Ruta con fecha opcional usando lógica en lugar de signo de pregunta
app.get('/api/:date', (req, res) => {
  let { date } = req.params;

  if (/^\d+$/.test(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Ruta sin fecha para devolver la actual
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
