<template>
  <div class="home container">
    <div style="text-align: center">
      <div class="logo">
        <img alt="Google" src="/logo.png" />
      </div>
      <form class="bar" @submit.prevent="search">
        <input
          class="searchbar"
          type="search"
          title="Search"
          placeholder="Votre recherche"
          spellcheck="true"
          v-model="searchedText"
        />
      </form>
      <div class="subtitle d-inline-block">
        Nous Vous trouverons les produits les moins chère et les plus proches de
        chez vous
      </div>
      <div class="buttons" v-if="false">
        <button class="button" type="button">Google Search</button>
        <button class="button" type="button">I'm Feeling Lucky</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      searchedText: "",
    };
  },
  mounted() {},
  methods: {
    async search() {
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
.subtitle {
  color: var(--blue-gray-5);
  width: 70%;
  font-size: 13px;
}
</style>