# Tiny Little Timer

A minimalist, elegant 45-minute timer built with Next.js and React. Perfect for focused work sessions, meditation, or any timed activity.

🌐 **Live Demo**: [https://tiny-little-timer.vercel.app](https://tiny-little-timer.vercel.app)

## Features

- **45-minute timer** - Perfect for focused work sessions
- **Minimalist design** - Clean, distraction-free interface
- **Visual progress indicator** - Beautiful gradient background that fills as time progresses
- **Click to control** - Single click to start/pause, double-click to reset
- **Confetti celebration** - Visual celebration when timer completes
- **Daily statistics** - Track your completed cycles and total work time
- **PWA ready** - Can be installed as a Progressive Web App
- **Responsive design** - Works on desktop and mobile devices
- **Local storage** - Stats persist across browser sessions

## How It Works

The timer uses a 45-minute (2700 seconds) countdown that can be controlled with simple clicks:

- **Single click**: Start the timer if it's not running, or pause it if it's running
- **Double click**: Reset the timer back to 45:00
- **Visual feedback**: The background gradient fills from left to right as time progresses
- **Completion**: When the timer reaches 0:00, confetti appears and the cycle is recorded
- **Statistics**: Click "see stats" to view your daily progress (completed cycles and total work time)

The app automatically saves your daily statistics to localStorage, so you can track your productivity over time.

## Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tiny-little-timer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the timer in action.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality
- `npm run live` - Clean build and start production server

## Technology Stack

- **Next.js 15** - React framework for production
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **react-confetti** - Confetti animation library
- **PWA Support** - Progressive Web App capabilities

## Deployment

The easiest way to deploy this timer is using [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Deploy with one click

The app is already configured for Vercel deployment and includes PWA support with a service worker.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
