<template>
    <label v-bind:id="className">
        <div class="selectBlock"
             v-on:click="setShowSelectId"
             v-bind:class="(visibleBlock?'hidden':'')"
             v-bind:style="{zIndex:(selectedBlock==className)?'1000':''}"
             ref="selectBlock"
        >
            {{title}}
        </div>
        <div class="selectBlockNeed" v-if="visibleBlock" v-on:click="changeSelectColor(0)">
            <div class="select">
                <p class="option" v-for="ans in selectOption"
                   v-on:click="setValueId(ans.key, ans.title, $event)"
                   v-bind:class="(ans.key==Id) ? 'active' : ''">{{ans.title}}</p>
            </div>
            <div class="nocolorActive" v-if="visibleBlock" v-on:click="changeSelectColor(-1)"></div>
            <div class="colorActive" v-if="visibleBlock" v-on:click="changeSelectColor(0)"></div>
            <div class="nocolorActive" v-if="visibleBlock" v-on:click="changeSelectColor(1)"></div>
        </div>
        <span class="check"  v-bind:class="(showLoadSelect==true) ? 'loading': ''" v-if="showCheckSelect">
          <i class="fa fa-check" aria-hidden="true"></i>
        </span>
        <span class="check" v-bind:class="(errorQuest && !Id) ? 'error' : ''" v-if="errorQuest">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
    </label>
</template>

