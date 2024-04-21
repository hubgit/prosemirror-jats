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

import { Node, NodeType, Schema } from 'prosemirror-model'

export type Marks =
  | 'bold'
  | 'code'
  | 'italic'
  | 'smallcaps'
  | 'strikethrough'
  | 'styled'
  | 'subscript'
  | 'superscript'
  | 'underline'

export type Nodes =
  | 'attribution'
  | 'bibliography_element'
  | 'bibliography_section'
  | 'blockquote_element'
  | 'bullet_list'
  | 'caption'
  | 'citation'
  | 'cross_reference'
  | 'doc'
  | 'equation'
  | 'equation_element'
  | 'figcaption'
  | 'figure'
  | 'figure_element'
  | 'footnote'
  | 'footnotes_element'
  | 'hard_break'
  | 'inline_equation'
  | 'inline_footnote'
  | 'keywords_element'
  | 'keywords_section'
  | 'link'
  | 'list_item'
  | 'listing'
  | 'listing_element'
  | 'manuscript'
  | 'ordered_list'
  | 'paragraph'
  | 'placeholder'
  | 'placeholder_element'
  | 'pullquote_element'
  | 'section'
  | 'section_title'
  | 'table'
  | 'table_cell'
  | 'table_element'
  | 'table_row'
  | 'text'
  | 'toc_element'
  | 'toc_section'

export type ManuscriptSchema = Schema<Nodes, Marks>

export type ManuscriptNode = Node
export type ManuscriptNodeType = NodeType
