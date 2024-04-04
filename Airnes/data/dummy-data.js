import Category from "../models/category";
import Product from "../models/product";

// Define your categories
export const CATEGORIES = [
  new Category("c1", "Furniture"),
  new Category("c2", "Electronics"),
  new Category("c3", "Clothing"),
  new Category("c4", "Home Appliances"),
  new Category("c5", "Books"),
  new Category("c6", "Beauty & Personal Care"),
  new Category("c7", "Sports & Outdoors"),
  new Category("c8", "Toys & Games"),
  new Category("c9", "Food & Grocery"),
  new Category("c10", "Health & Wellness"),
];

// Define your products
export const PRODUCTS = [
  new Product(
    "p1",
    ["c1"],
    "Modern Sofa",
    399.99,
    "JUSK",
    require("../assets/carrousel/sofa.jpeg"),
    "Comfortable and stylish sofa for your living room.",
    true,
    false
  ),
  new Product(
    "p2",
    ["c1"],
    "Dining Table Set",
    299.99,
    "JUSK",
    require("../assets/carrousel/sofa.jpeg"),
    "Elegant dining table set for your dining area.",
    true,
    false
  ),
  new Product(
    "p3",
    ["c2"],
    "Smartphone",
    699.99,
    "JUSK",
    require("../assets/carrousel/sofa.jpeg"),
    "Powerful smartphone with advanced features.",
    true,
    false
  ),
  new Product(
    "p4",
    ["c2"],
    "Laptop",
    999.99,
    "JUSK",
    require("../assets/carrousel/sofa.jpeg"),
    "High-performance laptop for work and entertainment.",
    true,
    false
  ),
  new Product(
    "p5",
    ["c3"],
    "T-Shirt",
    19.99,
    "JUSK",
    require("../assets/carrousel/sofa.jpeg"),
    "Casual and comfortable t-shirt for everyday wear.",
    true,
    false
  ),
  new Product(
    "p6",
    ["c3"],
    "Jeans",
    49.99,
    "JUSK",
    require("../assets/carrousel/sofa.jpeg"),
    "Classic denim jeans for a timeless look.",
    true,
    false
  ),
  new Product(
    "p7",
    ["c4"],
    "Refrigerator",
    899.99,
    "JUSK",
    require("../assets/carrousel/sofa.jpeg"),
    "Energy-efficient refrigerator with ample storage space.",
    true,
    false
  ),
  new Product(
    "p8",
    ["c5"],
    "Bestseller Novel",
    14.99,
    "JUSK",
    require("../assets/carrousel/sofa.jpeg"),
    "Engaging novel that captivates readers from start to finish.",
    true,
    false
  ),
  new Product(
    "p9",
    ["c6"],
    "Skincare Set",
    49.99,
    "JUSK",
    require("../assets/carrousel/sofa.jpeg"),
    "Complete skincare set for a radiant and healthy complexion.",
    true,
    false
  ),
  new Product(
    "p10",
    ["c7"],
    "Yoga Mat",
    29.99,
    "JUSK",
    require("../assets/carrousel/sofa.jpeg"),
    "Premium yoga mat for comfortable and slip-resistant practice.",
    true,
    false
  ),
];
