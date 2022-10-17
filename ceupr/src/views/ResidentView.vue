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
      allowSend: false,
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
              exempt: snapshot.val().exempt,
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
                this.allowSend = snapshot.val().allowSend;
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
          v-on:click="$router.push({ name: 'moradores' })"
        >
          arrow_back_ios_new</span
        >
        {{ memberInfo.name }}
      </h2>
      <div v-else style="width: 80%; height: 65px; margin-bottom: 12px"></div>
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

    <!-- Dados do morador -->
    <h3 class="secondary-title">Dados do morador</h3>
    <br />
    <transition name="fadeup" mode="out-in">
      <div class="container resident_data" v-if="memberInfo">
        <div class="input">
          <label for="name">Nome</label>
          <input type="text" id="name" :value="memberInfo.name" />
        </div>
        <div class="input">
          <label for="department">Departamento</label>
          <select id="department" :value="memberInfo.departmentName">
            <option
              v-for="department in departments"
              :value="department.name"
              :key="department.id"
            >
              {{ department.name }}
            </option>
          </select>
        </div>
      </div>
      <div
        v-else
        class=""
        style="width: 100%; height: 230px; margin-bottom: 24px"
      ></div>
    </transition>

    <!-- Isenção de horas -->
    <h3 class="secondary-title">Isenção de horas</h3>
    <br />
    <transition name="fadeup" mode="out-in">
      <div v-if="memberInfo" class="exempt_section">
        <div class="container exempt_container">
          <div class="exempt_icon">
            <span class="material-symbols-rounded icon" v-if="memberInfo.exempt"
              >history_toggle_off</span
            >
            <span class="material-symbols-rounded icon" v-else>schedule</span>
          </div>
          <div class="exempt_text">
            <h4 v-if="memberInfo.exempt">Isento</h4>
            <h4 v-else>Não isento</h4>
            <span v-if="memberInfo.exempt">
              O morador está isento de cumprir horas
            </span>
            <span v-else> O morador deve cumprir horas </span>
          </div>
        </div>
        <div class="container" style="padding: 24px;">
          <div class="input">
            <label for="reason">Motivo da isenção</label>
            <input type="text" id="reason" :value="memberInfo.exemptReason" />
          </div>
        </div>
      </div>
      <div v-else style="width: 100%; height: 230px; margin-bottom: 24px"></div>
    </transition>

    <!-- Relatórios -->
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
              report.activities && report.activities.length > 30
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
.resident_data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  padding: 24px;
}

.input {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input,
select {
  background-color: transparent;
  color: var(--on-surface);
}

label {
  font-size: 14px;
  color: var(--secondary);
  margin-bottom: 4px;
}

h3 {
  margin-bottom: 0;
}

.exempt_icon span {
  font-size: 64px;
  color: var(--secondary);
}

.exempt_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 24px;
}

.exempt_text {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  text-align: center;
}

.exempt_text h4 {
  margin-bottom: 0;
  font-size: 24px;
}

.exempt_text span {
  font-size: 14px;
  color: var(--secondary);
}

.exempt_section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 24px;
}

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
  .resident_data {
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }
  input {
    margin-bottom: 0;
  }

  .exempt_section {
    grid-template-columns: 1fr;
  }

  .exempt_container {
    padding: 12px;
    flex-direction: column;
  }

  .exempt_text {
    max-width: none;
  }

  .container {
    margin-bottom: 0;
  }
}
</style>
