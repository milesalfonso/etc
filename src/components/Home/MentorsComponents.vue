<template>
  <!-- Header -->
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
    </div>
  </div>

  <!-- Instructions -->
  <div class="row mb-3 justify-content-center">
    <h4 class="text-purple text-center">Welcome, {{ fullName }}.</h4>
    <h4 class="text-purple text-center">
      Please watch the mentor introduction videos.
    </h4>
    <h4 class="text-purple text-center">
      After watching them select
      <span style="font-weight: bold">three mentors</span> who you feel align
      best with your goals, interests, and learning style
    </h4>
  </div>

  <!-- Mentor Grid -->
  <div class="row justify-content-center">
    <div class="col-12 px-4">
      <div class="mentor-grid">
        <div
          v-for="mentor in mentors"
          :key="mentor.id"
          class="mentor-item"
          :class="{
            selected: selectedMentors.includes(mentor.id),
            disabled:
              !selectedMentors.includes(mentor.id) &&
              selectedMentors.length >= 3,
          }"
        >
          <!-- Thumbnail (poster image) -->
          <button
            type="button"
            class="thumb"
            @click="openVideoModal(mentor)"
            :aria-label="`Play video for ${mentor.name}`"
          >
            <img class="thumb-img" :src="mentor.poster" :alt="mentor.name" />
            <span class="play-btn" aria-hidden="true">▶</span>
          </button>

          <!-- Checkbox + Name -->
          <label class="mentor-meta">
            <input
              type="checkbox"
              class="mentor-checkbox"
              :checked="selectedMentors.includes(mentor.id)"
              :disabled="
                !selectedMentors.includes(mentor.id) &&
                selectedMentors.length >= 3
              "
              @change="toggleMentorSelection(mentor.id)"
            />
            <span class="mentor-name">{{ mentor.name }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>

  <!-- Next Button -->
  <div class="row justify-content-center mt-4">
    <div class="col-12 px-4 d-flex justify-content-center">
      <button
        :class="
          selectedMentors.length === 3
            ? 'btn btnPurplePillLight dynamic-width'
            : 'btn btnGrey dynamic-width'
        "
        @click="insertMentors"
        :disabled="selectedMentors.length !== 3"
      >
        Next
      </button>
    </div>
  </div>

  <ModalSuccessSelection />

  <!-- Video Modal -->
  <Teleport to="body">
    <div
      v-if="showVideoModal"
      class="video-modal-overlay"
      @click.self="closeVideoModal"
    >
      <div class="video-modal">
        <button class="close-btn" @click="closeVideoModal">X</button>

        <video
          v-if="activeMentor"
          ref="modalVideo"
          :key="activeMentor.video"
          :src="activeMentor.video"
          controls
          autoplay
          muted
          playsinline
        ></video>
      </div>
    </div>
    <!-- Purple footer (full width like header) -->
    <div class="row mt-4">
      <div class="col p-0">
        <div class="purple-footer"></div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Swal from "sweetalert2";
import ModalSuccessSelection from "./ModalSuccessSelection.vue";

const ASSET_BASE = "https://ewc-assets-2026.s3.ap-southeast-1.amazonaws.com";

const posterUrl = (id: number) => `${ASSET_BASE}/images/mentor_${id}.jpg`;
const videoUrl = (id: number) => `${ASSET_BASE}/videos/mentor_${id}.mp4`;

export default defineComponent({
  name: "MentorsComponent",
  components: { ModalSuccessSelection },

  data() {
    return {
      showVideoModal: false as boolean,
      activeMentor: null as any,

      fullName: "",
      title: "",
      entity: "",
      email: "",
      mobile: "",

      mentors: [
        {
          id: 14,
          name: "Nervana Yahya",
          poster: posterUrl(14),
          video: videoUrl(14),
        },
        {
          id: 15,
          name: "Dr. Omneya Omar",
          poster: posterUrl(15),
          video: videoUrl(15),
        },
        {
          id: 16,
          name: "Haneen Farid",
          poster: posterUrl(16),
          video: videoUrl(16),
        },
        {
          id: 17,
          name: "Olivia Tawadros",
          poster: posterUrl(17),
          video: videoUrl(17),
        },
        {
          id: 18,
          name: "Hajra Hussain",
          poster: posterUrl(18),
          video: videoUrl(18),
        },
        {
          id: 19,
          name: "Israa Zubdiyha",
          poster: posterUrl(19),
          video: videoUrl(19),
        },
        {
          id: 20,
          name: "Sarah Tuqan",
          poster: posterUrl(20),
          video: videoUrl(20),
        },
        {
          id: 21,
          name: "Ahed Shehab",
          poster: posterUrl(21),
          video: videoUrl(21),
        },
        {
          id: 22,
          name: "Shoneli Kamal",
          poster: posterUrl(22),
          video: videoUrl(22),
        },
        {
          id: 23,
          name: "Cristina Balhui",
          poster: posterUrl(23),
          video: videoUrl(23),
        },
        {
          id: 24,
          name: "Jamila Korek",
          poster: posterUrl(24),
          video: videoUrl(24),
        },
        {
          id: 25,
          name: "Aisha Abdulqader",
          poster: posterUrl(25),
          video: videoUrl(25),
        },
        {
          id: 26,
          name: "Dr. Hanan Mohamed Selim",
          poster: posterUrl(26),
          video: videoUrl(26),
        },
        {
          id: 27,
          name: "Lena Zidan",
          poster: posterUrl(27),
          video: videoUrl(27),
        },
        {
          id: 28,
          name: "Nowsheen Yaqoob",
          poster: posterUrl(28),
          video: videoUrl(28),
        },
        {
          id: 29,
          name: "Dr. Mona Gamal",
          poster: posterUrl(29),
          video: videoUrl(29),
        },
        {
          id: 30,
          name: "Nataliya Wiedemeyer",
          poster: posterUrl(30),
          video: videoUrl(30),
        },
        {
          id: 31,
          name: "Wafa Disi",
          poster: posterUrl(31),
          video: videoUrl(31),
        },
        {
          id: 32,
          name: "Dinu Basnayake",
          poster: posterUrl(32),
          video: videoUrl(32),
        },
        {
          id: 33,
          name: "Anita Raina",
          poster: posterUrl(33),
          video: videoUrl(33),
        },
        {
          id: 34,
          name: "Namita Malhotra",
          poster: posterUrl(34),
          video: videoUrl(34),
        },
        {
          id: 35,
          name: "Arati Vinay Tuteja",
          poster: posterUrl(35),
          video: videoUrl(35),
        },
        {
          id: 36,
          name: "Mumtaz Hasan",
          poster: posterUrl(36),
          video: videoUrl(36),
        },
        {
          id: 37,
          name: "Safaae Oussalem",
          poster: posterUrl(37),
          video: videoUrl(37),
        },
        {
          id: 38,
          name: "Rola Cheikha",
          poster: posterUrl(38),
          video: videoUrl(38),
        },
        {
          id: 39,
          name: "Nada El Gazza",
          poster: posterUrl(39),
          video: videoUrl(39),
        },
        {
          id: 40,
          name: "Simar Halwany",
          poster: posterUrl(40),
          video: videoUrl(40),
        },
        {
          id: 41,
          name: "Dr. Malek Najar",
          poster: posterUrl(41),
          video: videoUrl(41),
        },
        {
          id: 42,
          name: "Sandhya Mahalakshmi",
          poster: posterUrl(42),
          video: videoUrl(42),
        },
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
  },

  methods: {
    openVideoModal(mentor: any) {
      this.activeMentor = mentor;
      this.showVideoModal = true;

      this.$nextTick(() => {
        const v = this.$refs.modalVideo as HTMLVideoElement | undefined;
        if (!v) return;

        v.load();
        const p = v.play();
        if (p && typeof (p as any).catch === "function") {
          (p as Promise<void>).catch(() => {});
        }
      });
    },

    closeVideoModal() {
      this.showVideoModal = false;
      this.activeMentor = null;
    },

    toggleMentorSelection(id: number) {
      const index = this.selectedMentors.indexOf(id);
      if (index > -1) {
        this.selectedMentors.splice(index, 1);
      } else if (this.selectedMentors.length < 3) {
        this.selectedMentors.push(id);
      }
    },

    async insertMentors() {
      const selected = this.mentors.filter((m) =>
        this.selectedMentors.includes(m.id)
      );

      const cardsHtml = `
    <div style="text-align:left;">
      <p style="margin:0 0 10px 0;">
        Please take a moment to review your selected mentors and confirm that they are correct.
      </p>
      <p style="margin:0 0 16px 0;">
        Once confirmed, we’ll proceed with the matching process. If you need to make any changes, now is the best time to do so before moving forward.
      </p>

      <div style="font-weight:700; margin: 0 0 10px 0;">Mentor selections:</div>

      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
        ${[0, 1, 2]
          .map((i) => {
            const m = selected[i];
            return `
              <div style="border:1px solid rgba(0,0,0,0.12); border-radius:12px; overflow:hidden; background:#fff;">
                <div style="aspect-ratio: 16/9; background:#000;">
                  ${
                    m
                      ? `<img src="${m.poster}" alt="${m.name}" style="width:100%; height:100%; object-fit:cover; display:block;" />`
                      : `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#fff;">—</div>`
                  }
                </div>
                <div style="padding:10px 12px;">
                  <div style="font-weight:700; margin-bottom:6px;">Mentor ${
                    i + 1
                  }:</div>
                  <div style="font-size:14px; font-weight:600;">${
                    m ? m.name : "—"
                  }</div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;

      const result = await Swal.fire({
        title: "Confirm your selection",
        html: cardsHtml,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Go back",
        reverseButtons: true,
        width: 900,
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btnPurplePillLight dynamic-width",
          cancelButton: "btn btnGrey dynamic-width",
          actions: "swal-actions-row",
        },
      });

      if (!result.isConfirmed) return;

      try {
        Swal.fire({
          title: "Sending...",
          text: "Submitting your mentor selection",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const response = await fetch(
          "https://api.ewcprogram.com/insert_mentors",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              full_name: this.fullName,
              title: this.title,
              entity: this.entity,
              email: this.email,
              mobile: this.mobile,
              mentor_ids: this.selectedMentors,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to submit mentor selection");

        // ✅ Email user after successful insert
        Swal.fire({
          title: "Emailing...",
          text: "Sending confirmation email",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const emailBody = `<!DOCTYPE html>
                        <html>
                            <body style="text-align: center;">
                            <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                                <img src="https://ewc-assets-2026.s3.ap-southeast-1.amazonaws.com/images/banner.png" alt="Email Banner" style="width: 100%; max-width: 600px;"/>
                                <p style="text-align: left;">Dear ${
                                  this.fullName || ""
                                },</p>
                                <br>
                                <p style="text-align: left;">Thank you for submitting your selection.</p>
                                <p style="text-align: left;">Once the EWC Program Team has completed the matchmaking process, you will receive a confirmation email which includes a privacy and confidentiality consent form which you need to sign.</p>
                                <p style="text-align: left;">A signed copy of the consent form will be emailed to you and the EWC Program team once your mentor has signed.</p>
                                <br>
                                <p style="text-align: left;">Best regards,</p>
                                <p style="text-align: left;">EWC Program Team</p>
                            </div>
                            </body>
                        </html>`;

        const emailRes = await fetch(
          "https://api.ewcprogram.com/send_email_no_attachments",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              full_name: this.fullName,
              email: this.email,
              subject: "EWC Matchmaking in Progress",
              body: emailBody,
            }),
          }
        );

        const emailJson = await emailRes.json().catch(() => ({}));
        if (!emailRes.ok) {
          throw new Error(
            emailJson?.error || "Failed to send confirmation email"
          );
        }

        Swal.close();
        this.$router.push("/thank-you");
      } catch (e) {
        console.error(e);
        Swal.fire({
          title: "Error",
          text: "Something went wrong while submitting your selection. Please try again.",
          icon: "error",
        });
      }
    },
  },
});
</script>

<style scoped>
.mentor-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.mentor-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mentor-item.selected .thumb {
  outline: 4px solid #69478e;
  outline-offset: 0;
}

.mentor-item.disabled {
  opacity: 0.45;
  pointer-events: none;
}

.thumb {
  position: relative;
  border: none;
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  cursor: pointer;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.play-btn {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 44px;
  line-height: 1;
  color: white;
  text-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.15) 35%,
    rgba(0, 0, 0, 0) 70%
  );
}

.mentor-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  user-select: none;
  color: #2f2f2f;
}

.mentor-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #69478e;
}

.mentor-name {
  font-size: 0.95rem;
  font-weight: 600;
}

@media (max-width: 992px) {
  .mentor-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .mentor-grid {
    grid-template-columns: 1fr;
  }
}

/* Modal (unchanged) */
.video-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 2147483647;
  display: grid;
  place-items: center;
}

.video-modal {
  width: min(90vw, 960px);
  aspect-ratio: 16 / 9;
  background: black;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.video-modal video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 28px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
