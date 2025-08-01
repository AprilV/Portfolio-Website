# Replit.md

## Overview

This is a professional full-stack portfolio website for April V. Sykes, an aspiring Assistant Project Manager transitioning from IT infrastructure to project management. The application showcases a modern React frontend and a Node.js/Express backend, styled with shadcn/ui components and Tailwind CSS. It aims to highlight IT and project management capabilities, targeting Assistant Project Manager positions and internships. Key capabilities include a professional contact system, dynamic resume generation, and comprehensive project and skills displays. The project emphasizes professional positioning, technical expertise, and career transition.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application adopts a monorepo structure, separating client, server, and shared code.

### UI/UX Decisions
- Modern design with a professional IT/PM theme.
- Utilizes shadcn/ui components and Tailwind CSS for consistent styling.
- Features a two-color palette (Tech Blue and Teal Blue) for brand consistency.
- Implements smooth hover effects, micro-interactions, and animations.
- Dark mode toggle with persistent user preferences.
- Responsive design with a mobile-first approach.
- Professional navigation system with sticky sidebar (desktop) and back-to-top functionality.
- Consistent typography and unified header styling.

### Technical Implementations
- **Frontend**: React with TypeScript and Vite.
- **Backend**: Express.js server with TypeScript.
- **Database**: PostgreSQL with Drizzle ORM.
- **State Management**: TanStack Query for server state.
- **Routing**: Wouter for client-side routing.
- **ATS Resume Generator**: Advanced system with multiple specialized templates.
- **Contact Form**: Secure submission with input sanitization and anti-bot CAPTCHA.
- **Email System**: SendGrid integration for automated notifications and auto-replies.
- **Admin System**: Password-protected access for contact management and settings.
- **Security Features**: Comprehensive XSS, CSRF, rate limiting, and secure authentication.
- **Performance Optimization**: Resource preloading, image optimization, and efficient animations.
- **Accessibility**: WCAG compliant with ARIA attributes, focus management, and keyboard navigation.

### Feature Specifications
- Displays professional experience, projects, skills, and certifications.
- Integrates a portfolio search functionality with real-time results.
- Includes a world clock footer for global awareness.
- Provides verification links for certifications.
- Supports both paid IT Assistant PM positions and internships.

### System Design Choices
- Monorepo structure for clear separation of concerns.
- RESTful API design for backend services.
- Database-backed persistence for contact submissions and admin settings.
- Centralized error handling.
- Environment variables for sensitive configurations.

## External Dependencies

### Core Framework Dependencies
- **React**: Frontend UI library.
- **Express**: Backend web framework.
- **Drizzle**: Type-safe ORM for PostgreSQL.
- **Neon Database**: Serverless PostgreSQL provider.

### UI and Styling
- **shadcn/ui**: Component library.
- **Tailwind CSS**: Utility-first CSS framework.
- **Radix UI**: Headless UI components.
- **Lucide React**: Icon system.

### Development Tools
- **Vite**: Build tool.
- **TypeScript**: Language for type safety.
- **Zod**: Runtime type validation.

### Other Integrations
- **SendGrid**: Email service for notifications.
- **Font Awesome**: Professional icons.
- **Framer Motion**: Animation library.
- **TestOut**: Certification verification.
- **Cisco**: Certification verification.
- **Credly**: Badge verification.