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
    <div
      class="row d-flex justify-content-center align-items-center text-purple w-50"
    >
      <div class="row mb-3">
        <h1 class="text-center">
          Emirati Women Chapter (EWC) - Enrollment Agreement
        </h1>
      </div>
      <div class="row mb-3">
        <h1 class="text-center">
          Duration from February - August 2024 (6 months)
        </h1>
      </div>
      <div class="row mb-3">
        <h3 class="text-center">
          Under the sponsorship of Pure Health Medical Supplies Company
          incorporated in Dubai with Commercial License Number 678868 (hereby
          referred to as “PureHealth”) and both contract’s parties classified
          below as contractual parties, in which this agreement commit both
          parties in this agreement to perform as per the agreements terms
          mentioned below:
        </h3>
      </div>
      <div class="row mb-3">
        <div class="col-6">
          <div class="row mb-3">
            <h4>EWC Candidate - referred to as "Mentees"</h4>
          </div>
          <div class="row"><h4>Name:</h4></div>
          <div class="row"><h4>Title:</h4></div>
          <div class="row mb-3"><h4>Entity:</h4></div>
          <div class="row mb-3">
            <h1 class="text-center">Mentees</h1>
          </div>
          <div style="width: 95%" class="mb-5">
            <div class="row">
              · The EWC candidate should commit to actively participating in the
              learning process and dedicate the necessary time and effort to
              achieve the set learning objective.
            </div>
            <div class="row">
              · The EWC candidate should attend 100% of the scheduled learning
              sessions, workshops, or activities related to the learning
              objective, and complete assigned tasks and assignments on time.
            </div>
            <div class="row">
              · The EWC candidate should possess the basic skills, knowledge,
              and prerequisites needed to pursue this learning objective.
            </div>
            <div class="row">
              · The EWC candidate should proactively seek assistance or guidance
              from mentors, trainers, or relevant resources.
            </div>
            <div class="row">
              · The EWC candidate should engage in self-reflection and assess
              her progress regularly to identify areas for improvement.
            </div>
            <div class="row">
              · The EWC candidate should participate in interactive activities,
              discussions, or assessments to enhance her capability in the
              desired learning outcome.
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row mb-3">
            <h4>Personal coach- referred to as “Personal Mentor”</h4>
          </div>
          <div class="row"><h4>Name:</h4></div>
          <div class="row"><h4>Title:</h4></div>
          <div class="row mb-3"><h4>Entity:</h4></div>
          <div class="row mb-3">
            <h1 class="text-center">Personal Mentors</h1>
          </div>
          <div style="width: 95%" class="mb-5">
            <div class="row">
              · The EWC Personal Mentor (PM) should commit to actively
              participating in the learning process and dedicate the necessary
              time and effort to achieve the set learning objective for the
              program candidates.
            </div>
            <div class="row">
              · The PM should attend 100% of the scheduled learning sessions,
              workshops, or activities related to the learning personal
              objectives of the assigned development plan, and complete tasks
              and assignments of the master tracker and individual sessions
              designed based on the developed planner.
            </div>
            <div class="row">
              · PureHealth support the learning required expenses to ensure a
              professional efficient development plan for the program
              candidates- based on the Mentorship agreement requirements.
            </div>
            <div class="row">
              · Design and oversight the customized development plan for the
              assigned candidates and act as a case manager to collaborate the
              program phases inquires.
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-6">
          <div class="row mb-3">
            <h4>EWC Candidate - referred to as "Mentees"</h4>
          </div>
          <div class="row"><h4>Name:</h4></div>
          <div class="row"><h4>Date:</h4></div>
          <div class="row mb-3">
            <h4>
              Signature:
              <img :src="mentee_signature" style="width: 50%" />
            </h4>
          </div>
        </div>
        <div class="col-6">
          <div class="row mb-3">
            <h4>Personal coach- referred to as “Personal Mentor”</h4>
          </div>
          <div class="row"><h4>Name:</h4></div>
          <div class="row"><h4>Date:</h4></div>
          <div class="row mb-3">
            <h4>
              Signature: <img :src="mentor_signature" style="width: 50%" />
            </h4>
          </div>
        </div>
      </div>
      <div class="row mb-5">
        PureHealth agrees to sponsor the EWC Candidates for the EWC Development
        Program, effective on the date of signing this Form by Candidate of
        Track 1 . Considering designing a constructive plan to develop the
        required skills for the program candidates, through well selected topics
        and Subject Matter Experts (SME) that fit the passion of the candidate
        as required.
      </div>
      <div class="row mb-5 justify-content-center align-items-center">
        <button
          v-if="mentee_signature === ''"
          class="btn btnPurplePillLight dynamic-width"
          data-bs-toggle="modal"
          data-bs-target="#signatureModal"
        >
          SIGN
        </button>
        <button
          v-if="mentee_signature !== ''"
          class="btn btnPurplePillLight dynamic-width"
          data-bs-toggle="modal"
          data-bs-target="#successModal"
        >
          SUBMIT
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
import "../../assets/body-bg.css";
import ModalSignature from "./ModalSignature.vue";
import ModalSuccess from "./ModalSuccess.vue";
//   import { login } from "../../api/server";

export default defineComponent({
  name: "HomeCompoonents",
  components: {
    ModalSignature,
    ModalSuccess,
  },
  data() {
    return {
      mentee_signature: "",
      mentor_signature: "",
    };
  },
  methods: {
    updateSignature(dataUrl: { data: string }) {
      this.mentor_signature = dataUrl.data;
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
</style>
