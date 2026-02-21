export interface SourceCodeProps {
  /**
   * The code or Shiki html to render
   */
  code: string

  /**
   * The language of the code
   */
  lang: string

  /**
   * The class name of the code block
   */
  className?: string
}
