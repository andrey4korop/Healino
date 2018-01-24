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
          <input type="text">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Family Name</p>
          <input type="text">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Date of Birth</p>
          <input type="date">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Location</p>
          <input type="text">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Race</p>
          <select>
            <option>Пункт 1</option>
            <option>Пункт 2</option>
          </select>
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Phone</p>
          <input type="tel">
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>

      </div>
      <div class="formBlock login">
        <div class="Metrics">
          <div class="btn active">Metrics</div>
          <div class="btn">US</div>
        </div>
        <label>
          <p><span>*</span>Heigth</p>
          <input type="number" class="number">
          <span class="razmer">cm</span>
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Weigth</p>
          <input type="number" class="number">
          <span class="razmer">kg</span>
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Activity</p>
          <select>
            <option>Пункт 1</option>
            <option>Пункт 2</option>
          </select>
          <span class="check"><i class="fa fa-check" aria-hidden="true"></i></span>
        </label>
        <label>
          <p><span>*</span>Gender</p>
        </label>
        <label class="pointer radio">

          <input type="radio" name="raz" checked>
          <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span>Male</span>
        </label>
        <label class="pointer radio">

          <input type="radio" name="raz">
          <span class="checkbox"><i class="fa fa-check" aria-hidden="true"></i></span><span>Female</span>
        </label>
        <label class="bottom">
          <p>Date Actualization: 24.09.2017</p>
        </label>
      </div>


    </form>
    <div class="row">
      <div class="firstPage fifthPage">
        <button>SEND</button>
      </div>
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
