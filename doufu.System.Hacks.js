doufu.System.Hacks = {};
doufu.System.Hacks.IE = new function()
{
	// Adding Array.indexOf for IE browser.
	[].indexOf || (Array.prototype.indexOf = function(v){
       for(var i = this.length; i-- && this[i] !== v;);
       return i;
	});

}