
// ================== LAZY LOADING (IMG) ==================
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img.lazy-img");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.addEventListener("load", () => {
          img.classList.add("loaded");
        });
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
});
// ================== LAZY LOADING (CARDS) ==================
document.addEventListener("DOMContentLoaded", () => {
  const lazyDivs = document.querySelectorAll(".lazy-div");
  const divObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const div = entry.target;
        div.classList.add("visible");
        observer.unobserve(div);
      }
    });
  });
  lazyDivs.forEach((div) => {
    divObserver.observe(div);
  });
});
// ================== ADD CARDS ==================
function renderProducts() {
    const container = document.getElementById("productsContainer");  
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    savedProducts.forEach((product) => {
      let card = `
        <div class="card ${product.type} lazy-div">
          ${product.onSale ? `<div class="offerBanner">Sale</div>` : ""}
          <img data-src="${product.image}" class="card-img-top lazy-img" alt="...">
          
          <div class="card-body">
             <div class="card-bodytext">
                <h4 class="card-text">${product.name}</h4>
                
                ${
                  product.onSale
                    ? `<span class="card-text oldPrice">Price:${product.price} EGP</span>
                       <p class="card-text newPrice">Price:${product.newPrice} EGP</p>`
                    : `<p class="card-text">Price: ${product.price} EGP</p>`
                }
               </div>
          </div>
        </div>
      `;
  
      container.innerHTML += card;
    });
  }
  
  renderProducts();