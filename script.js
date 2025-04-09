
    const preselectedBooks = [
      { title: '1984', author: 'George Orwell', genre: 'Fiction', read: 'Yes', review: 5, cover: 'images/1984.jpg' },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', read: 'Yes', review: 5, cover: 'images/tokillamockingbird.jpg' },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', read: 'No', review: '', cover: 'images/thegreatgatsby.jpg' },
      { title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Non-Fiction', read: 'No', review: '', cover: 'images/abriefhistoryoftime.jpg' },
      { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Fiction', read: 'Yes', review: 4, cover: 'images/prideandprejudice.jpg' }
    ];

    let allBooks = [];

    function showPage(id) {
      document.querySelectorAll('div').forEach(div => div.classList.add('hidden'));
      document.getElementById(id).classList.remove('hidden');
	if (id === 'stats') {
		updateStatistics();
		updateGenrePieChart();
		updateReviewBarChart();
	}
    }

function toggleReadDateInput(value) {
  const readDateLabel = document.getElementById('read-date-label');
  const readDateInput = document.getElementById('read-date');
  const reviewFields = document.getElementById('review-fields');

  if (value === 'Yes') {
    const now = new Date();
    const localISOTime = now.toISOString().slice(0, 16);
    readDateInput.value = localISOTime;
    readDateLabel.classList.remove('hidden');
    reviewFields.style.display = 'block';
  } else {
    readDateInput.value = '';
    readDateLabel.classList.add('hidden');
    reviewFields.style.display = 'none';
  }
}


    function confirmSubmit() {
        const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const read = document.getElementById('read').value;
  const review = document.getElementById('review').value;

  if (!title) {
    alert("Please enter a title.");
    return;
  }

  if (!author) {
    alert("Please enter an author.");
    return;
  }

  if (author.length > 100) {
    alert("Author name must be 100 characters or less.");
    return;
  }

  if (read === 'Yes' && (review === '' || isNaN(review) || review < 1 || review > 5)) {
    alert("Please enter a valid review between 1 and 5.");
    return;
  }

  showPage('confirm');

    }

    function cancelSubmit() {
      showPage('add');
    }

    function submitForm() {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const genre = document.getElementById('genre').value;
      const read = document.getElementById('read').value;
      const review = document.getElementById('review').value;
      const addedDate = new Date().toISOString().slice(0, 16).replace('T', ' ');
      const readDate = read === 'Yes' ? document.getElementById('read-date').value.replace('T', ' ') : '—';
      const coverInput = document.getElementById('cover');
      const cover = coverInput.files[0] ? URL.createObjectURL(coverInput.files[0]) : 'https://via.placeholder.com/100x100';

      const book = { title, author, genre, read, review, cover, addedDate, readDate };
      allBooks.unshift(book);

      updateRecentlyAdded();
      updateAllBooks();
	updateStatistics();
	updateGenrePieChart();
	updateReviewBarChart();

      document.getElementById('book-form').reset();
      toggleReadDateInput('No');
      updateStarRating(0);
      showPage('thankyou');
    }

    function updateRecentlyAdded() {
      const table = document.getElementById('recently-added');
      while (table.rows.length > 1) table.deleteRow(1);
      allBooks.slice(0, 5).forEach(book => {
        const row = table.insertRow(-1);
        row.innerHTML = `
          <td>${book.addedDate}</td>
          <td>${book.readDate}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre}</td>
          <td>${book.review || '—'}</td>
          <td><img src="${book.cover}" class="thumbnail" onclick="openPhoto('${book.cover}')"></td>
        `;
      });
    }

    function updateAllBooks() {
      const table = document.getElementById('all-books');
      while (table.rows.length > 1) table.deleteRow(1);
      allBooks.forEach(book => {
        const row = table.insertRow(-1);
        row.innerHTML = `
          <td>${book.addedDate}</td>
          <td>${book.readDate}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre}</td>
          <td>${book.read}</td>
          <td>${book.review || '—'}</td>
          <td><img src="${book.cover}" class="thumbnail" onclick="openPhoto('${book.cover}')"></td>
        `;
      });
    }

    function openPhoto(src) {
      document.getElementById('fullscreen').src = src.replace('100x100', '800x600');
      showPage('photo-modal');
    }

    function closePhoto() {
      showPage('details');
    }

    function updateStarRating(value) {
      document.getElementById('review').value = value;
      document.querySelectorAll('#star-rating .star').forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('filled', starValue <= value);
      });
    }

    document.querySelectorAll('#star-rating .star').forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'));
        updateStarRating(value);
      });
    });

    window.onload = () => {
      const now = new Date();
      preselectedBooks.forEach(book => {
        const addedDate = now.toISOString().slice(0, 16).replace('T', ' ');
        const readDate = book.read === 'Yes' ? addedDate : '—';
        allBooks.push({ ...book, addedDate, readDate });
      });
      updateRecentlyAdded();
      updateAllBooks();
    }

	function updateStatistics() {
  const ctx = document.getElementById('books-per-month-chart').getContext('2d');

  // Count books per month
  const counts = {};
  allBooks.forEach(book => {
    if (book.read === 'Yes' && book.readDate !== '—') {
      const month = book.readDate.slice(0, 7); // "YYYY-MM"
      counts[month] = (counts[month] || 0) + 1;
    }
  });

  const sortedMonths = Object.keys(counts).sort();
  const data = sortedMonths.map(month => counts[month]);

  // Destroy previous chart if it exists
  if (window.booksPerMonthChart) {
    window.booksPerMonthChart.destroy();
  }

  window.booksPerMonthChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedMonths,
      datasets: [{
        label: 'Books Read per Month',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          precision: 0
        }
      }
    }
  });
}

	function updateGenrePieChart() {
  const ctx = document.getElementById('genre-pie-chart').getContext('2d');

  const genreCounts = {};

  allBooks.forEach(book => {
    const genre = book.genre.trim();
    if (genre) {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    }
  });

  const labels = Object.keys(genreCounts);
  const data = Object.values(genreCounts);

  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#9C27B0',
    '#00BCD4', '#FF9800', '#E91E63', '#CDDC39', '#03A9F4'
  ];

  // Destroy previous chart if it exists
  if (window.genrePieChart) {
    window.genrePieChart.destroy();
  }

  window.genrePieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Genre Distribution',
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const total = context.chart._metasets[0].total;
              const value = context.parsed;
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

function updateReviewBarChart() {
  const ctx = document.getElementById('review-bar-chart').getContext('2d');

  // Count books for each review score (1–5)
  const reviewCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  allBooks.forEach(book => {
    if (book.read === 'Yes' && book.review) {
      reviewCounts[book.review] += 1;
    }
  });

  const data = Object.values(reviewCounts);

  // Destroy previous chart if it exists
  if (window.reviewBarChart) {
    window.reviewBarChart.destroy();
  }

  window.reviewBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1', '2', '3', '4', '5'],  // Review scores
      datasets: [{
        label: 'Books per Review Score',
        data: data,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          precision: 0
        }
      }
    }
  });
}
