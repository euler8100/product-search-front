<template>
  <div class="home">
    <div class="">
      <section class="section pb-3 pt-2">
        <div class="container">
          <div class="row">
            <div class="col-md-8 mx-auto">
              <div class="w-100">
                <img alt="Chipdeals's Ecosystem" src="/images/hero.svg" title="Chipdeals's Ecosystem" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {},
  data() {
    return {
      activeCodeLanguage: "",
      activeCode: "",
    };
  },
  mounted() { },
  methods: {},
};
</script>

<style scoped>
.home {
  overflow: hidden;
}

.phonePic {
  transform: translateY(-4px);
  z-index: -2;
}

.codeContainer {
  height: 300px;
  overflow: auto;
  border-radius: 0 0 0.7em 0.7em;
}

.codeContainer::-webkit-scrollbar {
  -webkit-appearance: none;
}

.codeContainer::-webkit-scrollbar-corner {
  -webkit-appearance: none;
}

.codeContainer:hover::-webkit-scrollbar {
  -webkit-appearance: none;
}

.codeContainer:hover::-webkit-scrollbar:vertical {
  width: 8px;
  height: 8000px;
}

.codeContainer:hover::-webkit-scrollbar:horizontal {
  height: 8px;
}

.codeContainer:hover::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: var(--blue1);
}

.codeContainer:hover::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 8px;
}

.list>li {
  list-style-type: none;
}

.nav-link {
  color: var(--blue1) !important;
}

.globe {
  position: absolute;
  z-index: 0;
  top: -40%;
  left: 20%;
  width: 100vw;
}

.globeSection {
  height: 100vh;
  position: relative;
}

.globeSectionText {
  margin-left: -7%
}

.afterGlobe {
  position: relative;
}

@media screen and (max-width: 992px) {
  .globe {
    top: 300px;
    left: 50%;
    transform: translateX(-50%);
  }

  .globeSectionText {
    margin-left: auto
  }

  .globeSection {
    height: calc(100vw + 300px - 15vh)
  }
}
</style>
