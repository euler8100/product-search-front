<template>
  <div class="home">
    <div class="products">
      <div class="row">
        <Product
          v-for="(product, productIndex) in products"
          :key="productIndex"
          :productData="product"
          :showProduct="showProduct"
        />
      </div>
    </div>
  </div>
  <router-view isChildren />
</template>

<script>
import Product from "@/components/Product";

export default {
  name: "ShopView",
  components: { Product },
  data() {
    return {
      searchedText: "",
      products: [],
      market: {},
    };
  },
  async mounted() {
    const userUuid = this.$Commons.getUserUuid();
    if (this.$Commons.isEmpty(userUuid)) {
      this.$router.push("/login?next=shop");
      return;
    }
    const marketResponse = await this.$Controller.getMarketsByUser();
    if (!marketResponse.success) {
      this.notify({
        text: marketResponse.message,
        duration: 4000,
        progress: false,
        type: "WARNING",
      });
      return;
    }
    this.market = marketResponse.markets[0] || {};
    this.refreshProducts();
  },
  methods: {
    async refreshProducts() {
      if (this.$Commons.isEmpty(this.market)) {
        return;
      }
      const productsResponse = await this.$Controller.getProductsByMarket(
        this.market.uuid
      );
      if (!productsResponse.success) {
        this.notify({
          text: productsResponse.message,
          duration: 4000,
          progress: false,
          type: "WARNING",
        });
        return;
      }
      this.products = productsResponse.products.map((procuct) => {
        return {
          name: product.name,
          description: product.description,
          price: procuct.price,
          uuid: product.uuid,
          picturePath: product.picturePath,
          alternativePicturesPath: [],
          marketName: this.market.name,
          marketCoordinate: this.market.coordinate,
          marketPositionDescription: this.market.positionDescription,
          category: "",
        };
      });
      console.log(this.products);
    },
    async searchProdcuts() {
      const position = await this.getPosition();
      console.log(position);
    },
    async getPosition() {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position);
          },
          (error) => {
            console.log(error);
            this.notify({
              text: "Désolé, nous n'arrivons pas à accéder à votre position, veuilez réessayer si vous pensez que c'est une erreur",
              duration: 3000,
              progress: false,
              type: "WARNING",
            });
          },
          { enableHighAccuracy: true }
        );
      });
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