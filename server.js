const http = require('http')
const {
  getProducts,
  getSingleProduct,
  createProduct
} = require('./controller/productsController')

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res)
  } else if (
    req.url.match(/\/api\/products\/([0-9])+/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3]
    getSingleProduct(req, res, id)
  } else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Invalid route' }))
  }
})

const PORT = process.env.port || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
