doufu.Browser.BrowserDetect = new function __nsc_Browser_BrowserDetect()
{
	this.OSEnum = 
	{
		Windows:"Windows", 
		Mac:	"Mac", 
		Linux:	"Linux",
		Unknown:"Unknown"
	};
	this.BrowserEnum = 
	{
		OmniWeb: 	"OmniWeb", 
		Safari: 	"Safari", 
		Opera: 		"Opera",
		iCab: 		"iCab",
		Konqueror: 	"Konqueror",
		Firefox: 	"Firefox",
		Camino: 	"Camino",
		Netscape: 	"Netscape",
		Explorer: 	"Explorer",
		Mozilla:	"Mozilla",
		Netscape: 	"Netscape",
		Unknown:	"Unknown"
	};
	
	this.dataOS = [
		{
			string: navigator.platform,
			subString: "Win",
			identity: this.OSEnum.Windows
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: this.OSEnum.Mac
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: this.OSEnum.Linux
		}
	];
	
	this.dataBrowser = [
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: this.BrowserEnum.OmniWeb
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: this.BrowserEnum.Safari
		},
		{
			prop: window.opera,
			identity: this.BrowserEnum.Opera
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: this.BrowserEnum.iCab
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: this.BrowserEnum.Konqueror
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: this.BrowserEnum.Firefox
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: this.BrowserEnum.Camino
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: this.BrowserEnum.Netscape
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: this.BrowserEnum.Explorer,
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: this.BrowserEnum.Mozilla,
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: this.BrowserEnum.Netscape,
			versionSearch: "Mozilla"
		}
	];
	
	this.searchString = function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	}
	
	this.searchVersion = function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	}
	
	this.Ctor = function () 
	{
		this.Browser = this.searchString(this.dataBrowser) || this.BrowserEnum.Unknown;
		this.Version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "Unknown";
		this.OS = this.searchString(this.dataOS) || this.OSEnum.Unknown;
	}
	
	this.Ctor();
}