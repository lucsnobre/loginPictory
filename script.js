document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    async function submitForm(event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        const formData = {
            nome: "test tesd", // Você pode trocar por um campo de nome se quiser permitir que o usuário insira
            email: email,
            senha: password,
            premium: "1",
            imagemPerfil: "https://assets.propmark.com.br/uploads/2022/02/WhatsApp-Image-2022-02-18-at-08.52.06.jpeg",
            senhaRecuperacao: "Gato12"
        };

        const signupUrl = "https://back-spider.vercel.app/user/cadastrarUser";

        try {
            const response = await fetch(signupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Usuário cadastrado:", data);

                localStorage.setItem("userData", JSON.stringify(data));
                window.location.href = `perfil.html?id=${data.id}`;
            } else {
                const errorText = await response.text();
                console.error('Erro ao cadastrar:', response.status, errorText);
                alert("E-mail já cadastrado ou dados inválidos.");
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert("Erro ao conectar com o servidor.");
        } finally {
            emailInput.value = "";
            passwordInput.value = "";
        }
    }

    form.addEventListener("submit", submitForm);

    // Mostrar/ocultar senha
    const togglePassword = document.querySelector('.toggle-password img');
    const passwordField = document.getElementById('password');

    togglePassword?.addEventListener('click', () => {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            togglePassword.src = './img/hide.png';
        } else {
            passwordField.type = 'password';
            togglePassword.src = './img/visible.png';
        }
    });
});
