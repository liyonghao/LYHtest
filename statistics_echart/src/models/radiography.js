const property = {
  GMType: '', // 供血优势
  LCAFaYu: '', //  左冠状动脉发育
  RCAFaYu: '',  //  右冠状动脉发育
  Jiwangzhijiaying: '',    // 支架影位置
  BridgeVascular: '', // 桥血管
  RadioGraphicResult: ''// 造影结论
}
const Radiography = function () {
  Object.assign(this, property)
}
export default Radiography
