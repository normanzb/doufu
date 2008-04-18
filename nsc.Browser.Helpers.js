nsc.Browser.Helpers = new Object();

nsc.Browser.Helpers.SPACE_NAME = "nsc.Browser.Helpers";

nsc.Browser.Helpers.CreateOverflowHiddenDiv = function(sDivID, elmtParent, iWidth , iHeight)
{
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
	retDiv.style.border = "1px solid #000";
	
	elmtParent.appendChild(retDiv);	
	
	if (nsc.Browser.DOM.CompatibleMode() == nsc.Browser.DOM.CompatibleMode.CSS1_COMPAT)
	{
		if (nsc.Browser.BrowserDetect.Browser == nsc.Browser.BrowserDetect.BrowserEnum.Explorer)
		{
			if (nsc.Browser.BrowserDetect.Version == 8)
			{
				//temporary solution
				var tmp = nsc.Browser.DOM.CreateElement(retDiv);
				tmp.style.zIndex = "65534";
				tmp.style.width = iWidth + 1 + "px";
				tmp.style.height = iHeight + 1 +  "px";
				tmp.style.position = "absolute";
				tmp.style.borderLeft = retDiv.clientLeft - 1 + "px solid #FFF";
				tmp.style.borderRight = nsc.Browser.DOM.DocRef().documentElement.clientWidth - 1 - retDiv.clientLeft - retDiv.clientWidth + "px solid #FFF";
				tmp.style.borderTop = retDiv.clientTop - 1 + "px solid #FFF";
				tmp.style.borderBottom = nsc.Browser.DOM.DocRef().documentElement.clientHeight - 1 - retDiv.clientTop - retDiv.clientHeight + "px solid #FFF";
				retDiv.style.zIndex = "65533";
				retDiv.style.position = "absolute";
				retDiv.parentNode.appendChild(tmp);
				//alert();
			}
			else if (nsc.Browser.BrowserDetect.Version == 7)
			{
				retDiv.style.position = "relative";
			}
			
		}
		
		if (nsc.Browser.BrowserDetect.Browser == nsc.Browser.BrowserDetect.BrowserEnum.Firefox)
		{
			retDiv.style.position = "relative";
		}
	}
	if (nsc.Browser.DOM.CompatibleMode() == nsc.Browser.DOM.CompatibleMode.BACK_COMPAT)
	{
		
	}
	

	
	return retDiv;
}