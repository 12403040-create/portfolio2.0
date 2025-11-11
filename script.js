const cabecalho = document.getElementById('cabecalho');
const observadorCabecalho = new IntersectionObserver(
  ([entrada]) => cabecalho.classList.toggle('scrolado', !entrada.isIntersecting),
  { threshold: 0.01 }
);
const alvoHero = document.querySelector('.hero');
if (alvoHero) observadorCabecalho.observe(alvoHero);

const html = document.documentElement;
const botaoTema = document.getElementById('botao-tema');


const prefereEscuro = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;


(function iniciarTema(){
  const salvo = localStorage.getItem('tema');
  const tema = salvo || (prefereEscuro() ? 'escuro' : 'claro');
  html.setAttribute('data-tema', tema);
  if (botaoTema) botaoTema.setAttribute('aria-pressed', tema === 'escuro');
})();


function alternarTema(){
  const atual = html.getAttribute('data-tema') === 'escuro' ? 'escuro' : 'claro';
  const proximo = atual === 'escuro' ? 'claro' : 'escuro';
  html.setAttribute('data-tema', proximo);
  localStorage.setItem('tema', proximo);
  if (botaoTema){
    botaoTema.setAttribute('aria-pressed', proximo === 'escuro');
    botaoTema.classList.add('girando');

    setTimeout(() => botaoTema.classList.remove('girando'), 620);
  }
}
if (botaoTema) botaoTema.addEventListener('click', alternarTema);


if (window.matchMedia){
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const auto = e.matches ? 'escuro' : 'claro';
   
    if (!localStorage.getItem('tema')){
      html.setAttribute('data-tema', auto);
      if (botaoTema) botaoTema.setAttribute('aria-pressed', auto === 'escuro');
    }
  });
}


function rolarParaAlvo(hash){
  const alvo = document.querySelector(hash);
  if (!alvo) return;
  const offset = cabecalho ? cabecalho.offsetHeight + 8 : 0;
  const y = alvo.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}


document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const hash = link.getAttribute('href');
  if (hash.length <= 1) return; 
  e.preventDefault();
  rolarParaAlvo(hash);
});
document.addEventListener('DOMContentLoaded', function () {
  const modal     = document.getElementById('modal-habilidade');
  const modalTitle= document.getElementById('modal-habilidade-titulo');
  const modalDesc = document.getElementById('modal-habilidade-desc');

  document.addEventListener('click', function (e) {
    const li = e.target.closest('.tag-habilidade');
    if (!li) return;

    const title = li.textContent.trim();
    const desc  = li.dataset.description || `Detalhes sobre ${title}.`;

    modalTitle.textContent = title;
    modalDesc.textContent  = desc;

    openModal();
  });

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const btn = modal.querySelector('.modal-close');
    if (btn) btn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modal.addEventListener('click', function (ev) {
    if (ev.target.matches('[data-close]')) closeModal();
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
});