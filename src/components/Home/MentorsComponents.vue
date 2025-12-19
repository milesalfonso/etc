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
      <div class="row w-75 mb-5">
        <h1 class="text-center">Welcome to the EWC Passion Goal</h1>
      </div>
    </div>
  </div>

  <!-- Instructions -->
  <div class="row mb-3 justify-content-center">
    <h4 class="text-purple text-center">Welcome, {{ fullName }}.</h4>
    <h4 class="text-purple text-center">
      Please select three mentors who you think would be the best fit.
    </h4>
  </div>

  <!-- Mentor Video Grid -->
  <div class="row justify-content-center">
    <div class="col-12 px-4">
      <div class="mentor-grid">
        <div
          v-for="mentor in mentors"
          :key="mentor.id"
          class="mentor-card"
          :class="{
            selected: selectedMentors.includes(mentor.id),
            disabled:
              !selectedMentors.includes(mentor.id) &&
              selectedMentors.length >= 4,
          }"
          @mouseenter="handleHover(mentor.id)"
          @mouseleave="pauseVideo(mentor.id)"
          @click="handleTap(mentor.id)"
        >
          <video
            class="mentor-video"
            :ref="(el) => el && registerVideo(el as HTMLVideoElement, mentor.id)"
            :poster="mentor.poster"
            muted
            loop
            playsinline
            preload="auto"
          >
            <source :src="mentor.video" type="video/mp4" />
          </video>

          <div class="mentor-overlay">
            <span class="mentor-name">{{ mentor.name }}</span>
            <span v-if="selectedMentors.includes(mentor.id)" class="checkmark">
              ✓
            </span>
          </div>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Swal from "sweetalert2";
import ModalSuccessSelection from "./ModalSuccessSelection.vue";

import mentor0 from "@/assets/images/mentor_0.png";
import mentor1 from "@/assets/images/mentor_1.png";
import mentor2 from "@/assets/images/mentor_2.png";
import mentor3 from "@/assets/images/mentor_3.png";
import mentor4 from "@/assets/images/mentor_4.png";
import mentor5 from "@/assets/images/mentor_5.png";
import mentor6 from "@/assets/images/mentor_6.png";
import mentor7 from "@/assets/images/mentor_7.png";
import mentor8 from "@/assets/images/mentor_8.png";
import mentor9 from "@/assets/images/mentor_9.png";
import mentor10 from "@/assets/images/mentor_10.png";
import mentor11 from "@/assets/images/mentor_11.png";

import mentor0_video from "@/assets/videos/sample.mp4";
// import mentor1_video from "@/assets/videos/mentor_1.mp4";
// import mentor2_video from "@/assets/videos/mentor_2.mp4";
// import mentor3_video from "@/assets/videos/mentor_3.mp4";
// import mentor4_video from "@/assets/videos/mentor_4.mp4";
// import mentor5_video from "@/assets/videos/mentor_5.mp4";
// import mentor6_video from "@/assets/videos/mentor_6.mp4";
// import mentor7_video from "@/assets/videos/mentor_7.mp4";
// import mentor8_video from "@/assets/videos/mentor_8.mp4";
// import mentor9_video from "@/assets/videos/mentor_9.mp4";
// import mentor10_video from "@/assets/videos/mentor_10.mp4";
// import mentor11_video from "@/assets/videos/mentor_11.mp4";
import mentor1_video from "@/assets/videos/sample.mp4";
import mentor2_video from "@/assets/videos/sample.mp4";
import mentor3_video from "@/assets/videos/sample.mp4";
import mentor4_video from "@/assets/videos/sample.mp4";
import mentor5_video from "@/assets/videos/sample.mp4";
import mentor6_video from "@/assets/videos/sample.mp4";
import mentor7_video from "@/assets/videos/sample.mp4";
import mentor8_video from "@/assets/videos/sample.mp4";
import mentor9_video from "@/assets/videos/sample.mp4";
import mentor10_video from "@/assets/videos/sample.mp4";
import mentor11_video from "@/assets/videos/sample.mp4";

