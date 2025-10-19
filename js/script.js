document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // Scroll fade-in
  // =============================
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.2 });
  faders.forEach(f => observer.observe(f));

  // =============================
  // Navbar muda ao rolar
  // =============================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // =============================
  // Tema claro/escuro
  // =============================
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      themeToggle.classList.replace('btn-outline-primary', 'btn-primary');
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const darkAtivo = document.body.classList.contains('dark');
      themeToggle.classList.toggle('btn-primary', darkAtivo);
      themeToggle.classList.toggle('btn-outline-primary', !darkAtivo);
      localStorage.setItem('theme', darkAtivo ? 'dark' : 'light');
    });
  }

  // =============================
  // Contador de downloads (simulado)
  // =============================
  const downloadCount = document.getElementById('download-count');
  if (downloadCount) {
    let count = parseInt(downloadCount.textContent);
    setInterval(() => {
      count += Math.floor(Math.random() * 2);
      downloadCount.textContent = count;
    }, 2500);
  }

  // =============================
// Banner rotativo suave
// =============================
const banner = document.querySelector('.banner');
if (banner) {
  const imagens = [
    'img/Login.png',
    'img/Votacao.png',
    'img/Admin.png'
  ];

  // Pré-carrega as imagens para evitar piscadas
  imagens.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  let indice = 0;
  banner.style.backgroundImage = `url('${imagens[indice]}')`;

  // Cria uma camada para o fade
  const fadeLayer = document.createElement('div');
  fadeLayer.className = 'banner-fade-layer';
  banner.appendChild(fadeLayer);

  function trocarImagem() {
    fadeLayer.style.opacity = 'o';
    setTimeout(() => {
      indice = (indice + 1) % imagens.length;
      banner.style.backgroundImage = `url('${imagens[indice]}')`;
      fadeLayer.style.opacity = '0';
    }, 800); // tempo da transição
  }

  setInterval(trocarImagem, 5000);
}


  // =============================
  // Controle de download por login
  // =============================
  const usuarioNome = localStorage.getItem("usuarioNome");
  const downloadWindows = document.getElementById("download-windows");
  const downloadMobile = document.getElementById("download-mobile");

  [downloadWindows, downloadMobile].forEach(link => {
    if (link) {
      link.addEventListener("click", (e) => {
        if (!usuarioNome) {
          e.preventDefault(); // bloqueia download
          showToast("Por favor, faça login com a conta institucional para baixar.", "warning");
        }
      });
    }
  });

  // =============================
  // Navbar: mostrar "Olá, Usuário" se logado
  // =============================
  const navbarNav = document.querySelector(".navbar .navbar-nav");
  if (usuarioNome && navbarNav) {
    const loginLink = navbarNav.querySelector(".registrar-link");
    if (loginLink) loginLink.remove();

    const li = document.createElement("li");
    li.className = "nav-item dropdown";
    li.innerHTML = `
      <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Olá, ${usuarioNome}
      </a>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
        <li><a class="dropdown-item" href="#">Perfil</a></li>
        <li><a class="dropdown-item" href="#" id="logoutBtn">Sair</a></li>
      </ul>
    `;
    navbarNav.appendChild(li);

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioNome");
        localStorage.removeItem("usuarioEmail");
        window.location.reload();
      });
    }
  }

  // =============================
  // Função de toast
  // =============================
  function showToast(message, type = "info") {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container position-fixed top-0 end-0 p-3";
      document.body.appendChild(container);
    }

    const toastEl = document.createElement("div");
    const bgColor = {
      success: "bg-success text-white",
      error: "bg-danger text-white",
      info: "bg-primary text-white",
      warning: "bg-warning text-dark"
    }[type] || "bg-primary text-white";

    toastEl.className = `toast align-items-center ${bgColor} border-0 shadow mt-2 show`;
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body fw-semibold">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    container.appendChild(toastEl);

    setTimeout(() => {
      toastEl.classList.remove("show");
      setTimeout(() => toastEl.remove(), 300);
    }, 2000);
  }

});
