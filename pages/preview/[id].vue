<template>
  <div class="manual-wrapper" v-if="manual">
    <h1 class="manual-title">{{ manual.head.title }}</h1>
    <pre class="manual-description">{{ manual.head.description }}</pre>
    <div class="sections">
      <div class="section" v-for="section, index in manual.sections">
        <div class="content">
          <h2 class="section-title">{{ index + 1 }}. {{ section.title }}</h2>
          <pre class="section-description">{{ section.description }}</pre>
          <div class="media" v-if="section.media.name">
            <img :src="`/uploads/${section.media.name}`" alt="Section description">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: 'Preview'
})

definePageMeta({
  layout: 'preview',
  middleware: ['auth', 'builder']
})

const store = useBuilderStore()

const { manual } = storeToRefs(store)
</script>

<style lang="scss" scoped>
.manual-wrapper {
  font-family: Calibri;
  max-width: 800px;

  margin: 0 auto;
  padding: 0 15px;
  padding-bottom: 20px;
}

.manual-title {
  font-size: 2em;
  padding: 5px;
}

.manual-description {
  font-size: 1.4em;
  padding: 5px;
  color: #363636;
}

.sections {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .section {
    display: flex;
    gap: 5px;

    background-color: $surface;

    padding: 15px;
    border-radius: 15px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .section-title {
        font-size: 1.2em;
        padding: 5px;
      }

      .section-description {
        font-size: 1em;
        padding: 5px;
        color: #363636;
      }

      .media {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          max-width: 40%;
        }
      }
    }

    aside {
      .counter {
        font-size: 1.2em;
        padding: 5px;
        text-align: end;
      }
    }
  }
}
</style>