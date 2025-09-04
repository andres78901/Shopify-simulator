
function updateCartCountBadge() {
  const badge = document.getElementById('cart-count-badge');
  if (!badge) return;
  const count = cartItems.length;
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = '';
  } else {
    badge.style.display = 'none';
  }
}
import "./styles.scss";
document.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (header) {
    if (window.scrollY > 60) {
      header.classList.add("is-sticky");
    } else {
      header.classList.remove("is-sticky");
    }
  }
});

const cartItems = [];

// Scroll links header
document.addEventListener("DOMContentLoaded", function () {
  const productsLink = document.getElementById("all-products-link");
  const collectionsLink = document.getElementById("collections-link");
  if (productsLink) {
    productsLink.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .getElementById("products")
        .scrollIntoView({ behavior: "smooth" });
    });
  }
  if (collectionsLink) {
    collectionsLink.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .getElementById("collections")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  // Carrusel
  const carousel = document.querySelector(".product-carousel__items");
  const products = carousel ? Array.from(carousel.children) : [];
  let startIdx = 0;
  const visibleCount = 4;
  const leftArrow = document.querySelector(".product-carousel__arrow--left");
  const rightArrow = document.querySelector(".product-carousel__arrow--right");

  function renderCarousel() {
    products.forEach((card, idx) => {
      if (idx >= startIdx && idx < startIdx + visibleCount) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
    leftArrow.disabled = startIdx === 0;
    rightArrow.disabled = startIdx + visibleCount >= products.length;
  }

  if (carousel && leftArrow && rightArrow) {
    leftArrow.addEventListener("click", function () {
      if (startIdx > 0) {
        startIdx--;
        renderCarousel();
      }
    });
    rightArrow.addEventListener("click", function () {
      if (startIdx + visibleCount < products.length) {
        startIdx++;
        renderCarousel();
      }
    });
    renderCarousel();
  }

  const viewAllBtn = document.querySelector(".product-carousel__view-all");
  const carouselList = document.querySelector(".product-carousel__list");
  const productGrid = document.querySelector(".product-grid");
  let showingGrid = false;
  function updateGridResponsivity() {
    if (window.innerWidth <= 600) {
      carouselList.style.display = "none";
      productGrid.style.display = "grid";
      viewAllBtn.textContent = "Show Carousel";
      showingGrid = true;
    } else if (!showingGrid) {
      carouselList.style.display = "";
      productGrid.style.display = "none";
      viewAllBtn.textContent = "View All Products";
    }
  }

  if (viewAllBtn && carouselList && productGrid) {
    viewAllBtn.addEventListener("click", function () {
      showingGrid = !showingGrid;
      if (showingGrid) {
        carouselList.style.display = "none";
        productGrid.style.display = "grid";
        viewAllBtn.textContent = "Show Carousel";
      } else {
        if (window.innerWidth > 600) {
          carouselList.style.display = "";
          productGrid.style.display = "none";
          viewAllBtn.textContent = "View All Products";
        } else {
          carouselList.style.display = "none";
          productGrid.style.display = "grid";
          viewAllBtn.textContent = "Show Carousel";
          showingGrid = true;
        }
      }
    });
    window.addEventListener("resize", updateGridResponsivity);
    updateGridResponsivity();
  }

  // Add to cart button logic
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".product-card__add-to-cart");
    if (btn) {
      const title = btn.getAttribute("data-title") || "";
      const price = btn.getAttribute("data-price") || "";
      const img = btn.getAttribute("data-img") || "";
      const item = { title, price, img };
      const exists = cartItems.some(
        (i) => i.title === item.title && i.img === item.img
      );
      if (!exists) {
        cartItems.push(item);
        updateCartCountBadge();
        // console.log("Cart:", cartItems);
      }
    }
  });

  // Modal carrito
  const cartModal = document.getElementById("cart-modal");
  const cartList = document.querySelector(".cart-modal__list");
  const cartClose = document.querySelector(".cart-modal__close");
  const cartIconBtn = document.querySelector(".header__cart");

  function renderCartModal() {
    if (!cartList) return;
    cartList.innerHTML = "";
    let total = 0;
    const totalDiv = document.querySelector(".cart-modal__total");
    const actionsDiv = document.querySelector(".cart-modal__actions");
    if (cartItems.length === 0) {
      cartList.innerHTML =
        '<li style="text-align:center;color:#888;">No products in the cart.</li>';
      if (totalDiv) totalDiv.style.display = "none";
      if (actionsDiv) actionsDiv.style.display = "none";
      return;
    }
    cartItems.forEach((item, idx) => {
      const li = document.createElement("li");
  li.innerHTML = `<img src="${item.img}" alt="${item.title}"><span class="cart-modal__list-title">${item.title}</span> <span class="cart-modal__list-price">$${item.price}</span> <button class="cart-modal__remove" data-idx="${idx}" style="margin-left:auto;background:#eee;border:none;padding:0.3rem 0.7rem;border-radius:5px;cursor:pointer;">Remove</button>`;
      cartList.appendChild(li);
      let priceNum = parseFloat((item.price || "0").replace(/[^\d.]/g, ""));
      if (!isNaN(priceNum)) total += priceNum;
    });
    document.getElementById("cart-modal-total").textContent = total.toFixed(2);
    if (totalDiv) totalDiv.style.display = "";
    if (actionsDiv)
      actionsDiv.style.display = cartItems.length >= 1 ? "flex" : "none";
  }

  if (cartIconBtn && cartModal) {
    cartIconBtn.addEventListener("click", function () {
      renderCartModal();
      cartModal.style.display = "flex";
    });
  }
  if (cartClose && cartModal) {
    cartClose.addEventListener("click", function () {
      cartModal.style.display = "none";
    });
  }

  // Remove item from cart
  if (cartList) {
    cartList.addEventListener("click", function (e) {
      const removeBtn = e.target.closest(".cart-modal__remove");
      if (removeBtn) {
        const idx = parseInt(removeBtn.getAttribute("data-idx"));
        if (!isNaN(idx)) {
          cartItems.splice(idx, 1);
          renderCartModal();
          updateCartCountBadge();
        }
      }
    });
  }

  // Vaciar carrito
  document.addEventListener("click", function (e) {
    const clearBtn = e.target.closest("#cart-modal-clear");
    if (clearBtn) {
      cartItems.length = 0;
  renderCartModal();
  updateCartCountBadge();
  updateCartCountBadge();
    }
  });

  const heroShopBtn = document.getElementById("hero-banner-shop-new");
  if (heroShopBtn) {
    heroShopBtn.addEventListener("click", function () {
      const title = heroShopBtn.getAttribute("data-title") || "";
      const price = heroShopBtn.getAttribute("data-price") || "";
      const img = heroShopBtn.getAttribute("data-img") || "";
      const item = { title, price, img };
      const exists = cartItems.some(
        (i) => i.title === item.title && i.img === item.img
      );
      if (!exists) {
        cartItems.push(item);
        updateCartCountBadge();
      }
      if (cartModal) {
        renderCartModal();
        cartModal.style.display = "flex";
      }
    });
  }

  // Abrir modal carrito si la URL contiene '/cart'
  if (window.location.pathname.toLowerCase().includes('/cart')) {
    if (cartModal) {
      renderCartModal();
      cartModal.style.display = 'flex';
    }
  }

  // Interceptar click en el enlace 'Cart' del footer para abrir el modal
  document.addEventListener('click', function(e) {
    const cartLink = e.target.closest('a[href="/cart"]');
    if (cartLink) {
      e.preventDefault();
      if (cartModal) {
        renderCartModal();
        cartModal.style.display = 'flex';
      }
    }
  });
});
