<script setup>
import { getAuth } from "firebase/auth";
import { getDatabase, get, ref, child } from "firebase/database";
import ActionCard from "../components/ActionCard.vue";
import MobileTopLogo from "../components/MobileTopLogo.vue";
import PubliCard from "../components/PubliCard.vue";
</script>

<script>
export default {
  name: "HomeView",
  components: {
    ActionCard,
    MobileTopLogo,
    PubliCard,
  },
  data() {
    return {
      posts: [],
      mode: 0,
      version: "1.0.1",
    };
  },
  mounted() {
    this.getPosts();
    this.getUser();

    // Get user if auth changes
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.getUser();
      }
    });
  },
  methods: {
    getPosts() {
      const db = getDatabase();
      const postsRef = ref(db, "posts");
      get(postsRef).then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            this.posts.push({
              id: childSnapshot.key,
              title: childData.title,
              subtitle: childData.subtitle,
              date: childData.date,
            });
          });
        }
      });
    },
    getUser() {
      const db = getDatabase();
      const userRef = ref(db, "users");
      const newUserRef = ref(db, "new_users");

      // Check if logged in with onAuthStateChanged
      const auth = getAuth();
      console.log(auth.currentUser);
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("User is logged in");
          // Try to locate in new users
          get(child(newUserRef, user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log("User is new");
              this.mode = 1;
            } else {
              // Try to locate in users
              get(child(userRef, user.uid))
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    // Check if user is admin
                    if (snapshot.val().adm) {
                      console.log("User is admin");
                      this.mode = 2;
                    } else {
                      console.log("User is not admin");
                      this.mode = 3;
                    }
                  } else {
                    this.mode = 0;
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          });
        } else {
          console.log("User is not logged in");
          this.mode = 0;
        }
      });
    },
  },
};
</script>

<template>
  <div>
    <main>
      <MobileTopLogo />
      <div class="head-display-card">
        <div class="svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1839.74 1633.71">
            <polyline
              points="1212 1627.71 1212 186.19 1569.35 186.19 1839.74 186.19"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 24px;
              "
            />
            <polyline
              points="1212 1627.71 1212 1620.76 1212 1531.79 1212 1442.83 1212 1309.56 1212 1220.6 1212 1131.63 1212 970.64 1212 881.68 1212 792.71 1212 631.72 1212 542.75 1212 453.79 1212 302.32 12 302.32 12 1627.71"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 24px;
              "
            />
            <polyline
              points="1676.51 1628.35 1676.51 328.12 1839.74 328.12"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 20px;
              "
            />
            <path
              d="M1811.61,1919.36"
              transform="translate(-80.26 -291.65)"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 20px;
              "
            />
            <rect
              x="1316.22"
              y="416.19"
              width="253.13"
              height="253.13"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <line
              x1="1442.79"
              y1="416.19"
              x2="1442.79"
              y2="669.32"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <rect
              x="1316.22"
              y="755.11"
              width="253.13"
              height="253.13"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <line
              x1="1442.79"
              y1="755.11"
              x2="1442.79"
              y2="1008.24"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <rect
              x="1316.22"
              y="1094.03"
              width="253.13"
              height="253.13"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <line
              x1="1442.79"
              y1="1094.03"
              x2="1442.79"
              y2="1347.16"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <polyline
              points="1569.35 1627.71 1569.35 1405.22 1442.79 1405.22 1316.22 1405.22 1316.22 1627.71"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <line
              x1="1442.79"
              y1="1627.71"
              x2="1442.79"
              y2="1405.22"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <g>
              <rect
                x="91.89"
                y="416.19"
                width="253.13"
                height="253.13"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="218.45"
                y1="416.19"
                x2="218.45"
                y2="669.32"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <rect
                x="91.89"
                y="755.11"
                width="253.13"
                height="253.13"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="218.45"
                y1="755.11"
                x2="218.45"
                y2="1008.24"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <rect
                x="91.89"
                y="1094.03"
                width="253.13"
                height="253.13"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="218.45"
                y1="1094.03"
                x2="218.45"
                y2="1347.16"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <polyline
                points="91.89 1627.71 91.89 1405.22 218.45 1405.22 345.01 1405.22 345.01 1627.71"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="218.45"
                y1="1627.71"
                x2="218.45"
                y2="1405.22"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
            </g>
            <g>
              <rect
                x="422.53"
                y="416.19"
                width="253.13"
                height="253.13"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="549.09"
                y1="416.19"
                x2="549.09"
                y2="669.32"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <rect
                x="422.53"
                y="755.11"
                width="253.13"
                height="253.13"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="549.09"
                y1="755.11"
                x2="549.09"
                y2="1008.24"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <rect
                x="422.53"
                y="1094.03"
                width="253.13"
                height="253.13"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="549.09"
                y1="1094.03"
                x2="549.09"
                y2="1347.16"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <polyline
                points="675.66 1627.71 675.66 1405.22 549.09 1405.22 422.53 1405.22 422.53 1627.71"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="549.09"
                y1="1627.71"
                x2="549.09"
                y2="1405.22"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
            </g>
            <g>
              <rect
                x="753.18"
                y="416.19"
                width="253.13"
                height="253.13"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="879.74"
                y1="416.19"
                x2="879.74"
                y2="669.32"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <rect
                x="753.18"
                y="755.11"
                width="253.13"
                height="253.13"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="879.74"
                y1="755.11"
                x2="879.74"
                y2="1008.24"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <rect
                x="753.18"
                y="1094.03"
                width="253.13"
                height="253.13"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="879.74"
                y1="1094.03"
                x2="879.74"
                y2="1347.16"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <polyline
                points="1006.3 1627.71 1006.3 1405.22 879.74 1405.22 753.18 1405.22 753.18 1627.71"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="879.74"
                y1="1627.71"
                x2="879.74"
                y2="1405.22"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
            </g>
            <polyline
              points="1839.74 669.32 1731.35 669.32 1731.35 416.19 1839.74 416.19"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <polyline
              points="1839.74 1008.24 1731.35 1008.24 1731.35 755.11 1839.74 755.11"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <polyline
              points="1839.74 1347.16 1731.35 1347.16 1731.35 1094.03 1839.74 1094.03"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <polyline
              points="1731.35 1627.71 1731.35 1405.22 1839.74 1405.22"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 12px;
              "
            />
            <polyline
              points="1839.74 12 1569.35 12 1569.35 186.19 1839.74 186.19"
              style="
                fill: none;
                stroke: var(--primary);
                stroke-miterlimit: 10;
                stroke-width: 24px;
              "
            />
            <g>
              <path
                d="M1292.26,923.37a95.93,95.93,0,1,1,0-177.93"
                transform="translate(-80.26 -291.65)"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="1212"
                y1="542.75"
                x2="1080.17"
                y2="542.75"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="1176.09"
                y1="446.83"
                x2="1176.09"
                y2="638.67"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
            </g>
            <g>
              <path
                d="M1292.26,1262.29a95.93,95.93,0,1,1,0-177.93"
                transform="translate(-80.26 -291.65)"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="1212"
                y1="881.68"
                x2="1080.17"
                y2="881.68"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="1176.09"
                y1="785.75"
                x2="1176.09"
                y2="977.59"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
            </g>
            <g>
              <path
                d="M1292.26,1601.21a95.93,95.93,0,1,1,0-177.93"
                transform="translate(-80.26 -291.65)"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="1212"
                y1="1220.6"
                x2="1080.17"
                y2="1220.6"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="1176.09"
                y1="1124.67"
                x2="1176.09"
                y2="1316.51"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
            </g>
            <g>
              <path
                d="M1292.26,1734.48a95.93,95.93,0,1,0-35.91,184.88"
                transform="translate(-80.26 -291.65)"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="1212"
                y1="1531.79"
                x2="1080.17"
                y2="1531.79"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
              <line
                x1="1176.09"
                y1="1435.87"
                x2="1176.09"
                y2="1627.71"
                style="
                  fill: none;
                  stroke: var(--primary);
                  stroke-miterlimit: 10;
                  stroke-width: 12px;
                "
              />
            </g>
          </svg>
        </div>
        <div class="head-display-card-text">
          <h1 class="title">Sistema de Departamentos CEU/PR</h1>
          <p class="subtitle">Controle de relatórios e horas dos moradores</p>
        </div>
      </div>

      <!-- Publicações -->
      <h1 class="secondary-title">Publicações</h1>
      <!-- <p class="subtitle-content">
        Postagens realizadas pelos administradores da página. Clique nos cards
        para ver mais
      </p> -->
      <transition name="fadeup">
        <div class="posts_holder" v-if="posts.length > 0">
          <PubliCard
            v-for="post in posts"
            :key="post.id"
            :title="post.title"
            :subtitle="post.subtitle"
            :date="post.date"
            :id="post.id"
          />
        </div>
        <div v-else>
          <p class="no-posts">Nenhuma publicação encontrada</p>
        </div>
      </transition>

      <!-- Sua conta -->
      <h1 class="secondary-title">Sua conta</h1>

      <!-- Usuário já logado, sem aprovação dos administradores -->
      <div class="container account_type" v-if="mode == 1">
        <!-- Import svg -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 500 500"
        >
          <defs>
            <clipPath id="freepik--clip-path--inject-32">
              <rect
                x="187.76"
                y="71.16"
                width="238.13"
                height="232.2"
                rx="6.95"
                style="
                  fill: #fff;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-2--inject-32">
              <path
                d="M279.83,285H224.64a13,13,0,0,1-13-13h0a13,13,0,0,1,13-13h55.19a13,13,0,0,1,13,13h0A13,13,0,0,1,279.83,285Z"
                style="
                  fill: var(--primary);
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
            </clipPath>
            <clipPath id="freepik--clip-path-3--inject-32">
              <path
                d="M120.78,403.37q-6.19-4.72-12.22-10c-5.81-5-11.47-10.44-16.91-16.15a194.86,194.86,0,0,1,4.9-18.91,24.76,24.76,0,0,1,11.12-13.89l.2-.12.93-.52c.58-.31,1.14-.59,1.68-.83a25.34,25.34,0,0,1,5.56-1.82L120.29,397Z"
                style="
                  fill: var(--primary);
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
            </clipPath>
          </defs>
          <g id="freepik--background-simple--inject-32">
            <path
              d="M67.93,167.09s-27.88,72,11.3,144.5S199.11,422.39,263.7,455.14s131.66,16.8,163.53-36.84-11.84-91.93-11.9-168.42,11.45-96.74-30-161.36-143.06-78.93-219.9-31S67.93,167.09,67.93,167.09Z"
              style="fill: #fff; opacity: 0.7000000000000001"
            ></path>
            <path
              d="M35.11,283.36a108.58,108.58,0,0,1,5.79-64.51C52.45,190.3,77.26,170,105.07,158.17,145.47,141,185.14,140.63,218,106.92c10.13-10.4,18.64-22.31,29-32.5,30.52-30,75.2-26.39,108.55-2.57,69.59,49.69,94.62,148.1,90.75,229.46-1.74,36.51-19.17,70.5-46.76,94.45-62.4,54.18-168.36,45.07-240,16.79C106,391.46,47.66,342.26,35.11,283.36Z"
              style="fill: var(--primary)"
            ></path>
            <path
              d="M35.11,283.36a108.58,108.58,0,0,1,5.79-64.51C52.45,190.3,77.26,170,105.07,158.17,145.47,141,185.14,140.63,218,106.92c10.13-10.4,18.64-22.31,29-32.5,30.52-30,75.2-26.39,108.55-2.57,69.59,49.69,94.62,148.1,90.75,229.46-1.74,36.51-19.17,70.5-46.76,94.45-62.4,54.18-168.36,45.07-240,16.79C106,391.46,47.66,342.26,35.11,283.36Z"
              style="fill: #fff; opacity: 0.7000000000000001"
            ></path>
          </g>
          <g id="freepik--Icons--inject-32">
            <path
              d="M297.51,397.8a25,25,0,0,1-2.88,11.7H289.2a2.61,2.61,0,0,0-.48.05,2.14,2.14,0,0,0-1.66,2.09v6.58a25.19,25.19,0,1,1,10.45-20.42Z"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M278.47,407.08a45.87,45.87,0,0,1,10.25,2.47,2.14,2.14,0,0,0-1.66,2.09v6.58A25.17,25.17,0,0,1,252,412.65q.21-.37.45-.75c.94-1.53,6.61-4,14.65-4.84a7.62,7.62,0,0,0,.46-4c0-.23-.06-.44-.09-.65a4.86,4.86,0,0,1-1.11-1.39,22.35,22.35,0,0,1-1-3.17,1.13,1.13,0,0,1-.16.68c-.59.55-1.13-.4-1.21-1.23s-1.11-2.28-1.35-3.1a2.11,2.11,0,0,1,.71-2.05.6.6,0,0,1,.61.06,13.37,13.37,0,0,1-.34-4.42,6.35,6.35,0,0,1,2.52-4.65s1-2.89,6.61-2.87c6.09,0,6.7,3.32,6.7,3.32s3.15,2.1,1.91,8.61a.54.54,0,0,1,.57-.05,2.08,2.08,0,0,1,.71,2.05c-.23.82-1.27,2.26-1.35,3.1s-.62,1.78-1.21,1.23a.65.65,0,0,1-.12-.31,20.57,20.57,0,0,1-1,3.13,4.44,4.44,0,0,1-1.25,1.5,7.65,7.65,0,0,0,.1,2.65A4.39,4.39,0,0,0,278.47,407.08Z"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <rect
              x="287.06"
              y="409.5"
              width="12.29"
              height="12.29"
              rx="2.14"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <polygon
              points="296.26 414.94 293.9 414.94 293.9 412.58 292.5 412.58 292.5 414.94 290.14 414.94 290.14 416.34 292.5 416.34 292.5 418.7 293.9 418.7 293.9 416.34 296.26 416.34 296.26 414.94"
              style="fill: #263238"
            ></polygon>
            <path
              d="M140.49,195.09a34.89,34.89,0,0,1-4,16.26h-8.4a2.14,2.14,0,0,0-2.14,2.14v10a35,35,0,1,1,14.54-28.4Z"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <rect
              x="81.22"
              y="178.15"
              width="48.49"
              height="33.89"
              rx="2.77"
              transform="translate(-35.33 23.74) rotate(-11.01)"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <path
              d="M79.16,186.87,102,199.29a6.67,6.67,0,0,0,8.32-1.62l16.48-20.06"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <line
              x1="87.86"
              y1="213.11"
              x2="101.96"
              y2="199.29"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></line>
            <line
              x1="128.31"
              y1="205.24"
              x2="110.28"
              y2="197.67"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></line>
            <rect
              x="125.95"
              y="211.35"
              width="17.09"
              height="17.09"
              rx="2.14"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <polygon
              points="138.75 218.93 135.47 218.93 135.47 215.65 133.53 215.65 133.53 218.93 130.25 218.93 130.25 220.87 133.53 220.87 133.53 224.15 135.47 224.15 135.47 220.87 138.75 220.87 138.75 218.93"
              style="fill: #263238"
            ></polygon>
            <path
              d="M415.64,335.3h-31.8l.62-1a27.25,27.25,0,0,0,3.94-14.75v-.06a11.34,11.34,0,1,1,22.68.17A25.69,25.69,0,0,0,414.79,334Z"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M397.17,307.93a3.64,3.64,0,1,1,5.15,0"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <rect
              x="381.68"
              y="335.31"
              width="36.13"
              height="3.26"
              rx="1.35"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <circle
              cx="399.74"
              cy="344.05"
              r="2.78"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></circle>
            <path
              d="M430.14,326.68a30.37,30.37,0,0,1-3.46,14.12h-7a2.14,2.14,0,0,0-2.14,2.14v8.4a30.41,30.41,0,1,1,12.61-24.66Z"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <rect
              x="417.53"
              y="340.8"
              width="14.83"
              height="14.83"
              rx="2.14"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <polygon
              points="428.63 347.38 425.79 347.38 425.79 344.53 424.11 344.53 424.11 347.38 421.26 347.38 421.26 349.06 424.11 349.06 424.11 351.9 425.79 351.9 425.79 349.06 428.63 349.06 428.63 347.38"
              style="fill: #263238"
            ></polygon>
          </g>
          <g id="freepik--Window--inject-32">
            <rect
              x="187.76"
              y="71.16"
              width="238.13"
              height="232.2"
              rx="6.95"
              style="fill: #fff"
            ></rect>
            <g style="clip-path: url(#freepik--clip-path--inject-32)">
              <path
                d="M389,285h-55.2a13,13,0,0,1-13-13h0a13,13,0,0,1,13-13H389a13,13,0,0,1,13,13h0A13,13,0,0,1,389,285Z"
                style="
                  fill: var(--primary);
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M347.29,278.38h-2.11l-.36-2.42h-2.57l-.36,2.42H340l2.13-13.3h3.06Zm-4.77-4.22h2l-1-6.73h0Z"
                style="fill: #263238"
              ></path>
              <path
                d="M354.3,273.42v1.76c0,2.13-1.06,3.35-3.11,3.35s-3.12-1.22-3.12-3.35v-6.91c0-2.13,1.06-3.34,3.12-3.34s3.11,1.21,3.11,3.34v1.29h-2v-1.42c0-.95-.42-1.31-1.09-1.31s-1.08.36-1.08,1.31v7.18c0,.95.42,1.29,1.08,1.29s1.09-.34,1.09-1.29v-1.9Z"
                style="fill: #263238"
              ></path>
              <path
                d="M361.64,273.42v1.76c0,2.13-1.07,3.35-3.12,3.35s-3.11-1.22-3.11-3.35v-6.91c0-2.13,1.06-3.34,3.11-3.34s3.12,1.21,3.12,3.34v1.29h-2v-1.42c0-.95-.42-1.31-1.08-1.31s-1.08.36-1.08,1.31v7.18c0,.95.41,1.29,1.08,1.29s1.08-.34,1.08-1.29v-1.9Z"
                style="fill: #263238"
              ></path>
              <path
                d="M365,270.68h2.87v1.9H365v3.9h3.61v1.9h-5.7v-13.3h5.7V267H365Z"
                style="fill: #263238"
              ></path>
              <path
                d="M376.1,268.36v1.73c0,2.13-1,3.29-3.12,3.29h-1v5h-2.09v-13.3H373C375.07,265.08,376.1,266.24,376.1,268.36ZM372,267v4.5h1c.67,0,1-.3,1-1.25v-2c0-1-.36-1.25-1-1.25Z"
                style="fill: #263238"
              ></path>
              <path
                d="M376.46,265.08h6.46V267h-2.18v11.4h-2.09V267h-2.19Z"
                style="fill: #263238"
              ></path>
              <path
                d="M279.83,285H224.64a13,13,0,0,1-13-13h0a13,13,0,0,1,13-13h55.19a13,13,0,0,1,13,13h0A13,13,0,0,1,279.83,285Z"
                style="fill: var(--primary)"
              ></path>
              <g style="clip-path: url(#freepik--clip-path-2--inject-32)">
                <path
                  d="M279.83,285H224.64a13,13,0,0,1-13-13h0a13,13,0,0,1,13-13h55.19a13,13,0,0,1,13,13h0A13,13,0,0,1,279.83,285Z"
                  style="fill: #fff; opacity: 0.6000000000000001"
                ></path>
              </g>
              <path
                d="M279.83,285H224.64a13,13,0,0,1-13-13h0a13,13,0,0,1,13-13h55.19a13,13,0,0,1,13,13h0A13,13,0,0,1,279.83,285Z"
                style="
                  fill: none;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M229.37,265.08h3.31c2.09,0,3.11,1.16,3.11,3.28v6.73c0,2.13-1,3.29-3.11,3.29h-3.31Zm2.09,1.9v9.5h1.18c.66,0,1.06-.35,1.06-1.3v-6.91c0-.95-.4-1.29-1.06-1.29Z"
                style="fill: #263238"
              ></path>
              <path
                d="M239.21,270.68h2.87v1.9h-2.87v3.9h3.61v1.9h-5.7v-13.3h5.7V267h-3.61Z"
                style="fill: #263238"
              ></path>
              <path
                d="M250.18,273.42v1.76c0,2.13-1.06,3.35-3.12,3.35s-3.11-1.22-3.11-3.35v-6.91c0-2.13,1.06-3.34,3.11-3.34s3.12,1.21,3.12,3.34v1.29h-2v-1.42c0-.95-.41-1.31-1.08-1.31s-1.08.36-1.08,1.31v7.18c0,.95.42,1.29,1.08,1.29s1.08-.34,1.08-1.29v-1.9Z"
                style="fill: #263238"
              ></path>
              <path
                d="M251.45,265.08h2.09v11.4H257v1.9h-5.53Z"
                style="fill: #263238"
              ></path>
              <path
                d="M257.9,265.08H260v13.3H257.9Z"
                style="fill: #263238"
              ></path>
              <path
                d="M263.41,268.74h0v9.64h-1.88v-13.3h2.62l2.11,8h0v-8h1.86v13.3H266Z"
                style="fill: #263238"
              ></path>
              <path
                d="M271.71,270.68h2.87v1.9h-2.87v3.9h3.61v1.9h-5.7v-13.3h5.7V267h-3.61Z"
                style="fill: #263238"
              ></path>
              <path
                d="M361,176a54.21,54.21,0,1,1-54.21-54.21A54,54,0,0,1,361,176Z"
                style="
                  fill: var(--primary);
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M351.85,206.15A54.21,54.21,0,0,1,263,207.91c.32-.54.64-1.08,1-1.61,2-3.31,14.24-8.55,31.55-10.43a117.51,117.51,0,0,1,11.76-.7,94.49,94.49,0,0,1,12.73.74C335.08,197.79,347.59,202.77,351.85,206.15Z"
                style="
                  fill: #757575;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M321.3,197.19a15.26,15.26,0,0,1-13.54,7.75c-8,0-13.79-6.92-13.79-6.92,2.8-2.51,3-7.17,2.56-10.84a31.87,31.87,0,0,0-1-5.32h23.86c-1.45,4.77-1.4,8.19-.84,10.57C319.34,195.94,321.3,197.19,321.3,197.19Z"
                style="
                  fill: #fff;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M318.5,192.43c-17.24,4.52-20.66-5.33-20.66-5.33l-1.31.08a31.87,31.87,0,0,0-1-5.32h23.86C317.89,186.63,317.94,190.05,318.5,192.43Z"
                style="fill: #263238"
              ></path>
              <path
                d="M324.53,165.11s1.92-2.09,2.87-1.4a4.47,4.47,0,0,1,1.54,4.4c-.51,1.78-2.74,4.87-2.92,6.67s-1.32,3.84-2.59,2.65S324.53,165.11,324.53,165.11Z"
                style="
                  fill: #fff;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M290.29,165.11s-1.92-2.09-2.87-1.4a4.47,4.47,0,0,0-1.54,4.4c.51,1.78,2.74,4.87,2.92,6.67s1.32,3.84,2.59,2.65S290.29,165.11,290.29,165.11Z"
                style="
                  fill: #fff;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M307,141c24.17,0,18.42,32.18,14,42.51-1.56,3.63-9.66,8.39-13.57,8.39-3.64,0-12-5.69-13.44-9.1C289.47,172.4,284,141,307,141Z"
                style="
                  fill: #fff;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M311.1,160.85s6.29-1.95,8.24,1.94"
                style="
                  fill: none;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M315.76,166.14c0,.74-.38,1.34-.84,1.34s-.85-.6-.85-1.34.38-1.34.85-1.34S315.76,165.4,315.76,166.14Z"
                style="fill: #263238"
              ></path>
              <path
                d="M303.72,160.85s-6.29-1.95-8.24,1.94"
                style="
                  fill: none;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M299.06,166.14c0,.74.38,1.34.84,1.34s.85-.6.85-1.34-.38-1.34-.85-1.34S299.06,165.4,299.06,166.14Z"
                style="fill: #263238"
              ></path>
              <path
                d="M317,149.21a30.6,30.6,0,0,1-18.62,0s-3.27-.19-4.55,1.45,0,6.7.34,8.76-2.83,3.49-2.4,8.69l-1.23,1.8s-3.41-8.38-2.55-15.58,5.41-10,5.41-10,2.07-6.23,14.23-6.18c13.11.05,14.43,7.14,14.43,7.14s8.88,5.93,2.31,25.23l-1.42-2.4a10.81,10.81,0,0,0-1.66-7.32c-1.15-1.67.68-6.69.25-9.27S317,149.21,317,149.21Z"
                style="fill: #263238"
              ></path>
              <path
                d="M308.85,164.8s.07,5.88,1.61,7.79c.79,1-.75,3.1-3.13,3.48"
                style="
                  fill: none;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M302.12,179.48a4.78,4.78,0,0,0,2.25,2.89c1.65.71,6.67.41,7.62-.18s1.42-2.52,1.42-2.52"
                style="
                  fill: #fff;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M301.59,179.36a29.78,29.78,0,0,0,12.48,0"
                style="
                  fill: none;
                  stroke: #263238;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M319.34,149.46s-2.7,4-11.58,4.87a6.5,6.5,0,0,0,1.57-2.25,12.51,12.51,0,0,1-9.43,2.25,9.75,9.75,0,0,0-9,3.67l-1.5,6.8s-5.31-6-1.53-15.64l-1.36,1.13s1.51-12.89,17-13.36l-1.88-1.13s15.43-3.29,21.47,6.87c0,0,5.37,1,6.69,10.29l-1.51-1s2.39,7.71-2.57,14.16C325.67,166.14,319.34,155.93,319.34,149.46Z"
                style="fill: #263238"
              ></path>
              <path
                d="M365.76,105.52H247.9a3,3,0,0,1-3-3h0a3,3,0,0,1,3-3H365.76a3,3,0,0,1,3,3h0A3,3,0,0,1,365.76,105.52Z"
                style="fill: #263238; opacity: 0.5"
              ></path>
              <g style="opacity: 0.4">
                <path
                  d="M357.35,238.66H256.3a1.18,1.18,0,0,1-1.18-1.19h0a1.18,1.18,0,0,1,1.18-1.18H357.35a1.18,1.18,0,0,1,1.19,1.18h0A1.19,1.19,0,0,1,357.35,238.66Z"
                ></path>
                <path
                  d="M347.35,245H266.3a1.18,1.18,0,0,1-1.18-1.19h0a1.18,1.18,0,0,1,1.18-1.18h81.05a1.18,1.18,0,0,1,1.19,1.18h0A1.19,1.19,0,0,1,347.35,245Z"
                ></path>
              </g>
              <rect
                x="338.54"
                y="201.12"
                width="26.45"
                height="26.45"
                rx="4.8"
                style="
                  fill: #263238;
                  stroke: #fff;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
              <polygon
                points="358.35 212.85 353.27 212.85 353.27 207.77 350.27 207.77 350.27 212.85 345.19 212.85 345.19 215.85 350.27 215.85 350.27 220.92 353.27 220.92 353.27 215.85 358.35 215.85 358.35 212.85"
                style="fill: #fff"
              ></polygon>
              <path
                d="M419.21,82.26a4.88,4.88,0,1,1-4.88-4.88A4.88,4.88,0,0,1,419.21,82.26Z"
                style="opacity: 0.30000000000000004"
              ></path>
              <path
                d="M405.21,82.26a4.88,4.88,0,1,1-4.88-4.88A4.88,4.88,0,0,1,405.21,82.26Z"
                style="opacity: 0.30000000000000004"
              ></path>
              <path
                d="M326.46,279s6.26,1.35,6.48,5.91c.48,9.8.46,10.1-6.42,9.23,0,0-4.16,5.71-14.24,4.07l-3.45,5.18H291c4.95-5.91,8.93-10.8,10.67-13.12,6.39-8.51,36.25-21.05,36.25-21.05S337.8,272.47,326.46,279Z"
                style="
                  fill-opacity: 0.7000000000000001;
                  opacity: 0.30000000000000004;
                "
              ></path>
            </g>
            <rect
              x="187.76"
              y="71.16"
              width="238.13"
              height="232.2"
              rx="6.95"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
          </g>
          <g id="freepik--Character--inject-32">
            <path
              d="M101.21,444.14s1.76-12.81,3.07-18.09,9-25.71,10.67-37.15L95.21,373.17s-7.44,38.37-7.44,44.39L83.7,430.67"
              style="
                fill: #fff;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M120.78,403.37q-6.19-4.72-12.22-10c-5.81-5-11.47-10.44-16.91-16.15a194.86,194.86,0,0,1,4.9-18.91,24.76,24.76,0,0,1,11.12-13.89l.2-.12.93-.52c.58-.31,1.14-.59,1.68-.83a25.34,25.34,0,0,1,5.56-1.82L120.29,397Z"
              style="fill: var(--primary)"
            ></path>
            <g style="clip-path: url(#freepik--clip-path-3--inject-32)">
              <path
                d="M120.78,403.37q-6.19-4.72-12.22-10c-5.81-5-11.47-10.44-16.91-16.15a194.86,194.86,0,0,1,4.9-18.91,24.76,24.76,0,0,1,11.12-13.89l.2-.12.93-.52c.58-.31,1.14-.59,1.68-.83a25.34,25.34,0,0,1,5.56-1.82L120.29,397Z"
                style="
                  fill-opacity: 0.7000000000000001;
                  opacity: 0.30000000000000004;
                "
              ></path>
            </g>
            <path
              d="M120.78,403.37q-6.19-4.72-12.22-10c-5.81-5-11.47-10.44-16.91-16.15a194.86,194.86,0,0,1,4.9-18.91,24.76,24.76,0,0,1,11.12-13.89l.2-.12.93-.52c.58-.31,1.14-.59,1.68-.83a25.34,25.34,0,0,1,5.56-1.82L120.29,397Z"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M100.21,372.32s2.3,15.63,12.86,21.59"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M206.08,385c0,8-6.51,40.36-6.51,40.36l-.22,28.43s-13.47,4.47-35.21,4.47c-26.64,0-38.44-7.13-39.48-7.8l-.08-.05,4-19.71s-21-49.56-21.41-51.26c-.65-2.52-1.21-5.07-1.66-7.61A61.48,61.48,0,0,1,104.6,354a25,25,0,0,1,2.91-9.6q.17-.3.36-.6a14.51,14.51,0,0,1,1.89-2.43l.19-.2a19.65,19.65,0,0,1,2.11-1.83h0c.25-.19.51-.37.77-.55l.65-.44.42-.27.55-.34.85-.49c15.79-8.75,45.18-7.4,45.18-7.4a4,4,0,0,1,1-.19h.07a6.38,6.38,0,0,1,1.75.14c7.32,1.42,20.72,13.37,30.59,27a88,88,0,0,1,7.82,12.76C204.41,375,206.08,380.36,206.08,385Z"
              style="fill: var(--primary)"
            ></path>
            <path
              d="M205.9,382.26a52.21,52.21,0,0,1-14.83-7.35c-7.09,1.33-13.93-5.73-15.71-9.51l23.26-1.5c1.13,1.86,2.15,3.73,3.06,5.58A41.38,41.38,0,0,1,205.9,382.26Z"
              style="
                fill-opacity: 0.7000000000000001;
                opacity: 0.30000000000000004;
              "
            ></path>
            <path
              d="M133.31,435.76s5.23,22.38-8.65,14.67l-.08-.05,4-19.71s-21-49.56-21.41-51.26c-.65-2.52-1.21-5.07-1.66-7.61A61.48,61.48,0,0,1,104.6,354a25,25,0,0,1,2.91-9.6q.17-.3.36-.6a14.51,14.51,0,0,1,1.89-2.43l.19-.2a19.65,19.65,0,0,1,2.11-1.83h0c.25-.19.51-.37.77-.55l.65-.44.42-.27.55-.34.85-.49c14.53,1.12,30.68,8,33.8,22.12,0,0-1.32,21.63-6.07,29.54-2.95,4.93-3.95,27.95,10.64,21.29C149.11,433.18,133.31,435.76,133.31,435.76Z"
              style="
                fill-opacity: 0.7000000000000001;
                opacity: 0.30000000000000004;
              "
            ></path>
            <path
              d="M124.58,450.38l4-19.71s-21-49.56-21.41-51.26c-.65-2.52-1.21-5.07-1.66-7.61A61.48,61.48,0,0,1,104.6,354a25,25,0,0,1,2.91-9.6q.17-.3.36-.6a14.51,14.51,0,0,1,1.89-2.43l.19-.2a19.65,19.65,0,0,1,2.11-1.83h0c14.56-11,48.42-9.49,48.42-9.49a4,4,0,0,1,1-.19h.07a6.38,6.38,0,0,1,1.75.14c7.32,1.42,20.72,13.37,30.59,27a88,88,0,0,1,7.82,12.76c2.73,5.53,4.4,10.88,4.4,15.49,0,8-6.51,40.36-6.51,40.36l-.22,28.43"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M175.14,284.56c-1.19-1.48-6.5-5-6.5-5-1-6.91-1.62-16.13-8.78-23.28-9.79-9.77-32.38-6.68-39.78,7.89-14.77,29.11,13.15,56.53,47.32,50.73,2.91-.49,4.87-3.34,5.27-16.87l.91-1.89s-.94-3.23-1.23-4.85C174.07,289.63,176,285.64,175.14,284.56Z"
              style="
                fill: #fff;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M166.74,268.75a18,18,0,0,0-2,4.58"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M167.26,281.77s2.38,1.44,3.46,6"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M173.27,296.82s-.93,1.5-4.8,1.06"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M163.12,252.5s9-3.71,6.4,13.89S153.91,304.92,142.94,301l.19-1.57s9.6,3.79,17.68-12.9,7.41-32,2.79-29.31Z"
              style="fill: #263238"
            ></path>
            <path
              d="M162.31,279.78s-3.44,9.07-6.19,12c0,0-1.11-3.47-3.76-3.5s-5-7.08-5-7.08Z"
              style="fill: #263238"
            ></path>
            <path
              d="M158.61,280.2s-6.32,15.41-1.69,27.31,17.68,20.84,17.68,20.84l-4.21-1.91s-11.08-7.29-14.95-19.91a45.9,45.9,0,0,1-.16-24.51Z"
              style="fill: #263238"
            ></path>
            <path
              d="M106.53,259.69S96,264,96.57,279.61s11.27,29.18,13.42,49.08c1.87,17.31-17,32.55,2.11,52.78,0,0-8.37-13-5.82-27.54s11.3-12.45,4.81-36.12-20.26-37.67-6-52.76Z"
              style="fill: #263238"
            ></path>
            <path
              d="M167.93,324.35c-19.26-10.74-14-33.67-14-33.67C168.42,280,170.35,260,167.69,254.85s-8.46-3.39-8.46-3.39c-23.09-11-51.51-.73-56.91,15.44-6.91,20.71,4.9,36.62,10.67,54,5.18,15.62-6.82,18.45-6.78,34-2.27,29,27.47,41.11,27.47,41.11a5.31,5.31,0,0,1-2.57-4.54c0-3.17,8.11-3.17,13.45-12.1,4.43-7.41,4.78-25.48,6.26-34.22,2-7.91,4.5-14.23,9.67-15.38,13.62-3.05,25.37,10.17,25.37,10.17S187.2,335.09,167.93,324.35Z"
              style="fill: #263238"
            ></path>
            <g style="opacity: 0.30000000000000004">
              <path
                d="M162.31,254.63c2.1,3.69-13.66,23.21-19.37,40.08s.1,26.76.1,26.76"
                style="
                  fill: none;
                  stroke: #fff;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M127,259.69s-17.15,14.77-7.39,41.78,5.44,45.63,2.19,60.19-.61,19.56,3.35,23.52"
                style="
                  fill: none;
                  stroke: #fff;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M148.58,304.27s9.2,10.36,2.89,25.33-9.74,25.67-12.12,37.32-7.65,14.55-7.65,14.55"
                style="
                  fill: none;
                  stroke: #fff;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M149.11,252.17s-9.49-.44-14,11.69-.26,33.09-1.84,40.41"
                style="
                  fill: none;
                  stroke: #fff;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
              <path
                d="M124.58,252.17s-13.92.58-18.36,19.83,8.93,35.43,10.35,50.43-7,28.89-6.49,39.23,6.49,15.8,6.49,15.8"
                style="
                  fill: none;
                  stroke: #fff;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></path>
            </g>
            <path
              d="M211.62,331.36s30.46,2.27,34.81,2.27,44.7-40,51.82-47.87,38-17.76,38-17.76-.39,3.27-12.26,8.73c0,0,6.11,1.9,5.93,6.46-.39,9.81-.44,10.11-7.22,8.62,0,0-4.65,5.33-14.54,2.8,0,0-23.73,29.52-34.22,43s-14.83,18-18.79,19.47-52.22,4.61-52.22,4.61Z"
              style="
                fill: #fff;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M173.27,367.25c15.8,9.89,42.3-2.37,42.3-2.37s4.75-21.52,0-35.29c0,0-33.23-6.47-51.43-.23a7.27,7.27,0,0,0-4.19,4.13"
              style="
                fill: var(--primary);
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M211.37,328.87a78.9,78.9,0,0,1,.64,33.76"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M206.08,342.71s-11,17.94-25.06,20.58"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M195.85,370.57s-7.31,8.67-16.28,8.67"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M188.81,371.11a7.06,7.06,0,0,1,0,5.29h0s1.24,5.21-1.1,12.72c-1.72,5.54-1.64,21.25-2.44,32.3,0,0,2.54,13.33,2.44,33.37"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M171.9,327.53s13.61-.9,21.65,8.59"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M327.43,285.88s-2,3.46-4.35,4.25c0,0-.18,3.61-6.22,4.82"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M325.76,288.15a2.77,2.77,0,0,1,1.22,1.49"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M128.54,430.67S142.6,449,156,442.41"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
            <path
              d="M164.14,392.71s-9.49,29.13-30.85,27.81"
              style="
                fill: none;
                stroke: #263238;
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></path>
          </g>
        </svg>
        <div>
          <h2>Novo por aqui, né? Agora é só aguardar!</h2>
          <p>
            Suas informações já foram submetidas aos administradores e em breve
            a situação será analisada. Agora é só aguardar.
          </p>
          <p>
            Lembramos que apenas diretores e contas oficiais poderão realizar o
            cadastro na plataforma.
          </p>
          <p>Dúvidas? Entre em contato com os responsáveis.</p>
        </div>
      </div>
      <!-- Não cadastrado -->
      <div class="container account_type" v-if="mode == 0">
        <!-- Import svg -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 500 500"
        >
          <defs>
            <clipPath id="freepik--clip-path--inject-1--inject-69">
              <rect
                x="326.65"
                y="339.94"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-2--inject-1--inject-69">
              <rect
                x="353.81"
                y="339.94"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-3--inject-1--inject-69">
              <rect
                x="380.96"
                y="339.94"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-4--inject-1--inject-69">
              <rect
                x="326.65"
                y="369.39"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-5--inject-1--inject-69">
              <rect
                x="353.81"
                y="369.39"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-6--inject-1--inject-69">
              <rect
                x="380.96"
                y="369.39"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-7--inject-1--inject-69">
              <rect
                x="257.89"
                y="367.61"
                width="42.42"
                height="31.41"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-8--inject-1--inject-69">
              <rect
                x="279.1"
                y="367.61"
                width="21.21"
                height="31.41"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-9--inject-1--inject-69">
              <rect
                x="181.19"
                y="172.14"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-10--inject-1--inject-69">
              <rect
                x="208.71"
                y="172.14"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-11--inject-1--inject-69">
              <rect
                x="181.19"
                y="205.7"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-12--inject-1--inject-69">
              <rect
                x="208.71"
                y="205.7"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-13--inject-1--inject-69">
              <rect
                x="181.19"
                y="239.26"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-14--inject-1--inject-69">
              <rect
                x="208.71"
                y="239.26"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-15--inject-1--inject-69">
              <rect
                x="181.19"
                y="272.82"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-16--inject-1--inject-69">
              <rect
                x="208.71"
                y="272.82"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-17--inject-1--inject-69">
              <rect
                x="181.19"
                y="306.38"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-18--inject-1--inject-69">
              <rect
                x="208.71"
                y="306.38"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-19--inject-1--inject-69">
              <rect
                x="181.19"
                y="339.94"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-20--inject-1--inject-69">
              <rect
                x="208.71"
                y="339.94"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-21--inject-1--inject-69">
              <rect
                x="242.49"
                y="172.14"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-22--inject-1--inject-69">
              <rect
                x="270.01"
                y="172.14"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-23--inject-1--inject-69">
              <rect
                x="297.53"
                y="172.14"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-24--inject-1--inject-69">
              <rect
                x="242.49"
                y="205.7"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-25--inject-1--inject-69">
              <rect
                x="270.01"
                y="205.7"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-26--inject-1--inject-69">
              <rect
                x="297.53"
                y="205.7"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-27--inject-1--inject-69">
              <rect
                x="242.49"
                y="239.26"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-28--inject-1--inject-69">
              <rect
                x="270.01"
                y="239.26"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-29--inject-1--inject-69">
              <rect
                x="297.53"
                y="239.26"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-30--inject-1--inject-69">
              <rect
                x="242.49"
                y="272.82"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-31--inject-1--inject-69">
              <rect
                x="270.01"
                y="272.82"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-32--inject-1--inject-69">
              <rect
                x="297.53"
                y="272.82"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-33--inject-1--inject-69">
              <rect
                x="242.49"
                y="306.38"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-34--inject-1--inject-69">
              <rect
                x="270.01"
                y="306.38"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-35--inject-1--inject-69">
              <rect
                x="297.53"
                y="306.38"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-36--inject-1--inject-69">
              <rect
                x="242.49"
                y="339.94"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-37--inject-1--inject-69">
              <rect
                x="270.01"
                y="339.94"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
            <clipPath id="freepik--clip-path-38--inject-1--inject-69">
              <rect
                x="297.53"
                y="339.94"
                width="19.25"
                height="17.48"
                style="
                  fill: #fff;
                  stroke: var(--on-primary);
                  stroke-linecap: round;
                  stroke-linejoin: round;
                "
              ></rect>
            </clipPath>
          </defs>
          <g id="freepik--background-simple--inject-1--inject-69">
            <path
              d="M441.11,368c-11.43-13-27.44-9.15-16-38.11,7.09-17.95,12.76-39.14,6-58.06-8.06-22.65-32.94-34.62-55.62-36.43-12.25-1-25.24,4.57-37.11,2.1-14.42-3-22.95-17.35-24.63-31.11a.28.28,0,0,0,0-.09H423.11s1.35-4.05-3.6-6.75-7.2-.45-9-2.7,4.95-8.1-8.55-14c0,0-.9-12.6-19.35-13s-13.5,12.6-18.45,15.75-6.3-1.8-11.25,1.35-2.7,9.45-6.75,10.35-9.45-4.05-14.39-.9-4.95,5.85-7.2,5.85-6.75-1.8-9.45,0c-.54.35-1.09.73-1.63,1.1-.81-11.49,1.52-23,3.08-34.5,4.5-33-9.27-58.62-42.23-68.36-33.87-10-72.26-4.62-102.25,13.73C121,145.42,153,206.39,113.41,223.91s-77.2,53.5-55.63,109c21.34,54.87,66.34,42.95,66.34,42.95l1.49,16.94H446.68S452.54,380.9,441.11,368Zm-229-108.74H74s3.82-2.73,7.09-4.92,8.74,0,11.46,0,2.73-3.27,8.74-7.09,12.55,2.18,17.47,1.09,2.18-8.73,8.19-12.55,7.64,2.18,13.64-1.64,0-19.65,22.38-19.11,23.48,15.83,23.48,15.83c16.37,7.1,8.18,14.2,10.37,16.92s4.91,0,10.91,3.28S212.12,259.21,212.12,259.21Zm70.33-131.69H199.38s2.3-1.64,4.27-3,5.25,0,6.89,0,1.65-2,5.26-4.27,7.55,1.32,10.5.66,1.32-5.25,4.93-7.55,4.6,1.31,8.21-1,0-11.82,13.46-11.49S267,110.44,267,110.44c9.85,4.27,4.93,8.54,6.24,10.18s2.95,0,6.57,2S282.45,127.52,282.45,127.52ZM368.8,271h-38s1.05-.75,1.95-1.35,2.4,0,3.15,0,.75-.9,2.41-1.95,3.45.6,4.8.3.6-2.4,2.25-3.45,2.1.6,3.75-.45,0-5.41,6.16-5.26,6.46,4.36,6.46,4.36c4.5,1.95,2.25,3.9,2.85,4.65s1.35,0,3,.9A1.94,1.94,0,0,1,368.8,271Z"
              style="fill: #92e3a9"
            ></path>
            <circle
              cx="364.23"
              cy="141.97"
              r="23.2"
              transform="translate(91.86 422.39) rotate(-67.13)"
              style="fill: #92e3a9"
            ></circle>
            <g style="opacity: 0.7000000000000001">
              <path
                d="M441.11,368c-11.43-13-27.44-9.15-16-38.11,7.09-17.95,12.76-39.14,6-58.06-8.06-22.65-32.94-34.62-55.62-36.43-12.25-1-25.24,4.57-37.11,2.1-14.42-3-22.95-17.35-24.63-31.11a.28.28,0,0,0,0-.09H423.11s1.35-4.05-3.6-6.75-7.2-.45-9-2.7,4.95-8.1-8.55-14c0,0-.9-12.6-19.35-13s-13.5,12.6-18.45,15.75-6.3-1.8-11.25,1.35-2.7,9.45-6.75,10.35-9.45-4.05-14.39-.9-4.95,5.85-7.2,5.85-6.75-1.8-9.45,0c-.54.35-1.09.73-1.63,1.1-.81-11.49,1.52-23,3.08-34.5,4.5-33-9.27-58.62-42.23-68.36-33.87-10-72.26-4.62-102.25,13.73C121,145.42,153,206.39,113.41,223.91s-77.2,53.5-55.63,109c21.34,54.87,66.34,42.95,66.34,42.95l1.49,16.94H446.68S452.54,380.9,441.11,368Zm-229-108.74H74s3.82-2.73,7.09-4.92,8.74,0,11.46,0,2.73-3.27,8.74-7.09,12.55,2.18,17.47,1.09,2.18-8.73,8.19-12.55,7.64,2.18,13.64-1.64,0-19.65,22.38-19.11,23.48,15.83,23.48,15.83c16.37,7.1,8.18,14.2,10.37,16.92s4.91,0,10.91,3.28S212.12,259.21,212.12,259.21Zm70.33-131.69H199.38s2.3-1.64,4.27-3,5.25,0,6.89,0,1.65-2,5.26-4.27,7.55,1.32,10.5.66,1.32-5.25,4.93-7.55,4.6,1.31,8.21-1,0-11.82,13.46-11.49S267,110.44,267,110.44c9.85,4.27,4.93,8.54,6.24,10.18s2.95,0,6.57,2S282.45,127.52,282.45,127.52ZM368.8,271h-38s1.05-.75,1.95-1.35,2.4,0,3.15,0,.75-.9,2.41-1.95,3.45.6,4.8.3.6-2.4,2.25-3.45,2.1.6,3.75-.45,0-5.41,6.16-5.26,6.46,4.36,6.46,4.36c4.5,1.95,2.25,3.9,2.85,4.65s1.35,0,3,.9A1.94,1.94,0,0,1,368.8,271Z"
                style="fill: #fff"
              ></path>
              <circle
                cx="364.23"
                cy="141.97"
                r="23.2"
                transform="translate(91.86 422.39) rotate(-67.13)"
                style="fill: #fff"
              ></circle>
            </g>
          </g>
          <g id="freepik--Plants--inject-1--inject-69">
            <path
              d="M339,392.57s8.36-2.76,6-.62a11.18,11.18,0,0,1-1,.83H319.22l-.75-1.51-.18-.36-.3-.61,3-2L317.82,390l-.83-1.87.64-6.29-1,5.73L316,386l-2.77-5.3,4.5,10-6.44-2.56L318,391.2l.78,1.58h-26.7c-1.46-.16-3.51-.58-3.88-1.75-.6-1.83,5.67-1.83,5.67-1.83s-6.57-2.76-4.18-3.37,6.57,1.83,6.57,1.83-2.39-5.51.59-4.29a6.15,6.15,0,0,1,3.44,3.52c-.32-1.08-.92-3.63.74-2.9a6.25,6.25,0,0,1,2.52,2.32c-.8-1.64-1.5-4.08,2-3.24,0,0-.73-7.52,7.16-8.89s7.47,9.5,10.15,11.65,6-.31,7.17,2.14.89,3.68.89,3.68,4.48-11.95,5.08-8.58a9.78,9.78,0,0,1-1.5,6.43s7.17-9.5,5.68-5.82a42.92,42.92,0,0,1-3.29,6.44s9.85-2.46,8.36-.92S339,392.57,339,392.57Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M327.11,390.84c.07-.55.17-1.34.35-2.28.05-.27.1-.55.17-.85a5.09,5.09,0,0,0,1.55,0,1.6,1.6,0,0,0,1-.8.76.76,0,0,0-.48-1c-.61-.16-1.48.58-1.79,1.06,0,0-.21.41-.3.61,0-.18.08-.35.12-.54s.13-.54.19-.81.09-.28.13-.42.09-.27.13-.42l.24-.61a5.2,5.2,0,0,0,1.46.23,1.57,1.57,0,0,0,1.15-.64.75.75,0,0,0-.32-1.07c-.58-.25-1.55.35-1.93.78l-.16.23.27-.6c.27-.57.57-1.13.86-1.7l.18-.36a4.73,4.73,0,0,0,1.49.24,1.55,1.55,0,0,0,1.16-.63.75.75,0,0,0-.33-1.07c-.58-.25-1.55.35-1.92.77,0,0-.1.13-.19.27.16-.32.31-.63.44-.94a12.43,12.43,0,0,0,.62-1.66,5.22,5.22,0,0,0,1.54.25,1.53,1.53,0,0,0,1.15-.63.75.75,0,0,0-.32-1.07c-.58-.25-1.55.35-1.93.77l-.42.61h0a11,11,0,0,0,.3-1.71,14.06,14.06,0,0,0,.05-1.56c0-.48-.05-.92-.08-1.3,0-.21,0-.41-.07-.58h0s.23-.73.24-.77c.1-.56,0-1.69-.6-2a.76.76,0,0,0-1,.42,1.57,1.57,0,0,0,.23,1.29,4.85,4.85,0,0,0,1.13,1c0,.19,0,.39.06.61,0,.39.05.83.05,1.3,0,.13,0,.27,0,.4,0-.22-.1-.53-.11-.56-.17-.54-.82-1.48-1.45-1.48a.74.74,0,0,0-.73.84,1.6,1.6,0,0,0,.8,1.05,4.88,4.88,0,0,0,1.48.38c0,.3,0,.6-.06.91a9.55,9.55,0,0,1-.34,1.69l0,.09c0-.11-.05-.74-.06-.79-.11-.55-.65-1.56-1.28-1.63a.74.74,0,0,0-.81.76,1.55,1.55,0,0,0,.67,1.13,5.31,5.31,0,0,0,1.47.55,13.12,13.12,0,0,1-.63,1.59c-.18.39-.38.77-.58,1.15,0-.15-.05-.74-.06-.78-.11-.55-.65-1.56-1.27-1.63a.75.75,0,0,0-.82.76,1.54,1.54,0,0,0,.68,1.12,4.94,4.94,0,0,0,1.46.56c-.1.17-.19.34-.28.51-.3.57-.61,1.13-.9,1.69-.09.2-.18.39-.28.59,0-.22,0-.63-.05-.67-.11-.55-.65-1.56-1.28-1.63a.74.74,0,0,0-.81.76,1.53,1.53,0,0,0,.68,1.13,5,5,0,0,0,1.4.54c-.15.33-.29.66-.41,1-.05.15-.11.29-.15.43l-.13.42c-.08.29-.16.55-.22.82s-.07.27-.1.4c0-.23,0-.59,0-.62,0-.57-.4-1.64-1-1.81a.74.74,0,0,0-.92.63,1.55,1.55,0,0,0,.5,1.22,5.57,5.57,0,0,0,1.35.76c-.08.32-.15.64-.21.94-.2.94-.32,1.74-.4,2.29s-.12.88-.12.88h0a.22.22,0,0,0,.2.24.22.22,0,0,0,.24-.2S327,391.39,327.11,390.84Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M331.62,375.84a5.56,5.56,0,0,0,1.57-.16,1.56,1.56,0,0,0,.94-.92.74.74,0,0,0-.59-.94c-.63-.09-1.41.74-1.65,1.25C331.87,375.12,331.61,375.84,331.62,375.84Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M326.46,390.83c-.25-.49-.59-1.21-1-2.09-.11-.25-.22-.52-.33-.8a5.26,5.26,0,0,0,1.3-.84,1.58,1.58,0,0,0,.43-1.25.75.75,0,0,0-1-.57c-.6.2-.91,1.3-.9,1.86,0,0,0,.47.08.68-.06-.17-.13-.33-.2-.51s-.19-.52-.28-.79l-.13-.41c-.05-.14-.08-.28-.12-.43s-.09-.42-.14-.64a4.79,4.79,0,0,0,1.34-.61,1.59,1.59,0,0,0,.62-1.17.75.75,0,0,0-.86-.71c-.63.11-1.1,1.14-1.18,1.7,0,0,0,.14,0,.28,0-.21-.08-.42-.11-.64-.08-.62-.15-1.26-.22-1.89,0-.14,0-.27-.05-.4a5.1,5.1,0,0,0,1.39-.62,1.62,1.62,0,0,0,.61-1.17.75.75,0,0,0-.86-.71c-.63.11-1.1,1.14-1.18,1.7,0,0,0,.17,0,.33,0-.35-.09-.69-.15-1a13.47,13.47,0,0,0-.4-1.72,5.27,5.27,0,0,0,1.42-.64,1.53,1.53,0,0,0,.61-1.17.75.75,0,0,0-.86-.71c-.62.11-1.1,1.15-1.17,1.71,0,0,0,.56,0,.74v0a9.53,9.53,0,0,0-.69-1.59,13.14,13.14,0,0,0-.81-1.32c-.27-.4-.55-.74-.79-1.05l-.38-.45h0s-.21-.73-.23-.78c-.23-.51-1-1.38-1.6-1.32a.75.75,0,0,0-.63.92,1.58,1.58,0,0,0,.9,1,5,5,0,0,0,1.51.22l.38.48c.24.31.5.66.76,1.06.07.1.14.22.21.33l-.4-.4c-.44-.36-1.5-.79-2-.44a.75.75,0,0,0-.14,1.1,1.58,1.58,0,0,0,1.25.44,5.16,5.16,0,0,0,1.45-.5c.15.25.3.51.44.8a9,9,0,0,1,.65,1.58.44.44,0,0,1,0,.1c-.06-.09-.45-.59-.48-.62-.4-.4-1.4-.95-2-.66a.75.75,0,0,0-.26,1.08,1.55,1.55,0,0,0,1.19.57,5,5,0,0,0,1.53-.35,12.81,12.81,0,0,1,.35,1.68c.06.42.11.84.15,1.27l-.48-.61c-.4-.41-1.4-1-2-.66a.75.75,0,0,0-.27,1.08,1.56,1.56,0,0,0,1.19.57,5.06,5.06,0,0,0,1.52-.34l.06.58c.06.63.11,1.27.18,1.9l.09.65c-.13-.18-.39-.5-.41-.53-.4-.4-1.4-.94-2-.66a.77.77,0,0,0-.26,1.09,1.57,1.57,0,0,0,1.19.56,4.78,4.78,0,0,0,1.47-.32c.06.35.12.71.2,1.05,0,.15.07.3.11.44l.12.42q.14.42.27.81c0,.13.1.25.14.38-.11-.2-.29-.52-.31-.54-.33-.46-1.24-1.15-1.84-.95a.75.75,0,0,0-.42,1,1.57,1.57,0,0,0,1.09.74,4.85,4.85,0,0,0,1.55-.11c.11.32.23.62.34.9.36.9.69,1.63.93,2.14s.39.8.39.8h0a.22.22,0,0,0,.39-.21S326.71,391.33,326.46,390.83Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M322,375.83a5.15,5.15,0,0,0,1.22-1,1.55,1.55,0,0,0,.28-1.28.74.74,0,0,0-1-.46c-.58.27-.76,1.39-.69,2C321.76,375.09,321.94,375.84,322,375.83Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M440.34,392.51S451,389,448,391.73c-.53.47-.94.8-1.28,1H415.16l-1-1.92-.23-.47-.38-.78,3.78-2.6-4,2.16-1.06-2.39.82-8-1.29,7.32-.78-2-3.53-6.76,5.74,12.71-8.22-3.27,8.57,4,1,2H380.54c-1.85-.2-4.47-.74-5-2.23-.76-2.34,7.24-2.34,7.24-2.34s-8.38-3.52-5.33-4.3,8.38,2.34,8.38,2.34-3.05-7,.76-5.47a7.77,7.77,0,0,1,4.38,4.48c-.4-1.38-1.17-4.63,1-3.7a8.1,8.1,0,0,1,3.21,3c-1-2.09-1.91-5.2,2.5-4.13,0,0-.93-9.59,9.14-11.34s9.53,12.12,12.95,14.86,7.62-.4,9.15,2.73,1.14,4.69,1.14,4.69,5.71-15.24,6.47-10.94-1.9,8.21-1.9,8.21,9.14-12.12,7.24-7.43a54.78,54.78,0,0,1-4.19,8.21s12.57-3.13,10.66-1.17S440.34,392.51,440.34,392.51Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M425.23,390.3c.09-.7.23-1.71.45-2.9.06-.35.13-.71.21-1.09a6.61,6.61,0,0,0,2,0,2,2,0,0,0,1.33-1,1,1,0,0,0-.61-1.28c-.78-.21-1.89.74-2.28,1.34,0,0-.27.53-.39.79l.15-.69c.08-.33.17-.69.25-1,.06-.18.11-.36.16-.54s.12-.35.17-.53.2-.53.31-.79a6,6,0,0,0,1.86.3,2,2,0,0,0,1.47-.82,1,1,0,0,0-.41-1.36c-.74-.32-2,.45-2.46,1l-.21.29c.11-.25.22-.51.35-.76.34-.72.72-1.45,1.09-2.17.08-.15.15-.31.23-.46a6.56,6.56,0,0,0,1.91.31,2,2,0,0,0,1.47-.81,1,1,0,0,0-.41-1.36c-.74-.32-2,.44-2.46,1l-.24.34q.3-.6.57-1.2a16.37,16.37,0,0,0,.78-2.11,6.78,6.78,0,0,0,2,.32,2,2,0,0,0,1.47-.81,1,1,0,0,0-.42-1.36c-.74-.32-2,.44-2.45,1l-.54.78v0a12.47,12.47,0,0,0,.38-2.18,17,17,0,0,0,.07-2c0-.62-.06-1.18-.11-1.67,0-.27-.05-.51-.08-.74h0s.29-.93.3-1c.13-.72-.05-2.16-.76-2.54a1,1,0,0,0-1.32.53,2,2,0,0,0,.29,1.66,6.36,6.36,0,0,0,1.44,1.3c0,.24.05.49.07.77,0,.5.07,1.06.07,1.67,0,.16,0,.34,0,.51-.05-.29-.13-.68-.14-.72-.21-.69-1-1.89-1.84-1.9a1,1,0,0,0-.93,1.08,2,2,0,0,0,1,1.34,6.36,6.36,0,0,0,1.89.49c0,.38,0,.76-.09,1.16a11.53,11.53,0,0,1-.43,2.15s0,.08,0,.12c0-.15-.06-.95-.08-1-.14-.7-.82-2-1.62-2.08a1,1,0,0,0-1,1,2,2,0,0,0,.86,1.44,6.78,6.78,0,0,0,1.87.71,17.77,17.77,0,0,1-.8,2c-.23.49-.48,1-.74,1.46,0-.2-.07-.94-.08-1-.14-.7-.82-2-1.62-2.08a1,1,0,0,0-1.05,1,2,2,0,0,0,.87,1.44,6.93,6.93,0,0,0,1.86.71l-.35.66c-.39.71-.78,1.43-1.15,2.15-.12.25-.24.5-.35.75,0-.29-.07-.81-.07-.85-.14-.71-.83-2-1.63-2.09a1,1,0,0,0-1,1,2,2,0,0,0,.86,1.45,6.25,6.25,0,0,0,1.8.68c-.19.42-.37.84-.53,1.26-.07.18-.14.37-.19.55s-.12.35-.17.53c-.1.37-.2.71-.28,1.05,0,.18-.08.34-.12.51,0-.29.05-.76.05-.8,0-.72-.51-2.09-1.29-2.31a1,1,0,0,0-1.18.8,2,2,0,0,0,.64,1.56,6.82,6.82,0,0,0,1.72,1c-.09.41-.19.82-.26,1.2-.25,1.2-.41,2.21-.52,2.92s-.14,1.12-.14,1.12h0a.29.29,0,0,0,.26.31.28.28,0,0,0,.31-.26S425.14,391,425.23,390.3Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M431,371.17a6.84,6.84,0,0,0,2-.21,2,2,0,0,0,1.2-1.17,1,1,0,0,0-.75-1.21c-.8-.11-1.8,1-2.11,1.6C431.3,370.24,431,371.16,431,371.17Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M424.41,390.3c-.32-.64-.76-1.55-1.23-2.68q-.21-.48-.42-1a6.74,6.74,0,0,0,1.66-1.07,2,2,0,0,0,.54-1.59,1,1,0,0,0-1.22-.73c-.76.26-1.16,1.66-1.15,2.38,0,0,.07.59.11.86-.09-.21-.17-.42-.26-.65s-.24-.67-.36-1-.11-.36-.16-.53a5.44,5.44,0,0,1-.15-.54c-.07-.27-.12-.55-.18-.83a6.26,6.26,0,0,0,1.71-.78,2,2,0,0,0,.78-1.49,1,1,0,0,0-1.1-.91c-.79.14-1.4,1.47-1.5,2.18,0,0,0,.18,0,.36-.05-.28-.1-.55-.14-.83-.1-.79-.19-1.6-.28-2.41l-.06-.51a6.12,6.12,0,0,0,1.76-.79,2,2,0,0,0,.78-1.49,1,1,0,0,0-1.09-.91c-.8.14-1.41,1.46-1.51,2.18,0,0,0,.21,0,.41-.06-.44-.12-.88-.19-1.31a18.6,18.6,0,0,0-.51-2.2,6.56,6.56,0,0,0,1.81-.81,2,2,0,0,0,.78-1.49,1,1,0,0,0-1.09-.91c-.8.14-1.41,1.47-1.51,2.18,0,.05,0,.71,0,.95v0a13,13,0,0,0-.89-2,16.23,16.23,0,0,0-1-1.68c-.34-.51-.69-.95-1-1.34l-.48-.57h0s-.28-.94-.3-1c-.29-.66-1.23-1.76-2-1.68a.93.93,0,0,0-.8,1.16,2,2,0,0,0,1.15,1.23,6.44,6.44,0,0,0,1.92.29c.15.18.32.38.49.6.3.4.64.84,1,1.36.09.13.18.28.27.43-.2-.22-.48-.5-.51-.53-.56-.45-1.91-1-2.59-.56a1,1,0,0,0-.18,1.41,2,2,0,0,0,1.59.56,6.6,6.6,0,0,0,1.85-.63c.19.32.39.65.57,1a12,12,0,0,1,.82,2s0,.08,0,.12c-.09-.12-.58-.75-.62-.79-.51-.52-1.79-1.21-2.51-.85a1,1,0,0,0-.33,1.39,2,2,0,0,0,1.51.72,6.63,6.63,0,0,0,1.95-.44,15.89,15.89,0,0,1,.45,2.14c.08.53.14,1.07.19,1.62-.11-.16-.57-.75-.61-.78-.51-.52-1.79-1.21-2.51-.85a1,1,0,0,0-.33,1.39,2,2,0,0,0,1.52.72,6.56,6.56,0,0,0,1.94-.44c0,.25,0,.5.07.75.07.81.14,1.62.23,2.43,0,.27.07.54.12.82l-.53-.67c-.51-.51-1.79-1.21-2.51-.84a1,1,0,0,0-.33,1.38,2,2,0,0,0,1.51.73,6.46,6.46,0,0,0,1.88-.42c.07.45.15.9.25,1.34.05.19.09.38.14.56l.16.54c.12.36.23.7.35,1,0,.17.11.33.17.49-.14-.26-.37-.66-.39-.69-.42-.59-1.59-1.47-2.35-1.22a1,1,0,0,0-.54,1.32,2,2,0,0,0,1.39.95,6.71,6.71,0,0,0,2-.14l.44,1.15c.46,1.14.88,2.07,1.19,2.72s.49,1,.49,1h0a.29.29,0,0,0,.38.11.3.3,0,0,0,.12-.39S424.72,390.93,424.41,390.3Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M418.65,371.16a7.2,7.2,0,0,0,1.56-1.28,2,2,0,0,0,.35-1.64,1,1,0,0,0-1.29-.59c-.73.35-1,1.78-.88,2.5C418.4,370.21,418.64,371.16,418.65,371.16Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M345.64,392.61s-6.59-2.15-4.71-.47c.33.28.59.49.8.64h19.49l.59-1.17.14-.29.24-.48-2.34-1.59,2.47,1.32.65-1.46-.5-4.91.8,4.48.48-1.2,2.18-4.14-3.55,7.78,5.08-2-5.29,2.43-.62,1.23h21.08c1.15-.12,2.76-.45,3.06-1.36.47-1.44-4.47-1.44-4.47-1.44s5.18-2.15,3.29-2.63-5.18,1.44-5.18,1.44,1.89-4.31-.47-3.35a4.79,4.79,0,0,0-2.71,2.74c.25-.84.72-2.83-.59-2.26a5.08,5.08,0,0,0-2,1.81c.63-1.28,1.19-3.18-1.54-2.53a6.44,6.44,0,0,0-5.66-6.94c-6.22-1.07-5.89,7.42-8,9.09s-4.71-.24-5.65,1.68a4.78,4.78,0,0,0-.71,2.87s-3.53-9.33-4-6.7a7.56,7.56,0,0,0,1.18,5s-5.66-7.41-4.48-4.54a33.16,33.16,0,0,0,2.59,5s-7.77-1.91-6.59-.72S345.64,392.61,345.64,392.61Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M378.09,391.27c0-.43-.14-1-.27-1.78,0-.21-.09-.44-.14-.67a3.92,3.92,0,0,1-1.22,0,1.23,1.23,0,0,1-.82-.63.57.57,0,0,1,.38-.78c.48-.13,1.16.45,1.4.82a5.14,5.14,0,0,1,.24.48l-.09-.42-.15-.63-.1-.33c0-.11-.07-.22-.11-.33s-.12-.32-.19-.48a3.91,3.91,0,0,1-1.15.18,1.22,1.22,0,0,1-.91-.5.58.58,0,0,1,.26-.83c.46-.2,1.22.27,1.52.6l.13.18c-.07-.15-.14-.31-.22-.46-.21-.44-.44-.89-.67-1.33l-.15-.28a4.09,4.09,0,0,1-1.18.19,1.25,1.25,0,0,1-.91-.5A.59.59,0,0,1,374,383c.46-.2,1.22.27,1.52.6,0,0,.07.11.15.21-.13-.24-.24-.49-.35-.73a9.83,9.83,0,0,1-.49-1.3,4.08,4.08,0,0,1-1.21.2,1.2,1.2,0,0,1-.91-.5.58.58,0,0,1,.25-.83c.46-.2,1.23.27,1.52.6l.33.48h0a7.43,7.43,0,0,1-.24-1.34c0-.43,0-.83,0-1.21s0-.72.06-1l.06-.45h0s-.18-.57-.19-.61c-.07-.43,0-1.31.48-1.54a.58.58,0,0,1,.81.32,1.21,1.21,0,0,1-.17,1,4,4,0,0,1-.9.8c0,.14,0,.3,0,.47s-.05.65,0,1v.31c0-.17.08-.42.09-.44.14-.42.65-1.15,1.14-1.16a.59.59,0,0,1,.58.66,1.24,1.24,0,0,1-.63.82,4,4,0,0,1-1.17.3c0,.23,0,.47,0,.71a7.37,7.37,0,0,0,.27,1.32.25.25,0,0,0,0,.07c0-.09,0-.58.05-.62.09-.43.51-1.21,1-1.27a.59.59,0,0,1,.64.59,1.2,1.2,0,0,1-.53.88,4.27,4.27,0,0,1-1.16.44,9.19,9.19,0,0,0,.5,1.24c.14.3.29.59.45.89,0-.12,0-.57.05-.61.09-.43.51-1.21,1-1.27a.59.59,0,0,1,.64.59,1.2,1.2,0,0,1-.53.88,3.94,3.94,0,0,1-1.16.43l.22.41c.24.44.48.88.71,1.32.08.15.15.3.22.45,0-.17,0-.49,0-.51.09-.44.52-1.22,1-1.28a.58.58,0,0,1,.64.59,1.2,1.2,0,0,1-.53.88,3.81,3.81,0,0,1-1.11.43c.12.25.23.51.33.76l.12.34.1.32c.06.23.12.44.17.65s.05.21.08.31c0-.18,0-.46,0-.49,0-.44.32-1.28.8-1.41a.59.59,0,0,1,.73.49,1.21,1.21,0,0,1-.39,1,4.52,4.52,0,0,1-1.07.6c.06.25.12.5.17.73.15.74.25,1.36.31,1.79s.1.69.1.69h0a.19.19,0,0,1-.16.19.17.17,0,0,1-.19-.16S378.15,391.7,378.09,391.27Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M374.53,379.56a4.43,4.43,0,0,1-1.24-.13,1.23,1.23,0,0,1-.74-.72A.58.58,0,0,1,373,378c.49-.07,1.1.58,1.3,1C374.34,379,374.54,379.56,374.53,379.56Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M378.6,391.26c.2-.39.47-.95.76-1.63.09-.2.17-.41.26-.63a4,4,0,0,1-1-.66,1.21,1.21,0,0,1-.33-1,.59.59,0,0,1,.75-.45c.47.16.72,1,.72,1.46,0,0-.05.36-.07.53l.15-.4c.08-.2.16-.41.23-.61l.1-.33c0-.11.06-.22.09-.33s.08-.33.11-.5a4,4,0,0,1-1-.48,1.25,1.25,0,0,1-.49-.91.6.6,0,0,1,.68-.56c.49.09.87.9.93,1.33,0,0,0,.11,0,.22,0-.16.06-.33.08-.5.07-.49.12-1,.18-1.48l0-.31a4,4,0,0,1-1.09-.48,1.25,1.25,0,0,1-.48-.92.59.59,0,0,1,.68-.55c.49.09.87.89.93,1.33,0,0,0,.13,0,.25,0-.27.07-.53.12-.8a9.68,9.68,0,0,1,.31-1.34,4.06,4.06,0,0,1-1.12-.5,1.2,1.2,0,0,1-.48-.91.59.59,0,0,1,.67-.56c.5.09.87.9.93,1.34,0,0,0,.43,0,.58v0a7.38,7.38,0,0,1,.55-1.24,10.78,10.78,0,0,1,.64-1c.21-.31.43-.58.62-.82l.3-.35h0s.17-.57.18-.61c.18-.4.76-1.08,1.26-1a.58.58,0,0,1,.5.71,1.2,1.2,0,0,1-.71.75,4.09,4.09,0,0,1-1.19.18,4,4,0,0,0-.3.37,9,9,0,0,0-.6.83,2.33,2.33,0,0,0-.17.26l.32-.32c.34-.28,1.18-.61,1.6-.34a.58.58,0,0,1,.11.86,1.26,1.26,0,0,1-1,.34,3.93,3.93,0,0,1-1.15-.39c-.12.2-.24.4-.35.62a7.66,7.66,0,0,0-.51,1.24s0,.05,0,.08l.38-.49c.31-.31,1.11-.73,1.55-.51a.58.58,0,0,1,.21.84,1.25,1.25,0,0,1-.94.45,4.29,4.29,0,0,1-1.21-.27,9.07,9.07,0,0,0-.27,1.3c0,.33-.09.66-.12,1,.07-.1.35-.46.38-.48.31-.32,1.1-.74,1.55-.52a.58.58,0,0,1,.2.85,1.22,1.22,0,0,1-.93.44,3.81,3.81,0,0,1-1.2-.27c0,.16,0,.31,0,.46,0,.5-.09,1-.14,1.48,0,.17,0,.34-.07.51.1-.14.3-.39.32-.41.32-.31,1.11-.74,1.55-.52a.58.58,0,0,1,.21.85,1.24,1.24,0,0,1-.94.44,3.92,3.92,0,0,1-1.16-.25,7.43,7.43,0,0,1-.16.82c0,.11,0,.23-.08.34l-.1.33-.21.63c0,.11-.08.2-.11.3.08-.16.23-.4.24-.42.26-.36,1-.9,1.46-.74a.58.58,0,0,1,.33.8,1.25,1.25,0,0,1-.86.58,4.54,4.54,0,0,1-1.22-.08c-.09.24-.18.48-.27.7-.29.7-.55,1.27-.74,1.67l-.3.62h0a.16.16,0,0,1-.23.07.17.17,0,0,1-.07-.24S378.41,391.65,378.6,391.26Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M382.16,379.55a4.21,4.21,0,0,1-1-.78,1.2,1.2,0,0,1-.22-1,.59.59,0,0,1,.8-.36c.45.21.6,1.09.54,1.53C382.32,379,382.17,379.56,382.16,379.55Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M355.39,391.48c0-.33-.1-.79-.21-1.34,0-.16-.06-.33-.09-.5a3.08,3.08,0,0,1-.93,0,.89.89,0,0,1-.61-.47.43.43,0,0,1,.28-.59c.36-.09.88.34,1.06.62l.18.36c0-.1,0-.21-.07-.31s-.08-.32-.12-.48l-.07-.25a2.25,2.25,0,0,0-.08-.24c0-.12-.09-.24-.14-.37a2.83,2.83,0,0,1-.87.14.92.92,0,0,1-.68-.37.44.44,0,0,1,.19-.63c.35-.15.92.2,1.14.45l.1.14a3.73,3.73,0,0,0-.16-.35c-.16-.33-.33-.67-.51-1l-.1-.21a2.82,2.82,0,0,1-.89.14.92.92,0,0,1-.69-.37.45.45,0,0,1,.19-.63c.35-.15.93.21,1.15.46l.11.15c-.09-.18-.18-.37-.26-.55a7.7,7.7,0,0,1-.37-1,3.59,3.59,0,0,1-.91.15,1,1,0,0,1-.69-.38.44.44,0,0,1,.19-.62c.35-.15.92.2,1.15.45l.25.36h0a6.27,6.27,0,0,1-.17-1,5.68,5.68,0,0,1,0-.91c0-.28,0-.54,0-.77s0-.23,0-.34h0a4.21,4.21,0,0,1-.14-.46c-.06-.33,0-1,.35-1.16a.45.45,0,0,1,.62.24.9.9,0,0,1-.14.76,2.73,2.73,0,0,1-.67.6q0,.16,0,.36a6,6,0,0,0,0,.76v.24c0-.14.06-.32.07-.33.1-.32.48-.87.86-.88a.45.45,0,0,1,.43.5,1,1,0,0,1-.47.62,3.11,3.11,0,0,1-.88.22,3.44,3.44,0,0,0,0,.54,5.13,5.13,0,0,0,.19,1,.14.14,0,0,1,0,.06c0-.07,0-.44,0-.46.07-.33.38-.92.76-1a.44.44,0,0,1,.48.44.9.9,0,0,1-.4.67,3.17,3.17,0,0,1-.87.32,9.15,9.15,0,0,0,.37.94l.35.67c0-.09,0-.43,0-.46.07-.32.39-.92.76-1a.44.44,0,0,1,.48.45.88.88,0,0,1-.4.66,3,3,0,0,1-.86.32,3,3,0,0,0,.16.31c.18.33.36.66.53,1,.06.11.11.23.17.34,0-.13,0-.37,0-.39.07-.32.38-.91.76-1a.44.44,0,0,1,.48.45.91.91,0,0,1-.4.66,2.69,2.69,0,0,1-.84.32c.09.19.18.39.25.58a2.5,2.5,0,0,1,.09.25l.08.24c0,.17.09.33.13.49a1.89,1.89,0,0,1,.05.23c0-.13,0-.35,0-.36,0-.34.24-1,.6-1.07a.45.45,0,0,1,.55.37.94.94,0,0,1-.3.72,3.09,3.09,0,0,1-.8.45c0,.19.09.37.12.55.12.55.19,1,.24,1.34s.07.52.07.52h0a.14.14,0,0,1-.12.15.13.13,0,0,1-.14-.12S355.43,391.8,355.39,391.48Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M352.71,382.67a3.33,3.33,0,0,1-.93-.09,1,1,0,0,1-.56-.54.44.44,0,0,1,.36-.55c.37-.06.83.43,1,.73C352.57,382.25,352.72,382.67,352.71,382.67Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M355.78,391.47c.14-.29.35-.71.57-1.22.06-.15.13-.31.19-.48a3.11,3.11,0,0,1-.77-.49.9.9,0,0,1-.25-.73.44.44,0,0,1,.56-.34c.36.12.55.77.54,1.1,0,0,0,.27-.05.4l.12-.3c.06-.15.11-.31.17-.47l.07-.24a2.33,2.33,0,0,0,.07-.25l.09-.38a2.79,2.79,0,0,1-.8-.36.89.89,0,0,1-.36-.68.44.44,0,0,1,.51-.42c.37.06.65.67.7,1v.17c0-.13.05-.26.06-.38.06-.37.1-.74.14-1.11a1.94,1.94,0,0,0,0-.24,3.06,3.06,0,0,1-.81-.36.94.94,0,0,1-.37-.69.46.46,0,0,1,.51-.42c.37.07.66.68.7,1,0,0,0,.09,0,.19a6,6,0,0,1,.09-.61,8.68,8.68,0,0,1,.23-1,3.14,3.14,0,0,1-.84-.37.93.93,0,0,1-.36-.69.44.44,0,0,1,.51-.41c.37.06.65.67.7,1,0,0,0,.32,0,.43h0a5.67,5.67,0,0,1,.41-.93,7,7,0,0,1,.48-.78c.16-.23.33-.43.47-.61l.22-.27h0s.12-.43.13-.45c.14-.31.58-.82.95-.78a.45.45,0,0,1,.38.54,1,1,0,0,1-.54.56,2.85,2.85,0,0,1-.89.13l-.23.28c-.14.18-.3.39-.45.62l-.13.2.24-.24c.26-.21.89-.46,1.2-.26a.44.44,0,0,1,.09.65.92.92,0,0,1-.74.26,3.18,3.18,0,0,1-.86-.29c-.09.15-.18.3-.27.47a5.64,5.64,0,0,0-.38.93l0,.05.29-.36c.24-.24.83-.56,1.17-.39a.44.44,0,0,1,.15.64.92.92,0,0,1-.7.33,3.19,3.19,0,0,1-.91-.2,7.38,7.38,0,0,0-.21,1l-.09.75a3.42,3.42,0,0,1,.29-.36c.23-.24.83-.56,1.16-.39a.44.44,0,0,1,.16.64.94.94,0,0,1-.71.33,3.48,3.48,0,0,1-.9-.2l0,.34c0,.37-.07.75-.11,1.12,0,.12,0,.25-.05.37l.24-.3c.24-.24.83-.56,1.17-.39a.44.44,0,0,1,.15.64.92.92,0,0,1-.7.33,3,3,0,0,1-.88-.19c0,.21-.07.41-.11.62a2.33,2.33,0,0,1-.07.25L357,389l-.16.47c0,.08-.06.16-.08.23.06-.12.17-.3.18-.32.2-.27.74-.67,1.09-.56a.44.44,0,0,1,.25.61.88.88,0,0,1-.64.43,2.71,2.71,0,0,1-.92-.06l-.21.53c-.21.52-.41.95-.55,1.25s-.23.47-.23.47h0a.14.14,0,0,1-.18.06.13.13,0,0,1,0-.18S355.63,391.77,355.78,391.47Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M358.45,382.67a3.28,3.28,0,0,1-.72-.59.89.89,0,0,1-.17-.75.44.44,0,0,1,.6-.27c.34.16.46.82.41,1.15C358.57,382.23,358.46,382.67,358.45,382.67Z"
              style="fill: #92e3a9"
            ></path>
          </g>
          <g id="freepik--building-2--inject-1--inject-69">
            <rect
              x="323.84"
              y="392.21"
              width="125.94"
              height="6.81"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <line
              x1="409.62"
              y1="392.45"
              x2="409.62"
              y2="396.43"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="412.22"
              y1="392.45"
              x2="412.22"
              y2="394.6"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="414.82"
              y1="392.45"
              x2="414.82"
              y2="394.6"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="417.42"
              y1="392.45"
              x2="417.42"
              y2="397.97"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="420.54"
              y1="392.45"
              x2="420.54"
              y2="395.03"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <rect
              x="361.03"
              y="298.95"
              width="29.09"
              height="13.97"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="380.05"
              y="298.95"
              width="10.06"
              height="13.97"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <polygon
              points="349.9 320.01 349.9 291.82 262.59 291.82 262.59 399.02 320.01 399.02 349.9 399.02 407.32 399.02 407.32 320.01 349.9 320.01"
              style="
                fill: #92e3a9;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></polygon>
            <rect
              x="395.73"
              y="320.01"
              width="11.59"
              height="79.01"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="349.74"
              y="313.99"
              width="57.49"
              height="16.29"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="292.38"
              y="292.59"
              width="57.49"
              height="16.29"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="252.65"
              y="288.67"
              width="100.89"
              height="16.29"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="349.74"
              y="310.24"
              width="62.78"
              height="16.29"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <line
              x1="325.44"
              y1="288.97"
              x2="325.44"
              y2="295.41"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="328.04"
              y1="288.97"
              x2="328.04"
              y2="295.41"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="328.04"
              y1="297.15"
              x2="328.04"
              y2="302.08"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="330.65"
              y1="288.97"
              x2="330.65"
              y2="295.41"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="330.65"
              y1="297.43"
              x2="330.65"
              y2="302"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="333.07"
              y1="297.43"
              x2="333.07"
              y2="300.31"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="333.25"
              y1="288.97"
              x2="333.25"
              y2="295.41"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="336.2"
              y1="293.78"
              x2="336.2"
              y2="295.41"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="336.37"
              y1="288.97"
              x2="336.37"
              y2="292.63"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="325.44"
              y1="296.71"
              x2="325.44"
              y2="300.53"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="352.4"
              y1="310.32"
              x2="352.4"
              y2="316.77"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="355"
              y1="310.32"
              x2="355"
              y2="316.77"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="355"
              y1="318.51"
              x2="355"
              y2="323.44"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="357.6"
              y1="310.32"
              x2="357.6"
              y2="316.77"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="357.6"
              y1="318.79"
              x2="357.6"
              y2="323.35"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="360.03"
              y1="318.79"
              x2="360.03"
              y2="321.67"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="360.2"
              y1="310.32"
              x2="360.2"
              y2="316.77"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="363.15"
              y1="315.14"
              x2="363.15"
              y2="316.77"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="363.32"
              y1="310.32"
              x2="363.32"
              y2="313.99"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="352.4"
              y1="318.07"
              x2="352.4"
              y2="321.89"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <rect
              x="326.65"
              y="339.94"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g style="clip-path: url(#freepik--clip-path--inject-1--inject-69)">
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="326.65 353.29 326.65 356.75 345.9 341.11 345.9 339.94 343.08 339.94"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="345.9 348.38 345.9 344.92 330.51 357.43 334.77 357.43"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="326.65"
              y="339.94"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="326.65"
              y="334.91"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="353.81"
              y="339.94"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="clip-path: url(#freepik--clip-path-2--inject-1--inject-69)"
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="370.24 339.94 353.81 353.29 353.81 356.75 373.06 341.11 373.06 339.94 370.24 339.94"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="361.92 357.43 373.06 348.38 373.06 344.92 357.66 357.43 361.92 357.43"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="353.81"
              y="339.94"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="353.81"
              y="334.91"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="380.96"
              y="339.94"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="clip-path: url(#freepik--clip-path-3--inject-1--inject-69)"
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="397.39 339.94 380.96 353.29 380.96 356.75 400.21 341.11 400.21 339.94 397.39 339.94"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="389.08 357.43 400.21 348.38 400.21 344.92 384.82 357.43 389.08 357.43"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="380.96"
              y="339.94"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="380.96"
              y="334.91"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="326.65"
              y="369.39"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="clip-path: url(#freepik--clip-path-4--inject-1--inject-69)"
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="326.65 382.74 326.65 386.19 345.9 370.56 345.9 369.39 343.08 369.39"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="345.9 377.83 345.9 374.37 330.51 386.87 334.77 386.87"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="326.65"
              y="369.39"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="326.65"
              y="364.35"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="353.81"
              y="369.39"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="clip-path: url(#freepik--clip-path-5--inject-1--inject-69)"
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="353.81 382.74 353.81 386.19 373.06 370.56 373.06 369.39 370.24 369.39"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="357.66 386.87 361.92 386.87 373.06 377.83 373.06 374.37"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="353.81"
              y="369.39"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="353.81"
              y="364.35"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="380.96"
              y="369.39"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="clip-path: url(#freepik--clip-path-6--inject-1--inject-69)"
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="397.39 369.39 380.96 382.74 380.96 386.19 400.21 370.56 400.21 369.39 397.39 369.39"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="389.08 386.87 400.21 377.83 400.21 374.37 384.82 386.87 389.08 386.87"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="380.96"
              y="369.39"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="380.96"
              y="364.35"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
          </g>
          <g id="freepik--building-1--inject-1--inject-69">
            <rect
              x="95.34"
              y="282.1"
              width="22.57"
              height="20.04"
              style="
                fill: #92e3a9;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="105.56"
              y="282.1"
              width="22.57"
              height="20.04"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="96.51"
              y="308.95"
              width="89.01"
              height="90.07"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="90.83"
              y="299.11"
              width="94.7"
              height="16.29"
              style="fill: var(--on-primary)"
            ></rect>
            <rect
              x="133.22"
              y="265.44"
              width="27.49"
              height="25.66"
              style="fill: var(--on-primary)"
            ></rect>
            <polygon
              points="146.97 250.93 130.32 265.95 163.62 265.95 146.97 250.93"
              style="
                fill: #92e3a9;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></polygon>
            <polygon
              points="163.62 265.95 146.97 250.93 137.89 265.95 163.62 265.95"
              style="fill: var(--on-primary)"
            ></polygon>
            <rect
              x="134.11"
              y="287.07"
              width="1.93"
              height="15.47"
              style="fill: var(--on-primary)"
            ></rect>
            <rect
              x="157.31"
              y="287.07"
              width="1.93"
              height="15.47"
              style="fill: var(--on-primary)"
            ></rect>
            <rect
              x="144.61"
              y="287.07"
              width="1.93"
              height="15.47"
              style="fill: var(--on-primary)"
            ></rect>
            <rect
              x="148.2"
              y="287.07"
              width="1.93"
              height="15.47"
              style="fill: var(--on-primary)"
            ></rect>
            <rect
              x="99.85"
              y="320.01"
              width="4.7"
              height="18.79"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="99.85"
              y="349.76"
              width="4.7"
              height="18.79"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="171.11"
              y="143.47"
              width="151.65"
              height="255.55"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="235.44"
              y="143.47"
              width="87.32"
              height="255.55"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="245.58"
              y="143.47"
              width="67.04"
              height="255.55"
              style="
                fill: #92e3a9;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="235.44"
              y="143.47"
              width="87.32"
              height="17.5"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="257.89"
              y="367.61"
              width="42.42"
              height="31.41"
              style="fill: #fff"
            ></rect>
            <g
              style="clip-path: url(#freepik--clip-path-7--inject-1--inject-69)"
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="276.47 377.83 258.31 394.36 258.31 398.85 258.6 398.85 279.13 380.16 279.13 377.83 276.47 377.83"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="269.59 398.85 279.13 390.16 279.13 385.4 264.36 398.85 269.59 398.85"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="257.89"
              y="367.61"
              width="42.42"
              height="31.41"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="279.1"
              y="367.61"
              width="21.21"
              height="31.41"
              style="fill: #fff"
            ></rect>
            <g
              style="clip-path: url(#freepik--clip-path-8--inject-1--inject-69)"
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="297.29 377.83 279.13 394.36 279.13 398.85 279.42 398.85 299.95 380.16 299.95 377.83 297.29 377.83"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="290.41 398.85 299.95 390.16 299.95 385.4 285.18 398.85 290.41 398.85"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="279.1"
              y="367.61"
              width="21.21"
              height="31.41"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="172.14"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="clip-path: url(#freepik--clip-path-9--inject-1--inject-69)"
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="200.44 173.31 200.44 172.14 197.62 172.14 181.19 185.48 181.19 188.94"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="200.44 180.58 200.44 177.12 185.04 189.62 189.3 189.62"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="181.19"
              y="172.14"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="167.1"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="172.14"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-10--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="208.71 185.48 208.71 188.94 227.96 173.31 227.96 172.14 225.14 172.14"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="227.96 180.58 227.96 177.12 212.56 189.62 216.82 189.62"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="208.71"
              y="172.14"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="167.1"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="205.7"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-11--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="181.19 219.05 181.19 222.5 200.44 206.87 200.44 205.7 197.62 205.7"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="200.44 214.14 200.44 210.68 185.04 223.18 189.3 223.18"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="181.19"
              y="205.7"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="200.66"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="205.7"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-12--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="227.96 206.87 227.96 205.7 225.14 205.7 208.71 219.05 208.71 222.5"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="212.56 223.18 216.82 223.18 227.96 214.14 227.96 210.68"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="208.71"
              y="205.7"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="200.66"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="239.26"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-13--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="181.19 252.61 181.19 256.07 200.44 240.43 200.44 239.26 197.62 239.26"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="200.44 247.7 200.44 244.24 185.04 256.74 189.3 256.74"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="181.19"
              y="239.26"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="234.23"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="239.26"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-14--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="208.71 252.61 208.71 256.07 227.96 240.43 227.96 239.26 225.14 239.26"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="212.56 256.74 216.82 256.74 227.96 247.7 227.96 244.24"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="208.71"
              y="239.26"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="234.23"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="272.82"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-15--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="197.62 272.82 181.19 286.17 181.19 289.63 200.44 273.99 200.44 272.82 197.62 272.82"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="189.3 290.31 200.44 281.26 200.44 277.8 185.04 290.31 189.3 290.31"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="181.19"
              y="272.82"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="267.79"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="272.82"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-16--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="208.71 286.17 208.71 289.63 227.96 273.99 227.96 272.82 225.14 272.82"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="212.56 290.31 216.82 290.31 227.96 281.26 227.96 277.8"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="208.71"
              y="272.82"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="267.79"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="306.38"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-17--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="197.62 306.38 181.19 319.73 181.19 323.19 200.44 307.55 200.44 306.38 197.62 306.38"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="189.3 323.87 200.44 314.82 200.44 311.36 185.04 323.87 189.3 323.87"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="181.19"
              y="306.38"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="301.35"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="306.38"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-18--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="225.14 306.38 208.71 319.73 208.71 323.19 227.96 307.55 227.96 306.38 225.14 306.38"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="216.82 323.87 227.96 314.82 227.96 311.36 212.56 323.87 216.82 323.87"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="208.71"
              y="306.38"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="301.35"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="339.94"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-19--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="197.62 339.94 181.19 353.29 181.19 356.75 200.44 341.11 200.44 339.94 197.62 339.94"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="189.3 357.43 200.44 348.38 200.44 344.92 185.04 357.43 189.3 357.43"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="181.19"
              y="339.94"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="181.19"
              y="334.91"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="339.94"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-20--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="225.14 339.94 208.71 353.29 208.71 356.75 227.96 341.11 227.96 339.94 225.14 339.94"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="216.82 357.43 227.96 348.38 227.96 344.92 212.56 357.43 216.82 357.43"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="208.71"
              y="339.94"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="208.71"
              y="334.91"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="172.14"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-21--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="242.49 185.48 242.49 188.94 261.74 173.31 261.74 172.14 258.92 172.14"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="261.74 180.58 261.74 177.12 246.35 189.62 250.61 189.62"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="242.49"
              y="172.14"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="167.1"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="172.14"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-22--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="289.26 173.31 289.26 172.14 286.44 172.14 270.01 185.48 270.01 188.94"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="289.26 180.58 289.26 177.12 273.87 189.62 278.13 189.62"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="270.01"
              y="172.14"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="167.1"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="172.14"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-23--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="297.53 185.48 297.53 188.94 316.78 173.31 316.78 172.14 313.96 172.14"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="301.39 189.62 305.65 189.62 316.78 180.58 316.78 177.12"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="297.53"
              y="172.14"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="167.1"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="205.7"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-24--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="242.49 219.05 242.49 222.5 261.74 206.87 261.74 205.7 258.92 205.7"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="246.35 223.18 250.61 223.18 261.74 214.14 261.74 210.68"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="242.49"
              y="205.7"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="200.66"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="205.7"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-25--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="270.01 219.05 270.01 222.5 289.26 206.87 289.26 205.7 286.44 205.7"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="273.87 223.18 278.13 223.18 289.26 214.14 289.26 210.68"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="270.01"
              y="205.7"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="200.66"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="205.7"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-26--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="297.53 219.05 297.53 222.5 316.78 206.87 316.78 205.7 313.96 205.7"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="316.78 214.14 316.78 210.68 301.39 223.18 305.65 223.18"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="297.53"
              y="205.7"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="200.66"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="239.26"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-27--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="242.49 252.61 242.49 256.07 261.74 240.43 261.74 239.26 258.92 239.26"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="261.74 247.7 261.74 244.24 246.35 256.74 250.61 256.74"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="242.49"
              y="239.26"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="234.23"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="239.26"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-28--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="270.01 252.61 270.01 256.07 289.26 240.43 289.26 239.26 286.44 239.26"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="289.26 247.7 289.26 244.24 273.87 256.74 278.13 256.74"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="270.01"
              y="239.26"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="234.23"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="239.26"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-29--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="297.53 252.61 297.53 256.07 316.78 240.43 316.78 239.26 313.96 239.26"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="301.39 256.74 305.65 256.74 316.78 247.7 316.78 244.24"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="297.53"
              y="239.26"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="234.23"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="272.82"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-30--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="258.92 272.82 242.49 286.17 242.49 289.63 261.74 273.99 261.74 272.82 258.92 272.82"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="250.61 290.31 261.74 281.26 261.74 277.8 246.35 290.31 250.61 290.31"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="242.49"
              y="272.82"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="267.79"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="272.82"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-31--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="270.01 286.17 270.01 289.63 289.26 273.99 289.26 272.82 286.44 272.82"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="289.26 281.26 289.26 277.8 273.87 290.31 278.13 290.31"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="270.01"
              y="272.82"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="267.79"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="272.82"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-32--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="297.53 286.17 297.53 289.63 316.78 273.99 316.78 272.82 313.96 272.82"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="301.39 290.31 305.65 290.31 316.78 281.26 316.78 277.8"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="297.53"
              y="272.82"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="267.79"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="306.38"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-33--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="258.92 306.38 242.49 319.73 242.49 323.19 261.74 307.55 261.74 306.38 258.92 306.38"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="250.61 323.87 261.74 314.82 261.74 311.36 246.35 323.87 250.61 323.87"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="242.49"
              y="306.38"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="301.35"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="306.38"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-34--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="286.44 306.38 270.01 319.73 270.01 323.19 289.26 307.55 289.26 306.38 286.44 306.38"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="278.13 323.87 289.26 314.82 289.26 311.36 273.87 323.87 278.13 323.87"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="270.01"
              y="306.38"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="301.35"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="306.38"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-35--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polyline
                  points="316.78 307.55 316.78 306.38 313.96 306.38 297.53 319.73 297.53 323.19"
                  style="fill: #92e3a9"
                ></polyline>
                <polyline
                  points="301.39 323.87 305.65 323.87 316.78 314.82 316.78 311.36"
                  style="fill: #92e3a9"
                ></polyline>
              </g>
            </g>
            <rect
              x="297.53"
              y="306.38"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="301.35"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="339.94"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-36--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="258.92 339.94 242.49 353.29 242.49 356.75 261.74 341.11 261.74 339.94 258.92 339.94"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="250.61 357.43 261.74 348.38 261.74 344.92 246.35 357.43 250.61 357.43"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="242.49"
              y="339.94"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="242.49"
              y="334.91"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="339.94"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-37--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="286.44 339.94 270.01 353.29 270.01 356.75 289.26 341.11 289.26 339.94 286.44 339.94"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="278.13 357.43 289.26 348.38 289.26 344.92 273.87 357.43 278.13 357.43"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="270.01"
              y="339.94"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="270.01"
              y="334.91"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="339.94"
              width="19.25"
              height="17.48"
              style="fill: #fff"
            ></rect>
            <g
              style="
                clip-path: url(#freepik--clip-path-38--inject-1--inject-69);
              "
            >
              <g style="opacity: 0.6000000000000001; mix-blend-mode: multiply">
                <polygon
                  points="313.96 339.94 297.53 353.29 297.53 356.75 316.78 341.11 316.78 339.94 313.96 339.94"
                  style="fill: #92e3a9"
                ></polygon>
                <polygon
                  points="305.65 357.43 316.78 348.38 316.78 344.92 301.39 357.43 305.65 357.43"
                  style="fill: #92e3a9"
                ></polygon>
              </g>
            </g>
            <rect
              x="297.53"
              y="339.94"
              width="19.25"
              height="17.48"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="297.53"
              y="334.91"
              width="19.25"
              height="7.6"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="241.55"
              y="367.56"
              width="74.99"
              height="9.51"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="241.55"
              y="364.81"
              width="74.99"
              height="9.51"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="171.03"
              y="130.32"
              width="40.85"
              height="25.18"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="197.75"
              y="130.32"
              width="14.14"
              height="25.18"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="298.63"
              y="136.47"
              width="16.79"
              height="19.03"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="167.42"
              y="143.47"
              width="159.03"
              height="12.04"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="231.35"
              y="143.47"
              width="95.1"
              height="12.04"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <line
              x1="235.44"
              y1="143.47"
              x2="235.44"
              y2="148.52"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="238.04"
              y1="143.47"
              x2="238.04"
              y2="148.52"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="238.04"
              y1="149.88"
              x2="238.04"
              y2="153.74"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="240.65"
              y1="143.47"
              x2="240.65"
              y2="148.52"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="240.65"
              y1="150.1"
              x2="240.65"
              y2="153.68"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="243.07"
              y1="150.1"
              x2="243.07"
              y2="152.36"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="243.25"
              y1="143.47"
              x2="243.25"
              y2="148.52"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="246.2"
              y1="147.24"
              x2="246.2"
              y2="148.52"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="246.37"
              y1="143.47"
              x2="246.37"
              y2="146.34"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="235.44"
              y1="149.54"
              x2="235.44"
              y2="152.53"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <path
              d="M131.45,392.57s8.36-2.76,6-.62a11.18,11.18,0,0,1-1,.83H111.72l-.75-1.51-.18-.36-.3-.61,3-2L110.32,390l-.83-1.87.64-6.29-1,5.73-.61-1.53-2.77-5.3,4.5,10-6.44-2.56,6.71,3.11.78,1.58H84.59c-1.46-.16-3.51-.58-3.88-1.75-.6-1.83,5.67-1.83,5.67-1.83s-6.57-2.76-4.18-3.37,6.57,1.83,6.57,1.83-2.39-5.51.59-4.29a6.15,6.15,0,0,1,3.44,3.52c-.32-1.08-.92-3.63.74-2.9a6.25,6.25,0,0,1,2.52,2.32c-.8-1.64-1.5-4.08,2-3.24,0,0-.73-7.52,7.16-8.89s7.47,9.5,10.15,11.65,6-.31,7.17,2.14.89,3.68.89,3.68,4.48-11.95,5.08-8.58a9.78,9.78,0,0,1-1.5,6.43s7.17-9.5,5.68-5.82a42.92,42.92,0,0,1-3.29,6.44s9.85-2.46,8.36-.92S131.45,392.57,131.45,392.57Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M119.61,390.84c.07-.55.17-1.34.35-2.28.05-.27.1-.55.17-.85a5.09,5.09,0,0,0,1.55,0,1.6,1.6,0,0,0,1-.8.76.76,0,0,0-.48-1c-.61-.16-1.48.58-1.79,1.06,0,0-.21.41-.3.61,0-.18.08-.35.12-.54s.13-.54.19-.81.09-.28.13-.42.09-.27.13-.42l.24-.61a5.2,5.2,0,0,0,1.46.23,1.57,1.57,0,0,0,1.15-.64.75.75,0,0,0-.32-1.07c-.58-.25-1.55.35-1.93.78l-.16.23.27-.6c.27-.57.57-1.13.86-1.7l.18-.36a4.73,4.73,0,0,0,1.49.24,1.55,1.55,0,0,0,1.16-.63.75.75,0,0,0-.33-1.07c-.58-.25-1.55.35-1.92.77,0,0-.1.13-.19.27.16-.32.31-.63.44-.94a12.43,12.43,0,0,0,.62-1.66,5.22,5.22,0,0,0,1.54.25,1.53,1.53,0,0,0,1.15-.63.75.75,0,0,0-.32-1.07c-.58-.25-1.55.35-1.93.77l-.42.61h0a11,11,0,0,0,.3-1.71,14.06,14.06,0,0,0,.05-1.56c0-.48-.05-.92-.08-1.3,0-.21,0-.41-.07-.58h0s.23-.73.24-.77c.1-.56,0-1.69-.6-2a.76.76,0,0,0-1,.42,1.57,1.57,0,0,0,.23,1.29,4.85,4.85,0,0,0,1.13,1c0,.19,0,.39.06.61,0,.39,0,.83,0,1.3,0,.13,0,.27,0,.4,0-.22-.1-.53-.11-.56-.17-.54-.82-1.48-1.45-1.48a.74.74,0,0,0-.73.84,1.6,1.6,0,0,0,.8,1.05,4.88,4.88,0,0,0,1.48.38c0,.3,0,.6-.06.91a9.55,9.55,0,0,1-.34,1.69l0,.09c0-.11,0-.74-.06-.79-.11-.55-.65-1.56-1.28-1.63a.74.74,0,0,0-.81.76,1.55,1.55,0,0,0,.67,1.13,5.31,5.31,0,0,0,1.47.55,13.12,13.12,0,0,1-.63,1.59c-.18.39-.38.77-.58,1.15,0-.15,0-.74-.06-.78-.11-.55-.65-1.56-1.27-1.63a.75.75,0,0,0-.82.76,1.54,1.54,0,0,0,.68,1.12,4.94,4.94,0,0,0,1.46.56c-.1.17-.19.34-.28.51-.3.57-.61,1.13-.9,1.69-.09.2-.18.39-.28.59,0-.22,0-.63,0-.67-.11-.55-.65-1.56-1.28-1.63a.74.74,0,0,0-.81.76,1.53,1.53,0,0,0,.68,1.13,5,5,0,0,0,1.4.54c-.15.33-.29.66-.41,1,0,.15-.11.29-.15.43l-.13.42c-.08.29-.16.55-.22.82s-.07.27-.1.4c0-.23,0-.59,0-.62,0-.57-.4-1.64-1-1.81a.74.74,0,0,0-.92.63,1.55,1.55,0,0,0,.5,1.22,5.57,5.57,0,0,0,1.35.76c-.08.32-.15.64-.21.94-.2.94-.32,1.74-.4,2.29s-.12.88-.12.88h0a.22.22,0,0,0,.2.24.22.22,0,0,0,.24-.2S119.54,391.39,119.61,390.84Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M124.12,375.84a5.56,5.56,0,0,0,1.57-.16,1.56,1.56,0,0,0,.94-.92.74.74,0,0,0-.59-.94c-.63-.09-1.41.74-1.65,1.25C124.37,375.12,124.11,375.84,124.12,375.84Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M119,390.83c-.25-.49-.59-1.21-1-2.09-.11-.25-.22-.52-.33-.8a5.26,5.26,0,0,0,1.3-.84,1.58,1.58,0,0,0,.43-1.25.75.75,0,0,0-1-.57c-.6.2-.91,1.3-.9,1.86,0,0,0,.47.08.68-.06-.17-.13-.33-.2-.51s-.19-.52-.28-.79l-.13-.41c-.05-.14-.08-.28-.12-.43s-.09-.42-.14-.64a4.79,4.79,0,0,0,1.34-.61,1.59,1.59,0,0,0,.62-1.17.75.75,0,0,0-.86-.71c-.63.11-1.1,1.14-1.18,1.7,0,0,0,.14,0,.28,0-.21-.08-.42-.11-.64-.08-.62-.15-1.26-.22-1.89,0-.14,0-.27,0-.4a4.93,4.93,0,0,0,1.38-.62,1.59,1.59,0,0,0,.62-1.17.75.75,0,0,0-.86-.71c-.63.11-1.1,1.14-1.18,1.7,0,0,0,.17,0,.33,0-.35-.09-.69-.15-1a13.47,13.47,0,0,0-.4-1.72,5.27,5.27,0,0,0,1.42-.64,1.53,1.53,0,0,0,.61-1.17.75.75,0,0,0-.86-.71c-.62.11-1.1,1.15-1.17,1.71,0,0,0,.56,0,.74v0a9.53,9.53,0,0,0-.69-1.59,13.14,13.14,0,0,0-.81-1.32c-.27-.4-.55-.74-.79-1.05l-.38-.45h0s-.21-.73-.23-.78c-.23-.51-1-1.38-1.6-1.32a.75.75,0,0,0-.63.92,1.58,1.58,0,0,0,.9,1,5,5,0,0,0,1.51.22l.38.48c.24.31.5.66.76,1.06.07.1.14.22.21.33l-.4-.4c-.44-.36-1.5-.79-2-.44a.75.75,0,0,0-.14,1.1,1.58,1.58,0,0,0,1.25.44,5.28,5.28,0,0,0,1.45-.5c.15.25.3.51.44.8a9,9,0,0,1,.65,1.58.44.44,0,0,1,0,.1c-.06-.09-.45-.59-.48-.62-.4-.4-1.4-.95-2-.66a.75.75,0,0,0-.26,1.08,1.55,1.55,0,0,0,1.19.57,5,5,0,0,0,1.53-.35,12.81,12.81,0,0,1,.35,1.68c.06.42.11.84.15,1.27l-.48-.61c-.4-.41-1.4-1-2-.66a.75.75,0,0,0-.27,1.08,1.56,1.56,0,0,0,1.19.57,5.06,5.06,0,0,0,1.52-.34l.06.58c.06.63.11,1.27.18,1.9l.09.65c-.13-.18-.39-.5-.41-.53-.4-.4-1.4-.94-2-.66a.77.77,0,0,0-.26,1.09,1.57,1.57,0,0,0,1.19.56,4.78,4.78,0,0,0,1.47-.32c.06.35.12.71.2,1.05,0,.15.07.3.11.44l.12.42.27.81c.05.13.1.25.14.38-.11-.2-.29-.52-.31-.54-.33-.46-1.24-1.15-1.84-.95a.75.75,0,0,0-.42,1,1.57,1.57,0,0,0,1.09.74,4.85,4.85,0,0,0,1.55-.11c.11.32.23.62.34.9.36.9.69,1.63.93,2.14s.39.8.39.8h0a.22.22,0,1,0,.39-.21S119.21,391.33,119,390.83Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M114.45,375.83a5.15,5.15,0,0,0,1.22-1,1.55,1.55,0,0,0,.28-1.28.74.74,0,0,0-1-.46c-.58.27-.76,1.39-.69,2C114.26,375.09,114.44,375.84,114.45,375.83Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M232.84,392.51s10.67-3.52,7.62-.78a16.09,16.09,0,0,1-1.28,1H207.66l-.95-1.92-.23-.47-.38-.78,3.78-2.6-4,2.16-1.06-2.39.82-8-1.29,7.32-.78-2L200,377.35l5.74,12.71-8.22-3.27,8.57,4,1,2H173c-1.85-.2-4.47-.74-4.95-2.23-.76-2.34,7.24-2.34,7.24-2.34s-8.38-3.52-5.33-4.3,8.38,2.34,8.38,2.34-3-7,.76-5.47a7.77,7.77,0,0,1,4.38,4.48c-.4-1.38-1.17-4.63.95-3.7a8.1,8.1,0,0,1,3.21,3c-1-2.09-1.91-5.2,2.5-4.13,0,0-.93-9.59,9.14-11.34s9.53,12.12,13,14.86,7.62-.4,9.15,2.73,1.14,4.69,1.14,4.69,5.71-15.24,6.47-10.94-1.9,8.21-1.9,8.21,9.14-12.12,7.24-7.43a54.78,54.78,0,0,1-4.19,8.21s12.57-3.13,10.66-1.17S232.84,392.51,232.84,392.51Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M217.73,390.3c.09-.7.23-1.71.45-2.9.06-.35.13-.71.21-1.09a6.61,6.61,0,0,0,2,0,2,2,0,0,0,1.33-1,1,1,0,0,0-.61-1.28c-.78-.21-1.89.74-2.28,1.34,0,0-.27.53-.39.79.05-.23.1-.45.15-.69s.17-.69.25-1c.06-.18.11-.36.16-.54s.12-.35.17-.53.2-.53.31-.79a6,6,0,0,0,1.86.3,2,2,0,0,0,1.47-.82,1,1,0,0,0-.41-1.36c-.74-.32-2,.45-2.46,1l-.21.29c.11-.25.23-.51.35-.76.34-.72.72-1.45,1.09-2.17l.23-.46a6.56,6.56,0,0,0,1.91.31,2,2,0,0,0,1.47-.81,1,1,0,0,0-.41-1.36c-.74-.32-2,.44-2.46,1l-.24.34q.3-.6.57-1.2a16.37,16.37,0,0,0,.78-2.11,6.78,6.78,0,0,0,2,.32,2,2,0,0,0,1.47-.81,1,1,0,0,0-.42-1.36c-.74-.32-2,.44-2.45,1l-.54.78v0a12.47,12.47,0,0,0,.38-2.18,15,15,0,0,0,.06-2,16.13,16.13,0,0,0-.1-1.67c0-.27,0-.51-.08-.74h0s.29-.93.3-1c.13-.72-.05-2.16-.76-2.54a1,1,0,0,0-1.32.53,2,2,0,0,0,.28,1.66,6.6,6.6,0,0,0,1.45,1.3c0,.24.05.49.07.77,0,.5.07,1.06.07,1.67,0,.16,0,.34,0,.51,0-.29-.13-.68-.14-.72-.21-.69-1-1.89-1.84-1.9a1,1,0,0,0-.93,1.08,2,2,0,0,0,1,1.34,6.36,6.36,0,0,0,1.89.49c0,.38,0,.76-.09,1.16a11.53,11.53,0,0,1-.43,2.15l0,.12c0-.15-.06-.95-.08-1-.14-.7-.82-2-1.62-2.08a1,1,0,0,0-1,1,2,2,0,0,0,.86,1.44,6.78,6.78,0,0,0,1.87.71,17.77,17.77,0,0,1-.8,2c-.23.49-.48,1-.74,1.46,0-.2-.07-.94-.08-1-.14-.7-.82-2-1.63-2.08a1,1,0,0,0-1,1,2,2,0,0,0,.87,1.44,6.93,6.93,0,0,0,1.86.71l-.35.66c-.39.71-.78,1.43-1.14,2.15q-.19.38-.36.75c0-.29-.06-.81-.07-.85-.14-.71-.83-2-1.63-2.09a1,1,0,0,0-1,1,2,2,0,0,0,.86,1.45,6.25,6.25,0,0,0,1.8.68c-.19.42-.37.84-.53,1.26-.07.18-.14.37-.19.55s-.12.35-.17.53c-.1.37-.2.71-.28,1.05,0,.18-.08.34-.12.51,0-.29.05-.76.05-.8,0-.72-.51-2.09-1.29-2.31a1,1,0,0,0-1.18.8,2,2,0,0,0,.64,1.56,6.82,6.82,0,0,0,1.72,1c-.09.41-.19.82-.26,1.2-.25,1.2-.41,2.21-.52,2.92s-.14,1.12-.14,1.12h0a.29.29,0,0,0,.26.31.28.28,0,0,0,.31-.26S217.64,391,217.73,390.3Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M223.49,371.17a6.84,6.84,0,0,0,2-.21,2,2,0,0,0,1.2-1.17,1,1,0,0,0-.75-1.21c-.8-.11-1.8,1-2.11,1.6C223.8,370.24,223.47,371.16,223.49,371.17Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M216.91,390.3c-.32-.64-.76-1.55-1.23-2.68q-.21-.48-.42-1a6.74,6.74,0,0,0,1.66-1.07,2,2,0,0,0,.54-1.59,1,1,0,0,0-1.22-.73c-.76.26-1.16,1.66-1.15,2.38,0,0,.07.59.11.86-.09-.21-.17-.42-.26-.65s-.24-.67-.36-1-.11-.36-.17-.53-.09-.36-.14-.54-.12-.55-.18-.83a6.26,6.26,0,0,0,1.71-.78,2,2,0,0,0,.78-1.49,1,1,0,0,0-1.1-.91c-.79.14-1.4,1.47-1.5,2.18,0,0,0,.18,0,.36-.05-.28-.1-.55-.14-.83-.1-.79-.19-1.6-.28-2.41l-.06-.51a6.12,6.12,0,0,0,1.76-.79,2,2,0,0,0,.78-1.49,1,1,0,0,0-1.09-.91c-.8.14-1.41,1.46-1.51,2.18,0,0,0,.21,0,.41-.06-.44-.12-.88-.19-1.31a18.6,18.6,0,0,0-.51-2.2,6.56,6.56,0,0,0,1.81-.81,2,2,0,0,0,.78-1.49,1,1,0,0,0-1.09-.91c-.8.14-1.41,1.47-1.51,2.18,0,.05,0,.71,0,.95v0a13,13,0,0,0-.89-2,16.23,16.23,0,0,0-1-1.68c-.34-.51-.69-.95-1-1.34l-.48-.57h0s-.28-.94-.3-1c-.29-.66-1.23-1.76-2-1.68a.93.93,0,0,0-.8,1.16,2,2,0,0,0,1.15,1.23,6.44,6.44,0,0,0,1.92.29c.15.18.32.38.49.6.3.4.64.84,1,1.36.09.13.18.28.27.43-.2-.22-.48-.5-.51-.53-.56-.45-1.91-1-2.59-.56a1,1,0,0,0-.18,1.41,2,2,0,0,0,1.59.56,6.6,6.6,0,0,0,1.85-.63c.19.32.39.65.57,1a12,12,0,0,1,.82,2s0,.08,0,.12c-.09-.12-.58-.75-.62-.79-.51-.52-1.79-1.21-2.51-.85a1,1,0,0,0-.33,1.39,2,2,0,0,0,1.51.72,6.63,6.63,0,0,0,2-.44,15.89,15.89,0,0,1,.45,2.14c.08.53.14,1.07.19,1.62-.11-.16-.57-.75-.61-.78-.51-.52-1.79-1.21-2.51-.85a1,1,0,0,0-.33,1.39,2,2,0,0,0,1.52.72,6.56,6.56,0,0,0,1.94-.44c0,.25,0,.5.07.75.07.81.14,1.62.23,2.43,0,.27.07.54.12.82l-.53-.67c-.51-.51-1.79-1.21-2.51-.84a1,1,0,0,0-.33,1.38,2,2,0,0,0,1.51.73,6.46,6.46,0,0,0,1.88-.42c.07.45.15.9.25,1.34.05.19.09.38.14.56l.16.54c.12.36.23.7.35,1,.05.17.11.33.17.49-.14-.26-.37-.66-.39-.69-.42-.59-1.59-1.47-2.35-1.22a1,1,0,0,0-.54,1.32,2,2,0,0,0,1.39.95,6.71,6.71,0,0,0,2-.14l.44,1.15c.46,1.14.88,2.07,1.19,2.72s.49,1,.49,1h0a.29.29,0,0,0,.38.11.3.3,0,0,0,.12-.39S217.22,390.93,216.91,390.3Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M211.15,371.16a7.2,7.2,0,0,0,1.56-1.28,2,2,0,0,0,.35-1.64,1,1,0,0,0-1.29-.59c-.73.35-1,1.78-.88,2.5C210.9,370.21,211.14,371.16,211.15,371.16Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M138.14,392.61s-6.59-2.15-4.71-.47c.33.28.59.49.8.64h19.49l.59-1.17.14-.29.24-.48-2.34-1.59,2.47,1.32.65-1.46-.5-4.91.8,4.48.48-1.2,2.18-4.14-3.55,7.78,5.08-2-5.29,2.43-.62,1.23h21.08c1.15-.12,2.76-.45,3.06-1.36.47-1.44-4.47-1.44-4.47-1.44s5.18-2.15,3.29-2.63-5.18,1.44-5.18,1.44,1.89-4.31-.47-3.35a4.79,4.79,0,0,0-2.71,2.74c.25-.84.72-2.83-.59-2.26a5.08,5.08,0,0,0-2,1.81c.63-1.28,1.19-3.18-1.54-2.53a6.44,6.44,0,0,0-5.66-6.94c-6.22-1.07-5.89,7.42-8,9.09s-4.71-.24-5.65,1.68a4.78,4.78,0,0,0-.71,2.87s-3.53-9.33-4-6.7a7.56,7.56,0,0,0,1.18,5s-5.66-7.41-4.48-4.54a33.16,33.16,0,0,0,2.59,5s-7.77-1.91-6.59-.72S138.14,392.61,138.14,392.61Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M170.59,391.27c-.05-.43-.14-1-.27-1.78,0-.21-.09-.44-.14-.67a3.92,3.92,0,0,1-1.22,0,1.23,1.23,0,0,1-.82-.63.57.57,0,0,1,.38-.78c.48-.13,1.16.45,1.4.82a5.14,5.14,0,0,1,.24.48l-.09-.42c0-.21-.1-.42-.16-.63l-.09-.33c0-.11-.07-.22-.11-.33s-.12-.32-.19-.48a3.91,3.91,0,0,1-1.15.18,1.22,1.22,0,0,1-.91-.5.58.58,0,0,1,.26-.83c.46-.2,1.22.27,1.52.6l.13.18c-.07-.15-.14-.31-.22-.46-.21-.44-.44-.89-.67-1.33l-.15-.28a4.09,4.09,0,0,1-1.18.19,1.25,1.25,0,0,1-.91-.5.59.59,0,0,1,.26-.83c.46-.2,1.22.27,1.52.6,0,0,.07.11.15.21-.13-.24-.24-.49-.35-.73a9.83,9.83,0,0,1-.49-1.3,4.08,4.08,0,0,1-1.21.2,1.2,1.2,0,0,1-.91-.5.58.58,0,0,1,.25-.83c.46-.2,1.23.27,1.52.6l.33.48h0a7.43,7.43,0,0,1-.24-1.34c0-.43,0-.83,0-1.21s0-.72.06-1,0-.31.06-.45h0s-.18-.57-.19-.61c-.07-.43,0-1.31.48-1.54a.58.58,0,0,1,.81.32,1.21,1.21,0,0,1-.17,1,4,4,0,0,1-.9.8c0,.14,0,.3,0,.47s0,.65,0,1v.31c0-.17.09-.42.09-.44.14-.42.65-1.15,1.14-1.16a.59.59,0,0,1,.58.66,1.24,1.24,0,0,1-.63.82,4,4,0,0,1-1.17.3c0,.23,0,.47.05.71a7.37,7.37,0,0,0,.27,1.32.25.25,0,0,0,0,.07c0-.09,0-.58.05-.62.09-.43.51-1.21,1-1.27a.59.59,0,0,1,.64.59,1.2,1.2,0,0,1-.53.88,4.27,4.27,0,0,1-1.16.44A9.19,9.19,0,0,0,168,383c.14.3.29.59.45.89,0-.12,0-.57,0-.61.09-.43.51-1.21,1-1.27a.59.59,0,0,1,.64.59,1.2,1.2,0,0,1-.53.88,3.94,3.94,0,0,1-1.16.43l.22.41c.24.44.48.88.71,1.32.08.15.15.3.22.45,0-.17,0-.49,0-.51.09-.44.52-1.22,1-1.28a.58.58,0,0,1,.64.59,1.2,1.2,0,0,1-.53.88,3.81,3.81,0,0,1-1.11.43c.12.25.23.51.33.76l.12.34.1.32c.06.23.12.44.17.65s0,.21.08.31c0-.18,0-.46,0-.49,0-.44.32-1.28.8-1.41a.59.59,0,0,1,.73.49,1.21,1.21,0,0,1-.39,1,4.34,4.34,0,0,1-1.07.6c.06.25.12.5.17.73.15.74.25,1.36.31,1.79s.1.69.1.69h0a.19.19,0,0,1-.16.19.17.17,0,0,1-.19-.16S170.65,391.7,170.59,391.27Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M167,379.56a4.43,4.43,0,0,1-1.24-.13,1.23,1.23,0,0,1-.74-.72.58.58,0,0,1,.47-.73c.49-.07,1.1.58,1.3,1C166.84,379,167,379.56,167,379.56Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M171.1,391.26c.2-.39.47-.95.76-1.63.09-.2.17-.41.26-.63a4,4,0,0,1-1-.66,1.21,1.21,0,0,1-.33-1,.59.59,0,0,1,.75-.45c.47.16.72,1,.72,1.46,0,0,0,.36-.07.53l.15-.4c.08-.2.16-.41.23-.61l.1-.33c0-.11.06-.22.09-.33s.08-.33.11-.5a4,4,0,0,1-1.05-.48,1.25,1.25,0,0,1-.49-.91.6.6,0,0,1,.68-.56c.49.09.87.9.93,1.33,0,0,0,.11,0,.22,0-.16.06-.33.08-.5.07-.49.12-1,.18-1.48l0-.31a4,4,0,0,1-1.09-.48,1.25,1.25,0,0,1-.48-.92.59.59,0,0,1,.68-.55c.49.09.87.89.93,1.33,0,0,0,.13,0,.25,0-.27.07-.53.12-.8a9.68,9.68,0,0,1,.31-1.34,4.06,4.06,0,0,1-1.12-.5,1.2,1.2,0,0,1-.48-.91.59.59,0,0,1,.67-.56c.5.09.87.9.93,1.34,0,0,0,.43,0,.58v0a7.38,7.38,0,0,1,.55-1.24,10.78,10.78,0,0,1,.64-1c.21-.31.43-.58.62-.82l.3-.35h0s.17-.57.18-.61c.18-.4.76-1.08,1.26-1a.58.58,0,0,1,.5.71,1.2,1.2,0,0,1-.71.75,4.09,4.09,0,0,1-1.19.18,4,4,0,0,0-.3.37,9,9,0,0,0-.6.83,2.33,2.33,0,0,0-.17.26l.32-.32c.34-.28,1.18-.61,1.6-.34a.58.58,0,0,1,.11.86,1.25,1.25,0,0,1-1,.34,3.93,3.93,0,0,1-1.15-.39c-.12.2-.24.4-.35.62a7.66,7.66,0,0,0-.51,1.24s0,.05,0,.08l.38-.49c.31-.31,1.11-.73,1.55-.51a.58.58,0,0,1,.21.84,1.25,1.25,0,0,1-.94.45,4.29,4.29,0,0,1-1.21-.27,9.07,9.07,0,0,0-.27,1.3c-.05.33-.09.66-.12,1,.07-.1.35-.46.38-.48.31-.32,1.1-.74,1.55-.52a.58.58,0,0,1,.2.85,1.22,1.22,0,0,1-.93.44,3.81,3.81,0,0,1-1.2-.27c0,.16,0,.31-.05.46,0,.5-.09,1-.14,1.48,0,.17-.05.34-.07.51.1-.14.3-.39.32-.41.32-.31,1.11-.74,1.55-.52a.58.58,0,0,1,.21.85,1.24,1.24,0,0,1-.94.44,3.92,3.92,0,0,1-1.16-.25,7.43,7.43,0,0,1-.16.82c0,.11-.05.23-.08.34l-.1.33-.21.63c0,.11-.08.2-.11.3.08-.16.23-.4.24-.42.26-.36,1-.9,1.46-.74a.58.58,0,0,1,.33.8,1.25,1.25,0,0,1-.86.58,4.54,4.54,0,0,1-1.22-.08c-.09.24-.18.48-.27.7-.29.7-.55,1.27-.74,1.67l-.3.62h0a.16.16,0,0,1-.23.07.17.17,0,0,1-.07-.24S170.91,391.65,171.1,391.26Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M174.66,379.55a4.21,4.21,0,0,1-1-.78,1.2,1.2,0,0,1-.22-1,.59.59,0,0,1,.8-.36c.45.21.6,1.09.54,1.53C174.81,379,174.67,379.56,174.66,379.55Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M147.89,391.48c0-.33-.1-.79-.21-1.34,0-.16-.06-.33-.09-.5a3.08,3.08,0,0,1-.93,0,.89.89,0,0,1-.61-.47.43.43,0,0,1,.28-.59c.36-.09.88.34,1.06.62l.18.36c0-.1,0-.21-.07-.31s-.08-.32-.12-.48l-.07-.25a2.25,2.25,0,0,0-.08-.24c0-.12-.09-.24-.14-.37a2.83,2.83,0,0,1-.87.14.92.92,0,0,1-.68-.37.44.44,0,0,1,.19-.63c.35-.15.92.2,1.14.45l.1.14a3.73,3.73,0,0,0-.16-.35c-.16-.33-.33-.67-.51-1l-.1-.21a2.82,2.82,0,0,1-.89.14.92.92,0,0,1-.69-.37.45.45,0,0,1,.19-.63c.35-.15.93.21,1.15.46l.11.15c-.09-.18-.18-.37-.26-.55a7.7,7.7,0,0,1-.37-1,3.59,3.59,0,0,1-.91.15,1,1,0,0,1-.69-.38.44.44,0,0,1,.19-.62c.35-.15.92.2,1.15.45l.25.36h0a7.68,7.68,0,0,1-.18-1,7.06,7.06,0,0,1,0-.91c0-.28,0-.54,0-.77s0-.23,0-.34h0a4.21,4.21,0,0,1-.14-.46c-.06-.33,0-1,.35-1.16a.45.45,0,0,1,.62.24.9.9,0,0,1-.14.76,2.73,2.73,0,0,1-.67.6l0,.36a6,6,0,0,0,0,.76v.24c0-.14.06-.32.07-.33.1-.32.48-.87.86-.88a.45.45,0,0,1,.43.5,1,1,0,0,1-.47.62,3.11,3.11,0,0,1-.88.22,3.44,3.44,0,0,0,0,.54,5.13,5.13,0,0,0,.19,1,.14.14,0,0,1,0,.06c0-.07,0-.44,0-.46.07-.33.38-.92.76-1a.44.44,0,0,1,.48.44.9.9,0,0,1-.4.67,3.17,3.17,0,0,1-.87.32,9.15,9.15,0,0,0,.37.94l.35.67c0-.09,0-.43,0-.46.07-.32.39-.92.76-1a.44.44,0,0,1,.48.45.88.88,0,0,1-.4.66,3,3,0,0,1-.86.32,3,3,0,0,0,.16.31c.18.33.36.66.53,1,.06.11.11.23.17.34,0-.13,0-.37,0-.39.07-.32.38-.91.76-1a.44.44,0,0,1,.48.45.91.91,0,0,1-.4.66,2.69,2.69,0,0,1-.84.32c.09.19.18.39.25.58a2.5,2.5,0,0,1,.09.25l.08.24c0,.17.09.33.13.49a1.89,1.89,0,0,1,.05.23c0-.13,0-.35,0-.36,0-.34.24-1,.6-1.07a.45.45,0,0,1,.55.37.94.94,0,0,1-.3.72,3.09,3.09,0,0,1-.8.45c0,.19.09.37.12.55.12.55.19,1,.24,1.34s.07.52.07.52h0a.14.14,0,0,1-.12.15A.13.13,0,0,1,148,392S147.93,391.8,147.89,391.48Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M145.21,382.67a3.33,3.33,0,0,1-.93-.09,1,1,0,0,1-.56-.54.44.44,0,0,1,.36-.55c.37-.06.83.43,1,.73C145.07,382.25,145.22,382.67,145.21,382.67Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M148.28,391.47c.14-.29.35-.71.57-1.22.06-.15.13-.31.19-.48a3.11,3.11,0,0,1-.77-.49.9.9,0,0,1-.25-.73.44.44,0,0,1,.56-.34c.36.12.55.77.54,1.1,0,0,0,.27-.05.4l.12-.3c.06-.15.11-.31.17-.47l.07-.24a2.33,2.33,0,0,0,.07-.25l.09-.38a2.79,2.79,0,0,1-.8-.36.89.89,0,0,1-.36-.68.44.44,0,0,1,.51-.42c.37.06.65.67.7,1v.17c0-.13.05-.26.06-.38.06-.37.1-.74.14-1.11a1.94,1.94,0,0,0,0-.24,3.06,3.06,0,0,1-.81-.36.94.94,0,0,1-.37-.69.46.46,0,0,1,.51-.42c.37.07.66.68.7,1,0,0,0,.09,0,.19a6,6,0,0,1,.09-.61,8.68,8.68,0,0,1,.23-1,3.14,3.14,0,0,1-.84-.37.93.93,0,0,1-.36-.69.44.44,0,0,1,.51-.41c.37.06.65.67.7,1,0,0,0,.32,0,.43h0a5.67,5.67,0,0,1,.41-.93,7,7,0,0,1,.48-.78c.16-.23.33-.43.47-.61l.22-.27h0s.13-.43.14-.45c.14-.31.58-.82,1-.78a.45.45,0,0,1,.38.54,1,1,0,0,1-.54.56,2.85,2.85,0,0,1-.89.13l-.23.28c-.14.18-.3.39-.45.62l-.13.2.24-.24c.26-.21.89-.46,1.2-.26a.44.44,0,0,1,.09.65.92.92,0,0,1-.74.26,3.06,3.06,0,0,1-.86-.29c-.09.15-.18.3-.27.47a5.64,5.64,0,0,0-.38.93l0,.05.29-.36c.24-.24.83-.56,1.17-.39a.44.44,0,0,1,.15.64.92.92,0,0,1-.7.33,3.19,3.19,0,0,1-.91-.2,7.38,7.38,0,0,0-.21,1l-.09.75a3.42,3.42,0,0,1,.29-.36c.23-.24.83-.56,1.16-.39a.44.44,0,0,1,.16.64.94.94,0,0,1-.71.33,3.48,3.48,0,0,1-.9-.2l0,.34c0,.37-.07.75-.11,1.12,0,.12,0,.25-.05.37l.24-.3c.24-.24.83-.56,1.17-.39a.44.44,0,0,1,.15.64.92.92,0,0,1-.7.33,3,3,0,0,1-.88-.19c0,.21-.07.41-.11.62a2.33,2.33,0,0,1-.07.25l-.07.25-.16.47c0,.08-.06.16-.08.23.06-.12.17-.3.18-.32.2-.27.74-.67,1.09-.56a.44.44,0,0,1,.25.61.88.88,0,0,1-.64.43,2.71,2.71,0,0,1-.92-.06l-.21.53c-.21.52-.41.95-.55,1.25s-.23.47-.23.47h0a.14.14,0,0,1-.18.06.13.13,0,0,1-.05-.18S148.13,391.77,148.28,391.47Z"
              style="fill: #92e3a9"
            ></path>
            <path
              d="M151,382.67a3.28,3.28,0,0,1-.72-.59.89.89,0,0,1-.17-.75.44.44,0,0,1,.6-.27c.34.16.46.82.41,1.15C151.07,382.23,151,382.67,151,382.67Z"
              style="fill: #92e3a9"
            ></path>
            <rect
              x="66.45"
              y="392.21"
              width="174.54"
              height="6.81"
              style="
                fill: var(--on-primary);
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <rect
              x="138.74"
              y="392.21"
              width="102.25"
              height="6.81"
              style="
                fill: #fff;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
              "
            ></rect>
            <line
              x1="148.29"
              y1="396.43"
              x2="148.29"
              y2="392.45"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="150.89"
              y1="392.45"
              x2="150.89"
              y2="394.6"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="153.49"
              y1="392.45"
              x2="153.49"
              y2="394.6"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="156.09"
              y1="392.45"
              x2="156.09"
              y2="397.97"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="159.21"
              y1="392.45"
              x2="159.21"
              y2="395.03"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="221.12"
              y1="392.45"
              x2="221.12"
              y2="396.43"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="223.72"
              y1="392.45"
              x2="223.72"
              y2="394.6"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="226.32"
              y1="392.45"
              x2="226.32"
              y2="394.6"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="228.93"
              y1="392.45"
              x2="228.93"
              y2="397.97"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
            <line
              x1="232.05"
              y1="392.45"
              x2="232.05"
              y2="395.03"
              style="
                fill: none;
                stroke: var(--on-primary);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 0.75px;
              "
            ></line>
          </g>
        </svg>
        <div>
          <h2>Faz parte da CEU?</h2>
          <p>
            Caso seja um diretor de departamento ou membro de algum conselho
            faça login para poder acompanhar as atividades dos colaboradores e
            gerenciar a plataforma!
          </p>
          <p>
            <b>Demais moradores não devem realizar cadastro</b>, afinal, seu
            diretor é responsável por suas horas.
          </p>
        </div>
      </div>
      <!-- Diretor -->
      <div class="container account_type" v-if="mode == 3">
        <!-- Import svg -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <g id="freepik--background-complete--inject-33">
            <path
              d="M440.28,123.92a14.77,14.77,0,0,0,8.8-13.66c0-8.15-6.14-14.79-13.79-14.83s-13.87,6.55-13.9,14.7a14.75,14.75,0,0,0,8.82,13.79c-21.3,3.21-20.33,26.36-20.33,26.36l50.37.23S461.4,127.11,440.28,123.92Z"
              style="fill: #ebebeb"
            ></path>
            <circle
              cx="349.99"
              cy="181.45"
              r="12.47"
              transform="translate(-13.32 334.5) rotate(-50.25)"
              style="fill: #e0e0e0"
            ></circle>
            <path
              d="M358.4,167.8a3.23,3.23,0,1,1-1.93-4.14A3.23,3.23,0,0,1,358.4,167.8Z"
              style="fill: #ebebeb"
            ></path>
            <path
              d="M287.79,285.16h45.64a7.62,7.62,0,0,1,7.62,7.62v1.51a0,0,0,0,1,0,0H280.17a0,0,0,0,1,0,0v-1.51A7.62,7.62,0,0,1,287.79,285.16Z"
              transform="translate(117.75 -88.73) rotate(19.99)"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M303.19,263.27s-5.78,4.16-10.74,4.5a13.1,13.1,0,0,0-4.27.93,4.18,4.18,0,0,0-2.73,3.55c-.49,3.41,5.61,5.5,5.61,5.5l23.92,8.7,6.07-16.68Z"
              style="fill: #ebebeb"
            ></path>
            <path
              d="M335.91,294.07s3.16,1.51,5-1.19a4.74,4.74,0,0,0,.16-5.07,15,15,0,0,0-2.7-3.33c-3.59-3.44-5.35-10.34-5.35-10.34l-17.85-6.5-6.07,16.69"
              style="fill: #ebebeb"
            ></path>
            <polygon
              points="301.69 258.03 303.15 263.26 333.13 274.17 337.8 271.17 301.69 258.03"
              style="fill: #e0e0e0"
            ></polygon>
            <rect
              x="319.94"
              y="220.81"
              width="29.27"
              height="6.04"
              rx="2.52"
              transform="matrix(0.94, 0.34, -0.34, 0.94, 96.68, -100.89)"
              style="fill: #ebebeb"
            ></rect>
            <rect
              x="323.9"
              y="217.32"
              width="24.71"
              height="3.79"
              rx="1.58"
              transform="translate(95.2 -101.74) rotate(19.99)"
              style="fill: #ebebeb"
            ></rect>
            <rect
              x="327.96"
              y="212.07"
              width="20.97"
              height="2.26"
              rx="0.94"
              transform="translate(93.27 -102.85) rotate(19.99)"
              style="fill: #ebebeb"
            ></rect>
            <path
              d="M325.57,223.77S315.67,250,301.69,258l18.1,6.59,13.8-37.93Z"
              style="fill: #ebebeb"
            ></path>
            <path
              d="M341.05,229.4s-8.81,26.65-3.25,41.77l-18.57-6.75L333,226.49Z"
              style="fill: #ebebeb"
            ></path>
            <path
              d="M368.21,185.6c-2.5-5-7.21-2.33-9.1-1.41s-4.56-.41-5.13-3.52c-.48-2.56-1.9-3.11-2.52-3.26s-2-.78-4,.88c-2.44,2-5.34,1.32-6.2-.6s-2.76-7-7.87-4.76c0,0,4.25,12.78,1.72,23.51s-4.4,15.5-6.53,18l8.09,2.94.51.19,8.09,2.94c-.05-3.26,1.58-8.11,6.53-18S368.21,185.6,368.21,185.6Z"
              style="fill: #ebebeb"
            ></path>
            <path
              d="M333.7,293.3c-.05.14-9.74-3.26-21.63-7.59s-21.51-7.94-21.46-8.08,9.73,3.26,21.63,7.59S333.75,293.17,333.7,293.3Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M333.31,274.23c-.05.14-6.84-2.21-15.16-5.24s-15-5.59-15-5.73,6.84,2.21,15.17,5.24S333.36,274.1,333.31,274.23Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M337.8,271.17c0,.14-8.17-2.7-18.14-6.32s-18-6.68-18-6.82,8.17,2.7,18.14,6.33S337.85,271,337.8,271.17Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M344.34,230.6c0,.13-4.92-1.51-10.89-3.68s-10.75-4-10.71-4.18,4.93,1.52,10.89,3.69S344.39,230.46,344.34,230.6Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M346.41,224.92c-.05.14-4.93-1.51-10.89-3.68s-10.76-4-10.71-4.17,4.92,1.51,10.89,3.68S346.45,224.79,346.41,224.92Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M346.71,221c0,.13-4.48-1.35-9.9-3.32s-9.76-3.68-9.71-3.81a102.18,102.18,0,0,1,9.89,3.32A103,103,0,0,1,346.71,221Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M347,217.6a89.23,89.23,0,0,1-9.09-3,89.6,89.6,0,0,1-8.92-3.52,87.21,87.21,0,0,1,9.09,3A86.79,86.79,0,0,1,347,217.6Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M347.88,215.3a86.9,86.9,0,0,1-9.1-3,90.84,90.84,0,0,1-8.92-3.52,86.9,86.9,0,0,1,9.1,3A89.6,89.6,0,0,1,347.88,215.3Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M333.37,172.93s.13-.09.4-.21l.51-.21.74-.17a8.45,8.45,0,0,1,1-.08,4.69,4.69,0,0,1,1.12.19,5,5,0,0,1,2.28,1.56,11.26,11.26,0,0,1,1.73,2.83,4.78,4.78,0,0,0,.87,1.51,3,3,0,0,0,1.56.83,4.45,4.45,0,0,0,3.67-1,6,6,0,0,1,2-1.14,3.18,3.18,0,0,1,2.4.17,2.75,2.75,0,0,1,1.06.5,3.45,3.45,0,0,1,.82.89,5.75,5.75,0,0,1,.79,2.14,4.48,4.48,0,0,0,2.15,3.15,3,3,0,0,0,1.74.37,4.83,4.83,0,0,0,1.63-.6,11.64,11.64,0,0,1,3.14-1.06,5.14,5.14,0,0,1,2.75.27,4.61,4.61,0,0,1,1,.58,6.19,6.19,0,0,1,.68.67l.45.61.26.48c.13.27.2.41.18.42s-.11-.12-.27-.36l-.3-.46-.47-.56a8.5,8.5,0,0,0-.68-.6,4,4,0,0,0-.94-.51,4.85,4.85,0,0,0-2.58-.18,11.54,11.54,0,0,0-3,1.09l-.81.4a2.85,2.85,0,0,1-1,.26,3.44,3.44,0,0,1-2-.4,4.94,4.94,0,0,1-2.43-3.47c-.25-1.36-.87-2.8-2.4-3.17a2.72,2.72,0,0,0-2-.13,5.3,5.3,0,0,0-1.81,1,4.88,4.88,0,0,1-4.09,1.09,3.43,3.43,0,0,1-1.79-1,3.26,3.26,0,0,1-.57-.82l-.36-.83a11,11,0,0,0-1.62-2.77,4.82,4.82,0,0,0-2.09-1.52,4.61,4.61,0,0,0-1-.22,6.58,6.58,0,0,0-.91,0l-.72.12-.52.16A1.8,1.8,0,0,1,333.37,172.93Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M148.37,217.23a35.64,35.64,0,0,1,8.66-3.76l1.79-8.57,14.48-.26,2.08,8.51a35.32,35.32,0,0,1,8.79,3.45l7.32-4.79,10.42,10.06-4.53,7.48a35.64,35.64,0,0,1,3.76,8.66l8.57,1.79.26,14.48-8.51,2.08a35.5,35.5,0,0,1-3.46,8.79l4.8,7.32-10.06,10.42-7.48-4.54a35.67,35.67,0,0,1-8.66,3.77l-1.79,8.57-14.48.25-2.08-8.5a35.35,35.35,0,0,1-8.79-3.46l-7.32,4.8-10.42-10.06,4.54-7.48a35.57,35.57,0,0,1-3.77-8.67l-8.57-1.78-.25-14.48,8.5-2.09a35.43,35.43,0,0,1,3.46-8.78l-4.8-7.32,10.06-10.42,7.48,4.53Zm7.72,19.3a15.54,15.54,0,1,0,22-.39A15.54,15.54,0,0,0,156.09,236.53Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M49.94,371.64a24.54,24.54,0,0,1,6-2.6l1.23-5.91,10-.17,1.44,5.86a24.88,24.88,0,0,1,6.06,2.38l5.05-3.3,7.18,6.93L83.74,380a24.51,24.51,0,0,1,2.59,6l5.91,1.23.18,10-5.87,1.44a24.33,24.33,0,0,1-2.38,6.06l3.31,5.05-6.94,7.19-5.16-3.13a24.61,24.61,0,0,1-6,2.59l-1.23,5.91-10,.18-1.44-5.87a24.48,24.48,0,0,1-6.06-2.38l-5,3.31-7.18-6.94,3.13-5.16a24.64,24.64,0,0,1-2.6-6l-5.91-1.23-.18-10,5.87-1.44a24.48,24.48,0,0,1,2.38-6.06l-3.31-5,6.94-7.19,5.16,3.13Zm5.33,13.3a10.72,10.72,0,1,0,15.15-.26A10.73,10.73,0,0,0,55.27,384.94Z"
              style="fill: #ebebeb"
            ></path>
            <path
              d="M44.7,151.26a14.69,14.69,0,0,1,3.64-1.59l.75-3.6,6.09-.11.88,3.58A14.91,14.91,0,0,1,59.75,151l3.08-2,4.39,4.24-1.91,3.14A15.28,15.28,0,0,1,66.89,160l3.61.75.1,6.09-3.57.88a14.94,14.94,0,0,1-1.46,3.69l2,3.08-4.23,4.39L60.21,177a15.21,15.21,0,0,1-3.64,1.58l-.75,3.61-6.09.1-.88-3.57a15,15,0,0,1-3.7-1.46l-3.08,2L37.69,175l1.91-3.15A14.45,14.45,0,0,1,38,168.23l-3.61-.75-.11-6.1,3.58-.87a15,15,0,0,1,1.45-3.7l-2-3.08,4.23-4.38,3.15,1.91Zm3.24,8.11a6.54,6.54,0,1,0,9.25-.16A6.55,6.55,0,0,0,47.94,159.37Z"
              style="fill: #ebebeb"
            ></path>
            <path
              d="M241.57,46A29.7,29.7,0,1,1,207.91,21,29.67,29.67,0,0,1,241.57,46Z"
              style="fill: #f5f5f5"
            ></path>
            <path
              d="M234.58,47a22.64,22.64,0,1,1-25.65-19.1A22.61,22.61,0,0,1,234.58,47Z"
              style="fill: #ebebeb"
            ></path>
            <path
              d="M234.47,46.32a12.85,12.85,0,0,1-1-2.6,24,24,0,0,0-3.59-6.49,23.26,23.26,0,0,0-3.55-3.64,22.88,22.88,0,0,0-4.95-3.06,22.21,22.21,0,0,0-6.15-1.77,22.37,22.37,0,0,0-3.39-.2,24.4,24.4,0,0,0-3.48.34,23.61,23.61,0,0,0-3.38.88,21.63,21.63,0,0,0-3.11,1.35,22.37,22.37,0,0,0-5.17,3.78,22.72,22.72,0,0,0-3.59,4.57,23.34,23.34,0,0,0-2.08,4.64,24.08,24.08,0,0,0-1.13,7.33,12.83,12.83,0,0,1,0,2.79,6.74,6.74,0,0,1-.64-2.75,20.86,20.86,0,0,1,.62-7.71,23.41,23.41,0,0,1,2-5,23.14,23.14,0,0,1,3.71-5,23,23,0,0,1,8.85-5.63,25.6,25.6,0,0,1,3.64-1,25.28,25.28,0,0,1,3.75-.35,22.14,22.14,0,0,1,3.66.24,21.25,21.25,0,0,1,3.44.78,22.85,22.85,0,0,1,3.15,1.22,22.62,22.62,0,0,1,8.81,7.42,20.73,20.73,0,0,1,3.24,7A6.58,6.58,0,0,1,234.47,46.32Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M216.65,63.27l.63,3.9-3.48.55-.61-3.79a16.61,16.61,0,0,1-9.1-1.39L205.32,58a14.2,14.2,0,0,0,7.14,1.39l-.93-5.81c-4-.32-8.52-.91-9.32-5.88-.59-3.69,1.58-7.28,7-8.78l-.61-3.86,3.47-.56.61,3.79a15.94,15.94,0,0,1,7.4,1L219,43.82a14.44,14.44,0,0,0-5.61-1l1,5.91c4,.28,8.45.89,9.24,5.79C224.14,58.19,222,61.74,216.65,63.27Zm-5.93-14.81-.8-4.93c-1.77.71-2.34,1.84-2.16,3S209.11,48.22,210.72,48.46ZM218,55.89c-.2-1.22-1.31-1.72-2.89-2l.77,4.79C217.59,58,218.21,57,218,55.89Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M338.27,456.84a23.9,23.9,0,1,1-27.08-20.16A23.86,23.86,0,0,1,338.27,456.84Z"
              style="fill: #f5f5f5"
            ></path>
            <path
              d="M332.64,457.65A18.21,18.21,0,1,1,312,442.29,18.19,18.19,0,0,1,332.64,457.65Z"
              style="fill: #ebebeb"
            ></path>
            <path
              d="M332.55,457.09a11.5,11.5,0,0,1-.79-2.1,19.2,19.2,0,0,0-2.88-5.22,18,18,0,0,0-6.84-5.39,16.26,16.26,0,0,0-2.37-.87,16.63,16.63,0,0,0-2.58-.55,16.36,16.36,0,0,0-2.72-.16,19.08,19.08,0,0,0-2.8.27,18.39,18.39,0,0,0-2.72.71,17,17,0,0,0-2.5,1.08,18.06,18.06,0,0,0-2.24,1.41,16.92,16.92,0,0,0-1.92,1.64,18.12,18.12,0,0,0-4.57,7.41,19.06,19.06,0,0,0-.9,5.89,11.53,11.53,0,0,1,0,2.24,5.21,5.21,0,0,1-.53-2.21,17.05,17.05,0,0,1,.5-6.2,18.6,18.6,0,0,1,6.64-9.84,18.4,18.4,0,0,1,2.39-1.54,18.6,18.6,0,0,1,2.69-1.19,19.24,19.24,0,0,1,2.94-.77,20.71,20.71,0,0,1,3-.29,17.78,17.78,0,0,1,2.94.2,17.46,17.46,0,0,1,2.77.62,18.35,18.35,0,0,1,2.54,1,18.9,18.9,0,0,1,4.18,2.74,18.62,18.62,0,0,1,2.91,3.22,16.89,16.89,0,0,1,2.6,5.65A5.21,5.21,0,0,1,332.55,457.09Z"
              style="fill: #e0e0e0"
            ></path>
            <path
              d="M318.22,470.72l.5,3.14-2.79.44-.49-3a13.42,13.42,0,0,1-7.32-1.13l1-3.65a11.41,11.41,0,0,0,5.74,1.11l-.75-4.67c-3.22-.26-6.85-.74-7.49-4.73-.48-3,1.27-5.86,5.6-7.07l-.49-3.1,2.79-.45.49,3.05a12.8,12.8,0,0,1,5.95.79l-.85,3.67a11.53,11.53,0,0,0-4.51-.77l.76,4.75c3.22.23,6.8.72,7.43,4.66C324.25,466.63,322.53,469.49,318.22,470.72Zm-4.77-11.91-.64-4c-1.43.57-1.89,1.48-1.74,2.4S312.15,458.62,313.45,458.81Zm5.89,6c-.16-1-1.06-1.38-2.33-1.61l.62,3.86C319,466.5,319.48,465.68,319.34,464.78Z"
              style="fill: #e0e0e0"
            ></path>
          </g>
          <g id="freepik--Character--inject-33">
            <path
              d="M430.26,259.44s0-1-.1-2.87c0-.95-.06-2.13-.1-3.53s-.07-3-.25-4.88-.3-3.9-.48-6.18-.59-4.74-.92-7.42a186.51,186.51,0,0,0-3.59-18.31c-.38-1.71-.95-3.43-1.43-5.22l-.78-2.7-.39-1.38-.46-1.38-1.93-5.67c-.31-1-.69-1.93-1.08-2.9s-.77-2-1.16-2.95a169.84,169.84,0,0,0-12.3-24.9,178.55,178.55,0,0,0-44.86-50.21,176.15,176.15,0,0,0-74.35-33l-5.47-1-5.56-.71c-3.71-.56-7.49-.72-11.29-1-1.9-.17-3.82-.13-5.74-.2l-2.88-.07c-1,0-1.93-.06-2.9,0-3.87.12-7.77.1-11.69.49a176.4,176.4,0,0,0-23.66,3.31c-3.94.91-7.92,1.76-11.84,3-4,1-7.83,2.45-11.77,3.76a176.95,176.95,0,0,0-44.72,24,192.72,192.72,0,0,0-19.92,17.16A190.53,190.53,0,0,0,111.2,155l-3.93,5.53-3.69,5.73c-1.27,1.89-2.33,3.92-3.49,5.88l-1.71,3-1.58,3-1.57,3.07c-.53,1-1,2.05-1.5,3.11l-2.85,6.31q-1.27,3.22-2.56,6.46l-.64,1.62-.56,1.65L86,203.69,84.89,207l-1,3.37-1,3.37-.47,1.7-.4,1.71q-.78,3.43-1.58,6.87-.61,3.48-1.24,7a176.3,176.3,0,0,0,0,56.83c.42,2.33.83,4.65,1.25,7s1,4.59,1.57,6.87l.4,1.72c.14.57.31,1.13.47,1.69l1,3.38,1,3.37L86,315.15l1.12,3.31.56,1.65.64,1.62,2.55,6.47,2.86,6.31.71,1.57.79,1.54,1.57,3.06,1.58,3.06,1.71,3c1.16,2,2.21,4,3.49,5.88s2.46,3.82,3.68,5.73l3.94,5.53a189.66,189.66,0,0,0,17.44,20.36,193.77,193.77,0,0,0,19.92,17.16,185.33,185.33,0,0,0,21.76,13.78,187.35,187.35,0,0,0,23,10.27c3.94,1.31,7.81,2.73,11.78,3.76,3.91,1.21,7.9,2.05,11.83,3a176.74,176.74,0,0,0,23.67,3.3c3.91.39,7.82.37,11.69.49,1,.05,1.93,0,2.9,0l2.88-.07c1.92-.07,3.84,0,5.74-.2,3.8-.32,7.58-.48,11.29-1l5.56-.71,5.47-1a176.15,176.15,0,0,0,74.35-33,178.75,178.75,0,0,0,44.86-50.22,171.16,171.16,0,0,0,12.29-24.89l1.16-2.95c.39-1,.77-1.93,1.08-2.91l1.93-5.66c.15-.47.31-.93.46-1.38s.27-.92.4-1.38c.26-.91.51-1.82.77-2.71.48-1.78,1.05-3.5,1.43-5.22a186.36,186.36,0,0,0,3.59-18.3c.33-2.68.69-5.15.92-7.42s.34-4.34.48-6.18.22-3.47.25-4.88.07-2.58.1-3.53c.06-1.89.1-2.86.1-2.86s0,1,0,2.86c0,.95-.05,2.13-.08,3.53s-.05,3-.22,4.88-.29,3.91-.46,6.19-.58,4.74-.9,7.43A182.47,182.47,0,0,1,425,302.66c-.38,1.72-.94,3.44-1.43,5.23-.25.89-.5,1.8-.76,2.71l-.39,1.39c-.16.45-.31.91-.47,1.37L420.06,319c-.31,1-.69,1.94-1.08,2.91s-.77,2-1.16,3a170.44,170.44,0,0,1-12.27,24.95,178.66,178.66,0,0,1-44.89,50.36,176.59,176.59,0,0,1-74.49,33.15l-5.48,1-5.57.72c-3.72.56-7.52.72-11.33,1-1.9.17-3.82.13-5.75.21l-2.89.08c-1,0-1.93.05-2.9,0-3.88-.13-7.8-.11-11.72-.49a177.38,177.38,0,0,1-23.73-3.3c-4-.92-7.94-1.77-11.87-3-4-1-7.87-2.45-11.81-3.77a177.15,177.15,0,0,1-44.86-24.1,194.92,194.92,0,0,1-20-17.2,191.92,191.92,0,0,1-17.49-20.42c-1.32-1.84-2.63-3.69-4-5.54l-3.7-5.75c-1.27-1.89-2.33-3.93-3.5-5.9l-1.72-3-1.58-3.07-1.57-3.07L94,336.3l-.72-1.57-2.86-6.33c-.85-2.16-1.71-4.32-2.56-6.49l-.64-1.62-.56-1.66-1.13-3.32L84.38,312l-1-3.39-1-3.38c-.16-.57-.33-1.13-.47-1.7l-.4-1.72c-.53-2.3-1-4.6-1.58-6.9s-.83-4.65-1.25-7a176.53,176.53,0,0,1,0-57c.41-2.34.83-4.66,1.25-7s1-4.6,1.58-6.89l.39-1.72.48-1.7,1-3.39,1-3.38,1.12-3.32,1.13-3.32.56-1.66.64-1.62c.85-2.17,1.71-4.33,2.56-6.49s1.91-4.22,2.86-6.32c.46-1.07,1-2.1,1.51-3.12l1.58-3.07,1.58-3.07,1.71-3c1.17-2,2.23-4,3.51-5.9l3.69-5.74,4-5.55a190.7,190.7,0,0,1,17.49-20.4,196,196,0,0,1,20-17.21A177.54,177.54,0,0,1,193.12,93c3.94-1.31,7.83-2.73,11.8-3.77,3.93-1.2,7.93-2,11.87-3A177.64,177.64,0,0,1,240.52,83c3.92-.38,7.84-.36,11.72-.48,1,0,1.94,0,2.9,0l2.9.07c1.92.08,3.84,0,5.75.21,3.8.32,7.6.48,11.32,1l5.57.72,5.48,1a176.24,176.24,0,0,1,74.49,33.13A178.79,178.79,0,0,1,405.54,169a170.63,170.63,0,0,1,12.28,25c.39,1,.77,2,1.16,2.95s.77,1.93,1.07,2.91q1,2.91,1.92,5.68c.16.46.31.92.46,1.38l.39,1.38c.26.92.52,1.82.77,2.71.48,1.8,1.05,3.52,1.43,5.23a182.62,182.62,0,0,1,3.54,18.34c.32,2.68.68,5.16.9,7.43s.32,4.34.46,6.19.2,3.47.22,4.88.06,2.58.08,3.53C430.25,258.47,430.26,259.44,430.26,259.44Z"
              style="fill: #263238"
            ></path>
            <path
              d="M354.57,303.52c3.7.2,6.48-4.1,5.76-7.74s-3.92-6.34-7.35-7.76-7.17-1.85-10.76-2.77a40.71,40.71,0,0,1-25.36-19.78,68.35,68.35,0,0,1-4.68-11.54c-5.05-21.27-12-51.68-13.75-63.53-4.42-30.59-12.22-64.19-55.94-61.06,0,0-29.07,5.47-40.22,26.32-9.81,18.33-4.15,73.61-5.45,113.43l9.53,5.74,1.48.09a37.74,37.74,0,0,0,5.26,11.42c8.7,12.41,20.55,22.38,33.39,30.44,26,16.29,57,25.18,87.51,22.12,6.44-.65,13-1.86,18.6-5s10.28-8.65,11.13-15.06S360.8,305.26,354.57,303.52Z"
              style="fill: #263238"
            ></path>
            <path
              d="M236.67,140.74l2.74-2.61L269,150a8.25,8.25,0,0,1,7.79,8l-.26,96.3c0,6.53-1.27,12.19-5.21,17.39l-4.15,5.48c-9.47,12.5-28.94,11.47-36.43-2.3a10.15,10.15,0,0,1-1-2.49,17.52,17.52,0,0,1-.44-2.15c-.88-7.75-.93-14.47-.93-14.47-.53-8.5-.7-12-.71-11.91s-18.1-2.09-23-25.32c-2.44-11.56-2-27.46-1.29-43.11C204.24,153.8,219.26,140.72,236.67,140.74Z"
              style="fill: #ffbf9d"
            ></path>
            <path
              d="M242.73,191.31a3,3,0,0,0,3.05,2.88,2.87,2.87,0,0,0,3-2.86,3,3,0,0,0-3.05-2.89A2.88,2.88,0,0,0,242.73,191.31Z"
              style="fill: #263238"
            ></path>
            <path
              d="M212.18,191.31a3,3,0,0,0,3,2.88,2.88,2.88,0,0,0,3-2.86,3,3,0,0,0-3.05-2.89A2.87,2.87,0,0,0,212.18,191.31Z"
              style="fill: #263238"
            ></path>
            <path
              d="M206.39,181.64c.39.38,2.58-1.42,5.81-1.58s5.69,1.35,6,.93c.16-.18-.25-.87-1.32-1.57a8.26,8.26,0,0,0-4.84-1.23,7.91,7.91,0,0,0-4.61,1.75C206.5,180.75,206.2,181.48,206.39,181.64Z"
              style="fill: #263238"
            ></path>
            <path
              d="M239.19,182c.43.33,2.43-1.69,5.63-2.17s5.79.75,6.08.31c.14-.2-.34-.84-1.48-1.43a8.27,8.27,0,0,0-4.94-.73,7.94,7.94,0,0,0-4.4,2.21C239.21,181.08,239,181.83,239.19,182Z"
              style="fill: #263238"
            ></path>
            <path
              d="M227.9,205.51c0-.19-2-.43-5.3-.68-.83-.05-1.62-.17-1.79-.73a4.24,4.24,0,0,1,.43-2.47l2.13-6.41c2.94-9.12,5-16.6,4.66-16.72s-3.05,7.18-6,16.3c-.7,2.25-1.38,4.39-2,6.44a4.8,4.8,0,0,0-.26,3.27,2.05,2.05,0,0,0,1.42,1.13,5.64,5.64,0,0,0,1.41.13C225.86,205.78,227.9,205.69,227.9,205.51Z"
              style="fill: #263238"
            ></path>
            <path
              d="M227.58,243.88a59.73,59.73,0,0,0,31-9.95s-7.08,16.62-30.63,15.6Z"
              style="fill: #ff9a6c"
            ></path>
            <path
              d="M229.66,213.23a5.82,5.82,0,0,1,5.11-2.42,5.31,5.31,0,0,1,3.77,1.78,3.37,3.37,0,0,1,.45,3.84,3.91,3.91,0,0,1-4.18,1.29,12.17,12.17,0,0,1-4.26-2.26,3.66,3.66,0,0,1-1-.91,1.09,1.09,0,0,1-.06-1.21"
              style="fill: #ff9a6c"
            ></path>
            <path
              d="M237.53,207.27c-.53,0-.36,3.5-3.24,6.14s-6.63,2.45-6.64,2.94c0,.22.87.64,2.45.6a8.7,8.7,0,0,0,5.55-2.25,7.6,7.6,0,0,0,2.49-5.14C238.2,208.09,237.76,207.24,237.53,207.27Z"
              style="fill: #263238"
            ></path>
            <path
              d="M236.1,169.38c.45.82,3.58-.09,7.4-.21s7,.44,7.4-.42c.16-.41-.49-1.14-1.85-1.8a12.87,12.87,0,0,0-11.27.48C236.49,168.19,235.9,169,236.1,169.38Z"
              style="fill: #263238"
            ></path>
            <path
              d="M206.85,167.75c.61.71,2.8-.16,5.47-.34s5,.25,5.46-.54c.21-.39-.19-1.11-1.21-1.75a7.94,7.94,0,0,0-8.8.71C206.86,166.64,206.58,167.41,206.85,167.75Z"
              style="fill: #263238"
            ></path>
            <path
              d="M276.16,199.13s-16.55,5.15-25.92-35.71c-3.21-14-16.16-25.29-16.16-25.29l5.25-1.58s32.65,9.2,33.2,9.61,8.24,16.89,8.24,16.89Z"
              style="fill: #263238"
            ></path>
            <path
              d="M272.08,197.61c-.08-1.75,1.73-6,3.44-6.32,4.56-.95,12.87-1,13.54,10.69.9,16-15.31,13.58-15.37,13.12S272.37,203.63,272.08,197.61Z"
              style="fill: #ffbf9d"
            ></path>
            <path
              d="M278.23,208.78c.06-.06.29.18.77.37a2.8,2.8,0,0,0,2.08-.08c1.65-.71,2.92-3.47,2.83-6.35a9.14,9.14,0,0,0-1-3.94,3.22,3.22,0,0,0-2.21-2,1.42,1.42,0,0,0-1.6.86c-.19.46-.07.77-.15.8s-.36-.25-.27-.91a1.76,1.76,0,0,1,.57-1,2.13,2.13,0,0,1,1.52-.49,3.9,3.9,0,0,1,3,2.31,9.41,9.41,0,0,1,1.22,4.39c.08,3.22-1.4,6.33-3.67,7.13a3,3,0,0,1-2.57-.28C278.28,209.16,278.17,208.81,278.23,208.78Z"
              style="fill: #ff9a6c"
            ></path>
            <path
              d="M289.65,257.94a40.78,40.78,0,0,1-.35-5.58,86.88,86.88,0,0,1,1.55-15.16c.57-3.17,1.19-6.64,1.86-10.36a97.24,97.24,0,0,0,1.43-12,48.72,48.72,0,0,0-1-13.22,34.11,34.11,0,0,0-2.25-6.63,31.75,31.75,0,0,0-3.78-6.13,74.07,74.07,0,0,0-10-10.13c-3.5-3-6.85-6-9.83-9.05a124.21,124.21,0,0,1-14.36-17.47,120.8,120.8,0,0,1-7.78-13.11c-.82-1.6-1.42-2.86-1.81-3.73-.19-.42-.34-.74-.44-1a1.89,1.89,0,0,1-.14-.34,2,2,0,0,1,.18.32q.18.34.48,1c.41.85,1,2.1,1.88,3.69a128.25,128.25,0,0,0,7.89,13,125.66,125.66,0,0,0,14.39,17.35c3,3,6.32,6,9.82,9a73.81,73.81,0,0,1,10.12,10.18,31.86,31.86,0,0,1,3.83,6.22,34.11,34.11,0,0,1,2.27,6.72,49.15,49.15,0,0,1,.95,13.33,98.87,98.87,0,0,1-1.48,12c-.69,3.72-1.33,7.19-1.91,10.35a90.26,90.26,0,0,0-1.69,15.11c0,1.8,0,3.2.11,4.14l.07,1.08A1.63,1.63,0,0,1,289.65,257.94Z"
              style="fill: #455a64"
            ></path>
            <path
              d="M294.79,259.45a39,39,0,0,1-.35-5.58A86.89,86.89,0,0,1,296,238.7c.57-3.17,1.19-6.64,1.86-10.36a99,99,0,0,0,1.43-12,48.72,48.72,0,0,0-1-13.22,34.11,34.11,0,0,0-2.25-6.63,31.75,31.75,0,0,0-3.78-6.13,74.65,74.65,0,0,0-10.05-10.13c-3.5-3-6.85-6-9.83-9.05a123.65,123.65,0,0,1-14.36-17.47,120.8,120.8,0,0,1-7.78-13.11c-.82-1.6-1.42-2.86-1.81-3.73l-.45-1a2.25,2.25,0,0,1-.13-.34l.18.32c.11.24.27.55.48,1,.41.86,1,2.1,1.88,3.69a128.25,128.25,0,0,0,7.89,13,125.65,125.65,0,0,0,14.38,17.35c3,3,6.32,6,9.83,9a73.81,73.81,0,0,1,10.12,10.18,32.35,32.35,0,0,1,3.83,6.22,34.11,34.11,0,0,1,2.27,6.72,49.58,49.58,0,0,1,.95,13.33,98.87,98.87,0,0,1-1.48,12c-.69,3.72-1.33,7.19-1.91,10.35a90.26,90.26,0,0,0-1.69,15.12c0,1.79,0,3.19.1,4.13,0,.46.06.82.07,1.08A1.49,1.49,0,0,1,294.79,259.45Z"
              style="fill: #455a64"
            ></path>
            <path
              d="M180.51,282.46c-6.89,4.4-14.59,11.53-18.24,18.85-6.6,13.26-52.89,48.88-54.7,57.51-4.16,36.85,36.6,36.37,53.1,16.66,8.54-10.2,27.36-48.42,27.36-48.42l-7.52-44.6Z"
              style="fill: #455a64"
            ></path>
            <path
              d="M128.07,339.44s30.6-49.26,36.6-56.15c9.19-10.54,25.16-14.76,25.16-14.76l3.44,64.59c.21-.89-31.62,39.79-31.62,39.79S131.92,350.82,128.07,339.44Z"
              style="fill: #455a64"
            ></path>
            <path
              d="M147.08,289.6l-33.27,63.53a13.84,13.84,0,0,0,4.58,18.06l.14.09c12.76,8.07,29.67.19,32.48-14.64l11.71-59.37Z"
              style="fill: #ffbf9d"
            ></path>
            <polygon
              points="179.45 234.32 158.1 285.3 162.96 287.34 183.66 235.79 179.45 234.32"
              style="fill: #455a64"
            ></polygon>
            <ellipse
              cx="190.04"
              cy="211.83"
              rx="25.81"
              ry="23.89"
              transform="translate(-36.49 384.1) rotate(-85.35)"
              style="fill: #ffbf9d"
            ></ellipse>
            <path
              d="M213.94,211.87a6.1,6.1,0,0,1-.24-1.63c0-.27,0-.57-.07-.89s-.11-.68-.18-1.07a20.42,20.42,0,0,0-.52-2.62,26,26,0,0,0-2.64-6.68,24.44,24.44,0,0,0-5.92-7.07,22.16,22.16,0,0,0-9.74-4.6,21.56,21.56,0,0,0-2.92-.34c-.5,0-1-.07-1.51-.06l-1.53.1c-.25,0-.51,0-.77.05l-.77.13c-.51.1-1,.17-1.55.28a23.45,23.45,0,0,0-3.08,1,23,23,0,0,0-3,1.43c-.49.29-1,.62-1.44.93a10.8,10.8,0,0,0-1.4,1,25.78,25.78,0,0,0-2.64,2.4,27,27,0,0,0-2.28,2.88,25.15,25.15,0,0,0-3.37,6.83,29.09,29.09,0,0,0-1.28,7.83,28.69,28.69,0,0,0,1.08,7.83,24.64,24.64,0,0,0,3.19,6.84,21.77,21.77,0,0,0,4.78,5.3,13.36,13.36,0,0,0,1.37,1c.48.31.94.65,1.42.93a24.76,24.76,0,0,0,3,1.45,23.67,23.67,0,0,0,3.06,1c.51.12,1,.19,1.55.28l.76.14c.26,0,.52,0,.77.06l1.53.1c.51,0,1,0,1.51-.06a20.21,20.21,0,0,0,2.93-.33,22.66,22.66,0,0,0,9.85-4.57,25.25,25.25,0,0,0,6.11-7.05,26.46,26.46,0,0,0,2.81-6.68,19.55,19.55,0,0,0,.59-2.61c.07-.39.15-.74.2-1.07l.1-.89a5.88,5.88,0,0,1,.28-1.63,5.09,5.09,0,0,1,.09,1.66c0,.27,0,.58,0,.91s-.07.7-.11,1.1a20.44,20.44,0,0,1-.45,2.72,25.49,25.49,0,0,1-2.62,7.06,25.75,25.75,0,0,1-6.21,7.6A23.7,23.7,0,0,1,194.26,238a21.3,21.3,0,0,1-3.12.42c-.53,0-1.07.08-1.61.08l-1.64-.08c-.27,0-.55,0-.82-.06l-.82-.13c-.55-.09-1.11-.16-1.67-.28a25.48,25.48,0,0,1-6.51-2.55c-.52-.3-1-.65-1.53-1a12.26,12.26,0,0,1-1.49-1.11,23,23,0,0,1-5.19-5.67,26.33,26.33,0,0,1-3.46-7.38,28.36,28.36,0,0,1,.22-16.91,26.93,26.93,0,0,1,3.65-7.36,30.21,30.21,0,0,1,2.48-3.09,29.89,29.89,0,0,1,2.86-2.57,14.53,14.53,0,0,1,1.51-1.1c.52-.33,1-.68,1.56-1a25.18,25.18,0,0,1,3.26-1.51,23.91,23.91,0,0,1,3.32-1c.55-.12,1.11-.18,1.67-.28l.82-.12a7.7,7.7,0,0,1,.83-.05l1.63-.08c.55,0,1.08.06,1.61.08a21,21,0,0,1,3.11.43,23.13,23.13,0,0,1,10.24,5.1,25.84,25.84,0,0,1,8.46,14.69,19.24,19.24,0,0,1,.37,2.72c0,.4.08.76.09,1.1s0,.64,0,.91A5.26,5.26,0,0,1,213.94,211.87Z"
              style="fill: #263238"
            ></path>
            <path
              d="M197.4,215.89a5.18,5.18,0,0,1-4.67,5.38,4.71,4.71,0,0,1-5-4.65,5.19,5.19,0,0,1,4.67-5.38A4.71,4.71,0,0,1,197.4,215.89Z"
              style="fill: #263238"
            ></path>
            <path
              d="M199.08,202.55c-.6.69-4.29-2.19-9.53-2.08s-9.06,3-9.63,2.31c-.28-.3.34-1.55,2-2.89a12.83,12.83,0,0,1,7.71-2.7,12.07,12.07,0,0,1,7.58,2.51C198.83,201,199.38,202.23,199.08,202.55Z"
              style="fill: #263238"
            ></path>
            <path
              d="M177.05,228.39c-.12.2-1.76-.62-3.74-2.87a21.19,21.19,0,0,1-4.83-10.79,22.31,22.31,0,0,1,1.6-11.95c1.26-2.83,2.58-4.18,2.76-4s-.68,1.77-1.55,4.54a25.6,25.6,0,0,0-1,11.11,24.35,24.35,0,0,0,4,10.21C175.92,226.94,177.23,228.14,177.05,228.39Z"
              style="fill: #fff"
            ></path>
            <path
              d="M183.46,232.39a.77.77,0,0,1-.65.6,2,2,0,0,1-1.41-.25,2.21,2.21,0,0,1-1-1.08.84.84,0,0,1,.07-.91c.4-.36,1.12-.14,1.79.21S183.5,231.84,183.46,232.39Z"
              style="fill: #fff"
            ></path>
            <path
              d="M150.79,281.66s9.6-25.44,11-26.76,15.57-13.22,15.57-13.22a7.51,7.51,0,0,1,4.36.6c1.39.81,4.77,6.15,6.12,8.34a2.63,2.63,0,0,1,.31,2l-1.54,5s1.85,2.91,1.41,5a14.2,14.2,0,0,1-1.52,3.92,8.22,8.22,0,0,1,.64,5.91,7.92,7.92,0,0,1-3.9,4.25S182.14,282,182,283s-5.36,3.38-5.9,3.23-4.34-1.77-4.34-1.77S170,293,167.8,294.93a11.25,11.25,0,0,1-5.08,2.34L160,310.88,143.13,298Z"
              style="fill: #ffbf9d"
            ></path>
            <path
              d="M174.05,274a34.18,34.18,0,0,1,4.59,1.45,45.88,45.88,0,0,1,4.52,1.66,22.12,22.12,0,0,1-4.64-1.28A26.94,26.94,0,0,1,174.05,274Z"
              style="fill: #ff9a6c"
            ></path>
            <path
              d="M174.18,263.38a8.58,8.58,0,0,1,1.89.26c1.16.23,2.75.59,4.48,1.06s3.29,1,4.4,1.39a8.61,8.61,0,0,1,1.76.75,11.14,11.14,0,0,1-1.84-.48c-1.13-.33-2.69-.79-4.42-1.27s-3.3-.88-4.43-1.17A9.43,9.43,0,0,1,174.18,263.38Z"
              style="fill: #ff9a6c"
            ></path>
            <path
              d="M172.35,255.11a8.86,8.86,0,0,1,2.1-.05,34.41,34.41,0,0,1,5,.56,36,36,0,0,1,4.9,1.26,8.86,8.86,0,0,1,1.95.8,13.53,13.53,0,0,1-2-.53c-1.24-.34-3-.78-4.9-1.14s-3.69-.55-5-.67A14.25,14.25,0,0,1,172.35,255.11Z"
              style="fill: #ff9a6c"
            ></path>
            <path
              d="M182.91,256.42a7.39,7.39,0,0,1-.41-3.73,3.8,3.8,0,0,1-3.09-1.11c-.89,1.12-2.08,2.67-3,3.79Z"
              style="fill: #455a64"
            ></path>
            <path
              d="M183.16,277.76l4.94,58.55s9.08,58.71,8.41,62.86-8.81,24.39-8.81,24.39c35.14,14.21,87.84,19.76,134.76-1.31L310.61,395l13.2-121.91-47.75-16.31s-2.88,17.4-25.76,15.47-22.47-14.56-22.47-14.56l-40.59,11.61Z"
              style="fill: #455a64"
            ></path>
            <path
              d="M364.67,396.88S335.48,274,322.58,273l-9.68,93.2,18.26,52C343.62,411.73,355.06,404.73,364.67,396.88Z"
              style="fill: #455a64"
            ></path>
            <path
              d="M320.59,296.46c.15,0-1.13,14.83-2.86,33.09s-3.23,33.06-3.38,33.05,1.14-14.83,2.86-33.1S320.45,296.44,320.59,296.46Z"
              style="fill: #263238"
            ></path>
            <path
              d="M183.79,295.4a2.63,2.63,0,0,1,.11.65c.06.48.14,1.1.23,1.88.18,1.69.44,4,.75,6.9.62,5.84,1.45,13.9,2.47,22.78s2.08,16.93,2.92,22.73c.43,2.86.77,5.19,1,6.87l.27,1.87a2.73,2.73,0,0,1,.06.66,3.29,3.29,0,0,1-.16-.64c-.1-.48-.22-1.09-.37-1.85-.31-1.61-.71-3.95-1.18-6.85-.94-5.8-2-13.83-3.07-22.73s-1.8-17-2.33-22.8c-.24-2.88-.44-5.23-.58-6.93-.05-.77-.1-1.4-.13-1.88A2.55,2.55,0,0,1,183.79,295.4Z"
              style="fill: #263238"
            ></path>
            <polygon
              points="222.56 260.64 227.23 253.18 251.81 273.04 275.84 249.59 283.5 259.28 254.41 290.45 222.56 260.64"
              style="fill: #455a64"
            ></polygon>
            <path
              d="M251,274.77a8.24,8.24,0,0,1-.21,1.2c-.17.77-.43,1.9-.82,3.3a72.16,72.16,0,0,1-4.18,11.15l-.17.37-.24-.33c-2-2.7-4.12-5.67-6.43-8.78-4.5-6.07-8.67-11.49-11.71-15.41l-3.6-4.63-1-1.27c-.22-.3-.33-.46-.31-.47a2.59,2.59,0,0,1,.39.4l1,1.21c.89,1.06,2.17,2.61,3.73,4.54,3.11,3.85,7.33,9.25,11.84,15.32,2.31,3.11,4.47,6.09,6.4,8.81l-.41,0a80.49,80.49,0,0,0,4.33-11c.43-1.39.74-2.5,1-3.26A7.57,7.57,0,0,1,251,274.77Z"
              style="fill: #263238"
            ></path>
            <path
              d="M282.32,260.59a2,2,0,0,1-.22.44l-.7,1.21c-.63,1-1.56,2.53-2.79,4.33a116.33,116.33,0,0,1-10.56,13.3c-2.55,2.76-5.09,5.25-7.39,7.36l-.17.15-.16-.16a31.6,31.6,0,0,1-5.67-8c-.52-1.08-.88-2-1.1-2.56a5.63,5.63,0,0,1-.29-.95,4.63,4.63,0,0,1,.43.89c.26.59.66,1.44,1.21,2.49a33.15,33.15,0,0,0,5.76,7.84h-.33c2.28-2.12,4.79-4.62,7.32-7.37a134.79,134.79,0,0,0,10.65-13.15c1.26-1.77,2.24-3.22,2.92-4.23L282,261C282.2,260.71,282.3,260.58,282.32,260.59Z"
              style="fill: #263238"
            ></path>
            <path
              d="M252.11,433.29c-.14,0-.26-34.66-.26-77.4s.12-77.4.26-77.4.26,34.65.26,77.4S252.25,433.29,252.11,433.29Z"
              style="fill: #263238"
            ></path>
            <path
              d="M264.34,385.64c0,.14-10-2-22.24-4.83s-22.16-5.19-22.12-5.33,10,2,22.24,4.82S264.37,385.5,264.34,385.64Z"
              style="fill: #263238"
            ></path>
            <path
              d="M150.17,375.55c-.09-.06,1-1.27,2.16-3.51a23.81,23.81,0,0,0,1.71-4.11,24.59,24.59,0,0,0,.88-10.78,23.44,23.44,0,0,0-1-4.33c-.81-2.41-1.65-3.77-1.56-3.82a4,4,0,0,1,.62.93,8.68,8.68,0,0,1,.61,1.16,15,15,0,0,1,.68,1.61,22.13,22.13,0,0,1,1.15,4.38,25.76,25.76,0,0,1,.2,5.55,26.41,26.41,0,0,1-1.1,5.45,22.17,22.17,0,0,1-1.85,4.14,17.36,17.36,0,0,1-.93,1.47,9.91,9.91,0,0,1-.79,1C150.46,375.28,150.2,375.58,150.17,375.55Z"
              style="fill: #263238"
            ></path>
          </g>
          <g id="freepik--Markets--inject-33">
            <path
              d="M380.27,232a46.81,46.81,0,1,0,44.31-44.32A46.81,46.81,0,0,0,380.27,232Z"
              style="fill: #fff"
            ></path>
            <path
              d="M380,234.32s0-.26,0-.76,0-1.28.07-2.23l.06-1.64c.06-.61.17-1.26.27-2a33.33,33.33,0,0,1,.91-4.87,44.42,44.42,0,0,1,5.12-12.55A47.12,47.12,0,0,1,418.07,188a43.13,43.13,0,0,1,6-.7c1,0,2-.14,3.07-.13l3.12.15c.53,0,1.06,0,1.58.1l1.57.24c1.05.17,2.12.29,3.18.51a49.92,49.92,0,0,1,6.29,1.83A48.31,48.31,0,0,1,449,192.7c1,.54,2,1.17,2.94,1.75a24,24,0,0,1,2.85,2,53.21,53.21,0,0,1,5.36,4.54,54.15,54.15,0,0,1,4.63,5.47,45.55,45.55,0,0,1,6.76,13,46.68,46.68,0,0,1,0,29.79,45.58,45.58,0,0,1-6.75,13,53,53,0,0,1-4.64,5.46,52.12,52.12,0,0,1-5.35,4.55,23.66,23.66,0,0,1-2.86,1.95c-1,.59-1.94,1.22-2.94,1.75a51.11,51.11,0,0,1-12.45,4.53c-1.06.22-2.13.34-3.18.51l-1.57.24c-.52.07-1.05.06-1.58.1l-3.12.15c-1,0-2.05-.09-3.07-.13a43.13,43.13,0,0,1-6-.71,47.12,47.12,0,0,1-31.69-22.28,44.7,44.7,0,0,1-5.11-12.56,33,33,0,0,1-.91-4.86c-.1-.71-.21-1.37-.27-2l-.06-1.64c0-1,0-1.7-.07-2.23s0-.76,0-.76,0,.26.08.76.09,1.27.15,2.22c0,.49.07,1,.1,1.63s.2,1.25.3,1.95a34.77,34.77,0,0,0,1,4.83,44.73,44.73,0,0,0,5.2,12.4A46.8,46.8,0,0,0,418.19,280a43.34,43.34,0,0,0,5.88.67c1,0,2,.14,3,.12l3.07-.16c.52,0,1,0,1.55-.1l1.55-.24c1-.17,2.09-.29,3.13-.51a48.45,48.45,0,0,0,6.19-1.82,49.1,49.1,0,0,0,6.06-2.66c1-.54,1.92-1.16,2.89-1.73a23.21,23.21,0,0,0,2.8-1.93,42.34,42.34,0,0,0,9.82-9.87A44.67,44.67,0,0,0,470.79,249a45.88,45.88,0,0,0,0-29.29,45.05,45.05,0,0,0-6.63-12.79,53.64,53.64,0,0,0-4.55-5.38,52.91,52.91,0,0,0-5.27-4.48,24,24,0,0,0-2.8-1.93c-1-.58-1.91-1.2-2.89-1.73a46.26,46.26,0,0,0-6.06-2.66,48.45,48.45,0,0,0-6.19-1.82c-1-.22-2.09-.34-3.12-.51l-1.55-.24c-.52-.07-1-.07-1.56-.1l-3.07-.16c-1,0-2,.08-3,.11a43.71,43.71,0,0,0-5.88.68,46.71,46.71,0,0,0-31.42,21.87,44.73,44.73,0,0,0-5.2,12.4,35,35,0,0,0-1,4.82c-.1.71-.23,1.36-.3,2s-.07,1.14-.1,1.63q-.09,1.42-.15,2.22C380,234.06,380,234.32,380,234.32Z"
              style="fill: #263238"
            ></path>
            <rect
              x="407.77"
              y="219.69"
              width="42.15"
              height="35.94"
              style="fill: #e0e0e0"
            ></rect>
            <path
              d="M449.92,255.63s0-.24,0-.68,0-1.11,0-1.93c0-1.71,0-4.18-.06-7.31,0-6.29-.06-15.24-.11-26l.22.22-42.14,0a3.45,3.45,0,0,1,.25-.26h0v9.61q0,4.73,0,9.26c0,6,0,11.75,0,17.06l-.23-.23,30.42.12,8.63.06,2.29,0h.81l-.18,0h-.57l-2.25,0-8.58.06-30.57.11h-.23v-.23c0-5.31,0-11,0-17.06q0-4.53,0-9.26V219.7h0c-.23.23.32-.32.27-.26l42.14,0h.22v.22c-.05,10.84-.09,19.84-.11,26.16,0,3.11,0,5.56-.06,7.26q0,1.21,0,1.89C449.94,255.43,449.92,255.63,449.92,255.63Z"
              style="fill: #263238"
            ></path>
            <path
              d="M412.13,232h-1.87a5.08,5.08,0,0,1-5.08-5.08v-8.34h12v8.34A5.08,5.08,0,0,1,412.13,232Z"
              style="fill: var(--on-primary)"
            ></path>
            <path
              d="M412.13,232c0-.05.44,0,1.19-.23A5.13,5.13,0,0,0,416,230a5,5,0,0,0,.92-2.08,18.63,18.63,0,0,0,.07-2.74c0-2,0-4.19,0-6.55l.25.25h-12l.25-.25c0,2.6,0,5,0,7.24,0,.54,0,1.09,0,1.57a5.22,5.22,0,0,0,.34,1.4,4.9,4.9,0,0,0,1.53,2,5.32,5.32,0,0,0,3.48,1.09,8.25,8.25,0,0,1,1.37.09,8.25,8.25,0,0,1-1.37.09,5.38,5.38,0,0,1-3.68-1,5.24,5.24,0,0,1-1.69-2.14,5.32,5.32,0,0,1-.39-1.51c-.05-.54,0-1.06,0-1.61,0-2.21,0-4.64,0-7.24v-.25h12.54v.25c0,2.36,0,4.56,0,6.55a18.42,18.42,0,0,1-.12,2.81,5.25,5.25,0,0,1-1.05,2.2,5,5,0,0,1-2.89,1.79,4.72,4.72,0,0,1-.91.1Z"
              style="fill: #263238"
            ></path>
            <path
              d="M424.07,232h-1.88a5.09,5.09,0,0,1-5.08-5.08v-8.34h12v8.34A5.09,5.09,0,0,1,424.07,232Z"
              style="fill: var(--on-primary)"
            ></path>
            <path
              d="M424.07,232c0-.05.43,0,1.18-.23a5.09,5.09,0,0,0,2.69-1.82,5.15,5.15,0,0,0,.93-2.08,20.13,20.13,0,0,0,.07-2.74c0-2,0-4.19,0-6.55l.25.25h-12l.26-.25c0,2.6,0,5,0,7.24,0,.54,0,1.09,0,1.57a5.21,5.21,0,0,0,.33,1.4,5.08,5.08,0,0,0,1.53,2,5.35,5.35,0,0,0,3.48,1.09,8.47,8.47,0,0,1,1.38.09,8.47,8.47,0,0,1-1.38.09,5.4,5.4,0,0,1-3.68-1,5.24,5.24,0,0,1-1.69-2.14,6.09,6.09,0,0,1-.39-1.51c0-.54,0-1.06,0-1.61,0-2.21,0-4.64,0-7.24v-.25H429.4v.25c0,2.36,0,4.56,0,6.55a17.2,17.2,0,0,1-.13,2.81,5.24,5.24,0,0,1-1,2.2,5,5,0,0,1-2.9,1.79,4.57,4.57,0,0,1-.91.1A1.2,1.2,0,0,1,424.07,232Z"
              style="fill: #263238"
            ></path>
            <path
              d="M436,232h-1.87a5.08,5.08,0,0,1-5.08-5.08v-8.34h12v8.34A5.08,5.08,0,0,1,436,232Z"
              style="fill: var(--on-primary)"
            ></path>
            <path
              d="M436,232c0-.05.43,0,1.19-.23a5.13,5.13,0,0,0,2.69-1.82,5,5,0,0,0,.92-2.08,18.63,18.63,0,0,0,.07-2.74c0-2,0-4.19,0-6.55l.25.25h-12l.25-.25c0,2.6,0,5,0,7.24,0,.54,0,1.09,0,1.57a5.21,5.21,0,0,0,.33,1.4,5,5,0,0,0,1.54,2,5.31,5.31,0,0,0,3.47,1.09A8.32,8.32,0,0,1,436,232a8.32,8.32,0,0,1-1.38.09,5.28,5.28,0,0,1-5.37-3.15,5.67,5.67,0,0,1-.38-1.51c-.05-.54,0-1.06,0-1.61,0-2.21,0-4.64,0-7.24v-.25h12.54v.25c0,2.36,0,4.56,0,6.55a18.42,18.42,0,0,1-.12,2.81,5.25,5.25,0,0,1-1.05,2.2,5,5,0,0,1-2.89,1.79,4.72,4.72,0,0,1-.91.1Z"
              style="fill: #263238"
            ></path>
            <path
              d="M447.94,232h-1.88a5.09,5.09,0,0,1-5.08-5.08v-8.34h12v8.34A5.09,5.09,0,0,1,447.94,232Z"
              style="fill: var(--on-primary)"
            ></path>
            <path
              d="M447.94,232c0-.05.43,0,1.18-.23a5,5,0,0,0,3.62-3.9,18.71,18.71,0,0,0,.06-2.74c0-2,0-4.19,0-6.55l.25.25H441l.26-.25c0,2.6,0,5,0,7.24,0,.54,0,1.09,0,1.57a5.63,5.63,0,0,0,.34,1.4,5.08,5.08,0,0,0,1.53,2,5.34,5.34,0,0,0,3.48,1.09,8.47,8.47,0,0,1,1.38.09,8.47,8.47,0,0,1-1.38.09,5.4,5.4,0,0,1-3.68-1,5.24,5.24,0,0,1-1.69-2.14,5.68,5.68,0,0,1-.39-1.51c0-.54,0-1.06,0-1.61,0-2.21,0-4.64,0-7.24v-.25h12.54v.25c0,2.36,0,4.56,0,6.55a18.39,18.39,0,0,1-.13,2.81,5.13,5.13,0,0,1-1.05,2.2,5,5,0,0,1-2.89,1.79,4.57,4.57,0,0,1-.91.1A1.2,1.2,0,0,1,447.94,232Z"
              style="fill: #263238"
            ></path>
            <rect
              x="433.07"
              y="236.56"
              width="11.76"
              height="19.08"
              style="fill: #fff"
            ></rect>
            <path
              d="M444.83,236.56a11,11,0,0,1,.06,1.35c0,1,0,2.28.07,3.91,0,3.45.07,8.23.12,13.81v.24h-.25l-11.75,0c.05.06-.5-.49-.27-.26h0v-1.33c0-.44,0-.89,0-1.33v-2.62c0-1.73,0-3.4,0-5,0-3.21,0-6.16,0-8.76v-.21h.21l8.64.11,2.33,0a4.19,4.19,0,0,1,.78.05,7.68,7.68,0,0,1-.86,0l-2.38.05-8.51.11.2-.2c0,2.6,0,5.55,0,8.76,0,1.61,0,3.28,0,5V253c0,.44,0,.89,0,1.33v1.33h0l-.26-.26,11.75,0-.24.24c.05-5.52.09-10.24.12-13.66,0-1.64.05-3,.07-4,0-.42,0-.77,0-1.07S444.83,236.57,444.83,236.56Z"
              style="fill: #263238"
            ></path>
            <rect
              x="414.36"
              y="235.71"
              width="10.53"
              height="12.97"
              style="fill: #fff"
            ></rect>
            <path
              d="M424.89,248.68a7,7,0,0,1-.06-1c0-.69,0-1.59-.06-2.68,0-2.28-.1-5.49-.12-9.3l.23.23-10.52,0,.26-.26h0v1.77c0,.59,0,1.17,0,1.75v3.36c0,2.18,0,4.22,0,6.08l-.21-.22,7.57.12,2.16,0a5.72,5.72,0,0,1,.8.05,3.62,3.62,0,0,1-.71,0l-2.11.06c-1.83,0-4.49.08-7.71.11h-.22v-.22c0-1.86,0-3.9,0-6.08,0-1.09,0-2.21,0-3.36v-3.52h0c-.24.23.31-.32.26-.26l10.52,0h.24v.23c0,3.91-.08,7.18-.12,9.45,0,1.07,0,2-.06,2.63A7.79,7.79,0,0,1,424.89,248.68Z"
              style="fill: #263238"
            ></path>
            <rect
              x="441.44"
              y="243.49"
              width="1.75"
              height="5.2"
              style="fill: #e0e0e0"
            ></rect>
          </g>
          <g id="freepik--Customers--inject-33">
            <circle
              cx="141.72"
              cy="121.48"
              r="46.81"
              transform="translate(-14.04 18.61) rotate(-7.16)"
              style="fill: #fff"
            ></circle>
            <path
              d="M94.91,121.48s0-.25,0-.76,0-1.26.08-2.22c0-.5,0-1,.07-1.65s.18-1.25.27-2,.22-1.48.34-2.29a26,26,0,0,1,.59-2.57A44.68,44.68,0,0,1,101.4,97.5a46.68,46.68,0,0,1,11.88-13.37l2-1.52c.71-.47,1.46-.91,2.2-1.37s1.48-1,2.29-1.33l2.44-1.18,1.24-.59,1.3-.48,2.65-1c.89-.3,1.83-.5,2.76-.75a22.65,22.65,0,0,1,2.85-.65,42.84,42.84,0,0,1,5.94-.7c1,0,2-.14,3.07-.13l3.11.16c.52,0,1.05,0,1.57.09l1.57.24c1,.17,2.11.29,3.17.51a49.16,49.16,0,0,1,6.27,1.83l1.57.57.78.29.75.37,3,1.46c1,.54,1.94,1.16,2.93,1.75.48.3,1,.57,1.45.91l1.39,1A52.89,52.89,0,0,1,175,88.21l2.4,2.63.6.67.54.71,1.08,1.44,1.08,1.45,1,1.55.95,1.55.47.79c.15.27.27.55.41.82.53,1.1,1.06,2.21,1.6,3.32s.85,2.32,1.28,3.48a50.59,50.59,0,0,1,2.43,14.86,50.2,50.2,0,0,1-2.43,14.85c-.43,1.17-.85,2.33-1.28,3.49s-1.07,2.22-1.6,3.32l-.4.82-.48.78-.94,1.56-.95,1.55-1.09,1.45-1.08,1.44-.54.72-.6.66L175,154.75a53,53,0,0,1-5.35,4.53l-1.38,1c-.46.35-1,.61-1.46.92-1,.58-1.94,1.21-2.93,1.75l-3,1.46-.75.36c-.26.11-.52.2-.78.29l-1.57.57a49.64,49.64,0,0,1-6.27,1.83c-1.06.22-2.12.34-3.17.51l-1.57.24c-.52.07-1,.06-1.57.1l-3.11.15c-1,0-2.06-.08-3.07-.12a44.23,44.23,0,0,1-5.94-.7,24.57,24.57,0,0,1-2.85-.66c-.93-.25-1.87-.44-2.77-.75l-2.64-1-1.3-.48-1.24-.59-2.44-1.18c-.81-.37-1.53-.9-2.29-1.33s-1.49-.89-2.2-1.36l-2-1.52a46.56,46.56,0,0,1-11.88-13.38,44.63,44.63,0,0,1-5.13-12.52c-.2-.91-.5-1.75-.59-2.57s-.23-1.58-.34-2.29-.21-1.37-.27-2,0-1.15-.07-1.64c0-1-.06-1.71-.08-2.23s0-.76,0-.76,0,.26.06.76.08,1.26.14,2.22c0,.49.06,1,.09,1.64s.19,1.25.3,2,.23,1.47.36,2.28a24.07,24.07,0,0,0,.61,2.56,44.52,44.52,0,0,0,5.18,12.42,46.46,46.46,0,0,0,11.85,13.23l2,1.51c.71.46,1.45.89,2.19,1.34s1.47,1,2.27,1.32l2.42,1.16,1.23.58,1.3.47,2.62,1c.89.29,1.82.48,2.74.73a24.49,24.49,0,0,0,2.82.64,42.26,42.26,0,0,0,5.9.68c1,0,2,.14,3,.12l3.09-.16c.51,0,1,0,1.55-.1l1.56-.24c1-.17,2.09-.29,3.13-.5a48.32,48.32,0,0,0,6.21-1.83l1.55-.56.77-.29.75-.36,3-1.46c1-.53,1.92-1.15,2.9-1.73.47-.3,1-.56,1.44-.91l1.37-1a53.13,53.13,0,0,0,5.28-4.49q1.17-1.31,2.37-2.61l.59-.66.54-.71,1.06-1.42,1.07-1.44.94-1.53.94-1.54.47-.77.39-.82,1.59-3.28,1.26-3.45a49.82,49.82,0,0,0,2.4-14.69,50,50,0,0,0-2.4-14.69l-1.27-3.45c-.53-1.1-1-2.19-1.58-3.28-.13-.27-.26-.55-.4-.82l-.47-.77-.93-1.54-.94-1.53L179.21,94l-1.07-1.42-.53-.71-.6-.66-2.36-2.6a51.93,51.93,0,0,0-5.29-4.49l-1.37-1c-.45-.34-1-.6-1.44-.91-1-.58-1.91-1.2-2.9-1.73l-3-1.45-.75-.36c-.25-.11-.52-.19-.77-.29l-1.55-.57a49.91,49.91,0,0,0-6.21-1.82c-1-.22-2.1-.34-3.13-.51l-1.56-.24c-.51-.07-1-.06-1.55-.1l-3.08-.16c-1,0-2,.09-3,.12a43.49,43.49,0,0,0-5.89.68,24,24,0,0,0-2.82.64c-.92.25-1.86.44-2.75.74l-2.62,1-1.29.47-1.23.59L120,80.26c-.81.36-1.52.89-2.28,1.31s-1.48.88-2.19,1.35l-2,1.5a46.5,46.5,0,0,0-11.86,13.23,44.45,44.45,0,0,0-5.18,12.43,23.36,23.36,0,0,0-.61,2.55q-.19,1.22-.36,2.28c-.11.71-.23,1.36-.3,2s-.06,1.14-.09,1.63L95,120.72C94.94,121.23,94.91,121.48,94.91,121.48Z"
              style="fill: #263238"
            ></path>
            <path
              d="M145,123.53a8.68,8.68,0,0,0,5.17-8,8.16,8.16,0,1,0-16.29-.07,8.7,8.7,0,0,0,5.19,8.11c-12.53,1.89-12,15.51-12,15.51l29.64.14S157.39,125.4,145,123.53Z"
              style="fill: var(--on-primary)"
            ></path>
            <path
              d="M163.35,114.28a5.42,5.42,0,0,0,3.24-5,5.11,5.11,0,1,0-10.2,0,5.41,5.41,0,0,0,3.25,5.07c-7.85,1.19-7.5,9.72-7.5,9.72l18.57.08S171.13,115.46,163.35,114.28Z"
              style="fill: var(--on-primary)"
            ></path>
            <path
              d="M123.93,114.28a5.42,5.42,0,0,0,3.24-5,5.11,5.11,0,1,0-10.2,0,5.41,5.41,0,0,0,3.25,5.07c-7.85,1.19-7.49,9.72-7.49,9.72l18.56.08S131.71,115.46,123.93,114.28Z"
              style="fill: var(--on-primary)"
            ></path>
          </g>
          <g id="freepik--Products--inject-33">
            <circle
              cx="325.95"
              cy="90.73"
              r="46.81"
              transform="translate(161.33 386.33) rotate(-76.44)"
              style="fill: #fff"
            ></circle>
            <path
              d="M279.14,90.73s0-.25,0-.76.05-1.27.08-2.23c0-.49,0-1,.06-1.64s.17-1.26.27-2a33,33,0,0,1,.91-4.86,44.4,44.4,0,0,1,5.11-12.56,47.12,47.12,0,0,1,31.69-22.28,43.13,43.13,0,0,1,6-.71c1,0,2-.14,3.07-.13l3.12.16c.52,0,1.05,0,1.58.09l1.57.24c1.05.17,2.12.29,3.17.51a51,51,0,0,1,12.46,4.53c1,.53,1.95,1.16,2.94,1.75a24.76,24.76,0,0,1,2.85,2,53.32,53.32,0,0,1,5.36,4.55A53,53,0,0,1,364,62.83a45.8,45.8,0,0,1,6.76,13,50.48,50.48,0,0,1,2.44,14.9,50.47,50.47,0,0,1-2.44,14.89,45.61,45.61,0,0,1-6.76,13,54.15,54.15,0,0,1-4.63,5.47,53.21,53.21,0,0,1-5.36,4.54,24,24,0,0,1-2.85,2c-1,.58-1.94,1.21-2.94,1.75A48.31,48.31,0,0,1,342,135a49.64,49.64,0,0,1-6.3,1.84c-1.05.21-2.12.33-3.17.5l-1.57.24c-.53.07-1.06.07-1.58.1l-3.12.15c-1,0-2.06-.09-3.07-.12a44.33,44.33,0,0,1-6-.71,47.11,47.11,0,0,1-31.69-22.29,44.47,44.47,0,0,1-5.11-12.55,33.33,33.33,0,0,1-.91-4.87c-.1-.71-.22-1.36-.27-2s0-1.15-.06-1.64c0-1-.06-1.69-.08-2.23s0-.76,0-.76,0,.26.08.76.08,1.27.15,2.22c0,.49.06,1,.1,1.64s.19,1.24.3,2a33.52,33.52,0,0,0,1,4.82,44.67,44.67,0,0,0,5.19,12.4,46.7,46.7,0,0,0,31.43,21.87,43.38,43.38,0,0,0,5.87.68c1,0,2,.13,3,.11l3.08-.16c.51,0,1,0,1.55-.1l1.55-.24c1-.17,2.09-.29,3.13-.51a46.89,46.89,0,0,0,6.19-1.82,47.46,47.46,0,0,0,6.06-2.66c1-.53,1.92-1.15,2.89-1.73a24,24,0,0,0,2.8-1.93,52.91,52.91,0,0,0,5.27-4.48,53.64,53.64,0,0,0,4.55-5.38A45.05,45.05,0,0,0,370,105.38a49.6,49.6,0,0,0,2.39-14.65A49.49,49.49,0,0,0,370,76.08a44.83,44.83,0,0,0-6.64-12.79,51.12,51.12,0,0,0-4.55-5.38,51.69,51.69,0,0,0-5.26-4.48,24,24,0,0,0-2.8-1.93c-1-.57-1.91-1.19-2.89-1.73a51.23,51.23,0,0,0-12.25-4.48c-1-.21-2.09-.34-3.13-.51l-1.55-.24c-.51-.07-1-.06-1.55-.1l-3.07-.16c-1,0-2,.08-3,.12a43.34,43.34,0,0,0-5.88.67,46.11,46.11,0,0,0-19.57,8.68,46.69,46.69,0,0,0-11.86,13.19,44.67,44.67,0,0,0-5.19,12.4,33.36,33.36,0,0,0-1,4.83c-.11.7-.24,1.35-.3,2s-.07,1.14-.1,1.63c-.07,1-.12,1.69-.15,2.23S279.14,90.73,279.14,90.73Z"
              style="fill: #263238"
            ></path>
            <rect
              x="314.62"
              y="72.09"
              width="31.55"
              height="36.36"
              style="fill: var(--on-primary)"
            ></rect>
            <g style="opacity: 0.30000000000000004">
              <rect x="314.62" y="72.09" width="31.55" height="36.36"></rect>
            </g>
            <rect
              x="299.93"
              y="72.09"
              width="27.15"
              height="36.36"
              style="fill: var(--on-primary)"
            ></rect>
            <path
              d="M346.17,108.44a3.29,3.29,0,0,1-.41-.65l-1.09-1.94-3.93-7.16L328,75c-.39-.72-.77-1.43-1.12-2.1l.49-.12c0,10-.06,18.86-.08,25.35,0,3.17-.07,5.75-.09,7.6,0,.85,0,1.54,0,2a5.86,5.86,0,0,1-.05.72,3.13,3.13,0,0,1-.05-.72c0-.51,0-1.2,0-2,0-1.85-.05-4.43-.08-7.6,0-6.49,0-15.4-.08-25.35a.26.26,0,0,1,.26-.26.29.29,0,0,1,.23.14l1.12,2.09,12.64,23.78c1.57,3,2.86,5.48,3.78,7.24.42.82.75,1.48,1,2A3.69,3.69,0,0,1,346.17,108.44Z"
              style="fill: #263238"
            ></path>
            <path
              d="M346.17,72.09a10.52,10.52,0,0,1-.65,1.49c-.44.94-1.11,2.29-1.95,4-1.68,3.33-4.09,7.89-6.84,12.88s-5.27,9.49-7.11,12.73l-2.2,3.83a11,11,0,0,1-.87,1.38,10.29,10.29,0,0,1,.69-1.47L329.3,103c1.76-3.29,4.24-7.81,7-12.8l7-12.8c.86-1.58,1.56-2.89,2.1-3.89A10.37,10.37,0,0,1,346.17,72.09Z"
              style="fill: #263238"
            ></path>
            <rect
              x="316.58"
              y="96.84"
              width="6.79"
              height="7.82"
              style="fill: #fff"
            ></rect>
          </g>
          <g id="freepik--Technologies--inject-33">
            <path
              d="M343.36,390.28A46.81,46.81,0,1,0,387.68,346,46.82,46.82,0,0,0,343.36,390.28Z"
              style="fill: #fff"
            ></path>
            <path
              d="M343.3,392.71s0-.25,0-.76,0-1.27.07-2.23c0-.49,0-1,.07-1.64s.17-1.26.26-2a31.84,31.84,0,0,1,.92-4.86,44.11,44.11,0,0,1,5.11-12.56,47.07,47.07,0,0,1,31.68-22.28,43.13,43.13,0,0,1,6-.71c1,0,2-.14,3.08-.13l3.12.16c.52,0,1.05,0,1.57.09l1.58.24c1,.17,2.11.29,3.17.51a49.92,49.92,0,0,1,6.29,1.83,49.19,49.19,0,0,1,6.16,2.7c1,.53,2,1.16,2.94,1.75a23.92,23.92,0,0,1,2.85,1.95,52.23,52.23,0,0,1,5.36,4.55,53,53,0,0,1,4.63,5.46,45.55,45.55,0,0,1,6.76,13,46.77,46.77,0,0,1,0,29.79,45.86,45.86,0,0,1-6.76,13,54.15,54.15,0,0,1-4.63,5.47,53.21,53.21,0,0,1-5.36,4.54,25.75,25.75,0,0,1-2.85,2c-1,.58-2,1.21-3,1.75a47.7,47.7,0,0,1-6.16,2.69,50,50,0,0,1-6.29,1.84c-1.06.21-2.13.33-3.18.5l-1.57.24c-.52.07-1.05.07-1.58.1l-3.12.15c-1,0-2.05-.09-3.07-.12a44.72,44.72,0,0,1-6-.71,47.12,47.12,0,0,1-31.68-22.29,44.06,44.06,0,0,1-5.11-12.55,32.18,32.18,0,0,1-.92-4.87c-.09-.71-.21-1.36-.26-2s-.05-1.15-.07-1.64c0-.95-.05-1.69-.07-2.23s0-.76,0-.76,0,.26.08.76.09,1.27.15,2.22c0,.49.07,1,.1,1.64s.2,1.24.3,1.95a33.67,33.67,0,0,0,1,4.82,44.37,44.37,0,0,0,5.19,12.4,46.71,46.71,0,0,0,31.42,21.87,43.53,43.53,0,0,0,5.88.68c1,0,2,.13,3,.11l3.07-.16c.52,0,1,0,1.56-.1l1.55-.24c1-.17,2.08-.29,3.12-.51A51.23,51.23,0,0,0,412,433.67c1-.53,1.92-1.15,2.89-1.73a24.14,24.14,0,0,0,2.81-1.93,42.78,42.78,0,0,0,9.81-9.86,45.08,45.08,0,0,0,6.64-12.79,46,46,0,0,0,0-29.3,45.05,45.05,0,0,0-6.63-12.79,53.64,53.64,0,0,0-4.55-5.38,52.91,52.91,0,0,0-5.27-4.48,23.21,23.21,0,0,0-2.8-1.93c-1-.57-1.91-1.19-2.89-1.73a49.1,49.1,0,0,0-6.06-2.66,49.62,49.62,0,0,0-6.19-1.82c-1-.21-2.09-.34-3.12-.51l-1.55-.24c-.52-.07-1-.06-1.55-.1l-3.08-.16c-1,0-2,.08-3,.12a43.71,43.71,0,0,0-5.88.67,46.8,46.8,0,0,0-31.42,21.87,44.37,44.37,0,0,0-5.19,12.4,33.78,33.78,0,0,0-1,4.83c-.1.7-.23,1.35-.3,2s-.07,1.14-.1,1.63c-.06.95-.11,1.69-.15,2.23S343.3,392.71,343.3,392.71Z"
              style="fill: #263238"
            ></path>
            <path
              d="M380.65,377a18.34,18.34,0,0,1,4.44-1.93l.92-4.4,7.43-.13,1.07,4.36a18.34,18.34,0,0,1,4.51,1.78l3.76-2.46,5.34,5.16-2.32,3.84a18.17,18.17,0,0,1,1.93,4.44l4.39.92.14,7.43-4.37,1.07a18.08,18.08,0,0,1-1.77,4.51l2.46,3.76-5.16,5.34-3.84-2.33a18.27,18.27,0,0,1-4.45,1.94l-.91,4.39-7.43.13-1.07-4.36a17.93,17.93,0,0,1-4.51-1.77l-3.76,2.46L372.1,406l2.33-3.84a18.24,18.24,0,0,1-1.93-4.45l-4.4-.91-.13-7.43,4.37-1.07a17.93,17.93,0,0,1,1.77-4.51l-2.46-3.76,5.16-5.35,3.84,2.33Zm4,9.9a8,8,0,1,0,11.28-.2A8,8,0,0,0,384.61,386.93Z"
              style="fill: var(--on-primary)"
            ></path>
          </g>
          <g id="freepik--Prices--inject-33">
            <path
              d="M134.39,433.54a46.81,46.81,0,1,0,44.31-44.31A46.82,46.82,0,0,0,134.39,433.54Z"
              style="fill: #fff"
            ></path>
            <path
              d="M134.33,436s0-.26,0-.76.05-1.28.08-2.23c0-.5,0-1,.06-1.65s.17-1.25.27-2a32.85,32.85,0,0,1,.91-4.87A44.24,44.24,0,0,1,140.75,412a47.09,47.09,0,0,1,31.69-22.29,44.72,44.72,0,0,1,6-.71c1,0,2-.14,3.07-.12l3.12.15c.52,0,1,0,1.58.1l1.57.23c1,.18,2.12.3,3.17.51a52.1,52.1,0,0,1,12.46,4.53c1,.54,1.95,1.17,2.94,1.75a23.64,23.64,0,0,1,2.85,2,42.89,42.89,0,0,1,10,10,45.67,45.67,0,0,1,6.76,13,46.68,46.68,0,0,1,0,29.79,45.55,45.55,0,0,1-6.76,13,42.89,42.89,0,0,1-10,10,22.87,22.87,0,0,1-2.85,2c-1,.59-1.94,1.21-2.94,1.75a51,51,0,0,1-12.46,4.53c-1,.21-2.12.34-3.17.51l-1.57.23c-.53.07-1.06.07-1.58.1l-3.12.16c-1,0-2.06-.09-3.07-.13a44.33,44.33,0,0,1-6-.71A47,47,0,0,1,140.75,460a44.24,44.24,0,0,1-5.11-12.55,32.85,32.85,0,0,1-.91-4.87c-.1-.71-.22-1.36-.27-2s0-1.15-.06-1.65c0-.95-.06-1.69-.08-2.23s0-.75,0-.75,0,.25.08.75.08,1.27.15,2.22c0,.49.06,1,.1,1.64s.19,1.25.3,2a33.63,33.63,0,0,0,1,4.83,44.62,44.62,0,0,0,5.19,12.39,46.7,46.7,0,0,0,31.43,21.87,41.83,41.83,0,0,0,5.87.68c1,0,2,.13,3,.12l3.08-.16c.51,0,1,0,1.55-.1l1.55-.24c1-.18,2.09-.3,3.13-.51A50.13,50.13,0,0,0,197,479.6a49,49,0,0,0,6.06-2.67c1-.53,1.92-1.15,2.89-1.72a24.11,24.11,0,0,0,2.8-1.94,50.37,50.37,0,0,0,5.27-4.48,52.54,52.54,0,0,0,4.55-5.38,45.05,45.05,0,0,0,6.63-12.79,46.1,46.1,0,0,0,0-29.3,44.77,44.77,0,0,0-6.64-12.78,42.26,42.26,0,0,0-9.81-9.86,22.85,22.85,0,0,0-2.8-1.93c-1-.58-1.91-1.2-2.89-1.73a49,49,0,0,0-6.06-2.67,50.13,50.13,0,0,0-6.19-1.82c-1-.21-2.09-.33-3.13-.5l-1.55-.24c-.51-.07-1-.07-1.55-.1l-3.07-.16c-1,0-2,.08-3,.11a43.34,43.34,0,0,0-5.88.68A46.1,46.1,0,0,0,153,399a46.69,46.69,0,0,0-11.86,13.19,44.79,44.79,0,0,0-5.19,12.4,33.63,33.63,0,0,0-1,4.83c-.11.7-.24,1.35-.3,1.95s-.07,1.15-.1,1.64c-.07.95-.12,1.68-.15,2.22S134.33,436,134.33,436Z"
              style="fill: #263238"
            ></path>
            <path
              d="M184.33,455.9v5.78h-6.25v-5.57c-5.2-.36-10.15-1.87-13.16-3.95l3.38-7.6a23,23,0,0,0,12,3.59c4.27,0,5.94-1.2,5.94-3,0-5.77-20.72-1.56-20.72-15.09,0-5.73,4.11-10.57,12.54-11.61v-5.72h6.25v5.62a25.3,25.3,0,0,1,10.57,3.07l-3.18,7.65a21.57,21.57,0,0,0-10.1-2.81c-4.32,0-5.88,1.46-5.88,3.28,0,5.57,20.66,1.4,20.66,14.83C196.4,449.92,192.45,454.71,184.33,455.9Z"
              style="fill: var(--on-primary)"
            ></path>
          </g>
          <g id="freepik--Competitors--inject-33">
            <circle
              cx="70.97"
              cy="269.27"
              r="46.81"
              transform="translate(-203.85 224.42) rotate(-65.97)"
              style="fill: #fff"
            ></circle>
            <path
              d="M117.78,269.27s0-.26-.06-.76-.08-1.26-.14-2.22c0-.49-.06-1-.09-1.64s-.19-1.25-.3-2l-.36-2.28a25.93,25.93,0,0,0-.61-2.55A44.57,44.57,0,0,0,111,245.43,46.64,46.64,0,0,0,99.18,232.2l-2-1.5c-.71-.46-1.46-.89-2.19-1.34s-1.47-1-2.28-1.32l-2.42-1.16-1.23-.58-1.29-.47-2.62-1c-.89-.3-1.83-.48-2.75-.74a22.14,22.14,0,0,0-2.82-.63,42,42,0,0,0-5.89-.69c-1,0-2-.13-3-.11l-3.08.15c-.52,0-1,0-1.56.11l-1.55.23c-1,.18-2.09.3-3.13.51a49.91,49.91,0,0,0-6.21,1.82l-1.55.57-.77.29-.75.36-3,1.45c-1,.54-1.92,1.16-2.9,1.74-.47.3-1,.56-1.43.9l-1.38,1A52.93,52.93,0,0,0,38,236.35L35.68,239l-.6.65-.53.71-1.07,1.43-1.07,1.43-.94,1.53-.93,1.54-.47.78c-.15.26-.27.54-.4.81-.53,1.09-1.05,2.18-1.58,3.28s-.84,2.3-1.27,3.45a46.16,46.16,0,0,0,0,29.38l1.26,3.45c.53,1.1,1.06,2.19,1.58,3.28l.4.82.47.77.94,1.54.94,1.54,1.07,1.43,1.06,1.43.54.71.59.65c.8.87,1.58,1.74,2.37,2.61a53.13,53.13,0,0,0,5.28,4.49l1.37,1c.46.35,1,.61,1.44.91,1,.58,1.92,1.2,2.9,1.74l3,1.45.75.36c.25.11.52.19.77.29l1.55.57a49.91,49.91,0,0,0,6.21,1.82c1,.21,2.1.33,3.13.51l1.56.24c.51.06,1,.06,1.55.1l3.09.15c1,0,2-.08,3-.11a42,42,0,0,0,5.89-.69,21.76,21.76,0,0,0,2.82-.63c.93-.26,1.86-.44,2.75-.74l2.62-1,1.3-.47,1.23-.58,2.42-1.16c.8-.37,1.52-.89,2.27-1.32s1.48-.88,2.19-1.34l2-1.5A46.64,46.64,0,0,0,111,293.09a44.4,44.4,0,0,0,5.18-12.42c.21-.9.51-1.74.61-2.55l.36-2.28c.11-.71.23-1.36.3-2s.06-1.15.09-1.64l.14-2.22c0-.5.06-.75.06-.75s0,.25,0,.75,0,1.26-.08,2.23c0,.49,0,1-.07,1.64s-.18,1.26-.28,2-.21,1.47-.33,2.29-.39,1.66-.59,2.57a44.51,44.51,0,0,1-5.13,12.52,46.71,46.71,0,0,1-11.88,13.38l-2,1.52c-.71.47-1.46.9-2.2,1.36s-1.48,1-2.29,1.34L90.45,312l-1.24.6-1.3.48-2.64,1c-.9.3-1.84.49-2.77.75a24.55,24.55,0,0,1-2.85.65,42.84,42.84,0,0,1-5.94.7c-1,0-2,.14-3.07.13l-3.11-.16c-.52,0-1,0-1.57-.1l-1.57-.23c-1-.18-2.11-.3-3.17-.51a49.78,49.78,0,0,1-6.28-1.83l-1.56-.57-.78-.3-.76-.36-3-1.46c-1-.54-1.95-1.17-2.93-1.75-.48-.31-1-.57-1.46-.92l-1.38-1a51.83,51.83,0,0,1-5.35-4.54l-2.39-2.63-.6-.66-.55-.72-1.07-1.44L32,295.63,31,294.09l-.94-1.56-.48-.78-.4-.83c-.53-1.1-1.07-2.21-1.6-3.32s-.85-2.32-1.28-3.49a46.59,46.59,0,0,1,0-29.7c.43-1.17.86-2.33,1.28-3.49s1.07-2.22,1.6-3.32c.14-.27.26-.55.4-.82l.48-.78.95-1.56.95-1.55,1.08-1.45L34.15,240l.54-.71.6-.66,2.4-2.64A51.81,51.81,0,0,1,43,231.46l1.39-1c.45-.35,1-.61,1.45-.92,1-.58,1.94-1.21,2.93-1.75l3.05-1.46.75-.36.78-.3,1.56-.57a49.78,49.78,0,0,1,6.28-1.83c1.05-.21,2.12-.33,3.17-.51L66,222.5c.52-.07,1.05-.07,1.57-.1l3.11-.16c1,0,2,.09,3.07.13a44.42,44.42,0,0,1,5.94.7,24.55,24.55,0,0,1,2.85.65c.93.26,1.87.45,2.76.75l2.65,1,1.3.48,1.24.59,2.44,1.18A25.71,25.71,0,0,1,95.17,229c.75.46,1.5.89,2.21,1.36l2,1.52a46.58,46.58,0,0,1,11.88,13.38,44.51,44.51,0,0,1,5.13,12.52c.2.91.5,1.75.59,2.57s.23,1.58.33,2.29.22,1.36.28,2,0,1.15.07,1.64c0,1,.06,1.71.08,2.23S117.78,269.27,117.78,269.27Z"
              style="fill: #263238"
            ></path>
            <path
              d="M79.5,250.4a6.77,6.77,0,1,1-6.77-6.77A6.77,6.77,0,0,1,79.5,250.4Z"
              style="fill: var(--on-primary)"
            ></path>
            <circle
              cx="72.73"
              cy="241.87"
              r="1.76"
              style="fill: var(--on-primary)"
            ></circle>
            <path
              d="M61.75,292.38H83.87a3.29,3.29,0,0,1,3.29,3.29v1.66a0,0,0,0,1,0,0H58.46a0,0,0,0,1,0,0v-1.66A3.29,3.29,0,0,1,61.75,292.38Z"
              style="fill: var(--on-primary)"
            ></path>
            <polygon
              points="62.59 292.47 64.3 294.86 81.63 294.86 83.46 292.47 62.59 292.47"
              style="fill: var(--on-primary)"
            ></polygon>
            <rect
              x="65.9"
              y="270.12"
              width="13.66"
              height="3.17"
              rx="1.49"
              style="fill: var(--on-primary)"
            ></rect>
            <path
              d="M68.42,270.55s-.18,15.23-5.83,21.92H73.05V270.55Z"
              style="fill: var(--on-primary)"
            ></path>
            <path
              d="M77.36,270.55s.45,15.23,6.1,21.92H72.73V270.55Z"
              style="fill: var(--on-primary)"
            ></path>
            <path
              d="M82.79,249.13c-2.19-2.08-4.11.15-4.9,1s-2.4.63-3.27-.84c-.72-1.22-1.55-1.24-1.89-1.2s-1.17,0-1.89,1.2c-.87,1.47-2.48,1.66-3.27.84s-2.71-3-4.91-1c0,0,4.55,5.74,5.25,11.68s.63,8.73,0,10.38h9.64c-.63-1.65-.7-4.44,0-10.38S82.79,249.13,82.79,249.13Z"
              style="fill: var(--on-primary)"
            ></path>
            <path
              d="M83.64,292.47c0,.14-4.76.26-10.64.26s-10.63-.12-10.63-.26,4.76-.26,10.63-.26S83.64,292.32,83.64,292.47Z"
              style="fill: #263238"
            ></path>
            <path
              d="M77.86,273.26a27.13,27.13,0,0,1-5.26.26,27.13,27.13,0,0,1-5.26-.26A27.13,27.13,0,0,1,72.6,273,27.13,27.13,0,0,1,77.86,273.26Z"
              style="fill: #263238"
            ></path>
            <path
              d="M78.91,270.71A34.35,34.35,0,0,1,73,271a34.18,34.18,0,0,1-5.91-.26,34.18,34.18,0,0,1,5.91-.26A34.35,34.35,0,0,1,78.91,270.71Z"
              style="fill: #263238"
            ></path>
            <path
              d="M81.25,248.36a4.4,4.4,0,0,0-.81,0,4.68,4.68,0,0,0-2,1,5.82,5.82,0,0,1-1.42.82,2,2,0,0,1-1.94-.22,14.84,14.84,0,0,1-1.41-1.47,1.31,1.31,0,0,0-1.68-.19,8.05,8.05,0,0,0-1.53,1.41,2.46,2.46,0,0,1-2,.89,3.29,3.29,0,0,1-1.69-.91,4.31,4.31,0,0,0-1.27-.83,3.23,3.23,0,0,0-2.15,0c-.5.16-.74.35-.77.31s.18-.27.7-.5a3.23,3.23,0,0,1,2.34-.12,4.83,4.83,0,0,1,1.42.84,3,3,0,0,0,1.47.78,2,2,0,0,0,1.55-.78,8.26,8.26,0,0,1,1.63-1.51,1.94,1.94,0,0,1,1.21-.27,1.9,1.9,0,0,1,1.07.55c.55.52.88,1.11,1.35,1.45a1.57,1.57,0,0,0,1.52.2,5.77,5.77,0,0,0,1.35-.71,4.23,4.23,0,0,1,2.15-.91C81,248.12,81.27,248.35,81.25,248.36Z"
              style="fill: #263238"
            ></path>
          </g>
        </svg>
        <div>
          <h2>Você é um diretor</h2>
          <p>
            Você possui permissão de diretor, sendo possível realizar o envio de
            relatórios dos moradores de seu departamento. Aperte na guia
            colaboradores para acompanhar cada um.
          </p>
        </div>
      </div>
      <!-- Admin -->
      <div class="container account_type" v-if="mode == 2">
        <!-- Import svg -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <g id="freepik--background-simple--inject-6">
            <path
              d="M215.85,117a1.2,1.2,0,0,1,0,2.39,1,1,0,0,1-.18,0l-.68-1.16-.25-.43A1.19,1.19,0,0,1,215.85,117Zm-1.2-6a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,214.65,111Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,214.65,103.86Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,214.65,89.49Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,214.65,75.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,214.65,67.94Zm-2.4,45.49-.07,0,1.07,1.81a1.24,1.24,0,0,0,.2-.63A1.2,1.2,0,0,0,212.25,113.43Zm-1.19-6a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,211.06,107.45Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,211.06,100.26Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,211.06,93.08Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,211.06,85.9Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,211.06,78.71Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,211.06,71.53Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,211.06,64.34Zm-3.59,39.52a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,207.47,103.86Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,207.47,96.67Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,207.47,82.3Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,207.47,75.12Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm.2-7.82a1.12,1.12,0,0,0-.2.63,1.19,1.19,0,0,0,2.36.17l-.45-.17-.72-.26Zm-3.8,33a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,203.87,93.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,203.87,85.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,203.87,78.71Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,203.87,71.53Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,203.87,64.34Zm.2,35.31,1.06,1.8a1.19,1.19,0,0,0-.06-2.38A1.18,1.18,0,0,0,204.07,99.65Zm-2.43-4.14.68,1.16.26.45a1.13,1.13,0,0,0,.09-.45A1.18,1.18,0,0,0,201.64,95.51Zm-1.36-6a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,200.28,89.49Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,200.28,75.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,200.28,67.94Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0ZM196.69,85.9a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,196.69,85.9Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,196.69,71.53Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,2.39,0,1.28,1.28,0,0,0-.05-.27l-1.83-.68A1.17,1.17,0,0,0,196.69,57.16Zm-2.4,24a1.19,1.19,0,0,0-.88.4l.46.79.42.72.26.43a1.18,1.18,0,0,0-.26-2.34Zm-1.19-6a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,193.1,75.12Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,193.1,67.94Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,193.1,60.75Zm-2,16.85.75,1.28a.85.85,0,0,0,0-.17A1.17,1.17,0,0,0,191.11,77.6Zm-1.6-6.07a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,189.51,64.34Zm0-7.18A1.2,1.2,0,1,0,190.7,56,1.19,1.19,0,0,0,189.51,57.16Zm-3.6,10.78a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,185.91,67.94Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,185.91,60.75Zm0-7.18a1.2,1.2,0,0,0,2.4,0,1.21,1.21,0,0,0-.31-.79l-.89-.33L187,52.4A1.19,1.19,0,0,0,185.91,53.57Zm-3.59,3.59a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,182.32,57.16Zm1.2,6a1.13,1.13,0,0,0-.74.28l1.19,2a1.19,1.19,0,0,0-.45-2.3Zm0-12,.11,0-1-.36A1.19,1.19,0,0,0,183.52,51.17Zm-2.44,9.37a1.19,1.19,0,0,0-.41-.71Zm-2.35-7a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,178.73,53.57ZM175.14,50a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,175.14,50ZM173.3,47.3l0,.09.07,0Zm66.49,38.6a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,239.79,85.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,239.79,78.71Zm1.2-6a1.13,1.13,0,0,0,.32-.06l-1.3-.49A1.15,1.15,0,0,0,241,72.72Zm-4.79,81.42a1,1,0,0,0,.05.25l.38.65a1.17,1.17,0,0,0,.77.3,1.2,1.2,0,1,0-1.2-1.2Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,236.2,147Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,236.2,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,236.2,125.41Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,236.2,111Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,236.2,103.86Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,236.2,89.49Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,236.2,75.12Zm-3.59,68.25a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,232.61,143.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,232.61,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,232.61,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,232.61,114.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,232.61,107.45Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,232.61,93.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,232.61,85.9Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,232.61,71.53Zm1.2,77.82a1.24,1.24,0,0,0-.47.1l1.2,2a1.18,1.18,0,0,0-.73-2.12Zm-3.6-80.22a1.19,1.19,0,0,0,.8-.31l-.8-.3-1.16-.43A1.18,1.18,0,0,0,230.21,69.13ZM229,139.77a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,229,139.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,229,132.59Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,229,118.22Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,229,111Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,229,103.86Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,229,96.67Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,229,82.3Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,229,75.12ZM225.43,129a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,225.43,121.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,225.43,114.63Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,225.43,100.26Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,225.43,93.08Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,225.43,78.71Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0,64.5.74,1.26a1.17,1.17,0,0,0,.42.09,1.2,1.2,0,1,0,0-2.39A1.18,1.18,0,0,0,225.46,136ZM223,131.39a1.31,1.31,0,0,0-.27.06l.27.45.41.69.47.8a1.19,1.19,0,0,0-.88-2Zm-1.2-6a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,221.83,125.41Zm0-7.19A1.2,1.2,0,1,0,223,117,1.2,1.2,0,0,0,221.83,118.22Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,221.83,111Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,221.83,103.86Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,221.83,96.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,221.83,89.49Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,221.83,82.3Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,221.83,75.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,221.83,67.94Zm-3.59,53.87a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,218.24,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,218.24,114.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,218.24,107.45Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,218.24,93.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,218.24,85.9Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,218.24,71.53Zm.06-7.45a1.22,1.22,0,0,0-.06.26,1.2,1.2,0,0,0,1.2,1.2,1.18,1.18,0,0,0,1-.65Zm39.45,68.51a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,257.75,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,257.75,125.41Zm0-7.19A1.2,1.2,0,1,0,259,117,1.2,1.2,0,0,0,257.75,118.22Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,257.75,111Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,257.75,103.86Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,257.75,96.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,257.75,89.49Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,257.75,82.3Zm-3.59,97a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,254.16,179.29Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,254.16,164.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,254.16,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,254.16,143.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,254.16,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,254.16,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,254.16,114.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,254.16,107.45Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,254.16,93.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,254.16,85.9Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.1,1.1,0,0,0-.08-.4l-1.69-.63A1.2,1.2,0,0,0,254.16,78.71Zm1.2,106.56a1.16,1.16,0,0,0-.78.31l1.18,2a1.17,1.17,0,0,0,.79-1.11A1.19,1.19,0,0,0,255.36,185.27Zm-2.93-3.36.51.88A1.15,1.15,0,0,0,252.43,181.91Zm-1.86-6.22a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,250.57,175.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,250.57,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,250.57,161.33Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,250.57,154.14Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,250.57,147Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,250.57,139.77Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,250.57,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,250.57,125.41Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,250.57,118.22Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,250.57,111Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,250.57,103.86Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,250.57,96.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,250.57,89.49Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,250.57,82.3ZM247,172.1a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,247,172.1Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,247,157.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,247,150.55Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,247,136.18Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,247,121.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,247,114.63Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,247,100.26Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,247,93.08Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,247,78.71Zm-2.4,88.6a1.23,1.23,0,0,0-.62.2l.59,1,0,.05.58,1a1.19,1.19,0,0,0-.58-2.23Zm-1.19-6a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,243.39,161.33Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,243.39,154.14Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,243.39,139.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,243.39,132.59Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,243.39,118.22Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,243.39,111Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,243.39,103.86Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,243.39,96.67Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,243.39,82.3Zm0-7.18a1.2,1.2,0,1,0,1.77-1l-.31-.11a1.18,1.18,0,0,0-.27-.06A1.19,1.19,0,0,0,243.39,75.12Zm-3.6,82.61a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,239.79,157.73Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,239.79,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,239.79,143.37Zm0-7.19A1.2,1.2,0,1,0,241,135,1.2,1.2,0,0,0,239.79,136.18Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,239.79,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,239.79,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,239.79,114.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,239.79,107.45Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,239.79,100.26Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,239.79,93.08Zm32.33,46.69a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,272.12,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,272.12,125.41Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,272.12,111Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,272.12,103.86Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,272.12,89.49ZM268.53,208a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,208Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,200.84Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,268.53,193.65Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,186.47Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,179.29Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,268.53,172.1Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,164.92Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,268.53,157.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,150.55Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,143.37Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,268.53,136.18Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,129Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,268.53,121.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,114.63Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,107.45Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,268.53,100.26Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,93.08Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,268.53,85.9Zm-3.31,117.78.45.75.46.79.21.36a1.18,1.18,0,0,0,1-1.15,1.2,1.2,0,0,0-1.2-1.2A1.17,1.17,0,0,0,265.22,203.68Zm-.28-6.44a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,264.94,197.24Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,264.94,190.06Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,264.94,175.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,264.94,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,264.94,161.33Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,264.94,154.14Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,264.94,139.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,264.94,132.59Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,264.94,118.22Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,264.94,111Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,264.94,103.86Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,264.94,96.67Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm.27-7.92a1.17,1.17,0,0,0-.27.73,1.19,1.19,0,0,0,2.38,0l-.14,0-1.05-.39Zm-2.32,118.14.8,1.36a1,1,0,0,0,.05-.23A1.18,1.18,0,0,0,262.89,199.71Zm-1.55-6.06a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,261.34,193.65Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,261.34,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,261.34,179.29Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,261.34,172.1Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,261.34,164.92Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,261.34,157.73Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,261.34,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,261.34,143.37Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,261.34,136.18Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,261.34,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,261.34,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,261.34,114.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,261.34,107.45Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,261.34,100.26Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,261.34,93.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,261.34,85.9Zm-3.59,104.16a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,257.75,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,257.75,182.88Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,257.75,175.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,257.75,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,257.75,161.33Zm0-7.19A1.2,1.2,0,1,0,259,153,1.2,1.2,0,0,0,257.75,154.14Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,257.75,147Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,257.75,139.77ZM282.9,172.1a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,282.9,172.1Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,282.9,157.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,282.9,150.55Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,282.9,136.18Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,282.9,121.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,282.9,114.63Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,282.9,100.26Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,282.9,93.08ZM279.3,226a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,279.3,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,279.3,218.8Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,279.3,211.61Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,279.3,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,279.3,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,279.3,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,279.3,182.88Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,279.3,175.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,279.3,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,279.3,161.33Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,279.3,154.14Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,279.3,147Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,279.3,139.77Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,279.3,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,279.3,125.41Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,279.3,118.22Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,279.3,111Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,279.3,103.86Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,279.3,96.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,279.3,89.49ZM275.71,215.2a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,275.71,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,275.71,200.84Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,275.71,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,275.71,179.29Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,275.71,164.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,275.71,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,275.71,143.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,275.71,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,275.71,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,275.71,114.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,275.71,107.45Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,275.71,93.08Zm.17,128.73,1,1.77a1.2,1.2,0,1,0-1-1.77Zm-.09-136.3a1.23,1.23,0,0,0-.08.39,1.19,1.19,0,0,0,1.2,1.19,1.18,1.18,0,0,0,1.1-.75Zm-2.37,132.11.69,1.18.29.49a1.17,1.17,0,0,0,.11-.49A1.19,1.19,0,0,0,273.42,217.62Zm-1.3-6a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,272.12,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,272.12,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,272.12,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,272.12,182.88Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,272.12,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,272.12,161.33Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,272.12,147Zm22.75,106.56a1.07,1.07,0,0,0-.31.06l.31.52.36.61.49.84a1.2,1.2,0,0,0-.85-2Zm-1.2-6a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,293.67,240.35Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,293.67,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,293.67,218.8Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,293.67,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,293.67,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,293.67,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,293.67,182.88Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,293.67,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,293.67,161.33Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,293.67,147Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,293.67,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,293.67,125.41Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,293.67,111Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,293.67,103.86Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm-3.59,147.27a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,290.08,243.94Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,290.08,236.76Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,290.08,222.39Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,290.08,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,290.08,200.84Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,290.08,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,290.08,179.29Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,290.08,164.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,290.08,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,290.08,143.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,290.08,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,290.08,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,290.08,114.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,290.08,107.45Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,290.08,93.08ZM287.68,90l-1.19-.45a1.19,1.19,0,0,0,2.08.78Zm-1.12,150,.22.37.68,1.15a1.43,1.43,0,0,0,.22,0,1.2,1.2,0,1,0-1.12-1.56Zm-.07-6.82a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,286.49,233.16Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,226Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,218.8Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,286.49,211.61Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,204.43Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,286.49,197.24Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,190.06Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,182.88Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,286.49,175.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,161.33Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,286.49,154.14Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,147Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,286.49,139.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,132.59Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,125.41Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,286.49,118.22Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,111Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,286.49,103.86Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,286.49,96.67Zm-2.4,138.89-.11,0,1.08,1.84a1.17,1.17,0,0,0,.23-.66A1.2,1.2,0,0,0,284.09,235.56Zm-1.19-6a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,282.9,229.57Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,282.9,215.2Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,282.9,208Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,282.9,193.65Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,282.9,186.47Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,282.9,179.29Zm21.55-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,304.45,172.1Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,304.45,157.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,304.45,150.55Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,304.45,136.18Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,304.45,121.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,304.45,114.63Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,304.45,100.26Zm1.19,171.22a1.17,1.17,0,0,0-.49.11l1.19,2a1.17,1.17,0,0,0,.5-.95A1.19,1.19,0,0,0,305.64,271.48Zm-4.78-9.58a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,300.86,254.71Zm0-7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,300.86,247.53Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,300.86,233.16Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,300.86,226Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,300.86,211.61Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,300.86,197.24Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,300.86,190.06Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,300.86,175.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,300.86,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,300.86,161.33Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,300.86,154.14Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,300.86,139.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,300.86,132.59Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,300.86,118.22Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,300.86,111Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,300.86,103.86Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,300.86,96.67Zm-3.6,154.45a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,297.26,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,297.26,243.94Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,297.26,236.76Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,297.26,229.57Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,297.26,222.39Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,297.26,215.2Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,297.26,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,297.26,200.84Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,297.26,193.65Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,297.26,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,297.26,179.29Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,297.26,172.1Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,297.26,164.92Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,297.26,157.73Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,297.26,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,297.26,143.37Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,297.26,136.18Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,297.26,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,297.26,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,297.26,114.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,297.26,107.45Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,297.26,100.26Zm1.2-6a1.14,1.14,0,0,0,.51-.13l-1.6-.59A1.19,1.19,0,0,0,298.46,94.28Zm-1.18,163.93.7,1.19a1.29,1.29,0,0,0,.48.1,1.2,1.2,0,1,0-1.18-1.29Zm17.94-53.78a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,315.22,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,315.22,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,315.22,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,315.22,182.88Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,315.22,175.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,315.22,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,315.22,161.33Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,315.22,154.14Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,315.22,147Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,315.22,139.77Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,315.22,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,315.22,125.41Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,315.22,118.22Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,315.22,111Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,315.22,103.86Zm-3.59,176a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,311.63,279.86Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,311.63,272.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,311.63,265.49Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,311.63,258.31Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,311.63,243.94Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,311.63,236.76Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,311.63,222.39Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,311.63,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,311.63,200.84Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,311.63,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,311.63,179.29Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,311.63,164.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,311.63,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,311.63,143.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,311.63,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,311.63,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,311.63,114.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,311.63,107.45Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.16,1.16,0,0,0-.15-.55l-1.49-.55A1.18,1.18,0,0,0,311.63,100.26Zm-3.59,176a1.51,1.51,0,0,0,.07.37l.29.48a1.2,1.2,0,1,0,.84-2.05A1.2,1.2,0,0,0,308,276.27Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,308,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,308,254.71Zm0-7.18a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,308,240.35Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,308,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,308,218.8Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,308,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,308,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,308,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,308,182.88Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,308,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,308,161.33Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,308,147Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,308,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,308,125.41Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,308,111Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,308,103.86Zm-3.59,161.63a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,304.45,265.49Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,304.45,251.12Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,304.45,243.94Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,304.45,236.76Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,304.45,229.57Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,304.45,215.2Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,304.45,208Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,304.45,193.65Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,304.45,186.47Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,304.45,179.29Zm18,118.53a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,322.41,290.63Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,322.41,283.45Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,322.41,269.08Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,322.41,254.71Zm0-7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,322.41,247.53Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,323.6,232,1.19,1.19,0,0,0,322.41,233.16Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,322.41,226Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,322.41,211.61Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,322.41,197.24Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,322.41,190.06Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,322.41,175.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,322.41,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,322.41,161.33Zm0-7.19A1.2,1.2,0,1,0,323.6,153,1.19,1.19,0,0,0,322.41,154.14Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,322.41,139.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,322.41,132.59Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,323.6,117,1.19,1.19,0,0,0,322.41,118.22Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,322.41,111Zm.34-8a1.2,1.2,0,0,0-.34.84,1.2,1.2,0,0,0,2.39,0,.24.24,0,0,0,0-.08l-1.18-.44Zm-3.93,191.21a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,318.82,287Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,318.82,272.67Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,318.82,265.49Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,318.82,251.12Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,318.82,243.94Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,318.82,236.76Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,318.82,229.57Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,320,214,1.19,1.19,0,0,0,318.82,215.2Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,318.82,208Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,318.82,193.65Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,318.82,186.47Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,318.82,179.29Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,318.82,172.1Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,318.82,157.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,318.82,150.55Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,320,135,1.19,1.19,0,0,0,318.82,136.18Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,318.82,121.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,318.82,114.63Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm-2.4,182a1.13,1.13,0,0,0-.65.22l.57,1,.08.14.54.92a1.19,1.19,0,0,0-.54-2.25Zm-1.2-6a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,315.22,283.45Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,315.22,276.27Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,315.22,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,315.22,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,315.22,254.71Zm0-7.18a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,315.22,247.53Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,315.22,240.35Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,315.22,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,315.22,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,315.22,218.8Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,315.22,211.61Zm14.37,100.58a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,329.59,312.19Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,329.59,297.82Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,329.59,283.45Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,329.59,276.27Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,329.59,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,329.59,254.71Zm0-7.18a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,329.59,240.35Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,329.59,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,329.59,218.8Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,329.59,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,329.59,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,329.59,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,329.59,182.88Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,329.59,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,329.59,161.33Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,329.59,147Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,329.59,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,329.59,125.41Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,329.59,111ZM326,301.41a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,326,301.41Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,326,294.23Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,326,287Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,326,279.86Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.19,1.19,0,0,0,326,272.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,326,265.49Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,326,258.31Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,326,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,326,243.94Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,326,236.76Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,326,229.57Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,326,222.39Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,326,215.2Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,326,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,326,200.84Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,326,193.65Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,326,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,326,179.29Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,326,172.1Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,326,164.92Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,326,157.73Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,326,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,326,143.37Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,326,136.18Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,326,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.19,1.19,0,0,0,326,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,326,114.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,326,107.45Zm1.2,200a1.16,1.16,0,0,0-.81.32l1.17,2a1.19,1.19,0,0,0-.36-2.32Zm-3-3.42.6,1v0A1.17,1.17,0,0,0,324.19,304Zm12.58,15.39a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,336.77,319.37Zm0-7.18A1.2,1.2,0,1,0,338,311,1.19,1.19,0,0,0,336.77,312.19Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,336.77,305Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,336.77,297.82Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,336.77,290.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,336.77,283.45Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,336.77,276.27Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,336.77,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,336.77,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,336.77,254.71Zm0-7.18a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,336.77,247.53Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,336.77,240.35Zm0-7.19A1.2,1.2,0,1,0,338,232,1.2,1.2,0,0,0,336.77,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,336.77,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,336.77,218.8Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,336.77,211.61Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,336.77,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,336.77,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,336.77,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,336.77,182.88Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,336.77,175.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,336.77,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,336.77,161.33Zm0-7.19A1.2,1.2,0,1,0,338,153,1.2,1.2,0,0,0,336.77,154.14Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,336.77,147Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,336.77,139.77Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,336.77,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,336.77,125.41Zm0-7.19A1.2,1.2,0,1,0,338,117,1.2,1.2,0,0,0,336.77,118.22Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,336.77,111Zm-2.09,210.79.84,1.42a1.36,1.36,0,0,0,.06-.29A1.18,1.18,0,0,0,334.68,321.83Zm-1.5-6.05a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,333.18,315.78Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,333.18,308.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,333.18,301.41Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,333.18,294.23Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,333.18,287Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,333.18,279.86Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,333.18,272.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,333.18,265.49Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,333.18,258.31Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,333.18,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,333.18,243.94Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,333.18,236.76Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,333.18,229.57Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,333.18,222.39Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,333.18,215.2Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,333.18,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,333.18,200.84Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,333.18,193.65Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,333.18,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,333.18,179.29Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,333.18,172.1Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,333.18,164.92Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,333.18,157.73Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,333.18,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,333.18,143.37Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,333.18,136.18Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,333.18,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,333.18,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,333.18,114.63Zm.12-7.68a1.18,1.18,0,1,0,2.21.83Zm14.25,158.54a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,347.55,265.49Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,347.55,258.31Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,347.55,243.94Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,347.55,236.76Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,347.55,222.39Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,347.55,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,347.55,200.84Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,347.55,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,347.55,179.29Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,347.55,164.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,347.55,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,347.55,143.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,347.55,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,347.55,121.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,347.55,114.63ZM344,312.19a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,312.19Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,305Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,297.82Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,290.63Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,283.45Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,276.27Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,269.08Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,261.9Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,254.71Zm0-7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,247.53Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,240.35Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,233.16Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,226Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,218.8Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,211.61Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,204.43Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,197.24Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,190.06Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,182.88Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,175.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,161.33Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,154.14Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,147Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,139.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,132.59Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,344,125.41Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,344,118.22Zm0-7.28s0,.06,0,.1a1.18,1.18,0,0,0,2.15.69l-1-.36-.9-.33Zm-3.61,204.84a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,340.37,308.59Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,340.37,301.41Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,340.37,287Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,340.37,272.67Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,340.37,265.49Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,340.37,251.12Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,340.37,243.94Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,340.37,236.76Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,340.37,229.57Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,340.37,215.2Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,340.37,208Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,340.37,193.65Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,340.37,186.47Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,340.37,179.29Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,340.37,172.1Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,340.37,157.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,340.37,150.55Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,340.37,136.18Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,340.37,121.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,340.37,114.63Zm18,97a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,358.33,211.61Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,358.33,197.24Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,358.33,190.06Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,358.33,175.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,358.33,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,358.33,161.33Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,358.33,154.14Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,358.33,139.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,358.33,132.59Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,358.33,118.22Zm-3.6,183.19a1.18,1.18,0,0,0,2,.91l.21-.25a1.17,1.17,0,0,0,.23-.66,1.2,1.2,0,1,0-2.4,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,354.73,294.23Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,354.73,287Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,354.73,279.86Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,354.73,272.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,354.73,265.49Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,354.73,258.31Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,354.73,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,354.73,243.94Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,354.73,236.76Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,354.73,229.57Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,354.73,222.39Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,354.73,215.2Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,354.73,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,354.73,200.84Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,354.73,193.65Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,354.73,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,354.73,179.29Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,354.73,172.1Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,354.73,164.92Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,354.73,157.73Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,354.73,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,354.73,143.37Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,354.73,136.18Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,354.73,129Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,354.73,121.81Zm1.2-6a1.24,1.24,0,0,0,.63-.2L354.8,115A1.19,1.19,0,0,0,355.93,115.83ZM351.14,305a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,351.14,297.82Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,351.14,283.45Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,351.14,276.27Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,351.14,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,351.14,254.71Zm0-7.18a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,351.14,240.35Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,351.14,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,351.14,218.8Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,351.14,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,351.14,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,351.14,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,351.14,182.88Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,351.14,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,351.14,161.33Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,351.14,147Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,351.14,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,351.14,125.41Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm-3.59,190.37a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,347.55,301.41Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,347.55,294.23Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,347.55,279.86Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,347.55,272.67ZM366,119.13a1.17,1.17,0,0,0,.76.29h0Zm-.44,171.5a1.19,1.19,0,0,0,.53,1l.67-.77.17-.2.7-.8a1.18,1.18,0,0,0-.87-.39A1.19,1.19,0,0,0,365.51,290.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,365.51,283.45Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,365.51,276.27Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,365.51,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,365.51,254.71Zm0-7.18a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,365.51,240.35Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,365.51,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,365.51,218.8Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,365.51,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,365.51,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,365.51,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,365.51,182.88Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,365.51,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,365.51,161.33Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,365.51,147Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,365.51,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,365.51,125.41ZM361.92,287a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,361.92,287Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,361.92,272.67Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,361.92,265.49Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,361.92,251.12Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,361.92,243.94Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,361.92,236.76Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,361.92,229.57Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,361.92,215.2Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,361.92,208Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,361.92,193.65Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,361.92,186.47Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,361.92,179.29Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,361.92,172.1Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,361.92,157.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,361.92,150.55Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,361.92,136.18Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,361.92,121.81Zm0,172.42a1.18,1.18,0,0,0,.84,1.12l1.43-1.63a1.19,1.19,0,0,0-2.27.51Zm-3.59,3.59a1.19,1.19,0,0,0,1.19,1.19h.06l1-1.18.09-.1a1.19,1.19,0,0,0-2.37.1Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,358.33,290.63Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,358.33,283.45Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,358.33,269.08Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,358.33,254.71Zm0-7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,358.33,247.53Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,358.33,233.16Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,358.33,226Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm21.55-79a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,379.88,139.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,379.88,132.59Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.3,1.3,0,0,0,0-.21l-1.16-.43-.74-.28A1.18,1.18,0,0,0,379.88,125.41Zm-3.59,147.26a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,376.29,272.67Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,376.29,265.49Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,376.29,251.12Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,376.29,243.94Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,376.29,236.76Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,376.29,229.57Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,376.29,215.2Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,376.29,208Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,376.29,193.65Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,376.29,186.47Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,376.29,179.29Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,376.29,172.1Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,376.29,157.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,376.29,150.55Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,376.29,136.18Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0,150.85,1-1.15A1.17,1.17,0,0,0,376.29,279.85Zm-3.6,3.6a1.17,1.17,0,0,0,.09.42l.37-.42.74-.85.26-.29a1.22,1.22,0,0,0-.26-.06A1.2,1.2,0,0,0,372.69,283.45Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,372.69,276.27Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,372.69,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,372.69,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,372.69,254.71Zm0-7.18a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,372.69,247.53Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,372.69,240.35Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,372.69,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,372.69,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,372.69,218.8Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,372.69,211.61Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,372.69,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,372.69,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,372.69,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,372.69,182.88Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,372.69,175.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,372.69,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,372.69,161.33Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,372.69,154.14Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,372.69,147Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,372.69,139.77Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,372.69,132.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,372.69,125.41ZM369.1,279.86a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,369.1,279.86Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,369.1,272.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,369.1,265.49Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,369.1,258.31Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,369.1,243.94Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,369.1,236.76Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,369.1,222.39Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,369.1,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,369.1,200.84Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,369.1,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,369.1,179.29Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,369.1,164.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,369.1,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,369.1,143.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,369.1,129Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.13,1.13,0,0,0-.26-.71l-1.16-.44A1.18,1.18,0,0,0,369.1,121.81Zm0,165.23a1.12,1.12,0,0,0,.28.73L370.9,286a1.14,1.14,0,0,0-.6-.18A1.19,1.19,0,0,0,369.1,287Zm18-25.14a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,387.06,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,387.06,254.71Zm0-7.18a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,387.06,240.35Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,387.06,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,387.06,218.8Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,387.06,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,387.06,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,387.06,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,387.06,182.88Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,387.06,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,387.06,161.33Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,387.06,147Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,387.06,132.59Zm-3.59,132.9a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,383.47,265.49Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,383.47,258.31Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,383.47,243.94Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,383.47,236.76Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,383.47,222.39Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,383.47,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,383.47,200.84Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,383.47,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,383.47,179.29Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,383.47,164.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,383.47,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,383.47,143.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,383.47,129Zm-3.59,140.08a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,379.88,269.08Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,379.88,254.71Zm0-7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,379.88,247.53Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,379.88,233.16Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,379.88,226Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,379.88,211.61Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,379.88,197.24Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,379.88,190.06Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,379.88,175.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,379.88,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,379.88,161.33Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,379.88,154.14Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm21.55,100.57a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,401.43,247.53Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,401.43,240.35Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,401.43,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,401.43,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,401.43,218.8Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,401.43,211.61Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,401.43,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.19,1.19,0,0,0,401.43,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,401.43,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,401.43,182.88Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,401.43,175.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,401.43,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,401.43,161.33Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,401.43,154.14Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,401.43,147Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,401.43,139.77Zm0-7.4a1.7,1.7,0,0,0,0,.22,1.2,1.2,0,0,0,1.2,1.2,1.15,1.15,0,0,0,1-.61l-1-.38-.57-.21Zm-3.63,118.75a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,397.84,251.12Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,397.84,243.94Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,397.84,236.76Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,397.84,229.57Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,399,214,1.19,1.19,0,0,0,397.84,215.2Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,397.84,208Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,397.84,193.65Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,397.84,186.47Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,397.84,179.29Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,397.84,172.1Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,397.84,157.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,397.84,150.55Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,399,135,1.19,1.19,0,0,0,397.84,136.18Zm-3.59,118.53a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,394.25,254.71Zm0-7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,394.25,247.53Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,394.25,233.16Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,394.25,226Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,394.25,211.61Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,394.25,197.24Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,394.25,190.06Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,394.25,175.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,394.25,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,394.25,161.33Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,394.25,154.14Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,394.25,139.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,394.25,132.59Zm-3.6,125.72a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,390.65,258.31Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,390.65,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,390.65,243.94Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,390.65,236.76Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,390.65,229.57Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,390.65,222.39Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,390.65,215.2Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,390.65,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,390.65,200.84Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,390.65,193.65Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,390.65,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,390.65,179.29Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,390.65,172.1Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,390.65,164.92Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,390.65,157.73Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,390.65,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,390.65,143.37Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,390.65,136.18Zm.18-7.77a1.17,1.17,0,0,0-.18.59,1.19,1.19,0,0,0,1.2,1.19,1.17,1.17,0,0,0,1.15-1Zm28.56,94a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,419.39,222.39Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,419.39,215.2Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,419.39,208Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,419.39,200.84Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,419.39,193.65Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,419.39,186.47Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,419.39,179.29Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,419.39,172.1Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,419.39,164.92Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,419.39,157.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,419.39,150.55Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,419.39,143.37Zm0,86.2a1.19,1.19,0,0,0,.21.64l1.49-1.71a1.07,1.07,0,0,0-.51-.12A1.19,1.19,0,0,0,419.39,229.57Zm-3.59,3.59a1.16,1.16,0,0,0,.44.91l.75-.87,0,0,.76-.87a1.15,1.15,0,0,0-.8-.32A1.19,1.19,0,0,0,415.8,233.16Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,415.8,226Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,415.8,211.61Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,415.8,197.24Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,415.8,190.06Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,417,174.5,1.19,1.19,0,0,0,415.8,175.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,415.8,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,415.8,161.33Zm0-7.19A1.2,1.2,0,1,0,417,153,1.19,1.19,0,0,0,415.8,154.14Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,415.8,139.77Zm-3.6,89.8a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,412.2,229.57Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,412.2,222.39Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,412.2,215.2Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,412.2,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,412.2,200.84Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,412.2,193.65Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,412.2,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,412.2,179.29Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,412.2,172.1Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,412.2,164.92Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,412.2,157.73Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,412.2,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,412.2,143.37Zm0,93.39a1.21,1.21,0,0,0,.73,1.1l1.48-1.7a1.18,1.18,0,0,0-1-.6A1.2,1.2,0,0,0,412.2,236.76Zm1.2-99.38a1.23,1.23,0,0,0,.75-.28l-1.9-.71A1.17,1.17,0,0,0,413.4,137.38Zm-4.79,103a1.2,1.2,0,0,0,1.12,1.18l.08-.1.95-1.08.2-.23a1.18,1.18,0,0,0-1.15-1A1.2,1.2,0,0,0,408.61,240.35Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,408.61,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,408.61,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,408.61,218.8Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,408.61,211.61Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,408.61,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,408.61,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,408.61,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,408.61,182.88Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,408.61,175.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,408.61,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,408.61,161.33Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,408.61,154.14Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,408.61,147Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,408.61,139.77ZM405,243.94a1.2,1.2,0,0,0,1.2,1.2,1.33,1.33,0,0,0,.44-.09l.69-.8a1.07,1.07,0,0,0,.06-.31,1.2,1.2,0,1,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,405,236.76Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,405,222.39Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,405,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,405,200.84Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,405,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,405,179.29Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,405,164.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,405,150.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,405,143.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm39.51,61.06a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,444.53,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,444.53,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,444.53,182.88Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,444.53,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,444.53,161.33Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm-3.59,46.7a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,440.94,200.84Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,440.94,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,440.94,179.29Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,440.94,164.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,440.94,150.55Zm-3.59,53.88a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,437.35,197.24Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,437.35,190.06Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,437.35,175.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,437.35,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,437.35,161.33Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,437.35,154.14Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.36,1.36,0,0,0-.07-.35l-1.13-.42-.62-.23A1.17,1.17,0,0,0,437.35,147ZM433.76,208a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,433.76,208Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,433.76,193.65Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,433.76,186.47Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,433.76,179.29Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,433.76,172.1Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,433.76,157.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,433.76,150.55Zm-3.6,61.06a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,430.16,211.61Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,430.16,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,430.16,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,430.16,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,430.16,182.88Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,430.16,175.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,430.16,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,430.16,161.33Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,430.16,154.14Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,430.16,147Zm-3.59,68.24a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,426.57,208Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,426.57,200.84Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,426.57,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,426.57,179.29Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,426.57,164.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,426.57,150.55Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.16,1.16,0,0,0-.44-.91l-.76-.29A1.2,1.2,0,0,0,426.57,143.37Zm.05,78.8.79-.91A1.18,1.18,0,0,0,426.62,222.17ZM424.18,141a1,1,0,0,0,.23-.05l-.23-.08-.94-.35A1.2,1.2,0,0,0,424.18,141ZM423,226a.94.94,0,0,0,.06.29l.25-.29.89-1,.13-.16-.13,0A1.2,1.2,0,0,0,423,226Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,423,218.8Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,423,204.43Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,423,197.24Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,423,190.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,423,182.88Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,423,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,423,161.33Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,423,147Zm54,17.53.52-.58A1.18,1.18,0,0,0,476.94,164.49Zm-3.67,4a.9.9,0,0,0,0,.16l.14-.16,1-1.17,0,0h0A1.19,1.19,0,0,0,473.27,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,473.27,161.33Zm-3.59,3.59a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0,7.18a1.16,1.16,0,0,0,.15.55l1.45-1.66a1.11,1.11,0,0,0-.41-.08A1.19,1.19,0,0,0,469.68,172.1Zm1.19-13.17a1.18,1.18,0,0,0,.86-.37l-2-.75A1.19,1.19,0,0,0,470.87,158.93Zm-4.79,16.76a1.24,1.24,0,0,0,.35.85l.74-.85.11-.12.71-.81a1.13,1.13,0,0,0-.71-.26A1.19,1.19,0,0,0,466.08,175.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,466.08,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,466.08,161.33Zm-3.59,10.77a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,462.49,164.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0,21.56a1.16,1.16,0,0,0,.64,1l1.51-1.72a1.17,1.17,0,0,0-.95-.51A1.2,1.2,0,0,0,462.49,179.29Zm-3.59,3.59a1.17,1.17,0,0,0,1,1.15l.21-.23.8-.92.32-.37a1.18,1.18,0,0,0-1.12-.83A1.2,1.2,0,0,0,458.9,182.88Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,458.9,175.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,458.9,168.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,458.9,161.33Zm.07-7.52a.93.93,0,0,0-.07.33,1.19,1.19,0,0,0,2.28.49l-1.08-.4-.24-.09Zm-3.66,32.66a1.19,1.19,0,0,0,1.19,1.2,1.18,1.18,0,0,0,.27-.06l.91-1s0-.06,0-.1a1.2,1.2,0,1,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,455.31,179.29Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,455.31,172.1Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,455.31,157.73Zm-3.59,32.33a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,451.72,190.06Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,451.72,175.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,451.72,168.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,451.72,161.33Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,451.72,154.14Zm-3.6,39.51a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,448.12,193.65Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,448.12,186.47Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,448.12,179.29Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,448.12,172.1Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,448.12,164.92Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,448.12,157.73Zm.25-7.87a1.18,1.18,0,0,0-.25.69,1.19,1.19,0,0,0,2.38.1ZM82,340.21l.14-.17C82.1,340.09,82.06,340.15,82,340.21Zm39.55-46.75.08-.11Zm39.54-46.75,0,0ZM150,251.12a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,150,251.12Zm0,7.18a1.17,1.17,0,0,0,.5.95l.69-.82.11-.13.72-.85a1.16,1.16,0,0,0-.83-.34A1.19,1.19,0,0,0,150,258.3Zm3.59-3.59a1.19,1.19,0,0,0,.21.64l1.46-1.73a1.12,1.12,0,0,0-.48-.1A1.19,1.19,0,0,0,153.59,254.71Zm0-43.1a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,153.59,211.61Zm0,7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,153.59,218.79Zm0,7.19a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm10.77,3.59a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,164.36,229.57Zm7.25-21.88a1.14,1.14,0,0,0-.06.33,1.2,1.2,0,0,0,2.39,0,1.24,1.24,0,0,0-.2-.63l-1,.14Zm10.71,3.92a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,182.32,211.61ZM168,218.79a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,168,218.79ZM185.91,208a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,185.91,208Zm-7.18,14.36a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,178.73,222.38ZM168,233.16a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,168,233.16Zm22.74-27.54a1.21,1.21,0,0,0,1.1-.72l-2,.28A1.19,1.19,0,0,0,190.7,205.62Zm-37.11,41.91a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm13.1-39.16-1.13.15-1,.14a1.17,1.17,0,0,0,2.12-.29Zm12-.35a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,178.73,208Zm-18,25.14A1.2,1.2,0,1,0,162,232,1.2,1.2,0,0,0,160.77,233.16Zm21.55-14.37a1.2,1.2,0,0,0,1.2,1.2,1,1,0,0,0,.23-.05l1-1.14a0,0,0,0,0,0,0,1.2,1.2,0,0,0-2.4,0Zm-10.77,10.78a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm-18,3.59a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,153.59,233.16Zm3.59,3.59a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm32.33-25.14a1.18,1.18,0,0,0,.49.94l1.53-1.8a1.19,1.19,0,0,0-2,.86ZM193.1,208a1.27,1.27,0,0,0,.2.63l.54-.63.45-.55.48-.55a1.29,1.29,0,0,0-.48-.1A1.19,1.19,0,0,0,193.1,208Zm-18,10.77a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,175.14,218.79Zm10.77-3.59a1.18,1.18,0,0,0,.89,1.13l.31-.36.65-.77.43-.5a1.19,1.19,0,0,0-2.28.5ZM160.77,226a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,160.77,226Zm18-10.78a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,178.73,215.2Zm-7.18,7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,171.55,222.38Zm-14.37,0a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,157.18,222.38Zm3.59,18a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-28.73a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,160.77,211.61Zm10.78,3.59a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,171.55,215.2Zm25.18-11a1.3,1.3,0,0,0,0,.21,1,1,0,0,0,0,.17l.36-.43Zm-21.59,7.39a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,175.14,211.61Zm-21.55,28.73a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,153.59,240.34ZM168,226a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm-7.19-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm-3.59-3.59a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,157.18,215.2Zm7.18,7.18a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,164.36,222.38Zm0,14.37a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,164.36,236.75Zm-7.18,7.19a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,157.18,243.94Zm0-14.37a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,157.18,229.57Zm10.78-18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,168,211.61Zm-3.6,3.59a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,164.36,215.2ZM175.14,226a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,175.14,226Zm-18,25.14a1,1,0,0,0,0,.18l.15-.18,1-1.19h0A1.2,1.2,0,0,0,157.18,251.12ZM150,243.94a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,150,236.75Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,150,222.38Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,150,215.2Zm-3.6,39.51a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,146.4,254.71Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,146.4,247.53Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,146.4,240.34Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,146.4,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,146.4,226Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,146.4,218.79Zm0,43.11a1.19,1.19,0,0,0,.9,1.13l1.38-1.63a1.19,1.19,0,0,0-2.28.5Zm.1-50.75a1.19,1.19,0,0,0-.1.46,1.2,1.2,0,1,0,2.4,0,1.23,1.23,0,0,0-.28-.74Zm-3.69,54.34a1.19,1.19,0,0,0,1.2,1.19,2,2,0,0,0,.24,0l.95-1.13v0a1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,142.81,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,142.81,243.94Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,142.81,229.57Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,142.81,222.38Zm0-7.18A1.2,1.2,0,1,0,144,214,1.2,1.2,0,0,0,142.81,215.2Zm-3.59,53.88a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,139.22,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,139.22,261.9Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,139.22,247.53Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,139.22,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,139.22,226Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm2.35-7-2.21.31a1.17,1.17,0,0,0,2.21-.31Zm-5.94,60.84a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,135.63,272.67Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,135.63,265.49Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,135.63,258.3Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,135.63,251.12Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,135.63,243.94Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,135.63,236.75Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,135.63,229.57Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,135.63,222.38Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,135.63,215.2ZM132,276.26a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,132,276.26Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,132,269.08Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,132,261.9Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,132,254.71Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,132,240.34Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,132,233.16Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,132,218.79Zm-3.6,61.06a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,128.44,279.85Zm0-7.18a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,128.44,272.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,128.44,265.49Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,128.44,258.3Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,128.44,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,128.44,243.94Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,128.44,236.75Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,128.44,229.57Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,128.44,222.38Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,128.44,215.2Zm-3.59,68.25a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,124.85,283.45Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,124.85,276.26Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,124.85,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,124.85,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,124.85,254.71Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,124.85,247.53Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,124.85,240.34Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,124.85,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,124.85,226Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,124.85,218.79ZM121.26,287a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,121.26,287Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,121.26,279.85Zm0-7.18a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,121.26,265.49Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,121.26,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,121.26,243.94Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,121.26,229.57Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,121.26,222.38Zm.18-7.77a1.17,1.17,0,0,0-.18.59,1.2,1.2,0,1,0,2-.85l-.84.12Zm-3.77,76a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,117.67,290.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,117.67,283.45Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,117.67,276.26Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,117.67,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,117.67,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,117.67,254.71Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,117.67,247.53Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,117.67,240.34Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,117.67,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,117.67,226Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,117.67,218.79Zm0,79a1.42,1.42,0,0,0,0,.2l1.17-1.39h0A1.19,1.19,0,0,0,117.67,297.81Zm-1.22-82.51-1.18.16-1.11.15a1.18,1.18,0,0,0,2.29-.31Zm-2.37,86.11a1.19,1.19,0,0,0,.21.64l.54-.64.44-.52.49-.57a1.14,1.14,0,0,0-.49-.11A1.19,1.19,0,0,0,114.08,301.41Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,114.08,294.22Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,114.08,279.85Zm0-7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,114.08,272.67Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,114.08,258.3Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,114.08,251.12Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,114.08,236.75Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,114.08,222.38Zm-3.59,75.43a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,110.49,297.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,110.49,290.63Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,110.49,276.26Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,110.49,269.08Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,110.49,261.9Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,110.49,254.71Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,110.49,240.34Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,110.49,233.16Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,110.49,218.79Zm0,86.21a1.17,1.17,0,0,0,.5.95l1.53-1.81a1.2,1.2,0,0,0-2,.86Zm-3.6,3.59a1.19,1.19,0,0,0,.9,1.14l.3-.35.67-.79.41-.49a1.19,1.19,0,0,0-1.08-.71A1.2,1.2,0,0,0,106.89,308.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,106.89,301.41Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,106.89,294.22Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,106.89,287Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,106.89,279.85Zm0-7.18a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,106.89,272.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,106.89,265.49Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,106.89,258.3Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,106.89,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,106.89,243.94Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,106.89,236.75Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,106.89,229.57Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,106.89,222.38Zm-3.59,89.8a1.2,1.2,0,0,0,1.2,1.2,1.11,1.11,0,0,0,.25-.05l.94-1.11v0a1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,103.3,305Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,103.3,297.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,103.3,290.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,103.3,283.45Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,103.3,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,103.3,261.9Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,103.3,247.53Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,103.3,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,103.3,226Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm-3.59,97a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,99.71,315.77Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,99.71,308.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,99.71,301.41Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,99.71,294.22Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,99.71,287Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.19,1.19,0,0,0,99.71,279.85Zm0-7.18a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,99.71,272.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,99.71,265.49Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,99.71,258.3Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,99.71,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,99.71,243.94Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,99.71,236.75Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,99.71,229.57Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.19,1.19,0,0,0,99.71,222.38Zm-3.59,97a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,97.31,311,1.19,1.19,0,0,0,96.12,312.18Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,96.12,297.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,96.12,290.63Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,96.12,276.26Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,96.12,269.08Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,96.12,261.9Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,96.12,254.71Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,96.12,240.34Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,96.12,233.16Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm.27-7.92a1.18,1.18,0,0,0,.92,1.93,1.2,1.2,0,0,0,1.2-1.2,1.17,1.17,0,0,0-.51-.95ZM92.53,323a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,92.53,315.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,92.53,308.59Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,93.72,293,1.19,1.19,0,0,0,92.53,294.22Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,92.53,279.85Zm0-7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,92.53,272.67Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,92.53,258.3Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,92.53,251.12Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,92.53,236.75Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,92.53,222.38Zm-3.6,104.17a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,88.93,326.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,88.93,319.37Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,88.93,312.18Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,88.93,305Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,88.93,297.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,88.93,290.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,88.93,283.45Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,88.93,276.26Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,88.93,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,88.93,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,88.93,254.71Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,88.93,247.53Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,88.93,240.34Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,88.93,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,88.93,226Zm2.4-7.19s0,0,0,0l-2.33.32a1.18,1.18,0,0,0,1.14.91A1.2,1.2,0,0,0,91.33,218.79Zm-6,111.35a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,85.34,323Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,85.34,308.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,85.34,301.41Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,85.34,287Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,85.34,279.85Zm0-7.18a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,85.34,265.49Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,85.34,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,85.34,243.94Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,85.34,229.57Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,85.34,222.38ZM83,220a1.09,1.09,0,0,0,.54-.15l-.76.11A1.7,1.7,0,0,0,83,220Zm-1.2,113.74a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,81.75,326.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,81.75,319.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,81.75,305Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,81.75,297.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,81.75,290.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,81.75,283.45Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,81.75,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,81.75,261.9Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,81.75,247.53Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18A1.2,1.2,0,1,0,83,232,1.2,1.2,0,0,0,81.75,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,81.75,226ZM78.16,344.51a1.42,1.42,0,0,0,0,.2l.17-.2,1-1.17,0,0h0A1.19,1.19,0,0,0,78.16,344.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,78.16,337.33Zm0-7.19A1.2,1.2,0,1,0,79.35,329,1.19,1.19,0,0,0,78.16,330.14Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,78.16,315.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,78.16,308.59Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,79.35,293,1.19,1.19,0,0,0,78.16,294.22Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,78.16,279.85Zm0-7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,78.16,272.67Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,78.16,258.3Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,78.16,251.12Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,78.16,236.75Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,78.16,222.38ZM74.57,340.92a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,74.57,333.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,74.57,326.55Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,75.76,311,1.19,1.19,0,0,0,74.57,312.18Zm0-7.18A1.2,1.2,0,0,0,77,305a1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,74.57,297.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,74.57,290.63Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,74.57,276.26Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,74.57,269.08Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,74.57,261.9Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,74.57,254.71Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,74.57,240.34Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,74.57,233.16Zm0-7.18A1.2,1.2,0,0,0,77,226a1.2,1.2,0,1,0-2.39,0Zm0,122.12a1.2,1.2,0,0,0,.21.65L76.25,347a1.3,1.3,0,0,0-.49-.11A1.19,1.19,0,0,0,74.57,348.1ZM71,351.69a1.19,1.19,0,0,0,.51,1l.69-.81.12-.15.72-.85a1.2,1.2,0,0,0-2,.85Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,71,344.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,71,337.33Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,71,330.14ZM71,323a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,71,323Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,71,315.77Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,71,308.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,71,301.41Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,71,294.22ZM71,287a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,71,287Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,71,279.85Zm0-7.18a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,71,272.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,71,265.49Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,71,258.3Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,71,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,71,243.94Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,71,236.75Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,71,229.57Zm.39-8a1.18,1.18,0,0,0-.39.86,1.2,1.2,0,1,0,1.74-1l-.54.07Zm-4,126.58a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,67.38,348.1Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,67.38,340.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,67.38,326.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,67.38,319.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,67.38,305Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,67.38,297.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,67.38,290.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,67.38,283.45Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,67.38,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,67.38,261.9Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,67.38,247.53Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,67.38,233.16Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,67.38,226Zm0,129.3a1.18,1.18,0,0,0,.91,1.14l1.38-1.62a1.2,1.2,0,0,0-2.29.48Zm-1.2-132.9a1,1,0,0,0,0-.15l-1.09.15H65l-1.17.16a1.19,1.19,0,0,0,2.36-.17Zm-2.39,136.5A1.12,1.12,0,0,0,65.25,360l.92-1.09a.43.43,0,0,1,0-.05,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,63.79,344.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,63.79,337.33Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,63.79,323Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,63.79,308.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,63.79,301.41Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,63.79,287Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,63.79,279.85Zm0-7.18a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,63.79,265.49Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,63.79,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,63.79,243.94Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,63.79,229.57ZM60.2,362.47a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,362.47Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,60.2,355.28Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,348.1Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,340.92Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,60.2,333.73Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,326.55Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,319.37Zm0-7.19A1.2,1.2,0,1,0,61.39,311,1.19,1.19,0,0,0,60.2,312.18Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,305Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,60.2,297.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,290.63Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,283.45Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,60.2,276.26Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,269.08Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,261.9Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,60.2,254.71Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,247.53Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,60.2,240.34Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,233.16Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,60.2,226Zm-2.4-2.4a1.2,1.2,0,0,0,.78-.3l-.78.11-.51.07A1.27,1.27,0,0,0,57.8,223.58ZM56.61,366.06a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,56.61,366.06Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,56.61,351.69Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,56.61,344.51Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,56.61,337.33Zm0-7.19A1.2,1.2,0,1,0,57.8,329,1.19,1.19,0,0,0,56.61,330.14Zm0-7.18A1.2,1.2,0,0,0,59,323a1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,56.61,315.77Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,56.61,308.59Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19A1.2,1.2,0,1,0,57.8,293,1.19,1.19,0,0,0,56.61,294.22Zm0-7.18A1.2,1.2,0,0,0,59,287a1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,56.61,279.85Zm0-7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,56.61,272.67Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,56.61,258.3Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,56.61,251.12Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,56.61,236.75Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0ZM53,369.65a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,53,369.65Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,53,362.47Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,53,355.28Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,53,348.1Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,53,340.92Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,53,333.73Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,53,326.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,53,319.37Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,53,312.18ZM53,305a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,53,305Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,53,297.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,53,290.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,53,283.45Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,53,276.26Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,53,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,53,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,53,254.71Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,53,247.53Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,53,240.34Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,53,233.16ZM53,226a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,53,226ZM50.62,372.05a1,1,0,0,0-.44.09l.21,1.1.23,1.19h0a1.2,1.2,0,1,0,0-2.39Zm-1.2-6a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,49.42,366.06Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,49.42,358.88Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,49.42,351.69Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,49.42,344.51Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,49.42,337.33Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,49.42,330.14Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,49.42,323Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,49.42,315.77Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,49.42,308.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,49.42,301.41Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,49.42,294.22Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,49.42,287Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,49.42,279.85Zm0-7.18a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,49.42,272.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,49.42,265.49Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,49.42,258.3Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,49.42,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,49.42,243.94Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,49.42,236.75Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,49.42,229.57ZM45.83,348.1a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,45.83,348.1Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,45.83,340.92Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,45.83,326.55Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,45.83,319.37Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,45.83,305Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,45.83,297.81Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,45.83,290.63Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,45.83,283.45Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,45.83,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,45.83,261.9Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,45.83,247.53Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18A1.2,1.2,0,1,0,47,232,1.2,1.2,0,0,0,45.83,233.16ZM47,354.09a1.2,1.2,0,0,0-.32.06l.45,2.3a1.17,1.17,0,0,0,1.06-1.17A1.19,1.19,0,0,0,47,354.09ZM45.83,226a1.2,1.2,0,1,0,1.47-1.15l-.85.12A1.2,1.2,0,0,0,45.83,226ZM43.44,336.13a1.06,1.06,0,0,0-.19,0l.19.95,0,.21.22,1.14a1.18,1.18,0,0,0,.93-1.14A1.19,1.19,0,0,0,43.44,336.13Zm-1.2-6a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,42.24,330.14Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,42.24,323Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,42.24,315.77Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,42.24,308.59Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,42.24,301.41Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,42.24,294.22Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,42.24,287Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.19,1.19,0,0,0,42.24,279.85Zm0-7.18a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,42.24,272.67Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,42.24,265.49Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,42.24,258.3Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,42.24,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,42.24,243.94Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,42.24,236.75Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,42.24,229.57Zm-2.4,88.6h-.05l.44,2.3a1.17,1.17,0,0,0,.81-1.11A1.2,1.2,0,0,0,39.84,318.17Zm-1.19-6A1.2,1.2,0,1,0,39.84,311,1.19,1.19,0,0,0,38.65,312.18Zm0-7.18A1.2,1.2,0,0,0,41,305a1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,38.65,297.81Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,38.65,290.63Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,38.65,276.26Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,38.65,269.08Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,38.65,261.9Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,38.65,254.71Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,38.65,240.34Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,38.65,233.16ZM41,226a.76.76,0,0,0-.06-.27l-2.32.32a1.18,1.18,0,0,0,1.18,1.14A1.19,1.19,0,0,0,41,226Zm-4.71,74.25.23,1.18.2,1.07a1.18,1.18,0,0,0-.43-2.25Zm-1.21-6.31.06.3.13.71a1.18,1.18,0,0,0,.94.49,1.2,1.2,0,1,0,0-2.39A1.17,1.17,0,0,0,35.12,293.92ZM35.06,287a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,35.06,279.85Zm0-7.18a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,35.06,272.67Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,35.06,258.3Zm0-7.18a1.2,1.2,0,1,0,1.19-1.2A1.19,1.19,0,0,0,35.06,251.12Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0Zm0-7.19a1.2,1.2,0,1,0,1.19-1.19A1.19,1.19,0,0,0,35.06,236.75Zm0-7.18a1.2,1.2,0,0,0,2.39,0,1.2,1.2,0,1,0-2.39,0ZM32.88,282.3l.41,2.14a1.2,1.2,0,0,0,.57-1A1.17,1.17,0,0,0,32.88,282.3Zm-1.42-13.22a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,31.46,269.08Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,31.46,261.9Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,31.46,254.71Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,31.46,247.53Zm0-7.19a1.2,1.2,0,1,0,1.2-1.19A1.2,1.2,0,0,0,31.46,240.34Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,31.46,233.16Zm1.2-6a1.19,1.19,0,0,0,.91-.44l-1.57.21A1.1,1.1,0,0,0,32.66,227.17Zm-1,48.55.28,1.44a1.17,1.17,0,0,0,.77.3,1.2,1.2,0,1,0,0-2.39A1.19,1.19,0,0,0,31.61,275.72Zm-2.18-11.36.21,1.13.18.91a1.18,1.18,0,0,0-.39-2Zm-1.31-6.76.14.7.19,1a1.12,1.12,0,0,0,.62.2,1.2,1.2,0,0,0,0-2.39A1.18,1.18,0,0,0,28.12,257.6Zm-.25-6.48a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,27.87,251.12Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,27.87,243.94Zm0-7.19a1.2,1.2,0,1,0,2.39,0,1.2,1.2,0,0,0-2.39,0Zm0-7.18a1.2,1.2,0,1,0,1.2-1.2A1.19,1.19,0,0,0,27.87,229.57ZM26,246.45l.36,1.89a1.17,1.17,0,0,0,.33-.81A1.2,1.2,0,0,0,26,246.45Zm-1.7-13.29a1.2,1.2,0,1,0,1.2-1.2A1.2,1.2,0,0,0,24.28,233.16Zm1.2,6a1.19,1.19,0,0,0-.84.34l.37,2a1.23,1.23,0,0,0,.47.09,1.2,1.2,0,0,0,0-2.39Zm-2.94-10.56.19,1,.12.66a1.1,1.1,0,0,0,.23-.66A1.19,1.19,0,0,0,22.54,228.59Z"
              style="fill: #dbdbdb"
            ></path>
          </g>
          <g id="freepik--Desk--inject-6">
            <polygon
              points="30.76 422.76 85.57 422.52 140.38 422.43 250 422.27 359.62 422.43 414.43 422.52 469.24 422.76 414.43 423.01 359.62 423.1 250 423.26 140.38 423.1 85.57 423.01 30.76 422.76"
              style="fill: #263238"
            ></polygon>
          </g>
          <g id="freepik--Gears--inject-6">
            <path
              d="M472.38,322.39l-5.64-9.48.2,0-3.06,1.82A2.84,2.84,0,0,1,462,315a2.8,2.8,0,0,1-.88-.35l-.77-.43-.77-.43a2.84,2.84,0,0,1-.76-.58,2.87,2.87,0,0,1-.78-1.75l0-3.56.29.29-11,.08.37-.37,0,3.57A3.07,3.07,0,0,1,446.1,314l-.76.44-.75.44a2.93,2.93,0,0,1-.95.39,3,3,0,0,1-2-.23l-3.1-1.77.6-.16-5.48,9.56-.17-.64,3.09,1.79a3,3,0,0,1,1.23,1.65,3,3,0,0,1,.14,1l0,.88,0,.87a3.25,3.25,0,0,1-.14,1,3,3,0,0,1-1.23,1.66l-3.09,1.8.19-.68,5.48,9.56-.65-.17,3.11-1.77a3,3,0,0,1,2-.24,3.37,3.37,0,0,1,1,.4l.75.44.75.43a3,3,0,0,1,.82.64,3.06,3.06,0,0,1,.81,1.87v3.57l-.44-.44,11,0-.39.39,0-3.57a3,3,0,0,1,.8-1.81,2.85,2.85,0,0,1,.79-.6l.76-.44.77-.43a3,3,0,0,1,.92-.37,2.91,2.91,0,0,1,1.94.24l3.07,1.79-.4.11,5.61-9.49.06.25-3-1.82a2.73,2.73,0,0,1-1.06-1.48,5.7,5.7,0,0,1-.07-1.79,5.37,5.37,0,0,1,.12-1.78,2.62,2.62,0,0,1,1.07-1.42Zm0,0-3,1.81a2.55,2.55,0,0,0-1,1.38,5.3,5.3,0,0,0-.07,1.74,5.8,5.8,0,0,0,.11,1.73,2.43,2.43,0,0,0,1,1.31l3.08,1.73.16.09-.1.16-5.41,9.6-.14.26-.26-.15-3.07-1.73a2.24,2.24,0,0,0-1.51-.16,2.11,2.11,0,0,0-.71.3l-.77.45-.77.46a2.16,2.16,0,0,0-.61.47,2.26,2.26,0,0,0-.58,1.37l0,3.52v.4h-.4l-11,0h-.44v-.44l0-3.51a2.17,2.17,0,0,0-.57-1.32,2.12,2.12,0,0,0-.59-.44l-.78-.45-.77-.45a2.15,2.15,0,0,0-2.1-.11l-3,1.76-.41.24-.24-.41-5.53-9.54-.25-.43.43-.25,3.05-1.76a2.05,2.05,0,0,0,.84-1.12,2.5,2.5,0,0,0,.1-.72l0-.9,0-.9a2.19,2.19,0,0,0-.09-.72,2.06,2.06,0,0,0-.84-1.14l-3-1.77-.4-.23.23-.41,5.53-9.53.22-.38.38.22,3,1.76a2.17,2.17,0,0,0,1.44.17,2.09,2.09,0,0,0,.69-.28l.78-.45.78-.44a2.42,2.42,0,0,0,.6-.45,2.21,2.21,0,0,0,.59-1.34l0-3.52v-.38h.37l11,.08h.3v.29l0,3.52a2.3,2.3,0,0,0,.62,1.44,2.36,2.36,0,0,0,.63.5l.76.45.77.46a2.27,2.27,0,0,0,.75.32,2.36,2.36,0,0,0,1.59-.16l3.09-1.72.12-.07.07.12Z"
              style="fill: #263238"
            ></path>
            <path
              d="M461.84,327.32A9.28,9.28,0,0,1,446.12,334a9.28,9.28,0,0,1,6.69-16,9.27,9.27,0,0,1,9,9.28Zm0,0a8.76,8.76,0,0,0-9-8.78,8.78,8.78,0,1,0,9,8.78Z"
              style="fill: #263238"
            ></path>
            <path
              d="M74.15,271.4l-5.63-9.47.19.05-3.06,1.81a2.85,2.85,0,0,1-2.74-.12l-.77-.43-.76-.43a2.74,2.74,0,0,1-.77-.58,2.87,2.87,0,0,1-.78-1.75l0-3.56.29.29-11,.08.37-.37,0,3.57a3,3,0,0,1-.79,1.85,3.19,3.19,0,0,1-.8.62l-.76.44-.75.44a2.93,2.93,0,0,1-1,.39,3,3,0,0,1-2-.22l-3.1-1.78.6-.16-5.48,9.56-.17-.63,3.09,1.78a3.07,3.07,0,0,1,1.23,1.65,3,3,0,0,1,.14,1l0,.87,0,.88a3.32,3.32,0,0,1-.14,1,3.09,3.09,0,0,1-1.23,1.66l-3.09,1.8.19-.68,5.48,9.56-.65-.18,3.11-1.77a3,3,0,0,1,2-.23,3.08,3.08,0,0,1,1,.39l.75.44.75.44a2.81,2.81,0,0,1,.82.63,3,3,0,0,1,.81,1.87v3.57l-.44-.43,11,0-.39.39,0-3.56a3,3,0,0,1,.8-1.82,3.3,3.3,0,0,1,.79-.6l.76-.43.77-.44a3,3,0,0,1,2.86-.13l3.07,1.8-.4.11,5.61-9.5.06.25-3-1.81a2.73,2.73,0,0,1-1.06-1.48,5.77,5.77,0,0,1-.07-1.8,5.39,5.39,0,0,1,.12-1.78,2.6,2.6,0,0,1,1.07-1.41Zm0,0-3,1.81a2.55,2.55,0,0,0-1,1.38,5.33,5.33,0,0,0-.07,1.74,5.8,5.8,0,0,0,.11,1.73,2.49,2.49,0,0,0,1,1.32l3.08,1.73.16.09-.1.16L68.89,291l-.14.25-.26-.14-3.07-1.74a2.3,2.3,0,0,0-1.51-.16,2.34,2.34,0,0,0-.71.3l-.77.45-.77.46a2.16,2.16,0,0,0-.61.47,2.29,2.29,0,0,0-.58,1.38l0,3.51v.4h-.4l-11,0h-.44v-.45l0-3.51a2.12,2.12,0,0,0-.57-1.31,2.37,2.37,0,0,0-.59-.45l-.78-.45-.77-.45a2.1,2.1,0,0,0-.68-.27,2.16,2.16,0,0,0-1.42.16l-3,1.76-.41.24-.24-.41-5.53-9.53-.25-.44.43-.25,3.05-1.75a2.08,2.08,0,0,0,.84-1.13,2.5,2.5,0,0,0,.1-.72l0-.9,0-.9a2.19,2.19,0,0,0-.09-.72,2.14,2.14,0,0,0-.84-1.14l-3-1.77-.4-.23.23-.4,5.53-9.53.22-.39.38.22,3,1.77a2.23,2.23,0,0,0,1.44.16,2.09,2.09,0,0,0,.69-.28l.78-.45.78-.44a2.42,2.42,0,0,0,.6-.45,2.16,2.16,0,0,0,.59-1.34l0-3.52v-.37h.37l11,.08h.3v.29l0,3.53a2.32,2.32,0,0,0,.62,1.44,2.54,2.54,0,0,0,.63.49l.76.46.77.45a2.27,2.27,0,0,0,.75.32,2.3,2.3,0,0,0,1.59-.16l3.09-1.72.12-.07.07.12Z"
              style="fill: #263238"
            ></path>
            <path
              d="M63.61,276.33A9.29,9.29,0,1,1,61,269.9,9.31,9.31,0,0,1,63.61,276.33Zm0,0a8.78,8.78,0,0,0-17.56,0,8.78,8.78,0,1,0,17.56,0Z"
              style="fill: #263238"
            ></path>
            <path
              d="M67.48,216.72a4.89,4.89,0,0,1,3.58,3.64c.12.48.25,1,.4,1.45s.31,1,.47,1.45a4.83,4.83,0,0,1-1,5l-4.3,4.58,14.9,14,4.33-4.6A4.83,4.83,0,0,1,90.81,241a28.44,28.44,0,0,0,2.9.69A4.9,4.9,0,0,1,97.58,245l1.81,6L119,245.09l-1.81-6a4.92,4.92,0,0,1,1.36-4.95c.72-.7,1.4-1.42,2-2.18a4.83,4.83,0,0,1,4.79-1.66l6.16,1.44,4.66-19.91L130,210.4a4.81,4.81,0,0,1-3.54-3.54q-.19-.77-.42-1.53c-.15-.51-.32-1-.5-1.51a4.78,4.78,0,0,1,1-4.93l4.3-4.57-14.9-14-4.28,4.57a4.81,4.81,0,0,1-4.84,1.33,26.5,26.5,0,0,0-3.17-.74,4.77,4.77,0,0,1-3.72-3.35l-1.81-6L78.57,182l1.81,6A4.91,4.91,0,0,1,79,193a28,28,0,0,0-2,2.18,4.86,4.86,0,0,1-4.81,1.66L66,195.39l-4.67,19.9Zm24.39-18.43a16.75,16.75,0,1,1-9.63,18A16.77,16.77,0,0,1,91.87,198.29Z"
              style="fill: #455a64"
            ></path>
          </g>
          <g id="freepik--Character--inject-6">
            <path
              d="M149.14,212.79c-2.27.31-12.16-.74-18.67,8.31-6.16,8.56-8.1,34.45-9.38,40.1s-8.67,6.56-10.35,13.12c-1.44,5.65,2.68,7.67,3.14,11.8.35,3.2-2.82,8,.14,12.74,2.7,4.29,7.37,3.33,10.2,4.65s4.66,7.84,9.9,9.56,9.81-3.1,12.58-3.1,6.14,8.48,15.18,7.65,11.58-8.51,15.3-10.06,13.12,1,17.36-3.73,4.91-10.95,6.82-13.26,5.94-2,8.29-7.32S207,274.6,206.29,270c-.52-3.2,2.3-6.18.25-11.06-2.82-6.71-11-5.19-14.26-12.08-2.51-5.4-7.84-28.94-22.15-34.62C160.25,208.33,149.14,212.79,149.14,212.79Z"
              style="fill: #263238"
            ></path>
            <path
              d="M121.35,259.84A8.18,8.18,0,0,1,119,262.9L116,265.47a24.38,24.38,0,0,0-5.16,5.55,7.8,7.8,0,0,0-.8,6.88A11.8,11.8,0,0,0,112,281a13.94,13.94,0,0,1,2.26,3.41,6.68,6.68,0,0,1-.32,4.26c-.41,1.26-.87,2.45-1.21,3.67a9.21,9.21,0,0,0,.31,7.08,5.29,5.29,0,0,0,2.49,2.41,9.72,9.72,0,0,0,3.62.75c1.27.08,2.57,0,3.87,0a6.58,6.58,0,0,1,3.78.82A7,7,0,0,0,123,303c-1.28.11-2.57.27-3.89.3a10.19,10.19,0,0,1-4-.61A6.39,6.39,0,0,1,112,300c-1.55-2.42-1.3-5.49-.61-8,.34-1.29.79-2.52,1.15-3.73a5.43,5.43,0,0,0,.29-3.34c-.8-2.06-3.15-3.88-4.06-6.56a8.75,8.75,0,0,1,1.11-8,25,25,0,0,1,5.66-5.5l3.13-2.31A8.91,8.91,0,0,0,121.35,259.84Z"
              style="fill: #263238"
            ></path>
            <path
              d="M183.44,225.42c2.51,4,4.08,8.36,6.06,12.53,1,2.09,1.91,4.21,3,6.18a15.09,15.09,0,0,0,1.89,2.72,2.14,2.14,0,0,0,.54.51,2.89,2.89,0,0,0,.62.4c.49.25,1,.48,1.53.7a66.84,66.84,0,0,1,6.4,2.89,11.9,11.9,0,0,1,5.14,5.06,7.38,7.38,0,0,1,.76,3.62,9.6,9.6,0,0,1-1,3.46,14.92,14.92,0,0,0-2.1,6.51c-.31-2.35.61-4.67,1.43-6.79a8.79,8.79,0,0,0,.76-3.22,6.45,6.45,0,0,0-.83-3.07,11.57,11.57,0,0,0-4.79-4.39,66,66,0,0,0-6.32-2.71c-.54-.24-1.08-.49-1.62-.78a5.36,5.36,0,0,1-1.54-1.23,16.35,16.35,0,0,1-2-3,55.37,55.37,0,0,1-2.91-6.39L186,231.88A62.85,62.85,0,0,0,183.44,225.42Z"
              style="fill: #263238"
            ></path>
            <path
              d="M203.56,289c-1,1.34-1.09,3.08-1.45,4.68s-.67,3.26-1.09,4.88a24.35,24.35,0,0,1-1.69,4.81,11.06,11.06,0,0,1-3.28,4.14c-3.14,2-6.89,1.85-10.14,1.28-1.66-.28-3.28-.66-4.9-.91a10.28,10.28,0,0,0-4.87.07,9.62,9.62,0,0,1,5-.79c1.68.11,3.33.36,5,.5,3.21.32,6.64.33,9.15-1.37a9.74,9.74,0,0,0,2.87-3.56,30.7,30.7,0,0,0,1.86-4.49c.54-1.55,1-3.15,1.47-4.74.26-.79.52-1.59.83-2.37A4.77,4.77,0,0,1,203.56,289Z"
              style="fill: #263238"
            ></path>
            <path
              d="M166.69,317.69c8,33.5,25,75.55,37.26,83.85,9.88,6.7,61.16,17.74,64,18,7.06.55,19.85-49.51,12.51-51.36-9.25-2.35-53-2.73-55.55-5.23s-22.8-29.58-41.37-54.14C170.74,291.83,160,289.91,166.69,317.69Z"
              style="fill: #ad6359"
            ></path>
            <path
              d="M262.25,416.92c.85.41,12.89,6.13,20.3,8.1,5.53,1.47,21.57,5.28,23.79-.65,1.52-4-7.64-7.39-14.07-9.9-3.39-1.32-7.6-4.74-6.66-6.92,1.64-3.81,10.37-.22,16.12,2.95,11.13,6.14,26,17.3,32.6,11.58,2.49-2.16-.54-5.93-4.94-9.6,7.09,4.23,14.63,7.66,17.49,5.36,1.64-1.3,1.68-3,.7-5,2.18.65,4.08.47,5.38-1,2.22-2.43,1-5.91-1.53-9.45a2.74,2.74,0,0,0,2-1.41c4.65-7.44-19.91-28-28.28-29.75-24.64-5.28-50.66-2.57-50.66-2.57C265.07,376.58,262.23,416.9,262.25,416.92Z"
              style="fill: #ad6359"
            ></path>
            <path
              d="M297.78,393.56a41.58,41.58,0,0,1,16.49,5.92c6.3,4,10.53,8.67,15.85,13.39.14.12-.05.34-.19.22-2.53-2.24-13-10.65-15.72-12.55a39.57,39.57,0,0,0-16.45-6.88C297.7,393.65,297.72,393.55,297.78,393.56Z"
              style="fill: #263238"
            ></path>
            <path
              d="M302.11,383.06c6.48,1.61,13.12,3.25,19.17,6.16,6.62,3.19,11.86,8.51,17,13.62q4.63,4.62,9.07,9.43c.12.13-.06.35-.19.22q-7.85-7.94-16.16-15.39a52.23,52.23,0,0,0-17.58-10.54c-3.72-1.32-7.53-2.36-11.34-3.39C302,383.15,302,383,302.11,383.06Z"
              style="fill: #263238"
            ></path>
            <path
              d="M308.79,373.81c6.29,1.14,11.77,2.12,17.39,5.35,7.43,4.27,14.68,11.6,17.23,14.19,2.81,2.87,5.52,5.83,8.18,8.83.11.12-.1.31-.21.19a210.29,210.29,0,0,0-19.51-18.48,41.34,41.34,0,0,0-10.83-6.7,75.06,75.06,0,0,0-12.26-3.34S308.76,373.8,308.79,373.81Z"
              style="fill: #263238"
            ></path>
            <path
              d="M266.57,365.12l8.9,60.69s-62.21-10.47-76.19-25-33-61.26-35.88-89.29,4.3-25.67,20.54-5.27,39.17,52.36,42.25,54.15S266.57,365.12,266.57,365.12Z"
              style="fill: var(--primary)"
            ></path>
            <path
              d="M167.86,332.76l-.27.06,0-.13ZM233,402.88a2,2,0,0,1,1,.28,1.78,1.78,0,0,1,.87,1.49,2.29,2.29,0,0,0,1.39,2.12,4,4,0,0,0,2.38-.09c-.38-.1-.75-.14-1.13-.21a1.88,1.88,0,0,1-.94-.31,1.78,1.78,0,0,1-.81-1.53,2.28,2.28,0,0,0-1.48-2.09,4.44,4.44,0,0,0-2.36.12C232.29,402.76,232.67,402.81,233,402.88Zm37.63-9.83a6.56,6.56,0,0,0-1.79.24c.38.1.76.14,1.13.21a2.3,2.3,0,0,1,.75.17ZM202.47,378a1.87,1.87,0,0,1,.95.28,1.76,1.76,0,0,1,.87,1.48,2.3,2.3,0,0,0,1.4,2.13,4,4,0,0,0,2.37-.09c-.37-.1-.75-.14-1.12-.22a1.84,1.84,0,0,1-.94-.3,1.81,1.81,0,0,1-.82-1.53,2.28,2.28,0,0,0-1.47-2.09,4.47,4.47,0,0,0-2.37.12C201.72,377.88,202.09,377.93,202.47,378Zm-14.1-14.63a2,2,0,0,1-.87.48,1.76,1.76,0,0,1-1.67-.44,2.27,2.27,0,0,0-2.49-.51c-.87.38-1.18,1.13-1.62,1.74.34-.2.64-.43,1-.64a1.82,1.82,0,0,1,2.53.05,2.28,2.28,0,0,0,2.52.44,4.49,4.49,0,0,0,1.59-1.76C189,362.92,188.69,363.16,188.37,363.37Zm46,4.27a1.93,1.93,0,0,1-.88.48,1.77,1.77,0,0,1-1.66-.43,2.29,2.29,0,0,0-2.49-.52c-.87.38-1.18,1.13-1.62,1.74.34-.19.64-.43.95-.64a1.86,1.86,0,0,1,.88-.45,1.78,1.78,0,0,1,1.66.5,2.26,2.26,0,0,0,2.52.44,4.43,4.43,0,0,0,1.59-1.76C234.94,367.19,234.64,367.43,234.33,367.64Zm-16.93,32a2,2,0,0,1-.88.48,1.74,1.74,0,0,1-1.66-.43,2.29,2.29,0,0,0-2.49-.52c-.87.38-1.19,1.13-1.62,1.74.34-.19.63-.43.95-.64a1.81,1.81,0,0,1,.88-.45,1.79,1.79,0,0,1,1.66.51,2.27,2.27,0,0,0,2.52.43,4.4,4.4,0,0,0,1.58-1.76C218,399.21,217.71,399.45,217.4,399.66Zm36.08-7a2.08,2.08,0,0,1-.88.48,1.77,1.77,0,0,1-1.66-.44,2.29,2.29,0,0,0-2.49-.52c-.87.38-1.19,1.13-1.62,1.74.34-.19.63-.42.95-.64a1.9,1.9,0,0,1,.88-.45,1.81,1.81,0,0,1,1.66.51,2.29,2.29,0,0,0,2.52.44,4.42,4.42,0,0,0,1.58-1.77C254.09,392.21,253.79,392.44,253.48,392.66Zm-83.27-85.79a2,2,0,0,1-.27,1,1.76,1.76,0,0,1-1.49.86,2.3,2.3,0,0,0-2.13,1.4,4.11,4.11,0,0,0,.09,2.37c.1-.37.15-.75.22-1.12a1.87,1.87,0,0,1,.3-.94,1.81,1.81,0,0,1,1.53-.82,2.25,2.25,0,0,0,2.09-1.47,4.47,4.47,0,0,0-.12-2.37C170.33,306.12,170.29,306.49,170.21,306.87Zm22.3,82.8c-.1.38-.15.75-.22,1.13a2.35,2.35,0,0,1-.12.64l.43.67,0-.07A4.47,4.47,0,0,0,192.51,389.67Zm63.7-19.58a2,2,0,0,1-.27,1,1.77,1.77,0,0,1-1.49.87,2.31,2.31,0,0,0-2.13,1.4,4.11,4.11,0,0,0,.09,2.37c.1-.38.15-.75.22-1.13a1.87,1.87,0,0,1,.3-.94,1.8,1.8,0,0,1,1.54-.81,2.26,2.26,0,0,0,2.08-1.47,4.37,4.37,0,0,0-.12-2.37C256.33,369.34,256.29,369.72,256.21,370.09ZM260,412.52a2,2,0,0,1-.28,1,1.8,1.8,0,0,1-1.49.87,2.27,2.27,0,0,0-2.12,1.39,4,4,0,0,0,.09,2.38c.1-.38.14-.75.21-1.13a1.88,1.88,0,0,1,.31-.94,1.8,1.8,0,0,1,1.53-.82,2.26,2.26,0,0,0,2.09-1.47,4.33,4.33,0,0,0-.13-2.36C260.14,411.77,260.1,412.15,260,412.52Zm-29.78-28.34a2,2,0,0,1-.28,1,1.76,1.76,0,0,1-1.49.86,2.28,2.28,0,0,0-2.12,1.4,4,4,0,0,0,.08,2.37,11.07,11.07,0,0,0,.22-1.12,1.88,1.88,0,0,1,.31-.94,1.8,1.8,0,0,1,1.53-.82,2.27,2.27,0,0,0,2.09-1.47,4.37,4.37,0,0,0-.13-2.37C230.36,383.43,230.32,383.8,230.25,384.18Zm-41.7-42.95a2,2,0,0,1-.28,1,1.8,1.8,0,0,1-1.49.87,2.27,2.27,0,0,0-2.12,1.39,4,4,0,0,0,.09,2.38c.1-.38.14-.75.21-1.13a1.88,1.88,0,0,1,.31-.94,1.8,1.8,0,0,1,1.53-.82,2.26,2.26,0,0,0,2.09-1.47,4.33,4.33,0,0,0-.13-2.36C188.66,340.48,188.62,340.86,188.55,341.23Zm22.14,19.26a2,2,0,0,1-.28,1,1.76,1.76,0,0,1-1.49.86,2.28,2.28,0,0,0-2.12,1.4,4,4,0,0,0,.09,2.37c.1-.37.14-.75.21-1.12a1.88,1.88,0,0,1,.31-.94,1.8,1.8,0,0,1,1.53-.82,2.27,2.27,0,0,0,2.09-1.47,4.37,4.37,0,0,0-.13-2.37C210.8,359.74,210.76,360.11,210.69,360.49ZM185.4,322a1.9,1.9,0,0,1,.87-.48,1.74,1.74,0,0,1,1.66.44,2.31,2.31,0,0,0,2.49.51c.87-.38,1.19-1.13,1.62-1.74-.34.19-.63.43-.95.64a1.81,1.81,0,0,1-.88.45,1.78,1.78,0,0,1-1.66-.5,2.26,2.26,0,0,0-2.52-.44,4.4,4.4,0,0,0-1.58,1.76C184.78,322.48,185.08,322.24,185.4,322Z"
              style="opacity: 0.2"
            ></path>
            <path
              d="M261.59,419.49c0-3.41-.72-6.91-1.09-10.31s-.89-7-1.39-10.52c-1-6.81-2.18-13.61-3.38-20.39-.7-3.95-1.55-7.87-2.3-11.81,0-.14-.26-.11-.25,0,.83,6.95,1.58,13.9,2.54,20.83s2,13.63,3.23,20.42c.35,1.94.77,3.86,1.14,5.8a59,59,0,0,0,1.24,6A.13.13,0,0,0,261.59,419.49Z"
              style="fill: #263238"
            ></path>
            <path
              d="M242.82,418.81c-17.36-4.43-36.52-10.7-43.54-18-14-14.52-33-61.26-35.88-89.29-1.52-14.66-.27-21,3.58-20.81Z"
              style="opacity: 0.2"
            ></path>
            <path
              d="M202.47,378l5.77,44.49H94.79C98,370,128.46,312.66,141.88,296.31c6.72-8.19,20-9.94,30.08-3.26,2.39,1.58,30.15,42.66,32.5,48.63C213.13,363.71,202.47,378,202.47,378Z"
              style="fill: var(--primary)"
            ></path>
            <path
              d="M161.14,328.74a4.47,4.47,0,0,1,2.37-.12,2.27,2.27,0,0,1,1.47,2.09,1.81,1.81,0,0,0,.82,1.53,1.87,1.87,0,0,0,.94.3c.37.08.75.12,1.12.22a4,4,0,0,1-2.37.09,2.3,2.3,0,0,1-1.4-2.13,1.75,1.75,0,0,0-.86-1.48,1.94,1.94,0,0,0-1-.28C161.89,328.89,161.52,328.84,161.14,328.74Zm8.5,47.29a1.9,1.9,0,0,1,1,.28,1.76,1.76,0,0,1,.87,1.48,2.3,2.3,0,0,0,1.4,2.13,4,4,0,0,0,2.37-.09c-.38-.1-.75-.14-1.13-.22a1.87,1.87,0,0,1-.94-.3,1.78,1.78,0,0,1-.81-1.53,2.26,2.26,0,0,0-1.47-2.09,4.47,4.47,0,0,0-2.37.12C168.89,375.91,169.27,376,169.64,376Zm-27.8-31.39a1.9,1.9,0,0,1,1,.28,1.78,1.78,0,0,1,.87,1.48,2.27,2.27,0,0,0,1.39,2.13,4,4,0,0,0,2.37-.09c-.37-.1-.75-.14-1.12-.22a1.87,1.87,0,0,1-.94-.3,1.81,1.81,0,0,1-.82-1.53,2.27,2.27,0,0,0-1.47-2.09,4.47,4.47,0,0,0-2.37.12C141.09,344.52,141.47,344.57,141.84,344.64Zm-15.07,48.21a2,2,0,0,1,1,.27,1.77,1.77,0,0,1,.87,1.49,2.3,2.3,0,0,0,1.4,2.13,4.11,4.11,0,0,0,2.37-.09c-.38-.1-.75-.15-1.13-.22a1.82,1.82,0,0,1-1.75-1.84,2.26,2.26,0,0,0-1.47-2.08,4.47,4.47,0,0,0-2.37.12C126,392.73,126.39,392.77,126.77,392.85Zm67.84,23.41a1.87,1.87,0,0,1,.95.28,1.76,1.76,0,0,1,.87,1.48,2.3,2.3,0,0,0,1.4,2.13,4,4,0,0,0,2.37-.09c-.38-.1-.75-.14-1.13-.22a1.8,1.8,0,0,1-.93-.3,1.77,1.77,0,0,1-.82-1.53,2.26,2.26,0,0,0-1.47-2.09,4.47,4.47,0,0,0-2.37.12C193.85,416.14,194.23,416.18,194.61,416.26Zm-95-17.57a1.88,1.88,0,0,1-1-.3,1.84,1.84,0,0,1-.58-.63c-.06.33-.13.65-.19,1a1.93,1.93,0,0,0,.46.26,4.14,4.14,0,0,0,2.38-.09A11.07,11.07,0,0,0,99.65,398.69ZM150.12,295a2,2,0,0,1,1,.28,1.75,1.75,0,0,1,.86,1.48,2.3,2.3,0,0,0,1.4,2.13,4,4,0,0,0,2.37-.09c-.37-.1-.75-.14-1.12-.22a1.87,1.87,0,0,1-.94-.3,1.81,1.81,0,0,1-.82-1.53,2.27,2.27,0,0,0-1.47-2.09,4.47,4.47,0,0,0-2.37.12C149.37,294.85,149.74,294.9,150.12,295Zm38.25,68.4a2,2,0,0,1-.87.48,1.76,1.76,0,0,1-1.67-.44,2.27,2.27,0,0,0-2.49-.51c-.87.38-1.18,1.13-1.62,1.74.34-.2.64-.43,1-.64a1.82,1.82,0,0,1,2.53.05,2.28,2.28,0,0,0,2.52.44,4.49,4.49,0,0,0,1.59-1.76C189,362.92,188.69,363.16,188.37,363.37Zm-72.92-15a1.89,1.89,0,0,1-.87.48,1.81,1.81,0,0,1-1.24-.14c-.11.27-.22.54-.32.81a2.21,2.21,0,0,0,1.8,0,4.49,4.49,0,0,0,1.59-1.76C116.07,347.9,115.77,348.13,115.45,348.35Zm0,32.37a2,2,0,0,1-.88.48,1.74,1.74,0,0,1-1.66-.43,2.29,2.29,0,0,0-2.49-.52c-.87.38-1.19,1.13-1.62,1.74.34-.19.63-.43,1-.64a1.81,1.81,0,0,1,.88-.45,1.79,1.79,0,0,1,1.66.51,2.27,2.27,0,0,0,2.52.43,4.4,4.4,0,0,0,1.58-1.76C116.07,380.27,115.77,380.51,115.46,380.72Zm31.44,32.71a1.9,1.9,0,0,1-.87.48,1.77,1.77,0,0,1-1.67-.44,2.28,2.28,0,0,0-2.49-.51c-.86.38-1.18,1.13-1.61,1.74.33-.2.63-.43,1-.64a1.81,1.81,0,0,1,.88-.45,1.78,1.78,0,0,1,1.66.5,2.26,2.26,0,0,0,2.51.44,4.42,4.42,0,0,0,1.59-1.76C147.51,413,147.22,413.22,146.9,413.43Zm2.36-39.69a2,2,0,0,1-.87.48,1.77,1.77,0,0,1-1.66-.44,2.29,2.29,0,0,0-2.49-.52c-.87.38-1.19,1.13-1.62,1.74.34-.19.63-.42.95-.64a1.9,1.9,0,0,1,.88-.45,1.81,1.81,0,0,1,1.66.51,2.29,2.29,0,0,0,2.52.44,4.42,4.42,0,0,0,1.58-1.77C149.88,373.29,149.58,373.52,149.26,373.74Zm26.66,33a2,2,0,0,1-.87.48,1.8,1.8,0,0,1-1.67-.44,2.27,2.27,0,0,0-2.49-.51c-.86.38-1.18,1.13-1.61,1.74.33-.2.63-.43.95-.65a1.88,1.88,0,0,1,.88-.44,1.78,1.78,0,0,1,1.66.5,2.26,2.26,0,0,0,2.51.44,4.42,4.42,0,0,0,1.59-1.76C176.53,406.26,176.24,406.5,175.92,406.71Zm-5.71-99.84a2,2,0,0,1-.27,1,1.76,1.76,0,0,1-1.49.86,2.3,2.3,0,0,0-2.13,1.4,4.11,4.11,0,0,0,.09,2.37c.1-.37.15-.75.22-1.12a1.87,1.87,0,0,1,.3-.94,1.81,1.81,0,0,1,1.53-.82,2.25,2.25,0,0,0,2.09-1.47,4.47,4.47,0,0,0-.12-2.37C170.33,306.12,170.29,306.49,170.21,306.87Zm22.08,83.93a1.87,1.87,0,0,1-.28.95,1.76,1.76,0,0,1-1.48.87,2.3,2.3,0,0,0-2.13,1.4,4,4,0,0,0,.09,2.37c.1-.37.14-.75.22-1.13a1.82,1.82,0,0,1,1.83-1.75,2.26,2.26,0,0,0,2.09-1.47,4.47,4.47,0,0,0-.12-2.37C192.41,390.05,192.36,390.42,192.29,390.8Zm-3.74-49.57a2,2,0,0,1-.28,1,1.8,1.8,0,0,1-1.49.87,2.27,2.27,0,0,0-2.12,1.39,4,4,0,0,0,.09,2.38c.1-.38.14-.75.21-1.13a1.88,1.88,0,0,1,.31-.94,1.8,1.8,0,0,1,1.53-.82,2.26,2.26,0,0,0,2.09-1.47,4.33,4.33,0,0,0-.13-2.36C188.66,340.48,188.62,340.86,188.55,341.23Zm-23.36,12.44a1.87,1.87,0,0,1-.28.95,1.76,1.76,0,0,1-1.48.87,2.3,2.3,0,0,0-2.13,1.4,4,4,0,0,0,.09,2.37c.1-.37.14-.75.22-1.13a1.82,1.82,0,0,1,1.83-1.75,2.28,2.28,0,0,0,2.09-1.47,4.47,4.47,0,0,0-.12-2.37C165.31,352.92,165.26,353.29,165.19,353.67ZM114.4,408.18a2,2,0,0,1-.28.95,1.77,1.77,0,0,1-1.49.87,2.28,2.28,0,0,0-2.12,1.4,4,4,0,0,0,.09,2.37c.1-.38.14-.75.21-1.13a1.88,1.88,0,0,1,.31-.94,1.77,1.77,0,0,1,1.53-.81,2.28,2.28,0,0,0,2.09-1.47,4.37,4.37,0,0,0-.13-2.37C114.51,407.42,114.47,407.8,114.4,408.18Zm16.39-78.61a1.9,1.9,0,0,1-.28,1,1.76,1.76,0,0,1-1.48.87,2.28,2.28,0,0,0-2.13,1.4,4,4,0,0,0,.09,2.37c.1-.38.14-.75.22-1.13a1.87,1.87,0,0,1,.3-.94,1.78,1.78,0,0,1,1.53-.81,2.28,2.28,0,0,0,2.09-1.47,4.47,4.47,0,0,0-.12-2.37C130.91,328.82,130.86,329.2,130.79,329.57Zm0,32.89a1.9,1.9,0,0,1-.28,1,1.78,1.78,0,0,1-1.48.87,2.29,2.29,0,0,0-2.13,1.39,4.06,4.06,0,0,0,.09,2.38c.1-.38.14-.75.22-1.13a1.87,1.87,0,0,1,.3-.94,1.81,1.81,0,0,1,1.53-.82,2.26,2.26,0,0,0,2.09-1.47,4.43,4.43,0,0,0-.12-2.36C130.91,361.71,130.86,362.09,130.79,362.46Zm26.44,28.34a2,2,0,0,1-.28.95,1.77,1.77,0,0,1-1.49.87,2.28,2.28,0,0,0-2.12,1.4,4,4,0,0,0,.08,2.37,10.74,10.74,0,0,0,.22-1.13,1.81,1.81,0,0,1,.31-.93,1.78,1.78,0,0,1,1.53-.82,2.28,2.28,0,0,0,2.09-1.47,4.37,4.37,0,0,0-.13-2.37C157.34,390.05,157.3,390.42,157.23,390.8ZM185.4,322a1.9,1.9,0,0,1,.87-.48,1.74,1.74,0,0,1,1.66.44,2.31,2.31,0,0,0,2.49.51c.87-.38,1.19-1.13,1.62-1.74-.34.19-.63.43-.95.64a1.81,1.81,0,0,1-.88.45,1.78,1.78,0,0,1-1.66-.5,2.26,2.26,0,0,0-2.52-.44,4.4,4.4,0,0,0-1.58,1.76C184.78,322.48,185.08,322.24,185.4,322ZM145,318.67a2,2,0,0,1,.88-.48,1.77,1.77,0,0,1,1.66.43,2.29,2.29,0,0,0,2.49.52c.87-.38,1.19-1.13,1.62-1.74-.34.19-.64.43-1,.64a1.81,1.81,0,0,1-.88.45,1.78,1.78,0,0,1-1.66-.5,2.26,2.26,0,0,0-2.52-.44,4.5,4.5,0,0,0-1.59,1.76C144.39,319.12,144.69,318.88,145,318.67Z"
              style="opacity: 0.2"
            ></path>
            <path
              d="M206.2,372.61a35.84,35.84,0,0,0,1.93-21c-1.27-5.74-3.95-11.05-6.88-16.1-.5-.86-1.5-2.45-2.71-4.34-1.07-2.33-2.23-4.61-3.44-6.88-.07-.12-.24,0-.18.12.67,1.46,1.35,2.91,2.06,4.35-2.84-4.35-6.16-9.33-7.43-11.12a.1.1,0,0,0-.17.1c1.33,2.93,8.09,13.59,9.64,16.37,2.85,5.12,5.58,10.43,7.07,16.13a34.51,34.51,0,0,1-2.64,24.81,7.73,7.73,0,0,0-1,4.1c.09,1.6.36,3.2.56,4.79.46,3.64,1,7.27,1.47,10.9s.94,7.19,1.72,10.7c.05.22.38.15.38-.06-.09-3.31-.49-6.63-.85-9.92s-.73-6.45-1.1-9.67c-.19-1.65-.4-3.31-.61-5-.09-.72-.21-1.45-.23-2.17a5.14,5.14,0,0,1,.6-2.33C205,375.16,205.66,373.92,206.2,372.61Z"
              style="fill: #263238"
            ></path>
            <path
              d="M136.23,301.43C121.15,313.89,67,360,70.2,376.36c3.27,16.58,15.82,30,25.47,20.71,8-7.63,43.33-64.26,49.74-79.41C151.51,303.24,151,289.2,136.23,301.43Z"
              style="fill: #ad6359"
            ></path>
            <path
              d="M68.85,371.79c0,11.47,7.68,33.12,22.61,29.09,9.78-2.64,50.34-69.49,56.88-85.35,7.57-18.38,1-25.59-12.94-14.76S68.87,355.38,68.85,371.79Z"
              style="fill: var(--primary)"
            ></path>
            <path
              d="M111,323.7a4,4,0,0,1-2.37.09,1.38,1.38,0,0,1-.34-.18c.19-.16.37-.32.56-.5l.08.07a1.87,1.87,0,0,0,.94.3C110.21,323.56,110.59,323.6,111,323.7ZM94,362.91a2,2,0,0,1,1,.27,1.8,1.8,0,0,1,.87,1.49,2.29,2.29,0,0,0,1.39,2.13,4.15,4.15,0,0,0,2.38-.09c-.38-.1-.75-.15-1.13-.22a1.87,1.87,0,0,1-.94-.3,1.79,1.79,0,0,1-.81-1.54,2.26,2.26,0,0,0-1.48-2.08,4.43,4.43,0,0,0-2.36.12C93.21,362.79,93.59,362.83,94,362.91Zm2.46,31.86a4.47,4.47,0,0,0-2.37.12,10.71,10.71,0,0,0,1.13.21,2.12,2.12,0,0,1,.95.28,1.85,1.85,0,0,1,.84,1.18l.65-.7A2.07,2.07,0,0,0,96.42,394.77Zm19-46.42a2.08,2.08,0,0,1-.88.48,1.77,1.77,0,0,1-1.66-.44,2.27,2.27,0,0,0-2.49-.51c-.87.38-1.19,1.13-1.62,1.74.34-.2.63-.43,1-.65a1.85,1.85,0,0,1,2.54.06,2.28,2.28,0,0,0,2.52.44,4.46,4.46,0,0,0,1.58-1.76C116.07,347.9,115.77,348.14,115.46,348.35Zm17.59-43.46a2,2,0,0,1-.28,1,1.8,1.8,0,0,1-1.49.87,2.27,2.27,0,0,0-2.12,1.39,4,4,0,0,0,.09,2.37c.1-.37.14-.75.21-1.12a1.88,1.88,0,0,1,.31-.94,1.8,1.8,0,0,1,1.53-.82,2.27,2.27,0,0,0,2.09-1.47,4.37,4.37,0,0,0-.13-2.37C133.16,304.14,133.12,304.51,133.05,304.89Zm-2.26,24.68a1.9,1.9,0,0,1-.28,1,1.76,1.76,0,0,1-1.48.87,2.28,2.28,0,0,0-2.13,1.4,4,4,0,0,0,.09,2.37c.1-.38.14-.75.22-1.13a1.87,1.87,0,0,1,.3-.94,1.78,1.78,0,0,1,1.53-.81,2.28,2.28,0,0,0,2.09-1.47,4.47,4.47,0,0,0-.12-2.37C130.91,328.82,130.86,329.2,130.79,329.57ZM83.41,382.19a2,2,0,0,1-.28,1,1.75,1.75,0,0,1-1.49.86,2.29,2.29,0,0,0-2.12,1.4,4,4,0,0,0,.09,2.37c.1-.37.14-.75.22-1.12a1.78,1.78,0,0,1,.3-.94,1.81,1.81,0,0,1,1.53-.82,2.27,2.27,0,0,0,2.09-1.47,4.47,4.47,0,0,0-.12-2.37C83.53,381.44,83.48,381.81,83.41,382.19Zm62.24-64.65a4.44,4.44,0,0,0-1.59,1.77c.33-.2.62-.43.94-.64a2,2,0,0,1,.88-.48,1.79,1.79,0,0,1,1.21.12c.14-.27.26-.53.38-.79A2.18,2.18,0,0,0,145.65,317.54Z"
              style="opacity: 0.2"
            ></path>
            <path
              d="M138.69,338.64c-1.35,1.87-2.84,3.66-4.28,5.47l-1,1.29c.9-1.72,1.77-3.46,2.64-5.21a81.53,81.53,0,0,0,3.53-7.73c.06-.17-.2-.25-.28-.11-1.35,2.12-2.44,4.38-3.71,6.54s-2.51,4.35-3.74,6.54c-2.46,4.37-5,8.71-7.58,13-5.22,8.56-10.77,16.93-16.51,25.15-1.6,2.3-3.2,4.62-4.88,6.86s-3.28,4.7-5,7c-.06.08,0,.18.11.11,1.62-2,3.29-3.87,4.94-5.8s3.11-3.93,4.64-5.9c3.09-4,6-8.08,8.86-12.23a298.47,298.47,0,0,0,15.81-25.87c.13-.23.24-.45.36-.68.81-.88,1.62-1.77,2.38-2.71,1.43-1.78,2.66-3.69,3.92-5.6C138.91,338.63,138.76,338.55,138.69,338.64Z"
              style="fill: #263238"
            ></path>
            <path
              d="M169.87,289.59s3.31,13.56-.65,15.43c-7.37,3.49-20.54-7.34-21.39-9.29-.22-.49-1.31-13.52-2.14-23.65-.53-6.51-.95-11.83-.95-11.83l25.76,10.24-.59,17.83Z"
              style="fill: #ad6359"
            ></path>
            <path
              d="M170.5,270.49l-.59,17.83a35.77,35.77,0,0,1-24.22-16.24c-.53-6.51-.95-11.83-.95-11.83l3.23,1.16Z"
              style="fill: #263238"
            ></path>
            <path
              d="M175.05,250.77c.1,7.29,5.37,13.13,11.77,13s11.5-6.07,11.4-13.37-5.37-13.13-11.77-13S175,243.48,175.05,250.77Z"
              style="fill: #455a64"
            ></path>
            <path
              d="M171.3,251.28c.12,8.12,6,14.61,13.1,14.51s12.79-6.76,12.68-14.87-6-14.61-13.1-14.51S171.19,243.17,171.3,251.28Z"
              style="fill: #c7c7c7"
            ></path>
            <path
              d="M193.23,246.19c1.16,31.27-17.44,35.5-24.18,35.74-6.12.23-27,.2-31.39-30.79s9.78-41.41,23.76-42.66S192.06,214.91,193.23,246.19Z"
              style="fill: #ad6359"
            ></path>
            <path
              d="M185.5,240.28a18.43,18.43,0,0,1-2.11-.47,3.51,3.51,0,0,1-2.06-.89,1.11,1.11,0,0,1,0-1.36,2.74,2.74,0,0,1,2.72-.61,4,4,0,0,1,2.53,1.46A1.19,1.19,0,0,1,185.5,240.28Z"
              style="fill: #263238"
            ></path>
            <path
              d="M165.08,241.06a18.81,18.81,0,0,0,2.1-.49,3.46,3.46,0,0,0,2.06-.9,1.13,1.13,0,0,0,0-1.36,2.78,2.78,0,0,0-2.73-.6A4.07,4.07,0,0,0,164,239.2,1.19,1.19,0,0,0,165.08,241.06Z"
              style="fill: #263238"
            ></path>
            <path
              d="M170.18,248.87c0-.08-.16.11-.16.2.17,2.12,0,4.58-1.88,5.38-.06,0,0,.13,0,.12C170.5,254.13,170.68,250.86,170.18,248.87Z"
              style="fill: #263238"
            ></path>
            <path
              d="M168.17,246.74c-3.44-.1-3.37,6.78-.19,6.87S171.05,246.82,168.17,246.74Z"
              style="fill: #263238"
            ></path>
            <path
              d="M166.82,247.11c-.59.4-1.18,1.09-1.9,1.17s-1.48-.62-2-1.31c-.06-.07-.12,0-.12.08,0,1.32.51,2.66,1.93,2.85s2.2-1,2.52-2.34C167.28,247.32,167.06,247,166.82,247.11Z"
              style="fill: #263238"
            ></path>
            <path
              d="M181.57,248c0-.08.16.1.16.19-.06,2.13.22,4.58,2.15,5.29.06,0,.05.13,0,.12C181.51,253.24,181.16,250,181.57,248Z"
              style="fill: #263238"
            ></path>
            <path
              d="M183.47,245.75c3.42-.27,3.7,6.6.53,6.85S180.59,246,183.47,245.75Z"
              style="fill: #263238"
            ></path>
            <path
              d="M184.92,246.14c.56.34,1.12,1,1.77,1s1.28-.75,1.73-1.48c.05-.08.11,0,.11.07.09,1.31-.29,2.7-1.54,3s-2-.82-2.4-2.11C184.52,246.38,184.69,246,184.92,246.14Z"
              style="fill: #263238"
            ></path>
            <path
              d="M170.39,265.42c.49.52,1,1.22,1.75,1.32a5.76,5.76,0,0,0,2.31-.45.07.07,0,0,1,.09.11,2.92,2.92,0,0,1-2.75,1.06,2.3,2.3,0,0,1-1.61-1.95C170.16,265.39,170.32,265.35,170.39,265.42Z"
              style="fill: #263238"
            ></path>
            <path
              d="M179.14,257.54s.5,3.17.54,4.67c0,.14-.36.21-.87.25,0,0,0,0-.06,0a7.14,7.14,0,0,1-7-2.52.15.15,0,0,1,.22-.21,10.78,10.78,0,0,0,6.56,1.73c.1-.42-1-5.41-.81-5.43a13.1,13.1,0,0,1,3.42.7c-.86-6.64-2.78-13.09-3.54-19.71a.21.21,0,0,1,.39-.11c2.49,6.62,3.65,14.24,4.72,21.07C182.86,258.84,179.74,257.78,179.14,257.54Z"
              style="fill: #263238"
            ></path>
            <path
              d="M177.8,261.68a7.91,7.91,0,0,1-3,2.68,3.57,3.57,0,0,1-2.13.3c-1.58-.29-1.73-1.71-1.54-3a8.33,8.33,0,0,1,.55-1.92A10.17,10.17,0,0,0,177.8,261.68Z"
              style="fill: #263238"
            ></path>
            <path
              d="M174.84,264.36a3.57,3.57,0,0,1-2.13.3c-1.58-.29-1.73-1.71-1.54-3C172.84,261.75,174.58,262.75,174.84,264.36Z"
              style="fill: #f392b9"
            ></path>
            <path
              d="M138.23,248.37c3.41.1,13.07-8.41,14.84-24.75,0,0-2.6,14.56-3.9,16.61s5.41-4.79,7-17.95c0,0,6.83,5.94,12.9,8.26s9.89,2.6,10.37,2.19-8.41-4.13-10.63-7.22c0,0,15.87,9.22,23.45,10.49.88.15-.6-13.5-11.71-22.29s-26.38-6.59-31.85-2.19c0,0-6,.31-13.2,8.46S134.56,248.25,138.23,248.37Z"
              style="fill: #263238"
            ></path>
            <path
              d="M142.72,253.36s-6.34-10.09-10.89-7.88-.11,16.61,5,18.8a5.28,5.28,0,0,0,7.22-2.49Z"
              style="fill: #ad6359"
            ></path>
            <path
              d="M133.21,249.58a.07.07,0,0,0,0,.13c3.57,1.66,5.32,5.13,6.5,8.71-1-1.41-2.46-2.22-4.33-1-.1.06,0,.22.09.2a3.27,3.27,0,0,1,3.52,1.31,15.69,15.69,0,0,1,1.57,3c.16.34.75.19.65-.19l0-.09C141.46,257,138.17,250.29,133.21,249.58Z"
              style="fill: #263238"
            ></path>
            <path
              d="M139.82,263.05a1.09,1.09,0,1,1-2.18-.17,1.09,1.09,0,0,1,2.18.17Z"
              style="fill: #fff"
            ></path>
            <path
              d="M136.9,260.93a.68.68,0,0,1-.74.63.7.7,0,0,1-.64-.74.71.71,0,0,1,.75-.64A.69.69,0,0,1,136.9,260.93Z"
              style="fill: #fff"
            ></path>
            <path
              d="M131.89,251.69l-2.16.37a.45.45,0,0,1-.51-.36h0a.44.44,0,0,1,.36-.51l2.16-.36a.44.44,0,0,1,.51.36h0A.44.44,0,0,1,131.89,251.69Z"
              style="fill: var(--primary)"
            ></path>
            <path
              d="M131.7,250.3l-2.19,0a.44.44,0,0,1-.44-.43h0a.44.44,0,0,1,.42-.45l2.19,0a.42.42,0,0,1,.45.42h0A.44.44,0,0,1,131.7,250.3Z"
              style="fill: var(--primary)"
            ></path>
            <path
              d="M136.56,245.6s-2-15.83,2.13-24.88c4.6-10.07,25-17.8,40.29-8.17,0,0-23.63-5.7-34,8.5-4.36,6-3.13,24.66-3.13,24.66Z"
              style="fill: #c7c7c7"
            ></path>
            <path
              d="M151.92,252.75c.56,8.1-4.74,15.06-11.84,15.55s-13.32-5.67-13.88-13.77,4.74-15.05,11.85-15.54S151.36,244.66,151.92,252.75Z"
              style="fill: #c7c7c7"
            ></path>
            <path
              d="M148.14,252.55c.51,7.28-4.26,13.54-10.64,14s-12-5.1-12.47-12.38,4.26-13.53,10.64-14S147.64,245.28,148.14,252.55Z"
              style="fill: #455a64"
            ></path>
            <polygon
              points="164.21 274.52 153.86 272.25 144.34 264.17 145.59 262.7 154.74 270.47 164.62 272.64 164.21 274.52"
              style="fill: #c7c7c7"
            ></polygon>
            <path
              d="M162.9,273.2c.39-3,8.39-3.44,7.79,1S162.5,276.17,162.9,273.2Z"
              style="fill: #37474f"
            ></path>
            <path
              d="M153.05,291A109,109,0,0,0,137,299.59s20.08,20.24,32.29,17.75,5.52-21.54,5.52-21.54S166.8,285.36,153.05,291Z"
              style="fill: #ad6359"
            ></path>
            <path
              d="M97,395.6c-9.27,11.33-24.38-1.61-26.1-11.7-4-23.66,1.16-67.07,8.06-87.64,2.22-6.63,46.19,6,46.29,13.45C125.4,317.52,115.87,372.61,97,395.6Z"
              style="fill: #ad6359"
            ></path>
            <path
              d="M77.82,308.16s.66-21.73,8.39-36.21c5.34-10,19.4-30.5,53.24-31.95,8-.34,19.71,4.86,6.8,10.19-9.16,3.78-16.12,3.4-21,6.57,0,0,14.07,8.39,14.1,16.44a147.6,147.6,0,0,1-1.42,21.06,32.94,32.94,0,0,1-4,.09s-.21,7.54-8.63,15.36Z"
              style="fill: #ad6359"
            ></path>
            <path
              d="M92.84,263.21c5.56-2.11,17.42-6.39,28.34-6.51,12.13-.14,35.53,2.86,35.54,11.81,0,6.57-9,6.21-9,6.21s9.41,3.28,8.12,9.21c-1.17,5.41-8.15,4.71-8.15,4.71s5.37,3,3.23,8c-2.56,6-13.39-1.21-21.25,2.62C127.88,300.08,92.84,263.21,92.84,263.21Z"
              style="fill: #ad6359"
            ></path>
            <path
              d="M119.19,269.54c5.55-1.13,18.83-.46,28.38,5,.21.12.24.35,0,.28a119.27,119.27,0,0,0-28.4-5.13C119.12,269.65,119.12,269.55,119.19,269.54Z"
              style="fill: #263238"
            ></path>
            <path
              d="M119.68,281.78c4.9-.49,18.55.82,28,6.64.21.13.22.36,0,.29a127.74,127.74,0,0,0-28-6.82A.06.06,0,0,1,119.68,281.78Z"
              style="fill: #263238"
            ></path>
            <path
              d="M155.66,264.61c-1.32-1.46-3.19-2-4.83-3-.09-.05-.17.1-.07.14,2.88,1.21,5.91,4.07,5.43,7.46-.58,4.08-5.46,5.11-8.86,5.21-.17,0-.09.19.09.22,3.77.66,9.09-.65,9.78-5.09A5.92,5.92,0,0,0,155.66,264.61Z"
              style="fill: #263238"
            ></path>
            <path
              d="M146.87,274.29c-.1,0-.17.1-.08.14,5.23,2,8.44,5.63,8.71,7.68a5,5,0,0,1-2.32,5.2,8.84,8.84,0,0,1-6,.94c-.16,0-.23.22-.06.25,2.45.45,7.15,1,8.85-2.95C157.44,282.25,155.85,276.74,146.87,274.29Z"
              style="fill: #263238"
            ></path>
            <path
              d="M150.71,291a7.85,7.85,0,0,0-4.27-3c-.09,0-.14.11-.06.14,2.43,1,4.72,3.95,4.53,6.61-.1,1.36-1.07,4.15-7,3.83a44,44,0,0,1-4.75-.43c-1.07-.12-.45.25-.14.31,3.58.73,12.47,2.8,12.66-4.14A5.82,5.82,0,0,0,150.71,291Z"
              style="fill: #263238"
            ></path>
            <path
              d="M152.35,244.65c-.23-1.49-2.13-3-5.75-3.67,0,0,0,0,0,0,3,.82,5.19,2.43,5.17,3.9s-1.09,3-4.27,4.7c-.09,0,0,.1.07.06C149.44,248.78,152.77,247.35,152.35,244.65Z"
              style="fill: #263238"
            ></path>
            <path
              d="M75.56,299.9,130,318.22s-19.81,61-29.18,74.16-22.34,10.74-29.83-5.51S75.56,299.9,75.56,299.9Z"
              style="fill: var(--primary)"
            ></path>
            <path
              d="M104.25,319.68a4.47,4.47,0,0,1,2.37-.12,2.26,2.26,0,0,1,1.47,2.09,1.78,1.78,0,0,0,.81,1.53,1.87,1.87,0,0,0,.94.3c.38.08.75.12,1.13.22a4,4,0,0,1-2.37.09,2.3,2.3,0,0,1-1.4-2.13,1.76,1.76,0,0,0-.87-1.48,1.9,1.9,0,0,0-1-.28C105,319.83,104.62,319.78,104.25,319.68ZM94,362.91a2,2,0,0,1,1,.27,1.8,1.8,0,0,1,.87,1.49,2.29,2.29,0,0,0,1.39,2.13,4.15,4.15,0,0,0,2.38-.09c-.38-.1-.75-.15-1.13-.22a1.87,1.87,0,0,1-.94-.3,1.79,1.79,0,0,1-.81-1.54,2.26,2.26,0,0,0-1.48-2.08,4.43,4.43,0,0,0-2.36.12C93.21,362.79,93.59,362.83,94,362.91Zm2.45,31.86a4.48,4.48,0,0,0-2.37.12c.38.1.76.15,1.13.22a1.93,1.93,0,0,1,1,.27,1.79,1.79,0,0,1,.85,1.3c.24-.21.48-.43.72-.67A2.15,2.15,0,0,0,96.41,394.77Zm19-46.42a2.08,2.08,0,0,1-.88.48,1.77,1.77,0,0,1-1.66-.44,2.27,2.27,0,0,0-2.49-.51c-.87.38-1.19,1.13-1.62,1.74.34-.2.63-.43,1-.65a1.85,1.85,0,0,1,2.54.06,2.28,2.28,0,0,0,2.52.44,4.46,4.46,0,0,0,1.58-1.76C116.07,347.9,115.77,348.14,115.46,348.35Zm-37,3.85a1.9,1.9,0,0,1-.87.48,1.77,1.77,0,0,1-1.67-.44,2.28,2.28,0,0,0-2.49-.51c-.86.38-1.18,1.13-1.61,1.74.33-.2.63-.43,1-.64a1.81,1.81,0,0,1,.88-.45,1.78,1.78,0,0,1,1.66.5,2.26,2.26,0,0,0,2.51.44,4.42,4.42,0,0,0,1.59-1.76C79,351.75,78.73,352,78.41,352.2Zm6.06-40.08a2,2,0,0,1-.88.48,1.74,1.74,0,0,1-1.66-.43,2.29,2.29,0,0,0-2.49-.52c-.87.38-1.18,1.13-1.62,1.74.34-.19.64-.43,1-.64a1.81,1.81,0,0,1,.88-.45,1.79,1.79,0,0,1,1.66.51,2.27,2.27,0,0,0,2.52.43,4.5,4.5,0,0,0,1.59-1.76C85.08,311.68,84.78,311.91,84.47,312.12Zm6.16,20.81a1.9,1.9,0,0,1-.28,1,1.76,1.76,0,0,1-1.48.87,2.28,2.28,0,0,0-2.13,1.4,4,4,0,0,0,.09,2.37c.1-.38.14-.75.22-1.13a1.87,1.87,0,0,1,.3-.94,1.78,1.78,0,0,1,1.53-.81A2.28,2.28,0,0,0,91,334.18a4.47,4.47,0,0,0-.12-2.37C90.75,332.18,90.7,332.56,90.63,332.93Zm-7.22,49.26a2,2,0,0,1-.28,1,1.75,1.75,0,0,1-1.49.86,2.29,2.29,0,0,0-2.12,1.4,4,4,0,0,0,.09,2.37c.1-.37.14-.75.22-1.12a1.78,1.78,0,0,1,.3-.94,1.81,1.81,0,0,1,1.53-.82,2.27,2.27,0,0,0,2.09-1.47,4.47,4.47,0,0,0-.12-2.37C83.53,381.44,83.48,381.81,83.41,382.19Z"
              style="opacity: 0.2"
            ></path>
            <path
              d="M123.88,328.41a90,90,0,0,0-9.08-3.57c-3.1-1.2-6.23-2.26-9.35-3.34-6.08-2.08-12.22-3.94-18.34-5.78-3.57-1.08-7.16-2-10.74-3-.13,0-.18.22-.05.26,6.15,2.31,12.27,4.69,18.45,6.85S107,324,113.09,325.78c1.75.52,3.52,1,5.27,1.46a44.91,44.91,0,0,0,5.46,1.45C124,328.71,124,328.48,123.88,328.41Z"
              style="fill: #263238"
            ></path>
            <path
              d="M131.05,318.36c-.15-.5-6.18-2.06-6.49-2.16-.1,0-.13.12,0,.16.3.09,5.4,2.22,5.38,2.27-3,8-5.74,16.08-8.61,24.12s-5.84,16.1-8.56,24.22c-1.53,4.56-1.42,5,.2,1.09s3.28-7.14,4.76-11.12c3-8,5.82-16.13,8.62-24.23C127.91,328.12,131.1,318.52,131.05,318.36Z"
              style="fill: #263238"
            ></path>
          </g>
          <g id="freepik--Calendar--inject-6">
            <polygon
              points="467.95 422.69 400.78 422.69 389.04 373.94 456.21 373.94 467.95 422.69"
              style="fill: #a6a6a6"
            ></polygon>
            <polygon
              points="377.11 422.69 444.28 422.69 456.01 373.94 388.84 373.94 377.11 422.69"
              style="fill: #dbdbdb"
            ></polygon>
            <polygon
              points="446.27 383.1 444.78 389.33 444.69 389.71 443.14 396.18 443.05 396.56 441.5 403.02 441.4 403.4 439.85 409.87 439.76 410.25 438.24 416.59 388.93 416.59 390.44 410.25 390.54 409.87 392.09 403.4 392.18 403.02 393.73 396.56 393.83 396.18 395.38 389.71 395.47 389.33 396.96 383.1 446.27 383.1"
              style="fill: #fff"
            ></polygon>
            <polygon
              points="404.19 383.1 402.69 389.33 402.6 389.71 401.05 396.18 400.96 396.56 399.41 403.02 399.32 403.4 397.76 409.87 397.67 410.25 396.15 416.59 395.76 416.59 397.28 410.25 397.37 409.87 398.92 403.4 399.01 403.02 400.56 396.56 400.65 396.18 402.21 389.71 402.3 389.33 403.79 383.1 404.19 383.1"
              style="fill: #ebebeb"
            ></polygon>
            <polygon
              points="411.21 383.1 409.71 389.33 409.62 389.71 408.07 396.18 407.98 396.56 406.43 403.02 406.34 403.4 404.79 409.87 404.69 410.25 403.18 416.59 402.78 416.59 404.3 410.25 404.4 409.87 405.94 403.4 406.04 403.02 407.59 396.56 407.68 396.18 409.23 389.71 409.32 389.33 410.81 383.1 411.21 383.1"
              style="fill: #ebebeb"
            ></polygon>
            <polygon
              points="418.24 383.1 416.74 389.33 416.65 389.71 415.1 396.18 415.01 396.56 413.46 403.02 413.37 403.4 411.81 409.87 411.72 410.25 410.2 416.59 409.81 416.59 411.33 410.25 411.42 409.87 412.97 403.4 413.06 403.02 414.61 396.56 414.71 396.18 416.26 389.71 416.35 389.33 417.84 383.1 418.24 383.1"
              style="fill: #ebebeb"
            ></polygon>
            <polygon
              points="425.26 383.1 423.77 389.33 423.67 389.71 422.13 396.18 422.03 396.56 420.48 403.02 420.39 403.4 418.84 409.87 418.75 410.25 417.23 416.59 416.83 416.59 418.36 410.25 418.45 409.87 420 403.4 420.09 403.02 421.64 396.56 421.73 396.18 423.28 389.71 423.38 389.33 424.87 383.1 425.26 383.1"
              style="fill: #ebebeb"
            ></polygon>
            <polygon
              points="432.29 383.1 430.79 389.33 430.7 389.71 429.15 396.18 429.06 396.56 427.51 403.02 427.42 403.4 425.87 409.87 425.78 410.25 424.26 416.59 423.86 416.59 425.38 410.25 425.48 409.87 427.02 403.4 427.12 403.02 428.67 396.56 428.76 396.18 430.31 389.71 430.4 389.33 431.89 383.1 432.29 383.1"
              style="fill: #ebebeb"
            ></polygon>
            <polygon
              points="439.31 383.1 437.82 389.33 437.73 389.71 436.18 396.18 436.09 396.56 434.54 403.02 434.44 403.4 432.89 409.87 432.8 410.25 431.28 416.59 430.89 416.59 432.41 410.25 432.5 409.87 434.05 403.4 434.14 403.02 435.69 396.56 435.78 396.18 437.33 389.71 437.43 389.33 438.92 383.1 439.31 383.1"
              style="fill: #ebebeb"
            ></polygon>
            <polygon
              points="444.78 389.33 444.69 389.71 395.38 389.71 395.47 389.33 444.78 389.33"
              style="fill: #ebebeb"
            ></polygon>
            <polygon
              points="443.14 396.18 443.05 396.56 393.73 396.56 393.83 396.18 443.14 396.18"
              style="fill: #ebebeb"
            ></polygon>
            <polygon
              points="441.5 403.02 441.4 403.4 392.09 403.4 392.18 403.02 441.5 403.02"
              style="fill: #ebebeb"
            ></polygon>
            <polygon
              points="439.85 409.87 439.76 410.25 390.44 410.25 390.54 409.87 439.85 409.87"
              style="fill: #ebebeb"
            ></polygon>
            <path
              d="M431.3,396.83a10.94,10.94,0,0,0-2.41,1.79,4.2,4.2,0,0,0-1.4,2.49,1.65,1.65,0,0,0,.32,1.26A2.3,2.3,0,0,0,429,403a6.37,6.37,0,0,0,2.88-.07,6.57,6.57,0,0,0,2.62-1.22,3.48,3.48,0,0,0,.9-1.09,2.24,2.24,0,0,0,.29-1.32,1.72,1.72,0,0,0-.73-1.12,3.6,3.6,0,0,0-1.33-.57,6.18,6.18,0,0,0-3,0,5.84,5.84,0,0,1,3-.28,4,4,0,0,1,1.46.55,2.06,2.06,0,0,1,.93,1.32,2.48,2.48,0,0,1-.29,1.59,3.88,3.88,0,0,1-1,1.24,7.11,7.11,0,0,1-5.91,1.38,2.72,2.72,0,0,1-1.4-.82,1.71,1.71,0,0,1-.36-.77,2.82,2.82,0,0,1,0-.82,4.53,4.53,0,0,1,1.61-2.62A10.33,10.33,0,0,1,431.3,396.83Z"
              style="fill: var(--primary)"
            ></path>
            <polygon
              points="402.64 384.83 397.41 384.83 397.55 384.2 402.79 384.2 402.64 384.83"
              style="fill: #c7c7c7"
            ></polygon>
            <polygon
              points="400.23 385.93 397.15 385.93 397.3 385.29 400.38 385.29 400.23 385.93"
              style="fill: #c7c7c7"
            ></polygon>
            <polygon
              points="423.93 404.96 420.74 404.96 420.89 404.32 424.08 404.32 423.93 404.96"
              style="fill: #c7c7c7"
            ></polygon>
            <polygon
              points="423.43 407.19 420.24 407.19 420.39 406.55 423.57 406.55 423.43 407.19"
              style="fill: #c7c7c7"
            ></polygon>
            <polygon
              points="425.49 406.05 420.49 406.05 420.64 405.41 425.63 405.41 425.49 406.05"
              style="fill: #c7c7c7"
            ></polygon>
            <polygon
              points="432.19 400.04 429 400.04 429.14 399.4 432.33 399.4 432.19 400.04"
              style="fill: #c7c7c7"
            ></polygon>
            <polygon
              points="433.74 401.13 428.75 401.13 428.89 400.49 433.89 400.49 433.74 401.13"
              style="fill: #c7c7c7"
            ></polygon>
            <path
              d="M389.39,388.22l3.07-2.3a1.85,1.85,0,0,0,.71-1,1.18,1.18,0,0,0-.15-.94,1.09,1.09,0,0,0-.93-.46,1.77,1.77,0,0,0-1,.36l-.32.24c-.1.08-.22.07-.26,0a.18.18,0,0,1,.07-.26l.32-.25a2.27,2.27,0,0,1,1.31-.46,1.35,1.35,0,0,1,1.17.59,1.5,1.5,0,0,1,.2,1.19,2.43,2.43,0,0,1-.89,1.32l-2.64,2h2.58a.14.14,0,0,1,.14.19.26.26,0,0,1-.23.19h-3.07a.15.15,0,0,1-.12-.05A.21.21,0,0,1,389.39,388.22Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M387.87,395.17a4.43,4.43,0,0,1,1-1.91,2.24,2.24,0,0,1,1.55-.81,1.27,1.27,0,0,1,1.17.81,3.18,3.18,0,0,1,.09,1.91,4.44,4.44,0,0,1-1,1.9,2.23,2.23,0,0,1-1.56.83,1.27,1.27,0,0,1-1.17-.83A3.07,3.07,0,0,1,387.87,395.17Zm.38,0a2.76,2.76,0,0,0,.07,1.69,1,1,0,0,0,.89.65,1.73,1.73,0,0,0,1.19-.65,3.82,3.82,0,0,0,.86-1.69,2.68,2.68,0,0,0-.08-1.69,1,1,0,0,0-.89-.65,1.66,1.66,0,0,0-1.19.65A3.8,3.8,0,0,0,388.25,395.17Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M385.07,406.91l3.08-2.3a1.85,1.85,0,0,0,.71-1,1.22,1.22,0,0,0-.15-.94,1.11,1.11,0,0,0-.93-.46,1.77,1.77,0,0,0-1,.36l-.32.24a.17.17,0,0,1-.26,0,.19.19,0,0,1,.07-.26l.32-.25a2.32,2.32,0,0,1,1.32-.46,1.35,1.35,0,0,1,1.17.59,1.45,1.45,0,0,1,.19,1.19,2.37,2.37,0,0,1-.89,1.32l-2.63,2h2.57a.15.15,0,0,1,.15.19.27.27,0,0,1-.23.19h-3.07a.16.16,0,0,1-.13-.05A.22.22,0,0,1,385.07,406.91Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M383.55,413.86a4.43,4.43,0,0,1,1-1.91,2.24,2.24,0,0,1,1.56-.81,1.27,1.27,0,0,1,1.17.81,3.18,3.18,0,0,1,.09,1.91,4.46,4.46,0,0,1-1,1.9,2.23,2.23,0,0,1-1.55.83,1.27,1.27,0,0,1-1.17-.83A3.07,3.07,0,0,1,383.55,413.86Zm.38,0a2.84,2.84,0,0,0,.07,1.69,1,1,0,0,0,.9.65,1.73,1.73,0,0,0,1.19-.65,3.92,3.92,0,0,0,.86-1.69,2.83,2.83,0,0,0-.08-1.69,1,1,0,0,0-.89-.65,1.68,1.68,0,0,0-1.2.65A4,4,0,0,0,383.93,413.86Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M390.94,377.27a1.75,1.75,0,0,1-1.29-.64,3,3,0,0,1-.34-3c.46-1.53,1.57-2.16,2.44-2,.66.13,1.39.8,1.26,2.28a.41.41,0,0,1-.45.38.42.42,0,0,1-.38-.45c.06-.77-.16-1.3-.59-1.38s-1.16.37-1.48,1.41a2.36,2.36,0,0,0,.18,2.2.89.89,0,0,0,.71.34.42.42,0,0,1,.47.36.42.42,0,0,1-.36.47Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M396.12,377.27a1.77,1.77,0,0,1-1.3-.64,3,3,0,0,1-.34-3c.47-1.53,1.58-2.16,2.44-2,.66.13,1.39.8,1.27,2.28a.42.42,0,0,1-.84-.07c.07-.77-.16-1.3-.59-1.38s-1.16.37-1.47,1.41a2.33,2.33,0,0,0,.17,2.2.89.89,0,0,0,.71.34.43.43,0,0,1,.48.36.42.42,0,0,1-.36.47Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M401.29,377.27a1.75,1.75,0,0,1-1.29-.64,3,3,0,0,1-.34-3c.46-1.53,1.57-2.16,2.44-2,.66.13,1.39.8,1.26,2.28a.42.42,0,0,1-.45.38.43.43,0,0,1-.39-.45c.07-.77-.16-1.3-.58-1.38s-1.16.37-1.48,1.41a2.39,2.39,0,0,0,.17,2.2.91.91,0,0,0,.72.34.42.42,0,0,1,.47.36.42.42,0,0,1-.36.47Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M406.46,377.27a1.77,1.77,0,0,1-1.29-.64,3,3,0,0,1-.34-3c.46-1.53,1.58-2.16,2.44-2,.66.13,1.39.8,1.27,2.28a.42.42,0,0,1-.84-.07c.06-.77-.16-1.3-.59-1.38s-1.16.37-1.47,1.41a2.33,2.33,0,0,0,.17,2.2.89.89,0,0,0,.71.34.43.43,0,0,1,.48.36.42.42,0,0,1-.36.47Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M411.64,377.27a1.79,1.79,0,0,1-1.3-.64,3,3,0,0,1-.33-3c.46-1.53,1.57-2.16,2.43-2,.67.13,1.39.8,1.27,2.28a.42.42,0,0,1-.45.38.42.42,0,0,1-.39-.45c.07-.77-.16-1.3-.58-1.38s-1.16.37-1.48,1.41a2.33,2.33,0,0,0,.17,2.2.89.89,0,0,0,.72.34.42.42,0,0,1,.47.36.42.42,0,0,1-.36.47Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M416.81,377.27a1.75,1.75,0,0,1-1.29-.64,3,3,0,0,1-.34-3c.46-1.53,1.58-2.16,2.44-2,.66.13,1.39.8,1.26,2.28a.41.41,0,0,1-.45.38.42.42,0,0,1-.38-.45c.06-.77-.16-1.3-.59-1.38s-1.16.37-1.47,1.41a2.33,2.33,0,0,0,.17,2.2.89.89,0,0,0,.71.34.42.42,0,0,1,.47.36.4.4,0,0,1-.35.47Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M422,377.27a1.79,1.79,0,0,1-1.3-.64,3,3,0,0,1-.33-3c.46-1.53,1.57-2.16,2.43-2,.66.13,1.39.8,1.27,2.28a.42.42,0,0,1-.84-.07c.07-.77-.16-1.3-.58-1.38s-1.17.37-1.48,1.41a2.33,2.33,0,0,0,.17,2.2.89.89,0,0,0,.71.34.43.43,0,0,1,.48.36.42.42,0,0,1-.36.47Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M427.16,377.27a1.75,1.75,0,0,1-1.29-.64,3,3,0,0,1-.34-3c.46-1.53,1.57-2.16,2.44-2,.66.13,1.39.8,1.26,2.28a.42.42,0,1,1-.83-.07c.06-.77-.16-1.3-.59-1.38s-1.16.37-1.48,1.41a2.36,2.36,0,0,0,.18,2.2.89.89,0,0,0,.71.34.42.42,0,0,1,.11.83Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M432.34,377.27a1.77,1.77,0,0,1-1.3-.64,3,3,0,0,1-.34-3c.47-1.53,1.58-2.16,2.44-2,.66.13,1.39.8,1.27,2.28a.42.42,0,0,1-.84-.07c.07-.77-.16-1.3-.59-1.38s-1.16.37-1.47,1.41a2.33,2.33,0,0,0,.17,2.2.89.89,0,0,0,.71.34.43.43,0,0,1,.48.36.42.42,0,0,1-.36.47Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M437.51,377.27a1.75,1.75,0,0,1-1.29-.64,3,3,0,0,1-.34-3c.46-1.53,1.57-2.16,2.44-2,.66.13,1.39.8,1.26,2.28a.42.42,0,0,1-.45.38.43.43,0,0,1-.39-.45c.07-.77-.16-1.3-.58-1.38s-1.16.37-1.48,1.41a2.39,2.39,0,0,0,.17,2.2.91.91,0,0,0,.72.34.42.42,0,0,1,.47.36.42.42,0,0,1-.36.47Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M442.68,377.27a1.77,1.77,0,0,1-1.29-.64,3,3,0,0,1-.34-3c.46-1.53,1.58-2.16,2.44-2,.66.13,1.39.8,1.27,2.28a.42.42,0,0,1-.84-.07c.06-.77-.16-1.3-.59-1.38s-1.16.37-1.47,1.41a2.33,2.33,0,0,0,.17,2.2.89.89,0,0,0,.71.34.43.43,0,0,1,.48.36.42.42,0,0,1-.36.47Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M447.86,377.27a1.79,1.79,0,0,1-1.3-.64,3,3,0,0,1-.33-3c.46-1.53,1.57-2.16,2.43-2,.67.13,1.39.8,1.27,2.28a.42.42,0,0,1-.45.38.42.42,0,0,1-.39-.45c.07-.77-.16-1.3-.58-1.38s-1.16.37-1.48,1.41a2.33,2.33,0,0,0,.17,2.2.89.89,0,0,0,.72.34.42.42,0,0,1,.47.36.42.42,0,0,1-.36.47Z"
              style="fill: #a6a6a6"
            ></path>
            <path
              d="M453,377.27a1.75,1.75,0,0,1-1.29-.64,3,3,0,0,1-.34-3c.46-1.53,1.58-2.16,2.44-2,.66.13,1.39.8,1.26,2.28a.41.41,0,0,1-.45.38.42.42,0,0,1-.38-.45c.06-.77-.16-1.3-.59-1.38s-1.16.37-1.47,1.41a2.33,2.33,0,0,0,.17,2.2.89.89,0,0,0,.71.34.42.42,0,0,1,.47.36.4.4,0,0,1-.35.47Z"
              style="fill: #a6a6a6"
            ></path>
          </g>
          <g id="freepik--Device--inject-6">
            <rect
              x="238.92"
              y="423.81"
              width="6.86"
              height="4.48"
              style="fill: #455a64"
            ></rect>
            <rect
              x="247.82"
              y="423.52"
              width="6.86"
              height="4.48"
              style="fill: #455a64"
            ></rect>
            <rect
              x="256.72"
              y="423.22"
              width="6.86"
              height="4.48"
              style="fill: #455a64"
            ></rect>
            <rect
              x="265.62"
              y="422.92"
              width="6.86"
              height="4.48"
              style="fill: #455a64"
            ></rect>
            <rect
              x="274.51"
              y="422.63"
              width="6.86"
              height="4.48"
              style="fill: #455a64"
            ></rect>
            <rect
              x="283.41"
              y="422.33"
              width="6.86"
              height="4.48"
              style="fill: #455a64"
            ></rect>
            <rect
              x="292.31"
              y="422.03"
              width="6.86"
              height="4.48"
              style="fill: #455a64"
            ></rect>
            <rect
              x="301.21"
              y="421.74"
              width="6.86"
              height="4.48"
              style="fill: #455a64"
            ></rect>
            <rect
              x="310.11"
              y="421.44"
              width="6.86"
              height="4.48"
              style="fill: #455a64"
            ></rect>
            <polygon
              points="318.65 430.87 237.24 430.87 237.24 425.42 318.65 423.15 318.65 430.87"
              style="fill: #37474f"
            ></polygon>
            <polygon
              points="398.11 409.37 263.71 409.37 285.09 309.31 419.48 309.31 398.11 409.37"
              style="fill: #455a64"
            ></polygon>
            <polygon
              points="403.08 409.37 268.68 409.37 290.06 309.31 424.45 309.31 403.08 409.37"
              style="fill: #37474f"
            ></polygon>
            <path
              d="M358.18,353.55a10.1,10.1,0,0,1-9.62,8.3,6.92,6.92,0,0,1-7-8.3,10.12,10.12,0,0,1,9.63-8.31A6.91,6.91,0,0,1,358.18,353.55Z"
              style="fill: #263238"
            ></path>
            <polygon
              points="365.07 435.5 298.97 435.5 298.97 430.37 365.07 428.23 365.07 435.5"
              style="fill: #455a64"
            ></polygon>
            <polygon
              points="383.04 435.5 347.55 435.5 326.18 379.43 361.67 379.43 383.04 435.5"
              style="fill: #455a64"
            ></polygon>
            <polygon
              points="388.88 435.5 353.39 435.5 332.02 379.43 367.51 379.43 388.88 435.5"
              style="fill: #263238"
            ></polygon>
            <path
              d="M234.73,436.87H166.58c-5.82,0,2.6-16.56,23.82-22.92S241.42,430.65,234.73,436.87Z"
              style="fill: #37474f"
            ></path>
            <path
              d="M208,436.87a20.68,20.68,0,0,1,.93-5.56,23.6,23.6,0,0,1,2.3-5.19,18.64,18.64,0,0,1,3.61-4.4,16.29,16.29,0,0,1,4.8-3c-.74.6-1.57,1-2.24,1.68l-1,.89-1,1a24.49,24.49,0,0,0-3.31,4.35,32.6,32.6,0,0,0-2.41,4.93A41,41,0,0,0,208,436.87Z"
              style="fill: #263238"
            ></path>
            <path
              d="M216.06,421.11a39.42,39.42,0,0,1,5.88,2.4,40.93,40.93,0,0,1,5.48,3.25,24.61,24.61,0,0,1,4.75,4.31,15.09,15.09,0,0,1,1.76,2.7,8,8,0,0,1,.8,3.1A8.92,8.92,0,0,0,233.5,434a14,14,0,0,0-1.91-2.43,32.46,32.46,0,0,0-4.75-4c-1.69-1.23-3.47-2.31-5.27-3.4-.9-.54-1.81-1.05-2.73-1.55S217,421.61,216.06,421.11Z"
              style="fill: #263238"
            ></path>
          </g>
          <g id="freepik--Line--inject-6">
            <polygon
              points="138.7 117.56 141.7 117.56 141.7 117.6 138.7 117.56"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="147.76 117.71 153.81 118.03 153.79 118.21 147.75 117.82 147.76 117.71"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="159.85 118.53 165.87 119.22 165.83 119.55 159.82 118.79 159.85 118.53"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="171.87 120.08 177.85 121.13 177.75 121.61 171.81 120.49 171.87 120.08"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="183.78 122.38 189.68 123.82 189.54 124.35 183.66 122.89 183.78 122.38"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="195.52 125.43 201.32 127.22 201.13 127.79 195.36 125.98 195.52 125.43"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="207.06 129.19 212.74 131.33 212.5 131.93 206.85 129.77 207.06 129.19"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="218.34 133.64 223.88 136.12 223.58 136.75 218.07 134.26 218.34 133.64"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="229.34 138.77 234.72 141.58 234.36 142.24 229.01 139.41 229.34 138.77"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="240.01 144.55 245.2 147.69 244.78 148.37 239.61 145.22 240.01 144.55"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="250.31 150.97 255.3 154.41 254.81 155.11 249.84 151.66 250.31 150.97"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="260.2 158 264.98 161.74 264.41 162.45 259.66 158.71 260.2 158"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="269.65 165.62 274.2 169.63 273.55 170.34 269.04 166.33 269.65 165.62"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="278.63 173.78 282.92 178.07 282.21 178.76 277.94 174.49 278.63 173.78"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="287.07 182.5 291.09 187.05 290.38 187.66 286.36 183.15 287.07 182.5"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="294.97 191.72 298.7 196.5 298 197.03 294.26 192.29 294.97 191.72"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="302.29 201.39 305.74 206.39 305.04 206.85 301.59 201.89 302.29 201.39"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="309.02 211.48 312.16 216.68 311.48 217.07 308.34 211.91 309.02 211.48"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="315.13 221.96 317.94 227.34 317.29 227.67 314.47 222.32 315.13 221.96"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="320.59 232.79 323.07 238.33 322.45 238.59 319.95 233.09 320.59 232.79"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="325.39 243.93 327.53 249.6 326.94 249.82 324.78 244.17 325.39 243.93"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="329.5 255.34 331.29 261.13 330.74 261.3 328.93 255.53 329.5 255.34"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="332.9 266.98 334.34 272.87 333.83 272.99 332.37 267.12 332.9 266.98"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="335.59 278.8 336.64 284.77 336.23 284.84 335.11 278.9 335.59 278.8"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="337.51 290.77 338.2 296.8 337.94 296.82 337.18 290.82 337.51 290.77"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="338.7 302.84 339.03 308.89 338.92 308.89 338.52 302.85 338.7 302.84"
              style="fill: #263238"
            ></polygon>
            <polygon
              points="339.18 315.04 339.18 318.04 339.14 315.04 339.18 315.04"
              style="fill: #263238"
            ></polygon>
          </g>
          <g id="freepik--Envelope--inject-6">
            <polygon
              points="360.78 304.59 295.55 304.59 295.55 249.41 328.16 228.7 360.78 249.41 360.78 304.59"
              style="fill: var(--primary)"
            ></polygon>
            <polygon
              points="360.78 304.59 295.55 304.59 295.55 249.41 328.16 228.7 360.78 249.41 360.78 304.59"
              style="opacity: 0.2"
            ></polygon>
            <polygon
              points="357.11 295.81 299.23 295.81 299.23 221.52 342.2 221.52 357.11 235.68 357.11 295.81"
              style="fill: #ebebeb"
            ></polygon>
            <polygon
              points="342.2 221.52 357.11 235.68 342.2 235.68 342.2 221.52"
              style="fill: #dbdbdb"
            ></polygon>
            <rect
              x="304.88"
              y="233.99"
              width="32.18"
              height="1.91"
              transform="translate(641.93 469.88) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <rect
              x="304.88"
              y="238.8"
              width="32.18"
              height="1.91"
              transform="translate(641.93 479.51) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <rect
              x="304.88"
              y="243.62"
              width="32.18"
              height="1.91"
              transform="translate(641.93 489.14) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <rect
              x="304.88"
              y="248.43"
              width="47.14"
              height="1.91"
              transform="translate(656.9 498.77) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <rect
              x="304.88"
              y="253.25"
              width="47.14"
              height="1.91"
              transform="translate(656.9 508.4) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <rect
              x="304.88"
              y="258.06"
              width="47.14"
              height="1.91"
              transform="translate(656.9 518.03) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <rect
              x="304.88"
              y="262.88"
              width="47.14"
              height="1.91"
              transform="translate(656.9 527.66) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <rect
              x="304.88"
              y="267.69"
              width="47.14"
              height="1.91"
              transform="translate(656.9 537.29) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <rect
              x="304.88"
              y="272.51"
              width="47.14"
              height="1.91"
              transform="translate(656.9 546.92) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <rect
              x="304.88"
              y="277.32"
              width="47.14"
              height="1.91"
              transform="translate(656.9 556.55) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <rect
              x="304.88"
              y="282.14"
              width="47.14"
              height="1.91"
              transform="translate(656.9 566.18) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <rect
              x="304.88"
              y="286.95"
              width="47.14"
              height="1.91"
              transform="translate(656.9 575.81) rotate(180)"
              style="fill: #dbdbdb"
            ></rect>
            <path
              d="M360.78,263.22v41.37H295.55V263.22c2.81,1.59,5.56,3.25,8.33,4.88s5.52,3.31,8.27,5q4.58,2.79,9.16,5.66l.09-.06a.46.46,0,0,1-.07.07l6.84,4.28c2.28-1.43,4.56-2.87,6.84-4.28l-.08-.07.1.05c3.05-1.9,6.09-3.79,9.16-5.66q4.11-2.52,8.26-5C355.23,266.47,358,264.81,360.78,263.22Z"
              style="fill: var(--primary)"
            ></path>
            <path
              d="M360.78,263.22c-2.63,1.85-5.32,3.63-8,5.45s-5.36,3.56-8.05,5.33-5.63,3.66-8.46,5.47l-.25.18-7.51,4.79-.38.23-.36-.23-7.5-4.8-.27-.17q-4.25-2.72-8.46-5.48c-2.68-1.76-5.37-3.54-8-5.32s-5.34-3.6-8-5.45c2.81,1.59,5.56,3.25,8.33,4.88s5.52,3.31,8.27,5q4.58,2.79,9.16,5.66h0l6.84,4.28c2.28-1.43,4.56-2.87,6.84-4.28l0,0c3.05-1.9,6.09-3.79,9.16-5.66q4.11-2.52,8.26-5C355.23,266.47,358,264.81,360.78,263.22Z"
              style="fill: #fff"
            ></path>
            <path
              d="M321.4,278.7a.46.46,0,0,1-.07.07l-1,.87c-1.64,1.38-3.31,2.7-5,4-2.07,1.58-4.2,3.1-6.34,4.61s-4.3,2.95-6.5,4.36-4.43,2.79-6.73,4.06c2-1.74,4-3.35,6.11-4.93s4.22-3.11,6.34-4.62,4.31-2.95,6.51-4.36c1.76-1.13,3.54-2.24,5.36-3.28l1.28-.71Z"
              style="fill: #fff"
            ></path>
            <path
              d="M360.63,296.66c-2.31-1.27-4.54-2.65-6.73-4.06s-4.36-2.88-6.52-4.36-4.26-3-6.33-4.61c-1.7-1.29-3.37-2.6-5-4l-1-.88-.08-.07.1.05,1.27.72c1.83,1,3.6,2.15,5.36,3.28,2.21,1.41,4.36,2.88,6.51,4.36s4.26,3,6.33,4.62S358.65,294.92,360.63,296.66Z"
              style="fill: #fff"
            ></path>
          </g>
          <g id="freepik--Tool--inject-6">
            <path
              d="M281,132a13.53,13.53,0,0,1,13.87-3.26l-7.83,7.83,2.75,5.78,5.78,2.75,7.83-7.84A13.53,13.53,0,1,1,281,132Z"
              style="fill: var(--primary)"
            ></path>
            <path
              d="M257,194.29a13.52,13.52,0,0,1-13.87,3.25l7.83-7.83-2.75-5.77-5.77-2.75L234.59,189a13.53,13.53,0,1,1,22.4,5.27Z"
              style="fill: var(--primary)"
            ></path>
            <rect
              x="262.44"
              y="139.15"
              width="12.06"
              height="49.04"
              transform="translate(342.58 469.24) rotate(-135)"
              style="fill: var(--primary)"
            ></rect>
          </g>
          <g id="freepik--Clock--inject-6">
            <circle
              cx="152.07"
              cy="126.6"
              r="41.92"
              transform="matrix(0.16, -0.99, 0.99, 0.16, 2.88, 256.58)"
              style="fill: var(--primary)"
            ></circle>
            <circle
              cx="153.99"
              cy="127.53"
              r="40"
              style="opacity: 0.2"
            ></circle>
            <circle
              cx="153.99"
              cy="127.53"
              r="37.47"
              transform="translate(14.26 270.55) rotate(-85.3)"
              style="fill: #fff"
            ></circle>
            <path
              d="M190.61,119.58c-17.06,10.34-45.11,27.3-60.78,36.6a37.46,37.46,0,0,1-10.24-13.77l51.84-48A37.47,37.47,0,0,1,190.61,119.58Z"
              style="fill: #ebebeb; opacity: 0.5"
            ></path>
            <path
              d="M191.44,128.84A37.33,37.33,0,0,1,189,141l-46.74,22.1a38.11,38.11,0,0,1-5.9-2.53C150.44,152.43,176.24,137.58,191.44,128.84Z"
              style="fill: #ebebeb; opacity: 0.5"
            ></path>
            <rect
              x="153.63"
              y="92.78"
              width="0.72"
              height="5.68"
              style="fill: #c7c7c7"
            ></rect>
            <rect
              x="137.67"
              y="97.05"
              width="0.72"
              height="5.68"
              transform="translate(-31.45 82.39) rotate(-30)"
              style="fill: #c7c7c7"
            ></rect>
            <rect
              x="125.99"
              y="108.74"
              width="0.72"
              height="5.68"
              transform="translate(-33.46 165.2) rotate(-60)"
              style="fill: #c7c7c7"
            ></rect>
            <rect
              x="119.24"
              y="127.17"
              width="5.68"
              height="0.72"
              style="fill: #c7c7c7"
            ></rect>
            <rect
              x="123.51"
              y="143.13"
              width="5.68"
              height="0.72"
              transform="translate(-54.82 82.42) rotate(-30.01)"
              style="fill: #c7c7c7"
            ></rect>
            <rect
              x="135.19"
              y="154.81"
              width="5.68"
              height="0.72"
              transform="translate(-65.34 197.23) rotate(-60.03)"
              style="fill: #c7c7c7"
            ></rect>
            <rect
              x="153.63"
              y="156.61"
              width="0.72"
              height="5.68"
              style="fill: #c7c7c7"
            ></rect>
            <rect
              x="169.58"
              y="152.33"
              width="0.72"
              height="5.68"
              transform="translate(-54.82 105.76) rotate(-30)"
              style="fill: #c7c7c7"
            ></rect>
            <rect
              x="181.27"
              y="140.65"
              width="0.72"
              height="5.68"
              transform="matrix(0.5, -0.87, 0.87, 0.5, -33.46, 229.02)"
              style="fill: #c7c7c7"
            ></rect>
            <rect
              x="183.06"
              y="127.17"
              width="5.68"
              height="0.72"
              style="fill: #c7c7c7"
            ></rect>
            <rect
              x="178.79"
              y="111.21"
              width="5.68"
              height="0.72"
              transform="translate(-31.46 105.79) rotate(-30.01)"
              style="fill: #c7c7c7"
            ></rect>
            <rect
              x="167.11"
              y="99.53"
              width="5.68"
              height="0.72"
              transform="translate(-1.49 197.2) rotate(-60.03)"
              style="fill: #c7c7c7"
            ></rect>
            <polygon
              points="154.53 95.35 155.77 130.06 152.21 130.02 153.57 95.34 154.53 95.35"
              style="fill: #455a64"
            ></polygon>
            <polygon
              points="176.15 115.43 152.8 130.33 151.1 127.21 175.69 114.58 176.15 115.43"
              style="fill: #263238"
            ></polygon>
            <path
              d="M155.2,127.53a1.21,1.21,0,1,1-1.21-1.21A1.22,1.22,0,0,1,155.2,127.53Z"
              style="fill: var(--primary)"
            ></path>
          </g>
          <g id="freepik--speech-bubble--inject-6">
            <path
              d="M278.13,239.07a30.28,30.28,0,0,1-50.59,19.15l-15.15,2.22L220,247.35a30.28,30.28,0,1,1,58.16-8.28Z"
              style="fill: #fff"
            ></path>
            <path
              d="M278.13,239.07A30.6,30.6,0,0,1,272,254.42a32.71,32.71,0,0,1-2.74,3.15,31.82,31.82,0,0,1-3.2,2.71,29.85,29.85,0,0,1-19.66,6.09,25.79,25.79,0,0,1-4.19-.44,30.5,30.5,0,0,1-15-7.39l.36.11L212.47,261l-1.1.17.56-1,7.53-13.12,0,.52a30.62,30.62,0,0,1,1.87-27,31,31,0,0,1,9.48-10.09,30.53,30.53,0,0,1,12.92-4.85,30.19,30.19,0,0,1,25.37,8.42A30.47,30.47,0,0,1,278.13,239.07Zm0,0a30,30,0,0,0-34.34-32.77,29.85,29.85,0,0,0-12.51,4.94,31.25,31.25,0,0,0-9.06,9.88,30,30,0,0,0-3.84,12.81,30.31,30.31,0,0,0,2.13,13.19l.11.27-.14.25-7.63,13.07-.54-.8,15.16-2.12.21,0,.15.14a29.85,29.85,0,0,0,14.5,7.47,27,27,0,0,0,4.11.5,29.08,29.08,0,0,0,12.23-1.79,27.87,27.87,0,0,0,7.3-3.94,27.24,27.24,0,0,0,5.95-5.79A30.53,30.53,0,0,0,278.13,239.07Z"
              style="fill: #263238"
            ></path>
            <path
              d="M264.89,236.84a3.67,3.67,0,1,1-3.67-3.67A3.66,3.66,0,0,1,264.89,236.84Z"
              style="fill: #263238"
            ></path>
            <path
              d="M251.75,236.84a3.67,3.67,0,1,1-3.66-3.67A3.66,3.66,0,0,1,251.75,236.84Z"
              style="fill: #263238"
            ></path>
            <path
              d="M238.62,236.84a3.67,3.67,0,1,1-3.67-3.67A3.66,3.66,0,0,1,238.62,236.84Z"
              style="fill: #263238"
            ></path>
          </g>
        </svg>
        <div>
          <h2>Você é um administrador</h2>
          <p>
            Esse cargo te dá acesso total às informações da plataforma, sendo
            possível revisar e controlar o envio de relatórios, modificar dados
            dos moradores e alterar configurações dessa plataforma.
          </p>
        </div>
      </div>

      <!-- Por onde começar, última sessão -->
      <h1 class="secondary-title">Por onde começar</h1>

      <div class="action-cards">
        <ActionCard
          title="Colaboradores"
          subtitle="Visão geral dos colaboradores do departamento, com informações de horas e atividades."
          icon="groups"
          link="/colaboradores"
          v-if="mode == 3"
        />
        <ActionCard
          title="Gerenciar"
          subtitle="Ver todas as opções de gerenciamento da plataforma, como relatórios e configurações."
          icon="settings"
          link="/gerenciamento"
          v-if="mode == 2"
        />
        <ActionCard
          title="Relatórios"
          subtitle="Revisar os relatórios enviados pelos colaboradores durante o período atual."
          icon="assignment"
          link="/revisar"
          v-if="mode == 2"
        />
        <ActionCard
          title="Moradores"
          subtitle="Ver todos os moradores cadastrados na plataforma, com informações de horas e relatórios."
          icon="people"
          link="/moradores"
          v-if="mode == 2"
        />
        <div v-if="mode == 1 || mode == 0">
          <p class="no-posts">
            Faça login e aguarde aprovação para ver sugestões.
          </p>
        </div>
      </div>
    </main>
    <footer>
      <div class="footer_img">
        <svg
          fill="var(--on-secondary-container)"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 345.54 365.9"
          data-v-c3ceb15a=""
        >
          <g id="Camada_2" data-name="Camada 2" data-v-c3ceb15a="">
            <g id="Camada_1-2" data-name="Camada 1" data-v-c3ceb15a="">
              <path
                class="cls-1"
                d="M.85,218.59,50.5,268.24V247L22.06,218.59,50.5,190.15l6.74-6.74L172.86,67.79l150.81,150.8L234.27,308V217a60.68,60.68,0,0,0-121.36,0v92.49L90.5,287v21.21l22.41,22.41,7.5,7.5,10.33,10.33a59.64,59.64,0,0,0,84.25,0l11.78-11.78,7.5-7.5L344.88,218.59l-172-172ZM219.27,323l-14.89,14.89a44.58,44.58,0,0,1-63,0l-13.44-13.44V217a45.68,45.68,0,0,1,91.36,0Z"
                data-v-c3ceb15a=""
              ></path>
              <polygon
                class="cls-1"
                points="252.27 17.18 252.27 0 94.91 0 94.91 17.18 0 17.18 0 201.76 15 186.76 15 32.18 94.91 32.18 94.91 106.84 109.91 91.84 109.91 17.18 109.91 15 237.27 15 237.27 17.18 237.27 93.3 252.27 108.3 252.27 32.18 330.54 32.18 330.54 186.57 345.54 201.57 345.54 17.18 252.27 17.18"
                data-v-c3ceb15a=""
              ></polygon>
              <polygon
                class="cls-1"
                points="63 360.48 70.5 360.48 78 360.48 78 180.33 63 195.33 63 360.48"
                data-v-c3ceb15a=""
              ></polygon>
            </g>
          </g>
        </svg>
      </div>
      <div>
        <p
          style="
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 8px;
            line-height: 1.2;
          "
        >
          Fundação Casa do Estudante Universitário do Paraná (FCEU)
        </p>
        <p>
          © 2022 - Sistema desenvolvido por
          <a href="https://vicenteparmi.github.io/cv" target="_blank">Vicente K. Parmigiani</a>
        </p>
        <p>Versão: {{ version }}</p>
      </div>
    </footer>
  </div>
</template>

<style>
.svg {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 290px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  opacity: 0.8;
}

.head-display-card {
  overflow: hidden;
}

footer {
  width: 100%;
  padding: 24px;
  border-top: 1px solid var(--secondary-container);
  margin-top: 64px;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.footer_img {
  width: 92px;
  justify-content: center;
  margin-right: 24px;
}

.posts_holder {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 12px;
}

.no-posts {
  text-align: center;
  font-size: 1.2rem;
  color: var(--secondary);
  margin-top: 24px;
  width: 100%;
  padding: 24px;
  border: 1px solid var(--secondary-container);
  border-radius: 24px;
}

.subtitle-content {
  margin-top: -16px;
  margin-bottom: 12px;
  color: var(--tertiary);
  opacity: 0.8;
}

.account_type {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 24px;
  padding: 24px;
  user-select: none;
}

.account_type svg {
  width: 200px;
  height: 200px;
  transition-duration: 0.2s;
}

.account_type p {
  margin-top: 12px;
  color: var(--on-surface);
}

.account_type h2 {
  margin-top: 12px;
  color: var(--primary);
  font-size: 24px;
}

@media (max-width: 768px) {
  .account_type {
    grid-template-columns: 1fr;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .account_type svg {
    width: 30vw;
    height: 30vw;
  }
}

@media (max-width: 600px) {
  .account_type svg {
    width: 50vw;
    height: 50vw;
  }

  .svg {
    width: auto;
    opacity: 0.5;
  }

  .svg svg {
    width: 32vh;
  }

  footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer_img {
    margin-bottom: 24px;
    margin-right: 0;
  }
}
</style>
