const partners = () => {
  const cardRestaurant = document.querySelector('.cards-restaurants');

  function renderItems(data) {
    data.forEach((item) => {
      const a = document.createElement('a');
      a.setAttribute('href', '/restaurant.html');
      a.classList.add('card');
      a.classList.add('card-restaurant');

      const products = item.products;

      a.dataset.products = products;

      a.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${item.name}</h3>
								<span class="card-tag tag">${item.time_of_delivery} мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
									${item.stars}
								</div>
								<div class="price">От ${item.price} ₽</div>
								<div class="category">${item.kitchen}</div>
							</div>
						</div>
    `;
      a.addEventListener('click', (e) => {
        e.preventDefault();

        localStorage.setItem('restorant', JSON.stringify(item));

        if (localStorage.getItem('user')) {
          window.location.href = '/restaurant.html';
        } else {
          const modalAuth = document.querySelector('.modal-auth');
          modalAuth.style.display = 'flex';
        }
      });

      cardRestaurant.append(a);
    });
  }

  fetch('https://govno-a9ef1-default-rtdb.firebaseio.com/db/partners.json')
    .then((res) => res.json())
    .then((data) => {
      renderItems(data);
    });
};

partners();
