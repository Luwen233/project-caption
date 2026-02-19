<template>
  <div class="status-cell">
    <span class="status-label" :class="statusClass">{{ status }}</span>
    <div class="status-by">{{ reviewer }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, required: true },
  reviewer: { type: String, default: '' }
})

const STATUS_MAP = {
  'รอดำเนินการ':  'waiting',
  'รอแก้ไข':      'fix',
  'กำลังพิจารณา': 'reviewing',
  'อนุมัติ':      'approved',
  'ไม่อนุมัติ':   'rejected',
}

const statusClass = computed(() => `s-${STATUS_MAP[props.status] ?? 'waiting'}`)
</script>

<style scoped>
.status-cell { line-height: 1.6; }

.status-label {
  font-weight: 600;
  font-size: 13px;
}

.status-by {
  font-size: 11px;
  color: #777;
}

.s-waiting   { color: var(--s-waiting); }
.s-fix       { color: var(--s-fix); }
.s-reviewing { color: var(--s-reviewing); }
.s-approved  { color: var(--s-approved); }
.s-rejected  { color: var(--s-rejected); }
</style>
