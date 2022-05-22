import InstantSearch from "vue-instantsearch/vue3/es";
import algoliasearch from "algoliasearch/lite";
const { Commons } = require("../../assets/js/utils/commons");

let algoliaClient = algoliasearch(
  "XUMAITX9CD",
  "2a96763b1bd4fa9645a3197a8467dc42"
);
if (!Commons.isLiveEnv()) {
  algoliaClient = algoliasearch(
    "BXK5T7Q2HD",
    "ad326eca91f5232ca0ac4f12e62d041b"
  );
}

let searchIndex = null;
let usedLanguage = "";
let algoliaIndexNameInitial = "customerProducts_";
if (!Commons.isLiveEnv()) {
  algoliaIndexNameInitial = "adminProducts_";
}

async function initSearch(language = "fr") {
  if (usedLanguage === language) {
    return;
  }
  searchIndex = algoliaClient.initIndex(algoliaIndexNameInitial + language);
  usedLanguage = language;
}

async function searchProduct(text) {
  const searchResponse = await searchIndex.search(text);
  return searchResponse.hits;
}

async function getCategoriesList(productType) {
  console.log(productType);
  const searchResponse = await searchIndex.search("", {
    filters: 'type:"' + productType + '"',
    facets: ["category"],
    hitsPerPage: 0,
  });
  console.log(searchResponse);
  return searchResponse.facets.category || {};
}

async function getProductsByCategory(
  categoryName,
  nbProductsPerPage = 4,
  page = 0
) {
  const searchResponse = await searchIndex.search("", {
    filters: 'category:"' + categoryName + '"',
    page,
    hitsPerPage: nbProductsPerPage,
  });
  return {
    products: searchResponse.hits,
    totalPages: searchResponse.nbPages,
    currentPage: searchResponse.page,
  };
}

async function getPromotedProducts() {
  const searchResponse = await searchIndex.search("", {
    filters: 'isInPromotion:"promotion"',
    page: 0,
    hitsPerPage: 10000000000,
  });
  return {
    products: searchResponse.hits,
    totalPages: searchResponse.nbPages,
    currentPage: searchResponse.page,
  };
}

async function getProductByUuid(productUuid) {
  const searchResponse = await searchIndex.search(productUuid);
  return {
    success: !Commons.isEmpty(searchResponse.hits),
    product: searchResponse.hits[0],
  };
}

export default {
  install: (app) => {
    app.use(InstantSearch);
    app.config.globalProperties.$AlgoliaClient = algoliaClient;
    app.config.globalProperties.$AlgoliaIndexNameInitial =
      algoliaIndexNameInitial;
    app.config.globalProperties.$initSearch = initSearch;
    app.config.globalProperties.$SearchProduct = searchProduct;
    app.config.globalProperties.$GetCategoriesList = getCategoriesList;
    app.config.globalProperties.$GetProductsByCategory = getProductsByCategory;
    app.config.globalProperties.$GetPromotedProducts = getPromotedProducts;
    app.config.globalProperties.$GetProductByUuid = getProductByUuid;
  },
};
