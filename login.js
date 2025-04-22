document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form"); // Verifique se o ID está correto
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
  
    async function submitForm(event) {
      event.preventDefault();
  
      const email = emailInput.value.trim();
      const password = passwordInput.value;
  
      const formData = {
        email: email,
        senha: password
      };
  
      const loginUrl = "https://back-spider.vercel.app/login"; // URL correta
  
      try {
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        if (response.ok) {
          console.log("Login bem-sucedido:", data);
  
          // Armazenar os dados do usuário no localStorage
          localStorage.setItem("userData", JSON.stringify(data));
          
          // Redirecionar para a tela de perfil com o ID
          window.location.href = `perfil.html?id=${data.id}`;
        } else {
          console.error('Erro ao realizar login:', data.message);
          alert(data.message || "Erro ao realizar login. Tente novamente.");
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
  