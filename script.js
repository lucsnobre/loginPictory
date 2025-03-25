document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("signup-form");

    if (!form) {
        console.error("Erro: Formulário não encontrado!");
        return;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        let emailInput = document.querySelector("#email");
        let senhaInput = document.querySelector("#password");
        let nomeInput = document.querySelector("#name");



        if (!emailInput || !senhaInput) {
            console.error("Erro: Campos do formulário não encontrados!");
            return;
        }

        let email = emailInput.value.trim();
        let senha = senhaInput.value.trim();
        let nome = nomeInput ? nomeInput.value.trim() : "Usuário";
        

        if (!email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        let url = "https://back-spider.vercel.app/user/cadastrarUser";
        let dados = { name: nome, email: email, password: senha };

        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log("Resposta da API:", data);
                alert("Cadastro realizado com sucesso!");
            })
            .catch(error => console.error("Erro ao cadastrar:", error));
    });
});
