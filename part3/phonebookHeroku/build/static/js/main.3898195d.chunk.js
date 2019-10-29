(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(13),u=t.n(o),c=(t(20),t(14)),i=t(2),l=function(e){var n=e.text,t=e.id,r=e.handleDelete;return a.a.createElement("button",{onClick:function(){return r(t)}},n)},m=function(e){var n=e.persons,t=e.removeNumber;return n.map((function(e){return a.a.createElement("p",{key:e.id},e.name," ",e.number," ",a.a.createElement(l,{text:"delete",id:e.id,handleDelete:t}))}))},s=function(e){var n=e.search;return a.a.createElement("div",null,"filter shown with : ",a.a.createElement("input",{onChange:n}))},f=function(e){var n=e.name,t=e.number,r=e.submitPerson,o=e.addName,u=e.addNumber;return a.a.createElement("form",{onSubmit:r},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:n,onChange:o})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:t,onChange:u})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},d=t(3),b=t.n(d),h="/api/persons",p=function(){return b.a.get(h).then((function(e){return e.data}))},v=function(e){return b.a.post(h,e).then((function(e){return e.data}))},g=function(e,n){return b.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},O=function(e){return b.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},E=function(e){var n=e.message,t=e.error;return null===n&&null!==t?a.a.createElement("div",{className:"error"},t):null!==n&&null===t?a.a.createElement("div",{className:"notification"},n):null};function w(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}var j=function(){var e=Object(r.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],u=Object(r.useState)(""),l=Object(i.a)(u,2),d=l[0],b=l[1],h=Object(r.useState)(""),j=Object(i.a)(h,2),y=j[0],k=j[1],P=Object(r.useState)(null),N=Object(i.a)(P,2),S=N[0],C=N[1],D=Object(r.useState)(null),T=Object(i.a)(D,2),x=T[0],I=T[1];Object(r.useEffect)((function(){p().then((function(e){o(e)}))}),[]);return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(E,{message:x,error:S}),a.a.createElement(s,{search:function(e){var n=t.slice();if(""===e.target.value)p().then((function(e){o(e)}));else{var r=e.target.value,a=n.filter((function(e){return e.name.toLowerCase().startsWith(r.toLowerCase())}));o(a)}}}),a.a.createElement("h2",null,"add a new "),a.a.createElement(f,{submitPerson:function(e){e.preventDefault();var n={name:d,number:y,id:t.length+1};if(-1!==t.map((function(e){return e.name})).findIndex(d)){var r=t.find((function(e){return e.name===d})),a=r.id,u=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?w(t,!0).forEach((function(n){Object(c.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):w(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},r,{number:y});if(console.log("new number ",y),console.log("person to change number ",r.number),console.log("new name ",d),console.log("person to change name ",r.name),r.number===y)C("".concat(d," is already added to phonebook")),setTimeout((function(){C(null)}),5e3);else window.confirm("".concat(d," is already added to phonebook, replace the old number with new one?"))&&g(a,u).then((function(e){o(t.map((function(n){return n.id!==a?n:e}))),I("Changed ".concat(r.name,"'s number")),setTimeout((function(){I(null)}),5e3)})).catch((function(e){C("Information of ".concat(r.name," was already removed from server")),setTimeout((function(){C(null)}),5e3),o(t.filter((function(e){return e.id!==a})))}))}else v(n).then((function(e){o(t.concat(e)),I("Added ".concat(d," to the phonebook")),setTimeout((function(){I(null)}),5e3)})).catch((function(e){console.log(JSON.stringify(e.response)),console.log("Make sure 'name' has 3 or more characters and 'number' has 8 or more digits."),C(e.response.data.error),setTimeout((function(){C(null)}),5e3)}));b(""),k("")},addName:function(e){b(e.target.value)},addNumber:function(e){k(e.target.value)},name:d,number:y}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(m,{persons:t,removeNumber:function(e){var n=t.filter((function(n){return n.id===e}))[0].name;window.confirm("Are you sure about deleting ".concat(n," ?"))&&O(e).then((function(n){o(t.filter((function(n){return n.id!==e})))}))}}))};u.a.render(a.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.3898195d.chunk.js.map