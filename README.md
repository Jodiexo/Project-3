# CHAPP - Chat Application

## Description

CHAPP is a comprehensive chat application designed to facilitate 1-1 messaging, group messaging, and admin reporting. The application supports various user roles including admins, moderators, and general users, each with specific permissions to manage and interact within the platform. Admins have full control over all accounts, while moderators can manage users within their group chats. General users can engage in 1-1 messaging and submit admin reports. The application ensures secure data management by storing all chat and user information in a database handled by an Express server.

## Features

- **1-1 Messaging**: Allows users to send private messages to each other.
- **Group Messaging**: Facilitates group chats where users can communicate with multiple participants.
- **Admin Reports**: Users can send reports directly to admins for any issues or concerns.
- **Roles and Permissions**:
  - **Admins**: Manage all accounts and have the ability to ban users by their UUID.
  - **Moderators**: Manage users within their group chats and have the ability to ban users within their scope.
  - **General Users**: Engage in 1-1 messaging, participate in group chats, and submit admin reports.
- **User Blocking**: Users can block others who are messaging them.
- **Secure Data Storage**: All user and chat data are securely stored in a database managed by the Express server.

## Technology Stack

- **Frontend**:

  - React with Chakra UI for building user interfaces.
  - SweetAlert2 for alerts and notifications.
  - React Router for navigation.

- **Backend**:
  - Express.js for handling server-side logic and API requests.
  - Knex.js for query building and database migrations.
  - PostgreSQL as the database for storing user and chat data.
  - bcrypt for hashing passwords.
  - uuid for generating unique user IDs.

## Installation

1. **Clone the repository**:

```sh
git clone <repo-link>
cd Project-3
```

2. Install dependencies for the server:

```sh
Copy code
cd api
npm install
```

3. Install dependencies for the client:

```sh
cd ../ui
npm install
```

## Usage

1. Run the backend server:

```sh
cd api
npm start
```

2. Run the frontend client:

```sh
cd ../ui
npm start
```

3. Access the application:
   Open your browser and navigate to http://localhost:3000 or http://127.0.0.1:3000.

## Environment Variables

Create a .env file in the api directory with the following variables:

```makefile
NODE_ENV=development
DATABASE_URL=postgres://username:password@localhost:5432/chapp_db
JWT_SECRET=your_jwt_secret
```

## Scripts

### Server:

- npm start: Runs migrations and seeds, then starts the Express server.
- npm run start:dev: Starts the server in development mode with hot reloading.
- npm test: Runs tests.

### Client:

- npm start: Starts the React development server.
- npm run build: Builds the React application for production.
- npm test: Runs tests.

## Database Migrations and Seeds

To set up the database, run the following commands from the api directory:

```sh
npx knex migrate:latest
npx knex seed:run
```

### License

This project is licensed under the MIT License.

Author
Developed by the A Team.
