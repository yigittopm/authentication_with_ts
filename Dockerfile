# From node alpine
FROM node:alpine

# Work Direction /app
WORKDIR  /app

# Copy package files
COPY package*.json .

# Init node and global ts install
RUN npm install && npm install -g typescript

# Copy all files
COPY . .

# Typescript Compiler
RUN tsc

# Expose port 
EXPOSE 3000

# Run dist/index
CMD [ "node", "dist/index.js" ]