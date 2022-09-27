<script setup>
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, ref, get } from "@firebase/database";
import ColabCard from "../components/ColabCard.vue";
import MobileTopLogo from "../components/MobileTopLogo.vue";
</script>

<script>
export default {
  name: "MembersView",
  components: {
    ColabCard,
  },
  data() {
    return {
      currentPeriod: "",
      currentPeriodId: "",
      currentUser: {},
      members: [],
      currentDepartment: "",
      sendLimit: "",
    };
  },
  mounted() {
    this.getSettings();
    this.getCurrentUser().then(() => {
      this.getMembers();
    });
  },
  methods: {
    async getCurrentUser() {
      const auth = getAuth();

      // Get user UID
      const userUID = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user.uid);
          } else {
            reject("No user logged in");
          }
        });
      });

      // Get database reference
      const db = getDatabase();
      const userRef = ref(db, "users/" + userUID);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          this.currentUser.department = snapshot.val().department;

          // Get current department name
          const departmentRef = ref(
            db,
            "departments/" + this.currentUser.department
          );
          get(departmentRef).then((snapshot) => {
            if (snapshot.exists()) {
              this.currentDepartment = snapshot.val().name;
            } else {
              console.log("No data available");
            }
          });
        }
      });
    },
    async getMembers() {
      const db = getDatabase();
      const usersRef = ref(db, "residents");
      get(usersRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((child) => {
              if (child.val().department == this.currentUser.department) {
                // Try to ser status
                let status = "Não enviado";
                try {
                  status = child.val().reports[this.currentPeriodId].status;
                } catch (error) {
                  console.log("No report sent");
                }

                this.members.push({
                  name: child.val().name,
                  hours: child.val().hours,
                  changes: child.val().change
                    ? new Date(child.val().change).toLocaleDateString()
                    : "Sem dados",
                  id: child.key,
                  status: status,
                });
              }
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getSettings() {
      const db = getDatabase();
      const settingsRef = ref(db, "settings");
      get(settingsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const periods = snapshot.val().periods;
          const current = snapshot.val().currentPeriod;
          this.currentPeriod =
            periods[current].name + " (" + periods[current].year + ")";
          this.currentPeriodId = current;
          this.sendLimit = new Date(
            snapshot.val().sendLimit + "T00:00:00"
          ).toLocaleDateString();
        }
      });
    },
    openMember(id) {
      this.$router.push({ name: "member", params: { id: id } });
    },
  },
};
</script>

<template>
  <div>
    <MobileTopLogo />
    <div>
      <h2 class="title" style="color: var(--tertiary)">Colaboradores</h2>
      <transition name="fadeup" mode="out-in">
        <h4
          class="subtitle fadeup"
          style="color: var(--tertiary)"
          v-if="currentDepartment"
        >
          {{ currentDepartment }}
        </h4>
        <h4 v-else style="width: 120px; height: 38px"></h4>
      </transition>
      <!-- TODO: Fix subtitle according to department -->
      <p style="color: var(--on-surface); margin-top: 12px; max-width: 800px">
        Abaixo é possível encontrar a lista completa dos colaboradores para o
        departamento que administra. Caso esteja faltando algum colaborador,
        entre em contato com o Conselho Administrativo.
      </p>
    </div>
    <div class="info-summary">
      <div class="info-summary__item">
        <p class="info-summary__title">Colaboradores</p>
        <transition name="fadeup" mode="out-in">
          <p :key="members.length" class="info-summary__value">
            {{ members.length }}
          </p>
        </transition>
      </div>
      <div class="info-summary__item">
        <p class="info-summary__title">Período atual</p>
        <transition name="fadeup" mode="out-in">
          <p :key="currentPeriod" class="info-summary__value">
            {{ currentPeriod }}
          </p>
        </transition>
      </div>
      <div class="info-summary__item">
        <p class="info-summary__title">Envio até</p>
        <transition name="fadeup" mode="out-in">
          <p :key="sendLimit" class="info-summary__value">
            {{ sendLimit }}
          </p></transition
        >
      </div>
    </div>
    <div id="colabList">
      <ColabCard
        v-for="member in members"
        :key="member.id"
        :name="member.name"
        :hours="member.hours"
        :changes="member.changes ? member.changes : 'Sem dados'"
        :id="member.id"
        :status="member.status ? member.status : 'Em análise'"
        @click="openMember(member.id)"
        class="fadeup"
      />
    </div>
    <!-- Member edit summary -->
  </div>
</template>

<style scoped>
#colabList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 24px;
}

.info-summary {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 24px;
}

.info-summary__item {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 12px;
  margin-bottom: 12px;
  background-color: var(--primary-container);
  border-radius: 24px;
  padding: 16px;
}

.info-summary__title {
  font-size: 14px;
  color: var(--on-primary-container);
}

.info-summary__value {
  font-size: 24px;
  color: var(--on-primary-container);
  font-weight: 600;
}

@media screen and (max-width: 600px) {
  .subtitle {
    margin-left: 0;
    margin-bottom: 24px;
  }
  .info-summary__item {
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .info-summary__title {
    font-size: 12px;
  }

  .info-summary__value {
    font-size: 18px;
  }

  #colabList {
    margin-top: 12px;
  }
}

@media screen and (max-width: 400px) {
  .info-summary__title {
    font-size: 12px;
  }

  .info-summary__value {
    font-size: 14px;
    font-weight: 600;
  }

  .info-summary__item {
    padding: 12px;
    border-radius: 16px;
  }
}
</style>
