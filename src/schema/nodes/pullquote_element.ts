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

export interface PullquoteElementNode extends ManuscriptNode {
  attrs: Attrs
}

export const pullquoteElement: NodeSpec = {
  content: 'paragraph+ attribution',
  attrs: {
    id: { default: '' },
  },
  group: 'block element',
  selectable: false,
  parseDOM: [
    {
      tag: 'aside.pullquote',
      getAttrs: (aside) => {
        const dom = aside as HTMLElement

        const attrs: Partial<Attrs> = {
          id: dom.getAttribute('id') || undefined,
        }

        return attrs
      },
    },
  ],
  toDOM: (node) => {
    const pullquoteElementNode = node as PullquoteElementNode

    const attrs: { [key: string]: string } = {}

    if (pullquoteElementNode.attrs.id) {
      attrs.id = pullquoteElementNode.attrs.id
    }

    attrs.class = 'pullquote'

    return ['aside', attrs, 0]
  },
}

export const isPullquoteElement = (
  node: ManuscriptNode
): node is PullquoteElementNode =>
  node.type === node.type.schema.nodes.pullquote_element
