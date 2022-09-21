<script setup>
import ActionCard from "../components/ActionCard.vue";
</script>

<template>
  <div>
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
          link="/colaboradores"
        />
        <ActionCard
          title="Enviar relatório"
          subtitle="Realizar envio de horas e atividades realizadas por colaboradores."
          icon="summarize"
          link="/relatorio"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.action-cards {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  margin-top: 24px;
}
</style>
