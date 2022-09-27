<script>
import { getDatabase, ref, get, update } from "@firebase/database";

export default {
  name: "ReportReviewPopup",
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.report.name,
      id: this.report.id,
      department: this.report.department,
      date: this.report.date,
      reportId: this.report.reportId,
      sentBy: this.report.sentBy,
      reportHours: this.report.reportHours,
      status: this.report.status,
      activities: this.report.activities,
      period: this.report.period,
      userHours: this.report.userHours,
      hourtPerPeriod: 0,
      obs: "",
    };
  },
  mounted() {
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
    close() {
      this.$emit("close");
    },
    updateStatus(finalStatus) {
      let finalHours =
        parseFloat(this.reportHours) +
        parseFloat(this.userHours) -
        parseFloat(this.hoursPerPeriod);

      let normalHours =
        parseFloat(this.userHours) - parseFloat(this.hoursPerPeriod);

      const db = getDatabase();
      const reportRef = ref(
        db,
        `residents/${this.id}/reports/${this.reportId}`
      );
      update(reportRef, {
        status: finalStatus,
        obs: this.obs,
      });
      const userRef = ref(db, `residents/${this.id}`);
      update(userRef, {
        hours: finalStatus == "Aprovado" ? finalHours : normalHours,
        change: Date.now(),
      });

      console.log(finalHours);

      this.$emit("update", this.report);
      this.close();
    },
  },
};
</script>

<template>
  <div class="report__view__popup popup-bg">
    <button class="close-popup" @click="close">
      <span class="material-symbols-rounded icon">close</span>
    </button>
    <div class="popup-card">
      <div class="popup-header">
        <h2>Relatório individual</h2>
        <br />

        <div class="tile-holder">
          <div class="tile-title">Nome do morador:</div>
          <div class="tile-content">{{ name }}</div>
        </div>
        <div class="tile-holder">
          <div class="tile-title">Departamento:</div>
          <div class="tile-content">{{ department }}</div>
        </div>
        <div class="tile-holder">
          <div class="tile-title">Período:</div>
          <div class="tile-content">{{ period }}</div>
        </div>
        <div class="tile-holder">
          <div class="tile-title">Data de envio:</div>
          <div class="tile-content">
            {{ new Date(date).toLocaleString() }}
          </div>
        </div>
        <div class="tile-holder">
          <div class="tile-title">Enviado por:</div>
          <div class="tile-content">{{ sentBy }}</div>
        </div>
        <div class="tile-holder">
          <div class="tile-title">Horas cumpridas no período:</div>
          <div class="tile-content">
            {{ reportHours }} {{ reportHours == 1 ? "hora" : "horas" }}
          </div>
        </div>
        <div class="tile-holder">
          <div class="tile-title">Status:</div>
          <div class="tile-content">{{ status }}</div>
        </div>
        <div
          class="tile-holder"
          style="flex-direction: column; align-items: flex-start"
        >
          <div class="tile-title">Atividades realizadas:</div>
          <div
            class="tile-content"
            style="width: 100%; margin-left: 0; margin-top: 8px"
          >
            {{ activities }}
          </div>
        </div>
        <div
          class="tile-holder"
          style="flex-direction: column; align-items: flex-start"
        >
          <div class="tile-title">Escrever observações</div>
          <textarea v-model="obs" name="obs" rows="5"></textarea>
        </div>
        <br />
        <div class="tile-holder">
          <button class="button-popup secondary" @click="close">
            Cancelar
          </button>
          <button class="button-popup error" @click="updateStatus('Rejeitado')">
            Rejeitar
          </button>
          <button class="button-popup" @click="updateStatus('Aprovado')">
            Aprovar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.tile-holder {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  color: var(--on-secondary-container);
}

.tile-title {
  font-weight: bold;
  font-size: 16px;
}

.tile-content {
  font-size: 16px;
  padding: 2px 4px;
  border-radius: 8px;
  border: 1px solid var(--on-secondary-container);
  margin-left: 8px;
  font-weight: normal;
}

textarea {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--on-secondary-container);
  font-weight: normal;
  font-size: 16px;
  color: var(--on-secondary-container);
  background-color: var(--secondary-container);
  margin-top: 8px;
}
</style>
