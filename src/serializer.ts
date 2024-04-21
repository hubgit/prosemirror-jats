import { DOMSerializer, Fragment } from 'prosemirror-model'
import { schema } from './schema'

const serializer = DOMSerializer.fromSchema(schema)

export const serializeToHTML = (fragment: Fragment) => {
  const target = document.createElement('main')
  const doc = serializer.serializeFragment(
    fragment,
    { document },
    target
  ) as typeof target
  return doc.innerHTML
}
