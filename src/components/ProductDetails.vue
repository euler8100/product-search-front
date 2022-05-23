<template>
  <div class="invisibleBg d-flex">
    <div class="h-100 w-100 backgroundClickReturn" @click="closeDetails"></div>
    <img class="fixed-top sampleImage" :src="'https://ik.imagekit.io/whynot/' + pictureToDisplay.path"
      :alt="productData.name" />
    <div class="productDetailsCard cardSession m-auto container row p-0">
      <div class="mobileProductImageContainer m-0 p-0 d-lg-none">
        <img class="invisibleImage" :src="'https://ik.imagekit.io/whynot/' + pictureToDisplay.path"
          :alt="productData.name" />
        <img class="resizableImage" :src="'https://ik.imagekit.io/whynot/' + pictureToDisplay.path"
          :alt="productData.name" @click="showMobileZoom = true" />
        <div class="zoomIcon" @click="showMobileZoom = true">
          <span class="material-icons material-icons-outlined notranslate">
            zoom_out_map
          </span>
        </div>
        <div class="previousPicMobile" @click="previousPicture" v-if="pictureToDisplay.previousExists">
          <span class="material-icons material-icons-round notranslate">
            arrow_back_ios
          </span>
        </div>
        <div class="nextPicMobile" @click="nextPicture" v-if="pictureToDisplay.nextExists">
          <span class="material-icons material-icons-round notranslate">
            arrow_forward_ios
          </span>
        </div>
      </div>
      <div class="desktopProductImageContainer d-none d-lg-flex col-6" >
        <div class="img-zoom-container my-auto">
          <img id="imageToZoom" class="desktopPic m-auto"
            :src="'https://ik.imagekit.io/whynot/' + pictureToDisplay.path" :alt="productData.name" />
          <div class="img-zoom-lens" id="zoom-lens"></div>
          <div id="zoomResult" class="desktopZoomPic cardSession"></div>
        </div>

        <div class="previousPicDesktop" @click="previousPicture" v-if="pictureToDisplay.previousExists">
          <span class="material-icons material-icons-round notranslate">
            arrow_back_ios
          </span>
        </div>
        <div class="nextPicDesktop" @click="nextPicture" v-if="pictureToDisplay.nextExists">
          <span class="material-icons material-icons-round notranslate">
            arrow_forward_ios
          </span>
        </div>
      </div>
      <span class="closeDetailsBtn" @click="closeDetails">
        <span class="material-icons notranslate"> cancel </span>
      </span>
      <div class="col6 col-xl-6 col-lg-6 col-md-12 col-sm-12 mx-auto detailsContainer">
        <div class="d-flex align-items-center justify-content-start">
          <div class="info pt-xl-0 pt-lg-0 pt-5">
            <h1 class="font-weight-bold text-uppercase pt-3 title">
              {{ productData.name }}
            </h1>

            <span class="float-left pr-3 grayText">★★★★★</span>
            <span style="width: 190px" class="grayText">
              {{productData.marketName}}</span>
            <h4 class="grayText">{{ productData.category }}</h4>
            <br /><br /><br />
            <button class="discussionBtn" @click="sendWhatsapp()" v-if="false">
              <span class="material-icons material-icons-round notranslate me-2" style="position: relative; top: 6px">
                whatsapp
              </span>
              Contact us
            </button>
          </div>
        </div>

        <div class="pt-5 my-5">
          <div class="more info d-flex justify-content-between text-center">
            <div class="col4 flex-fill" v-for="(moreDetailTitle, index) in moreDetails"
              :class="[moreDetailTitle === activeDetail ? 'col4 active' : '']" @click="activeDetail = moreDetailTitle"
              :key="index">
              <h6>{{ moreDetailTitle }}</h6>
            </div>
          </div>
          <div class="container pt-3">
            <div class="row">
              <p v-if="/description/i.test(activeDetail)">
                {{ productData.description }}
              </p>
              <div v-else-if="/video/i.test(activeDetail)">
                <div class="col-10 mx-auto">
                  <video style="width: 100%" autoplay controls v-if="!$Commons.isEmpty(productData.videoPath)">
                    <source :src="
                      'https://ik.imagekit.io/whynot/' +
                      productData.videoPath
                    " />
                    Your browser does not support the video tag.
                  </video>
                  <img v-else style="width: 100%" src="/images/no-video.jpg" alt="no video" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mobileZoomContainer" v-if="showMobileZoom">
        <img class="zoomPic alignXCenter alignYCenter" :src="'https://ik.imagekit.io/whynot/' + pictureToDisplay.path"
          :alt="productData.name" width="90%" />
        <button class="d-inline-block zoomClose" @click="showMobileZoom = false">
          <span class="material-icons material-icons-outlined notranslate">
            close
          </span>
        </button>
        <button class="d-inline-block zoomIn" @click="zoom('+')">
          <span class="material-icons material-icons-outlined notranslate">
            zoom_in
          </span>
        </button>
        <button class="d-inline-block zoomOut" @click="zoom('-')">
          <span class="material-icons material-icons-outlined notranslate">
            zoom_out
          </span>
        </button>
      </div>
    </div>
  </div>
    <div class="h-100 w-100 fixed-top position-fixed" style="z-index:5000" v-if="showChoosingNum" @click="showChoosingNum = false"></div>
  <div class="chooseRecipientPhoneNumber d-flex" v-if="showChoosingNum">
    <div class="m-auto">
      <div class=" w-100 d-flex">

        <button class="discussionBtn my-4 mx-auto" role="button" @click="sendWhatsapp('8618520534115')">
          Chine +86 185 2053 4115
        </button>
      </div>
      <div class=" w-100 d-flex">

        <button class="discussionBtn my-4 mx-auto" role="button" @click="sendWhatsapp('22956757533')">
          Benin +229 56 75 75 33
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "ProductDetails",
  props: {
    productData: Object,
    closeDetails: Function,
  },
  components: {},
  data() {
    return {
      showChoosingNum: false,
      showMobileZoom: false,
      sampleImage: {},
      moreDetails: this.productData.videoPath
        ? [
          'Description',
          'Video',
        ]
        : ['Description'],
      activeDetail: 'Description',
      recipientPhone: "8618520534115",
      pictureToDisplay: {
        previousExists: false,
        nextExists:
          !!this.productData &&
          !!this.productData.alternativePicturesPath &&
          !!this.productData.alternativePicturesPath[0],
        path: this.productData.picturePath,
        picturesList: [
          this.productData.picturePath,
          ...(this.productData
            ? this.productData.alternativePicturesPath
              ? this.productData.alternativePicturesPath
              : []
            : []),
        ],
        currentPictureIndex: 0,
      },
    };
  },
  mounted() {
    this.sampleImage = document.querySelector(".sampleImage");
    console.log(this.productData)
    this.initHoverZoom("imageToZoom", "zoomResult");

    const scrollable = document.querySelector(".productDetailsCard");
    const resizableImage = document.querySelector(".resizableImage");
    const defaultImage = document.querySelector(".invisibleImage");
    //let scrollTop = 0;
    scrollable.addEventListener("scroll", () => {
      resizableImage.height = "100%";
      resizableImage.height = defaultImage.offsetHeight - scrollable.scrollTop;
    });
  },
  methods: {
    sendWhatsapp(recipientPhone) {
      if (this.$Commons.isEmpty(recipientPhone)) {
        this.showChoosingNum = true
        return
      }
      this.showChoosingNum = false
      const chatMessage =
        "Je suis intéressé par votre produit.\n\n voici son lien \n" +
        window.location.origin +
        "/product/p_" +
        this.productData.uuid;

      let whatsappLink = "https://web.whatsapp.com/send";
      if (
        /(Android)|(webOS)|(iPhone)|(iPad)|(iPod)|(BlackBerry)|(IEMobile)|(Opera Mini)/i.test(
          navigator.userAgent
        )
      )
        whatsappLink = "whatsapp://send";

      let messageLink =
        whatsappLink + "?phone=" + recipientPhone + "&text=" + chatMessage;
      console.log(messageLink);
      window.open(messageLink);
    },
    async zoom(type) {
      const zoomPic = document.querySelector(".zoomPic");
      const mobileZoomContainer = document.querySelector(
        ".mobileZoomContainer"
      );
      if (type == "+") {
        if (zoomPic.offsetWidth * 1.5 > this.sampleImage.offsetWidth) {
          zoomPic.width = this.sampleImage.offsetWidth;
        } else {
          zoomPic.width = zoomPic.offsetWidth * 1.5;
        }
        /*zoomPic.width = this.sampleImage.offsetWidth;
         await new Promise((resolve) => {
          setTimeout(resolve, 600);
        });
          if (this.sampleImage.offsetWidth >= mobileZoomContainer.offsetWidth) {
          zoomPic.className = zoomPic.className
            .replace(/alignXCenter/g, "")
            .replace(/ {2,}/, " ")
            .trim();
        }
        if (this.sampleImage.offsetHeight >= mobileZoomContainer.offsetHeight) {
          zoomPic.className = zoomPic.className
            .replace(/alignYCenter/g, "")
            .replace(/ {2,}/, " ")
            .trim();
        }*/
      } else {
        zoomPic.width = zoomPic.offsetWidth * 0.5;
        //zoomPic.width = "0";
        /* await new Promise((resolve) => {
          setTimeout(resolve, 600);
        });
        zoomPic.className = zoomPic.className
          .replace(/alignXCenter/g, "")
          .replace(/$/, " alignXCenter")
          .replace(/ {2,}/, " ")
          .trim();
        zoomPic.className = zoomPic.className
          .replace(/alignYCenter/g, "")
          .replace(/$/, " alignYCenter")
          .replace(/ {2,}/, " ")
          .trim();*/
      }
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      if (zoomPic.offsetWidth > mobileZoomContainer.offsetWidth) {
        zoomPic.className = zoomPic.className
          .replace(/alignXCenter/g, "")
          .replace(/ {2,}/, " ")
          .trim();
      } else {
        zoomPic.className = zoomPic.className
          .replace(/alignXCenter/g, "")
          .replace(/$/, " alignXCenter")
          .replace(/ {2,}/, " ")
          .trim();
      }
      if (zoomPic.offsetHeight > mobileZoomContainer.offsetHeight) {
        zoomPic.className = zoomPic.className
          .replace(/alignYCenter/g, "")
          .replace(/ {2,}/, " ")
          .trim();
      } else {
        zoomPic.className = zoomPic.className
          .replace(/alignYCenter/g, "")
          .replace(/$/, " alignYCenter")
          .replace(/ {2,}/, " ")
          .trim();
      }
    },
    initHoverZoom(imgID, resultID) {
      var img, lens, result, cx, cy, sampleImage, imageContainer;
      img = document.getElementById(imgID);
      result = document.getElementById(resultID);
      lens = document.getElementById("zoom-lens");
      imageContainer = document.querySelector(".desktopProductImageContainer");
      sampleImage = this.sampleImage;

      function refreshSizes() {
        img.style.maxHeight = (imageContainer.offsetHeight * 70) / 100 + "px";
        lens.style.width =
          (img.offsetWidth * 100) / sampleImage.offsetWidth + "%";
        lens.style.height = lens.offsetWidth + "px";

        result.style.height = result.offsetWidth + "px";
        /*calculate the ratio between result DIV and lens:*/
        cx = result.offsetWidth / lens.offsetWidth;
        cy = result.offsetHeight / lens.offsetHeight;
        /*set background properties for the result DIV:*/
        result.style.backgroundImage = "url('" + img.src + "')";
        result.style.backgroundSize =
          img.width * cx + "px " + img.height * cy + "px";
      }
      refreshSizes();
      /*execute a function when someone moves the cursor over the image, or the lens:*/
      lens.addEventListener("mousemove", moveLens);
      img.addEventListener("mousemove", moveLens);
      /*and also for touch screens:*/
      lens.addEventListener("touchmove", moveLens);
      img.addEventListener("touchmove", moveLens);
      function moveLens(e) {
        refreshSizes();
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        /*calculate the position of the lens:*/
        x = pos.x - lens.offsetWidth / 2;
        y = pos.y - lens.offsetHeight / 2;
        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - (lens.offsetWidth / 4) * 3) {
          x = img.width - (lens.offsetWidth / 4) * 3;
        }
        if (x < 0 - lens.offsetWidth / 4) {
          x = 0 - lens.offsetWidth / 4;
        }
        if (y > img.height - (lens.offsetHeight / 4) * 3) {
          y = img.height - (lens.offsetHeight / 4) * 3;
        }
        if (y < 0 - lens.offsetHeight / 4) {
          y = 0 - lens.offsetHeight / 4;
        }
        /*set the position of the lens:*/
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /*display what the lens "sees":*/
        result.style.backgroundPosition =
          -1 * x * cx + "px " + -1 * y * cy + "px";
      }
      function getCursorPos(e) {
        var a,
          x = 0,
          y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
      }
    },
    nextPicture() {
      const currentPictureIndex = this.pictureToDisplay.currentPictureIndex;
      const nextPictureExists =
        !!this.pictureToDisplay.picturesList[currentPictureIndex + 1];
      if (!nextPictureExists) {
        this.pictureToDisplay.nextExists = false;
        return;
      }
      const pictureToDisplayPath =
        this.pictureToDisplay.picturesList[currentPictureIndex + 1];
      this.pictureToDisplay = {
        previousExists: true,
        nextExists:
          !!this.pictureToDisplay.picturesList[currentPictureIndex + 2],
        path: pictureToDisplayPath,
        picturesList: this.pictureToDisplay.picturesList,
        currentPictureIndex: currentPictureIndex + 1,
      };
    },
    previousPicture() {
      const currentPictureIndex = this.pictureToDisplay.currentPictureIndex;
      const previousPictureExists =
        !!this.pictureToDisplay.picturesList[currentPictureIndex - 1];
      if (!previousPictureExists) {
        this.pictureToDisplay.previousExists = false;
        return;
      }
      const pictureToDisplayPath =
        this.pictureToDisplay.picturesList[currentPictureIndex - 1];
      this.pictureToDisplay = {
        previousExists:
          !!this.pictureToDisplay.picturesList[currentPictureIndex - 2],
        nextExists: true,
        path: pictureToDisplayPath,
        picturesList: this.pictureToDisplay.picturesList,
        currentPictureIndex: currentPictureIndex - 1,
      };
    },
  },
  watch: {
    productData(newValue) {
      console.log(newValue)
      this.moreDetails = newValue.videoPath
        ? [
          'Description',
          'Video',
        ]
        : ['Description'];
      this.pictureToDisplay = {
        previousExists: false,
        nextExists:
          !!newValue &&
          !!newValue.alternativePicturesPath &&
          !!newValue.alternativePicturesPath[0],
        path: newValue.picturePath,
        picturesList: [
          newValue.picturePath,
          ...(newValue
            ? newValue.alternativePicturesPath
              ? newValue.alternativePicturesPath
              : []
            : []),
        ],
        currentPictureIndex: 0,
      };
      console.log(this.pictureToDisplay)
    },
  },
};
</script>

