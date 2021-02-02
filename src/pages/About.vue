<template>
  <div id="about">
    <q-page-container class="container">
      <div class="row">
        <div class="col-12 col-md-6 about_title">
          <div class="intro">
            <span class="maintitle">服務理念</span>
            <p class="text-left">
              募募希望募集一些願意分享的人<br />也募集一些需要幫助的人
            </p>
          </div>
        </div>
        <div class="col-12 col-md-6 about_pic">
          <img
            data-aos="fade-left"
            data-aos-duration="1500"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            class="fluidBack back_picL"
            :src="'./images/about03.jpg'"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 about_pic">
          <img
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            class="fluidBack back_picR"
            :src="'./images/about02.jpg'"
          />
        </div>
        <div class="col-12 col-md-6 about_title ">
          <div class="intro">
            <span class="maintitle">服務對象</span>
            <p class="text-left">
              募募以中、小型社福機構及經濟弱勢<br />為主要服務對象。
            </p>
          </div>
        </div>
      </div>
    </q-page-container>

    <q-page-container class="container">
      <q-timeline>
        <q-timeline-entry heading class="heading maintitle">
          募募大事紀
        </q-timeline-entry>
        <q-timeline-entry
          title="募募物資捐贈平台"
          subtitle="20 JAN, 2021"
          color="mu01"
          icon="fas fa-gift"
        >
          <div class="row">
            <div class="col-2">
              <img :src="'./images/avatar00.jpg'" class="introPic" />
            </div>
            <div class="col-10 text-left introText">
              募募是一個便利的線上物資分享平台，目標是讓閒置的資源再次流動，少一點消費就會少一點浪費，幫自己用不到的物品找尋第二個主人，讓其能更有效地被使用。
            </div>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="個人物資分享"
          subtitle="13 JAN, 2021"
          color="mu03"
        >
          <div class="row">
            <div class="col-2">
              <img :src="'./images/avatar03.jpg'" class="introPic" />
            </div>
            <div class="col-10 text-left introText">
              註冊會員後，可透過「會員中心」頁面新增想於募募平台上分享的物資，提供其他使用者藉由平台向分享者提出需求，訂單成立後雙方可協議運費及寄送方式，讓良好的二手資源都可以正確地分享到另一個需要的人手上。
            </div>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="物資捐贈專案"
          subtitle="06 JAN, 2021"
          color="mu03"
        >
          <div class="row">
            <div class="col-2">
              <img :src="'./images/avatar07.jpg'" class="introPic" />
            </div>
            <div class="col-10 text-left introText">
              可透過網站的「物資捐贈」頁面搜尋符合自身經濟條件想捐贈的物品，線上操作即可完成捐贈，訂單成立時需由捐贈者自行負擔運費郵寄至需求單位。
            </div>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="募募服務願景"
          subtitle="30 DEC, 2020"
          color="mu03"
        >
          <div class="row">
            <div class="col-2">
              <img :src="'./images/avatar04.jpg'" class="introPic" />
            </div>
            <div class="col-10 text-left introText">
              募募會努力把物資捐贈做得更專業，因為專業，捐贈者才能捐的正確，捐到需要的單位；因為專業，受贈單位才能有效的曝光，媒合到他們真正需要的資源。我們期望能將整個捐贈流程做得更完整，讓更多民眾可以透過平台參與，促進更多待用物品的流通及分享，延續物命。
            </div>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="募募物資捐贈平台初期規劃"
          subtitle="23 DEC, 2020"
          color="mu03"
          class="q-mb-lg"
        >
          <div class="row">
            <div class="col-2">
              <img :src="'./images/avatar05.jpg'" class="introPic" />
            </div>
            <div class="col-10 text-left introText">
              2020年末，募募在泰山職訓老師們數月的指導之下有了雛形，經過了幾次修改及微調，募募在當年
              12月23日專題初期報告中首次登場，並計畫於2021年2月3號正式提供服務。
            </div>
          </div>
        </q-timeline-entry>
      </q-timeline>
    </q-page-container>
  </div>
</template>
