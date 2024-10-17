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
- **Linting**: ESLint
- **Testing**: Vitest + JSDOM for react components
  - To view test results, type the following in the terminal:
    - npm install  
    - cd frontend
    - npm test

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

Must have installed:
  - Node.js
  - Java version 17
For Java, you probably have a newer version installed, but you need to have version 17 installed as well.
Link to download Java version 17 (https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).

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
