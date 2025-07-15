function adaptFavouriteProduct(favouriteProducts) {
    return {
      productId: favouriteProducts.productId,
      name: favouriteProducts.productName || rawProduct.productName,
      description: favouriteProducts.productDescription || rawProduct.productDescription,
      price: favouriteProducts.productPrice,//parseFloat
      salePrice: favouriteProducts.productSalePrice ? favouriteProducts.productSalePrice : null,
      quanity:favouriteProducts.quanity,
      imageUrl: favouriteProducts.productImage,
      productCategory:favouriteProducts.productCategory,
      imageUrl: favouriteProducts.productImage,
      createdAt:favouriteProducts.createdAt,
      updatedAt:favouriteProducts.updatedAt,
      isActive:favouriteProducts.isActive,
      sellerName: favouriteProducts.sellerName,
      averageRating: parseFloat(favouriteProducts.averageRating || '0'),
      reviewCount: favouriteProducts.reviewCount || 0,
      totalSellerReviews: parseFloat(favouriteProducts.totalSellerReviews),
      sellerAverageRating: favouriteProducts.sellerAverageRating,
      images:favouriteProducts.images
    };
  }


module.exports = {
    adaptFavouriteProduct
}