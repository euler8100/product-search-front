<template>
  <div class="productsView container pt-3">
    <div
      class="products"
      v-if="!loadingProducts && !$Commons.isEmpty(products)"
    >
      <div class="row">
        <Product
          v-for="(product, productIndex) in products"
          :key="productIndex"
          :productData="product"
          :showProduct="showProduct"
        />
      </div>
    </div>
    <div v-else-if="!loadingProducts">
      Aucune produit trouvé pour <span class="bold">{{ searchedText }}</span>
    </div>
    <div v-else>Recherche en cours . . .</div>
  </div>
  <router-view isChildren />
</template>

<script>
import Product from "@/components/Product";

export default {
  name: "ProductsView",
  components: { Product },
  data() {
    return {
      searchedText: "",
      loadingProducts: true,
      products: [],
    };
  },
  mounted() {},
  methods: {
    async searchProdcuts() {
      this.loadingProducts = true;
      const productsResponse = await this.$SearchProduct(this.searchedText);
      this.products = productsResponse.products;
      const position = await this.$Commons.getPosition(this.notify);
      console.log(position);
      if (position.error) {
        this.loadingProducts = false;
        this.notify({
          text: "Désolé, nous n'arrivons pas à accéder à votre position. Les résultats ne seronrt pas filtré par rapport à votre position.",
          duration: 6000,
          progress: false,
          type: "WARNING",
        });
        return;
      }
      this.loadingProducts = false;
    },
  },
  watch: {
    $route: {
      handler: function (newRoute) {
        this.searchedText = newRoute.query.search || "";
        this.searchProdcuts();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.logo {
  margin-top: 100px;
  margin-bottom: 20px;
}
.logo img {
  width: 100px;
}
.bar {
  margin: 0 auto;
  width: 90%;
  position: relative;
  border-radius: 30px;
  border: 1px solid #dcdcdc;
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
}
.subtitle {
  color: var(--blue-gray-5);
  width: 70%;
  font-size: 13px;
}

.products {
  position: relative;
}
</style>