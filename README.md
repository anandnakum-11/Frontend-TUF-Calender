# Daily Planner

Daily Planner is a responsive calendar and productivity web app built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. It combines monthly planning, date-range notes, reminders, daily schedules, holiday awareness, and a dynamic seasonal design system that changes the visual theme automatically as the month changes.

## Overview

This project is designed to feel like more than a static calendar. Each month has its own atmosphere, image-driven styling, and seasonal color palette. As users move between months, the app updates the background treatment, visual accents, glow effects, and overall mood to match the current time of year.

The app focuses on a clean planning flow:

- browse months in a large visual calendar
- select a single date or a date range
- save notes for selected dates
- add events to specific days and hours
- manage reminders with recurring options
- view static and fetched public holidays
- read daily quotes and monthly facts
- enjoy automatic month and season-based aesthetic changes

## Features

### Calendar Experience

- Interactive monthly calendar view
- Previous and next month navigation
- Month and year jump picker
- Highlighting for today, selected dates, holidays, reminders, and scheduled activity
- Single-click date selection
- Date-range selection for notes
- Double-click day modal for quick event interaction

### Seasonal Visual Themes

- Automatic monthly theme switching
- Seasonal mapping across winter, spring, summer, and autumn
- Image-based atmosphere for every month
- Dynamic color tokens applied at runtime
- Animated background glow and floating visual elements
- Frosted glass panels and a more immersive hero section

### Productivity Tools

- Notes attached to selected dates or ranges
- Event scheduling by hour
- Event priority levels: high, medium, and low
- Reminder management with recurring modes:
  - once
  - daily
  - weekly
  - monthly

### Contextual Information

- Daily motivational quote
- Monthly fact
- Static holiday dataset
- Public US holidays fetched by year and filtered by month
- Day detail view including week number, day-of-year, and season label

## Screens and Main UI Areas

### Hero Section

The top hero changes with the selected month and highlights the current season, visual mood, and monthly atmosphere.

### Calendar Panel

The main calendar card shows the selected month image, navigation controls, and the month grid with visual state indicators.

### Day Detail Panel

The right-side day detail panel shows:

- selected date
- holiday information
- quote and month fact
- event list by hour
- add-event form
- season information

### Notes Panel

The notes section stores notes for the currently selected date or date range.

### Holidays Panel

The holidays section lists holidays for the current month and allows quick navigation to a holiday date.

### Reminders Panel

The reminders section provides reminder creation, completion toggling, recurring selection, and delete actions.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI
- date-fns
- TanStack Query
- Lucide React
- Vitest
- Playwright

## Project Structure

```text
.
├── public/
│   ├── calendar-favicon.svg
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── CalendarView.tsx
│   │   ├── DayDetailPanel.tsx
│   │   ├── DayModal.tsx
│   │   ├── HolidaySection.tsx
│   │   ├── MonthYearPicker.tsx
│   │   ├── NotesSection.tsx
│   │   ├── ReminderPanel.tsx
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── test/
│   ├── utils/
│   │   └── calendarData.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## Important Files

- `src/components/CalendarView.tsx`
  Main screen that drives the calendar UI, theme switching, month navigation, and layout composition.

- `src/utils/calendarData.ts`
  Contains month images, static holiday data, quotes, facts, season mapping, and month theme definitions.

- `src/components/DayDetailPanel.tsx`
  Shows selected date details and provides event management.

- `src/components/NotesSection.tsx`
  Handles date-range note creation and note listing.

- `src/components/ReminderPanel.tsx`
  Manages reminder creation, recurrence, completion, and deletion.

- `src/components/HolidaySection.tsx`
  Displays current-month holidays and allows direct date selection.

- `src/index.css`
  Global theme tokens, typography, and animation styles.

## Seasonal Theming System

The app includes a month-aware theming system that updates automatically based on the current month.

### How It Works

1. Each month maps to a season.
2. Each season defines a full set of design tokens such as:
   - background
   - foreground
   - primary
   - accent
   - border
   - holiday
   - range
   - reminder priority colors
3. Each month also has its own mood, atmosphere text, and visual accent label.
4. When the current month changes, the app updates CSS variables on the root document element.
5. The UI re-renders using the new palette and visual effect settings.

### Current Season Mapping

- December, January, February: Winter
- March, April, May: Spring
- June, July, August: Summer
- September, October, November: Autumn

## Local Data Behavior

The app stores user-created planner data in browser local storage.

### Stored Data Includes

- selected date range
- notes
- schedule events
- reminders

This means user data remains available after refresh in the same browser unless local storage is cleared.

## Holiday Data

The app uses two holiday sources:

- built-in static holiday data from `calendarData.ts`
- fetched public US holidays from the Nager.Date API

Fetched holidays are filtered to the selected month and merged with the static list while avoiding duplicates.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The app will start in development mode through Vite.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Available Scripts

### `npm run dev`

Starts the Vite development server.

### `npm run build`

Creates a production build.

### `npm run build:dev`

Builds the app using development mode.

### `npm run lint`

Runs ESLint across the project.

### `npm run test`

Runs tests once with Vitest.

### `npm run test:watch`

Runs Vitest in watch mode.

### `npm run preview`

Serves the production build locally.

## Design Goals

This app is built around a few core design goals:

- make planning feel visually engaging rather than mechanical
- keep the interface responsive and easy to scan
- connect each month to a stronger seasonal identity
- balance beauty with practical daily use
- keep interactions simple and direct

## Customization Guide

### Change Month Images

Edit the `monthImages` array in `src/utils/calendarData.ts`.

### Change Seasonal Colors

Edit the `seasonThemes` object in `src/utils/calendarData.ts`.

### Change Monthly Mood Text

Edit the `monthDetails` array in `src/utils/calendarData.ts`.

### Change Quotes

Edit the `quotes` array in `src/utils/calendarData.ts`.

### Change Static Holidays

Edit the `getHolidays` mapping in `src/utils/calendarData.ts`.

## Testing and Verification

The project is set up with:

- Vitest for unit and component-style testing
- Playwright configuration for browser-oriented testing

Production build verification has been completed successfully with:

```bash
npm run build
```

## Future Improvements

- drag and drop event placement
- reminder notifications
- timezone-aware reminders
- optional user accounts and cloud sync
- regional holiday selection
- export and import planner data
- theme personalization controls

## Repository

GitHub repository:

`https://github.com/anandnakum-11/Frontend-TUF-Calender`

## License

This project currently has no explicit license file in the repository. Add a license if you plan to distribute or open-source it more formally.
