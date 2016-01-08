[![Build Status](https://travis-ci.org/telemark/tfk-template-to-pdf.svg?branch=master)](https://travis-ci.org/telemark/tfk-template-to-pdf)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tfk-template-to-pdf
This is a convenience module for creating pdf documents from templates by using services 
like [docxtemplater-webservice-docker](https://github.com/telemark/docxtemplater-webservice-docker) and [converttopdf-webservice-docker](https://github.com/telemark/converttopdf-webservice-docker)

## Installation

From npm

```sh
$ npm install tfk-template-to-pdf
```

From GitHub

```sh
$ git clone git@github.com:telemark/tfk-template-to-pdf.git
```

cd into folder and run setup

```sh
$ npm run setup
```

## Usage

Pass in an options object.

**templateData** key:value for data to render with template
**templateFilepath**: path to .docx template
**documentFilepath**: where to save the rendered document
**templaterServiceUrl**: URL to templaterservice
**pdfServiceUrl**: URL to pdf converter service

```javascript
'use strict'

var createPdfFromTemplate = require('tfk-template-to-pdf')
var options = {
  templateData: {
    'title': 'My title is none of your concerns',
    'description': 'Describe me as your best friend',
    'body': 'My body is beautiful'
  },
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

## License
[MIT](LICENSE)