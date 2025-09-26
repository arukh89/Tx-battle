import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes for Bitcoin game data
app.get('/api/mempool/blocks', async (req, res) => {
  try {
    const response = await fetch('https://mempool.space/api/blocks');
    const blocks = await response.json();
    res.json(blocks.slice(0, 10)); // Return last 10 blocks
  } catch (error) {
    console.error('Error fetching blocks:', error);
    res.status(500).json({ error: 'Failed to fetch blocks' });
  }
});

app.get('/api/mempool/blocks/tip/height', async (req, res) => {
  try {
    const response = await fetch('https://mempool.space/api/blocks/tip/height');
    const height = await response.json();
    res.json({ height });
  } catch (error) {
    console.error('Error fetching block height:', error);
    res.status(500).json({ error: 'Failed to fetch block height' });
  }
});

app.get('/api/mempool/mempool', async (req, res) => {
  try {
    const response = await fetch('https://mempool.space/api/mempool');
    const mempool = await response.json();
    res.json(mempool);
  } catch (error) {
    console.error('Error fetching mempool:', error);
    res.status(500).json({ error: 'Failed to fetch mempool' });
  }
});

// Serve static files from client dist (if available)
const clientPath = path.resolve(__dirname, '..', 'client');
app.use(express.static(path.join(clientPath, 'dist')));

// For development, serve the client directory directly
app.use('/src', express.static(path.join(clientPath, 'src')));
app.use('/public', express.static(path.join(clientPath, 'public')));

// Serve the main HTML file for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

const port = parseInt(process.env.PORT || '5000', 10);
app.listen(port, '0.0.0.0', () => {
  console.log(`Simple server running on port ${port}`);
});