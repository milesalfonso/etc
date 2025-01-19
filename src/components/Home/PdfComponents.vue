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
  <div id="pdf-content">
    <div class="row mb-3 justify-content-center">
      <div
        class="row d-flex justify-content-center align-items-center text-purple"
      >
        <div class="row mb-3 justify-content-center">
          <div class="col-auto">
            <h4 class="text-center">Enrollment Undertaking</h4>
            <h4 class="text-center">Emirati Women Chapter (EWC)</h4>
            <h4 class="text-center">January -Nov 2025</h4>
          </div>
        </div>
        <div class="row mb-0 justify-content-center">
          <div class="col-auto">
            <p class="text-left mb-0">
              <span style="font-weight: bold">WHEREAS</span> , Pure Health
              Holding PJSC (hereby referred to as “Pure Health”) agrees to
              sponsor the EWC Candidates for the
              <span style="font-weight: bold">EWC Development Program</span> .
            </p>
            <p class="text-left">
              <span style="font-weight: bold">WHEREAS</span> , the undersigned,
              Name:
              <span style="text-decoration: underline; font-weight: bold">{{
                fullName
              }}</span>
              EID no:
              <span style="text-decoration: underline; font-weight: bold">{{
                mobile
              }}</span>
              (hereinafter referred to as the "
              <span style="font-weight: bold">Mentee</span> "), wishes to attend
              the EWC Program to develop her skills and expertise. NOW,
              THEREFORE, in consideration of the opportunity to participate in
              the EWC Program, the Mentee hereby undertakes to the following
              obligations:
            </p>
          </div>
        </div>
        <div class="row mb-0 justify-content-center">
          <div class="col-auto">
            <ol>
              <li>
                <span style="font-weight: bold">Active Participation:</span> The
                Mentee shall actively participate in the learning process and
                dedicate the necessary time and effort to achieve the set
                learning objectives.
              </li>
              <li>
                <span style="font-weight: bold">Attendance:</span> The Mentee
                shall attend 100% of the scheduled learning sessions, workshops,
                or activities related to the learning objectives and shall
                complete all assigned tasks and assignments on time.
              </li>
              <li>
                <span style="font-weight: bold">Prerequisites:</span> The Mentee
                shall possess the basic skills, knowledge, and prerequisites
                necessary to successfully pursue this learning objective.
              </li>
              <li>
                <span style="font-weight: bold">Seeking Assistance:</span> The
                Mentee shall proactively seek assistance or guidance from
                mentors, trainers, or relevant resources as needed.
              </li>
              <li>
                <span style="font-weight: bold"
                  >Self-Reflection and Assessment:</span
                >
                The Mentee shall engage in regular self-reflection and assess
                her progress to identify areas for improvement.
              </li>
              <li>
                <span style="font-weight: bold">Active Engagement:</span> The
                Mentee shall actively participate in interactive activities,
                discussions, or assessments to enhance her capabilities in
                achieving the desired learning outcomes.
              </li>
            </ol>
          </div>
        </div>
        <div class="row mb-5 justify-content-center">
          <div class="col">
            <div
              style="
                border-bottom: 1px solid #69478e;
                display: inline-block;
                padding-bottom: 5px;
              "
            >
              <img :src="waiver_signature" style="width: 50%" />
            </div>
            <p class="mb-0">Signature of Mentee:</p>
            <p class="mb-0">Name: {{ fullName }}</p>
            <p class="mb-0">Date: {{ getCurrentDate() }}</p>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-auto">
            <p class="text-left">
              By signing this agreement, you grant the EWC Program and its
              affiliates a perpetual, irrevocable, non-exclusive, royalty-free
              license to use, modify, and distribute any photographs, videos, or
              other content captured or provided during your participation. Such
              materials may be used for branding, promotional, and marketing
              purposes across various media. Furthermore, you acknowledge that
              no compensation will be provided for such use and you agree to
              waive any claims regarding publicity, privacy, or moral rights
              related to the content's use.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mb-5 justify-content-center align-items-center">
    <div class="col-auto text-center">
      <div class="form-check">
        <input
          class="form-check-input custom-checkbox me-3"
          type="checkbox"
          v-model="agreement"
          id="termsCheck"
        />
        <label class="form-check-label me-3" for="termsCheck">
          By signing, you agree to the
          <router-link
            :to="{
              path: '/terms-and-conditions',
            }"
            target="_blank"
          >
            Terms and Conditions
          </router-link></label
        >
      </div>
      <button
        v-if="waiver_signature === ''"
        class="btn btnPurplePillLight dynamic-width mt-3"
        data-bs-toggle="modal"
        data-bs-target="#signatureModal"
      >
        SIGN
      </button>
      <button
        v-if="waiver_signature !== '' && agreement"
        class="btn btnPurplePillLight dynamic-width mt-3"
        @click="enroll"
      >
        ENROLL
      </button>
    </div>
  </div>
  <ModalSignature
    @signature-added="updateSignature"
    @close-modal="closeModal"
  />
  <ModalSuccess />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import * as bootstrap from "bootstrap";
