'use strict'

var fs = require('fs')
var FormData = require('form-data')
var data = require('./test/data/data.json')
var template = fs.createReadStream('test/data/template.docx')
var file = fs.createWriteStream('test/data/document.pdf')
// var templateServiceUrl = 'https://templater.service.t-fk.no'
// var pdfServiceUrl = 'https://pdfconvert.service.t-fk.no'
var templateServiceUrl = 'http://192.168.99.100'
var pdfServiceUrl = 'http://192.168.99.100:3000'
var templateForm = new FormData()
var pdfForm = new FormData()
var timeStart = new Date().getTime()

Object.keys(data).forEach(function (key) {
  templateForm.append(key, data[key])
})

templateForm.append('file', template)

templateForm.submit(templateServiceUrl, function (error, response) {
  if (error) {
    throw error
  } else {
    console.log(response.statusCode)
    console.log(response.statusMessage)
    pdfForm.append('file', response)
    pdfForm.submit(pdfServiceUrl, function (err, resp) {
      if (err) {
        throw err
      } else {
        console.log(resp.statusCode)
        console.log(resp.statusMessage)
        resp.pipe(file)
        file.on('finish', function () {
          var timeStop = new Date().getTime()
          console.log('written')
          console.log(timeStop - timeStart)
        })
      }
    })
  }
})
