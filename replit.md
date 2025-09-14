# Overview

This is an adult compatibility test application built for Alex Oliveira. The application is a multi-step web platform that allows users to create profiles, specify their sexual preferences, complete compatibility questionnaires, and receive personalized compatibility scores with detailed feedback. The system features a professionally designed interface that prioritizes privacy and discretion while guiding users through a comprehensive assessment process.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design system featuring purple-based color palette for trust and intimacy
- **State Management**: React useState for local component state, TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Routing**: Single-page application with state-based navigation through different stages (welcome → login/register → preferences → questionnaire → results)

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON communication
- **Authentication**: Session-based authentication using bcrypt for password hashing
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Development Tools**: Hot module replacement with Vite integration for development workflow

## Database Design
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Structure**:
  - `users` table: Core user profile information (name, Instagram, password, birthdate, age, zodiac)
  - `userPreferences` table: Sexual preference selections
  - `questionnaireResponses` table: JSONB storage for flexible questionnaire answers
  - `compatibilityResults` table: Calculated compatibility scores and personalized feedback
- **Data Types**: UUID primary keys, JSONB for flexible data storage, proper foreign key relationships

## Authentication & Security
- **Password Security**: Bcrypt hashing with salt rounds for secure password storage
- **Session Management**: Server-side session handling with secure cookie configuration
- **Data Validation**: Zod schemas for runtime type checking and validation on both client and server
- **Input Sanitization**: Structured validation prevents malicious input injection

## Application Flow
- **Progressive Disclosure**: Multi-step process designed to build user trust gradually
- **Dynamic Questionnaires**: Question sets adapt based on selected sexual preferences (active/passive/versatile)
- **Compatibility Algorithm**: Backend calculation comparing user responses against ideal answer sets with personalized tips
- **Results Presentation**: Percentage-based scoring with color-coded feedback and actionable improvement suggestions

## Design System
- **Component Library**: Comprehensive shadcn/ui implementation with custom theming
- **Color Palette**: Professional purple-based scheme (primary: hsl(260 70% 25%)) for trust and discretion
- **Typography**: Inter font family for modern readability
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Accessibility**: Radix UI primitives ensure WCAG compliance with proper ARIA attributes

## Code Organization
- **Monorepo Structure**: Shared types and schemas between client and server in `/shared` directory
- **Component Architecture**: Reusable React components with proper separation of concerns
- **Type Safety**: End-to-end TypeScript with shared schema definitions ensuring API contract compliance
- **Development Workflow**: Hot reloading, TypeScript checking, and automated error handling for smooth development experience

# External Dependencies

## Database
- **Neon Serverless PostgreSQL**: Cloud-hosted PostgreSQL database with connection pooling
- **Environment Configuration**: DATABASE_URL environment variable for database connection string

## UI Framework
- **Radix UI**: Headless component primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **TypeScript**: Static type checking for both frontend and backend code
- **Vite**: Fast build tool with hot module replacement for development
- **ESBuild**: Fast JavaScript bundler for production builds

## Authentication
- **bcrypt**: Industry-standard password hashing library
- **Express Sessions**: Server-side session management

## Query Management
- **TanStack React Query**: Server state management with caching and synchronization
- **React Hook Form**: Efficient form handling with validation integration

## Validation
- **Zod**: Runtime type validation for API requests and responses
- **Drizzle Zod**: Integration between Drizzle ORM and Zod for database schema validation