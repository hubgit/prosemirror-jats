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
  MathMLRepresentation: string
  SVGRepresentation: string
  TeXRepresentation: string
}

export interface InlineEquationNode extends ManuscriptNode {
  attrs: Attrs
}

export const inlineEquation: NodeSpec = {
  // TODO: rid?
  attrs: {
    id: { default: '' },
    MathMLRepresentation: { default: '' },
    SVGRepresentation: { default: '' },
    TeXRepresentation: { default: '' },
  },
  atom: true,
  inline: true,
  draggable: true,
  group: 'inline',
  parseDOM: [
    {
      tag: `span.inline-equation`,
      getAttrs: (p) => {
        const dom = p as HTMLSpanElement

        return {
          id: dom.getAttribute('id'),
          // MathMLRepresentation:
          //   dom.getAttribute('data-mathml-representation') || '',
          SVGRepresentation: dom.innerHTML || '',
          TeXRepresentation: dom.getAttribute('data-tex-representation') || '',
        }
      },
    },
    // TODO: convert MathML from pasted math elements?
  ],
  toDOM: (node) => {
    const inlineEquationNode = node as InlineEquationNode

    const dom = document.createElement('span')
    dom.classList.add('inline-equation')
    dom.setAttribute('id', inlineEquationNode.attrs.id)
    dom.setAttribute(
      'data-tex-representation',
      inlineEquationNode.attrs.TeXRepresentation
    )
    // if (inlineEquationNode.attrs.MathMLRepresentation) {
    //   dom.setAttribute(
    //     'data-mathml-representation',
    //     inlineEquationNode.attrs.MathMLRepresentation
    //   )
    // }
    dom.innerHTML = inlineEquationNode.attrs.SVGRepresentation

    return dom
  },
}
