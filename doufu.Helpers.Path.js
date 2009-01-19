/*
	Class: doufu.Helpers.Path
	
	Contructor:
		sPath - path string.
*/
doufu.Helpers.Path = function(sPath)
{
	doufu.OOP.Class(this);
	
	var _fileName;
	/*
		Property: FileName
		
		The file name which excluding the extension name
	*/
	this.NewProperty("FileName");
	this.FileName.Get = function()
	{
		return _fileName;
	}
	
	var _extension;
	/*
		Property: Extension
		
		Extension name
	*/
	this.NewProperty("Extension");
	this.Extension.Get = function()
	{
		return _extension;
	}
	
	/*
		Property: FullName
		
		The full file name
	*/
	this.NewProperty("FullName");
	this.FullName.Get = function()
	{
		return this.FileName() + "." + this.Extension();
	}
	
	var _path;
	/*
		Property: Path
		
		The well formatted file path.
	*/
	this.NewProperty("Path");
	this.Path.Get = function()
	{
		return _path;
	}
	
	
	this.Ctor = function()
	{
		_path = sPath;
		_path = _path.replace(/\//g, "\\");
		
		var splitterIndex = _path.lastIndexOf(".");
		var pathSplitterIndex = _path.lastIndexOf("\\");
		
		_extension = _path.substr(splitterIndex + 1, _path.length - splitterIndex - 1);
		
		_fileName = _path.substr(pathSplitterIndex + 1, splitterIndex - pathSplitterIndex - 1);
		
	};
	
	this.Ctor();
}