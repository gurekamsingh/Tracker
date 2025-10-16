# Deadline Tracker

A beautiful, modern deadline tracking application with real-time countdown tracking and auto-priority detection.

## Features

- 📅 Real-time countdown tracking
- 🎯 Auto-priority detection (red indicator if less than 3 days remaining)
- ✨ Smooth animations and hover effects
- 🎨 Modern UI with bold shadows and borders
- 📱 Responsive design
- ⚡ Fast and lightweight

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- React Query

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Tracker
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun dev
```

4. Open [http://localhost:8081](http://localhost:8081) in your browser

## Building for Production

```bash
npm run build
# or
bun run build
```

## Deploying to Vercel

### Method 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Method 2: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build` or `bun run build`
   - Output Directory: `dist`
6. Click "Deploy"

That's it! Your Deadline Tracker will be live on Vercel.

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── DeadlineForm.tsx
│   ├── DeadlineItem.tsx
│   └── DeadlineList.tsx
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API services
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## License

MIT