<template>
<AnimatedBg style="z-index:0"/>
  <div class="mobileView position-relative p-0 mx-auto">
    <Header />
    <div style="min-height: 50vh">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import AnimatedBg from "./components/AnimatedBg.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    AnimatedBg
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
  --blue-dark-6: hsl(210, 77%, 5%);
  --blue-dark-5: hsl(211, 68%, 12%);
  --blue-dark-4: hsl(211, 66%, 20%);
  --blue-dark-3: hsl(211, 65%, 27%);
  --blue-dark-2: hsl(211, 64%, 34%);
  --blue-dark-2: hsl(211, 64%, 41%);
  --blue-dark-1: hsl(211, 64%, 49%);
  --blue-normal: #318ce7;
  --blue-white-1: #4b9bea;
  --blue-white-2: #65aaed;
  --blue-white-3: #7fb9f0;
  --blue-white-4: #99c8f3;
  --blue-white-5: #b3d7f6;
  --blue-white-6: #cde6f9;
  --blue-white-7: #e8f2fc;

  --blue-gray-7: #a1a1a5;
  --blue-gray-6: #89929e;
  --blue-gray-5: #718397;
  --blue-gray-4: #597490;
  --blue-gray-3: #416589;
  --blue-gray-2: #295682;
  --blue-gray-1: #0e457b;

  --white: white;
}

html,
body {
  height: 100%;
  min-height: max-content;
  font-family: "circular-normal", "Work Sans" !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  color: var(--blue-dark-4) !important;
  background-color: var(--white) !important;
}

.mobileView {
  max-width: 450px;
}

.section {
  padding-top: 100px;
  padding-bottom: 100px;
}

.title {
  font-family: "circular-bold";
  font-weight: 900;
  color: var(--color16) !important;
}

.color-white {
  color: var(--color16) !important;
}

.bold {
  font-family: "circular-bold";
}

a {
  color: var(--color14) !important;
  text-decoration: none !important;
}
a:hover {
  color: var(--color16) !important;
}
a.active {
  color: var(--color16) !important;
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
  transition-duration: 100ms;
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
  transition-duration: 100ms;
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

.color-highlight {
  color: var(--blue6);
}

.pointer {
  cursor: pointer;
}

.ctaBtn {
  top: 0;
  left: 0;
  transition: all 0.15s linear 0s;
  position: relative;
  display: inline-block;
  padding: 0.75rem 1.25rem 0.95rem;
  background-color: var(--blue-normal);
  border-radius: 20px;
  color: var(--blue-white-7) !important;
  font-size: 1rem;
  line-height: 1.125rem;
  box-shadow: 0px 4px 0 var(--blue-dark-4);
  text-decoration: none;
  border-width: 2px;
  border-color: var(--blue-dark-1);
  border-style: solid;
  cursor: pointer;
  font-family: "circular-bold";
  text-transform: uppercase;
}
.ctaBtn:hover {
  top: 4px;
  left: 0px;
  box-shadow: 0 0 0 var(--blue-dark-4);
  background-color: var(--blue-dark-4);
  border-color: var(--blue-dark-4);
  color: var(--blue-white-7) !important;
  text-decoration: none;
}

img.shime {
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
