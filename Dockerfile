FROM node:22-alpine AS builder

WORKDIR /app

COPY . ./

# Instala todas as dependência do package-lock.json sem mudar nada.
RUN npm ci --only=production

EXPOSE 3333

CMD ["node", "src/server.ts"]