<script>
import { getDatabase, ref, get } from "@firebase/database";

export default {
  name: "MemberView",
  data() {
    return {
      memberInfo: {
        hours: "",
      },
      reports: [],
      periods: "",
      currentReport: {
        date: "",
      },
    };
  },
  mounted() {
    this.getMemberInfo();
  },
  methods: {
    async getMemberInfo() {
      const db = getDatabase();
      const memberRef = ref(db, "residents/" + this.$route.params.id);
      get(memberRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.memberInfo = {
              name: snapshot.val().name,
              department: snapshot.val().department,
              hours: snapshot.val().hours,
              changes: snapshot.val().change
                ? new Date(snapshot.val().change).toLocaleString()
                : "Sem dados",
            };

            // Create array with reports
            const reports = snapshot.val().reports;
            for (const report in reports) {
              this.reports.push({
                id: report,
                hours: reports[report].hours,
                activities: reports[report].activities,
                date: reports[report].date,
                department: reports[report].department,
                status: reports[report].status,
                sentBy: reports[report].sentBy,
                obs: reports[report].obs,
              });
            }

            // Get period names
            const settingsRef = ref(db, "settings");
            get(settingsRef).then((snapshot) => {
              if (snapshot.exists()) {
                this.periods = snapshot.val().periods;
                this.currentReport = snapshot.val().currentPeriod;

                // Get current report
                const currentReportRef = ref(
                  db,
                  "residents/" +
                    this.$route.params.id +
                    "/reports/" +
                    this.currentReport
                );
                get(currentReportRef).then((snapshot) => {
                  if (snapshot.exists()) {
                    this.currentReport = {
                      id: this.currentReport,
                      hours: snapshot.val().hours,
                      activities: snapshot.val().activities,
                      date: snapshot.val().date,
                      department: snapshot.val().department,
                      status: snapshot.val().status || "Em análise",
                      sentBy: snapshot.val().sentBy,
                      obs: snapshot.val().obs,
                    };
                  } else {
                    this.currentReport = {
                      id: this.currentReport,
                      hours: 0,
                      activities: "",
                      date: "",
                      department: "",
                      status: "Não enviado",
                      sentBy: "",
                      obs: "",
                    };
                  }
                });
              }
            });
          } else {
            console.log("No data available");
          }
        })
        .then(() => {
          const departmentRef = ref(
            db,
            "departments/" + this.memberInfo.department
          );
          get(departmentRef).then((snapshot) => {
            if (snapshot.exists()) {
              this.memberInfo.departmentName = snapshot.val().name;
            } else {
              console.log("No data available");
            }
          });
        });
    },
    gotoSend() {
      this.$router.push({
        name: "report",
        params: { id: this.$route.params.id },
      });
    },
    switchColor(status) {
      switch (status) {
        case "Em análise":
          return "#FFC107";
        case "Aprovado":
          return "#4CAF50";
        case "Rejeitado":
          return "var(--error)";
        default:
          return "var(--on-surface)";
      }
    },
  },
};
</script>

