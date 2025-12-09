# Use multi-stage build for efficiency and security
FROM node:18-alpine AS builder

# Install dependencies in the first stage
RUN apk add --no-cache npm
WORKDIR /app
COPY package*.json ./
RUN npm install --force-reinstall
COPY . .
RUN npm run build

# Create a new image with Nginx as base for serving static files
FROM nginx:alpine

# Copy the built dist directory into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to allow incoming connections
EXPOSE 80

# Set the default command to serve static files from the copied dist directory
CMD ["nginx", "-g", "daemon off;"]