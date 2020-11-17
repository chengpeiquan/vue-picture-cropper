import 'cropperjs/dist/cropper.css';
export declare const cropper: any;
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
}, {
    cropperImg: any;
    initCropper: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    options: Record<string, any>;
} & {
    boxStyle?: Record<string, any>;
    img?: string;
}>, {
    options: Record<string, any>;
}>;
export default VuePictureCropper;
