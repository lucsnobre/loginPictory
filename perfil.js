document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userIdFromUrl = urlParams.get("id");

  const userData = JSON.parse(localStorage.getItem("userData"));

  // Verifica se os dados do usuário existem e se o ID bate com o da URL
  if (!userData || !userIdFromUrl || userData.id != userIdFromUrl) {
    window.location.href = "login.html";
    return;
  }

  // Preencher dados do usuário
  const nomeElement = document.getElementById("user-name");
  const handleElement = document.getElementById("user-handle");
  const avatarElement = document.getElementById("user-avatar");
  const bannerElement = document.getElementById("banner-image");
  const headerPicElement = document.getElementById("header-profile-pic");

  if (nomeElement) nomeElement.textContent = userData.nome || "Usuário";
  if (handleElement) handleElement.textContent = userData.email?.split("@")[0] || "handle";
  if (avatarElement) avatarElement.src = userData.imagemPerfil || "imgPerfil/semFoto.png";
  if (headerPicElement) headerPicElement.src = userData.imagemPerfil || "imgPerfil/semFoto.png";
  if (bannerElement) bannerElement.src = userData.banner || "imgPerfil/fundoPadrao.png";

  // Atualizar avatar
  const avatarInput = document.getElementById("fileInput");
  if (avatarInput) {
    avatarInput.addEventListener("change", function () {
      const file = avatarInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (avatarElement) avatarElement.src = e.target.result;
          if (headerPicElement) headerPicElement.src = e.target.result;
          salvarImagem("imagemPerfil", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Atualizar banner
  const bannerInput = document.getElementById("bannerInput");
  if (bannerInput) {
    bannerInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (bannerElement) bannerElement.src = e.target.result;
          salvarImagem("banner", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function salvarImagem(campo, imagemBase64) {
    fetch(`https://back-spider.vercel.app/user/update/${userData.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [campo]: imagemBase64 }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Imagem atualizada com sucesso", data);
        userData[campo] = imagemBase64;
        localStorage.setItem("userData", JSON.stringify(userData));
      })
      .catch((err) => {
        console.error("Erro ao salvar imagem:", err);
      });
  }
});
