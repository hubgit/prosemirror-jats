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

import { nodeFromHTML } from '../../lib/html'
import { ManuscriptNode } from '../types'

interface Attrs {
  id: string
  contents: string
}

export interface FootnotesElementNode extends ManuscriptNode {
  attrs: Attrs
}

const createBodyElement = (node: FootnotesElementNode) => {
  const dom = document.createElement('div')
  dom.className = 'manuscript-footnotes'
  dom.id = node.attrs.id

  return dom
}

export const footnotesElement: NodeSpec = {
  atom: true,
  attrs: {
    id: { default: '' },
    // collateByKind: { default: 'footnote' },
    contents: { default: '' },
  },
  group: 'block element',
  selectable: false,
  parseDOM: [
    {
      tag: 'div.footnotes',
      getAttrs: (p) => {
        const dom = p as HTMLDivElement

        return {
          // collateByKind: dom.getAttribute('collateByKind'),
          contents: dom.innerHTML,
        }
      },
    },
  ],
  toDOM: (node) => {
    const footnotesElementNode = node as FootnotesElementNode

    return (
      nodeFromHTML(footnotesElementNode.attrs.contents) ||
      createBodyElement(footnotesElementNode)
    )
  },
}
