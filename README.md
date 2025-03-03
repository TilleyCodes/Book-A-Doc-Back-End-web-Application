# Book a Doc Web Application

## Tables of Contents

1. [Dependent Software and Packages](#dependent-software-and-packages)  
    - [Core Dependencies](#core-dependencies) 
    - [Development Dependencies](#development-dependencies) 
2. [Hardware Requirements](#hardware-requirements)  
    - [Development Environment](#development-environment) 
    - [Production Environment](#production-environment) 
    - [Scalability Considerations](#scalability-considerations)  
3. [Comparison to Alternative Technology Choices](#comparison-to-alternative-technology-choices) 
    - [Express.js vs Alternatives](#express.js-vs-alternatives) 
    - [MongoDB/Mongoose vs Alternatives](#mongodb-/-mongoose-vs-alternatives) 
    - [Authentication Approach](#authentication-approach)
4. [Purpose of Chosen Technologies](#purpose-of-chosen-technologies)  
    - [](#)  
        - [](#)  
        - [](#)
    - [](#)  
        - [](#)    
        - [](#)  
5. [Licensing of Chosen Technologies](#licensing-of-chosen-technologies)
6. [Code Style Guide](#code-style-guide)

## Dependent Software and Packages

The Book A Doc application depends on several key software packages, each chosen to fulfil specific requirements of a modern backend API system:  

### Core Dependencies:  

- **Express.js (v4.21.2):** Serves as the foundation of our web server, providing a robust framework for building RESTful APIs with minimal configuration. Express was selected for its flexibility, performance, and extensive middleware ecosystem.  
- **MongoDB (v8.10.1):** Our NoSQL database solution that stores all application data in document format, allowing for flexible schema evolution as the application requirements change.  
- **Mongoose (v8.10.1):** A MongoDB object modeling tool that provides a schema based solution for model definition, validation, and business logic hooks.  
- **bcrypt (v5.1.1):** Handles password hashing for our authentication system, implementing industry standard security practices for storing patient/user credentials.  
- **jsonwebtoken (v9.0.2):** Manages token based authentication, enabling secure stateless communication between the client and server.  

- **cors (v2.8.5):** Enables Cross Origin Resource Sharing, allowing the API to be consumed by clients from different domains.  
- **helmet (v8.0.0):** Adds essential HTTP security headers to protect our application from common web vulnerabilities.  
- **dotenv (v16.4.7):** Manages environment variables, ensuring sensitive configuration details aren't hardcoded in the application.  

### Development Dependencies:

- **ESLint (v8.57.1) with Airbnb Base Config (v15.0.0):** Enforces code style standards across the project, ensuring consistent, maintainable, and high quality code.  

- **Jest (v29.7.0):** Provides our testing framework, enabling comprehensive unit and integration testing.  
- **Supertest (v7.0.0):** Facilitates HTTP assertion testing, allowing us to verify our API endpoints behave as expected.  
- **MongoDB Memory Server (v10.1.4):** Creates an in memory MongoDB instance for testing, ensuring tests run in isolation without affecting production data.  

## Hardware Requirements  

The Book A Doc application has been designed to run efficiently on modest hardware configurations.

### Development Environment:

- Any modern computer with at least 4GB RAM  
- 2GHz dual core processor or better  
- 1GB free disk space for the application and dependencies  
- Internet connection for accessing MongoDB Atlas (if using cloud database)  

### Production Environment:

- Recommended minimum server specifications:  
    - 2 CPU cores  
    - 4GB RAM  
    - 10GB SSD storage  
    - Linux based operating system (Ubuntu 20.04 LTS or newer recommended)  

### Scalability Considerations:

As user demand grows, the application can be scaled horizontally by deploying multiple instances behind a load balancer, or vertically by increasing resources allocated to the server. The MongoDB database can also be scaled independently as data volume increases.    

## Comparison to Alternative Technology Choices

Several technology alternatives were considered before finalising our stack. Here's how our chosen technologies compare to alternatives.  

### Express.js vs Alternatives:  

- **Express.js vs Koa:** We chose Express over Koa for its larger community, more extensive middleware ecosystem, and established patterns. While Koa offers more modern async/await support natively, Express with middleware like express async handler provides similar functionality with broader compatibility.  
- **Express.js vs NestJS:** Express was selected over NestJS for its simplicity and lower learning curve. NestJS offers more structure and angular like architecture but introduces additional complexity that wasn't necessary for this project.  
- **Express.js vs Fastify:** Though Fastify offers better performance benchmarks, Express's mature ecosystem, extensive documentation, and widespread industry adoption made it a safer choice for our team's expertise.  

### MongoDB/Mongoose vs Alternatives

- **MongoDB vs PostgreSQL:** MongoDB's document model aligns perfectly with our JSON based API, allowing for flexible schema evolution. PostgreSQL would offer stronger transactional guarantees but at the cost of schema flexibility.  
- **Mongoose vs Native MongoDB Driver:** Mongoose's schema validation, middleware, and query building capabilities significantly reduced our development time compared to using the native driver directly.  

### Authentication Approach:  

- **JWT vs Session based Authentication:** JWT tokens enable stateless authentication, eliminating the need for server-side session storage and simplifying scaling. Session-based auth would have required additional dependencies like Redis for session management.  

## Purpose of Chosen Technologies

Each technology was carefully selected to address specific aspects of the application.  

- **Express.js:** Forms the backbone of our API routing system, handling HTTP requests/responses and middleware integration.  
- **MongoDB:** Provides a flexible, document oriented database that closely matches our domain objects (patients, doctors, bookings).  
- **bcrypt:** Ensures secure password storage through industry standard hashing algorithms.  
- **JWT:** Enables secure authentication without server side session storage, improving scalability.  
- **Helmet:** Protects against common web vulnerabilities by setting appropriate security headers.  
- **CORS:** Enables controlled access to our API from various client applications.  
- **ESLint with Airbnb:** Enforces consistent code style and quality standards across the development team.  
- **Jest/Supertest:** Provides comprehensive testing capabilities to ensure application reliability.  

## Licensing of Chosen Technologies

All technologies used in Book A Doc were selected with careful consideration of their licensing terms to ensure compliance and minimise legal risks.  

- **Express.js:** Licensed under the MIT License, allowing free use, modification, and distribution.  
- **MongoDB:** Community Server is licensed under the Server Side Public License (SSPL), which is free for most use cases except when offering MongoDB as a service.  
- **Mongoose:** Licensed under the MIT License. 
- **bcrypt, jsonwebtoken, cors, helmet, dotenv:** All use the MIT License, providing maximum flexibility for our application.  
- **ESLint:** Licensed under the MIT License.  
- **Jest:** Licensed under the MIT License.  
- **Supertest:** Licensed under the MIT License.  

The MIT License is an advantage for our project as it allows for unrestricted use, modification, and distribution, requiring only that the license notice be included in any substantial portions of the software. This gives us the freedom to develop and potentially commercialise our application without significant licensing constraints.  

## Code Style Guide
