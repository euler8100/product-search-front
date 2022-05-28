<template>
  <div class="headerSpace"></div>
  <div class="position-fixed fixed-top">
    <header class="header bg-glass mobileView mx-auto">
      <nav class="navbar navbar-expand-lg w-100">
        <div class="container-lg">
          <router-link
            to="/"
            class="navbar-brand logo d-flex"
            active-class="active"
            ><img src="/logo.png" class="my-auto me-2" />
            <span class="my-auto d-inline-block" v-if="!showSearchBar">
              Monster Search</span
            >
          </router-link>
          <form class="bar" @submit.prevent="search" v-if="showSearchBar">
            <input
              class="searchbar"
              type="search"
              title="Search"
              placeholder="Monster Search"
              spellcheck="true"
              v-model="searchedText"
            />
          </form>
          <div></div>
          <div class="pointer" @click="showMobileNavPanel = true">
            <span
              class="material-icons material-icons-outlined notranslate"
              style="position:relative;top:5px: font-size:32px"
            >
              menu
            </span>
          </div>
        </div>
      </nav>
    </header>
  </div>

  <div class="mobileNavPanel d-flex" :class="{ visible: showMobileNavPanel }">
    <div class="overlay" @click="showMobileNavPanel = false"></div>
    <div class="navsContainer col-11 col-sm-10 col-md-8 m-auto p-4">
      <div
        class="d-inline-block closeBtn p-3"
        @click="showMobileNavPanel = false"
      >
        <span class="material-icons-outlined"> close </span>
      </div>
      <ul class="">
        <li
          class="nav-item d-block mt-2 mb-3"
          v-for="(navSection, index) in navSections"
          :key="index"
        >
          <div>
            <li class="nav-item d-block nav-title">
              {{ navSection.name }}
            </li>
            <li
              class="nav-item col-6 col-md-4 mb-2"
              v-for="(navItem, navItemIndex) in navSection.items"
              :key="navItemIndex"
            >
              <div>
                <a
                  v-if="/http/.test(navItem.path)"
                  :href="navItem.path"
                  class="d-flex"
                >
                  <div class="navDetailItemIcon w-auto me-1 h-auto align-top">
                    <img :src="'/images/' + navItem.icon" v-if="navItem.icon" />
                    <span v-else class="material-icons-outlined">{{
                      navItem.iconName
                    }}</span>
                  </div>
                  <div class="navDetailItemTexts col my-auto align-bottom">
                    <div class="navDetailItemTitle">
                      {{ navItem.title }}
                    </div>
                    <div class="navDetailItemDescription" v-if="false">
                      {{ navItem.description }}
                    </div>
                  </div>
                </a>
                <router-link
                  v-else
                  :to="navItem.path"
                  class="d-flex"
                  active-class="active bold"
                  @click="showMobileNavPanel = false"
                >
                  <div
                    class="
                      navDetailItemIcon
                      d-flex
                      w-auto
                      me-1
                      h-auto
                      align-top
                    "
                  >
                    <img :src="'/images/' + navItem.icon" v-if="navItem.icon" />
                    <span v-else class="material-icons-outlined">{{
                      navItem.iconName
                    }}</span>
                  </div>
                  <div class="navDetailItemTexts col my-auto align-bottom">
                    <div class="navDetailItemTitle">
                      {{ navItem.title }}
                    </div>
                  </div>
                </router-link>
              </div>
            </li>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderView",
  components: {},
  data() {
    return {
      detailNavHovered: false,
      navItemHovered: {},
      navHoverDetailsHovered: false,
      documentScrolledUp: false,
      scrollY: 0,
      hoveredNavArrowLeftPosition: 0,
      showMobileNavPanel: false,
      showSearchBar: false,
      searchedText: "",
      navAreVisible: false,

      navSections: [
        // {
        //   key: "products",
        //   name: "Products",
        //   items: [
        //     {
        //       key: "smallkash",
        //       title: "SmallKash",
        //       icon: "smallkashLogo.svg",
        //       description: "P2P Transfer App",
        //       path: "https://smallkash.chipdeals.me",
        //     },
        //   ],
        // },
        {
          key: "search",
          name: "Monster Search",
          items: [
            {
              key: "",
              title: "Rechercher",
              iconName: "search",
              description: "",
              path: "/",
            },
          ],
        },
        {
          key: "user",
          name: "Utilisateur",
          items: [
            {
              key: "",
              title: "Inscription",
              iconName: "contact_page",
              description: "",
              path: "/signup",
            },
            {
              key: "",
              title: "Connection",
              iconName: "login",
              description: "",
              path: "/login",
            },
          ],
        },
        {
          key: "shop",
          name: "Ma Boutique",
          items: [
            {
              key: "",
              title: "Ma Boutique",
              iconName: "store",
              description: "",
              path: "/shop",
            },
            {
              key: "",
              title: "+ Produit",
              iconName: "category",
              description: "",
              path: "/shop?newProduct",
            },
            {
              key: "",
              title: "+ Boutique",
              iconName: "add_business",
              description: "",
              path: "/shop?newShop",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    this.searchedText = params.search || "";
    window.addEventListener("scroll", () => {
      this.documentScrolledUp = window.scrollY > this.scrollY;
      this.scrollY = window.scrollY;
    });
  },
  methods: {
    goToPath(path) {
      this.$router.push(path);
    },
    search() {
      let searchQuery = this.searchedText.replace(
        / /g,
        "SPACEHERESHOULDBEREPLACEDBYSYMBOLEPLUS"
      );
      searchQuery = encodeURIComponent(searchQuery);
      searchQuery = searchQuery.replace(
        /SPACEHERESHOULDBEREPLACEDBYSYMBOLEPLUS/g,
        "+"
      );
      this.$router.push("/products?search=" + searchQuery);
    },
  },
  watch: {
    navItemHovered(newValue) {
      const hoveredElement = document.querySelector(
        "#desktopNav_" + newValue.index
      );
      const hoveredPositionXCenter =
        hoveredElement.offsetLeft + hoveredElement.offsetWidth / 2;
      this.hoveredNavArrowLeftPosition = hoveredPositionXCenter;
    },
    $route: {
      handler: function (newRoute) {
        if (newRoute.name === "home") {
          this.showSearchBar = false;
        } else {
          this.showSearchBar = true;
        }
        
        const params = new Proxy(new URLSearchParams(window.location.search), {
          get: (searchParams, prop) => searchParams.get(prop),
        });

        this.searchedText = params.search || "";
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.logo img {
  width: 25px;
  height: 25px;
}
</style>
<style scoped>
.headerSpace {
  height: 60px;
}
.header {
  height: 60px;
  transition: all 0.3s ease-in-out;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.header.bg-glass {
  background-color: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(10px);
  /* box-shadow: 0 1px 1px 0 var(--blue-white-7); */
  /* border-bottom: var(--blue-white-4); */
}
.header.hidden {
  transform: translateY(-100%);
}
.navbar-toggler {
  box-shadow: none !important;
}
.nav-item {
  margin: 0;
  padding: 0;
}
.nav-item > * {
  margin: 0;
  line-height: 50px;
  font-size: 16px;
  display: block;
  font-weight: 400;
  padding: 0 30px 0 25px;
  text-decoration: none;
}

.desktopNavHoverDetails {
  position: fixed;
  top: 58px;
  padding-top: 25px;
  pointer-events: none;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  z-index: 200;
  transform: translateX(-50%);
  perspective: 400px;
}
.desktopNavHoverDetails.visible {
  pointer-events: auto;
  opacity: 1;
}
.hoveredNavArrow {
  transition: all 0.2s ease-in-out;
  height: 20px;
  width: 20px;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.1) 50%,
    transparent 50%
  ) !important;
  background-image: linear-gradient(
    135deg,
    #717c8a22,
    #717c8a22 50%,
    transparent 50%
  ) !important;
  backdrop-filter: blur(10px);
  transform: translateY(10px) rotate(45deg);
  border-radius: 5px;
  position: fixed;
  top: 1.5px;
  left: 50%;
  transform-origin: top left;
}
.hoverDetailsBody {
  transition: all 0.2s ease-in-out;
  background-color: rgba(255, 255, 255, 0.1) !important;
  background-color: #717c8a22 !important;
  backdrop-filter: blur(10px);
  box-shadow: 0px 2px 3px 0 var(--color4);
  border-radius: 10px;
  transform: rotateX(-35deg);
  transform-origin: top;
}
.visible .hoverDetailsBody {
  transform: none !important;
}
.navDetailItemIcon img {
  width: 17px;
}
.hoverDetails_products {
  width: 300px;
}
.hoverDetails_products .navDetailItemIcon img {
  width: 30px;
}
.hoverDetails_resources {
  width: 300px;
}
.hoverDetails_company {
  width: 200px;
}
.hoverDetails_language {
  width: 170px;
}
.navDetailItemTitle {
  font-size: 15px;
}
.navDetailItemDescription {
  font-size: 12px;
}
.closeBtn {
  position: absolute;
  top: 0px;
  right: 0px;
  color: var(--blue-gray-7);
}
.mobileNavPanel .nav-item > * {
  line-height: 35px;
  padding: 0 0 0 0;
  text-decoration: none;
  font-size: 14px;
}
.nav-title {
  color: var(--blue-gray-7);
}
.navDetailItemTitle {
  font-size: 13px;
}
.mobileNavPanel {
  opacity: 0;
  transition-duration: 0.3s;
  pointer-events: none;
  position: fixed;
  right: 0px;
  z-index: 2000;
  height: 100vh;
  width: 100vw;
  top: 0px;
}
.mobileNavPanel.visible {
  opacity: 1;
  pointer-events: auto;
}
.navsContainer {
  background-color: var(--white);
  box-shadow: 0px 0 2px 0 var(--blue-dark-5);

  overflow: auto;
  height: 85%;
  border-radius: 20px;
  position: relative;
  max-width: 500px;
}
.overlay {
  display: none;
  width: calc(100%);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
.mobileNavPanel.visible .overlay {
  display: inline-block;
}

.nbProduct {
  font-size: 12px;
}

.bar {
  margin: 0 auto;
  width: 60%;
  position: relative;
  border-radius: 30px;
  border: 1px solid #dcdcdc;
  text-align: center;
}
.bar:hover {
  box-shadow: 1px 1px 8px 1px #dcdcdc;
}
.bar:focus-within {
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  outline: none;
}
.searchbar {
  height: 45px;
  border: none;
  width: 85%;
  font-size: 16px;
  outline: none;
  background-color: transparent;
}
</style>
