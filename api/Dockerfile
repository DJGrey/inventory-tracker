# Specify Node version & image - name image development.
FROM node:18 AS development

# Specify working directory.
WORKDIR /inventory-manager/src/app

# Copy package and lock to host inside container working dir.
COPY package*.json ./

# Install dependencies.
RUN npm i

# Bundle sources.
COPY . .

RUN npm run build
EXPOSE 3000

# Production stage.
FROM node:18 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Specify working directory.
WORKDIR /inventory-manager/src/app

COPY --from=development /inventory-manager/src/app/ .

EXPOSE 8080
CMD ["node", "dist/main"]
