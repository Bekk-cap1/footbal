# Указываем базовый образ с Node.js
FROM node:18 AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Указываем базовый образ для сервера
FROM nginx:alpine AS production

# Копируем собранные файлы в директорию Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx (опционально)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
