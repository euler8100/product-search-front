<template>
  <div class="momoApiPage">
    <section class="section top-part text-center pb-5 mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-8 mx-auto">
            <h1 class="pb-2 title display-5">
              Chipdeals Mobile Money API to
              <span class="color-highlight"> access all </span> user
              <span class="color-highlight"> mobile accounts</span>
            </h1>
            <div class="py-3 col-9 mx-auto" style="">
              Chipdeals Mobile Money API is the payment processor of choice for
              some of the fastest-growing businesses supporting Africa. Here're
              5 reasons why.
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section oblicSession bg-color8">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5 d-flex">
            <div class="">
              <div class="sectionNumber fs-3 bold">01</div>
              <h1 class="title">Start collecting instantly</h1>
              <p class="">
                Chipdeals is the fastest and easiest way to start getting paid
                online in Africa. From registration to first collection will
                take
                <span class="bold color-white"> less than 10 minutes </span>.
                Don't believe us ? See for yourself
                <span
                  class="desktopCollectingCodeFingerPointer d-none d-md-inline-block"
                  >👉</span
                >
                <span
                  class="mobileCollectingCodeFingerPointer d-inline-block d-md-none"
                  >👉</span
                >
              </p>
              <a href="https://github.com/Chipdeals/Momo-Api" class="ctaBtn">
                Getting started
              </a>
            </div>
          </div>

          <div class="col-md-6 order-md-last mt-5 mt-md-0">
            <Code />
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5 d-inline-flex position-relative">
            <div id="lottieChecker_check" class="lottiePositionChecker"></div>
            <div class="lottieContainer">
              <lottie-player
                class="animate__animated animate__zoomIn mx-auto"
                v-if="lottieCheckVisible"
                :src="check"
                background="transparent"
                speed="1"
                style="width: 100%"
                autoplay
              ></lottie-player>
              <lottie-player
                class="animate__animated animate__zoomIn mx-auto"
                v-else
                :src="check"
                background="transparent"
                speed="1"
                style="width: 100%"
              ></lottie-player>
            </div>
          </div>
          <div class="col-md-7 col-lg-5 d-flex">
            <div class="my-auto">
              <div class="sectionNumber fs-3 bold">02</div>
              <h1 class="title">Simple, transparent pricing</h1>
              <p class="">Zero integration fee. Zero maintenance fee.</p>
              <p class="">
                Chipdeals only charges a tiny fee per successful transaction,
                which means we literally only make money when you do, and we
                work hard to ensure every transaction succeeds.
              </p>
              <router-link to="/pricing" class="ctaBtn">
                Integrate for free
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section oblicSession bg-color8">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5 d-inline-flex order-md-last position-relative">
            <div
              id="lottieChecker_devFriendlyBgDark"
              class="lottiePositionChecker"
            ></div>
            <div class="lottieContainer">
              <lottie-player
                class="animate__animated animate__zoomIn mx-auto"
                v-if="lottieDevFriendlyBgDarkVisible"
                :src="devFriendlyBgDark"
                background="transparent"
                speed="1"
                style="width: 100%"
                autoplay
              ></lottie-player>
              <lottie-player
                class="animate__animated animate__zoomIn mx-auto"
                v-else
                :src="devFriendlyBgDark"
                background="transparent"
                speed="1"
                style="width: 100%"
              ></lottie-player>
            </div>
          </div>
          <div class="col-md-7 col-lg-5 d-flex">
            <div class="my-auto">
              <div class="sectionNumber fs-3 bold">03</div>
              <h1 class="title">Developer friendly</h1>
              <p class="">
                Our APIs are so easy to understand and integrate that you will
                feel like you have built it yourself. We removed all the hassle
                so you can better focus on building your business.
              </p>

              <router-link
                v-if="false"
                to="/pricing"
                class="btn btn-sm btn-outline-light whiteBtn zoomHover"
              >
                See our picing ▸
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section oblicSession bg-color8">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5 d-inline-flex position-relative">
            <div id="lottieChecker_stats" class="lottiePositionChecker"></div>
            <div class="lottieContainer">
              <lottie-player
                class="animate__animated animate__zoomIn mx-auto"
                v-if="lottieStatsVisible"
                :src="stats"
                background="transparent"
                speed="1"
                style="width: 100%"
                autoplay
              ></lottie-player>
              <lottie-player
                class="animate__animated animate__zoomIn mx-auto"
                v-else
                :src="stats"
                background="transparent"
                speed="1"
                style="width: 100%"
              ></lottie-player>
            </div>
          </div>
          <div class="col-md-7 col-lg-5 d-flex">
            <div class="my-auto">
              <div class="sectionNumber fs-3 bold">04</div>
              <h1 class="title">
                Understand exactly how your business is performing
              </h1>
              <p class="">
                Chipdeals provides detailed reporting, alerts, and exports, so
                you and your team can take better decisions.
              </p>
              <router-link
                to="#"
                class="btn btn-sm btn-outline-light whiteBtn zoomHover"
                v-if="false"
              >
                LEARN MORE
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5 d-inline-flex order-md-last position-relative">
            <div
              id="lottieChecker_customersService"
              class="lottiePositionChecker"
            ></div>
            <div class="lottieContainer">
              <lottie-player
                class="animate__animated animate__zoomIn mx-auto"
                v-if="lottieCustomersServiceVisible"
                :src="customersService"
                background="transparent"
                speed="1"
                style="width: 100%"
                autoplay
              ></lottie-player>
              <lottie-player
                class="animate__animated animate__zoomIn mx-auto"
                v-else
                :src="customersService"
                background="transparent"
                speed="1"
                style="width: 100%"
              ></lottie-player>
            </div>
          </div>
          <div class="col-md-7 col-lg-5 d-flex">
            <div class="my-auto">
              <div class="sectionNumber fs-3 bold">05</div>
              <h1 class="title">Get helped for any issue 24/7</h1>
              <p class="">
                Our Customer Support team is available to support you, and
                they’re empowered to resolve issues as quickly as possible.
              </p>
              <router-link
                to="#"
                class="btn btn-sm btn-outline-light whiteBtn zoomHover"
                v-if="false"
              >
                LEARN MORE
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section bg-color8">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <p>Try Chipdeals</p>
          </div>
          <div class="col-md-7">
            <h1 class="title">Start accepting payments in just 10 minutes</h1>
          </div>
          <div class="col-md-3">
            <a
              href="https://github.com/Chipdeals/Momo-Api"
              class="ctaBtn ctaBtnDark"
            >
              Accept payments now
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Code from "@/components/Code";

