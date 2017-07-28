const express = require('express');
const router = express.Router();
var pdf = require('html-pdf');
var fs = require('fs');
var contentbody;
// Fetch List of APS query records for a single user
router.post('/', (req, res, next) => {
  console.log("inside post")

  filePath = "./APSDownloads/APSReport" + new Date().getTime() + ".pdf";
  var message;

  var html = req.body.htmlPage;
  var options = {
    format: 'Letter', "border": {
      "top": "0mm",            // default is 0, units: mm, cm, in, px 
      "right": "0mm",
      "bottom": "0mm",
      "left": "5mm"
    },
  };
  //const decodedHtmlPage = urlencode.decode(html);


  // pdf
  //   .create(html, options)
  //   .toFile(filePath, function (err, res) {
  //     console.log(res);
  //     if (err) {
  //       message = "Download Failed";
  //     } else {
  //       message = "Download Success";
  //     }
  //   });

  pdf.create(html).toStream(function (err, stream) {
    // console.log("streamVall");
    // res.write("stream")
    // res.end();
    //  var streamVall= stream.pipe(fs.createWriteStream('./APSDownloads/foo.pdf'));
    // console.log(streamVall);

    var chunks = [];
    stream.on('data', function (chunk) {
      chunks.push(chunk);
      console.log('chunk:', chunk.length);
    });
    stream.on('end', function () {
      var result = Buffer.concat(chunks);
      console.log('final result:', result.toString('base64'));

      res.contentType("application/pdf");
      res.setHeader('Content-disposition', 'attachment;filename=test.pdf');
      res.setHeader('Content-Length', result.toString('base64').length);

      res.send(result.toString('base64'));
    });
  });


  //res.json({ message: message });
});

module.exports = router;
