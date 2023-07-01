<template>
  <transition name="t-fade" @after-enter="showContent = true">
    <div v-if="showBackground" class="modal-background">
      <transition name="t-slide-down" @after-leave="showBackground = false">
        <div v-if="showContent" class="modal-content">
          <div class="header">
            <div class="title">{{ title }}</div>
            <div class="closing-button" @click="onCloseButtonClick">X</div>
          </div>
          <div class="body">
            <slot name="body"></slot>
          </div>
          <div class="footer">
            <BaseButton
              v-if="okButtonDisplay"
              :label="okButtonLabel"
              @clicked="onOkButtonClicked"
            />
            <BaseButton
              v-if="cancelButtonDisplay"
              :label="cancelButtonLabel"
              @clicked="onCancelButtonClicked"
            />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  name: "BaseModal",
  props: {
    title: String,
    okButtonLabel: {
      type: String,
      default: "OK",
    },
    cancelButtonLabel: {
      type: String,
      default: "cancel",
    },
    okButtonDisplay: {
      type: Boolean,
      default: true,
    },
    cancelButtonDisplay: {
      type: Boolean,
      default: true,
    },
    show: Boolean,
  },
  data() {
    return {
      showContent: false,
      showBackground: false,
    };
  },
  watch: {
    show(newValue, oldValue) {
      // this function will be run whenever the value of show changes
      if (newValue) {
        this.showBackground = true;
      } else {
        this.showContent = false;
      }
    },
  },
  methods: {
    onCloseButtonClick() {
      this.$emit("close-me");
    },
    onOkButtonClicked() {
      this.$emit("ok-button-clicked");
    },
    onCancelButtonClicked() {
      this.$emit("cancel-button-clicked");
    },
  },
  components: { BaseButton },
};
</script>

<style scoped>
.modal-background {
  background: rgba(0, 0, 0, 0.35);
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
}

.modal-content {
  width: 60%;
  min-width: 300px;
  min-height: 200px;
  background-color: white;
  margin: 4rem auto;
  z-index: 1;
  border-radius: 10px;
  box-shadow: 2px 2 px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  flex-basis: 2rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cdcdcd;
}
.body {
  flex-grow: 1;
  padding: 1rem;
  border-bottom: 1px solid #cdcdcd;
}
.footer {
  flex-basis: 3rem;
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem;
  gap: 0.7rem;
  align-items: center;
}
.title {
  padding: 0 1rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.closing-button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.t-fade-enter-from,
.t-fade-leave-to {
  opacity: 0;
}
.t-fade-enter-to,
.t-fade-leave-from {
  opacity: 1;
}
.t-fade-enter-active,
.t-fade-leave-active {
  transition: opacity 0.4s;
}

.t-slide-down-enter-from,
.t-slide-down-leave-to {
  transform: translateY(-100px);
}
.t-slide-down-enter-to,
.t-slide-down-leave-from {
  transform: translateY(0);
}
.t-slide-down-enter-active,
.t-slide-down-leave-active {
  transition: transform 0.4s linear;
}
</style>
