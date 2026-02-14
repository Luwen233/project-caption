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
              <CCol md="12" class="mb-4">
                <label class="font-weight-bold">2) ประเภททุน *</label>
                <div class="d-flex flex-wrap border rounded p-3 bg-light" style="gap: 20px;">
                  <div v-for="type in budgetTypes" :key="type.value" class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" :id="type.value" :value="type.label"
                      v-model="form.budgetType">
                    <label class="form-check-label" :for="type.value">{{ type.label }}</label>
                  </div>
                </div>
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

        <!-- ส่วนที่เพิ่มใหม่: ก) สาระสำคัญของข้อเสนอโครงการวิจัย — คณะผู้วิจัย -->
        <CCard class="mt-4 shadow-sm">
          <CCardHeader>
            <strong>ส่วน ก) : สาระสำคัญของข้อเสนอโครงการวิจัย — คณะผู้วิจัย</strong>
          </CCardHeader>
          <CCardBody>
            <!-- 1) คณะผู้วิจัย -->
            <div class="mb-4">
              <h6 class="font-weight-bold mb-3">1) คณะผู้วิจัย</h6>
              
              <!-- 1.1 หัวหน้าโครงการวิจัย -->
              <div class="border rounded p-3 mb-3 bg-light">
                <h6 class="font-weight-bold text-primary mb-3">1.1 หัวหน้าโครงการวิจัย</h6>
                <CRow>
                  <CCol md="4">
                    <CInput 
                      label="ชื่อ-สกุล *" 
                      v-model="form.researchers.mainResearcher.name" 
                      placeholder="กรอกชื่อ-นามสกุล"
                    />
                  </CCol>
                  <CCol md="4">
                    <CInput 
                      label="สังกัดหน่วยงาน *" 
                      v-model="form.researchers.mainResearcher.affiliation" 
                      placeholder="เช่น วิทยาลัยการเกษตรและเทคโนโลยี"
                    />
                  </CCol>
                  <CCol md="4">
                    <CInput 
                      label="เบอร์โทรศัพท์ *" 
                      v-model="form.researchers.mainResearcher.phone" 
                      placeholder="0xx-xxxxxxx"
                    />
                  </CCol>
                  <CCol md="6">
                    <CInput 
                      label="E-mail address *" 
                      v-model="form.researchers.mainResearcher.email" 
                      placeholder="name@mfu.ac.th"
                      type="email"
                    />
                  </CCol>
                  <CCol md="6">
                    <CInput 
                      label="ผลเป็นเลขสังกัดหรือรับรองตละ *" 
                      v-model="form.researchers.mainResearcher.code" 
                      placeholder="เช่น 80"
                    />
                  </CCol>
                </CRow>
              </div>

              <!-- 1.2 ผู้ร่วมโครงการวิจัย (เพิ่มได้หลายคน) -->
              <div class="border rounded p-3 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 class="font-weight-bold text-success mb-0">1.2 ผู้ร่วมโครงการวิจัย (เพิ่มได้หลายคน)</h6>
                  <CButton color="primary" size="sm" @click="addCoResearcher">
                    + เพิ่มผู้ร่วมโครงการ
                  </CButton>
                </div>

                <div 
                  v-for="(researcher, index) in form.researchers.coResearchers" 
                  :key="'co-' + index"
                  class="border rounded p-3 mb-3 bg-white position-relative"
                >
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <strong>ผู้ร่วมโครงการ #{{ index + 1 }}</strong>
                    <CButton 
                      color="danger" 
                      size="sm" 
                      @click="removeCoResearcher(index)"
                    >
                      ลบ
                    </CButton>
                  </div>
                  <CRow>
                    <CCol md="4">
                      <CInput 
                        label="ชื่อ-สกุล *" 
                        v-model="researcher.name" 
                        placeholder="กรอกชื่อ"
                      />
                    </CCol>
                    <CCol md="4">
                      <CInput 
                        label="สังกัดหน่วยงาน *" 
                        v-model="researcher.affiliation" 
                        placeholder="เช่น วิทยาลัยการเกษตรและเทคโนโลยี"
                      />
                    </CCol>
                    <CCol md="4">
                      <CInput 
                        label="เบอร์โทรศัพท์ *" 
                        v-model="researcher.phone" 
                        placeholder="0xx-xxxxxxx"
                      />
                    </CCol>
                    <CCol md="6">
                      <CInput 
                        label="E-mail address *" 
                        v-model="researcher.email" 
                        placeholder="name@mfu.ac.th"
                        type="email"
                      />
                    </CCol>
                    <CCol md="6">
                      <CInput 
                        label="ผลเป็นเลขสังกัดหรือรับรองตละ *" 
                        v-model="researcher.code" 
                        placeholder="เช่น 80"
                      />
                    </CCol>
                  </CRow>
                </div>

                <div v-if="form.researchers.coResearchers.length === 0" class="text-center text-muted py-3">
                  <em>ยังไม่มีผู้ร่วมโครงการ กดปุ่ม "+ เพิ่มผู้ร่วมโครงการ" เพื่อเพิ่ม</em>
                </div>
              </div>
            </div>

            <!-- 2) ที่ปรึกษาโครงการวิจัย (เพิ่มได้หลายคน) -->
            <div class="mb-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="font-weight-bold text-info mb-0">2) ที่ปรึกษาโครงการวิจัย (เพิ่มได้หลายคน)</h6>
                <CButton color="info" size="sm" @click="addAdvisor">
                  + เพิ่มที่ปรึกษาโครงการ
                </CButton>
              </div>

              <div 
                v-for="(advisor, index) in form.researchers.advisors" 
                :key="'advisor-' + index"
                class="border rounded p-3 mb-3 bg-light position-relative"
              >
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <strong>{{ index + 1 }}.{{ index + 1 }} ที่ปรึกษาโครงการวิจัย</strong>
                  <CButton 
                    color="danger" 
                    size="sm" 
                    @click="removeAdvisor(index)"
                  >
                    ลบ
                  </CButton>
                </div>
                <CRow>
                  <CCol md="4">
                    <CInput 
                      label="ชื่อ-สกุล *" 
                      v-model="advisor.name" 
                      placeholder="กรอกชื่อ-นามสกุล"
                    />
                  </CCol>
                  <CCol md="4">
                    <CInput 
                      label="สังกัดหน่วยงาน *" 
                      v-model="advisor.affiliation" 
                      placeholder="เช่น วิทยาลัยการเกษตรและเทคโนโลยี"
                    />
                  </CCol>
                  <CCol md="4">
                    <CInput 
                      label="เบอร์โทรศัพท์ *" 
                      v-model="advisor.phone" 
                      placeholder="0xx-xxxxxxx"
                    />
                  </CCol>
                  <CCol md="12">
                    <CInput 
                      label="E-mail address *" 
                      v-model="advisor.email" 
                      placeholder="name@mfu.ac.th"
                      type="email"
                    />
                  </CCol>
                </CRow>
              </div>

              <div v-if="form.researchers.advisors.length === 0" class="text-center text-muted py-3 border rounded">
                <em>ยังไม่มีที่ปรึกษาโครงการ กดปุ่ม "+ เพิ่มที่ปรึกษาโครงการ" เพื่อเพิ่ม</em>
              </div>
            </div>

            <!-- 3) ความร่วมมือด้านการวิจัยกับหน่วยงานเกายนอก -->
            <div class="mb-4">
              <h6 class="font-weight-bold mb-3">3) ความร่วมมือด้านการวิจัยกับหน่วยงานเกายนอก</h6>
              <div class="border rounded p-3 bg-light">
                <CRow>
                  <CCol md="6">
                    <CSelect 
                      label="มีความร่วมมือหรือไม่" 
                      :options="['ไม่มี', 'มี']" 
                      :value.sync="form.researchers.externalCollaboration.hasCollaboration" 
                    />
                  </CCol>
                  <CCol md="12" v-if="form.researchers.externalCollaboration.hasCollaboration === 'มี'">
                    <CInput 
                      label="รายละเอียดหน่วยงาน/ลูปความร่วมมือ" 
                      v-model="form.researchers.externalCollaboration.details" 
                      placeholder="เช่น การวิจัยและบริการวิชาการระบบเพื่อพันธุ์ความร่วมยอนากการเเแข่งขัน"
                    />
                  </CCol>
                </CRow>
              </div>
            </div>
          </CCardBody>
        </CCard>
        <!-- จบส่วนที่เพิ่มใหม่ -->

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


            <CRow class="mb-4">
              <CCol md="12">
                <label class="font-weight-bold">2) ประเภททุน *</label>
                <div class="d-flex flex-wrap border rounded p-3 bg-light" style="gap: 25px;">
                  <div v-for="type in budgetTypes" :key="type.value" class="custom-control custom-radio">
                    <input type="radio" :id="'radio-' + type.value" :value="type.label" v-model="form.budgetType"
                      class="custom-control-input">
                    <label class="custom-control-label" :for="'radio-' + type.value">{{ type.label }}</label>
                  </div>
                </div>
              </CCol>
            </CRow>

            <hr class="my-4">

            <CRow>
              <CCol md="12">
                <h5 class="font-weight-bold mb-4 text-dark">
                  14) ผลลัพธ์ที่คาดว่าจะได้รับจากงานวิจัยเมื่อเสร็จสิ้นการวิจัย *
                </h5>

                <div v-if="form.budgetType === 'ทุนนักวิจัยรุ่นใหม่'"
                  class="outcome-box p-3 border rounded bg-white shadow-sm mb-4">
                  <h6 class="font-weight-bold text-primary mb-3">14.1 ทุนนักวิจัยรุ่นใหม่</h6>
                  <div v-for="(item, index) in outcomes.newResearcher" :key="'opt1-' + index"
                    class="custom-control custom-checkbox mb-2 ml-2">
                    <input type="checkbox" class="custom-control-input" :id="'chk1-' + index" :value="item"
                      v-model="form.selectedOutcomes">
                    <label class="custom-control-label small" :for="'chk1-' + index">{{ item }}</label>
                  </div>
                </div>

                <div v-if="form.budgetType === 'ทุนพัฒนานักวิจัย'"
                  class="outcome-box p-3 border rounded bg-white shadow-sm mb-4">
                  <h6 class="font-weight-bold text-success mb-3">14.2 ทุนพัฒนานักวิจัย</h6>
                  <div v-for="(item, index) in outcomes.devResearcher" :key="'opt2-' + index"
                    class="custom-control custom-checkbox mb-2 ml-2">
                    <input type="checkbox" class="custom-control-input" :id="'chk2-' + index" :value="item"
                      v-model="form.selectedOutcomes">
                    <label class="custom-control-label small" :for="'chk2-' + index">{{ item }}</label>
                  </div>
                </div>

                <div v-if="form.budgetType === 'ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์'"
                  class="outcome-box p-3 border rounded bg-white shadow-sm mb-4">
                  <h6 class="font-weight-bold text-warning mb-3">14.3 ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์</h6>
                  <div v-for="(item, index) in outcomes.strategic" :key="'opt3-' + index"
                    class="custom-control custom-checkbox mb-2 ml-2">
                    <input type="checkbox" class="custom-control-input" :id="'chk3-' + index" :value="item"
                      v-model="form.selectedOutcomes">
                    <label class="custom-control-label small" :for="'chk3-' + index">{{ item }}</label>
                  </div>
                </div>

                <div v-if="form.budgetType === 'ทุนต่อยอดสู่ภาคอุตสาหกรรม'"
                  class="outcome-box p-3 border rounded bg-white shadow-sm mb-4">
                  <h6 class="font-weight-bold text-info mb-3">14.4 ทุนต่อยอดสู่ภาคอุตสาหกรรม</h6>
                  <div v-for="(item, index) in outcomes.industrial" :key="'opt4-' + index"
                    class="custom-control custom-checkbox mb-2 ml-2">
                    <input type="checkbox" class="custom-control-input" :id="'chk4-' + index" :value="item"
                      v-model="form.selectedOutcomes">
                    <label class="custom-control-label small" :for="'chk4-' + index">{{ item }}</label>
                  </div>
                </div>
              </CCol>
            </CRow>


            <label class="font-weight-bold">15) การบูรณาการงานวิจัย</label>
            <quill-editor v-model="form.IntegrationResearch" :options="editorOption" class="mb-4" />

            <CRow>
              <CCol md="6">
                <label class="font-weight-bold">16) ระดับการถ่ายทอดสู่สังคม</label>
                <CInputRadioGroup
                  :options="['สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้ในระดับภูมิภาค ประเทศ หรือนานาชาติ', 'สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้เฉพาะกลุ่มอาชีพ ชุมชน หรือจังหวัด', 'ไม่มีการนำไปถ่ายทอดสู่สังคม']"
                  :checked.sync="form.transferLevel" />
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
            <label class="font-weight-bold">19) คำชี้เเจงอื่นๆ (ถ้ามี)</label>
            
            <!-- ระบุชื่อผู้รับผิดชอบโครงการ -->
            <CRow class="mb-4">
              <CCol md="6">
                <label class="font-weight-bold mb-3">ชื่อหัวหน้าโครงการวิจัย</label>
                <CInput 
                  v-model="form.signatures.headResearcher.name" 
                  placeholder="กฟกฟ"
                />
              </CCol>
              <CCol md="6">
                <label class="font-weight-bold mb-3">ชื่อผู้ร่วมโครงการวิจัย</label>
                <CInput 
                  v-model="form.signatures.coResearcher.name" 
                  placeholder="กฟกฟก"
                />
              </CCol>
            </CRow>

            <h6 class="font-weight-bold mb-3">2) ที่ปรึกษาโครงการวิจัย (เพิ่มได้หลายคน)</h6>
            
            <div 
              v-for="(advisor, index) in form.signatures.advisors" 
              :key="'sig-advisor-' + index"
              class="border rounded p-3 mb-3 bg-light"
            >
              <div class="d-flex justify-content-between align-items-center mb-2">
                <strong>{{ index + 1 }}.{{ index + 1 }} ที่ปรึกษาโครงการวิจัย</strong>
                <CButton 
                  color="danger" 
                  size="sm" 
                  @click="removeSignatureAdvisor(index)"
                  v-if="form.signatures.advisors.length > 1"
                >
                  ลบ
                </CButton>
              </div>
              <CRow>
                <CCol md="4">
                  <CInput 
                    label="ชื่อ-สกุล*" 
                    v-model="advisor.name" 
                    placeholder="กฟกฟ"
                  />
                </CCol>
                <CCol md="4">
                  <CInput 
                    label="สังกัดหน่วยงาน*" 
                    v-model="advisor.affiliation" 
                    placeholder="กฟกฟก"
                  />
                </CCol>
                <CCol md="4">
                  <CInput 
                    label="เบอร์โทรศัพท์*" 
                    v-model="advisor.phone" 
                    placeholder="กฟกฟ"
                  />
                </CCol>
              </CRow>
            </div>

            <div class="text-center mb-4">
              <CButton color="primary" size="sm" @click="addSignatureAdvisor">
                + เพิ่มผู้ร่วม
              </CButton>
            </div>

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
// นำเข้า Editor และ CSS (เหมือนเดิม)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'

