const property = {
// ------手术基本信息
  BMI: true, // BMI
  tb: true, //  体表面积
  tbTo: true, //  体表面积
  SurType: true,  //  手术类型
  SurStartDateTime: true,    // 手术时间
  SurStartDateTimeTo: true,    // 手术时间
  ageTemp: true, // 年龄开始
  ageTempTo: true, // 年龄结束
  // ------造影信息
  GMType: true, // 供血优势
  LCAFaYu: true, //  左冠状动脉发育
  RCAFaYu: true,  //  右冠状动脉发育
  Jiwangzhijiaying: true,    // 支架影位置
  BridgeVascular: true, // 桥血管
  RadioGraphicResult: true, // 造影结论
  // ------病变信息
  MainLocationFrom: true, // 血管位置
  Quanbise: true, // 是否闭塞
  XiazhailvFrom: true, //  狭窄率开始
  XiazhailvTo: true, //  狭窄率结束
  FenzhiName: true,  //  分支血管名
  Zhijianeizaixiazhai: true, // 支架内在狭窄
  lesionsType: true, // 病变类型
  BiseTime: true, // 闭塞时间
  Bisehounixiangxueliu: true, // 闭塞之后逆向血管
  LengthFanwei: true, // 长度范围
  Xueshuan: true, // 血栓
  Qianxiangxueliu: true, // 前向血流
  Gaihua: true, // 钙化
  Shuangfencha: true, // 分叉病变分型
  Sanfenchabingbian: true, // 三叉病变节段
  LocationFrom: true, // 闭塞起始血管段
  Dunxingcanduan: true, // 钝型残端
  Qiaoxueguan: true, // 血管桥(病变中)
  canzhaoxueguanzhijing: true, // 参照血管直径开始
  canzhaoxueguanzhijingTo: true, // 参照血管直径结束
  bingbianchangdu: true, // 病变长度开始
  bingbianchangduTo: true, // 病变长度结束
  shuqianminguanqiangzhijing: true, // 术前最小官腔直径开始
  shuqianminguanqiangzhijingTo: true, // 术前最小官腔直径结束
  xiazhaichengdu: true, // 狭窄程度开始
  xiazhaichengduTo: true, // 狭窄程度结束
  Qcaxuaguanzhijing: true, // 术前参照血管直径开始
  QcaxuaguanzhijingTo: true, // 术前参照血管直径结束
  Qcabingbianchangdu: true, // 术前病变长度开始
  QcabingbianchangduTo: true, // 术前病变长度结束
  Qcaxiazhai: true, // 术前狭窄程度开始
  QcaxiazhaiTo: true, // 术前狭窄程度结束
  Qcaminzhijing: true, // QCA术前最小官腔直径开始
  QcaminzhijingTo: true, // QCA术前最小官腔直径结束
  Qcaafterxiazhaichengdu: true, // 球囊预处理后狭窄程度开始
  QcaafterxiazhaichengduTo: true, // 球囊预处理后狭窄程度结束
  Qcaafterminzhijing: true, // 球囊预处理后最小官腔直径开始
  QcaafterminzhijingTo: true, // 球囊预处理后最小官腔直径结束
  Chulijishu: true, // 处理技术
  NoFenchaType: true, // 有无分叉病变（数据库填了就是没有分叉）
  // ------手术结果
  LeftTrunkBalloon: true, // 左主干球囊数
  LeftTrunkBalloonTo: true, // 左主干球囊数结束
  LeftMainSupport: true, //  左主干支架数
  LeftMainSupportTo: true, //  左主干支架数结束
  AnteriorDescendingBalloon: true,  //  前降支球囊数
  AnteriorDescendingBalloonTo: true,  //  前降支球囊数结束
  AnteriorDescendingSupport: true,    // 前降支支架数
  AnteriorDescendingSupportTo: true,    // 前降支支架数结束
  CyclotronBalloon: true, // 回旋支球囊数
  CyclotronBalloonTo: true, // 回旋支球囊数结束
  CyclotronSupport: true, // 回旋支支架数
  CyclotronSupportTo: true, // 回旋支支架数结束
  RightCoronaryBalloon: true,    // 右冠球囊数
  RightCoronaryBalloonTo: true,    // 右冠球囊数结束
  RightCoronarySupport: true, // 右冠支架数
  RightCoronarySupportTo: true, // 右冠支架数结束
  // ------器材信息
  ProductName: true, // 器材名称
  ProductModel: true, //  型号
  ProductStyle: true,  //  规格
  LargeClass: true,    // 大类别
  SmallClass: true, // 小类别
  providername: true // 厂家
}
const Disbaled = function () {
  Object.assign(this, property)
}
export default Disbaled
