(window.webpackJsonp=window.webpackJsonp||[]).push([[6,16],{290:function(e,n,a){var l=a(339);"string"==typeof l&&(l=[[e.i,l,""]]);var t=a(320)(l,{hmr:!0,transform:void 0,insertInto:void 0});l.locals&&(e.exports=l.locals),e.hot.accept(339,function(){var n=a(339);if("string"==typeof n&&(n=[[e.i,n,""]]),!function(e,n){var a,l=0;for(a in e){if(!n||e[a]!==n[a])return!1;l++}for(a in n)l--;return 0===l}(l.locals,n.locals))throw new Error("Aborting CSS HMR due to changed css-modules locals.");t(n)}),e.hot.dispose(function(){t()})},310:function(e,n,a){"use strict";a.r(n);var l=a(312),t=a.n(l),r=a(313),i=a.n(r),o=a(314),c=a.n(o),s=a(315),p=a.n(s),h=a(316),d=a.n(h),m=a(57),u=a.n(m),_=a(20),b=a.n(_),f=a(381),g=a(325),x=a(349),E=(a(290),function(e){return b.a.createElement("div",null,b.a.createElement(g.a,{name:"toolif"}))}),w=function(e){return b.a.createElement("p",null,"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, esse id vel sed tenetur sit eius molestias deserunt vero laudantium dolores, accusamus, provident perferendis quam. Praesentium fugiat exercitationem libero deserunt.")},v=function(e){return b.a.createElement("div",null,"個人自由行",b.a.createElement(x.a,{CustomComponent:b.a.createElement(E,null),ContentComponent:b.a.createElement(w,null),events:["click"],position:["bottom","horizon_center"]}))},k=function(e){return b.a.createElement("div",null,"團體自由行",b.a.createElement(x.a,{CustomComponent:b.a.createElement(E,null),ContentComponent:b.a.createElement(w,null),events:["click"],position:["bottom","horizon_center"]}))},P=function(e){return e.error?b.a.createElement("div",null,"Error!"):e.pastDelay?b.a.createElement("div",null,"Loading..."):null},y=function(e,n){var a=u()({loader:function(){return e},loading:P});return b.a.createElement(a,{hrefTarget:n})},C=function(e){function n(e){var a;return t()(this,n),(a=c()(this,p()(n).call(this,e))).state={show:0},a}return d()(n,e),i()(n,[{key:"render",value:function(){var e=this,n=this.state.show,l=this.props.hrefTarget;return b.a.createElement(f.b,{customClass:"search_panel_one search_panel_all_pc",onClick:function(n){return e.setState({show:n})}},b.a.createElement(f.a,{label:"團體"},0===n&&y(Promise.all([a.e(1),a.e(0),a.e(22)]).then(a.bind(null,296)),l)),b.a.createElement(f.a,{label:"機票"},1===n&&y(Promise.all([a.e(1),a.e(0),a.e(9)]).then(a.bind(null,622)),l)),b.a.createElement(f.a,{label:"訂房"},2===n&&y(Promise.all([a.e(1),a.e(0),a.e(13)]).then(a.bind(null,301)),l)),b.a.createElement(f.a,{label:"自由行"},b.a.createElement(f.b,{customClass:"search_panel_two",onClick:function(n){return e.setState({show:30+n})}},b.a.createElement(f.a,{label:"國外"},b.a.createElement(f.b,{activeTabIndex:0,customClass:"search_panel_three"},b.a.createElement(f.a,{label:b.a.createElement(v,null)},(3===n||30===n)&&y(Promise.all([a.e(1),a.e(0),a.e(15)]).then(a.bind(null,293)),l)),b.a.createElement(f.a,{label:b.a.createElement(k,null)},(3===n||30===n)&&y(Promise.all([a.e(1),a.e(0),a.e(11)]).then(a.bind(null,297)),l)))),b.a.createElement(f.a,{label:"國內"},31===n&&y(Promise.all([a.e(1),a.e(0),a.e(18)]).then(a.bind(null,304)),l)))),b.a.createElement(f.a,{label:"主題旅遊"},4===n&&y(Promise.all([a.e(1),a.e(0),a.e(20)]).then(a.bind(null,302)),l)),b.a.createElement(f.a,{label:b.a.createElement("span",null,b.a.createElement("span",{className:"search_panel-block"},"票券"),"當地遊")},5===n&&y(Promise.all([a.e(1),a.e(0),a.e(4)]).then(a.bind(null,306)),l)))}}]),n}(_.Component);n.default=C},339:function(e,n,a){(e.exports=a(319)(!1)).push([e.i,'@charset "UTF-8";\nbody {\n  font-family: "\\5FAE\\8EDF\\6B63\\9ED1\\9AD4", "Microsoft JhengHei", "\\5FAE\\8EDF\\96C5\\9ED1\\9AD4", "Microsoft YaHei"; }\n\n.search_panel-singlePanel {\n  position: relative;\n  display: block;\n  min-height: 410px;\n  padding: 10px 10px 10px 15px;\n  box-shadow: 0 0 8px 0 rgba(68, 68, 68, 0.3), 0 0 8px 0 rgba(0, 0, 0, 0.25); }\n  .search_panel-singlePanel:before, .search_panel-singlePanel:after {\n    content: \'\';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 5px; }\n  .search_panel-singlePanel:before {\n    height: 60px;\n    background-color: #e10500;\n    z-index: 1; }\n  .search_panel-singlePanel:after {\n    height: 100%;\n    background-color: #444; }\n  .search_panel-singlePanel.search_panel-m {\n    width: 100%;\n    box-shadow: none; }\n    .search_panel-singlePanel.search_panel-m:before, .search_panel-singlePanel.search_panel-m:after {\n      display: none; }\n  .search_panel-singlePanel.search_panel-pc {\n    display: inline-flex; }\n\n.search_panel_all_mobile.search_panel_one > .tabs {\n  left: 0;\n  top: 0;\n  display: flex;\n  width: 100%;\n  z-index: 3;\n  border: 0;\n  background-color: #666; }\n  .search_panel_all_mobile.search_panel_one > .tabs > li {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    margin: 0;\n    color: #fff;\n    border: 0; }\n    .search_panel_all_mobile.search_panel_one > .tabs > li.active {\n      width: 100%;\n      color: #e10500;\n      background-color: #fff;\n      border: 0; }\n\n.search_panel_all_mobile.search_panel_one .ctns {\n  width: 100%; }\n  .search_panel_all_mobile.search_panel_one .ctns .panel {\n    padding: 15px; }\n\n.search_panel_all_mobile.search_panel_one .search_panel_two > .tabs > li.active {\n  min-width: 116px; }\n\n.search_panel-mobileHead {\n  padding: 10px 15px;\n  background-color: #e10500; }\n  .search_panel-mobileHead_cnt {\n    position: relative;\n    text-align: center;\n    font-size: 16px;\n    color: #fff; }\n  .search_panel-mobileHead p {\n    margin: 0; }\n  .search_panel-mobileHead_close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 16px;\n    height: 16px;\n    fill: #fff;\n    cursor: pointer; }\n\n.search_panel_all_pc {\n  display: inline-flex;\n  min-width: 470px;\n  min-height: 410px;\n  box-shadow: 0 5px 10px #666; }\n  .search_panel_all_pc > .tabs {\n    flex: 0 0 80px;\n    flex-direction: column;\n    min-height: inherit;\n    background-color: #41454c;\n    border-bottom: 0; }\n    .search_panel_all_pc > .tabs li {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 80px;\n      margin: 0;\n      padding: 0;\n      border-bottom: 0;\n      border-left: 5px solid transparent; }\n    .search_panel_all_pc > .tabs li.active {\n      background-color: #fff;\n      border-left: 5px solid #e10500; }\n  .search_panel_all_pc .ctns {\n    display: flex;\n    width: 100%; }\n    .search_panel_all_pc .ctns > .panel {\n      width: 100%;\n      padding: 10px; }\n  .search_panel_all_pc .search_panel_two > .tabs > li.active {\n    min-width: 96px; }\n    @media (min-width: 980px) {\n      .search_panel_all_pc .search_panel_two > .tabs > li.active {\n        min-width: 116px; } }\n\n.search_panel-block {\n  display: block; }\n',""])}}]);