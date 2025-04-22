document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
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
  
      const loginUrl = "https://back-spider.vercel.app/login"; // Voltamos para o que funcionava
  
      try {
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok && data.success) {
            console.log("Login bem-sucedido:", data);
          
            // Armazenar os dados do usuário corretamente
            localStorage.setItem("userData", JSON.stringify(data.user));
          
            // Redirecionar para o perfil com o ID correto
            window.location.href = `perfil.html?id=${data.user.id}`;
          } else {
            console.error('Erro ao realizar login:', data);
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
  