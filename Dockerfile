# ЭТАП 1: Сборщик (builder) - здесь устанавливаем зависимости
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# ЭТАП 2: Финальный образ (меньшего размера)
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Создаем не-root пользователя для безопасности
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

# Проверка здоровья контейнера
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

CMD ["node", "app.js"]
