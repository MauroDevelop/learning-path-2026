// Import Express (the server engine) and CORS (security rules)
import express from 'express';
import cors from 'cors';

// Import our authentication routing module
import { authRoutes } from './infrastructure/web/routes/auth.routes';

// Initialize the Express application
const app = express();

// Define the port. Use the PORT environment variable if available, otherwise default to 3000
const PORT = process.env.PORT || 3000;

// --- GLOBAL MIDDLEWARES (Filters for all incoming requests) ---

// CORS allows a frontend (e.g., a React app) to request data from this API without being blocked
app.use(cors());

// Built-in middleware for parsing JSON request bodies
app.use(express.json());

// --- ROUTE MOUNTING (Delegating the work) ---
app.use('/api/auth', authRoutes);

// --- SERVER INITIALIZATION ---

app.listen(PORT, () => {
  console.log(`Delivery API server running at http://localhost:${PORT}`);
  console.log(`Endpoint ready: POST http://localhost:${PORT}/api/auth/register`);
});