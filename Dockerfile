FROM node:22-alpine AS builder

WORKDIR /app

COPY . ./

RUN npm ci

EXPOSE 3333

# Debug para ver se a variável está chegando
CMD echo "=== DEBUG ===" && \
    echo "DATABASE_URL exists: $([ -n "$DATABASE_URL" ] && echo 'YES' || echo 'NO')" && \
    echo "DATABASE_URL length: ${#DATABASE_URL}" && \
    echo "DATABASE_URL first 20 chars: ${DATABASE_URL:0:20}" && \
    echo "===============" && \
    npx drizzle-kit migrate && \
    node src/server.ts