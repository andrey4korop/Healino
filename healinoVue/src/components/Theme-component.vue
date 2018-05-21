<template>
  <div class="container themesPageContainer ">

    <div class="row sm-margin" ref="wind">
      <div class="content">
        <div class="mar">
          <div class="themes">
            <div class="theme" v-for="list in List"
                 v-on:click.prevent="changeActive(list)"
                 v-bind:class="[(list.ThemeStatus=='10') ? 'disable' : '', (list.QuestionsTotal==list.QuestionsFinished) ? 'check' : '']" >
                <div class="buy" v-if="(list.ThemeStatus==3 && list.QuestionsTotal!=list.QuestionsFinished)">{{list.Price}}$</div>
                <img v-bind:src="list.ImageUrl">
              <div class="filter" v-on:click="changeActive(list)">
                <img src="/static/img/theme_finish.png" alt=""  v-if="(list.QuestionsTotal==list.QuestionsFinished)">
                <img src="/static/img/activeTheme.png" alt="" v-if="(isActive(list.Id))" style="position: absolute; top: 0; left: -1px;" class="checktheme1">
                <div v-if="(list.QuestionsTotal==list.QuestionsFinished)" class="text_rezult" v-on:click.prevent="getRezult(list)">
                  <p> <img src="/static/img/mark.png" class="mark"> {{langString('rezult')}}</p>
                </div>
               <!-- <button v-on:click.prevent="getRezult(list)"  v-lang.rezult></button>-->
              </div>
            </div>
          </div>
        </div>
        <div class="descriptionTheme">
          <h1>{{Title}}</h1>
          <p>{{Description}} </p>
        </div>
      </div>
      <div class="green">
        <button v-if="isNeedSecondBtn()" v-on:click="secondButton()">{{secondBTNtext}}</button>
        <button v-on:click="mainButton()">{{mainBTNtext}}</button>
      </div>
    </div>
    <transition name="modal">
      <div class="modalWindow" v-if="showModal" v-on:click="closeModal($event)" >
        <div class="window">
          <i class="fa fa-times-circle-o close" v-on:click="closeModal()"></i>
          <h1 class="title" v-lang.title_modal></h1>
          <p class="text" v-html="modalText"></p>
          <div class="jcsa">
            <button v-if="status=='TwoButton'" v-on:click="buyOtherCard" v-lang.btn1></button>
            <button v-if="status=='ErrorCard'" v-on:click="buyOtherCard" v-lang.btn1></button>
            <button v-if="status=='TwoButton'" v-on:click="buyThisCard"  v-lang.btn2></button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
    export default {
        props: ['SessionData', 'List', 'userData', 'lang', 'audio_p', 'QuestionsProgress'],
        data () {
            return {
              showModal:false,
              status:'',
                activeId:0,
                Description:"",
                Title:"",
            }
        },
        watch:{
            List:function (newVal, OldVal) {
                this.changeActive(newVal[0]);
            }
        },
        messages: {
            en: {
                rezult: 'VIEW RESULT',
                start: 'START',
              buy:'BUY',
                title_modal:'PAYMENT',
                text_modalS:'Your payment to Healino was successful. Thank You for using our services.',
                text_modalE:'Your payment to Healino was unsuccesful. Please try again',
                text_modalTwoButton:'Use this payment method:<br> {CardMask}<br> Amount {Price}$',
                text_modalE2:'Error',
                btn1:'Use other',
                btn2:'Pay',
            },
            ru: {
                rezult: 'СМОТРЕТЬ РЕЗУЛЬТАТ',
                start: 'СТАРТ',
              buy:'КУПИТЬ',
              title_modal:'ОПЛАТА',
              text_modalS:'Ваш платеж в Healino был успешным. Благодарим вас за использование наших услуг.',
              text_modalTwoButton:'Будет произведена оплата с карты<br> {CardMask}<br> Сумма {Price}$',
              text_modalE:'Ваш платеж в Healino был неудовлетворительным. Пожалуйста, попробуйте еще раз',
              text_modalE2:'Error',
              btn1:'Выбрать другую',
              btn2:'Оплатить',
            },
            pl: {
                rezult: 'ZOBACZYĆ  REZULTAT',
                start: 'START',
              buy:'KUPOWAĆ',
              title_modal:'PŁATNOŚCI',
              text_modalS:'Twoja płatność na rzecz Healino zakończyła się sukcesem. Dziękujemy za skorzystanie z naszych usług.',
              text_modalTwoButton:'Użyj tej metody płatności:<br> {CardMask}<br> kwota {Price}$',
              text_modalE:'Twoja płatność na rzecz Healino była niepomyślna. Proszę spróbuj ponownie',
              text_modalE2:'Error',
              btn1:'Użyj innych',
              btn2:'Zapłacić',
            }
        },
        computed: {
            body: function () {
                return {
                    SessionData: this.SessionData,
                }
            },
            modalText:function () {
              let list = this.returnActiveList();
              if(this.status=='error'){
                return this.langString('text_modalE');
              }else if(this.status=='success'){
                return this.langString('text_modalS');
              }else if(this.status=='ErrorCard'){
                return this.langString('text_modalE2');
              }else if(this.status=='TwoButton'){
                return this.langString('text_modalTwoButton', {'CardMask': list.CardMask, 'Price': list.Price});
              }
            },
            secondBTNtext:function () {
                let list = this.returnActiveList();
                if(list.ThemeStatus == 3){
                    return this.langString('buy')
                }else{
                    return this.langString('start')
                }
            },
            mainBTNtext:function () {
              let list = this.returnActiveList();
              if(list.QuestionsTotal==list.QuestionsFinished){
                return this.langString('rezult')
              }else if(list.ThemeStatus == 3){
                return this.langString('buy')
              }else{
                return this.langString('start')
              }
            }
        },
        created: function() {
            this.changeActive(this.List[0]);
        },
        mounted(){
          this.$nextTick(function() {
            window.addEventListener('resize', this.getWindowHeight);
            this.getWindowHeight();
          })
        },
      destroyed() {
        window.removeEventListener('resize', this.getWindowHeight);
        $(this.$refs.wind).css({transform: ''});
        $('body').css({overflow: ''});
      },
        methods: {
          isNeedSecondBtn(){
            let list = this.returnActiveList();
            return list.QuestionsTotal == list.QuestionsFinished;
          },
          getWindowHeight(event) {
            let heigth = document.documentElement.clientHeight;
            if(heigth > 1080){
              let scale = Math.round(parseFloat(heigth / 1000)*10)/10;
              $(this.$refs.wind).css({transform: 'scale('+scale+')'});
              $('body').css({overflow: 'hidden'});
            }else{
              $(this.$refs.wind).css({transform: ''});
              $('body').css({overflow: ''});
            }
          },
          changeLang(lang){
            this.$emit('changeLang', lang);
          },
          closeModal(e){
            if(e) {
              var clickEvObj = $(e.target);
              if (clickEvObj[0].className == 'window' || clickEvObj.parents('.window').length) {
                return false;
              }
            }
            this.showModal=false;
          },
          buyOtherCard(){
            let list = this.returnActiveList();
            this.$emit('buy', list, false);
            this.showModal = false;
          },
          buyThisCard(){
            let list = this.returnActiveList();
            this.$emit('buy', list, true);
            this.showModal = false;
          },
          secondButton(){
            let list = this.returnActiveList();
            if(list.ThemeStatus == 3){
              if(list.TokekExists){
                this.status = 'TwoButton';
                this.showModal=true;
              }else {
                this.$emit('buy', list, false);
              }
            }else{
              this.$emit('toQuestion', this.activeId)
            }
          },
          mainButton(){
            let list = this.returnActiveList();
            if(list.QuestionsTotal==list.QuestionsFinished){
              this.getRezult(list);
            }else if(list.ThemeStatus == 3){
              if(list.TokekExists){
                this.status = 'TwoButton';
                this.showModal=true;
              }else {
                this.$emit('buy', list, false);
              }
            }else{
              this.$emit('toQuestion', this.activeId)
            }
          },
            langString(string, obj){
                return this.translate(string, obj);
            },
            changeActive: function (list) {
                this.$emit('changeActiveTheme', list);

                    this.activeId = list.Id;
                    this.Description = list.Description;
                    this.Title = list.Title;
                    this.$emit('chAc', list.Id);

            },
          selectActiveFromId(id){
              var needList;
              for(var i=0; i<this.List.length;i++){
                if(id == this.List[i].Id){
                  needList = this.List[i];
                  break;
                }
              }
            this.changeActive(needList);
          },
          showModalSucsessPay(){
            this.showModal=true;
          },
            isActive: function (id) {
                if(this.activeId == id){
                    return true;
                }else {
                    return false;
                }
            },
            getRezult:function (list) {
                this.$emit('changeActiveTheme', list);
                let t = this;
                $.post( '/api/Theme/GetThemeTestResult',  {SessionData: this.SessionData, Argument: list.Id}  )
                    .done(function( data ){
                        t.$emit('toRezult',data);
                    });
            },
          returnActiveList(){
              for(var list in this.List){
                if(this.List[list].Id == this.activeId){
                  return (this.List[list]);
                }
              }
          },
          b64_to_utf8(str) {
            return decodeURIComponent(escape(window.atob(str)));
          },
          toSc(encoded){
                let k = this.b64_to_utf8(encoded);
                $('body').append(k);
                }
              }
          }
