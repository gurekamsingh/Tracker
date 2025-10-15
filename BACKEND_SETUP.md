# Backend Setup Guide

This frontend is ready to connect to your Node.js/Express + PostgreSQL backend.

## Backend API Requirements

Your backend should expose these REST endpoints:

### Endpoints

- `GET /api/deadlines` - Get all deadlines
- `GET /api/deadlines/:id` - Get single deadline
- `POST /api/deadlines` - Create new deadline
- `PUT /api/deadlines/:id` - Update deadline
- `DELETE /api/deadlines/:id` - Delete deadline

### Response Format

All endpoints should return JSON with proper status codes:

**Success Response (GET /api/deadlines):**
```json
[
  {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "due_date": "2024-01-15T14:30:00Z",
    "priority": "high" | "medium" | "low",
    "status": "pending" | "completed",
    "user_id": "uuid",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-01T10:00:00Z"
  }
]
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## Database Schema

```sql
CREATE TYPE priority_level AS ENUM ('high', 'medium', 'low');
CREATE TYPE deadline_status AS ENUM ('pending', 'completed');

CREATE TABLE deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  priority priority_level NOT NULL DEFAULT 'medium',
  status deadline_status NOT NULL DEFAULT 'pending',
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_deadlines_user_id ON deadlines(user_id);
CREATE INDEX idx_deadlines_due_date ON deadlines(due_date);
CREATE INDEX idx_deadlines_status ON deadlines(status);
```

## Frontend Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the API URL in `.env`:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

3. For production, update to your deployed backend URL:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```

## CORS Configuration

Your backend needs to allow requests from the frontend. Add this to your Express app:

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
```

## Deployment

### Backend (Railway/Render)
1. Deploy your Node.js app to Railway or Render
2. Provision a PostgreSQL database
3. Set environment variables (DATABASE_URL, etc.)
4. Run migrations

### Frontend (Vercel)
1. Connect this repo to Vercel
2. Add environment variable: `VITE_API_URL` with your backend URL
3. Deploy

## Development

Start the frontend:
```bash
npm run dev
```

The app will connect to your backend at the URL specified in `.env`.

## Features Included

✅ TypeScript types for all data structures
✅ React Query for data fetching & caching
✅ Form validation with react-hook-form + zod
✅ Real-time countdown timers
✅ Color-coded urgency indicators
✅ Priority & status filtering
✅ Responsive design
✅ Error handling & toast notifications
✅ Timezone support with date-fns
