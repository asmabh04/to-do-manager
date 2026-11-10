<script setup lang="ts">
import { Status } from '../types/task'
import type { Task } from '../types/task'

// Props : données reçues du parent
defineProps<{
  task: Task
}>()

// Events envoyés au parent
const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'update-status', id: number, status: Status): void
}>()

// Liste des statuts pour remplir le menu déroulant
const statuses: Status[] = [Status.ToDo, Status.InProgress, Status.Done]

// Appelée quand l'utilisateur choisit un autre statut dans le menu déroulant.
function onChange(id: number, event: Event): void {
  const select = event.target as HTMLSelectElement // l'élément qui a déclanché l'évènement
  emit('update-status', id, select.value as Status)
}
</script>

<template>
  <li class="task">
    <span class="title" :class="{ done: task.status === Status.Done }">{{ task.title }}</span>

    <select :value="task.status" @change="onChange(task.id, $event)">
      <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
    </select>

    <button @click="emit('delete', task.id)">Supprimer</button>
  </li>
</template>

<style scoped>
.task {
  display: flex; /* mettre les éléments sur une même ligne*/
  align-items: center; /*Les centre verticalement dans la ligne*/
  gap: 0.5rem; /* l'espace entre le bouton et les options*/
  padding: 0.6rem; /*Espace à l’intérieur de la ligne, entre la bordure et le contenu.*/
  border: 1px solid #ccc; /* Une bordure 1 pixel d’épaisseur, trait plein*/
  margin-bottom: 0.5rem; /*l'espace à l’extérieur pour séparer une tâche de la suivante.*/
}
.title {
  flex: 1; /*Etirer le titre et pousser le menu et le bouton vers la droite.*/
}
.done {
  text-decoration: line-through;
  color: gray;
}
button {
  cursor: pointer;
}
</style>
