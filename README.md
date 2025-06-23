# Next.js & Auth0 Authentication Project

This project shows how to build a full authentication system using the Next.js App Router, NextAuth.js, and Auth0. It includes Role-Based Access Control (RBAC) to protect certain pages, a testing setup. Fully containerized with Docker.

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

Follow these instructions to get the project running on your local machine for development and testing purposes. (or you can use Docker Image in the bottom)

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
# Domain and Client id have to be public
NEXT_PUBLIC_AUTH0_DOMAIN=""
NEXT_PUBLIC_AUTH0_CLIENT_ID=""
AUTH0_CLIENT_SECRET=""
# Auth0 suggested to generate secret with command: openssl rand -base64 32
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
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

### Checking Test Coverage

To generate a report showing how much of your code is covered by tests, run:

```bash
npm test -- --coverage
```

This will create a `coverage` directory in your project. Open the `lcov-report/index.html` file in your browser to see a detailed, interactive report of your test coverage.
