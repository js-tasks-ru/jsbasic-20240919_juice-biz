function toggleText() {
  const btn = document.querySelector('.toggle-text-button');
  const textBox = document.getElementById('text');
  btn.addEventListener('click', () => {
    textBox.toggleAttribute('hidden');
  });
}
