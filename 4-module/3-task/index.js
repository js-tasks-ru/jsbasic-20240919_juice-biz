function highlight(table) {
  const tbody = table.querySelector('tbody');
  for (let row of tbody.rows) {
    let hasDataAvailable = true;
    for (let cell of row.cells) {
      if (cell.hasAttribute('data-available')) {
        if (cell.getAttribute('data-available') === 'true') {
          row.classList.add('available');
        } else {
          row.classList.add('unavailable');
        }
        hasDataAvailable = false;
      } 
    }    
    if (hasDataAvailable) {
      row.hidden = true;
    }   
    
    const gender = row.cells[2].textContent;
    if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }

    const age = +row.cells[1].textContent;
    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
