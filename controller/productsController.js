const Product = require('../model/productModel')

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
    let body = ''

    req
      .on('data', chunk => {
        body += chunk.toString()
      })
      .on('end', async () => {
        const requestProduct = JSON.parse(body)

        if (
          !requestProduct ||
          !requestProduct.name ||
          !requestProduct.description ||
          !requestProduct.price
        ) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Invalid product' }))
        } else {
          const newProduct = await Product.createProduct(requestProduct)
          res.writeHead(201, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(newProduct))
        }
      })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getProducts, getSingleProduct, createProduct }
