<script setup>
import { getDatabase, ref, get, update, remove } from "firebase/database";
</script>

<script>
export default {
  name: "AccountsView",
  data() {
    return {
      accounts: [],
      departments: [],
      editFields: {
        name: "",
        roles: {
          adm: false,
          director: false,
        },
        open: false,
        id: "",
      },
    };
  },
  mounted() {
    this.getDepartments();
    this.getAccounts();
    console.log(this.departments);
  },
  methods: {
    getDepartments() {
      const db = getDatabase();
      const departmentsRef = ref(db, "departments");
      get(departmentsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              this.departments.push({
                id: childSnapshot.key,
                name: childSnapshot.val().name,
              });
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getAccounts() {
      const db = getDatabase();
      const accountsRef = ref(db, "users");
      get(accountsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Clear accounts array
            this.accounts = [];
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              this.accounts.push({
                id: childSnapshot.key,
                name: childData.name,
                department:
                  this.departments.find(
                    (department) => department.id === childData.department
                  )?.name || "Sem departamento",
                roles: {
                  adm: childData.adm,
                  director: childData.department,
                },
                email: childData.email,
              });
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editAccount(account) {
      this.editFields.name = account.name;
      this.editFields.roles = {
        adm: account.roles.adm,
      };
      this.editFields.department = account.roles.director;

      this.editFields.id = account.id;
      this.editFields.open = true;
    },
    saveEdit() {
      this.editFields.open = false;

      const db = getDatabase();
      console.log(this.editFields.id);
      const accountsRef = ref(db, "users/" + this.editFields.id);
      update(accountsRef, {
        name: this.editFields.name,
        adm: this.editFields.roles.adm,
        department:
          this.editFields.department == "-1"
            ? null
            : this.editFields.department,
      })
        .then(() => {
          console.log("Account updated successfully!");
          this.getAccounts();
        })
        .catch((error) => {
          console.error("Error updating account: ", error);
        });
    },
    deleteAccount(account) {
      const db = getDatabase();
      const accountsRef = ref(db, "users/" + account.id);
      confirm("Tem certeza que deseja excluir a conta do " + account.name + "?")
        ? remove(accountsRef)
            .then(() => {
              console.log("Account deleted successfully!");
              this.getAccounts();
            })
            .catch((error) => {
              console.error("Error deleting account: ", error);
            })
        : console.log("Account not deleted");
    },
  },
};
</script>

<template>
  <div>
    <h2 class="title" style="color: var(--tertiary)">
      <span class="material-symbols-rounded icon" v-on:click="$router.go(-1)"
        >arrow_back_ios_new</span
      >
      Contas
    </h2>
    <h4 class="subtitle" style="color: var(--tertiary)">
      Controle de usuários da plataforma
    </h4>
    <table class="table" cellspacing="0" style="margin-top: 24px">
      <thead>
        <tr style="cursor: default">
          <th style="width: 30%">Nome</th>
          <th style="width: 25%">Email</th>
          <th style="width: 25%">Departamento</th>
          <th style="width: 10%">Permissões</th>
          <th style="width: 10%">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in accounts" :key="account.id">
          <td>{{ account.name }}</td>
          <td>{{ account.email }}</td>
          <td>{{ account.department }}</td>
          <td style="text-align: center">
            <span v-if="account.roles.adm" class="material-symbols-rounded icon"
              >admin_panel_settings</span
            >
            <span
              v-if="
                account.roles.director != '' && account.roles.director != null
              "
              class="material-symbols-rounded icon"
              >supervisor_account</span
            >
            <span
              v-if="
                account.roles.adm == false &&
                (account.roles.director == null || account.roles.director == '')
              "
              class="material-symbols-rounded icon"
              >spa</span
            >
          </td>
          <td style="text-align: center">
            <span
              class="material-symbols-rounded icon"
              v-on:click="editAccount(account)"
              >edit</span
            >
            <span
              class="material-symbols-rounded icon"
              v-on:click="deleteAccount(account)"
              >delete</span
            >
          </td>
        </tr>
      </tbody>
    </table>
    <div class="container" style="margin-top: 24px">
      <h2 class="secondary-title">
        Entendendo melhor as permissões de usuários
      </h2>
      <br />
      <p>A plataforma possui 3 níveis de acesso possíveis:</p>
      <br />
      <div>
        <div class="info__block">
          <div>
            <span class="material-symbols-rounded icon"
              >admin_panel_settings</span
            >
            <span>Administrador</span>
          </div>
          <p>
            Tem acesso a todas as funcionalidades da plataforma, podendo
            gerenciar usuários, departamentos, relatórios e atividades. Este
            cargo altera o nível de acesso dos demais usuários.
          </p>
        </div>
        <div class="info__block">
          <div>
            <span class="material-symbols-rounded icon"
              >supervisor_account</span
            >
            <span>Diretor de Departamento</span>
          </div>
          <p>
            Tem acesso a lista de colaboradores de seu departamento, sendo
            possível realizar o envio de relatórios individuais e acompanhamento
            das atividades.
          </p>
        </div>
        <div class="info__block">
          <div>
            <span class="material-symbols-rounded icon">spa</span>
            <span>Acesso básico</span>
          </div>
          <p>
            Ao realizar login na plataforma, o usuário recebe este nível. Não é
            possível acessar nenhuma funcionalidade, além de visualizar a tela
            inicial, até que um cargo seja o atribuído.
          </p>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="popup-bg" v-if="editFields.open">
        <div class="popup-card">
          <h2 class="popup-header">Editar conta</h2>
          <div class="popup-body">
            <div>
              <label for="name">Nome</label>
              <input type="text" id="name" v-model="editFields.name" />
            </div>
            <div>
              <label for="permissions">Permissões</label>
              <div class="accounts__edit__body__item__permissions">
                <label class="pure-material-checkbox">
                  <input type="checkbox" v-model="editFields.roles.adm" />
                  <span>Administrador</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <!-- Select department -->
            <label for="department">Departamento</label>
            <select
              id="department"
              v-model="editFields.department"
              style="width: 100%"
            >
              <option disabled value="">Selecione um departamento</option>
              <option
                v-for="department in departments"
                :key="department.id"
                :value="department.id"
              >
                {{ department.name }}
              </option>
            </select>
          </div>
          <div class="popup-button-holder">
            <button
              class="button-popup secondary"
              v-on:click="editFields.open = false"
            >
              Cancelar</button
            ><button class="button-popup" v-on:click="saveEdit(editFields.id)">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.info__block {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.info__block > div {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.info__block > div > span {
  margin-right: 8px;
  font-weight: 600;
}

.info__block > p {
  margin-left: 32px;
}

.popup-warning {
  color: var(--on-secondary-container);
  font-size: 12px;
  margin: 16px 0;
}
</style>
