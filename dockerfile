# ---------- Etapa única: Build do front-end ----------
FROM node:20-slim AS build

# Define diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala dependências de forma rápida e determinística
RUN npm ci --include=dev

# Copia o restante do projeto
COPY . .

# Gera o build do front-end (gera /app/dist)
RUN npm run build

# Apenas informativo para o Pipe
CMD ["echo", "✅ Build concluído com sucesso! Arquivos disponíveis em /app/dist"]
