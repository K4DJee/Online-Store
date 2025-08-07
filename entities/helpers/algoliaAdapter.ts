import type { IProduct } from "~/types/types";

export interface IProductImages{
	imageId:number,
	imageUrl:string
}

export function adaptAlgoliaToProduct(hit:any):IProduct{
    const price = parseFloat(hit.price) || 0;
  const salePrice = hit.salePrice ? parseFloat(hit.salePrice) : 0;
  const averageRating = parseFloat(hit.averageRating) || 0;

  const images: IProductImages[] =  [
        {
            imageId:1,
            imageUrl:'22'
        },
        // Можно добавить другие изображения, если они есть в данных (например, hit.images[])
      ];

    return {
        productId: parseInt(hit.objectID) || 0,
        name: hit.name || 'Без названия',
        description: hit.description || '',
        price,
        salePrice,
        quantity: 10, // Заглушка. Можно добавить в Algolia, если нужно.
        imageUrl: hit.imageUrl?.trim() || '/images/no-image.png',
        productCategory: hit.productCategory || 'Разное',
        createdAt: new Date(hit.createdAt),
        updatedAt: new Date(hit.updatedAt),
        isActive: hit.isActive ?? 1,
        sellerName: hit.sellerName || 'Неизвестный продавец',
        averageRating,
        reviewCount: hit.reviewCount || 0,
        totalSellerReviews: hit.totalSellerReviews || 50, // Заглушка или из данных
        sellerAverageRating: hit.sellerAverageRating || '4.8', // Заглушка или из данных
        images,
      };
}