<template>
  <div class="allPage">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link
        href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cookie&family=Dancing+Script:wght@500&display=swap"
        rel="stylesheet">

    <div class="headLine column" style="align-items: center">
      <p style="font-size: 46px">Get Sweety</p>
      <!--    </div>-->

      <!--    <div class="text" style="text-align: center">-->
      <p dir="rtl" style="font-family:Arial; color: gray; margin-bottom: 15px; text-align: center">אנחנו כאן כדי להציע לכם מתכונים מתוקים
        וטעימים בהתאם למרכיבים שיש ברשותכם במטבח
        :)</p>
    </div>

    <div class="img">
      <img style=" height: 350px; width: 400px; margin-bottom: 70px; opacity: 0.8; margin-block: auto"
           src="../assets/startPic2.jpg">
    </div>

    <div class="btns column" style="width: 200px">
      <q-btn style="margin-bottom: 10px" rounded color="deep-orange-4" label="הירשם" @click="$router.push('/auth')"/>
      <q-btn style="margin-bottom: 10px" rounded color="deep-orange-4" label="התחבר" @click="$router.push('/auth')"/>
    </div>

  </div>
</template>

<script>

export default {
  name: "StartPage",
}
</script>

<style scoped>

.allPage {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  background-color: #E9E4E5FF;
  padding: 110px;
}

.headLine {
  color: #fd7862;
  margin-top: -50px;
  font-family: 'Cookie', cursive;
  /*padding: 15px;*/
  /*position: ;*/
}

.btns {
  margin: 10px;
  /*padding: 10px;*/
  /*  margin-bottom: 40px;*/
  /*  position: ;*/
}

</style>
