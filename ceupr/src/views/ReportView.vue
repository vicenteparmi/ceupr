<script>
import { getDatabase, ref, get } from "@firebase/database";

export default {
  name: "ReportView",
  data() {
    return {
      memberInfo: {},
      reportData: {
        hours: 0,
        activities: "",
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
              changes: snapshot.val().changes,
            };
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
  },
};
</script>

<template>
  <div>
    <div class="container">
      <h2 class="title" style="color: var(--tertiary)">
        <span class="material-symbols-rounded icon" v-on:click="$router.go(-1)"
          >arrow_back_ios_new</span
        >Relatório individual
      </h2>
      <h4 class="subtitle" style="color: var(--tertiary)">
        {{ memberInfo.name }} | {{ memberInfo.departmentName }}
      </h4>
      <!-- TODO: Fix subtitle according to department -->
      <p style="color: var(--on-surface); margin-top: 12px; max-width: 800px">
        Realize o envio do relatório do período atual para este morador. Após
        envio os dados serão verificados e o saldo de horas será atualizado
        automaticamente.
      </p>
      <div class="form">
        <!-- Quantidade de horas cumpridas -->
        <div class="form-item">
          <label for="horas">
            <span class="form-item-number">1.</span> Horas cumpridas
            <p>
              Quantidade de horas cumpridas por este morador no departamento
              durante o período atual.
            </p>
          </label>
          <input
            type="number"
            name="horas"
            id="horas"
            v-model="reportData.hours"
            min="0"
          />
        </div>
        <!-- Atividades realizadas -->
        <div class="form-item" style="width: 100%">
          <label for="atividades">
            <span class="form-item-number">2.</span> Atividades realizadas
            <p>
              Liste Abaixoas atividades realizadas pelo morador no período de
              forma detalhada.
            </p>
          </label>
          <textarea
            v-model="reportData.activities"
            name="atividades"
            id="atividades"
            rows="10"
          ></textarea>
        </div>
        <!-- Informações sobre o período -->
        <div class="form-item">
          <label for="horas">
            <span class="form-item-number">3.</span> Período atual
            <p>As informações enviadas serão referentes ao período de {{}}</p>
          </label>
        </div>
      </div>
    </div>
    <div class="container summary" style="margin-top: 24px">
      <h3 class="secondary-title">Resumo</h3>
      <p><span>Colaborador: </span> {{ memberInfo.name }}</p>
      <p><span>Departamento: </span> {{ memberInfo.departmentName }}</p>
      <p>
        <span>Saldo de horas anterior: </span> {{ memberInfo.hours }}
        {{ memberInfo.hours == 1 ? "hora" : "horas" }}
      </p>
      <p>
        <span>Horas do período: </span> {{ reportData.hours }}
        {{ reportData.hours == 1 ? "hora" : "horas" }}
      </p>
      <p><span>Período atual: </span> {{}}</p>
      <p><span>Atividades realizadas: </span> {{ reportData.activities }}</p>
      <!-- Buttons -->
      <div class="form-buttons">
        <button class="button button--primary">Enviar</button
        ><button class="button button--secondary">Cancelar</button>
      </div>
      <p>
        Ao clicar enviar você confirma que as informações aqui inseridas estão
        corretas. O status do envio poderá ser acompanhado na aba de cada
        morador de seu departamento.
      </p>
    </div>
  </div>
</template>

<style scoped>
.report-data-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  color: var(--tertiary);
  border-radius: 48px;
  margin-bottom: 48px;
  padding: 48px;
  font-weight: bold;
  border: solid 1px var(--secondary-container);
}

.form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 24px;
  justify-content: space-between;
}

.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  color: var(--on-surface);
  width: 100%;
}

.form-item > label > p {
  font-weight: normal;
  font-size: 14px;
  color: var(--on-surface);
  margin-top: 0px;
  margin-bottom: 12px;
  opacity: 0.8;
  margin-left: 18px;
}

.form-item-number {
  font-weight: bold;
  color: var(--primary);
}

.form-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 24px;
  margin-top: 24px;
}

.summary > p > span {
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .form-item {
    width: 100%;
  }
}
</style>