<script>
export default {
   props: ['valueItem','selectOption', 'errorQuest', 'selectedBlock' ],
    data () {
        return {
            Id:0,
            title:'',
            showSelectId:false,
            isAnimating:false,

            currentAnchor:0,
            anchors:[],
            touchstartY:0,
            touchendY:0,

            showCheckSelect:false,
            showLoadSelect:false,
            className:'',

            timer:null,
            elHeight:0,
        }},
    watch:{

    },
    created: function() {
        this.Id = this.valueItem;
        if((typeof this.Id === "number" || typeof this.Id === "string") && parseInt(this.Id)>-1){
            this.title = this.selectOption[this.Id].title;
        }else{
            this.Id = 0;
        }
        this.currentAnchor = this.Id;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        this.className=text;
    },
    computed: {
        idClass:function () {
            return '#'+this.className
        },
        visibleBlock:function () {
            return this.showSelectId && this.selectedBlock == this.className;
        }
    },
    methods:{
        updateAnchors() {
            this.anchors = [];
            let t = this;
            $(this.idClass+' p.option').each(function(i, element){
                t.anchors.push( $(element).position().top );
            })
            if(!this.anchors.length){
                setTimeout(function(){
                    t.updateAnchors()
                },3)
            }
        },
        changeVal: function () {
            if(this.Id!=-1 && this.Id!=='' && this.Id!==null && (typeof this.Id =='number' || typeof this.Id =='string' )) {
                this.title = this.selectOption[this.Id].title;
                this.$emit('changeValSelect', this.Id);
            }
        },
        changeSelectColor(w){
            if(w==-1 && this.currentAnchor>0){
                this.Id = --this.currentAnchor;

            }else if(w==1 && this.currentAnchor<this.anchors.length-1){
                this.Id = ++this.currentAnchor;
            }else{
                this.Id = this.currentAnchor;
            }
            this.changeVal();
            this.showSelectId = false;
            this.changeSelect();
            this.$emit('pushSelectOption', this.selectOption[this.Id].title);
        },
        changeSelect(){
            let t = this;
            this.showCheckSelect = true;
            this.showLoadSelect =true;
            this.changeVal();
            setTimeout( function () {
                t.showLoadSelect = false;
            }, 1500);
        },
        fun(){
            let t = this;
            if ($(t.idClass + ' .active').length > 0) {
                t.currentAnchor = $(t.idClass + ' .active').index();
                t.Id = t.currentAnchor;
                t.changeVal();
                $(t.idClass + ' .select').scrollTop(t.anchors[t.currentAnchor] - (150 - $(t.idClass + ' .option')[t.currentAnchor].offsetHeight) / 2);
            } else {
                t.Id = 0;
                t.currentAnchor = 0;
                t.changeVal();
                $(t.idClass + ' .select').scrollTop(0);
            }
            let o = $($(t.idClass + ' .option')[t.currentAnchor]);
            $(t.idClass + ' .colorActive').css({'height': o.height(), 'top': (150 - o.height()) / 2});
            $(t.idClass + ' .nocolorActive:first').css({'height': (150 - o.height()) / 2});
            $(t.idClass + ' .nocolorActive:last-child').css({
                'top': (150 - o.height()) / 2 + o.height(),
                'height': (150 - o.height()) / 2
            });
        },
        setShowSelectId(event){
            this.isAnimating=false;
            if(event.target.className == "selectBlock") {
                this.showSelectId = true;
                this.$parent.selectedBlock = this.className;
                let t = this;
                setTimeout(function () {
                    t.updateAnchors();
                    if(t.anchors.length) {
                        t.fun();
                    }else {
                        setTimeout(function(){
                            t.updateAnchors();
                            t.fun();
                        },3)
                    }
                },10);
            }
        },
        handleGesure(k) {
            let t = this;
            if (t.isAnimating) {
                return false;
            }
            t.isAnimating  = true;
            if((Math.abs(t.touchendY-t.touchstartY)>30)){
                if (this.touchendY < this.touchstartY) {
                    //alert( 'up!');
                    if (t.currentAnchor<t.anchors.length-1) {
                        t.currentAnchor++;
                    }

                    t.Id = t.currentAnchor;
                    t.changeVal();
                    if (t.currentAnchor > (t.anchors.length - 1) || t.currentAnchor < 0) {
                        t.currentAnchor = 0;
                    }
                    t.isAnimating = true;
                    let o = $($(t.idClass+' .option')[t.currentAnchor]);
                    $(t.idClass+' .colorActive').css({'height':o.height(), 'top':(150-o.height())/2});
                    $(t.idClass+' .nocolorActive:first').css({'height':(150-o.height())/2});
                    $(t.idClass+' .nocolorActive:last-child').css({'top':(150-o.height())/2 + o.height(), 'height':(150-o.height())/2});
                    $(t.idClass+' .select').animate({
                        scrollTop: parseInt( t.anchors[t.currentAnchor]-(150-o.height())/2 )//55
                    }, 200, 'swing', function(){
                        t.isAnimating  = false;
                    });
                    if(k=='1'){
                        t.touchstartY = t.touchendY;
                    }
                }
                if (this.touchendY > this.touchstartY) {
                    if (t.currentAnchor > 0) {
                        t.currentAnchor--;
                    }
                    t.Id = t.currentAnchor;
                    t.changeVal();
                    /*if (t.currentAnchor > (t.anchors.length - 1)
                            || t.currentAnchor < 0) {
                        t.currentAnchor = 0;
                    }*/
                    t.isAnimating = true;
                    t.isAnimating = true;
                    let o = $($(t.idClass+' .option')[t.currentAnchor]);
                    $(t.idClass+' .colorActive').css({'height':o.height(), 'top':(150-o.height())/2});
                    $(t.idClass+' .nocolorActive:first').css({'height':(150-o.height())/2});
                    $(t.idClass+' .nocolorActive:last-child').css({'top':(150-o.height())/2 + o.height(), 'height':(150-o.height())/2});
                    $(t.idClass+' .select').animate({
                        scrollTop: parseInt( t.anchors[t.currentAnchor]-(150-o.height())/2 )//55
                    }, 200, 'swing', function(){
                        t.isAnimating  = false;
                    });
                    if(k=='1'){
                        t.touchstartY = t.touchendY;
                    }
                }
            }
        }
    },
    mounted(){
        let t = this;
        this.timer = setInterval(function(){
            if( t.$refs.selectBlock.offsetHeight != t.elHeight ) {
                t.elHeight = t.$refs.selectBlock.offsetHeight;
                $(t.idClass+' .check').css({'top': (t.elHeight - 13)/2})
            };
        },200);
        t.touchstartY = 0;
        t.touchendY = 0;
        $(document).on('touchstart', t.idClass+' .selectBlockNeed, .colorActive', function(event) {
            if ($(event.target).parents(t.idClass).length) {
                t.isAnimating = false;
                t.touchstartY = event.originalEvent.touches[0].screenY;
            }
        });

        $(document).on('touchend', t.idClass+' .selectBlockNeed, .colorActive', function(event) {
            if ($(event.target).parents(t.idClass).length) {
                t.touchendY = event.originalEvent.changedTouches[0].screenY;
                t.handleGesure();
            }
        });
        $(document).on('touchmove', t.idClass+' .selectBlockNeed, .colorActive', function(event) {
            if ($(event.target).parents(t.idClass).length) {
                if ((Math.abs(event.originalEvent.changedTouches[0].screenY - t.touchstartY) > 40)) {
                    t.touchendY = event.originalEvent.changedTouches[0].screenY;
                    t.handleGesure('1');
                }
                event.preventDefault();
            }
        });

        $('body').on('mousewheel', t.idClass+' .selectBlockNeed, .colorActive', function(event) {
            event.preventDefault();
            event.stopPropagation();
            if ($(event.target).parents(t.idClass).length) {
                if (t.isAnimating) {
                    return false;
                }
                t.isAnimating = true;
                if (event.originalEvent.wheelDelta >= 0) {
                    if (t.currentAnchor > 0) {
                        t.currentAnchor--;
                    }
                } else {
                    if (t.anchors.length - 1 != t.currentAnchor) {
                        t.currentAnchor++;
                    }
                }
                t.Id = t.currentAnchor;
                t.changeVal();
                if (t.currentAnchor > (t.anchors.length - 1) || t.currentAnchor < 0) {
                    t.currentAnchor = 0;
                }
                t.isAnimating = true;

                t.isAnimating = true;
                let o = $($(t.idClass+' .option')[t.currentAnchor]);
                $(t.idClass+' .colorActive').css({'height':o.height(), 'top':(150-o.height())/2});
                $(t.idClass+' .nocolorActive:first').css({'height':(150-o.height())/2});
                $(t.idClass+' .nocolorActive:last-child').css({'top':(150-o.height())/2 + o.height(), 'height':(150-o.height())/2});
                $(t.idClass+ ' .select').animate({
                    scrollTop: parseInt(t.anchors[t.currentAnchor] - (150 - o.height()) / 2)//55
                }, 200, 'swing', function () {
                    t.isAnimating = false;
                });
            }
        });
    },
    destroyed(){
        $(document).unbind('touchstart');
        $(document).unbind('touchend');
        $(document).unbind('touchmove');
        $('body').unbind('mousewheel');
        clearTimeout(this.timer);
    },
}
</script>
<style scoped>
    label{
        z-index: 100;
        -webkit-user-select: none;
        /* user-select -- это нестандартное свойство */

        -moz-user-select: none;
        /* поэтому нужны префиксы */

        -ms-user-select: none;
    }
    .selectBlock {
        width: 100%;
        font-size: 16px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: url(/static/img/Arrow.png) no-repeat #fffffe;
        border: none;
        border-top: 1px solid #e5e6e5;
        /*border-radius: 15px;*/
        color: #b8b8b8;
        margin-bottom: 20px;
        margin-top: 7px;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: .01px;
        text-overflow: '';
        -ms-appearance: none;
        appearance: none!important;
        background-position-x: 94%;
        background-position-y: center;
        z-index: 100;


        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        height: auto;
        min-height: 38px;
        padding: 5px 40px 5px 15px;
    }
    .option:first-child{
        margin-top: 55px;
    }
    .option:last-child{
        margin-bottom: 55px;
    }
    .option{
        transition: all .1s cubic-bezier(0.4, 0, 1, 1);
        line-height: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 36px;
    }
    .option.active{
         font-size: 20px!important;
     }
    .select{
        font-size: 18px!important;;
    /*@include sm(font-size, 19px);*/
        color: #827d7e;
        border-radius: 15px;
        border: 2px solid #e1e1e1;
        overflow-y: hidden;
        background: #fff;
        max-height: 150px;
        text-align: center;
        box-sizing: border-box;
        z-index: -1;
        width: 100%;
        position: relative;
    }
    .colorActive{
        background-color: #79cd77;
        opacity: 0.43;
        height: 40px;
        width: 100%;
        position: absolute;
        z-index: 100;
        top:56px;
        transition: all 0.2s linear;
    }
    .nocolorActive{
        background-color: transparent;
        opacity: 0;
        height: 40px;
        width: 100%;
        position: absolute;
        z-index: 100;
        top:0px;
    }
    .nocolorActive:last-child{
        background-color: transparent;
        opacity: 0;
        height: 40px;
        width: 100%;
        position: absolute;
        z-index: 100;
        top:100px;
    }
    .selectBlockNeed{
        position: absolute;
        width: 100%;
        box-shadow: inset 0px 10px 30px 0px #fff, inset 0px -10px 30px 0px #fff;
        height: 150px;
        top: -50px;
        border-radius: 15px;
        border: 1px solid #e5e6e5
    }
    p.option{
        margin-left: unset;
        text-align: center !important;
    }
    .hidden{
        visibility: hidden;
    }
    .check {
        display: inline-block;
        width: 25px;
        height: 25px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        font-size: 14px;
        color: #fff;
        border-radius: 13px;
        border: 3px solid #70cf47;
        background: #70cf47;
        position: absolute;
        top: 13px;
        left: calc(100% + 10px);
    }
</style>