# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies using Yarn
RUN yarn install

# Copy the entire project to the working directory
COPY . .

# Build the Vue.js app for production
RUN yarn run build

# Expose port 8080 to access the app
EXPOSE 8080

# Serve the built app with a lightweight HTTP server (http-server)
RUN yarn global add http-server

# Set the default command to serve the built app
CMD ["http-server", "dist"]