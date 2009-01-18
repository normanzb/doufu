/*
	Class: doufu.Test.Runner
	
	Runner builder
*/
doufu.Test.Runner = function(container)
{
	/* elements */
	var divFilePicker;
	var inputFilePicker;
	var elInputFilePicker;
	
	var fileSelected = function()
	{
		if(inputFilePicker.value.substr(inputFilePicker.value.length - 3, 3).toLowerCase()
			!= ".js")
		{
			return false;
		}
		
		var jsRequest = new doufu.Http.JSON();
		jsRequest.Open(inputFilePicker.value, "anyname");
		
		jsRequest.Send();
		
		return true;
	}
	
	this.Ctor = function()
	{
		// build file selector
		divFilePicker = document.createElement("div");
		inputFilePicker = document.createElement("input");
		
		inputFilePicker.type = "file";
		
		elInputFilePicker = new doufu.Browser.Element(inputFilePicker);
		elInputFilePicker.OnChange.Attach(new doufu.Event.CallBack(function()
		{
			fileSelected.call(this);
		}, this));
		
		divFilePicker.appendChild(inputFilePicker);
		
		// build logger
		
		container.appendChild(divFilePicker);
	}
	
	this.Ctor();
}
