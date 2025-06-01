<template>
  <div class="builder-container">
    <div class="manual-wrapper" v-if="manual">
      <EditableText class="manual-title" v-model="manual.head.title" />
      <EditableText class="manual-description" v-model="manual.head.description" multiline />
      <div class="sections">
        <div class="section" v-for="section, index in manual.sections">
          <div class="side">{{ index + 1 }}</div>
          <div class="content">
            <EditableText class="section-title" v-model="manual.sections[index].title" />
            <EditableText class="section-description" v-model="manual.sections[index].description" />
            <div class="image-container">
              <Media v-model="manual.sections[index].media" :index="index" @remove="store.removeMedia"
                @upload="store.uploadMedia" />
            </div>
          </div>
        </div>
        <div class="add-section" @click="store.addSection()">Add section</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'builder',
  middleware: ['auth', 'builder']
})

const store = useBuilderStore()

const { manual } = storeToRefs(store)

// Watch the manual updates and call update function
watch(manual, async (value) => {
  await store.save()
}, { deep: true })

</script>

<style lang="scss" scoped>
.manual-wrapper {
  font-family: Calibri;
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
  display: flex;
  flex-direction: column;
  gap: 10px;

  .section {
    display: flex;
    gap: 5px;

    background-color: $surface;

    .content {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .section-title {
        font-size: 1.2em;
        padding: 5px;
      }

      .section-description {
        font-size: 1em;
        padding: 5px;
        color: #363636;
      }
    }

    .side {
      width: 10px;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>