export function xmlStringToJson(xml: string) {
  // Convert the XML string to an XML Document.
  const oParser = new DOMParser();
  const oDOM = oParser.parseFromString(xml, 'application/xml');
  
  // Convert the XML Document to a JSON Object.
  HTMLElement
  return xmlToJson(oDOM);
}

function xmlToJson(xml: Node) {
  // Create the return object
  var obj = {} as any;

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if ((xml as Element).attributes.length > 0) {
      obj['@attributes'] = {} as Record<string, string>;
      for (var j = 0; j < (xml as Element).attributes.length; j++) {
        var attribute = (xml as Element).attributes.item(j);
        obj['@attributes'][(attribute as Attr).nodeName] = (attribute as Attr).nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == 'undefined') {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}
