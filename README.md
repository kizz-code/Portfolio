# Portfolio

Personal developer portfolio for Kshitiz Kumar.

## Structure

```
Portfolio/
├── index.html          # Main portfolio page
├── css/
│   └── style.css
├── js/
│   └── main.js
└── backend/
    ├── server.js       # Express + MongoDB API
    ├── package.json
    └── .env.example
```

## Backend Setup

1. Go into the backend folder:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file (copy from `.env.example`):
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5000
   ```

3. Run the server:
   ```bash
   node server.js
   ```

## Frontend

Update the `BACKEND_URL` in `js/main.js` to your deployed backend URL before pushing.

## API Endpoints

| Method | Endpoint        | Description              |
|--------|-----------------|--------------------------|
| POST   | /api/contact    | Save a contact message   |
| GET    | /api/messages   | View all messages        |
