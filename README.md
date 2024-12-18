# Task Manager

A modern task management system with chat-based interactions and real-time updates.

## Features

- User authentication with email/password
- Chat-based task management
- Real-time notifications
- Task assignment and tracking
- Clean, minimal UI inspired by ChatGPT

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and update the values
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Copy `.env.example` to `.env` and update the following variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_APP_NAME`: Application name (optional)
- `VITE_APP_URL`: Application URL (optional)

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── lib/           # External library configurations
├── providers/     # React context providers
├── routes/        # Route components
├── store/         # State management
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Best Practices

- Small, focused files with single responsibilities
- Consistent error handling
- Type-safe code with TypeScript
- Proper separation of concerns
- Reusable components and utilities
- Clean and maintainable code structure

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Lint code
- `npm run type-check`: Check TypeScript types

## Contributing

1. Follow the coding best practices
2. Keep files small and focused
3. Write clear commit messages
4. Add tests for new features
5. Update documentation as needed