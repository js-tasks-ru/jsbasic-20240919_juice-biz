function hideSelf() {
  document.querySelector('.hide-self-button').addEventListener('click', ({ target}) => {
    target.hidden = true;
  });
}
