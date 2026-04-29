# ShopXpress

ShopXpress is a modern college project e-commerce website built with React + Vite + Tailwind on the frontend and Node.js + Express + MongoDB on the backend.

## Project structure

- `shopxpress-backend/`
  - `server.js` - Express server entrypoint
  - `config/db.js` - MongoDB connection
  - `models/` - Mongoose models for User, Product, Order
  - `routes/` - Auth, product, cart, order, admin APIs
  - `data/sampleProducts.json` - sample product seed data
  - `seed.js` - script to load sample products

- `shopxpress-frontend/`
  - `src/` - React app source
  - `components/` - reusable UI pieces
  - `context/` - auth and cart context providers
  - `pages/` - route screens for home, products, cart, auth, checkout, admin
  - `services/` - API service helpers

## Setup instructions

### 1. Install backend dependencies

Open a terminal in `shopxpress-backend/`:

```powershell
cd c:\Users\Devansh Agarwal\Desktop\fsd2\shopxpress-backend
npm install
```

### 2. Install frontend dependencies

Open another terminal in `shopxpress-frontend/`:

```powershell
cd c:\Users\Devansh Agarwal\Desktop\fsd2\shopxpress-frontend
npm install
```

### 3. Configure environment

Copy `.env.example` to `.env` for both backend and frontend if needed.

For backend, create `.env`:

```powershell
copy .env.example .env
```

You can use the defaults:

```text
MONGODB_URI=mongodb://localhost:27017/shopxpress
JWT_SECRET=ShopXpressSecret123
PORT=5000
```

For the frontend, optionally create `.env`:

```powershell
copy .env.example .env
```

### 4. Seed sample data

Run the backend seed script after MongoDB is running:

```powershell
npm run seed
```

### 5. Start the backend and frontend

Backend:

```powershell
npm run dev
```

Frontend:

```powershell
npm run dev
```

### 6. Open the app

Visit `http://localhost:5173` in your browser.

## Featured functionality

- Home page with hero banner and featured products
- Product listing with search and filters
- Product detail view with add-to-cart
- Cart page with quantity updates and remove item
- Checkout page with dummy payment fields
- Login / Signup using JWT authentication
- Backend product CRUD and admin route support
- Dark/light mode toggle
- Toast notifications and loading skeletons
- Responsive modern UI with premium styling

## Notes

- Admin route requires a user with `role: 'admin'` in MongoDB.
- Use the backend `seed.js` script for initial product content.
