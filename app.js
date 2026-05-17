const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем принимать JSON в теле запроса
app.use(express.json());

// Эндпоинт для проверки здоровья сервера
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Главная страница
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from CI/CD Lab App!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// API с данными
app.get('/api/data', (req, res) => {
  res.json({
    data: [
      { id: 1, name: 'Item 1', status: 'active' },
      { id: 2, name: 'Item 2', status: 'inactive' },
      { id: 3, name: 'Item 3', status: 'active' }
    ],
    total: 3,
    timestamp: new Date().toISOString()
  });
});

// Обработка ошибок (если что-то пошло не так)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    timestamp: new Date().toISOString()
  });
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;  // Экспортируем для тестов
