const express = require('express');
const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());

app.get('/health', (req, res) => res.json({ service: 'service4', status: 'ok' }));
app.get('/', (req, res) => res.json({ message: 'Hello from service4' }));

// Add your service4 routes below

app.listen(PORT, () => console.log('Service4 running on port ' + PORT));
