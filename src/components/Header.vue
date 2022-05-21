<template>
  <div class="headerSpace"></div>
  <header
    class="header"
    :class="{
      hidden: documentScrolledUp && scrollY > 80,
      'position-fixed bg-glass': scrollY > 180,
      'd-none': scrollY > 80 && scrollY < 180,
      'position-absolute ': scrollY <= 80,
    }"
  >
    <nav class="navbar navbar-expand-lg w-100">
      <div class="container-lg">
        <router-link
          to="/"
          class="navbar-brand logo zoomHover d-flex"
          active-class="active"
          ><img src="../../public/icon_chipdeal.png" class="my-auto me-2" />
          <span class="my-auto d-inline-block"> Chipdeals</span>
        </router-link>
        <span @click="showMobileNavPanel = true" class="d-lg-none">
          <span
            class="material-icons material-icons-outlined notranslate text-white"
            style="position:relative;top:5px: font-size:32px "
          >
            menu
          </span>
        </span>
        <div class="d-none d-lg-block">
          <div class="">
            <ul
              class="navbar-nav d-inline-block"
              @mouseleave="detailNavHovered = false"
              @mouseover="detailNavHovered = true"
            >
              <li
                class="nav-item normalCursor"
                v-for="(navSection, index) in navSections"
                :key="index"
                :id="'desktopNav_' + index"
                @mouseover="navItemHovered = { navSection, index }"
              >
                <span> {{ navSection.name }} </span>
              </li>
            </ul>
            <ul class="navbar-nav d-inline-block">
              <li class="nav-item">
                <div>
                  <router-link to="/pricing" active-class="active bold">
                    Pricing
                  </router-link>
                </div>
              </li>
              <li class="nav-item" v-if="false">
                <div>
                  <router-link
                    to="#"
                    class="btn btn-sm btn-outline-light whiteBtn zoomHover"
                    active-class="active bold"
                  >
                    {{ $t("header.getFree") }}</router-link
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <div
    class="desktopNavHoverDetails"
    :class="{ visible: detailNavHovered || navHoverDetailsHovered }"
    :style="{ left: hoveredNavArrowLeftPosition + 'px' }"
    @mouseleave="navHoverDetailsHovered = false"
    @mouseover="navHoverDetailsHovered = true"
    v-if="navItemHovered.navSection"
  >
    <div
      class="hoveredNavArrow"
      :style="{ leftt: hoveredNavArrowLeftPosition + 'px' }"
    ></div>
    <div
      class="hoverDetailsBody p-3"
      :class="'hoverDetails_' + navItemHovered.navSection.key"
    >
      <div
        class="hoverDetailItem row"
        v-for="(navDetailItem, navDetailItemIndex) in navItemHovered.navSection
          .items"
        :key="navDetailItemIndex"
      >
        <a
          v-if="/http/.test(navDetailItem.path)"
          :href="navDetailItem.path"
          class="col-12 row"
        >
          <div class="navDetailItemIcon w-auto">
            <img
              :src="'/images/' + navDetailItem.icon"
              v-if="navDetailItem.icon"
            />
            <span v-else class="material-icons-outlined">{{
              navDetailItem.iconName
            }}</span>
          </div>
          <div class="navDetailItemTexts col my-auto">
            <div class="navDetailItemTitle">
              {{ navDetailItem.title }}
            </div>
            <div class="navDetailItemDescription">
              {{ navDetailItem.description }}
            </div>
          </div>
        </a>
        <router-link
          v-else
          :to="navDetailItem.path"
          class="col-12 row"
          active-class="active bold"
        >
          <div class="navDetailItemIcon w-auto">
            <img
              :src="'/images/' + navDetailItem.icon"
              v-if="navDetailItem.icon"
            />
            <span v-else class="material-icons-outlined">{{
              navDetailItem.iconName
            }}</span>
          </div>
          <div class="navDetailItemTexts col my-auto">
            <div class="navDetailItemTitle">
              {{ navDetailItem.title }}
            </div>
            <div class="navDetailItemDescription">
              {{ navDetailItem.description }}
            </div>
          </div>
        </router-link>
        <div
          class="m y-1 col-10 ms-auto"
          v-if="navItemHovered.navSection.items[navDetailItemIndex + 1]"
        >
          <hr />
        </div>
      </div>
    </div>
  </div>

  <div
    class="mobileNavPanel d-flex d-lg-none"
    :class="{ visible: showMobileNavPanel }"
  >
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
          class="nav-item d-block mb-4"
          v-for="(navSection, index) in navSections"
          :key="index"
        >
          <div>
            <li class="nav-item d-block nav-title">
              {{ navSection.name }}
            </li>
            <li
              class="nav-item col-6 col-md-4"
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
                    class="navDetailItemIcon d-flex w-auto me-1 h-auto align-top"
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
        <li class="nav-item d-block">
          <div>
            <router-link
              to="/pricing"
              active-class="active bold"
              class="d-flex"
              @click="showMobileNavPanel = false"
            >
              <div
                class="navDetailItemIcon d-flex w-auto me-2 h-auto align-top"
              >
                <span class="material-icons-outlined"> sell </span>
              </div>
              <div class="navDetailItemTexts col my-auto align-bottom">
                <div class="navDetailItemTitle">Pricing</div>
              </div>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  components: {},
  data() {
    return {
      navSections: [
        {
          key: "products",
          name: "Products",
          items: [
            {
              key: "smallkash",
              title: "SmallKash",
              icon: "smallkashLogo.svg",
              description: "P2P Transfer App",
              path: "https://smallkash.chipdeals.me",
            },
            {
              key: "gokard",
              title: "Gokard",
              icon: "gokardLogo.png",
              description: "Virtual Card App",
              path: "https://gokard.chipdeals.me",
            },
            {
              key: "mytiviplus",
              title: "MyTivi+",
              icon: "mytiviplusLogo.svg",
              description: "TV Subscription App",
              path: "https://mytiviplus.chipdeals.me",
            },
            {
              key: "momoApi",
              title: "Mobile Money API",
              icon: "momoApiLogo.svg",
              description: "Collect and disburse money with customers",
              // path: "https://github.com/Chipdeals/Momo-Api",
              path: "/momo",
            },
            /*{
              key: "canalplusApi",
              title: "CANAL+ API (soon)",
              description: "TV Subscription API ",
              path: "#",
            },
            {
              key: "busApi",
              title: "Bus API (soon)",
              description: "Bus Booking api",
              path: "#",
            },*/
          ],
        },
        /*{
          key: "resources",
          name: "Resources",
          items: [
            {
              key: "",
              title: "Developers",
              description: "Start integrating Stripe’s products and tools",
              path: "#",
            },
            {
              key: "",
              title: "GitHub",
              description: "View our repo and shared sources",
              path: "#",
            },
          ],
        },*/
        {
          key: "company",
          name: "Company",
          items: [
            {
              key: "",
              title: "About us",
              iconName: "groups",
              description: "",
              path: "/about",
            },
            {
              key: "",
              title: "Contact us",
              iconName: "contact_page",
              description: "",
              path: "/contact",
            },
          ],
        },
      ],
      detailNavHovered: false,
      navItemHovered: {},
      navHoverDetailsHovered: false,
      documentScrolledUp: false,
      scrollY: 0,
      hoveredNavArrowLeftPosition: 0,
      showMobileNavPanel: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.documentScrolledUp = window.scrollY > this.scrollY;
      this.scrollY = window.scrollY;
    });
  },
  methods: {
    goToPath(path) {
      this.$router.push(path);
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
.logo img{

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
  width: 100%;
  z-index: 100;
}
.header.bg-glass {
  background-color: rgba(255, 255, 255, 0.2) !important;
  background-color: #717C8A33 !important;
  backdrop-filter: blur(20px);
  box-shadow: 0 1px 6px 0 var(--color4);
  border-bottom: var(--color4);
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
    #717C8A22,
    #717C8A22 50%,
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
  background-color: #717C8A22 !important;
  backdrop-filter: blur(10px);
  box-shadow: 0px 2px 3px 0 var(--color4);
  border-radius: 10px;
    transform: rotateX(-35deg);
    transform-origin: top;
}
.visible .hoverDetailsBody {
    transform: none!important;
}
.navDetailItemIcon img{
  width: 17px;
}
.hoverDetails_products {
  width: 300px;
}
.hoverDetails_products .navDetailItemIcon img{
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
@media screen and (max-width: 992px) {
  .closeBtn{
    position:absolute;
    top:0px;
    right:0px;
  color:var(--color11);
  color:var(--color10);
  }
  .mobileNavPanel .nav-item > * {
  line-height: 35px;
  padding: 0 0 0 0;
  text-decoration: none;
  font-size:12.1px;
}
.nav-title{
  color:var(--color11);
  color:var(--color10);
}
.navDetailItemTitle{
  font-size:12.1px;

}
  .mobileNavPanel {
opacity:0;
transition-duration:0.3s;
    pointer-events:none;
    position: fixed;
    right: 0px;
    z-index: 2000;
    height: 100vh;
    width: 100vw;
    top: 0px;
  }
  .mobileNavPanel a{
color:var(--color4)!important
  }

  .mobileNavPanel.visible {
    opacity:1;
    pointer-events:auto;
  }
  .navsContainer{
    background-color: var(--color6);
    box-shadow: 0px 0 8px 0 var(--color4);

  background-color: #717C8A33 !important;
  background-color: var(--color15)!important;
  backdrop-filter: blur(10px);
    overflow: auto;
    height: 85%;
    border-radius:20px ;
    position: relative


  }
  .overlay {
    display: none;
    width: calc(100%);
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index:-1;
  }
  .mobileNavPanel.visible .overlay {
    display: inline-block;
  }
}

.nbProduct {
  font-size: 12px;
}
</style>
<style>
header{
}
</style>
