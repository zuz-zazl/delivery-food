const cart = () => {
  const buttonCart = document.getElementById('cart-button');
  const modalCart = document.querySelector('.modal-cart');
  const close = modalCart.querySelector('.close');
  const body = modalCart.querySelector('.modal-body');
  const btnSend = modalCart.querySelector('.button-primary');
  const clearCart = modalCart.querySelector('.clear-cart');
  const footer = document.querySelector('.modal-footer__pricetag');

  const resetCart = () => {
    body.innerHTML = '';
    localStorage.removeItem('cart');
    modalCart.classList.remove('is-open');
    window.location.href = window.location.href;
  };
  
  const cartPrices = () => {
    footer.innerHTML = ''
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


  const btnClearCart = () => {
    body.innerHTML = '';
    localStorage.removeItem('cart');
    modalCart.classList.remove('is-open');
    window.location.href = window.location.href;
  };

  const incrementCount = (id) => {
    const cartArr = JSON.parse(localStorage.getItem('cart'));
    
    cartArr.map((item) => {
      if (item.id === id) {
        item.count++;
        cartPrices()
      }
    });

    localStorage.setItem('cart', JSON.stringify(cartArr));
    renderItems(cartArr);
  };

  const dincrementCount = (id) => {
    const cartArr = JSON.parse(localStorage.getItem('cart'));

    cartArr.map((item) => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
      }
      return item;
    });

    localStorage.setItem('cart', JSON.stringify(cartArr));
    renderItems(cartArr);
  };

  const renderItems = (data) => {
    body.innerHTML = '';

    data.forEach((item) => {
      const cartElem = document.createElement('div');

      cartElem.classList.add('food-row');

      cartElem.innerHTML = `
      <span class="food-name">${item.name}</span>
      <strong class="food-price">${item.price} ₽</strong>
      <div class="food-counter">
        <button class="counter-button btn-dec" data-index="${item.id}">-</button>
        <span class="counter">${item.count}</span>
        <button class="counter-button btn-inc" data-index="${item.id}">+</button>
      </div>
      `;

      body.append(cartElem);
    });
    cartPrices()
  };

  body.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('btn-inc')) {
      incrementCount(e.target.dataset.index);
    } else if (e.target.classList.contains('btn-dec')) {
      dincrementCount(e.target.dataset.index);
    }
  });

  btnSend.addEventListener('click', () => {
    const cartArr = localStorage.getItem('cart');
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: cartArr,
    }).then((res) => {
      if (res.ok) {
        resetCart();
      }
    });
  });

  buttonCart.addEventListener('click', () => {
    if (localStorage.getItem('cart')) {
      renderItems(JSON.parse(localStorage.getItem('cart')));
    }

    modalCart.classList.add('is-open');
  });

  close.addEventListener('click', () => {
    modalCart.classList.remove('is-open');
  });

  clearCart.addEventListener('click', () => {
    btnClearCart();
  });
};

cart();
