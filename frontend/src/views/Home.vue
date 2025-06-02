<template>
  <div class="container">
    <div class="header">
      <img src="/logo.png" alt="logo" class="logo" />
      <div class="profile-icon">👤</div>
    </div>

    <div class="table">
      <div class="row header-row">
        <div>Parameter Key</div>
        <div>Value</div>
        <div>Description</div>
        <div>Create Date ↓</div>
        <div></div>
      </div>

      <div class="row" v-for="param in configs" :key="param.key">
        <div>{{ param.key }}</div>
        <div>{{ param.value }}</div>
        <div>{{ param.description }}</div>
        <div>{{ formatDate(param.createdAt) }}</div>
        <div class="btns">
          <button class="edit" @click="openEditModal(param)">Edit</button>

          <button class="delete" @click="deleteParam(param.key)">Delete</button>
        </div>
      </div>

      <div class="row input-row">
        <input v-model="newParam.key" placeholder="New Parameter" />
        <input v-model="newParam.value" placeholder="Value" />
        <input v-model="newParam.description" placeholder="New Description" />
        <div></div>
        <div class="btns">
          <button class="add" @click="addParam">ADD</button>
        </div>
      </div>
    </div>
    <EditModal v-if="showEditModal" :param="selectedParam" @close="showEditModal = false" @save="editParam" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import { useToast } from 'vue-toastification'
import EditModal from "@/views/Edit.vue"

const toast = useToast()
const showEditModal = ref(false)
const selectedParam = ref(null)

const configs = ref([]);
const newParam = ref({ key: '', value: '', description: '' });


const openEditModal = (param) => {
  selectedParam.value = param
  showEditModal.value = true
}


const fetchConfigs = async () => {
  try {
    const res = await api.get('/panel-config');
    const raw = res.data;

    const list = Array.isArray(raw) ? raw : [raw];
    configs.value = list.sort((a, b) => {
      const t1 = a.createdAt?.seconds ?? 0;
      const t2 = b.createdAt?.seconds ?? 0;
      return t2 - t1;
    });
  } catch (error) {
    toast.error(error?.response?.data?.error || "Config could not fetch.")
  }

};


const formatDate = (timestamp) => {
  if (!timestamp || (!timestamp.seconds && !timestamp._seconds)) return '-';

  const seconds = timestamp._seconds ?? timestamp.seconds;
  const date = new Date(seconds * 1000);

  return date.toLocaleString('tr-TR', {
    timeZone: 'Europe/Istanbul',
    hour12: false
  });
};



const addParam = async () => {
  if (!newParam.value.key || !newParam.value.value || !newParam.value.description) return;
  try {
    await api.post('/panel-config', newParam.value);
    newParam.value = { key: '', value: '', description: '' };
    await fetchConfigs();
    toast.success("Config added successfully.")
  } catch (error) {
    toast.error(error?.response?.data?.error || "Config could not add.")
  }


};

const deleteParam = async (key) => {
  try {
    await api.delete(`/panel-config/${key}`);
    await fetchConfigs();
    toast.success("Config deleted successfully.")
  } catch (error) {
    toast.error(error?.response?.data?.error || "Config could not delete.")
  }

};

const editParam = async (param) => {
  if (param) {
    try {
      await api.put(`/panel-config/${param.key}`, {
        value: isNaN(Number(param.value)) ? param.value : Number(param.value),
        description: param.description
      });
      await fetchConfigs();
      toast.success("Config edited successfully.")
      showEditModal.value = false;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Config could not update.")
    }

  }
};

onMounted(async () => {
  await fetchConfigs();
  console.log("Config verisi:", configs.value);
});

</script>

<style scoped src="@/assets/home.css"></style>
