const toggleDisplay = (showEl, hideEls) => {
  showEl.style.display = "block";
  hideEls.forEach(el => el.style.display = "none");
};

const aboutBox = document.getElementById("about-box");
const btnMore = document.getElementById("btn-more");
const btnLess = document.getElementById("btn-less");
const autoScrollBox = document.getElementById("autoScrollBox");

btnLess.style.display = "none";

btnMore.addEventListener('click', () => {
  toggleDisplay(autoScrollBox, [aboutBox, btnMore]);
  btnLess.style.display = "block";
});

btnLess.addEventListener('click', () => {
  toggleDisplay(aboutBox, [autoScrollBox, btnLess]);
  btnMore.style.display = "block";
});



