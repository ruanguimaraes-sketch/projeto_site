const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados
const db = new sqlite3.Database('./usuarios.db');

// Criar tabela
db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        senha TEXT
    )
`);

// Cadastro
app.post('/cadastro', (req, res) => {
    const { email, senha } = req.body;

    if (
        !email.endsWith('@gmail.com') &&
        !email.endsWith('@outlook.com') &&
        !email.endsWith('@hotmail.com')
    ) {
        return res.json({ message: 'Domínio de email inválido!' });
    }

    db.run(
        'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
        [email, senha],
        err => {
            if (err) {
                return res.json({ message: 'Email já cadastrado!' });
            }
            res.json({ message: 'Conta criada com sucesso!' });
        }
    );
});

// Login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    db.get(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha],
        (err, row) => {
            if (row) {
                res.json({ message: 'Login realizado com sucesso!' });
            } else {
                res.json({ message: 'Email ou senha incorretos!' });
            }
        }
    );
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});


