const property = {
  ProductName: '', // 器材名称
  ProductModel: '', //  型号
  ProductStyle: '',  //  规格
  LargeClass: '',    // 大类别
  SmallClass: '', // 小类别
  providername: '' // 厂家
}
const Equipment = function () {
  Object.assign(this, property)
}
export default Equipment
