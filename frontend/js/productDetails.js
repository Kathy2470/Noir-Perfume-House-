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

const whatsappNumber = "2567XXXXXXXX";

const productId = localStorage.getItem("selectedProduct");
const product = products.find(p => p.id == productId);

if (product) {
  const detailContainer = document.getElementById("productDetail");

  detailContainer.innerHTML = `
    <div class="detail-canvas">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p class="price">${product.price}</p>
        <p class="description">${product.description}</p>

        <a href="https://wa.me/${whatsappNumber}?text=Hello, I want to order ${product.name}" 
           class="order-btn" target="_blank">
           Order on WhatsApp
        </a>
    </div>
  `;
}