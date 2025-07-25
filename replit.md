# Replit.md

## Overview

This is a professional portfolio website built as a full-stack application showcasing April V. Sykes, an aspiring Assistant Project Manager transitioning from IT infrastructure to project management. The application features a modern React frontend with a Node.js/Express backend, styled with shadcn/ui components and Tailwind CSS.

## Recent Changes

**January 25, 2025**: Experience Section & Scroll Performance Optimization Complete
- **Modern Scroll Animations**: Implemented Framer Motion staggered fade-in effects for individual job cards
- **Company Logo Integration**: Custom SVG logos for Dell Technologies and Olympic College with professional styling
- **Enhanced Visual Design**: 6px Tech Blue left borders, role impact summary banner, interactive job titles with hover effects
- **Floating Navigation System**: Professional dot navigation with tooltips and real-time section highlighting
- **Scroll Performance Optimization**: RequestAnimationFrame throttling, simplified DOM queries, and optimized animations for smooth 60fps scrolling
- **Accurate Career Representation**: Updated role impact banner to correctly reflect complete career history: 15 years Dell (6 years Team Lead + 9 years analyst/operations), 5 years PNC Computer Operator
- **Professional Micro-interactions**: Optimized hover effects and CSS-based transitions for maximum performance

**Previous Update - January 25, 2025**: Professional Portfolio Deployment Complete - Live at aprilsykes.com
- **Custom Domain Deployed**: Portfolio successfully deployed at https://aprilsykes.com with SSL certificate
- **Email Notification System**: Fully operational with SendGrid integration and verified sender authentication
- **Professional Contact Management**: Dual email system with notifications and branded auto-replies
- **Enterprise-Ready Platform**: Complete portfolio system ready for Assistant Project Manager job applications
- **ATS Resume Generator**: 8 specialized resume templates for all career paths integrated and functional
- **Database Integration**: PostgreSQL contact storage with comprehensive form handling

**Previous Update**: Email Notification System Implementation - Professional Contact Management
- **Automated Email Notifications**: Implemented SendGrid-powered email system for instant contact form notifications
- **Dual Email System**: Automatic notification to April (april_sykes@proton.me) plus professional auto-reply to sender
- **Professional Email Templates**: Branded HTML emails with portfolio colors and professional formatting
- **Non-Blocking Implementation**: Email sending runs asynchronously to maintain fast form response times
- **Graceful Degradation**: System works with or without SendGrid API key, falling back to database-only storage
- **Professional Auto-Reply**: Personalized response email showcasing qualifications and setting response expectations
- **Email Analytics**: Comprehensive logging for tracking email delivery success and troubleshooting

