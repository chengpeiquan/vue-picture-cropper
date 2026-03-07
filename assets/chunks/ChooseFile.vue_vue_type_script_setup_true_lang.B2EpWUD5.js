import{B as V,f as Z,o as z,W as G,u as Y}from"./theme.ByMRhqxS.js";import{s as R,a as q,b as X}from"./DemoBlock.vue_vue_type_script_setup_true_lang.8a4SbAf3.js";import{s as J,a as T,R as Q}from"./class-name.Dq8w-x6s.js";import{h as r,c,v as h,S as s,e as b,i as L,t as F,l as g,M as v,L as E,N as B,f as C,k as y,j as f,O as S,K as M,a2 as D,ax as $,d as x,x as P}from"./framework.Cws1D16D.js";import{a as _,s as W}from"./index.BgW5XZqI.js";var N={name:"UploadIcon",extends:J};function ee(e){return le(e)||ie(e)||te(e)||ne()}function ne(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function te(e,n){if(e){if(typeof e=="string")return A(e,n);var i={}.toString.call(e).slice(8,-1);return i==="Object"&&e.constructor&&(i=e.constructor.name),i==="Map"||i==="Set"?Array.from(e):i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?A(e,n):void 0}}function ie(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function le(e){if(Array.isArray(e))return A(e)}function A(e,n){(n==null||n>e.length)&&(n=e.length);for(var i=0,l=Array(n);i<n;i++)l[i]=e[i];return l}function ae(e,n,i,l,a,t){return r(),c("svg",s({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),ee(n[0]||(n[0]=[h("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M6.58942 9.82197C6.70165 9.93405 6.85328 9.99793 7.012 10C7.17071 9.99793 7.32234 9.93405 7.43458 9.82197C7.54681 9.7099 7.61079 9.55849 7.61286 9.4V2.04798L9.79204 4.22402C9.84752 4.28011 9.91365 4.32457 9.98657 4.35479C10.0595 4.38502 10.1377 4.40039 10.2167 4.40002C10.2956 4.40039 10.3738 4.38502 10.4467 4.35479C10.5197 4.32457 10.5858 4.28011 10.6413 4.22402C10.7538 4.11152 10.817 3.95902 10.817 3.80002C10.817 3.64102 10.7538 3.48852 10.6413 3.37602L7.45127 0.190618C7.44656 0.185584 7.44176 0.180622 7.43687 0.175736C7.32419 0.063214 7.17136 0 7.012 0C6.85264 0 6.69981 0.063214 6.58712 0.175736C6.58181 0.181045 6.5766 0.186443 6.5715 0.191927L3.38282 3.37602C3.27669 3.48976 3.2189 3.6402 3.22165 3.79564C3.2244 3.95108 3.28746 4.09939 3.39755 4.20932C3.50764 4.31925 3.65616 4.38222 3.81182 4.38496C3.96749 4.3877 4.11814 4.33001 4.23204 4.22402L6.41113 2.04807V9.4C6.41321 9.55849 6.47718 9.7099 6.58942 9.82197ZM11.9952 14H2.02883C1.751 13.9887 1.47813 13.9228 1.22584 13.8061C0.973545 13.6894 0.746779 13.5241 0.558517 13.3197C0.370254 13.1154 0.22419 12.876 0.128681 12.6152C0.0331723 12.3545 -0.00990605 12.0775 0.0019109 11.8V9.40005C0.0019109 9.24092 0.065216 9.08831 0.1779 8.97579C0.290584 8.86326 0.443416 8.80005 0.602775 8.80005C0.762134 8.80005 0.914966 8.86326 1.02765 8.97579C1.14033 9.08831 1.20364 9.24092 1.20364 9.40005V11.8C1.18295 12.0376 1.25463 12.274 1.40379 12.4602C1.55296 12.6463 1.76817 12.7681 2.00479 12.8H11.9952C12.2318 12.7681 12.447 12.6463 12.5962 12.4602C12.7453 12.274 12.817 12.0376 12.7963 11.8V9.40005C12.7963 9.24092 12.8596 9.08831 12.9723 8.97579C13.085 8.86326 13.2378 8.80005 13.3972 8.80005C13.5565 8.80005 13.7094 8.86326 13.8221 8.97579C13.9347 9.08831 13.998 9.24092 13.998 9.40005V11.8C14.022 12.3563 13.8251 12.8996 13.45 13.3116C13.0749 13.7236 12.552 13.971 11.9952 14Z",fill:"currentColor"},null,-1)])),16)}N.render=ae;var se=`
    .p-progressbar {
        display: block;
        position: relative;
        overflow: hidden;
        height: dt('progressbar.height');
        background: dt('progressbar.background');
        border-radius: dt('progressbar.border.radius');
    }

    .p-progressbar-value {
        margin: 0;
        background: dt('progressbar.value.background');
    }

    .p-progressbar-label {
        color: dt('progressbar.label.color');
        font-size: dt('progressbar.label.font.size');
        font-weight: dt('progressbar.label.font.weight');
    }

    .p-progressbar-determinate .p-progressbar-value {
        height: 100%;
        width: 0%;
        position: absolute;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: width 1s ease-in-out;
    }

    .p-progressbar-determinate .p-progressbar-label {
        display: inline-flex;
    }

    .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .p-progressbar-indeterminate .p-progressbar-value::after {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }

    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
`,re={root:function(n){var i=n.instance;return["p-progressbar p-component",{"p-progressbar-determinate":i.determinate,"p-progressbar-indeterminate":i.indeterminate}]},value:"p-progressbar-value",label:"p-progressbar-label"},oe=V.extend({name:"progressbar",style:se,classes:re}),ue={name:"BaseProgressBar",extends:T,props:{value:{type:Number,default:null},mode:{type:String,default:"determinate"},showValue:{type:Boolean,default:!0}},style:oe,provide:function(){return{$pcProgressBar:this,$parentInstance:this}}},O={name:"ProgressBar",extends:ue,inheritAttrs:!1,computed:{progressStyle:function(){return{width:this.value+"%",display:"flex"}},indeterminate:function(){return this.mode==="indeterminate"},determinate:function(){return this.mode==="determinate"},dataP:function(){return Z({determinate:this.determinate,indeterminate:this.indeterminate})}}},de=["aria-valuenow","data-p"],pe=["data-p"],ce=["data-p"],fe=["data-p"];function he(e,n,i,l,a,t){return r(),c("div",s({role:"progressbar",class:e.cx("root"),"aria-valuemin":"0","aria-valuenow":e.value,"aria-valuemax":"100","data-p":t.dataP},e.ptmi("root")),[t.determinate?(r(),c("div",s({key:0,class:e.cx("value"),style:t.progressStyle,"data-p":t.dataP},e.ptm("value")),[e.value!=null&&e.value!==0&&e.showValue?(r(),c("div",s({key:0,class:e.cx("label"),"data-p":t.dataP},e.ptm("label")),[b(e.$slots,"default",{},function(){return[L(F(e.value+"%"),1)]})],16,ce)):g("",!0)],16,pe)):t.indeterminate?(r(),c("div",s({key:1,class:e.cx("value"),"data-p":t.dataP},e.ptm("value")),null,16,fe)):g("",!0)],16,de)}O.render=he;var me=`
    .p-fileupload input[type='file'] {
        display: none;
    }

    .p-fileupload-advanced {
        border: 1px solid dt('fileupload.border.color');
        border-radius: dt('fileupload.border.radius');
        background: dt('fileupload.background');
        color: dt('fileupload.color');
    }

    .p-fileupload-header {
        display: flex;
        align-items: center;
        padding: dt('fileupload.header.padding');
        background: dt('fileupload.header.background');
        color: dt('fileupload.header.color');
        border-style: solid;
        border-width: dt('fileupload.header.border.width');
        border-color: dt('fileupload.header.border.color');
        border-radius: dt('fileupload.header.border.radius');
        gap: dt('fileupload.header.gap');
    }

    .p-fileupload-content {
        border: 1px solid transparent;
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.content.gap');
        transition: border-color dt('fileupload.transition.duration');
        padding: dt('fileupload.content.padding');
    }

    .p-fileupload-content .p-progressbar {
        width: 100%;
        height: dt('fileupload.progressbar.height');
    }

    .p-fileupload-file-list {
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.filelist.gap');
    }

    .p-fileupload-file {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: dt('fileupload.file.padding');
        border-block-end: 1px solid dt('fileupload.file.border.color');
        gap: dt('fileupload.file.gap');
    }

    .p-fileupload-file:last-child {
        border-block-end: 0;
    }

    .p-fileupload-file-info {
        display: flex;
        flex-direction: column;
        gap: dt('fileupload.file.info.gap');
    }

    .p-fileupload-file-thumbnail {
        flex-shrink: 0;
    }

    .p-fileupload-file-actions {
        margin-inline-start: auto;
    }

    .p-fileupload-highlight {
        border: 1px dashed dt('fileupload.content.highlight.border.color');
    }

    .p-fileupload-basic .p-message {
        margin-block-end: dt('fileupload.basic.gap');
    }

    .p-fileupload-basic-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: dt('fileupload.basic.gap');
    }
`,ge={root:function(n){var i=n.props;return["p-fileupload p-fileupload-".concat(i.mode," p-component")]},header:"p-fileupload-header",pcChooseButton:"p-fileupload-choose-button",pcUploadButton:"p-fileupload-upload-button",pcCancelButton:"p-fileupload-cancel-button",content:"p-fileupload-content",fileList:"p-fileupload-file-list",file:"p-fileupload-file",fileThumbnail:"p-fileupload-file-thumbnail",fileInfo:"p-fileupload-file-info",fileName:"p-fileupload-file-name",fileSize:"p-fileupload-file-size",pcFileBadge:"p-fileupload-file-badge",fileActions:"p-fileupload-file-actions",pcFileRemoveButton:"p-fileupload-file-remove-button",basicContent:"p-fileupload-basic-content"},be=V.extend({name:"fileupload",style:me,classes:ge}),ye={name:"BaseFileUpload",extends:T,props:{name:{type:String,default:null},url:{type:String,default:null},mode:{type:String,default:"advanced"},multiple:{type:Boolean,default:!1},accept:{type:String,default:null},disabled:{type:Boolean,default:!1},auto:{type:Boolean,default:!1},maxFileSize:{type:Number,default:null},invalidFileSizeMessage:{type:String,default:"{0}: Invalid file size, file size should be smaller than {1}."},invalidFileTypeMessage:{type:String,default:"{0}: Invalid file type, allowed file types: {1}."},fileLimit:{type:Number,default:null},invalidFileLimitMessage:{type:String,default:"Maximum number of files exceeded, limit is {0} at most."},withCredentials:{type:Boolean,default:!1},previewWidth:{type:Number,default:50},chooseLabel:{type:String,default:null},uploadLabel:{type:String,default:null},cancelLabel:{type:String,default:null},customUpload:{type:Boolean,default:!1},showUploadButton:{type:Boolean,default:!0},showCancelButton:{type:Boolean,default:!0},chooseIcon:{type:String,default:void 0},uploadIcon:{type:String,default:void 0},cancelIcon:{type:String,default:void 0},style:null,class:null,chooseButtonProps:{type:null,default:null},uploadButtonProps:{type:Object,default:function(){return{severity:"secondary"}}},cancelButtonProps:{type:Object,default:function(){return{severity:"secondary"}}}},style:be,provide:function(){return{$pcFileUpload:this,$parentInstance:this}}},j={name:"FileContent",hostName:"FileUpload",extends:T,emits:["remove"],props:{files:{type:Array,default:function(){return[]}},badgeSeverity:{type:String,default:"warn"},badgeValue:{type:String,default:null},previewWidth:{type:Number,default:50},templates:{type:null,default:null}},methods:{formatSize:function(n){var i,l=1024,a=3,t=((i=this.$primevue.config.locale)===null||i===void 0?void 0:i.fileSizeTypes)||["B","KB","MB","GB","TB","PB","EB","ZB","YB"];if(n===0)return"0 ".concat(t[0]);var u=Math.floor(Math.log(n)/Math.log(l)),o=parseFloat((n/Math.pow(l,u)).toFixed(a));return"".concat(o," ").concat(t[u])}},components:{Button:W,Badge:_,TimesIcon:R}},ve=["alt","src","width"];function Ce(e,n,i,l,a,t){var u=v("Badge"),o=v("TimesIcon"),m=v("Button");return r(!0),c(M,null,E(i.files,function(d,p){return r(),c("div",s({key:d.name+d.type+d.size,class:e.cx("file")},{ref_for:!0},e.ptm("file")),[h("img",s({role:"presentation",class:e.cx("fileThumbnail"),alt:d.name,src:d.objectURL,width:i.previewWidth},{ref_for:!0},e.ptm("fileThumbnail")),null,16,ve),h("div",s({class:e.cx("fileInfo")},{ref_for:!0},e.ptm("fileInfo")),[h("div",s({class:e.cx("fileName")},{ref_for:!0},e.ptm("fileName")),F(d.name),17),h("span",s({class:e.cx("fileSize")},{ref_for:!0},e.ptm("fileSize")),F(t.formatSize(d.size)),17)],16),B(u,{value:i.badgeValue,class:C(e.cx("pcFileBadge")),severity:i.badgeSeverity,unstyled:e.unstyled,pt:e.ptm("pcFileBadge")},null,8,["value","class","severity","unstyled","pt"]),h("div",s({class:e.cx("fileActions")},{ref_for:!0},e.ptm("fileActions")),[B(m,{onClick:function(Le){return e.$emit("remove",p)},text:"",rounded:"",severity:"danger",class:C(e.cx("pcFileRemoveButton")),unstyled:e.unstyled,pt:e.ptm("pcFileRemoveButton")},{icon:y(function(I){return[i.templates.fileremoveicon?(r(),f(S(i.templates.fileremoveicon),{key:0,class:C(I.class),file:d,index:p},null,8,["class","file","index"])):(r(),f(o,s({key:1,class:I.class,"aria-hidden":"true"},{ref_for:!0},e.ptm("pcFileRemoveButton").icon),null,16,["class"]))]}),_:2},1032,["onClick","class","unstyled","pt"])],16)],16)}),128)}j.render=Ce;function k(e){return Se(e)||Fe(e)||K(e)||Be()}function Be(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Fe(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Se(e){if(Array.isArray(e))return U(e)}function w(e,n){var i=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!i){if(Array.isArray(e)||(i=K(e))||n){i&&(e=i);var l=0,a=function(){};return{s:a,n:function(){return l>=e.length?{done:!0}:{done:!1,value:e[l++]}},e:function(d){throw d},f:a}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var t,u=!0,o=!1;return{s:function(){i=i.call(e)},n:function(){var d=i.next();return u=d.done,d},e:function(d){o=!0,t=d},f:function(){try{u||i.return==null||i.return()}finally{if(o)throw t}}}}function K(e,n){if(e){if(typeof e=="string")return U(e,n);var i={}.toString.call(e).slice(8,-1);return i==="Object"&&e.constructor&&(i=e.constructor.name),i==="Map"||i==="Set"?Array.from(e):i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?U(e,n):void 0}}function U(e,n){(n==null||n>e.length)&&(n=e.length);for(var i=0,l=Array(n);i<n;i++)l[i]=e[i];return l}var H={name:"FileUpload",extends:ye,inheritAttrs:!1,emits:["select","uploader","before-upload","progress","upload","error","before-send","clear","remove","remove-uploaded-file"],duplicateIEEvent:!1,data:function(){return{uploadedFileCount:0,files:[],messages:[],focused:!1,progress:null,uploadedFiles:[]}},methods:{upload:function(){this.hasFiles&&this.uploader()},onBasicUploaderClick:function(n){n.button===0&&this.$refs.fileInput.click()},onFileSelect:function(n){if(n.type!=="drop"&&this.isIE11()&&this.duplicateIEEvent){this.duplicateIEEvent=!1;return}this.isBasic&&this.hasFiles&&(this.files=[]),this.messages=[],this.files=this.files||[];var i=n.dataTransfer?n.dataTransfer.files:n.target.files,l=w(i),a;try{for(l.s();!(a=l.n()).done;){var t=a.value;!this.isFileSelected(t)&&!this.isFileLimitExceeded()&&this.validate(t)&&(this.isImage(t)&&(t.objectURL=window.URL.createObjectURL(t)),this.files.push(t))}}catch(u){l.e(u)}finally{l.f()}this.$emit("select",{originalEvent:n,files:this.files}),this.fileLimit&&this.checkFileLimit(),this.auto&&this.hasFiles&&!this.isFileLimitExceeded()&&this.uploader(),n.type!=="drop"&&this.isIE11()?this.clearIEInput():this.clearInputElement()},choose:function(){this.$refs.fileInput.click()},uploader:function(){var n=this;if(this.customUpload)this.fileLimit&&(this.uploadedFileCount+=this.files.length),this.$emit("uploader",{files:this.files});else{var i=new XMLHttpRequest,l=new FormData;this.$emit("before-upload",{xhr:i,formData:l});var a=w(this.files),t;try{for(a.s();!(t=a.n()).done;){var u=t.value;l.append(this.name,u,u.name)}}catch(o){a.e(o)}finally{a.f()}i.upload.addEventListener("progress",function(o){o.lengthComputable&&(n.progress=Math.round(o.loaded*100/o.total)),n.$emit("progress",{originalEvent:o,progress:n.progress})}),i.onreadystatechange=function(){if(i.readyState===4){if(n.progress=0,i.status>=200&&i.status<300){var o;n.fileLimit&&(n.uploadedFileCount+=n.files.length),n.$emit("upload",{xhr:i,files:n.files}),(o=n.uploadedFiles).push.apply(o,k(n.files))}else n.$emit("error",{xhr:i,files:n.files});n.clear()}},this.url&&(i.open("POST",this.url,!0),this.$emit("before-send",{xhr:i,formData:l}),i.withCredentials=this.withCredentials,i.send(l))}},clear:function(){this.files=[],this.messages=null,this.$emit("clear"),this.isAdvanced&&this.clearInputElement()},onFocus:function(){this.focused=!0},onBlur:function(){this.focused=!1},isFileSelected:function(n){if(this.files&&this.files.length){var i=w(this.files),l;try{for(i.s();!(l=i.n()).done;){var a=l.value;if(a.name+a.type+a.size===n.name+n.type+n.size)return!0}}catch(t){i.e(t)}finally{i.f()}}return!1},isIE11:function(){return!!window.MSInputMethodContext&&!!document.documentMode},validate:function(n){return this.accept&&!this.isFileTypeValid(n)?(this.messages.push(this.invalidFileTypeMessage.replace("{0}",n.name).replace("{1}",this.accept)),!1):this.maxFileSize&&n.size>this.maxFileSize?(this.messages.push(this.invalidFileSizeMessage.replace("{0}",n.name).replace("{1}",this.formatSize(this.maxFileSize))),!1):!0},isFileTypeValid:function(n){var i=this.accept.split(",").map(function(o){return o.trim()}),l=w(i),a;try{for(l.s();!(a=l.n()).done;){var t=a.value,u=this.isWildcard(t)?this.getTypeClass(n.type)===this.getTypeClass(t):n.type==t||this.getFileExtension(n).toLowerCase()===t.toLowerCase();if(u)return!0}}catch(o){l.e(o)}finally{l.f()}return!1},getTypeClass:function(n){return n.substring(0,n.indexOf("/"))},isWildcard:function(n){return n.indexOf("*")!==-1},getFileExtension:function(n){return"."+n.name.split(".").pop()},isImage:function(n){return/^image\//.test(n.type)},onDragEnter:function(n){!this.disabled&&(!this.hasFiles||this.multiple)&&(n.stopPropagation(),n.preventDefault())},onDragOver:function(n){!this.disabled&&(!this.hasFiles||this.multiple)&&(!this.isUnstyled&&G(this.$refs.content,"p-fileupload-highlight"),this.$refs.content.setAttribute("data-p-highlight",!0),n.stopPropagation(),n.preventDefault())},onDragLeave:function(){this.disabled||(!this.isUnstyled&&z(this.$refs.content,"p-fileupload-highlight"),this.$refs.content.setAttribute("data-p-highlight",!1))},onDrop:function(n){if(!this.disabled){!this.isUnstyled&&z(this.$refs.content,"p-fileupload-highlight"),this.$refs.content.setAttribute("data-p-highlight",!1),n.stopPropagation(),n.preventDefault();var i=n.dataTransfer?n.dataTransfer.files:n.target.files,l=this.multiple||i&&i.length===1;l&&this.onFileSelect(n)}},remove:function(n){this.clearInputElement();var i=this.files.splice(n,1)[0];this.files=k(this.files),this.$emit("remove",{file:i,files:this.files})},removeUploadedFile:function(n){var i=this.uploadedFiles.splice(n,1)[0];this.uploadedFiles=k(this.uploadedFiles),this.$emit("remove-uploaded-file",{file:i,files:this.uploadedFiles})},clearInputElement:function(){this.$refs.fileInput.value=""},clearIEInput:function(){this.$refs.fileInput&&(this.duplicateIEEvent=!0,this.$refs.fileInput.value="")},formatSize:function(n){var i,l=1024,a=3,t=((i=this.$primevue.config.locale)===null||i===void 0?void 0:i.fileSizeTypes)||["B","KB","MB","GB","TB","PB","EB","ZB","YB"];if(n===0)return"0 ".concat(t[0]);var u=Math.floor(Math.log(n)/Math.log(l)),o=parseFloat((n/Math.pow(l,u)).toFixed(a));return"".concat(o," ").concat(t[u])},isFileLimitExceeded:function(){return this.fileLimit&&this.fileLimit<=this.files.length+this.uploadedFileCount&&this.focused&&(this.focused=!1),this.fileLimit&&this.fileLimit<this.files.length+this.uploadedFileCount},checkFileLimit:function(){this.isFileLimitExceeded()&&this.messages.push(this.invalidFileLimitMessage.replace("{0}",this.fileLimit.toString()))},onMessageClose:function(){this.messages=null}},computed:{isAdvanced:function(){return this.mode==="advanced"},isBasic:function(){return this.mode==="basic"},chooseButtonClass:function(){return[this.cx("pcChooseButton"),this.class]},basicFileChosenLabel:function(){var n;if(this.auto)return this.chooseButtonLabel;if(this.hasFiles){var i;return this.files&&this.files.length===1?this.files[0].name:(i=this.$primevue.config.locale)===null||i===void 0||(i=i.fileChosenMessage)===null||i===void 0?void 0:i.replace("{0}",this.files.length)}return((n=this.$primevue.config.locale)===null||n===void 0?void 0:n.noFileChosenMessage)||""},hasFiles:function(){return this.files&&this.files.length>0},hasUploadedFiles:function(){return this.uploadedFiles&&this.uploadedFiles.length>0},chooseDisabled:function(){return this.disabled||this.fileLimit&&this.fileLimit<=this.files.length+this.uploadedFileCount},uploadDisabled:function(){return this.disabled||!this.hasFiles||this.fileLimit&&this.fileLimit<this.files.length},cancelDisabled:function(){return this.disabled||!this.hasFiles},chooseButtonLabel:function(){return this.chooseLabel||this.$primevue.config.locale.choose},uploadButtonLabel:function(){return this.uploadLabel||this.$primevue.config.locale.upload},cancelButtonLabel:function(){return this.cancelLabel||this.$primevue.config.locale.cancel},completedLabel:function(){return this.$primevue.config.locale.completed},pendingLabel:function(){return this.$primevue.config.locale.pending}},components:{Button:W,ProgressBar:O,Message:X,FileContent:j,PlusIcon:q,UploadIcon:N,TimesIcon:R},directives:{ripple:Q}},we=["multiple","accept","disabled"],Ie=["accept","disabled","multiple"];function ke(e,n,i,l,a,t){var u=v("Button"),o=v("ProgressBar"),m=v("Message"),d=v("FileContent");return t.isAdvanced?(r(),c("div",s({key:0,class:e.cx("root")},e.ptmi("root")),[h("input",s({ref:"fileInput",type:"file",onChange:n[0]||(n[0]=function(){return t.onFileSelect&&t.onFileSelect.apply(t,arguments)}),multiple:e.multiple,accept:e.accept,disabled:t.chooseDisabled},e.ptm("input")),null,16,we),h("div",s({class:e.cx("header")},e.ptm("header")),[b(e.$slots,"header",{files:a.files,uploadedFiles:a.uploadedFiles,chooseCallback:t.choose,uploadCallback:t.uploader,clearCallback:t.clear},function(){return[B(u,s({label:t.chooseButtonLabel,class:t.chooseButtonClass,style:e.style,disabled:e.disabled,unstyled:e.unstyled,onClick:t.choose,onKeydown:D(t.choose,["enter"]),onFocus:t.onFocus,onBlur:t.onBlur},e.chooseButtonProps,{pt:e.ptm("pcChooseButton")}),{icon:y(function(p){return[b(e.$slots,"chooseicon",{},function(){return[(r(),f(S(e.chooseIcon?"span":"PlusIcon"),s({class:[p.class,e.chooseIcon],"aria-hidden":"true"},e.ptm("pcChooseButton").icon),null,16,["class"]))]})]}),_:3},16,["label","class","style","disabled","unstyled","onClick","onKeydown","onFocus","onBlur","pt"]),e.showUploadButton?(r(),f(u,s({key:0,class:e.cx("pcUploadButton"),label:t.uploadButtonLabel,onClick:t.uploader,disabled:t.uploadDisabled,unstyled:e.unstyled},e.uploadButtonProps,{pt:e.ptm("pcUploadButton")}),{icon:y(function(p){return[b(e.$slots,"uploadicon",{},function(){return[(r(),f(S(e.uploadIcon?"span":"UploadIcon"),s({class:[p.class,e.uploadIcon],"aria-hidden":"true"},e.ptm("pcUploadButton").icon,{"data-pc-section":"uploadbuttonicon"}),null,16,["class"]))]})]}),_:3},16,["class","label","onClick","disabled","unstyled","pt"])):g("",!0),e.showCancelButton?(r(),f(u,s({key:1,class:e.cx("pcCancelButton"),label:t.cancelButtonLabel,onClick:t.clear,disabled:t.cancelDisabled,unstyled:e.unstyled},e.cancelButtonProps,{pt:e.ptm("pcCancelButton")}),{icon:y(function(p){return[b(e.$slots,"cancelicon",{},function(){return[(r(),f(S(e.cancelIcon?"span":"TimesIcon"),s({class:[p.class,e.cancelIcon],"aria-hidden":"true"},e.ptm("pcCancelButton").icon,{"data-pc-section":"cancelbuttonicon"}),null,16,["class"]))]})]}),_:3},16,["class","label","onClick","disabled","unstyled","pt"])):g("",!0)]})],16),h("div",s({ref:"content",class:e.cx("content"),onDragenter:n[1]||(n[1]=function(){return t.onDragEnter&&t.onDragEnter.apply(t,arguments)}),onDragover:n[2]||(n[2]=function(){return t.onDragOver&&t.onDragOver.apply(t,arguments)}),onDragleave:n[3]||(n[3]=function(){return t.onDragLeave&&t.onDragLeave.apply(t,arguments)}),onDrop:n[4]||(n[4]=function(){return t.onDrop&&t.onDrop.apply(t,arguments)})},e.ptm("content"),{"data-p-highlight":!1}),[b(e.$slots,"content",{files:a.files,uploadedFiles:a.uploadedFiles,removeUploadedFileCallback:t.removeUploadedFile,removeFileCallback:t.remove,progress:a.progress,messages:a.messages},function(){return[t.hasFiles?(r(),f(o,{key:0,value:a.progress,showValue:!1,unstyled:e.unstyled,pt:e.ptm("pcProgressbar")},null,8,["value","unstyled","pt"])):g("",!0),(r(!0),c(M,null,E(a.messages,function(p){return r(),f(m,{key:p,severity:"error",onClose:t.onMessageClose,unstyled:e.unstyled,pt:e.ptm("pcMessage")},{default:y(function(){return[L(F(p),1)]}),_:2},1032,["onClose","unstyled","pt"])}),128)),t.hasFiles?(r(),c("div",{key:1,class:C(e.cx("fileList"))},[B(d,{files:a.files,onRemove:t.remove,badgeValue:t.pendingLabel,previewWidth:e.previewWidth,templates:e.$slots,unstyled:e.unstyled,pt:e.pt},null,8,["files","onRemove","badgeValue","previewWidth","templates","unstyled","pt"])],2)):g("",!0),t.hasUploadedFiles?(r(),c("div",{key:2,class:C(e.cx("fileList"))},[B(d,{files:a.uploadedFiles,onRemove:t.removeUploadedFile,badgeValue:t.completedLabel,badgeSeverity:"success",previewWidth:e.previewWidth,templates:e.$slots,unstyled:e.unstyled,pt:e.pt},null,8,["files","onRemove","badgeValue","previewWidth","templates","unstyled","pt"])],2)):g("",!0)]}),e.$slots.empty&&!t.hasFiles&&!t.hasUploadedFiles?(r(),c("div",$(s({key:0},e.ptm("empty"))),[b(e.$slots,"empty")],16)):g("",!0)],16)],16)):t.isBasic?(r(),c("div",s({key:1,class:e.cx("root")},e.ptmi("root")),[(r(!0),c(M,null,E(a.messages,function(p){return r(),f(m,{key:p,severity:"error",onClose:t.onMessageClose,unstyled:e.unstyled,pt:e.ptm("pcMessage")},{default:y(function(){return[L(F(p),1)]}),_:2},1032,["onClose","unstyled","pt"])}),128)),h("div",s({class:e.cx("basicContent")},e.ptm("basicContent")),[B(u,s({label:t.chooseButtonLabel,class:t.chooseButtonClass,style:e.style,disabled:e.disabled,unstyled:e.unstyled,onMouseup:t.onBasicUploaderClick,onKeydown:D(t.choose,["enter"]),onFocus:t.onFocus,onBlur:t.onBlur},e.chooseButtonProps,{pt:e.ptm("pcChooseButton")}),{icon:y(function(p){return[b(e.$slots,"chooseicon",{},function(){return[(r(),f(S(e.chooseIcon?"span":"PlusIcon"),s({class:[p.class,e.chooseIcon],"aria-hidden":"true"},e.ptm("pcChooseButton").icon),null,16,["class"]))]})]}),_:3},16,["label","class","style","disabled","unstyled","onMouseup","onKeydown","onFocus","onBlur","pt"]),e.auto?g("",!0):b(e.$slots,"filelabel",{key:0,class:C(e.cx("filelabel")),files:a.files},function(){return[h("span",{class:C(e.cx("filelabel"))},F(t.basicFileChosenLabel),3)]}),h("input",s({ref:"fileInput",type:"file",accept:e.accept,disabled:e.disabled,multiple:e.multiple,onChange:n[5]||(n[5]=function(){return t.onFileSelect&&t.onFileSelect.apply(t,arguments)}),onFocus:n[6]||(n[6]=function(){return t.onFocus&&t.onFocus.apply(t,arguments)}),onBlur:n[7]||(n[7]=function(){return t.onBlur&&t.onBlur.apply(t,arguments)})},e.ptm("input")),null,16,Ie)],16)],16)):g("",!0)}H.render=ke;const ze=x({__name:"ChooseFile",props:{onSelect:{type:Function}},setup(e){const{t:n}=Y();return(i,l)=>(r(),f(P(H),{mode:"basic","custom-upload":"",auto:"","choose-label":P(n)("examples.choose"),accept:"image/*",severity:"secondary",onSelect:l[0]||(l[0]=a=>{const t=a.files[0];e.onSelect(t)})},null,8,["choose-label"]))}});export{ze as _};
