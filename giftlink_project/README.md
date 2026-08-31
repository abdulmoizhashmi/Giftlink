# GiftLink — Full-Stack JavaScript Capstone

GiftLink is a full-stack household-item sharing application built with **React, Node.js, Express, MongoDB and JWT**. It follows the IBM Skills Network capstone architecture and the supplied UI references.

## Included features

- React home/landing page matching the supplied visual style
- Gifts/listings page with cards and item details
- Multi-parameter search: keyword, category, condition and maximum age
- Item detail page
- User registration and secure login with JWT + bcryptjs
- Editable user profile
- Authenticated create/edit/delete gift listings
- Comments on listings and a sentiment-analysis endpoint
- MongoDB persistence with Mongoose
- Demo seed data for Lamp, Curtain, Bookshelf and other household items
- Dockerfiles + Docker Compose for frontend, backend and MongoDB
- Kubernetes manifests for deployment
- GitHub Actions CI workflow
- Health check and clean REST API structure

## Project structure

```text
giftlink/
├── giftlink-backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── tests/
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── giftlink-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── .env.example
├── sentiment/
│   ├── src/
│   │   └── sentiment.js
│   ├── package.json
│   └── Dockerfile
├── k8s/
│   ├── namespace.yaml
│   ├── mongodb.yaml
│   ├── backend.yaml
│   ├── frontend.yaml
│   └── ingress.yaml
├── .github/workflows/ci.yml
├── docker-compose.yml
└── .gitignore
```

## Quick start with Docker

1. Install Docker Desktop.
2. From this folder run:

```bash
docker compose up --build
```

3. Open `http://localhost:5173`.
4. API health: `http://localhost:5000/health`.

Docker Compose starts MongoDB, the GiftLink API and the React/Nginx frontend. The backend seeds demo gifts automatically when the database is empty.

## Local development without Docker

### 1. MongoDB

Run MongoDB locally and create a database named `giftlink`, or use MongoDB Atlas.

### 2. Backend

```bash
cd giftlink-backend
npm install
copy .env.example .env   # Windows CMD
# cp .env.example .env   # macOS/Linux
npm run seed
npm run dev
```

Backend runs at `http://localhost:5000`.

### 3. Frontend

```bash
cd giftlink-frontend
npm install
copy .env.example .env   # Windows CMD
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Demo account

After seeding, use the registration page to create a new account. The seed script also creates a demo user if one does not exist:

- Email: `demo@giftlink.local`
- Password: `Demo@12345`

## API endpoints

The API intentionally follows the capstone architecture:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/gift` | List gifts |
| GET | `/api/gift/:id` | Get one gift |
| POST | `/api/gift` | Create gift (JWT) |
| PUT | `/api/gift/:id` | Update own gift (JWT) |
| DELETE | `/api/gift/:id` | Delete own gift (JWT) |
| POST | `/api/gift/:id/comments` | Add a comment (JWT) |
| POST | `/api/auths/register` | Register |
| POST | `/api/auths/login` | Login |
| PUT | `/api/auths/update` | Update profile (JWT) |
| GET | `/api/auths/me` | Current user (JWT) |
| GET | `/api/search` | Multi-parameter search |
| POST | `/sentiment` | Sentiment analysis |
| GET | `/health` | API health |

The aliases `/api/auth/register` and `/api/auth/login` are also supported for convenience.

## Environment variables

Backend `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/giftlink
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=2h
CLIENT_URL=http://localhost:5173
SENTIMENT_URL=http://localhost:5000/sentiment
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Kubernetes

The `k8s/` folder contains a simple namespace, MongoDB, backend, frontend and ingress setup. Update the image names in the manifests to your registry before applying them:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mongodb.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/ingress.yaml
```

For a classroom/lab environment you can also use `kubectl port-forward` on the frontend service.

## Notes

This project is an independent implementation based on the supplied GiftLink requirements and screenshots. It is not a copy of another student's submission. The UI is intentionally styled to resemble the provided screenshots while keeping the code modular and editable.
