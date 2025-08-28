document.addEventListener('click', e => {
  const explosion = document.createElement('div');
  explosion.classList.add('explosion-glow');
  explosion.style.left = `${e.clientX - 10}px`; // center circle on cursor
  explosion.style.top = `${e.clientY - 10}px`;
  document.body.appendChild(explosion);

  // Remove the element after animation ends to clean DOM
  explosion.addEventListener('animationend', () => {
    explosion.remove();
  });
});
