// productDetails.js

const whatsappNumber = "256743340581";
const detailContainer = document.getElementById("productDetail");
const productId = localStorage.getItem("selectedProduct");

// Static frontend products fallback
const frontendProducts = [
  { _id: "1", name: "Dior Sauvage", size: "20ml", price: 280000, image: "images/dior-savage.jpg", description: "Fresh spicy fragrance for confident men." },
  { _id: "2", name: "Chanel Bleu", size: "20ml", price: 300000, image: "images/blue.jpg", description: "Woody aromatic scent with elegance." },
  { _id: "3", name: "Gucci Bloom", size: "20ml", price: 260000, image: "images/gucci_bloom.jpg", description: "Floral fragrance for bold women." }
];

const loadProduct = async () => {
  let product = frontendProducts.find(p => p._id === productId);
  if (!product) {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}`);
      product = await res.json();
    } catch (err) {
      console.error("Failed to fetch product details:", err);
      return;
    }
  }

  if (product) {
    detailContainer.innerHTML = `
      <div class="detail-canvas">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p class="price">UGX ${product.price.toLocaleString()}</p>
        <p class="description">${product.description}</p>
        <a href="https://wa.me/${whatsappNumber}?text=Hello, I want to order ${product.name}" 
           class="order-btn" target="_blank">
           Order on WhatsApp
        </a>
      </div>
    `;
  }
};

if (productId) loadProduct();
