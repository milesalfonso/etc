<!-- Track1Components.vue -->
<template>
  <div class="row mb-3">
    <div
      class="col d-flex justify-content-center align-items-center flex-column text-white"
      style="background-color: #69478e"
    >
      <div class="row mb-3 mt-5">
        <img
          src="../../assets/EWC Logo-White.svg"
          alt="EWC Logo"
          class="img-fluid mx-auto d-block ms-4"
        />
      </div>
      <div class="row w-75 mb-5">
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
          <label for="full_name" class="form-label">Full Name</label>
          <input
            type="text"
            class="form-control inputBox mx-auto"
            id="full_name"
            v-model="full_name"
          />
        </div>

        <div class="row mb-3">
          <label for="title" class="form-label">Job Title</label>
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
          <label for="confirm_email" class="form-label"
            >Confirm Email Address</label
          >
          <input
            type="text"
            class="form-control inputBox mx-auto"
            id="confirm_email"
            v-model="confirm_email"
          />
        </div>

        <p v-if="email !== confirm_email" class="text-danger">
          Emails do not match. Please ensure both email fields are identical.
        </p>

        <div class="row mb-5">
          <label for="mobile" class="form-label">EID Number</label>
          <div class="d-flex">
            <input
              type="text"
              class="form-control inputBox mx-1"
              ref="eidPart1"
              v-model="eidPart1"
              maxlength="3"
              @input="moveFocus($event, 'eidPart2')"
            />
            <span class="mx-1">-</span>
            <input
              type="text"
              class="form-control inputBox mx-1"
              ref="eidPart2"
              v-model="eidPart2"
              maxlength="4"
              @input="moveFocus($event, 'eidPart3')"
            />
            <span class="mx-1">-</span>
            <input
              type="text"
              class="form-control inputBox mx-1"
              ref="eidPart3"
              v-model="eidPart3"
              maxlength="7"
              @input="moveFocus($event, 'eidPart4')"
            />
            <span class="mx-1">-</span>
            <input
              type="text"
              class="form-control inputBox mx-1"
              ref="eidPart4"
              v-model="eidPart4"
              maxlength="1"
            />
          </div>
        </div>

        <div class="row mb-3 justify-content-center align-items-center">
          <router-link
            v-if="isFormValid"
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
            :class="buttonClass"
            class="btn dynamic-width"
          >
            Next
          </router-link>
          <button
            v-else
            :class="buttonClass"
            class="btn dynamic-width"
            disabled
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Purple footer (full width like header) -->
  <div class="row mt-4">
    <div class="col p-0">
      <div class="purple-footer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import "../../assets/body-bg.css";

export default defineComponent({
  name: "Track1Components",
  computed: {
    eidNumber() {
      return `${this.eidPart1}-${this.eidPart2}-${this.eidPart3}-${this.eidPart4}`;
    },
    isFormValid() {
      return (
        this.full_name &&
        this.title &&
        this.entity &&
        this.email &&
        this.eidPart1.length == 3 &&
        this.eidPart2.length == 4 &&
        this.eidPart3.length == 7 &&
        this.eidPart4.length == 1 &&
        this.eidNumber &&
        this.email == this.confirm_email
      );
    },
    buttonClass() {
      return this.isFormValid ? "btnPurplePillLight" : "btnGrey";
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
        nextTick(() => {
          const nextField = this.$refs[nextFieldId] as HTMLInputElement | null;
          if (nextField) nextField.focus();
        });
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

.purple-footer {
  margin-top: 24px;
  height: 60px;
  width: 100%;
  background-color: #69478e;
  border-radius: 12px;
}
</style>
