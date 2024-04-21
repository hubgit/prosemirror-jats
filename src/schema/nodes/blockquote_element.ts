/*!
 * © 2019 Atypon Systems LLC
 * Modified from 2024 by Alf Eaton
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NodeSpec } from 'prosemirror-model'

import { ManuscriptNode } from '../types'

interface Attrs {
  id: string
}

export interface BlockquoteElementNode extends ManuscriptNode {
  attrs: Attrs
}

export const blockquoteElement: NodeSpec = {
  content: 'paragraph+ attribution',
  attrs: {
    id: { default: '' },
  },
  group: 'block element',
  selectable: false,
  parseDOM: [
    {
      tag: 'blockquote',
      getAttrs: (blockquote) => {
        const dom = blockquote as HTMLQuoteElement

        const attrs: Partial<Attrs> = {
          id: dom.getAttribute('id') || undefined,
        }

        return attrs
      },
    },
  ],
  toDOM: (node) => {
    const blockquoteElementNode = node as BlockquoteElementNode

    const attrs: { [key: string]: string } = {}

    if (blockquoteElementNode.attrs.id) {
      attrs.id = blockquoteElementNode.attrs.id
    }

    return ['blockquote', attrs, 0]
  },
}

export const isBlockquoteElement = (
  node: ManuscriptNode
): node is BlockquoteElementNode =>
  node.type === node.type.schema.nodes.blockquote_element
