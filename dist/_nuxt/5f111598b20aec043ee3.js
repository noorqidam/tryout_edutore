(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{313:function(t,e,o){t.exports=o.p+"img/1b0cfe0.gif"},332:function(t,e,o){var content=o(433);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(21).default)("80f451fa",content,!0,{sourceMap:!1})},432:function(t,e,o){"use strict";var r=o(332);o.n(r).a},433:function(t,e,o){e=t.exports=o(20)(!1);var r=o(169)(o(434));e.push([t.i,".bg-google[data-v-99c25d8c]{background:url("+r+")}",""])},434:function(t,e,o){t.exports=o.p+"img/e51373d.png"},611:function(t,e,o){"use strict";o.r(e);var r=o(42),n={name:"Login",data:function(){return{User:{},Form:{},provider:null,btn_active:!0,modalShow:!1,title:"Tryout Edutore | Login"}},head:function(){return{title:this.title,meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial scale=1"},{hid:"description",name:"description",content:"Test Edutore Ujian SBMPTN UN CPNS PISIKOTES Bersama edutore terdiri dari ribuan soal soal dari publisher terkenal di indonesia Download App Edutore by Gramedia, Belajar Mandiri dengan Online Learning"},{hid:"description",property:"og:title",content:"Tes Edutore.com"},{name:"keywords",content:"Ujian SBMPTN , Ujian Pisikotes Ujian CPNS"},{hid:"property",property:"og:type",content:"website"},{hid:"description",property:"og:type",content:"video.movie"},{hid:"description",property:"og:url",content:"http://www.imdb.com/title/tt0117500/"},{hid:"description",property:"og:image",content:"https://cdn.edutore.com/sub-edutore-files/banners/SnEz3W6JKKqIPMDb6MZf-p.jpg"},{name:"twitter:card",content:"summary"},{name:"twitter:site",content:"@Tes Edutore.com"},{name:"twitter:title",content:"Tes Edutore Twitter Card"},{name:"twitter:description",content:"Test Ujian SBMPTN UN CPNS PISIKOTES Bersama edutore terdiri dari ribuan soal soal dari publisher terkenal di indonesia Download App Edutore by Gramedia, Belajar Mandiri dengan Online Learning."},{name:"twitter:image",content:"https://cdn.edutore.com/sub-edutore-files/banners/SnEz3W6JKKqIPMDb6MZf-p.jpg"},{name:"twitter:image:alt",content:"https://cdn.edutore.com/sub-edutore-files/banners/SnEz3W6JKKqIPMDb6MZf-p.jpg"}],link:[{hid:"canonical",rel:"canonical",href:"https://tes.edutore.com"}],metaInfo:{htmlAttrs:{lang:"en",amp:!0},bodyAttrs:{class:["dark-mode","mobile"]}}}},beforeCreate:function(){var t=this;r.a.auth().onAuthStateChanged((function(e){if(e){var o=t.$route.query.quiz_id,r=t.$route.query.ujian_id,n=t.$route.query.slug,l=t.$route.query.ref;l?t.$router.push(l):o?t.$router.push("/quiz?slug="+n+"+&quiz_id="+o):r?t.$router.push("/ujian?slug="+n+"+&id="+r):t.$router.push("/")}else{t.$notify({group:"welcome",title:"Hai, Edufriends Silahkan Login "}),t.$router.push({path:"/login",query:t.$route.query});t.$store.commit("auth/updateAuth",{setAuth:null,setPhoto:null,setEmail:null,setIslogin:!1})}}))},mounted:function(){},methods:{googleSignIn:function(){var t=this;this.provider=new r.a.auth.GoogleAuthProvider,r.a.auth().signInWithPopup(this.provider).then((function(e){var o=t.$route.query.quiz_id,r=t.$route.query.ujia_id,n=t.$route.query.slug;o?t.$router.push("/quiz?slug="+n+"+&quiz_id="+o):r?t.$router.push("/ujian?slug="+n+"+&id="+r):t.$router.push("/")})).catch((function(t){console.log(t)}))},_actionLogin:function(){var t=this;this.modalShow=!0,this.btn_active=!1,r.a.auth().signInWithEmailAndPassword(this.Form.email,this.Form.password).then((function(e){localStorage.setItem("token",e.user.getIdToken),t.actionNotifLogin(),console.log(e.user.displayName),console.log(e.user.emailVerified);var o=t.$route.query.ujian_id,r=t.$route.query.slug,n=t.$route.query.quiz_id,l=t.$route.query.ref;l?t.$router.push(l):n?t.$router.push("/quiz?slug="+r+"+&quiz_id="+n):o?t.$router.push("/ujian?slug="+r+"+&id="+o):t.$router.push({path:"/",query:t.$route.query})})).catch((function(e){console.log(" Masuk sini false"+e),t.modalShow=!1,t.btn_active=!0;var o=e.code,r=e.message;t.$notify({group:"foo",type:"error",title:o,message:r})}))},actionNotifLogin:function(){var data={email:this.Form.email};this.$axios.post("log-login",data).then((function(t){console.log(t)}))}}},l=(o(432),o(19)),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"row"},[r("b-modal",{attrs:{size:"sm",centered:"","hide-footer":"","hide-header":"","body-bg-variant":"default"},model:{value:t.modalShow,callback:function(e){t.modalShow=e},expression:"modalShow"}},[r("div",{staticClass:"row justify-content-center"},[r("div",{staticClass:"d-flex justify-content-center"},[r("img",{staticClass:"img-fluid",staticStyle:{width:"100px"},attrs:{src:o(313),alt:"~/assets/img/edu-wink.gif"}})])]),t._v(" "),r("p",{staticClass:"text-center mt-2"},[t._v("\n        Loading...\n      ")])])],1),t._v(" "),r("div",{staticClass:"row"},[t._m(0),t._v(" "),r("div",{staticClass:"col-md-12 mt-4"},[r("div",{staticClass:"row justify-content-center"},[r("div",{staticClass:"col-xs-4 col-sm-10 col-md-6 col-lg-4"},[r("div",{staticClass:"card",staticStyle:{"border-radius":"12px",height:"auto","margin-bottom":"15px"}},[r("div",{staticClass:"card-body"},[r("div",{staticClass:"container"},[r("h2",{staticClass:"title text-center"},[t._v("\n                  Login\n                ")]),t._v(" "),r("form",{staticClass:"mt-3",on:{submit:function(e){return e.preventDefault(),t._actionLogin(e)}}},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:""}},[t._v("Email")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.email,expression:"Form.email"}],staticClass:"form-control",attrs:{id:"email",type:"text",placeholder:"",required:""},domProps:{value:t.Form.email},on:{input:function(e){e.target.composing||t.$set(t.Form,"email",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:""}},[t._v("Password")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.password,expression:"Form.password"}],staticClass:"form-control",attrs:{id:"password",type:"password",placeholder:"",required:"",autocomplete:"false"},domProps:{value:t.Form.password},on:{input:function(e){e.target.composing||t.$set(t.Form,"password",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"form-group",staticStyle:{"margin-top":"30px"}},[t.btn_active?r("button",{staticClass:"btn btn-block btn-primary"},[r("i",{staticClass:"fa fa-sign-in"}),t._v(" Masuk\n                    ")]):r("button",{staticClass:"btn btn-block btn-primary",attrs:{disabled:""}},[r("i",{staticClass:"fa fa-sign-in"}),t._v(" Wait\n                    ")])])]),t._v(" "),t._m(1)])])])])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"container mt-5 pt-5"},[e("h1",{staticClass:"title text-24 text-center mt-5"},[this._v("\n          Hai, Edufriends!\n        ")]),this._v(" "),e("h2",{staticClass:"title text-18 text-center"},[this._v("\n          Semua bisa pintar bersama Edutore!\n        ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"form-group"},[e("div",{staticClass:"row justify-content-center"})])}],!1,null,"99c25d8c",null);e.default=component.exports}}]);