<template>
<div class="prostoTask usercomasdfgh">
  <div class="container firstPageContainer">
    <div class="row">
      <div class="avatar"><label>
        <input type="file" v-bind="img" v-on:change="uploadImage()" style="display: none">
        <div v-bind:style="{background: 'url(' + userIMG + ') center center / cover' }" class="img" ></div>
      </label>
      </div>
    </div>
    <form class="roww">
      <div class="formBlock login">
        <label>
          <p><span>*</span>{{langString('name')}}</p>
          <input type="text" v-model="Name" v-on:change="change(objName, Name)" v-bind:disabled="objName.disable">
          <span class="check" v-bind:class="(objName.showLoad) ? 'loading': ''" v-if="objName.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objName.error) ? 'error' : ''" v-if="objName.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>{{langString('surname')}}</p>
          <input type="text" v-model="SurName" v-on:change="change(objSurName, SurName)" v-bind:disabled="objSurName.disable">
          <span class="check" v-bind:class="(objSurName.showLoad) ? 'loading': ''" v-if="objSurName.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objSurName.error) ? 'error' : ''" v-if="objSurName.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>{{langString('date')}}</p>
          <!--<input id="date" type="date"
                 v-model="Birthday" v-on:change="change(objBirthday, Birthday)">-->
          <!--<masked-input
                  id="date"
                  v-on:change="change(objBirthday, Birthday)"
                  v-model="Birthday"
                  mask="11/11/1111"
                  placeholder="dd/mm/yyyy"
                  type="text" />-->
          <input type="text"
                 v-model="Birthday" v-on:change="changeBirth(Birthday)"
                 data-inputmask-alias="date"
                 data-inputmask-inputformat="dd/mm/yyyy">

          <span class="check" v-bind:class="(objBirthday.showLoad) ? 'loading': ''" v-if="objBirthday.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objBirthday.error) ? 'error' : ''" v-if="objBirthday.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>{{langString('location')}}</p>
          <input type="text" v-model="Location" v-on:change="change(objLocation, Location)" v-bind:disabled="objLocation.disable">
          <span class="check" v-bind:class="(objLocation.showLoad) ? 'loading': ''" v-if="objLocation.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objLocation.error) ? 'error' : ''" v-if="objLocation.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>{{langString('race')}}</p></label>
        <selectBlock
                     :valueItem="Race"
                     :selectOption="raseOption"
                     :errorQuest="false"
                     :selectedBlock="selectedBlock"
                     @changeValSelect="changeRace"
        ></selectBlock>
        <label>
          <p><span>*</span>{{langString('phone')}}</p>
          <input type="text"
                 v-model="Phone" v-on:change="changePhone(Phone)"
                 data-inputmask="'alias': 'phone'">

          <span class="check" v-bind:class="(objPhone.showLoad) ? 'loading': ''" v-if="objPhone.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objPhone.error) ? 'error' : ''" v-if="objPhone.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>

      </div>
      <div class="formBlock login" v-bind:class="(language=='pl' && PersonMeasurementSystem == '1')?'pl':''">
        <div class="Metrics">
          <div class="btn" v-bind:class="[(PersonMeasurementSystem == '0') ? 'active': '']"
                            v-on:click="changeMetrics('0')">{{langString('metric')}}</div>
          <div class="btn" v-if="language!='ru' "
               v-bind:class="[(PersonMeasurementSystem == '1') ? 'active': '']"
                            v-on:click="changeMetrics('1')">US</div>
        </div>
        <label v-if="PersonMeasurementSystem == '0'">
          <p><span>*</span>{{langString('height')}}</p>
          <input type="number" class="number" v-model="Height" v-on:change="change(objHeight, Height)">
          <span class="razmer">{{langString('cm')}}</span>
          <span class="check" v-bind:class="(objHeight.showLoad) ? 'loading': ''" v-if="objHeight.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objHeight.error) ? 'error' : ''" v-if="objHeight.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label v-if="PersonMeasurementSystem == '0'">
          <p><span>*</span>{{langString('weight')}}</p>
          <input type="number" class="number" v-model="Weight" v-on:change="change(objWeight, Weight)">
          <span class="razmer">{{langString('kg')}}</span>
          <span class="check" v-bind:class="(objWeight.showLoad) ? 'loading': ''" v-if="objWeight.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objWeight.error) ? 'error' : ''" v-if="objWeight.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label v-if="PersonMeasurementSystem == '1'">
          <p><span>*</span>{{langString('height')}}</p>
          <input type="number" class="number" v-model="Height" v-on:change="change(objHeight, Height)">
          <span class="razmer">{{langString('ft')}}</span>
          <input type="number" class="number"  v-model="HeightAdditional" v-on:change="change(objHeight, Height)">
          <span class="razmer">{{langString('inn')}}</span>
          <span class="check" v-bind:class="(objHeight.showLoad) ? 'loading': ''" v-if="objHeight.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objHeight.error) ? 'error' : ''" v-if="objHeight.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label v-if="PersonMeasurementSystem == '1'">
          <p><span>*</span>{{langString('weight')}}</p>
          <input type="number" class="number" v-model="Weight" v-on:change="change(objWeight, Weight)">
          <span class="razmer">{{langString('lb')}}</span>
          <input type="number" class="number"  v-model="WeightAdditional" v-on:change="change(objWeight, Weight)">
          <span class="razmer">{{langString('oz')}}</span>
          <span class="check" v-bind:class="(objWeight.showLoad) ? 'loading': ''" v-if="objWeight.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objWeight.error) ? 'error' : ''" v-if="objWeight.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <!--<label>
          <p><span>*</span>{{langString('activity')}}</p>
          <select v-model="Activity" v-on:change="change(objActivity, Activity)">
            <option value="0">No Activity</option>
            <option value="1">Sedentary</option>
            <option value="2">Low Active</option>
            <option value="3">Moderately Active</option>
            <option value="4">Very Active</option>
            <option value="5">Extra Active</option>
          </select>
          <span class="check" v-bind:class="(objActivity.showLoad) ? 'loading': ''" v-if="objActivity.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objActivity.error) ? 'error' : ''" v-if="objActivity.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>-->
        <label>
          <p><span>*</span>{{langString('activity')}}</p></label>
        <selectBlock
                :valueItem="Activity"
                :selectOption="activityOption"
                :errorQuest="false"
                :selectedBlock="selectedBlock"
                @changeValSelect="changeAct"
        ></selectBlock>
        <label>
          <p><span>*</span>{{langString('gender')}}</p>
        </label>
        <label class="pointer radio">

          <input type="radio" name="raz" value="0" v-model="Gender" >
          <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span v-lang.male></span>
        </label>
        <label class="pointer radio">

          <input type="radio" name="raz" value="1" v-model="Gender">
          <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span v-lang.female></span>
        </label>
        <label class="bottom" v-if="userData.LastTestFinishedDate">
          <p>{{langString('someDate')}}: {{(userData.LastTestFinishedDate) ? dateformat(userData.LastTestFinishedDate):''}}</p>
        </label>
      </div>


    </form>
    <div class="row">
      <div class="firstPage fifthPage">
        <button v-on:click.prevent="updateUser">{{buttonTitle}}</button>
      </div>
    </div>

  </div>

  <div class="music_btn" v-on:click="$emit('audio')">
    <img v-bind:src="(audio_p)?'static/img/noMusic.png':'static/img/music.png'" >

  </div>
