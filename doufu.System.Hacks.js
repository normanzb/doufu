doufu.System.Hacks = {};
doufu.System.Hacks.Array = new function()
{
	// Adding Array.indexOf for IE browser.
	[].indexOf || (Array.prototype.indexOf = function(v){
       for(var i = this.length; i-- && this[i] !== v;);
       return i;
	});
	
}
doufu.System.Hacks.Date = new function()
{
	Date.prototype.addDay || (Date.prototype.addDay = function(iNum)
	{
		this.setTime(this.getTime() + 1000 * 60 * 60 * 24 * iNum);
	});
}
doufu.System.Hacks.String = new function()
{
	String.prototype.trim || (String.prototype.trim = function () 
    { 
        return this.replace(/(^\s*)|(\s*$)/g, ""); 
    });
}