// Import Components อื่นๆ (ถ้ามีในโปรเจกต์จริงต้องคงไว้)
import BudgetSection from "@/components/BudgetSection.vue";
import ResearchSection12 from "@/components/Section12.vue";
import html2pdf from "html2pdf.js";

export default {
  name: "ResearchForm",
  components: {
    BudgetSection,
    ResearchSection12,
    quillEditor
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
      // ตัวเลือกประเภททุน
      budgetTypes: [
        { label: "ทุนนักวิจัยใหม่", value: "new" },
        { label: "ทุนพัฒนานักวิจัย", value: "dev" },
        { label: "ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์", value: "strategic" },
        { label: "ทุนต่อยอดสู่ภาคอุตสาหกรรม", value: "industrial" }
      ],
      // ข้อมูลผลลัพธ์ (Outcomes)
      outcomes: {
        newResearcher: [
          "นำเสนอในการประชุมวิชาการระดับนานาชาติ โดยต้องเป็นบทความฉบับสมบูรณ์ (Fullpaper)...",
          "ตีพิมพ์ในวารสารทางวิชาการที่มีรายชื่ออยู่ในฐานข้อมูล...",
          "ตีพิมพ์วารสารทางวิชาการระดับชาติ...",
          "อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอฯ)"
        ],
        devResearcher: [
          "ตีพิมพ์ในวารสารทางวิชาการระดับนานาชาติ...",
          "ตีพิมพ์วารสารทางวิชาการระดับชาติ...",
          "อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอฯ)"
        ],
        strategic: [
          "ตีพิมพ์ในวารสารทางวิชาการระดับนานาชาติ...",
          "ตีพิมพ์วารสารทางวิชาการระดับชาติ...",
          "อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอฯ)"
        ],
        industrial: [
          "การยื่นขอจดทะเบียนทรัพย์สินทางปัญญา (มีเลขคำขอฯ)"
        ]
      },
      researchTypeOptions: [
        { value: 'Science', label: 'ด้านวิทยาศาสตร์และเทคโนโลยี' },
        { value: 'Health', label: 'ด้านวิทยาศาสตร์สุขภาพ' },
        { value: 'Social', label: 'ด้านสังคมศาสตร์และมนุญศาสตร์' }
      ],
      // Mapping หัวข้อ Text Fields 5-11
      textFields: [
        { label: "5) คำสำคัญ (Keywords)", model: "keywords" },
        { label: "6) ความสำคัญของปัญหาและแนวคิด", model: "importance" },
        { label: "7) วัตถุประสงค์", model: "objective" },
        { label: "8) ทบทวนวรรณกรรม", model: "literature" },
        { label: "9) เอกสารอ้างอิง", model: "reference" },
        { label: "10) วิธีดำเนินการวิจัย", model: "methodology" },
        { label: "11) ขอบเขตการวิจัย", model: "scope" }
      ],
      // ตัวแปร Form หลัก
      form: {
        titleTH: "",
        titleEN: "",
        budgetType: "",
        budgets: [], // ข้อมูลจาก BudgetSection
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
        progressReport: "",
        expectedResults: [],
        integration: "",
        transferLevel: "ไม่มี",
        ethics: { human: false, animal: false },
        remark: "",
        selectedOutcomes: [],
        
        researchers: {
          mainResearcher: { name: "", affiliation: "", phone: "", email: "", code: "" },
          coResearchers: [],
          advisors: [],
          externalCollaboration: { hasCollaboration: "ไม่มี", details: "" }
        },
        
        signatures: {
          headResearcher: { name: "" },
          coResearcher: { name: "" },
          advisors: [{ name: "", affiliation: "", phone: "" }]
        }
      },
    };
  },
  watch: {
    'form.budgetType': function() {
      this.form.selectedOutcomes = [];
    }
  },
  methods: {
    addCoResearcher() {
      this.form.researchers.coResearchers.push({ name: "", affiliation: "", phone: "", email: "", code: "" });
    },
    removeCoResearcher(index) {
      this.form.researchers.coResearchers.splice(index, 1);
    },
    addAdvisor() {
      this.form.researchers.advisors.push({ name: "", affiliation: "", phone: "", email: "" });
    },
    removeAdvisor(index) {
      this.form.researchers.advisors.splice(index, 1);
    },
    addSignatureAdvisor() {
      this.form.signatures.advisors.push({ name: "", affiliation: "", phone: "" });
    },
    removeSignatureAdvisor(index) {
      if (this.form.signatures.advisors.length > 1) {
        this.form.signatures.advisors.splice(index, 1);
      }
    },
    submit() {
      console.log(this.form);
      alert("บันทึกสำเร็จ (Data logged in console)");
    },

    // --- ส่วนที่แก้ไข: ฟังก์ชัน Export PDF ---
    exportPDF() {
      // 1. เรียกฟังก์ชันสร้างเนื้อหา HTML ที่สมบูรณ์
      const pdfContent = this.generatePDFContent();
      
      // 2. สร้าง Element ชั่วคราวสำหรับ render
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = pdfContent;
      // กำหนด Style ให้ div ชั่วคราวเพื่อให้แน่ใจว่าการจัดหน้าถูกต้อง
      tempDiv.style.width = '800px'; 
      tempDiv.style.padding = '30px';
      tempDiv.style.fontFamily = "'Sarabun', 'Arial', sans-serif"; // เน้น Font ไทย
      tempDiv.style.fontSize = '14px';
      tempDiv.style.lineHeight = '1.5';
      document.body.appendChild(tempDiv);
      
      // 3. ตั้งค่า html2pdf
      const opt = {
        margin: [10, 10, 10, 10], // ขอบกระดาษ: บน ขวา ล่าง ซ้าย (mm)
        filename: 'Research_Form_RS1.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true }, // scale 2 เพื่อความชัด
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // 4. สั่ง Save และลบ Element ทิ้งเมื่อเสร็จ
      html2pdf().from(tempDiv).set(opt).save().then(() => {
        document.body.removeChild(tempDiv);
      });
    },
    
    // --- ส่วนที่แก้ไข: ฟังก์ชันสร้าง HTML เสมือนเอกสารจริง ---
    generatePDFContent() {
      const currentDate = new Date().toLocaleDateString('th-TH', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

      // Helper function: สร้าง Checkbox (☑ หรือ ☐)
      const chk = (condition) => condition ? '<span style="font-family: DejaVu Sans, sans-serif;">&#9745;</span>' : '<span style="font-family: DejaVu Sans, sans-serif;">&#9744;</span>';
      
      // Helper function: จัดการค่าว่าง
      const txt = (val) => val || '-';

      // 1. สร้างส่วนหัว (Header)
      let html = `
        <div style="font-family: 'Sarabun', sans-serif; color: #000;">
          <div style="text-align: right; font-size: 12px; margin-bottom: 10px;">RS-1</div>
          <div style="text-align: center; font-weight: bold; font-size: 18px; margin-bottom: 5px;">แบบเสนอโครงการวิจัย</div>
          <div style="text-align: center; margin-bottom: 20px;">ประกอบการของบประมาณงานวิจัย ประจำปีงบประมาณ พ.ศ. 2569</div>
          
          <div style="border: 1px solid #000; padding: 15px; margin-bottom: 20px;">
            <div style="font-weight: bold; margin-bottom: 10px;">ประเภททุน:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 15px;">
              ${this.budgetTypes.map(b => `
                <div style="min-width: 45%;">
                  ${chk(this.form.budgetType === b.label)} ${b.label}
                </div>
              `).join('')}
            </div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong>1. ชื่อโครงการ</strong><br>
            (ภาษาไทย): ${txt(this.form.titleTH)}<br>
            (ภาษาอังกฤษ): ${txt(this.form.titleEN)}
          </div>

          <div style="margin-bottom: 15px;">
            <strong>3. ความร่วมมือ:</strong> ${this.form.cooperation} 
            ${this.form.cooperation === 'มี' ? `(${this.form.cooperationDetail})` : ''}
          </div>

          <div style="margin-bottom: 20px;">
            <strong>4. ประเภทงานวิจัย:</strong> ${txt(this.form.researchType)}
          </div>

          <hr style="border-top: 2px solid #000; margin: 20px 0;">

          <h4 style="margin-bottom: 15px; font-weight: bold;">ส่วน ก) : สาระสำคัญของข้อเสนอโครงการวิจัย — คณะผู้วิจัย</h4>
          
          <div style="margin-bottom: 15px;">
            <strong>1.1 หัวหน้าโครงการวิจัย</strong>
            <table style="width: 100%; border-collapse: collapse; margin-top: 5px;">
              <tr>
                <td style="padding: 5px;">ชื่อ-สกุล: ${txt(this.form.researchers.mainResearcher.name)}</td>
                <td style="padding: 5px;">สังกัด: ${txt(this.form.researchers.mainResearcher.affiliation)}</td>
              </tr>
              <tr>
                <td style="padding: 5px;">โทรศัพท์: ${txt(this.form.researchers.mainResearcher.phone)}</td>
                <td style="padding: 5px;">Email: ${txt(this.form.researchers.mainResearcher.email)}</td>
              </tr>
            </table>
          </div>
      `;

      // 1.2 ผู้ร่วมโครงการ
      if (this.form.researchers.coResearchers.length > 0) {
        html += `<div style="margin-bottom: 15px;"><strong>1.2 ผู้ร่วมโครงการวิจัย</strong>`;
        this.form.researchers.coResearchers.forEach((res, index) => {
          html += `
            <div style="margin-left: 15px; margin-top: 5px; border-left: 3px solid #ddd; padding-left: 10px;">
              <div>${index + 1}. ${txt(res.name)} (${txt(res.affiliation)})</div>
            </div>`;
        });
        html += `</div>`;
      }

      // 2. ที่ปรึกษา
      if (this.form.researchers.advisors.length > 0) {
        html += `<div style="margin-bottom: 15px;"><strong>2. ที่ปรึกษาโครงการวิจัย</strong>`;
        this.form.researchers.advisors.forEach((adv, index) => {
          html += `<div style="margin-left: 15px;">${index + 1}. ${txt(adv.name)} (${txt(adv.affiliation)})</div>`;
        });
        html += `</div>`;
      }

      // 3. ความร่วมมือภายนอก
      if (this.form.researchers.externalCollaboration.hasCollaboration === 'มี') {
        html += `
          <div style="margin-bottom: 20px;">
            <strong>3. ความร่วมมือภายนอก:</strong> มี<br>
            รายละเอียด: ${txt(this.form.researchers.externalCollaboration.details)}
          </div>`;
      }

      // วนลูปสร้างเนื้อหา Text Fields (ข้อ 5-11)
      this.textFields.forEach(field => {
        html += `
          <div style="margin-bottom: 20px; page-break-inside: avoid;">
            <h5 style="font-weight: bold; background-color: #f0f0f0; padding: 5px;">${field.label}</h5>
            <div style="padding: 10px; border: 1px solid #ddd;">
              ${this.form[field.model] || '-'}
            </div>
          </div>
        `;
      });

      // 12. แผนการดำเนินงาน (เนื่องจากไม่มี Data Binding ชัดเจนใน Code ใส่เป็น Placeholder)
      html += `
        <div style="margin-bottom: 20px;">
          <h5 style="font-weight: bold; background-color: #f0f0f0; padding: 5px;">12) แผนการดำเนินงาน</h5>
          <div style="padding: 10px; border: 1px solid #ddd;">
             (รายละเอียดตามเอกสารแนบ หรือ ข้อมูลใน Section Component)
          </div>
        </div>
      `;

      // 13. ผลงานตามระยะเวลา (Progress)
      html += `
        <div style="margin-bottom: 20px;">
          <h5 style="font-weight: bold; background-color: #f0f0f0; padding: 5px;">13) ผลงานตามระยะเวลาการรายงาน</h5>
          <div style="padding: 10px; border: 1px solid #ddd;">${this.form.progressReport || '-'}</div>
        </div>
      `;

      // 14. ผลลัพธ์ที่คาดว่าจะได้รับ (Outcomes)
      html += `
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <h5 style="font-weight: bold; background-color: #f0f0f0; padding: 5px;">14) ผลลัพธ์ที่คาดว่าจะได้รับ</h5>
          <div style="padding: 10px;">
      `;
      if (this.form.selectedOutcomes.length > 0) {
        this.form.selectedOutcomes.forEach(outcome => {
          html += `<div style="margin-bottom: 5px;">${chk(true)} ${outcome}</div>`;
        });
      } else {
        html += `<div>-</div>`;
      }
      html += `</div></div>`;

      // 15-18 Sections อื่นๆ
      html += `
        <div style="margin-bottom: 10px;"><strong>15) การบูรณาการ:</strong> <div style="padding-left:15px;">${this.form.IntegrationResearch || '-'}</div></div>
        <div style="margin-bottom: 10px;"><strong>16) ระดับการถ่ายทอด:</strong> ${this.form.transferLevel}</div>
        <div style="margin-bottom: 10px;"><strong>17) งบประมาณ:</strong> 
          <div style="padding-left:15px;">
            ${this.form.budgets && this.form.budgets.length > 0 ? 'มีรายการงบประมาณ (ดูตารางแนบ)' : 'ไม่มีข้อมูล'}
          </div>
        </div>
        <div style="margin-bottom: 20px;"><strong>18) จริยธรรม:</strong> 
          มนุษย์ ${chk(this.form.ethics.human)} / สัตว์ทดลอง ${chk(this.form.ethics.animal)}
        </div>
      `;

      // 19. ส่วนลายเซ็น (นำโค้ดเดิมมาปรับปรุงให้สวยงาม)
      html += `
        <div style="page-break-before: always; margin-top: 30px;">
          <h3 style="text-align: center; margin-bottom: 30px;">19. คำชี้เเจงอื่นๆ (ถ้ามี) และการลงนาม</h3>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
             <div style="text-align: center; width: 45%;">
               <div>ลงชื่อ.......................................................</div>
               <div style="font-weight: bold; margin-top: 5px;">(${txt(this.form.signatures.headResearcher.name)})</div>
               <div>หัวหน้าโครงการวิจัย</div>
               <div>วันที่ ${currentDate}</div>
             </div>
             
             <div style="text-align: center; width: 45%;">
               <div>ลงชื่อ.......................................................</div>
               <div style="font-weight: bold; margin-top: 5px;">(${txt(this.form.signatures.coResearcher.name)})</div>
               <div>ผู้ร่วมโครงการวิจัย</div>
               <div>วันที่ ${currentDate}</div>
             </div>
          </div>
      `;

      // ลายเซ็นที่ปรึกษา
      if (this.form.signatures.advisors.length > 0) {
        this.form.signatures.advisors.forEach(adv => {
          html += `
            <div style="text-align: center; margin-top: 30px; page-break-inside: avoid;">
               <div>ลงชื่อ.......................................................</div>
               <div style="font-weight: bold; margin-top: 5px;">(${txt(adv.name)})</div>
               <div>(${txt(adv.affiliation)})</div>
               <div>ที่ปรึกษาโครงการวิจัย</div>
            </div>
          `;
        });
      }

      html += `</div></div>`; // ปิด div หลัก

      return html;
    }
  }
};
</script>
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
      // ปรับประเภททุนให้ตรงตามหัวข้อ 14.1 - 14.4
      budgetTypes: [
      { label: "ทุนนักวิจัยรุ่นใหม่", value: "new" },
      { label: "ทุนพัฒนานักวิจัย", value: "dev" },
      { label: "ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์", value: "strategic" },
      { label: "ทุนต่อยอดสู่ภาคอุตสาหกรรม", value: "industrial" }
    ],
      // รายละเอียดผลลัพธ์แยกตามประเภททุน
      outcomes: {
      newResearcher: [
        "นำเสนอในการประชุมวิชาการระดับนานาชาติ โดยต้องเป็นบทความฉบับสมบูรณ์ (Fullpaper) ที่ได้รับการตีพิมพ์ในรายงานสืบเนื่องจากการประชุม (Proceedings)",
        "ตีพิมพ์ในวารสารทางวิชาการที่มีรายชื่ออยู่ในฐานข้อมูล ตามประกาศ ก.พ.อ. เรื่องหลักเกณฑ์การพิจารณาวารสารทางวิชาการ สำหรับการเผยแพร่ผลงานทางวิชาการ",
        "ตีพิมพ์วารสารทางวิชาการระดับชาติ ต้องเป็นวารสารทางวิชาการที่ปรากฏในฐานข้อมูลTCI กลุ่มที่ 1 หรือ กลุ่มที่ 2",
        "อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอฯ)"
      ],
      devResearcher: [
        "ตีพิมพ์ในวารสารทางวิชาการระดับนานาชาติที่มีรายชื่ออยู่ในฐานข้อมูลตาม ประกาศก.พ.อ.เรื่องหลักเกณฑ์การพิจารณาวารสารทางวิชาการสำหรับการเผยแพร่ผลงานทางวิชาการ พ.ศ.2562",
        "ตีพิมพ์วารสารทางวิชาการระดับชาติ ต้องเป็นวารสารทางวิชาการที่ปรากฏในฐานข้อมูล TCI กลุ่มที่ 1 เท่านั้น",
        "อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอฯ)"
      ],
      strategic: [
        "ตีพิมพ์ในวารสารทางวิชาการระดับนานาชาติที่มีรายชื่ออยู่ในฐานข้อมูลตาม ประกาศ ก.พ.อ. เรื่องหลักเกณฑ์การพิจารณาวารสารทางวิชาการสำหรับการเผยแพร่ผลงานทางวิชาการ พ.ศ.2562",
        "ตีพิมพ์วารสารทางวิชาการระดับชาติ ต้องเป็นวารสารทางวิชาการที่ปรากฏในฐานข้อมูล TCI กลุ่มที่ 1 เท่านั้น",
        "อนุสิทธิบัตร/สิทธิบัตร (มีเลขคำขอฯ)"
      ],
      industrial: [
        "การยื่นขอจดทะเบียนทรัพย์สินทางปัญญา (มีเลขคำขอฯ)"
      ]
      },
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
        progressReport: "",
        expectedResults: [], 
        integration: "", 
        transferLevel: "ไม่มี",
        ethics: { human: false, animal: false }, 
        remark: "",
        selectedOutcomes: [], // สำหรับเก็บผลลัพธ์ที่ user ติ๊กเลือก
        
        // เพิ่มส่วนข้อมูลนักวิจัย
        researchers: {
          // 1.1 หัวหน้าโครงการวิจัย
          mainResearcher: {
            name: "",
            affiliation: "",
            phone: "",
            email: "",
            code: ""
          },
          // 1.2 ผู้ร่วมโครงการวิจัย (array เพราะเพิ่มได้หลายคน)
          coResearchers: [],
          // 2) ที่ปรึกษาโครงการวิจัย (array เพราะเพิ่มได้หลายคน)
          advisors: [],
          // 3) ความร่วมมือด้านการวิจัยกับหน่วยงานภายนอก
          externalCollaboration: {
            hasCollaboration: "ไม่มี",
            details: ""
          }
        },
        
        // เพิ่มส่วนข้อมูลลายเซ็น (ข้อ 19)
        signatures: {
          headResearcher: {
            name: ""
          },
          coResearcher: {
            name: ""
          },
          advisors: [
            {
              name: "",
              affiliation: "",
              phone: ""
            }
          ]
        }
      },
      
    };
  },
  watch: {
    // เมื่อเปลี่ยนประเภททุน ให้ล้างค่าที่เคยเลือกไว้ในข้อ 14 เพื่อป้องกันข้อมูลปนกัน
    'form.budgetType': function() {
      this.form.selectedOutcomes = [];
    }
  },
  methods: {
    // เพิ่มผู้ร่วมโครงการวิจัย
    addCoResearcher() {
      this.form.researchers.coResearchers.push({
        name: "",
        affiliation: "",
        phone: "",
        email: "",
        code: ""
      });
    },
    
    // ลบผู้ร่วมโครงการวิจัย
    removeCoResearcher(index) {
      this.form.researchers.coResearchers.splice(index, 1);
    },
    
    // เพิ่มที่ปรึกษาโครงการ
    addAdvisor() {
      this.form.researchers.advisors.push({
        name: "",
        affiliation: "",
        phone: "",
        email: ""
      });
    },
    
    // ลบที่ปรึกษาโครงการ
    removeAdvisor(index) {
      this.form.researchers.advisors.splice(index, 1);
    },
    
    // เพิ่มที่ปรึกษาในส่วนลายเซ็น (ข้อ 19)
    addSignatureAdvisor() {
      this.form.signatures.advisors.push({
        name: "",
        affiliation: "",
        phone: ""
      });
    },
    
    // ลบที่ปรึกษาในส่วนลายเซ็น (ข้อ 19)
    removeSignatureAdvisor(index) {
      if (this.form.signatures.advisors.length > 1) {
        this.form.signatures.advisors.splice(index, 1);
      }
    },
    
    submit() { 
      console.log(this.form); 
      alert("บันทึกสำเร็จ"); 
    },
    
    // ============================================================
    // [เพิ่มใหม่] exportPDF - แทนที่ฟังก์ชันเดิมทั้งหมด
    // สร้าง PDF ครบทุกหน้าตามแบบฟอร์ม RS-1 ของมหาวิทยาลัยแม่ฟ้าหลวง
    // ============================================================
    exportPDF() {
      const pdfContent = this.generatePDFContent();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = pdfContent;
      // กำหนด style สำหรับ element ชั่วคราว
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      document.body.appendChild(tempDiv);

      // ตั้งค่า html2pdf
      const opt = {
        margin:       [10, 15, 10, 15], // top, right, bottom, left (mm)
        filename:     'Research_Form_RS1.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
      };

      html2pdf().from(tempDiv).set(opt).save().then(() => {
        document.body.removeChild(tempDiv);
      });
    },

    // ============================================================
    // [เพิ่มใหม่] generatePDFContent - สร้าง HTML ครบทุกหน้า
    // ตามแบบฟอร์ม RS-1 ของมหาวิทยาลัยแม่ฟ้าหลวง
    // ============================================================
    generatePDFContent() {
      const f = this.form;

      // วันที่ปัจจุบัน (พ.ศ.)
      const now = new Date();
      const dd   = String(now.getDate()).padStart(2,'0');
      const mm   = String(now.getMonth()+1).padStart(2,'0');
      const yyyy = now.getFullYear() + 543;
      const currentDate = `${dd}/${mm}/${yyyy}`;

      // helper: strip html tags จาก quill output
      const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g,' ').trim();
      };

      // helper: checkbox สำหรับ PDF
      const chk = (checked) => checked
        ? `<span style="font-size:13px;">&#9745;</span>`
        : `<span style="font-size:13px;">&#9744;</span>`;

      // -------------------------------------------------------
      // หัวกระดาษทุกหน้า (ใส่ใน style page-header)
      // -------------------------------------------------------
      const pageHeader = `
        <div style="text-align:right; font-size:10px; color:#333; margin-bottom:4px;">RS-1</div>
      `;

      // -------------------------------------------------------
      // หน้า 1 - ข้อมูลทั่วไป (ข้อ 1-2)
      // -------------------------------------------------------
      const page1 = `
        <div style="page-break-after:always; padding:0 5mm;">
          ${pageHeader}
          <div style="text-align:center; font-weight:bold; font-size:14px; margin-bottom:8px;">แบบเสนอโครงการวิจัย</div>
          <div style="text-align:center; font-size:11px; margin-bottom:14px;">
            ประกอบการของบประมาณงานวิจัยของมหาวิทยาลัยแม่ฟ้าหลวง ประจำปีงบประมาณ พ.ศ. 2569
          </div>

          <!-- ประเภททุน checkboxes 2x2 -->
          <table style="width:100%; margin-bottom:14px; font-size:11px;">
            <tr>
              <td style="width:50%; padding:3px 0;">
                ${chk(f.budgetType==='ทุนนักวิจัยรุ่นใหม่')} ทุนนักวิจัยรุ่นใหม่
              </td>
              <td style="width:50%; padding:3px 0;">
                ${chk(f.budgetType==='ทุนพัฒนานักวิจัย')} ทุนพัฒนานักวิจัย
              </td>
            </tr>
            <tr>
              <td style="padding:3px 0;">
                ${chk(f.budgetType==='ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์')} ทุนที่สอดคล้องกับยุทธศาสตร์การวิจัย
              </td>
              <td style="padding:3px 0;">
                ${chk(f.budgetType==='ทุนต่อยอดสู่ภาคอุตสาหกรรม')} ทุนต่อยอดสู่ภาคอุตสาหกรรมและนวัตกรรม ภายใต้กรอบวิจัยยุทธศาสตร์ชาติ
              </td>
            </tr>
          </table>

          <!-- ข้อ 1 ชื่อโครงการ -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">1. ชื่อโครงการ</div>
          <div style="font-size:11px; margin-bottom:2px; margin-left:10px;">
            (ภาษาไทย) <span style="border-bottom:1px solid #000; display:inline-block; min-width:400px; padding:0 4px;">${f.titleTH || ''}</span>
          </div>
          <div style="font-size:11px; margin-bottom:10px; margin-left:10px;">
            (ภาษาอังกฤษ) <span style="border-bottom:1px solid #000; display:inline-block; min-width:380px; padding:0 4px;">${f.titleEN || ''}</span>
          </div>

          <!-- ข้อ 2 ระบุความสอดคล้อง -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:6px;">
            2. ระบุความสอดคล้องของโครงการวิจัยกับประเด็นยุทธศาสตร์การวิจัยมหาวิทยาลัยแม่ฟ้าหลวง<br>
            <span style="font-weight:normal;">โปรดเลือกกลุ่มที่สอดคล้องมากที่สุดเพียง 1 ข้อ (ทำเครื่องหมาย ✓ หน้าข้อ)</span>
          </div>
          <div style="font-size:10.5px; margin-left:10px; line-height:1.8;">
            <div>1. ประเภททุนนักวิจัยใหม่</div>
            <div style="margin-left:15px;">${chk(f.budgetType==='ทุนนักวิจัยรุ่นใหม่')} 1. โครงการวิจัยที่เสนอมีความสอดคล้องกับคุณวุฒิ หรือสาขาวิชา หรือภาระงาน</div>
            <div style="margin-top:4px;">2. ประเภททุนพัฒนานักวิจัย และทุนที่สอดคล้องกับยุทธศาสตร์การวิจัยและนวัตกรรม ภายใต้กรอบวิจัยยุทธศาสตร์ชาติ</div>
            <div style="margin-left:15px;">${chk(false)} 1. การพัฒนาเศรษฐกิจไทยด้วยเศรษฐกิจสร้างคุณค่าและเศรษฐกิจสร้างสรรค์ ให้มีความสามารถในการแข่งขันและพึ่งพาตนเองได้อย่างยั่งยืน</div>
            <div style="margin-left:15px;">${chk(false)} 2. การยกระดับสังคมและสิ่งแวดล้อม ให้มีการพัฒนาอย่างยั่งยืน สามารถแก้ไข ปัญหาท้าทายและปรับตัวได้ทันต่อ พลวัตการเปลี่ยนแปลงของโลก</div>
            <div style="margin-left:15px;">${chk(false)} 3. การพัฒนาวิทยาศาสตร์ เทคโนโลยี การวิจัยและนวัตกรรม ระดับขั้นแนวหน้าที่ก้าวหน้าล้ำยุค เพื่อสร้างโอกาสใหม่และความพร้อมของประเทศในอนาคต</div>
            <div style="margin-left:15px;">${chk(false)} 4. การพัฒนากำลังคนและสถาบัน ด้านวิทยาศาสตร์ วิจัยและนวัตกรรม ให้เป็นฐานการขับเคลื่อนการพัฒนาเศรษฐกิจและสังคมของประเทศแบบก้าวกระโดดและอย่างยั่งยืน</div>
            <div style="margin-top:4px;">3. ประเภททุนต่อยอดสู่ภาคอุตสาหกรรม</div>
            <div style="margin-left:15px;">${chk(f.budgetType==='ทุนต่อยอดสู่ภาคอุตสาหกรรม')} 1. การวิจัยและสร้างนวัตกรรมเพื่อเพิ่มขีดความสามารถการแข่งขัน</div>
          </div>
        </div>
      `;

      // -------------------------------------------------------
      // หน้า 2 - ส่วน ก คณะผู้วิจัย
      // -------------------------------------------------------
      const main = f.researchers.mainResearcher;
      const coList = f.researchers.coResearchers || [];
      const advisorList = f.researchers.advisors || [];

      // สร้าง HTML สำหรับผู้ร่วมโครงการ
      let coResearchersHtml = '';
      coList.forEach((co, i) => {
        coResearchersHtml += `
          <div style="margin-left:20px; margin-bottom:10px; font-size:10.5px; line-height:2;">
            <div style="font-weight:bold;">1.${i+2} ผู้ร่วมโครงการวิจัย</div>
            <div>ชื่อ-สกุล <span style="border-bottom:1px solid #000; display:inline-block; min-width:300px; padding:0 4px;">${co.name||''}</span></div>
            <div>สังกัดหน่วยงาน <span style="border-bottom:1px solid #000; display:inline-block; min-width:280px; padding:0 4px;">${co.affiliation||''}</span></div>
            <div>เบอร์โทรศัพท์ที่ติดต่อได้ <span style="border-bottom:1px solid #000; display:inline-block; min-width:200px; padding:0 4px;">${co.phone||''}</span></div>
            <div>E-mail address <span style="border-bottom:1px solid #000; display:inline-block; min-width:270px; padding:0 4px;">${co.email||''}</span></div>
            <div>ความรับผิดชอบต่อโครงการที่เสนอ คิดเป็นสัดส่วนการวิจัยร้อยละ <span style="border-bottom:1px solid #000; display:inline-block; min-width:60px; padding:0 4px;">${co.code||''}</span></div>
          </div>
        `;
      });

      // สร้าง HTML สำหรับที่ปรึกษา
      let advisorsHtml = '';
      advisorList.forEach((adv) => {
        advisorsHtml += `
          <div style="margin-left:20px; margin-bottom:10px; font-size:10.5px; line-height:2;">
            <div>ชื่อ-สกุล <span style="border-bottom:1px solid #000; display:inline-block; min-width:300px; padding:0 4px;">${adv.name||''}</span></div>
            <div>สังกัดหน่วยงาน <span style="border-bottom:1px solid #000; display:inline-block; min-width:280px; padding:0 4px;">${adv.affiliation||''}</span></div>
            <div>เบอร์โทรศัพท์ที่ติดต่อได้ <span style="border-bottom:1px solid #000; display:inline-block; min-width:200px; padding:0 4px;">${adv.phone||''}</span></div>
            <div>E-mail address <span style="border-bottom:1px solid #000; display:inline-block; min-width:270px; padding:0 4px;">${adv.email||''}</span></div>
          </div>
        `;
      });

      const page2 = `
        <div style="page-break-after:always; padding:0 5mm;">
          ${pageHeader}
          <div style="text-decoration:underline; font-weight:bold; font-size:12px; margin-bottom:8px;">ส่วน ก : สาระสำคัญของข้อเสนอโครงการวิจัย</div>

          <!-- 1. คณะผู้วิจัย -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:6px;">1. คณะผู้วิจัย</div>

          <!-- 1.1 หัวหน้า -->
          <div style="margin-left:20px; margin-bottom:10px; font-size:10.5px; line-height:2;">
            <div style="font-weight:bold;">1.1 หัวหน้าโครงการวิจัย</div>
            <div>ชื่อ-สกุล <span style="border-bottom:1px solid #000; display:inline-block; min-width:300px; padding:0 4px;">${main.name||''}</span></div>
            <div>สังกัดหน่วยงาน <span style="border-bottom:1px solid #000; display:inline-block; min-width:280px; padding:0 4px;">${main.affiliation||''}</span></div>
            <div>เบอร์โทรศัพท์ที่ติดต่อได้ <span style="border-bottom:1px solid #000; display:inline-block; min-width:200px; padding:0 4px;">${main.phone||''}</span></div>
            <div>E-mail address <span style="border-bottom:1px solid #000; display:inline-block; min-width:270px; padding:0 4px;">${main.email||''}</span></div>
            <div>ความรับผิดชอบต่อโครงการที่เสนอ คิดเป็นสัดส่วนการวิจัยร้อยละ <span style="border-bottom:1px solid #000; display:inline-block; min-width:60px; padding:0 4px;">${main.code||''}</span></div>
          </div>

          <!-- ผู้ร่วมโครงการ -->
          ${coResearchersHtml}

          <!-- 2. ที่ปรึกษา -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">2. ที่ปรึกษาโครงการวิจัย</div>
          ${advisorsHtml}

          <!-- 3. ความร่วมมือภายนอก -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">3. ความร่วมมือด้านการวิจัยกับหน่วยงานภายนอก</div>
          <div style="margin-left:20px; font-size:10.5px; margin-bottom:10px;">
            ${f.researchers.externalCollaboration.hasCollaboration === 'มี'
              ? f.researchers.externalCollaboration.details || '-'
              : '-'}
          </div>

          <!-- 4. ประเภทของการวิจัย -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:2px;">4. ประเภทของการวิจัย</div>
          <div style="margin-left:20px; font-size:10.5px; margin-bottom:10px;">
            <span style="border-bottom:1px solid #000; display:inline-block; min-width:300px; padding:0 4px;">
              ${f.researchType || ''}
            </span>
          </div>

          <!-- 5. คำสำคัญ -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:2px;">5. คำสำคัญ (Keywords) ของโครงการวิจัย</div>
          <div style="margin-left:20px; font-size:10.5px; margin-bottom:10px; line-height:1.6;">
            ${stripHtml(f.keywords) || ''}
          </div>
        </div>
      `;

      // -------------------------------------------------------
      // หน้า 3-10 - เนื้อหาหลัก (ข้อ 6-12)
      // -------------------------------------------------------
      const page3 = `
        <div style="page-break-after:always; padding:0 5mm;">
          ${pageHeader}

          <!-- 6. ความสำคัญของปัญหา -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">6. ความสำคัญที่มาของปัญหาทำการวิจัย และกรอบแนวความคิด (Conceptual Framework)</div>
          <div style="font-size:10.5px; margin-bottom:12px; line-height:1.7; text-indent:1em;">
            ${stripHtml(f.importance) || ''}
          </div>

          <!-- 7. วัตถุประสงค์ -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">7. วัตถุประสงค์ของโครงการวิจัย</div>
          <div style="font-size:10.5px; margin-bottom:12px; line-height:1.7; margin-left:10px;">
            ${stripHtml(f.objective) || ''}
          </div>
        </div>
      `;

      const page4 = `
        <div style="page-break-after:always; padding:0 5mm;">
          ${pageHeader}

          <!-- 8. ทบทวนวรรณกรรม -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">8. การทบทวนวรรณกรรม ผลงานวิจัยต่าง ๆ ที่เกี่ยวข้อง</div>
          <div style="font-size:10.5px; margin-bottom:12px; line-height:1.7; text-indent:1em;">
            ${stripHtml(f.literature) || ''}
          </div>

          <!-- 9. เอกสารอ้างอิง -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">9. เอกสารอ้างอิงของโครงการวิจัย</div>
          <div style="font-size:10.5px; margin-bottom:12px; line-height:1.7; margin-left:10px;">
            ${stripHtml(f.reference) || ''}
          </div>
        </div>
      `;

      const page5 = `
        <div style="page-break-after:always; padding:0 5mm;">
          ${pageHeader}

          <!-- 10. วิธีดำเนินการวิจัย -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">10. กระบวนการและวิธีการดำเนินโครงการวิจัย สถานที่ทำการทดลองและเก็บข้อมูล</div>
          <div style="font-size:10.5px; margin-bottom:12px; line-height:1.7; text-indent:1em;">
            ${stripHtml(f.methodology) || ''}
          </div>

          <!-- 11. ขอบเขต -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">11. ขอบเขตของโครงการวิจัย</div>
          <div style="font-size:10.5px; margin-bottom:12px; line-height:1.7; margin-left:10px;">
            ${stripHtml(f.scope) || ''}
          </div>
        </div>
      `;

      // -------------------------------------------------------
      // หน้า - ข้อ 13-16
      // -------------------------------------------------------
      // สร้าง HTML สำหรับ outcomes ที่เลือก
      const outcomeSelected = f.selectedOutcomes || [];
      let outcomesHtml = '';
      if (f.budgetType === 'ทุนนักวิจัยรุ่นใหม่') {
        outcomesHtml += `<div style="font-weight:bold; margin-bottom:4px;">14.1 ทุนนักวิจัยรุ่นใหม่</div>`;
        this.outcomes.newResearcher.forEach(item => {
          outcomesHtml += `<div style="margin-left:15px; margin-bottom:3px;">${chk(outcomeSelected.includes(item))} ${item}</div>`;
        });
      } else if (f.budgetType === 'ทุนพัฒนานักวิจัย') {
        outcomesHtml += `<div style="font-weight:bold; margin-bottom:4px;">14.2 ทุนพัฒนานักวิจัย</div>`;
        this.outcomes.devResearcher.forEach(item => {
          outcomesHtml += `<div style="margin-left:15px; margin-bottom:3px;">${chk(outcomeSelected.includes(item))} ${item}</div>`;
        });
      } else if (f.budgetType === 'ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์') {
        outcomesHtml += `<div style="font-weight:bold; margin-bottom:4px;">14.3 ทุนวิจัยที่สอดคล้องกับยุทธศาสตร์</div>`;
        this.outcomes.strategic.forEach(item => {
          outcomesHtml += `<div style="margin-left:15px; margin-bottom:3px;">${chk(outcomeSelected.includes(item))} ${item}</div>`;
        });
      } else if (f.budgetType === 'ทุนต่อยอดสู่ภาคอุตสาหกรรม') {
        outcomesHtml += `<div style="font-weight:bold; margin-bottom:4px;">14.4 ทุนต่อยอดสู่ภาคอุตสาหกรรม</div>`;
        this.outcomes.industrial.forEach(item => {
          outcomesHtml += `<div style="margin-left:15px; margin-bottom:3px;">${chk(outcomeSelected.includes(item))} ${item}</div>`;
        });
      }

      const page6 = `
        <div style="page-break-after:always; padding:0 5mm;">
          ${pageHeader}

          <!-- 13. ผลงานตามระยะเวลา -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">13. ผลงานตามระยะเวลาการรายงานความก้าวหน้างานวิจัย</div>
          <div style="font-size:10.5px; margin-bottom:12px; line-height:1.7; margin-left:10px;">
            ${stripHtml(f.progressReport) || ''}
          </div>

          <!-- 14. ผลลัพธ์ที่คาดว่าจะได้รับ -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:6px;">14. ผลลัพธ์ที่คาดว่าจะได้รับจากงานวิจัยเมื่อเสร็จสิ้นการวิจัย *</div>
          <div style="font-size:10.5px; margin-bottom:12px; line-height:1.7; margin-left:10px;">
            ${outcomesHtml}
          </div>

          <!-- 15. การบูรณาการ -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">15. การบูรณาการงานวิจัย</div>
          <div style="font-size:10.5px; margin-bottom:12px; line-height:1.7; margin-left:10px;">
            ${stripHtml(f.IntegrationResearch) || '-'}
          </div>

          <!-- 16. ระดับการถ่ายทอดสู่สังคม -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:4px;">16. ระดับการถ่ายทอดสู่สังคม</div>
          <div style="font-size:10.5px; margin-bottom:4px; margin-left:10px;">
            ${chk(f.transferLevel==='สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้ในระดับภูมิภาค ประเทศ หรือนานาชาติ')}
            สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้ในระดับภูมิภาค ประเทศ หรือนานาชาติ
          </div>
          <div style="font-size:10.5px; margin-bottom:4px; margin-left:10px;">
            ${chk(f.transferLevel==='สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้เฉพาะกลุ่มอาชีพ ชุมชน หรือจังหวัด')}
            สามารถนำไปถ่ายทอดเป็นต้นแบบและแนวทางได้เฉพาะกลุ่มอาชีพ ชุมชน หรือจังหวัด
          </div>
          <div style="font-size:10.5px; margin-bottom:12px; margin-left:10px;">
            ${chk(f.transferLevel==='ไม่มีการนำไปถ่ายทอดสู่สังคม')} ไม่มีการนำไปถ่ายทอดสู่สังคม
          </div>
        </div>
      `;

      // -------------------------------------------------------
      // หน้า - ข้อ 17 งบประมาณ (ตาราง)
      // -------------------------------------------------------
      const budgets = f.budgets || [];
      let budgetRows = '';
      const categories = ['ค่าตอบแทนค่าจ้าง','ค่าใช้สอย','ค่าวัสดุ','ค่าครุภัณฑ์ (ถ้ามี)'];

      categories.forEach((cat, ci) => {
        const b = budgets[ci] || {};
        budgetRows += `
          <tr>
            <td style="border:1px solid #000; padding:4px 6px; font-size:10px;">${ci+1}. ${cat}</td>
            <td style="border:1px solid #000; padding:4px 6px; font-size:10px; text-align:right;">${b.q1||''}</td>
            <td style="border:1px solid #000; padding:4px 6px; font-size:10px; text-align:right;">${b.q2||''}</td>
            <td style="border:1px solid #000; padding:4px 6px; font-size:10px; text-align:right;">${b.q3||''}</td>
            <td style="border:1px solid #000; padding:4px 6px; font-size:10px; text-align:right;">${b.total||''}</td>
            <td style="border:1px solid #000; padding:4px 6px; font-size:10px; text-align:right;">${b.percent||''}</td>
          </tr>
        `;
      });

      const page7 = `
        <div style="page-break-after:always; padding:0 5mm;">
          ${pageHeader}

          <!-- 17. งบประมาณ -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:6px;">17. งบประมาณ</div>
          <table style="width:100%; border-collapse:collapse; font-size:10px; margin-bottom:12px;">
            <thead>
              <tr style="background:#f0f0f0;">
                <th style="border:1px solid #000; padding:4px 6px; text-align:left;">หมวด (ตามสัญญา)</th>
                <th style="border:1px solid #000; padding:4px 6px; text-align:center;">งวดที่ 1</th>
                <th style="border:1px solid #000; padding:4px 6px; text-align:center;">งวดที่ 2</th>
                <th style="border:1px solid #000; padding:4px 6px; text-align:center;">งวด 3</th>
                <th style="border:1px solid #000; padding:4px 6px; text-align:center;">งบประมาณรวมทั้งโครงการ</th>
                <th style="border:1px solid #000; padding:4px 6px; text-align:center;">ร้อยละ</th>
              </tr>
            </thead>
            <tbody>
              ${budgetRows}
              <tr>
                <td style="border:1px solid #000; padding:4px 6px; font-weight:bold; font-size:10px;">รวม</td>
                <td style="border:1px solid #000; padding:4px 6px; font-size:10px; text-align:right;"></td>
                <td style="border:1px solid #000; padding:4px 6px; font-size:10px; text-align:right;"></td>
                <td style="border:1px solid #000; padding:4px 6px; font-size:10px; text-align:right;"></td>
                <td style="border:1px solid #000; padding:4px 6px; font-size:10px; text-align:right;"></td>
                <td style="border:1px solid #000; padding:4px 6px; font-size:10px; text-align:right;">100.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

      // -------------------------------------------------------
      // หน้าสุดท้าย - ข้อ 18-19 (มาตรฐานวิจัย + ลายเซ็น)
      // -------------------------------------------------------
      // ลายเซ็นที่ปรึกษาเพิ่มเติม render ตรงใน pageLast แล้ว ไม่ต้องสร้าง variable แยก

      const pageLast = `
        <div style="padding:0 5mm;">
          ${pageHeader}

          <!-- 18. มาตรฐานการวิจัย -->
          <div style="font-weight:bold; font-size:11px; margin-bottom:6px;">18. มาตรฐานการวิจัย</div>
          <div style="font-size:10.5px; margin-left:10px; margin-bottom:4px;">
            ${chk(!f.ethics.human && !f.ethics.animal)}
            ไม่มีการทำวิจัยในมนุษย์ / ไม่มีการใช้สัตว์ทดลอง / การวิจัยที่เกี่ยวข้องกับงานด้านเทคโนโลยีชีวภาพสมัยใหม่
          </div>
          <div style="font-size:10.5px; margin-left:10px; margin-bottom:4px;">
            ${chk(f.ethics.human)} มีการทำวิจัยในมนุษย์
          </div>
          <div style="font-size:10.5px; margin-left:10px; margin-bottom:16px;">
            ${chk(f.ethics.animal)} มีการใช้สัตว์ทดลอง
          </div>

          <!-- 19. คำขี้แจงอื่นๆ + ลายเซ็น -->
          <div style="font-size:11px; margin-bottom:20px;">
            19. คำขี้แจงอื่นๆ(ถ้ามี)...........................................................................................................................
          </div>

          <!-- ลายเซ็น 2 คอลัมน์: ที่ปรึกษา (ซ้าย) + หัวหน้า (ขวา) -->
          <table style="width:100%; margin-bottom:30px;">
            <tr>
              <td style="width:50%; text-align:center; vertical-align:top; padding:10px;">
                <div style="margin-bottom:6px;">ลงชื่อ</div>
                <div style="font-size:16px; font-weight:bold; color:#00008B; margin-bottom:4px;">${f.signatures.headResearcher.name||''}</div>
                <div style="border-top:1px solid #000; width:80%; margin:0 auto 4px; padding-top:2px;">
                  (............${f.signatures.headResearcher.name||''}............)
                </div>
                <div>ที่ปรึกษาโครงการวิจัย</div>
                <div>วันที่.........${currentDate}..........................</div>
              </td>
              <td style="width:50%; text-align:center; vertical-align:top; padding:10px;">
                <div style="margin-bottom:6px;">ลงชื่อ</div>
                <div style="font-size:16px; font-weight:bold; color:#00008B; margin-bottom:4px;">${f.signatures.coResearcher.name||''}</div>
                <div style="border-top:1px solid #000; width:80%; margin:0 auto 4px; padding-top:2px;">
                  (............${f.signatures.coResearcher.name||''}............)
                </div>
                <div>หัวหน้าโครงการวิจัย</div>
                <div>วันที่.........${currentDate}..........................</div>
              </td>
            </tr>
          </table>

          <!-- ลายเซ็นที่ปรึกษาเพิ่มเติม (ผู้ร่วม) -->
          <table style="width:100%;">
            <tr>
              ${(f.signatures.advisors||[]).map(adv => `
                <td style="width:50%; text-align:center; vertical-align:top; padding:10px;">
                  <div style="margin-bottom:6px;">ลงชื่อ</div>
                  <div style="font-size:16px; font-weight:bold; color:#00008B; margin-bottom:4px;">${adv.name||''}</div>
                  <div style="border-top:1px solid #000; width:80%; margin:0 auto 4px; padding-top:2px;">
                    (............${adv.name||''}............)
                  </div>
                  <div>ผู้ร่วมโครงการวิจัย</div>
                  <div>วันที่.........${currentDate}..........................</div>
                </td>
              `).join('')}
            </tr>
          </table>
        </div>
      `;

      // -------------------------------------------------------
      // รวมทุกหน้า + style หลัก
      // -------------------------------------------------------
      return `
        <div style="
          font-family: 'TH Sarabun New', 'Sarabun', 'Angsana New', Arial, sans-serif;
          font-size: 11px;
          line-height: 1.6;
          color: #000;
          width: 190mm;
          margin: 0 auto;
        ">
          ${page1}
          ${page2}
          ${page3}
          ${page4}
          ${page5}
          ${page6}
          ${page7}
          ${pageLast}
        </div>
      `;
    }
    // ============================================================
    // จบส่วนที่เพิ่มใหม่ generatePDFContent
    // ============================================================
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