<template>
  <div class="pricingPage">
    <div class="container ">
    <div class="section ">
      <div class="text-center mb-4">
        <h1 class="display-5 title">Transparent, fair <span class="color-highlight"> pricing </span> </h1>
        <div>Simple, transparent and fair pricing for your business.</div>
      </div>
      <div class="countrySelector mb-5 pb-5 d-flex fs-5 position-relative">
        <div class="country  mx-auto" @click="showCountriesSelectorModal=!showCountriesSelectorModal">
          <div class="d-inline-block countryIcon"><img :src="'/images/'+selectedPricing.countryCode+'.svg'"/></div>
          <div class="countryName d-inline-block">{{selectedPricing.countryName}}</div>
          <div class="d-inline-block">
            <svg
              width="30"
              height="10"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="form__select-box__icon"
            >
              <path
                d="M1 1L6 6L11 1"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <div class="countriesModalConttainerContainer"  :class="{visible:showCountriesSelectorModal}" >
          <div class="clickClose w-100 h-100 position-fixed fixed-top" @click="showCountriesSelectorModal=false"></div>
          <div class="countiesSelectorModalContainer position-absolute w-100">
            <div class="row col-11 col-sm-10 col-md-9 col-lg-8 countriesSelectorModal mx-auto p-3">
              <router-link 
                class="country zoomHover d-flex align-middle col-12 col-sm-6 col-md-4" 
                v-for="(pricing, pricingIndex) in pricing" 
                :key="pricingIndex"
                :to="'/pricing/'+pricing.countryCode"
              >
                <div class="d-inline-block countryIcon"><img :src="'/images/'+pricing.countryCode+'.svg'"/></div>
                <div class="countryName d-inline-block">{{pricing.countryName}}</div>
              </router-link >
            </div>
          </div>
        </div>
      </div>
      <div class="pricingInfo mb-5 ">
        <div class="collection mb-5 pb-5">
          <h2 class="mb-5">Collection For {{selectedPricing.countryName}}</h2>
          <div class="collectionMethods row">
            <div 
              class="col-11 col-md-6 mx-auto mb-4" 
              v-for="(collection, collectionIndex) in selectedPricing.collections"
              :key="collectionIndex"
            >
              <div class="color-white methodName"> {{collection.methodName}} </div>
              <div> <span class="fs-1 color-highlight"> {{collection.fee}}</span> per transaction </div>
            </div>
          </div>
        </div>
        <div class="disbursment mb-5 pb-5">
          <h2 class="mb-5">Disbursement For {{selectedPricing.countryName}}</h2>
          <div class="disbursments ">
            <div 
              class="row mx-auto mb-4" 
              v-for="(disbursment, disbursmentIndex) in disbursments"
              :key="disbursmentIndex"
            >
              <div class="col-12 mx-auto"><hr></div>
              <div class="col-8 mt-auto">  {{selectedPricing.disbursementprefixText}} <span class="color-white ">{{disbursment.interval}} </span> </div>
              <div class="col-4 text-end "> <span class="fs-4 color-highlight"> {{disbursment.fee}} </span> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    

    <section class="section bg-color8">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <p>Try Chipdeals</p>
          </div>
          <div class="col-md-7">
            <h1 class="title">
              Start building, connect to our API in minutes.
            </h1>
          </div>
          <div class="col-md-3">
            <router-link to="/momo" class="ctaBtn ctaBtnDark">
              Start building today
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
  
</template>

<script>
export default {
  name: "Pricing",
  data(){
    return {
      disbursments:[
        {
          interval: "",
              fee: "100 XOF",
        },
      ],
      pricing:[
        {
          countryName: "Benin",
          countryCode: "bj",
          collections:[
            {
              methodName: "MTN Mobile Money",
              fee: "1,9%",
            },
            {
              methodName: "MOOV Money",
              fee: "1,9%",
            },
          ],
          disbursementprefixText: "MTN Mobile Money and MOOV Money",
        },
        {
          countryName: "Ivory Coast",
          countryCode: "ci",
          collections:[
            {
              methodName: "MTN Mobile Money",
              fee: "4%",
            },
            {
              methodName: "Orange Money",
              fee: "3,3%",
            },
          ],
          disbursementprefixText: "MTN Mobile Money and Orange Money",
        },
      ],
      selectedPricing:[],
      showCountriesSelectorModal:false,
    }
  },
  mounted(){
    const pricingForRouteCountryCode = this.pricing.find((pricing)=>pricing.countryCode==this.$route.params.countryCode)
    if(pricingForRouteCountryCode){
      this.selectedPricing=pricingForRouteCountryCode
      return
    }
    this.$router.push("/pricing/"+this.pricing[0].countryCode)
  },
  methods:{
    selectPricing(pricing){
      this.selectedPricing = pricing;
      this.showCountriesSelectorModal = false 
    }
  },
  watch: {
    "$route": {
      handler: function (newRoute) {
        console.log(newRoute,this.$route,this.$route.params.countryCode)
          const pricingForRouteCountryCode = this.pricing.find((pricing)=>pricing.countryCode==newRoute.params.countryCode)
          if(pricingForRouteCountryCode){
            this.selectedPricing=pricingForRouteCountryCode
            this.showCountriesSelectorModal = false 
            return
          }
          if(newRoute.name!=="Pricing") return
          this.$router.push("/pricing/"+this.pricing[0].countryCode)
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.country{
  cursor:pointer;
}
.countiesSelectorModalContainer{
    left: 0;
    width: 100%;
    top: 40px;
}
.countriesSelectorModal{
    background-color: rgba(255, 255, 255, 0.2) !important;
    background-color: #717C8A22 !important;
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 6px 0 var(--color4);
    z-index: 100;
    border-bottom: var(--color4);
    min-height: 200px;
    max-width: 650px;
    border-radius:15px
}

.countriesModalConttainerContainer{
    opacity:0;
    transition-duration:200ms;
    pointer-events: none;

}
.countriesModalConttainerContainer.visible{
    display:inline-block;
    opacity:1;
    pointer-events: auto;
}

.clickClose{
  z-index:0;
}

.countryIcon{
  
    position: relative;
    top: -0.1em;
    margin-right: 0.5em;
}

.countryIcon > img{
  height: 1em;
}

svg{
      stroke: white;
}

.methodName{
  text-transform: uppercase;

}
.fadeIn{
  opacity:1

}
</style>
