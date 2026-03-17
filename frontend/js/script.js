// script.js

const whatsappNumber = "256743340581"; // WhatsApp number
const productGrid = document.getElementById('productGrid');

// Static frontend products (can be updated by frontend team)
import { PRODUCTS } from "../data/products.js"; [
  { _id: "1", name: "Dior Sauvage", size: "20ml", price: 280000, category: "Men", image: "images/Dior/doir-savage.jpg", description: "a fresh, spicy, and woody fragrance with a bold and long-lasting scent that commands attention.", active: true, featured: true },
  { _id: "2", name: "Chanel Bleu", size: "20ml", price: 300000, category: "Men", image: "images/chanel/blue.jpg", description: "a fresh, woody, and slightly spicy fragrance that delivers a clean, sophisticated, and versatile scent.", active: true, featured: false },
  { _id: "3", name: "Gucci Bloom", size: "20ml", price: 260000, category: "Women", image: "images/Gucbloom.jpg", description: "a rich, natural floral fragrance that smells like a fresh garden filled with jasmine and white flowers.", active: true, featured: true },
  { _id: "4", name: "Eternity", size: "20ml", price: 280000, category: "Men", image: "images/Eternity.jpg", description: "a fresh, clean, and woody fragrance with citrus and herbal notes, perfect for a timeless and sophisticated everyday scent.", active: true, featured: true },
  { _id: "5", name: "Eros Blue", size: "20ml", price: 300000, category: "Men", image: "images/eros/eros.jpg", description: "a fresh yet sweet and woody fragrance that mixes minty citrus with warm vanilla for a bold, seductive scent.", active: true, featured: false},
  { _id: "6", name: "Eros Flame", size: "20ml", price: 260000, category: "men", image: "images/eros/eros_flame.jpg", description: "spicy-sweet fragrance blending citrus freshness with warm vanilla and woods for a bold, passionate scent.", active: true, featured: true },
  { _id: "7", name: "Bvlgari", size: "20ml", price: 260000, category: "men", image: "images/bvlgari/bvlgari.jpg", description: "oceanic fragrance that blends citrus, sea notes, and warm woods to create a clean and masculine scent.", active: true, featured: false }
 
];

// Modal setup
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
// Fetch Products from Backend (fallback for missing products)
const fetchBackendProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch backend products:", err);
    return [];
  }
};

// ============================
// Render Products (Hybrid)
const renderProducts = async (filterCategory = null) => {
  let products = [...PRODUCTS];
  const backendProducts = await fetchBackendProducts();

  // Merge backend products if they are not already in frontendProducts
  backendProducts.forEach(bp => {
    if (!products.some(p => p._id === bp._id)) {
      products.push(bp);
    }
  });

  // Filter active products
  let filtered = products.filter(p => p.active);
  if (filterCategory) {
    filtered = filtered.filter(p => p.category.trim().toLowerCase() === filterCategory.trim().toLowerCase());
  } else {
    filtered = filtered.filter(p => p.featured);
  }

  // Render products
  productGrid.innerHTML = "";
  filtered.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.size} - UGX ${product.price.toLocaleString()}</p>
      <button class="btn view-btn" data-id="${product._id}">View Product</button>
    `;
    productGrid.appendChild(div);
  });
};

// Initial load
renderProducts();

// ============================
// Modal & Event Delegation
document.addEventListener('click', async function(e) {
  const btn = e.target.closest('.view-btn');
  if (btn) {
    const productId = btn.dataset.id;
    // Find product in frontend first
    let product = PRODUCTS.find(p => p._id === productId);
    if (!product) {
      // Fetch from backend if not found
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`);
        product = await res.json();
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        return;
      }
    }

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
// Category Filter
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

/* ================= PERFUME SLIDER ================= */

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;

function showSlide(index){

slides.forEach(slide => slide.classList.remove("active"));

slides[index].classList.add("active");

}

nextBtn.addEventListener("click",()=>{

currentSlide++;

if(currentSlide >= slides.length){
currentSlide = 0;
}

showSlide(currentSlide);

});

prevBtn.addEventListener("click",()=>{

currentSlide--;

if(currentSlide < 0){
currentSlide = slides.length - 1;
}

showSlide(currentSlide);

});

/* Auto slide */

setInterval(()=>{

currentSlide++;

if(currentSlide >= slides.length){
currentSlide = 0;
}

showSlide(currentSlide);

},5000);
