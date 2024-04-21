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

export interface BulletListNode extends ManuscriptNode {
  attrs: {
    id: string
  }
}

export const bulletList: NodeSpec = {
  content: 'list_item+',
  group: 'block list element',
  attrs: {
    id: { default: '' },
  },
  parseDOM: [
    {
      tag: 'ul',
      getAttrs: (p) => {
        const dom = p as HTMLUListElement

        return {
          id: dom.getAttribute('id'),
        }
      },
    },
  ],
  toDOM: (node) => {
    const bulletListNode = node as BulletListNode

    return bulletListNode.attrs.id
      ? [
          'ul',
          {
            id: bulletListNode.attrs.id,
          },
          0,
        ]
      : ['ul', 0]
  },
}

export interface OrderedListNode extends ManuscriptNode {
  attrs: {
    id: string
    paragraphStyle: string
  }
}

export const orderedList: NodeSpec = {
  content: 'list_item+',
  group: 'block list element',
  attrs: {
    id: { default: '' },
    // order: { default: 1 },
    paragraphStyle: { default: '' },
  },
  parseDOM: [
    {
      tag: 'ol',
      getAttrs: (p) => {
        const dom = p as HTMLOListElement

        return {
          id: dom.getAttribute('id'),
          // order: dom.hasAttribute('start') ? dom.getAttribute('start') : 1,
        }
      },
    },
  ],
  toDOM: (node) => {
    const orderedListNode = node as OrderedListNode

    return orderedListNode.attrs.id
      ? [
          'ol',
          {
            id: orderedListNode.attrs.id,
            // start: node.attrs.order === 1 ? undefined : node.attrs.order,
          },
          0,
        ]
      : ['ol', 0]
  },
}

export interface ListItemNode extends ManuscriptNode {
  attrs: {}
}

export const listItem: NodeSpec = {
  // NOTE: can't mix inline (text) and block content (list)
  // content: 'paragraph list+',
  content: 'paragraph? (paragraph | list)+',
  group: 'block',
  defining: true,
  parseDOM: [{ tag: 'li' }],
  toDOM: () => {
    return ['li', 0]
  },
}

export type ListNode = BulletListNode | OrderedListNode

export const isListNode = (node: ManuscriptNode): node is ListNode => {
  const { nodes } = node.type.schema

  return node.type === nodes.bullet_list || node.type === nodes.ordered_list
}
