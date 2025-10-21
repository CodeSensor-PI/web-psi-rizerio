# ---------- Stage 1: Build ----------
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

# ---------- Stage 2: apenas os artefatos ----------
FROM alpine:3.20
WORKDIR /app
COPY --from=build /app/dist ./dist
CMD ["echo", "✅ Build completo! dist/ disponível para servir via NGINX externo"]
