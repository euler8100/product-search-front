<template>
  <div class="shop container">
    <div v-if="!$Commons.isEmpty(market) && !loadingMarket" class="mt-2">
      <div class="marketData">
        <h3 class="title">{{ market.name }} <span class="material-icons-outlined" @click="initMarketUpdate()"
            style="position: relative;top: 4px; cursor: pointer;">
            edit
          </span>
        </h3>
        <h4 class="">Whatsapp: {{ market.whatsappNumber }}</h4>
        <h4 class="">{{ market.positionDescription }}</h4>
      </div>
      <div class="products">
        <div class="row">
          <Product :productData="{ name: 'Nouveau produit' }" replacePicture="'/images/add.png'"
            @click="initProductCreation()" />
          <Product v-for="(product, productIndex) in products" :key="productIndex" :productData="product" noclick
            @click="(event) => { showProductMenu(event, product) }" />
        </div>
      </div>
    </div>
    <div class="text-center mt-5 pt-2" v-else-if="!loadingMarket">
      Vous n'avez encore aucune boutique pour présenter vos produits. Commencez
      dès maintenant en nous présentant votre business.
      <div class="mt-5 pt-5"></div>
      <button class="ctaBtn" @click="showModal('createMarket')">
        Commencer
      </button>
    </div>
    <div v-else class="mt-5 pt-2">Chargement . . .</div>
  </div>

  <div class="modalContainer d-flex" :class="{ visible: modalIsVisible || forceModalVisible }">
    <div class="overlay" @click="modalIsVisible = false"></div>
    <div class="modalBox col-11 col-sm-10 col-md-8 m-auto p-4">
      <div class="d-inline-block closeBtn p-3" @click="modalIsVisible = false">
        <span class="material-icons-outlined"> close </span>
      </div>
      <div v-if="/(createMarket)|(updateMarket)/.test(modalReason)">
        <form @submit.prevent="/createMarket/.test(modalReason)
        ? createMarket()
        : updateMarket()" class="mt-4">
          <div class="row mb-2">
            <div class="col-12">
              <div class="form-group mb-3 mb-sm-4">
                <input type="text" class="form-control" required v-model="modalData.marketName" placeholder=" " />
                <label class="label"> Nom de la boutique </label>
              </div>
              <div class="form-group mb-3 mb-sm-4">
                <input type="tel" class="form-control" required v-model="modalData.whatsappNumber" placeholder=" " />
                <label class="label"> Numéro whatsapp </label>
              </div>

              <div class="col-12">
                <div class="form-group mb-3 mb-sm-4">
                  <textarea type="text" class="form-control" style="height: 130px" required
                    v-model="modalData.marketPositionDescription" placeholder=" " rows="4"></textarea>
                  <label class="label">
                    Brève description de votre position
                  </label>
                </div>
              </div>
            </div>
          </div>
          Vous devez activer le partage de position avant de pouvoir créer une
          boutique.

          <div class="text-end">
            <span class="
                material-icons material-icons-outlined
                refreshIcon
                me-4
                notranslate
              " v-if="creatingMarket || updatingMarket">
              refresh
            </span>
            <button class="ctaBtn" role="button"> {{ /createMarket/.test(modalReason) ? 'Démarrer' : "Mettre à jour" }}
            </button>
          </div>
        </form>
      </div>
      <div v-if="/(createProduct)|(updateProduct)/.test(modalReason)">
        <form @submit.prevent="
          /createProduct/.test(modalReason)
            ? createProduct()
            : updateProduct()
        " class="mt-4">
          <div class="row mb-2">
            <div class="col-12">
              <div class="form-group mb-3 mb-sm-4">
                <input type="text" class="form-control" required v-model="modalData.productName" placeholder=" " />
                <label class="label"> Nom du produit </label>
              </div>

              <div class="form-group mb-3 mb-sm-4">
                <input type="number" class="form-control" required v-model="modalData.productPrice" placeholder=" " />
                <label class="label"> Prix en fcfa </label>
              </div>

              <div class="form-group mb-3 mb-sm-4">
                <input type="file" class="form-control" :required="/createProduct/.test(modalReason)"
                  @change="pictureChange" />
                <label class="label"> Prix en fcfa </label>
              </div>

              <div class="col-12">
                <div class="form-group mb-3 mb-sm-4">
                  <textarea type="text" class="form-control" style="height: 130px" required
                    v-model="modalData.productDescription" placeholder=" " rows="4"></textarea>
                  <label class="label"> Décrivez votre produit </label>
                </div>
              </div>
            </div>
          </div>

          <div class="text-end">
            <span class="
                material-icons material-icons-outlined
                refreshIcon
                me-4
                notranslate
              " v-if="creatingProduct || updatingProduct">
              refresh
            </span>
            <button class="ctaBtn" role="button">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="menu" :style="{ top: menuPositions.y + 'px', left: menuPositions.x + 'px' }" v-if="showMenu">
    <div class="overlay" @click="showMenu = false"></div>

    <ul class="menu-options">
      <li class="menu-option" @click="initProductModification"> <span class="material-icons-outlined"
          style="position: relative;top: 7px;">
          edit
        </span> Modifier</li>
      <li class="menu-option" @click="deleteProduct"> <span class="material-icons-outlined"
          style="position: relative;top: 7px;">
          delete
        </span> Supprimer</li>
    </ul>
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
      loadingMarket: true,
      creatingMarket: false,
      creatingProduct: false,
      updatingProduct: false,
      modalIsVisible: false,
      forceModalVisible: false,
      modalReason: "createMarket",
      modalData: {
        marketUuid: "",
        marketName: "",
        whatsappNumber:"",
        marketPositionDescription: "",
        productUuid: "",
        productName: "",
        productDescription: "",
        productPrice: "",
        productPicture: undefined,
      },
      showMenu: false,
      menuPositions: {
        x: 0,
        y: 0
      }
    };
  },
  async mounted() {
    const userUuid = this.$Commons.getUserUuid();
    if (this.$Commons.isEmpty(userUuid)) {
      this.$router.push("/login?next=shop");
      return;
    }
    await this.loadMarket();
    this.refreshProducts();

    if (
      this.$Commons.isEmpty(this.market) &&
      this.$route.query.hasOwnProperty("newShop")
    ) {
      this.showModal("createMarket");
      this.$router.replace({ query: null });
    }
    if (
      !this.$Commons.isEmpty(this.market) &&
      this.$route.query.hasOwnProperty("newShop")
    ) {
      this.notify({
        text: "Désolé, mais vous ne pouvez créer qu'une seul boutique pour le moment",
        duration: 4000,
        progress: true,
        type: "WARNING",
      });
      this.$router.replace({ query: null });
    }
    if (
      !this.$Commons.isEmpty(this.market) &&
      this.$route.query.hasOwnProperty("newProduct")
    ) {
      this.showModal("createProduct");
      this.$router.replace({ query: null });
    }
  },
  methods: {
    async loadMarket() {
      this.loadingMarket = true;
      const marketResponse = await this.$Controller.getMarketsByUser();
      this.loadingMarket = false;
      if (!marketResponse.success) {
        this.notify({
          text: marketResponse.message,
          duration: 4000,
          progress: true,
          type: "WARNING",
        });
        return;
      }
      this.market = marketResponse.markets.pop() || {};
    },
    showModal(modalReason) {
      this.modalIsVisible = true;
      this.modalReason = modalReason;
    },
    initProductCreation() {
      this.modalData.productName = "";
      this.modalData.productDescription = "";
      this.modalData.productPrice = "";
      this.modalData.productPicture = undefined;
      this.showModal("createProduct");
    },
    initProductModification() {
      // initProductModification(product) {
      // this.modalData.productUuid = product.uuid;
      // this.modalData.productName = product.name;
      // this.modalData.productDescription = product.description;
      // this.modalData.productPrice = product.price;
      // this.modalData.productPicture = undefined;
      this.showMenu = false
      this.showModal("updateProduct");
    },
    initMarketUpdate() {
      this.modalData.marketUuid = this.market.uuid
      this.modalData.marketName = this.market.name
      this.modalData.marketPositionDescription = this.market.positionDescription
      this.modalData.whatsappNumber = this.market.whatsappNumber
      this.showModal("updateMarket");
    },
    showProductMenu(clickEvent, product) {
      console.log(clickEvent.clientX);
      console.log(clickEvent.clientY);

      this.modalData.productUuid = product.uuid;
      this.modalData.productName = product.name;
      this.modalData.productDescription = product.description;
      this.modalData.productPrice = product.price;
      this.modalData.productPicture = undefined;

      this.menuPositions = {
        x: clickEvent.clientX,
        y: clickEvent.clientY,
      }

      this.showMenu = true

    },
    async createMarket() {
      this.forceModalVisible = true;
      this.creatingMarket = true;
      const position = await this.$Commons.getPosition(this.notify);
      if (position.error) {
        this.notify({
          text: "Désolé, nous n'arrivons pas à accéder à votre position, veuilez réessayer si vous pensez que c'est une erreur",
          duration: 6000,
          progress: true,
          type: "WARNING",
        });
        return;
      }
      const marketData = {
        name: this.modalData.marketName,
        positionDescription: this.modalData.marketPositionDescription,
        whatsappNumber: this.modalData.whatsappNumber,
        coordinate: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      };
      console.log(marketData);
      const marketResponse = await this.$Controller.createMarket(marketData);
      this.creatingMarket = false;
      this.forceModalVisible = false;
      if (!marketResponse.success) {
        this.notify({
          text: marketResponse.message,
          duration: 4000,
          progress: true,
          type: "WARNING",
        });
        return;
      }

      this.notify({
        text: "Boutique créee",
        duration: 3000,
        type: "SUCCESS",
        progress: true,
      });
      this.modalIsVisible = false;
      await this.loadMarket();
      this.refreshProducts();
    },
    async updateMarket() {
      this.forceModalVisible = true;
      this.creatingMarket = true;
      const position = await this.$Commons.getPosition(this.notify);
      if (position.error) {
        this.notify({
          text: "Désolé, nous n'arrivons pas à accéder à votre position, veuilez réessayer si vous pensez que c'est une erreur",
          duration: 6000,
          progress: true,
          type: "WARNING",
        });
        return;
      }
      const marketData = {
        uuid: this.modalData.marketUuid,
        name: this.modalData.marketName,
        positionDescription: this.modalData.marketPositionDescription,
        whatsappNumber: this.modalData.whatsappNumber,
        coordinate: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      };
      console.log(marketData);
      const marketResponse = await this.$Controller.updateMarket(marketData);
      this.creatingMarket = false;
      this.forceModalVisible = false;
      if (!marketResponse.success) {
        this.notify({
          text: marketResponse.message,
          duration: 4000,
          progress: true,
          type: "WARNING",
        });
        return;
      }

      this.notify({
        text: "Boutique Mise à jour",
        duration: 3000,
        type: "SUCCESS",
        progress: true,
      });
      this.modalIsVisible = false;
      await this.loadMarket();
      this.refreshProducts();
    },
    async refreshProducts() {
      if (this.$Commons.isEmpty(this.market)) {
        return;
      }
      this.loadingProduct = true;
      const productsResponse = await this.$Controller.getProductsByMarket(
        this.market.uuid
      );
      this.loadingProduct = false;

      if (!productsResponse.success) {
        this.notify({
          text: productsResponse.message,
          duration: 4000,
          progress: true,
          type: "WARNING",
        });
        return;
      }
      this.products = productsResponse.products.reverse().map((product) => {
        return {
          name: product.name,
          description: product.description,
          price: product.price,
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
    async createProduct() {
      this.forceModalVisible = true;
      this.creatingProduct = true;
      const productData = {
        name: this.modalData.productName,
        description: this.modalData.productDescription,
        price: this.modalData.productPrice,
        marketUuid: this.market.uuid,
        picture: this.modalData.productPicture,
      };
      console.log(productData);
      const productResponse = await this.$Controller.createProduct(productData);
      this.creatingProduct = false;
      this.forceModalVisible = false;
      if (!productResponse.success) {
        this.notify({
          text: productResponse.message,
          duration: 4000,
          progress: true,
          type: "WARNING",
        });
        return;
      }

      this.notify({
        text: "Produit créé",
        duration: 3000,
        type: "SUCCESS",
        progress: true,
      });
      this.modalIsVisible = false;
      this.refreshProducts();
    },
    async updateProduct() {
      this.forceModalVisible = true;
      this.updatingProduct = true;
      const orinalProduct = this.products.find((product) => {
        return product.uuid === this.modalData.productUuid;
      });

      console.log(this.modalData);

      const productDataUpdated = {
        uuid: this.modalData.productUuid,
      };
      let hasUpdate = false;

      if (orinalProduct.name !== this.modalData.productName) {
        productDataUpdated.name = this.modalData.productName;
        hasUpdate = true;
      }
      if (orinalProduct.description !== this.modalData.productDescription) {
        productDataUpdated.description = this.modalData.productDescription;
        hasUpdate = true;
      }
      if (orinalProduct.price !== this.modalData.productPrice) {
        productDataUpdated.price = this.modalData.productPrice;
        hasUpdate = true;
      }
      if (orinalProduct.description !== this.modalData.productDescription) {
        productDataUpdated.description = this.modalData.productDescription;
        hasUpdate = true;
      }
      if (this.modalData.productPicture) {
        productDataUpdated.picture = this.modalData.productPicture;
        hasUpdate = true;
      }

      console.log(productDataUpdated);
      if (!hasUpdate) {
        this.updatingProduct = false;
        this.forceModalVisible = false;
        this.notify({
          text: "Aucune modification apporté au produit",
          duration: 4000,
          progress: true,
          type: "WARNING",
        });
        return;
      }
      const productResponse = await this.$Controller.updateProduct(
        productDataUpdated
      );
      this.updatingProduct = false;
      this.forceModalVisible = false;
      if (!productResponse.success) {
        this.notify({
          text: productResponse.message,
          duration: 4000,
          progress: true,
          type: "WARNING",
        });
        return;
      }

      this.notify({
        text: "Produit mis à jour",
        duration: 3000,
        type: "SUCCESS",
        progress: true,
      });
      this.modalIsVisible = false;
      this.refreshProducts();
    },
    async deleteProduct() {
      this.showMenu = false
      const notificationId = this.notify({
        text: "Suppression de produit",
        duration: 400000,
        progress: false,
        type: "INFO",
      });
      const deletionResponse = await this.$Controller.deleteProduct(
        this.modalData.productUuid
      );
      this.destroyNotification(notificationId)
      if (!deletionResponse.success) {
        this.notify({
          text: deletionResponse.message,
          duration: 4000,
          progress: true,
          type: "WARNING",
        });
        return;
      }

      this.refreshProducts();
      this.notify({
        text: "Produit supprimé",
        duration: 3000,
        type: "SUCCESS",
        progress: true,
      });
    },
    pictureChange(event) {
      this.modalData.productPicture = event.target.files[0];
    },
  },
  watch: {
    $route: {
      handler: function (newRoute) {
        if (
          this.$Commons.isEmpty(this.market) &&
          newRoute.query.hasOwnProperty("newShop") &&
          !this.loadingMarket
        ) {
          this.showModal("createMarket");
          this.$router.replace({ query: null });
        }
        if (
          !this.$Commons.isEmpty(this.market) &&
          newRoute.query.hasOwnProperty("newShop")
        ) {
          this.notify({
            text: "Désolé, mais vous ne pouvez créer qu'une seul boutique pour le moment",
            duration: 4000,
            progress: true,
            type: "WARNING",
          });
          this.$router.replace({ query: null });
        }
        if (
          !this.$Commons.isEmpty(this.market) &&
          newRoute.query.hasOwnProperty("newProduct")
        ) {
          this.showModal("createProduct");
          this.$router.replace({ query: null });
        }
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

.modalContainer {
  opacity: 0;
  transition-duration: 0.3s;
  pointer-events: none;
  position: fixed;
  right: 0px;
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  top: 0px;
}

.modalContainer.visible {
  opacity: 1;
  pointer-events: auto;
}

.overlay {
  width: calc(100%);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.modalContainer.visible .overlay {
  display: none;
}

.modalContainer.visible .overlay {
  display: inline-block;
}

.closeBtn {
  position: absolute;
  top: 0px;
  right: 0px;
  color: var(--blue-gray-7);
}

.modalBox {
  background-color: var(--white);
  box-shadow: 0px 0 2px 0 var(--blue-dark-5);

  overflow: auto;
  height: 75%;
  border-radius: 20px;
  position: relative;
  max-width: 500px;
}

.form-group {
  width: 100%;
  position: relative;
  margin: 0 0 50px;
}

.form-group label {
  font-weight: 100;
  font-size: 20px;
  color: var(--blue-gray-6);
  position: absolute;
  transition: 0.5s ease-in-out;
  top: 0px;
  z-index: 0;
  padding: 12px;
  transition: all 0.5s;
}

.form-group input,
.form-group select,
.form-group textarea {
  outline: none;
  box-shadow: none;
  background-color: transparent;
  border: 0;
  border: 1px solid var(--blue-gray-6);
  border-radius: 35px;
  width: 100%;
  height: 60px;
  transition: all 0.5s;
  padding-left: 20px;
  z-index: 1;
  position: relative;
  /* border-radius: 0; */
  resize: none;
  scroll-behavior: none;
  font-size: 20px;
  color: var(--blue-normal);
  transition: all 0.5s;
}

.form-group input:not(:placeholder-shown)~label,
.form-group textarea:not(:placeholder-shown)~label {
  font-size: 12px;
  top: -15px;
  left: 10px;
}

.form-group input:focus~label,
.form-group select:focus~label,
.form-group textarea:focus~label {
  color: var(--blue-normal);
  font-size: 12px;
  top: -15px;
  left: 10px;
}

.form-group select:valid~label {
  font-size: 12px;
  top: -15px;
  left: 10px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--blue-normal);
}

.form-group input:invalid:not(:placeholder-shown),
.form-group textarea:invalid:not(:placeholder-shown) {
  border-color: hsl(0, 76%, 50%);
}

.form-group input:invalid:not(:placeholder-shown)~label,
.form-group textarea:invalid:not(:placeholder-shown)~label {
  color: hsl(0, 76%, 50%);
}

.form__select-box__icon {
  height: 0.6rem;
  pointer-events: none;
  position: absolute;
  right: 1.2rem;
  stroke: #828282;
  top: calc(50% - 0.3rem);
  width: auto;
}

.refreshIcon {
  animation: rotation 1s infinite linear;
  font-size: 30px;
  position: relative;
  top: 15px;
}

.small {
  font-size: 14px;
  color: var(--blue-white-5);
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}
</style>

<style scoped>
body {
  font-family: "Roboto", san-serif;
}

.center {
  text-align: center;
}

.menu {
  width: 120px;
  z-index: 1;
  box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  transition: 0.2s display ease-in;
  background-color: white;
}

.menu .menu-options {
  list-style: none;
  padding: 0;
  z-index: 1;
  margin-bottom: 0;
}

.menu .menu-options .menu-option {
  font-weight: 500;
  z-index: 1;
  font-size: 14px;
  padding: 10px;
  cursor: pointer;
}

.menu .menu-options .menu-option:hover {
  background: rgba(0, 0, 0, 0.2);
}

button {
  background: grey;
  border: none;
}

button .next {
  color: green;
}

button[disabled=false]:hover .next {
  color: red;
  animation: move 0.5s;
  animation-iteration-count: 2;
}

@keyframes move {
  from {
    transform: translate(0%);
  }

  50% {
    transform: translate(-40%);
  }

  to {
    transform: transform(0%);
  }
}
</style>