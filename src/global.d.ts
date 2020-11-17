import PushCNZZ from '@m/pushCNZZ'

declare global {
  interface Window {
    _czc: any
  }

  interface Options {
    router: any
    siteIdList: number[]
    isDebug: boolean
  }
  
  interface Vue {
    prototype: any
    $pushCNZZ: PushCNZZ
  }
  
  interface To {
    fullPath: string
  }
}