<script setup>
const loading = ref(false);
const msg = ref('');
const user_id = 'codewithguillaume@gmail.com';
const action = 'read';
const resource = 'documents';

onMounted(async () => {
  loading.value = true;
  const response = await fetch(`/api/permission`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id,
      action,
      resource,
    }),
  });
  loading.value = false;
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  const { message } = data;
  msg.value = message;
})
</script>

<template>
  <div class="container mx-auto my-2 text-center">
    <div v-if="loading">Loading...</div>
    <div v-if="!loading">{{ msg }}</div>
  </div>
</template>
