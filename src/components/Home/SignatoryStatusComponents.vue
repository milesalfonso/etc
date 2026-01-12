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
        <h1 class="text-purple">Signatory Status</h1>
      </div>
      <div class="row justify-content-center mb-3">
        <div class="col-md-6">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Search by participant, email, or mentor..."
          />
        </div>
      </div>
      <div class="row justify-content-center mb-3">
        <div class="col-md-3">
          <select v-model="participantStatusFilter" class="form-select">
            <option value="">All Participant Status</option>
            <option value="Signed">Signed</option>
            <option value="Pending Signature">Pending Signature</option>
          </select>
        </div>
        <div class="col-md-3">
          <select v-model="mentorStatusFilter" class="form-select">
            <option value="">All Mentor Status</option>
            <option value="Signed">Signed</option>
            <option value="Pending Signature">Pending Signature</option>
            <option value="N/A">N/A</option>
          </select>
        </div>
        <div class="col-md-2">
          <select v-model="trackFilter" class="form-select">
            <option value="">All Tracks</option>
            <option value="Track 1">Track 1</option>
            <option value="Track 2">Track 2</option>
          </select>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <button
            @click="exportToExcel"
            class="btn btnPurplePillLight dynamic-width"
          >
            Export to Excel
          </button>
        </div>
        <div class="col-auto">
          <button
            @click="clearFilters"
            class="btn btn-outline-secondary dynamic-width"
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div class="row justify-content-center mt-2">
        <div class="col-auto">
          <small class="text-muted">
            Showing {{ filteredData.length }} of {{ signatoryData.length }} records
          </small>
        </div>
      </div>
    </div>
  </div>
  <div class="row d-flex justify-content-center align-items-center">
    <div class="col-11">
      <div v-if="loading" class="text-center">
        <p class="text-purple">Loading...</p>
      </div>
      <div v-else-if="signatoryData.length === 0" class="text-center">
        <p class="text-purple">No signatory data available</p>
      </div>
      <div v-else class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead class="table-purple">
            <tr>
              <th @click="sortBy('participant')" class="sortable">
                Participant
                <span class="sort-icon">{{ getSortIcon('participant') }}</span>
              </th>
              <th @click="sortBy('participant_email')" class="sortable">
                Participant Email
                <span class="sort-icon">{{ getSortIcon('participant_email') }}</span>
              </th>
              <th @click="sortBy('participant_signatory_status')" class="sortable">
                Participant Signatory Status
                <span class="sort-icon">{{ getSortIcon('participant_signatory_status') }}</span>
              </th>
              <th @click="sortBy('participant_date_signed')" class="sortable">
                Participant Date Signed
                <span class="sort-icon">{{ getSortIcon('participant_date_signed') }}</span>
              </th>
              <th @click="sortBy('mentor')" class="sortable">
                Mentor
                <span class="sort-icon">{{ getSortIcon('mentor') }}</span>
              </th>
              <th @click="sortBy('mentor_email')" class="sortable">
                Mentor Email
                <span class="sort-icon">{{ getSortIcon('mentor_email') }}</span>
              </th>
              <th @click="sortBy('mentor_signatory_status')" class="sortable">
                Mentor Signatory Status
                <span class="sort-icon">{{ getSortIcon('mentor_signatory_status') }}</span>
              </th>
              <th @click="sortBy('mentor_date_signed')" class="sortable">
                Mentor Date Signed
                <span class="sort-icon">{{ getSortIcon('mentor_date_signed') }}</span>
              </th>
              <th>Mentee PDF</th>
              <th>Mentor PDF</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredData" :key="index">
              <td>{{ item.participant }}</td>
              <td>{{ item.participant_email }}</td>
              <td>
                <span
                  :class="{
                    'badge bg-success': item.participant_signatory_status === 'Signed',
                    'badge bg-warning': item.participant_signatory_status === 'Pending Signature'
                  }"
                >
                  {{ item.participant_signatory_status }}
                </span>
              </td>
              <td>{{ item.participant_date_signed || 'N/A' }}</td>
              <td>{{ item.mentor }}</td>
              <td>{{ item.mentor_email }}</td>
              <td>
                <span
                  v-if="item.mentor_signatory_status !== 'N/A'"
                  :class="{
                    'badge bg-success': item.mentor_signatory_status === 'Signed',
                    'badge bg-warning': item.mentor_signatory_status === 'Pending Signature'
                  }"
                >
                  {{ item.mentor_signatory_status }}
                </span>
                <span v-else>{{ item.mentor_signatory_status }}</span>
              </td>
              <td>{{ item.mentor_date_signed || 'N/A' }}</td>
              <td>
                <a
                  :href="item.mentee_pdf"
                  target="_blank"
                  class="btn btn-sm btn-outline-purple"
                >
                  View PDF
                </a>
              </td>
              <td>
                <a
                  v-if="item.mentor_pdf !== 'N/A'"
                  :href="item.mentor_pdf"
                  target="_blank"
                  class="btn btn-sm btn-outline-purple"
                >
                  View PDF
                </a>
                <span v-else>N/A</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Purple footer (full width like header) -->
  <div class="row mt-4">
    <div class="col p-0">
      <div class="purple-footer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import "../../assets/body-bg.css";

