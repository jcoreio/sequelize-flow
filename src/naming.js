import upperFirst from "lodash.upperfirst"
import camelCase from "lodash.camelcase"

export function getModelName(model) {
  return upperFirst(camelCase(model.name))
}
export function getFieldInterfaceName(model) {
  return `${getModelName(model)}Fields`
}
export function getInitInterfaceName(model) {
  return `${getModelName(model)}Init`
}
export function getEnumTypeName(attribute) {
  return `${getModelName(attribute.Model)}$${upperFirst(camelCase(attribute.fieldName))}`
}

