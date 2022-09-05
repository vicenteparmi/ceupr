<template>
  <div class="report-data-card">
    <h2 class="title" style="margin-bottom: 0">Relatório individual</h2>
    <h4 class="subtitle">Período: <span>Setembro 2022</span></h4>
    <p style="color: var(--on-surface); margin-top: 12px; max-width: 800px">
      Envie o relatório individual de cada colaborador do departamento. Caso não
      encontre o nome de algum colaborador, entre em contato com o Conselho
      Administrativo.
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
    </div>
    <!-- Buttons -->
    <div class="form-buttons">
      <button class="button button--primary">Enviar</button
      ><button class="button button--secondary">Cancelar</button>
    </div>
  </div>
  <h1 class="secondary-title">Últimos envios</h1>
  <div id="latest-reports">Não foram encontrados envios recentes.</div>
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