<template>
  <div>
    <transition name="fadeup" mode="out-in">
      <h2 class="title" style="color: var(--tertiary)" v-if="memberInfo.name">
        <span
          class="material-symbols-rounded icon"
          v-on:click="$router.push({ name: 'colaboradores' })"
        >
          arrow_back_ios_new</span
        >
        {{ memberInfo.name }}
      </h2>
      <div v-else style="width: 80%; height: 65px; margin-bottom: 12px"></div>
    </transition>
    <transition name="fadeup" mode="out-in">
      <h4
        class="subtitle fadeup"
        style="color: var(--tertiary)"
        v-if="memberInfo.departmentName"
      >
        {{ memberInfo.departmentName }}
      </h4>
      <h4 v-else style="width: 120px; height: 38px"></h4>
    </transition>
    <div class="member__summary">
      <div class="member__summary__chip">
        <h4>Saldo</h4>
        <transition name="fadeup" mode="out-in">
          <span :key="memberInfo.hours">{{
            memberInfo.hours == 1
              ? memberInfo.hours + " hora"
              : memberInfo.hours + " horas"
          }}</span>
        </transition>
      </div>
      <div class="member__summary__chip">
        <h4>Última atualização</h4>
        <transition name="fadeup" mode="out-in">
          <span :key="memberInfo.changes">{{
            memberInfo.changes || ""
          }}</span></transition
        >
      </div>
    </div>
    <h3 class="secondary-title">Período atual</h3>
    <br />
    <transition name="fadeup" mode="out-in">
      <div
        class="container member__current__report"
        v-if="currentReport.status"
      >
        <svg
          version="1.1"
          id="report__icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 103.12 122.88"
          style="enable-background: new 0 0 103.12 122.88"
          xml:space="preserve"
          :fill="switchColor(currentReport.status)"
        >
          <g>
            <path
              d="M72.17,35.82l16.44,0.06c-0.02,4.38-1.78,8.58-4.9,11.65c-0.74,0.73-1.54,1.38-2.4,1.96L72.17,35.82 L72.17,35.82z M1.18,122.01C0.49,121.69,0,121,0,120.18V2c0-1.1,0.89-2,2-2H21.4h79.72c1.1,0,2,0.89,2,2v107.73 c0,0.11-0.01,0.21-0.02,0.31c-0.28,3.93-1.56,6.99-3.86,9.18c-2.3,2.18-5.53,3.4-9.72,3.64c-0.09,0.01-0.17,0.02-0.26,0.02H2.83 C2.15,122.88,1.54,122.53,1.18,122.01L1.18,122.01z M35.5,34.9h5.01c0.27,0,0.48,0.22,0.48,0.48v9.85c0,0.27-0.22,0.48-0.48,0.48 H35.5c-0.27,0-0.48-0.22-0.48-0.48v-9.85C35.02,35.12,35.23,34.9,35.5,34.9L35.5,34.9z M16.85,28.87h5.01 c0.27,0,0.48,0.22,0.48,0.48v15.89c0,0.27-0.22,0.48-0.48,0.48h-5.01c-0.27,0-0.48-0.22-0.48-0.48V29.35 C16.36,29.09,16.58,28.87,16.85,28.87L16.85,28.87L16.85,28.87z M26.18,25.48h5.01c0.27,0,0.48,0.22,0.48,0.48v19.28 c0,0.27-0.22,0.48-0.48,0.48h-5.01c-0.27,0-0.48-0.22-0.48-0.48V25.96C25.69,25.69,25.91,25.48,26.18,25.48L26.18,25.48z M99.13,109.68V3.99H21.4H3.99v114.9h85.26l0.04,0c3.21-0.18,5.61-1.04,7.2-2.55C98.06,114.85,98.93,112.62,99.13,109.68 L99.13,109.68z M16.82,106.64c-1.09,0-1.98-0.89-1.98-2c0-1.1,0.88-1.99,1.98-1.99h70.5c1.09,0,1.98,0.89,1.98,1.99 c0,1.1-0.88,2-1.98,2H16.82L16.82,106.64z M17.14,92.08c-1.09,0-1.98-0.89-1.98-2c0-1.1,0.88-2,1.98-2h70c1.09,0,1.98,0.89,1.98,2 c0,1.1-0.88,2-1.98,2H17.14L17.14,92.08z M16.82,77.52c-1.09,0-1.98-0.89-1.98-2c0-1.1,0.88-1.99,1.98-1.99h30.13 c1.09,0,1.98,0.89,1.98,1.99c0,1.1-0.88,2-1.98,2H16.82L16.82,77.52z M54.64,77.52c-1.09,0-1.98-0.89-1.98-2 c0-1.1,0.88-1.99,1.98-1.99h32.5c1.09,0,1.98,0.89,1.98,1.99c0,1.1-0.88,2-1.98,2H54.64L54.64,77.52z M16.82,64.53 c-1.09,0-1.98-0.89-1.98-2c0-1.1,0.88-2,1.98-2h24.84c1.09,0,1.98,0.89,1.98,2c0,1.1-0.88,2-1.98,2H16.82L16.82,64.53z M16.82,13.91c-1.09,0-1.98-0.89-1.98-2s0.88-2,1.98-2h14.84c1.09,0,1.98,0.89,1.98,2s-0.88,2-1.98,2H16.82L16.82,13.91z M70.49,32.56l-0.88-17.57c-0.02-0.35,0.25-0.64,0.6-0.66c0.1-0.01,0.22-0.01,0.35-0.01c0.11,0,0.23-0.01,0.35-0.01 c4.83-0.05,9.25,1.78,12.56,4.82c3.31,3.05,5.5,7.31,5.84,12.13c0.02,0.35-0.24,0.65-0.58,0.67l-17.58,1.26 c-0.35,0.02-0.65-0.24-0.67-0.58C70.49,32.59,70.49,32.57,70.49,32.56L70.49,32.56z M70.9,15.57l0.82,16.32l16.3-1.16 c-0.46-4.23-2.45-7.96-5.38-10.66c-3.08-2.84-7.21-4.54-11.7-4.49L70.9,15.57L70.9,15.57z M68.52,35.06l8.81,15.26 c-2.68,1.55-5.72,2.36-8.81,2.36c-9.73,0-17.62-7.89-17.62-17.62c0-8.74,6.41-16.17,15.06-17.43L68.52,35.06L68.52,35.06z"
            />
          </g>
        </svg>

        <div v-if="currentReport.status == 'Não enviado'">
          <h2>Envio não realizado</h2>
          <p>
            O relarório para o período atual não foi encontrado na base de
            dados.
          </p>
          <button class="button button--primary" @click="gotoSend">
            Adicionar relarório
          </button>
        </div>
        <div v-if="currentReport.status == 'Em análise'">
          <h2>Em análise</h2>
          <p>
            O relarório deste morador está em análise. Caso deseje realizar
            alguma alteração, clique no botão abaixo.
          </p>
          <button class="button button--primary" @click="gotoSend">
            Editar relarório
          </button>
        </div>
        <div v-if="currentReport.status == 'Aprovado'">
          <h2>Aprovado!</h2>
          <p>
            O relarório deste morador foi aprovado. Um novo envio será possível
            em um novo período.
          </p>
          <div class="chips__holder">
            <div class="chip">
              <span class="material-symbols-rounded icon">hourglass_empty</span>
              +{{ currentReport.hours }} horas
            </div>
            <div class="chip">
              <span class="material-symbols-rounded icon"
                >drive_folder_upload</span
              >
              {{ new Date(currentReport.date).toLocaleDateString() }}
            </div>
          </div>
        </div>

        <div v-if="currentReport.status == 'Rejeitado'">
          <h2>Rejeitado</h2>
          <p>
            O relarório deste morador foi rejeitado. Mais informações podem ser
            encontradas no campo de observações.
          </p>
          <div class="chips__holder">
            <div class="chip bad">
              <span class="material-symbols-rounded icon">hourglass_empty</span>
              {{ currentReport.hours }} horas não contabilizadas
            </div>
            <div class="chip bad">
              <span class="material-symbols-rounded icon"
                >drive_folder_upload</span
              >
              {{ new Date(currentReport.date).toLocaleDateString() }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class=""
        style="width: 100%; height: 230px; margin-bottom: 24px"
      ></div>
    </transition>
    <h3 class="secondary-title">Todos os relatórios</h3>
    <table class="table" cellspacing="0" v-if="periods != ''">
      <thead>
        <tr>
          <th>Período</th>
          <th>Data de Envio</th>
          <th>Horas</th>
          <th>Status</th>
          <th>Atividades</th>
          <th>Observações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in reports" :key="report.id">
          <td>
            {{ periods[report.id].name + " (" + periods[report.id].year + ")" }}
          </td>
          <td>{{ new Date(report.date).toLocaleDateString() }}</td>
          <td>{{ report.hours }}</td>
          <td>{{ report.status }}</td>
          <td>
            {{
              report.activities.length > 30
                ? report.activities.substring(0, 30) + "..."
                : report.activities
            }}
          </td>
          <td>{{ report.obs ? report.obs : "-" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.member__summary {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 12px;
  margin-bottom: 12px;
}

.member__summary__chip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 24px;
  color: var(--primary);
  width: auto;
  border: 1px solid var(--primary);
  margin-right: 12px;
  margin-bottom: 12px;
}

.member__summary__chip h4 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0;
}

.member__summary__chip span {
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: -8px;
}

#report__icon {
  width: 120px;
  height: 120px;
  margin-right: 24px;
}

.member__current__report {
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
}

.member__current__report > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.button {
  width: fit-content;
  margin-top: 12px;
}

.container {
  width: fit-content;
}

.table {
  margin-top: 24px;
}

.chips__holder {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 12px;
}

.chip {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 12px;
  border-radius: 24px;
  color: var(--primary);
  width: auto;
  border: 1px solid var(--primary);
  margin-right: 12px;
  margin-bottom: 12px;
}

.chip span {
  margin-right: 4px;
}

.bad {
  border-color: var(--error);
  color: var(--error);
}

@media screen and (max-width: 600px) {
  .member__summary {
    margin-top: 24px;
    margin-bottom: 24px;
  }
  .member__summary__chip {
    margin-right: 0px;
    width: 100%;
  }
}
</style>
