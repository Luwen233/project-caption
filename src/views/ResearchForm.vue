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

              <CRow class="w-100 m-0">
                <CCol md="12" class="px-0">
                  <CCard class="mt-4 shadow-sm w-100">
                    <CCardHeader class="bg-primary text-white">
                      <h5 class="m-0 font-weight-bold">ส่วน ก) : สาระสำคัญของข้อเสนอโครงการวิจัย — คณะผู้วิจัย</h5>
                    </CCardHeader>
                    <CCardBody class="p-4">

                      <div class="mb-5 w-100">
                        <h5 class="font-weight-bold mb-3 text-dark">1) คณะผู้วิจัย</h5>

                        <div class="border rounded p-4 mb-4 bg-light shadow-sm w-100">
                          <h6 class="font-weight-bold text-primary mb-3 border-bottom pb-2">
                            <CIcon name="cil-user" class="mr-2" /> 1.1 หัวหน้าโครงการวิจัย
                          </h6>
                          <CRow>
                            <CCol lg="4" md="6" sm="12">
                              <CInput label="ชื่อ-นามสกุล *" v-model="form.researchers.mainResearcher.name"
                                placeholder="ระบุชื่อ-นามสกุล" class="w-100" />
                            </CCol>
                            <CCol lg="4" md="6" sm="12">
                              <CInput label="สังกัดหน่วยงาน *" v-model="form.researchers.mainResearcher.affiliation"
                                placeholder="เช่น สำนักวิชา..." class="w-100" />
                            </CCol>
                            <CCol lg="4" md="6" sm="12">
                              <CInput label="เบอร์โทรศัพท์ *" v-model="form.researchers.mainResearcher.phone"
                                placeholder="0xx-xxxxxxx" class="w-100" />
                            </CCol>
                            <CCol lg="6" md="6" sm="12">
                              <CInput label="E-mail address *" v-model="form.researchers.mainResearcher.email"
                                type="email" placeholder="email@mfu.ac.th" class="w-100" />
                            </CCol>
                            <CCol lg="6" md="12" sm="12">
                              <CInput label="สัดส่วนการวิจัย (%) *" v-model="form.researchers.mainResearcher.code"
                                placeholder="เช่น 60" type="number" class="w-100" />
                            </CCol>
                          </CRow>
                        </div>

                        <div class="border rounded p-4 mb-4 bg-white shadow-sm border-success w-100">
                          <div
                            class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2 flex-wrap">
                            <h6 class="font-weight-bold text-success mb-2">
                              <CIcon name="cil-people" class="mr-2" /> 1.2 ผู้ร่วมโครงการวิจัย (ถ้ามี)
                            </h6>
                            <CButton color="success" size="sm" variant="outline" @click="addCoResearcher" class="mb-2">
                              <CIcon name="cil-plus" class="mr-1" /> เพิ่มผู้ร่วมโครงการ
                            </CButton>
                          </div>

                          <div v-for="(researcher, index) in form.researchers.coResearchers" :key="'co-' + index"
                            class="border rounded p-3 mb-3 bg-light position-relative w-100 shadow-none">
                            <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                              <span class="badge badge-success px-3 py-2 mb-2 shadow-sm">ผู้ร่วมโครงการคนที่ {{ index +
                                1 }}</span>
                              <CButton color="danger" size="sm" variant="ghost" @click="removeCoResearcher(index)"
                                class="mb-2">
                                <CIcon name="cil-trash" class="mr-1" /> ลบรายการนี้
                              </CButton>
                            </div>
                            <CRow>
                              <CCol lg="4" md="6" sm="12">
                                <CInput label="ชื่อ-นามสกุล *" v-model="researcher.name" class="w-100" />
                              </CCol>
                              <CCol lg="4" md="6" sm="12">
                                <CInput label="สังกัดหน่วยงาน *" v-model="researcher.affiliation" class="w-100" />
                              </CCol>
                              <CCol lg="4" md="6" sm="12">
                                <CInput label="เบอร์โทรศัพท์ *" v-model="researcher.phone" class="w-100" />
                              </CCol>
                              <CCol lg="6" md="6" sm="12">
                                <CInput label="E-mail address *" v-model="researcher.email" class="w-100" />
                              </CCol>
                              <CCol lg="6" md="12" sm="12">
                                <CInput label="สัดส่วนการวิจัย (%) *" v-model="researcher.code" type="number"
                                  class="w-100" />
                              </CCol>
                            </CRow>
                          </div>

                          <div v-if="form.researchers.coResearchers.length === 0"
                            class="text-center text-muted py-5 w-100">
                            <CIcon name="cil-info" class="mr-1" size="xl" /><br />
                            <em>ยังไม่มีข้อมูลผู้ร่วมโครงการ</em>
                          </div>
                        </div>
                      </div>

                      <div class="mb-4 w-100">
                        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                          <h5 class="font-weight-bold text-dark mb-2">2) ที่ปรึกษาโครงการวิจัย (ถ้ามี)</h5>
                          <CButton color="info" size="sm" variant="outline" @click="addAdvisor" class="mb-2">
                            <CIcon name="cil-plus" class="mr-1" /> เพิ่มที่ปรึกษาโครงการ
                          </CButton>
                        </div>

                        <div v-for="(advisor, index) in form.researchers.advisors" :key="'adv-' + index"
                          class="border rounded p-4 mb-3 bg-light shadow-sm border-info w-100">
                          <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                            <h6 class="font-weight-bold text-info mb-2 border-left-info pl-3">ที่ปรึกษาคนที่ {{ index +
                              1 }}</h6>
                            <CButton color="danger" size="sm" variant="ghost" @click="removeAdvisor(index)"
                              class="mb-2">
                              <CIcon name="cil-trash" class="mr-1" /> ลบออก
                            </CButton>
                          </div>
                          <CRow>
                            <CCol lg="4" md="6" sm="12">
                              <CInput label="ชื่อ-นามสกุล *" v-model="advisor.name" class="w-100" />
                            </CCol>
                            <CCol lg="4" md="6" sm="12">
                              <CInput label="สังกัดหน่วยงาน *" v-model="advisor.affiliation" class="w-100" />
                            </CCol>
                            <CCol lg="4" md="6" sm="12">
                              <CInput label="เบอร์โทรศัพท์ *" v-model="advisor.phone" class="w-100" />
                            </CCol>
                            <CCol lg="12" md="12" sm="12">
                              <CInput label="E-mail address *" v-model="advisor.email" class="w-100" />
                            </CCol>
                          </CRow>
                        </div>

                        <div v-if="form.researchers.advisors.length === 0"
                          class="text-center text-muted py-5 small border rounded border-dashed w-100">
                          <em>-- ยังไม่มีข้อมูลที่ปรึกษาโครงการ --</em>
                        </div>
                      </div>

                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>

              <CCol md="12">
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


            <CRow class="mb-5">
              <CCol md="12">
                <h5 class="font-weight-bold mb-4">18) มาตรฐานการวิจัย <span class="text-danger">*</span></h5>

                <div class="standard-container p-3 border rounded bg-white shadow-sm">

                  <div class="custom-control custom-checkbox mb-3">
                    <input type="checkbox" class="custom-control-input" id="std_none" value="none"
                      v-model="form.standards">
                    <label class="custom-control-label" for="std_none">
                      ไม่มีการทำวิจัยในมนุษย์ / ไม่มีการใช้สัตว์ทดลอง /
                      การวิจัยที่เกี่ยวข้องกับการงานด้านเทคโนโลยีชีวภาพสมัยใหม่
                    </label>
                  </div>

                  <div class="custom-control custom-checkbox mb-2">
                    <input type="checkbox" class="custom-control-input" id="std_human" value="human"
                      v-model="form.standards">
                    <label class="custom-control-label" for="std_human">มีการทำวิจัยในมนุษย์</label>
                  </div>

                  <div v-if="form.standards.includes('human')" class="ml-5 mb-4 p-2 border-left">
                    <div class="custom-control custom-checkbox mb-2">
                      <input type="checkbox" class="custom-control-input" id="human_cert"
                        v-model="form.humanDetail.hasCert">
                      <label class="custom-control-label small" for="human_cert">มีหนังสือรับรองจริยธรรมการวิจัยในมนุษย์
                        (แนบสำเนา 1 ชุด)</label>
                    </div>

                    <div class="custom-control custom-checkbox mb-2">
                      <input type="checkbox" class="custom-control-input" id="human_pending"
                        v-model="form.humanDetail.isPending">
                      <label class="custom-control-label small" for="human_pending">
                        ไม่มีหนังสือรับรองจริยธรรมการวิจัยในมนุษย์
                        อยู่ระหว่างเสนอคณะกรรมการจริยธรรมการวิจัยในมนุษย์พิจารณา
                      </label>
                    </div>

                    <div v-if="form.humanDetail.isPending" class="d-flex align-items-center mt-2 ml-4 flex-wrap"
                      style="gap: 10px;">
                      <span class="small">วันที่ยื่นโครงการ</span>
                      <CInput type="date" v-model="form.humanDetail.applyDate" size="sm" class="mb-0"
                        style="width: 150px;" />
                      <div class="custom-file-upload border p-1 rounded bg-light d-flex align-items-center">
                        <input type="file" @change="handleFileUpload($event, 'human')" class="small">
                      </div>
                    </div>
                  </div>

                  <div class="custom-control custom-checkbox mb-2">
                    <input type="checkbox" class="custom-control-input" id="std_animal" value="animal"
                      v-model="form.standards">
                    <label class="custom-control-label" for="std_animal">มีการใช้สัตว์ทดลอง</label>
                  </div>

                  <div v-if="form.standards.includes('animal')" class="ml-5 p-2 border-left">
                    <div class="custom-control custom-checkbox mb-2">
                      <input type="checkbox" class="custom-control-input" id="animal_cert"
                        v-model="form.animalDetail.hasCert">
                      <label class="custom-control-label small"
                        for="animal_cert">มีหนังสือรับรองจรรยาบรรณสัตว์เพื่องานทางวิทยาศาสตร์ (แนบสำเนา 1 ชุด)</label>
                    </div>

                    <div class="custom-control custom-checkbox mb-2">
                      <input type="checkbox" class="custom-control-input" id="animal_pending"
                        v-model="form.animalDetail.isPending">
                      <label class="custom-control-label small" for="animal_pending">
                        ไม่มีหนังสือรับรองจรรยาบรรณสัตว์เพื่องานทางวิทยาศาสตร์
                        อยู่ระหว่างเสนอคณะกรรมการจรรยาบรรณสัตว์เพื่องานทางวิทยาศาสตร์
                      </label>
                    </div>

                    <div v-if="form.animalDetail.isPending" class="d-flex align-items-center mt-2 ml-4 flex-wrap"
                      style="gap: 10px;">
                      <span class="small">วันที่ยื่นโครงการ</span>
                      <CInput type="date" v-model="form.animalDetail.applyDate" size="sm" class="mb-0"
                        style="width: 150px;" />
                      <div class="custom-file-upload border p-1 rounded bg-light d-flex align-items-center">
                        <input type="file" @change="handleFileUpload($event, 'animal')" class="small">
                      </div>
                    </div>
                  </div>

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
        titleTH: "", titleEN: "", budgetType: "", budgets: [],
        cooperation: "ไม่มี", cooperationDetail: "", researchType: "",
        keywords: "", importance: "", objective: "", literature: "",
        reference: "", methodology: "", scope: "", progressReport: "",
        expectedResults: [], integration: "", transferLevel: "ไม่มี",
        ethics: { human: false, animal: false }, remark: "",
        selectedOutcomes: [], standards: [], // เก็บค่า 'none', 'human', 'animal'
        humanDetail: {
          hasCert: false,
          isPending: false,
          applyDate: '',
          file: null
        },
        animalDetail: {
          hasCert: false,
          isPending: false,
          applyDate: '',
          file: null
        },
        researchers: {
          mainResearcher: { name: "", affiliation: "", phone: "", email: "", code: "" },
          coResearchers: [],
          advisors: []
        }
      },

    };
  },
  watch: {
    // เมื่อเปลี่ยนประเภททุน ให้ล้างค่าที่เคยเลือกไว้ในข้อ 14 เพื่อป้องกันข้อมูลปนกัน
    'form.budgetType': function () {
      this.form.selectedOutcomes = [];
    },

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

    submit() { console.log(this.form); alert("บันทึกสำเร็จ"); },
    exportPDF() {
      const element = document.body;
      html2pdf().from(element).save("Research_Form.pdf");
    },
    handleFileUpload(event, type) {
      const file = event.target.files[0];
      if (type === 'human') {
        this.form.humanDetail.file = file;
      } else {
        this.form.animalDetail.file = file;
      }
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