<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="signatureTrack2Modal"
    tabindex="-1"
    aria-labelledby="signatureTrack2ModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-purple" id="signatureTrack2ModalLabel">
            Add Signature
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body container-fluid">
          <div class="row d-flex justify-content-center align-items-center">
            <!-- <VueSignaturePad ref="signaturePad" :options="options" /> -->
            <VueSignaturePad
              width="400px"
              height="250px"
              style="background-color: white; border: 1px solid black"
              ref="signaturePad"
              :options="{
                    onBegin: () => {
                      ($refs.signaturePad as any).resizeCanvas();
                    },
                    penColor: '#69478e',
                    dotSize: 1,
                    minWidth: 0.5,
                    maxWidth: 2.5,
                    throttle: 16,
                    minPointDistance: 5,
                  }"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btnGreyLight"
            data-bs-dismiss="modal"
          >
            Close</button
          ><button
            type="button"
            class="btn btnGreyLight"
            @click="clearSignature"
          >
            Clear
          </button>
          <button
            type="button"
            class="btn btnPurpleLight"
            @click="handleSubmit"
            data-bs-dismiss="modal"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VueSignaturePad } from "vue-signature-pad";
import Swal from "sweetalert2";
import axios from "axios";

// import Swal from "sweetalert2";
// import * as bootstrap from "bootstrap";

export default defineComponent({
  name: "ModalAddSignature",
  components: {
    VueSignaturePad,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      signaturePad: VueSignaturePad,
    };
  },
  methods: {
    async handleSubmit() {
      const signaturePad = this.$refs.signaturePad as any;
      const dataUrl = signaturePad.saveSignature();

      Swal.fire({
        title: "Adding Signature...",
        text: "Please wait while we add the signature.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const participant_data = {
          id: this.id,
          participant_signed_date: this.date,
          participant_signature: {
            data: dataUrl,
            isEmpty: dataUrl === "",
          },
        };

        const formData = new FormData();
        formData.append("id", this.id);
        formData.append("date", this.date);
        if (dataUrl.isEmpty) {
          formData.append("signature", new File([], ""));
        } else {
          const byteString = atob(dataUrl.data.split(",")[1]);
          const mimeString = dataUrl.data
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          formData.append("signature", blob);
        }

        let endpoint = "";

        if (this.type === "participant") {
          endpoint = "update_track_2_participant";
        } else {
          endpoint = "update_track_2_mentor";
        }

        const response = await axios.post(
          "https://api.ewcprogram.com/" + endpoint,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          Swal.close();
          location.reload();
        } else {
          throw new Error("Failed to update participant");
        }
      } catch (error) {
        console.error("Error updating participant:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update participant",
        });
      }
    },
    // something() {
    //   const formData = new FormData();

    //   if (initialTest.transaction_waiver_signature.isEmpty) {
    //     formData.append("transaction_waiver_signature", new File([], ""));
    //   } else {
    //     const byteString = atob(
    //       initialTest.transaction_waiver_signature.data.split(",")[1]
    //     );
    //     const mimeString = initialTest.transaction_waiver_signature.data
    //       .split(",")[0]
    //       .split(":")[1]
    //       .split(";")[0];
    //     const ab = new ArrayBuffer(byteString.length);
    //     const ia = new Uint8Array(ab);
    //     for (let i = 0; i < byteString.length; i++) {
    //       ia[i] = byteString.charCodeAt(i);
    //     }
    //     const blob = new Blob([ab], { type: mimeString });
    //     formData.append("transaction_waiver_signature", blob);
    //   }

    //   const response = await axios.post(
    //     "https://api.ewcprogram.com/api/update_initial_test",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log("Initial test updated successfully:", response.data);
    //   return response.data;
    // }
    clearSignature() {
      const signaturePad = this.$refs.signaturePad as any;
      signaturePad.clearSignature();
    },
  },
});
</script>

<style scoped>
.img-fluid {
  object-fit: fill !important;
  border-radius: 20px !important;
}

.bg-red-opacity {
  background-color: rgba(255, 0, 0, 0.25); /* Red with 50% opacity */
}

.modal-content {
  /* background-image: url("@/assets/images/background/backgroundMain.png"); */
  /* background-color: transparent; */
  /* background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(8px); */
  /* background-color: #373737; */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-family: Tahoma, Verdana, sans-serif !important;
  overflow: auto;
  color: white;
  /* padding: 30px 30px; */
  /* border: 1px solid slategray; */
}

.modal-body {
  padding: 30px 30px;
}

.inputBox {
  background-color: #373737;
  color: white !important;
  border: none;
  border: 1px solid white;
}

.inputBox-noborder {
  background-color: #373737;
  color: white !important;
  border: none;
  /* ::placeholder {
                  color: white !important;
                } */
}

.form-select {
  --bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e") !important;
}

.btnClose {
  background-color: transparent !important;
  color: #373737 !important;
  border: none !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

::placeholder {
  color: white;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder {
  /* Edge 12 -18 */
  color: white;
}

th,
td {
  padding: 15px;
}

.btn-close-white {
  filter: invert(1) grayscale(100%) brightness(200%);
}

.modal-header {
  border-color: transparent;
}

.btn-dark-bordered {
  background-color: transparent;
  color: white;
  border: 1px solid red;
}
</style>
