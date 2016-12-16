var libxslt = require('libxslt');
var fs = require('fs');
var libxml = libxslt.libxmljs;

console.log("XHTML 2 HTML Covertor");

libxslt.parseFile("test.xsl",function(err, xsl){
	
	xsl.applyToFile("test.xml", function(err, result){
		console.log(result);
	});
});
