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
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const user = usuarios.find(u => u.email === email && u.senha === senha);

    if (user) {
        alert("Login realizado com sucesso!");
        window.location.href = "jogo.html";
    } else {
        alert("Email ou senha incorretos!");
    }
}
  

