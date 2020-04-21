var Client=function(t){var e={};function n(a){if(e[a])return e[a].exports;var o=e[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(a,o,function(e){return t[e]}.bind(null,o));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";function a(t){t.preventDefault();const e=document.getElementById("location").value,n=document.getElementById("date").value,a=new Date(document.getElementById("date").value),r=new Date,i=Math.ceil((a-r)/864e5);if(!e||!n||a-r<0)return void alert("Please, fill both fields with valid information");const l=e.split(",").map(t=>t.trim()),c=l.join("+");Client.postData("http://localhost:8081/base",{location:e,dateValue:n,daysLeft:i}).then(()=>{o(n,i,l,c)})}n.r(e);const o=(t,e,n,a)=>{Client.getData(`https://pixabay.com/api/?key=16140205-f71e937433db0a9446e2eb888&q=${a}`).then(o=>{if(0===o.total){const o=n[n.length-1];Client.getData(`https://pixabay.com/api/?key=16140205-f71e937433db0a9446e2eb888&q=${o}`).then(n=>{r(n,t,e,a)})}else r(o,t,e,a)})},r=(t,e,n,a)=>{const o=t.hits[0].webformatURL;Client.postData("http://localhost:8081/pixabay",{imgSrc:o}).then(()=>{i(e,n,a)})},i=(t,e,n)=>{Client.getData(`http://api.geonames.org/postalCodeSearchJSON?placename=${n}&username=snowi`).then(n=>{const a=n.postalCodes[0].lat,o=n.postalCodes[0].lng;e?Client.getData(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${a}&lon=${o}&key=36366b32967f47819d2a36306573bd84`).then(e=>{const n=e.data,a=n.find(e=>e.valid_date===t);let o,r;a?(o=a.temp,r=a.weather.description):(o=n[15].temp,r=n[15].weather.description),l(o,r)}):Client.getData(`https://api.weatherbit.io/v2.0/current?lat=${a}&lon=${o}&key=36366b32967f47819d2a36306573bd84`).then(t=>{const e=t.data[0].temp,n=t.data[0].weather.description;l(e,n)})})},l=(t,e)=>{Client.postData("http://localhost:8081/weatherbit",{temperature:t,description:e}).then(()=>{Client.updateUI()})},c=async(t="",e={})=>{const n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});try{return await n.json()}catch(t){console.log("Error: ",t)}},s=async t=>{const e=await fetch(t);try{return await e.json()}catch(t){console.log("Error: ",t)}},p=async()=>{const t=await fetch("http://localhost:8081/all");try{const e=await t.json(),n=document.getElementById("trips-placeholder");console.log(n);const a=`\n        <article>\n          <div class="image-container">\n            <img src="${e.imgSrc}" alt="image of the trip destination"/>\n            <a\n              class="text-s"\n              href="https://pixabay.com/"\n              target="_blank"\n              rel="noopener"\n            >\n              Pixabay - Free Images\n            </a>\n          </div>\n          <div class="card-content">\n            <p class="text-l">My trip to: ${e.location}</p>\n            <p class="text-l">Departing: ${e.dateValue}</p>\n            <p class="text-m">${e.location} is ${e.daysLeft} day(s) away</p>\n            <div class="weather-container">\n              <p class="text-m">Typical weather for then is:</p>\n              <p class="text-s">Temperature - ${e.temperature}</p>\n              <p class="text-s">${e.description}</p>\n            </div>\n          </div>\n        </article>\n        `;n.innerHTML=a}catch(t){console.log("Error: ",t)}};n(0),n(1);n.d(e,"handleSubmit",function(){return a}),n.d(e,"postData",function(){return c}),n.d(e,"getData",function(){return s}),n.d(e,"updateUI",function(){return p})}]);