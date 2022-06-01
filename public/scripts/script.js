const header = document.getElementById('header');
const openMenuButton = document.getElementById('openMenuButton');
const closeMenuButton = document.getElementById('closeMenuButton');

const links = document.querySelectorAll('#header nav ul a');

for(const link of links) {
  link.addEventListener('click', () => {
      header.classList.remove('menu-mobile')
  })
};

function openMenu() {
  openMenuButton.addEventListener('click', () => {
    header.classList.add('menu-mobile');
  })
}

function closeMenu() {
  closeMenuButton.addEventListener('click', () => {
    header.classList.remove('menu-mobile');
  })
}

ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: '700',
  reset: true
}).reveal(
  `header,
   #home .wrapper .container,
   #home .wrapper img,
   #about h2,
   #about .wrapper,
   #contact .text,
   #contact p,
   #contact .social-links`);