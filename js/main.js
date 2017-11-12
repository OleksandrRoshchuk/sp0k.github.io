const tableBody = document.querySelector('.table tbody');
const tableHeaders = document.querySelectorAll('.table th');
const search = document.getElementById('search');
const searchForm = document.getElementById('search-form');
const key = '56e102aeea26c00e68cce6edc608929a';
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let val = search.value.split(' ').join('%20');
  for(let header of tableHeaders) {
    header.classList.remove('sorting-desc','sorting-asc');
  }
  mdbSearch(key, val);
});

let mdbSearch = (key, val) => {
  return fetch('https://api.themoviedb.org/3/search/movie?api_key=' + key + '&query=' + val, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    mode: 'cors'
  })
  .then( (result) => {
    return result.json();
  }).then( (data) => {
    let films = data.results;
    tableBody.innerHTML = '';
    for (let film of films) {
      let row = document.createElement('tr');
      row.innerHTML = '<td>' + film.id + '</td><td>' + film.title + '</td><td>' + film.original_language + '</td><td>' + film.popularity + '</td><td>' + film.vote_count + '</td><td>' + film.vote_average + '</td><td>' + film.release_date
          + '</td>';
      tableBody.appendChild(row)
    }
  })
};

let tableHeader = document.querySelectorAll('.table th');
Array.from(tableHeader).forEach(link => {
  let DESC = false;
  link.addEventListener('click', (e) => {
    DESC = !DESC;
    const $this = e.target;
    const index = Array.from($this.parentElement.children).indexOf($this) + 1;
    let rows = $this.closest('.table').querySelectorAll(`tbody td:nth-of-type(${index})`);
    for(let header of tableHeaders) {
      header.classList.remove('sorting-desc','sorting-asc');
    }
    if (DESC) {
      $this.classList.remove('sorting-desc');
      $this.classList.add('sorting-asc');
    } else {
      $this.classList.remove('sorting-asc');
      $this.classList.add('sorting-desc');
    }

    let sorted = sort(rows, $this, DESC);
    for (let row of sorted) {
      rearrange(row);
    }

  });
});


let sort = (rows, $this, DESC) => {

  return Array.from(rows).sort((a, b) => {
    let first;
    let second;
    let data = $this.dataset;
    if (data.sort === 'date' || data.sort === 'number') {
      first = data.sort === 'date' ? new Date(a.outerText) : a.outerText;
      second = data.sort === 'date' ? new Date(b.outerText) : b.outerText;
      if (DESC) {
        return first - second;
      }
      else {
        return second - first;
      }

    }
    else {
      first = a.outerText.toLowerCase();
      second = b.outerText.toLowerCase();

      if (DESC) {
        if (first < second) {
          return -1;
        }
        if (first > second) {
          return 1;
        }
        return 0;
      }
      else {
        if (first > second) {
          return -1;
        }
        if (first < second) {
          return 1;
        }
        return 0;
      }
    }
  });
};
let rearrange = (el) => {
  tableBody.appendChild(el.closest('tr'));
};