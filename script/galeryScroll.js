let scrollPosition = 0;

const track = document.querySelector('.gallery-track');

function updateGallery(direction) {
  const items = track.querySelectorAll('.project-item');
  const itemWidth = items[0]?.offsetWidth + 20 || 240;
  const visibleWidth = track.parentElement.offsetWidth;
  const totalWidth = items.length * itemWidth;

  if (direction === 'right') {
    // Pokud jsme ještě nedojeli na konec
    if (Math.abs(scrollPosition - itemWidth) + visibleWidth <= totalWidth + 200) {
      scrollPosition -= itemWidth;
      track.style.transform = `translateX(${scrollPosition}px)`;
    }
    
  } else if (direction === 'left') {
    // Pokud nejsme na úplném začátku
    if (scrollPosition + itemWidth <= 0) {
      scrollPosition += itemWidth;
      track.style.transform = `translateX(${scrollPosition}px)`;
    }
  }
}

document.getElementById('right-arrow')?.addEventListener('click', () => {
  updateGallery('right');
});

document.getElementById('left-arrow')?.addEventListener('click', () => {
  updateGallery('left');
});
