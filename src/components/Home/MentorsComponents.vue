<template>
  <div class="row mb-3">
    <div
      class="col d-flex justify-content-center align-items-center flex-column text-white"
      style="background-color: #69478e; height: 300px"
    >
      <div class="row">
        <img
          src="../../assets/EWC Logo-White.svg"
          alt="EWC Logo"
          class="img-fluid mx-auto d-block w-75 h-75"
        />
      </div>
      <div class="row">
        <h1>Welcome to the EWC Passion Goal</h1>
      </div>
    </div>
  </div>
  <div class="row mb-3 justify-content-center">
    <h4 class="text-purple text-center">
      Welcome, {{ fullName }}. Please select four mentors who you think would be
      the best fit to help you in this journey:
    </h4>
    <h4 class="text-purple text-center" v-if="4 - selectedMentors.length == 4">
      Please select: {{ 4 - selectedMentors.length }} mentors
    </h4>
    <h4
      class="text-purple text-center"
      v-if="4 - selectedMentors.length >= 2 && 4 - selectedMentors.length <= 3"
    >
      Please select: {{ 4 - selectedMentors.length }} more mentors
    </h4>
    <h4 class="text-purple text-center" v-if="4 - selectedMentors.length == 1">
      Please select: {{ 4 - selectedMentors.length }} more mentor
    </h4>
  </div>
  <div class="row d-flex justify-content-center align-items-center">
    <div
      class="row d-flex justify-content-center align-items-center text-purple w-25"
    >
      <div class="row mb-3">
        <div class="d-flex justify-content-center align-items-center">
          <img
            src="../../assets/images/mentor_1.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="d-flex justify-content-center align-items-center">
          <img
            src="../../assets/images/mentor_2.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="1"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_3.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="2"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_4.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="3"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_5.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="4"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_6.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="5"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_7.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="6"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_8.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="7"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_9.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="8"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_10.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="d-flex justify-content-center align-items-center">
          <img
            src="../../assets/images/mentor_11.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="9"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_12.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="10"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_13.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="11"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_14.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="form-check d-flex justify-content-center align-items-center"
        >
          <input
            class="form-check-input custom-checkbox"
            type="checkbox"
            :value="12"
            v-model="selectedMentors"
            id="flexCheckDefault"
          /><img
            src="../../assets/images/mentor_15.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="d-flex justify-content-center align-items-center">
          <img
            src="../../assets/images/mentor_16.png"
            alt="checkbox"
            class="ml-2"
            style="width: 800px; height: 400px"
          />
        </div>
      </div>
      <div class="row mb-3 justify-content-center align-items-center">
        <button
          v-if="selectedMentors.length === 4"
          class="btn btnPurplePillLight dynamic-width"
          @click="insertMentors"
        >
          Next
        </button>
      </div>
    </div>
  </div>
  <ModalSuccessSelection />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import "../../assets/body-bg.css";
import ModalSuccessSelection from "./ModalSuccessSelection.vue";
import axios from "axios";
import * as bootstrap from "bootstrap";

//   import { login } from "../../api/server";

export default defineComponent({
  name: "MenotrsComponents",
  components: {
    ModalSuccessSelection,
  },
  data() {
    return {
      fullName: "",
      title: "",
      entity: "",
      email: "",
      mobile: "",
      mentors: [
        { image: "@assets/images/mentor_1.png" },
        { image: "../../assets/images/mentor_2.png" },
        { image: "../../assets/images/mentor_3.png" },
        { image: "../../assets/images/mentor_4.png" },
      ],

      selectedMentors: [],
    };
  },
  mounted() {
    const { fullName, title, entity, email, mobile } = this.$route.query;
    this.fullName = fullName as string;
    this.title = title as string;
    this.entity = entity as string;
    this.email = email as string;
    this.mobile = mobile as string;
    // Use the data as needed
  },
  methods: {
    getImageSrc(imagePath: string) {
      try {
        return new URL(`@/assets/${imagePath}`, import.meta.url).href;
      } catch (error) {
        console.error("Error loading image:", error);
        return "";
      }
    },
    async insertMentors() {
      try {
        Swal.fire({
          title: "Sending...",
          text: "Sending your mentor selection",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const participant = {
          full_name: this.fullName,
          title: this.title,
          entity: this.entity,
          email: this.email,
          mobile: this.mobile,
        };

        const response = await fetch(
          "http://api.dev-miles.com/ewc/insert_mentors",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...participant,
              mentor_ids: this.selectedMentors,
            }),
          }
        );

        const result = await response.json();

        if (response.status === 200) {
          // Send email
          Swal.close();
          Swal.fire({
            title: "Emailing...",
            text: "Sending email to admin for assignment",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          const emailResponse = await fetch(
            "http://api.dev-miles.com/ewc/send_email_no_attachments",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                full_name: this.fullName,
                email: this.email,
                body: "<html><body><h1>Thank you for submitting your selection.</h1><h1>Our team will send an email to confirm your mentor.</h1></body></html>",
              }),
            }
          );

          const emailResult = await emailResponse.json();
          if (emailResponse.ok) {
            Swal.close();
            console.log("Email sent successfully:", emailResult);
            Swal.close();
            const modalElement = document.getElementById(
              "successSelectionModal"
            );
            if (modalElement) {
              const modal = new bootstrap.Modal(modalElement);
              modal.show();
            } else {
              console.error("Modal element not found");
            }
          } else {
            console.error("Error sending email:", emailResult.error);
          }
        } else {
          console.error(
            "Error inserting mentors:"
            // result.error
          );
        }
      } catch (error) {
        console.error("Error:");
      }
    },
  },
});
</script>

<style scoped>
.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #69478e;
  border-radius: 3px;
  background-color: white;
  cursor: pointer;
  position: relative;
}

.custom-checkbox:checked {
  background-color: #69478e;
  border-color: #69478e;
}

.ml-2 {
  margin-left: 0.5rem;
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
