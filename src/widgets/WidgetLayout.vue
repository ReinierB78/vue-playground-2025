<template>
  <div class="border rounded-xl shadow">
    <div class="p-4">
      <slot name="title"></slot>
    </div>
    <hr />
    <div class="p-4">
      <slot name="content"></slot>
    </div>
    <hr />
    <div class="p-4">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
