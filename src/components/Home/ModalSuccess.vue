<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="successModal"
    tabindex="-1"
    aria-labelledby="successModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body container-fluid">
          <div class="row d-flex justify-content-center">
            <h1 class="text-center mb-5">EWC</h1>
            <h3 class="text-center mb-5">Enrollment Successful!</h3>
            <button
              class="btn btnWhitePillLight text-purple w-100"
              data-bs-dismiss="modal"
              @click="closeModalAndNavigate"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {},
  methods: {
    closeModalAndNavigate() {
      this.$emit("close-modal");
      this.$router.push("/track-1");
    },
  },
});
</script>

<style scoped>
.img-fluid {
  object-fit: fill !important;
  border-radius: 20px !important;
}

.bg-red-opacity {
  background-color: rgba(255, 0, 0, 0.25); /* Red with 50% opacity */
}

.modal-content {
  /* background-image: url("@/assets/images/background/backgroundMain.png"); */
  /* background-color: transparent; */
  /* background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px); */
  background-color: #69478e;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-family: Tahoma, Verdana, sans-serif !important;
  overflow: auto;
  color: white;
  /* padding: 30px 30px; */
  /* border: 1px solid slategray; */
}

.modal-body {
  padding: 30px 30px;
}

.inputBox {
  background-color: #373737;
  color: white !important;
  border: none;
  border: 1px solid white;
}

.inputBox-noborder {
  background-color: #373737;
  color: white !important;
  border: none;
  /* ::placeholder {
            color: white !important;
          } */
}

.form-select {
  --bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e") !important;
}

.btnClose {
  background-color: transparent !important;
  color: #373737 !important;
  border: none !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

::placeholder {
  color: white;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder {
  /* Edge 12 -18 */
  color: white;
}

th,
td {
  padding: 15px;
}

.btn-close-white {
  filter: invert(1) grayscale(100%) brightness(200%);
}

.modal-header {
  border-color: transparent;
}

.btn-dark-bordered {
  background-color: transparent;
  color: white;
  border: 1px solid red;
}
</style>
