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
  suppressCaption: boolean
}

export interface ListingElementNode extends ManuscriptNode {
  attrs: Attrs
}

export const listingElement: NodeSpec = {
  content: '(listing | placeholder) figcaption',
  attrs: {
    id: { default: '' },
    suppressCaption: { default: true },
  },
  group: 'block element',
  selectable: false,
  parseDOM: [
    {
      tag: 'figure.listing',
      getAttrs: (p) => {
        const dom = p as HTMLElement

        return {
          id: dom.getAttribute('id'),
        }
      },
    },
  ],
  toDOM: (node) => {
    const listingElementNode = node as ListingElementNode

    return [
      'figure',
      {
        class: 'listing', // TODO: suppress-caption?
        id: listingElementNode.attrs.id,
      },
      0,
    ]
  },
}
