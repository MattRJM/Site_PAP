// =============================
// Scroll fade-in
// =============================
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
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
// Tema claro/escuro com persistência 
// =============================
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');

  // aplica o tema salvo
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.classList.remove('btn-outline-primary');
    themeToggle.classList.add('btn-primary');
  }

  // alterna tema ao clicar
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const darkAtivo = document.body.classList.contains('dark');

    // muda o estilo do botão
    if (darkAtivo) {
      themeToggle.classList.remove('btn-outline-primary');
      themeToggle.classList.add('btn-primary');
    } else {
      themeToggle.classList.remove('btn-primary');
      themeToggle.classList.add('btn-outline-primary');
    }

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
    fadeLayer.style.opacity = '1';
    setTimeout(() => {
      indice = (indice + 1) % imagens.length;
      banner.style.backgroundImage = `url('${imagens[indice]}')`;
      fadeLayer.style.opacity = '0';
    }, 800); // tempo da transição
  }

  setInterval(trocarImagem, 5000);
}


// =============================
// Login / Logout global
// =============================
window.addEventListener("DOMContentLoaded", () => {
  const usuarioNome = localStorage.getItem("usuarioNome");
  const navbar = document.querySelector(".navbar-nav");
  if (!navbar) return;

  if (usuarioNome) {
    // Remove o link "Registrar" se existir
    const registrarLink = navbar.querySelector('a[href="Login.html"]');
    if (registrarLink) registrarLink.remove();

    // Cria dropdown com nome e sair
    const li = document.createElement("li");
    li.className = "nav-item dropdown";
    li.innerHTML = `
      <a class="nav-link dropdown-toggle text-primary fw-bold" href="#" role="button" data-bs-toggle="dropdown">
        ${usuarioNome}
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#" id="logout-btn">Sair</a></li>
      </ul>
    `;
    navbar.appendChild(li);

    // Logout
    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("usuarioNome");
      localStorage.removeItem("usuarioEmail");
      location.reload();
    });
  }
});
