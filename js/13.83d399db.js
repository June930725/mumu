(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{cc45:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"S_Cart"}},[s("q-page-container",{staticClass:"container"},[s("q-stepper",{ref:"stepper",staticClass:"q-mb-xl",attrs:{animated:"","alternative-labels":"","header-class":"text-bold","done-color":"orange","active-color":"purple","inactive-color":"secondary"},scopedSlots:e._u([{key:"navigation",fn:function(){return[s("q-stepper-navigation",[0===e.share.length?s("q-btn",{attrs:{disable:"",rounded:"",outline:"",label:"下一頁"}}):e._e(),e.step<2&&0!==e.share.length?s("q-btn",{attrs:{rounded:"",outline:"",label:"下一頁"},on:{click:function(t){return e.next()}}}):e._e(),2===e.step?s("q-btn",{staticClass:"q-mr-sm",attrs:{rounded:"",filled:"",label:"上一頁"},on:{click:function(t){return e.$refs.stepper.previous()}}}):e._e(),2===e.step?s("q-btn",{attrs:{rounded:"",outline:"",label:"送出"},on:{click:function(t){return e.submit()}}}):e._e(),3===e.step?s("q-btn",{attrs:{rounded:"",outline:"",label:"完成",to:"/Member"}}):e._e()],1)]},proxy:!0}]),model:{value:e.step,callback:function(t){e.step=t},expression:"step"}},[s("q-step",{attrs:{name:1,title:"我的捐贈",icon:"fa fa-shopping-basket",done:e.step>1}},[s("div",{staticClass:"order01 q-pb-md"},[e._v("捐贈物資")]),s("q-list",{attrs:{bordered:""}},[0===e.share.length?s("q-item",{staticClass:"text-center"},[s("div",{staticClass:"w-100 q-ma-auto q-py-xl"},[s("p",{staticClass:"q-mb-md"},[e._v("您的需求籃目前是空的")]),s("q-btn",{attrs:{to:"/Share",label:"＜ 返回募募分享頁面",outline:"",rounded:""}})],1)]):e._l(e.share,(function(t,a){return s("q-item",{key:a,staticClass:"row",attrs:{clickable:""}},[s("div",{staticClass:"row w-90 justify-around col-12 col-md "},[s("q-item-section",{staticClass:"col-6 col-md-6"},[s("q-img",{attrs:{src:t.src}})],1),s("q-item-section",{staticClass:"col-6 col-md-6 "},[s("q-item-label",[e._v(e._s(t.item))]),s("q-item-label",{attrs:{lines:2,caption:""}},[e._v(e._s(t.requester))])],1)],1),s("div",{staticClass:"row w-90 justify-evenly col-12 col-md "},[s("q-item-section",{staticClass:"col-3 col-md-4"},[s("div",{staticClass:"q-mx-auto"},[e._v(e._s(t.spec))])]),s("q-item-section",{staticClass:"col-5 col-md-4"},[s("q-field",{staticClass:"q-mx-auto ",scopedSlots:e._u([{key:"append",fn:function(){return[s("q-btn",{staticClass:"count_btn",attrs:{flat:"",round:"",dense:"",icon:"remove",disable:t.count<2},on:{click:function(s){return s.stopPropagation(),e.minusShare(t._id)}}}),s("span",{staticClass:"count"},[e._v(e._s(t.count))]),s("q-btn",{staticClass:"count_btn",attrs:{flat:"",round:"",dense:"",icon:"add"},on:{click:function(s){return s.stopPropagation(),e.plusShare(t._id)}}})]},proxy:!0}],null,!0)})],1),s("q-item-section",{staticClass:"col-2 col-md-4"},[s("q-btn",{staticClass:"del q-mx-auto",attrs:{outline:"",rounded:""},on:{click:function(t){return e.delShare(a)}}},[s("i",{staticClass:"fas fa-trash-alt"})])],1)],1)])}))],2)],1),s("q-step",{attrs:{name:2,title:"填寫資料",icon:"fas fa-user-edit",done:e.step>2}},[s("div",{staticClass:"order01 q-pb-md"},[e._v("聯絡資料")]),s("form",[s("q-card-section",{staticClass:"row q-py-lg"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"order02"},[e._v("聯絡資料")])]),s("div",{staticClass:"col-12 col-md-6 q-gutter-y-md"},[!0===e.order.checkbox?s("q-input",{attrs:{rounded:"",outlined:"",required:"",type:"text",label:"捐贈者姓名 *"},model:{value:e.member.name,callback:function(t){e.$set(e.member,"name",t)},expression:"member.name"}}):s("q-input",{staticClass:"q-pb-none",attrs:{rounded:"",outlined:"",required:"",type:"text",label:"捐贈者姓名 *",rules:[function(e){return e&&e.length>0}]},model:{value:e.order.name,callback:function(t){e.$set(e.order,"name",t)},expression:"order.name"}})],1),s("div",{staticClass:"col-12 col-md-6 q-gutter-y-md"},[!0===e.order.checkbox?s("q-input",{attrs:{rounded:"",outlined:"",required:"",type:"text",label:"捐贈者電話 *"},model:{value:e.member.phoneNum,callback:function(t){e.$set(e.member,"phoneNum",t)},expression:"member.phoneNum"}}):s("q-input",{staticClass:"q-pb-none",attrs:{rounded:"",outlined:"",required:"",type:"text",label:"捐贈者電話 *",rules:[function(e){return e&&e.length>0}]},model:{value:e.order.phoneNum,callback:function(t){e.$set(e.order,"phoneNum",t)},expression:"order.phoneNum"}})],1),s("div",{staticClass:"col-12 q-gutter-y-md"},[!0===e.order.checkbox?s("q-input",{attrs:{rounded:"",outlined:"",required:"",type:"text",label:"電子信箱 *"},model:{value:e.member.email,callback:function(t){e.$set(e.member,"email",t)},expression:"member.email"}}):s("q-input",{staticClass:"q-pb-none",attrs:{rounded:"",outlined:"",required:"",type:"text",label:"電子信箱 *",rules:[function(e){return e&&e.length>0}]},model:{value:e.order.email,callback:function(t){e.$set(e.order,"email",t)},expression:"order.email"}})],1),s("div",{staticClass:"col-12 q-gutter-y-md"},[!0===e.order.checkbox?s("q-input",{attrs:{rounded:"",outlined:"",required:"",type:"text",label:"聯絡地址 *"},model:{value:e.member.address,callback:function(t){e.$set(e.member,"address",t)},expression:"member.address"}}):s("q-input",{staticClass:"q-pb-none",attrs:{rounded:"",outlined:"",required:"",type:"text",label:"聯絡地址 *",rules:[function(e){return e&&e.length>0}]},model:{value:e.order.address,callback:function(t){e.$set(e.order,"address",t)},expression:"order.address"}})],1),s("div",{staticClass:"col-12 q-gutter-y-sm q-pl-md"},[s("q-option-group",{attrs:{inline:"",options:e.radios,rules:[function(e){return e&&e.length>0}]},model:{value:e.order.send,callback:function(t){e.$set(e.order,"send",t)},expression:"order.send"}})],1),s("div",{staticClass:"col-12 q-gutter-y-md q-mb-sm"},[s("q-input",{attrs:{rounded:"",outlined:"",required:"",type:"text",label:"捐贈備註 *"},model:{value:e.order.note,callback:function(t){e.$set(e.order,"note",t)},expression:"order.note"}})],1),s("div",{staticClass:"col-12 "},[s("q-checkbox",{attrs:{label:"同會員資料"},model:{value:e.order.checkbox,callback:function(t){e.$set(e.order,"checkbox",t)},expression:"order.checkbox"}})],1)])],1)]),s("q-step",{attrs:{name:3,title:"捐贈確認",icon:"fas fa-hand-holding-heart"}},[s("div",{staticClass:"order03 q-pb-md"},[e._v("捐贈訂單成立")]),s("q-list",{attrs:{bordered:""}},[s("q-item",{staticClass:"q-pa-sm"},[s("q-item-label",{staticClass:"col-12",attrs:{caption:""}},[e._v(e._s("訂單日期："+e.order.date))]),s("q-item-label",{staticClass:"col-12"},[e._v(e._s("訂單編號："+e.orderShare._id))]),s("div",{staticClass:"col-12 order03"},[e._v("聯絡資訊")]),s("div",{staticClass:"col-12"},[e._v(e._s("姓名："+e.orderShare.name))]),s("div",{staticClass:"col-12"},[e._v(e._s("電話："+e.orderShare.phoneNum))]),s("div",{staticClass:"col-12"},[e._v(e._s("電子信箱："+e.orderShare.email))]),s("div",{staticClass:"col-12"},[e._v(e._s("地址："+e.orderShare.address))]),s("div",{staticClass:"col-12 order03"},[e._v("捐贈品項")]),s("div",{staticClass:"col-12"},[e._v(e._s("捐贈物品："+e.order.shares.d_id))]),s("div",{staticClass:"col-12"},[e._v("\n              "+e._s("捐贈數量："+e.order.shares.quantity)+"\n            ")])],1)],1)],1)],1)],1)],1)},r=[],o={name:"PageS_Cart",data(){return{step:1,fields:[{key:"item",label:"物資名稱"},{key:"requester",label:"需求單位"},{key:"spec",label:"物資規格"},{key:"amount",label:"捐贈數量"},{key:"action",label:" "}],orderShare:[],order:{id:"",date:new Date,name:"",phoneNum:"",email:"",address:"",send:"郵寄",note:"",checkbox:!1,shares:[{d_id:"",quantity:""}]},radios:[{label:"郵寄",value:"郵寄"},{label:"宅配",value:"宅配"},{label:"親送",value:"親送"},{label:"其他（請於備註欄位說明）",value:"其他"}]}},computed:{share(){return this.$store.getters.share},member(){return this.$store.state.member},donateList(){return this.$store.getters.cart.products}},methods:{delShare(e){this.$store.commit("delShare",e)},minusShare(e){this.$store.commit("minusShare",e)},plusShare(e){this.$store.commit("plusShare",e)},submit(){0===this.member.id.length?this.$q.notify({color:"red-6",icon:"fas fa-exclamation-circle",message:"請登入會員"}).then((()=>{this.$router.push("/login")})):(this.axios.post("https://mumuweb.herokuapp.com/members/member/order/"+this.member.id,this.order).then((e=>{e.data.success?this.member.order=e.data.result:this.$q.notify({color:"red-6",icon:"fas fa-exclamation-circle",message:e.data.message})})).catch((e=>{this.$q.notify({color:"red-6",icon:"fas fa-exclamation-circle",message:e.response.data.message})})),this.step++)},next(){if(1===this.step)for(const e in this.share)this.order.shares[e]={s_id:this.share[e]._id,quantity:this.share[e].count};this.step++}}},l=o,i=s("2877"),n=s("09e3"),c=s("f531"),d=s("87fe"),u=s("1c1c"),m=s("66e5"),p=s("9c40"),b=s("4074"),h=s("068f"),q=s("0170"),v=s("8572"),f=s("a370"),C=s("27f9"),_=s("9f0a"),x=s("8f8e"),k=s("b19c"),g=s("eebe"),y=s.n(g),S=Object(i["a"])(l,a,r,!1,null,null,null);t["default"]=S.exports;y()(S,"components",{QPageContainer:n["a"],QStepper:c["a"],QStep:d["a"],QList:u["a"],QItem:m["a"],QBtn:p["a"],QItemSection:b["a"],QImg:h["a"],QItemLabel:q["a"],QField:v["a"],QCardSection:f["a"],QInput:C["a"],QOptionGroup:_["a"],QCheckbox:x["a"],QStepperNavigation:k["a"]})}}]);