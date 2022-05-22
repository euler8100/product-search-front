<template>
  <ProductDetails
    v-if="productIsVisible"
    :productData="productToShow"
    :closeDetails="closeDetails"
  />
</template>

<script>
/* eslint-disable */
import { defineComponent } from "vue";
import ProductDetails from "@/components/ProductDetails.vue";

export default defineComponent({
  name: "Product",
  components: { ProductDetails },
  props: {
    isChildren: Boolean,
    parentPath: String,
  },
  data() {
    return {
      productIsVisible: true,
      productToShow: { picturePath: "" },
      productUuid: "",
    };
  },
  async mounted() {
    this.$initSearch();

    this.productUuid = this.$route.params.productId.replace(/.+_(.+)$/, "$1");
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    this.productToShow = this.$GetProductToShow();
    if (this.$Commons.isEmpty(this.productToShow.uuid)) {
      console.log("no product waiting", this.productToShow);
      this.searchProductToShow();
      return;
    }
    if (this.productToShow.uuid !== this.productUuid) {
      console.log(
        "product saved haven't matching id with path",
        this.productToShow
      );
      this.searchProductToShow();
      return;
    }
  },

  methods: {
    closeDetails() {
      if (this.isChildren) {
        const parentPath =
          this.$route.matched[0].path.replace(/(.+)(:(.+))/, "$1") +
          (this.$route.params[
            this.$route.matched[0].path.replace(/(.+)(:(.+))/, "$3")
          ] || "");
        this.$router.push({ path: parentPath, query: this.$route.query });
      } else {
        this.$router.push({ path: "/search", query: this.$route.query });
      }
    },
    async searchProductToShow() {
      const productGettingResponse = await this.$GetProductByUuid(
        this.productUuid
      );
      if (productGettingResponse.success) {
        this.productToShow = productGettingResponse.product;
      } else {
        console.log("product not found in db");
      }
    },
    observeElementVisibility(
      elementSelector,
      onVisible = () => {},
      onUnvisible = () => {}
    ) {
      const element = this.$el.querySelector(elementSelector);
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
    },
  },
});
</script>

<style scoped></style>
