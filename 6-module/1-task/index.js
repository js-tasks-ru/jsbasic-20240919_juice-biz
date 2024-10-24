/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render();    
  }

  render() {
    this.elem = document.createElement('table');
    this.elem.innerHTML = (`<thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>`);

    let tbody = document.createElement('tbody');
    for (let row of this.rows) {
      let tr = document.createElement('tr');
      tr.innerHTML = `<tr>
                      <td>${row.name}</td>
                      <td>${row.age}</td>
                      <td>${row.salary}</td>
                      <td>${row.city}</td>
                      <td><button>X</button></td>
                      </tr>`;
      tbody.append(tr);
    }
    this.elem.append(tbody);

    this.elem.addEventListener('click', ({target}) => {
      if (target.tagName === 'BUTTON') {
        target.closest('tr').remove();
      }
    });
  }
}
