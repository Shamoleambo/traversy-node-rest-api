const Product = require('../model/productModel')
const { getPostData } = require('../utils')

async function getProducts(req, res) {
  try {
    const products = await Product.findAll()

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))
  } catch (error) {
    console.log(error)
  }
}

async function getSingleProduct(req, res, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product not found' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(product))
    }
  } catch (error) {
    console.log(error)
  }
}

async function createProduct(req, res) {
  try {
    let body = await getPostData(req)

    if (!body || !body.name || !body.description || !body.price) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Invalid product' }))
    } else {
      const newProduct = await Product.createProduct(body)
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(newProduct))
    }
  } catch (error) {
    console.log(error)
  }
}

async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product not found' }))
    } else {
      const body = await getPostData(req)

      const { name, description, price } = body

      const productData = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price
      }
      if (!body) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Invalid input to edit product' }))
      } else {
        const updProduct = await Product.update(id, productData)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(updProduct))
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getProducts, getSingleProduct, createProduct, updateProduct }
