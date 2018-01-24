<template>

  <div class="container firstPageContainer">
    <div class="row">
      <form action="" class="login">
        <button class="btn_social facebook">
          <img src="static/img/facebook.png" alt="">Sign Up with Facebook
        </button>
        <button class="btn_social google">
          <img src="static/img/google-plus.png" alt="">Sign Up with Google
        </button>
        <h5>or</h5>
        <label><p><span>*</span>Email</p><input type="email"></label>
        <label>
          <p><span>*</span>Password</p>
          <input type="password">
          <img src="static/img/eye_g.png" class="eye" alt="">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Verify Password</p>
          <input type="password">
          <img src="static/img/eye_grey.png" class="eye" alt="">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label class="pointer2">

          <input type="checkbox">
          <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span>Remember me</span></label>
        <div class="firstPage">
          <button>SING UP</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
    export default {
        //name: 'app',
        data () {
            return {


            }
        },
        computed: {

        },
        created: function() {

        }
    }
</script>

<style>

</style>