export default defineComponent({
  name: "MentorsComponent",
  components: { ModalSuccessSelection },

  data() {
    return {
      fullName: "",
      title: "",
      entity: "",
      email: "",
      mobile: "",

      mentors: [
        {
          id: 1,
          name: "arati",
          poster: mentor0,
          video: mentor0_video,
        },
        {
          id: 2,
          name: "nahmita",
          poster: mentor1,
          video: mentor1_video,
        },
        {
          id: 3,
          name: "aisha",
          poster: mentor2,
          video: mentor2_video,
        },
        {
          id: 4,
          name: "dr. mona",
          poster: mentor3,
          video: mentor3_video,
        },
        {
          id: 5,
          name: "nada",
          poster: mentor4,
          video: mentor4_video,
        },
        {
          id: 6,
          name: "simar",
          poster: mentor5,
          video: mentor5_video,
        },
        {
          id: 7,
          name: "nervana",
          poster: mentor6,
          video: mentor6_video,
        },
        {
          id: 8,
          name: "nataliya",
          poster: mentor7,
          video: mentor7_video,
        },
        {
          id: 9,
          name: "jameela",
          poster: mentor8,
          video: mentor8_video,
        },
        {
          id: 10,
          name: "dr. omneya",
          poster: mentor9,
          video: mentor9_video,
        },
        {
          id: 11,
          name: "sarah",
          poster: mentor10,
          video: mentor10_video,
        },
        {
          id: 12,
          name: "israa",
          poster: mentor11,
          video: mentor11_video,
        },
      ],

      selectedMentors: [] as number[],
      videoRefs: {} as Record<number, HTMLVideoElement>,
      lastTouchedVideo: null as number | null,
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
    /* ---------------- VIDEO CONTROL ---------------- */

    registerVideo(el: HTMLVideoElement, id: number) {
      this.videoRefs[id] = el;

      el.addEventListener("loadeddata", () => {
        console.log(`🎬 Video ${id} loadeddata`);
      });

      el.addEventListener("canplay", () => {
        console.log(`▶️ Video ${id} canplay`);
      });
    },

    pauseAllExcept(id: number) {
      Object.entries(this.videoRefs).forEach(([key, video]) => {
        if (Number(key) !== id) {
          video.pause();
          video.currentTime = 0; // ← reset to show poster
          video.load(); // ← forces poster repaint
        }
      });
    },

    handleHover(id: number) {
      const video = this.videoRefs[id];
      if (!video) return;

      this.pauseAllExcept(id);
      video.play();
    },

    pauseVideo(id: number) {
      const video = this.videoRefs[id];
      if (video) video.pause();
    },

    /* ---------------- TOUCH FALLBACK ---------------- */

    handleTap(id: number) {
      const video = this.videoRefs[id];
      if (!video) return;

      // First tap → play preview
      if (this.lastTouchedVideo !== id) {
        this.pauseAllExcept(id);
        video.play();
        this.lastTouchedVideo = id;
        return;
      }

      // Second tap → select
      this.toggleMentorSelection(id);
      this.lastTouchedVideo = null;
    },

    /* ---------------- SELECTION ---------------- */

    toggleMentorSelection(id: number) {
      const index = this.selectedMentors.indexOf(id);
      if (index > -1) {
        this.selectedMentors.splice(index, 1);
      } else if (this.selectedMentors.length < 3) {
        this.selectedMentors.push(id);
      }
    },

    /* ---------------- API (UNCHANGED) ---------------- */

    async insertMentors() {
      try {
        Swal.fire({
          title: "Sending...",
          text: "Sending your mentor selection",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const response = await fetch(
          "https://api.ewcprogram.com/ewc/insert_mentors",
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

        if (response.ok) {
          Swal.close();
          this.$router.push("/thank-you");
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
});
</script>

<style scoped>
.mentor-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.mentor-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.mentor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.mentor-card.selected {
  outline: 4px solid #69478e;
}

.mentor-card.disabled {
  opacity: 0.4;
  pointer-events: none;
}

.mentor-video {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.mentor-overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 0.75rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0));
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mentor-name {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: capitalize;
}

.checkmark {
  background: #69478e;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
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
</style>
