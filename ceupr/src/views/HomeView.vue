<script setup>
import ActionCard from "../components/ActionCard.vue";
</script>

<template>
  <main>
    <div class="head-display-card">
      <div>
        <h1 class="title">Departamentos</h1>
        <p class="subtitle">Gerencie as horas dos colaboradores.</p>
      </div>
    </div>

    <h1 class="secondary-title">Selecione o que deseja fazer</h1>

    <div class="action-cards">
      <ActionCard
        title="Colaboradores"
        subtitle="Visão geral dos colaboradores do departamento, com informações de horas e atividades."
        icon="groups"
        link="/manage/employees"
      />
      <ActionCard
        title="Enviar relatório"
        subtitle="Realizar envio de horas e atividades realizadas por colaboradores."
        icon="summarize"
        link="/send-report"
      />
    </div>
  </main>
</template>

<style scoped>
.head-display-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  background-color: var(--primary-container);
  color: var(--on-primary-container);
  border-radius: 48px;
  margin-bottom: 48px;
  padding: 48px;
}

.action-cards {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  margin-top: 24px;
}
</style>
