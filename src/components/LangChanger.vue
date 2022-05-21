<template>
  <div class="LangChanger">
    <n-dropdown
      trigger="hover"
      @select="changeLang"
      :options="langs"
      placement="bottom-start"
    >
      {{ $t("lang") }}
    </n-dropdown>
  </div>
</template>

<script>
export default {
  name: "LangChanger",
  data() {
    return {
      langs: [
        { label: "Français", key: "fr" },
        { label: "English", key: "en" },
      ],
    };
  },
  methods: {
    changeLang(lang) {
      this.$root.$i18n.locale = lang;
    },
  },
};
</script>
