# Nanny.Services

Nanny.Services is a modern web application designed for finding and booking professional nannies. The platform provides a catalog of qualified specialists with filtering options, a favorite list feature, user authentication, and an appointment booking system.

Live Demo: [nanny-services-beryl.vercel.app](https://nanny-services-beryl.vercel.app/)

## Features

- **User Authentication:** Sign up and log in via Email/Password powered by Firebase Auth.
- **Nanny Catalog:** View detailed profiles including experience, ratings, pricing, and reviews.
- **Filtering and Sorting:** Search nannies by alphabetical order, price, rating, or popularity.
- **Favorites:** A dedicated page for saved profiles, accessible only to authenticated users.
- **Booking System:** Modal window for scheduling appointments with real-time field validation.
- **Protected Routes:** Restricts unauthorized access to private pages.

## Tech Stack

- **Framework / Library:** React, TypeScript
- **Routing:** React Router v7
- **Styling:** Tailwind CSS
- **Backend & Database:** Firebase (Authentication, Realtime Database / Firestore)
- **Form Management:** React Hook Form
- **Validation:** Yup
- **Build Tool:** Vite
- **Containerization:** Docker
- **Deployment:** Vercel

## Project Structure

```
Nanny.Services/
├── app/
│   ├── assets/          # Static assets (images, icons)
│   ├── components/      # Reusable UI components (modals, cards, buttons)
│   ├── constants/       # Configuration constants and static data
│   ├── context/         # React Context (authentication state, etc.)
│   ├── lib/             # Third-party library configurations (Firebase SDK)
│   ├── routes/          # Application pages and route components
│   ├── types/           # TypeScript interfaces and type definitions
│   ├── utils/           # Helper functions
│   ├── validation/      # Yup validation schemas
│   ├── app.css          # Global stylesheet
│   ├── root.tsx         # Root component
│   └── routes.ts        # Router configuration
├── public/              # Public static files
├── Dockerfile           # Docker configuration
├── .env.example         # Environment variables template
└── vite.config.ts       # Vite configuration
```

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/nanny-services.git
cd nanny-services
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Populate the `.env` file with your credentials from the Firebase Console:

```env
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

## Docker Setup

To run the application using Docker:

```bash
# Build the Docker image
docker build -t nanny-services .

# Run the container
docker run -p 3000:3000 nanny-services
```

## Available Scripts

- `npm run dev` - Runs the app in development mode using Vite
- `npm run build` - Builds the application for production
- `npm run preview` - Previews the production build locally

## License

This project is created for educational and portfolio presentation purposes.
