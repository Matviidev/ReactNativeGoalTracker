# Goal Tracker

A small React Native app for writing down and managing personal goals. Built while following a Udemy React Native course.

## Features

- Add goals through a full-screen modal
- Input validation: empty or whitespace-only goals are rejected, 120 character limit with a live counter
- Tap a goal to delete it, with a confirmation prompt
- Empty state when there are no goals
- Safe-area aware layout and keyboard handling

Goals are kept in memory and reset when the app restarts.

## Tech stack

- Expo SDK 57 with Expo Router
- React Native 0.86, React 19
- TypeScript (strict)

## Getting started

```bash
npm install
npm start
```

Then press `a` for Android, `i` for iOS, or `w` for web, or scan the QR code with Expo Go.

Type check:

```bash
npm run typecheck
```

## Project structure

```
src/
  app/          screens and root layout (Expo Router)
  components/   UI components
  constants/    theme tokens and app constants
  hooks/        state hooks
  types/        shared types
  utils/        helpers
```
