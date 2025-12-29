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
        <h1 class="text-center">
          تهانينا! لقد أتممتمي بنجاح الوصول إلى هذا المستوى من التسجيل في برنامج
          EWC. يرجى اختيار ثلاثة (3) مدربات بعناية من القائمة المعتمدة لعام
          2026، مع تخصيص 30–33 دقيقة لمراجعة جميع المقاطع التعريفية. يشترط
          النظام إدخال ثلاثة اختيارات فقط. بعد الإرسال، سيتم تعيين مدربة واحدة،
          وسيتم إرسال نموذج موافقة آلي خاص بالخصوصية والسرية عبر رابط الكتروني
          بالايميل، ليتم توقيعه من قبلكم ومن قبل المدربة المختارة. ستُرسل نسخ من
          النموذج الموقّع إلى إدارة البرنامج، والمدربة، وإليكم. نتمنى لكِ تجربة
          اختيار سلسة ومثمرة.
        </h1>
        <h4>
          CONGRATULATIONS! You have successfully achieved this level of
          enrolment in the EWC Program. Please carefully select three (3)
          preferred mentors from the provided 2026 list. Allow 30–33 minutes to
          review all videos. The system requires exactly three selections. After
          submission, one mentor will be assigned, and an automated privacy and
          confidentiality consent form will be shared for signature by both you
          and the mentor. Copies will be provided to Program Management, your
          mentor, and yourself. We wish you a smooth selection process.
        </h4>
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
            playsinline
            preload="metadata"
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
      lastTappedMentorId: null as number | null,
      fullName: "",
      title: "",
      entity: "",
      email: "",
      mobile: "",

      mentors: [
        {
          id: 14,
          name: "Mumtaz Abdullah",
          poster: posterUrl(14),
          video: videoUrl(14),
        },
        {
          id: 15,
          name: "Safaae RSCI",
          poster: posterUrl(15),
          video: videoUrl(15),
        },
        {
          id: 16,
          name: "Rola Cheikha",
          poster: posterUrl(16),
          video: videoUrl(16),
        },
        {
          id: 17,
          name: "Dr.Malek Najar",
          poster: posterUrl(17),
          video: videoUrl(17),
        },
        {
          id: 18,
          name: "Sandhya Mahalakshmi",
          poster: posterUrl(18),
          video: videoUrl(18),
        },
        {
          id: 19,
          name: "Anita Raina",
          poster: posterUrl(19),
          video: videoUrl(19),
        },
        {
          id: 20,
          name: "Dinu Iheal Sound Healer",
          poster: posterUrl(20),
          video: videoUrl(20),
        },
        {
          id: 21,
          name: "Wafa Disi",
          poster: posterUrl(21),
          video: videoUrl(21),
        },
        {
          id: 22,
          name: "Nowsheen Yaqoob",
          poster: posterUrl(22),
          video: videoUrl(22),
        },
        {
          id: 23,
          name: "Lena Zidan",
          poster: posterUrl(23),
          video: videoUrl(23),
        },
        {
          id: 24,
          name: "Dr.Hanan Mohamed Selim",
          poster: posterUrl(24),
          video: videoUrl(24),
        },
        {
          id: 25,
          name: "Cristina Balhui",
          poster: posterUrl(25),
          video: videoUrl(25),
        },
        {
          id: 26,
          name: "Haneen Farid",
          poster: posterUrl(26),
          video: videoUrl(26),
        },
        {
          id: 27,
          name: "Olivia Tawadros",
          poster: posterUrl(27),
          video: videoUrl(27),
        },
        { id: 28, name: "Ahed", poster: posterUrl(28), video: videoUrl(28) },
        {
          id: 29,
          name: "Hajra Hussain",
          poster: posterUrl(29),
          video: videoUrl(29),
        },
        {
          id: 30,
          name: "Shoneli Kamal",
          poster: posterUrl(30),
          video: videoUrl(30),
        },
        {
          id: 31,
          name: "Nada Ahmed",
          poster: posterUrl(31),
          video: videoUrl(31),
        },
        {
          id: 32,
          name: "Simar Halwany",
          poster: posterUrl(32),
          video: videoUrl(32),
        },
        {
          id: 33,
          name: "Arrati Vinay Tuteja",
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
          name: "Nataliya Wiedemeyer",
          poster: posterUrl(35),
          video: videoUrl(35),
        },
        {
          id: 36,
          name: "Mona Gamal",
          poster: posterUrl(36),
          video: videoUrl(36),
        },
        {
          id: 37,
          name: "Aisha Abdulqader",
          poster: posterUrl(37),
          video: videoUrl(37),
        },
        {
          id: 38,
          name: "Jamila Korek",
          poster: posterUrl(38),
          video: videoUrl(38),
        },
        {
          id: 39,
          name: "Sarah Tuqan",
          poster: posterUrl(39),
          video: videoUrl(39),
        },
        {
          id: 40,
          name: "Israa Zubdiyha",
          poster: posterUrl(40),
          video: videoUrl(40),
        },
        {
          id: 41,
          name: "Omneya Omer",
          poster: posterUrl(41),
          video: videoUrl(41),
        },
        {
          id: 42,
          name: "Nervana Yahya",
          poster: posterUrl(42),
          video: videoUrl(42),
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
    openVideoModal(mentor: any) {
      this.activeMentor = mentor;
      this.showVideoModal = true;

      this.$nextTick(() => {
        const v = this.$refs.modalVideo as HTMLVideoElement | undefined;
        if (!v) return;

        v.load();
        const p = v.play();
        if (p && typeof (p as any).catch === "function") {
          (p as Promise<void>).catch(() => {
            // Autoplay may be blocked; user can tap play
          });
        }
      });
    },

    closeVideoModal() {
      this.showVideoModal = false;
      this.activeMentor = null;
    },

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
      // Second tap on same mentor → select
      if (this.lastTappedMentorId === id && !this.showVideoModal) {
        this.toggleMentorSelection(id);
        this.lastTappedMentorId = null;
        return;
      }

      // First tap → open modal
      const mentor = this.mentors.find((m) => m.id === id);
      if (!mentor) return;

      this.lastTappedMentorId = id;
      this.openVideoModal(mentor);
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
  aspect-ratio: 16 / 9;
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

.video-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 2147483647; /* max safe */
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
