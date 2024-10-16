# Himmerland Booking System
Third semester group project for AAU

Frontend:

Bruger React med Typescript
Vi bruger Vite, allerede sat op
Det er en single page application (SPA) med client side rendering (CSR)
For CSS bruger vi Bootstrap v5, allerde sat op, documentation her: https://getbootstrap.com/docs/5.3/getting-started/introduction/
Til at formatere typescript/react filer bruger vi VSC extension prettier, installer den og brug den ofte. Shortcut: (ALT + SHIFT + F) på windows 
Genvej til hurtigt at lave nyt React component ES7+ VSC extension, to use: write "rafce" when creating a component
React Developer Tools browser extension
Eslint, mangler at blive configureret
Testing?

Backend:

Bruger Spring Boot med Java
Med en Gradle wrapper
JPA database interface
Med en SQLite database
Med OpenAPI documentation "http://localhost:8080/swagger-ui/index.html"
JWT token system
Postman?
Testing?


Upon starting, make sure you have Node.js and Java version 17 or newer installed.
Open the terminal and type "npm setup"

After setup is complete, for development setup:

To run frontend: "npm run start:frontend"
To run backend: "npm run start:backend"
To run both: "npm start"

To view OpenAPI go to "http://localhost:8080/swagger-ui/index.html"

For production setup:

...


# Himmerland Booking System

Third semester group project for AAU

## Frontend

- **Framework**: React with TypeScript
- **Build Tool**: Vite (already set up)
- **Type**: Single Page Application (SPA) with Client-Side Rendering (CSR)
- **CSS Framework**: Bootstrap v5 (already set up)
  - Documentation: [Bootstrap v5 Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- **Code Formatting**: Use the Prettier extension in Visual Studio Code for formatting TypeScript/React files. 
  - **Installation**: Install Prettier and use it frequently.
  - **Shortcut**: `ALT + SHIFT + F` (Windows)
- **React Component Creation**: Use the ES7+ extension for quickly creating new React components.
  - **Tip**: Write `rafce` when creating a component.
- **Browser Extension**: React Developer Tools
- **Linting**: ESLint (configuration needed)
- **Testing**: TBD

## Backend

- **Framework**: Spring Boot with Java
- **Build Tool**: Gradle wrapper
- **Database**: JPA interface with SQLite
- **API Documentation**: OpenAPI available at [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- **Authentication**: JWT token system
- **Testing**: TBD
- **Postman**: TBD

## Setup Instructions

### Prerequisites

Make sure you have Node.js and Java version 17 or newer installed.

### Development Setup

Open the terminal and run:
```bash
npm run setup
```
Once setup

To run the frontend:
```bash
npm run frontend
```
To run the backend:
```bash
npm run backend
```
To run both:
```bash
npm start
```

### Production Setup
TBD