<template>

  <div class="container firstPageContainer">
    <div class="row">
      <div class="avatar">
        <img src="static/img/userAvatar.png" alt="">
      </div>
    </div>
    <form class="roww">
      <div class="formBlock login">
        <label>
          <p><span>*</span>Name</p>
          <input type="text" v-model="Name" v-on:change="change(objName, Name)" v-bind:disabled="objName.disable">
          <span class="check" v-bind:class="(objName.showLoad) ? 'loading': ''" v-if="objName.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objName.error) ? 'error' : ''" v-if="objName.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>Family Name</p>
          <input type="text" v-model="SurName" v-on:change="change(objSurName, SurName)" v-bind:disabled="objSurName.disable">
          <span class="check" v-bind:class="(objSurName.showLoad) ? 'loading': ''" v-if="objSurName.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objSurName.error) ? 'error' : ''" v-if="objSurName.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>Date of Birth</p>
          <input type="date" v-model="Birthday" v-on:change="change(objBirthday, Birthday)">
          <span class="check" v-bind:class="(objBirthday.showLoad) ? 'loading': ''" v-if="objBirthday.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objBirthday.error) ? 'error' : ''" v-if="objBirthday.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>Location</p>
          <input type="text" v-model="Location" v-on:change="change(objLocation, Location)" v-bind:disabled="objLocation.disable">
          <span class="check" v-bind:class="(objLocation.showLoad) ? 'loading': ''" v-if="objLocation.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objLocation.error) ? 'error' : ''" v-if="objLocation.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>Race</p>
          <select v-model="Race" v-on:change="change(objRace, Race)">
            <option value="0">White</option>
            <option value="1">Asian</option>
            <option value="2">African </option>
          </select>
          <span class="check" v-bind:class="(objRace.showLoad) ? 'loading': ''" v-if="objRace.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objRace.error) ? 'error' : ''" v-if="objRace.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>Phone</p>
          <input type="tel" v-model="Phone" v-on:change="change(objPhone, Phone)">
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
                            v-on:click="changeMetrics('0')">Metrics</div>
          <div class="btn" v-bind:class="[(PersonMeasurementSystem == '1') ? 'active': '']"
                            v-on:click="changeMetrics('1')">US</div>
        </div>
        <label v-if="PersonMeasurementSystem == '0'">
          <p><span>*</span>Heigth</p>
          <input type="number" class="number" v-model="Height" v-on:change="change(objHeight, Height)">
          <span class="razmer">cm</span>
          <span class="check" v-bind:class="(objHeight.showLoad) ? 'loading': ''" v-if="objHeight.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objHeight.error) ? 'error' : ''" v-if="objHeight.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label v-if="PersonMeasurementSystem == '0'">
          <p><span>*</span>Weigth</p>
          <input type="number" class="number" v-model="Weight" v-on:change="change(objWeight, Weight)">
          <span class="razmer">kg</span>
          <span class="check" v-bind:class="(objWeight.showLoad) ? 'loading': ''" v-if="objWeight.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objWeight.error) ? 'error' : ''" v-if="objWeight.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label v-if="PersonMeasurementSystem == '1'">
          <p><span>*</span>Heigth</p>
          <input type="number" class="number" v-model="Height" v-on:change="change(objHeight, Height)">
          <span class="razmer">ft</span>
          <input type="number" class="number"  v-model="HeightAdditional" v-on:change="change(objHeight, Height)">
          <span class="razmer">in</span>
          <span class="check" v-bind:class="(objHeight.showLoad) ? 'loading': ''" v-if="objHeight.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objHeight.error) ? 'error' : ''" v-if="objHeight.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label v-if="PersonMeasurementSystem == '1'">
          <p><span>*</span>Weigth</p>
          <input type="number" class="number" v-model="Weight" v-on:change="change(objWeight, Weight)">
          <span class="razmer">lb</span>
          <input type="number" class="number"  v-model="WeightAdditional" v-on:change="change(objWeight, Weight)">
          <span class="razmer">oz</span>
          <span class="check" v-bind:class="(objWeight.showLoad) ? 'loading': ''" v-if="objWeight.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objWeight.error) ? 'error' : ''" v-if="objWeight.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>Activity</p>
          <select v-model="Activity" v-on:change="change(objActivity, Activity)">
            <option value="0">NoActivity</option>
            <option value="1">Sedentary</option>
            <option value="2">LowActive</option>
            <option value="3">ModeratelyActive</option>
            <option value="4">VeryActive</option>
            <option value="5">ExtraActive</option>
          </select>
          <span class="check" v-bind:class="(objActivity.showLoad) ? 'loading': ''" v-if="objActivity.showCheck">
            <i class="fa fa-check" aria-hidden="true"></i>
          </span>
          <span class="check" v-bind:class="(objActivity.error) ? 'error' : ''" v-if="objActivity.error">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </label>
        <label>
          <p><span>*</span>Gender</p>
        </label>
        <label class="pointer radio">

          <input type="radio" name="raz" value="0" v-model="Gender" >
          <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span>Male</span>
        </label>
        <label class="pointer radio">

          <input type="radio" name="raz" value="1" v-model="Gender">
          <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span>Female</span>
        </label>
        <label class="bottom">
          <p>Date Actualization: 24.09.2017</p>
        </label>
      </div>


    </form>
    <div class="row">
      <div class="firstPage fifthPage">
        <button v-on:click.prevent="updateUser">SING UP</button>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        props: ['SessionData', 'userData'],
        data () {
            return {
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
                    error:false
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


            }
        },
        computed: {
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
                    Birthday:this.Birthday,
                    Location:this.Location,
                    Race:this.Race,
                    Phone:this.Phone,
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
        created: function() {
            //this.Birthday = this.birth();
           // let t = this;
           // console.log('getUser');
           // $.post( 'http://healino-api.azurewebsites.net/api/Account/GetUserProfile',  this.bodyGet  )
                //.done(function( data ){
                    //if(data.ErrorCode==1 || data.UserId != null){
            for(var index in this.userData) {

                 if(this.userData[index] && index in this){
                     this[index] = this.userData[index];
                     if(index == 'Birthday'){
                         this.Birthday = this.birth(this.userData.Birthday);
                     }
                     this['obj'+index].showCheck= true;
                     this['obj'+index].showLoad= false;
                     if((index=='Name' || index=='SurName' || index=='Location')&& this.userData[index]){
                         this['obj'+index].disable = true;
                     }
                 }
            }
                      /*this.Name = this.userData.Name;
                      this.SurName = this.userData.SurName;
                      this.Birthday = this.birth(this.userData.Birthday);
                      this.Location = this.userData.Location;
                      this.Race = this.userData.Race;
                      this.Phone = this.userData.Phone;
                      this.Height = this.userData.Height;
                      this.HeightAdditional = this.userData.HeightAdditional;
                      this.Weight = this.userData.Weight;
                      this.WeightAdditional = this.userData.WeightAdditional;
                      this.Activity = this.userData.Activity;
                      this.Gender = this.userData.Gender;
                      this.PersonMeasurementSystem = this.userData.PersonMeasurementSystem;*/
                        // console.log(data);
                  //  }
               // })
               // .fail(function() {
               //     console.log("error" );
              //  });
        },
        methods: {
            birth:function(strDate){
                let date;
                if(strDate){
                    date = new Date(strDate);
                }
                else {
                    date = new Date();
                }
                return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
            },
            changeMetrics:function (metrics) {
                this.PersonMeasurementSystem = metrics;
            },
            updateUser:function () {
                let t = this;
                if(!this.checkBody()){
                  $.post( 'http://healino-api.azurewebsites.net/api/Account/UpdateUserInformation',  this.bodySet  )
                      .done(function( data ){
                          console.log(data)
                          t.$emit('toTheme');
                      });
                }
            },
            change(obj, val){
                let t = this;
                console.log(t);
                console.log(obj);
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
            checkBody(){
                let error = false;
                //console.log(this.bodySet);
                for(let index in this.bodySet){
                    //console.log(index + " : " + this.bodySet[index]);
                    //console.log(this.bodySet[index]);
                    if(!(this.bodySet[index]=== "0"|| this.bodySet[index]=== 0 ||(this.bodySet[index]!=null && this.bodySet[index]!="" && this.bodySet[index]!=" "))){
                        error=true;
                        this["obj"+index].error=true;
                        //console.log(error);
                        //break;
                    }
                }
                //console.log(error);
                return error;
            }
        }
    }
</script>

<style>

</style>
