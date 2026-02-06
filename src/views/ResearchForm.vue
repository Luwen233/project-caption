<template>
  <div class="max-w-6xl mx-auto p-6 space-y-6">

    <h1 class="text-2xl font-bold mb-4">แบบฟอร์มข้อเสนอโครงการวิจัย</h1>

    <div ref="pdfArea">
      <!-- 1. ชื่อโครงการ -->
      <section class="card">
        <label class="label">1) ชื่อโครงการ (ภาษาไทย)</label>
        <input v-model="form.titleTH" class="input" />

        <label class="label mt-2">ชื่อโครงการ (ภาษาอังกฤษ)</label>
        <input v-model="form.titleEN" class="input" />
      </section>

      <!-- 2. ประเภททุน -->
      <section class="card">
        <label class="label">2) ประเภททุน</label>
        <select v-model="form.budgetType" class="input">
          <option disabled value="">เลือกประเภททุน</option>
          <option v-for="b in budgetTypes" :key="b">{{ b }}</option>
        </select>
      </section>

      <!-- 3. ความร่วมมือ -->
      <section class="card">
        <label class="label">3) ความร่วมมือกับหน่วยงานภายนอก</label>
        <select v-model="form.cooperation" class="input">
          <option>ไม่มี</option>
          <option>มี</option>
        </select>

        <input v-if="form.cooperation === 'มี'" v-model="form.cooperationDetail" class="input mt-2"
          placeholder="ระบุรายละเอียด" />
      </section>

      <!-- 4. ประเภทการวิจัย -->
      <div class="card">
        <h3 class="title">4) ประเภทงานวิจัย</h3>


        <select v-model="form.researchType" class="select">
          <option disabled value="">-- กรุณาเลือก --</option>
          <option value="Science and Technology">
            ด้านวิทยาศาสตร์และเทคโนโลยี / Science and Technology
          </option>
          <option value="Health Science">
            ด้านวิทยาศาสตร์สุขภาพ / Health Science
          </option>
          <option value="Social Science and Humanities">
            ด้านสังคมศาสตร์และมนุษยศาสตร์ / Social Science and Humanities
          </option>
        </select>
      </div>


      <!-- 5-11 text editor -->
      <section v-for="(field, i) in textFields" :key="i" class="card">
        <label class="label">{{ field.label }}</label>
        <textarea v-model="form[field.model]" class="textarea"></textarea>
      </section>

      <!-- 12. แผนดำเนินงาน -->
      <section class="card">
        <ResearchSection12 />
      </section>


      <!-- 13 -->
      <section class="card">
        <label class="label">13) ผลงานตามระยะเวลาการรายงาน</label>
        <textarea v-model="form.progressReport" class="textarea"></textarea>
      </section>

      <!-- 14 -->
      <section class="card">
        <label class="label">14) ผลลัพธ์ที่คาดว่าจะได้รับ</label>
        <div v-for="(opt, i) in resultOptions" :key="i">
          <label>
            <input type="checkbox" v-model="form.expectedResults" :value="opt" />
            {{ opt }}
          </label>
        </div>
      </section>

      <!-- 15 -->
      <section class="card">
        <label class="label">15) การบูรณาการงานวิจัย</label>
        <textarea v-model="form.integration" class="textarea"></textarea>
      </section>

      <!-- 16 -->
      <section class="card">
        <label class="label">16) ระดับการถ่ายทอดสู่สังคม</label>
        <div>
          <label><input type="radio" value="ระดับชาติ" v-model="form.transferLevel" /> ระดับชาติ</label>
        </div>
        <div>
          <label><input type="radio" value="ระดับชุมชน" v-model="form.transferLevel" /> ระดับชุมชน</label>
        </div>
        <div>
          <label><input type="radio" value="ไม่มี" v-model="form.transferLevel" /> ไม่มี</label>
        </div>
      </section>

      <!-- 17 งบประมาณ (โครงสร้างพร้อมต่อยอด) -->
      <section class="card">
        <BudgetSection v-model="form.budgets" />
      </section>

      <!-- 18 มาตรฐานจริยธรรม -->
      <section class="card">
        <label class="label">18) มาตรฐานการวิจัย</label>
        <label>
          <input type="checkbox" v-model="form.ethics.human" />
          การวิจัยในมนุษย์
        </label>
        <label>
          <input type="checkbox" v-model="form.ethics.animal" />
          การวิจัยสัตว์ทดลอง
        </label>
      </section>

      <!-- 19 -->
      <section class="card">
        <label class="label">19) คำชี้แจงอื่น ๆ</label>
        <textarea v-model="form.remark" class="textarea"></textarea>
      </section>
    </div>
    <button class="button" @click="exportPDF">
      Export PDF
    </button>

    <button @click="submit" class="bg-blue-600 text-white px-6 py-2 rounded">
      บันทึกข้อมูล
    </button>

  </div>
