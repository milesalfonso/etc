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
        <div class="row mb-3 justify-content-center">
          <div class="col-auto">
            <p class="text-left mb-3">
              Pure Health Holding PJSC (hereby referred to as “Pure Health”)
              agrees to sponsor the EWC Candidates for the EWC Development
              Program, effective from the date of signing this form by the
              Mentee and Personal Mentor named below.
            </p>
            <p class="text-left mb-0">
              Mentee and Personal Mentor undertake that they will commit and
              adhere to the terms and conditions of this undertaking form, in
              return Pure Health will consider designing a constructive plan to
              develop the required skills for the program candidates, through
              well-selected topics and a skilled personal coach acting as a
              Personal Mentor (PM) during the program.
            </p>
          </div>
        </div>
        <div class="row mb-5 justify-content-center">
          <div class="col-6">
            <div class="row" style="background-color: rgba(61, 61, 61, 0.5)">
              <p>EWC Candidate - referred to as “Mentee”</p>
            </div>
            <p>Name: {{ participant_name }}</p>
            <p>Title: {{ participant_title }}</p>
            <p>Entity: {{ participant_entity }}</p>
          </div>
          <div class="col-6">
            <div class="row" style="background-color: rgba(61, 61, 61, 0.5)">
              <p>Personal coach- referred to as “Personal Mentor”</p>
            </div>
            <p>Name: {{ mentor_name }}</p>
            <p>Title: {{ mentor_title }}</p>
            <p>Entity: {{ mentor_entity }}</p>
          </div>
        </div>
        <div class="row mb-0 justify-content-center">
          <div class="col-6">
            <hr />
            <p class="text-center">Mentee`s Commitments</p>
            <hr />
            <ul>
              <li>
                The Mentee shall actively participate in the learning process
                and dedicate the necessary time and effort to achieve the set
                learning objectives.
              </li>
              <li>
                The Mentee shall attend 100% of the scheduled learning sessions,
                workshops, or activities related to the learning objective, and
                complete assigned tasks and assignments on time.
              </li>
              <li>
                The Mentee shall possess the basic skills, knowledge, and
                prerequisites necessary to successfully pursue this learning
                objective.
              </li>
              <li>
                The Mentee shall proactively seek assistance or guidance from
                mentors, trainers, or relevant resources as needed.
              </li>
              <li>
                The Mentee should engage in self-reflection and assess her
                progress regularly to identify areas for improvement.
              </li>
              <li>
                The Mentee shall participate in interactive activities,
                discussions, or assessments to enhance her capability in
                achieving desired learning outcomes.
              </li>
            </ul>
          </div>
          <div class="col-6">
            <hr />
            <p class="text-center">Personal Mentor`s Commitments</p>
            <hr />
            <ul>
              <li>
                The EWC Personal Mentor (PM) should commit to actively
                participating in the learning process and dedicate the necessary
                time and effort to achieve the set learning objective for the
                program candidates.
              </li>
              <li>
                The PM should attend 100% of the scheduled learning sessions,
                workshops, or activities related to the learning personal
                objectives of the assigned development plan, and complete tasks
                and assignments of the master tracker and individual sessions
                designed based on the developed planner.
              </li>
              <li>
                Pure Health supports the learning required expenses to ensure a
                professional efficient development plan for the program
                candidates- based on the Mentorship agreement requirements.
              </li>
              <li>
                Design and oversight the customized development plan for the
                assigned candidates and act as a case manager to collaborate on
                the program phases inquires.
              </li>
            </ul>
          </div>
        </div>
        <div class="row mb-5 justify-content-center">
          <div class="col-6">
            <div class="row" style="background-color: rgba(61, 61, 61, 0.5)">
              <p>EWC Candidate - referred to as “Mentee”</p>
            </div>
            <p>Name: {{ participant_name }}</p>
            <p>
              Date:
              {{
                participant_signed_date == "" || participant_signed_date == null
                  ? getCurrentDate()
                  : participant_signed_date
              }}
            </p>
            <p>
              Signature: <img :src="participant_signature" style="width: 50%" />
            </p>
          </div>
          <div class="col-6">
            <div class="row" style="background-color: rgba(61, 61, 61, 0.5)">
              <p>Personal coach- referred to as “Personal Mentor”</p>
            </div>
            <p>Name: {{ mentor_name }}</p>
            <p>
              Date:
              {{
                mentor_signed_date == "" || mentor_signed_date == null
                  ? getCurrentDate()
                  : mentor_signed_date
              }}
            </p>
            <p>Signature: <img :src="mentor_signature" style="width: 50%" /></p>
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
    <div class="row mb-3 justify-content-center align-items-center">
      <div class="col-auto">
        <button
          v-if="mentor_signature === '' || mentor_signature === null"
          class="btn btnPurplePillLight dynamic-width"
          data-bs-toggle="modal"
          data-bs-target="#signatureTrack2Modal"
        >
          SIGN
        </button>
      </div>
    </div>
    <div class="row mb-3 justify-content-center align-items-center">
      <div class="col-auto">
        <button
          :class="{
            'btn btnPurplePillLight dynamic-width':
              mentor_signature !== '' && mentor_signature !== null,
            'btn btnGrey dynamic-width':
              mentor_signature === '' || mentor_signature === null,
          }"
          :disabled="mentor_signature === '' || mentor_signature === null"
          @click="enroll"
        >
          SUBMIT
        </button>
      </div>
    </div>
  </div>
  <ModalSignatureTrack2
    :id="id"
    :date="participant_signed_date"
    :type="'mentor'"
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
import "../../assets/body-bg.css";
import ModalSignatureTrack2 from "./ModalSignatureTrack2.vue";
import ModalSuccess from "./ModalSuccess.vue";
//   import { login } from "../../api/server";
import axios from "axios";
import html2pdf from "html2pdf.js";
import * as bootstrap from "bootstrap";

