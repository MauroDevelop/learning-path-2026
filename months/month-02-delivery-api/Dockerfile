# Stage 1: Base Image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate the Prisma Client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the application source code
COPY . .

# Transpile TypeScript to JavaScript
RUN npm run build

# Drop privileges to the non-root 'node' user for security
USER node

# Expose the application port
EXPOSE 3000

# Define the default command to run the application
CMD ["node", "dist/index.js"]