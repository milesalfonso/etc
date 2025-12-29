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
        <h1 class="text-center">EMPOWER, INSPIRE, AND THRIVE</h1>
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
            <h4 class="text-center">Jan - Aug 2026</h4>
          </div>
        </div>
        <div class="row mb-0 justify-content-center">
          <div class="col-auto">
            <p class="text-left mb-0">
              Pure Health Medical Supplies LLC (hereby referred to as “Pure
              Health”) agrees to sponsor the EWC Candidates for the EWC
              Development Program, effective from the date of signing this form
              by the participant.
            </p>
            <p class="text-left">
              The participants undertake that they will commit and adhere to the
              terms and conditions of this undertaking form, in return Pure
              Health will consider designing a constructive plan to develop the
              required skills for the program participants, through
              well-selected topics and a skilled trainer acting as subject
              matter experts during the program.
            </p>
          </div>
        </div>
        <div class="row mb-5 justify-content-center">
          <div class="col">
            <div class="row" style="background-color: rgba(61, 61, 61, 0.5)">
              <p>EWC Participant - referred to as "Candidate"</p>
            </div>
            <p class="mb-0">Name: {{ fullName }}</p>
            <p class="mb-0">Title: {{ title }}</p>
            <p class="mb-0">Entity: {{ entity }}</p>
          </div>
        </div>
        <div class="row mb-0 justify-content-center">
          <hr />
          <h4 class="text-center">Participant's Commitments</h4>
          <hr />
        </div>
        <div class="row mb-0 justify-content-center">
          <div class="col-auto">
            <ul style="list-style-type: none; padding-left: 0">
              <li>
                <span style="font-weight: bold">Active Participation:</span
                ><span style="margin-left: 25px; margin-right: 25px">•</span>
                The EWC candidate should commit to actively participating in the
                learning process and dedicate the necessary time and effort to
                achieve the set learning objective.
              </li>
              <li>
                <span style="font-weight: bold">Attendance:</span
                ><span style="margin-left: 25px; margin-right: 25px">•</span>The
                EWC candidate should attend 100% of the scheduled learning
                sessions, workshops, or activities related to the learning
                objective, and complete assigned tasks and assignments on time.
              </li>
              <li>
                <span style="font-weight: bold">Prerequisites:</span
                ><span style="margin-left: 25px; margin-right: 25px">•</span>The
                EWC candidate should possess the basic skills, knowledge, and
                prerequisites needed to pursue this learning objective.
              </li>
              <li>
                <span style="font-weight: bold">Seeking Assistance:</span
                ><span style="margin-left: 25px; margin-right: 25px">•</span>The
                EWC candidate should proactively seek assistance or guidance
                from mentors, trainers, or relevant resources.
              </li>
              <li>
                <span style="font-weight: bold"
                  >Self-Reflection and Assessment:</span
                >
                <span style="margin-left: 25px; margin-right: 25px">•</span>The
                EWC candidate should engage in self-reflection and assess her
                progress regularly to identify areas for improvement, by
                responding to surveys and reflect networking on LinkedIn.
              </li>
              <li>
                <span style="font-weight: bold">Active Engagement:</span
                ><span style="margin-left: 25px; margin-right: 25px">•</span>The
                EWC candidate should participate in interactive activities,
                discussions, or assessments to enhance her capability in the
                desired learning outcome.
              </li>
            </ul>
          </div>
        </div>
        <div class="row mb-5 justify-content-center">
          <div class="col">
            <div class="row" style="background-color: rgba(61, 61, 61, 0.5)">
              <p>EWC Candidate - referred to as "Mentee"</p>
            </div>
            <p class="mb-0">Name: {{ fullName }}</p>
            <p class="mb-0">Date: {{ getCurrentDate() }}</p>
            <div
              style="
                border-bottom: 1px solid #69478e;
                display: inline-block;
                padding-bottom: 5px;
              "
            >
              <img :src="waiver_signature" style="width: 25%" />
            </div>
            <p class="mb-0">Signature:</p>
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
            <p>
              <span style="font-weight: bold"
                >During the 1:1 online session both camera for the mentees and
                mentors should be ON.</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mb-5 justify-content-center align-items-center">
    <div class="col-auto text-center">
      <div v-if="waiver_signature !== ''" class="form-check">
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
      <div class="row justify-content-center">
        <button
          v-if="waiver_signature === ''"
          class="btn btnPurplePillLight dynamic-width mt-3"
          data-bs-toggle="modal"
          data-bs-target="#signatureModal"
        >
          SIGN
        </button>
      </div>
      <div class="row justify-content-center">
        <button
          :class="{
            'btn btnPurplePillLight dynamic-width mt-3':
              waiver_signature !== '' && agreement,
            'btn btnGrey dynamic-width mt-3':
              waiver_signature === '' || !agreement,
          }"
          :disabled="waiver_signature === '' || !agreement"
          @click="enroll"
        >
          ENROLL
        </button>
      </div>
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
          "https://api.ewcprogram.com/insert-track1-participants",
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
          const emailParticipantResponse = await fetch(
            "https://api.ewcprogram.com/send-email",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                full_name: this.fullName,
                email: this.email,
                pdfBase64: this.pdfBase64,
                subject: "EWC | Successful Enrollment to the EWC Program 2025",
                body: `<!DOCTYPE html>
                        <html>
                            <body style="text-align: center;">
                            <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                                <img src="https://angelicahenson.com/wp-content/uploads/2025/01/Pure-Health_Header.png" alt="Email Banner" style="width: 100%; max-width: 600px;"/>
                                <p style="text-align: left;">Dear Mentee,</p>
                                <br>
                                <p style="text-align: left;">We are pleased to confirm that you have successfully enrolled in the Emirati Women Chapter (EWC) Program 2025.</p>
                                <p style="text-align: left;">You can now download the attached approved version of the signed agreement.</p>
                                <p style="text-align: left;">Thank you for your cooperation, and we look forward to a successful and engaging program experience.</p>
                                <br>
                                <p style="text-align: left;">Best regards,</p>
                                <p style="text-align: left;">The EWC Team</p>
                            </div>
                            </body>
                        </html>`,
              }),
            }
          );

          const emailOnboardingResponse = await fetch(
            "https://api.ewcprogram.com/send-email",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                full_name: this.fullName,
                email: "onboarding@ewc-program.ae",
                pdfBase64: this.pdfBase64,
                subject: "EWC | Successful Enrollment to the EWC Program 2025",
                body: `<!DOCTYPE html>
                        <html>
                            <body style="text-align: center;">
                            <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                                <img src="https://angelicahenson.com/wp-content/uploads/2025/01/Pure-Health_Header.png" alt="Email Banner" style="width: 100%; max-width: 600px;"/>
                                <p style="text-align: left;">Dear Mentee,</p>
                                <br>
                                <p style="text-align: left;">We are pleased to confirm that you have successfully enrolled in the Emirati Women Chapter (EWC) Program 2025.</p>
                                <p style="text-align: left;">You can now download the attached approved version of the signed agreement.</p>
                                <p style="text-align: left;">Thank you for your cooperation, and we look forward to a successful and engaging program experience.</p>
                                <br>
                                <p style="text-align: left;">Best regards,</p>
                                <p style="text-align: left;">The EWC Team</p>
                            </div>
                            </body>
                        </html>`,
              }),
            }
          );

          const emailEwcResponse = await fetch(
            "https://api.ewcprogram.com/send-email",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                full_name: this.fullName,
                email: "emiratiwomenchapter@purehealth.ae",
                pdfBase64: this.pdfBase64,
                subject: "EWC | Successful Enrollment to the EWC Program 2025",
                body: `<!DOCTYPE html>
                        <html>
                            <body style="text-align: center;">
                            <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                                <img src="https://angelicahenson.com/wp-content/uploads/2025/01/Pure-Health_Header.png" alt="Email Banner" style="width: 100%; max-width: 600px;"/>
                                <p style="text-align: left;">Dear Mentee,</p>
                                <br>
                                <p style="text-align: left;">We are pleased to confirm that you have successfully enrolled in the Emirati Women Chapter (EWC) Program 2025.</p>
                                <p style="text-align: left;">You can now download the attached approved version of the signed agreement.</p>
                                <p style="text-align: left;">Thank you for your cooperation, and we look forward to a successful and engaging program experience.</p>
                                <br>
                                <p style="text-align: left;">Best regards,</p>
                                <p style="text-align: left;">The EWC Team</p>
                            </div>
                            </body>
                        </html>`,
              }),
            }
          );

          const emailParticipantResult = await emailParticipantResponse.json();
          const emailOnboardingResult = await emailOnboardingResponse.json();
          const emailEwcResult = await emailEwcResponse.json();

          if (
            emailParticipantResponse.ok &&
            emailOnboardingResponse.ok &&
            emailEwcResponse.ok
          ) {
            Swal.close();
            console.log("Email sent successfully:", emailParticipantResult);
            console.log("Email sent successfully:", emailOnboardingResult);
            console.log("Email sent successfully:", emailEwcResult);
            // Show success modal
            this.$router.push("/thank-you-participant");
          } else {
            console.error("Error sending email:", emailParticipantResult.error);
            console.error("Error sending email:", emailOnboardingResult.error);
            console.error("Error sending email:", emailEwcResult.error);
          }
          this.$router.push("/thank-you-participant");
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
