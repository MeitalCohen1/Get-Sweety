<template>
  <div class="home" dir="rtl">
    <div class="header-container">
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cookie&family=Dancing+Script:wght@500&display=swap"
          rel="stylesheet">
    </div>

    <div class="container">
      <img class="img1" src="../assets/picHome1.jpg"/>
      <div class="home-text">
        !welcome
      </div>
    </div>

    <div class="container-2">
      <div class="number">
        01
        02
        03
      </div>

      <div class="home-text3">
        מזינים את המרכיבים שיש ברשותינו במטבח
      </div>

      <div class="home-text4">
        ובוחרים את המתכון שהכי בא לנו!
      </div>

      <div class="home-text5">
        ניתן לבחור מתכונים גם לפי פרווה או חלבי
      </div>
    </div>

    <div dir="rtl" class="btn">
      <q-btn style="width: 200px" unelevated rounded color="brown-5" label="בואו נתחיל!" @click="$router.push('/recipes')" />
    </div>
  </div>
</template>

<script>

</script>
<style scoped>

.home {
  background-color: rgba(190, 140, 100, 0.2);
}

.container-2 {
  display: flex;
  font-family: Arial, sans-serif;
  justify-content: space-around;
  padding-block-end: 260px;
}

.img1 {
  flex: 1;
  opacity: 95%;
  height: 80vw;
  width: 100vw;
}

.home-text {
  flex-direction: column;
  font-family: 'Cookie', cursive;
  position: absolute;
  transform: translateY(-62px) translateX(170px);
  font-size: 70px;
  color: #0a0101;
}

.number {
  font-family: 'Cookie', cursive;
  display: flex;
  max-width: min-content;
  margin: 10px;
  transform: translateY(50px) translateX(10px);
  font-size: 50px;
  color: black;
}

.home-text3 {
  display: flex;
  flex-direction: row;
  color: gray;
  font-size: 12px;
  transform: translateY(80px) translateX(10px)
}

.home-text4 {
  display: flex;
  color: gray;
  text-align: left;
  font-size: 12px;
  transform: translateY(155px) translateX(-100px)
}

.home-text5 {
  display: flex;
  color: gray;
  font-size: 12px;
  transform: translateY(230px) translateX(-190px)
}

.btn {
  transform: translateY(-80px)translateX(0px);
}

</style>
