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