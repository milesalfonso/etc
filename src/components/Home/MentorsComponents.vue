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
    <h4 class="text-purple text-center">Welcome, {{ fullName }}.</h4>
    <h4 class="text-purple text-center">
      Please select four mentors who you think would be the best fit to help you
      in this journey.
    </h4>
  </div>
  <div class="row d-flex justify-content-center align-items-center">
    <div
      class="row d-flex justify-content-center align-items-center text-purple w-50"
    >
      <div class="row mb-3">
        <div class="col-md-3 mb-3">
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="1"
              :checked="selectedMentors.includes(1)"
              @change="toggleMentorSelection(1)"
              :disabled="
                !selectedMentors.includes(1) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 1"
            /><img
              src="../../assets/images/mentor_0.png"
              alt="arati"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="2"
              :checked="selectedMentors.includes(2)"
              @change="toggleMentorSelection(2)"
              :disabled="
                !selectedMentors.includes(2) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 2"
            /><img
              src="../../assets/images/mentor_1.png"
              alt="nahmita"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="3"
              :checked="selectedMentors.includes(3)"
              @change="toggleMentorSelection(3)"
              :disabled="
                !selectedMentors.includes(3) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 3"
            /><img
              src="../../assets/images/mentor_2.png"
              alt="aisha"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="4"
              :checked="selectedMentors.includes(4)"
              @change="toggleMentorSelection(4)"
              :disabled="
                !selectedMentors.includes(4) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 4"
            /><img
              src="../../assets/images/mentor_3.png"
              alt="drmona"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="5"
              :checked="selectedMentors.includes(5)"
              @change="toggleMentorSelection(5)"
              :disabled="
                !selectedMentors.includes(5) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 5"
            /><img
              src="../../assets/images/mentor_4.png"
              alt="nada"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="6"
              :checked="selectedMentors.includes(6)"
              @change="toggleMentorSelection(6)"
              :disabled="
                !selectedMentors.includes(6) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 6"
            /><img
              src="../../assets/images/mentor_5.png"
              alt="simar"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="7"
              :checked="selectedMentors.includes(7)"
              @change="toggleMentorSelection(7)"
              :disabled="
                !selectedMentors.includes(7) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 7"
            /><img
              src="../../assets/images/mentor_6.png"
              alt="nervana"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="8"
              :checked="selectedMentors.includes(8)"
              @change="toggleMentorSelection(8)"
              :disabled="
                !selectedMentors.includes(8) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 8"
            /><img
              src="../../assets/images/mentor_7.png"
              alt="nataliya"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="9"
              :checked="selectedMentors.includes(9)"
              @change="toggleMentorSelection(9)"
              :disabled="
                !selectedMentors.includes(9) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 9"
            /><img
              src="../../assets/images/mentor_8.png"
              alt="jameela"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="10"
              :checked="selectedMentors.includes(10)"
              @change="toggleMentorSelection(10)"
              :disabled="
                !selectedMentors.includes(10) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 10"
            /><img
              src="../../assets/images/mentor_9.png"
              alt="dromneya"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="11"
              :checked="selectedMentors.includes(11)"
              @change="toggleMentorSelection(11)"
              :disabled="
                !selectedMentors.includes(11) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 11"
            /><img
              src="../../assets/images/mentor_10.png"
              alt="sarah"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
          <div
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              :value="12"
              :checked="selectedMentors.includes(12)"
              @change="toggleMentorSelection(12)"
              :disabled="
                !selectedMentors.includes(12) && selectedMentors.length >= 4
              "
              :id="'flexCheckDefault' + 12"
            /><img
              src="../../assets/images/mentor_11.png"
              alt="israa"
              class="ml-2"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>
      </div>

      <div class="row mb-3 justify-content-center align-items-center">
        <button
          :class="
            selectedMentors.length === 4
              ? 'btn btnPurplePillLight dynamic-width'
              : 'btn btnGrey dynamic-width'
          "
          @click="insertMentors"
          :disabled="selectedMentors.length !== 4"
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
        { id: 1, name: "arati", image: "../../assets/images/mentor_0.png" },
        { id: 2, name: "nahmita", image: "../../assets/images/mentor_1.png" },
        { id: 3, name: "aisha", image: "../../assets/images/mentor_2.png" },
        { id: 4, name: "drmona", image: "../../assets/images/mentor_3.png" },
        { id: 5, name: "nada", image: "../../assets/images/mentor_4.png" },
        { id: 6, name: "simar", image: "../../assets/images/mentor_5.png" },
        { id: 7, name: "nervana", image: "../../assets/images/mentor_6.png" },
        { id: 8, name: "nataliya", image: "../../assets/images/mentor_7.png" },
        { id: 9, name: "jameela", image: "../../assets/images/mentor_8.png" },
        { id: 10, name: "dromneya", image: "../../assets/images/mentor_9.png" },
        { id: 11, name: "sarah", image: "../../assets/images/mentor_10.png" },
        { id: 12, name: "israa", image: "../../assets/images/mentor_11.png" },
      ],

      selectedMentors: [] as number[],
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
    toggleMentorSelection(mentorId: number) {
      const index = this.selectedMentors.indexOf(mentorId);
      if (index > -1) {
        this.selectedMentors.splice(index, 1);
      } else if (this.selectedMentors.length < 4) {
        this.selectedMentors.push(mentorId);
      }
    },
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
          "https://api.dev-miles.com/ewc/insert_mentors",
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
            "https://api.dev-miles.com/ewc/send_email_no_attachments",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                full_name: this.fullName,
                email: this.email,
                subject: "EWC | EWC Program Matchmaking In Progress - 2025",
                body: `<!DOCTYPE html>
                        <html>
                            <body style="text-align: center;">
                            <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                                <img src="https://angelicahenson.com/wp-content/uploads/2025/01/Pure-Health_Header.png" alt="Email Banner" style="width: 100%; max-width: 600px;"/>
                                <p style="text-align: left;">Dear 2025 Candidate,</p>
                                <p style="text-align: left;">We are pleased to inform you that your selection has been submitted to the EWC Team for review.</p>
                                <p style="text-align: left;">You will be notified via email once the matchmaking process is complete.</p>
                                <p style="text-align: left;">Thank you, and we look forward to your continued engagement in the program.</p>
                                <p style="text-align: left;">Best regards,</p>
                                <p style="text-align: left;">EWC Team</p>
                            </div>
                            </body>
                        </html>`,
              }),
            }
          );

          const emailResult = await emailResponse.json();
          if (emailResponse.ok) {
            Swal.close();
            console.log("Email sent successfully:", emailResult);
            this.$router.push("/thank-you");
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

.custom-checkbox:disabled {
  background-color: #d3d3d3;
  border-color: #d3d3d3;
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
