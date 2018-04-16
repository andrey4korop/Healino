<template>
    <label v-bind:id="className">
        <div class="selectBlock"
             v-on:click="setShowSelectId"
             v-bind:class="(showSelectId?'hidden':'')"
        >
            {{title}}
        </div>
        <div class="selectBlockNeed" v-if="showSelectId" v-on:click="changeSelectColor(0)">
            <div class="select">
                <p class="option" v-for="ans in selectOption"
                   v-on:click="setValueId(ans.key, ans.title, $event)"
                   v-bind:class="(ans.key==Id) ? 'active' : ''">{{ans.title}}</p>
            </div>
            <div class="nocolorActive" v-if="showSelectId" v-on:click="changeSelectColor(-1)"></div>
            <div class="colorActive" v-if="showSelectId" v-on:click="changeSelectColor(0)"></div>
            <div class="nocolorActive" v-if="showSelectId" v-on:click="changeSelectColor(1)"></div>
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
   props: ['valueItem','selectOption', 'errorQuest' ],
    data () {
        return {
            Id:0,
            title:'',
            showSelectId:false,
            isAnimating:false,

            currentAnchor:0,

            touchstartY:0,
            touchendY:0,

            showCheckSelect:false,
            showLoadSelect:false,
            className:'',
        }},
    watch:{

    },
    created: function() {
       console.log(this.selectOption);
       console.log(this.valueItem);
        this.Id = this.valueItem;
        if(this.Id){
            this.title = this.selectOption[this.Id].title;
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

    },
    methods:{
        updateAnchors() {
            this.anchors = [];
            let t = this;
            $('#'+this.className+' p.option').each(function(i, element){
                t.anchors.push( $(element).position().top );
            })
        },
        changeVal: function () {
            this.title = this.selectOption[this.currentAnchor].title;
            this.$emit('changeValSelect', this.Id);
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
        setShowSelectId(event){
            this.isAnimating=false;
            if(event.target.className == "selectBlock") {
                this.showSelectId = true;
                let t = this;
                setTimeout(function () {
                    t.updateAnchors();
                    if($('#'+t.className+' .active').length>0) {
                        t.currentAnchor =$('#'+t.className+' .active').index();
                        t.Id = t.currentAnchor;
                        t.changeVal();
                        $('#'+t.className+' .select').scrollTop(t.anchors[t.currentAnchor]-(150-$('#'+t.className+' .option')[t.currentAnchor].offsetHeight)/2);
                    }else{
                        t.Id = 0;
                        t.currentAnchor =0;
                        t.changeVal();
                        $('#'+this.className+' .select').scrollTop(0);
                    }
                    $('#'+t.className+' .colorActive').css({'height':$('#'+t.className+' .option')[t.currentAnchor].offsetHeight});
                    $('#'+t.className+' .colorActive').css({'top':(150-$('#'+t.className+' .option')[t.currentAnchor].offsetHeight)/2});
                    $('#'+t.className+' .nocolorActive:first').css({'height':(150-$('#'+t.className+' .option')[t.currentAnchor].offsetHeight)/2});
                    $('#'+t.className+' .nocolorActive:last-child').css({'top':(150-$('#'+t.className+' .option')[t.currentAnchor].offsetHeight)/2 + $('#'+t.className+' .option')[t.currentAnchor].offsetHeight});
                    $('#'+t.className+' .nocolorActive:last-child').css({'height':(150-$('#'+t.className+' .option')[t.currentAnchor].offsetHeight)/2});
                },10)
            }
        },
        handleGesure(k) {
            let t = this;
            if( t.isAnimating ) {
                return false;
            }
            t.isAnimating  = true;
            if((Math.abs(t.touchendY-t.touchstartY)>10)){
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
                    $('#'+t.className+' .colorActive').css({'height':$($('#'+t.className+' .option')[t.currentAnchor]).height()});
                    $('#'+t.className+' .colorActive').css({'top':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2});
                    $('#'+t.className+' .nocolorActive:first').css({'height':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2});
                    $('#'+t.className+' .nocolorActive:last-child').css({'top':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2 + $($('#'+t.className+' .option')[t.currentAnchor]).height()});
                    $('#'+t.className+' .nocolorActive:last-child').css({'height':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2});
                    $('#'+t.className+' .select').animate({
                        scrollTop: parseInt( t.anchors[t.currentAnchor]-(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2 )//55
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
                    $('#'+t.className+' .colorActive').css({'height':$($('#'+t.className+' .option')[t.currentAnchor]).height()});
                    $('#'+t.className+' .colorActive').css({'top':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2});
                    $('#'+t.className+' .nocolorActive:first').css({'height':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2});
                    $('#'+t.className+' .nocolorActive:last-child').css({'top':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2 + $($('#'+t.className+' .option')[t.currentAnchor]).height()});
                    $('#'+t.className+' .nocolorActive:last-child').css({'height':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2});
                    $('#'+t.className+' .select').animate({
                        scrollTop: parseInt( t.anchors[t.currentAnchor]-(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2 )//55
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
        t.touchstartY = 0;
        t.touchendY = 0;
        $(document).on('touchstart', '#'+this.className+' .selectBlockNeed, .colorActive', function(event) {
            t.isAnimating = false;
            t.touchstartY = event.originalEvent.touches[0].screenY;
        });

        $(document).on('touchend', '#'+this.className+' .selectBlockNeed, .colorActive', function(event) {
            t.touchendY = event.originalEvent.changedTouches[0].screenY;
            t.handleGesure();
        });
        $(document).on('touchmove', '#'+this.className+' .selectBlockNeed, .colorActive', function(event) {
            if((Math.abs(event.originalEvent.changedTouches[0].screenY-t.touchstartY)>20)) {
                t.touchendY = event.originalEvent.changedTouches[0].screenY;
                t.handleGesure('1');
            }
            event.preventDefault();
        });

        $('body').on('mousewheel', '#'+this.className+' .selectBlockNeed, .colorActive', function(e){
            e.preventDefault();
            e.stopPropagation();
            if( t.isAnimating ) {
                return false;
            }
            t.isAnimating  = true;
            if( e.originalEvent.wheelDelta >= 0 ) {
                if (t.currentAnchor > 0) {
                    t.currentAnchor--;
                }
            }else{
                if(t.anchors.length-1!=t.currentAnchor) {
                    t.currentAnchor++;
                }
            }
            t.Id = t.currentAnchor;
            t.changeVal();
            if( t.currentAnchor > (t.anchors.length - 1) || t.currentAnchor < 0 ) {
                t.currentAnchor = 0;
            }
            t.isAnimating  = true;

                $('#'+t.className+' .colorActive').css({'height':$($('#'+t.className+' .option')[t.currentAnchor]).height()});
                $('#'+t.className+' .colorActive').css({'top':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2});
                $('#'+t.className+' .nocolorActive:first').css({'height':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2});
                $('#'+t.className+' .nocolorActive:last-child').css({'top':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2 + $($('#'+t.className+' .option')[t.currentAnchor]).height()});
                $('#'+t.className+' .nocolorActive:last-child').css({'height':(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2});
                $('#'+t.className+' .select').animate({
                    scrollTop: parseInt( t.anchors[t.currentAnchor]-(150-$($('#'+t.className+' .option')[t.currentAnchor]).height())/2 )//55
                }, 200, 'swing', function(){
                    t.isAnimating  = false;
                });


        });
    },
    destroyed(){
        $(document).unbind('touchstart');
        $(document).unbind('touchend');
        $(document).unbind('touchmove');
        $('body').unbind('mousewheel');
        $('body').unbind('mousewheel');
    },
}
</script>
<style>
    .option:first-child{
        margin-top: 55px;
    }
    .option:last-child{
        margin-bottom: 55px;
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
    }
</style>