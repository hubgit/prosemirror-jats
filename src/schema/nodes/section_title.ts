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

export interface SectionTitleNode extends ManuscriptNode {
  attrs: Record<string, unknown>
}

export const sectionTitle: NodeSpec = {
  content: '(text)*',
  marks: 'italic superscript subscript smallcaps',
  group: 'block',
  selectable: false,
  parseDOM: [
    {
      tag: 'h1',
    },
    {
      tag: 'h2',
    },
    {
      tag: 'h3',
    },
    {
      tag: 'h4',
    },
    {
      tag: 'h5',
    },
    {
      tag: 'h6',
    },
  ],
  toDOM: () => ['h1', 0],
}