<style scoped>
*:not(.title) {
  color: #212121;
}

.backgroundClickReturn {
  cursor: zoom-out;
  position: fixed;
  z-index: -1;
}

.grayText {
  color: #6f7485;
}

.whatsappContainer {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  overflow: hidden;
}

.whatsappClickClose {
  width: 100%;
  height: 100%;
  position: fixed;
}

.desktopProductImageContainer {
  background-color: var(--gray9);
  position: relative;
}

.previousPicDesktop {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 5%;
  font-size: 24px;
  cursor: pointer;
}

.nextPicDesktop {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5%;
  font-size: 24px;
  cursor: pointer;
}

.img-zoom-container {
  position: relative;
  max-width: 70%;
  max-height: 70%;
  left: 15%;
  cursor: crosshair;
}

.desktopPic {
  width: 100%;
  background-image: url(../../public/images/loading-buffer.gif);
  background-size: cover;
  background-position: center;
  min-width: 100px;
  min-height: 100px;
}

.img-zoom-lens {
  position: absolute;

  /*set the size of the lens:*/
  width: 10%;
  height: 10%;
}

.desktopZoomPic {
  background-color: var(--gray9);
  background-color: rgba(255, 255, 255, 0.6);
  width: 30%;
  max-width: 550px;
  height: 80%;
  position: fixed;
  left: calc(50% + 100px);
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  pointer-events: none;
  z-index: 100;
  background-repeat: no-repeat;
}

