function mostrarCadastro() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("cadastroBox").style.display = "block";
}

function mostrarLogin() {
    document.getElementById("cadastroBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

function cadastrar() {
    const email = document.getElementById("cadEmail").value;
    const senha = document.getElementById("cadSenha").value;

    if (email === "" || senha === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Verificar se o email termina com @gmail.com, @outlook.com ou @hotmail.com
    if (
        !email.endsWith("@gmail.com") &&
        !email.endsWith("@outlook.com") &&
        !email.endsWith("@hotmail.com")
    ) {
        alert("O email deve ser @gmail.com, @outlook.com ou @hotmail.com!");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.find(u => u.email === email)) {
        alert("Este email já está cadastrado!");
        return;
    }

    usuarios.push({ email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Conta criada com sucesso!");
    mostrarLogin();
}

function login() {
    function login() {
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    const emailCorreto = "admin@gmail.com";
    const senhaCorreta = "123456";

    if (email === emailCorreto && senha === senhaCorreta) {
        alert("Login realizado com sucesso!");
        window.location.href = "jogo.html"; // página que entra
    } else {
        alert("Email ou senha incorretos!");
    }
}

    if (user) {
        alert("Login realizado com sucesso!");
        window.location.href = "jogo.html";
    } else {
        alert("Email ou senha incorretos!");
    }
}

// LETRAS ANIMADAS
const letras = ["HTML", "CSS", "JS", "<DIV>", "</CODE>", "{ }", "</>"];

function criarLetra() {
    const span = document.createElement("span");
    span.classList.add("letra");
    span.innerText = letras[Math.floor(Math.random() * letras.length)];
    
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = (Math.random() * 3 + 3) + "s";

    document.querySelector(".letrasAnimadas").appendChild(span);

    setTimeout(() => span.remove(), 6000);
}

setInterval(criarLetra, 300);
function login() {
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}

function cadastrar() {
    const email = document.getElementById('cadEmail').value;
    const senha = document.getElementById('cadSenha').value;

    fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}

function mostrarCadastro() {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('cadastroBox').style.display = 'block';
}

function mostrarLogin() {
    document.getElementById('cadastroBox').style.display = 'none';
    document.getElementById('loginBox').style.display = 'block';
}


