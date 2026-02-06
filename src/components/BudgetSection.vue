<template>
  <div>

    <div
      v-for="(cat, ci) in categories"
      :key="ci"
      class="budget-section"
    >
      <h5 class="section-title">{{ cat.title }}</h5>

      <div class="toolbar">

  <!-- dropdown mode -->
  <select
    v-if="!cat.manual"
    v-model="cat.selected"
    @change="addRow(ci)"
  >
    <option value="">เพิ่มรายการ</option>
    <option v-for="o in cat.options" :key="o">{{ o }}</option>
  </select>

  <!-- manual mode -->
  <button
    v-else
    class="btn-blue"
    @click="addManualRow(ci)"
  >
    + เพิ่มรายการ
  </button>

  <button class="btn-blue">แนบเอกสาร</button>

</div>


      <table class="budget-table">
        <thead>
          <tr>
            <th>รายการ</th>
            <th>รายละเอียดตัวคูณ</th>
            <th>งบรวม</th>
            <th>งวด 1</th>
            <th>งวด 2</th>
            <th>งวด 3</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(r, ri) in cat.rows" :key="ri">
            <td>

  <!-- dropdown category = readonly -->
  <div v-if="!cat.manual" class="item-label">
    {{ r.name }}
  </div>

  <!-- manual category = editable -->
  <input
    v-else
    v-model="r.name"
    placeholder="ชื่อรายการ"
  />

</td>

            <td><input v-model="r.detail" /></td>
            <td><input type="number" v-model.number="r.total" /></td>
            <td><input type="number" v-model.number="r.p1" /></td>
            <td><input type="number" v-model.number="r.p2" /></td>
            <td><input type="number" v-model.number="r.p3" /></td>
            <td>
              <button class="btn-del" @click="removeRow(ci, ri)">ลบ</button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <div class="grand-total">
      รวมงบประมาณที่เสนอขอรวม
      <input :value="grandTotal" readonly />
      <button class="btn-red">ล้างฟอร์ม</button>
      <button class="btn-blue">บันทึกแบบร่าง</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "BudgetForm",

  data() {
  return {
    categories: [
      this.makeCat("หมวดค่าตอบแทน", [
        "ค่าตอบแทน – นักศึกษาช่วยงานด้านวิชาการ",
        "ค่าตอบแทน – นักศึกษาช่วยงานทั่วไป",
        "ค่าตอบแทน – ผู้ให้ข้อมูล",
        "ค่าตอบแทน – ผู้ให้สัมภาษณ์",
        "ค่าตอบแทน – ผู้ตอบแบบสอบถาม",
        "ค่าตอบแทน – อาสาสมัคร",
      ]),

      this.makeCat("หมวดค่าใช้สอย", [
        "ค่าใช้จ่ายในการจัดประชุม - ค่าอาหารกลางวัน",
        "ค่าใช้จ่ายในการจัดประชุม - ค่าอาหารว่าง",
        "ค่าธรรมเนียมการขอจริยธรรมการวิจัยในมนุษย์",
        "ค่าจ้างเหมาวิเคราะห์ทดสอบทางวิทยาศาสตร์",
        "ค่าจ้างเหมาวิเคราะห์ทางการแพทย์",
        "ค่าจ้างเหมาผู้ช่วยเก็บข้อมูลในพื้นที่",
        "ค่าจ้างเหมาผู้นำทางในพื้นที่ (ล่าม)",
        "ค่าจ้างเหมาถอดเทป",
        "ค่าจ้างเหมาอื่นๆ - ระบุ",
        "ค่าธรรมเนียมการใช้ห้องปฏิบัติการ",
        "ค่าธรรมเนียมเครื่องมือวิเคราะห์ทดสอบ",
        "ค่าธรรมเนียมอื่น - ระบุ",
        "ค่าถ่ายเอกสาร",
        "ค่าจัดทำรูปเล่มรายงานวิจัย",
        "ค่าไปรษณีย์และขนส่ง",
        "ค่าโทรศัพท์และโทรสารในประเทศ",
        "ค่าบริการทางอินเตอร์เน็ต",
      ]),

      this.makeCat("หมวดค่าเดินทาง", [
        "ค่ายานพาหนะเครื่องบินอาจารย์",
        "ค่าพาหนะ (รถยนต์ส่วนบุคคล)",
        "ค่าเช่ายานพาหนะรถตู้",
        "ค่าพาหนะ (Taxi)",
        "ค่าที่พัก",
        "ค่าเบี้ยเลี้ยง",
      ]),

      this.makeCat("หมวดค่าวัสดุ", [
        "ค่าวัสดุสำนักงาน",
        "ค่าวัสดุคอมพิวเตอร์",
        "ค่าวัสดุวิทยาศาสตร์",
        "ค่าวัสดุโปรแกรม/ลิขสิทธิ์",
        "ค่าวัสดุไฟฟ้าและวิทยุ",
        "ค่าวัสดุงานบ้านงานครัว",
        "ค่าวัสดุก่อสร้างและประปา",
        "ค่าวัสดุเชื้อเพลิง",
        "ค่าวัสดุการเกษตร",
        "ค่าวัสดุโฆษณา",
        "ค่าวัสดุเครื่องแต่งกาย",
        "ค่าวัสดุกีฬา",
        "ค่าวัสดุสื่อ/ตำรา",
        "ค่าเวชภัณฑ์ยา",
        "ค่าเวชภัณฑ์ที่มิใช่ยา",
        "ค่าบรรจุภัณฑ์",
        "ค่าวัสดุของที่ระลึก",
      ]),

      this.makeCat("หมวดค่าสาธารณูปโภค", [], true),
      this.makeCat("หมวดครุภัณฑ์", [], true),
    ],
  }
},


  computed: {
    grandTotal() {
      return this.categories.reduce((sum, c) => {
        return sum + c.rows.reduce((s, r) => s + Number(r.total || 0), 0)
      }, 0)
    }
  },

  methods: {
    makeCat(title, options = [], manual = false) {
  return {
    title,
    options,
    manual,
    selected: "",
    rows: []
  }
},


    addRow(ci) {
      const cat = this.categories[ci]
      if (!cat.selected) return

      cat.rows.push({
        name: cat.selected,
        detail: "",
        total: 0,
        p1: 0,
        p2: 0,
        p3: 0
      })

      cat.selected = ""
    },
    addManualRow(ci) {
  this.categories[ci].rows.push({
    name: "",
    detail: "",
    total: 0,
    p1: 0,
    p2: 0,
    p3: 0
  })
},


    removeRow(ci, ri) {
      this.categories[ci].rows.splice(ri, 1)
    }
  }
}
</script>

<style scoped>
.item-label {
  padding: 6px 8px;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 13px;
}

.budget-section {
  border-top: 1px solid #ddd;
  padding: 15px 0;
}

.section-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.budget-table {
  width: 100%;
  border-collapse: collapse;
}

.budget-table th,
.budget-table td {
  border: 1px solid #ddd;
  padding: 6px;
}

.budget-table input {
  width: 100%;
  padding: 4px;
}

.btn-blue {
  background: #2f6fed;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
}

.btn-red {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
}

.btn-del {
  background: #ff5a5a;
  color: white;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
}

.grand-total {
  margin-top: 20px;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.grand-total input {
  width: 120px;
  padding: 6px;
}

</style>
