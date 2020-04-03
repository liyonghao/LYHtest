const property = {
  LeftTrunkBalloon: '', // 左主干球囊数
  LeftTrunkBalloonTo: '', // 左主干球囊数结束
  LeftMainSupport: '', //  左主干支架数
  LeftMainSupportTo: '', //  左主干支架数结束
  AnteriorDescendingBalloon: '',  //  前降支球囊数
  AnteriorDescendingBalloonTo: '',  //  前降支球囊数结束
  AnteriorDescendingSupport: '',    // 前降支支架数
  AnteriorDescendingSupportTo: '',    // 前降支支架数结束
  CyclotronBalloon: '', // 回旋支球囊数
  CyclotronBalloonTo: '', // 回旋支球囊数结束
  CyclotronSupport: '', // 回旋支支架数
  CyclotronSupportTo: '', // 回旋支支架数结束
  RightCoronaryBalloon: '',    // 右冠球囊数
  RightCoronaryBalloonTo: '',    // 右冠球囊数结束
  RightCoronarySupport: '', // 右冠支架数
  RightCoronarySupportTo: '' // 右冠支架数结束
}
const SurgeryResult = function () {
  Object.assign(this, property)
}
export default SurgeryResult
