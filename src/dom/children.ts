export const Children = {
  toArray(node: MDWC.MDWCNode): (MDWC.MDWCElement | MDWC.MDWCText)[] {
    const children: MDWC.MDWCNode[] = [node];
    const flattened: (MDWC.MDWCElement | MDWC.MDWCText)[] = [];

    for (
      let index = 0, child = children[0];
      index < children.length;
      child = children[(index += 1)]
    ) {
      if (child === null) continue;

      switch (typeof child) {
        case 'object':
          if (Array.isArray(child)) children.splice(index + 1, 0, ...child);
          else flattened.push(child);
          break;
        case 'boolean':
        case 'undefined':
          break;
        case 'string':
        case 'number':
          flattened.push(child);
          break;
        default:
          flattened.push(`${child}`);
          break;
      }
    }

    return flattened;
  },
};
