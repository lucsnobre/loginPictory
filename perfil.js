document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  async function submitForm(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const formData = {
      email: email,
      senha: password,
    };

    const loginUrl = "https://back-spider.vercel.app/login"; // Verifique a URL aqui

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();  // Verifica o retorno da resposta

      if (response.ok) {
        console.log("Login bem-sucedido:", data);

        // Armazena os dados no localStorage e redireciona para a tela de perfil com o ID
        localStorage.setItem("userData", JSON.stringify(data));
        window.location.href = `perfil.html?id=${data.id}`;
      } else {
        console.error('Erro ao realizar login:', data.message || response.statusText);
        alert(`Erro ao realizar login: ${data.message || "Credenciais inválidas"}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert("Erro de rede ou no servidor.");
    } finally {
      emailInput.value = "";
      passwordInput.value = "";
    }
  }

  form.addEventListener("submit", submitForm);
});
