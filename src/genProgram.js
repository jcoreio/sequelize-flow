import * as t from 'babel-types'
import {commentLine, exportNamedTypeDeclaration} from "./typeHelpers"
import genFieldsObjectTypeAnnotation from "./genFieldsObjectTypeAnnotation"
import {getFieldInterfaceName, getInitInterfaceName} from "./naming"
import genModelDeclareClass from "./genModelDeclareClass"
import genEnumAttributeTypeAlias from "./genEnumAttributeTypeAlias"

export default function genJsFlowFile(model) {
  const flowComment = commentLine('@flow')

  const body = []
  for (let key in model.attributes) {
    const attribute = model.attributes[key]
    if (attribute.type.key === 'ENUM') body.push(genEnumAttributeTypeAlias(attribute))
  }
  body.push(
    exportNamedTypeDeclaration(
      t.interfaceDeclaration(
        t.identifier(getFieldInterfaceName(model)),
        null,
        [],
        genFieldsObjectTypeAnnotation(model),
      ),
      []
    ),
    exportNamedTypeDeclaration(
      t.interfaceDeclaration(
        t.identifier(getInitInterfaceName(model)),
        null,
        [],
        genFieldsObjectTypeAnnotation(model, {forInitializer: true}),
      ),
      []
    ),
    genModelDeclareClass(model)
  )

  body[0].leadingComments = [flowComment]

  return t.program(body)
}

