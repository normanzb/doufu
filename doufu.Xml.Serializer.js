doufu.Xml.Serializer = function()
{
	doufu.OOP.Class(this);
	
	var indent = 0;
	var indentNow = 0;
	var indentStr = "";
	
	/*
		Property: Readable
		
		true - easier to read
	*/
	this.Readable = false;
	
	/*
		Property: BreakLine
		
		Get the breakline symbol
	*/
	this.NewProperty("BreakLine");
	this.BreakLine.Get = function()
	{
		return (this.Readable?"\r\n":"");
	}
	
	/*
		Property: Indent
		
		Get the indent
	*/
	this.NewProperty("Indent");
	this.Indent.Get = function()
	{
		if (this.Readable == false)
		{
			return "";
		}
		if (indentNow != indent)
		{
			indentNow = indent;
			indentStr = "";
			indentStr = _.GetSpecifiedLengthString(indent, "    ");
		}
		return indentStr;
	}
	
	this.GetNodeAttributeString = function(node)
	{
		indent++;
		var retString = "";
		for (var el in node)
		{
			if (_.IsString(el) &&
				_.IsString(node[el]))
			{
				retString += _.StringFormat(this.Indent() + "{0}=\"{1}\" " + this.BreakLine(), 
					el, node[el]);
			}
		}
		indent--;
		return retString;
	}
	
	this.HasChild = function(node)
	{
		var retBool = false;
		for (var el in node)
		{
			if (_.IsString(el) &&
				!_.IsString(node[el]) && 
				typeof node[el] == "object")
			{
				retBool = true;
				return retBool;
			}
		}
		
		return retBool;
	}
	
	this.GetSubNodeString = function(node)
	{
		var retString = "";
		for (var el in node)
		{
			if (_.IsString(el))
			{
				if (!_.IsString(node[el]) && typeof node[el] == "object")
				{
					if (!_.IsArray(node[el]))
					{
					var attributes = this.GetNodeAttributeString(node[el]);
					retString += this.Indent() + _.StringFormat("<{0} {1}{2}", el, (attributes == ""?"":this.BreakLine()), attributes);
					
					if (this.HasChild(node[el]))
					{
						retString += ">";
						retString += this.BreakLine()
						
						indent++;
						
						retString += this.GetSubNodeString(node[el]);

						indent--;
						
						retString += _.StringFormat("{0}</{1}>", this.Indent(), el);
					}
					else
					{
						retString += this.Indent() + "/>";
					}
					
					retString += this.BreakLine();
					}
					else
					{	
						for(var i = 0; i < node[el].length; i++)
						{
							var tmpObj = {};
							tmpObj[el] = node[el][i];
							retString += this.GetSubNodeString(tmpObj);
						}
					}
				}
				
			}
		}
		
		
		return retString;
	}
	
	/*
		Function: Generate
		
		Serialize object to xml
		
		Parameters:
			tmpl: an object.
		
		Return:
			serialized xml.
	*/
	this.Serialize = function(tmpl)
	{
		indent = 0;
		indentNow = 0;
		indentStr = "";
		return _.StringFormat("<?xml version='1.0' encoding='utf-8'?>{0}{1}" ,this.BreakLine() ,this.GetSubNodeString(tmpl));
	}
}

/*
	Singleton: doufu.Xml.Serializer.Instance
*/
doufu.Xml.Serializer.Instance = new doufu.Xml.Serializer();

/*
	Function: doufu.Xml.Serializer.Serialize
	
	static method to serialize a object to xml
*/
doufu.Xml.Serializer.Serialize = doufu.Xml.Serializer.Instance.Serialize;