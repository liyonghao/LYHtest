<template>
  <section>
    <div>
      <el-form inline size="mini" label-width="100px" label-position="right" :disabled="dsPage">
        <el-form-item label="BMI:" v-if="showInfoVo.BMI !==''">
          <el-select placeholder="请选择" clearable filterable style="width:110px" v-model="showInfoVo.BMI">
            <el-option
              label="<=18.4"
              value="<=18.4">
            </el-option>
            <el-option
              label="18.5-23.9"
              value="18.5-23.9">
            </el-option>
            <el-option
              label="24.0-27.9"
              value="24.0-27.9">
            </el-option>
            <el-option
              label=">=28.0"
              value=">=28.0">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="体表面积:" v-if="showInfoVo.tb !== 0">
          <el-input-number size="mini"  controls-position="right" style="width:110px"
                           v-model="showInfoVo.tb"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  controls-position="right" style="width:110px"
                           v-model="showInfoVo.tbTo"/>
        </el-form-item>
        <el-form-item label="手术类型:" v-if="showInfoVo.SurType.length > 0">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.SurType">
            <el-option v-for="item in dictionariesList.surType"
                       :key="item.dicKey"
                       :value="item.dicKey"
                       :label="item.dicValue"/>
          </el-select>
        </el-form-item>
        <el-form-item label="手术日期:" v-if="showInfoVo.SurStartDateTime !== ''">
          <el-date-picker type="date" size="mini" placeholder="开始时间" style="width:110px"
                          value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                          v-model="showInfoVo.SurStartDateTime">
          </el-date-picker>
          <span class="separator">至</span>
          <el-date-picker type="date" size="mini" placeholder="结束时间" style="width:110px"
                          value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                          v-model="showInfoVo.SurStartDateTimeTo">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手术时病人年龄:" v-if="showInfoVo.ageTemp !== 0">
          <el-input-number size="mini"  controls-position="right" style="width:110px"
                           v-model="showInfoVo.ageTemp"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  controls-position="right" style="width:110px"
                           v-model="showInfoVo.ageTempTo"/>
        </el-form-item>
        <el-form-item label="供血优势:" v-if="showInfoVo.GMType !==''">
          <el-select placeholder="请选择" clearable filterable style="width:110px"
                     v-model="showInfoVo.GMType">
            <el-option v-for="item in dictionariesList.GMType"
                       :key="item.dicKey"
                       :value="item.dicKey"
                       :label="item.dicValue"/>
          </el-select>
        </el-form-item>
        <el-form-item label="左冠状动脉发育:" v-if="showInfoVo.LCAFaYu !==''">
          <el-select placeholder="请选择" clearable filterable style="width:110px"
                     v-model="showInfoVo.LCAFaYu">
            <el-option v-for="item in dictionariesList.growth"
                       :key="item.dicKey"
                       :value="item.dicKey"
                       :label="item.dicValue"/>
          </el-select>
        </el-form-item>
        <el-form-item label="右冠状动脉发育:" v-if="showInfoVo.RCAFaYu !==''">
          <el-select placeholder="请选择" clearable filterable style="width:110px"
                     v-model="showInfoVo.RCAFaYu">
            <el-option v-for="item in dictionariesList.growth"
                       :key="item.dicKey"
                       :value="item.dicKey"
                       :label="item.dicValue"/>
          </el-select>
        </el-form-item>
        <el-form-item label="支架影位置:" v-if="showInfoVo.Jiwangzhijiaying.length > 0">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.Jiwangzhijiaying">
            <el-option v-for="item in dictionariesList.stentShadow"
                       :key="item"
                       :value="item"
                       :label="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="桥血管:" v-if="showInfoVo.BridgeVascular !==''">
          <el-select placeholder="请选择" clearable filterable style="width:110px"
                     v-model="showInfoVo.BridgeVascular">
            <el-option
              label="静脉桥"
              value="静脉桥">
            </el-option>
            <el-option
              label="动脉桥"
              value="动脉桥">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="造影结论:" v-if="showInfoVo.RadioGraphicResult.length > 0">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.RadioGraphicResult">
            <el-option
              label="左主干病变"
              value="左主干病变">
            </el-option>
            <el-option
              label="左主干+单支病变"
              value="左主干+单支病变">
            </el-option>
            <el-option
              label="左主干+双支病变"
              value="左主干+双支病变">
            </el-option>
            <el-option
              label="左主干+三支病变"
              value="左主干+三支病变">
            </el-option>
            <el-option
              label="单支病变"
              value="单支病变">
            </el-option>
            <el-option
              label="双支病变"
              value="双支病变">
            </el-option>
            <el-option
              label="三支病变"
              value="三支病变">
            </el-option>
            <el-option
              label="原支架内无狭窄"
              value="原支架内无狭窄">
            </el-option>
            <el-option
              label="冠状动脉粥样硬化"
              value="冠状动脉粥样硬化">
            </el-option>
            <el-option
              label="冠状动脉未见异常"
              value="冠状动脉未见异常">
            </el-option>
            <el-option
              label="主动脉夹层"
              value="主动脉夹层">
            </el-option>
          </el-select>
        </el-form-item>
        <!--病变信息-->
        <el-form-item label="血管位置:" v-if="showInfoVo.MainLocationFrom.length > 0 && disShowFrom.MainLocationFrom === false">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.MainLocationFrom">
            <el-option v-for="item in dictionariesList.MainLocationFrom"
                       :key="item"
                       :value="item"
                       :label="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否病塞:" v-if="showInfoVo.Quanbise !=='' && disShowFrom.Quanbise === false">
          <el-select placeholder="请选择" clearable filterable style="width:110px" v-model="showInfoVo.Quanbise">
            <el-option
              label="是"
              value="是">
            </el-option>
            <el-option
              label="否"
              value="否">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="狭窄率:" v-if="showInfoVo.XiazhailvFrom !==0 && disShowFrom.XiazhailvFrom === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right" v-model="showInfoVo.XiazhailvFrom"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.XiazhailvTo"/>
        </el-form-item>
        <el-form-item label="分支血管名称:" v-if="showInfoVo.FenzhiName !=='' && disShowFrom.FenzhiName === false">
          <el-select placeholder="请选择" clearable filterable style="width:110px" v-model="showInfoVo.FenzhiName">
            <el-option v-for="item in dictionariesList.branch"
                       :key="item"
                       :value="item"
                       :label="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="支架内在狭窄:" v-if="showInfoVo.Zhijianeizaixiazhai !=='' && disShowFrom.Zhijianeizaixiazhai === false">
          <el-select placeholder="请选择" clearable filterable style="width:110px"
                     v-model="showInfoVo.Zhijianeizaixiazhai">
            <el-option
              label="是"
              value="是">
            </el-option>
            <el-option
              label="否"
              value="是">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病变类型:" v-if="showInfoVo.lesionsType.length > 0 && disShowFrom.lesionsType === false">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.lesionsType">
            <el-option
              label="狭窄病变"
              value="狭窄病变">
            </el-option>
            <el-option
              label="瘤样扩张病变"
              value="瘤样扩张病变">
            </el-option>
            <el-option
              label="夹层病变"
              value="夹层病变">
            </el-option>
            <el-option
              label="官腔不规则病变"
              value="官腔不规则病变">
            </el-option>
            <el-option
              label="心肌桥"
              value="心肌桥">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="闭塞时间:" v-if="showInfoVo.BiseTime.length > 0 && disShowFrom.BiseTime === false">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.BiseTime">
            <el-option
              label="小于三个月"
              value="小于三个月">
            </el-option>
            <el-option
              label="大于三个月"
              value="大于三个月">
            </el-option>
            <el-option
              label="未知"
              value="未知">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="闭塞之后逆向血管:" v-if="showInfoVo.Bisehounixiangxueliu.length > 0 && disShowFrom.Bisehounixiangxueliu === false">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.Bisehounixiangxueliu">
            <el-option
              label="RCAo"
              value="RCAo">
            </el-option>
            <el-option
              label="RCAp"
              value="RCAp">
            </el-option>
            <el-option
              label="RCAm"
              value="RCAm">
            </el-option>
            <el-option
              label="RCAd"
              value="RCAd">
            </el-option>
            <el-option
              label="LMo"
              value="LMo">
            </el-option>
            <el-option
              label="LADo"
              value="LADo">
            </el-option>
            <el-option
              label="LADp"
              value="LADp">
            </el-option>
            <el-option
              label="LADm"
              value="LADm">
            </el-option>
            <el-option
              label="LADd"
              value="LADd">
            </el-option>
            <el-option
              label="LCXo"
              value="LCXo">
            </el-option>
            <el-option
              label="LCXp"
              value="LCXp">
            </el-option>
            <el-option
              label="LCXm"
              value="LCXm">
            </el-option>
            <el-option
              label="LCXd"
              value="LCXd">
            </el-option>
            <el-option
              label="AM1o"
              value="AM1o">
            </el-option>
            <el-option
              label="AM1p"
              value="AM1p">
            </el-option>
            <el-option
              label="AM1d"
              value="AM1d">
            </el-option>
            <el-option
              label="AM2o"
              value="AM2o">
            </el-option>
            <el-option
              label="AM2p"
              value="AM2p">
            </el-option>
            <el-option
              label="AM2d"
              value="AM2d">
            </el-option>
            <el-option
              label="AM3o"
              value="AM3o">
            </el-option>
            <el-option
              label="AM3p"
              value="AM3p">
            </el-option>
            <el-option
              label="AM3d"
              value="AM3d">
            </el-option>
            <el-option
              label="D1o"
              value="D1o">
            </el-option>
            <el-option
              label="D1p"
              value="D1p">
            </el-option>
            <el-option
              label="D1d"
              value="D1d">
            </el-option>
            <el-option
              label="D1a"
              value="D1a">
            </el-option>
            <el-option
              label="D2o"
              value="D2o">
            </el-option>
            <el-option
              label="D2p"
              value="D2p">
            </el-option>
            <el-option
              label="D2d"
              value="D2d">
            </el-option>
            <el-option
              label="D2a"
              value="D2a">
            </el-option>
            <el-option
              label="D3o"
              value="D3o">
            </el-option>
            <el-option
              label="D3p"
              value="D3p">
            </el-option>
            <el-option
              label="D3d"
              value="D3d">
            </el-option>
            <el-option
              label="D3a"
              value="D3a">
            </el-option>
            <el-option
              label="S1o"
              value="S1o">
            </el-option>
            <el-option
              label="S1p"
              value="S1p">
            </el-option>
            <el-option
              label="S1d"
              value="S1d">
            </el-option>
            <el-option
              label="S2o"
              value="S2o">
            </el-option>
            <el-option
              label="S2p"
              value="S2p">
            </el-option>
            <el-option
              label="S2d"
              value="S2d">
            </el-option>
            <el-option
              label="S3o"
              value="S3o">
            </el-option>
            <el-option
              label="S3p"
              value="S3p">
            </el-option>
            <el-option
              label="S3d"
              value="S3d">
            </el-option>
            <el-option
              label="S4o"
              value="S4o">
            </el-option>
            <el-option
              label="S4p"
              value="S4p">
            </el-option>
            <el-option
              label="S4d"
              value="S4d">
            </el-option>
            <el-option
              label="OM1o"
              value="OM1o">
            </el-option>
            <el-option
              label="OM1p"
              value="OM1p">
            </el-option>
            <el-option
              label="OM1d"
              value="OM1d">
            </el-option>
            <el-option
              label="OM1a"
              value="OM1a">
            </el-option>
            <el-option
              label="OM2o"
              value="OM2o">
            </el-option>
            <el-option
              label="OM2p"
              value="OM2p">
            </el-option>
            <el-option
              label="OM2d"
              value="OM2d">
            </el-option>
            <el-option
              label="OM2a"
              value="OM2a">
            </el-option>
            <el-option
              label="OM3o"
              value="OM3o">
            </el-option>
            <el-option
              label="OM3p"
              value="OM3p">
            </el-option>
            <el-option
              label="OM3d"
              value="OM3d">
            </el-option>
            <el-option
              label="OM3a"
              value="OM3a">
            </el-option>
            <el-option
              label="PDo"
              value="PDo">
            </el-option>
            <el-option
              label="PDp"
              value="PDp">
            </el-option>
            <el-option
              label="PDd"
              value="PDd">
            </el-option>
            <el-option
              label="DSP"
              value="DSP">
            </el-option>
            <el-option
              label="PL1o"
              value="PL1o">
            </el-option>
            <el-option
              label="PL1p"
              value="PL1p">
            </el-option>
            <el-option
              label="PL1d"
              value="PL1d">
            </el-option>
            <el-option
              label="PL2o"
              value="PL2o">
            </el-option>
            <el-option
              label="PL2p"
              value="PL2p">
            </el-option>
            <el-option
              label="PL2d"
              value="PL2d">
            </el-option>
            <el-option
              label="PL3o"
              value="PL3o">
            </el-option>
            <el-option
              label="PL3p"
              value="PL3p">
            </el-option>
            <el-option
              label="PL3d"
              value="PL3d">
            </el-option>
            <el-option
              label="Ramuso"
              value="Ramuso">
            </el-option>
            <el-option
              label="Ramusp"
              value="Ramusp">
            </el-option>
            <el-option
              label="Ramusd"
              value="Ramusd">
            </el-option>
            <el-option
              label="Ra"
              value="Ra">
            </el-option>
            <el-option
              label="AV"
              value="AV">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="长度范围:" v-if="showInfoVo.LengthFanwei.length > 0 && disShowFrom.LengthFanwei === false">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.LengthFanwei">
            <el-option
              label="无"
              value="无">
            </el-option>
            <el-option
              label="局限"
              value="局限">
            </el-option>
            <el-option
              label="节段"
              value="节段">
            </el-option>
            <el-option
              label="弥漫"
              value="弥漫">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="血栓:" v-if="showInfoVo.Xueshuan !=='' && disShowFrom.Xueshuan === false">
          <el-select placeholder="请选择" clearable filterable style="width:110px" v-model="showInfoVo.Xueshuan">
            <el-option
              label="有"
              value="有">
            </el-option>
            <el-option
              label="无"
              value="无">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="前向血流:" v-if="showInfoVo.Qianxiangxueliu.length > 0 && disShowFrom.Qianxiangxueliu === false">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.Qianxiangxueliu">
            <el-option
              label="0级"
              value="0级">
            </el-option>
            <el-option
              label="I级"
              value="I级">
            </el-option>
            <el-option
              label="II级"
              value="II级">
            </el-option>
            <el-option
              label="III级"
              value="III级">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="钙化:" v-if="showInfoVo.Gaihua.length > 0 && disShowFrom.Gaihua === false">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.Gaihua">
            <el-option
              label="无"
              value="无">
            </el-option>
            <el-option
              label="轻度"
              value="轻度">
            </el-option>
            <el-option
              label="中度"
              value="中度">
            </el-option>
            <el-option
              label="重度"
              value="重度">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分叉病变分型:" v-if="showInfoVo.Shuangfencha.length > 0 && disShowFrom.Shuangfencha === false">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.Shuangfencha">
            <el-option
              label="0.0.1"
              value="0.0.1">
            </el-option>
            <el-option
              label="0.1.0"
              value="0.1.0">
            </el-option>
            <el-option
              label="0.1.1"
              value="0.1.1">
            </el-option>
            <el-option
              label="1.0.1"
              value="1.0.1">
            </el-option>
            <el-option
              label="1.1.0"
              value="1.1.0">
            </el-option>
            <el-option
              label="1.1.1"
              value="1.1.1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三叉病变节段:" v-if="showInfoVo.Sanfenchabingbian.length > 0 && disShowFrom.Sanfenchabingbian === false">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.Sanfenchabingbian">
            <el-option
              label="1个病变节段"
              value="1个病变节段">
            </el-option>
            <el-option
              label="2个病变节段"
              value="2个病变节段">
            </el-option>
            <el-option
              label="3个病变节段"
              value="3个病变节段">
            </el-option>
            <el-option
              label="4个病变节段"
              value="4个病变节段">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="闭塞起始血管段:" v-if="showInfoVo.LocationFrom.length > 0 && disShowFrom.LocationFrom === false">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.LocationFrom">
            <el-option
              label="RCAo"
              value="RCAo">
            </el-option>
            <el-option
              label="RCAp"
              value="RCAp">
            </el-option>
            <el-option
              label="RCAm"
              value="RCAm">
            </el-option>
            <el-option
              label="RCAd"
              value="RCAd">
            </el-option>
            <el-option
              label="LMo"
              value="LMo">
            </el-option>
            <el-option
              label="LADo"
              value="LADo">
            </el-option>
            <el-option
              label="LADp"
              value="LADp">
            </el-option>
            <el-option
              label="LADm"
              value="LADm">
            </el-option>
            <el-option
              label="LADd"
              value="LADd">
            </el-option>
            <el-option
              label="LCXo"
              value="LCXo">
            </el-option>
            <el-option
              label="LCXp"
              value="LCXp">
            </el-option>
            <el-option
              label="LCXm"
              value="LCXm">
            </el-option>
            <el-option
              label="LCXd"
              value="LCXd">
            </el-option>
            <el-option
              label="AM1o"
              value="AM1o">
            </el-option>
            <el-option
              label="AM1p"
              value="AM1p">
            </el-option>
            <el-option
              label="AM1d"
              value="AM1d">
            </el-option>
            <el-option
              label="AM2o"
              value="AM2o">
            </el-option>
            <el-option
              label="AM2p"
              value="AM2p">
            </el-option>
            <el-option
              label="AM2d"
              value="AM2d">
            </el-option>
            <el-option
              label="AM3o"
              value="AM3o">
            </el-option>
            <el-option
              label="AM3p"
              value="AM3p">
            </el-option>
            <el-option
              label="AM3d"
              value="AM3d">
            </el-option>
            <el-option
              label="D1o"
              value="D1o">
            </el-option>
            <el-option
              label="D1p"
              value="D1p">
            </el-option>
            <el-option
              label="D1d"
              value="D1d">
            </el-option>
            <el-option
              label="D1a"
              value="D1a">
            </el-option>
            <el-option
              label="D2o"
              value="D2o">
            </el-option>
            <el-option
              label="D2p"
              value="D2p">
            </el-option>
            <el-option
              label="D2d"
              value="D2d">
            </el-option>
            <el-option
              label="D2a"
              value="D2a">
            </el-option>
            <el-option
              label="D3o"
              value="D3o">
            </el-option>
            <el-option
              label="D3p"
              value="D3p">
            </el-option>
            <el-option
              label="D3d"
              value="D3d">
            </el-option>
            <el-option
              label="D3a"
              value="D3a">
            </el-option>
            <el-option
              label="S1o"
              value="S1o">
            </el-option>
            <el-option
              label="S1p"
              value="S1p">
            </el-option>
            <el-option
              label="S1d"
              value="S1d">
            </el-option>
            <el-option
              label="S2o"
              value="S2o">
            </el-option>
            <el-option
              label="S2p"
              value="S2p">
            </el-option>
            <el-option
              label="S2d"
              value="S2d">
            </el-option>
            <el-option
              label="S3o"
              value="S3o">
            </el-option>
            <el-option
              label="S3p"
              value="S3p">
            </el-option>
            <el-option
              label="S3d"
              value="S3d">
            </el-option>
            <el-option
              label="S4o"
              value="S4o">
            </el-option>
            <el-option
              label="S4p"
              value="S4p">
            </el-option>
            <el-option
              label="S4d"
              value="S4d">
            </el-option>
            <el-option
              label="OM1o"
              value="OM1o">
            </el-option>
            <el-option
              label="OM1p"
              value="OM1p">
            </el-option>
            <el-option
              label="OM1d"
              value="OM1d">
            </el-option>
            <el-option
              label="OM1a"
              value="OM1a">
            </el-option>
            <el-option
              label="OM2o"
              value="OM2o">
            </el-option>
            <el-option
              label="OM2p"
              value="OM2p">
            </el-option>
            <el-option
              label="OM2d"
              value="OM2d">
            </el-option>
            <el-option
              label="OM2a"
              value="OM2a">
            </el-option>
            <el-option
              label="OM3o"
              value="OM3o">
            </el-option>
            <el-option
              label="OM3p"
              value="OM3p">
            </el-option>
            <el-option
              label="OM3d"
              value="OM3d">
            </el-option>
            <el-option
              label="OM3a"
              value="OM3a">
            </el-option>
            <el-option
              label="PDo"
              value="PDo">
            </el-option>
            <el-option
              label="PDp"
              value="PDp">
            </el-option>
            <el-option
              label="PDd"
              value="PDd">
            </el-option>
            <el-option
              label="DSP"
              value="DSP">
            </el-option>
            <el-option
              label="PL1o"
              value="PL1o">
            </el-option>
            <el-option
              label="PL1p"
              value="PL1p">
            </el-option>
            <el-option
              label="PL1d"
              value="PL1d">
            </el-option>
            <el-option
              label="PL2o"
              value="PL2o">
            </el-option>
            <el-option
              label="PL2p"
              value="PL2p">
            </el-option>
            <el-option
              label="PL2d"
              value="PL2d">
            </el-option>
            <el-option
              label="PL3o"
              value="PL3o">
            </el-option>
            <el-option
              label="PL3p"
              value="PL3p">
            </el-option>
            <el-option
              label="PL3d"
              value="PL3d">
            </el-option>
            <el-option
              label="Ramuso"
              value="Ramuso">
            </el-option>
            <el-option
              label="Ramusp"
              value="Ramusp">
            </el-option>
            <el-option
              label="Ramusd"
              value="Ramusd">
            </el-option>
            <el-option
              label="Ra"
              value="Ra">
            </el-option>
            <el-option
              label="AV"
              value="AV">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="钝型残端:" v-if="showInfoVo.Dunxingcanduan !=='' && disShowFrom.Dunxingcanduan === false">
          <el-select placeholder="请选择" clearable filterable style="width:110px"
                     v-model="showInfoVo.Dunxingcanduan">
            <el-option
              label="有"
              value="有">
            </el-option>
            <el-option
              label="无"
              value="无">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="血管桥(病变中):" v-if="showInfoVo.Qiaoxueguan !=='' && disShowFrom.Qiaoxueguan === false">
          <el-select placeholder="请选择" clearable filterable style="width:110px"
                     v-model="showInfoVo.Qiaoxueguan">
            <el-option
              label="有"
              value="有">
            </el-option>
            <el-option
              label="无"
              value="无">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参照血管直径:" v-if="showInfoVo.canzhaoxueguanzhijing !==0 && disShowFrom.canzhaoxueguanzhijing === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right" v-model="showInfoVo.canzhaoxueguanzhijing"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.canzhaoxueguanzhijingTo"/>
        </el-form-item>
        <el-form-item label="病变长度:" v-if="showInfoVo.bingbianchangdu !==0 && disShowFrom.bingbianchangdu === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.bingbianchangdu"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.bingbianchangduTo"/>
        </el-form-item>
        <el-form-item label="术前最小官腔直径:" v-if="showInfoVo.shuqianminguanqiangzhijing !==0 && disShowFrom.shuqianminguanqiangzhijing === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.shuqianminguanqiangzhijing"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.shuqianminguanqiangzhijingTo"/>
        </el-form-item>
        <el-form-item label="狭窄程度:" v-if="showInfoVo.xiazhaichengdu !==0 && disShowFrom.xiazhaichengdu === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.xiazhaichengdu"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.xiazhaichengduTo"/>
        </el-form-item>
        <el-form-item label="术前参照血管直径:" v-if="showInfoVo.Qcaxuaguanzhijing !==0 && disShowFrom.Qcaxuaguanzhijing === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.Qcaxuaguanzhijing"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.QcaxuaguanzhijingTo"/>
        </el-form-item>
        <el-form-item label="术前病变长度:" v-if="showInfoVo.Qcabingbianchangdu !==0 && disShowFrom.Qcabingbianchangdu === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.Qcabingbianchangdu"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.QcabingbianchangduTo"/>
        </el-form-item>
        <el-form-item label="术前狭窄程度:" v-if="showInfoVo.Qcaxiazhai !==0 && disShowFrom.Qcaxiazhai === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.Qcaxiazhai"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.QcaxiazhaiTo"/>
        </el-form-item>
        <el-form-item label="QCA术前最小官腔直径:" v-if="showInfoVo.Qcaminzhijing !==0 && disShowFrom.Qcaminzhijing === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.Qcaminzhijing"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.QcaminzhijingTo"/>
        </el-form-item>
        <el-form-item label="球囊预处理后狭窄程度:" v-if="showInfoVo.Qcaafterxiazhaichengdu !==0 && disShowFrom.Qcaafterxiazhaichengdu === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.Qcaafterxiazhaichengdu"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.QcaafterxiazhaichengduTo"/>
        </el-form-item>
        <el-form-item label="球囊预处理后最小官腔直径:" v-if="showInfoVo.Qcaafterminzhijing !==0 && disShowFrom.Qcaafterminzhijing === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.Qcaafterminzhijing"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.QcaafterminzhijingTo"/>
        </el-form-item>
        <el-form-item label="处理技术:" v-if="showInfoVo.Chulijishu.length > 0 && disShowFrom.Chulijishu === false">
          <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                     v-model="showInfoVo.Chulijishu">
            <el-option v-for="item in dictionariesList.processing"
                       :key="item"
                       :value="item"
                       :label="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="有无分叉病变:" v-if="showInfoVo.NoFenchaType !=='' && disShowFrom.NoFenchaType === false">
          <el-select placeholder="请选择" clearable filterable style="width:110px"
                     v-model="showInfoVo.NoFenchaType">
            <el-option
              label="有"
              value="有">
            </el-option>
            <el-option
              label="无"
              value="无">
            </el-option>
          </el-select>
        </el-form-item>
        <!-------------------------手术信息------------------------->
        <el-form-item label="左主干球囊数:" v-if="showInfoVo.LeftTrunkBalloon !==0 && disShowFrom.LeftTrunkBalloon === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.LeftTrunkBalloon"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.LeftTrunkBalloonTo"/>
        </el-form-item>
        <el-form-item label="左主干支架数:" v-if="showInfoVo.LeftMainSupport !==0 && disShowFrom.LeftMainSupport === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.LeftMainSupport"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.LeftMainSupportTo"/>
        </el-form-item>
        <el-form-item label="前降支球囊数:" v-if="showInfoVo.AnteriorDescendingBalloon !==0 && disShowFrom.AnteriorDescendingBalloon === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.AnteriorDescendingBalloon"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.AnteriorDescendingBalloonTo"/>
        </el-form-item>
        <el-form-item label="前降支支架数:" v-if="showInfoVo.AnteriorDescendingSupport !==0 && disShowFrom.AnteriorDescendingSupport === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.AnteriorDescendingSupport"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.AnteriorDescendingSupportTo"/>
        </el-form-item>
        <el-form-item label="回旋支球囊数:" v-if="showInfoVo.CyclotronBalloon !==0 && disShowFrom.CyclotronBalloon === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.CyclotronBalloon"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.CyclotronBalloonTo"/>
        </el-form-item>
        <el-form-item label="回旋支支架数:" v-if="showInfoVo.CyclotronSupport !==0 && disShowFrom.CyclotronSupport === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.CyclotronSupport"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.CyclotronSupportTo"/>
        </el-form-item>
        <el-form-item label="右冠球囊数:" v-if="showInfoVo.RightCoronaryBalloon !==0 && disShowFrom.RightCoronaryBalloon === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.RightCoronaryBalloon"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.RightCoronaryBalloonTo"/>
        </el-form-item>
        <el-form-item label="右冠支架数:" v-if="showInfoVo.RightCoronarySupport !==0 && disShowFrom.RightCoronarySupport === false">
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.RightCoronarySupport"/>
          <span class="separator">至</span>
          <el-input-number size="mini"  style="width:110px" controls-position="right"
                           v-model="showInfoVo.RightCoronarySupportTo"/>
        </el-form-item>
        <!---------------器材名称------------>
        <el-form-item label="器材名称:" v-if="showInfoVo.ProductName !=='' && disShowFrom.ProductName === false">
          <el-input placeholder="请输入内容" clearable v-model="showInfoVo.ProductName"
                    style="width:110px"/>
        </el-form-item>
        <el-form-item label="规格:" v-if="showInfoVo.ProductModel !=='' && disShowFrom.ProductModel === false">
          <el-input placeholder="请输入内容" clearable v-model="showInfoVo.ProductModel"
                    style="width:110px"/>
        </el-form-item>
        <el-form-item label="型号:" v-if="showInfoVo.ProductStyle !=='' && disShowFrom.ProductStyle === false">
          <el-input placeholder="请输入内容" clearable v-model="showInfoVo.ProductStyle"
                    style="width:110px"/>
        </el-form-item>
        <el-form-item label="大类名称:" v-if="showInfoVo.LargeClass.length > 0 && disShowFrom.LargeClass === false">
          <el-select placeholder="请选择" clearable filterable multiple v-model="showInfoVo.LargeClass"
                     style="width:110px">
            <el-option v-for="item in dictionariesList.largeClass"
                       :key="item.classcode"
                       :value="item.classcode"
                       :label="item.classname"/>
          </el-select>
        </el-form-item>
        <el-form-item label="小类名称:" v-if="showInfoVo.SmallClass.length > 0 && disShowFrom.SmallClass === false">
          <el-select placeholder="请选择" clearable filterable multiple v-model="showInfoVo.SmallClass"
                     style="width:110px">
            <el-option v-for="item in SmallClassInfo"
                       :key="item.classcode"
                       :value="item.classcode"
                       :label="item.classname"/>
          </el-select>
        </el-form-item>
        <el-form-item label="厂家品牌:" v-if="showInfoVo.providername.length > 0 && disShowFrom.providername === false">
          <el-select placeholder="请选择" clearable filterable multiple v-model="showInfoVo.providername"
                     style="width:110px">
            <el-option v-for="item in dictionariesList.provider"
                       :key="item.providercode"
                       :value="item.providercode"
                       :label="item.providername"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
  // import showInfoVo from '../../models/disabled'
  // import Api from "../../api"

  export default {
    props:['dictionariesList', 'showInfoVo', 'SmallClassInfo', 'tabList', 'disShowFrom'],
    data () {
      return {
        dsPage: true,
        showInfo: 1
        // showInfoVo: new (), // 禁用
      }
    },
    methods: {
      // disShowFn () {
      //   // if (this.showInfoVo.BMI !== '') {
      //   //   // BMI
      //   //   this.showInfoVo.BMI = true
      //   // }
      //   if (this.showInfoVo.tb !== '') {
      //     // 体表面积
      //     this.showInfoVo.tb = true
      //   }
      //   if (this.showInfoVo.SurType.length > 0) {
      //     // 手术类型
      //     this.showInfoVo.SurType = true
      //   }
      //   if (this.showInfoVo.SurStartDateTime !== '') {
      //     // 手术日期开始
      //     this.showInfoVo.SurStartDateTime = true
      //   }
      //   if (this.showInfoVo.ageTemp !== '') {
      //     // 年龄开始
      //     this.showInfoVo.ageTemp = true
      //   }
      //   // ---------造影信息-------------
      //   if (this.showInfoVo.GMType !== '') {
      //     // 供血优势
      //     this.showInfoVo.GMType = true
      //   }
      //   if (this.showInfoVo.LCAFaYu !== '') {
      //     // 左冠状动脉发育
      //     this.showInfoVo.LCAFaYu = true
      //   }
      //   if (this.showInfoVo.RCAFaYu !== '') {
      //     // 右冠状动脉发育
      //     this.showInfoVo.RCAFaYu = true
      //   }
      //   if (this.showInfoVo.Jiwangzhijiaying.length > 0) {
      //     // 支架影位置
      //     this.showInfoVo.Jiwangzhijiaying = true
      //   }
      //   if (this.showInfoVo.BridgeVascular !== '') {
      //     // 桥血管
      //     this.showInfoVo.BridgeVascular = true
      //   }
      //   if (this.showInfoVo.RadioGraphicResult.length > 0) {
      //     // 造影结论
      //     this.showInfoVo.RadioGraphicResult = true
      //   }
      //   // ---------病变信息---------
      //   if (this.showInfoVo.MainLocationFrom.length > 0) {
      //     // 血管位置
      //     this.showInfoVo.MainLocationFrom = true
      //   }
      //   if (this.showInfoVo.Quanbise !== '') {
      //     //  是否闭塞
      //     this.showInfoVo.Quanbise = true
      //   }
      //   if (this.showInfoVo.XiazhailvFrom !== '') {
      //     //  狭窄率
      //     this.showInfoVo.XiazhailvFrom = true
      //   }
      //   if (this.showInfoVo.FenzhiName !== '') {
      //     // 分支血管名称
      //     this.showInfoVo.FenzhiName = true
      //   }
      //   if (this.showInfoVo.Zhijianeizaixiazhai !== '') {
      //     // 支架内在狭窄
      //     this.showInfoVo.Zhijianeizaixiazhai = true
      //   }
      //   if (this.showInfoVo.lesionsType.length > 0) {
      //     // 病变类型
      //     this.showInfoVo.lesionsType = true
      //   }
      //   if (this.showInfoVo.BiseTime.length > 0) {
      //     // 闭塞时间
      //     this.showInfoVo.BiseTime = true
      //   }
      //   if (this.showInfoVo.Bisehounixiangxueliu.length > 0) {
      //     // 闭塞之后逆向血管
      //     this.showInfoVo.Bisehounixiangxueliu = true
      //   }
      //   if (this.showInfoVo.LengthFanwei.length > 0) {
      //     // 长度范围
      //     this.showInfoVo.LengthFanwei = true
      //   }
      //   if (this.showInfoVo.Xueshuan !== '') {
      //     // 血栓
      //     this.showInfoVo.Xueshuan = true
      //   }
      //   if (this.showInfoVo.Qianxiangxueliu.length > 0) {
      //     // 前向血流
      //     this.showInfoVo.Qianxiangxueliu = true
      //   }
      //   if (this.showInfoVo.Gaihua.length > 0) {
      //     // 钙化
      //     this.showInfoVo.Gaihua = true
      //   }
      //   if (this.showInfoVo.Shuangfencha.length > 0) {
      //     // 分叉病变分型
      //     this.showInfoVo.Shuangfencha = true
      //   }
      //   if (this.showInfoVo.Sanfenchabingbian.length > 0) {
      //     // 三叉病变节段
      //     this.showInfoVo.Sanfenchabingbian = true
      //   }
      //   if (this.showInfoVo.LocationFrom.length > 0) {
      //     // 闭塞起始血管段
      //     this.showInfoVo.LocationFrom = true
      //   }
      //   if (this.showInfoVo.Dunxingcanduan !== '') {
      //     // 钝型残端
      //     this.showInfoVo.Dunxingcanduan = true
      //   }
      //   if (this.showInfoVo.Qiaoxueguan !== '') {
      //     // 血管桥(病变中)
      //     this.showInfoVo.Qiaoxueguan = true
      //   }
      //   if (this.showInfoVo.canzhaoxueguanzhijing !== '') {
      //     //  参照血管直径开始
      //     this.showInfoVo.canzhaoxueguanzhijing = true
      //   }
      //   if (this.showInfoVo.bingbianchangdu !== '') {
      //     //  病变长度开始
      //     this.showInfoVo.bingbianchangdu = true
      //   }
      //   if (this.showInfoVo.shuqianminguanqiangzhijing !== '') {
      //     //  术前最小官腔直径开始
      //     this.showInfoVo.shuqianminguanqiangzhijing = true
      //   }
      //   if (this.showInfoVo.xiazhaichengdu !== '') {
      //     //  狭窄程度开始
      //     this.showInfoVo.xiazhaichengdu = true
      //   }
      //   if (this.showInfoVo.Qcaxuaguanzhijing !== '') {
      //     //  术前参照血管直径开始
      //     this.showInfoVo.Qcaxuaguanzhijing = true
      //   }
      //   if (this.showInfoVo.Qcabingbianchangdu !== '') {
      //     //  术前病变长度开始
      //     this.showInfoVo.Qcabingbianchangdu = true
      //   }
      //   if (this.showInfoVo.Qcaxiazhai !== '') {
      //     //  术前狭窄程度开始
      //     this.showInfoVo.Qcaxiazhai = true
      //   }
      //   if (this.showInfoVo.Qcaminzhijing !== '') {
      //     //  QCA术前最小官腔直径开始
      //     this.showInfoVo.Qcaminzhijing = true
      //   }
      //   if (this.showInfoVo.Qcaafterxiazhaichengdu !== '') {
      //     //  球囊预处理后狭窄程度开始
      //     this.showInfoVo.Qcaafterxiazhaichengdu = true
      //   }
      //   if (this.showInfoVo.Qcaafterminzhijing !== '') {
      //     //  球囊预处理后最小官腔直径开始
      //     this.showInfoVo.Qcaafterminzhijing = true
      //   }
      //   if (this.showInfoVo.Chulijishu.length > 0) {
      //     //  处理技术
      //     this.showInfoVo.Chulijishu = true
      //   }
      //   if (this.showInfoVo.NoFenchaType !== '') {
      //     //  有无分叉病变（数据库填了就是没有分叉
      //     this.showInfoVo.NoFenchaType = true
      //   }
      //   // ---------手术结果---------
      //   if (this.showInfoVo.LeftTrunkBalloon !== 0) {
      //     //  左主干球囊数开始
      //     this.showInfoVo.LeftTrunkBalloon = true
      //   }
      //   if (this.showInfoVo.LeftMainSupport !== '') {
      //     //  左主干支架数开始
      //     this.showInfoVo.LeftMainSupport = true
      //   }
      //   if (this.showInfoVo.AnteriorDescendingBalloon !== '') {
      //     //  前降支球囊数开始
      //     this.showInfoVo.AnteriorDescendingBalloon = true
      //   }
      //   if (this.showInfoVo.AnteriorDescendingSupport !== '') {
      //     //  前降支支架数开始
      //     this.showInfoVo.AnteriorDescendingSupport = true
      //   }
      //   if (this.showInfoVo.CyclotronBalloon !== '') {
      //     //  回旋支球囊数开始
      //     this.showInfoVo.CyclotronBalloon = true
      //   }
      //   if (this.showInfoVo.CyclotronSupport !== '') {
      //     //  回旋支支架数开始
      //     this.showInfoVo.CyclotronSupport = true
      //   }
      //   if (this.showInfoVo.RightCoronaryBalloon !== '') {
      //     //  右冠球囊数开始
      //     this.showInfoVo.RightCoronaryBalloon = true
      //   }
      //   if (this.showInfoVo.RightCoronarySupport !== '') {
      //     //  右冠支架数开始
      //     this.showInfoVo.RightCoronarySupport = true
      //   }
      //   // ---------器材信息---------
      //   if (this.showInfoVo.ProductName !== '') {
      //     // 器材名称
      //     this.showInfoVo.ProductName = true
      //   }
      //   if (this.showInfoVo.ProductModel !== '') {
      //     //  型号
      //     this.showInfoVo.ProductModel = true
      //   }
      //   if (this.showInfoVo.ProductStyle !== '') {
      //     //  规格
      //     this.showInfoVo.ProductStyle = true
      //   }
      //   if (this.showInfoVo.LargeClass.length > 0) {
      //     // 大类别
      //     this.showInfoVo.LargeClass = true
      //   }
      //   if (this.showInfoVo.SmallClass.length > 0) {
      //     this.showInfoVo.SmallClass = true
      //   }
      //   if (this.showInfoVo.providername.length > 0) {
      //     this.showInfoVo.providername = true
      //   }
      // },
      // disFn () {
      //   // if (this.showInfoVo.BMI === '') {
      //   //   // BMI
      //   //   this.showInfoVo.BMI = false
      //   // }
      //   if (this.showInfoVo.tb === 0) {
      //     // 体表面积
      //     this.showInfoVo.tb = false
      //   }
      //   if (this.showInfoVo.SurType.length === 0) {
      //     // 手术类型
      //     this.showInfoVo.SurType = false
      //   }
      //   if (this.showInfoVo.SurStartDateTime === '') {
      //     // 手术日期开始
      //     this.showInfoVo.SurStartDateTime = false
      //   }
      //   if (this.showInfoVo.ageTemp === 0) {
      //     // 年龄开始
      //     this.showInfoVo.ageTemp = false
      //   }
      //   // ---------造影信息-------------
      //   if (this.showInfoVo.GMType === '') {
      //     // 供血优势
      //     this.showInfoVo.GMType = false
      //   }
      //   if (this.showInfoVo.LCAFaYu === '') {
      //     // 左冠状动脉发育
      //     this.showInfoVo.LCAFaYu = false
      //   }
      //   if (this.showInfoVo.RCAFaYu === '') {
      //     // 右冠状动脉发育
      //     this.showInfoVo.RCAFaYu = false
      //   }
      //   if (this.showInfoVo.Jiwangzhijiaying.length === 0) {
      //     // 支架影位置
      //     this.showInfoVo.Jiwangzhijiaying = false
      //   }
      //   if (this.showInfoVo.BridgeVascular === '') {
      //     // 桥血管
      //     this.showInfoVo.BridgeVascular = false
      //   }
      //   if (this.showInfoVo.RadioGraphicResult.length === 0) {
      //     // 造影结论
      //     this.showInfoVo.RadioGraphicResult = false
      //   }
      //   // ---------病变信息---------
      //   if (this.showInfoVo.MainLocationFrom.length === 0) {
      //     // 血管位置
      //     this.showInfoVo.MainLocationFrom = false
      //   }
      //   if (this.showInfoVo.Quanbise === '') {
      //     //  是否闭塞
      //     this.showInfoVo.Quanbise = false
      //   }
      //   if (this.showInfoVo.XiazhailvFrom === 0) {
      //     //  狭窄率开始
      //     this.showInfoVo.XiazhailvFrom = false
      //   }
      //   if (this.showInfoVo.FenzhiName === '') {
      //     // 分支血管名称
      //     this.showInfoVo.FenzhiName = false
      //   }
      //   if (this.showInfoVo.Zhijianeizaixiazhai === '') {
      //     // 支架内在狭窄
      //     this.showInfoVo.Zhijianeizaixiazhai = false
      //   }
      //   if (this.showInfoVo.lesionsType.length === 0) {
      //     // 病变类型
      //     this.showInfoVo.lesionsType = false
      //   }
      //   if (this.showInfoVo.BiseTime.length === 0) {
      //     // 闭塞时间
      //     this.showInfoVo.BiseTime = false
      //   }
      //   if (this.showInfoVo.Bisehounixiangxueliu.length === 0) {
      //     // 闭塞之后逆向血管
      //     this.showInfoVo.Bisehounixiangxueliu = false
      //   }
      //   if (this.showInfoVo.LengthFanwei.length === 0) {
      //     // 长度范围
      //     this.showInfoVo.LengthFanwei = false
      //   }
      //   if (this.showInfoVo.Xueshuan === '') {
      //     // 血栓
      //     this.showInfoVo.Xueshuan = false
      //   }
      //   if (this.showInfoVo.Qianxiangxueliu.length === 0) {
      //     // 前向血流
      //     this.showInfoVo.Qianxiangxueliu = false
      //   }
      //   if (this.showInfoVo.Gaihua.length === 0) {
      //     // 钙化
      //     this.showInfoVo.Gaihua = false
      //   }
      //   if (this.showInfoVo.Shuangfencha.length === 0) {
      //     // 分叉病变分型
      //     this.showInfoVo.Shuangfencha = false
      //   }
      //   if (this.showInfoVo.Sanfenchabingbian.length === 0) {
      //     // 三叉病变节段
      //     this.showInfoVo.Sanfenchabingbian = false
      //   }
      //   if (this.showInfoVo.LocationFrom.length === 0) {
      //     // 闭塞起始血管段
      //     this.showInfoVo.LocationFrom = false
      //   }
      //   if (this.showInfoVo.Dunxingcanduan === '') {
      //     // 钝型残端
      //     this.showInfoVo.Dunxingcanduan = false
      //   }
      //   if (this.showInfoVo.Qiaoxueguan === '') {
      //     // 血管桥(病变中)
      //     this.showInfoVo.Qiaoxueguan = false
      //   }
      //   if (this.showInfoVo.canzhaoxueguanzhijing === 0) {
      //     //  参照血管直径开始
      //     this.showInfoVo.canzhaoxueguanzhijing = false
      //   }
      //   if (this.showInfoVo.bingbianchangdu === 0) {
      //     //  病变长度开始
      //     this.showInfoVo.bingbianchangdu = false
      //   }
      //   if (this.showInfoVo.shuqianminguanqiangzhijing === 0) {
      //     //  术前最小官腔直径开始
      //     this.showInfoVo.shuqianminguanqiangzhijing = false
      //   }
      //   if (this.showInfoVo.xiazhaichengdu === 0) {
      //     //  狭窄程度开始
      //     this.showInfoVo.xiazhaichengdu = false
      //   }
      //   if (this.showInfoVo.Qcaxuaguanzhijing === 0) {
      //     //  术前参照血管直径开始
      //     this.showInfoVo.Qcaxuaguanzhijing = false
      //   }
      //   if (this.showInfoVo.Qcabingbianchangdu === 0) {
      //     //  术前病变长度开始
      //     this.showInfoVo.Qcabingbianchangdu = false
      //   }
      //   if (this.showInfoVo.Qcaxiazhai === 0) {
      //     //  术前狭窄程度开始
      //     this.showInfoVo.Qcaxiazhai = false
      //   }
      //   if (this.showInfoVo.Qcaminzhijing === 0) {
      //     //  QCA术前最小官腔直径开始
      //     this.showInfoVo.Qcaminzhijing = false
      //   }
      //   if (this.showInfoVo.Qcaafterxiazhaichengdu === 0) {
      //     //  球囊预处理后狭窄程度开始
      //     this.showInfoVo.Qcaafterxiazhaichengdu = false
      //   }
      //   if (this.showInfoVo.Qcaafterminzhijing === 0) {
      //     //  球囊预处理后最小官腔直径开始
      //     this.showInfoVo.Qcaafterminzhijing = false
      //   }
      //   if (this.showInfoVo.Chulijishu.length === 0) {
      //     //  处理技术
      //     this.showInfoVo.Chulijishu = false
      //   }
      //   if (this.showInfoVo.NoFenchaType === '') {
      //     //  有无分叉病变（数据库填了就是没有分叉
      //     this.showInfoVo.NoFenchaType = false
      //   }
      //   // ---------手术结果---------
      //   if (this.showInfoVo.LeftTrunkBalloon === 0) {
      //     //  左主干球囊数开始
      //     this.showInfoVo.LeftTrunkBalloon = false
      //   }
      //   if (this.showInfoVo.LeftMainSupport === 0) {
      //     //  左主干支架数开始
      //     this.showInfoVo.LeftMainSupport = false
      //   }
      //   if (this.showInfoVo.AnteriorDescendingBalloon === 0) {
      //     //  前降支球囊数开始
      //     this.showInfoVo.AnteriorDescendingBalloon = false
      //   }
      //   if (this.showInfoVo.AnteriorDescendingSupport === 0) {
      //     //  前降支支架数开始
      //     this.showInfoVo.AnteriorDescendingSupport = false
      //   }
      //   if (this.showInfoVo.CyclotronBalloon === 0) {
      //     //  回旋支球囊数开始
      //     this.showInfoVo.CyclotronBalloon = false
      //   }
      //   if (this.showInfoVo.CyclotronSupport === 0) {
      //     //  回旋支支架数开始
      //     this.showInfoVo.CyclotronSupport = false
      //   }
      //   if (this.showInfoVo.RightCoronaryBalloon === 0) {
      //     //  右冠球囊数开始
      //     this.showInfoVo.RightCoronaryBalloon = false
      //   }
      //   if (this.showInfoVo.RightCoronarySupport === 0) {
      //     //  右冠支架数开始
      //     this.showInfoVo.RightCoronarySupport = false
      //   }
      //   // ---------器材信息---------
      //   if (this.showInfoVo.ProductName === '') {
      //     // 器材名称
      //     this.showInfoVo.ProductName = false
      //   }
      //   if (this.showInfoVo.ProductModel === '') {
      //     //  型号
      //     this.showInfoVo.ProductModel = false
      //   }
      //   if (this.showInfoVo.ProductStyle === '') {
      //     //  规格
      //     this.showInfoVo.ProductStyle = false
      //   }
      //   if (this.showInfoVo.LargeClass.length === 0) {
      //     // 大类别
      //     this.showInfoVo.LargeClass = false
      //   }
      //   if (this.showInfoVo.SmallClass.length === 0) {
      //     this.showInfoVo.SmallClass = false
      //   }
      //   if (this.showInfoVo.providername.length === 0) {
      //     this.showInfoVo.providername = false
      //   }
      // }
    },
    mounted () {
      // console.log(typeof(this.showInfoVo.LeftTrunkBalloon))
      // this.disShowFn()
      // this.disFn()
    },
    created () {
    },
    computed: {},
    components: {}
  }
</script>

<style scoped>

</style>

