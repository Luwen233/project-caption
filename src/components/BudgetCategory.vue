<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>{{ title }}</strong>

      <div class="float-right d-flex">
        <CSelect
          :options="options"
          @change="addRow($event.target.value)"
          class="mr-2"
        />

        <CButton size="sm" color="primary">
          แนบไฟล์
        </CButton>
      </div>
    </CCardHeader>

    <CCardBody>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>ชื่อรายการ</th>
            <th>รายละเอียดตัวคูณ</th>
            <th>งบรวม</th>
            <th>งวด 1</th>
            <th>งวด 2</th>
            <th>งวด 3</th>
            <th width="60"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(r, i) in value" :key="i">
            <td>
              <input v-model="r.name" class="form-control">
            </td>

            <td>
              <input v-model="r.multiplier" class="form-control">
            </td>

            <td>
              <input type="number" v-model.number="r.total" class="form-control">
            </td>

            <td>
              <input type="number" v-model.number="r.p1" class="form-control">
            </td>

            <td>
              <input type="number" v-model.number="r.p2" class="form-control">
            </td>

            <td>
              <input type="number" v-model.number="r.p3" class="form-control">
            </td>

            <td>
              <CButton size="sm" color="danger" @click="removeRow(i)">
                ลบ
              </CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: "BudgetCategory",

  props: {
    title: String,
    options: Array,
    value: Array
  },

  methods: {
    addRow(selected) {
      if (!selected) return

      const newRow = {
        name: selected,
        multiplier: "",
        total: 0,
        p1: 0,
        p2: 0,
        p3: 0,
        file: null
      }

      this.$emit("input", [...this.value, newRow])
    },

    removeRow(i) {
      const copy = [...this.value]
      copy.splice(i, 1)
      this.$emit("input", copy)
    }
  }
}
</script>
