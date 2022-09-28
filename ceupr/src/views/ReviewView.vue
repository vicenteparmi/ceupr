<script>
import {
  getDatabase,
  ref,
  get,
  update,
  runTransaction,
} from "@firebase/database";
import ReportReviewPopup from "../components/ReportReviewPopup.vue";

export default {
  name: "ReviewView",
  data() {
    return {
      users: [],
      review: [],
      openReport: {},
      popupOpen: false,
      hoursPerPeriod: 0,
      notSentOpen: false,
      notSent: [],
    };
  },
  mounted() {
    this.getReports();

    // Get hours per period
    const db = getDatabase();
    const hoursRef = ref(db, "settings");
    get(hoursRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.hoursPerPeriod = snapshot.val().monthHours;
      }
    });
  },
  methods: {
    async getReports() {
      // Disclaimer: This loads a lot of data, so it's not recommended to load multiple times.
      const db = getDatabase();
      const reportsRef = ref(db, "residents");
      get(reportsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            let userList = snapshot.val();
            for (let user in userList) {
              this.users.push({
                name: userList[user].name,
                id: user,
                department: userList[user].department,
                change: userList[user].change,
                hours: userList[user].hours,
                exempt: userList[user].exempt,
              });
              let reportList = userList[user].reports;
              for (let report in reportList) {
                // Only show reports that are not approved
                if (
                  reportList[report].status == "Em análise" ||
                  reportList[report].status == undefined
                ) {
                  this.review.push({
                    name: userList[user].name,
                    id: user,
                    department: userList[user].department,
                    date: reportList[report].date,
                    reportId: report,
                    sentBy: reportList[report].sentBy,
                    reportHours: reportList[report].hours,
                    status: reportList[report].status || "Em análise",
                    activities: reportList[report].activities,
                    userHours: userList[user].hours,
                  });
                }
              }
            }
          }
        })
        .then(() => {
          // Set department names
          const departmentsRef = ref(db, "departments");
          get(departmentsRef).then((snapshot) => {
            if (snapshot.exists()) {
              snapshot.forEach((department) => {
                this.review.forEach((report) => {
                  if (report.department == department.key) {
                    report.department = department.val().name;
                  }
                });
              });
            }
          });
        })
        .then(() => {
          // Set period names and get settings
          const periodsRef = ref(db, "settings");
          get(periodsRef).then((snapshot) => {
            if (snapshot.exists()) {
              let settings = snapshot.val();
              this.review.forEach((report) => {
                report.period =
                  settings.periods[report.reportId].name +
                  " " +
                  settings.periods[report.reportId].year;
              });
            }
          });
        })
        .then(() => {
          // Get director name
          const directorRef = ref(db, "users");
          get(directorRef).then((snapshot) => {
            if (snapshot.exists()) {
              let users = snapshot.val();
              this.review.forEach((report) => {
                report.sentBy = users[report.sentBy].name;
              });
            }
          });
        });
    },
    openReportPopup(report) {
      this.openReport = report;
      this.popupOpen = true;
    },
    updateList(report) {
      // Remove report from list
      this.review = this.review.filter((item) => item.reportId !== report);
      // Remove report from table
      console.log(report);
      document.getElementById(report.reportId).remove();

      // User
      this.users.forEach((user) => {
        if (user.id == report.id) {
          user.hours = report.userHours;
        }
      });

      // Update user hours on other reports
      this.review.forEach((reporta) => {
        if (reporta.id == report.id) {
          reporta.userHours = report.userHours;
        }
      });
    },
    updateAll(mode) {
      // Confirm
      if (
        !confirm(
          "Tem certeza que deseja realizar essa ação em todos os relatórios? \n Essa ação não pode ser desfeita."
        )
      ) {
        return;
      }
      // Update all reports on firebase
      const db = getDatabase();

      this.review.forEach((report) => {
        // Update user hours
        let finalHours =
          parseFloat(report.userHours) +
          parseFloat(report.reportHours) -
          parseFloat(this.hoursPerPeriod);

        let normalHours =
          parseFloat(report.userHours) - parseFloat(this.hoursPerPeriod);

        // Update report on firebase
        const reportRef = ref(
          db,
          "residents/" + report.id + "/reports/" + report.reportId
        );
        update(reportRef, {
          status: mode,
        });

        // Update user on firebase
        const userRef = ref(db, "residents/" + report.id);
        update(userRef, {
          hours: mode == "Aprovado" ? finalHours : normalHours,
          change: Date.now(),
        });

        // Update report list
        this.review = this.review.filter(
          (item) => item.reportId !== report.reportId
        );

        // Update user hours on other reports
        this.review.forEach((reporta) => {
          if (reporta.id == report.id) {
            reporta.userHours = mode == "Aprovado" ? finalHours : normalHours;
            console.log(reporta.userHours, finalHours, normalHours);
          }
        });
      });
    },
    async getNotSent() {
      // Empty not sent list
      this.notSent = [];

      // Get missing reports for all residents from all periods
      const db = getDatabase();
      const periodsRef = ref(db, "settings/periods");

      let periodsArray = [];
      let residentsArray = [];

      get(periodsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            for (let period in snapshot.val()) {
              periodsArray.push({
                id: period,
                name: snapshot.val()[period].name,
                year: snapshot.val()[period].year,
              });
            }
          }
        })
        .then(() => {
          const residentsRef = ref(db, "residents");
          get(residentsRef)
            .then((snapshot) => {
              if (snapshot.exists()) {
                let residents = snapshot.val();
                for (let resident in residents) {
                  residentsArray.push({
                    id: resident,
                    name: residents[resident].name,
                    department: residents[resident].department,
                    reports: residents[resident].reports || {},
                    exempt: residents[resident].exempt,
                  });
                }
              }
            })
            .then(() => {
              // Check if resident has report for each period
              residentsArray.forEach((resident) => {
                periodsArray.forEach((period) => {
                  if (resident.reports[period.id] == undefined) {
                    this.notSent.push({
                      name: resident.name,
                      department: resident.department,
                      period: period.name + " " + period.year,
                      periodId: period.id,
                      residentId: resident.id,
                      exempt: resident.exempt,
                    });
                  }
                });
              });
            })
            .then(() => {
              // Add report to exempt residents
              this.notSent.forEach((report) => {
                if (report.exempt) {
                  const reportRef = ref(
                    db,
                    "residents/" +
                      report.residentId +
                      "/reports/" +
                      report.periodId
                  );
                  update(reportRef, {
                    status: "Aprovado",
                    activities: "Isento de horas",
                    date: Date.now(),
                    hours: 0,
                  });
                }
              });

              // Remove exempt residents
              this.notSent = this.notSent.filter(
                (resident) => resident.exempt == false
              );
            });
        })
        .then(() => {
          // Open popup
          this.notSentOpen = true;
        });
    },
    updateNotSent(user, mode) {
      // Confirm
      if (
        !confirm(
          "Tem certeza que deseja realizar essa ação em todos os relatórios? \n Essa ação não pode ser desfeita."
        )
      ) {
        return;
      }

      // Add report to user
      const db = getDatabase();
      const reportRef = ref(
        db,
        "residents/" + user.residentId + "/reports/" + user.periodId
      );
      update(reportRef, {
        status: "Não enviado",
        date: Date.now(),
        obs: "Relatório não enviado pelo diretor",
      });

      // Update hours for user
      if (!mode) {
        const userRef = ref(db, "residents/" + user.residentId + "/hours");
        runTransaction(userRef, (current_value) => {
          return (current_value || 0) - this.hoursPerPeriod;
        });
      }

      // Remove this report from not sent list
      this.notSent = this.notSent.filter(
        (item) =>
          item.periodId !== user.periodId || item.residentId !== user.residentId
      );

      // Last change date
      const lastChangeRef = ref(db, "residents/" + user.residentId);
      update(lastChangeRef, {
        change: Date.now(),
      });
    },
    massUpdate(mode) {
      // Confirm
      if (
        !confirm(
          "Tem certeza que deseja realizar essa ação em todos os relatórios? \n Essa ação não pode ser desfeita."
        )
      ) {
        return;
      }

      // Update all reports on firebase
      const db = getDatabase();

      this.notSent.forEach((report) => {
        // Update report on firebase
        const reportRef = ref(
          db,
          "residents/" + report.residentId + "/reports/" + report.periodId
        );
        update(reportRef, {
          status: "Não enviado",
          date: Date.now(),
          obs: "Relatório não enviado pelo diretor",
        });

        // Update user on firebase
        if (!mode) {
          const userRef = ref(db, "residents/" + report.residentId + "/hours");
          runTransaction(userRef, (current_value) => {
            return (current_value || 0) - this.hoursPerPeriod;
          });
        }

        // Last change date
        const lastChangeRef = ref(db, "residents/" + report.residentId);
        update(lastChangeRef, {
          change: Date.now(),
        });
      });

      // Remove all reports from not sent list
      this.notSent = [];
    },
  },
  components: { ReportReviewPopup },
};
</script>

