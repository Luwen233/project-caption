<template>
  <div class="section12">

    <h3>12) แผนการดำเนินงานตลอดการวิจัย *</h3>

    <!-- duration selector -->
    <div class="duration-bar">
      <button
        v-for="d in [6,12,24]"
        :key="d"
        :class="{ active: months === d }"
        @click="setDuration(d)"
      >
        {{ label(d) }}
      </button>
    </div>

    <div class="gantt-wrapper">

      <!-- LEFT -->
      <div class="left">
        <div class="head">กิจกรรมวิจัย</div>

        <div v-for="(a,i) in activities" :key="i" class="cell">
          <input v-model="a.name" placeholder="ชื่อกิจกรรม"/>
        </div>
      </div>

      <!-- CENTER SCROLL -->
      <div class="center">
        <div class="months">
          <div v-for="m in months" :key="m" class="month">
            {{ m }}
          </div>
        </div>

        <div v-for="(a,i) in activities" :key="'row'+i" class="row">
          <div
            v-for="m in months"
            :key="m"
            class="box"
            :class="{ on: a.months[m-1] }"
            @click="toggle(i,m-1)"
          />
        </div>
      </div>

      <!-- RIGHT -->
      <div class="right">
        <div class="head">ผู้รับผิดชอบ</div>

        <div v-for="(a,i) in activities" :key="'r'+i" class="cell right-row">
          <input v-model="a.owner" placeholder="ผู้รับผิดชอบ"/>

          <button class="delete" @click="removeRow(i)">
            ✕
          </button>
        </div>
      </div>

    </div>

    <button class="add" @click="addRow">
      + เพิ่มกิจกรรม
    </button>

  </div>
</template>
<script>
export default {
  name: "ResearchSection12",

  data() {
    return {
      months: 12,
      activities: []
    }
  },

  mounted() {
    this.addRow()
  },

  methods: {
    label(d){
      if(d===6) return "6 เดือน"
      if(d===12) return "1 ปี"
      return "2 ปี"
    },

    setDuration(d){
      this.months = d
      this.activities.forEach(a=>{
        a.months = Array(d).fill(false)
      })
    },

    addRow(){
      this.activities.push({
        name: "",
        owner: "",
        months: Array(this.months).fill(false)
      })
    },

    removeRow(i){
      this.activities.splice(i,1)
    },

    toggle(i,m){
      this.activities[i].months.splice(
        m,1,!this.activities[i].months[m]
      )
    }
  }
}
</script>
<style scoped>

.section12{
  background:#f4f4f4;
  padding:15px;
  border-radius:8px;
}

/* duration */
.duration-bar{
  display:flex;
  gap:10px;
  margin:10px 0;
}

.duration-bar button{
  padding:8px 20px;
  border:1px solid #aaa;
  background:#eee;
  cursor:pointer;
}

.duration-bar button.active{
  background:#6c8168;
  color:white;
}

/* gantt */

.gantt-wrapper{
  display:flex;
  width:100%;
  border:1px solid #999;
  background:white;
  overflow:hidden;
}

.left,.right{
  width:240px;
  flex-shrink:0;
  background:#fafafa;
  z-index:2;
}

.left{
  border-right:1px solid #ccc;
}

.right{
  border-left:1px solid #ccc;
}

.center{
  flex:1;
  overflow-x:auto;
  overflow-y:hidden;
}

/* header */

.head{
  background:#ddd;
  padding:8px;
  font-weight:bold;
  text-align:center;
  position:sticky;
  top:0;
  z-index:3;
}

/* rows */

.cell{
  padding:6px;
  border-top:1px solid #eee;
  height:40px;
  display:flex;
  align-items:center;
  gap:6px;
}

.cell input{
  width:100%;
}

.right-row{
  justify-content:space-between;
}

/* months */

/* header months */
.months{
  display:grid;
  grid-auto-flow:column;
  grid-auto-columns:minmax(60px, 1fr);
  background:#ddd;
  position:sticky;
  top:0;
  z-index:1;
  min-width:100%;
}

/* month cell */
.month{
  text-align:center;
  border-left:1px solid #ccc;
  padding:6px 0;
  white-space:nowrap;
}

/* gantt rows */
.row{
  display:grid;
  grid-auto-flow:column;
  grid-auto-columns:minmax(60px, 1fr);
  min-width:100%;
}

/* gantt box */
.box{
  height:40px;
  border-left:1px solid #eee;
  border-top:1px solid #eee;
  cursor:pointer;
}

.box.on{
  background:#f2e66a;
}

/* buttons */

.add{
  margin-top:10px;
  padding:8px 12px;
  background:#2f6fed;
  color:white;
  border:none;
  cursor:pointer;
}

.delete{
  background:#e74c3c;
  color:white;
  border:none;
  padding:4px 8px;
  cursor:pointer;
  border-radius:4px;
}

</style>
