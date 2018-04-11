<template>
  <div class="container payContainer">
    <div class="header">
      <div class="headerContainer">
        <a href="/" class="logo_head"><img src="static/img/logoHeader.png" alt="" class=""></a>
        <a href="/" class="logo_head m"><img src="static/img/logoM.png" alt="" class=""></a>
        <a href="/" v-lang.main></a>
        <a v-bind:href="langString('forumUrl')" target="_blank" v-lang.forum></a>
        <h3>111%</h3>
        <div class="music_btn1" v-on:click="$emit('audio')">
          <img v-bind:src="(audio_p)?'static/img/noMusic.png':'static/img/music.png'" >
        </div>
        <div class="lang">
          <img src="static/img/langPL.png" alt=""   v-if="lang=='pl'">
          <img src="static/img/langUSA.png" alt=""  v-if="lang=='en'">
          <img src="static/img/langUA.png" alt=""   v-if="lang=='ru'">
          <ul>
            <li v-on:click="$emit('changeLang', 'pl')" v-if="lang!='pl'"><img src="static/img/langPL.png" alt=""></li>
            <li v-on:click="$emit('changeLang', 'en')" v-if="lang!='en'"><img src="static/img/langUSA.png" alt=""></li>
            <li v-on:click="$emit('changeLang', 'ru')" v-if="lang!='ru'"><img src="static/img/langUA.png" alt=""></li>
          </ul>
        </div>
        <div class="user_Avatar">
          <div v-bind:style="{background: 'url(' + userIMG + ') center center / cover' }"
               v-on:click="showPopupUserOn()"
               class="user_Avatar1"></div>
          <div class="block_user_popup" v-bind:class="(showPopupUser)?'on':''">
            <div class="margin_op">
              <ul>
                <li v-on:click="$emit('onToUser')">Edit profile</li>
                <li>Email rezults</li>
                <li v-on:click="$emit('exit')">Exit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- sjdsjlnlnvlkfnvklkls-->

    <div class="payContainer">
      <div class="payContent">
        <div class="rowPay" style="margin-bottom: 3%;">
          <h1 v-lang.title></h1>
          <div class="cardTypes">
            <div class="cardType" v-on:click="changeTypeCard('visab')" v-bind:class="(cardType=='visab')?'active':''"><img src="/static/img/visab.png" alt=""></div>
            <div class="cardType" v-on:click="changeTypeCard('visaw')" v-bind:class="(cardType=='visaw')?'active':''"><img src="/static/img/visaw.png" alt=""></div>
            <div class="cardType" v-on:click="changeTypeCard('mc')" v-bind:class="(cardType=='mc')?'active':''"><img src="/static/img/mc.png" alt=""></div>
            <div class="cardType" v-on:click="changeTypeCard('maestro')" v-bind:class="(cardType=='maestro')?'active':''"><img src="/static/img/maestro.png" alt=""></div>
            <div class="cardType" v-on:click="changeTypeCard('americanExpress')" v-bind:class="(cardType=='americanExpress')?'active':''"><img src="/static/img/americanExpress.png" alt=""></div>
            <div class="cardType" v-on:click="changeTypeCard('maesrto2')" v-bind:class="(cardType=='maesrto2')?'active':''"><img src="/static/img/maesrto2.png" alt=""></div>
          </div>
        </div>
        <div class="rowPay">
          <label class="card">
            <p><span>*</span>{{langString('cardNumber')}}</p>
            <!--<input type="text" v-model="CardNumber" v-on:change="" placeholder="XXXX XXXX XXXX XXXX XXXX">-->
            <masked-input
                    id="date"
                    v-model="CardNumber"
                    mask="1111 1111 1111 1111 1111"
                    placeholder="XXXX XXXX XXXX XXXX XXXX"
                    type="text" />
            <span class="check" v-bind:class="(objCardNumber.showLoad) ? 'loading': ''" v-if="objCardNumber.showCheck">
						<i class="fa fa-check" aria-hidden="true"></i>
					</span>
            <span class="check" v-bind:class="(objCardNumber.error) ? 'error' : ''" v-if="objCardNumber.error">
						<i class="fa fa-times" aria-hidden="true"></i>
					</span>
          </label>
          <div class="rowInfo">
            <label class="cardInfo cardInfoNum">
              <p><span>*</span>{{langString('expiration')}}</p>
              <input type="number" v-model="Month" v-on:change="">

              </span>
            </label>
            <p class="hren">/</p>
            <label class="cardInfo cardInfoNum">
              <input type="text" v-model="Year" v-on:change="" style="margin-top: 27px;">

              <span class="check" v-bind:class="(showLoadEmail) ? 'loading': ''" v-if="showCheckEmail">
							<i class="fa fa-check" aria-hidden="true"></i>
						</span>
              <span class="check" v-bind:class="(showErrorEmail) ? 'error' : ''" v-if="showErrorEmail">
							<i class="fa fa-times" aria-hidden="true"></i>
						</span>
            </label>
          </div>
          <label class="cardInfo marRig">
            <p><span>*</span>CVV</p>
            <input type="number" v-model="CVV" v-on:input="change(objCVV, CVV, 'CVV')">

            <span class="check" v-bind:class="(objCVV.showLoad) ? 'loading': ''" v-if="objCVV.showCheck">
						<i class="fa fa-check" aria-hidden="true"></i>
					</span>
            <span class="check" v-bind:class="(objCVV.error) ? 'error' : ''" v-if="objCVV.error">
						<i class="fa fa-times" aria-hidden="true"></i>
					</span>
          </label>
        </div>
        <div class="rowPay miniButtons">
          <img src="/static/img/loadIcon.png" height="38" width="38">
          <button v-on:click="cancel()" v-lang.cancel></button>
          <button v-on:click="save()" v-lang.save></button>
          <button v-on:click="pay()" v-lang.pay></button>
        </div>
        <div class="rowPay">
          <h2>Your payment to Healino was succesful. Thank You for using our serveses. Please choose a receipt method below</h2>
        </div>
        <div class="rowPay jsa">
          <label class="pointer">
            {{langString('actual')}}
            <input type="checkbox" v-model="actualAdd">
            <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span v-lang.accept1></span>
          </label>

          <label class="pointer">
            {{langString('sendToEmail')}}
            <input type="checkbox" v-model="sendEmail">
            <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span v-lang.accept1></span>
          </label>

        </div>
        <div class="rowPay">
          <div class="col">
            <label class="address">
              <p><span>*</span>{{langString('country')}}</p>
              <input type="text" v-model="Country" v-on:input="change(objCountry, Country, 'Country')" placeholder="Country, cod">

              <span class="check" v-bind:class="(objCountry.showLoad) ? 'loading': ''" v-if="objCountry.showCheck">
						<i class="fa fa-check" aria-hidden="true"></i>
					</span>
              <span class="check" v-bind:class="(objCountry.error) ? 'error' : ''" v-if="objCountry.error">
						<i class="fa fa-times" aria-hidden="true"></i>
					</span>
            </label>
            <label class="address">
              <p><span>*</span>{{langString('address')}}</p>
              <input type="text" v-model="Address" v-on:input="change(objAddress, Address, 'Address')" placeholder="City, house and apt.number">

              <span class="check" v-bind:class="(objAddress.showLoad) ? 'loading': ''" v-if="objAddress.showCheck">
						<i class="fa fa-check" aria-hidden="true"></i>
					</span>
              <span class="check" v-bind:class="(objAddress.error) ? 'error' : ''" v-if="objAddress.error">
						<i class="fa fa-times" aria-hidden="true"></i>
					</span>
            </label>
          </div>
          <div class="col">
            <label class="email">
              <p><span>*</span>Email</p>
              <input type="text" v-model="Email" v-on:input="change(objEmail, Email, 'Email')">

              <span class="check" v-bind:class="(objEmail.showLoad) ? 'loading': ''" v-if="objEmail.showCheck">
						<i class="fa fa-check" aria-hidden="true"></i>
					</span>
              <span class="check" v-bind:class="(objEmail.error) ? 'error' : ''" v-if="objEmail.error">
						<i class="fa fa-times" aria-hidden="true"></i>
					</span>
            </label>
            <label class="address">
              <p><span style="width: 7px; height:19px;"></span>{{langString('phone')}}</p>
              <masked-input
                      v-model="Phone"
                      mask="\+111111111111"
                      placeholder="+xxxxxxxxxxxx"
                      type="tel" />

              <span class="check" v-bind:class="(objPhone.showLoad) ? 'loading': ''" v-if="objPhone.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
              <span class="check" v-bind:class="(objPhone.error) ? 'error' : ''" v-if="objPhone.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
            </label>
          </div>
        </div>
        <div class="rowPay jsa">
          <button v-lang.send></button>
          <button v-lang.start></button>
        </div>
      </div>


    </div>
  </div>

