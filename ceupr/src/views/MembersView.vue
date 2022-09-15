<script setup>
import ColabCard from "../components/ColabCard.vue";
</script>

<template>
  <div>
    <div>
      <h2 class="title" style="color: var(--tertiary)">Colaboradores</h2>
      <h4 class="subtitle" style="color: var(--tertiary)">
        Departamento de <span>manutenção</span>
      </h4>
      <!-- TODO: Fix subtitle according to department -->
      <p style="color: var(--on-surface); margin-top: 12px; max-width: 800px">
        Abaixo é possível encontrar a lista completa dos colaboradores para o
        departamento que administra. Caso esteja faltando algum colaborador,
        entre em contato com o Conselho Administrativo.
      </p>
    </div>
    <div id="colabList">
      <ColabCard name="João da Silva" hours="40" changes="10/02/2021" id="1" />
      <ColabCard name="Maria da Silva" hours="40" changes="10/02/2021" id="2" />
    </div>
  </div>
</template>

<style scoped>
#colabList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 24px;
}
</style>
