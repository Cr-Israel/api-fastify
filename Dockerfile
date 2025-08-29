FROM node:22-alpine AS builder

WORKDIR /app

COPY . ./

# Instala todas as dependência do package-lock.json sem mudar nada.
RUN npm ci

# Roda as migrations no build
RUN npm run db:migrate

EXPOSE 3333

CMD npm run db:migrate && node src/server.ts