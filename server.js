const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// LOGIN FIXO
const EMAIL_FIXO = "admin@gmail.com";
const SENHA_FIXA = "123456";

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (email === EMAIL_FIXO && senha === SENHA_FIXA) {
        res.send({ success: true, message: "Login realizado com sucesso!" });
    } else {
        res.send({ success: false, message: "Email ou senha incorretos." });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
