const auth = () => {
  const buttonAuth = document.querySelector('.button-auth');
  const modalAuth = document.querySelector('.modal-auth');
  const closeAuth = document.querySelector('.close-auth');
  const logInForm = document.getElementById('logInForm');
  const inputLogin = document.getElementById('login');
  const inputPassword = document.getElementById('password');
  const buttonOut = document.querySelector('.button-out');
  const userName = document.querySelector('.user-name');
  const buttonCart = document.querySelector('.button-cart');

  const login = (user) => {
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'flex';
    userName.style.display = 'flex';
    modalAuth.style.display = 'none';
    buttonCart.style.display = 'flex';

    userName.textContent = user.login;
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    location.reload();
    buttonAuth.style.display = 'flex';
    buttonOut.style.display = 'none';
    userName.style.display = 'none';
    userName.textContent = '';
    buttonCart.style.display = 'none';
  };

  buttonAuth.addEventListener('click', () => {
    modalAuth.style.display = 'flex';
  });

  buttonOut.addEventListener('click', logout);

  closeAuth.addEventListener('click', () => {
    modalAuth.style.display = 'none';
  });

  logInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = {
      login: inputLogin.value,
      password: inputPassword.value,
    };

    if (user.login === '') {
      return alert('логин или пароль пуст!!!');
    }
    if (user.password === '') {
      return alert('логин или пароль пуст!!!');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
      login(user);
    }
  });

  if (localStorage.getItem('user')) {
    login(JSON.parse(localStorage.getItem('user')));
  }
};

auth();
