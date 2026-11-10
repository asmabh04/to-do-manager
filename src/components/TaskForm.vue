<script setup lang="ts">
import { ref } from 'vue'

// Le composant prévient son parent quand une tâche valide est envoyée
const emit = defineEmits<{
  (e: 'add', title: string): void
}>()

const title = ref<string>('')
const error = ref<string>('')

// appelée quand on envoie le formulaire
function submit(): void {
  const cleanTitle = title.value.trim()
  if (cleanTitle === '') {
    error.value = 'Le titre ne peut pas être vide.'
    return // on bloque la soumission
  }
  if (cleanTitle.length > 100) {
    error.value = 'Le titre ne doit pas dépasser 100 caractères.'
    return
  }
  error.value = ''
  emit('add', cleanTitle)
  title.value = ''
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <label>Nouvelle tâche</label>
    <div class="row">
      <input id="title" v-model="title" type="text" placeholder="Titre de la tâche" />
      <button type="submit">Ajouter</button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<style scoped>
.form {
  margin-bottom: 1.5rem; /* l'espace extérieur en dessous du formulaire */
}
.row {
  display: flex; /* met les éléments sur une même ligne */
  gap: 0.5rem; /* espace entre ces éléments. */
  margin-top: 0.3rem; /*l'espace au-dessus de la ligne*/
}
input {
  flex: 1; /*Etirer le titre et pousser le menu et le bouton vers la droite.*/
  padding: 0.5rem; /*Espace à l’intérieur de la ligne, entre la bordure et le contenu.*/
}
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.error {
  color: red;
  margin: 0.3rem 0 0; /*une marge de 0,3 rem au-dessus*/
}
</style>
