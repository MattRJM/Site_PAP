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
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

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
  // Mockup Interativo (Seção Sobre)
  // =============================
  const mockupTabBtns = document.querySelectorAll('.mockup-tab-btn');
  const mockupImgs = document.querySelectorAll('.mockup-img');

  if (mockupTabBtns.length > 0 && mockupImgs.length > 0) {
    mockupTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remover classe ativa dos botões
        mockupTabBtns.forEach(b => b.classList.remove('active'));
        // Adicionar ao botão clicado
        btn.classList.add('active');

        // Esconder todas as imagens
        mockupImgs.forEach(img => img.classList.remove('active'));
        
        // Mostrar a imagem correspondente
        const targetId = btn.getAttribute('data-target');
        const targetImg = document.getElementById(targetId);
        if (targetImg) {
          targetImg.classList.add('active');
        }
      });
    });
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
        <li><a class="dropdown-item" href="#" id="logoutBtn">Sair</a></li>
      </ul>
    `;
    navbarNav.appendChild(li);

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioNome");
        localStorage.removeItem("usuarioEmail");
        localStorage.removeItem("usuarioUID");
        window.location.reload();
      });
    }
  }

  // =============================
  // Visualização de Password Genérica (Dry)
  // =============================
  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("loginPassword") || document.getElementById("regPassword") || document.getElementById("novaSenha");

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      
      const icon = toggleBtn.querySelector("i");
      if (icon) {
        if (icon.classList.contains("bi")) {
          icon.className = isPassword ? "bi bi-eye-slash" : "bi bi-eye";
        } else {
          icon.className = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
        }
      }
    });
  }

  // =============================
  // Função Global de Toast
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

  // Exportar função globalmente para uso em scripts inline
  window.showToast = showToast;
});
