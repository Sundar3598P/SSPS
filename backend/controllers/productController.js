import Product from '../models/productModel.js'

import asyncHandler from 'express-async-handler'

// getting products

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// for single product

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
// Setting api for single product listing
const getProductById = asyncHandler(
    async (req, res) => {
        const product = await Product.findById(req.params.id) //checking id in url and matching with database _id
        if(product) {
            res.json(product)
        } else {
            res.status(404)
            throw new Error("Product not found")
        }
    }
)



// @desc Delete Single Product
// @route DELETE /api/products/:id
// @access Private / Admin
const deleteProduct = asyncHandler(
    async (req, res) => {
        const product = await Product.findById(req.params.id) 
        if(product) {
            await product.remove()
            res.json({ message: 'Product removed'})
        } else {
            res.status(404)
            throw new Error("Product not found")
        }
    }
)


// @desc Create Product
// @route POST /api/products
// @access Private / Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'SSPS',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }