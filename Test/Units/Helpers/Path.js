doufu.Test.Run(function()
{
	$c(this);
	
	this.Inherit(doufu.Test.Suite);
	
	this.NewCase(
		"Path_FileName",
		"Verify Path class properly resolved the file name",
		function()
		{
			var fullPath = "d:\\test\\test2/test3/test4/fileName.test";
			var expectedFileName = "fileName";
			
			var path = new doufu.Helpers.Path(fullPath);
			$a.AreEqual(expectedFileName, path.FileName());
			
			return true;
		}
	);
	
	this.NewCase(
		"Path_FileName_2Dots",
		"Verify Path class properly resolved the file name when there are two dots",
		function()
		{
			var fullPath = "d:\\test\\test2/test3/test4/fileName.test.jzzz";
			var expectedFileName = "fileName.test";
			
			var path = new doufu.Helpers.Path(fullPath);
			$a.AreEqual(expectedFileName, path.FileName());
			
			return true;
		}
	);
	
	this.NewCase(
		"Path_FileName_Unix",
		"Verify Path class properly resolved the file name when the path is unix format",
		function()
		{
			var fullPath = "\\test\\test2/test3/test4/fileName.jzzz";
			var expectedFileName = "fileName";
			
			var path = new doufu.Helpers.Path(fullPath);
			$a.AreEqual(expectedFileName, path.FileName());
			
			return true;
		}
	);
	
	this.NewCase(
		"Path_Extension_Normal",
		"Verify Path class properly resolved the extension name",
		function()
		{
			var fullPath = "d:\\test\\test2\\test3/test4/fileName.jzzz";
			var expectedExtensionName = "jzzz";
			
			var path = new doufu.Helpers.Path(fullPath);
			$a.AreEqual(expectedExtensionName, path.Extension());
			
			return true;
		}
	);
	
	this.NewCase(
		"Path_Extension_2Dots",
		"Verify Path class properly resolved the extension name when there are 2 dots in path",
		function()
		{
			var fullPath = "d:\\test\\test2\\test3/test4/fileName.test.jzzz";
			var expectedExtensionName = "jzzz";
			
			var path = new doufu.Helpers.Path(fullPath);
			$a.AreEqual(expectedExtensionName, path.Extension());
			
			return true;
		}
	);
	
	this.NewCase(
		"Path_FullName_2Dots",
		"Verify Path class properly returned the full name when there are 2 dots in path",
		function()
		{
			var fullPath = "d:\\test\\test2\\test3/test4/fileName.test.jzzz";
			var expectedFull = "fileName.test.jzzz";
			
			var path = new doufu.Helpers.Path(fullPath);
			$a.AreEqual(expectedFull, path.FullName());
			
			return true;
		}
	);
});