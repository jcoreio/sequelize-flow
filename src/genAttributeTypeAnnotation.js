import * as t from 'babel-types'
import {getEnumTypeName} from "./naming"

export default function genAttributeTypeAnnotation(attribute) {
  let {key} = attribute.type
  if (key === 'VIRTUAL') key = attribute.type.returnType.key
  switch (key) {
  case 'STRING':
  case 'CHAR':
  case 'TEXT':
  case 'UUID':
  case 'UUIDV1':
  case 'UUIDV4':
    return t.stringTypeAnnotation()
  case 'INTEGER':
  case 'BIGINT':
  case 'FLOAT':
  case 'DOUBLE':
  case 'DECIMAL':
  case 'REAL':
    return t.numberTypeAnnotation()
  case 'BOOLEAN':
    return t.booleanTypeAnnotation()
  case 'BLOB':
    return t.genericTypeAnnotation(t.identifier('Buffer'))
  case 'DATE':
  case 'DATEONLY':
  case 'TIME':
  case 'NOW':
    return t.genericTypeAnnotation(t.identifier('Date'))
  case 'JSON':
    return t.anyTypeAnnotation()
  case 'GEOMETRY':
    switch (attribute.type.type) {
    case 'POINT':
      return t.genericTypeAnnotation(t.identifier('GeometryPoint'))
    }
    throw new Error(`unsupported attribute type: ${attribute} ${attribute.type.key}`)
  case 'ENUM':
    return t.genericTypeAnnotation(t.identifier(getEnumTypeName(attribute)))
  }
  throw new Error(`unsupported attribute type: ${attribute} ${attribute.type.key}`)
}

