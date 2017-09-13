'use strict'

const fs = require('fs')
const FormData = require('form-data')
const isFile = require('file-exists')

module.exports = (options, callback) => {
  if (!options) {
    return callback(new Error('Missing required input: options'), null)
  }
  if (!options.templateData) {
    return callback(new Error('Missing required input: options.templateData'), null)
  }
  if (!options.templateFilepath) {
    return callback(new Error('Missing required input: options.templateFilepath'), null)
  }
  if (!isFile.sync(options.templateFilepath)) {
    return callback(new Error('options.templateFilepath is invalid'), null)
  }
  if (!options.documentFilepath) {
    return callback(new Error('Missing required input: options.documentFilepath'), null)
  }
  if (!options.pdfServiceUrl) {
    return callback(new Error('Missing required input: options.pdfServiceUrl'), null)
  }

  const data = options.templateData
  let pdfForm = new FormData()

  Object.keys(data).forEach(function (key) {
    pdfForm.append(key, data[key])
  })

  pdfForm.append('file', fs.createReadStream(options.templateFilepath))

  pdfForm.submit(options.pdfServiceUrl, (error, response) => {
    if (error) {
      return callback(error, null)
    } else if (response.statusCode !== 200) {
      return callback(new Error('Unexpected statusCode from pdfService: ' + response.statusCode))
    } else {
      let file = fs.createWriteStream(options.documentFilepath)
      response.pipe(file)
      file.on('finish', function () {
        return callback(null, {message: 'Document created'})
      })
    }
  })
}
