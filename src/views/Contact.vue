<template>
  <div class="contact container">
    <div class="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto section">
      <h1 class="title">Contact us</h1>

      <div class="entry-content" style="max-width: 700px;">
        <h3 class="title fs-5">
          We want to make sure you get what you need. Let’s talk.
        </h3>
        <p class="small">Please get in touch with us. We’re here to help.</p>
        <p style="text-align: left;"></p>
      </div>

      <form @submit.prevent="sendMessage" class="mt-4">
        <div class="row mb-4">
          <div class="col-6">
            <div class="form-group mb-4 mb-sm-5">
              <input
                type="text"
                class="form-control"
                required
                v-model="firstName"
                placeholder=" "
              />
              <label class="label"> First name </label>
            </div>
          </div>

          <div class="col-6">
            <div class="form-group mb-4 mb-sm-5">
              <input
                type="text"
                class="form-control"
                required
                v-model="lastName"
                placeholder=" "
              />
              <label class="label"> Last name </label>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="form-group mb-4 mb-sm-5">
              <input
                type="email"
                class="form-control"
                required
                v-model="email"
                placeholder=" "
              />
              <label class="label"> Email </label>
            </div>
          </div>

          <div class="col-12">
            <div class="form-group mb-4 mb-sm-5">
              <select
                id=""
                name=""
                required
                class="form-control"
                v-model="reason"
              >
                <option
                  :value="possibleReason"
                  v-for="(possibleReason, index) in possibleReasons"
                  :key="index"
                >
                  {{ possibleReason }}
                </option>
              </select>
              <svg
                width="12"
                height="7"
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
              <label class="label"> Reason </label>
            </div>
          </div>

          <div class="form-group col-12">
            <textarea
              class="form-control"
              style="overflow: hidden; height: 130px"
              rows="4"
              required
              v-model="message"
              placeholder=" "
            ></textarea>
            <label class="label" for="Message"> Message </label>
          </div>
        </div>

        <div class="text-end">
          <span
            class="material-icons material-icons-outlined refreshIcon me-4 notranslate"
            v-if="sendingMail"
          >
            refresh
          </span>
          <span class="mailStatus me-4" v-if="sendingStatusMessage">
            {{ sendingStatusMessage }}
          </span>
          <button class="ctaBtn" role="button">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      message: "",
      lastName: "",
      firstName: "",
      reason: "",
      email: "",
      sendingMail: false,
      sendingStatusMessage: "",
      possibleReasons: [
        "Get access to disbursement API",
        "Get access to collect API",
        "Get access to utility payment API",
        "Comme work with us",
      ],
    };
  },
  methods: {
    async sendMessage() {
      this.sendingStatusMessage = "";
      if (this.sendingMail) {
        this.sendingStatusMessage = "Sending";
        return;
      }
      this.sendingMail = true;
      const mailingResponse = await this.$Controller.sendMail(
        this.firstName,
        this.lastName,
        this.reason,
        this.email,
        this.message
      );
      if (!mailingResponse) {
        this.sendingStatusMessage = "Sorry an error occured, try again";
      } else if (!mailingResponse.success) {
        this.sendingStatusMessage = mailingResponse.message;
      } else {
        this.sendingStatusMessage = "Mail sent";
      }
      this.sendingMail = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.form-group {
  width: 100%;
  position: relative;
  margin: 0 0 50px;
}
.form-group label {
  font-weight: 100;
  font-size: 20px;
  color: var(--color9);
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
  border: 1px solid var(--color9);
  border-radius: 10px;
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
  color: var(--blue5);
  transition: all 0.5s;
}


.form-group input:not(:placeholder-shown) ~ label,
.form-group textarea:not(:placeholder-shown) ~ label {
  font-size: 12px;
  top: -15px;
}

.form-group input:focus ~ label,
.form-group select:focus ~ label,
.form-group textarea:focus ~ label {
  color: var(--blue5);
  font-size: 12px;
  top: -15px;
}

.form-group select:valid ~ label {
  font-size: 12px;
  top: -15px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--blue5);
}


.form-group input:invalid:not(:placeholder-shown),
.form-group textarea:invalid:not(:placeholder-shown) {
  border-color: hsl(0, 76%, 50%);
}

.form-group input:invalid:not(:placeholder-shown) ~ label,
.form-group textarea:invalid:not(:placeholder-shown) ~ label {
  color: hsl(0, 76%, 50%);
}

.form__select-box__icon {
    height: .6rem;
    pointer-events: none;
    position: absolute;
    right: 1.2rem;
    stroke: #828282;
    top: calc(50% - .3rem);
    width: auto;
}

.refreshIcon {
  animation: rotation 1s infinite linear;
  font-size: 40px;
  position: relative;
  top: 15px;
}
.small {
  font-size: 14px;
  color: var(--gray7);

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