.img-zoom-container:hover>.img-zoom-lens {
  border: 1px solid #d4d4d4;
}

.img-zoom-container:hover>.desktopZoomPic {
  opacity: 1;
}

.productDetailsCard {
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(30px);
  width: 95%;
  height: 95%;
  position: relative;
}

.closeDetailsBtn {
  cursor: pointer;
  position: absolute;
  /* z-index: 10000000000; */
  top: 16px;
  right: 8px;
  width: auto;
}

.mobileProductImageContainer {
  background-color: white;
  border: 1px solid rgba(76, 87, 102, 0.1);
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
}

.sampleImage {
  z-index: -100;
  opacity: 0;
}

.invisibleImage {
  min-width: 300px;
  min-height: 300px;
  /* max-width: 500px; */
  max-height: 500px;
  background-size: cover;
  background-position: center;
  opacity: 0;
}

.resizableImage {
  background-image: url(../../public/images/loading-buffer.gif);
  background-size: cover;
  background-position: center;
  min-width: 300px;
  min-height: 300px;
  /* max-width: 500px; */
  max-height: 500px;
  max-height: 100%;
  position: absolute;
  bottom: 0;
}

.discussionBtn {
  background-color: var(--gray4);
  color: var(--gray9);
  border-radius: 15px;
  border: none;
  padding: 10px 20px 14px 20px;
}

