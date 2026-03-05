// ============================
// CONFIG
// ============================

const whatsappNumber = "2567XXXXXXXX"; // replace with your number

const products = [
  { id: 1, name: "YSL Libre Intense", category: "Women", brand: "YSL", price: 450000, size: "90ml", image: "images/libre_yves.jpg", description: "A bold floral fragrance blending lavender, orange blossom and warm vanilla.", active: true, featured: true },
  { id: 2, name: "Black Opium", category: "Women", brand: "YSL", price: 420000, size: "90ml", image: "images/blackOpium_yves.jpg", description: "Seductive coffee-infused perfume with vanilla and white florals.", active: true, featured: true },
  { id: 3, name: "Montblanc Explorer", category: "Men", brand: "Montblanc", price: 380000, size: "100ml", image: "images/montblanc.jpg", description: "Woody aromatic scent inspired by adventure and exploration.", active: true, featured: true },
  { id: 4, name: "Versace Eros Flame", category: "Men", brand: "Versace", price: 400000, size: "100ml", image: "images/eros_flame.jpg", description: "Vibrant citrus opening with spicy and woody masculine depth.", active: true, featured: true }
];

// ============================
// MODAL
// ============================

const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <div id="modalBody"></div>
  </div>
`;
document.body.appendChild(modal);

// ============================
// RENDER PRODUCTS FUNCTION
// ============================

const productGrid = document.getElementById('productGrid');

function renderProducts(filterCategory = null) {
  productGrid.innerHTML = "";

  let filteredProducts = products.filter(p => p.active);

  if (filterCategory) {
    filteredProducts = filteredProducts.filter(p => p.category.trim().toLowerCase() === filterCategory.trim().toLowerCase());
  } else {
    filteredProducts = filteredProducts.filter(p => p.featured);
  }

  filteredProducts.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.size} - UGX ${product.price.toLocaleString()}</p>
      <button class="btn view-btn" data-id="${product.id}">View Product</button>
    `;
    productGrid.appendChild(div);
  });
}

// Initial load
renderProducts();

// ============================
// EVENT DELEGATION FOR VIEW BUTTONS
// ============================

document.addEventListener('click', function(e) {
  const btn = e.target.closest('.view-btn');
  if (btn) {
    const productId = parseInt(btn.dataset.id);
    const product = products.find(p => p.id === productId);

    if (!product) return;

    document.getElementById('modalBody').innerHTML = `
      <img src="${product.image}" style="width:100%; border-radius:10px;">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p><strong>${product.size} - UGX ${product.price.toLocaleString()}</strong></p>
      <a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Hello, I want to order ${product.name} ${product.size} - UGX ${product.price}`
      )}" target="_blank" class="btn">Order via WhatsApp</a>
    `;
    modal.style.display = 'flex';
  }

  // Close modal
  if (e.target.classList.contains('close') || e.target === modal) {
    modal.style.display = 'none';
  }
});

// ============================
// CATEGORY FILTER
// ============================

document.querySelectorAll('[data-category]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const category = this.dataset.category;
    renderProducts(category);
  });
});

// Show featured again
document.getElementById('showAll').addEventListener('click', function(e) {
  e.preventDefault();
  renderProducts();
});

// ============================
// SEARCH FUNCTIONALITY
// ============================

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", function() {
  const query = this.value.toLowerCase();
  searchResults.innerHTML = "";

  if (!query) {
    searchResults.style.display = "none";
    return;
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${p.name}</strong><br><small>${p.brand} • UGX ${p.price.toLocaleString()}</small>`;
    div.onclick = () => {
      searchResults.style.display = "none";
      searchInput.value = "";
      // Open modal safely
      const button = document.querySelector(`.view-btn[data-id="${p.id}"]`);
      if (button) button.click();
    };
    searchResults.appendChild(div);
  });

  searchResults.style.display = filtered.length ? "block" : "none";
});