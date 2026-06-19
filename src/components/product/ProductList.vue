<template>
  <div>
    <div class="q-mb-lg">
      <ProductFilter :categories="categories" @filter-change="applyFilter" />
    </div>

    <div v-if="loading" class="row justify-center q-py-xl">
      <q-spinner color="primary" size="60px" />
    </div>

    <div v-else-if="filteredProducts.length === 0" class="text-center q-py-xl">
      <q-icon name="inventory_2" size="64px" color="grey-4" />
      <div class="text-h6 text-grey-6 q-mt-md">No se encontraron productos</div>
    </div>

    <div v-else class="row q-col-gutter-md">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <ProductItem :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProducts, getCategories } from '@/services/api'
import ProductFilter from './ProductFilter.vue'
import ProductItem from './ProductItem.vue'

const products = ref([])
const categories = ref([])
const loading = ref(true)

const filter = ref({
  categoryId: null,
  minPrice: null,
  maxPrice: null,
})

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    if (filter.value.categoryId && p.categoryId !== filter.value.categoryId) return false
    if (filter.value.minPrice !== null && p.price < filter.value.minPrice) return false
    if (filter.value.maxPrice !== null && p.price > filter.value.maxPrice) return false
    return true
  })
})

function applyFilter(newFilter) {
  filter.value = newFilter
}

async function loadData() {
  loading.value = true
  try {
    const [productsData, categoriesData] = await Promise.all([
      getProducts(),
      getCategories(),
    ])
    products.value = productsData
    categories.value = categoriesData
  } catch (err) {
    console.error('Error loading data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>