.discussionBtn * {
  color: var(--gray9);
}

.col4 h6 {
  height: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid lightgrey;
  cursor: pointer;
}

.col4.active h6 {
  font-weight: bold;
  border-bottom: 1px solid var(--gray5) !important;
}

.detailsContainer {
  overflow: auto;
  margin-top: 5%;
  height: 90%;
}

.productName {
  font-weight: 900;
}

.productName:first-letter {
  text-transform: capitalize;
}

.category {
  border-radius: 25px;
  border: solid 1px rgba(0, 0, 255, 0.4);
  background: rgba(0, 0, 255, 0.1);
  font-size: 12px;
  font-weight: 900;
  overflow: hidden;
  user-select: none;
  transition: background 150ms ease, border 150ms ease;
  padding: 4px 6px;
  display: inline-block;
}

img::before {
  content: none;
}

@media screen and (max-width: 992px) {
  .productDetailsCard {
    background-color: white;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
    overflow: auto;
  }

  .productImageContainer {
    height: auto;
  }

  .detailsContainer {
    max-width: 500px;
    overflow: visible !important;
    height: auto !important;
  }

  .mobileZoomContainer {
    background-color: #f4f6f9;
    display: inline-block;
    position: fixed !important;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .zoomPic {
    position: absolute;
    min-width: 75%;
    transition: width 0.5s;
  }

  .zoomPic.alignXCenter {
    transform: translateX(-50%);
    left: 50%;
  }

  .zoomPic.alignYCenter {
    transform: translateY(-50%);
    top: 50%;
  }

  .zoomPic.alignXCenter.alignYCenter {
    transform: translate(-50%, -50%);
  }

  .zoomIcon {
    position: relative;
    bottom: -43%;
    color: white;
    right: 5%;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 14px;
    padding: 5px;
    font-size: 17px;
    border-radius: 5px
  }

  .previousPicMobile {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    left: 5%;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 14px;
    padding: 5px;
    font-size: 17px;
    border-radius: 5px
  }

  .nextPicMobile {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    right: 5%;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 14px;
    padding: 5px;
    font-size: 17px;
    border-radius: 5px
  }

  .zoomClose {
    border-radius: 50%;
    position: fixed;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    background: #eceff5;
    font-size: 12px;
    font-weight: 900;
    overflow: hidden;
    right: 10px;
    bottom: 130px;
    width: 50px;
    height: 50px;
    line-height: 60px;
    border-color: transparent;
  }

  .zoomIn {
    border-radius: 50%;
    position: fixed;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    background: #eceff5;
    font-size: 12px;
    font-weight: 900;
    overflow: hidden;
    right: 10px;
    bottom: 70px;
    width: 50px;
    height: 50px;
    line-height: 60px;
    border-color: transparent;
  }

  .zoomOut {
    border-radius: 50%;
    position: fixed;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    background: #eceff5;
    font-size: 12px;
    font-weight: 900;
    overflow: hidden;
    right: 10px;
    bottom: 10px;
    width: 50px;
    height: 50px;
    line-height: 60px;
    border-color: transparent;
  }
}

.chooseRecipientPhoneNumber {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 5000;
  background-color: var(--gray5);

  box-shadow: 0px 1px 3px var(--gray2);
  border-radius: 15px;
  transform: translate(-50%, -50%);
  max-width: 400px;
  height: 400px;
  width: 80%;
}
</style>

<style>
.invisibleBg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 5000;
}
</style>
