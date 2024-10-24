# Use the official Node.js image.
FROM node:16

# Set build arguments
ARG MONGO_URL

# Set environment variables
ENV MONGO_URL=${MONGO_URL}

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available).
COPY package*.json ./

# Install dependencies.
RUN npm install --f

# Copy the rest of the application code.
COPY . .

# Expose the port your app runs on (change if necessary).
EXPOSE 5000

# Command to run the application.
CMD ["npm", "start"]



# # Use the official Node.js image.
# FROM node:16

# # Set the working directory in the container.
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json (if available).
# COPY package*.json ./

# # Install dependencies.
# RUN npm install --f

# # Copy the rest of the application code.
# COPY . .

# # Build the TypeScript files.
# RUN npm run create-bundle

# # Expose the port your app runs on (change if necessary).
# EXPOSE 3000

# # Command to run the application.
# CMD ["npm", "start-dev"]
