import * as t from 'babel-types'
import genAttributeObjectTypeProperty from "./genAttributeObjectTypeProperty"

export default function genFieldsObjectTypeAnnotation(model, options = {}) {
  const properties = []

  for (let key in model.attributes) {
    const attribute = model.attributes[key]
    properties.push(genAttributeObjectTypeProperty(attribute, options))
  }

  return t.objectTypeAnnotation(
    properties,
    [],
    []
  )
}

