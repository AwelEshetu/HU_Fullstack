(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(13),c=t.n(o),u=(t(20),t(14)),i=t(2),l=function(e){var n=e.text,t=e.id,r=e.handleDelete;return a.a.createElement("button",{onClick:function(){return r(t)}},n)},s=function(e){var n=e.persons,t=e.removeNumber;return n.map((function(e){return a.a.createElement("p",{key:e.id},e.name," ",e.number," ",a.a.createElement(l,{text:"delete",id:e.id,handleDelete:t}))}))},m=function(e){var n=e.search;return a.a.createElement("div",null,"filter shown with : ",a.a.createElement("input",{onChange:n}))},f=function(e){var n=e.name,t=e.number,r=e.submitPerson,o=e.addName,c=e.addNumber;return a.a.createElement("form",{onSubmit:r},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:n,onChange:o})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:t,onChange:c})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},d=t(3),b=t.n(d),p="/api/persons",h=function(){return b.a.get(p).then((function(e){return e.data}))},v=function(e){return b.a.post(p,e).then((function(e){return e.data}))},O=function(e,n){return b.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return b.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},g=function(e){var n=e.message,t=e.error;return null===n&&null!==t?a.a.createElement("div",{className:"error"},t):null!==n&&null===t?a.a.createElement("div",{className:"notification"},n):null};function j(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}var w=function(){var e=Object(r.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],c=Object(r.useState)(""),l=Object(i.a)(c,2),d=l[0],b=l[1],p=Object(r.useState)(""),w=Object(i.a)(p,2),y=w[0],k=w[1],P=Object(r.useState)(null),N=Object(i.a)(P,2),S=N[0],C=N[1],D=Object(r.useState)(null),T=Object(i.a)(D,2),x=T[0],J=T[1];Object(r.useEffect)((function(){h().then((function(e){o(e)}))}),[]);return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(g,{message:x,error:S}),a.a.createElement(m,{search:function(e){var n=t.slice();if(""===e.target.value)h().then((function(e){o(e)}));else{var r=e.target.value,a=n.filter((function(e){return e.name.toLowerCase().startsWith(r.toLowerCase())}));o(a)}}}),a.a.createElement("h2",null,"add a new "),a.a.createElement(f,{submitPerson:function(e){e.preventDefault();var n={name:d,number:y,id:t.length+1};if(t.map((function(e){return e.name})).includes(d)){var r=t.find((function(e){return e.name===d})),a=r.id,c=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?j(t,!0).forEach((function(n){Object(u.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):j(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},r,{number:y});if(r.number===y)C("".concat(d," is already added to phonebook")),setTimeout((function(){C(null)}),5e3);else window.confirm("".concat(d," is already added to phonebook, replace the old number with new one?"))&&O(a,c).then((function(e){o(t.map((function(n){return n.id!==a?n:e}))),J("Changed ".concat(r.name,"'s number")),setTimeout((function(){J(null)}),5e3)})).catch((function(e){C("Information of ".concat(r.name," was already removed from server")),setTimeout((function(){C(null)}),5e3),o(t.filter((function(e){return e.id!==a})))}))}else v(n).then((function(e){o(t.concat(e)),J("Added ".concat(d," to the phonebook")),setTimeout((function(){J(null)}),5e3)})).catch((function(e){console.log(JSON.stringify(e.response)),console.log("".concat(e.response.data.split("<br>")[0].splic(":").slice(1).join(":"))),C("".concat(e.response.data.split("<br>")[0].splic(":").slice(1).join(":"))),setTimeout((function(){C(null)}),5e3)}));b(""),k("")},addName:function(e){b(e.target.value)},addNumber:function(e){k(e.target.value)},name:d,number:y}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(s,{persons:t,removeNumber:function(e){var n=t.filter((function(n){return n.id===e}))[0].name;window.confirm("Are you sure about deleting ".concat(n," ?"))&&E(e).then((function(n){o(t.filter((function(n){return n.id!==e})))}))}}))};c.a.render(a.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.4ad1ee22.chunk.js.map