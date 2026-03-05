const products = [
  {
    id: 1,
    name: "Noir Essence",
    price: "UGX 120,000",
    image: "images/noir1.jpg",
    description: "A bold masculine scent with woody and spicy undertones."
  },
  {
    id: 2,
    name: "Velvet Bloom",
    price: "UGX 150,000",
    image: "images/noir2.jpg",
    description: "A soft feminine fragrance with floral elegance."
  }
];

const whatsappNumber = "2567XXXXXXXX"; // Your WhatsApp number

const container = document.getElementById("productsContainer");

products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-canvas");

  card.innerHTML = `
    <div class="canvas-box">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
        <button class="view-btn" onclick="viewProduct(${product.id})">
            View Details
        </button>
    </div>
  `;

  container.appendChild(card);
});

function viewProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product-details.html";
}