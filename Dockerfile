# Use Ubuntu base image
FROM ubuntu:latest

# Install necessary dependencies
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://ollama.com/install.sh | sh

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy all project files
COPY . .

# Expose the port your Node.js app runs on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