export default {
  name: "MomoApi",
  components: { Code },
  data() {
    return {
      currentSection: 0,
      customersService: JSON.stringify(
        require("@/assets/lotties/customersService.json")
      ),
      devFriendlyBgDark: JSON.stringify(
        require("@/assets/lotties/devFriendlyBgDark.json")
      ),
      stats: JSON.stringify(require("@/assets/lotties/stats.json")),
      check: JSON.stringify(require("@/assets/lotties/check.json")),
      lottieCustomersServiceVisible: false,
      lottieDevFriendlyBgDarkVisible: false,
      lottieStatsVisible: false,
      lottieCheckVisible: false,
    };
  },
  mounted() {
    this.observeElementVisibility("#lottieChecker_check", () => {
      this.lottieCheckVisible = true;
    });
    this.observeElementVisibility("#lottieChecker_devFriendlyBgDark", () => {
      this.lottieDevFriendlyBgDarkVisible = true;
    });
    this.observeElementVisibility("#lottieChecker_stats", () => {
      this.lottieStatsVisible = true;
    });
    this.observeElementVisibility("#lottieChecker_customersService", () => {
      this.lottieCustomersServiceVisible = true;
    });
  },
  methods: {
    observeElementVisibility(
      elementSelector,
      onVisible = () => {},
      onUnvisible = () => {}
    ) {
      const element = document.querySelector(elementSelector);
      var observer = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting === true) {
            onVisible();
          } else {
            onUnvisible();
          }
        },
        { threshold: [1] }
      );
      observer.observe(element);
      return "ok";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sectionNumber{
  color:var(--color9)
}
.mobileCollectingCodeFingerPointer{
transform: rotate(90deg);
}
.lottieContainer{
  min-height: 300px;
}
.lottiePositionChecker{
  position: absolute;
  top: 75%
}
</style>
