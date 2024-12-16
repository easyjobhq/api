# Build stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install --force

RUN npm install -g @nestjs/cli

RUN npm install  --force --save-dev @types/express @types/multer

COPY . .

# Add verbose flag to see more detailed output
RUN npm run build --verbose

# Prod stage 
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist/ ./dist
COPY --from=build /usr/src/app/us-east-2-bundle.pem ./

COPY package*.json ./

RUN npm install --force --only=production

RUN rm package*.json

EXPOSE 3000

CMD ["node", "dist/main.js"]