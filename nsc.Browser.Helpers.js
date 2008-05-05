nsc.Browser.Helpers = new Object();

nsc.Browser.Helpers.SPACE_NAME = "nsc.Browser.Helpers";

nsc.Browser.Helpers.CreateOverflowHiddenDiv = function(sDivID, elmtParent, iWidth , iHeight)
{
	var borderWidth = 1;
	
	if (sDivID == null ||
		elmtParent == null)
	{
		throw nsc.System.Exception("sDivID and elmtParent were required!");
	}
	
	var retDiv;
	retDiv = nsc.Browser.DOM.CreateElement("div");
	retDiv.setAttribute("id", sDivID);
	retDiv.style.overflow = "hidden";
	retDiv.style.width = iWidth + "px";
	retDiv.style.height = iHeight + "px";
	retDiv.style.border = borderWidth + "px solid #000";
	
	elmtParent.appendChild(retDiv);	
	
	if (nsc.Browser.DOM.CompatibleMode() == nsc.Browser.DOM.CompatibleMode.CSS1_COMPAT)
	{
		if (nsc.Browser.BrowserDetect.Browser == nsc.Browser.BrowserDetect.BrowserEnum.Explorer)
		{
			if (nsc.Browser.BrowserDetect.Version == 8)
			{
				nsc.System.APIs.FunctionHooker("appendChild", function(obj)
					{
						obj.style.clip="rect(0," + 
							nsc.System.Convert.ToString(retDiv.clientLeft + iWidth) + "," + 
							iHeight + "," + retDiv.clientLeft + ")";
						//alert(nsc.Browser.Helpers.GetAbsolutePosition(retDiv).Y);
						//alert(retDiv.clientTop + 
						//	nsc.System.Convert.ToInt(retDiv.marginTop.replace("px", "")));
						obj.style.marginTop = "9px";//nsc.Browser.Helpers.GetAbsolutePosition(retDiv).Y;
						obj.style.marginLeft = "8px";
					},
				retDiv);
			}
			else 
			{
				retDiv.style.position = "relative";
			}
			
		}
		else
		{
			retDiv.style.position = "relative";
		}
	}
	else if (nsc.Browser.DOM.CompatibleMode() == nsc.Browser.DOM.CompatibleMode.BACK_COMPAT)
	{
		
	}
	else
	{

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
nsc.Browser.Helpers.GetRelativeCoordinates = function(event, reference) {
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


nsc.Browser.Helpers.GetAbsolutePosition = function(element) {
    var r = new nsc.Display.Drawing.Rectangle();
    r.X = element.offsetLeft;
    r.Y = element.offsetTop;
    if (element.offsetParent) {
      var tmp = nsc.Browser.Helpers.GetAbsolutePosition(element.offsetParent);
      r.X += tmp.X;
      r.Y += tmp.Y;
    }
    
    return r;
}