'use strict';

var tableBody = document.querySelector('.table tbody');
var tableHeaders = document.querySelectorAll('.table th');
var search = document.getElementById('search');
var searchForm = document.getElementById('search-form');
var key = '56e102aeea26c00e68cce6edc608929a';
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var val = search.value.split(' ').join('%20');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = tableHeaders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var header = _step.value;

      header.classList.remove('sorting-desc', 'sorting-asc');
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  mdbSearch(key, val);
});

var mdbSearch = function mdbSearch(key, val) {
  return fetch('https://api.themoviedb.org/3/search/movie?api_key=' + key + '&query=' + val, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    mode: 'cors'
  }).then(function (result) {
    return result.json();
  }).then(function (data) {
    var films = data.results;
    tableBody.innerHTML = '';
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = films[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var film = _step2.value;

        var row = document.createElement('tr');
        row.innerHTML = '<td>' + film.id + '</td><td>' + film.title + '</td><td>' + film.original_language + '</td><td>' + film.popularity + '</td><td>' + film.vote_count + '</td><td>' + film.vote_average + '</td><td>' + film.release_date + '</td>';
        tableBody.appendChild(row);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
};

var tableHeader = document.querySelectorAll('.table th');
Array.from(tableHeader).forEach(function (link) {
  var DESC = false;
  link.addEventListener('click', function (e) {
    DESC = !DESC;
    var $this = e.target;
    var index = Array.from($this.parentElement.children).indexOf($this) + 1;
    var rows = $this.closest('.table').querySelectorAll('tbody td:nth-of-type(' + index + ')');
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = tableHeaders[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var header = _step3.value;

        header.classList.remove('sorting-desc', 'sorting-asc');
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    if (DESC) {
      $this.classList.remove('sorting-desc');
      $this.classList.add('sorting-asc');
    } else {
      $this.classList.remove('sorting-asc');
      $this.classList.add('sorting-desc');
    }

    var sorted = sort(rows, $this, DESC);
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = sorted[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var row = _step4.value;

        rearrange(row);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  });
});

var sort = function sort(rows, $this, DESC) {

  return Array.from(rows).sort(function (a, b) {
    var first = void 0;
    var second = void 0;
    var data = $this.dataset;
    if (data.sort === 'date' || data.sort === 'number') {
      first = data.sort === 'date' ? new Date(a.outerText) : a.outerText;
      second = data.sort === 'date' ? new Date(b.outerText) : b.outerText;
      if (DESC) {
        return first - second;
      } else {
        return second - first;
      }
    } else {
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
      } else {
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
var rearrange = function rearrange(el) {
  tableBody.appendChild(el.closest('tr'));
};