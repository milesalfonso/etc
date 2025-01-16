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
        <h1 class="text-center">Welcome to the EWC Passion Goal</h1>
      </div>
    </div>
  </div>
  <div id="pdf-content">
    <div class="row mb-3 justify-content-center">
      <div
        class="row d-flex justify-content-center align-items-center text-purple"
      >
        <div class="row mb-3">
          <h1 class="text-center">
            Emirati Women Chapter (EWC) - Enrollment Form Duration from February
            - August 2024 (6 months)
          </h1>
        </div>
        <div class="row mb-5">
          <h3>
            Under the sponsorship of Pure Health Medical Supplies Company
            incorporated in Dubai with Commercial License Number 678868 (hereby
            referred to as “PureHealth”) and the program applicant classified
            below, in which this form commit the candidate in this terms to
            perform as per the expected plan and this application form terms
            mentioned below:
          </h3>
        </div>
        <div class="row mb-3">
          <div class="col-8">
            <div class="row mb-3">
              <h2>EWC Candidate for Track 1- Personal Passion Goal</h2>
            </div>
            <div class="row">
              <h2>Name: {{ fullName }}</h2>
            </div>
            <div class="row">
              <h2>Title: {{ title }}</h2>
            </div>
            <div class="row">
              <h2>Entity: {{ entity }}</h2>
            </div>
          </div>
        </div>
        <div class="row">
          · The EWC candidate should commit to actively participating in the
          learning process and dedicate the necessary time and effort to achieve
          the set learning objective.
        </div>
        <div class="row">
          · The EWC candidate should attend 100% of the scheduled learning
          sessions, workshops, or activities related to the learning objective
          (wherever applicable), and complete assigned tasks and assignments on
          time.
        </div>
        <div class="row">
          · The EWC candidate should possess the basic skills, knowledge, and
          prerequisites needed to pursue this learning objective.
        </div>
        <div class="row">
          · The EWC candidate should proactively seek assistance or guidance
          from mentors, trainers, or relevant resources.
        </div>
        <div class="row">
          · The EWC candidate should engage in self-reflection and assess her
          progress regularly to identify areas for improvement according to a
          Personal Development Plan that will be shared with the applicants.
        </div>
        <div class="row mb-3">
          · The EWC candidate should participate in interactive activities,
          discussions, or assessments to enhance her capability in the desired
          learning outcome.
        </div>
        <div class="row mb-3">
          <div class="col-8">
            <div class="row">
              <h2>Name: {{ fullName }}</h2>
            </div>
            <div class="row">
              <h2>Date: {{ getCurrentDate() }}</h2>
            </div>
            <div class="row">
              <h2>
                Signature:
                <img :src="waiver_signature" style="width: 50%" />
              </h2>
            </div>
          </div>
        </div>
        <div class="row mb-5">
          PureHealth agrees to sponsor the EWC Candidates for the EWC
          Development Program, effective on the date of signing this Form by
          Candidate of Track 1 . Considering designing a constructive plan to
          develop the required skills for the program candidates, through well
          selected topics and Subject Matter Experts (SME) that fit the passion
          of the candidate as required.
        </div>
      </div>
    </div>
  </div>
  <div class="row mb-5 justify-content-center align-items-center">
    <button
      v-if="waiver_signature === ''"
      class="btn btnPurplePillLight dynamic-width"
      data-bs-toggle="modal"
      data-bs-target="#signatureModal"
    >
      SIGN
    </button>
    <button
      v-if="waiver_signature !== ''"
      class="btn btnPurplePillLight dynamic-width"
      @click="enroll"
    >
      ENROLL
    </button>
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
              }),
            }
          );

          const emailResult = await emailResponse.json();
          if (emailResponse.ok) {
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
          // const modalElement = document.getElementById("successModal");
          // if (modalElement) {
          //   const modal = new bootstrap.Modal(modalElement);
          //   modal.show();
          // } else {
          //   console.error("Modal element not found");
          // }
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
</style>
