<template>
  <div
    v-if="productTagId"
    :id="productTagId"
    :class="
      (productClasses || 'col-6 mx-auto msf-sm-0 mb-3') +
      (productIsVisible ? '  p-2 ' : '')
    "
  >
    <div
      class="w-100 position-relative productContainer p-1"
      v-if="productIsVisible"
    >
      <div
        v-if="!productData.uuid || noclick"
        class="productImageContainer cursorLoop w-100"
        @click="saveProduct()"
      >
        <div
          class="productImage"
          :style="{
            'background-image':
              'url(https://ik.imagekit.io/whynot/' +
              productData.picturePath +
              '?tr=q-20), ' +
              'url(' +
              replacePicture +
              '), ' +
              ' url(/images/loading-buffer.gif)',
          }"
        ></div>
      </div>
      <router-link
        v-else
        :to="productLink"
        class="productImageContainer d-block cursorLoop w-100"
        @click="saveProduct()"
      >
        <div
          class="productImage"
          :style="{
            'background-image':
              'url(https://ik.imagekit.io/whynot/' +
              productData.picturePath +
              '?tr=q-20), url(/images/loading-buffer.gif)',
          }"
        ></div>
      </router-link>
      <div class="productName text-center my-2">{{ productData.name }}</div>

      <div
        class="category my-2"
        v-if="productData.category && !hideCategory && !showAsPromotion"
      >
        {{ productData.category }}
      </div>
      <div
        class="category my-2"
        v-if="showAsPromotion && productData.promotionMsg2"
      >
        {{ productData.promotionMsg2 }}
      </div>
      <div
        class="oblicBandMessage bold"
        v-if="productData.isInPromotion && productData.promotionMsg1"
      >
        {{ productData.promotionMsg1 }}
      </div>
      <div
        class="longHorizontalBand bold marquee"
        v-if="showAsPromotion && productData.promotionMsg3"
      >
        <div>
          {{ productData.promotionMsg3 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Product",
  props: {
    productData: Object,
    replacePicture: String,
    productClasses: String,
    hideCategory: Boolean,
    showSubCategory: Boolean,
    onSubCategoyClick: Function,
    showAsPromotion: Boolean,
    noclick: Boolean,
  },
  data() {
    return {
      productPath: "",
      productLink: {},
      productTagId: "",
      productIsVisible: false,
    };
  },
  mounted() {
    const productId = this.productData.name
      ? this.productData.name
          .replace(/^(.+? )(.+? ).+$/g, "$1,$2")
          .replace(/\W/g, "-") +
        "_" +
        this.productData.uuid
      : "none";
    //console.log(this.$route, this.$router);
    this.productPath =
      this.$route.matched[0].path.replace(/(.+)(:(.+))/, "$1") +
      (this.$route.params[
        this.$route.matched[0].path.replace(/(.+)(:(.+))/, "$3")
      ] || "") +
      "/product/" +
      productId;
    this.productLink = { path: this.productPath, query: this.$route.query };
    this.productTagId = (
      "product_" +
      productId +
      "_" +
      new Date().getTime() +
      "_" +
      Math.random()
    ).replace(/\./g, "");
    setTimeout(() => {
      let elementIsVisisble = !!document.querySelector("#" + this.productTagId);
      if (!elementIsVisisble) {
        return;
      }
      this.observeElementVisibility(
        "#" + this.productTagId,
        this.onProductIsVisible
      );
    }, 500);
  },
  methods: {
    saveProduct() {
      this.$SetProductToShow(this.productData);
    },
    onProductIsVisible() {
      this.productIsVisible = true;
    },
    observeElementVisibility(
      elementSelector,
      onVisible = () => {},
      onUnvisible = () => {}
    ) {
      const element = document.querySelector(elementSelector);
      var observer = new IntersectionObserver(
        function (entries) {
          //console.log(entries[0].intersectionRatio);
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
  watch: {
    "$route.query.search": {
      handler: function () {
        this.productLink = {
          path: this.productPath,
          query: this.$route.query,
        };
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.productContainer {
  overflow: hidden;
}

.productImageContainer {
  background-color: white;
  border: 1px solid rgba(76, 87, 102, 0.1);
  overflow: hidden;
  border-radius: 20px;
}

.productImage {
  background-size: cover;
  background-position: center;
  height: 180px;
  width: 100%;
  cursor: zoom-in;
}

.productName {
  font-weight: 500;
  font-size: 14px;
}

.productName:first-letter {
  text-transform: capitalize;
}

.category {
  border-radius: 5px;
  position: absolute;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  background: #eceff5;
  background: var(--gray9);
  font-size: 12px;
  font-weight: 900;
  overflow: hidden;
  user-select: none;
  transition: background 150ms ease, border 150ms ease;
  padding: 8px 12px;
  right: 10px;
  top: 10px;
  max-width: 80%;
  cursor: pointer;
}

.category:first-letter {
  text-transform: capitalize;
}

.oblicBandMessage {
  border-radius: 5px;
  position: absolute;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  background: #eceff5;
  background: var(--gray4);
  color: var(--gray9);
  font-size: 15px;
  font-weight: 900;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: background 150ms ease, border 150ms ease;
  padding: 10px 0px;
  left: -35%;
  top: 6%;
  width: 100%;
  transform: rotate(-45deg);
  cursor: pointer;
  text-align: center;
}

.longHorizontalBand {
  width: 96%;
  height: 41px;
  background-image: linear-gradient(
    transparent,
    rgb(27 79 40 / 20%) 70%,
    transparent
  );
  position: absolute !important;
  bottom: 20%;
  color: var(--gray9);
  backdrop-filter: blur(3px);
}

.productImageContainer:hover {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
}

.marquee {
  overflow: hidden;
  position: relative;
}

.marquee * {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 50px;
  text-align: center;
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  -moz-animation: scroll-left 2s linear infinite;
  -webkit-animation: scroll-left 2s linear infinite;
  animation: scroll-left 20s linear infinite;
  width: max-content;
}

@-moz-keyframes scroll-left {
  0% {
    -moz-transform: translateX(100%);
  }

  100% {
    -moz-transform: translateX(-100%);
  }
}

@-webkit-keyframes scroll-left {
  0% {
    -webkit-transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
  }
}

@keyframes scroll-left {
  0% {
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}
</style>
