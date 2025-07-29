# Custom Hooks

This directory contains custom React hooks that encapsulate reusable logic for the Tiny Little Timer application.

## Hook Structure

### Core Hooks

- **useTimer** - Manages timer state, countdown logic, and click handling
- **useStats** - Handles statistics tracking and localStorage persistence
- **usePWA** - Manages Progressive Web App service worker registration

## Usage

All hooks are exported from the index file for easy importing:

```javascript
import { useTimer, useStats, usePWA } from "../hooks";
```

## Hook Details

### useTimer

Manages all timer-related state and logic.

**Returns:**
- `timeLeft` (number) - Current time remaining in seconds
- `isRunning` (boolean) - Whether timer is currently running
- `isComplete` (boolean) - Whether timer has completed
- `showConfetti` (boolean) - Whether to show confetti animation
- `progress` (number) - Progress percentage (0-100)
- `formatTime` (function) - Function to format time display
- `handleClick` (function) - Click handler for timer control
- `resetTimer` (function) - Function to reset timer to initial state

**Features:**
- Single click to start/pause
- Double click to reset
- Automatic confetti on completion
- Visual progress tracking

### useStats

Manages daily statistics and localStorage persistence.

**Parameters:**
- `isComplete` (boolean) - Whether timer has completed (triggers stats update)

**Returns:**
- `completedCycles` (number) - Number of completed timer cycles today
- `totalWorkTime` (number) - Total work time in seconds today
- `formatWorkTime` (function) - Function to format work time display

**Features:**
- Automatic localStorage persistence
- Daily stats tracking
- Automatic cycle counting on timer completion

### usePWA

Handles Progressive Web App service worker registration.

**Features:**
- Automatic service worker registration
- Error handling for registration failures
- PWA-ready functionality

## Best Practices

- Hooks follow the Rules of Hooks
- Each hook has a single responsibility
- Proper cleanup in useEffect hooks
- Error handling for external dependencies
- Consistent naming conventions
- JSDoc documentation for complex logic 