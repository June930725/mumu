<template>
  <div class="fullscreen text-center">
    <table>
      <tr>
        <td class="q-px-md">404</td>
        <td class="q-px-md not">NOT FOUND</td>
      </tr>
      <tr>
        <td colspan="2">
          <q-btn to="/" label="回首頁" outline rounded class="q-mt-lg" />
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss">
.fullscreen {
  background: $mu03;
}
table {
  border-spacing: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  tr:first-child {
    font-size: $s5;
    font-weight: bolder;
  }
}
td.not {
  border-left: 1.5px solid $mumu01;
}
</style>
