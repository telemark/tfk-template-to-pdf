[![Build Status](https://travis-ci.org/telemark/tfk-template-to-pdf.svg?branch=master)](https://travis-ci.org/telemark/tfk-template-to-pdf)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tfk-template-to-pdf
Create pdf documents from templates

## Usage

```javascript
'use strict'

var createPdfFromTemplate = require('tfk-template-to-pdf')
var options = {
  templateData: require('./test/data/templatedata.json'),
  templateFilepath: 'test/data/template.docx',
  documentFilepath: 'test/data/document.pdf',
  templaterServiceUrl: 'http://192.168.99.100',
  pdfServiceUrl: 'http://192.168.99.100:3000'
}

createPdfFromTemplate(options, function (error, data) {
  if (error) {
    console.error(error)
  } else {
    console.log(data)
  }
})

```