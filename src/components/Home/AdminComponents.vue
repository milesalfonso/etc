<template>
  <div class="row mb-3">
    <div
      class="col d-flex justify-content-center align-items-center flex-column text-white"
      style="background-color: #69478e; height: 200px"
    >
      <div class="row">
        <img
          src="../../assets/EWC Logo-White.svg"
          alt="EWC Logo"
          class="img-fluid mx-auto d-block ms-4"
        />
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
      class="row d-flex justify-content-center align-items-center text-purple w-50"
    >
      <div
        v-for="(participant, index) in participants"
        :key="index"
        class="row mb-3"
      >
        <div class="col-3">
          <h3>{{ participant.participant_name }}</h3>
          <p>{{ participant.participant_email }}</p>
        </div>
        <div
          class="col-6 d-flex flex-column justify-content-center align-items-center"
        >
          <ul class="list-unstyled">
            <li
              v-for="(mentor, mentorIndex) in participant.mentors"
              :key="mentorIndex"
              class="form-check d-flex align-items-center mb-2"
            >
              <input
                class="form-check-input custom-checkbox me-3"
                type="checkbox"
                :value="participant.participant_id + '-' + mentor.mentor_id"
                :name="'mentor-' + participant.participant_id"
              />
              <label :for="'flexCheckDefault' + mentorIndex">{{
                mentor.mentor_name
              }}</label>
            </li>
          </ul>
        </div>
        <div class="col-3">
          <button
            class="btn btnPurplePillLight dynamic-width"
            @click="handleSubmit(participant.participant_id)"
          >
            Submit
          </button>
        </div>
        <hr class="w-100 mt-5" />
      </div>

      <div class="row mb-3 justify-content-center align-items-center"></div>
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
import axios from "axios";

//   import { login } from "../../api/server";

interface Mentor {
  mentor_name: string;
  mentor_id: string;
  mentor_email: string;
}

interface Participant {
  participant_name: string;
  participant_id: string;
  participant_email: string;
  mentors: Mentor[];
}

export default defineComponent({
  name: "AdminComponents",
  components: {
    ModalAdminSuccess,
  },
  data() {
    return {
      participants: [] as Participant[],
    };
  },
  mounted() {
    this.fetchParticipantsAndMentors();
  },
  methods: {
    async handleSubmit(participantId: string) {
      const checkboxes = document.querySelectorAll(
        `input[name="mentor-${participantId}"]:checked`
      );
      if (checkboxes.length > 0) {
        const selectedValue = (checkboxes[0] as HTMLInputElement).value;
        const mentorId = selectedValue.split("-")[1];

        try {
          Swal.fire({
            title: "Inserting...",
            text: "Inserting participants and mentors data",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          const response = await axios.post(
            "http://127.0.0.1:5000/insert_track_2_participant",
            {
              participant_id: participantId,
              mentor_id: mentorId,
            }
          );
          console.log("Response from server:", response.data);

          // Fetch participant and mentor emails
          const participant = this.participants.find(
            (p) => p.participant_id === participantId
          );
          const mentor = participant?.mentors.find(
            (m) => m.mentor_id === mentorId
          );

          if (participant && mentor) {
            // Send email to participant
            const emailParticipantResponse = await fetch(
              "http://127.0.0.1:5000/send_email_no_attachments",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  full_name: participant.participant_name,
                  email: participant.participant_email,
                }),
              }
            );
            const emailParticipantData = await emailParticipantResponse.json();
            if (emailParticipantResponse.ok) {
              console.log("Email sent to participant:", emailParticipantData);
            } else {
              console.error(
                "Error sending email to participant:",
                emailParticipantData
              );
            }

            // Send email to mentor
            const emailMentorResponse = await fetch(
              "http://127.0.0.1:5000/send_email_no_attachments",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  full_name: mentor.mentor_name,
                  email: mentor.mentor_email,
                }),
              }
            );
            const emailMentorData = await emailMentorResponse.json();
            if (emailMentorResponse.ok) {
              console.log("Email sent to mentor:", emailMentorData);
            } else {
              console.error("Error sending email to mentor:", emailMentorData);
            }
          }
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data inserted and emails sent successfully",
          });
          this.fetchParticipantsAndMentors();
        } catch (error) {
          console.error("Error inserting data or sending emails:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to insert data or send emails",
          });
        }
      } else {
        console.error("No mentor selected for participant:", participantId);
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "No mentor selected for participant",
        });
      }
    },
    async fetchParticipantsAndMentors() {
      try {
        Swal.fire({
          title: "Loading...",
          text: "Fetching participants and mentors data",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const response = await axios.get(
          "http://127.0.0.1:5000/fetch_participants_and_mentors"
        );
        this.participants = response.data;
        Swal.close();
      } catch (error) {
        console.error("Error fetching participants and mentors:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch participants and mentors data",
        });
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
