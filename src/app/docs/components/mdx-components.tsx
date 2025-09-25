import defaultMdxComponents from 'fumadocs-ui/mdx'

export function getMDXComponents(components?: any): any {
  return {
    ...defaultMdxComponents,
    ...components
  }
}
