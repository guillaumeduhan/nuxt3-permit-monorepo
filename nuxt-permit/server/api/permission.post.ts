export default defineEventHandler(async (event) => {
  const {
    user_id,
    action,
    resource,
  }: any = await readBody(event);

  const response: any = await $fetch(`http://localhost:4000`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id,
      action,
      resource,
    })
  });

  if (response.status === 200) {
    return response;
  } else {
    throw new Error(`Request failed with status ${response.status}`);
  }
})