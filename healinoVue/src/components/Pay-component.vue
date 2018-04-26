<template>
  <div class="container payContainer">
    <headerComponent
            :lang="lang"
            :audio_p="audio_p"
            :userData="userData"
            :QuestionsProgress="userData.QuestionsProgress"
            @changeLang="changeLang"
            @onToUser="$emit('onToUser')"
            @exit="$emit('exit')"
            @toStart="$emit('toStart')"
            @audio="$emit('audio')"></headerComponent>
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
              <input type="text"
                     id="date"
                     v-model="CardNumber"
                     placeholder="XXXX XXXX XXXX XXXX XXXX"
                     data-inputmask="'mask': '9999 9999 9999 9999 9999'">
            <span class="check" v-bind:class="(objCardNumber.showLoad) ? 'loading': ''" v-if="objCardNumber.showCheck">
						<i class="fa fa-check" aria-hidden="true"></i>
					</span>
            <span class="check" v-bind:class="(objCardNumber.error) ? 'error' : ''" v-if="objCardNumber.error">
						<i class="fa fa-times" aria-hidden="true"></i>
					</span>
          </label>
          <div class="rowInfo">

              <p><span>*</span>{{langString('expiration')}}</p>
              <!--<input type="number" v-model="Month" v-on:change="">-->
              <div class="rowLabelsInput">
                <selectBlock
                        :valueItem="Month"
                        :selectOption="MounthOption"
                        :errorQuest="false"
                        :selectedBlock="selectedBlock"
                        @changeValSelect="changeMonth"
                ></selectBlock>
                  <p class="hren">/</p>
                <!--<label >
                  <input type="text" v-model="Year" v-on:change="" style="margin-top: 27px;">

                  <span class="check" v-bind:class="(objExp.showLoad) ? 'loading': ''" v-if="objExp.showCheck">
                            <i class="fa fa-check" aria-hidden="true"></i>
                        </span>
                  <span class="check" v-bind:class="(objExp.error) ? 'error' : ''" v-if="objExp.error">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                </label>-->
                <selectBlock
                        class="cardInfo cardInfoNum"
                        :valueItem="Year"
                        :selectOption="YearOption"
                        :errorQuest="false"
                        :selectedBlock="selectedBlock"
                        @changeValSelect="changeYear"
                ></selectBlock>
            </div>
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
          <img class="loading" src="/static/img/loadIcon.png" height="38" width="38" v-if="showSomeImg">
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
                <input type="text"
                       v-model="Phone"
                       data-inputmask="'alias': 'phone'">
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

    import "inputmask/dist/inputmask/phone-codes/phone";
    import Inputmask from "inputmask";
    export default {
        props: ['SessionData', 'userData', 'audio_p', 'lang'],
        data () {
            return {
                selectedBlock:"",
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
              showSomeImg:false,
              objExp:{
                showLoad:false,
                showCheck:false,
                error:false
              },
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
        messages: {
          en: {
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
            back: 'НАЗАД',
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
            back: 'NAZAD',
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
          MounthOption:function(){
            let r =[];
            for(let i = 1; i<13; i++) {
              r.push({key: i-1, title: i, Id: i});
            }
            return r;
          },
          YearOption:function(){
            let r =[];
            let l = new Date().getFullYear()%100;
            for(let i = 1; i<7; i++, l++) {
              r.push({key: i-1, title: l, Id: l});
            }
            return r;
          },
          getCardNumber:function () {
            return this.CardNumber.replace(/ /g,"").replace(/_/g,"")
          },
          getPhone:function () {
            return this.Phone.replace(/ /g,"").replace(/_/g,"")
          }

        },
        mounted(){
            $(document).ready(function(){
                Inputmask().mask(document.querySelectorAll("input"));
            });
        },
        created: function() {
          this.Year = this.YearOption[0].key;
          this.Month = this.MounthOption[0].key;
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
          Year:function () {
            this.changeExp();
          },
          Month:function () {
            this.changeExp();
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
          changeLang(lang){
            this.$emit('changeLang', lang);
          },
          getValMonth(){
            return this.MounthOption[this.Month].Id;
          },
          getValYear(){
            return this.YearOption[this.Year].Id;
          },
          changeMonth(val){
              this.Month = val;
          },
          changeYear(val){
            this.Year = val;
          },
            langString(string){
                return this.translate(string);
            },
          showPopupUserOn(){
            this.showPopupUser = true;
          },
          changeTypeCard(type){
            this.cardType = type;
          },
          changeExp(){
            let t = this;
            this.objExp.showCheck = true;
            this.objExp.showLoad = true;
            this.objExp.error = false;
            if(this.Year.length>4){
              this.Year=this.Year.substr(0, 4);
            }
            if(this.Month.length>2){
              this.Month=this.Month.substr(0, 2);
            }
            setTimeout(function () {
              if(t.Year.length==4 && t.Month.length==2){
                console.log((new Date(t.Year, t.Month-1) != 'Invalid Date'));
                console.log((t.Month < 13));
                console.log((t.Year >= new Date().getFullYear()));
                if ((new Date(t.Year, t.Month-1) != 'Invalid Date') && (t.Month < 13) && (t.Year >= new Date().getFullYear())) {
                  t.objExp.showLoad = false;
                  t.objExp.showCheck = true;
                  t.objExp.error = false;
                }else{
                  t.objExp.showCheck = false;
                  t.objExp.showLoad = false;
                  t.objExp.error = true;
                }
              }else {
                t.objExp.showCheck = false;
                t.objExp.showLoad = false;
                t.objExp.error = false;
              }
            }, 1500);
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

<style scoped>

</style>
