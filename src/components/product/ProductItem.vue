<template>
  <q-card class="product-card" flat bordered>
    <q-img
      :src="product.imageUrl || 'https://placehold.co/300x300/e2e8f0/64748b?text=Sin+Imagen'"
      :ratio="1"
      class="product-image"
    >
      <template #loading>
        <div class="absolute-full flex flex-center bg-grey-2">
          <q-spinner size="40px" color="primary" />
        </div>
      </template>
      <div v-if="product.discount > 0" class="discount-badge">
        -{{ product.discount }}%
      </div>
    </q-img>

    <q-card-section class="q-pa-md">
      <div class="text-subtitle2 text-grey-8 text-weight-medium ellipsis">
        {{ product.description }}
      </div>

      <div class="row items-baseline q-mt-sm">
        <div v-if="product.discount > 0" class="text-grey text-caption text-strike q-mr-sm">
          S/ {{ originalPrice }}
        </div>
        <div class="text-h6 text-primary text-weight-bold">
          S/ {{ finalPrice }}
        </div>
      </div>

      <div class="row items-center q-mt-sm">
        <q-icon :name="product.stock > 0 ? 'check_circle' : 'cancel'" :color="product.stock > 0 ? 'positive' : 'negative'" size="16px" />
        <span class="q-ml-xs text-caption" :class="product.stock > 0 ? 'text-positive' : 'text-negative'">
          {{ product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock' }}
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const originalPrice = computed(() => props.product.price.toFixed(2))

const finalPrice = computed(() => {
  if (props.product.discount > 0) {
    const discounted = props.product.price * (1 - props.product.discount / 100)
    return discounted.toFixed(2)
  }
  return props.product.price.toFixed(2)
})
</script>

<style lang="scss" scoped>
.product-card {
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
}

.product-image {
  border-radius: 12px 12px 0 0;
  position: relative;
}

.discount-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ef4444;
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  z-index: 1;
}
</style>
