(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{313:function(t,e,n){t.exports=n.p+"img/1b0cfe0.gif"},634:function(t,e,n){"use strict";n.r(e);n(6),n(4),n(3),n(2),n(5),n(14);var o=n(0),r=n(56),c=n(120);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var d={name:"Accesspin",data:function(){return{ujian:{},pin:null,modalShow:!1}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(r.b)({ujian:function(t){return t.ujian.ujian}})),mounted:function(){if(this.$store.state.auth.isLogin){var t=this.$route.query._id;this.quiz_id=t,this._actionGetDetailUjian(t)}else{var e=this.$route.fullPath;this.$router.push({path:"/login",query:{quiz_id:this.$route.query._id,ujian:this.$route.query.name,ref:e}})}},methods:{_actionGetDetailUjian:function(t){this.$notify({group:"foo",type:"error",title:"Silahkan  Masukan PIN"});var e=this.$store.state.auth.token;this.$store.ujian.dispatch("getQuizId",t,e)},_actionValidatePin:function(){var t=this;this.modalShow=!0;var data={quiz_id:this.quiz_id,pin:this.pin};c.a.post("verify-pin-ujian",data,{headers:{"x-access-token":this.token}}).then((function(e){"true"===e.data.success?t.$router.push({path:"/start-ujian-private",query:{_id:t.quiz_id}}):t.$swal({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:2500}),t.modalShow=!1})).catch((function(e){alert(e),t.modalShow=!1;var n=e.response;t.$notify({group:"foo",type:"error",title:n.message})}))}}},f=n(19),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticStyle:{"font-family":"Elliot Sans"}},[o("div",{staticClass:"col-md-12"},[o("b-modal",{attrs:{size:"sm",centered:"","hide-footer":"","hide-header":"","body-bg-variant":"default",title:"Mengambil Soal"},model:{value:t.modalShow,callback:function(e){t.modalShow=e},expression:"modalShow"}},[o("h2",{staticClass:"h5 text-center"},[t._v("\n        Mengecek PIN\n      ")]),t._v(" "),o("div",{staticClass:"row justify-content-center"},[o("div",{staticClass:"d-flex justify-content-center"},[o("img",{staticClass:"img-fluid",staticStyle:{width:"100px"},attrs:{src:n(313),alt:"~/assets/img/edu-wink.gif"}})])]),t._v(" "),o("p",{staticClass:"text-center mt-2"},[t._v("\n        Loading...\n      ")])])],1),t._v(" "),o("div",{staticClass:"col-md-12",staticStyle:{"margin-top":"100px"}},[o("div",{staticClass:"row justify-content-center"},[o("div",{staticClass:"col-xs-8 col-sm-8 col-md-7 col-lg-4"},[o("h1",{staticClass:"h3 text-center"},[t._v("\n          "+t._s(t.ujian.judul_ujian)+"\n        ")]),t._v(" "),o("div",{staticClass:"card",staticStyle:{"border-radius":"12px",height:"auto"}},[o("div",{staticClass:"card-body"},[o("div",{staticClass:"container"},[o("h2",{staticClass:"title text-center"},[t._v("\n                Masukan PIN\n              ")]),t._v(" "),o("form",{staticClass:"mt-3",on:{submit:function(e){return e.preventDefault(),t._actionValidatePin(e)}}},[o("div",{staticClass:"form-group"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.pin,expression:"pin"}],staticClass:"form-control",attrs:{type:"password",placeholder:"masukkan PIN anda",required:"",autocomplete:"false"},domProps:{value:t.pin},on:{input:function(e){e.target.composing||(t.pin=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group",staticStyle:{"margin-top":"30px"}},[t.modalShow?o("button",{staticClass:"btn btn-block btn-primary",attrs:{disabled:""}},[o("font-awesome-icon",{attrs:{icon:"sign-in-alt"}}),t._v(" Masuk\n                  ")],1):o("button",{staticClass:"btn btn-block btn-primary"},[o("font-awesome-icon",{attrs:{icon:"sign-in-alt"}}),t._v(" Masuk\n                  ")],1)])])])])])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);