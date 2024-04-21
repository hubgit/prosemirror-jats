/*!
 * © 2020 Atypon Systems LLC
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

import { Nodes } from '../schema/types'
import { Fragment, ParseRule } from 'prosemirror-model'
import { convertMathMLToSVG, convertTeXToSVG } from '../mathjax'
import { xmlSerializer } from '../lib/serializer'
import { parser } from '../index'
import { XLINK_NAMESPACE } from '../lib/namespaces'
import { chooseContentType, chooseSectionCategory } from '../lib/choose'

export type NodeRule = ParseRule & { node?: Nodes | null }

export const nodes: NodeRule[] = [
  {
    tag: 'attrib',
    node: 'attribution',
  },
  {
    tag: 'back',
    ignore: true,
  },
  {
    tag: 'body',
    node: 'manuscript',
  },
  {
    tag: 'break',
    node: 'hard_break',
  },
  {
    tag: 'caption',
    node: 'figcaption',
    context: 'figure/',
  },
  {
    tag: 'caption',
    node: 'figcaption',
    context: 'figure_element/',
  },
  {
    tag: 'caption',
    node: 'figcaption',
    context: 'table_element/',
  },
  {
    tag: 'code',
    node: 'listing',
    context: 'listing_element/',
    // preserveWhitespace: 'full',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
        language: element.getAttribute('language') ?? '',
        contents: element.textContent?.trim() ?? '',
      }
    },
  },
  {
    tag: 'disp-formula',
    node: 'equation_element',
    getAttrs: (node) => {
      const element = node as HTMLElement

      const caption = element.querySelector('figcaption')

      return {
        id: element.getAttribute('id'),
        suppressCaption: !caption,
      }
    },
    getContent: (node, schema) => {
      const element = node as HTMLElement

      const attrs: {
        MathMLStringRepresentation: string
        SVGStringRepresentation: string
        TeXRepresentation: string
      } = {
        // id: generateID(ObjectTypes.Equation)
        MathMLStringRepresentation: '',
        SVGStringRepresentation: '',
        TeXRepresentation: '',
      }

      const container = element.querySelector('alternatives') ?? element

      for (const child of container.childNodes) {
        // remove namespace prefix
        // TODO: real namespaces
        const nodeName = child.nodeName.replace(/^[a-z]:/, '')

        switch (nodeName) {
          case 'tex-math':
            attrs.TeXRepresentation = child.textContent?.trim() ?? ''
            if (attrs.TeXRepresentation) {
              attrs.SVGStringRepresentation =
                convertTeXToSVG(attrs.TeXRepresentation, true) ?? ''
            }
            break

          case 'mml:math':
            ;(child as Element).removeAttribute('id')
            // TODO: remove namespace?
            attrs.MathMLStringRepresentation =
              xmlSerializer.serializeToString(child)
            // TODO: convert MathML to TeX with mml2tex?
            if (attrs.MathMLStringRepresentation) {
              attrs.SVGStringRepresentation =
                convertMathMLToSVG(attrs.MathMLStringRepresentation, true) ?? ''
            }
            // TODO: add format property (TeX or MathML)
            // TODO: make MathMLRepresentation editable
            break
        }
      }

      const caption = element.querySelector('figcaption')

      const figcaption = schema.nodes.figcaption.create()

      return Fragment.from([
        schema.nodes.equation.createChecked(attrs),
        caption
          ? parser.parse(caption, {
              topNode: figcaption,
            })
          : figcaption,
      ]) as Fragment
    },
  },
  {
    tag: 'disp-quote[content-type=quote]',
    node: 'blockquote_element',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
      }
    },
  },
  {
    tag: 'disp-quote[content-type=pullquote]',
    node: 'pullquote_element',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
      }
    },
  },
  {
    tag: 'ext-link',
    node: 'link',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        href: element.getAttributeNS(XLINK_NAMESPACE, 'href') || '',
        title: element.getAttributeNS(XLINK_NAMESPACE, 'title') || '',
      }
    },
  },
  {
    tag: 'fig[fig-type=equation]',
    node: 'equation_element',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
      }
    },
  },
  {
    tag: 'fig[fig-type=listing]',
    node: 'listing_element',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
      }
    },
  },
  {
    tag: 'fig',
    node: 'figure',
    context: 'figure_element/',
    getAttrs: (node) => {
      const element = node as HTMLElement

      const labelNode = element.querySelector('label')
      const graphicNode = element.querySelector('graphic')
      const mediaNode = element.querySelector('media')

      return {
        id: element.getAttribute('id'),
        label: labelNode?.textContent?.trim() ?? '',
        contentType: chooseContentType(graphicNode || undefined) || '',
        originalURL: graphicNode
          ? graphicNode.getAttributeNS(XLINK_NAMESPACE, 'href')
          : '',
        embedURL: mediaNode
          ? mediaNode.getAttributeNS(XLINK_NAMESPACE, 'href')
          : undefined,
      }
    },
  },
  {
    tag: 'fig-group',
    node: 'figure_element',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
      }
    },
  },
  {
    tag: 'fn',
    node: 'footnote',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
        contents: element.textContent,
      }
    },
  },
  {
    tag: 'front',
    ignore: true,
  },
  {
    tag: 'inline-formula',
    node: 'inline_equation',
    getAttrs: (node) => {
      const element = node as HTMLElement

      const attrs: {
        id: string | null
        MathMLRepresentation: string // NOTE: not MathMLStringRepresentation
        SVGRepresentation: string // NOTE: not SVGStringRepresentation
        TeXRepresentation: string
      } = {
        id: element.getAttribute('id'),
        MathMLRepresentation: '', // default
        SVGRepresentation: '',
        TeXRepresentation: '', // default
      }

      const container = element.querySelector('alternatives') ?? element

      for (const child of container.childNodes) {
        // remove namespace prefix
        // TODO: real namespaces
        const nodeName = child.nodeName.replace(/^[a-z]:/, '')

        switch (nodeName) {
          case 'tex-math':
            attrs.TeXRepresentation = child.textContent?.trim() ?? ''
            if (attrs.TeXRepresentation) {
              attrs.SVGRepresentation =
                convertTeXToSVG(attrs.TeXRepresentation, true) ?? ''
            }
            break

          case 'mml:math':
            ;(child as Element).removeAttribute('id')
            // FIXME: remove namespace?
            attrs.MathMLRepresentation = xmlSerializer.serializeToString(child)
            // TODO: convert MathML to TeX with mml2tex?
            if (attrs.MathMLRepresentation) {
              attrs.SVGRepresentation =
                convertMathMLToSVG(attrs.MathMLRepresentation, true) ?? ''
            }
            // TODO: add format property (TeX or MathML)
            // TODO: make MathMLRepresentation editable
            break
        }
      }

      return attrs
    },
  },
  {
    tag: 'list[list-type=bullet]',
    node: 'bullet_list',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
      }
    },
  },
  {
    tag: 'list[list-type=order]',
    node: 'ordered_list',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
      }
    },
  },
  {
    tag: 'list-item',
    node: 'list_item',
  },
  // {
  //   tag: 'math',
  //   namespace: 'http://www.w3.org/1998/Math/MathML',
  //   node: 'equation',
  // },
  {
    tag: 'p',
    node: 'paragraph',
    context: 'section/',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
      }
    },
  },
  {
    tag: 'p',
    node: 'paragraph',
  },
  {
    tag: 'sec',
    node: 'section', // TODO: id
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
        category: chooseSectionCategory(element),
      }
    },
  },
  {
    tag: 'label',
    context: 'section/',
    ignore: true, // TODO
  },
  {
    tag: 'label',
    context: 'figure/',
    ignore: true, // TODO
  },
  {
    tag: 'table',
    node: 'table',
    // TODO: count thead and tfoot rows
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
      }
    },
  },
  {
    tag: 'table-wrap',
    node: 'table_element',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        id: element.getAttribute('id'),
        suppressFooter: !element.querySelector('table > tfoot > tr'),
        suppressHeader: !element.querySelector('table > thead > tr'),
      }
    },
  },
  {
    tag: 'tbody',
    skip: true,
  },
  {
    tag: 'tfoot',
    skip: true,
  },
  {
    tag: 'thead',
    skip: true,
  },
  {
    tag: 'title',
    node: 'section_title',
    context: 'section/',
  },
  {
    tag: 'tr',
    node: 'table_row',
  },
  {
    tag: 'td',
    node: 'table_cell',
  },
  {
    tag: 'th',
    node: 'table_cell',
  },
  {
    tag: 'xref[ref-type="bibr"]',
    node: 'citation',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        rid: element.getAttribute('rid'),
        contents: element.textContent, // TODO: innerHTML?
      }
    },
  },
  {
    tag: 'xref',
    node: 'cross_reference',
    getAttrs: (node) => {
      const element = node as HTMLElement

      return {
        rid: element.getAttribute('rid'),
        label: element.textContent,
      }
    },
  },
]
