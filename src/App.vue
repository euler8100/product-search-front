<template>
  <n-message-provider>
    <div class="container-fluid p-0">
      <Header />
      <div style="min-height:50vh">
        <router-view />
      </div>
      <Footer />
    </div>
  </n-message-provider>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;900&display=swap");

@font-face {
  font-family: "circular-bold";
  src: url("./assets/font/circular_std_bold.otf");
  font-display: swap !important;
}

@font-face {
  font-family: "circular-medium";
  src: url("./assets/font/circular_std_medium.otf");
  font-display: swap !important;
}

@font-face {
  font-family: "circular-normal";
  src: url("./assets/font/circular_std_book.otf");
  font-display: swap !important;
}

:root {
 /* --color1: #090C10;
  --color2: #10141B;
  --color3: #171C26;
  --color4: #1E2431;
  --color5: #232D3D;
  --color6: #565E6B;
  --color7: #898F99;
  --color8: #BCC0C7;
  --color9: #EFF1F6;*/

--color1: #090C10;
--color2: #0E1319;
--color3: #131A22;
--color4: #18212B;
--color5: #1D2834;
--color6: #232D3D;
--color7: #2D3947;
--color8: #334054;
--color9: #525E6F;
--color10: #717C8A;
--color11: #909AA5;
--color12: #AFB8C0;
--color13: hsl(217deg 20% 80%);
--color14: hsl(200deg 15% 85%) ;
--color15: hsl(180deg 20% 90%);
--color16: hsl(170deg 30% 95%);
--color17: white;

--blue1: #031316;
--blue2: #09343C;
--blue3: #0F5562;
--blue4: #157688;
--blue5: #1B97AE;
--blue6: #1FBAD6;
--blue7: #47C7DE;
--blue8: #6FD4E6;
--blue9: #97E1EE;
--blue10: #BFEEF6;
--blue11: #E9F9FC;

}

html,
body {
  height: 100%;
  min-height: max-content;
  font-family: "circular-normal", "Work Sans" !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  color: var(--color14) !important;
  background-color: var(--color6) !important;
}


.section{
  padding-top:100px;
  padding-bottom:100px;
}

.title{
  font-family:  "circular-bold";
  font-weight: 900;
  color: var(--color16) !important;
}

.color-white{
  color: var(--color16) !important;
}

.bold{
  font-family:  "circular-bold";
}

a {
  color: var(--color14)!important;
  text-decoration: none!important;
}
a:hover{
  color: var(--color16)!important;
}
a.active {
  color: var(--color16)!important;
}

.whiteBtn:hover {
  background-color: transparent !important;
  color: white !important;
  border-color: black !important;
}

.normalCursor {
  cursor: default !important;
}

.zoomHover {
  cursor: pointer !important;
  transition-duration:100ms;
}
.zoomHover:hover {
  transform: scale(1.03);
}

.oblicSession {
  transform: skewY(-3deg);
  padding-top: 6em;
  padding-bottom: 5em;
}
.oblicSession > * {
  transform: skewY(3deg);
}


.specialCardForm {
  background-color: var(--color8);
  border: 1px solid var(--color4);
  box-shadow: var(--color4) 0 0 0 1px, var(--color4) 0 2px 8px 1px;
  border-radius: 4px;
  transition-duration:100ms;
}
.specialCardForm:hover {
  background-color: var(--color4);
}
.specialCardForm > * {
  vertical-align: middle !important;
}

.bg-color8 {
  background-color: var(--color8) !important;
}
.bg-blue1 {
  background-color: var(--blue1) !important;
}

.color-highlight{
  color: var(--blue6)
}

.ctaBtn {
  top: 0;
  left: 0;
  transition: all 0.15s linear 0s;
  position: relative;
  display: inline-block;
  padding: 0.75rem 1.25rem 0.95rem;
  background-color: var(--blue6);
  border-radius: 6px;
  color: var(--color15) !important;
  font-size: 1rem;
  line-height: 1.125rem;
  box-shadow: 5px 5px 0 var(--blue4);
  text-decoration: none;
  border-width: 2px;
  border-color: var(--blue6);
  border-style: solid;
  cursor: pointer;
  font-family:  "circular-bold";
  text-transform: uppercase;
}
.ctaBtn.ctaBtnDarkp {
  background-color: var(--color6);
  border-color: var(--color6);
}
.ctaBtn:hover {
  top: 5px;
  left: 4px;
  box-shadow: 0 0 0 var(--blue4);
  background-color: var(--blue4);
  border-color: var(--blue4);
  color: var(--color15) !important;
  text-decoration: none;
}


img {
  background-image: linear-gradient(
    to right,
    #ebebeb calc(50% - 100px),
    #c5c5c5 50%,
    #ebebeb calc(50% + 100px)
  );
  background-size: 0;
  position: relative;
  overflow: hidden;
  width: 100%;
}

img::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: calc(200% + 200px);
  bottom: 0;
  background-image: inherit;
  animation: move 2s linear infinite;
}

@keyframes move {
  to {
    transform: translateX(calc(50% + 100px));
  }
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.floatAnim {
  animation: float 5s infinite;
}

@keyframes float {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
    transform: translatey(-20px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
  }
}

@keyframes floatNoBg {
  0% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0);
    transform: translatey(0px);
  }
  50% {
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0);
    transform: translatey(-20px);
  }
  100% {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0);
    transform: translatey(0px);
  }
}
</style>
