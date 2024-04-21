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

import mime from 'mime'
import { XLINK_NAMESPACE } from './namespaces'

export const chooseContentType = (
  graphicNode?: Element
): string | undefined => {
  if (graphicNode) {
    const mimetype = graphicNode.getAttribute('mimetype')
    const subtype = graphicNode.getAttribute('mime-subtype')

    if (mimetype && subtype) {
      return [mimetype, subtype].join('/')
    }

    const href = graphicNode.getAttributeNS(XLINK_NAMESPACE, 'href')

    if (href) {
      return mime.getType(href) || undefined
    }
  }
}

export const chooseSectionCategory = (
  section: HTMLElement
): string | undefined => {
  const secType = section.getAttribute('sec-type')

  switch (secType) {
    case 'abstract':
      return 'abstract'

    case 'acknowledgments':
      return 'acknowledgement'

    case 'availability':
    case 'data-availability':
      return 'availability'

    case 'bibliography':
      return 'bibliography'

    case 'conclusions':
      return 'conclusions'

    case 'discussion':
      return 'discussion'

    case 'intro':
      return 'introduction'

    case 'keywords':
      return 'keywords'

    case 'materials':
    case 'methods':
      return 'materials-method'

    case 'results':
      return 'results'

    case 'toc':
      return 'toc'

    default: {
      const titleNode = section.firstElementChild

      if (
        titleNode &&
        titleNode.nodeName === 'title' &&
        titleNode.textContent
      ) {
        return chooseSectionCategoryFromTitle(
          titleNode.textContent.trim().toLowerCase()
        )
      }

      return undefined
    }
  }
}

const chooseSectionCategoryFromTitle = (
  title: string | null
): string | undefined => {
  if (!title) {
    return undefined
  }

  switch (title) {
    case 'abstract':
      return 'abstract'

    case 'acknowledgments':
    case 'acknowledgements':
      return 'acknowledgement'

    case 'availability':
    case 'data availability':
      return 'availability'

    case 'conclusions':
      return 'conclusions'

    case 'discussion':
      return 'discussion'

    case 'introduction':
      return 'introduction'

    case 'methods':
    case 'materials':
    case 'materials and methods':
    case 'materials & methods':
      return 'materials-method'

    case 'results':
      return 'results'

    case 'bibliography':
    case 'references':
      return 'bibliography'
  }
}
