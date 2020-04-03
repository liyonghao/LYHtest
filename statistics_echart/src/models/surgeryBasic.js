const property = {
  BMI: '', // BMI
  tb: '', //  体表面积
  tbTo: '', //  体表面积
  SurType: '',  //  手术类型
  SurStartDateTime: '',    // 手术时间
  SurStartDateTimeTo: '',    // 手术时间
  ageTemp: '', // 年龄开始
  ageTempTo: ''// 年龄结束
}
const SurgeryBasic = function () {
  Object.assign(this, property)
}
export default SurgeryBasic
