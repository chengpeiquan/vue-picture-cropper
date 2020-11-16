import { DefineComponent, Plugin } from 'vue';

declare const VuePictureCropper: DefineComponent & { install: Exclude<Plugin['install'], undefined> };
export default VuePictureCropper;
