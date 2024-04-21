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

export interface KeywordsSectionNode extends ManuscriptNode {
  attrs: Attrs
}

export const keywordsSection: NodeSpec = {
  content: 'section_title (keywords_element | placeholder_element)',
  attrs: {
    id: { default: '' },
  },
  group: 'block sections',
  selectable: false,
  parseDOM: [
    {
      tag: 'section.keywords',
    },
  ],
  toDOM: (node) => {
    const keywordsSectionNode = node as KeywordsSectionNode

    return [
      'section',
      {
        id: keywordsSectionNode.attrs.id,
        class: 'keywords',
        spellcheck: 'false',
      },
      0,
    ]
  },
}

export const isKeywordsSectionNode = (
  node: ManuscriptNode
): node is KeywordsSectionNode =>
  node.type === node.type.schema.nodes.keywords_section
