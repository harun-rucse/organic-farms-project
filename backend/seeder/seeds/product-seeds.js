const { Product } = require('../../models/product-model');
// const productFactory = require('../factories/product-factory');

module.exports = async (type) => {
  if (type === 'seed') {
    await Product.create({
      _id: '64b959cb1ec8e5af69d3f010',
      name: 'দেশীয় শসা',
      subcategory: '64b9570b1ec8e5af69d3ef8f',
      price: 40,
      description: 'কীটনাশক মুক্ত দেশীয় শসা',
      minimumOrder: 10,
      maximumOrder: 100,
      maxDeliveryDays: 7,
      farmer: '64b953f41ec8e5af69d3ee92',
      ratingQty: 0,
      ratingQty: 0,
      inStock: 50,
      images: ['http://res.cloudinary.com/harun-rucse/image/upload/v1689868752/products/ugcyck6uow8xirnmjn93.jpg'],
      active: true,
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b90',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Product.create({
      _id: '64b95ad31ec8e5af69d3f036',
      name: 'ফরমালিনমুক্ত আম্রপালি',
      subcategory: '64b957341ec8e5af69d3ef97',
      price: 70,
      description: 'ফরমালিনমুক্ত আম্রপালি আম',
      minimumOrder: 30,
      maximumOrder: 300,
      maxDeliveryDays: 5,
      farmer: '64b953571ec8e5af69d3ee68',
      ratingQty: 0,
      ratingQty: 0,
      inStock: 400,
      images: ['http://res.cloudinary.com/harun-rucse/image/upload/v1689869015/products/ovuocv17ekchv6zyqrn8.jpg'],
      active: true,
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b90',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Product.create({
      _id: '64b95b801ec8e5af69d3f057',
      name: 'জিরা চাউল',
      subcategory: '64b957671ec8e5af69d3efa7',
      price: 70,
      description: 'ফ্রেশ জিরা চাউল',
      minimumOrder: 50,
      maximumOrder: 500,
      maxDeliveryDays: 6,
      farmer: '5f9f1b9b8b9c1c2b8c8b8b91',
      ratingQty: 0,
      ratingQty: 0,
      inStock: 800,
      images: ['http://res.cloudinary.com/harun-rucse/image/upload/v1689869189/products/w8odznmhyxa9nwoh7lmc.jpg'],
      active: true,
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b91',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Product.create({
      _id: '64b95c211ec8e5af69d3f07f',
      name: 'বাসমতি চাউল',
      subcategory: '64b957671ec8e5af69d3efa7',
      price: 70,
      description: 'বাছাই করা বাসমতি চাউল',
      minimumOrder: 80,
      maximumOrder: 600,
      maxDeliveryDays: 7,
      farmer: '5f9f1b9b8b9c1c2b8c8b8b91',
      ratingQty: 0,
      ratingQty: 0,
      inStock: 700,
      images: ['http://res.cloudinary.com/harun-rucse/image/upload/v1689869350/products/udqmnieigvrgh8qisbna.jpg'],
      active: true,
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b91',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });
  } else if (type === 'drop') {
    await Product.deleteMany({});
  }
};
