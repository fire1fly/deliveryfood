'use strict';
document.addEventListener('DOMContentLoaded', () =>{
  // DOM elements
  const cartButton = document.querySelector("#cart-button"),
        modal = document.querySelector(".modal"),
        close = document.querySelector(".close"),
        btnAuth = document.querySelector(".button-auth"),
        modalAuth = document.querySelector(".modal-auth"),
        btnCloseAuth = document.querySelector(".close-auth"),
        loginForm = document.querySelector("#loginForm"),
        loginInput = loginForm.querySelector("#login"),
        btnLogOut = document.querySelector(".button-out"),
        fieldUserName = document.querySelector(".user-name"),
        cardsRestaurants = document.querySelector(".cards-restaurants"),
        promoContainer = document.querySelector(".container-promo"),
        restaurantsContainer = document.querySelector(".restaurants"),
        menuContainer = document.querySelector(".menu"),
        logo = document.querySelector(".logo"),
        buttonBack = document.querySelector(".button-back"),
        cardsMenu = document.querySelector(".cards-menu");

  // data

  let login = localStorage.getItem('userLogin');

  // functions

  const toggleCartModal = () => {
    modal.classList.toggle("is-open");
  };

  const toggleAuthModal = () => {
    modalAuth.classList.toggle("is-open");
  };

  // Имитация авторизации


  const authorized = () => {

    const logOut = () => {
      login = '';
      localStorage.removeItem('userLogin');
      btnAuth.style.display = 'block';
      btnLogOut.style.display = 'none';
      fieldUserName.style.display = 'none';

      btnLogOut.removeEventListener("click", logOut);

      checkAuth();
    }

    fieldUserName.textContent = login;

    btnAuth.style.display = 'none';
    btnLogOut.style.display = 'block';
    fieldUserName.style.display = 'block';
    btnLogOut.addEventListener("click", logOut);
  };

  const notAuthorized = () => {

    const logIn = event => {
      event.preventDefault();
      if(!loginInput.value) {
        loginInput.style.background = '#DD5145';
        loginInput.value = 'Введите логин!';
        loginInput.focus();
        loginInput.addEventListener("click", () => {
          loginInput.style.background = '';
          loginInput.value = '';
        });
      } else {
        login = loginInput.value;

        localStorage.setItem('userLogin', login);

        toggleAuthModal();

        btnAuth.removeEventListener("click", toggleAuthModal);
        btnCloseAuth.removeEventListener("click", toggleAuthModal);
        loginForm.removeEventListener("submit", logIn);
        loginForm.reset();
        checkAuth();
      }
    }

    btnAuth.addEventListener("click", toggleAuthModal);
    btnCloseAuth.addEventListener("click", toggleAuthModal);
    loginForm.addEventListener("submit", logIn);
  };

  const checkAuth = () => {
    if (login) {
      authorized();
    } else {
      notAuthorized();
    }
  };


  const createCardRestaurant = () => {
    const card = `<a class="card card-restaurant">
                    <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
                    <div class="card-text">
                      <div class="card-heading">
                        <h3 class="card-title">Пицца плюс</h3>
                        <span class="card-tag tag">50 мин</span>
                      </div>
                      <div class="card-info">
                        <div class="rating">
                          4.5
                        </div>
                        <div class="price">От 900 ₽</div>
                        <div class="category">Пицца</div>
                      </div>
                    </div>
                  </a>`;
    cardsRestaurants.insertAdjacentHTML('beforeend', card);
  };

  createCardRestaurant();
  createCardRestaurant();
  createCardRestaurant();

  const backToMainPage = () => {
    promoContainer.classList.remove('hide');
    restaurantsContainer.classList.remove('hide');
    menuContainer.classList.add('hide');
  };

  const createCardGood = () => {
    card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
                      <div class="card-text">
                        <div class="card-heading">
                          <h3 class="card-title card-title-reg">Пицца Классика</h3>
                        </div>
                        <!-- /.card-heading -->
                        <div class="card-info">
                          <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
                            грибы.
                          </div>
                        </div>
                        <!-- /.card-info -->
                        <div class="card-buttons">
                          <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                          </button>
                          <strong class="card-price-bold">510 ₽</strong>
                        </div>
                      </div>`);
    cardsMenu.insertAdjacentElement('beforeend', card);
  };


  const openGoodsRestaurant = event => {
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');
    if (restaurant) {
      cardsMenu.textContent = '';
      promoContainer.classList.add('hide');
      restaurantsContainer.classList.add('hide');
      menuContainer.classList.remove('hide');
      buttonBack.addEventListener("click", backToMainPage);
      createCardGood();
    }
  };

  checkAuth();

  // listeners

  cardsRestaurants.addEventListener("click", openGoodsRestaurant);

  cartButton.addEventListener("click", toggleCartModal);
  close.addEventListener("click", toggleCartModal);
  logo.addEventListener("click", backToMainPage);

});