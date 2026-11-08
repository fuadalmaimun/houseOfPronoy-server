
const API_URL = "http://localhost:5000/api/products";

const products = [
  {
    name: "Premium Cotton T-Shirt",
    slug: "premium-cotton-t-shirt",
    description: "Comfortable premium cotton t-shirt.",
    price: 850,
    oldPrice: 1100,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    stock: 25,
    featured: true,
  },
  {
    name: "Classic Wrist Watch",
    slug: "classic-wrist-watch",
    description: "Elegant classic wrist watch.",
    price: 1850,
    oldPrice: 2200,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    stock: 15,
    featured: true,
  },
  {
    name: "Casual Sneakers",
    slug: "casual-sneakers",
    description: "Stylish everyday casual sneakers.",
    price: 2400,
    oldPrice: 2800,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    stock: 12,
    featured: true,
  },
  {
    name: "Premium Backpack",
    slug: "premium-backpack",
    description: "Spacious backpack for everyday use.",
    price: 1650,
    oldPrice: 1950,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 20,
    featured: false,
  },
  {
    name: "Classic Sunglasses",
    slug: "classic-sunglasses",
    description: "Modern sunglasses with stylish design.",
    price: 950,
    oldPrice: 1200,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    stock: 18,
    featured: true,
  },
  {
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    description: "Premium wireless headphones.",
    price: 3200,
    oldPrice: 3800,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    stock: 10,
    featured: false,
  },
];

async function seedProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Products API connection failed");
    }

    const result = await response.json();
    const existingProducts = result.products || [];

    for (const product of products) {
      const exists = existingProducts.some(
        (item) => item.slug === product.slug
      );

      if (exists) {
        console.log(`Skipped: ${product.name}`);
        continue;
      }

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(`Failed: ${product.name}`, data);
        continue;
      }

      console.log(`Added: ${product.name}`);
    }

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Seeding Error:", error.message);
  }
}

seedProducts();
