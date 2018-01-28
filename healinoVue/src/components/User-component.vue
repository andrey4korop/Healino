<template>

  <div class="container firstPageContainer">
    <div class="row">
      <div class="avatar">
        <img src="static/img/userAvatar.png" alt="">
      </div>
    </div>
    <form class="row">
      <div class="formBlock login">
        <label>
          <p><span>*</span>Name</p>
          <input type="text" v-model="Name">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Family Name</p>
          <input type="text" v-model="SurName">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Date of Birth</p>
          <input type="date" v-model="Birthday">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Location</p>
          <input type="text" v-model="Location">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Race</p>
          <select v-model="Race">
            <option value="0">White</option>
            <option value="1">Asian</option>
            <option value="2">African </option>
          </select>
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Phone</p>
          <input type="tel" v-model="Phone">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
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
          <input type="number" class="number" v-model="Height">
          <span class="razmer">cm</span>
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label v-if="PersonMeasurementSystem == '0'">
          <p><span>*</span>Weigth</p>
          <input type="number" class="number" v-model="Weight">
          <span class="razmer">kg</span>
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label v-if="PersonMeasurementSystem == '1'">
          <p><span>*</span>Heigth</p>
          <input type="number" class="number"  v-model="Height">
          <span class="razmer">ft</span>
          <input type="number" class="number"  v-model="HeightAdditional">
          <span class="razmer">in</span>
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label v-if="PersonMeasurementSystem == '1'">
          <p><span>*</span>Weigth</p>
          <input type="number" class="number" v-model="Weight">
          <span class="razmer">lb</span>
          <input type="number" class="number"  v-model="WeightAdditional">
          <span class="razmer">oz</span>
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Activity</p>
          <select v-model="Activity">
            <option value="0">NoActivity</option>
            <option value="1">Sedentary</option>
            <option value="2">LowActive</option>
            <option value="3">ModeratelyActive</option>
            <option value="4">VeryActive</option>
            <option value="5">ExtraActive</option>
          </select>
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Gender</p>
        </label>
        <label class="pointer radio">

          <input type="radio" name="raz" value="0" v-model="Gender">
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
                Height:"",
                HeightAdditional:"",
                Weight:"",
                WeightAdditional:"",
                Activity:"0",
                Gender:"0",
                PersonMeasurementSystem:"0",

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
                      this.Name = this.userData.Name;
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
                      this.PersonMeasurementSystem = this.userData.PersonMeasurementSystem;
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
                $.post( 'http://healino-api.azurewebsites.net/api/Account/UpdateUserInformation',  this.bodySet  )
                    .done(function( data ){
                        console.log(data)
                    });
                this.$emit('toTheme');
            },
        }
    }
</script>

<style>

</style>
