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
  MathMLStringRepresentation: string
  SVGStringRepresentation: string
  TeXRepresentation: string
}

export interface EquationNode extends ManuscriptNode {
  attrs: Attrs
}

export const equation: NodeSpec = {
  attrs: {
    id: { default: '' },
    MathMLStringRepresentation: { default: '' },
    SVGStringRepresentation: { default: '' },
    TeXRepresentation: { default: '' },
  },
  group: 'block',
  parseDOM: [
    {
      tag: `div.equation`,
      getAttrs: (p) => {
        const dom = p as HTMLDivElement

        return {
          // MathMLStringRepresentation: dom.getAttribute(
          //   'data-mathml-string-representation'
          // ),
          SVGStringRepresentation: dom.innerHTML,
          TeXRepresentation: dom.getAttribute('data-tex-representation'),
        }
      },
    },
    // TODO: convert MathML from pasted math elements?
  ],
  toDOM: (node) => {
    const equationNode = node as EquationNode

    const dom = document.createElement('div')
    dom.setAttribute('id', equationNode.attrs.id)
    dom.classList.add('equation')
    // if (equationNode.attrs.MathMLStringRepresentation) {
    //   dom.setAttribute(
    //     'data-mathml-string-representation',
    //     equationNode.attrs.MathMLStringRepresentation
    //   )
    // }
    dom.setAttribute(
      'data-tex-representation',
      equationNode.attrs.TeXRepresentation
    )
    dom.innerHTML = equationNode.attrs.SVGStringRepresentation

    return dom
  },
}
