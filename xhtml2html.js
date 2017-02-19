var colors = require('colors');
var libxslt = require('libxslt');
var fs = require('fs');
var libxml = libxslt.libxmljs;
var beautify_html = require('js-beautify').html;
// var Entities = require('html-entities').XmlEntities; entities = new Entities();

print(" == ");

// XHTML Template

var xmlPath = process.argv.length >= 3 ? process.argv[2] : "login.xhtml"; // Passing cmd parameter or default

transformXHTML(xmlPath);
println(" =| Saved...");


function transformXHTML(xmlPath){

		xmlPath = xmlPath.replace("./","");
	var htmlPath = xmlPath.replace("xhtml","html");
	var xmlString = fs.readFileSync(xmlPath, 'utf8');
		// xmlString = xmlString.replace(/ &lt;"/g,'');
	var xml = libxml.parseXml(xmlString);
	var params = {mode:"html"};


	// XHTML XSL template path extracting
	// var xslPath = process.argv.length >= 4 ? process.argv[3] : extractStylesheet(xml);
	var xslPath = extractStylesheet(xml);  // partial handling

	if( process.argv.length >= 4) {
		htmlPath = htmlPath.replace("html","partial.html");
		params.fragment = 'yes';
	}
	

	print(`XML [${process.cwd()}/${xmlPath}]`.green);
	print(`-> XSL[${xslPath}]`.red);
	print(`-> HTML[${htmlPath}]`.yellow);

	// XSL template
	var xslString = fs.readFileSync(xslPath, 'utf8');
		// xslString.replace('xsl:output method="xml"','xsl:output method="html"');
	var xslDoc = libxml.parseXml(xslString);

	
	var xsl = libxslt.parse(xslDoc);
	//libxslt.parse(xslDoc,function(err,xsl){
	//libxslt.parseFile(xslPath,function(err,xsl){


	var result = xsl.apply(xml,params); //,{outputFormat:"document"}
		result = result.toString().replace(/ xmlns=\"\"/g,'');
		result = decodeHtmlEntities(result);//entities.decode(result);
		result = beautify_html(result, { indent_size: 2 });
	fs.writeFile(htmlPath,result);

	return result;
}


function extractStylesheet(xml){
	var xslPath = xml.get('//processing-instruction()[name() = "xml-stylesheet"]');
	if(!xslPath) throw new Error("Error nofound XSL stylesheet in xhtml @href");
	xslPath = xslPath.toString().match(/href="(.*)"/i)[1];
	return xslPath;
}

function print(msg){
	 process.stdout.write(msg);
}

function println(msg){
	  process.stdout.write(msg + '\n');
}

function decodeHtmlEntities(str) {
    return str.replace(/&#([0-9]{1,4});/gi, function(match, numStr) {
        var num = parseInt(numStr, 10); // read num as normal number
        return String.fromCharCode(num);
    });
}


// 
/*

fs.readFile("xfaces/login.xhtml", 'utf8', function(err, xmlString) {

*/