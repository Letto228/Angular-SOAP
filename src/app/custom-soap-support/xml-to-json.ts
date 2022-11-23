export function xmlStringToJson(xml: string) {
  // Convert the XML string to an XML Document.
  const oParser = new DOMParser();
  const oDOM = oParser.parseFromString(xml, 'application/xml');
  
  // Convert the XML Document to a JSON Object.
  return xmlToJson(oDOM);
}

function xmlToJson(xml: Node) {
    if (isTextNode(xml)) {
      return xml.nodeValue as string;
    }

    const nodeObject = getNodeObject(xml);

    const childNodesObject = xml.hasChildNodes()
      ? getChildNodesObject(xml)
      : {};
    
    return {
      ...nodeObject,
      ...childNodesObject,
    };
}

function getNodeObject(xml: Node): {'@attributes'?: Record<string, string>} {
  const hasAttributes = isElementNode(xml) && xml.attributes.length;

  if (hasAttributes) {
    const attributes = Array.from(xml.attributes)
      .filter(({nodeName, nodeValue}) => nodeName && nodeValue)
      .reduce(
        (attributes: Record<string, string>, {nodeName, nodeValue}: Attr) => ({
          ...attributes,
          [nodeName]: nodeValue as string,
        }),
        {}
      );

    return {
      '@attributes': attributes,
    }
  }

  return {};
}

function getChildNodesObject(xml: Node): Record<string, any> {
  return Array.from(xml.childNodes).reduce(
    (obj: Record<string, any>, item) => {
      const nodeName = item.nodeName;
      const objHasThisNode = nodeName in obj;

      if (!objHasThisNode) {
        return {
          ...obj,
          [nodeName]: xmlToJson(item),
        }
      }

      const hasSingleValue = !Array.isArray(obj[nodeName]);
      const existingNodeValue = hasSingleValue
        ? [obj[nodeName]]
        : obj[nodeName];

      return {
        ...obj,
        [nodeName]: [
          ...existingNodeValue,
          xmlToJson(item),
        ],
      }
    },
    {}
  )
}

function isElementNode(node: Node): node is Element {
  return node.nodeType === 1
}

function isTextNode(node: Node): node is Text {
  return node.nodeType === 3
}