interface SignatoryData {
  participant: string;
  participant_email: string;
  participant_signatory_status: string;
  participant_date_signed: string | null;
  mentor: string;
  mentor_email: string;
  mentor_signatory_status: string;
  mentor_date_signed: string | null;
  mentee_pdf: string;
  mentor_pdf: string;
}

export default defineComponent({
  name: "SignatoryStatusComponents",
  data() {
    return {
      signatoryData: [] as SignatoryData[],
      loading: false,
      searchQuery: "",
      participantStatusFilter: "",
      mentorStatusFilter: "",
      trackFilter: "",
      sortColumn: "",
      sortDirection: "asc" as "asc" | "desc",
    };
  },
  computed: {
    filteredData(): SignatoryData[] {
      let filtered = [...this.signatoryData];

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.participant.toLowerCase().includes(query) ||
            item.participant_email.toLowerCase().includes(query) ||
            item.mentor.toLowerCase().includes(query) ||
            item.mentor_email.toLowerCase().includes(query)
        );
      }

      // Apply participant status filter
      if (this.participantStatusFilter) {
        filtered = filtered.filter(
          (item) =>
            item.participant_signatory_status === this.participantStatusFilter
        );
      }

      // Apply mentor status filter
      if (this.mentorStatusFilter) {
        filtered = filtered.filter(
          (item) => item.mentor_signatory_status === this.mentorStatusFilter
        );
      }

      // Apply track filter
      if (this.trackFilter) {
        filtered = filtered.filter((item) => item.mentor === this.trackFilter);
      }

      // Apply sorting
      if (this.sortColumn) {
        filtered.sort((a, b) => {
          const aValue = a[this.sortColumn as keyof SignatoryData] || "";
          const bValue = b[this.sortColumn as keyof SignatoryData] || "";

          let comparison = 0;
          if (aValue < bValue) comparison = -1;
          if (aValue > bValue) comparison = 1;

          return this.sortDirection === "asc" ? comparison : -comparison;
        });
      }

      return filtered;
    },
  },
  mounted() {
    this.fetchSignatoryStatus();
  },
  methods: {
    sortBy(column: string) {
      if (this.sortColumn === column) {
        // Toggle sort direction if clicking the same column
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        // Set new column and default to ascending
        this.sortColumn = column;
        this.sortDirection = "asc";
      }
    },
    getSortIcon(column: string): string {
      if (this.sortColumn !== column) {
        return "⇅"; // Both arrows for unsorted
      }
      return this.sortDirection === "asc" ? "▲" : "▼";
    },
    clearFilters() {
      this.searchQuery = "";
      this.participantStatusFilter = "";
      this.mentorStatusFilter = "";
      this.trackFilter = "";
      this.sortColumn = "";
      this.sortDirection = "asc";
    },
    async fetchSignatoryStatus() {
      this.loading = true;
      try {
        const response = await axios.get(
          "https://api.ewcprogram.com/signatory-status"
        );
        this.signatoryData = response.data;
      } catch (error) {
        console.error("Error fetching signatory status:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch signatory status data",
        });
      } finally {
        this.loading = false;
      }
    },
    async exportToExcel() {
      try {
        if (this.signatoryData.length === 0) {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "No data to export",
          });
          return;
        }

        // Add headers to the data
        const headers = [
          "Participant",
          "Participant Email",
          "Participant Signatory Status",
          "Participant Date Signed",
          "Mentor",
          "Mentor Email",
          "Mentor Signatory Status",
          "Mentor Date Signed",
          "Mentee PDF",
          "Mentor PDF",
        ];

        const formattedData = [
          headers,
          ...this.signatoryData.map((item: SignatoryData) => [
            item.participant,
            item.participant_email,
            item.participant_signatory_status,
            item.participant_date_signed || "N/A",
            item.mentor,
            item.mentor_email,
            item.mentor_signatory_status,
            item.mentor_date_signed || "N/A",
            item.mentee_pdf,
            item.mentor_pdf,
          ]),
        ];

        // Create a new workbook and add the data
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(formattedData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Signatory Status");

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
        a.download = "signatory_status.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data exported successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error exporting to Excel:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to export data",
        });
      }
    },
  },
});
</script>

<style scoped>
.table-purple thead {
  background-color: #69478e;
  color: white;
}

.btn-outline-purple {
  border-color: #69478e;
  color: #69478e;
}

.btn-outline-purple:hover {
  background-color: #69478e;
  color: white;
}

.table {
  font-size: 0.875rem;
}

.table th,
.table td {
  vertical-align: middle;
  white-space: nowrap;
}

.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
  transition: background-color 0.2s;
}

.sortable:hover {
  background-color: #553870;
}

.sort-icon {
  margin-left: 5px;
  font-size: 0.75rem;
  opacity: 0.7;
}

.form-control:focus,
.form-select:focus {
  border-color: #69478e;
  box-shadow: 0 0 0 0.2rem rgba(105, 71, 142, 0.25);
}
</style>
