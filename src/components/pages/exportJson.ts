export class DomFuncs {

    static parseNode = (node: Node) => {    
        const childNodes = node.childNodes;
        if (childNodes.length === 0) {
            return node.nodeValue;
        } else if (childNodes.length === 1 && childNodes[0].nodeType === Node.TEXT_NODE) {
            return childNodes[0].nodeValue;
        } else {
            const obj = {};
            childNodes.forEach(childNode => {
                const childName = childNode.nodeName;
                const childValue = obj[childName];
                if (childValue !== undefined) {
                    if (Array.isArray(childValue)) {
                        childValue.push(DomFuncs.parseNode(childNode));
                    } else {
                        obj[childName] = [childValue, DomFuncs.parseNode(childNode)];
                    }
                } else {
                    obj[childName] = DomFuncs.parseNode(childNode);
                }
            });
            return obj;
        }
    };

    static xml2obj = (str: string) => {
        const dom = (new DOMParser()).parseFromString(str, 'text/xml')
        const result = {[dom.nodeName]: DomFuncs.parseNode(dom)};
        return result;
    }
}