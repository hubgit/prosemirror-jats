const parser = new DOMParser()

export const parseXML = (xml: string) =>
  parser.parseFromString(xml, 'application/xml')
