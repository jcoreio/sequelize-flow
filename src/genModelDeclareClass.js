import * as t from 'babel-types'
import genAttributeObjectTypeProperty from "./genAttributeObjectTypeProperty"
import genAttributeTypeAnnotation from "./genAttributeTypeAnnotation"
import {stringLiteralTypeAnnotation} from "./typeHelpers"
import {getModelName, getFieldInterfaceName} from "./naming"

export function genAttributeGetter(attribute) {
  return t.objectTypeProperty(
    t.identifier('get'),
    t.functionTypeAnnotation(
      null,
      [
        t.functionTypeParam(
          t.identifier('attribute'),
          stringLiteralTypeAnnotation(attribute.fieldName)
        )
      ],
      null,
      genAttributeTypeAnnotation(attribute)
    )
  )
}

export function genAttributeSetter(attribute) {
  return t.objectTypeProperty(
    t.identifier('set'),
    t.functionTypeAnnotation(
      null,
      [
        t.functionTypeParam(
          t.identifier('attribute'),
          stringLiteralTypeAnnotation(attribute.fieldName)
        ),
        t.functionTypeParam(
          t.identifier('value'),
          genAttributeTypeAnnotation(attribute)
        )
      ],
      null,
      t.voidTypeAnnotation()
    )
  )
}

export default function genModelDeclareClass(model) {
  const fields = []
  const getters = []
  const setters = []

  getters.push(t.objectTypeProperty(
    t.identifier('get'),
    t.functionTypeAnnotation(
      null,
      [],
      null,
      t.genericTypeAnnotation(
        t.identifier(getFieldInterfaceName(model)),
        null
      )
    )
  ))

  setters.push(t.objectTypeProperty(
    t.identifier('set'),
    t.functionTypeAnnotation(
      null,
      [
        t.functionTypeParam(
          t.identifier('attributes'),
          t.genericTypeAnnotation(
            t.identifier('$Shape'),
            t.typeParameterInstantiation([
              t.genericTypeAnnotation(
                t.identifier(getFieldInterfaceName(model)),
                null
              )
            ])
          )
        )
      ],
      null,
      t.voidTypeAnnotation()
    )
  ))


  const {attributes} = model

  for (let key in attributes) {
    const attribute = attributes[key]
    fields.push(genAttributeObjectTypeProperty(attribute))
    getters.push(genAttributeGetter(attribute))
    setters.push(genAttributeSetter(attribute))
  }

  return t.declareClass(
    t.identifier(getModelName(model)),
    null,
    [],
    t.objectTypeAnnotation(
      [
        ...fields,
        ...getters,
        ...setters,
      ],
      [],
      []
    )
  )
}

