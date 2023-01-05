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

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(product))
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getProducts, getSingleProduct }
