🚀 Hismaya Cahaya Rahayu — A bilingual certification-services platform with public program discovery, secure user authentication, and centralized content administration.

## 📌 Overview

Hismaya Cahaya Rahayu is a full-stack web platform for presenting professional training and certification services to Indonesian and international audiences.

The application combines a public-facing company profile and certification catalog with a protected administration workspace. Visitors can explore the organization, services, certification programs, bundled training packages, and institutional partners in Indonesian or English. Registered users can authenticate using email, Indonesian phone number, or Google OAuth.

Administrators manage the platform’s primary business content through dedicated modules for users, company information, services, certification categories, certification programs, packages, and testimonials. Public content is retrieved directly from PostgreSQL through Prisma, allowing administrative changes to flow into the website without maintaining duplicate static datasets.

The project is implemented as a single Next.js 14 App Router application. Server Components perform database-backed page rendering, Server Actions handle mutations, NextAuth manages authentication, next-intl provides locale-aware routing and translations, and Prisma supplies the persistence layer.

The platform is designed for prospective certification participants, organizations seeking professional competency-development services, authenticated users, content administrators, and platform administrators.

## 🎯 Key Highlights

* Bilingual Indonesian and English experience with locale-prefixed routing
* Public certification catalog backed by PostgreSQL
* Dedicated ISO certification listing derived from certification categories
* Credentials authentication using email or Indonesian phone number
* Google OAuth integration
* Role-based separation between `ADMIN` and `USER`
* Protected and responsive administration dashboard
* Database-driven management for core website content
* Multilingual business content stored in structured JSON fields
* Certification search, category filtering, sorting, and pagination
* Public image storage through Vercel Blob
* Role-sensitive inactivity timeout and automatic sign-out
* Server-side validation with Zod
* Password hashing with bcrypt
* Responsive interfaces built with Tailwind CSS
* Server Actions with path revalidation after mutations

## ✨ Features

### Public Website

* Hero section with primary calls to action
* Institutional partner showcase
* Company profile and organizational information
* Professional service overview
* Featured certification programs
* Bundled training package presentation
* Main navigation and responsive mobile navigation
* Footer navigation and organization information
* Floating WhatsApp contact action
* Locale switcher for Indonesian and English

### Internationalization

* Indonesian and English language support
* Indonesian as the default locale
* Locale-prefixed public, authentication, and administrative routes
* Locale-aware navigation helpers
* Runtime translation loading through `next-intl`
* Multilingual database values for About, Service, Package, Category, Certification, and Testimonial content

### Authentication

* User registration with name, email, Indonesian phone number, and password
* Login using email address or phone number
* Google OAuth authentication
* Automatic login after successful registration
* JWT-based session strategy
* Prisma-backed authentication accounts and sessions
* Role information embedded in JWT and session payloads
* Custom localized sign-in page
* Safe post-authentication redirects

### Session Management

* Ten-minute inactivity timeout for administrators
* Fifteen-minute inactivity timeout for regular users
* Warning dialog one minute before automatic logout
* Session continuation through timer reset
* Automatic logout and localized login redirection
* Two-hour JWT maximum age
* Fifteen-minute JWT update age

### Authorization

* `ADMIN` and `USER` roles
* Middleware protection for localized administration routes
* Server-side role validation on administration pages
* Authorization checks inside administrative Server Actions
* Role-based login redirection
* Protection against administrator self-demotion
* Protection against administrator self-deletion

### Certification Discovery

* Database-backed certification listings
* Certification detail modal
* Category and sector information
* Program duration and description
* Program pricing and images
* Search functionality
* Category filtering
* Sorting controls
* Pagination
* URL query-state synchronization
* Responsive certification-card grid
* Authentication-aware registration actions
* Dedicated ISO-related certification page

### Administration Dashboard

* Total user count
* Total administrator count
* Active session count
* Total category count
* Total certification count
* Active and inactive certification counts
* Total testimonial count
* Visible and hidden testimonial counts
* Recently registered users
* Recently created certifications
* Recently submitted testimonials
* Combined recent-activity feed
* Content-section statistics
* Quick navigation to management modules

### User Management

* View registered users
* Create users
* Assign `ADMIN` or `USER` roles
* Update names, email addresses, phone numbers, and roles
* Delete users
* Duplicate email validation
* Duplicate phone validation
* Indonesian phone-number normalization
* Password hashing before storage

### About Content Management

* Create, update, and delete About content
* Indonesian and English titles
* Indonesian and English descriptions
* Supporting image management

### Service Management

* Create, update, and delete service content
* Indonesian and English service names
* Indonesian and English descriptions
* Supporting image management

### Package Management

* Package title
* Subtitle
* Short description
* Long description
* Indonesian and English content variants
* Administrative package-management module

### Category Management

* Create certification categories
* Update certification categories
* Delete certification categories
* Indonesian and English category names
* Optional multilingual category descriptions
* Category-to-certification relationships

### Certification Management

* Create, update, and delete certification programs
* Indonesian and English names
* Indonesian and English descriptions
* Indonesian and English sectors
* Indonesian and English durations
* Price management
* Image management
* Category assignment
* Active and inactive status
* Administrator ownership tracking

### Testimonial Management

* User-linked testimonial records
* Multilingual testimonial content
* Visible and hidden moderation states
* Administrative testimonial management
* Dashboard testimonial metrics
* User testimonial submission Server Action

### User Profile

* Retrieve authenticated user profile
* Update authenticated user profile

### WhatsApp Integration

* Floating WhatsApp contact button
* Package inquiry actions
* Predefined and URL-encoded WhatsApp messages
* Direct `wa.me` links

## 🛠 Tech Stack

### Frontend

* Next.js 14.2
* React 18
* TypeScript 5
* Tailwind CSS 3.4
* Framer Motion
* React Icons
* Sonner
* React Idle Timer

### Backend

* Next.js App Router
* Next.js Server Components
* Next.js Server Actions
* Prisma Client
* Zod
* bcrypt-ts

### Database

* PostgreSQL
* Prisma ORM 5.19

### Authentication

* NextAuth 5 beta
* Credentials Provider
* Google OAuth Provider
* Prisma Adapter
* JWT session strategy

### Internationalization

* next-intl 4
* JSON translation catalogs
* PostgreSQL JSON multilingual fields

### Storage

* Vercel Blob
* Static assets in the `public` directory

### Build Tools

* Next.js CLI
* PostCSS
* Prisma CLI
* tsx
* TypeScript compiler

### Package Manager

* npm

### Styling

* Tailwind CSS
* Responsive utility classes
* Framer Motion animations

### Deployment

The project is compatible with Vercel and Node.js-compatible Next.js hosting based on its framework structure, Vercel Blob integration, Prisma configuration, and production scripts.
