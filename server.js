require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

app.set('html', path.join(__dirname, 'html'));

app.set('view engine', 'ejs');



const routes = require('./routes/index');
app.use(routes);

app.use(express.static(path.join(__dirname, 'views')));


app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
