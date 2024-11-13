# Use a Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Use an nginx server to serve the build folder
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port nginx runs on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
