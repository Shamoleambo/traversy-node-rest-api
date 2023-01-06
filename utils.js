const fs = require('fs')

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', err => {
    if (err) console.log(err)
  })
}

function getPostData(req) {
  try {
    let body = ''
    return new Promise((resolve, reject) => {
      req
        .on('data', chunk => {
          body += chunk.toString()
        })
        .on('end', () => {
          resolve(JSON.parse(body))
        })
    })
  } catch (error) {
    reject(error)
  }
}

module.exports = { writeDataToFile, getPostData }
