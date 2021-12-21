<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12" id="almacen">
      <table class="table table-striped table-hover">
        <thead class="thead-dark bg-light">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Uds.</th>
            <th>Precio/u</th>
            <th>Importe</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <product-row
            v-for="(product, index) in products"
            :key="index"
            :product="product"
            @changeunits="changeUnits"
            @delproduct="delProduct"
            @editproduct="editProduct"
          ></product-row>
        </tbody>
        <tfoot>
          <th colspan="4">Importe total del almacén:</th>
          <th id="total">{{ totalImport }} €</th>
          <th></th>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import api from "../API";
import store from "../store";
import ProductRow from "../components/ProductRow.vue";
export default {
  name: "products-table",
  components: { ProductRow },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    api.products
      .getAll()
      .then((response) => (this.products = response.data))
      .catch((error) => alert(error));
  },
  computed: {
    totalImport() {
      return this.products
        .reduce((total, product) => (total += product.price * product.units), 0)
        .toFixed(2);
    },
  },
  methods: {
    changeUnits(datos) {
      api.products
        .modify({
          id: datos.product.id,
          name: datos.product.name,
          units: datos.product.units + datos.cantidad,
          price: datos.product.price,
        })
        .then((response) => {
          let index = this.products.findIndex(
            (item) => item.id === datos.product.id
          );
          this.products.splice(index, 1, response.data);
        })
        .catch((error) => store.addMessageAction(error));
    },
    delProduct(datos) {
      if (
        confirm(
          `Vas a eliminar el siguiente producto:\n ID: ${datos.product.id}\n Nombre: ${datos.product.name}`
        )
      )
        api.products
          .delete(datos.product.id)
          .then(() => {
            alert(
              `Ya se ha borrado el producto:\n ID: ${datos.product.id}\n Nombre:${datos.product.name}\n Recarga para que aparezca`
            );
          })
          .catch((error) => store.addMessageAction(error));
    },
    editProduct(datos) {
      this.$router.push(`/edit/${datos.productId}`)
    },
  },
};
</script>