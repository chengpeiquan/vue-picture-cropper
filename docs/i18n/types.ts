export type SupportedLocale = 'en' | 'zh'

export interface MessageStructure {
  home: {
    name: string
    description: string
    start: string
  }
  examples: {
    liveDemo: string
    sourceCode: string
    codeFragmentTitle: string
    choose: string
    reset: string
    cropArea: string
    previewArea: string
    viewSourceInfo: string
    size: string
    width: string
    height: string
    cropperInstance: string
    openModal: string
    cancel: string
    confirm: string
  }
}
