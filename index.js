'use strict'

var fs = require('fs')
var FormData = require('form-data')
var isFile = require('file-exists')

function createPdfFromTemplate (options, callback) {
  if (!options) {
    return callback(new Error('Missing required input: options'), null)
  }
  if (!options.templateData) {
    return callback(new Error('Missing required input: options.templateData'), null)
  }
  if (!options.templateFilepath) {
    return callback(new Error('Missing required input: options.templateFilepath'), null)
  }
  if (!isFile(options.templateFilepath)) {
    return callback(new Error('options.templateFilepath is invalid'), null)
  }
  if (!options.documentFilepath) {
    return callback(new Error('Missing required input: options.documentFilepath'), null)
  }
  if (!options.templaterServiceUrl) {
    return callback(new Error('Missing required input: options.templaterServiceUrl'), null)
  }
  if (!options.pdfServiceUrl) {
    return callback(new Error('Missing required input: options.pdfServiceUrl'), null)
  }

  var data = options.templateData
  var templaterForm = new FormData()
  var pdfForm = new FormData()

  Object.keys(data).forEach(function (key) {
    templaterForm.append(key, data[key])
  })

  templaterForm.append('file', fs.createReadStream(options.templateFilepath))

  templaterForm.submit(options.templaterServiceUrl, function (error, response) {
    if (error) {
      return callback(error, null)
    } else if (response.statusCode !== 200) {
      return callback(new Error('Unexpected statusCode from templaterService: ' + response.statusCode))
    } else {
      pdfForm.append('file', response)
      pdfForm.submit(options.pdfServiceUrl, function (err, resp) {
        if (err) {
          return callback(err, null)
        } else if (response.statusCode !== 200) {
          return callback(new Error('Unexpected statusCode from pdfService: ' + response.statusCode))
        } else {
          var file = fs.createWriteStream(options.documentFilepath)
          resp.pipe(file)
          file.on('finish', function () {
            return callback(null, {message: 'Document created'})
          })
        }
      })
    }
  })
}

module.exports = createPdfFromTemplate
