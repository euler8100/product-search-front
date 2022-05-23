import InstantSearch from "vue-instantsearch/vue3/es";
import algoliasearch from "algoliasearch/lite";
const { Commons } = require("../../assets/js/utils/commons");

let algoliaClient = algoliasearch(
  "QFUBN7H8L0",
  "1cd8be36180780686520207dba2e0aec"
);

let searchIndex = null;
let initiated = false;

async function initSearch() {
  if (initiated) {
    return;
  }
  searchIndex = algoliaClient.initIndex("monstersearchdb");
  initiated = true;
}

async function searchProduct(text) {
  const searchResponse = await searchIndex.search(text, {
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
    app.config.globalProperties.$initSearch = initSearch;
    app.config.globalProperties.$SearchProduct = searchProduct;
    app.config.globalProperties.$GetProductByUuid = getProductByUuid;
  },
};
