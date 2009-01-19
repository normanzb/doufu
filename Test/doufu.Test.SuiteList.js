/*
	We need to list all js files here for x browser.
	fucking ass firefox 3 doesn't support full file path access of file field.
	fool save important data in file path.
*/
doufu.Test.SuiteList = (function()
{
	var unit = function(path)
	{
		return String.format("./Units/{0}", path);
	};
	
	return [
		unit("OOP/Interface.js"),
		unit("Helpers/Path.js"),
		""
	];
})();
