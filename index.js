'use strict'

var fs = require('fs')
var FormData = require('form-data')
var data = require('./test/data/data.json')
var template = fs.createReadStream('test/data/template.docx')
var file = fs.createWriteStream('test/data/document.docx')
var url = 'https://templater.service.t-fk.no'
var form = new FormData()

Object.keys(data).forEach(function (key) {
  form.append(key, data[key])
})

form.append('file', template)

form.submit(url, function (error, response) {
  if (error) {
    throw error
  } else {
    console.log(response.statusCode)
    response.pipe(file)
    file.on('finish', function () {
      console.log('written')
    })
  }
})
