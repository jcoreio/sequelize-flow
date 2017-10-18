import * as t from 'babel-types'

export function stringLiteralTypeAnnotation(value) {
  const result = t.stringLiteralTypeAnnotation()
  result.value = result.rawValue = value
  result.raw = JSON.stringify(value)
  return result
}

export function numericLiteralTypeAnnotation(value) {
  const result = t.numericLiteralTypeAnnotation()
  result.value = result.rawValue = value
  result.raw = JSON.stringify(String(value))
  return result
}

export function commentLine(value) {
  return {
    type: 'CommentLine',
    value,
  }
}

export function exportNamedTypeDeclaration(...args) {
  const result = t.exportNamedDeclaration(...args)
  result.exportKind = 'type'
  return result
}

