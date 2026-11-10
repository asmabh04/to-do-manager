<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import type { Task, Status } from '../types/task'

defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'update-status', id: number, status: Status): void
}>()
</script>

<template>
  <p v-if="tasks.length === 0">Aucune tâche pour le moment.</p>
  <ul v-else class="list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @delete="(id) => emit('delete', id)"
      @update-status="(id, status) => emit('update-status', id, status)"
    />
  </ul>
</template>

<style scoped>
.list {
  list-style: none; /*supprimer les puces d'une liste*/
  padding: 0; /*Espace à l’intérieur de la ligne, entre la bordure et le contenu.*/
}
</style>
