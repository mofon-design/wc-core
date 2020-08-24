export const enum ReservedProperty {
  CHILDREN = 'children',
  KEY = 'key',
  REF = 'ref',
  STYLE = 'style',
}

export const ReservedPropertiesMap: Record<ReservedProperty, ReservedProperty> = {
  [ReservedProperty.CHILDREN]: ReservedProperty.CHILDREN,
  [ReservedProperty.KEY]: ReservedProperty.KEY,
  [ReservedProperty.REF]: ReservedProperty.REF,
  [ReservedProperty.STYLE]: ReservedProperty.STYLE,
};
