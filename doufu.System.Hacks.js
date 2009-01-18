doufu.System.Hacks = {};

doufu.System.Hacks.__isType = function(testObject, typeName)
{
	return Object.prototype.toString.call(testObject).toLowerCase() === '[object ' + typeName.toLowerCase() + ']';
}

doufu.System.Hacks.Array = new function()
{
	// Adding Array.indexOf for IE browser.
	[].indexOf || (Array.prototype.indexOf = function(v){
       for(var i = this.length; i-- && this[i] !== v;);
       return i;
	});
	
	Array.isArray || (Array.isArray = function(testObject) {   
		// commented out the old way 
    	//return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
    	return doufu.System.Hacks.__isType(testObject, "Array");
	});
}
doufu.System.Hacks.Date = new function()
{
	Date.prototype.addDay || (Date.prototype.addDay = function(iNum)
	{
		this.setTime(this.getTime() + 1000 * 60 * 60 * 24 * iNum);
	});
	
	Date.prototype.addHour || (Date.prototype.addHour = function(iNum)
	{
		this.setTime(this.getTime() + 1000 * 60 * 60 * iNum);
	});
	
	Date.prototype.addMinute || (Date.prototype.addMinute = function(iNum)
	{
		this.setTime(this.getTime() + 1000 * 60 * iNum);
	});
	
	Date.prototype.addSecond || (Date.prototype.addSecond = function(iNum)
	{
		this.setTime(this.getTime() + 1000 * iNum);
	});
}
doufu.System.Hacks.String = new function()
{
	String.prototype.trim || (String.prototype.trim = function () 
    { 
        return this.replace(/(^\s*)|(\s*$)/g, ""); 
    });
    
    String.format || (String.format = function( text )
	{
	    //check if there are two arguments in the arguments list
	    if ( arguments.length <= 1 )
	    {
	        //if there are not 2 or more arguments there’s nothing to replace
	        //just return the original text
	        return text;
	    }
	    //decrement to move to the second argument in the array
	    var tokenCount = arguments.length - 2;
	    for( var token = 0; token <= tokenCount; token++ )
	    {
	        //iterate through the tokens and replace their placeholders from the original text in order
	        text = text.replace( new RegExp( "\\{" + token + "\\}", "gi" ),
	                                                arguments[ token + 1 ] );
	    }
	    return text;
	});
	
	String.isString || (String.isString = function(testObject) {   
		return doufu.System.Hacks.__isType(testObject, "String");
	});
}

doufu.System.Hacks.Error = new function()
{
	Error.prototype.stackTrace || (Error.prototype.getStackTrace = function()
	{
		var callstack = [];
    	var isCallstackPopulated = false;
		if (this.stack) { //Firefox
            var lines = this.stack.split("\n");
            for (var i = 0, len = lines.length; i < len; i++) 
            {
                if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) 
                {
                    callstack.push(lines[i]);
                }
            }
            //Remove call to printStackTrace()
            callstack.shift();
            isCallstackPopulated = true;
        }
        else if (window.opera && this.message) 
        { //Opera
            var lines = this.message.split("\n");
            for (var i = 0, len = lines.length; i < len; i++) 
            {
                if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) 
                {
                    var entry = lines[i];
                    //Append next line also since it has the file info
                    if (lines[i+1]) 
                    {
                        entry += " at " + lines[i+1];
                        i++;
                    }
                    callstack.push(entry);
                }
            }
            //Remove call to printStackTrace()
            callstack.shift();
            isCallstackPopulated = true;
        }
    
	    if (!isCallstackPopulated) { //IE and Safari
	        var currentFunction = arguments.callee.caller;
	        while (currentFunction) {
	            var fn = currentFunction.toString();
	            //If we can't get the function name set to "anonymous"
	            var fname = fn.substring(fn.indexOf("function") + 8, fn.indexOf("(")) || "anonymous";
	            callstack.push(fname);
	            currentFunction = currentFunction.caller;
	        }
	    }
    	return callstack.join("\n\n");
	});
}