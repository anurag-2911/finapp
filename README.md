# FinApp Frontend Documentation

## Introduction

The FinApp frontend is a React-based web application that interfaces with the FinApp backend services to provide a seamless user experience for financial services. It offers functionalities such as user authentication, finance application submissions, and administrative analytics.

This documentation covers the concepts used, features and use cases, component structure, interaction with the backend, state management, dashboards, and detailed explanations of the CI/CD pipeline and Kubernetes deployment processes.

---

## Table of Contents

1. [Concepts Used](#concepts-used)
2. [Features and Use Cases](#features-and-use-cases)
3. [Component Structure](#component-structure)
4. [Interaction with the Backend](#interaction-with-the-backend)
5. [State Management](#state-management)
6. [Dashboards](#dashboards)
7. [Continuous Integration and Deployment (CI/CD)](#continuous-integration-and-deployment-cicd)
   - [GitHub Actions Workflow](#github-actions-workflow)
8. [Kubernetes Deployment](#kubernetes-deployment)
   - [Dockerization](#dockerization)
   - [Kubernetes Manifests](#kubernetes-manifests)
9. [Conclusion](#conclusion)

---

## Concepts Used

### React

- **Functional Components**: Leveraging React's functional components for a cleaner and more modular codebase.
- **React Hooks**: Utilizing hooks like `useState`, `useEffect`, and `useContext` for state management and side effects.
- **Context API**: Managing global state, particularly for authentication, using React's Context API.
- **React Router**: Implementing client-side routing to enable navigation without full page reloads.

### Material-UI (MUI)

- **Component Library**: Using Material-UI for pre-built, responsive UI components.
- **Custom Theming**: Applying consistent styling across the application through theming.

### Axios

- **HTTP Client**: Handling API requests and responses to the backend services.
- **Interceptors**: Attaching JWT tokens to requests automatically using Axios interceptors.

### State Management

- **useReducer and useContext**: Managing complex state logic and providing global state access.
- **Local State**: Using `useState` for component-specific states like form inputs and error messages.

### Deployment Tools

- **Docker**: Containerizing the application for consistent deployment environments.
- **Kubernetes**: Orchestrating container deployment, scaling, and management.
- **GitHub Actions**: Automating the build and deployment processes through CI/CD pipelines.

---

## Features and Use Cases

### User Authentication

- **Sign Up**: New users can create accounts.
- **Log In**: Existing users can authenticate to access protected features.
- **Role-Based Access Control**: Differentiates between regular users and admins, granting appropriate permissions.

### Finance Application

- **Apply for Financing**: Users can submit applications by selecting loan options and providing necessary details.
- **View Financing Options**: Users can browse available financing products with detailed information.

### Dashboards

- **User Dashboard**: Users can view the status of their finance applications.
- **Admin Dashboard**: Admins can manage applications and access analytics data.

### Admin Panel

- **Application Management**: Admins can approve or deny finance applications.
- **Analytics**: Provides insights into user activities and application performance.

---

## Component Structure

### Entry Point

- **`index.js`**: Initializes the app, wraps it with `AuthProvider`, and renders `App`.

### Main Application

- **`App.js`**: Sets up routing using `react-router-dom` and includes global components like `Navbar` and `Sidebar`.

### Context Providers

- **`AuthProvider`**: Manages authentication state and provides it to the rest of the app through `AuthContext`.

### Layout Components

- **`Navbar`**: Top navigation bar with links that change based on authentication status.
- **`Sidebar`**: Side menu with navigation options, dynamically rendered based on user role.

### Pages and Components

- **Public Pages**: `Home`, `Login`, `Signup`, `NotFound`.
- **Protected Components**: `Dashboard`, `FinancingApplication`, `FinancingOptions`.
- **Admin Components**: `AdminPanel`, `Analytics`.
- **Utility Components**: `PrivateRoute` for route protection.

### API Services

- **`apiService.js`**: Centralized API calls handling authentication, finance, and analytics services.

---

## Interaction with the Backend

### API Endpoints

- **Auth Service**:
  - `POST /signup`
  - `POST /login`
- **Finance Service**:
  - `GET /financing-options`
  - `POST /apply-finance`
  - `GET /status`
  - `PUT /admin/update_status/{application_id}/{status}`
- **Analytics Service**:
  - `GET /analytics`

### Axios Configuration

- **Base URL**: Set through `REACT_APP_BACKEND_URL`.
- **Interceptors**: Attach JWT tokens to every request for authentication.

### Authentication Flow

- **Token Handling**: Tokens are stored in `localStorage` and used for subsequent requests.
- **Route Protection**: `PrivateRoute` checks authentication state and user roles before rendering components.

### Data Fetching and Error Handling

- **Async/Await**: Used for handling promises in API calls.
- **Error States**: Managed using the local state to provide feedback to the user.

---

## State Management

### Global State

- **Authentication State**: Managed through `AuthContext` and `authReducer`, tracking `isAuthenticated`, `token`, and `role`.

### Local State

- **Component States**: Managed using `useState` for form inputs, loading indicators, and error messages.

### Side Effects

- **Data Fetching**: Implemented in `useEffect` hooks to fetch data on component mount or update.

---

## Dashboards

### User Dashboard

- **Overview**: Displays user's finance applications and their statuses.
- **Features**:
  - Lists applications with details.
  - Provides a user-friendly interface to track application progress.

### Admin Dashboard

- **Overview**: Allows admins to manage all finance applications and view analytics.
- **Features**:
  - Application management with status updates.
  - Analytics section displaying key metrics.

---

## Continuous Integration and Deployment (CI/CD)

### GitHub Actions Workflow

The CI/CD pipeline is automated using GitHub Actions, enabling continuous integration and continuous deployment of the FinApp frontend.

#### Workflow File: `.github/workflows/buildimage.yml`

```yaml
name: Build and Push Docker Image

on:
  workflow_dispatch:  # Allows manual triggering of the workflow

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: ./
          push: true
          tags: your_dockerhub_username/finapp:latest

      - name: Pull Docker image from Docker Hub
        run: docker pull your_dockerhub_username/finapp:latest

      - name: List Docker images
        run: docker images
```

#### Explanation:

- **Trigger**: The workflow is triggered manually via `workflow_dispatch`.
- **Jobs**:
  - **Build**: Runs on `ubuntu-latest` virtual environment.
- **Steps**:
  1. **Checkout Code**: Clones the repository to the runner.
  2. **Set Up Docker Buildx**: Prepares the environment for building Docker images.
  3. **Log In to Docker Hub**:
     - Uses `DOCKER_USERNAME` and `DOCKER_PASSWORD` stored in GitHub Secrets.
  4. **Build and Push Docker Image**:
     - Builds the Docker image from the Dockerfile in the root directory.
     - Pushes the image to Docker Hub with the tag `latest`.
  5. **Verify Image Push**:
     - Pulls the image from Docker Hub to confirm it was successfully pushed.
  6. **List Docker Images**: Lists the images to verify the presence of the new image.

#### Benefits:

- **Automation**: Eliminates manual steps in the build and deployment process.
- **Consistency**: Ensures the same build process is followed every time.
- **Early Error Detection**: Identifies issues in the build process before deployment.

---

## Kubernetes Deployment

### Dockerization

The application is containerized using Docker to ensure consistency across development, testing, and production environments.

#### Dockerfile (Simplified):

```dockerfile
# Use the official Node.js image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install a simple HTTP server to serve the build
RUN npm install -g serve

# Expose port 80
EXPOSE 80

# Start the server
CMD ["serve", "-s", "build", "-l", "80"]
```

#### Explanation:

- **Base Image**: Uses a lightweight Node.js image (`node:14-alpine`).
- **Working Directory**: Sets `/app` as the working directory.
- **Dependency Installation**: Installs necessary npm packages.
- **Build Process**: Builds the React application for production.
- **Serving the App**: Uses `serve` to serve the static files.
- **Port Exposure**: Exposes port `80` for the container.

### Kubernetes Manifests

The deployment to Kubernetes is defined using manifest files, specifying the desired state of the application.

#### Deployment and Service File: `infra/finapp-service.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: finapp-ui
  labels:
    app: finapp
spec:
  replicas: 1
  selector:
    matchLabels:
      app: finapp
  template:
    metadata:
      labels:
        app: finapp
    spec:
      containers:
        - name: finapp-container
          image: your_dockerhub_username/finapp:latest
          ports:
            - containerPort: 80
          resources:
            limits:
              memory: "512Mi"
              cpu: "500m"
            requests:
              memory: "256Mi"
              cpu: "250m"
          env:
            - name: REACT_APP_BACKEND_URL
              value: "http://appsxyzabc.com"

---

apiVersion: v1
kind: Service
metadata:
  name: finapp-service
spec:
  selector:
    app: finapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

#### Explanation:

- **Deployment**:
  - **Replicas**: Specifies that one replica of the pod should run.
  - **Container**:
    - **Image**: Pulls the Docker image from Docker Hub.
    - **Ports**: Exposes container port `80`.
    - **Resources**:
      - **Limits and Requests**: Defines CPU and memory allocation.
    - **Environment Variables**:
      - `REACT_APP_BACKEND_URL`: Configures the backend API endpoint.
- **Service**:
  - **Type**: `ClusterIP` exposes the service on an internal IP in the cluster.
  - **Ports**: Maps the service port `80` to the container port `80`.
  - **Selector**: Targets pods with the label `app: finapp`.

#### Deployment Steps:

1. **Build and Push Docker Image**:
   - Use the GitHub Actions workflow or build and push manually.
2. **Apply Kubernetes Manifests**:
   - Run `kubectl apply -f infra/finapp-service.yaml`.
3. **Verify Deployment**:
   - Check pods: `kubectl get pods`
   - Check services: `kubectl get services`
4. **Expose Service (Optional)**:
   - Use an Ingress controller or LoadBalancer to expose the service externally.

#### Benefits:

- **Scalability**: Easily scale the number of replicas.
- **Resilience**: Kubernetes manages pod restarts in case of failures.
- **Configuration Management**: Centralized control over deployment configurations.

---

## Summary

The FinApp frontend application is a robust, scalable, and user-friendly interface that complements the microservices architecture of the backend. By integrating modern web development practices with automated deployment pipelines and container orchestration, FinApp ensures:

- **Efficient Development and Deployment**: Streamlined CI/CD processes reduce time to market.
- **Scalability and Reliability**: Kubernetes handles scaling and resilience, ensuring high availability.
- **Security**: Role-based access control and secure communication with backend services.
- **Maintainability**: Modular codebase with a clear separation of concerns facilitates easier updates and feature additions.

---

**Repository**: [https://github.com/anurag-2911/finappsvc](https://github.com/anurag-2911/finappsvc)

---

**Additional Resources**:

- **GitHub Actions Documentation**: [https://docs.github.com/en/actions](https://docs.github.com/en/actions)
- **Docker Documentation**: [https://docs.docker.com/](https://docs.docker.com/)
- **Kubernetes Documentation**: [https://kubernetes.io/docs/home/](https://kubernetes.io/docs/home/)
- **React Documentation**: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
- **Material-UI Documentation**: [https://mui.com/getting-started/usage/](https://mui.com/getting-started/usage/)
- **Axios Documentation**: [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)

---

