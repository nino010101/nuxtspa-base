<template>
  <div class="container">
    <v-stage :config="configKonva" class="stage">
      <v-layer>
        <v-image ref="image" :config="configBg" />
      </v-layer>
    </v-stage>
    <button @click="changeColor">
      test
    </button>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      configKonva: {
        width: 500,
        height: 500
      },
      configCircle: {
        x: 250,
        y: 250,
        radius: 100,
        fill: '#00c800',
        stroke: 'black',
        strokeWidth: 4,
        shadowBlur: 10
      },
      configBg: {
        image: null
      },
      baseRGB: {
        blue: 0,
        green: 0,
        red: 0
      }
    }
  },
  mounted() {
    console.log(process.env.TEST)
  },
  created() {
    const image = new Image()
    image.src = './kawaii_siru_base.png'
    image.onload = () => {
      this.configBg.image = image
      this.$nextTick(() => {
        const node = this.$refs.image.getStage()
        node.cache()
        // eslint-disable-next-line no-undef
        node.filters([Konva.Filters.RGB])
        node.blue(this.baseRGB.blue)
        node.green(this.baseRGB.green)
      })
    }
  },
  methods: {
    changeColor() {
      this.baseRGB.blue += 10
      this.baseRGB.green += 10
      this.$nextTick(() => {
        const node = this.$refs.image.getStage()
        node.cache()
        // eslint-disable-next-line no-undef
        node.filters([Konva.Filters.RGB])
        node.blue(this.baseRGB.blue)
        node.green(this.baseRGB.green)
        node.getLayer().batchDraw()
      })
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.stage{
  border: 1px solid #000000;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
