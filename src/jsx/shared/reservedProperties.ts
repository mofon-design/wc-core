export const enum ReservedProperty {
  CHILDREN = 'children',
  REF = 'ref',
  STYLE = 'style',
}

export const ReservedPropertiesMap: Record<ReservedProperty, ReservedProperty> = {
  [ReservedProperty.CHILDREN]: ReservedProperty.CHILDREN,
  [ReservedProperty.REF]: ReservedProperty.REF,
  [ReservedProperty.STYLE]: ReservedProperty.STYLE,
};
