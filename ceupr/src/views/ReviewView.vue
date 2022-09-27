<script>
import { getDatabase, ref, get, update } from "@firebase/database";
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
  </div>
</template>

<style>
.table {
  margin-top: 24px;
}

.button-opt-h {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  width: fit-content;
}

.t {
  width: fit-content;
  padding: 8px 16px;
  background-color: var(--primary-container);
  color: var(--on-primary-container);
  display: flex;
  align-items: center;
}

.t span {
  margin-right: 8px;
}

.error {
  background-color: var(--on-error);
  color: var(--error);
}
</style>
