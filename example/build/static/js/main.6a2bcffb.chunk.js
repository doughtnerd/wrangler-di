(this["webpackJsonpwrangler-di-example"]=this["webpackJsonpwrangler-di-example"]||[]).push([[0],{20:function(e,n,t){"use strict";t.d(n,"a",(function(){return a})),t.d(n,"b",(function(){return o}));var r=t(13),a="GraphQLService",o={useQuery:r.c,useMutation:r.b}},23:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return l})),t.d(n,"c",(function(){return s}));var r=t(0),a=t.n(r),o=t(21);function c(){return(c=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var i=["provide"],u=function(){function e(e,n){var t=this;void 0===e&&(e=[]),void 0===n&&(n=null),this.parentInjector=n,this.dependencyGraph=new o.DepGraph,e.forEach((function(e){return t.registerProvider(e)})),this.resolveDependencies()}var n=e.prototype;return n.registerProvider=function(e){var n=e.provide,t=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,i);this.dependencyGraph.addNode(n,t)},n.markDependencies=function(){var e=this;this.dependencyGraph.overallOrder().map((function(n){return[n,e.dependencyGraph.getNodeData(n)]})).forEach((function(n){var t=n[0],r=n[1];(r.deps?r.deps:[]).forEach((function(n){try{e.dependencyGraph.addDependency(t,n)}catch(c){if(c instanceof o.DepGraphCycleError)throw c;if(c.message.includes("Node does not exist")){for(var r,a=e.parentInjector;a;)try{r=a.inject(n);break}catch(c){a=a.parentInjector}if(!r)throw new Error("Could not resolve dependency: "+n+" for Injectable: "+t);e.dependencyGraph.addNode(n,{instance:r}),e.dependencyGraph.addDependency(t,n)}}}))}))},n.getConstructorFunc=function(e,n){var t,r=this;return Object.prototype.hasOwnProperty.call(n,"useClass")&&(t=function(){for(var n=arguments.length,t=new Array(n),a=0;a<n;a++)t[a]=arguments[a];return new(r.dependencyGraph.getNodeData(e).useClass)({deps:t})}),Object.prototype.hasOwnProperty.call(n,"useFactory")&&(t=this.dependencyGraph.getNodeData(e).useFactory),Object.prototype.hasOwnProperty.call(n,"useValue")&&(t=function(){return r.dependencyGraph.getNodeData(e).useValue}),t},n.resolveDependencies=function(){var e=this;this.markDependencies(),this.dependencyGraph.overallOrder().forEach((function(n){var t=e.dependencyGraph.getNodeData(n),r=e.getConstructorFunc(n,t),a=t.deps?t.deps:[];if(a=a.map((function(n){return e.dependencyGraph.getNodeData(n).instance})),null==(null===t||void 0===t?void 0:t.instance)){var o=r.apply(void 0,a);e.dependencyGraph.setNodeData(n,c({},t,{instance:o}))}}))},n.inject=function(e){var n=this.dependencyGraph.getNodeData(e).instance;if(!n)throw new Error("Could not find provider :"+e);return n},e}(),d=a.a.createContext({injector:new u}),p=function(e){var n=e.providers,t=e.children,r=a.a.useContext(d);return a.a.createElement(d.Provider,{value:{injector:new u(n,r.injector)}},t)},s=function(e,n){return a.a.memo((function(){return function(e){var n=e.component,t=e.providerList,r=a.a.useContext(d).injector,o=a.a.useState((function(){return t.map((function(e){return r.inject(e)}))}))[0];return a.a.cloneElement(n,c({},n.props,{deps:o}))}({component:e,providerList:n})}))},l=function(e,n){return a.a.memo((function(){return a.a.createElement(p,{providers:n},e)}))}},30:function(e,n,t){e.exports=t(41)},31:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);t(31);var r=t(0),a=t.n(r),o=t(27),c=t.n(o),i=t(23),u=t(28),d=t(5),p=t(16),s=t(13),l=t(20),f=Object(p.a)({url:"https://graphql.anilist.co"}),h=a.a.lazy((function(){return t.e(4).then(t.bind(null,53))})),v=a.a.lazy((function(){return Promise.all([t.e(3),t.e(5)]).then(t.bind(null,52))})),y=[{provide:l.a,useValue:l.b}],m=function(){return a.a.createElement(s.a,{value:f},a.a.createElement(i.a,{providers:y},a.a.createElement(a.a.Suspense,{fallback:a.a.createElement("div",null,"Loading...")},a.a.createElement(u.a,null,a.a.createElement(d.c,null,a.a.createElement(d.a,{path:"/anime-details",component:h}),a.a.createElement(d.a,{path:"/anime-character-details",component:v}))))))};c.a.render(a.a.createElement(m,null),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.6a2bcffb.chunk.js.map