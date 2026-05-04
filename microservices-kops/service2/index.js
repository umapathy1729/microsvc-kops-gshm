const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.get('/health', (req, res) => res.json({ service: 'service2', status: 'ok' }));
app.get('/', (req, res) => res.json({ message: 'Hello from service2' }));

// Add your service2 routes below

app.listen(PORT, () => console.log('Service2 running on port ' + PORT));
