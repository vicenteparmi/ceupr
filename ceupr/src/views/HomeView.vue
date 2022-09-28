<script setup>
import ActionCard from "../components/ActionCard.vue";
import MobileTopLogo from "../components/MobileTopLogo.vue";
</script>

<template>
  <div>
    <main>
      <MobileTopLogo />
      <div class="head-display-card">
        <div>
          <h1 class="title">Departamentos</h1>
          <p class="subtitle">Gerencie as horas dos colaboradores</p>
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
