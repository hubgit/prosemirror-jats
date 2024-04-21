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

import { Schema } from 'prosemirror-model'

import {
  bold,
  code,
  italic,
  smallcaps,
  strikethrough,
  styled,
  subscript,
  superscript,
  underline,
} from './marks'
import { attribution } from './nodes/attribution'
import { bibliographyElement } from './nodes/bibliography_element'
import { bibliographySection } from './nodes/bibliography_section'
import { blockquoteElement } from './nodes/blockquote_element'
import { caption } from './nodes/caption'
import { citation } from './nodes/citation'
import { crossReference } from './nodes/cross_reference'
import { doc } from './nodes/doc'
import { equation } from './nodes/equation'
import { equationElement } from './nodes/equation_element'
import { figcaption } from './nodes/figcaption'
import { figure } from './nodes/figure'
import { figureElement } from './nodes/figure_element'
import { footnote } from './nodes/footnote'
import { footnotesElement } from './nodes/footnotes_element'
import { hardBreak } from './nodes/hard_break'
import { inlineEquation } from './nodes/inline_equation'
import { inlineFootnote } from './nodes/inline_footnote'
import { keywordsElement } from './nodes/keywords_element'
import { keywordsSection } from './nodes/keywords_section'
import { link } from './nodes/link'
import { bulletList, listItem, orderedList } from './nodes/list'
import { listing } from './nodes/listing'
import { listingElement } from './nodes/listing_element'
import { manuscript } from './nodes/manuscript'
import { paragraph } from './nodes/paragraph'
import { placeholder } from './nodes/placeholder'
import { placeholderElement } from './nodes/placeholder_element'
import { pullquoteElement } from './nodes/pullquote_element'
import { section } from './nodes/section'
import { sectionTitle } from './nodes/section_title'
import { table, tableCell, tableRow } from './nodes/table'
import { tableElement } from './nodes/table_element'
import { text } from './nodes/text'
import { tocElement } from './nodes/toc_element'
import { tocSection } from './nodes/toc_section'
import { Marks, Nodes } from './types'

export * from './nodes/attribution'
export * from './nodes/bibliography_element'
export * from './nodes/bibliography_section'
export * from './nodes/blockquote_element'
export * from './nodes/caption'
export * from './nodes/citation'
export * from './nodes/cross_reference'
export * from './nodes/doc'
export * from './nodes/equation'
export * from './nodes/equation_element'
export * from './nodes/figcaption'
export * from './nodes/figure'
export * from './nodes/figure_element'
export * from './nodes/footnote'
export * from './nodes/footnotes_element'
export * from './nodes/hard_break'
export * from './nodes/inline_equation'
export * from './nodes/inline_footnote'
export * from './nodes/keywords_element'
export * from './nodes/keywords_section'
export * from './nodes/link'
export * from './nodes/list'
export * from './nodes/listing'
export * from './nodes/listing_element'
export * from './nodes/manuscript'
export * from './nodes/paragraph'
export * from './nodes/placeholder'
export * from './nodes/placeholder_element'
export * from './nodes/pullquote_element'
export * from './nodes/section'
export * from './nodes/section_title'
export * from './nodes/table'
export * from './nodes/table_element'
export * from './nodes/text'
export * from './nodes/toc_element'
export * from './nodes/toc_section'

export const schema = new Schema<Nodes, Marks>({
  marks: {
    bold,
    code,
    italic,
    smallcaps,
    strikethrough,
    styled,
    subscript,
    superscript,
    underline,
  },
  nodes: {
    attribution,
    bibliography_element: bibliographyElement,
    bibliography_section: bibliographySection,
    blockquote_element: blockquoteElement,
    bullet_list: bulletList,
    caption,
    citation,
    cross_reference: crossReference,
    doc,
    equation,
    equation_element: equationElement,
    figcaption,
    figure,
    figure_element: figureElement,
    footnote,
    footnotes_element: footnotesElement,
    hard_break: hardBreak,
    inline_equation: inlineEquation,
    inline_footnote: inlineFootnote,
    keywords_element: keywordsElement,
    keywords_section: keywordsSection,
    link,
    list_item: listItem,
    listing,
    listing_element: listingElement,
    manuscript,
    ordered_list: orderedList,
    paragraph,
    placeholder,
    placeholder_element: placeholderElement,
    pullquote_element: pullquoteElement,
    section,
    section_title: sectionTitle,
    table,
    table_cell: tableCell,
    table_element: tableElement,
    table_row: tableRow,
    text,
    toc_element: tocElement,
    toc_section: tocSection,
  },
})
