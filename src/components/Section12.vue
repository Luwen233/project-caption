<template>
  <div class="section-12-container">
    <div class="mb-4">
      <!-- <label class="font-weight-bold mb-2 d-block text-primary">12) ระยะเวลาในการดำเนินการของโครงการ</label> -->
      <div class="btn-group shadow-sm">
        <CButton 
          :color="duration === 6 ? 'primary' : 'secondary'" 
          variant="outline"
          @click="changeDuration(6)"
          class="px-4"
        >
          6 เดือน
        </CButton>
        <CButton 
          :color="duration === 12 ? 'primary' : 'secondary'" 
          variant="outline"
          @click="changeDuration(12)"
          class="px-4"
        >
          1 ปี (12 เดือน)
        </CButton>
        <CButton 
          :color="duration === 24 ? 'primary' : 'secondary'" 
          variant="outline"
          @click="changeDuration(24)"
          class="px-4"
        >
          2 ปี (24 เดือน)
        </CButton>
      </div>
    </div>

    <div class="gantt-wrapper shadow-sm rounded border">
      <div class="gantt-column-fixed-left">
        <div class="gantt-header bg-light border-bottom border-right font-weight-bold text-center">กิจกรรม</div>
        <div v-for="(act, index) in activities" :key="'left-' + index" class="gantt-cell border-bottom border-right px-2 py-1">
          <CInput 
            v-model="act.name" 
            placeholder="กิจกรรมที่..." 
            size="sm" 
            class="mb-0 no-border-input"
          />
        </div>
      </div>

      <div class="gantt-scrollable-area border-right">
  <div class="gantt-scroll-content">
    <div class="d-flex w-100">
      <div 
        v-for="m in duration" 
        :key="'h-' + m" 
        class="gantt-month-header bg-light border-bottom border-right text-center small font-weight-bold py-1"
      >
        ด.{{ m }}
      </div>
    </div>
    <div v-for="(act, index) in activities" :key="'row-' + index" class="d-flex w-100">
      <div 
        v-for="(checked, mIndex) in act.months" 
        :key="'cell-' + index + '-' + mIndex"
        class="gantt-month-cell border-bottom border-right d-flex align-items-center justify-content-center"
        :class="{ 'bg-primary-light': checked }"
        @click="toggleMonth(index, mIndex)"
      >
        <div v-if="checked" class="check-indicator bg-primary"></div>
      </div>
    </div>
  </div>
</div>

      <div class="gantt-column-fixed-right">
        <div class="gantt-header bg-light border-bottom font-weight-bold text-center">ผู้รับผิดชอบ</div>
        <div v-for="(act, index) in activities" :key="'right-' + index" class="gantt-cell border-bottom d-flex align-items-center px-2 py-1">
          <CInput 
            v-model="act.owner" 
            placeholder="ชื่อผู้รับผิดชอบ" 
            size="sm" 
            class="mb-0 no-border-input"
          />
          <CButton 
            v-if="activities.length > 1"
            color="danger" 
            variant="ghost" 
            size="sm" 
            class="ml-2"
            @click="removeActivity(index)"
          >
            <CIcon name="cil-trash" size="sm"/>
          </CButton>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <CButton color="info" size="sm" variant="outline" @click="addActivity">
        <CIcon name="cil-plus" class="mr-1"/> เพิ่มกิจกรรม
      </CButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResearchSection12",
  data() {
    return {
      duration: 12, // ค่าเริ่มต้น 1 ปี
      activities: [
        { name: "", owner: "", months: Array(12).fill(false) }
      ]
    };
  },
  methods: {
    changeDuration(newDuration) {
      this.duration = newDuration;
      // ปรับขนาด Array ของเดือนในทุุกกิจกรรมตามระยะเวลาใหม่
      this.activities.forEach(act => {
        const currentMonths = act.months;
        if (currentMonths.length < newDuration) {
          // ถ้าขยายระยะเวลา ให้เพิ่มช่องว่าง
          act.months = [...currentMonths, ...Array(newDuration - currentMonths.length).fill(false)];
        } else {
          // ถ้าลดระยะเวลา ให้ตัดส่วนที่เกินออก
          act.months = currentMonths.slice(0, newDuration);
        }
      });
    },
    addActivity() {
      this.activities.push({
        name: "",
        owner: "",
        months: Array(this.duration).fill(false)
      });
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
    toggleMonth(actIndex, mIndex) {
      // ใช้วิธีนี้เพื่อให้ Vue ตรวจจับการเปลี่ยนแปลงของ Array ได้ถูกต้อง
      this.$set(this.activities[actIndex].months, mIndex, !this.activities[actIndex].months[mIndex]);
    }
  }
};
</script>

<style scoped>
/* ตั้งค่า Layout ของ Gantt Chart */
.gantt-wrapper {
  display: flex;
  width: 100%; /* บังคับให้ Wrapper ใหญ่เท่าหน้าจอ */
  overflow: hidden;
  background-color: #fff;
}

/* คอลัมน์ซ้ายคงที่ */
.gantt-column-fixed-left {
  width: 200px; /* ปรับลดขนาดลงเล็กน้อยเพื่อให้พื้นที่ตรงกลางมีมากขึ้น */
  flex-shrink: 0;
}

/* คอลัมน์ขวาคงที่ */
.gantt-column-fixed-right {
  width: 180px;
  flex-shrink: 0;
}

/* ส่วนกลางเลื่อนได้และขยายเต็มพื้นที่ */
.gantt-scrollable-area {
  flex-grow: 1;
  overflow-x: auto;
  display: flex; /* เพิ่มเพื่อให้ลูกขยายเต็ม */
}

.gantt-scroll-content {
  flex: 1; /* บังคับให้เนื้อหาภายในขยายเต็มพื้นที่ที่เหลือ */
  display: flex;
  flex-direction: column;
  min-width: 0; /* ป้องกันการดันขอบออกไปเกินหน้าจอโดยไม่จำเป็น */
}

/* ตั้งค่าความสูงของแถวให้เท่ากัน */
.gantt-header {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gantt-cell, .gantt-month-cell {
  height: 50px;
}

/* ปรับให้ช่องเดือนขยายเท่าๆ กันจนเต็มพื้นที่ */
.gantt-month-header, .gantt-month-cell {
  flex: 1; /* แบ่งพื้นที่ว่างให้เท่ากันทุกช่อง */
  min-width: 30px; /* กำหนดขนาดขั้นต่ำไว้เพื่อไม่ให้ตัวหนังสือซ้อนกันเมื่อเลือก 24 เดือน */
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.gantt-month-cell:hover {
  background-color: #f0f3f5;
}

/* สไตล์เมื่อเลือกช่อง */
.bg-primary-light {
  background-color: rgba(50, 31, 219, 0.1);
}

.check-indicator {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

/* ลบขอบ Input เพื่อให้ดูเนียนกับตาราง */
.no-border-input ::v-deep .form-control {
  border: none;
  background: transparent;
}

.no-border-input ::v-deep .form-control:focus {
  background: #fff;
  box-shadow: none;
  border: 1px solid #321fdb;
}
</style>