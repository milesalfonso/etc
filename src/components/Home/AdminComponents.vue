<template>
  <div class="row mb-3">
    <div
      class="col d-flex justify-content-center align-items-center flex-column text-white"
      style="background-color: #69478e; height: 150px"
    >
      <div class="row">
        <h1>EWC</h1>
      </div>
    </div>
  </div>
  <div class="row mb-3 justify-content-center">
    <div
      class="row d-flex justify-content-center align-items-center text-purple w-25"
    >
      <div class="row">
        <h1 class="text-purple">Programme Mapping</h1>
      </div>
    </div>
  </div>
  <div class="row d-flex justify-content-center align-items-center">
    <div
      class="row d-flex justify-content-center align-items-center text-purple w-25"
    >
      <div
        v-for="(participant, index) in participants"
        :key="index"
        class="row mb-3"
      >
        <div class="col-6">
          <h3>{{ participant.name }}</h3>
        </div>
        <div class="col-6 justify-content-end align-items-end">
          <div
            v-for="(mentor, mentorIndex) in participant.mentors"
            :key="mentorIndex"
            class="form-check d-flex justify-content-center align-items-center"
          >
            <input
              class="form-check-input custom-checkbox me-3"
              type="checkbox"
              :value="index + mentor"
              v-model="selectedMentors"
            />
            <label :for="'flexCheckDefault' + mentorIndex">{{ mentor }}</label>
          </div>
        </div>
        <hr class="w-100 mt-5" />
      </div>

      <div class="row mb-3 justify-content-center align-items-center">
        <button
          class="btn btnPurplePillLight dynamic-width"
          data-bs-toggle="modal"
          data-bs-target="#adminSuccessModal"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
  <ModalAdminSuccess />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import "../../assets/body-bg.css";
import ModalAdminSuccess from "./ModalAdminSuccess.vue";

//   import { login } from "../../api/server";

export default defineComponent({
  name: "AdminComponents",
  components: {
    ModalAdminSuccess,
  },
  data() {
    return {
      participants: [
        {
          name: "Participant 1",
          mentors: ["Mentor 1", "Mentor 2", "Mentor 3"],
        },
        {
          name: "Participant 2",
          mentors: ["Mentor 1", "Mentor 2", "Mentor 3"],
        },
        {
          name: "Participant 3",
          mentors: ["Mentor 1", "Mentor 2", "Mentor 3"],
        },
      ],

      selectedMentors: [],
    };
  },
  methods: {
    // isChecked(mentor) {
    //   return this.checkedMentor === mentor;
    // },
    // checkOnlyOne(mentor) {
    //   if (this.checkedMentor === mentor) {
    //     this.checkedMentor = null;
    //   } else {
    //     this.checkedMentor = mentor;
    //   }
    // },
    countChecked() {
      alert(`Checked checkboxes: ${this.selectedMentors.length}`);
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
