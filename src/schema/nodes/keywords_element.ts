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

export interface KeywordsElementNode extends ManuscriptNode {
  attrs: Attrs
}

const createBodyElement = (node: ManuscriptNode) => {
  const dom = document.createElement('div')
  dom.className = 'manuscript-keywords'
  dom.id = node.attrs.id

  return dom
}

export const keywordsElement: NodeSpec = {
  atom: true,
  attrs: {
    id: { default: '' },
    contents: { default: '' },
  },
  group: 'block element',
  selectable: false,
  parseDOM: [
    {
      tag: 'div.manuscript-keywords',
      getAttrs: (div) => {
        const dom = div as HTMLDivElement

        return {
          contents: dom.innerHTML,
        }
      },
    },
  ],
  toDOM: (node) => {
    const keywordsElementNode = node as KeywordsElementNode

    return (
      nodeFromHTML(keywordsElementNode.attrs.contents) ||
      createBodyElement(keywordsElementNode)
    )
  },
}
