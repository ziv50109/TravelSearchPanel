(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{305:function(e,n,t){"use strict";t.r(n);var a=t(318),r=t.n(a),o=t(319),l=t.n(o),i=t(320),c=t.n(i),s=t(321),p=t.n(s),u=t(322),d=t.n(u),m=t(323),h=t.n(m),v=t(324),f=t.n(v),g=t(16),_=t.n(g),b=t(339),T=t.n(b),x=t(326),w=t(331),y=t(348),k=t(341),D=t(334),E=t(338),S=t(332),C=t(346),L=t(356),j=t(363),I=t(342),N=t.n(I),O=t(117),M=t.n(O),R=t(347),P=t(352),z=[{catalogueName:"城市",catafilter:function(e){return e}}],A=function(e){return e.forEach(function(e){"_"===e.vLinewebarea?e.txt="".concat(e.text).concat(e.vLinetravelText):e.txt="".concat(e.text,"-").concat(e.vLinetravelText)}),e},Y=function(e){var n=e.text,t=e.removeData;return _.a.createElement("p",{className:"dtm_rcfr-selected",onClick:t},_.a.createElement("span",{title:n},n),_.a.createElement("i",null,"x"))},W=function(e){function n(e){var t;return r()(this,n),t=c()(this,p()(n).call(this,e)),f()(h()(h()(t)),"_getDataCallBack",function(e){var n=e.vLine,a=e.vLinetravel,r=e.vLinewebarea,o=[],l=function(e,t){for(var l in r[t])r[t].hasOwnProperty(l)&&o.push({vLine:e,vLinetravel:t,vLinewebarea:l,vLineText:n[e],vLinetravelText:a[e][t],text:"".concat(r[t][l]),value:"".concat(e,"-").concat(t,"-").concat(l)})};for(var i in n)if(n.hasOwnProperty(i))for(var c in a[i])a[i].hasOwnProperty(c)&&(o.push({vLine:i,vLinetravel:c,vLinewebarea:"_",vLineText:n[i],vLinetravelText:"_"===c?"全區":"全部",text:"_"===c?n[i]:a[i][c],value:"".concat(i,"-").concat(c,"-_")}),l(i,c));var s=o.filter(function(e){return-1===e.text.indexOf("不限")});t.setState({fetchData:s})}),f()(h()(h()(t)),"emitPushData",function(e){t.props.emitPushData&&t.props.emitPushData(e)}),f()(h()(h()(t)),"handlePushData",function(e){var n=t.state.selectedData;if(n.some(function(n){return e.value===n.value}))t.setState({selectedData:t.changeDestination.remove(e)});else{if(!(n.length<t.props.max))return;t.setState({selectedData:t.changeDestination.add(e)})}}),f()(h()(h()(t)),"changeDestination",{add:function(e){var n=t.state.selectedData,a=t.changeDestination.checkLevel,r=[];if("_"===e.vLinetravel){var o=N()(n).filter(function(n){return n.vLine!==e.vLine});r=[].concat(N()(o),[e])}else if("_"===e.vLinewebarea){var l=N()(n).filter(function(n){return n.vLinetravel!==e.vLinetravel});r=a(e,"vLinetravel","vLine")?[].concat(N()(l),[e]).filter(function(n){return"_"!==n.vLinetravel||n.vLine!==e.vLine}):[].concat(N()(l),[e])}else r=a(e,"vLinetravel","vLine")?[].concat(N()(n),[e]).filter(function(n){return"_"!==n.vLinetravel||n.vLine!==e.vLine}):a(e,"vLinewebarea","vLinetravel")?[].concat(N()(n),[e]).filter(function(n){return"_"!==n.vLinewebarea||n.vLinetravel!==e.vLinetravel}):[].concat(N()(n),[e]);return r},remove:function(e){return t.state.selectedData.filter(function(n){return e.value!==n.value})},checkLevel:function(e,n,a){return t.state.selectedData.some(function(t){return"_"===t[n]&&t[a]===e[a]})}}),f()(h()(h()(t)),"handleOpenMenu",function(){t.setState({showAct:!1,showDtm:!0})}),f()(h()(h()(t)),"handleCloseMenu",function(){t.setState({showAct:!1,showDtm:!1,keyword:""})}),f()(h()(h()(t)),"handleLabelWrapClick",function(){t.searchInput.current.inputDOM.focus()}),t.searchInput=_.a.createRef(),t.state={fetchData:[],keyword:"",showDtm:!0,showAct:!1,selectedData:t.props.selectedData},t}return d()(n,e),l()(n,[{key:"componentDidMount",value:function(){this._getDataCallBack(this.props.travelDataSource)}},{key:"render",value:function(){var e=this,n=this.props,t=n.placeholder,a=n.minimumStringQueryLength,r=n.minimumStringQuery,o=n.noMatchText,l=n.sublabel,i=n.travelDataSource,c=this.state,s=c.fetchData,p=c.keyword,u=c.showAct,d=c.showDtm,m=c.selectedData,h=m.map(function(n){var t;return t="_"===n.vLinewebarea?n.txt||n.text:"".concat(n.text,"-").concat(n.vLinetravelText),_.a.createElement(Y,{key:n.value,text:t,removeData:function(){return e.handlePushData(n)}})}),v=m.map(function(e){return e.value});return _.a.createElement("div",{className:"themeTravel_panel-m_destination"},_.a.createElement("svg",{viewBox:"0 0 10 10",display:"none"},_.a.createElement("path",{id:"dtm_rcfr-x",d:"M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z"})),_.a.createElement("header",{className:"themeTravel_panel-m_header-wrap"},_.a.createElement("h3",{className:"txt-center page_title m-t-sm m-b-sm"},"目的地"),_.a.createElement("div",{className:"dtm_rcfr-row"},_.a.createElement("div",{className:"dtm_rcfr-input-wrap"},_.a.createElement("div",{className:"dtm_rcfr-selected-wrap-m"},h),_.a.createElement(S.a,{ref:this.searchInput,placeholder:m.length?"":t,onFocus:this.handleOpenMenu,value:p,onChange:function(n){n.target.value?e.setState({keyword:n.target.value,showAct:!0,showDtm:!1}):e.setState({keyword:"",showAct:!1,showDtm:!0})},onClearValue:function(){return e.setState({keyword:"",showAct:!1,showDtm:!0})}})),_.a.createElement(E.a,{className:"dtm-btn",md:!0,radius:!0,whenClick:function(){return e.emitPushData(m)}},"確定")),_.a.createElement("p",{className:"dtm_rcfr-label"},l)),_.a.createElement("div",{className:"themeTravel_panel-m_dtm-wrap"},_.a.createElement(P.a,{InputIsFocus:u,url:s,minimumStringQueryLength:a,minimumStringQuery:r,searchKeyWord:p,noMatchText:o,ClassName:!u&&"d-no",footer:!1,theme:"future",closeActcallback:function(n){void 0!==n&&(e.setState({showAct:!1,keyword:""}),e.handlePushData(n)),e.handleOpenMenu()},emitSecondData:function(n){p.length>=a&&0<n.length&&(e.handlePushData(n[0]),e.setState({keyword:"",showAct:!1,showDtm:!0}))},changeKey:A,catalogue:z}),_.a.createElement("div",{className:"dtm_rcfr-wrap ".concat(d?"open":"")},Object.keys(i).length&&_.a.createElement(R.a,{levelKey:["vLine","vLinetravel","vLinewebarea"],orderMaps:{vLine:["_6","_5","_7","_3","_1","_4","_2","_9"]},onClickItem:this.handlePushData,selectedData:v,dataResouce:i}))))}}]),n}(g.PureComponent);f()(W,"defaultProps",{max:3,minimumStringQueryLength:2,autoShowDtm:!1}),f()(W,"propTypes",{fetchPath:M.a.string.isRequired,selectedData:M.a.array.isRequired,max:M.a.number,placeholder:M.a.string,minimumStringQueryLength:M.a.number.isRequired,minimumStringQuery:M.a.string,noMatchText:M.a.string,autoShowDtm:M.a.bool,label:M.a.string,onChange:M.a.func});var B=W,J=t(350),q=t(401),F=(t(343),t(445),function(e){return _.a.createElement("div",{className:"themeTravel-pp_rcln-popup ".concat(e.className)},_.a.createElement("p",null,"本公司「成團」之旅遊團體，係指報名參團人數已達出團標準，但團體出發前若遇有以下情事，將依國外（內）團體旅遊定型化契約書取消出團："),_.a.createElement("ul",null,_.a.createElement("li",null,_.a.createElement("span",null,"一、"),_.a.createElement("p",null,"不可抗力、不可歸責於雙方當事人之事由，如颱 風、海嘯、地震、洪災等不可抗力之天然災害；或罷工、戰亂抗爭、官方封閉旅遊地區、重大疫情等不可歸責之人為因素。")),_.a.createElement("li",null,_.a.createElement("span",null,"二、"),_.a.createElement("p",null,"「成團」之旅遊團體所遊覽地區或國家，經外交部領事事務局或交通部觀光局或其他官方單位列為橙色警示、或紅色警示。"))))}),V=function(e){var n=e.onClick;return _.a.createElement("span",{className:"nvb_rslb_goBack",onClick:n},_.a.createElement(D.a,{name:"toolbefore"}))},G=function(e){function n(e){var t;return r()(this,n),t=c()(this,p()(n).call(this,e)),f()(h()(h()(t)),"objToOption",function(e){var n=[];for(var t in e)e.hasOwnProperty(t)&&n.push({text:e[t],value:t});return n}),f()(h()(h()(t)),"handleSubmit",function(){t.validate(function(e,n){e?window.open("https://travel.liontravel.com/search?"+t.filterAllState(),t.props.hrefTarget):alert(n.join("、"))})}),f()(h()(h()(t)),"validate",function(e){var n=t.state,a=n.destination,r=n.CyRcln1,o=(n.GoDateStart,n.GoDateEnd,[]);a.length<1&&o.push("請輸入 / 選擇目的地"),r.length<2&&o.push("請選擇出發日期"),e(0===o.length,o)}),f()(h()(h()(t)),"filterAllState",function(){var e=t.state,n=e.ThemeID,a=e.DepartureID,r=e.destination,o=e.CyRcln1,l=e.Days,i=e.Keywords,c=e.IsEnsureGroup,s=e.IsSold,p=r.map(function(e){return"_"===e.vLinewebarea&&"_"===e.vLinetravel?"-".concat(e.vLine.split("_").join("-"),","):"_"===e.vLinetravel?"".concat(e.vLine.split("_").join("-"),","):"".concat(e.vLinewebarea.match(/^.(.*)$/)[1]).concat(e.vLinetravel.split("_").join("-"),",")}),u=n.split("_").join(""),d=a.split("_").join(""),m=r.map(function(e){return"".concat(e.text,"-").concat(e.vLinetravelText)});return"Country=TW&WebCode=B2C&TravelType=0&Page=1&PageSize=20&ThemeID=".concat(u,"&DepartureID=").concat(d,"&GoDateStart=").concat(o[0],"&GoDateEnd=").concat(o[1],"&Days=").concat(l,"&IsEnsureGroup=").concat(c,"&IsSold=").concat(s,"&Keywords=").concat(i,"&ArriveID=").concat(p.join(""),"&ArriveTEXT=").concat(m)}),f()(h()(h()(t)),"handleOpenPage",function(e){t.setState({activeInput:e})}),f()(h()(h()(t)),"handleClosePage",function(){t.setState({activeInput:null})}),f()(h()(h()(t)),"handleMultipleClick",function(e){null!=e.current&&e.current.blur()}),f()(h()(h()(t)),"toggleLbxRcln",function(){t.setState(function(e){return{lbxRclnisOpen:!e.lbxRclnisOpen}})}),t.WrapperDtmRclnMax=3,t.fetchPath=w.f.place,t.date=new Date,t.year=t.date.getFullYear(),t.month=t.date.getMonth()+1,t.day=t.date.getDate(),t.today="".concat(t.year,"-").concat(t.month,"-").concat(t.day),t.defaultStartDate=T()().add(15,"day").format("YYYY-MM-DD"),t.defaultEndtDate=T()().add(30,"day").format("YYYY-MM-DD"),t.state={data:{},ThemeID:"",DepartureID:"",destination:[],CyRcln1:[t.defaultStartDate,t.defaultEndtDate],Days:"",Keywords:"",IsEnsureGroup:!1,IsSold:!1,activeInput:null,themeOptions:[],option1:[],option2:[{text:"不限",value:""},{text:"1~5天",value:"1,2,3,4,5"},{text:"6~10天",value:"6,7,8,9,10"},{text:"10天以上",value:"10"}],lbxRclnisOpen:!1},t}return d()(n,e),l()(n,[{key:"componentDidMount",value:function(){var e=this,n=sessionStorage.getItem(this.fetchPath);if(n&&Object(x.f)(n)){var t=JSON.parse(n);this.setState({data:t,themeOptions:this.objToOption(t.vPsubject),option1:this.objToOption(t.vCity)})}else Object(x.c)(this.fetchPath,function(n){var t=JSON.stringify(n);e.setState({data:n,themeOptions:e.objToOption(n.vPsubject),option1:e.objToOption(n.vCity)}),sessionStorage.setItem(e.fetchPath,t)})}},{key:"shouldComponentUpdate",value:function(e,n){return this.state!==n}},{key:"submitBtn",value:function(){}},{key:"render",value:function(){var e=this,n=this.state,t=n.data,a=n.activeInput,r=n.ThemeID,o=n.DepartureID,l=n.destination,i=n.CyRcln1,c=n.Days,s=n.Keywords,p=n.IsEnsureGroup,u=n.IsSold,d=n.themeOptions,m=n.option1,h=n.option2,v=n.lbxRclnisOpen,f=0===a||1===a,g=2===a,b=f||g,x=l.map(function(e){return"_"===e.vLinewebarea?e.txt||e.text:"".concat(e.text,"-").concat(e.vLinetravelText)});return _.a.createElement("div",{className:"themeTravel mobile"},_.a.createElement(k.a,{option:d,placeholder:"請選擇",label:"旅遊主題",icon:_.a.createElement(D.a,{name:"productrefer"}),defaultValue:r||"_",ClassName:"strcln_custom m-b-sm",req:!0,breakline:!0,onChangeCallBack:function(n){return e.setState({ThemeID:n})}}),_.a.createElement(k.a,{option:m,placeholder:"請選擇",label:"出發地",icon:_.a.createElement(D.a,{name:"toolmap"}),defaultValue:o||"_",ClassName:"strcln_custom m-b-sm",req:!0,breakline:!0,onChangeCallBack:function(n){return e.setState({DepartureID:n})}}),_.a.createElement(J.a,{isRequired:!0,label:"目的地",iconName:"toolmap",onClick:function(){return e.handleOpenPage(2)},subComponent:_.a.createElement("div",{className:"m-dtm_wrap",onClick:function(){return e.handleOpenPage(2)}},_.a.createElement(q.a,{maxLength:this.WrapperDtmRclnMax,placeholder:l.length?"":"請選擇/可輸入目的地、景點",query:x,onClick:this.handleMultipleClick}))}),_.a.createElement("div",{className:"input_group calendar_compose"},_.a.createElement(S.a,{request:!0,readOnly:!0,placeholder:"YYYY/MM/DD",label:"出發日期",icon:_.a.createElement(D.a,{name:"tooldate"}),onClick:function(){return e.handleOpenPage(0)},value:i[0]&&i[0].replace(/\-/g,"/")}),_.a.createElement("span",{className:"cal_icon"},"~"),_.a.createElement(S.a,{readOnly:!0,placeholder:"YYYY/MM/DD",onClick:function(){return e.handleOpenPage(1)},value:i[1]&&i[1].replace(/\-/g,"/")})),_.a.createElement(k.a,{option:h,placeholder:"請選擇",label:"旅遊天數",icon:_.a.createElement(D.a,{name:"tooldate"}),defaultValue:c||"",ClassName:"strcln_custom m-b-sm",breakline:!0,onChangeCallBack:function(n){return e.setState({Days:n})}}),_.a.createElement("div",{className:"intRclnWrap"},_.a.createElement(S.a,{placeholder:"可輸入團號",label:"產品名/關鍵字",className:"m-b-sm",value:s,breakline:!0,onChange:function(n,t){e.setState({Keywords:t})},onClearValue:function(n){n.value="",e.setState({Keywords:""})}})),_.a.createElement(C.a,{type:"checkbox",textContent:"只找成團",className:"d-ib",checked:p,whenChange:function(n){return e.setState({IsEnsureGroup:n})}}),_.a.createElement(D.a,{name:"toolif",size:"x1",className:"pp_rcln m-l-xs m-r-md",onClick:this.toggleLbxRcln}),_.a.createElement(j.a,{open:v,closeLbxRcln:this.toggleLbxRcln},_.a.createElement(F,{className:"lbx_wrap"})),_.a.createElement(C.a,{type:"checkbox",textContent:"只找可報名團體",className:"d-ib m-l-xl",checked:u,whenChange:function(n){return e.setState({IsSold:n})}}),_.a.createElement(E.a,{prop:"string",className:"h-sm fluid m-t-30",whenClick:this.handleSubmit,md:!0,radius:!0},"搜尋"),_.a.createElement(y.a,{className:"themeTravel-nvb",visible:b,direction:"right"},_.a.createElement(V,{onClick:this.handleClosePage}),g&&_.a.createElement(B,{travelDataSource:t,fetchPath:this.fetchPath,selectedData:l,max:this.WrapperDtmRclnMax,placeholder:"請選擇/可輸入目的地、景點",minimumStringQueryLength:2,minimumStringQuery:"請輸入至少兩個文字",noMatchText:"很抱歉，找不到符合的項目",sublabel:"找不到選項?請輸入關鍵字查詢 / 最多可選擇3則目的地",parentData:l,emitPushData:function(n){e.setState({destination:n,activeInput:null})}}),f&&_.a.createElement("div",{className:"themeTravel-cyRcmnWrap"},_.a.createElement(L.a,{doubleChoose:!0,selectedStartDate:i[0],selectedEndDate:i[1],startLabelTitle:"最早出發日",endLabelTitle:"最晚出發日",startTxt:"最早",endTxt:"最晚",activeInput:a,endMonth:T()().add(3,"years").format("YYYY-MM"),ref:function(n){e.calendar=n},onClickConfirm:function(){var n=e.calendar.state,t=n.selectedStartDate,a=n.selectedEndDate;e.setState({CyRcln1:[t,a],activeInput:null})},customDiffTxt:function(e){return"共"+(e+1)+"天"}}))))}}]),n}(g.Component);t.d(n,"default",function(){return G})},317:function(e,n,t){"use strict";t.d(n,"b",function(){return o}),t.d(n,"g",function(){return l}),t.d(n,"d",function(){return i}),t.d(n,"c",function(){return c}),t.d(n,"e",function(){return s}),t.d(n,"f",function(){return p}),t.d(n,"a",function(){return u});var a=t(336),r=t.n(a);function o(e,n){fetch(e,{method:"GET"}).then(function(e){return e.text()}).then(function(e){var n=e.replace(/\r?\n|\r/g,"").replace(/(?:var|let|const)\s(\w+)\s=/g,'"$1":').replace(/;/g,",").replace(/,$/g,"").replace(/'/g,'"');return JSON.parse("{"+n+"}")}).then(function(e){n(e)})}function l(e){var n=e,t="",a=Object.keys(n).length,r=0;for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t+=a<=++r?o+"="+n[o]:o+"="+n[o]+"&");return t}function i(e){var n=e.split("-"),t=r()(n,2),a=t[0],o=t[1];return[a=Number(a),o=Number(o)]}function c(){return new Date((new Date).getFullYear(),(new Date).getMonth(),1,8).toISOString().slice(0,7)}function s(e){try{JSON.parse(e)}catch(e){return!1}return!0}function p(e){var n=/^(\d{4})[\-\/]?(\d{2})[\-\/]?(\d{2})$/;if(!n.test(e))return!1;var t=e.match(n),a=parseInt(t[1],10),r=parseInt(t[2],10),o=parseInt(t[3],10),l=[31,28,31,30,31,30,31,31,30,31,30,31];return(a%400==0||a%100!=0&&a%4==0)&&(l[1]=29),o<=l[r-1]}var u={fetchJsToObj:o,findHighestZIndex:function(e){for(var n=document.getElementsByTagName(e),t=0,a=0;a<n.length;a++){var r=document.defaultView.getComputedStyle(n[a],null).getPropertyValue("z-index");t<r&&"auto"!==r&&(t=r)}return parseInt(t,10)},getDomPosition:function(e,n){return"top"===n?e.getBoundingClientRect()[n]+window.pageYOffset:e.getBoundingClientRect()[n]},toQueryString:l,getYearAndMonth:i,getNowMonth:c,addDate:function(e,n){var t=function(e){return e<10?"0"+e:String(e)},a=new Date(e).getTime(),r=new Date(a+864e5*n),o=t(r.getFullYear()),l=t(r.getMonth()+1),i=t(r.getDate());return[o+l+i,o,l,i]},isJsonString:s,isLeapYear:p}},326:function(e,n,t){"use strict";var a=t(317),r=t(330),o=t(325),l=t.n(o),i=t(333),c=t.n(i),s=t(318),p=t.n(s),u=t(319),d=t.n(u),m=t(320),h=t.n(m),v=t(321),f=t.n(v),g=t(322),_=t.n(g),b=t(323),T=t.n(b),x=t(324),w=t.n(x),y=t(16),k=t.n(y),D=t(117),E=t.n(D),S=function(e){function n(e){var t;return p()(this,n),t=h()(this,f()(n).call(this,e)),w()(T()(T()(t)),"handle",function(e){if(t.isClickInSide)t.isClickInSide=!1;else if("touchend"===e.type&&(t.isTouch=!0),"click"!==e.type||!t.isTouch){var n=t.props.onClickOutside;!1===t.isUnMounted&&n(e)}}),w()(T()(T()(t)),"handleClick",function(){t.isClickInSide=!0}),t.isTouch=!1,t.isClickInSide=!1,t.isUnMounted=!1,t}return _()(n,e),d()(n,[{key:"componentDidMount",value:function(){document.addEventListener("touchend",this.handle,!1),document.addEventListener("click",this.handle,!1)}},{key:"componentWillUnmount",value:function(){this.isUnMounted=!0,document.removeEventListener("touchend",this.handle,!1),document.removeEventListener("click",this.handle,!1)}},{key:"render",value:function(){var e=this.props,n=e.children,t=(e.onClickOutside,c()(e,["children","onClickOutside"]));return k.a.createElement("div",l()({},t,{onClick:this.handleClick}),n)}}]),n}(y.Component);w()(S,"propTypes",{onClickOutside:E.a.func.isRequired});var C=t(329);t.d(n,"b",function(){return a.a}),t.d(n,"c",function(){return a.b}),t.d(n,"h",function(){return a.g}),t.d(n,"e",function(){return a.d}),t.d(n,"d",function(){return a.c}),t.d(n,"f",function(){return a.e}),t.d(n,"g",function(){return a.f}),t.d(n,"a",function(){return r.a}),t.d(n,"i",function(){return C.a})},329:function(e,n,t){"use strict";var a=t(325),r=t.n(a);n.a=function(e,n){var t=e.panel,a=e.methods,o=e.data,l=t+"_queryKey",i=localStorage.getItem(l),c=JSON.parse(i);if(["travel","internationalFlight","chineseFlight","taiwanFlight","hotel","personalVacation","groupVacation","taiwanVacation","themeTravel","cruise","highSpeedRail","activity"].indexOf(t)<0)throw"'".concat(t,"' is not a panel name.");var s=function(){var e=r()({},c);if(Array.isArray(o)){o.forEach(function(n){return delete e[n]});var t=JSON.stringify(e);localStorage.setItem(l,t),"function"==typeof n&&n(e)}else localStorage.removeItem(l)};switch(a){case"get":!function(){if(i&&function(e){try{JSON.parse(e)}catch(e){return!1}return!0}(i)){var e=JSON.parse(i);"function"==typeof n&&n(e)}else s()}();break;case"post":!function(){var e=r()({},c,o),t=JSON.stringify(e);if(!t)throw"Data: '".concat(o,"' can't stringify.");localStorage.setItem(l,t),"function"==typeof n&&n(e)}();break;case"delete":s();break;default:throw"'".concat(a,"' is undefined. You can use 'get', 'post', 'delete'.")}}},330:function(e,n,t){"use strict";t.d(n,"a",function(){return S});var a=t(325),r=t.n(a),o=t(333),l=t.n(o),i=t(318),c=t.n(i),s=t(319),p=t.n(s),u=t(320),d=t.n(u),m=t(321),h=t.n(m),v=t(322),f=t.n(v),g=t(323),_=t.n(g),b=t(324),T=t.n(b),x=t(16),w=t.n(x),y=t(57),k=t.n(y),D=t(117),E=t.n(D),S=function(e){function n(e){var t;return c()(this,n),t=d()(this,h()(n).call(this,e)),T()(_()(_()(t)),"handle",function(e){if(!t.__domNode.contains(e.target)){var n=t.props.onClickOutside;"function"==typeof n&&n(e)}}),t.isTouch=!1,t.isClickInSide=!1,t.isUnMounted=!1,t.__domNode=null,t.__wrappedInstance=null,t}return f()(n,e),p()(n,[{key:"componentDidMount",value:function(){document.addEventListener("click",this.handle,!0)}},{key:"componentWillUnmount",value:function(){this.isUnMounted=!0,document.removeEventListener("click",this.handle,!0)}},{key:"render",value:function(){var e=this,n=this.props,t=n.children,a=(n.onClickOutside,l()(n,["children","onClickOutside"]));return w.a.createElement("div",r()({},a,{ref:function(n){e.__domNode=k.a.findDOMNode(n),e.__wrappedInstance=n}}),t)}}]),n}(x.Component);T()(S,"propTypes",{onClickOutside:E.a.func.isRequired})},331:function(e,n,t){"use strict";t.d(n,"g",function(){return r}),t.d(n,"c",function(){return o}),t.d(n,"b",function(){return l}),t.d(n,"d",function(){return i}),t.d(n,"e",function(){return c}),t.d(n,"i",function(){return s}),t.d(n,"h",function(){return p}),t.d(n,"j",function(){return u}),t.d(n,"k",function(){return d}),t.d(n,"f",function(){return m}),t.d(n,"a",function(){return h}),t(344);var a,r=(a={travel:{place:"./json/TRS1NEWTRAVEL.js"},"flight.international":{place:"./json/flightsInternationalDestinationCsutomMenu.js",placeAutoComplete:"./json/getarraytkt6.js",filter:"./json/country.json"},"flight.chinese":{place:"./json/GetArrayTkt5.js"},"flight.taiwan":{place:"./json/twflightdest.json"},hotel:{destination:"./json/hotelMenu.json",destinationAutoComplete:"https://hotel.liontravel.com/search/keyword"},"vacation.personal":{departure:"./json/vacationDeparture.json",destination:"./json/vacationdata.json",destinationAutoComplete:"https://vacation.liontravel.com/ajax/getdestination",keyword:"https://vacation.liontravel.com/search/keyword"},"vacation.group":{place:"./json/TRS1NEWTRAVELFIT.js"},"vacation.taiwan":{destination:"./json/freeTaiwan.js",keyword:"./json/gethotelnamelist.json"},"vacation.taiwan.search":{departure:"./json/departurelocaltw.json",destinationS:"./json/destinationlocalTW_S.json",destination:"./json/destinationlocalTW.json",traffic:"./json/traffic.json"},themeTravel:{place:"./json/TRS1PSUBJECT.js"},activity:{ticketAbroad:"./json/abroad.json",ticketTaiwan:"./json/home.json",keyword:"https://hotel.liontravel.com/search/keyword"}}).travel,o=a["flight.international"],l=a["flight.chinese"],i=a["flight.taiwan"],c=a.hotel,s=a["vacation.personal"],p=a["vacation.group"],u=a["vacation.taiwan"],d=a["vacation.taiwan.search"],m=a.themeTravel,h=a.activity},335:function(e,n,t){(e.exports=t(327)(!1)).push([e.i,".input_group {\n  display: flex;\n  margin-bottom: 10px;\n  border: 1px solid #ddd;\n  cursor: default; }\n  .input_group label {\n    cursor: pointer; }\n  .input_group .int_rcln .int_rcln_input {\n    color: #0077b3;\n    font-weight: bold;\n    border: none;\n    background-color: transparent; }\n    .input_group .int_rcln .int_rcln_input:focus {\n      border-color: #ddd; }\n  .input_group .int_rcln:last-of-type {\n    height: 50px; }\n    .input_group .int_rcln:last-of-type .int_rcln_input {\n      padding-top: 26px; }\n  .input_group .cal_icon {\n    color: #999;\n    display: inline-flex;\n    align-items: center; }\n  .input_group > div {\n    flex: 1; }\n  .input_group .vacation_select_group {\n    padding: 6px 0; }\n    .input_group .vacation_select_group > label,\n    .input_group .vacation_select_group > select {\n      padding: 0 6px;\n      line-height: 1;\n      background-color: #fff; }\n    .input_group .vacation_select_group > label {\n      display: block;\n      color: #aaa;\n      margin: 0;\n      font-size: 16px; }\n      .input_group .vacation_select_group > label.request:after {\n        content: '*';\n        display: inline-block;\n        color: #e10500;\n        vertical-align: middle;\n        line-height: 1;\n        margin-top: 4px; }\n    .input_group .vacation_select_group > select {\n      border: none;\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      width: 100%;\n      font-size: 16px;\n      color: #0077b3;\n      font-weight: bold; }\n",""])},343:function(e,n,t){var a=t(335);"string"==typeof a&&(a=[[e.i,a,""]]);var r=t(328)(a,{hmr:!0,transform:void 0,insertInto:void 0});a.locals&&(e.exports=a.locals),e.hot.accept(335,function(){var n=t(335);if("string"==typeof n&&(n=[[e.i,n,""]]),!function(e,n){var t,a=0;for(t in e){if(!n||e[t]!==n[t])return!1;a++}for(t in n)a--;return 0===a}(a.locals,n.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");r(n)}),e.hot.dispose(function(){r()})},354:function(e,n,t){(e.exports=t(327)(!1)).push([e.i,".LbxRcln {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(0, 0, 0, 0.6); }\n  .LbxRcln_content {\n    position: relative;\n    width: 94%;\n    max-width: 330px;\n    min-height: 35px;\n    border-radius: 3px;\n    background-color: #fff; }\n  .LbxRcln_close-btn {\n    position: absolute;\n    top: 0;\n    right: 0;\n    line-height: 1;\n    padding: 10px;\n    cursor: pointer; }\n    .LbxRcln_close-btn svg {\n      width: 13px;\n      height: 13px;\n      fill: #444; }\n",""])},363:function(e,n,t){"use strict";var a=t(16),r=t.n(a),o=t(117),l=t.n(o),i=(t(367),function(e){var n=function(){e.closeLbxRcln&&e.closeLbxRcln()};return r.a.createElement(r.a.Fragment,null,e.children&&e.open&&r.a.createElement("div",{className:"LbxRcln ".concat(e.className),style:{zIndex:function(){for(var e=0,n=0,t=document.getElementsByTagName("*"),a=0;a<t.length;a++)e<(n=Number(window.getComputedStyle(t[a]).zIndex))&&(e=n);return e+1}()},onClick:n},r.a.createElement("div",{className:"LbxRcln_content",onClick:function(n){n.stopPropagation(),e.childrenClick&&e.childrenClick()}},r.a.createElement("span",{className:"LbxRcln_close-btn",onClick:n},r.a.createElement("svg",{viewBox:"0 0 10 10"},r.a.createElement("path",{d:"M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z"}))),e.children)))});i.defaultProps={open:!1},i.propTypes={open:l.a.bool,childrenClick:l.a.func,closeLbxRcln:l.a.func},n.a=i},367:function(e,n,t){var a=t(354);"string"==typeof a&&(a=[[e.i,a,""]]);var r=t(328)(a,{hmr:!0,transform:void 0,insertInto:void 0});a.locals&&(e.exports=a.locals),e.hot.accept(354,function(){var n=t(354);if("string"==typeof n&&(n=[[e.i,n,""]]),!function(e,n){var t,a=0;for(t in e){if(!n||e[t]!==n[t])return!1;a++}for(t in n)a--;return 0===a}(a.locals,n.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");r(n)}),e.hot.dispose(function(){r()})},376:function(e,n,t){(e.exports=t(327)(!1)).push([e.i,".themeTravel > *:not(:last-child) {\n  margin-bottom: 10px;\n  cursor: pointer; }\n\n.themeTravel input {\n  color: #0077b3;\n  font-size: 16px; }\n  .themeTravel input::-webkit-input-placeholder {\n    /* Chrome/Opera/Safari */\n    color: #999; }\n  .themeTravel input::-moz-placeholder {\n    /* Firefox 19+ */\n    color: #999; }\n  .themeTravel input:-ms-input-placeholder {\n    /* IE 10+ */\n    color: #999; }\n  .themeTravel input:-moz-placeholder {\n    /* Firefox 18- */\n    color: #999; }\n\n.themeTravel .floatL {\n  float: left;\n  vertical-align: top;\n  width: calc(50% - 5px); }\n  .themeTravel .floatL.int_rcln {\n    border: 1px solid #bbb; }\n\n.themeTravel .intRclnWrap {\n  border: 1px solid #bbb; }\n  .themeTravel .intRclnWrap .breakline {\n    margin: 0 !important; }\n\n.themeTravel .pp-w {\n  max-width: 360px; }\n\n.themeTravel .m-t-30 {\n  margin-top: 30px; }\n\n.themeTravel .lightgray {\n  color: #999; }\n\n.themeTravel .st_rcln .dropdown-place-holder {\n  font-weight: bold; }\n\n.themeTravel .st_rcln .dropdown-label {\n  font-weight: normal; }\n\n.themeTravel .int_rcln_input {\n  padding-top: 20px !important; }\n\n.themeTravel .int_rcln_input {\n  padding: 0;\n  font-weight: bold;\n  border: none;\n  background: transparent;\n  color: #0077b3; }\n  .themeTravel .int_rcln_input:focus {\n    border-color: #bbb; }\n\n.themeTravel .int_rcln .int_rcln_label {\n  font-size: 14px; }\n\n.themeTravel .int_rcln.breakline .int_rcln_label {\n  cursor: pointer; }\n\n.themeTravel .int_rcln .clearBtn {\n  bottom: 8px; }\n\n.themeTravel .int_rctg {\n  line-height: 1; }\n\n.themeTravel .int_rctg label {\n  text-overflow: clip;\n  cursor: pointer; }\n\n.themeTravel .m-dtm_wrap {\n  position: relative; }\n  .themeTravel .m-dtm_wrap .int_rctg {\n    position: absolute; }\n  .themeTravel .m-dtm_wrap .int-tag {\n    max-width: calc((100% - 10px) / 3); }\n    .themeTravel .m-dtm_wrap .int-tag:last-of-type {\n      margin: 0; }\n    .themeTravel .m-dtm_wrap .int-tag span {\n      text-align: right;\n      right: 0;\n      width: 28px;\n      padding-right: 10px;\n      background-color: #eaeaea;\n      z-index: 1; }\n\n.themeTravel .int-tag {\n  font-size: 16px; }\n\n.themeTravel .st_rcln .ic_rcln {\n  padding-left: 6px; }\n\n.themeTravel .pp_rcln_custom_content .ic_rcln, .themeTravel .pp_rcln.ic_rcln {\n  color: #8894a9;\n  cursor: pointer; }\n\n.themeTravel .st_rcln.action .dropdown-place-holder {\n  border-color: #bbb; }\n\n.themeTravel .st_rcln .dropdown-place-holder.selected {\n  color: #0077b3; }\n\n.themeTravel .st_rcln .dropdown-label {\n  font-size: 14px; }\n\n.themeTravel .cr_rcln {\n  margin-top: 7px;\n  margin-bottom: 0; }\n  .themeTravel .cr_rcln input:focus + .indicator {\n    border-color: #bbb; }\n  .themeTravel .cr_rcln .indicator {\n    border: solid 1px #bbb; }\n\n.themeTravel .pp_rcln {\n  margin-top: 7px;\n  margin-bottom: 0; }\n\n.themeTravel .calendar_compose .int_rcln {\n  height: 48px; }\n  .themeTravel .calendar_compose .int_rcln.breakline .int_rcln_label {\n    left: 30px; }\n  .themeTravel .calendar_compose .int_rcln .int_rcln_input {\n    position: relative; }\n  .themeTravel .calendar_compose .int_rcln .int_rcln_input:not(input):empty::before {\n    color: #999;\n    left: 1px; }\n\n.themeTravel .calendar_compose .ic_rcln {\n  cursor: pointer; }\n\n.themeTravel-pp_rcln-popup {\n  font-size: 14px;\n  color: #222; }\n  .themeTravel-pp_rcln-popup ul {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n  .themeTravel-pp_rcln-popup li {\n    display: flex;\n    margin-top: 10px; }\n  .themeTravel-pp_rcln-popup p, .themeTravel-pp_rcln-popup span {\n    display: inline-block; }\n  .themeTravel-pp_rcln-popup.lbx_wrap {\n    padding: 30px 10px 10px; }\n\n.popup ul {\n  padding: 0; }\n  .popup ul li {\n    list-style: none;\n    display: flex; }\n\n.themeTravel .dtm_rcfr,\n.themeTravel-nvb .dtm_rcfr {\n  position: relative;\n  width: auto;\n  height: auto; }\n  .themeTravel .dtm_rcfr-row,\n  .themeTravel-nvb .dtm_rcfr-row {\n    display: flex;\n    margin: 0 15px; }\n    .themeTravel .dtm_rcfr-row .int_rcln_input,\n    .themeTravel-nvb .dtm_rcfr-row .int_rcln_input {\n      color: #0077b3;\n      border: none; }\n    .themeTravel .dtm_rcfr-row .bt_rcnb,\n    .themeTravel-nvb .dtm_rcfr-row .bt_rcnb {\n      min-width: 50px;\n      margin-left: 10px; }\n  .themeTravel .dtm_rcfr-input-wrap,\n  .themeTravel-nvb .dtm_rcfr-input-wrap {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    padding: 0 0 0 10px;\n    border: 2px solid #ff8b88; }\n  .themeTravel .dtm_rcfr-wrap,\n  .themeTravel-nvb .dtm_rcfr-wrap {\n    display: none;\n    position: static;\n    width: 100%;\n    height: calc(100vh - 130px);\n    overflow: auto;\n    background-color: #fff; }\n    .themeTravel .dtm_rcfr-wrap.open,\n    .themeTravel-nvb .dtm_rcfr-wrap.open {\n      display: block; }\n  .themeTravel .dtm_rcfr-label,\n  .themeTravel-nvb .dtm_rcfr-label {\n    margin: 8px 0 10px 16px;\n    font-size: 14px;\n    color: #24a07d; }\n  .themeTravel .dtm_rcfr-close_btn,\n  .themeTravel-nvb .dtm_rcfr-close_btn {\n    display: none;\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 10px;\n    cursor: pointer; }\n    .themeTravel .dtm_rcfr-close_btn svg,\n    .themeTravel-nvb .dtm_rcfr-close_btn svg {\n      width: 16px;\n      height: 16px; }\n  .themeTravel .dtm_rcfr .ic_rcln,\n  .themeTravel-nvb .dtm_rcfr .ic_rcln {\n    color: #fff; }\n  .themeTravel .dtm_rcfr-selected-wrap,\n  .themeTravel-nvb .dtm_rcfr-selected-wrap {\n    white-space: nowrap; }\n  .themeTravel .dtm_rcfr-selected,\n  .themeTravel-nvb .dtm_rcfr-selected {\n    display: inline-flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 22.13333vw;\n    line-height: 1.3;\n    margin: 0 4px 0 0;\n    padding-left: 4px;\n    font-size: 16px;\n    font-weight: bold;\n    color: #0077b3;\n    background-color: #eaeaea;\n    cursor: pointer; }\n    .themeTravel .dtm_rcfr-selected:last-of-type,\n    .themeTravel-nvb .dtm_rcfr-selected:last-of-type {\n      margin: 0; }\n    .themeTravel .dtm_rcfr-selected span,\n    .themeTravel-nvb .dtm_rcfr-selected span {\n      width: 100%;\n      overflow: hidden;\n      white-space: nowrap; }\n    .themeTravel .dtm_rcfr-selected i,\n    .themeTravel-nvb .dtm_rcfr-selected i {\n      position: relative;\n      top: -1px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 20px;\n      height: 20px;\n      line-height: 1;\n      font-size: 12px;\n      font-style: normal;\n      font-weight: normal;\n      color: #999; }\n    .themeTravel .dtm_rcfr-selected svg,\n    .themeTravel-nvb .dtm_rcfr-selected svg {\n      width: 6px;\n      height: 6px;\n      fill: #999; }\n\n.themeTravel .act_racp,\n.themeTravel-nvb .act_racp {\n  box-shadow: none;\n  outline: none;\n  left: 0;\n  min-width: 100%;\n  height: calc(100vh - 130px);\n  max-height: 100%;\n  margin-top: 40px; }\n  .themeTravel .act_racp-future .m-place .close,\n  .themeTravel .act_racp-future .noMatchText .close,\n  .themeTravel-nvb .act_racp-future .m-place .close,\n  .themeTravel-nvb .act_racp-future .noMatchText .close {\n    display: none; }\n  .themeTravel .act_racp-future .noMatchText,\n  .themeTravel-nvb .act_racp-future .noMatchText {\n    color: #24a07d;\n    padding: 0; }\n  .themeTravel .act_racp .section,\n  .themeTravel-nvb .act_racp .section {\n    max-width: 100%; }\n\n.themeTravel.pc .dtm_rcfr-wrap {\n  width: 690px; }\n\n.themeTravel.pc .dtm_rcfr-row {\n  height: 20px;\n  margin: 0; }\n  .themeTravel.pc .dtm_rcfr-row .clearBtnWrap {\n    top: 24px;\n    right: -10px; }\n  .themeTravel.pc .dtm_rcfr-row .int_rcln {\n    height: auto; }\n    .themeTravel.pc .dtm_rcfr-row .int_rcln .int_rcln_input {\n      padding-top: 0 !important; }\n\n.themeTravel.pc .dtm_rcfr-wrap {\n  position: absolute;\n  top: 100%;\n  left: -1px;\n  width: 690px;\n  height: auto;\n  overflow: visible;\n  padding: 16px 14px 0;\n  border: 1px solid rgba(153, 153, 153, 0.7);\n  z-index: 11; }\n\n.themeTravel.pc .dtm_rcfr-close_btn {\n  display: block; }\n\n.themeTravel.pc .dtm_rcfr-selected {\n  width: auto; }\n  .themeTravel.pc .dtm_rcfr-selected span {\n    width: 82px; }\n  .themeTravel.pc .dtm_rcfr-selected i {\n    top: 0; }\n\n.themeTravel.pc .act_racp {\n  height: auto;\n  max-height: 360px;\n  margin-top: auto;\n  box-shadow: 0 2px 4px 0 rgba(153, 153, 153, 0.7); }\n  .themeTravel.pc .act_racp-future .m-place .close,\n  .themeTravel.pc .act_racp-future .noMatchText .close {\n    display: block; }\n  .themeTravel.pc .act_racp-future .noMatchText {\n    color: #24a07d;\n    padding: 12px 46px 7px 10px; }\n\n.themeTravel.pc .calendar_compose .input_group {\n  margin: 0; }\n\n.themeTravel.pc .calendar_compose .int_rcln_label {\n  cursor: pointer; }\n\n.themeTravel.pc .calendar_compose .input_group .int_rcln {\n  height: 50px !important; }\n  .themeTravel.pc .calendar_compose .input_group .int_rcln .int_rcln_input {\n    line-height: 1;\n    padding-bottom: 0;\n    padding-top: 24px !important;\n    background-color: transparent; }\n\n.themeTravel.pc .calendar_compose .nights {\n  display: none; }\n\n.themeTravel.pc .calendar_compose .clearBtn {\n  bottom: 6px;\n  right: 6px; }\n\n.themeTravel.pc .calendar_compose .cal_icon {\n  padding-top: 22px; }\n\n.themeTravel.pc .cr_rcln .indicator {\n  border: solid 1px #bbb; }\n\n.themeTravel-cyRcmnWrap {\n  height: 100vh; }\n  .themeTravel-cyRcmnWrap .active .today:after {\n    display: none; }\n  .themeTravel-cyRcmnWrap .confirm_btn span {\n    display: none; }\n\n.themeTravel_panel-m_destination {\n  height: 100%;\n  padding-top: 125px; }\n\n.themeTravel_panel-m_header-wrap {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  height: 125px;\n  background-color: #fff;\n  z-index: 1; }\n\n.themeTravel_panel-m_dtm-wrap {\n  touch-action: manipulation;\n  height: 100%;\n  overflow-y: auto;\n  background-color: #fff; }\n  .themeTravel_panel-m_dtm-wrap .act_racp {\n    margin: 0 !important;\n    box-shadow: none !important; }\n    .themeTravel_panel-m_dtm-wrap .act_racp-future .m-place .close,\n    .themeTravel_panel-m_dtm-wrap .act_racp-future .noMatchText .close {\n      display: none !important; }\n    .themeTravel_panel-m_dtm-wrap .act_racp-future .noMatchText {\n      padding: 0; }\n  .themeTravel_panel-m_dtm-wrap .cr_rcln .indicator {\n    border: solid 1px #bbb; }\n\n.themeTravel .st_rcln .dropdown-place-holder, .themeTravel .int_rctg.require, .themeTravel .input_group, .themeTravel .floatL.int_rcln {\n  border: 1px solid #bbb; }\n\n.themeTravel .st_rcln .dropdown-label, .themeTravel .int_rctg .int-col .int-label, .themeTravel .int_rcln > .int_rcln_label {\n  color: #222; }\n\n.themeTravel::-webkit-input-placeholder, .themeTravel::-webkit-input-placeholder, .themeTravel::-moz-placeholder, .themeTravel:-ms-input-placeholder, .themeTravel:-moz-placeholder {\n  font-weight: normal; }\n\n.themeTravel::placeholder, .themeTravel::-webkit-input-placeholder, .themeTravel::-moz-placeholder, .themeTravel:-ms-input-placeholder, .themeTravel:-moz-placeholder {\n  font-weight: normal; }\n\n.themeTravel .int-tags > .int-tag, .themeTravel .st_rcln .dropdown-place-holder.selected, .themeTravel .dtm_rcfr-selected, .themeTravel .input_group .int_rcln .int_rcln_input, .themeTravel .int_rcln_input, .themeTravel-nvb .dtm_rcfr-row .int_rcln_input, .themeTravel-nvb .dtm_rcfr-selected, .themeTravel .dtm_rcfr-row .int_rcln_input {\n  font-weight: normal; }\n",""])},445:function(e,n,t){var a=t(376);"string"==typeof a&&(a=[[e.i,a,""]]);var r=t(328)(a,{hmr:!0,transform:void 0,insertInto:void 0});a.locals&&(e.exports=a.locals),e.hot.accept(376,function(){var n=t(376);if("string"==typeof n&&(n=[[e.i,n,""]]),!function(e,n){var t,a=0;for(t in e){if(!n||e[t]!==n[t])return!1;a++}for(t in n)a--;return 0===a}(a.locals,n.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");r(n)}),e.hot.dispose(function(){r()})}}]);