**Previous Update**: Complete Color Scheme Consistency Audit - 10/10 Professional Standards
- **Comprehensive Color Audit**: Systematically reviewed and updated ALL sections for strict adherence to approved Tech Blue (#2C73D2) and Teal Blue (#43D8C9) palette
- **ATS Resume Generator Optimization**: Updated tab styling, card colors, keyword badges, and button colors to match professional standards
- **Section-by-Section Corrections**: Updated Hero, About, Experience, Projects, Skills, and Contact sections to eliminate all non-approved colors (navy, success-green, accent-blue, purple-accent, orange-accent)
- **Visual Consistency**: Replaced all achievement markers, status indicators, links, and accent elements with approved color palette
- **Professional Authority**: Complete color unification ensures enterprise-grade visual coherence perfect for IT Project Management roles
- **Brand Standards**: All visual elements now conform to strict two-color professional palette for maximum hiring manager credibility

**Previous Update**: Final Professional Polish - 9.5/10 Enterprise Quality
- **Unified Header Typography**: Removed two-tone "April V. Sykes" heading for single charcoal black (#1E1E1E) throughout
- **Consistent Section Headers**: All section headers now use unified charcoal black with single Tech Blue (#2C73D2) underline accents
- **Enhanced Visual Depth**: Implemented alternating background system - Hero (white), About (#F2F4F8), Experience (white), Projects (#F9FAFB), Skills (#F2F4F8), Resume (white), Contact (#F9FAFB)
- **Optimized Card Contrast**: Reduced certification card padding, improved shadows (shadow-sm to shadow-md), added subtle borders (#E0E6ED)
- **Professional Authority**: Single-color headings create authoritative, enterprise-grade appearance suitable for IT Project Management roles
- **Visual Cohesion**: Eliminated gradient underlines in favor of consistent Tech Blue accents across all sections
- **Performance Polish**: Reduced visual bulk in certifications section while maintaining professional presentation
- **Brand Consistency**: Unified color application ensures professional credibility for PM recruiters and hiring managers

**Previous Update**: Major ATS Resume Generator + Professional Color Scheme
- **ATS-Friendly Resume System**: Implemented comprehensive resume generator with 4 format templates (Standard ATS, Technical PM, Federal/Government, Senior PM)
- **Advanced Template Engine**: Created sophisticated resume template system with authentic data integration and keyword optimization
- **Multi-Format Support**: Each template optimized for specific job types with targeted keyword placement and format-specific content emphasis
- **Professional Navigation**: Added ATS Resume section to main navigation with smooth scrolling integration
- **Consistent Professional Color System**: Implemented unified color scheme with Tech Blue (#2C73D2) and Teal Blue (#43D8C9) as primary accents
- **Charcoal Black Primary Text**: Consistent #1E1E1E text color throughout for professional readability
- **Success Green Badges**: #10B981 for achievements, Coral Alert (#F96167) for highlights  
- **Clean Background Palette**: Soft Neutral White (#F9FAFB) with Light Gray cards (#F4F4F4)
- **Professional Button Design**: Tech Blue to Teal Blue gradient with sophisticated hover effects
- **Keyword Analysis**: Integrated comprehensive keyword analysis showing PM, technical, and soft skills terminology
- **Download Functionality**: Professional resume download system with proper file naming and formatting
- **User Experience**: Tabbed interface with format selection, optimization details, and preview capabilities

**Previous Updates**: Enhanced certifications section with detailed credential information
- Added comprehensive TestOut certification details with credential IDs
- Included CCNA certification details from Cisco
- Enhanced overall color scheme with vibrant professional palette
- Updated skills to reflect LinkedIn top skills and contact information
- Updated contact email to april_sykes@proton.me for enhanced privacy and security
- Enhanced navigation to "Experience & Leadership" emphasizing management capabilities for PM roles
- Integrated official Credly verified badges with authentic issue dates and verification links
- Added 5 verified Cisco certifications: CCNA Switching/Routing, CCNA Intro to Networks, Cybersecurity, Data Science, Learn-A-Thon 2024

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
- **ATS Resume Generator**: Advanced resume generation system with multiple templates and keyword optimization
- **Styling System**: Custom Tailwind configuration with 2025 vibrant color scheme including gradients and animations
- **UI Framework**: Comprehensive shadcn/ui component library integration with tabs, cards, and badges
- **Responsive Design**: Mobile-first approach with professional IT/PM theme and interactive hover effects

### Backend Architecture
- **Express.js Server** with TypeScript for type safety
- **RESTful API** design for contact form submissions
- **PostgreSQL Database** with Drizzle ORM for persistent data storage
- **SendGrid Email Integration** for automated contact notifications and professional auto-replies
- **Database Storage** implementation replacing memory storage
- **Error Handling**: Centralized error management with proper HTTP status codes
- **Development Tools**: Vite integration for hot module replacement

### Database Schema
- **Users Table**: Basic user management with username/password
- **Contact Submissions Table**: Stores portfolio contact form submissions
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Migration Support**: Configured for database schema versioning

## Data Flow

1. **Contact Form Submission**: Client form data → API validation → Database storage → Email notifications
2. **Email Notifications**: Instant notification to April + professional auto-reply to sender via SendGrid
3. **Portfolio Display**: Static content rendering with dynamic contact functionality
4. **State Management**: TanStack Query handles API calls and caching
5. **Error Handling**: Form validation with user-friendly error messages

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