FROM node:22-alpine AS builder

WORKDIR /app

COPY . ./

# Instala todas as dependência do package-lock.json sem mudar nada.
RUN npm ci

EXPOSE 3333

CMD npx drizzle-kit migrate && node src/server.ts