</template>

<script>
    //import {TheMask} from 'vue-the-mask'
    import MaskedInput from 'vue-masked-input'
    export default {
        props: ['SessionData', 'userData', 'audio_p', 'lang'],
        data () {
            return {
              showPopupUser:false,
              cardType:'',
              CardNumber:'',
              Month:'',
              Year:'',
              CVV:'',

              Country:'',
              Address:'',
              Email:'',
              Phone:'',

              actualAdd:false,
              sendEmail:false,
              showLoadEmail:false,
              showErrorEmail:false,
              objCardNumber:{
                showLoad:false,
                showCheck:false,
                error:false
              },
              objCVV:{
                showLoad:false,
                showCheck:false,
                error:false
              },
              objCountry:{
                showLoad:false,
                showCheck:false,
                error:false
              },
              objAddress:{
                showLoad:false,
                showCheck:false,
                error:false
              },
              objEmail:{
                showLoad:false,
                showCheck:false,
                error:false
              },
              objPhone:{
                showLoad:false,
                showCheck:false,
                error:false
              },
            }
        },
        components: {MaskedInput },
        messages: {
          en: {
            main: 'Home',
            forum: 'Forum',
            forumUrl: 'https://www.healino.com/blog-us',
            title:"Payment Methods",
            cardNumber:"Card Number",
            expiration:"Expiration",
            address:"Address",
            country:"Country",
            phone:"Phone",
            actual:"Send to actual address",
            sendToEmail:"Send by email",
            cancel:"cancel",
            pay:"pay",
            save:"save",
            send:"send",
            start:"start",
          },
          ru: {
            main: 'Главная',
            forum: 'Форум',
            back: 'НАЗАД',
            forumUrl: 'https://www.healino.com/blog-ru',
            title:"Способы оплаты",
            cardNumber:"Номер карты",
            expiration:"Expiration",
            address:"Адрес",
            country:"Страна",
            phone:"Телефон",
            actual:"Отправить на фактический адрес",
            sendToEmail:"Послать по электронной почте",
            cancel:"Отмена",
            pay:"платить",
            save:"Сохранить",
            send:"Отправить",
            start:"Начало",
          },
          pl: {
            main: 'Strona główna',
            forum: 'Forum',
            back: 'NAZAD',
            forumUrl: 'https://www.healino.com/blog-pl',
            title:"Metody Płatności",
            cardNumber:"Numer karty",
            expiration:"Expiration",
            address:"Adres",
            country:"Kraj",
            phone:"Telefon",
            actual:"Wyślij na rzeczywisty adres",
            sendToEmail:"Wysłać e-mailem",
            cancel:"Anuluj",
            pay:"zapłacić",
            save:"zapisać",
            send:"wysłać",
            start:"początek",
          }
        },
        computed: {
          userIMG: function () {
            /*if(this.userData.PhotoUrl){
              return this.userData.PhotoUrl;
            }
            else{*/
              return '../static/img/noIMG.png';
            //}
          },
          getCardNumber:function () {
            return this.CardNumber.replace(/ /g,"").replace(/_/g,"")
          },
          getPhone:function () {
            return this.Phone.replace(/ /g,"").replace(/_/g,"")
          }

        },
        created: function() {



        },
        watch:{
          CardNumber:function (old, newVal) {
            let t = this;
            if(this.getCardNumber.length>15){
              console.log(this.getCardNumber.length);
              this.objCardNumber.showCheck = true;
              this.objCardNumber.showLoad = true;
              this.objCardNumber.error = false;
                setTimeout(function () {
                  if(t.getCardNumber.length>15){
                    t.objCardNumber.showLoad = false;
                    t.objCardNumber.showCheck = true;
                    t.objCardNumber.error = false;
                  }else{
                    t.objCardNumber.showCheck = false;
                    t.objCardNumber.showLoad = false;
                    t.objCardNumber.error = false;
                  }
                }, 1500);
            }else{
              t.objCardNumber.showCheck = false;
              t.objCardNumber.showLoad = false;
              t.objCardNumber.error = false;
            }
          },
          Phone:function () {
            let t = this;
            if(this.getPhone.length>11){
              this.objPhone.showCheck = true;
              this.objPhone.showLoad = true;
              this.objPhone.error = false;
              setTimeout(function () {
                if(t.getPhone.length>11){
                  t.objPhone.showLoad = false;
                  t.objPhone.showCheck = true;
                  t.objPhone.error = false;
                }else{
                  t.objPhone.showCheck = false;
                  t.objPhone.showLoad = false;
                  t.objPhone.error = false;
                }
              }, 1500);
            }else{
              t.objPhone.showCheck = false;
              t.objPhone.showLoad = false;
              t.objPhone.error = false;
            }
          }
        },
        methods: {
            langString(string){
                return this.translate(string);
            },
          showPopupUserOn(){
            this.showPopupUser = true;
          },
          changeTypeCard(type){
            this.cardType = type;
          },
          change(obj, val, input){
            let t = this;
            obj.showCheck = true;
            obj.showLoad = true;
            obj.error = false;
            if (input == 'CVV') {
              if(t[input].length>3){
                t[input]=t[input].substr(0, 3);
              }
              setTimeout(function () {
                if (t[input].length == 3) {
                  obj.showLoad = false;
                  obj.showCheck = true;
                  obj.error = false;
                } else {
                  obj.showCheck = false;
                  obj.showLoad = false;
                  obj.error = false;
                }
              }, 1500);
            }
            if (input == 'Country' || input =='Address') {
              setTimeout(function () {
                if (t[input].length>1) {
                  obj.showLoad = false;
                  obj.showCheck = true;
                  obj.error = false;
                } else {
                  obj.showCheck = false;
                  obj.showLoad = false;
                  obj.error = false;
                }
              }, 1500);
            }
            if(input == 'Email'){
                setTimeout( function () {
                  var r = /^[a-zA-Z0-9_.-]+@\w+\.\w{2,4}$/i;
                  if (r.test(t[input])){
                    obj.showLoad = false;
                    obj.showCheck = true;
                    obj.error = false;
                  }else{
                    obj.showCheck = false;
                    obj.showLoad = false;
                    obj.error = false;
                  }
                }, 1500);

            }
          },
          cancel(){

          },
          save(){

          },
          pay(){

          },
          send(){

          },
          start(){

          },
          showCheckEmail(){

          }
        }
    }
</script>

<style>
  .music_btn1{
    width: 30px;
    height: 27px;
    margin-left: 10px;
  }
</style>
