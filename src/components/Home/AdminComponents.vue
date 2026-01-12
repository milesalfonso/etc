<template>
  <div class="row mb-3">
    <div
      class="col d-flex justify-content-center align-items-center flex-column text-white"
      style="background-color: #69478e"
    >
      <div class="row mb-5 mt-5">
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
      class="row d-flex justify-content-center align-items-center text-purple text-center"
    >
      <div class="row mb-3">
        <h1 class="text-purple">Programme Mapping</h1>
      </div>
      <div class="row mb-3" v-if="participants.length < 1">
        <h1 class="text-purple">
          No pending mentee applications for matchmaking
        </h1>
      </div>
      <div class="row">
        <h4 class="text-purple">Total Participants: {{ totalParticipants }}</h4>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <button
            @click="exportToExcel"
            class="btn btnPurplePillLight dynamic-width mt-3"
          >
            Export to Excel
          </button>
        </div>
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
        <div class="col-6">
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
                v-model="selectedMentor[participant.participant_id]"
                type="radio"
                :value="
                  participant.participant_id +
                  '-' +
                  mentor.mentor_id +
                  '-' +
                  mentor.mentor_name
                "
                :name="
                  'mentor-' +
                  participant.participant_id +
                  '-' +
                  mentor.mentor_name
                "
                :id="'mentor-' + participant.participant_id + '-' + mentorIndex"
              />
              <label
                :for="
                  'mentor-' + participant.participant_id + '-' + mentorIndex
                "
                >{{ mentor.mentor_name }}</label
              >
            </li>
          </ul>
        </div>
        <hr class="w-100 mt-5" />
      </div>
    </div>
  </div>
  <div class="row mb-3 justify-content-center">
    <div
      class="d-flex justify-content-center align-items-center text-purple text-center"
    >
      <div class="d-flex justify-content-center">
        <button
          v-if="participants.length > 0"
          class="btn btnPurplePillLight dynamic-width"
          @click="handleSubmit()"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
  <!-- Purple footer (full width like header) -->
  <div class="row mt-4">
    <div class="col p-0">
      <div class="purple-footer"></div>
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
import * as XLSX from "xlsx";

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
      selectedMentor: {} as { [key: string]: string },
      totalParticipants: 0,
    };
  },
  mounted() {
    this.fetchParticipantsAndMentors();
    this.fetchTotalParticipants();
  },
  methods: {
    async fetchTotalParticipants() {
      try {
        const response = await axios.get(
          "https://api.ewcprogram.com/fetch_total_participants"
        );
        console.log("Total participants:", response.data);
        this.totalParticipants = response.data["participant_count"];
      } catch (error) {
        console.error("Error fetching total participants:", error);
      }
    },
    gatherSelectedMentors() {
      const selectedMentors = this.participants.flatMap((participant) => {
        return participant.mentors.map((mentor) => {
          const selectedRadio = document.querySelector(
            `input[name='mentor-${participant.participant_id}-${mentor.mentor_name}']:checked`
          );
          return selectedRadio
            ? (selectedRadio as HTMLInputElement).value
            : null;
        });
      });
      return selectedMentors.filter((value) => value !== null);
    },
    async handleSubmit() {
      const selectedMentors = this.gatherSelectedMentors();

      if (selectedMentors.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "No Selection",
          text: "Please select at least one mentor for the participants",
        });
        return;
      }

      // Prepare mapping details for confirmation
      const mappingDetails = selectedMentors.map((selectedMentor) => {
        const [participant_id, mentor_id, mentor_name] = selectedMentor.split("-");
        const participant = this.participants.find((p) =>
          p.participant_id.toString() === participant_id.toString()
        );
        return {
          participant_name: participant?.participant_name || "Unknown",
          participant_email: participant?.participant_email || "Unknown",
          mentor_name,
        };
      });

      // Show confirmation modal
      const confirmResult = await Swal.fire({
        title: "Confirm Mentor Mapping",
        html: `
          <div style="text-align: left; max-height: 400px; overflow-y: auto;">
            <p><strong>You are about to assign ${selectedMentors.length} participant(s) to their mentors.</strong></p>
            <p>The following assignments will be made and emails will be sent:</p>
            <hr>
            ${mappingDetails.map((m, index) => `
              <div style="margin-bottom: 15px; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
                <strong>${index + 1}. ${m.participant_name}</strong><br>
                <small style="color: #666;">${m.participant_email}</small><br>
                <span style="color: #69478e;">→ Mentor: ${m.mentor_name}</span>
              </div>
            `).join('')}
          </div>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Submit",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#69478e",
        cancelButtonColor: "#6c757d",
        width: "600px",
      });

      if (!confirmResult.isConfirmed) {
        return;
      }

      console.log("Selected mentors:", selectedMentors);

      const results = {
        successful: [] as Array<{ name: string; email: string; mentor: string }>,
        failed: [] as Array<{ name: string; email: string; reason: string }>,
      };

      try {
        Swal.fire({
          title: "Processing...",
          html: `Processing <strong>${selectedMentors.length}</strong> participant(s)...<br><small>Please wait, this may take a moment.</small>`,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        for (const selectedMentor of selectedMentors) {
          const [participant_id, mentor_id, mentor_name] = selectedMentor.split("-");

          try {
            // Insert to database
            const response = await axios.post(
              "https://api.ewcprogram.com/insert_track_2_participant",
              { participant_id, mentor_id }
            );

            if (response.status === 200) {
              const { id } = response.data;
              const participant = this.participants.find((p) =>
                p.participant_id.toString() === participant_id.toString()
              );

              if (participant) {
                // Send email to participant
                const emailResponse = await fetch(
                  "https://api.ewcprogram.com/send_email_no_attachments",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      full_name: participant.participant_name,
                      email: participant.participant_email,
                      subject: "EWC | Your Mentor Assignment and Agreement for the EWC Program 2026",
                      body: `<!DOCTYPE html>
                        <html>
                          <body style="text-align: center;">
                            <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                              <img src="https://ewc-assets-2026.s3.ap-southeast-1.amazonaws.com/images/banner.jpg" alt="Email Banner" style="width: 100%; max-width: 600px;"/>
                              <p>Dear ${participant.participant_name},</p>
                              <p>We are excited to inform you that the mentor assignment process for the EWC Program 2026- cohort 2, has been completed, and you have been assigned to a mentor from the pre-list that matches your profile.</p>
                              <p>Your Assigned Mentor is:</p>
                              <p><strong>${mentor_name}</strong></p>
                              <p>As part of the next steps, we would like to share with you the Undertaking Agreement with your assigned mentor. Please take the time to carefully review the document and acknowledge your commitment to the program. Kindly proceed to sign off the documents by clicking on the below link:</p>
                              <p><a href="https://ewcprogram.com/#/mentee-pdf?id=${id}">Sign Agreement Document Here</a></p>
                              <p>The below steps have to be timely managed:</p>
                              <ul style="text-align: left; display: inline-block; margin: 0 auto;">
                                <li style="text-align: left;">Review the Undertaking Agreement.</li>
                                <li style="text-align: left;">Sign the agreement.</li>
                                <li style="text-align: left;">Submit the signed agreement.</li>
                              </ul>
                              <p>Please ensure that you complete these steps as soon as possible to move forward in the program. Thank you, and we look forward to your continued engagement in the program.</p>
                              <p>It will be great to engage them.</p>
                            </div>
                          </body>
                        </html>`,
                    }),
                  }
                );

                const emailData = await emailResponse.json();

                if (emailResponse.ok) {
                  results.successful.push({
                    name: participant.participant_name,
                    email: participant.participant_email,
                    mentor: mentor_name,
                  });
                  console.log(`✓ Email sent to ${participant.participant_name}:`, emailData);
                } else {
                  results.failed.push({
                    name: participant.participant_name,
                    email: participant.participant_email,
                    reason: emailData.error || "Email failed to send",
                  });
                  console.error(`✗ Email error for ${participant.participant_name}:`, emailData);
                }
              } else {
                results.failed.push({
                  name: `Participant ID: ${participant_id}`,
                  email: "Unknown",
                  reason: "Participant not found in list",
                });
              }
            } else {
              throw new Error("Database insert failed");
            }
          } catch (error: any) {
            const participant = this.participants.find((p) =>
              p.participant_id.toString() === participant_id.toString()
            );
            console.error(`✗ Error processing participant ${participant_id}:`, error);
            results.failed.push({
              name: participant?.participant_name || `ID: ${participant_id}`,
              email: participant?.participant_email || "Unknown",
              reason: error.response?.data?.error || error.message || "Unknown error",
            });
          }
        }

        Swal.close();

        // Show detailed results
        if (results.failed.length === 0) {
          // All successful
          await Swal.fire({
            icon: "success",
            title: "All Mappings Successful!",
            html: `
              <div style="text-align: left;">
                <p><strong>Successfully processed ${results.successful.length} participant(s):</strong></p>
                <ul style="max-height: 300px; overflow-y: auto;">
                  ${results.successful.map((s) => `
                    <li>
                      <strong>${s.name}</strong><br>
                      <small style="color: #666;">${s.email}</small><br>
                      <small style="color: #69478e;">→ Mentor: ${s.mentor}</small>
                    </li>
                  `).join('')}
                </ul>
              </div>
            `,
            confirmButtonColor: "#69478e",
          });
          location.reload();
        } else if (results.successful.length === 0) {
          // All failed
          await Swal.fire({
            icon: "error",
            title: "All Mappings Failed",
            html: `
              <div style="text-align: left;">
                <p><strong>Failed to process all ${results.failed.length} participant(s):</strong></p>
                <ul style="max-height: 300px; overflow-y: auto; color: #dc3545;">
                  ${results.failed.map((f) => `
                    <li>
                      <strong>${f.name}</strong><br>
                      <small>${f.email}</small><br>
                      <small><strong>Reason:</strong> ${f.reason}</small>
                    </li>
                  `).join('')}
                </ul>
              </div>
            `,
            confirmButtonColor: "#69478e",
          });
        } else {
          // Partial success
          await Swal.fire({
            icon: "warning",
            title: "Partial Success",
            html: `
              <div style="text-align: left;">
                <p>
                  <strong style="color: #28a745;">Successful:</strong> ${results.successful.length}<br>
                  <strong style="color: #dc3545;">Failed:</strong> ${results.failed.length}
                </p>
                <hr>
                <details>
                  <summary style="cursor: pointer; color: #28a745; font-weight: bold;">✓ Successful (${results.successful.length})</summary>
                  <ul style="max-height: 200px; overflow-y: auto; margin-top: 10px;">
                    ${results.successful.map((s) => `
                      <li>
                        <strong>${s.name}</strong><br>
                        <small style="color: #666;">${s.email}</small><br>
                        <small style="color: #69478e;">→ ${s.mentor}</small>
                      </li>
                    `).join('')}
                  </ul>
                </details>
                <br>
                <details open>
                  <summary style="cursor: pointer; color: #dc3545; font-weight: bold;">✗ Failed (${results.failed.length})</summary>
                  <ul style="max-height: 200px; overflow-y: auto; margin-top: 10px; color: #dc3545;">
                    ${results.failed.map((f) => `
                      <li>
                        <strong>${f.name}</strong><br>
                        <small>${f.email}</small><br>
                        <small><strong>Reason:</strong> ${f.reason}</small>
                      </li>
                    `).join('')}
                  </ul>
                </details>
              </div>
            `,
            confirmButtonColor: "#69478e",
            width: "600px",
          });
          location.reload();
        }
      } catch (error: any) {
        console.error("Error submitting mentors:", error);
        Swal.fire({
          icon: "error",
          title: "Unexpected Error",
          text: error.message || "An unexpected error occurred. Please try again.",
          confirmButtonColor: "#69478e",
        });
      }
    },
    // async handleSubmit(participantId: string) {
    //   const checkboxes = document.querySelectorAll(
    //     `input[name="mentor-${participantId}"]:checked`
    //   );
    //   if (checkboxes.length > 0) {
    //     const selectedValue = (checkboxes[0] as HTMLInputElement).value;
    //     const mentorId = selectedValue.split("-")[1];

    //     try {
    // Swal.fire({
    //   title: "Inserting...",
    //   text: "Inserting participants and mentors data",
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    //       const response = await axios.post(
    //         "https://api.ewcprogram.com/insert_track_2_participant",
    //         {
    //           participant_id: participantId,
    //           mentor_id: mentorId,
    //         }
    //       );
    //       console.log("Response from server:", response.data);

    //       // Fetch participant and mentor emails
    //       const participant = this.participants.find(
    //         (p) => p.participant_id === participantId
    //       );
    //       const mentor = participant?.mentors.find(
    //         (m) => m.mentor_id === mentorId
    //       );

    //       if (participant && mentor) {
    //         // Send email to participant
    //         const emailParticipantResponse = await fetch(
    //           "https://api.ewcprogram.com/send_email_no_attachments",
    //           {
    //             method: "POST",
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //               full_name: participant.participant_name,
    //               email: participant.participant_email,
    //             }),
    //           }
    //         );
    //         const emailParticipantData = await emailParticipantResponse.json();
    //         if (emailParticipantResponse.ok) {
    //           console.log("Email sent to participant:", emailParticipantData);
    //         } else {
    //           console.error(
    //             "Error sending email to participant:",
    //             emailParticipantData
    //           );
    //         }

    //         // Send email to mentor
    //         const emailMentorResponse = await fetch(
    //           "https://api.ewcprogram.com/send_email_no_attachments",
    //           {
    //             method: "POST",
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //               full_name: mentor.mentor_name,
    //               email: mentor.mentor_email,
    //             }),
    //           }
    //         );
    //         const emailMentorData = await emailMentorResponse.json();
    //         if (emailMentorResponse.ok) {
    //           console.log("Email sent to mentor:", emailMentorData);
    //         } else {
    //           console.error("Error sending email to mentor:", emailMentorData);
    //         }
    //       }
    //       Swal.close();
    //       Swal.fire({
    //         icon: "success",
    //         title: "Success",
    //         text: "Data inserted and emails sent successfully",
    //       });
    //       this.fetchParticipantsAndMentors();
    //     } catch (error) {
    //       console.error("Error inserting data or sending emails:", error);
    //       Swal.fire({
    //         icon: "error",
    //         title: "Error",
    //         text: "Failed to insert data or send emails",
    //       });
    //     }
    //   } else {
    //     console.error("No mentor selected for participant:", participantId);
    //     Swal.fire({
    //       icon: "warning",
    //       title: "Warning",
    //       text: "No mentor selected for participant",
    //     });
    //   }
    // },
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
          "https://api.ewcprogram.com/fetch_participants_and_mentors"
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
    async exportToExcel() {
      try {
        const response = await axios.get("https://api.ewcprogram.com/get-data");
        const data = response.data;

        if (!Array.isArray(data)) {
          throw new Error("Data is not an array");
        }

        // Add headers to the data
        const headers = [
          "Name",
          "Email",
          "EID",
          "Mentor 1",
          "Mentor 2",
          "Mentor 3",
        ];
        const formattedData = [
          headers,
          ...data.map(
            (item: {
              full_name: string;
              email: string;
              mobile: string;
              mentor_name_1: string;
              mentor_name_2: string;
              mentor_name_3: string;
              mentor_name_4: string;
            }) => [
              item.full_name,
              item.email,
              item.mobile,
              item.mentor_name_1,
              item.mentor_name_2,
              item.mentor_name_3,
              item.mentor_name_4,
            ]
          ),
        ];

        // Create a new workbook and add the data
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(formattedData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

        // Generate Excel file and trigger download
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "participants.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error exporting to Excel:", error);
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
