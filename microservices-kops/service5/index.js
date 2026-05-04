const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.get('/health', (req, res) => res.json({ service: 'service5', status: 'ok' }));
app.get('/', (req, res) => res.json({ message: 'Hello from service5' }));

// Add your service5 routes below

app.listen(PORT, () => console.log('Service5 running on port ' + PORT));
