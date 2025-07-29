# Components

This directory contains all the React components used in the Tiny Little Timer application.

## Component Structure

### Core Components

- **Timer** - Displays the countdown timer with click handling
- **ProgressBar** - Visual progress indicator that fills as time progresses
- **ConfettiEffect** - Celebration animation when timer completes
- **StatsButton** - Button to open the statistics modal
- **StatsModal** - Modal displaying daily work statistics

## Usage

All components are exported from the index file for easy importing:

```javascript
import { Timer, ProgressBar, ConfettiEffect, StatsButton, StatsModal } from "../components";
```

## Component Props

### Timer
- `timeLeft` (number) - Current time remaining in seconds
- `formatTime` (function) - Function to format time display
- `handleClick` (function) - Click handler for timer control

### ProgressBar
- `progress` (number) - Progress percentage (0-100)

### ConfettiEffect
- `showConfetti` (boolean) - Whether to show confetti animation

### StatsButton
- `onClick` (function) - Click handler to open stats modal

### StatsModal
- `isOpen` (boolean) - Whether modal is visible
- `onClose` (function) - Function to close modal
- `workTime` (object) - Formatted work time object with hours and minutes

## Best Practices

- All components are pure functional components
- Props are properly typed with JSDoc comments
- Components are focused on single responsibilities
- Accessibility features are included (ARIA labels, keyboard navigation)
- Responsive design considerations are built-in 