# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
CMD ["node", "dist/main.js"]
EXPOSE 3001