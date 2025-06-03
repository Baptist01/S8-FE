# Stage 1: Build Angular app
FROM node:23-slim AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Build Angular app (default prod build)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy Angular build output to Nginx's html directory
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
