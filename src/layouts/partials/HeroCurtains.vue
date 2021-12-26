<template>
  <div class="flex flex-col justify-center items-center relative overflow-hidden top-0 outer-wrapper">
    <div class="canvas-wrapper overflow-hidden">
      <div class="hide-before-load logo z-30 w-100">
        <g-image
          :immediate="true"
          src="~/assets/img/logo.svg"
        />
      </div>
      <div id="canvas"></div>
      <div
        class="hide-before-load small-plane"
        id="animated-header"
      >
        <!-- <img src="img/coho_5.png" alt="mandala" data-sampler="planeTexture" /> -->
        <g-image
          v-if="bg"
          :immediate="true"
          src="~/assets/img/bg.png"
          data-sampler="planeTexture"
          class="shade-img"
        />
      </div>
    </div>

  </div>
</template>
<script>
import * as curtains_settings from "../../libs/curtains_settings";
export default {
  mixins: ["curtains_settings"],
  props: {
    bg: {
      required: false,
    },
  },
  methods: {
    showElements() {
      let elements = document.getElementsByClassName("hide-before-load");
      let i;
      for (i = 0; i < elements.length; i++) {
        elements[i].style.opacity = "1";
      }
    },
  },
  mounted() {
    curtains_settings.initCurtains();
    this.showElements();
  },
};
</script>
<style lang="scss" scoped>
.outer-wrapper {
  @media (max-width: 1024px) {
    height: 300px;
  }
  height: 60vh;
}
.shade-img {
  display: none;
}

.no-canvas .shade-img {
  display: block;
}

.canvas-wrapper {
  @media (max-width: 1024px) {
    height: 300px;
  }
  width: 100vw;
  position: absolute;
  top: 0;
  height: 60vh;

  display: block;
  background: black;
}

#canvas {
  @media (max-width: 1024px) {
    height: 120vh;
  }
  position: fixed;
  transform: translate3d(0, 0, 0);
  top: -10vh;
  right: 0;
  left: 0;
  height: 120vh;

  width: 120vw;
  z-index: 1;
  animation-fill-mode: forwards;
  animation-name: load;
  animation-duration: 4s;
  animation-delay: 0.3s;
  opacity: 0;
}

#textCanvas {
  @media (max-width: 1024px) {
    height: 300px;
  }
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 60vh;

  z-index: 10;
}

.small-plane {
  @media (max-width: 1024px) {
    height: 300px;
  }
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 60vh;
}

@keyframes load {
  100% {
    opacity: 1;
  }
}
.logo {
  @media (max-width: 1024px) {
    height: 300px;
  }
  z-index: 20;
  max-width: 100vw;
  height: 60vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.logo img {
  height: 100%;
  width: 100%;
}
</style>

