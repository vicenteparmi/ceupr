<script setup>
import ActionCard from "../components/ActionCard.vue";
</script>

<template>
  <div>
    <div class="head-display-card">
      <div>
        <h1 class="title">Gerenciamento</h1>
        <p class="subtitle">
          Página de acesso exclusivo do Conselho Administrativo para controle da
          plataforma.
        </p>
      </div>
    </div>
    <h1 class="secondary-title">Opções para Gerenciamento</h1>
    <div class="action-cards">
      <ActionCard
        title="Ver relatórios"
        subtitle="Ver, aprovar e rejeitar relatórios de horas e atividades enviados por colaboradores."
        icon="fact_check"
        link="/relatorio"
      />
      <ActionCard
        title="Moradores"
        subtitle="Modificar departamentos dos moradores da Fundação e acompanhar situação com atividades realizadas."
        icon="manage_accounts"
        link="/moradores"
      />
      <ActionCard
        title="Departamentos"
        subtitle="Adicionar ou remover departamentos, bem como alterar o nome e a descrição de cada um."
        icon="atr"
        link="/moradores"
      />
    </div>
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
