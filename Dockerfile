# Stage 1: Build the React app
FROM node:14-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:1.19-alpine

# Copy the built app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the env.js file into the Nginx folder
COPY public/env.js /usr/share/nginx/html/env.js

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
