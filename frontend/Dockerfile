# Use official Node image
FROM node:20-slim

# Set work directory
WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend code
COPY frontend/. .

# Expose port for React dev server
EXPOSE 3000

# Start frontend
CMD ["npm", "start"]