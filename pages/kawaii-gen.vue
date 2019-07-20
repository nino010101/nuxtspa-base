<template>
  <div class="main">
    <div class="header">
      <h1 class="title">
        かわいいシールジェネレータ
      </h1>
    </div>
    <div class="contents">
      <div>
        <!-- 描画部分 -->
        <div class="canvas-wrapper" :class="{ 'sp' : isMobile}">
          <Canvas v-if="!isLoading" ref="canvas" :config="configKonva" :images="images" class="canvas" />
        </div>
        <!-- 背景画像 -->
        <div class="form-wrapper">
          <div class="form-label">
            <p>背景</p>
          </div>
          <div class="form-parts">
            <Accordion :label="'色設定'">
              <HSLSlider :hsl-values="images[0].hsl" @updateValue="onUpdateValue($event,'bg')" />
            </Accordion>
          </div>
        </div>
        <!-- 表情 -->
        <div class="form-wrapper">
          <div class="form-label">
            <p>表情</p>
          </div>
          <div class="form-parts">
            <SelectBox :config="face.selectConfig" :value="face.selectValue" @changeSelect="onChangeSelect" />
          </div>
          <div class="form-parts">
            <Accordion :label="'色設定'">
              <HSLSlider :hsl-values="images[1].hsl" @updateValue="onUpdateValue($event,'face')" />
            </Accordion>
          </div>
        </div>
        <!-- ハート -->
        <div class="form-wrapper">
          <div class="form-label">
            <p>ハートの色</p>
          </div>
          <div class="form-parts">
            <SelectBox :config="heart.selectConfig" :value="heart.selectValue" @changeSelect="onChangeHeart" />
          </div>
        </div>
        <!--
        <div class="form-wrapper">
          <div class="form-label">
            <p>髪型</p>
          </div>
          <SelectBox :config="selectConfig" :value="selectValue" @changeSelect="onChangeSelect" />
          <div class="parts-sample">
            <Accordion :label="'色設定'">
              <HSLSlider :hsl-values="images[0].hsl" @updateValue="onUpdateValue" />
            </Accordion>
          </div>
        </div>
        <div class="form-wrapper">
          <div class="form-label">
            <p>装飾</p>
          </div>
          <SelectBox :config="selectConfig" :value="selectValue" @changeSelect="onChangeSelect" />
          <div class="parts-sample">
            <Accordion :label="'色設定'">
              <HSLSlider :hsl-values="images[0].hsl" @updateValue="onUpdateValue" />
            </Accordion>
          </div>
        </div>
        -->
      </div>
    </div>
    <div class="footer">
      <p class="credit">
        created by @_pkpq_
      </p>
    </div>
  </div>
</template>

<script>
// import modules
import { isMobile } from '~/utils/userAgent'
import Canvas from '~/components/Canvas.vue'
import HSLSlider from '~/components/HSLSlider.vue'
import SelectBox from '~/components/SelectBox.vue'
import loadImage from '~/utils/loadImage'
import Accordion from '~/components/Accordion.vue'

export default {
  components: {
    Canvas,
    HSLSlider,
    SelectBox,
    Accordion
  },
  data() {
    // PCは500px固定、SPは画面の横幅-20px(最大は500px)
    let canvasSize = 500
    if (isMobile) {
      canvasSize = window.innerWidth - 20
      if (canvasSize > 500) {
        canvasSize = 500
      }
    }
    return {
      isMobile: isMobile,
      isLoading: true,
      configKonva: {
        width: canvasSize,
        height: canvasSize
      },
      images: [
        {
          name: 'bg',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        },
        {
          name: 'base',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        },
        {
          name: 'hair',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        },
        {
          name: 'line',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        },
        {
          name: 'heart',
          hsl: {
            hue: 0,
            saturation: 0,
            luminance: 0
          },
          config: { image: null, width: canvasSize, height: canvasSize }
        }
      ],
      face: {
        selectConfig: {
          label: '表情画像',
          default: '表情を選んでください',
          options: ['youngwoman_37.png', 'youngwoman_38.png', 'youngwoman_42.png']
        },
        selectValue: ''
      },
      heart: {
        selectConfig: {
          label: 'ハート',
          default: 'ハートの色を選んでください',
          options: ['金森まりあ', 'キラッツ', 'メルティック'],
          files: ['./heart_maria.png', './heart_kirats.png', './heart_meltic.png']
        },
        selectValue: ''
      }
    }
  },
  created() {
    this.createImages()
  },
  methods: {
    // 画像読み込み
    async createImages() {
      // 背景画像
      const imageBG = await loadImage('./bg.png')
      this.images[0].config.image = imageBG
      // 表情画像
      const imageMainBase = await loadImage('./main_base.png')
      this.images[1].config.image = imageMainBase
      const imageMainHair = await loadImage('./main_hair.png')
      this.images[2].config.image = imageMainHair
      const imageMainLine = await loadImage('./main_line.png')
      this.images[3].config.image = imageMainLine
      // ハート画像
      const imageHeart = await loadImage('./heart_maria.png')
      this.images[4].config.image = imageHeart
      this.isLoading = false
    },
    onUpdateValue(data, name) {
      // TODO:イメージごとに別のスライダーのフィルタを適用するように変更する
      this.images.forEach((image) => {
        if (image.name === name) {
          image.hsl[data.hsl] = parseInt(data.value)
          this.$refs.canvas.hslFilterDraw(image.name, image.hsl)
        }
      })
    },
    onChangeImage() {
      const mainImage = new Image()
      mainImage.src = './youngwoman_37.png'
      mainImage.onload = () => {
        this.configMain.image = mainImage
      }
    },
    async onChangeSelect(value) {
      // TODO: onchangeのたびにロードをかけるのをやめて、初期に全部ロードしたい
      const imageMain = await loadImage(`./${value}`)
      this.images[1].config.image = imageMain
      this.$refs.canvas.refreshDraw(this.images[1].name)
    },
    async onChangeHeart(value) {
      const imageHeart = await loadImage(this.heart.selectConfig.files[parseInt(value)])
      this.images[4].config.image = imageHeart
      this.$refs.canvas.refreshDraw(this.images[4].name)
    }
  }
}
</script>

<style lang="scss" scoped>
// 色定義のインポート
@import "../scss/color";

.main {
  height: 100vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  color: $color-black;
  font-size: 14px;
}

.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  background-color: $color-pink;
  .title {
    margin:auto;
    font-size: 24px;
    font-weight: 1000;
    color: $color-white;
  }
}

.contents {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex:1;
}

.canvas-wrapper {
  display: block;
  padding-top: 24px;
  .canvas {
    border: 3px dotted $color-gray;
  }
}

.form-wrapper {
  display: block;
  padding-top: 24px;
  .form-label {
    border-left: 5px solid $color-pink;
    padding-left: 12px;
    background-color: $color-gray;
    padding-top: 5px;
    padding-bottom: 5px;
    p {
      font-size: 18px;
      font-weight: bold;
      color: $color-black;
    }
  }
  .form-parts {
    margin-top: 4px;
  }
}

.footer {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  background-color: $color-pink;
  margin-top:45px;
  .credit {
    margin: auto;
    color: $color-white;
  }
}

</style>
