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

// adapted from 'prosemirror-tables'

import { NodeSpec } from 'prosemirror-model'

import { ManuscriptNode } from '../types'

// NOTE: keep this method as close to the original as possible, for ease of updating
const getCellAttrs = (p: Node | string) => {
  const dom = p as HTMLTableCellElement

  const widthAttr = dom.getAttribute('data-colwidth')
  const widths =
    widthAttr && /^\d+(,\d+)*$/.test(widthAttr)
      ? widthAttr.split(',').map((s) => Number(s))
      : null
  const colspan = Number(dom.getAttribute('colspan') || 1)

  return {
    colspan,
    rowspan: Number(dom.getAttribute('rowspan') || 1),
    colwidth: widths && widths.length === colspan ? widths : null,
    background: dom.style.backgroundColor || null,
  }
}

interface TableNodeSpec extends NodeSpec {
  tableRole: string
}

export interface TableNode extends ManuscriptNode {
  attrs: {
    id: string
  }
}

export const table: TableNodeSpec = {
  content: 'table_row{3,}',
  tableRole: 'table',
  isolating: true,
  group: 'block',
  selectable: false,
  attrs: {
    id: { default: '' },
  },
  parseDOM: [
    {
      tag: 'table',
      getAttrs: (p) => {
        const dom = p as HTMLTableElement

        return {
          id: dom.getAttribute('id'),
        }
      },
    },
  ],
  toDOM: (node) => {
    const tableNode = node as TableNode

    return [
      'table',
      {
        id: tableNode.attrs.id,
      },
      ['tbody', 0],
    ]
  },
}

export interface TableRowNode extends ManuscriptNode {
  attrs: {}
}

export const tableRow: TableNodeSpec = {
  content: 'table_cell+',
  tableRole: 'row',
  attrs: {},
  parseDOM: [
    {
      tag: 'tr',
      priority: 80,
    },
  ],
  toDOM: () => {
    return ['tr', 0]
  },
}

export interface TableCellNode extends ManuscriptNode {
  attrs: {
    colspan: number | null
    rowspan: number | null
    colwidth: number[] | null
    background: string | null
  }
}

export const tableCell: TableNodeSpec = {
  content: 'inline*',
  attrs: {
    colspan: { default: 1 },
    rowspan: { default: 1 },
    colwidth: { default: null },
    background: { default: null },
  },
  tableRole: 'cell',
  isolating: true,
  parseDOM: [
    { tag: 'td', getAttrs: getCellAttrs },
    { tag: 'th', getAttrs: getCellAttrs },
  ],
  toDOM: (node) => {
    const tableCellNode = node as TableCellNode

    const attrs: { [attr: string]: string } = {}

    if (tableCellNode.attrs.colspan && tableCellNode.attrs.colspan !== 1) {
      attrs.colspan = String(tableCellNode.attrs.colspan)
    }

    if (tableCellNode.attrs.rowspan && tableCellNode.attrs.rowspan !== 1) {
      attrs.rowspan = String(tableCellNode.attrs.rowspan)
    }

    if (tableCellNode.attrs.background) {
      attrs.style = `backgroundColor: ${tableCellNode.attrs.background}`
    }

    if (tableCellNode.attrs.colwidth) {
      attrs['data-colwidth'] = tableCellNode.attrs.colwidth.join(',')
    }

    if (!tableCellNode.textContent) {
      attrs.class = 'placeholder'
    }

    return ['td', attrs, 0]
  },
}
