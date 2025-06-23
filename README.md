# Next.js & Auth0: Full Authentication & RBAC Project

This project is a comprehensive demonstration of a full authentication system built with Next.js (App Router), NextAuth.js, and Auth0. It includes Role-Based Access Control (RBAC) to protect specific routes, a complete testing setup with Jest and React Testing Library, and full containerization with Docker.

## Technologies & Principles

- **Framework**: [Next.js](https://nextjs.org/) 14+ (App Router)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Auth Provider**: [Auth0](https://auth0.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Principles**: Follows 12-Factor App principles, including strict separation of config from code.

---

## Getting Started

Follow these instructions to get the project running on your local machine for development and testing purposes.

### Prerequisites

You must have the following software installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) (for containerized deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/ozandor/next-auth.git
cd next-auth
```

### 2. Set Up Environment Variables

This project uses environment variables for sensitive configuration like authentication keys.

First, copy the example environment file:

```bash
cp .env.example .env
```

Next, open the newly created `.env` file and fill in the values. These credentials come from your **Auth0 Application Settings**.

```env
# Auth.js
AUTH_SECRET="YOUR_AUTH_SECRET" # Generate one: https://generate-secret.vercel.app/
AUTH_URL="http://localhost:3000"

# Auth0 Provider
AUTH0_CLIENT_ID="YOUR_AUTH0_CLIENT_ID"
AUTH0_CLIENT_SECRET="YOUR_AUTH0_CLIENT_SECRET"
AUTH0_ISSUER="YOUR_AUTH0_ISSUER_BASE_URL" # e.g., https://your-tenant.us.auth0.com

# Public URLs (for client-side logout)
NEXT_PUBLIC_AUTH0_DOMAIN="YOUR_AUTH0_DOMAIN" # e.g., your-tenant.us.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID="YOUR_AUTH0_CLIENT_ID"
```

> **Note:** The custom `role` claim required for RBAC must be configured in your Auth0 dashboard using an **Action**. The namespace for the claim must match `http://localhost:3000/roles`.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Running with Docker

This project is fully containerized and can be run easily with Docker Compose. This is the recommended method for a production-like deployment.

### Build the Docker Image

This command will build the multi-stage Docker image, ensuring all dependencies are installed and the app is built for production. It uses the variables from your `.env` file.

```bash
docker compose build
```

### Run the Container

This command will start the container in detached mode.

```bash
docker compose up -d
```

The application will be running on port 3000. You can view the logs with `docker compose logs -f`.

To stop the container, run `docker compose down`.

### Running the Pre-Built Image from Docker Hub

A pre-built image is available on Docker Hub, which allows you to run the application without building it from the source. This is the fastest way to get started.

**Docker Hub Repository:** [ozandor/ke-id-auth](https://hub.docker.com/r/ozandor/ke-id-auth)

To run the image, you still need a `.env` file with your Auth0 credentials as described in the setup steps. Once your `.env` file is ready, you can run the container with the following command:

```bash
docker run -d --env-file .env -p 3000:3000 --name ke-id-auth ozandor/ke-id-auth:latest
```

This command will:

- Pull the `latest` image from Docker Hub.
- Load your environment variables from the `.env` file.
- Map port 3000 on your host to port 3000 in the container.
- Run the container in detached mode and name it `ke-id-auth`.

---

## Running Tests

This project uses Jest and React Testing Library for unit and component testing.

To run all tests:

```bash
npm test
```

To run tests in watch mode:

```bash
npm test -- --watch
```
