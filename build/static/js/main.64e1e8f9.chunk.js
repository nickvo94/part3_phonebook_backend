(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),c=t.n(r),l=(t(19),t(2)),u=function(e){var n=e.handleSearch;return o.a.createElement("div",null,"Filter with name: ",o.a.createElement("input",{type:"text",placeholder:"Search..",onChange:n}))},i=function(e){var n=e.formComponents,t={marginLeft:"10px"};return o.a.createElement("form",{onSubmit:n.addName},o.a.createElement("div",null,"name:",o.a.createElement("input",{value:n.newName,style:t,onChange:n.handleNameChange})),o.a.createElement("div",null,"number:",o.a.createElement("input",{value:n.newNumber,style:t,onChange:n.handleNumberChange})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=e.contacts,t=e.handleDelete;return o.a.createElement("ul",null,n.map((function(e){return o.a.createElement("div",{key:e.name},e.name+" ",e.number+" ",o.a.createElement("button",{id:e.id,onClick:t},"delete"))})))},m=function(e){var n=e.message;return console.log("message...",n),null===n?null:o.a.createElement("div",{className:n.class},n.text)},d=t(3),f=t.n(d),h="/api/persons",g=function(){return f.a.get(h).then((function(e){return e.data}))},p=function(e){return f.a.post(h,e).then((function(e){return e.data}))},v=function(e,n){return f.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){return f.a.delete("".concat(h,"/").concat(e)).then((function(e){return e}))},E=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),d=Object(l.a)(c,2),f=d[0],h=d[1],E=Object(a.useState)(""),w=Object(l.a)(E,2),C=w[0],N=w[1],j=Object(a.useState)(""),O=Object(l.a)(j,2),k=O[0],x=O[1],y=Object(a.useState)(null),S=Object(l.a)(y,2),D=S[0],L=S[1];Object(a.useEffect)((function(){console.log("effect"),A()}),[]),console.log("render",t.length,"persons");var A=function(){g().then((function(e){r(e)}))},B=function(e){e&&(console.log("handle notification...",e),"error"===e.class?(L(e),A()):"success"===e.class&&L(e),setTimeout((function(){L(null)}),5e3))},J={addName:function(e){if(e.preventDefault(),f){var n=t.find((function(e){return e.name.includes(f)?e:""}));console.log("existed",n);var a={name:f,number:C};if(void 0!==n)window.confirm("".concat(f," is already added to phonebook. Do you want to replace the phone number ?"))&&v(n.id,a).then((function(e){r(t.map((function(t){return t.id===n.id?e:t})))})).catch((function(e){B({class:"error",text:"".concat(e.response.data.error)})}));else p(a).then((function(e){console.log(e),r(t.concat(e)),B({class:"success",text:"Added ".concat(e.name," ")})})).catch((function(e){console.log("error",e.response.data),B({class:"error",text:"".concat(e.response.data.error)})}));h(""),N("")}},handleNameChange:function(e){console.log("name...",e.target.value),h(e.target.value)},handleNumberChange:function(e){console.log("number...",e.target.value),N(e.target.value)},newName:f,newNumber:C},W=k.length>0?t.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase())})):t;return o.a.createElement("div",{style:{margin:"10px"}},o.a.createElement("h1",null,"Phonebook"),o.a.createElement(m,{message:D}),o.a.createElement(u,{handleSearch:function(e){console.log("search...",e.target.value),x(e.target.value)}}),o.a.createElement("h2",null,"Add a new contact"),o.a.createElement(i,{formComponents:J}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(s,{contacts:W,handleDelete:function(e){console.log(e.target.id);var n,a=e.target.id,o=t.find((function(e){return e.id===a}));console.log(t,o),o&&(n=window.confirm("Delete ".concat(o.name," ?"))),n&&b(a).then((function(e){if(console.log(e),e){var n=t.filter((function(e){return e.id!==a}));r(n)}})).catch((function(e){console.log("error",e.response.data),B({class:"error",text:"".concat(e.response.data.error)})}))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.64e1e8f9.chunk.js.map