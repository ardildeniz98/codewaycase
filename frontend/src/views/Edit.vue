<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal">
            <h3>Edit Parameter</h3>

            <label>Value</label>
            <input v-model="editableValue" />

            <label>Description</label>
            <input v-model="editableDescription" />

            <div class="actions">
                <button class="save" @click="saveChanges">Save</button>
                <button class="cancel" @click="$emit('close')">Cancel</button>

            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    param: Object,
})
const emit = defineEmits(['save', 'close'])

import { ref } from 'vue'

const editableValue = ref(props.param.value)
const editableDescription = ref(props.param.description)

function saveChanges() {
    emit('save', {
        key: props.param.key,
        value: editableValue.value,
        description: editableDescription.value,
    })
}
</script>

<style scoped>
.actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 12px;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
}

.modal {
    background: #1f2232;
    padding: 24px;
    border-radius: 8px;
    color: #fff;
    width: 300px;
}

.modal input {
    width: 100%;
    margin-bottom: 12px;
    padding: 6px;
    background: #2a2d3d;
    border: none;
    color: white;
    border-radius: 4px;
}

.cancel {
    background: #aaa;
    color: black;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
}

.save {
    background: #2d79f3;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
}
</style>