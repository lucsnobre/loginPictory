document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    async function submitForm(event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        const formData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/user/cadastrarUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                const data = await response.json();
                console.log('Resposta da API:', data);
                // Aqui você pode adicionar código para lidar com a resposta da API, como exibir uma mensagem de sucesso ou redirecionar o usuário.
            } else {
                console.error('Erro ao enviar dados:', response.statusText);
                // Aqui você pode adicionar código para lidar com erros, como exibir uma mensagem de erro para o usuário.
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            // Aqui você pode adicionar código para lidar com erros de rede ou outros problemas.
        } finally {
            // Limpar os campos do formulário após o envio
            emailInput.value = "";
            passwordInput.value = "";
        }
    }

    form.addEventListener("submit", submitForm);

    form.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            submitForm(event);
        }
    });
});
