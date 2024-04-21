import { parseJATS, serializeToHTML } from '../src'

const input = document.querySelector('#input') as HTMLInputElement
const output = document.querySelector('#output') as HTMLElement

input.addEventListener('change', (event) => {
  event.preventDefault()
  const input = event.target as HTMLInputElement
  const [file] = input.files!
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    const jats = reader.result as string
    const node = parseJATS(jats)
    output.innerHTML = serializeToHTML(node.content)
  })
  reader.readAsText(file, 'utf-8')
})
