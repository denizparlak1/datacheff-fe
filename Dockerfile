# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the application dependencies inside the container
RUN npm install

# Copy the application files to the container
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight version of Node.js runtime as a final base image
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 to the outside
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
