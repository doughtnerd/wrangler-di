(this["webpackJsonpwrangler-di-example"]=this["webpackJsonpwrangler-di-example"]||[]).push([[4],{42:function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}t.d(n,"a",(function(){return r}))},43:function(e,n,t){"use strict";function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}t.d(n,"a",(function(){return a}))},46:function(e,n,t){"use strict";function r(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function a(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,a=!1,i=void 0;try{for(var u,l=e[Symbol.iterator]();!(r=(u=l.next()).done)&&(t.push(u.value),!n||t.length!==n);r=!0);}catch(o){a=!0,i=o}finally{try{r||null==l.return||l.return()}finally{if(a)throw i}}return t}}(e,n)||function(e,n){if(e){if("string"===typeof e)return r(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?r(e,n):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}t.d(n,"a",(function(){return a}))},53:function(e,n,t){"use strict";t.r(n);var r=t(46),a=t(0),i=t.n(a),u=t(23),l=t(20),o=t(42),c=t(43),f=function(){function e(n){Object(o.a)(this,e),this.graphqlService=n}return Object(c.a)(e,[{key:"getAnimeInfo",value:function(e){return this.graphqlService.useQuery({query:"\nquery ($id: Int) {\n  Media (id: $id, type: ANIME) {\n    id    \n    title {        \n      english\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    genres\n    source\n    popularity\n  }\n}\n",variables:{id:e}})}}]),e}(),s=function(e){var n=e.deps[0].getAnimeInfo(),t=Object(r.a)(n,1)[0],a=t.fetching,u=t.data;return t.error?i.a.createElement("div",null,"Error!"):a?i.a.createElement("div",null,"Loading..."):u?i.a.createElement(i.a.Fragment,null,i.a.createElement("div",null,u.Media.id),i.a.createElement("div",null,u.Media.title.english),i.a.createElement("div",null,u.Media.genres),i.a.createElement("div",null,u.Media.source),i.a.createElement("div",null,u.Media.popularity)):null},d=Object(u.c)(i.a.createElement(s,null),["APIService"]);n.default=function(){return i.a.createElement(u.a,{providers:[{provide:"APIService",useFactory:function(e){return new f(e)},deps:[l.a]}]},i.a.createElement(d,null))}}}]);
//# sourceMappingURL=4.475a9297.chunk.js.map