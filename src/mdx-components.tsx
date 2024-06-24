import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
 
// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h2: ({ children }) => <h2 style={{ fontSize: 30, fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>{children}</h2>,
    p: ({ children }) => <p style={{ marginTop: 10, marginBottom: 10 }}>{children}</p>,
    ul: ({ children }) => <ul style={{ listStyleType: "circle", marginLeft: 40}}>{children}</ul>,
    code: ({ children }) => <code style={{ backgroundColor: "#F5F5F5", borderRadius: 10, opacity: 0.8, padding: 5}}>{children}</code>,
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  }
}