</div>
</template>

<script>
  import "inputmask/dist/inputmask/phone-codes/phone";
  import Inputmask from "inputmask";
    export default {
        props: ['SessionData', 'userData', 'audio_p', 'answerSelectSelected'],
        data () {
            return {
              selectedBlock:"",
              st:true,
                Name:"",
                SurName:"",
                Birthday:"",
                Location:"",
                Race:"0",
                Phone:"",
                Height:0,
                HeightAdditional:0,
                Weight:0,
                WeightAdditional:0,
                Activity:"0",
                Gender:"0",
                PersonMeasurementSystem:"0",
                objName:{
                    showCheck: false,
                    showLoad: true,
                    disable:false,
                    error:false
                },
                objSurName:{
                    showCheck: false,
                    showLoad: true,
                    disable:false,
                    error:false
                },
                objBirthday:{
                    showCheck: false,
                    showLoad: true,
                    error:false,
                    date: "date"
                },
                objLocation:{
                    showCheck: false,
                    showLoad: true,
                    disable:false,
                    error:false
                },
                objRace:{
                    showCheck: false,
                    showLoad: true,
                    error:false
                },
                objPhone:{
                    showCheck: false,
                    showLoad: true,
                    error:false
                },
                objHeight:{
                    showCheck: false,
                    showLoad: true,
                    error:false
                },
                objWeight:{
                    showCheck: false,
                    showLoad: true,
                    error:false
                },
                objActivity:{
                    showCheck: false,
                    showLoad: true,
                    error:false
                },
                objGender:{
                  showCheck: false,
                  showLoad: true,
                  error:false
                },
                img:""

            }
        },
        messages: {
            en: {
                name: 'Name',
                surname: 'Family Name',
                date: 'Date of Birth',
                location: 'Location',
                race: 'Race',
                phone: 'Phone',
                metric: 'Metrics',
                height: 'Height',
                cm: 'cm',
                ft: 'ft',
                inn: 'in',
                weight: 'Weight',
                kg: 'kg',
                lb: 'lb',
                oz: 'oz',
                activity: 'Activity',
                gender: 'Gender',
                male: 'Male',
                female: 'Female',
                someDate: 'Date Actualization',
                button: 'SIGN IN',
              race1:'Caucasian',
              race2:'Asian',
              race3:'African',
              save:'UPDATE',
              act1:'No Activity',
              act2:'Sedentary',
              act3:'Low Active',
              act4:'Moderately Active',
              act5:'Very Active',
              act6:'Extra Active',
            },
            ru: {
                name: 'Имя',
                surname: 'Фамилия',
                date: 'Дата рождения',
                location: 'Место нахождения',
                race: 'Раса',
                phone: 'Номер телефона',
                metric: 'Метрика',
                height: 'Рост',
                cm: 'см',
                ft: 'фу',
                inn: 'дю',
                weight: 'Вес',
                kg: 'кг',
                lb: 'фу',
                oz: 'ун',
                activity: 'Уровень активности',
                gender: 'Пол',
                male: 'Мужской',
                female: 'Женский',
                someDate: 'Дата актуализации',
                button: 'РЕГИСТРАЦИЯ',
              race1:'Европеоидная',
              race2:'Азиатская',
              race3:'Негроидная',
              act1:'Нет активности',
              act2:'Сидячий',
              act3:'Низкоактивных',
              act4:'Умеренно активен',
              act5:'Очень активный',
              act6:'Экстра Активен',
              save:'ОБНОВИТЬ',
            },
            pl: {
                name: 'Imię',
                surname: 'Nazwisko',
                date: 'Data urodzenia',
                location: 'Lokalizacja',
                race: 'Odmiana',
                phone: 'numer telefonu',
                metric: 'Metryki',
                height: 'Wzrost',
                cm: 'cm',
                ft: 'stóp',
                inn: 'cali',
                weight: 'Waga',
                kg: 'kg',
                lb: 'funt',
                oz: 'uncje',
                activity: 'Poziom aktywności ',
                gender: 'płeć',
                male: 'męska',
                female: 'żeńska',
                someDate: 'Data aktualizacji',
                button: 'REJESTRACJA',
              race1:'Biała',
              race2:'Żółta',
              race3:'Czarna',
              act1:'Brak aktywności',
              act2:'Siedzący',
              act3:'Low Active',
              act4:'Umiarkowanie aktywne',
              act5:'Bardzo aktywny',
              act6:'Extra Active',
              save:'AKTUALIZACJA',
            },
        },
        computed: {
          raseOption:function(){
            let r =[];
            r.push({key: 0, title: this.langString('race1'), Id:0});
            r.push({key: 1, title: this.langString('race2'), Id:1});
            r.push({key: 2, title: this.langString('race3'), Id:2});
            return r;
          },
          activityOption:function(){
            let r =[];
            r.push({key: 0, title: this.langString('act1'), Id:0});
            r.push({key: 1, title: this.langString('act2'), Id:1});
            r.push({key: 2, title: this.langString('act3'), Id:2});
            r.push({key: 3, title: this.langString('act4'), Id:3});
            r.push({key: 4, title: this.langString('act5'), Id:4});
            r.push({key: 5, title: this.langString('act6'), Id:5});
            return r;
          },
          buttonTitle:function () {
            if(this.st){
              return this.langString('button');
            }else{
              return this.langString('save');
            }
          },
            userIMG: function () {

                if(this.img){
                    return this.img;
                }
                else{
                    return '../static/img/noIMG.png';
                }
            },
            bodyGet: function () {
                return {
                    SessionData: this.SessionData,
                }
            },
            bodySet: function () {
                return{
                    SessionData: this.SessionData,
                    Name:this.Name,
                    SurName:this.SurName,
                    Birthday:this.Birthday.substr(6,4) +'-'+ this.Birthday.substr(3,2) +'-'+ this.Birthday.substr(0,2),
                    Location:this.Location,
                    Race:this.Race,
                    Phone:this.Phone.replace(/_/g,'').replace(/-/g,'').replace(/\(/g,'').replace(/\)/g,''),
                    Height:this.Height,
                    HeightAdditional:this.HeightAdditional,
                    Weight:this.Weight,
                    WeightAdditional:this.WeightAdditional,
                    Activity:this.Activity,
                    Gender:this.Gender,
                    PersonMeasurementSystem:this.PersonMeasurementSystem,
                }
            },
        },
      mounted(){
        $(document).ready(function(){
          Inputmask().mask(document.querySelectorAll("input"));

        });
      },
        created: function() {
          let t = this;
          $.get("https://ipinfo.io", function(data) {
              if(data.city){
                  t.Location = data.city;
              }
          }, "jsonp");
            for(var index in this.userData) {
                 if(this.userData[index] && index in this){
                     this[index] = this.userData[index];
                     if(index == 'Birthday'){
                         this.Birthday = this.birth(this.userData.Birthday);
                     }
                     if(index != 'PersonMeasurementSystem'){
                       this['obj'+index].showCheck= true;
                       this['obj'+index].showLoad= false;
                     }
                     if((index=='Name' || index=='SurName' || index=='Location')&& this.userData[index]){
                         this['obj'+index].disable = true;
                       this.st = false;
                     }
                 }
            }
            if(this.userData.PhotoUrl){
                this.img = this.userData.PhotoUrl;
            }
        },
        watch:{

        },
        methods: {
            langString(string){
                return this.translate(string);
            },
            uploadImage:function () {
                let t = this;
                let input = document.getElementsByTagName('input')[0].files
                var file = input[input.length-1];
                var reader = new FileReader();
                reader.onloadend = function() {
                    t.img = reader.result;
                    t.$emit('changeAva', t.img);
                    $.post( '/api/Image/UploadImage',  {
                        SessionData: t.SessionData,
                        ImageData: reader.result
                    }  )
                        .done(function( data ){

                        });
                }
                reader.readAsDataURL(file);
            },
            birth:function(strDate){
                let date;
                if(strDate){
                    date = new Date(strDate);
                }
                else {
                    date = new Date();
                }
                return ('0' + date.getDate()).slice(-2) +'/'+ ('0' + (date.getMonth() + 1)).slice(-2) +'/'+  date.getFullYear();
            },
            changeMetrics:function (metrics) {
                this.PersonMeasurementSystem = metrics;
                var opt = [];
                if(metrics==0){
                  opt.push('cm');
                  opt.push('см');
                  opt.push('кг');
                  opt.push('kg');
                }else{
                  opt.push('oz');
                  opt.push('ft');
                  opt.push('in');
                  opt.push('lb');
                  opt.push('футов');
                  opt.push('дюймов');
                  opt.push('фунтов');
                  opt.push('унций');
                  opt.push('stóp');
                  opt.push('cali');
                  opt.push('funt');
                  opt.push('uncje');
                }
                this.$emit('pushSelectOption', opt);
            },
            updateUser:function () {
                let t = this;
                if(!this.checkBody()){
                  $.post( '/api/Account/UpdateUserInformation',  this.bodySet  )
                      .done(function( data ){
                          if(data.ErrorCode == 1) {
                              t.$emit('toTheme');
                          }
                          if(data.ErrorCode == 5 && data.DebugMessage == "Incorect height or weight"){
                            t.objHeight.error = true;
                            t.objWeight.error = true;
                          }
                      });
                }
            },
            change(obj, val){
                let t = this;
                obj.showCheck = true;
                obj.showLoad = true;
                obj.error = false;
                setTimeout( function () {
                    obj.showLoad = false;
                    if(val == null || val==="" || val < 0 ){
                        obj.showCheck = false;
                    }
                }, 1500);
            },
          changeAct(val){
            let t = this;
            this.Activity = val;
            this.objActivity.showCheck = true;
            this.objActivity.showLoad = true;
            this.objActivity.error = false;
            setTimeout( function () {
              t.objActivity.showLoad = false;
              if(val == null || val==="" || val < 0 ){
                t.objActivity.showCheck = false;
              }
            }, 1500);
          },
          changeBirth(val){
            let t = this;
            this.Birthday = val;
            this.objBirthday.showCheck = true;
            this.objBirthday.showLoad = true;
            this.objBirthday.error = false;
            setTimeout( function () {
              t.objBirthday.showLoad = false;
              if((new Date().valueOf() > new Date(t.Birthday.substr(6,4),  t.Birthday.substr(3,2), t.Birthday.substr(0,2)).valueOf())){
                t.objBirthday.showCheck = true;
              }else{
                t.objBirthday.showLoad = false;
                t.objBirthday.showCheck = false;
                t.objBirthday.error = true;
              }
            }, 1500);
          },
          changePhone(val){
            let t = this;
            this.Phone = val;
            this.objPhone.showCheck = true;
            this.objPhone.showLoad = true;
            this.objPhone.error = false;
            if(val.replace(/_/g,'').replace(/-/g,'').replace(/\(/g,'').replace(/\)/g,'').length>11) {
              setTimeout(function () {
                t.objPhone.showLoad = false;
                t.objPhone.showCheck = true;
                t.objPhone.error = false;
              }, 1600);
            }else{
              setTimeout(function () {
                t.objPhone.showLoad = false;
                t.objPhone.showCheck = false;
                t.objPhone.error = true;
              }, 1500);
            }
          },
          changeRace(val){
            let t = this;
            this.Race = val;
            this.objRace.showCheck = true;
            this.objRace.showLoad = true;
            this.objRace.error = false;
            setTimeout( function () {
              t.objRace.showLoad = false;
              if(val == null || val==="" || val < 0 ){
                t.objRace.showCheck = false;
              }
            }, 1500);
          },
          dateformat(date){
          let o = new Date(date);
            return ('0' + o.getDate()).slice(-2)+'-'+ ('0' + (o.getMonth() + 1)).slice(-2) +'-' + o.getFullYear();
          },
            checkBody(){
                var error = false;
                for(let index in this.bodySet){
                    if(!(this.bodySet[index]=== "0"|| this.bodySet[index]=== 0 ||(this.bodySet[index]!==null && this.bodySet[index]!=="" && this.bodySet[index]!==" "))){
                        error = true;
                        this["obj"+index].error=true;
                    }
                    if(( index=="Height" || index=='Weight' ) && this.bodySet[index] < 1 && typeof this.bodySet[index] !='number'){
                        error = true;
                        this["obj"+index].error=true;
                    }
                    if(index=="Phone" && this.bodySet[index].replace(/_/g,'').length<10) {
                        error = true;
                        this["obj"+index].error=true;
                    }
                  if(index=="Birthday" && (new Date().valueOf() < new Date(this.Birthday.substr(6,4),  this.Birthday.substr(3,2), this.Birthday.substr(0,2)).valueOf())) {
                    error = true;
                    this["obj"+index].error=true;
                  }
                }
                return error;
            }
        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">

  .music_btn{
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
  label{
    margin-top: 0!important;
  }
  .row{
    margin-top: 2px;
  }
  .pl{
    &.login label .razmer:nth-child(5)~.check {
      left: calc(70% + 70px);
    }
    &.login label .razmer {
      margin: 6px;
    }
  }
  @media screen and (max-height: 768px) and (orientation: landscape){
    .container{
      transform: scale(0.95);
    }
    .row{
      margin-top: 2px;
    }
    .formBlock{
      margin: 0 10px;
    }
    .avatar {
      width: 7vw;
      height: 7vw;
      margin-top: 10px;
      margin-bottom: 0px;
    }

    .login label {
      input[type=date], input[type=email], input[type=number], input[type=password], input[type=tel],
      input[type=text], option, select, .selectBlock {
        height: unset;
        font-size: 14px;
        padding: 2% 15px;
        margin-bottom: 10px;
        margin-top: 7px;
      }
      &.pointer2 span, &.radio {
        margin-top: 0px;
      }
    }
    .formBlock .Metrics {
      margin-bottom: 22px;
    }
    .formBlock .Metrics .btn {
      padding: 10px 0;
    }
    .login{
      padding: 17px 0 17px;
    }
  }
  @media screen and (max-width: 760px) {
    .firstPageContainer .row, .roww {
      margin: 5px 0;
    }
    .container{
      transform: scale(0.95);
    }
  }
  @media all and (-ms-high-contrast:none) and (max-height: 768px) and (orientation: landscape){
    .login label {
      .selectBlock, input[type=date], input[type=email], input[type=number], input[type=password],
      input[type=tel], input[type=text], option, select {
        height: auto !important;
      }
    }
    .usercomasdfgh .container{
      transform: none!important;
    }
  }
  @supports (display:-ms-grid) {
    .usercomasdfgh .container{
      transform: none!important;
    }
  }
  @media screen and (max-height: 500px) and (orientation: portrait) {
    .container {
      transform: scale(0.7);
      margin: -20%;
    }
    .prostoTask{
      height: 100vh;
    }
  }
</style>
