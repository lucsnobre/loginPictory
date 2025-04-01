document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    
    function submitForm(event) {
        event.preventDefault()

        const email = emailInput.value;
        const password = passwordInput.value;
        
        const formData = {
            email: email,
            password: password
        }
        
        // Exibir os dados no console
        console.log("Dados do cadastro:", formData)
        
        // Limpar os campos do formulário
        emailInput.value = ""
        passwordInput.value = ""
    }
    
    form.addEventListener("submit", submitForm)
    
    form.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            submitForm(event)
        }
    })
})