const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'API Gateway is running' }));

// Routes to each microservice
const services = {
  '/service1': 'http://service1:3001',
  '/service2': 'http://service2:3002',
  '/service3': 'http://service3:3003',
  '/service4': 'http://service4:3004',
  '/service5': 'http://service5:3005',
  '/service6': 'http://service6:3006',
};

Object.entries(services).forEach(([path, target]) => {
  app.use(path, createProxyMiddleware({ target, changeOrigin: true }));
});

app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
