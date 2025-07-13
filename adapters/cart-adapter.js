function adaptCartProduct(cartProductsRow) {
    return {
      productId: cartProductsRow.productId,
      name: cartProductsRow.productName || rawProduct.productName,
      description: cartProductsRow.productDescription || rawProduct.productDescription,
      price: cartProductsRow.productPrice,//parseFloat
      salePrice: cartProductsRow.productSalePrice ? favouriteProducts.productSalePrice : null,
      quanity:cartProductsRow.quanity,
      imageUrl: cartProductsRow.productImage,
      productCategory:cartProductsRow.productCategory,
      imageUrl: cartProductsRow.productImage,
      createdAt:cartProductsRow.createdAt,
      updatedAt:cartProductsRow.updatedAt,
      isActive:cartProductsRow.isActive,
      sellerName: cartProductsRow.sellerName,
      averageRating: parseFloat(favouriteProducts.averageRating || '0'),
      reviewCount: cartProductsRow.reviewCount || 0,
      images:cartProductsRow.images
    };
  }

module.exports = {
    adaptCartProduct
}