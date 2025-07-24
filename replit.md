# Replit.md

## Overview

This is a professional portfolio website built as a full-stack application showcasing April V. Sykes, an aspiring Assistant Project Manager transitioning from IT infrastructure to project management. The application features a modern React frontend with a Node.js/Express backend, styled with shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for data management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **React SPA** built with TypeScript and Vite
- **Component Structure**: Organized into UI components and page-specific sections
- **Styling System**: Custom Tailwind configuration with professional color scheme
- **UI Framework**: Comprehensive shadcn/ui component library integration
- **Responsive Design**: Mobile-first approach with professional IT/PM theme

### Backend Architecture
- **Express.js Server** with TypeScript for type safety
- **RESTful API** design for contact form submissions
- **Memory Storage** implementation with interface for future database integration
- **Error Handling**: Centralized error management with proper HTTP status codes
- **Development Tools**: Vite integration for hot module replacement

### Database Schema
- **Users Table**: Basic user management with username/password
- **Contact Submissions Table**: Stores portfolio contact form submissions
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Migration Support**: Configured for database schema versioning

## Data Flow

1. **Contact Form Submission**: Client form data → API validation → Database storage
2. **Portfolio Display**: Static content rendering with dynamic contact functionality
3. **State Management**: TanStack Query handles API calls and caching
4. **Error Handling**: Form validation with user-friendly error messages

## External Dependencies

### Core Framework Dependencies
- **React**: Frontend UI library with hooks and modern patterns
- **Express**: Backend web framework for API endpoints
- **Drizzle**: Type-safe ORM for PostgreSQL database operations
- **Neon Database**: Serverless PostgreSQL provider for data persistence

### UI and Styling
- **shadcn/ui**: Complete component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Headless UI components for accessibility and functionality
- **Lucide React**: Consistent icon system throughout the application

### Development Tools
- **Vite**: Fast build tool with HMR for development experience
- **TypeScript**: Type safety across the entire application stack
- **Zod**: Runtime type validation for form data and API schemas

## Deployment Strategy

- **Production Build**: Vite builds optimized client bundle to `dist/public`
- **Server Bundle**: esbuild creates single server bundle for deployment
- **Environment Variables**: Database URL and other secrets via environment configuration
- **Replit Integration**: Custom plugins for development environment compatibility
- **Static Assets**: Client build served by Express in production mode

The application is designed for easy deployment on platforms like Replit, with development-specific tooling that automatically excludes from production builds.