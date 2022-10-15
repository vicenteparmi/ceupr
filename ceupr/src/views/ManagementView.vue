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
          Página de acesso exclusivo de administradores para controle da
          plataforma
        </p>
      </div>
    </div>
    <h3 class="secondary-title">Relatórios</h3>
    <div class="action-cards">
      <ActionCard
        title="Ver relatórios"
        subtitle="Ver, aprovar e rejeitar relatórios de horas e atividades enviados por colaboradores."
        icon="fact_check"
        link="/revisar"
      />
      <ActionCard
        title="Alteração em grupo"
        subtitle="Modificar horas e atividades de diversos colaboradores de uma só vez."
        icon="component_exchange"
        link="/revisar"
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
    <h3 class="secondary-title">Apresentação e postagens</h3>
    <div class="action-cards">
      <ActionCard
        title="Postagens"
        subtitle="Adicionar ou remover postagens da página inicial da plataforma."
        icon="post_add"
        link="/postagens"
      />
    </div>
  </div>
</template>