<template>
  <div>
    <h2 class="title" style="color: var(--tertiary)">
      <span class="material-symbols-rounded icon" v-on:click="$router.go(-1)"
        >arrow_back_ios_new</span
      >
      Relatórios
    </h2>
    <h4 class="subtitle" style="color: var(--tertiary)">
      Revisar os relatórios enviados
    </h4>
    <p>
      Todos os relatórios enviados pelos colaboradores que ainda não foram
      revisados estão listados abaixo. Você pode aprovar ou rejeitar cada um
      deles.
    </p>
    <div class="button-opt-h">
      <button class="button-popup t" v-on:click="updateAll('Aprovado')">
        <span class="material-symbols-rounded icon">recommend</span>
        Aprovar todos
      </button>
      <button class="button-popup error t" v-on:click="updateAll('Rejeitado')">
        <span class="material-symbols-rounded icon">delete_forever</span>
        Rejeitar todos
      </button>
      <button
        class="button-popup t"
        v-on:click="getNotSent"
        style="
          background-color: transparent;
          color: var(--on-secondary-container);
        "
      >
        <span class="material-symbols-rounded icon">assignment_late</span>
        Contabilizar horas dos não enviados
      </button>
    </div>

    <table class="table" cellspacing="0">
      <thead>
        <tr>
          <th>Morador</th>
          <th>Departamento</th>
          <th>Período</th>
          <th>Horas do Período</th>
          <th>Atividades</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="review.length == 0">
          <td colspan="6">Nenhum relatório para revisar</td>
        </tr>
        <tr
          v-for="report in review"
          :key="report.id"
          :id="report.reportId"
          v-on:click="openReportPopup(report)"
        >
          <td>{{ report.name }}</td>
          <td>{{ report.department }}</td>
          <td>{{ report.period }}</td>
          <td style="text-align: center">{{ report.reportHours }}</td>
          <td>
            {{
              report.activities.length > 20
                ? report.activities.substring(0, 20) + "..."
                : report.activities
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <transition name="fade">
      <ReportReviewPopup
        :report="openReport"
        v-if="popupOpen"
        v-on:close="popupOpen = false"
        v-on:update="updateList"
    /></transition>
    <transition name="fade">
      <div class="popup-bg" v-if="notSentOpen">
        <div class="popup-card">
          <div class="popup-header">
            <h2>Relatórios não enviados</h2>
          </div>
          <div class="popup-body">
            <p>
              Os relatórios para os moradores abaixo não foram enviados pelos
              colaboradores. Moradores isentos serão marcados como não enviados
              mas sem alteração de horas automaticamente.
            </p>
            <br />
            <p>
              Clique em contabilizar para <b>remover as horas mensais</b> desses
              moradores ou clique no botão de cada um para marcar como não
              enviado mas sem remover horas.
            </p>
            <br />
            <p>
              Clique em
              <span class="material-symbols-rounded icon nsB">close</span> para
              marcar como não enviado e remover horas ou em
              <span class="material-symbols-rounded icon nsB">check</span> para
              marcar como não enviado mas sem remover horas.
            </p>
            <div class="button-opt-h">
              <button
                class="button-popup t"
                v-on:click="notSentOpen = false"
                style="
                  background-color: transparent;
                  color: var(--on-secondary-container);
                "
              >
                <span class="material-symbols-rounded icon">close</span>
                Fechar
              </button>
              <button class="button-popup t" v-on:click="massUpdate(true)">
                <span class="material-symbols-rounded icon">done</span>
                Não alterar horas
              </button>
              <button
                class="button-popup error t"
                v-on:click="massUpdate(false)"
              >
                <span class="material-symbols-rounded icon">close</span>
                Remover horas
              </button>
            </div>
            <div class="notSentList">
              <div
                v-for="user in notSent"
                :key="user.id"
                class="notSentItem fadeup"
              >
                <div class="notSentItemName">{{ user.name }}</div>
                <div class="notSentItemPeriod">{{ user.period }}</div>
                <div class="notSentItemOptions">
                  <span
                    class="material-symbols-rounded icon nsB"
                    v-on:click="updateNotSent(user, true)"
                    >done</span
                  >
                  <span
                    class="material-symbols-rounded icon nsB"
                    v-on:click="updateNotSent(user, false)"
                    >close</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.table {
  margin-top: 24px;
}

.button-opt-h {
  display: flex;
  justify-content: left;
  margin-top: 24px;
  width: fit-content;
  flex-wrap: wrap;
}

.t {
  width: fit-content;
  padding: 8px 16px;
  background-color: var(--primary-container);
  color: var(--on-primary-container);
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.t span {
  margin-right: 8px;
}

.error {
  background-color: var(--on-error);
  color: var(--error);
}

.notSentList {
  margin-top: 16px;
}

.notSentItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  color: var(--on-secondary-container);
  margin-bottom: 8px;
  border-radius: 8px;
  border: 1px solid var(--secondary);
}

.nsB {
  color: var(--secondary-container);
  background-color: var(--on-secondary-container);
  font-size: 16px;
  padding: 4px;
  border-radius: 50%;
  margin-left: 8px;
  cursor: pointer;
  box-shadow: 0 0 0 1px var(--secondary);
}

@media screen and (max-width: 600px) {
  .button-opt-h {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }

  .button-popup {
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding: 4px 8px;
  }
}
</style>
