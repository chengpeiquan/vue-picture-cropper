import 'cropperjs/dist/cropper.css';
export declare let cropper: any;
declare const VuePictureCropper: import("vue").DefineComponent<{
    boxStyle: {
        type: ObjectConstructor;
        required: false;
    };
    img: StringConstructor;
    options: {
        type: ObjectConstructor;
        required: false;
        default: () => {};
    };
}, unknown, {
    cropper: any;
    mimeType: string;
}, {}, {
    init(): Promise<void>;
    updateInstance(): void;
    getImgSuffix(): void;
    getDataURL(options?: any): string;
    getBlob(options?: any): Blob;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    options: Record<string, any>;
} & {
    boxStyle?: Record<string, any>;
    img?: string;
}>, {
    options: Record<string, any>;
}>;
export default VuePictureCropper;
