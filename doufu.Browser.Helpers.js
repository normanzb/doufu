doufu.Browser.Helpers = new Object();

doufu.Browser.Helpers.SPACE_NAME = "doufu.Browser.Helpers";

doufu.Browser.Helpers.CreateOverflowHiddenDiv = function(sDivID, elmtParent, iWidth , iHeight)
{
	var borderWidth = 1;
	
	if (sDivID == null ||
		elmtParent == null)
	{
		throw doufu.System.Exception("sDivID and elmtParent were required!");
	}
	
	var retDiv;
	retDiv = doufu.Browser.DOM.CreateElement("div").Native();
	retDiv.setAttribute("id", sDivID);
	retDiv.style.overflow = "hidden";
	retDiv.style.width = iWidth + "px";
	retDiv.style.height = iHeight + "px";
	retDiv.style.border = borderWidth + "px solid #000";
	
	elmtParent.appendChild(retDiv);	
	
	if (doufu.Browser.DOM.CompatibleMode() == doufu.Browser.DOM.CompatibleMode.CSS1_COMPAT)
	{
		retDiv.style.position = "relative";
	}
	else if (doufu.Browser.DOM.CompatibleMode() == doufu.Browser.DOM.CompatibleMode.BACK_COMPAT)
	{
		
	}
	else
	{
		doufu.System.APIs.FunctionHooker("appendChild", function(obj)
			{
				obj.style.clip="rect(0px " + 
					doufu.System.Convert.ToString(retDiv.clientLeft + iWidth) + "px " + 
					iHeight + "px " + retDiv.clientLeft + "px)";
				//alert(doufu.Browser.Helpers.GetAbsolutePosition(retDiv).Y);
				//alert(retDiv.clientTop + 
				//	doufu.System.Convert.ToInt(retDiv.marginTop.replace("px", "")));
				obj.style.marginTop = "9px";//doufu.Browser.Helpers.GetAbsolutePosition(retDiv).Y;
				obj.style.marginLeft = "8px";
			},
		retDiv);
	}

	return retDiv;
}

  /* *
  * Retrieve the coordinates of the given event relative to the center
  * of the widget.
  *
  * @param event
  *  A mouse-related DOM event.
  * @param reference
  *  A DOM element whose position we want to transform the mouse coordinates to.
  * @return
  *    A hash containing keys 'x' and 'y'.
  */
doufu.Browser.Helpers.GetRelativeCoordinates = function(event, reference) {
    var x, y;
    event = event || window.event;
    var el = event.target || event.srcElement;
    if (!window.opera && typeof event.offsetX != 'undefined') {
      // Use offset coordinates and find common offsetParent
      var pos = { x: event.offsetX, y: event.offsetY };
      // Send the coordinates upwards through the offsetParent chain.
      var e = el;
      while (e) {
        e.mouseX = pos.x;
        e.mouseY = pos.y;
        pos.x += e.offsetLeft;
        pos.y += e.offsetTop;
        e = e.offsetParent;
      }
      // Look for the coordinates starting from the reference element.
      var e = reference;
      var offset = { x: 0, y: 0 }
      while (e) {
        if (typeof e.mouseX != 'undefined') {
          x = e.mouseX - offset.x;
          y = e.mouseY - offset.y;
          break;
        }
        offset.x += e.offsetLeft;
        offset.y += e.offsetTop;
        e = e.offsetParent;
      }
      // Reset stored coordinates
      e = el;
      while (e) {
        e.mouseX = undefined;
        e.mouseY = undefined;
        e = e.offsetParent;
      }
    }
    else {
      // Use absolute coordinates
      var pos = getAbsolutePosition(reference);
      x = event.pageX  - pos.x;
      y = event.pageY - pos.y;
    }
    // Subtract distance to middle
    return { x: x, y: y };
  }


doufu.Browser.Helpers.GetAbsolutePosition = function(element) {
    var r = new doufu.Display.Drawing.Rectangle();
    r.X = element.offsetLeft;
    r.Y = element.offsetTop;
    if (element.offsetParent) {
      var tmp = doufu.Browser.Helpers.GetAbsolutePosition(element.offsetParent);
      r.X += tmp.X;
      r.Y += tmp.Y;
    }
    
    return r;
}

/*
	Function: doufu.Browser.Helpers.EnableBackgroundCache
	
	Helps to enable/disable background cache
	
	Parameters:
		bEnable - True to enable, false to disable
*/
doufu.Browser.Helpers.EnableBackgroundCache = function(bEnable)
{
	// Force IE to use cache.
	if (doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer)
	{
		try
		{
			document.execCommand("BackgroundImageCache", false, bEnable);
		}
		catch(ex)
		{};
	}
}

/*
	Function: doufu.Browser.Helpers.AttachEvent
	
	Attach event to the native element.
	
	Parameters:
		oElement - The element to be attached.
		sEventName - The event name. (keydown, keyup, click....)
		pFunc - The function to attach.
*/
doufu.Browser.Helpers.AttachEvent = function(oElement, sEventName, pFunc)
{
	if (doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer &&
		typeof document.attachEvent != doufu.System.Constants.TYPE_UNDEFINED)
	{
		oElement.attachEvent("on" + sEventName.toLowerCase(), pFunc);
	}
	else if(typeof document.addEventListener != doufu.System.Constants.TYPE_UNDEFINED)
	{
		oElement.addEventListener(sEventName.toLowerCase(), pFunc, false);
	}
	else
	{
		doufu.System.Logger.Debug("doufu.Browser.Helpers.AttachEvent() - Neither attachEvent nor addEventListener available, use element.onEvent directly.");
		
		oElement["on" + sEventName] = pFunc;
	}
}

/*
	Function: doufu.Browser.Helpers.DetachEvent
	
	Detach event to the native element.
	
	Parameters:
		oElement - The element to be detached.
		sEventName - The event name. (keydown, keyup, click....)
		pFunc - The function to detach.
*/
doufu.Browser.Helpers.DetachEvent = function(oElement, sEventName, pFunc)
{
	if (doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer &&
		typeof document.detachEvent != doufu.System.Constants.TYPE_UNDEFINED)
	{
		oElement.detachEvent("on" + sEventName.toLowerCase(), pFunc);
	}
	else if(typeof document.removeEventListener != doufu.System.Constants.TYPE_UNDEFINED)
	{
		oElement.removeEventListener(sEventName.toLowerCase(), pFunc, false);
	}
	else
	{
		doufu.System.Logger.Debug("doufu.Browser.Helpers.AttachEvent() - Neither detachEvent nor removeEventListener available, use element.onEvent=null directly.");
		
		if (oElement["on" + sEventName] == pFunc)
		{
			oElement["on" + sEventName] = null;
		}
	}
}