<template>
  <b-card class="ProductsListItemSkeleton" no-body>
    <button @click="$emit('click')">
      <b-icon-plus-circle class="mb-3" />
      <div>Add Product</div>
    </button>
  </b-card>
</template>

<style scoped>
.ProductsListItemSkeleton {
  height: 100%;
  color: #aaa;
  box-shadow: 0px 3px 5px 0px #ddd;
  transition: all 0.2s;
}

.ProductsListItemSkeleton button {
  padding: 2rem 2rem;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  color: inherit;
  background: #f5f5f5;
}

.ProductsListItemSkeleton:hover {
  color: #777;
  box-shadow: 0px 6px 10px 0px #ddd;
  transform: scale(1.05);
}

.ProductsListItemSkeleton button svg {
  font-size: 3rem;
}
</style>
