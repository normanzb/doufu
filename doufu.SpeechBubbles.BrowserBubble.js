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
	var elmtTipHandler;
	
	var stickyTimer;
	var idDisplaying = false;
	
	var firstShow = true;
	
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
			if (idDisplaying == true && stickyTimer != null)
			{
				clearInterval(stickyTimer);
			}
			stickyTimer = setInterval(this.Hide, stickyTime);
			idDisplaying = true;
		}
		
		_base_Popup(x, y, msg);
		
	});
	
	var _base_Show = this.OverrideMethod("Show", function()
	{
		// TODO: encapulate this function.
		elmtBorder.NoWrap(true);
		elmtBorder.Native().style.display = "block";
		
		if (firstShow)
		{
			elmtBorder.Opacity(10);
			firstShow = false;
		}

		setTimeout(doufu.OOP._callBacker(function()
		{
			// adjust the width
			if (elmtBorder.Native().offsetWidth > this.MaxWidth)
			{
				elmtBorder.NoWrap(false);
				elmtBorder.Native().style.width = this.MaxWidth + "px";
			}
			else
			{
				elmtBorder.Native().style.width = "auto";
			}
			
			// adjust to the tip hanlder position
			elmtBorder.Native().style.left = (elmtBorder.Native().offsetLeft - elmtTipHandler.Native().offsetLeft) + "px";
			elmtBorder.Native().style.top = (elmtBorder.Native().offsetTop - elmtBorder.Native().offsetHeight) + "px";
			
			// play animation
			elmtBorder.Effects.FadeIn(3);
			
			
		}, this), 10);
	});
	
	var _base_Hide = this.OverrideMethod("Hide", function()
	{
		clearInterval(stickyTimer);
		
		// play fadeout animation
		
		elmtBorder.Effects.FadeOut(2);
		
		
	});
	
	this.Ctor = function()
	{
		// Create doms
		elmtContainer = new doufu.Browser.Element(container);
		
		elmtBorder = doufu.Browser.DOM.CreateElement("div");
		
		elmtBorder.Native().className = this.GetClassName("border");
		
		elmtBorder.Native().style.position = "absolute";
		
		// set it to invisible when fade out done
		elmtBorder.Effects.OnFadeOut.Attach(new doufu.Event.CallBack(function()
		{
			elmtBorder.Native().style.display = "none";
		},this));
		
		elmtLeftCorner = doufu.Browser.DOM.CreateElement("div");
		elmtLeftCorner.Native().className = this.GetClassName("leftCorner");
		
		elmtRightCorner = doufu.Browser.DOM.CreateElement("div");
		elmtRightCorner.Native().className = this.GetClassName("rightCorner");
		
		elmtMessageBody = doufu.Browser.DOM.CreateElement("div");
		elmtMessageBody.Native().className = this.GetClassName("messageBody");
		
		elmtTipHandler = doufu.Browser.DOM.CreateElement("div");
		elmtTipHandler.Native().className = this.GetClassName("tipHandler");
		
		elmtBorder.AppendChild(elmtLeftCorner);
		elmtBorder.AppendChild(elmtMessageBody);
		elmtBorder.AppendChild(elmtRightCorner);
		elmtBorder.AppendChild(elmtTipHandler);
		
		// hide elmt first
		elmtBorder.Native().style.display = "none";
		this.Hide();
		
		elmtContainer.AppendChild(elmtBorder);
		
	}
	
	
	this.Ctor();
}