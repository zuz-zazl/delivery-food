const menu = () => {
  const cardsMenu = document.querySelector('.cards-menu');
  const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  const footer = document.querySelector('.modal-footer__pricetag');

  const changeTitle = (restaurant) => {
    const restaurantTitle = document.querySelector('.restaurant-title');
    const rating = document.querySelector('.rating');
    const price = document.querySelector('.price');
    const category = document.querySelector('.category');

    restaurantTitle.textContent = restaurant.name;
    rating.textContent = restaurant.stars;
    price.textContent = restaurant.price + ' руб';
    category.textContent = restaurant.kitchen;
  };

  const cartPrices = () => {
    footer.innerHTML = '';
    const cartArray = JSON.parse(localStorage.getItem('cart'));
    const totalPriceArray = [];
    totalPriceArray.length = 0;
    if (localStorage.getItem('cart')) {
      for (let i = 0; i < cartArray.length; i++) {
        totalPriceArray.push(cartArray[i].price * cartArray[i].count);
      }
    }

    const add = (accumulator, a) => {
      return accumulator + a;
    };
    const sum = totalPriceArray.reduce(add, 0);
    const totalPrice = document.createElement('div');

    totalPrice.classList.add('modal-footer');

    totalPrice.innerHTML = `<span class="modal-pricetag">${sum} ₽</span>`;
    console.log(sum);

    footer.prepend(totalPrice);
  };

  const addToCart = (cartItem) => {
    if (cartArray.some((item) => item.id === cartItem.id)) {
      cartArray.map((item) => {
        if (item.id === cartItem.id) {
          item.count++;
        }
        return item;
      });
    } else {
      cartArray.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
  };

  const renderItem = (data) => {
    data.forEach((item) => {
      const card = document.createElement('div');
      card.innerHTML = '';
      card.classList.add('card');

      card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${item.name}</h3>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="ingredients">${item.description}
								</div>
							</div>
							<!-- /.card-info -->
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${item.price} ₽</strong>
							</div>
						</div>
						<!-- /.card-text --
      `;

      card.querySelector('.button-card-text').addEventListener('click', () => {
        const cartItem = {
          name: item.name,
          price: item.price,
          id: item.id,
          count: 1,
        };

        addToCart(cartItem);
      });
      cardsMenu.append(card);
    }, cartPrices());
  };

  if (localStorage.getItem('restorant') && localStorage.getItem('user')) {
    const restorant = JSON.parse(localStorage.getItem('restorant'));
    changeTitle(restorant);

    fetch(`./db/${restorant.products}`)
      .then((res) => res.json())
      .then((data) => {
        renderItem(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    window.location.href = '/';
  }
};

menu();
