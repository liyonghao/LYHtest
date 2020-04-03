const property = {
  // ------手术基本信息
  BMI: '', // BMI
  tb: '', //  体表面积
  tbTo: '', //  体表面积
  SurType: '',  //  手术类型
  SurStartDateTime: '',    // 手术时间
  SurStartDateTimeTo: '',    // 手术时间
  ageTemp: '', // 年龄开始
  ageTempTo: '', // 年龄结束
  // ------造影信息
  GMType: '', // 供血优势
  LCAFaYu: '', //  左冠状动脉发育
  RCAFaYu: '',  //  右冠状动脉发育
  Jiwangzhijiaying: '',    // 支架影位置
  BridgeVascular: '', // 桥血管
  RadioGraphicResult: '', // 造影结论
  // ------病变信息
  MainLocationFrom:[], // 血管位置
  Quanbise: '', // 是否闭塞
  XiazhailvFrom: '', //  狭窄率开始
  XiazhailvTo: '', //  狭窄率结束
  FenzhiName: '',  //  分支血管名
  Zhijianeizaixiazhai: '', // 支架内在狭窄
  lesionsType: '', // 病变类型
  BiseTime: '', // 闭塞时间
  Bisehounixiangxueliu: '', // 闭塞之后逆向血管
  LengthFanwei: '', // 长度范围
  Xueshuan: '', // 血栓
  Qianxiangxueliu: '', // 前向血流
  Gaihua: '', // 钙化
  Shuangfencha: '', // 分叉病变分型
  Sanfenchabingbian: '', // 三叉病变节段
  LocationFrom: '', // 闭塞起始血管段
  Dunxingcanduan: '', // 钝型残端
  Qiaoxueguan: '', // 血管桥(病变中)
  canzhaoxueguanzhijing: '', // 参照血管直径开始
  canzhaoxueguanzhijingTo: '', // 参照血管直径结束
  bingbianchangdu: '', // 病变长度开始
  bingbianchangduTo: '', // 病变长度结束
  shuqianminguanqiangzhijing: '', // 术前最小官腔直径开始
  shuqianminguanqiangzhijingTo: '', // 术前最小官腔直径结束
  xiazhaichengdu: '', // 狭窄程度开始
  xiazhaichengduTo: '', // 狭窄程度结束
  Qcaxuaguanzhijing: '', // 术前参照血管直径开始
  QcaxuaguanzhijingTo: '', // 术前参照血管直径结束
  Qcabingbianchangdu: '', // 术前病变长度开始
  QcabingbianchangduTo: '', // 术前病变长度结束
  Qcaxiazhai: '', // 术前狭窄程度开始
  QcaxiazhaiTo: '', // 术前狭窄程度结束
  Qcaminzhijing: '', // QCA术前最小官腔直径开始
  QcaminzhijingTo: '', // QCA术前最小官腔直径结束
  Qcaafterxiazhaichengdu: '', // 球囊预处理后狭窄程度开始
  QcaafterxiazhaichengduTo: '', // 球囊预处理后狭窄程度结束
  Qcaafterminzhijing: '', // 球囊预处理后最小官腔直径开始
  QcaafterminzhijingTo: '', // 球囊预处理后最小官腔直径结束
  Chulijishu: '', // 处理技术
  NoFenchaType: '', // 有无分叉病变（数据库填了就是没有分叉）
  // ------手术结果
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
  RightCoronarySupportTo: '', // 右冠支架数结束
  // ------器材信息
  ProductName: '', // 器材名称
  ProductModel: '', //  型号
  ProductStyle: '',  //  规格
  LargeClass: '',    // 大类别
  SmallClass: '', // 小类别
  providername: '' // 厂家
}
const SelectVo = function () {
  Object.assign(this, property)
}
export default SelectVo
