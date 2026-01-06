const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados SQLite
const db = new sqlite3.Database('./usuarios.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Conectado ao banco de dados SQLite.');
});

// Criar tabela de usuários se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        senha TEXT
    )
`);

// Cadastro de usuário
app.post('/cadastro', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.json({ message: 'Preencha todos os campos!' });
    }

    if (
        !email.endsWith('@gmail.com') &&
        !email.endsWith('@outlook.com') &&
        !email.endsWith('@hotmail.com')
    ) {
        return res.json({ message: 'Domínio de email inválido!' });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    db.run(
        'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
        [email, senhaHash],
        function (err) {
            if (err) {
                return res.json({ message: 'Email já cadastrado!' });
            }
            res.json({ message: 'Conta criada com sucesso!' });
        }
    );
});

// Login de usuário
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.json({ message: 'Preencha todos os campos!' });
    }

    db.get(
        'SELECT * FROM usuarios WHERE email = ?',
        [email],
        async (err, user) => {
            if (err) return res.json({ message: 'Erro no servidor!' });

            if (!user) {
                return res.json({ message: 'Email ou senha incorretos!' });
            }

            // Comparar senha com hash
            const senhaCorreta = await bcrypt.compare(senha, user.senha);
            if (senhaCorreta) {
                return res.json({ message: 'Login realizado com sucesso!' });
            } else {
                return res.json({ message: 'Email ou senha incorretos!' });
            }
        }
    );
});

// Rodar servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});



