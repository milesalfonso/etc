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
    <div class="col-12 text-center">
      <div class="video-container">
        <iframe
          src="https://www.youtube.com/embed/WrXv4P6jr7o?si=tc6Njlnu2-x4iKA1&autoplay=1&controls=0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    </div>

    <div class="row text-center">
      <h1 class="text-purple">Complete Your Profile</h1>
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
            class="form-control inputBox"
            id="full_name"
            v-model="full_name"
          />
        </div>

        <div class="row mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            class="form-control inputBox"
            id="title"
            v-model="title"
          />
        </div>

        <div class="row mb-3">
          <label for="entity" class="form-label">Entity</label>
          <input
            type="text"
            class="form-control inputBox"
            id="entity"
            v-model="entity"
          />
        </div>

        <div class="row mb-3">
          <label for="email" class="form-label">Email Address</label>
          <input
            type="text"
            class="form-control inputBox"
            id="email"
            v-model="email"
          />
        </div>

        <div class="row mb-3">
          <label for="email" class="form-label">Confirm Email Address</label>
          <input
            type="text"
            class="form-control inputBox"
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
            v-if="
              full_name &&
              title &&
              entity &&
              email &&
              eidNumber &&
              email == confirm_email
            "
            :to="{
              path: '/mentors',
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
import { defineComponent, nextTick, ref } from "vue";
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import "../../assets/body-bg.css";

//   import { login } from "../../api/server";

export default defineComponent({
  name: "Track2Components",
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
        nextTick(() => {
          const nextField = this.$refs[nextFieldId] as HTMLInputElement | null;
          if (nextField) {
            nextField.focus();
          } else {
            console.error(`Element with ref ${nextFieldId} not found.`);
          }
        });
      }
    },
  },
});
</script>

<style scoped>
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

@media (min-width: 992px) {
  .video-container {
    padding-bottom: 0;
    margin: auto;
    height: 562px;
    width: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .video-container iframe {
    position: relative;
    width: 1000px;
    height: 562px;
  }
}

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
