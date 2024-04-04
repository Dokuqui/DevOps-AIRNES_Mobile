class Product {
  constructor(
    id,
    categoryIds,
    name,
    price,
    brand,
    image,
    description,
    isAvailable,
    isFeatured
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.name = name;
    this.price = price;
    this.brand = brand;
    this.image = image;
    this.description = description;
    this.isAvailable = isAvailable;
    this.isFeatured = isFeatured;
  }
}

export default Product;
