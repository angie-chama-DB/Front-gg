# PixPro Frontend

Frontend application for PixPro, an AI-powered image processing platform. Built with Next.js, TypeScript, and Tailwind CSS.

## Requirements

- Node.js v18 or higher
- npm or pnpm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pixpro-frontend
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
Copy `.env.example` to `.env.local` and configure the API settings:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API configuration:
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_API_PORT=3001
```

## Running the Application

Start the development server:
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

The application follows a layered architecture:

### Pages/Components
Pages and components handle UI rendering and user interactions. They use custom hooks for state management and business logic.

### Hooks
Custom hooks encapsulate stateful logic and provide a clean interface for components. For example, `useAuth` manages authentication state and provides login/logout functionality.

### Services
Services handle API communication and data fetching. All services use the centralized `apiClient` from `lib/api.ts` for HTTP requests. Services are organized by functionality (e.g., `authService` for authentication).

### API Client
The `apiClient` (`lib/api.ts`) is a centralized Axios instance that handles:
- Base URL configuration
- Request/response interceptors
- Automatic token refresh on 401 errors
- Error handling

### Data Flow
```
Page/Component → Hook → Service → apiClient → API
```

## Current Status

The application is currently using mock data for authentication. The auth service simulates API calls with delays and predefined responses. To switch to a real backend, update the API endpoints in the services and ensure the backend matches the expected response formats.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
pixpro-frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── forgot-password/   # Forgot password page
│   └── dashboard/         # Dashboard page
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and API client
├── services/             # API service functions
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── ...
```