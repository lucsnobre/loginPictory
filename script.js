document.addEventListener("DOMContentLoaded", function () {
    // Seleciona os formulários de cadastro e login
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    // Função genérica para manipular o envio de formulários
    async function handleFormSubmit(event, formType) {
        event.preventDefault();

        // Determina os campos de entrada com base no tipo de formulário
        const emailInput = event.target.querySelector("input[name='email']");
        const passwordInput = event.target.querySelector("input[name='password']");

        const email = emailInput.value;
        const password = passwordInput.value;

        let formData;
        let url;

        if (formType === "signup") {
            // Dados específicos para o cadastro
            formData = {
                nome: "Nome do Usuário", // Substitua pelo valor adequado
                email: email,
                senha: password,
                premium: "1",
                imagemPerfil: "URL_da_Imagem", // Substitua pelo valor adequado
                senhaRecuperacao: "Palavra_Chave" // Substitua pelo valor adequado
            };
            url = "https://back-spider.vercel.app/user/cadastrarUser";
        } else if (formType === "login") {
            // Dados específicos para o login
            formData = {
                email: email,
                senha: password
            };
            url = "https://back-spider.vercel.app/user/loginUser";
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`${formType === "signup" ? "Cadastro" : "Login"} bem-sucedido:`, data);
                // Aqui você pode adicionar lógica adicional, como redirecionamento ou armazenamento de token
            } else {
                console.error(`Erro ao realizar ${formType === "signup" ? "cadastro" : "login"}:`, response.statusText);
                // Aqui você pode exibir uma mensagem de erro para o usuário
            }
        } catch (error) {
            console.error(`Erro ao enviar dados:`, error);
            // Aqui você pode lidar com erros de rede ou outros problemas
        } finally {
            // Limpa os campos do formulário após o envio
            emailInput.value = "";
            passwordInput.value = "";
        }
    }

    // Adiciona ouvintes de evento para os formulários de cadastro e login
    if (signupForm) {
        signupForm.addEventListener("submit", (event) => handleFormSubmit(event, "signup"));
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => handleFormSubmit(event, "login"));
    }
});
