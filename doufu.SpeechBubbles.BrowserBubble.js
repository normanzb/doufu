/*
	Class: doufu.SpeechBubbles.BrowserBubble
	
	A speech bubble implementation which can be used in anywhere in the browser.
*/

doufu.SpeechBubbles.BrowserBubble = function(container)
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.SpeechBubbles.BaseBubble);
	
	var self = this;
	
	var elmtContainer;
	var elmtBorder;
	var elmtLeftCorner;
	var elmtRightCorner;
	var elmtMessageBody;
	
	var hideInterval;
	var idDisplaying = false;
	
	/*
		Property: HTMLBorder
		Get the native html element of border.
		<doufu.Property>
	*/
	this.NewProperty("HTMLBorder");
	this.HTMLBorder.Get = function()
	{
		return elmtBorder.Native();
	}

	var _base_GetClassName = this.OverrideMethod("GetClassName", function(subfix)
	{
		var privatePrefix = "doufu_SpeechBubbles_BrowserBubble_";
		return _base_GetClassName(subfix) + " " + privatePrefix + this.Style + "_" + subfix;
	});
	
	this.Text.Get = function()
	{
		return elmtMessageBody.Native().innerHTML;
	}
	this.Text.Set = function(value)
	{
		elmtMessageBody.Native().innerHTML = value;
	}
	
	this.Width.Get = function()
	{
		return elmtBorder.Native().clientWidth;
	}
	this.Width.Set = function(value)
	{
		elmtBorder.Native().style.width = value + "px";
	}
	
	this.Height.Get = function()
	{
		return elmtBorder.Native().clientHeight;
	}
	this.Height.Set = function(value)
	{
		elmtBorder.Native().style.height = value + "px";
	}
	
	var _base_Popup = this.OverrideMethod("Popup", function(x, y, msg)
	{
		
		// set text
		this.Text(msg);
		
		// set start position
		// TODO caculate the bubble tip posiotin
		elmtBorder.Native().style.left = x + "px";
		elmtBorder.Native().style.top = y + "px";
		
		// show
		this.Show();
		
		// stick for a while and hide
		if (this.StickyTime != 0)
		{
			var stickyTime = this.StickyTime;
			
			if (msg.length > this.BaseTextLength)
			{
				stickyTime = msg.length * this.StickyFactor;
			}
			
			// prevent glitch which invoke popup many times within a time span of stickyTime.
			if (idDisplaying == true && hideInterval != null)
			{
				clearInterval(hideInterval);
			}
			hideInterval = setInterval(this.Hide, stickyTime);
			idDisplaying = true;
		}
		
		_base_Popup(x, y, msg);
		
	});
	
	var _base_Show = this.OverrideMethod("Show", function()
	{
		// TODO: encapulate this function.
		elmtBorder.NoWrap(true);
		elmtBorder.Native().style.display = "block";
		elmtBorder.Native().style.opacity = "0.1";
		setTimeout(doufu.OOP._callBacker(function()
		{
			if (elmtBorder.Native().offsetWidth > this.MaxWidth)
			{
				elmtBorder.NoWrap(false);
				elmtBorder.Native().style.width = this.MaxWidth + " px";
			}
			// adjust the width
			// play animation
		}, this), 10);
	});
	
	var _base_Hide = this.OverrideMethod("Hide", function()
	{
		clearInterval(hideInterval);
		elmtBorder.Native().style.display = "none";
		// play fadeout animation
	});
	
	this.Ctor = function()
	{
		// Create doms
		elmtContainer = new doufu.Browser.Element(container);
		
		elmtBorder = doufu.Browser.DOM.CreateElement("div");
		
		elmtBorder.Native().className = this.GetClassName("border");
		
		elmtBorder.Native().style.position = "absolute";
		
		elmtLeftCorner = doufu.Browser.DOM.CreateElement("div");
		elmtLeftCorner.Native().className = this.GetClassName("leftCorner");
		
		elmtRightCorner = doufu.Browser.DOM.CreateElement("div");
		elmtRightCorner.Native().className = this.GetClassName("rightCorner");
		
		elmtMessageBody = doufu.Browser.DOM.CreateElement("div");
		elmtMessageBody.Native().className = this.GetClassName("messageBody");
		
		elmtBorder.AppendChild(elmtLeftCorner);
		elmtBorder.AppendChild(elmtMessageBody);
		elmtBorder.AppendChild(elmtRightCorner);
		
		// hide elmt first
		this.Hide();
		
		elmtContainer.AppendChild(elmtBorder);
		
	}
	
	
	this.Ctor();
}