/*
	Class: doufu.Test.Runner
	
	Runner builder
*/
doufu.Test.Runner = function(container)
{
	/* elements */
	var divFilePicker;
	var selectFileSelect;
	var btnFileSelect;
	var elBtnFileSelect;
	
	var fileSelected = function()
	{
		var selectedValue = selectFileSelect[selectFileSelect.selectedIndex].value;
		if(selectedValue.substr(selectedValue.length - 3, 3).toLowerCase()
			!= ".js")
		{
			return false;
		}
		
		var jsRequest = new doufu.Http.JSON();
		jsRequest.Open(selectedValue, "anyname");
		
		jsRequest.Send();
		
		return true;
	}
	
	this.Ctor = function()
	{
		// build file selector
		divFilePicker = document.createElement("div");
		
		selectFileSelect = document.createElement("select");
		// Get unit test list from array.
		for (var i =0; i < doufu.Test.SuiteList.length && doufu.Test.SuiteList[i].trim() != String.empty; i++)
		{
			var option = document.createElement("option");
			option.text = (new doufu.Helpers.Path(doufu.Test.SuiteList[i])).FileName();
			option.value = doufu.Test.SuiteList[i];
			selectFileSelect.options[i] = option;
		}
		
		btnFileSelect = document.createElement("button");
		btnFileSelect.innerHTML = "Run";
		
		elBtnFileSelect = new doufu.Browser.Element(btnFileSelect);
		elBtnFileSelect.OnClick.Attach(new doufu.Event.CallBack(function()
		{
			fileSelected.call(this);
		}, this));
		
		divFilePicker.appendChild(selectFileSelect);
		divFilePicker.appendChild(btnFileSelect);
	
		// build logger
		
		container.appendChild(divFilePicker);
	}
	
	this.Ctor();
}
