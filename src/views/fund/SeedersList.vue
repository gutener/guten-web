<template>
  <div class="Seeders-table">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>User</th>
          <th>Given</th>
          <th>Last Seeded</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Robert Duvak</td>
          <td>12</td>
          <td>2020-04-20</td>
        </tr>
        <tr>
          <td>Isabelle Champion</td>
          <td>32</td>
          <td>2020-04-20</td>
        </tr>
        <tr>
          <td>Alberto Tulador</td>
          <td>123</td>
          <td>2020-04-20</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    components: {}
  }
</script>
<style lang="less" scoped>
  .Seeders-table {
    .table {
      width: 100%;
      max-width: 100%;
      margin-bottom: 1rem;
      background-color: transparent;
      border-color: transparent;
    }

    .table td, .table th {
      padding: .75rem;
      vertical-align: top;
      border-top: 1px solid #dee2e6;
    }

    .table-hover tbody tr:hover {
      background-color: rgba(0, 0, 0, .075);
    }
  }
</style>