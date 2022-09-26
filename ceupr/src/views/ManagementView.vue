<script setup>
import ActionCard from "../components/ActionCard.vue";
import MobileTopLogo from "../components/MobileTopLogo.vue";
</script>

<template>
  <div>
    <MobileTopLogo />
    <div class="head-display-card">
      <div>
        <h1 class="title">Gerenciamento</h1>
        <p class="subtitle">
          Página de acesso exclusivo do Conselho Administrativo para controle da
          plataforma.
        </p>
      </div>
    </div>
    <h3 class="secondary-title">Relatórios</h3>
    <div class="action-cards">
      <ActionCard
        title="Ver relatórios"
        subtitle="Ver, aprovar e rejeitar relatórios de horas e atividades enviados por colaboradores."
        icon="fact_check"
        link="/relatorio"
      />
      <ActionCard
        title="Configurações de envio"
        subtitle="Definir o período de envio de relatórios e o limite de horas cumpridas por período."
        icon="settings"
        link="/configuracoes"
      />
    </div>
    <h3 class="secondary-title">Controle de departamentos e pessoas</h3>
    <div class="action-cards">
      <ActionCard
        title="Moradores"
        subtitle="Modificar departamentos dos moradores da Fundação e acompanhar situação com atividades realizadas."
        icon="location_away"
        link="/moradores"
      />
      <ActionCard
        title="Departamentos"
        subtitle="Adicionar ou remover departamentos, bem como alterar o nome e a descrição de cada um."
        icon="atr"
        link="/departamentos"
      />
      <ActionCard
        title="Contas"
        subtitle="Definir cargos e permissões de acesso para usuários da plataforma."
        icon="manage_accounts"
        link="/contas"
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

@media only screen and (max-width: 600px) {
  .action-cards {
    justify-content: center;
    flex-wrap: nowrap;
    flex-direction: column;
  }
}

</style>
