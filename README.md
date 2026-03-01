# Fleet guard

**Company:** KITH travels

## Project Overview
Fleet guard is a comprehensive fleet management system designed to streamline the operations of drivers, vehicles, and managers. 

This repository contains the source code and documentation for the project.

## Repository Structure

- `Code/backend/`: Contains the Node.js/Express/TypeScript API backend.
- `Doc/`: Contains project documentation, including the [Backend API Documentation](Doc/Backend_API_Documentation.md).

## Getting Started (Backend)

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database
- npm or yarn

### Installation
1. Navigate to the backend directory:
   ```bash
   cd Code/backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration
1. Create a `.env` file in the `Code/backend` directory.
2. Add the necessary environment variables as defined in the [Backend Documentation](Doc/Backend_API_Documentation.md#environment-variables-needed) (e.g., `POSTGRES_URI`, `JWT_SECRET`, `PORT`).

### Running the Server
To start the backend server in development mode with hot-reloading:
```bash
npm run dev
```
The server will start on the port specified in your `.env` file, or port 5000 by default.

## Documentation
For more detailed information regarding the API endpoints, architecture, and security, please refer to the documents in the `Doc/` directory.
