<template>
  <div class="weather-situation">
    <div
      id="weather-situation__vessel-wrapper"
      class="weather-situation__vessel-wrapper"
    >
      <BaseIcon
        class="weather-situation__vessel"
        width="60"
        height="265"
        color="#7c9cc9"
        strokeColor="#7c9cc9"
        viewBox="0 0 76 76"
      >
        <IconVessel/>
      </BaseIcon>
    </div>

    <div
      id="weather-situation__wind-flag-wrapper"
      class="weather-situation__wind-flag-wrapper"
    >
      <WindFlag
        class="weather-situation__wind-flag"
        :speed="report.windSpd"
        :direction="report.windDir"
        :withBorder="false"/>
    </div>

    <div
      id="weather-situation__sea-flag-wrapper"
      class="weather-situation__sea-flag-wrapper"
    >
      <SeaFlag
        class="weather-situation__sea-flag"
        :height="report.swellHeight"
        :direction="report.swellDir"
        :withBorder="false"
      ></SeaFlag>
    </div>
  </div>
</template>

<script>
  import WindFlag from './WindFlag.vue'
  import SeaFlag from './SeaFlag.vue'
  import IconVessel from './Icons/IconVessel.vue'
  import BaseIcon from './BaseIcon.vue'

  export default {
    components: {
      WindFlag,
      SeaFlag,
      BaseIcon,
      IconVessel
    },

    props: {
      report: {
        type: Object,
        required: true
      }
    },

    watch: {
      report () {
        this.setSituation()
      }
    },

    mounted () {
      this.setSituation()
    },

    methods: {
      setSituation () {
        const windFlagWrapper = document.getElementById('weather-situation__wind-flag-wrapper')
        windFlagWrapper.style.transform = `rotate(${this.report.windDir}deg)`

        const seaFlagWrapper = document.getElementById('weather-situation__sea-flag-wrapper')
        seaFlagWrapper.style.transform = `rotate(${this.report.swellDir}deg)`

        const vesselWrapper = document.getElementById('weather-situation__vessel-wrapper')
        vesselWrapper.style.transform = `rotate(${this.report.course}deg)`
      }
    }
  }
</script>

<style scoped lang="scss">
  .weather-situation {
    display: flex;
    position: relative;
    @include sizing(500px);
    background: url(../assets/compass-rose.svg);
    background-size: 500px;

    &__wind-flag, &__sea-flag {
      position: relative;
    }

    &__wind-flag-wrapper, &__sea-flag-wrapper, &__vessel-wrapper {
      position: absolute;
      @include sizing(500px);
      transition: all 2s ease-in-out;
    }

    &__wind-flag, &__sea-flag {
      position: relative;
      top: 45px;
      transform: rotate(180deg);
    }

    &__vessel {
      position: relative;
      top: 58px;
      left: 219px;
      opacity: 0.7;
    }
  }
</style>
