<template>
    <label v-bind:id="className"
           v-bind:style="{zIndex:(selectedBlock==className)?'1000':''}">
        <div class="selectBlock"
             v-on:click="setShowSelectId"
             v-bind:class="(visibleBlock?'hidden':'')"
             ref="selectBlock"
        >
            {{title(Id)}}
        </div>
        <div class="selectBlockNeed" v-if="visibleBlock">
                <pd-select-item :listData="opt"
                                v-model="Id"
                                @close="close"></pd-select-item>

        </div>
        <span class="check"  v-bind:class="(showLoadSelect==true) ? 'loading': ''" v-if="showCheckSelect">
          <i class="fa fa-check" aria-hidden="true"></i>
        </span>
        <span class="check" v-bind:class="(errorQuest) ? 'error' : ''" v-if="errorQuest">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
    </label>
</template>

<script>

export default {
   props: ['valueItem','selectOption', 'errorQuest','selectedBlock' ],
    data () {
        return {
            Id:0,

            showSelectId:false,
            isAnimating:false,
            showCheckSelect:false,
            showLoadSelect:false,
            className:'',
            timer:null,
            elHeight:0,
        }},
    watch:{
        Id:function (old, newVal) {
            if((typeof newVal === "number" || typeof newVal === "string") && parseInt(newVal)>-1){

                this.changeVal();
                this.$emit('pushSelectOption', this.selectOption[old].title);
            }
        },
        /*selectedBlock:function (old, newVal) {
            if(newVal!=this.className){
                this.showSelectId=false;
            }
        }*/
    },
    mounted(){
        let t = this;
        this.timer = setInterval(function(){
            if( t.$refs.selectBlock.offsetHeight != t.elHeight ) {
                 t.elHeight = t.$refs.selectBlock.offsetHeight;
                    $('#'+t.className+' .check').css({'top': (t.elHeight - 13)/2})
            };
        },200);
    },
    destroyed(){
        clearTimeout(this.timer);
    },
    created: function() {
        this.Id = this.valueItem;
        if((typeof this.Id === "number" || typeof this.Id === "string") && parseInt(this.Id)>-1){
            this.changeVal();
        }else{
            this.Id = 0;
            this.changeVal();
        }
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        this.className=text;
    },
    computed: {
        opt:function () {
            let t =[];
            for(var i = 0; i<this.selectOption.length; i++){
                t.push(this.selectOption[i].title)
            }
            return t;
        },
        visibleBlock:function () {
            return this.showSelectId && this.selectedBlock == this.className;
        }
    },
    methods:{
        title(id){
            if(parseInt(id)>-1 && id<this.selectOption.length){
                return this.selectOption[id].title;
            }else{
                return '';
            }
        },
        changeVal: function () {
            if(this.Id!=-1 && this.Id!=='' && this.Id!==null && (typeof this.Id =='number' || typeof this.Id =='string' )) {

                this.$emit('changeValSelect', this.Id);
            }
        },
        close(){
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
            //this.isAnimating=false;
            if(event.target.className == "selectBlock") {
                this.showSelectId = true;
                this.$parent.selectedBlock = this.className;
            }
        },

    },
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
    label{
        z-index: 100;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        margin-top: 35px;
        &:last-child{
            margin-bottom: 35px;
        }
        &:nth-child(2){
            margin-bottom: 0px;
        }
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
        height: unset;
        min-height: 38px;
        padding: 5px 40px 5px 15px;
    }
    .selectBlockNeed{
        position: absolute;
        width: 100%;
        box-shadow: inset 0px 10px 30px 0px #fff, inset 0px -10px 30px 0px #fff;
        height: 150px;
        top: -50px;
        border-radius: 15px;
        border: 1px solid #e5e6e5;
        overflow: hidden;
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