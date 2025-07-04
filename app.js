require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));


const apiRoutes = require('./routes/index');
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/Criar_Eventos', (req, res) => {
  res.render('Criar_Eventos');
});

app.get('/dashboard', (req, res) => {
  res.render('Dashboard', { usuario: { nome: 'Mike' } });
});

// Handler de erro 500
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Handler 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

module.exports = app;
