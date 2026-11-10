<script setup lang="ts">
import { ref, watch } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import { Status } from './types/task'
import type { Task } from './types/task'

const STORAGE_KEY = 'tasks'

// Récupère les tâches depuis le localStorage
function loadTasks(): Task[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return []
  try {
    return JSON.parse(saved) as Task[]
  } catch {
    return [] 
  }
}

const tasks = ref<Task[]>(loadTasks())

// On génère les identifiant pour chaque nouvelle tâche
function generateId(): number {
  if (tasks.value.length === 0) return 1
  return Math.max(...tasks.value.map((t) => t.id)) + 1
}

function addTask(title: string): void {
  const newTask: Task = {
    id: generateId(),
    title: title,
    status: Status.ToDo, // statut par défaut
  }
  tasks.value.push(newTask)
}

function deleteTask(id: number): void {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}

function updateStatus(id: number, status: Status): void {
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.status = status
}

// À chaque changement de la liste, on sauvegarde dans le localStorage
watch(tasks, (newTasks) => localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks)), {
  deep: true,
})
</script>

<template>
  <div class="page">
    <TheHeader />
    <main class="main">
      <TaskForm @add="addTask" />
      <TaskList :tasks="tasks" @delete="deleteTask" @update-status="updateStatus" />
    </main>
    <TheFooter />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
}
</style>
