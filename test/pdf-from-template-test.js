'use strict'

var tap = require('tap')
var createPdfFromTemplate = require('../index')

tap.test('requires an options object', function (test) {
  var options = false
  var expectedErrorMessage = 'Missing required input: options'
  createPdfFromTemplate(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('requires options.templateData to exist', function (test) {
  var options = {
    templateData: false
  }
  var expectedErrorMessage = 'Missing required input: options.templateData'
  createPdfFromTemplate(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('requires options.templateFilepath to exist', function (test) {
  var options = {
    templateData: true,
    templateFilepath: false
  }
  var expectedErrorMessage = 'Missing required input: options.templateFilepath'
  createPdfFromTemplate(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('requires options.templateFilepath to be valid', function (test) {
  var options = {
    templateData: true,
    templateFilepath: '/none/existing/file/here.docx'
  }
  var expectedErrorMessage = 'options.templateFilepath is invalid'
  createPdfFromTemplate(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('requires options.documentFilepath to exist', function (test) {
  var options = {
    templateData: true,
    templateFilepath: 'test/data/template.docx',
    documentFilepath: false
  }
  var expectedErrorMessage = 'Missing required input: options.documentFilepath'
  createPdfFromTemplate(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('requires options.templaterServiceUrl to exist', function (test) {
  var options = {
    templateData: true,
    templateFilepath: 'test/data/template.docx',
    documentFilepath: true,
    templaterServiceUrl: false
  }
  var expectedErrorMessage = 'Missing required input: options.templaterServiceUrl'
  createPdfFromTemplate(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})

tap.test('requires options.pdfServiceUrl to exist', function (test) {
  var options = {
    templateData: true,
    templateFilepath: 'test/data/template.docx',
    documentFilepath: true,
    templaterServiceUrl: true,
    pdfServiceUrl: false
  }
  var expectedErrorMessage = 'Missing required input: options.pdfServiceUrl'
  createPdfFromTemplate(options, function (error, data) {
    tap.equal(error.message, expectedErrorMessage, expectedErrorMessage)
    test.done()
  })
})
