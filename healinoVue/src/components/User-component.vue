<template>

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
                 v-model="Birthday" v-on:change="change(objBirthday, Birthday)"
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
        <!--<label>
          <p><span>*</span>{{langString('race')}}</p>
          <select v-model="Race" v-on:change="change(objRace, Race)">
            <option value="0">Caucasian</option>
            <option value="1">Asian</option>
            <option value="2">African </option>
          </select>
          <span class="check" v-bind:class="(objRace.showLoad) ? 'loading': ''" v-if="objRace.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objRace.error) ? 'error' : ''" v-if="objRace.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>-->
        <label>
          <p><span>*</span>{{langString('race')}}</p></label>
        <selectBlock
                     :valueItem="Race"
                     :selectOption="raseOption"
                     :errorQuest="false"
                     @changeValSelect="changeRace"
        ></selectBlock>
        <label>
          <p><span>*</span>{{langString('phone')}}</p>
          <!--<input type="tel" pattern="^(?:0|\(?\+\)?\s?|00\s?)[1-79](?:[\.\-\s]?\d\d){4}$"
                 v-model="Phone" v-on:change="change(objPhone, Phone)">-->
          <!--<the-mask
                    v-model="Phone"
                    v-on:change="change(objPhone, Phone)"
                    type="tel"
                    placeholder="(111)111-11-11"></the-mask>-->
          <!--<masked-input
                  v-on:change="change(objPhone, Phone)"
                  v-model="Phone"
                  mask="\+111111111111"
                  placeholder="+xxxxxxxxxxxx"
                  type="text" />-->
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
      <div class="formBlock login">
        <div class="Metrics">
          <div class="btn" v-bind:class="[(PersonMeasurementSystem == '0') ? 'active': '']"
                            v-on:click="changeMetrics('0')">{{langString('metric')}}</div>
          <div class="btn" v-if="language=='en'"
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
              save:'UPDATE',
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
              save:'ОБНОВИТЬ',
            },
            pl: {
                name: 'Imię',
                surname: 'Nazwisko',
                date: 'Data urodzenia',
                location: 'Lokalizacja',
                race: 'Rasa ',
                phone: 'numer telefonu',
                metric: 'Metryki',
                height: 'Wzrost',
                cm: 'cm',
                ft: 'st',
                inn: 'ca',
                weight: 'Waga',
                kg: 'kg',
                lb: 'fu',
                oz: 'un',
                activity: 'Poziom aktywności ',
                gender: 'płeć',
                male: 'męska',
                female: 'żeńska',
                someDate: 'Data aktualizacji',
                button: 'REJESTRACJA',
              save:'AKTUALIZACJA',
            },
        },
        computed: {
          raseOption:function(){
            let r =[];
            r.push({key: 0, title: 'Caucasian', Id:0});
            r.push({key: 1, title: 'Asian', Id:1});
            r.push({key: 2, title: 'African', Id:2});
            return r;
          },
          activityOption:function(){
            let r =[];
            r.push({key: 0, title: 'No Activity', Id:0});
            r.push({key: 1, title: 'Sedentary', Id:1});
            r.push({key: 2, title: 'Low Active', Id:2});
            r.push({key: 3, title: 'Moderately Active', Id:3});
            r.push({key: 4, title: 'Very Active', Id:4});
            r.push({key: 5, title: 'Extra Active', Id:5});
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

            for(var index in this.userData) {

                 if(this.userData[index] && index in this){
                     this[index] = this.userData[index];
                     if(index == 'Birthday'){
                         this.Birthday = this.birth(this.userData.Birthday);
                       console.log(this.userData.Birthday);
                       console.log(this.Birthday);
                     }
                     this['obj'+index].showCheck= true;
                     this['obj'+index].showLoad= false;
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
            /*Phone:function (newVal,oldVal) {
                this.objPhone.showCheck = true;
                this.objPhone.showLoad = true;
                this.objPhone.error = false;
                let t = this;
                if(newVal.replace(/_/g,'').length>11) {
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
            },*/
            /*Birthday:function (newVal,oldVal) {
                this.objBirthday.showCheck = true;
                this.objBirthday.showLoad = true;
                this.objBirthday.error = false;
                let t = this;
                if(newVal.indexOf('_')<0) {
                    setTimeout(function () {
                        t.objBirthday.showLoad = false;
                        if ((new Date(newVal.substr(6,4), newVal.substr(3,2)-1, newVal.substr(0,2)) == 'Invalid Date') || (newVal.substr(3,2)>12) ||  (newVal.substr(0,2)>31)) {
                            t.objBirthday.showCheck = false;
                            t.objBirthday.error = true;
                        }else{
                            t.objBirthday.showCheck = true;
                        }
                    }, 1600);
                }else{
                    setTimeout(function () {
                        t.objBirthday.showLoad = false;
                        t.objBirthday.showCheck = false;
                        t.objBirthday.error = false;
                    }, 1500);
                }

            }*/
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
                }
                return error;
            }
        }
    }
</script>

<style scoped>
  .music_btn{
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
  @media screen and (max-width: 760px) {
    .firstPageContainer .row, .roww {
      margin: 5px 0;
    }

  }
  .row{
    margin-top: 2px;
  }
  @media screen and (max-height: 768px) and (orientation: landscape){
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
    .login label input[type=date], .login label input[type=email], .login label input[type=number], .login label input[type=password], .login label input[type=tel], .login label input[type=text], .login label option, .login label select, .login label .selectBlock {
      height: unset;
      font-size: 14px;
      padding: 2% 15px;
      margin-bottom: 10px;
      margin-top: 7px;
    }
    .login label.pointer2 span, .login label.radio {
      margin-top: 0px;
    }
    .formBlock .Metrics {
      margin-bottom: 22px;
    }
    .formBlock .Metrics .btn {
      padding: 10px 0;
    }
    .login{
      padding: 30px 0 25px;
    }
  }
  @media all and (-ms-high-contrast:none) and (max-height: 768px) and (orientation: landscape){
    .login label .selectBlock,
    .login label input[type=date],
    .login label input[type=email],
    .login label input[type=number],
    .login label input[type=password],
    .login label input[type=tel],
    .login label input[type=text],
    .login label option,
    .login label select{
      height: auto!important;
    }
  }
</style>
