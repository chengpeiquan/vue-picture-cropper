import { App, DefineComponent, Plugin } from 'vue';

// Import vue component
import component from '@/vue-picture-cropper.tsx';

// Define typescript interfaces for installable component
type InstallableComponent = DefineComponent & { install: Exclude<Plugin['install'], undefined> };

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
export default /*#__PURE__*/((): InstallableComponent => {
  // Assign InstallableComponent type
  const installable = component as unknown as InstallableComponent;

  // Attach install function executed by Vue.use()
  installable.install = (app: App) => {
    app.component('VuePictureCropper', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
