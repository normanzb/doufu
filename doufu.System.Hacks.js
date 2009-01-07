doufu.System.Hacks = {};
doufu.System.Hacks.Array = new function()
{
	// Adding Array.indexOf for IE browser.
	[].indexOf || (Array.prototype.indexOf = function(v){
       for(var i = this.length; i-- && this[i] !== v;);
       return i;
	});
	
	Array.isArray || (Array.isArray = function(testObject) {   
    return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
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
}
