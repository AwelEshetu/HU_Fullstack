(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},20:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(13),u=n.n(o),c=(n(20),n(14)),i=n(2),l=function(e){var t=e.text,n=e.id,r=e.handleDelete;return a.a.createElement("button",{onClick:function(){return r(n)}},t)},m=function(e){var t=e.persons,n=e.removeNumber;return t.map((function(e){return a.a.createElement("p",{key:e.id},e.name," ",e.number," ",a.a.createElement(l,{text:"delete",id:e.id,handleDelete:n}))}))},f=function(e){var t=e.search;return a.a.createElement("div",null,"filter shown with : ",a.a.createElement("input",{onChange:t}))},s=function(e){var t=e.name,n=e.number,r=e.submitPerson,o=e.addName,u=e.addNumber;return a.a.createElement("form",{onSubmit:r},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:t,onChange:o})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:n,onChange:u})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},d=n(3),b=n.n(d),p="/api/persons",h=function(){return b.a.get(p).then((function(e){return e.data}))},v=function(e){return b.a.post(p,e).then((function(e){return e.data}))},E=function(e,t){return b.a.put("".concat(p,"/").concat(e),t).then((function(e){return e.data}))},O=function(e){return b.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},g=function(e){var t=e.message,n=e.error;return null===t&&null!==n?a.a.createElement("div",{className:"error"},n):null!==t&&null===n?a.a.createElement("div",{className:"notification"},t):null};function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var w=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],u=Object(r.useState)(""),l=Object(i.a)(u,2),d=l[0],b=l[1],p=Object(r.useState)(""),w=Object(i.a)(p,2),y=w[0],k=w[1],P=Object(r.useState)(null),N=Object(i.a)(P,2),S=N[0],C=N[1],D=Object(r.useState)(null),T=Object(i.a)(D,2),x=T[0],A=T[1];Object(r.useEffect)((function(){h().then((function(e){o(e)}))}),[]);return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(g,{message:x,error:S}),a.a.createElement(f,{search:function(e){var t=n.slice();if(""===e.target.value)h().then((function(e){o(e)}));else{var r=e.target.value,a=t.filter((function(e){return e.name.toLowerCase().startsWith(r.toLowerCase())}));o(a)}}}),a.a.createElement("h2",null,"add a new "),a.a.createElement(s,{submitPerson:function(e){e.preventDefault();var t={name:d,number:y,id:n.length+1};if(n.map((function(e){return e.name})).includes(d)){var r=n.find((function(e){return e.name===d})),a=r.id,u=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(n,!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},r,{number:y});if(r.number===y)C("".concat(d," is already added to phonebook")),setTimeout((function(){C(null)}),5e3);else window.confirm("".concat(d," is already added to phonebook, replace the old number with new one?"))&&E(a,u).then((function(e){o(n.map((function(t){return t.id!==a?t:e}))),A("Changed ".concat(r.name,"'s number")),setTimeout((function(){A(null)}),5e3)})).catch((function(e){C("Information of ".concat(r.name," was already removed from server")),setTimeout((function(){C(null)}),5e3),o(n.filter((function(e){return e.id!==a})))}))}else v(t).then((function(e){o(n.concat(e)),A("Added ".concat(d," to the phonebook")),setTimeout((function(){A(null)}),5e3)})).catch((function(e){console.log(e.response),C(e.response.data),setTimeout((function(){C(null)}),5e3)}));b(""),k("")},addName:function(e){b(e.target.value)},addNumber:function(e){k(e.target.value)},name:d,number:y}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(m,{persons:n,removeNumber:function(e){var t=n.filter((function(t){return t.id===e}))[0].name;window.confirm("Are you sure about deleting ".concat(t," ?"))&&O(e).then((function(t){o(n.filter((function(t){return t.id!==e})))}))}}))};u.a.render(a.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.3fbf05da.chunk.js.map