export default defineComponent({
  name: "HomeCompoonents",
  components: {
    ModalSignatureTrack2,
    ModalSuccess,
  },
  data() {
    return {
      id: "",
      mentor_id: "",
      participant_id: "",
      participant_signature: "",
      mentor_signature: "",
      participant_signed_date: "",
      mentor_signed_date: "",
      participant_name: "",
      participant_title: "",
      participant_entity: "",
      mentor_name: "",
      mentor_title: "",
      mentor_entity: "",
      participant_email: "",
      mentor_email: "",
      pdfBase64: "",
    };
  },
  mounted() {
    const { id, participant_id, mentor_id } = this.$route.query;
    this.id = id as string;
    this.participant_id = participant_id as string;
    this.mentor_id = mentor_id as string;
    this.fetchTrack2Participant(this.id);
    // Use the data as needed
  },
  methods: {
    async fetchTrack2Participant(id: string) {
      try {
        Swal.fire({
          title: "Generating...",
          text: "Generating document",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const response = await axios.get(
          "https://api.dev-miles.com/ewc/fetch_track_2_participant",
          {
            params: {
              id: id,
            },
          }
        );
        if (response.status === 200) {
          const participantData = response.data;
          this.participant_signature = participantData.participant_signature;
          this.mentor_signature = participantData.mentor_signature;
          this.participant_signed_date =
            participantData.participant_signed_date;
          this.mentor_signed_date = participantData.mentor_signed_date;
          this.participant_name = participantData.participant_name;
          this.participant_title = participantData.participant_title;
          this.participant_entity = participantData.participant_entity;
          this.mentor_name = participantData.mentor_name;
          this.mentor_title = participantData.mentor_title;
          this.mentor_entity = participantData.mentor_entity;
          this.participant_email = participantData.participant_email;
          this.mentor_email = participantData.mentor_email;

          console.log("Fetched participant data:", participantData);
          Swal.close();
        } else {
          console.error("Error fetching participant data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching participant data:", error);
      }
    },
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
    async enroll() {
      try {
        // Generate PDF
        await this.generatePdf();

        Swal.fire({
          title: "Emailing...",
          text: "Emailing signed PDF",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Send email with PDF attachment
        const emailParticipantResponse = await fetch(
          "https://api.dev-miles.com/ewc/send-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              full_name: this.participant_name,
              email: this.participant_email,
              pdfBase64: this.pdfBase64,
              subject:
                "EWC | Signed Undertaking Agreement for EWC Program - 2025",
              body: `<!DOCTYPE html>
                      <html>
                        <body style="text-align: center;">
                          <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                            <img src="https://angelicahenson.com/wp-content/uploads/2025/01/Pure-Health_Header.png" alt="Email Banner" style="width: 100%; max-width: 600px;"/>
                            <p  style="text-align: left;">Dear Mentor & Mentee,</p>
                            <br>
                            <p  style="text-align: left;">We are pleased to confirm that the Undertaking Agreement for the Emirati Women Chapter (EWC) Program 2025 has been successfully signed by both of you.</p>
                            <p  style="text-align: left;">You can now download the attached approved version of the signed agreement.</p>
                            <p  style="text-align: left;">The EWC Management was notified that the process has been completed.</p>
                            <p  style="text-align: left;">Thank you for your cooperation, and we look forward to a successful and engaging program experience.</p>
                            <br>
                            <p  style="text-align: left;">Best Regards,</p>
                            <p  style="text-align: left;">The EWC Team</p>
                          </div>
                        </body>
                      </html>`,
            }),
          }
        );

        const emailMentorResponse = await fetch(
          "https://api.dev-miles.com/ewc/send-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              full_name: this.participant_name,
              email: this.mentor_email,
              pdfBase64: this.pdfBase64,
              subject:
                "EWC | Signed Undertaking Agreement for EWC Program - 2025",
              body: `<!DOCTYPE html>
                      <html>
                        <body style="text-align: center;">
                          <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                            <img src="https://angelicahenson.com/wp-content/uploads/2025/01/Pure-Health_Header.png" alt="Email Banner" style="width: 100%; max-width: 600px;"/>
                            <p  style="text-align: left;">Dear Mentor & Mentee,</p>
                            <br>
                            <p  style="text-align: left;">We are pleased to confirm that the Undertaking Agreement for the Emirati Women Chapter (EWC) Program 2025 has been successfully signed by both of you.</p>
                            <p  style="text-align: left;">You can now download the attached approved version of the signed agreement.</p>
                            <p  style="text-align: left;">The EWC Management was notified that the process has been completed.</p>
                            <p  style="text-align: left;">Thank you for your cooperation, and we look forward to a successful and engaging program experience.</p>
                            <br>
                            <p  style="text-align: left;">Best Regards,</p>
                            <p  style="text-align: left;">The EWC Team</p>
                          </div>
                        </body>
                      </html>`,
            }),
          }
        );

        const emailAdmin1Response = await fetch(
          "https://api.dev-miles.com/ewc/send-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              full_name: this.participant_name,
              email: "emiratiwomenchapter@purehealth.ae",
              pdfBase64: this.pdfBase64,
              subject:
                "EWC | Signed Undertaking Agreement for EWC Program - 2025",
              body: `<!DOCTYPE html>
                      <html>
                        <body style="text-align: center;">
                          <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                            <img src="https://angelicahenson.com/wp-content/uploads/2025/01/Pure-Health_Header.png" alt="Email Banner" style="width: 100%; max-width: 600px;"/>
                            <p  style="text-align: left;">Dear Mentor & Mentee,</p>
                            <br>
                            <p  style="text-align: left;">We are pleased to confirm that the Undertaking Agreement for the Emirati Women Chapter (EWC) Program 2025 has been successfully signed by both of you.</p>
                            <p  style="text-align: left;">You can now download the attached approved version of the signed agreement.</p>
                            <p  style="text-align: left;">The EWC Management was notified that the process has been completed.</p>
                            <p  style="text-align: left;">Thank you for your cooperation, and we look forward to a successful and engaging program experience.</p>
                            <br>
                            <p  style="text-align: left;">Best Regards,</p>
                            <p  style="text-align: left;">The EWC Team</p>
                          </div>
                        </body>
                      </html>`,
            }),
          }
        );

        const emailAdmin2Response = await fetch(
          "https://api.dev-miles.com/ewc/send-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              full_name: this.participant_name,
              email: "onboarding@ewc-program.ae",
              pdfBase64: this.pdfBase64,
              subject:
                "EWC | Signed Undertaking Agreement for EWC Program - 2025",
              body: `<!DOCTYPE html>
                      <html>
                        <body style="text-align: center;">
                          <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                            <img src="https://angelicahenson.com/wp-content/uploads/2025/01/Pure-Health_Header.png" alt="Email Banner" style="width: 100%; max-width: 600px;"/>
                            <p  style="text-align: left;">Dear Mentor & Mentee,</p>
                            <br>
                            <p  style="text-align: left;">We are pleased to confirm that the Undertaking Agreement for the Emirati Women Chapter (EWC) Program 2025 has been successfully signed by both of you.</p>
                            <p  style="text-align: left;">You can now download the attached approved version of the signed agreement.</p>
                            <p  style="text-align: left;">The EWC Management was notified that the process has been completed.</p>
                            <p  style="text-align: left;">Thank you for your cooperation, and we look forward to a successful and engaging program experience.</p>
                            <br>
                            <p  style="text-align: left;">Best Regards,</p>
                            <p  style="text-align: left;">The EWC Team</p>
                          </div>
                        </body>
                      </html>`,
            }),
          }
        );

        const emailParticipantResult = await emailParticipantResponse.json();
        const emailMentorResult = await emailMentorResponse.json();
        const emailAdmin1Result = await emailAdmin1Response.json();
        const emailAdmin2Result = await emailAdmin2Response.json();

        if (
          emailParticipantResponse.ok &&
          emailMentorResponse.ok &&
          emailAdmin1Response.ok &&
          emailAdmin2Response.ok
        ) {
          Swal.close();
          console.log("Email sent successfully:", emailParticipantResult);
          console.log("Email sent successfully:", emailMentorResult);
          console.log("Email sent successfully:", emailAdmin1Result);
          console.log("Email sent successfully:", emailAdmin2Result);
          // Show success modal

          this.$router.push("/thank-you-for-participating");
        } else {
          console.error("Error sending email:", emailParticipantResult.error);
          console.error("Error sending email:", emailMentorResult.error);
          console.error("Error sending email:", emailAdmin1Result.error);
          console.error("Error sending email:", emailAdmin2Result.error);
        }
      } catch (error) {
        console.error("Error:", error);
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
      this.participant_signed_date = new Intl.DateTimeFormat(
        "en-US",
        options
      ).format(now);
      this.mentor_signed_date = new Intl.DateTimeFormat(
        "en-US",
        options
      ).format(now);
      return new Intl.DateTimeFormat("en-US", options).format(now);
    },
    updateSignature(dataUrl: { data: string }) {
      this.participant_signature = dataUrl.data;
    },
    closeModal() {
      // Logic to close the modal
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
