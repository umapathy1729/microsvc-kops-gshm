const express = require('express');
const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json());

app.get('/health', (req, res) => res.json({ service: 'service6', status: 'ok' }));
app.get('/', (req, res) => res.json({ message: 'Hello from service6' }));

// Add your service6 routes below

app.listen(PORT, () => console.log('Service6 running on port ' + PORT));
