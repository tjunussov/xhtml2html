## About

**xhtml2html.js**  script file converts xhtml files in folders to html

## Usage
Simple run application, it will evaluate template path from PI of `<xsl-stylesheet href="mytemplate.xsl">`
```
node xhtml2html.js index.xhtml
```
### All Parameters pass
1. Param - XML File
2. Param ( optional ) - XSL File ( if optional, it tries extract from XML file PI ) 
3. Param ( optional ) - Mode ( passes variable mode to Template as xsl:param ) 

```
node xhtml2html.js index.xhtml index.xsl html
```

### Directory Transform

Folder traverse usin `find` you can make batch file `x2h.sh`
```
find /myXhtmlFolder -type f -name "*.xhtml" -execdir node xhtml2html.js {} \;
```

## Issues

- Due to relative path support ( xsl:include, xsl:import, document(); ) in working folder, it is prefered to work in root folder
- libxslt with optioin `xsl:output mode="html"` converts UTF-8 to Unicode ASCI entities, so script converts it back
- Empty xmlns removal
- 

## Dependacies
```
[libxslt](https://github.com/albanm/node-libxslt)
[libxmljs](https://github.com/libxmljs/libxmljs)
```

optional dependencies
```
js-beautify
colors
```

## ToDo
- Publish to npm 
- Increase transformation speed
- Nodejs http, express friendly style
- Compare timestamp of xhtml and transform to html if changed
- Partial html output support with param mode
