<template>
  <div class="container-fluid px-4 py-4">
    <CRow>
      <CCol sm="12">
        <CCard class="shadow-sm">
          <CCardHeader>
            <strong>1-4) ข้อมูลทั่วไปของโครงการ</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md="12">
                <CInput label="1) ชื่อโครงการ (ภาษาไทย)" v-model="form.titleTH" placeholder="..." />
              </CCol>
              <CCol md="12">
                <CInput label="ชื่อโครงการ (ภาษาอังกฤษ)" v-model="form.titleEN" placeholder="..." />
              </CCol>
              <CCol md="6">
                <CSelect label="2) ประเภททุน" :options="budgetTypes" :value.sync="form.budgetType" />
              </CCol>
              <CCol md="6">
                <CSelect label="3) ความร่วมมือ" :options="['ไม่มี', 'มี']" :value.sync="form.cooperation" />
              </CCol>
              <CCol md="12" v-if="form.cooperation === 'มี'">
                <CInput label="รายละเอียดความร่วมมือ" v-model="form.cooperationDetail" />
              </CCol>
              <CCol md="12">
                <CSelect label="4) ประเภทงานวิจัย" :options="researchTypeOptions" :value.sync="form.researchType" />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <CCard v-for="(field, i) in textFields" :key="i" class="shadow-sm mt-4">
          <CCardHeader>
            <strong>{{ field.label }}</strong>
          </CCardHeader>
          <CCardBody>
            <quill-editor v-model="form[field.model]" :options="editorOption" style="min-height:" />
          </CCardBody>
        </CCard>

        <CCard class="mt-4 shadow-sm">
          <CCardHeader><strong>12) แผนการดำเนินงาน</strong></CCardHeader>
          <CCardBody>
            <ResearchSection12 />
          </CCardBody>
        </CCard>

        <CCard class="mt-4 shadow-sm">
          <CCardHeader><strong>งบประมาณและมาตรฐานวิจัย</strong></CCardHeader>
          <CCardBody>
            <label class="font-weight-bold">13) ผลงานตามระยะเวลาการรายงาน</label>
            <quill-editor v-model="form.progressReport" :options="editorOption" class="mb-4" />

            <CRow>
              <CCol md="6">
                <label class="font-weight-bold">14) ผลลัพธ์ที่คาดว่าจะได้รับ</label>
                <div class="mt-2">
                  <div v-for="(opt, i) in resultOptions" :key="i" class="form-check form-check-inline">
                    <input type="checkbox" :id="'res' + i" :value="opt" v-model="form.expectedResults"
                      class="form-check-input">
                    <label :for="'res' + i" class="form-check-label">{{ opt }}</label>
                  </div>
                </div>
              </CCol>
            </CRow>

            <label class="font-weight-bold">15) การบูรณาการงานวิจัย</label>
            <quill-editor v-model="form.IntegrationResearch" :options="editorOption" class="mb-4" />

            <CRow>
              <CCol md="6">
                <label class="font-weight-bold">16) ระดับการถ่ายทอดสู่สังคม</label>
                <CInputRadioGroup :options="['ระดับชาติ', 'ระดับชุมชน', 'ไม่มี']" :checked.sync="form.transferLevel"
                  inline />
              </CCol>
            </CRow>
            <CCard class="mt-4 shadow-sm">
              <CCardHeader><strong>17) กรอกงบประมาณ</strong></CCardHeader>
              <CCardBody>
                <BudgetSection v-model="form.budgets" />
              </CCardBody>
            </CCard>
            <CRow class="mt-4">
              <CCol md="12">
                <label class="font-weight-bold">18) มาตรฐานการวิจัย</label>
                <div>
                  <CInputCheckbox label="การวิจัยในมนุษย์" :checked.sync="form.ethics.human" custom inline />
                  <CInputCheckbox label="การวิจัยสัตว์ทดลอง" :checked.sync="form.ethics.animal" custom inline />
                </div>
              </CCol>
            </CRow>
            <label class="font-weight-bold">19) หมายเหตุ</label>
            <quill-editor v-model="form.Note" :options="editorOption" class="mb-4" />

          </CCardBody>
          <CCardFooter class="d-flex justify-content-end">
            <CButton color="primary" @click="submit" class="mr-2">บันทึกข้อมูล</CButton>
            <CButton color="info" @click="exportPDF">Export PDF</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
// นำเข้า Editor และ CSS
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'

import BudgetSection from "@/components/BudgetSection.vue";
import ResearchSection12 from "@/components/Section12.vue";
import html2pdf from "html2pdf.js";

export default {
  name: "ResearchForm",
  components: {
    BudgetSection,
    ResearchSection12,
    quillEditor // ลงทะเบียน Editor
  },
  data() {
    return {
      editorOption: {
        placeholder: 'พิมพ์เนื้อหาที่นี่...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
          ]
        }
      },
      // ... ข้อมูลอื่นๆ ใน data คงเดิม
      budgetTypes: ["ทุนวิจัยทั่วไป", "ทุนพัฒนานักวิจัย", "ทุนต่อยอดอุตสาหกรรม"],
      resultOptions: ["บทความวิชาการ", "สิทธิบัตร", "ต้นแบบ", "การถ่ายทอดสังคม"],
      researchTypeOptions: [
        { value: 'Science', label: 'ด้านวิทยาศาสตร์และเทคโนโลยี' },
        { value: 'Health', label: 'ด้านวิทยาศาสตร์สุขภาพ' },
        { value: 'Social', label: 'ด้านสังคมศาสตร์และมนุญศาสตร์' }
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
        titleTH: "", titleEN: "", budgetType: "", budgets: [],
        cooperation: "ไม่มี", cooperationDetail: "", researchType: "",
        keywords: "", importance: "", objective: "", literature: "",
        reference: "", methodology: "", scope: "", progressReport: "",
        expectedResults: [], integration: "", transferLevel: "ไม่มี",
        ethics: { human: false, animal: false }, remark: ""
      }
    };
  },
  methods: {
    submit() { console.log(this.form); alert("บันทึกสำเร็จ"); },
    exportPDF() {
      const element = document.body;
      html2pdf().from(element).save("Research_Form.pdf");
    }
  }
};
</script>

<style scoped>
/* ปรับแต่งความสวยงามของ Editor ให้เข้ากับ CoreUI */
.quill-editor {
  background-color: white;
}

.ql-toolbar.ql-snow {
  border: 1px solid #ebedef;
  background-color: #f8f9fa;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.ql-container.ql-snow {
  border: 1px solid #ebedef;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>