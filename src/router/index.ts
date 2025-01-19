import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import type { Router } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import TrackOneView from "../views/TrackOneView.vue";
import AdminView from "../views/AdminView.vue";
import TrackTwoView from "../views/TrackTwoView.vue";
import MentorsView from "../views/MentorsView.vue";
import PdfView from "../views/PdfView.vue";
import MentorPdfView from "../views/MentorPdfView.vue";
import MenteePdfView from "../views/MenteePdfView.vue";
import HomeView from "../views/HomeView.vue";
import TermsAndConditionsView from "../views/TermsAndConditionsView.vue";
import ThankYouView from "../views/ThankYouView.vue";
import ThankYouViewMentor from "../views/ThankYouMentorView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/track-1",
    component: TrackOneView,
  },
  {
    path: "/track-2",
    component: TrackTwoView,
  },
  {
    path: "/admin",
    component: AdminView,
  },
  {
    path: "/mentors",
    component: MentorsView,
  },
  {
    path: "/pdf",
    component: PdfView,
  },
  {
    path: "/mentor-pdf",
    component: MentorPdfView,
  },
  {
    path: "/mentee-pdf",
    component: MenteePdfView,
  },
  {
    path: "/terms-and-conditions",
    component: TermsAndConditionsView,
  },
  {
    path: "/thank-you",
    component: ThankYouView,
  },
  {
    path: "/thank-you-mentor",
    component: ThankYouViewMentor,
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
