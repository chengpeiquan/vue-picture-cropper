declare class PushCNZZ {
    siteIdList: number[];
    isDebug: boolean;
    constructor(siteIdList: number[], isDebug: boolean);
    init(): void;
    pv(pageUrl: string, fromUrl?: string): void;
    event(category: string, action: string, label: string, value: number, nodeId: string): void;
}
export default PushCNZZ;
