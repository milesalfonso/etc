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
        <h1 class="text-purple">Complete Your Profile</h1>
      </div>
    </div>
  </div>
  <div class="row d-flex justify-content-center align-items-center text-center">
    <div class="col-10 col-md-3 mx-auto">
      <div
        class="row d-flex justify-content-center align-items-center text-purple"
      >
        <div class="row mb-3">
          <label for="full_name" class="form-label">Full Name</label
          ><input
            type="text"
            class="form-control inputBox mx-auto"
            id="full_name"
            v-model="full_name"
          />
        </div>

        <div class="row mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            class="form-control inputBox mx-auto"
            id="title"
            v-model="title"
          />
        </div>

        <div class="row mb-3">
          <label for="entity" class="form-label">Entity</label>
          <input
            type="text"
            class="form-control inputBox mx-auto"
            id="entity"
            v-model="entity"
          />
        </div>

        <div class="row mb-3">
          <label for="email" class="form-label">Email Address</label>
          <input
            type="text"
            class="form-control inputBox mx-auto"
            id="email"
            v-model="email"
          />
        </div>

        <div class="row mb-3">
          <label for="email" class="form-label">Confirm Email Address</label>
          <input
            type="text"
            class="form-control inputBox mx-auto"
            id="email"
            v-model="confirm_email"
          />
        </div>

        <div class="row mb-5">
          <label for="mobile" class="form-label">EID Number</label>
          <div class="d-flex">
            <input
              type="text"
              class="form-control inputBox mx-1"
              id="eid-part1"
              v-model="eidPart1"
              maxlength="3"
              @input="moveFocus($event, 'eid-part2')"
            />
            <span class="mx-1">-</span>
            <input
              type="text"
              class="form-control inputBox mx-1"
              id="eid-part2"
              v-model="eidPart2"
              maxlength="4"
              @input="moveFocus($event, 'eid-part3')"
            />
            <span class="mx-1">-</span>
            <input
              type="text"
              class="form-control inputBox mx-1"
              id="eid-part3"
              v-model="eidPart3"
              maxlength="7"
              @input="moveFocus($event, 'eid-part4')"
            />
            <span class="mx-1">-</span>
            <input
              type="text"
              class="form-control inputBox mx-1"
              id="eid-part4"
              v-model="eidPart4"
              maxlength="1"
            />
          </div>
        </div>

        <div class="row mb-3 justify-content-center align-items-center">
          <router-link
            v-if="
              full_name &&
              title &&
              entity &&
              email &&
              eidNumber &&
              email == confirm_email
            "
            :to="{
              path: '/pdf',
              query: {
                fullName: full_name,
                title: title,
                entity: entity,
                email: email,
                mobile: eidNumber,
              },
            }"
            class="btn btnPurplePillLight dynamic-width"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import "../../assets/body-bg.css";

//   import { login } from "../../api/server";

export default defineComponent({
  name: "Track1Components",
  computed: {
    eidNumber() {
      return `${this.eidPart1}-${this.eidPart2}-${this.eidPart3}-${this.eidPart4}`;
    },
  },
  data() {
    return {
      full_name: "" as string,
      title: "" as string,
      entity: "" as string,
      email: "" as string,
      confirm_email: "" as string,
      mobile: "" as string,
      eidPart1: "",
      eidPart2: "",
      eidPart3: "",
      eidPart4: "",
    };
  },
  methods: {
    moveFocus(event: Event, nextFieldId: string) {
      const target = event.target as HTMLInputElement | null;
      if (target && target.value.length === target.maxLength) {
        (this.$refs[nextFieldId] as HTMLInputElement).focus();
      }
    },
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
