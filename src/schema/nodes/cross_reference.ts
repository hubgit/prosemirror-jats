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
  rid: string
  label: string
}

export interface CrossReferenceNode extends ManuscriptNode {
  attrs: Attrs
}

export const crossReference: NodeSpec = {
  inline: true,
  group: 'inline',
  draggable: true,
  atom: true,
  attrs: {
    rid: { default: '' },
    label: { default: '' },
  },
  parseDOM: [
    {
      tag: 'span.cross-reference',
      getAttrs: (p) => {
        const dom = p as HTMLSpanElement

        return {
          rid: dom.getAttribute('data-reference-id'),
          label: dom.textContent,
        }
      },
    },
  ],
  toDOM: (node) => {
    const crossReferenceNode = node as CrossReferenceNode

    return [
      'span',
      {
        class: 'cross-reference',
        'data-reference-id': crossReferenceNode.attrs.rid,
      },
      [
        'span',
        {
          class: 'kind elementIndex',
        },
        ['b', crossReferenceNode.attrs.label],
      ],
    ]
  },
}
