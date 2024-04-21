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
  columns: number
  figureLayout: string
  figureStyle: string
  id: string
  label: string
  rows: number
  alignment?: string
  sizeFraction: number
  suppressCaption: boolean
}

export interface FigureElementNode extends ManuscriptNode {
  attrs: Attrs
}

export const figureElement: NodeSpec = {
  content: '(figure | placeholder)+ figcaption (listing | placeholder)',
  attrs: {
    figureLayout: { default: '' },
    figureStyle: { default: '' },
    id: { default: '' },
    label: { default: '' },
    sizeFraction: { default: 0 },
    alignment: { default: undefined },
    suppressCaption: { default: false },
  },
  selectable: false,
  group: 'block element executable',
  parseDOM: [
    {
      tag: 'figure.figure-group',
      getAttrs: (p) => {
        const dom = p as HTMLElement

        return {
          id: dom.getAttribute('id'),
          figureStyle: dom.getAttribute('data-figure-style'),
          figureLayout: dom.getAttribute('data-figure-layout'),
          sizeFraction: Number(dom.getAttribute('data-size-fraction')) || 0,
          alignment: dom.getAttribute('data-alignment') || undefined,
        }
      },
    },
  ],
  toDOM: (node) => {
    const figureElementNode = node as FigureElementNode

    const { id, figureStyle, figureLayout, alignment, sizeFraction } =
      figureElementNode.attrs

    const attrs: { [key: string]: string } = {}

    const classes: string[] = ['figure-group']

    if (sizeFraction === 2) {
      classes.push('figure-group--static')
    }

    attrs.class = classes.join(' ')

    attrs.id = id

    if (figureStyle) {
      attrs['data-figure-style'] = figureStyle
    }

    if (figureLayout) {
      attrs['data-figure-layout'] = figureLayout
    }

    if (sizeFraction) {
      attrs['data-size-fraction'] = String(sizeFraction)
    }

    if (alignment) {
      attrs['data-alignment'] = alignment
    }

    return ['figure', attrs, 0]
  },
}

export const isFigureElementNode = (
  node: ManuscriptNode
): node is FigureElementNode =>
  node.type === node.type.schema.nodes.figure_element
