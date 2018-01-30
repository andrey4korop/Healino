<template>

  <div class="container themesPageContainer">
    <div class="header">
      <div class="headerContainer">
        <a href="/" class="logo_head"><img src="static/img/logoHeader.png" alt="" class=""></a>
        <a href="/" class="logo_head m"><img src="static/img/logoM.png" alt="" class=""></a>
        <a href="/">Home</a>
        <a href="/">Forum</a>
        <h3>77%</h3>
        <div class="lang">
          <img src="static/img/langUA.png" alt="" class="">
          <ul>
            <li><img src="static/img/langPL.png" alt=""></li>
            <li><img src="static/img/langUSA.png" alt=""></li>
            <li><img src="static/img/langUA.png" alt=""></li>
          </ul>
        </div>

        <img src="static/img/userAvatar.png" alt="" class="user_Avatar">
      </div>
    </div>
    <div class="row">
      <div class="content">
        <div class="mar">
          <div class="themes">

            <div class="theme" v-for="list in List"
                 v-on:click.prevent="changeActive(list)"
                 v-bind:style="{background: 'url(' + list.ImageUrl + ') center center / cover' }"
                 v-bind:class="[(list.ThemeStatus=='3') ? 'disable' : '', (list.ThemeStatus=='2') ? 'check' : '', (isActive(list.Id)) ? 'active' : '' ]" >
              <div class="filter" v-on:click="changeActive(list)">
                <img src="static/img/mark.png" alt="">
                <button v-on:click.prevent="getRezult(list)">VIEW RESULT</button>
              </div>
            </div>

          </div>
        </div>
        <div class="description">
          <h1>{{Title}}</h1>
          <p>{{Description}} </p>
          <!--<h4>Lorem ipsum dolor sit amet.</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi asperiores cumque dicta
            dignissimos distinctio eius esse, id illo numquam omnis perferendis provident quod repellendus sequi
            veritatis?</p>-->
        </div>
      </div>
      <div class="green">
        <button v-on:click="$emit('toQuestion', activeId)">START</button>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
        props: ['SessionData', 'List'],
        data () {
            return {
                activeId:0,
                Description:"",
                Title:"",
                /*List: [
                    {
                        Description: "",
                        Id: 0,
                        ImageUrl:"",
                        QuestionsFinished: 0,
                        QuestionsTotal: 0,
                        ThemeStatus: 0,
                        Title: "",
                    }
                ]*/

            }
        },
        computed: {
            body: function () {
                return {
                    SessionData: this.SessionData,
                }
            },

        },
        created: function() {
           /* let t = this;
            $.post( 'http://healino-api.azurewebsites.net/api/Theme/GetAllThemes',  this.body  )
                .done(function( data ){
                    t.List = data.List;
                    console.log(data)
                });*/
        },
        methods: {
            changeActive: function (list) {
                console.log('changeActive');
                if(list.ThemeStatus == 0 || list.ThemeStatus == 1 || list.ThemeStatus == 2 ) {
                    this.activeId = list.Id;
                    this.Description = list.Description;
                    this.Title = list.Title;
                    this.$emit('chAc', list.Id);
                }
            },
            isActive: function (id) {
                //console.log(id);
                if(this.activeId == id){
                    return true;
                }else {
                    return false;
                }
            },
            getRezult:function (list) {
                $.post( 'http://healino-api.azurewebsites.net/api/Theme/GetThemeTestResult',  this.bodyForResult(list)  )
                    .done(function( data ){
                        //t.List = data.List;
                        console.log(data)
                    });
            },
            bodyForResult: function (list) {
                return {
                    SessionData: this.SessionData,
                    Argument: list.Id,
                }
            },
        }
    }
</script>

<style>

</style>
