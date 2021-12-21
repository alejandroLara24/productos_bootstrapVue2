<template>
  <div class="m-0 row justify-content-center">
    <div class="col-sm-6 col-md-4 col-lg-4">
      <form @reset="resetForm" @submit.prevent="addProduct" novalidate>
        <fieldset>
          <legend>{{(this.edit)?'Editar':'Nuevo'}} producto</legend>
          <!-- Aquí los inputs y botones del form -->
          <div class="form-group">
            <label>ID:</label>
            <input
              type="text"
              class="form-control"
              v-model.number="newProduct.id"
              disabled
            />
          </div>
          <div class="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              class="form-control"
              v-model="newProduct.name"
              required
            />
            <span class="error"></span>
          </div>
          <div class="form-group">
            <label>Unidades:</label>
            <input
              type="number"
              class="form-control"
              min="0"
              step="1"
              v-model.number="newProduct.units"
            />
            <span class="error"></span>
          </div>
          <div class="form-group">
            <label>Precio/u.:</label>
            <input
              type="number"
              class="form-control"
              required
              min="0"
              step="0.01"
              v-model.number="newProduct.price"
            />
            <span class="error"></span>
          </div>
          <button type="submit" class="btn btn-default btn-primary">
            {{(this.edit)?'Editar':'Añadir'}}
          </button>
          <button type="reset" class="btn btn-danger" >Reset</button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../API";
import store from "../store";

export default {
  name: "products-form",
  props: ["id"],
  data() {
    return {
      newProduct: {},
      edit: false,
    };
  },
  mounted() {
    if (this.id) {
      this.edit = true;
      this.cargaProd();
    }
  },
  methods: {
    cargaProd() {
      api.products
        .getOne(this.id)
        .then((response) => {
          this.newProduct = response.data;
        })
        .catch((error) => store.addMessageAction(error));
    },
    addProduct() {
      if (this.edit) {
        api.products
          .modify(this.newProduct)
          .then(() => {
            alert("Se ha modificado el producto");
            this.newProduct = {};
            this.$router.push("/");
          })
          .catch((error) => store.addMessageAction(error));
      } else {
        api.products
          .create(this.newProduct)
          .then(() => {
            alert("Se añadio el producto");
            this.newProduct = {};
            this.$router.push("/");
          })
          .catch((error) => store.addMessageAction(error));
      }
    },
    resetForm() {
      if (this.edit) {
        this.cargaProd()
      } else {
        this.newProduct = {}
      }
    }
  },
};
</script>