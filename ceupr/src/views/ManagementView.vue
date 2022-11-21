<script setup>
import ActionCard from "../components/ActionCard.vue";
import MobileTopLogo from "../components/MobileTopLogo.vue";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
</script>

<script>
export default {
  name: "ManagementView",
  mounted() {
    // Check if user is logged in and has the adm role
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const db = getDatabase();
        const admRef = ref(db, "users/" + user.uid);
        get(admRef)
          .then((snapshot) => {
            if (snapshot.exists() && snapshot.val().adm) {
              this.isAdm = true;
            } else {
              this.$router.push({ name: "inicio" });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.$router.push({ name: "inicio" });
      }
    });
  },
}
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
        class="disabledCard"
        title="Alteração em grupo"
        subtitle="Modificar horas e atividades de diversos colaboradores de uma só vez."
        icon="component_exchange"
        link=""
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
        title="Contas"
        subtitle="Definir cargos e permissões de acesso para usuários da plataforma."
        icon="manage_accounts"
        link="/contas"
      />
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

<style>
.disabledCard {
  opacity: 0.5;
  pointer-events: none;
}
</style>