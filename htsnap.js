var fs=require('fs');
var urll=require('url');
var system = require('system')

var SCREENSHOT_WIDTH = 1280; 
var SCREENSHOT_HEIGHT = 900; 
var LOAD_WAIT_TIME = 5000; 
var USERAGENT = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

var URL_FILE;
var IMG_DESTD;
var URLS=[];

var  setFromFile = function(urls, file){
	var stream = fs.open('urls', 'r');
	while(!stream.atEnd()) {
		 var url = stream.readLine();
		 urls.push(url);
	}
	stream.close();
}

var renderPage = function(page,element){

    console.log(" Render for : ",  element)
	 //screenshotFile = fs.workingDirectory + '/images/' + urll.parse(element).host +  urll.parse(element).port + '.png';
	 screenshotFile = IMG_DESTD + '/' + urll.parse(element).host +  urll.parse(element).port + '.png';
	 page.render(screenshotFile);
    console.log("+ Rendered for : ",  screenshotFile)
}

var exitIfLast = function(index,array){
    console.log(array.length - index-1, "more endpoints to go")
    console.log("~~~~~~~~~~~~~~")
    if (index == array.length-1){
        console.log("! Exiting phantomjs")
        phantom.exit();
    }
}

var takeScreenshot = function(element){

    console.log("- Opening URL:", element)

    var page = require("webpage").create();

    page.viewportSize = {width:SCREENSHOT_WIDTH, height:SCREENSHOT_HEIGHT};
	 page.settings.userAgent = USERAGENT;

	 page.open(element);
	 page.onLoadFinished = function() {
		  setTimeout(function(){
				console.log("- Rendering endpoint to storage for " + element)
				renderPage(page,element)
				exitIfLast(index,URLS)
				index++; 
				takeScreenshot(URLS[index]);
		  },LOAD_WAIT_TIME)
	  }


}

var usage = function(err){
    console.log('Usage: ./bin/phantomjs htsnap.js <URL_filename> <output_directory>');
    console.log('URL_filename format: 1 url per line');
    console.log('ex. http://google.com');
    console.log('ex. https://google.com:9443');
	 console.log(err);
    phantom.exit(1);
}


// Snap
var index = 0; 


console.log("Starting...");
if (system.args.length != 3 ) {
		usage("Need File with URLs and Destination for image output");
} else 
	if (fs.exists(system.args[1]) && fs.exists(system.args[2])) {
		URL_FILE=system.args[1];
		IMG_DESTD=system.args.[2];

		setFromFile(URLS,URL_FILE);
		takeScreenshot(URLS[index]);
	} else {
		usage("Supplied URL File or output directory do not exist. Check you path.");
	}
}