</template>

<script>
import BudgetSection from "@/components/BudgetSection.vue";
import ResearchSection12 from "@/components/Section12.vue";
import html2pdf from "html2pdf.js";

export default {
  name: "ResearchForm",
  components: {
    BudgetSection,
    ResearchSection12
  },
  data() {
    return {
      monthCount: 6,
      activities: [
        this.newActivity()
      ],
      budgetTypes: [
        "ทุนวิจัยทั่วไป",
        "ทุนพัฒนานักวิจัย",
        "ทุนต่อยอดอุตสาหกรรม"
      ],
      resultOptions: [
        "บทความวิชาการ",
        "สิทธิบัตร",
        "ต้นแบบ",
        "การถ่ายทอดสังคม"
      ],
      textFields: [
        { label: "5) คำสำคัญ (Keywords)", model: "keywords" },
        { label: "6) ความสำคัญของปัญหาและแนวคิด", model: "importance" },
        { label: "7) วัตถุประสงค์", model: "objective" },
        { label: "8) ทบทวนวรรณกรรม", model: "literature" },
        { label: "9) เอกสารอ้างอิง", model: "reference" },
        { label: "10) วิธีดำเนินการวิจัย", model: "methodology" },
        { label: "11) ขอบเขตการวิจัย", model: "scope" }
      ],
      form: {
        titleTH: "",
        titleEN: "",
        budgetType: "",
        budgets: [],
        cooperation: "ไม่มี",
        cooperationDetail: "",
        researchType: "",
        keywords: "",
        importance: "",
        objective: "",
        literature: "",
        reference: "",
        methodology: "",
        scope: "",
        duration: "",
        progressReport: "",
        expectedResults: [],
        integration: "",
        transferLevel: "",
        budgetSummary: "",
        ethics: {
          human: false,
          animal: false
        },
        remark: ""
      }
    }
  },
  methods: {
    submit() {
      console.log("FORM DATA:", this.form)
      alert("บันทึกข้อมูลเรียบร้อย (ดู console)")
    },
    exportPDF() {
      const element = this.$refs.pdfArea;

      const opt = {
        margin: 10,
        filename: "research-form.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      };

      html2pdf().set(opt).from(element).save();
    },
    setMonths(n) {
      this.monthCount = n

      this.activities.forEach(a => {
        a.months = Array(n).fill(false)
      })
    },

    newActivity() {
      return {
        name: "",
        owner: "",
        months: Array(this.monthCount).fill(false)
      }
    },

    addActivity() {
      this.activities.push(this.newActivity())
    },

    toggleMonth(row, month) {
      this.activities[row].months[month] =
        !this.activities[row].months[month]
    },
  }
}
</script>

<style scoped>
.card {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #222;
}

.label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
}

.input,
.textarea,
.select {
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  background: #fafafa;
  transition: border 0.2s ease;
}

.input:focus,
.textarea:focus,
.select:focus {
  outline: none;
  border-color: #666;
  background: #ffffff;
}

.textarea {
  min-height: 120px;
  resize: vertical;
}

.row {
  margin-bottom: 14px;
}

.button {
  background: #222;
  color: #fff;
  padding: 10px 18px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.button:hover {
  opacity: 0.85;
}

@media print {
  .card {
    page-break-inside: avoid;
  }
}

.timeline-wrapper {
  display: flex;
  border: 1px solid #ddd;
  overflow: hidden;
  margin-top: 10px;
}

.left,
.right {
  width: 180px;
  background: #fafafa;
}

.middle {
  flex: 1;
  overflow-x: auto;
}

.scroll {
  display: inline-block;
  min-width: 100%;
}

.row {
  display: flex;
  width: 100%;
}

.month {
  flex: 1;
  /* 🔥 ทำให้ขยายเต็มพื้นที่ */
  min-width: 32px;
  /* กันเล็กเกินไป */
  height: 36px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.month.active {
  background: #222;
}

.cell,
.header {
  padding: 8px;
  border-bottom: 1px solid #eee;
  height: 36px;
  display: flex;
  align-items: center;
}

.header {
  font-weight: bold;
  background: #f2f2f2;
}

.input {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.month input {
  pointer-events: none;
  /* ให้คลิกทั้งช่อง */
  width: 14px;
  height: 14px;
}

.duration button {
  margin-right: 6px;
  padding: 6px 10px;
  border: 1px solid #333;
  background: white;
  cursor: pointer;
}

.duration button:hover {
  background: #eee;
}

.add {
  margin-top: 10px;
  padding: 8px 12px;
  background: #222;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
