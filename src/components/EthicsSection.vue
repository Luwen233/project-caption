<template>
  <CCard class="shadow-sm w-100 mb-4 border-0">
    <CCardHeader class="bg-primary text-white py-3">
      <h5 class="m-0 font-weight-bold">
        <CIcon name="cil-check-circle" class="mr-2" /> 18) มาตรฐานการวิจัย *
      </h5>
    </CCardHeader>
    
    <CCardBody class="p-4 bg-white">
      <div class="bg-light p-4 rounded border shadow-sm w-100 border-left-primary">
        <div class="ml-3">
          
          <div class="custom-control custom-checkbox mb-4">
            <input 
              type="checkbox" 
              class="custom-control-input" 
              id="std_none" 
              value="none"
              :checked="form.standards.includes('none')"
              @change="handleStandardChange('none')"
            >
            <label class="custom-control-label font-weight-bold text-dark" for="std_none" style="font-size: 16px; cursor: pointer;">
              ไม่มีการทำวิจัยในมนุษย์ / ไม่มีการใช้สัตว์ทดลอง / การวิจัยที่เกี่ยวข้องกับการงานด้านเทคโนโลยีชีวภาพสมัยใหม่
            </label>
          </div>

          <hr class="my-4 border-dashed">

          <div class="custom-control custom-checkbox mb-2">
            <input 
              type="checkbox" 
              class="custom-control-input" 
              id="std_human" 
              value="human"
              :checked="form.standards.includes('human')"
              @change="handleStandardChange('human')"
            >
            <label class="custom-control-label font-weight-bold text-primary" for="std_human" style="font-size: 17px; cursor: pointer;">
              มีการทำวิจัยในมนุษย์
            </label>
          </div>

          <div v-if="form.standards.includes('human')" class="ml-4 mb-4 p-4 border-left bg-white rounded shadow-none">
            <div class="custom-control custom-checkbox mb-3">
              <input 
                type="checkbox" 
                class="custom-control-input" 
                id="h_cert"
                :checked="form.humanDetail.hasCert"
                @change="updateNested('humanDetail', 'hasCert', $event.target.checked)"
              >
              <label class="custom-control-label text-dark" for="h_cert" style="font-size: 16px; cursor: pointer;">
                มีหนังสือรับรองจริยธรรมการวิจัยในมนุษย์ (แนบสำเนา 1 ชุด)
              </label>
            </div>

            <div class="custom-control custom-checkbox mb-3">
              <input 
                type="checkbox" 
                class="custom-control-input" 
                id="h_pending"
                :checked="form.humanDetail.isPending"
                @change="updateNested('humanDetail', 'isPending', $event.target.checked)"
              >
              <label class="custom-control-label text-dark" for="h_pending" style="font-size: 16px; line-height: 1.5; cursor: pointer;">
                ไม่มีหนังสือรับรองจริยธรรมฯ อยู่ระหว่างเสนอคณะกรรมการจริยธรรมการวิจัยในมนุษย์พิจารณา
              </label>
            </div>

            <div v-if="form.humanDetail.isPending" class="d-flex align-items-center mt-3 ml-4 flex-wrap bg-light p-3 rounded border" style="gap: 15px;">
              <span class="font-weight-bold text-dark" style="font-size: 15px;">วันที่ยื่นโครงการ:</span>
              <input 
                type="date" 
                :value="form.humanDetail.applyDate" 
                @input="updateNested('humanDetail', 'applyDate', $event.target.value)"
                class="form-control form-control-sm w-auto" 
                style="height: 35px;"
              >
              <div class="custom-file-input-wrapper">
                <input type="file" @change="$emit('file-upload', $event, 'human')" class="form-control-file border p-1 rounded bg-white">
              </div>
            </div>
          </div>

          <div class="custom-control custom-checkbox mb-2">
            <input 
              type="checkbox" 
              class="custom-control-input" 
              id="std_animal" 
              value="animal"
              :checked="form.standards.includes('animal')"
              @change="handleStandardChange('animal')"
            >
            <label class="custom-control-label font-weight-bold text-primary" for="std_animal" style="font-size: 17px; cursor: pointer;">
              มีการใช้สัตว์ทดลอง
            </label>
          </div>

          <div v-if="form.standards.includes('animal')" class="ml-4 p-4 border-left bg-white rounded shadow-none">
            <div class="custom-control custom-checkbox mb-3">
              <input 
                type="checkbox" 
                class="custom-control-input" 
                id="animal_cert"
                :checked="form.animalDetail.hasCert"
                @change="updateNested('animalDetail', 'hasCert', $event.target.checked)"
              >
              <label class="custom-control-label text-dark" for="animal_cert" style="font-size: 16px; cursor: pointer;">
                มีหนังสือรับรองจรรยาบรรณสัตว์เพื่องานทางวิทยาศาสตร์ (แนบสำเนา 1 ชุด)
              </label>
            </div>

            <div class="custom-control custom-checkbox mb-3">
              <input 
                type="checkbox" 
                class="custom-control-input" 
                id="animal_pending"
                :checked="form.animalDetail.isPending"
                @change="updateNested('animalDetail', 'isPending', $event.target.checked)"
              >
              <label class="custom-control-label text-dark" for="animal_pending" style="font-size: 16px; line-height: 1.5; cursor: pointer;">
                ไม่มีหนังสือรับรองจรรยาบรรณสัตว์ฯ อยู่ระหว่างเสนอคณะกรรมการจรรยาบรรณสัตว์ฯ พิจารณา
              </label>
            </div>

            <div v-if="form.animalDetail.isPending" class="d-flex align-items-center mt-3 ml-4 flex-wrap bg-light p-3 rounded border" style="gap: 15px;">
              <span class="font-weight-bold text-dark" style="font-size: 15px;">วันที่ยื่นโครงการ:</span>
              <input 
                type="date" 
                :value="form.animalDetail.applyDate" 
                @input="updateNested('animalDetail', 'applyDate', $event.target.value)"
                class="form-control form-control-sm w-auto" 
                style="height: 35px;"
              >
              <div class="custom-file-input-wrapper">
                <input type="file" @change="$emit('file-upload', $event, 'animal')" class="form-control-file border p-1 rounded bg-white">
              </div>
            </div>
          </div>
        </div>
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'EthicsSection',
  props: {
    form: { type: Object, required: true }
  },
  methods: {
    // ฟังก์ชันส่งค่ากลับไปอัปเดตที่คอมโพเนนต์แม่
    updateField(key, value) {
      this.$emit('update:form', { ...this.form, [key]: value });
    },
    
    // จัดการการเลือกมาตรฐานหลัก (18.1 - 18.3)
    handleStandardChange(val) {
      let list = [...this.form.standards];
      const index = list.indexOf(val);
      if (index > -1) {
        list.splice(index, 1);
      } else {
        // กฎ: ถ้าเลือก 'none' ให้เอาอย่างอื่นออก / ถ้าเลือกอย่างอื่นให้เอา 'none' ออก
        if (val === 'none') {
          list = ['none'];
        } else {
          const noneIdx = list.indexOf('none');
          if (noneIdx > -1) list.splice(noneIdx, 1);
          list.push(val);
        }
      }
      this.updateField('standards', list);
    },

    // อัปเดตข้อมูลภายในออบเจ็กต์ย่อย (เช่น humanDetail)
    updateNested(parentKey, childKey, value) {
      const updatedNested = { ...this.form[parentKey], [childKey]: value };
      this.updateField(parentKey, updatedNested);
    }
  }
}
</script>

<style scoped>
.border-left-primary { border-left: 6px solid #321fdb !important; }
.border-left { border-left: 3px dashed #ced4da !important; }
.border-dashed { border-top: 1px dashed #ced4da; }
</style>