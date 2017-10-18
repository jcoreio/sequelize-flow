import * as t from 'babel-types'
import {numericLiteralTypeAnnotation, stringLiteralTypeAnnotation} from "./typeHelpers"
import {getEnumTypeName} from "./naming"

export default function genEnumAttributeTypeAlias(attribute) {
  const result = t.exportNamedDeclaration(
    t.typeAlias(
      t.identifier(getEnumTypeName(attribute)),
      null,
      t.unionTypeAnnotation(
        attribute.type.values.map(value => {
          if (typeof value === 'string') return stringLiteralTypeAnnotation(value)
          else if (typeof value === 'number') return numericLiteralTypeAnnotation(value)
          throw new Error('unsupported enum value: ' + value)
        })
      )
    ),
    []
  )
  result.exportKind = 'type'
  return result
}
