# S8-FE

Angular Front-End Application – Graduation Project

## Overview

S8-FE is a modern web application built with Angular and TypeScript. This repository contains the complete client-side implementation of the project, including configuration, testing setup, and build infrastructure.

The application is designed with scalability, maintainability, and clear separation of concerns in mind. It serves as the front-end layer that integrates with corresponding backend services.

## Features

- Responsive and structured user interface built with Angular
- Modular architecture for maintainability and extension
- End-to-end testing with Cypress
- Docker support for containerized deployment
- Structured project configuration for development and production environments

## Technology Stack

- Angular
- TypeScript
- Cypress
- Docker
- Tailwind CSS (if applicable)

## Installation

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or pnpm
- Angular CLI

### Setup

Clone the repository:

```bash
git clone https://github.com/Baptist01/S8-FE.git
cd S8-FE
```
Install dependencies:
```bash
npm install
```
## Development

Start the development server:
```bash
npm start
```

The application will be available at:
```bash
http://localhost:4200
```
## Testing

To run end-to-end tests:
```bash
npm run test
```

Follow the Cypress prompts to execute the test suites.

## Docker

To build and run the application using Docker:
```bash
docker build -t s8-fe .
docker run -p 4200:80 s8-fe
```
## Project Structure
```text
├── src/
│   ├── app/
│   ├── assets/
│   ├── environments/
│   └── styles/
├── cypress/
├── docker/
├── angular.json
├── package.json
└── README.md
```

# License

Licenced under the MIT licence.
