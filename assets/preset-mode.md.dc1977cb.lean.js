/**
 * name: vue-picture-cropper
 * version: v0.7.0
 * description: A simple and easy-to-use picture cropping component for Vue 3.
 * author: chengpeiquan <chengpeiquan@chengpeiquan.com>
 * homepage: https://cropper.chengpeiquan.com
 * license: MIT
 */
import{_ as e,c as n,a,o}from"./app.b9b53fc1.js";const D=JSON.parse('{"title":"Preset Mode","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"Type Declarations","slug":"type-declarations","link":"#type-declarations","children":[]},{"level":2,"title":"Notices","slug":"notices","link":"#notices","children":[]},{"level":2,"title":"Fixed Size Mode","slug":"fixed-size-mode","link":"#fixed-size-mode","children":[]},{"level":2,"title":"Round Mode","slug":"round-mode","link":"#round-mode","children":[]}],"relativePath":"preset-mode.md"}'),l={name:"preset-mode.md"};function p(t,s,c,i,r,d){return o(),n("div",null,s[0]||(s[0]=[a(`<h1 id="preset-mode" tabindex="-1">Preset Mode <a class="header-anchor" href="#preset-mode" aria-hidden="true">#</a></h1><p>This plugin provides some commonly used preset modes for quick use in daily business scenarios.</p><h2 id="type-declarations" tabindex="-1">Type Declarations <a class="header-anchor" href="#type-declarations" aria-hidden="true">#</a></h2><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">/**</span></span>
<span class="line"><span style="color:#676E95;"> * Preset options for component props</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">since</span><span style="color:#676E95;"> 0.4.0</span></span>
<span class="line"><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PresetModeOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">mode</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SupportedPresetMode</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">/**</span></span>
<span class="line"><span style="color:#676E95;"> * Preset Modes Supported by Components</span></span>
<span class="line"><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SupportedPresetMode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// Specifies the size of the cropped result</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">fixedSize</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// Generate a round cropping result</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">round</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><h2 id="notices" tabindex="-1">Notices <a class="header-anchor" href="#notices" aria-hidden="true">#</a></h2><ol><li>The preset mode only provides some simplified configurations. For example, obtaining the round cropping result originally requires cumbersome operations. Using the preset mode is out of the box, but some options that should be passed in still need to be passed in <code>options</code> , you can refer to the source code of live demos.</li><li>When using the preset mode, the &quot;cropping area&quot; and &quot;cropping result&quot; will keep the same size, that is, <code>presetMode.width</code> and <code>presetMode.height</code> specified in the preset mode will override The <code>width</code> and <code>height</code> passed in by <code>getDataURL</code> and other get result APIs.</li><li>When specifying <code>presetMode.width</code> and <code>presetMode.height</code>, please pay attention to whether the aspect ratio is consistent with <code>options.aspectRatio</code>, if not, you may not get the desired result</li><li><code>presetMode.mode</code> only accepts the values mentioned in the <code>SupportedPresetMode</code> type, passing in other values will not work</li></ol><h2 id="fixed-size-mode" tabindex="-1">Fixed Size Mode <a class="header-anchor" href="#fixed-size-mode" aria-hidden="true">#</a></h2><p>The size of the cropping area can be fixed, and the cropping result is as large as the cropping area (in this case, the user can be prohibited from modifying the size of the cropping area).</p><p>Click to view: <a href="./preset-mode-fixed-size.html">Live Demo</a></p><ul><li>Instructions:</li></ul><ol><li>Specify <code>mode</code> of <code>presetMode</code> as <code>fixedSize</code></li><li>Specify <code>width</code> and <code>height</code> of <code>presetMode</code> to be the desired size</li><li>Set <code>dragMode</code> of <code>options</code> to <code>move</code> to prevent the crop box from being canceled</li><li>Set <code>cropBoxResizable</code> of <code>options</code> to <code>false</code> to turn off crop box resizing</li><li>Specify the aspectRatio ratio of <code>options</code> as a ratio of <code>width / height</code></li></ol><ul><li>Example:</li></ul><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">vue-picture-cropper</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">:boxStyle</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#C3E88D;">      width: &#39;100%&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">      height: &#39;100%&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">      backgroundColor: &#39;#f8f8f8&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">      margin: &#39;auto&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">    }</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">:img</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pic</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">:options</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#C3E88D;">      viewMode: 1,</span></span>
<span class="line"><span style="color:#C3E88D;">      dragMode: &#39;move&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">      aspectRatio: 1,</span></span>
<span class="line"><span style="color:#C3E88D;">      cropBoxResizable: false,</span></span>
<span class="line"><span style="color:#C3E88D;">    }</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">:presetMode</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#C3E88D;">      mode: &#39;fixedSize&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">      width: 100,</span></span>
<span class="line"><span style="color:#C3E88D;">      height: 100,</span></span>
<span class="line"><span style="color:#C3E88D;">    }</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="round-mode" tabindex="-1">Round Mode <a class="header-anchor" href="#round-mode" aria-hidden="true">#</a></h2><p>If business scenarios such as user uploading avatars need to be cropped into a circular image, you can use this mode to obtain a circular PNG image (in this mode, the cropping result is always a <code>.png</code> image).</p><p>This mode also fixes the size of the cropping area, and the cropping result is as large as the cropping area (in this case, the user can be prohibited from modifying the size of the cropping area).</p><p>Click to view: <a href="./preset-mode-round.html">Live Demo</a></p><ul><li>Instructions:</li></ul><ol><li>Specify the <code>mode</code> of <code>presetMode</code> as <code>round</code></li><li>Specify the <code>width</code> and <code>height</code> of <code>presetMode</code> as the desired size, the two values need to be the same</li><li>Set <code>dragMode</code> of <code>options</code> to <code>move</code> to prevent the crop box from being canceled</li><li>Set <code>cropBoxResizable</code> of <code>options</code> to <code>false</code> to turn off crop box resizing</li><li>Specify aspectRatio ratio of <code>options</code> to <code>1</code></li></ol><ul><li>Example:</li></ul><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">vue-picture-cropper</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">:boxStyle</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#C3E88D;">      width: &#39;100%&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">      height: &#39;100%&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">      backgroundColor: &#39;#f8f8f8&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">      margin: &#39;auto&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">    }</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">:img</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pic</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">:options</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#C3E88D;">      viewMode: 1,</span></span>
<span class="line"><span style="color:#C3E88D;">      dragMode: &#39;move&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">      aspectRatio: 1,</span></span>
<span class="line"><span style="color:#C3E88D;">      cropBoxResizable: false,</span></span>
<span class="line"><span style="color:#C3E88D;">    }</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#C792EA;">:presetMode</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#C3E88D;">      mode: &#39;round&#39;,</span></span>
<span class="line"><span style="color:#C3E88D;">      width: 100,</span></span>
<span class="line"><span style="color:#C3E88D;">      height: 100,</span></span>
<span class="line"><span style="color:#C3E88D;">    }</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,21)]))}const F=e(l,[["render",p]]);export{D as __pageData,F as default};
