<template>
  <div class="product-filter">
    <div class="row q-col-gutter-md items-center">
      <div class="col-12 col-sm-4">
        <q-select
          v-model="selectedCategory"
          :options="categories"
          label="Categoría"
          outlined
          dense
          clearable
          map-options
          emit-value
          option-label="description"
          option-value="id"
          @update:model-value="emitFilter"
        />
      </div>
      <div class="col-6 col-sm-3">
        <q-input
          v-model.number="minPrice"
          label="Precio mín."
          type="number"
          outlined
          dense
          clearable
          :min="0"
          @update:model-value="emitFilter"
        />
      </div>
      <div class="col-6 col-sm-3">
        <q-input
          v-model.number="maxPrice"
          label="Precio máx."
          type="number"
          outlined
          dense
          clearable
          :min="0"
          @update:model-value="emitFilter"
        />
      </div>
      <div class="col-12 col-sm-2">
        <q-btn
          label="Limpiar"
          color="grey"
          flat
          no-caps
          class="full-width"
          @click="clearFilters"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['filter-change'])

const selectedCategory = ref(null)
const minPrice = ref(null)
const maxPrice = ref(null)

function emitFilter() {
  emit('filter-change', {
    categoryId: selectedCategory.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
  })
}

function clearFilters() {
  selectedCategory.value = null
  minPrice.value = null
  maxPrice.value = null
  emitFilter()
}
</script>