import "../../assets/body-bg.css";
import ModalSignature from "./ModalSignature.vue";
import ModalSuccess from "./ModalSuccess.vue";
import axios from "axios";
import html2pdf from "html2pdf.js";

export default defineComponent({
  name: "PdfComponents",
  components: {
    ModalSignature,
    ModalSuccess,
  },
  data() {
    return {
      waiver_signature: "",
      fullName: "",
      title: "",
      entity: "",
      email: "",
      mobile: "",
      pdfBase64: "",
      agreement: false,
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
    async generatePdf() {
      const element = document.getElementById("pdf-content");
      if (element) {
        const opt = {
          margin: 1,
          filename: "document.pdf",
          image: { type: "jpeg", quality: 0.75 }, // Reduce image quality to 75%
          html2canvas: { scale: 1.5 }, // Reduce the scale to 1.5
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        const pdf = await html2pdf()
          .from(element)
          .set(opt)
          .outputPdf("datauristring");
        this.pdfBase64 = pdf.split(",")[1]; // Get base64 part of the data URI
      } else {
        console.error("PDF content element not found");
      }
    },
    getCurrentDate() {
      const now = new Date();
      const options = {
        timeZone: "Asia/Dubai", // GMT+8 timezone
        year: "numeric" as "numeric",
        month: "2-digit" as "2-digit",
        day: "2-digit" as "2-digit",
      };
      return new Intl.DateTimeFormat("en-US", options).format(now);
    },
    updateSignature(dataUrl: { data: string }) {
      this.waiver_signature = dataUrl.data;
    },
    closeModal() {
      // Logic to close the modal
    },
    async enroll() {
      try {
        Swal.fire({
          title: "Enrolling...",
          text: "Enrolling to the program",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        console.log("Enrolling...");

        // Generate PDF
        await this.generatePdf();

        const participant = {
          full_name: this.fullName,
          title: this.title,
          entity: this.entity,
          email: this.email,
          mobile: this.mobile,
          signature: this.waiver_signature,
        };

        // Insert participant
        const participantResponse = await axios.post(
          "https://api.dev-miles.com/ewc/insert-track1-participants",
          {
            ...participant,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Participant response:", participantResponse);
        const participantResult = participantResponse.data;

        if (participantResponse.status === 200) {
          Swal.close();
          Swal.fire({
            title: "Emailing...",
            text: "Emailing signed PDF",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          console.log("Participant inserted successfully:", participantResult);

          // Send email with PDF attachment
          const emailResponse = await fetch(
            "https://api.dev-miles.com/ewc/send-email",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                full_name: this.fullName,
                email: this.email,
                pdfBase64: this.pdfBase64,
                body: `<!DOCTYPE html><body><h1>A new enrollment has been submitted for ${this.fullName}</h1></body></html>`,
              }),
            }
          );

          const emailResult = await emailResponse.json();
          if (emailResponse.ok) {
            Swal.close();
            console.log("Email sent successfully:", emailResult);
            // Show success modal
            const modalElement = document.getElementById("successModal");
            if (modalElement) {
              const modal = new bootstrap.Modal(modalElement);
              modal.show();
            } else {
              console.error("Modal element not found");
            }
          } else {
            console.error("Error sending email:", emailResult.error);
          }
          const modalElement = document.getElementById("successModal");
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          } else {
            console.error("Modal element not found");
          }
        } else {
          console.error(
            "Error inserting participant:"
            // participantResult.error
          );
        }
      } catch (error) {
        console.error("Error:", error);
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
</style>
