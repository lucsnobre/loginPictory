document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")

    async function submitForm(event) {
        event.preventDefault()

        const email = emailInput.value
        const password = passwordInput.value

        // {
        //     "nome":"Vitor Amato",
        //     "email": "vitor@jesus.com",
        //     "senha":"Amato",
        //     "premium":"1",
        //     "imagemPerfil":"https://assets.propmark.com.br/uploads/2022/02/WhatsApp-Image-2022-02-18-at-08.52.06.jpeg",
        //     "senhaRecuperacao": "Gato12"
        // }

        const formData = {
            nome: "test tesd",
            email: email,
            senha: password,
            premium:"1",
            imagemPerfil:"https://assets.propmark.com.br/uploads/2022/02/WhatsApp-Image-2022-02-18-at-08.52.06.jpeg",
            senhaRecuperacao: "Gato12"
        }

        const url = "https://back-spider.vercel.app/user/cadastrarUser"

        const url2 = "http://localhost:8080/user/cadastrarUser"

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            console.log(response);
            

            if (response.ok) {
                const data = await response.json()
                console.log('Resposta da API:', data)
            } else {
                console.error('Erro ao enviar dados:', response.statusText)
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error)
        } finally {
            emailInput.value = ""
            passwordInput.value = ""
        }
    }

    form.addEventListener("submit", submitForm)

    form.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            submitForm(event);
        }
    });
    document.getElementById("explore-btn").addEventListener("click", function () {
        // Seleciona a seção second-stage e rola suavemente até ela
        document.getElementById("second-stage").scrollIntoView({
            behavior: "smooth", // Define a rolagem suave
            block: "start" // Garante que a seção comece no topo da visualização
        });
    });

// Seleciona o botão de toggle e o campo de senha
const togglePassword = document.querySelector('.toggle-password img');
const passwordField = document.getElementById('password');

// Adiciona um evento de clique ao botão de toggle
togglePassword.addEventListener('click', () => {
    // Alterna o tipo do campo de senha entre 'password' e 'text'
    if (passwordField.type === 'password') {
        passwordField.type = 'text'; // Torna o texto visível
        togglePassword.src = './img/hide.png'; // Altere a imagem para indicar que a senha está visível
    } else {
        passwordField.type = 'password'; // Oculta o texto novamente
        togglePassword.src = './img/visible.png'; // Altere a imagem para indicar que a senha está oculta
    }
});
});
