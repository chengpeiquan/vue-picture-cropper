import{_ as i,h as a,c as n,an as e}from"./chunks/framework.Cws1D16D.js";const c=JSON.parse('{"title":"预设模式","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"zh/guide/preset-mode.md","filePath":"zh/guide/preset-mode.md"}'),l={name:"zh/guide/preset-mode.md"};function p(h,s,t,k,r,d){return a(),n("div",null,[...s[0]||(s[0]=[e(`<h1 id="预设模式" tabindex="-1">预设模式 <a class="header-anchor" href="#预设模式" aria-label="Permalink to “预设模式”">​</a></h1><p>本插件提供了一些常用的预设模式，方便在日常的业务场景里快速使用。</p><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to “注意事项”">​</a></h2><p>开始使用之前，需要了解一些限制。</p><h3 id="配置行为相关" tabindex="-1">配置行为相关 <a class="header-anchor" href="#配置行为相关" aria-label="Permalink to “配置行为相关”">​</a></h3><ol><li><p><strong>裁剪区域和裁剪结果尺寸一致</strong><br> 在使用预设模式时，裁剪区域和裁剪结果会保持相同尺寸。<br> 如果在 <code>presetMode</code> 中指定了 <code>width</code> 和 <code>height</code>，这些值会覆盖 <code>getDataURL</code> 等 API 中传入的尺寸参数。</p></li><li><p><strong>宽高比例注意</strong><br> 请确保 <code>presetMode.width</code> 与 <code>presetMode.height</code> 的宽高比例与 <code>options.aspectRatio</code> 一致，否则裁剪结果可能出现拉伸或裁切。</p></li></ol><h3 id="类型约束相关" tabindex="-1">类型约束相关 <a class="header-anchor" href="#类型约束相关" aria-label="Permalink to “类型约束相关”">​</a></h3><ol><li><p><strong>模式值限制</strong><br><code>presetMode.mode</code> 只接收 <code>SupportedPresetMode</code> 类型中定义的值，传入其他值将不会生效。</p></li><li><p><strong>预设模式简化配置</strong><br> 预设模式只提供了基础配置，必要的 <code>options</code> 仍需根据实际需求传递。可参考 <a href="#在线示例">在线示例</a> 的源代码。</p></li></ol><h2 id="在线示例" tabindex="-1">在线示例 <a class="header-anchor" href="#在线示例" aria-label="Permalink to “在线示例”">​</a></h2><ul><li><a href="./../examples/preset-fixed-size">使用固定宽高的裁剪模式</a></li><li><a href="./../examples/preset-round">生成圆形裁剪结果</a></li></ul><h2 id="类型声明" tabindex="-1">类型声明 <a class="header-anchor" href="#类型声明" aria-label="Permalink to “类型声明”">​</a></h2><p>通过 <code>VuePictureCropper</code> 或 <code>useCropper</code> 的 <code>presetMode</code> Prop 传递给实例控制，以下是该 Prop 的类型定义。</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 组件支持的预设模式</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> SupportedPresetMode</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   * 指定裁剪结果的大小</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;fixedSize&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   * 生成圆形裁剪结果</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;round&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 组件 Props 上的预设选项</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@since</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 0.4.0</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> PresetModeOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   * 要使用的预设模式</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  mode</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> SupportedPresetMode</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   * 裁剪结果的宽度</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  width</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   * 裁剪结果的高度</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  height</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,13)])])}const g=i(l,[["render",p]]);export{c as __pageData,g as default};
