<template>
  <div class="row mb-3">
    <div
      class="col d-flex justify-content-center align-items-center flex-column text-white"
      style="background-color: #69478e; height: 350px"
    >
      <div class="row mb-3">
        <img
          src="../../assets/EWC Logo-White.svg"
          alt="EWC Logo"
          class="img-fluid mx-auto d-block ms-4"
        />
      </div>
      <div class="row w-75">
        <h1 class="text-center">Welcome to the EWC Passion Goal</h1>
      </div>
    </div>
  </div>
  <div class="row mb-3 justify-content-center">
    <div
      class="row d-flex justify-content-center align-items-center text-purple text-center"
    >
      <div class="row">
        <h1 class="text-purple">EWC</h1>
      </div>
      <div class="row">
        <h1 class="text-purple">Choose your track</h1>
      </div>
    </div>
  </div>
  <div class="row d-flex justify-content-center align-items-center text-center">
    <div class="col-10 col-md-3 mx-auto">
      <div
        class="row d-flex justify-content-center align-items-center text-purple"
      >
        <div class="row mb-3 justify-content-center align-items-center">
          <router-link :to="'/track-1'" class="btn btnPurplePillLight h-50">
            Track 1
          </router-link>
        </div>
        <div class="row mb-3 justify-content-center align-items-center">
          <router-link :to="'/track-2'" class="btn btnPurplePillLight">
            Track 2
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import "../../assets/body-bg.css";

export default defineComponent({
  name: "Track1Components",
  data() {
    return {
      full_name: "" as string,
      title: "" as string,
      entity: "" as string,
      email: "" as string,
      mobile: "" as string,
    };
  },
  setup() {
    onMounted(async () => {
      try {
        const response = await axios.get("https://api.dev-miles.com/ewc/test");
        console.log("Response from /test endpoint:", response.data);
      } catch (error) {
        console.error("Error calling /test endpoint:", error);
      }
    });
  },
});
</script>

<style scoped>
button {
  width: 100%;
  color: white;
  padding: 10px 32px;
  text-align: center;
  display: inline-block;
  font-size: 0.875em;
}

input {
  width: 100%;
  padding: 10px 10px;
  font-size: 0.875em;
}
</style>
