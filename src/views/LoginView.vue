<template>
  <div class="login container col-sm-8 mx-auto">
    <h1 class="title fs-5">Connectez-vous</h1>
    <form @submit.prevent="login" class="mt-4">
      <div class="row mb-2">
        <div class="col-12">
          <div class="form-group mb-3 mb-sm-4">
            <input
              type="text"
              class="form-control"
              required
              v-model="connectionId"
              placeholder=" "
            />
            <label class="label"> Id de Connexion </label>
          </div>
        </div>

        <div class="col-12">
          <div class="form-group mb-3 mb-sm-4">
            <input
              type="password"
              class="form-control"
              required
              v-model="password"
              placeholder=" "
            />
            <label class="label"> Mot de passe </label>
          </div>
        </div>
      </div>

      <div class="text">
        <button class="ctaBtn" role="button">Se Connecter</button>
        <span
          class="
            material-icons material-icons-outlined
            refreshIcon
            ms-4
            notranslate
          "
          v-if="logingIn"
        >
          refresh
        </span>
        <br />
        <br />
        <router-link
          :to="'/signup?next=' + ($route.query.next || 'home')"
          class=""
        >
          Je n'ai pas de compte.
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      connectionId: "",
      password: "",
      logingIn: false,
      loginStatusMessege: "",
    };
  },
  async mounted() {
    this.loginStatusMessege = "";
  },
  methods: {
    async login() {
      this.logingIn = true;

      const loginResponse = await this.$Controller.login(
        this.connectionId,
        this.password
      );
      this.logingIn = false;
      if (!loginResponse.success) {
        this.loginStatusMessege = loginResponse.message;
        this.notify({
          text: loginResponse.message,
          duration: 4000,
          type: "WARNING",
          progress: false,
        });
        return;
      }

      this.notify({
        text: "Connecté avec succès",
        duration: 3000,
        type: "SUCCESS",
        progress: false,
      });

      if (!this.$Commons.isEmpty(this.$route.query.next)) {
        this.$router.push(this.$route.query.next);
        return;
      }
      this.$router.push("/");
    },
  },
  watch: {},
};
</script>

<style scoped>
.login {
  margin-top: 100px;
  margin-bottom: 20px;
}

.title {
  color: var(--blue-gray-7) !important;
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

.form-group input:not(:placeholder-shown) ~ label,
.form-group textarea:not(:placeholder-shown) ~ label {
  font-size: 12px;
  top: -15px;
  left: 10px;
}

.form-group input:focus ~ label,
.form-group select:focus ~ label,
.form-group textarea:focus ~ label {
  color: var(--blue-normal);
  font-size: 12px;
  top: -15px;
  left: 10px;
}

.form-group select:valid ~ label {
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

.form-group input:invalid:not(:placeholder-shown) ~ label,
.form-group textarea:invalid:not(:placeholder-shown) ~ label {
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