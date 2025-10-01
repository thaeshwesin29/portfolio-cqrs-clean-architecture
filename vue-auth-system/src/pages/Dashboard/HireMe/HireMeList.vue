<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <Header title="Hire Me Messages" />

    <!-- Loading / Error -->
    <div v-if="loading" class="text-center py-10 text-gray-900 dark:text-gray-100">
      Loading messages...
    </div>
    <div v-else-if="error" class="text-center py-10 text-red-500">
      {{ error.message || 'Failed to load messages' }}
    </div>

    <!-- Messages Table -->
    <div
      v-else
      class="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden mt-4"
    >
      <table class="min-w-full text-sm text-left text-gray-900 dark:text-gray-100">
        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
          <tr>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Email</th>
            <th class="px-6 py-3">Message</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="msg in paginatedMessages"
            :key="msg.id"
            class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <td class="px-6 py-4">{{ msg.name }}</td>
            <td class="px-6 py-4">{{ msg.email }}</td>
            <td class="px-6 py-4">{{ msg.message }}</td>
            <td class="px-6 py-4 text-right space-x-2">
              <button
                class="text-indigo-600 hover:text-indigo-800"
                @click="handleMarkAsRead(msg.id)"
              >
                Mark as Read
              </button>
              <button
                class="text-red-600 hover:text-red-800"
                @click="handleRequestDelete(msg)"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="paginatedMessages.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
              No messages found.
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @change-page="goToPage"
        class="p-4 text-gray-900 dark:text-gray-100"
      />
    </div>

    <!-- Delete Modal -->
    <DeleteModal
      v-if="deleteModalVisible"
      @confirm="confirmDelete"
      @cancel="deleteModalVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useContactMessages } from '../../../composables/useContactMessages'
import Pagination from '@/components/common/Pagination.vue'
import Header from '@/components/common/Header.vue'
import DeleteModal from '@/components/Dashboard/DeleteModal.vue'
import { deleteContactMessage, updateContactMessage } from '../../../api/commands/contactMessageCommand'
import type { ContactMessage } from '../../../types/contact'

const {
  loading,
  error,
  paginatedMessages,
  currentPage,
  totalPages,
  goToPage,
  messages,
} = useContactMessages()

const deleteModalVisible = ref(false)
const messageToDelete = ref<ContactMessage | null>(null)

// Mark as Read
async function handleMarkAsRead(id: string | number) {
  const msg = messages.value.find(m => m.id === id)
  if (!msg || msg.is_read) return

  const updated = await updateContactMessage(id, { is_read: true })
  if (updated) msg.is_read = true
}

// Delete message
function handleRequestDelete(msg: ContactMessage) {
  messageToDelete.value = msg
  deleteModalVisible.value = true
}

async function confirmDelete() {
  if (!messageToDelete.value) return

  const success = await deleteContactMessage(messageToDelete.value.id)
  if (success) {
    const index = messages.value.findIndex(m => m.id === messageToDelete.value?.id)
    if (index !== -1) messages.value.splice(index, 1)
  }

  deleteModalVisible.value = false
  messageToDelete.value = null
}
</script>

<style scoped>
/* Table hover + dark mode fixes */
table th,
table td {
  white-space: normal;
  word-wrap: break-word;
}
</style>
