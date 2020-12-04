import Vue from "vue";

const defaults = {
  error: {
    title: "Erro ao realizar ação",
    text: "Não foi possível carregar dados!",
  },
  success: {
    title: "Ação realizada com sucesso",
    text: "Ocorreu tudo dentro dos conformes!",
  },
  warn: {
    title: "Atenção",
    text: "Você precisa tomar cuidado nessa ação!",
  },
};
const style = {
  duration: 1000,
  speed: 400,
};

export default {
  error(title = defaults.error.title, text = defaults.error.text) {
    return Vue.notify({
      text,
      title,
      group: "notify",
      type: "error",
      ...style,
    });
  },
  success(title = defaults.success.title, text = defaults.success.text) {
    return Vue.notify({
      text,
      title,
      group: "notify",
      type: "success",
      ...style,
    });
  },
  warn(title = defaults.warn.title, text = defaults.warn.text) {
    return Vue.notify({
      text,
      title,
      group: "notify",
      type: "warn",
      ...style,
    });
  },
};
