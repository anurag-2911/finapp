# FinApp Frontend Documentation

## Introduction

The FinApp frontend is a React-based web application that serves as the user interface for the FinApp microservices backend. It provides users with the ability to:

- **Sign Up**: Create a new account.
- **Log In**: Authenticate and access personalized features.
- **Apply for Financing**: Submit finance applications.
- **View Financing Options**: Explore available financing products.
- **Admin Panel**: For administrators to manage applications and view analytics.

This documentation outlines the concepts used, features and use cases, component structure, interaction with the backend, state management, and deployment processes involving Docker and Kubernetes.

---

## Table of Contents

1. [Concepts Used](#concepts-used)
2. [Features and Use Cases](#features-and-use-cases)
3. [Component Structure](#component-structure)
4. [Interaction with the Backend](#interaction-with-the-backend)
5. [State Management](#state-management)
6. [Dashboards](#dashboards)
7. [Deployment](#deployment)
   - [Docker](#docker)
   - [Kubernetes](#kubernetes)
8. [Conclusion](#conclusion)

---

## Concepts Used

### React

- **Functional Components**: The application primarily uses functional components for simplicity and readability.
- **Hooks**: Utilizes React hooks like `useState`, `useEffect`, and `useContext` for state and side-effect management.
- **Context API**: Implements the Context API for global state management, particularly for authentication.
- **React Router**: Manages client-side routing, enabling navigation between different pages without reloading the browser.

### Material-UI (MUI)

- **Component Library**: Leverages MUI for pre-built, customizable components to ensure a consistent and responsive design.
- **Theming**: Applies a custom theme to standardize colors, typography, and other stylistic elements across the application.

### Axios

- **HTTP Client**: Uses Axios for making API calls to the backend services.
- **Interceptors**: Sets up Axios interceptors to attach authentication tokens to requests automatically.

### State Management

- **useReducer Hook**: Manages complex state transitions, particularly for authentication states.
- **Context Providers**: Wraps the application with context providers to share state across components without prop drilling.

### Deployment Tools

- **Docker**: Containerizes the application for consistent deployment across environments.
- **Kubernetes**: Orchestrates the deployment, scaling, and management of the containerized application.

---

## Features and Use Cases

### User Authentication

- **Sign Up**: Allows new users to register by providing a username and password.
- **Log In**: Authenticates existing users and retrieves an access token.
- **Role-Based Access**: Differentiates between regular users and admin users, providing access to appropriate features.

### Finance Application

- **Apply for Financing**: Users can submit finance applications by selecting loan options and specifying the amount and purpose.
- **View Financing Options**: Users can explore available financing products, including details like interest rates and eligibility criteria.

### Dashboard

- **User Dashboard**: Provides users with an overview of their finance applications, including statuses and details.
- **Admin Dashboard**: Allows admin users to manage all finance applications, update statuses, and view analytics.

### Admin Panel

- **Application Management**: Admins can view all submitted applications, update their statuses (approve, deny, pending), and sort or search through them.
- **Analytics**: Displays key metrics such as total events, logins per user, and financing option checks.

### Error Handling and Feedback

- **Validation**: Implements form validations for user inputs.
- **Notifications**: Provides success and error messages to inform users about the outcomes of their actions.

---

## Component Structure

### Entry Point

- **`index.js`**: The main entry point that renders the application and wraps it with the `AuthProvider` for global authentication state.

### Main Application

- **`App.js`**: Contains the application's routing structure and wraps the content with necessary providers and theming.

### Context Providers

- **`AuthContext`**: Provides authentication state and dispatch methods throughout the application.
- **`AuthProvider`**: Wraps the application to supply the `AuthContext` to all components.

### Layout Components

- **`Navbar`**: The top navigation bar that displays different menu options based on the user's authentication status and role.
- **`Sidebar`**: The side navigation menu that provides links to different sections of the application.

### Pages

- **`Home`**: The landing page that introduces users to the application and highlights key financing options.
- **`Login`**: The login page where users can authenticate.
- **`Signup`**: The registration page for new users.
- **`NotFound`**: A 404 page displayed when users navigate to an undefined route.

### Protected Routes

- **`PrivateRoute`**: A higher-order component that protects routes requiring authentication or admin privileges.

### Dashboard Components

- **`Dashboard`**: Displays the user's finance applications and their statuses.
- **`AdminPanel`**: Allows admin users to manage finance applications.
- **`Analytics`**: Displays analytics data for admin users.

### Financing Components

- **`FinancingApplication`**: Allows users to apply for financing by selecting loan options and providing necessary details.
- **`FinancingOptions`**: Displays detailed information about available financing options.

### API Services

- **`apiService.js`**: Contains functions to interact with backend APIs, organized by service (Auth, Finance, Analytics).

---

## Interaction with the Backend

### API Endpoints

- **Authentication Service**:
  - `POST /signup`: Registers a new user.
  - `POST /login`: Authenticates a user and returns a JWT token.
- **Finance Service**:
  - `GET /financing-options`: Retrieves available financing products.
  - `POST /apply-finance`: Submits a finance application.
  - `GET /status`: Retrieves the user's finance applications.
  - `PUT /admin/update_status/{application_id}/{status}`: Admin endpoint to update application statuses.
- **Analytics Service**:
  - `GET /analytics`: Retrieves analytics data (admin only).

### Axios Configuration

- **Base URL**: The application uses an environment variable `REACT_APP_BACKEND_URL` to determine the backend's base URL.
- **Interceptors**: Axios interceptors are set up to automatically attach the JWT token from local storage to the `Authorization` header of every request.

### Authentication Flow

- **Token Storage**: Upon successful login, the JWT token is stored in local storage and the global authentication state is updated.
- **Protected Routes**: Routes that require authentication check the global authentication state and redirect unauthenticated users to the login page.

### Data Fetching

- **Use of `useEffect`**: Components that fetch data from the backend use the `useEffect` hook to perform side effects after the component mounts.
- **Error Handling**: API service functions include error handling to catch and process any issues during data fetching.

---

## State Management

### Context API and Reducers

- **Global State**: The `AuthContext` provides global state management for authentication-related data.
- **Reducer Functions**: The `authReducer` handles state transitions based on dispatched actions (`LOGIN_SUCCESS`, `LOGOUT`).

### Local Component State

- **`useState` Hook**: Used extensively for managing local state within components (e.g., form inputs, loading states).
- **Form Handling**: Components like `Login` and `Signup` use local state to manage form data and validation.

### Side Effects

- **`useEffect` Hook**: Manages side effects such as fetching data from APIs when components mount or when dependencies change.

### Token Management

- **Storage**: Tokens are stored in local storage for persistence across sessions.
- **Clearing Tokens**: Tokens are cleared from local storage upon logout to prevent unauthorized access.

---

## Dashboards

### User Dashboard

- **Overview**: Provides users with a summary of their finance applications.
- **Features**:
  - Displays application details: purpose, amount, status, submission date.
  - Shows loan types associated with each application.
  - Offers a user-friendly interface to monitor application statuses.

### Admin Dashboard

- **Overview**: Enables admin users to manage finance applications and access analytics.
- **Features**:
  - **Application Management**:
    - View all submitted applications.
    - Update application statuses (approve, deny, pending).
    - Sort and search through applications.
  - **Analytics**:
    - Display key metrics such as total events, total logins, and financing checks.
    - Provide insights into user engagement and application performance.

---

## Deployment

### Docker

- **Purpose**: Containerizes the application to ensure consistency across different environments (development, testing, production).
- **Dockerfile**:
  - Uses an official Node.js image as the base.
  - Copies the application code into the container.
  - Installs dependencies and builds the React application.
  - Serves the application using a lightweight HTTP server like `serve` or `nginx`.
- **Image Building**:
  - The Docker image is built using the Dockerfile and tagged appropriately.
  - The image is pushed to Docker Hub or another container registry.

### Kubernetes

- **Purpose**: Orchestrates the deployment, scaling, and management of the Dockerized application.
- **Deployment Configuration**:
  - **Deployment**:
    - Specifies the desired number of replicas.
    - Defines the container image to use.
    - Sets resource requests and limits for CPU and memory.
    - Configures environment variables, such as `REACT_APP_BACKEND_URL`.
  - **Service**:
    - Exposes the application internally within the cluster using a `ClusterIP` service.
    - Maps the container port to a service port.
- **Ingress Controller**:
  - Manages external access to the services in the cluster.
  - Routes HTTP/HTTPS traffic to the appropriate services based on hostnames and paths.
- **CI/CD Integration**:
  - **GitHub Actions**: Automates the build and deployment process.
    - Triggers workflows on code changes or manually.
    - Builds the Docker image and pushes it to the registry.
    - Can be extended to deploy updates to the Kubernetes cluster automatically.

---

## Conclusion

The FinApp frontend application combines modern web development practices with robust backend services to deliver a seamless user experience for managing financial applications. By leveraging React, Material-UI, and effective state management techniques, the application provides:

- **User-Friendly Interfaces**: Intuitive navigation and form handling make it easy for users to interact with the application.
- **Scalability**: Containerization with Docker and orchestration with Kubernetes ensure the application can scale to meet demand.
- **Security**: Proper handling of authentication tokens and protected routes safeguard user data.
- **Admin Tools**: Comprehensive dashboards and analytics provide administrators with the tools they need to manage the system effectively.

---

**Repository**: [https://github.com/anurag-2911/finappsvc](https://github.com/anurag-2911/finappsvc)

---

**Additional Resources**:

- **React Documentation**: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
- **Material-UI Documentation**: [https://mui.com/getting-started/usage/](https://mui.com/getting-started/usage/)
- **React Router Documentation**: [https://reactrouter.com/](https://reactrouter.com/)
- **Axios Documentation**: [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)
- **Docker Documentation**: [https://docs.docker.com/](https://docs.docker.com/)
- **Kubernetes Documentation**: [https://kubernetes.io/docs/home/](https://kubernetes.io/docs/home/)

---

