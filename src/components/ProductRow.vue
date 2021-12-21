<template>
  <tr>
    <td>{{ product.id }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.units }}</td>
    <td>{{ product.price }}</td>
    <td>{{ productImport }} €</td>
    <td>
      <button class="downStock btn btn-secondary" :disabled="!product.units" @click="chgUnits(-1)">
        <i class="bi bi-arrow-down"></i>
      </button>
      <button class="upStock btn btn-secondary" @click="chgUnits(1)">
        <i class="bi bi-arrow-up"></i>
      </button>
      <button class="edit btn btn-secondary" @click="editProduct">
        <i class="bi bi-pencil"></i>
      </button>
      <button class="delete btn btn-secondary" @click="delProduct">
        <i class="bi bi-trash"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "product-row",
  props: ["product"],
  computed: {
    productImport() {
      return (this.product.units * this.product.price).toFixed(2);
    },
  },
  methods: {
    chgUnits(add) {
      this.$emit("changeunits", {cantidad: add, product: this.product});
    },
    delProduct() {
      this.$emit("delproduct", {product: this.product})
    },
    editProduct() {
      this.$emit("editproduct", {productId: this.product.id})
    }
  },
};
</script>