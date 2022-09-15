<script></script>

<template>
  <div>
    <div class="report-data-card">
      <h2 class="title" style="margin-bottom: 0">Relatório individual</h2>
      <h4 class="subtitle">Departamento de <span>manutenção</span></h4>
      <!-- TODO: Fix subtitle according to department -->
      <p style="color: var(--on-surface); margin-top: 12px; max-width: 800px">
        Envie o relatório individual de cada colaborador do departamento. Caso
        não encontre o nome de algum colaborador, entre em contato com o
        Conselho Administrativo.
      </p>
      <div class="form">
        <!-- Nome do colaborador -->
        <div class="form-item">
          <label for="colab">
            <span class="form-item-number">1.</span> Colaborador
          </label>
          <select name="colab" id="colab">
            <option value="1">João da Silva</option>
            <option value="2">Maria da Silva</option>
            <option value="3">José da Silva</option>
          </select>
        </div>
        <!-- Quantidade de horas cumpridas -->
        <div class="form-item">
          <label for="horas">
            <span class="form-item-number">2.</span> Horas cumpridas
          </label>
          <input type="time" name="horas" id="horas" />
        </div>
        <!-- Atividades realizadas -->
        <div class="form-item" style="width: 100%">
          <label for="atividades">
            <span class="form-item-number">3.</span> Atividades realizadas
          </label>
          <textarea name="atividades" id="atividades" rows="10"></textarea>
        </div>
        <!-- Preíodo -->
        <div class="form-item">
          <label for="periodo">
            <span class="form-item-number">4.</span> Mês de referência
          </label>
          <select name="periodo" id="periodo">
            <!-- Months -->
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </div>
        <!-- Ano -->
        <div class="form-item">
          <label for="ano">
            <span class="form-item-number">5.</span> Ano
          </label>
          <select name="ano" id="ano">
            <!-- Years -->
            <option value="2021">2021</option>
            <option value="2022" selected>2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>
        </div>
        <!-- Buttons -->
        <div class="form-buttons">
          <button class="button button--primary">Enviar</button
          ><button class="button button--secondary">Cancelar</button>
        </div>
      </div>
    </div>
    <h1 class="secondary-title">Últimos envios</h1>
    <div id="latest-reports">Não foram encontrados envios recentes.</div>
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
  width: 48%;
}

.form-item-number {
  font-weight: bold;
  color: var(--primary);
}

.form-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
</style>
