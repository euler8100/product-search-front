<template>
  <app-website-footer>
    <footer
      class="footer-1 space--xs text-center-xs pt-5"
      style="margin-top: 0px"
    >
      <div class="container">
        <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
          <div class="col">
            <h3 class="color-white mt-1">
              <router-link to="/" class="navbar-brand logo d-flex w-100"
                ><img src="/icon_chipdeal.png" class="my-auto me-2" />
                <span class="my-auto d-inline-block"> Chipdeals</span>
              </router-link>
            </h3>
            <p>The fastest way to access African services & payment accounts</p>
          </div>
          <div
            class="col"
            v-for="(footerSession, sessionKey) in navSections"
            :key="sessionKey"
          >
            <h3 class="title mt-1">{{ footerSession.name }}</h3>
            <ul>
              <li
                class="sessionItem zoomHover"
                v-for="(sessionItem, itemKey) in footerSession.items"
                :key="itemKey"
              >
                <a
                  v-if="/http/.test(sessionItem.path)"
                  :href="sessionItem.path"
                >
                  {{ sessionItem.name }}</a
                >
                <router-link v-else :to="sessionItem.path">
                  {{ sessionItem.name }}</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="down-footer py-3 pt-1">
        <div class="col-12 text-center">
          <br /><span class="type--fine-print title"
            >Copyright © <span class="update-year">2021</span> Chipdeals Inc.
          </span>
        </div>
      </div>
    </footer>
    <!----></app-website-footer
  >
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      navSections: [
        {
          name: "Products",
          items: [
            { name: "SmallKash", path: "https://smallkash.chipdeals.me" },
            { name: "Gokard", path: "https://gokard.chipdeals.me" },
            { name: "MyTivi+", path: "https://mytiviplus.chipdeals.me" },
            {
              name: "Mobile Money API",
              /*  path: "https://github.com/Chipdeals/Momo-Api"  */ path: "/momo",
            },
            { name: "CANAL+ API (soon)", path: "#" },
            { name: "Bus API (soon)", path: "#" },
          ],
        },
        /*{
          name: "Resources",
          items: [
            { name: "Developers", path: "#" },
            { name: "GitHub", path: "#" },
          ],
        },*/
        {
          name: "Company",
          items: [
            { name: "About us", path: "/about" },
            { name: "Contact us", path: "/contact" },
            { name: "Pricing", path: "/pricing" },
          ],
        },
        {
          name: "Legal",
          items: [
            { name: "Terms of use", path: "/term" },
            //{ name: "Security information", path: "security" },
          ],
        },
      ],
    };
  },
};
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
  display: block;
}
.logo img{

    width: 25px;
    height: 25px;
}

.navBar {
  background-color: transparent !important;
  background-image: linear-gradient(
    to bottom,
    var(--color6),
    var(--color6) 80%,
    rgba(255, 255, 255, 0)
  );
  color: var(--color15);
}
.sessionItem {
  font-weight: 100;
  font-size: 14px;
}
</style>
