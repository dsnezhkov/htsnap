#htsnap

## what is htsnap?

---
> htsnap is a simple tool to visually observe a large (or small) set of websites (http endpoints) to help with determining interesting hosts to concentrate on during reconnaissance phase.

---

The idea is to automate navigation to sites for visual inspection. Essentialy, a human looking through 1000 still images of websites would pick interesting patterns quicker.
Hsnap take a file with a lis t of URLs, visits (scrapes) the site and saves a PNG to diredctory of your choosing for "album-style" viewing offline.

It is based on PhantomJS's WebKit engine to have full support of rendering and JS.
---
## Usage

```sh
Usage: ./bin/phantomjs htsnap.js <URL_filename> <output_directory>

	URL_filename format: 1 url per line
	ex. http://google.com
	ex. https://google.com:9443    
```
---
## Installation

	$ git clone repository
	$ ./install

This will pull dependencies from package.json, and create links to local installation of PhantomJS driver.

### Sample run
```
$ ./bin/phantomjs  htsnap.js urls ./images/


Rendering endpoint to storage for http://yahoo.com
Render for :  http://yahoo.com
Rendered for :  ./images//yahoo.comnull.png
2 more endpoints to go
...
Opening URL: http://google.com
Rendering endpoint to storage for http://google.com
Render for :  http://google.com
Rendered for :  ./images//google.comnull.png
1 more endpoints to go
...
Opening URL: http://microsoft.com
Rendering endpoint to storage for http://microsoft.com
Render for :  http://microsoft.com
Rendered for :  ./images//microsoft.comnull.png
0 more endpoints to go
...
! Exiting phantomjs
```
