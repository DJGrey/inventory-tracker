# Specify Node version & image - name image development.
FROM node:18 AS development

# Specify working directory.
WORKDIR /inventory-manager/frontend/src/app

# Copy package and lock to host inside container working dir.
COPY package*.json ./

# Install dependencies.
RUN npm i
RUN npm i -g @angular/cli@15.2.4

# Bundle sources.
COPY . .

RUN npm run build
EXPOSE 4200
