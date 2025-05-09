const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  // Přidej třídu 'active' při kliknutí
  hamburger.classList.add('active');

  // Nastav timeout pro odstranění třídy po 0.3 sekundách
  setTimeout(() => {
    hamburger.classList.remove('active');
  }, 300); // 300ms odpovídá délce trvání efektu

  
});

const header = document.querySelector('.home');

header.addEventListener('click', () => {
  // Přidej třídu 'active' při kliknutí
  header.classList.add('active');

  // Nastav timeout pro odstranění třídy po 0.3 sekundách
  setTimeout(() => {
    header.classList.remove('active');
  }, 300); // 300ms odpovídá délce trvání efektu

  
});

