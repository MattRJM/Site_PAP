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
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
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
    themeToggle.classList.toggle('btn-primary');
    themeToggle.classList.toggle('btn-outline-primary');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
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
// Banner rotativo
// =============================
const banner = document.querySelector('.banner');
if (banner) {
  const imagens = ['img/Login.png', 'img/Votacao.png', 'img/Admin.png'];
  imagens.forEach(src => { const img = new Image(); img.src = src; });

  let indice = 0;
  banner.style.backgroundImage = `url('${imagens[indice]}')`;

  const fadeLayer = document.createElement('div');
  fadeLayer.className = 'banner-fade-layer';
  banner.appendChild(fadeLayer);

  setInterval(() => {
    fadeLayer.style.opacity = '1';
    setTimeout(() => {
      indice = (indice + 1) % imagens.length;
      banner.style.backgroundImage = `url('${imagens[indice]}')`;
      fadeLayer.style.opacity = '0';
    }, 800);
  }, 5000);
}

// =============================
// Controle de download por login
// =============================
window.addEventListener("DOMContentLoaded", () => {
  const usuarioNome = localStorage.getItem("usuarioNome");
  const downloadBtn = document.getElementById("download-btn");
  const dropdownMenu = downloadBtn.nextElementSibling;

  if (usuarioNome) {
    // Usuário logado → habilita botão normalmente
    downloadBtn.removeAttribute("disabled");
  } else {
    // Usuário deslogado → permite clicar para abrir dropdown, mas bloqueia downloads
    downloadBtn.removeAttribute("disabled"); // permite abrir dropdown visualmente
    downloadBtn.classList.add("disabled"); // mostra desabilitado

  }
});

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