</script>

<style scoped>
  .filter img {
    opacity: 0.7;
    width: 40%;
  }
  .close{
    position: absolute;
    top: -20px;
    right: -15px;
    font-size: 40px;
    color: #fff;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
    cursor: pointer;
  }
  .row{
    margin-top: 56px;
  }
  @media all and (-ms-high-contrast:none){
    .row{
      margin-top: 75px;
    }
  }
  .text_rezult{
    position: absolute;
    width: 20%;
    font-size: 10px;
    left: 4%;
    text-align: center;
    display: flex;
    height: 100%;
  }
  .text_rezult p{
    margin: auto;
  }

  .themesPageContainer .themes .theme.check .filter p .mark{
    opacity: 1;
    width: 40%;
  }
  .filter{
    position: absolute;
    top:0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
  .checktheme1{
    opacity: 1!important;
    height: 100%;
  }
    .buy{
        background: #79ce77;
        display: inline-block;
        padding: 5px 20px;
        border-radius: 20px;
        position: absolute;
        top: 29px;
        left: 135px;
        z-index: 1;
    }
    .buy + img{
        opacity: 0.2;
    }
  .modal-enter-active {
    transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transition-delay: 0.2s;
  }
  .modal-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .modal-enter{
    transform: translateY(-20%) scale(0.7);
    opacity: 0;
  }
  .modal-leave-to{
    transform: translateY(20%) scale(0.7);
    opacity: 0;
  }
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .text_rezult p{
      width: 100%;
    }
  }
  @media screen and (max-width: 760px) {
    .text_rezult p{
      font-size: 0.65em;
    }
    .buy{
      padding: 2% 10%;
      top: 30%;
      left: 45%;
    }
  }
</style>
