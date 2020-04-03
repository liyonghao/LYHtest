<template>
  <section v-loading="tabList.loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
    <!--查询统计页面-->
    <div>
      <el-row>
        <el-col :span="24" v-if="tabList.selectTabPage">
          <div class="content">
            <span class="block"/>
            <span class="slips">查询统计</span>
          </div>
        </el-col>
        <el-col :span="24" v-if="tabList.selectTabScreen">
          <div class="content">
            <span class="block"/>
            <span class="slips">筛选统计</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form  inline size="mini" label-width="94px" label-position="right">
            <div v-if="tabList.selectTabScreen">
              <div>
                <label>查询统计</label>
                <show-page :dictionariesList="dictionariesList" :showInfoVo="selectVo"
                           :SmallClassInfo="SmallClassInfo" :tabList="tabList" :disShowFrom="disShowFrom"/>
              </div>
              <el-form-item label="筛选条件:">
                <div style="margin-bottom: 10px">
                  <el-button type="primary" size="mini" icon="el-icon-search" @click="getScreen()"
                             :disabled="tabList.getScreen">筛选
                  </el-button>
                  <el-button type="primary" size="mini" icon="el-icon-refresh" @click="resetScreenClick()">重置
                  </el-button>
                  <el-button type="primary" size="mini" plain icon="el-icon-back" @click="goBackClick()">返回查询页面
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item label="筛选维度:">
                <el-select placeholder="请选择" clearable filterable v-model="tabList.screenDimensionality"
                           style="width:110px" @change="changeScreen">
                  <el-option
                    label="病变信息"
                    value="1">
                  </el-option>
                  <el-option
                    label="器材信息"
                    value="2">
                  </el-option>
                  <el-option
                    label="手术信息"
                    value="3">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div style="margin-bottom: 10px" v-if="tabList.selectTabPage">
              <el-button type="primary" size="mini" plain icon="el-icon-search" @click="getSelect()">查询</el-button>
              <el-button type="primary" size="mini" icon="el-icon-refresh" @click="resetClick()">重置
              </el-button>
            </div>
            <div style="height: 800px;overflow-y: auto">
              <el-collapse v-model="tabList.activeNames">
                <el-collapse-item name="1" v-if="tabList.surgeryOne">
                  <template slot="title">
                    手术基本信息<i class="header-icon el-icon-info"/>
                  </template>
                  <el-form-item label="BMI:" v-if="disShowFrom.BMI" prop="BMI">
                    <el-select placeholder="请选择" clearable filterable style="width:110px" v-model="selectVo.BMI">
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
                  <el-form-item label="体表面积:" v-if="disShowFrom.tb" prop="tb">
                    <el-input-number size="mini" controls-position="right" :min="0" style="width:110px"
                                     v-model="selectVo.tb" @change="numChange1"/>
                    <span class="separator">至</span>
                    <el-form-item prop="tbTo">
                      <el-input-number size="mini" controls-position="right" :min="0" style="width:110px"
                                       v-model="selectVo.tbTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="手术类型:" v-if="disShowFrom.SurType" prop="SurType">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="selectVo.SurType">
                      <el-option v-for="item in dictionariesList.surType"
                                 :key="item.dicKey"
                                 :value="item.dicKey"
                                 :label="item.dicValue"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="手术日期:" v-if="disShowFrom.SurStartDateTime" prop="SurStartDateTime">
                    <el-date-picker type="date" size="mini" placeholder="开始时间" style="width:130px"
                                    value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                    v-model="selectVo.SurStartDateTime">
                    </el-date-picker>
                    <span class="separator">至</span>
                    <el-form-item prop="SurStartDateTimeTo">
                      <el-date-picker type="date" size="mini" placeholder="结束时间" style="width:130px"
                                      value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                      v-model="selectVo.SurStartDateTimeTo">
                      </el-date-picker>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="手术时病人年龄:" v-if="disShowFrom.ageTemp" prop="ageTemp">
                    <el-input-number size="mini" controls-position="right" :min="0" style="width:110px"
                                     v-model="selectVo.ageTemp" @change="numChange2"/>
                    <span class="separator">至</span>
                    <el-form-item prop="ageTempTo">
                      <el-input-number size="mini" controls-position="right" :min="0" style="width:110px"
                                       v-model="selectVo.ageTempTo"/>
                    </el-form-item>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item name="2" v-if="tabList.radioOne">
                  <template slot="title">
                    造影信息<i class="header-icon el-icon-info"/>
                  </template>
                  <el-form-item label="供血优势:" v-if="disShowFrom.GMType" prop="GMType">
                    <el-select placeholder="请选择" clearable filterable style="width:110px"
                               v-model="selectVo.GMType">
                      <el-option v-for="item in dictionariesList.GMType"
                                 :key="item.dicKey"
                                 :value="item.dicKey"
                                 :label="item.dicValue"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="左冠状动脉发育:" v-if="disShowFrom.LCAFaYu" prop="LCAFaYu">
                    <el-select placeholder="请选择" clearable filterable style="width:110px"
                               v-model="selectVo.LCAFaYu">
                      <el-option v-for="item in dictionariesList.growth"
                                 :key="item.dicKey"
                                 :value="item.dicKey"
                                 :label="item.dicValue"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="右冠状动脉发育:" v-if="disShowFrom.RCAFaYu" prop="RCAFaYu">
                    <el-select placeholder="请选择" clearable filterable style="width:110px"
                               v-model="selectVo.RCAFaYu">
                      <el-option v-for="item in dictionariesList.growth"
                                 :key="item.dicKey"
                                 :value="item.dicKey"
                                 :label="item.dicValue"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="支架影位置:" v-if="disShowFrom.Jiwangzhijiaying" prop="Jiwangzhijiaying">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="selectVo.Jiwangzhijiaying">
                      <el-option v-for="item in dictionariesList.stentShadow"
                                 :key="item"
                                 :value="item"
                                 :label="item"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="桥血管:" v-if="disShowFrom.BridgeVascular" prop="BridgeVascular">
                    <el-select placeholder="请选择" clearable filterable style="width:110px"
                               v-model="selectVo.BridgeVascular">
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
                  <el-form-item label="造影结论:" v-if="disShowFrom.RadioGraphicResult" prop="RadioGraphicResult">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="selectVo.RadioGraphicResult">
                      <el-option
                        label="左主干病变"
                        value="左主干病变">
                      </el-option>
                      <el-option
                        label="左主干＋单支病变"
                        value="左主干＋单支病变">
                      </el-option>
                      <el-option
                        label="左主干＋双支病变"
                        value="左主干+双支病变">
                      </el-option>
                      <el-option
                        label="左主干＋三支病变"
                        value="左主干＋三支病变">
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
                </el-collapse-item>
                <el-collapse-item name="3" v-if="tabList.lesionOne">
                  <template slot="title">
                    病变信息<i class="header-icon el-icon-info"/>
                  </template>
                  <el-form-item label="血管位置:" v-if="disShowFrom.MainLocationFrom" prop="MainLocationFrom">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="_MainLocationFrom.MainLocationFrom">
                      <el-option v-for="item in dictionariesList.MainLocationFrom"
                                 :key="item"
                                 :value="item"
                                 :label="item"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否病塞:" v-if="disShowFrom.Quanbise" prop="Quanbise">
                    <el-select placeholder="请选择" clearable filterable style="width:110px"
                               v-model="_MainLocationFrom.Quanbise">
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
                  <el-form-item label="狭窄率:" v-if="disShowFrom.XiazhailvFrom" prop="XiazhailvFrom">
                    <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                     @change="numChange3" v-model="_MainLocationFrom.XiazhailvFrom"/>
                    <span class="separator">至</span>
                    <el-form-item prop="XiazhailvTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.XiazhailvTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="分支血管名称:" v-if="disShowFrom.FenzhiName" prop="FenzhiName">
                    <el-select placeholder="请选择" clearable filterable style="width:110px"
                               v-model="_MainLocationFrom.FenzhiName">
                      <el-option v-for="item in dictionariesList.branch"
                                 :key="item"
                                 :value="item"
                                 :label="item"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="支架内在狭窄:" v-if="disShowFrom.Zhijianeizaixiazhai" prop="Zhijianeizaixiazhai">
                    <el-select placeholder="请选择" clearable filterable style="width:110px"
                               v-model="_MainLocationFrom.Zhijianeizaixiazhai">
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
                  <el-form-item label="病变类型:" v-if="disShowFrom.lesionsType" prop="lesionsType">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="_MainLocationFrom.lesionsType">
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
                  <el-form-item label="闭塞时间:" v-if="disShowFrom.BiseTime" prop="BiseTime">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="_MainLocationFrom.BiseTime">
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
                  <el-form-item label="闭塞之后逆向血管:" v-if="disShowFrom.Bisehounixiangxueliu" prop="Bisehounixiangxueliu">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="_MainLocationFrom.Bisehounixiangxueliu">
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
                  <el-form-item label="长度范围:" v-if="disShowFrom.LengthFanwei" prop="LengthFanwei">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="_MainLocationFrom.LengthFanwei">
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
                  <el-form-item label="血栓:" v-if="disShowFrom.Xueshuan" prop="Xueshuan">
                    <el-select placeholder="请选择" clearable filterable style="width:110px"
                               v-model="_MainLocationFrom.Xueshuan">
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
                  <el-form-item label="前向血流:" v-if="disShowFrom.Qianxiangxueliu" prop="Qianxiangxueliu">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="_MainLocationFrom.Qianxiangxueliu">
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
                  <el-form-item label="钙化:" v-if="disShowFrom.Gaihua" prop="Gaihua">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="_MainLocationFrom.Gaihua">
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
                  <el-form-item label="分叉病变分型:" v-if="disShowFrom.Shuangfencha" prop="Shuangfencha">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="_MainLocationFrom.Shuangfencha">
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
                  <el-form-item label="三叉病变节段:" v-if="disShowFrom.Sanfenchabingbian" prop="Sanfenchabingbian">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="_MainLocationFrom.Sanfenchabingbian">
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
                  <el-form-item label="闭塞起始血管段:" v-if="disShowFrom.LocationFrom" prop="LocationFrom">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="_MainLocationFrom.LocationFrom">
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
                  <el-form-item label="钝型残端:" v-if="disShowFrom.Dunxingcanduan" prop="Dunxingcanduan">
                    <el-select placeholder="请选择" clearable filterable style="width:110px"
                               v-model="_MainLocationFrom.Dunxingcanduan">
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
                  <el-form-item label="血管桥(病变中):" v-if="disShowFrom.Qiaoxueguan" prop="Qiaoxueguan">
                    <el-select placeholder="请选择" clearable filterable style="width:110px"
                               v-model="_MainLocationFrom.Qiaoxueguan">
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
                  <el-form-item label="参照血管直径:" v-if="disShowFrom.canzhaoxueguanzhijing" prop="canzhaoxueguanzhijing">
                    <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                     @change="numChange4" v-model="_MainLocationFrom.canzhaoxueguanzhijing"/>
                    <span class="separator">至</span>
                    <el-form-item prop="canzhaoxueguanzhijingTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.canzhaoxueguanzhijingTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="病变长度:" v-if="disShowFrom.bingbianchangdu" prop="bingbianchangdu">
                    <el-input-number size="mini" @change="numChange5" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.bingbianchangdu"/>
                    <span class="separator">至</span>
                    <el-form-item prop="bingbianchangduTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.bingbianchangduTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="术前最小官腔直径:" v-if="disShowFrom.shuqianminguanqiangzhijing"
                                prop="shuqianminguanqiangzhijing">
                    <el-input-number size="mini" @change="numChange6" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.shuqianminguanqiangzhijing"/>
                    <span class="separator">至</span>
                    <el-form-item prop="shuqianminguanqiangzhijingTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.shuqianminguanqiangzhijingTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="狭窄程度:" v-if="disShowFrom.xiazhaichengdu" prop="xiazhaichengdu">
                    <el-input-number size="mini" @change="numChange7" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.xiazhaichengdu"/>
                    <span class="separator">至</span>
                    <el-form-item prop="xiazhaichengduTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.xiazhaichengduTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="术前参照血管直径:" v-if="disShowFrom.Qcaxuaguanzhijing" prop="Qcaxuaguanzhijing">
                    <el-input-number size="mini" @change="numChange8" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.Qcaxuaguanzhijing"/>
                    <span class="separator">至</span>
                    <el-form-item prop="QcaxuaguanzhijingTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.QcaxuaguanzhijingTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="术前病变长度:" v-if="disShowFrom.Qcabingbianchangdu" prop="Qcabingbianchangdu">
                    <el-input-number size="mini" @change="numChange9" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.Qcabingbianchangdu"/>
                    <span class="separator">至</span>
                    <el-form-item prop="QcabingbianchangduTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.QcabingbianchangduTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="术前狭窄程度:" v-if="disShowFrom.Qcaxiazhai" prop="Qcaxiazhai">
                    <el-input-number size="mini" @change="numChange10" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.Qcaxiazhai"/>
                    <span class="separator">至</span>
                    <el-form-item prop="QcaxiazhaiTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.QcaxiazhaiTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="QCA术前最小官腔直径:" v-if="disShowFrom.Qcaminzhijing" prop="Qcaminzhijing">
                    <el-input-number size="mini" @change="numChange11" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.Qcaminzhijing"/>
                    <span class="separator">至</span>
                    <el-form-item prop="QcaminzhijingTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.QcaminzhijingTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="球囊预处理后狭窄程度:" v-if="disShowFrom.Qcaafterxiazhaichengdu"
                                prop="Qcaafterxiazhaichengdu">
                    <el-input-number size="mini" @change="numChange12" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.Qcaafterxiazhaichengdu"/>
                    <span class="separator">至</span>
                    <el-form-item prop="QcaafterxiazhaichengduTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.QcaafterxiazhaichengduTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="球囊预处理后最小官腔直径:" v-if="disShowFrom.Qcaafterminzhijing" prop="Qcaafterminzhijing">
                    <el-input-number size="mini" @change="numChange13" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.Qcaafterminzhijing"/>
                    <span class="separator">至</span>
                    <el-form-item prop="QcaafterminzhijingTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.QcaafterminzhijingTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="处理技术:" v-if="disShowFrom.Chulijishu" prop="Chulijishu">
                    <el-select placeholder="请选择" clearable filterable multiple style="width:110px"
                               v-model="_MainLocationFrom.Chulijishu">
                      <el-option v-for="item in dictionariesList.processing"
                                 :key="item"
                                 :value="item"
                                 :label="item"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="有无分叉病变:" v-if="disShowFrom.NoFenchaType" prop="NoFenchaType">
                    <el-select placeholder="请选择" clearable filterable style="width:110px"
                               v-model="_MainLocationFrom.NoFenchaType">
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
                </el-collapse-item>
                <el-collapse-item name="4" v-if="tabList.surgeryTwo">
                  <template slot="title">
                    手术结果<i class="header-icon el-icon-info"/>
                  </template>
                  <el-form-item label="左主干球囊数:" v-if="disShowFrom.LeftTrunkBalloon" prop="LeftTrunkBalloon">
                    <el-input-number size="mini" @change="numChange14" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.LeftTrunkBalloon"/>
                    <span class="separator">至</span>
                    <el-form-item prop="LeftTrunkBalloonTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.LeftTrunkBalloonTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="左主干支架数:" v-if="disShowFrom.LeftMainSupport" prop="LeftMainSupport">
                    <el-input-number size="mini" @change="numChange15" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.LeftMainSupport"/>
                    <span class="separator">至</span>
                    <el-form-item prop="LeftMainSupportTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.LeftMainSupportTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="前降支球囊数:" v-if="disShowFrom.AnteriorDescendingBalloon"
                                prop="AnteriorDescendingBalloon">
                    <el-input-number size="mini" @change="numChange16" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.AnteriorDescendingBalloon"/>
                    <span class="separator">至</span>
                    <el-form-item prop="AnteriorDescendingBalloonTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.AnteriorDescendingBalloonTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="前降支支架数:" v-if="disShowFrom.AnteriorDescendingSupport"
                                prop="AnteriorDescendingSupport">
                    <el-input-number size="mini" @change="numChange17" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.AnteriorDescendingSupport"/>
                    <span class="separator">至</span>
                    <el-form-item prop="AnteriorDescendingSupportTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.AnteriorDescendingSupportTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="回旋支球囊数:" v-if="disShowFrom.CyclotronBalloon" prop="CyclotronBalloon">
                    <el-input-number size="mini" @change="numChange18" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.CyclotronBalloon"/>
                    <span class="separator">至</span>
                    <el-form-item prop="CyclotronBalloonTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.CyclotronBalloonTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="回旋支支架数:" v-if="disShowFrom.CyclotronSupport" prop="CyclotronSupport">
                    <el-input-number size="mini" @change="numChange19" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.CyclotronSupport"/>
                    <span class="separator">至</span>
                    <el-form-item prop="CyclotronSupportTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.CyclotronSupportTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="右冠球囊数:" v-if="disShowFrom.RightCoronaryBalloon" prop="RightCoronaryBalloon">
                    <el-input-number size="mini" @change="numChange20" style="width:110px" controls-position="right"
                                     :min="0"
                                     v-model="_MainLocationFrom.RightCoronaryBalloon"/>
                    <span class="separator">至</span>
                    <el-form-item prop="RightCoronaryBalloonTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.RightCoronaryBalloonTo"/>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="右冠支架数:" v-if="disShowFrom.RightCoronarySupport"
                                prop="RightCoronarySupport">
                    <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                     v-model="_MainLocationFrom.RightCoronarySupport" @change="numChange21"/>
                    <span class="separator">至</span>
                    <el-form-item prop="RightCoronarySupportTo">
                      <el-input-number size="mini" style="width:110px" controls-position="right" :min="0"
                                       v-model="_MainLocationFrom.RightCoronarySupportTo"/>
                    </el-form-item>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item name="5" v-if="tabList.equipmentTwo">
                  <template slot="title">
                    器材信息<i class="header-icon el-icon-info"/>
                  </template>
                  <el-form-item label="器材名称:" v-if="disShowFrom.ProductName" prop="ProductName">
                    <el-input placeholder="请输入内容" clearable v-model="_MainLocationFrom.ProductName"
                              style="width:110px"/>
                  </el-form-item>
                  <el-form-item label="规格:" v-if="disShowFrom.ProductStyle" prop="ProductStyle">
                    <el-input placeholder="请输入内容" clearable v-model="_MainLocationFrom.ProductStyle"
                              style="width:110px"/>
                  </el-form-item>
                  <el-form-item label="型号:" v-if="disShowFrom.ProductModel" prop="ProductModel">
                    <el-input placeholder="请输入内容" clearable v-model="_MainLocationFrom.ProductModel"
                              style="width:110px"/>
                  </el-form-item>
                  <el-form-item label="大类名称:" v-if="disShowFrom.LargeClass" prop="LargeClass">
                    <el-select placeholder="请选择" clearable filterable multiple v-model="_MainLocationFrom.LargeClass"
                               style="width:110px"
                               @focus="selectLargeClass" @change="selectLargeClassVal">
                      <el-option v-for="item in dictionariesList.largeClass"
                                 :key="item.classcode"
                                 :value="item.classcode"
                                 :label="item.classname"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="小类名称:" v-if="disShowFrom.SmallClass" prop="SmallClass">
                    <el-select placeholder="请选择" clearable filterable multiple v-model="_MainLocationFrom.SmallClass"
                               style="width:110px"
                               @focus="selectSmallClass">
                      <el-option v-for="item in SmallClassInfo"
                                 :key="item.classcode"
                                 :value="item.classcode"
                                 :label="item.classname"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="厂家品牌:" v-if="disShowFrom.providername" prop="providername">
                    <el-select placeholder="请选择" clearable filterable multiple v-model="_MainLocationFrom.providername"
                               style="width:110px">
                      <el-option v-for="item in dictionariesList.provider"
                                 :key="item.providercode"
                                 :value="item.providercode"
                                 :label="item.providername"/>
                    </el-select>
                  </el-form-item>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div>

            </div>
          </el-form>
        </el-col>
        <el-col :span="18" :offset="1" v-if="tabList.selectTabPage">
          <div>
            <el-row>
              <el-col :span="24">
                <div>
                  <el-switch
                    v-model="tabList.openValue"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    inactive-text="展示查询列表"
                    @change="openTable">
                  </el-switch>
                  <el-switch
                    v-model="tabList.openMoreValue"
                    active-color="#13ce66"
                    inactive-text="更多信息"
                    inactive-color="#ff4949"
                    v-if="tabList.moreVal" @change="openMoreTable">
                  </el-switch>
                  <el-button type="primary" size="mini" icon="el-icon-folder-opened" @click="exportSelect()">
                    导出查询内容列表
                  </el-button>
                  <el-button type="primary" size="mini" icon="el-icon-folder-opened" @click="exportPatient()">
                    导出病人列表
                  </el-button>
                  <el-button type="primary" size="mini" plain icon="el-icon-pie-chart" @click="selectDataClick()"
                             :disabled="tabList.screenDis">筛选数据
                  </el-button>
                </div>
              </el-col>
              <el-col :span="24" v-if="tabList.tablePage">
                <div>
                  <el-table
                    :data="tabData"
                    border stripe highlight-current-row>
                    <el-table-column
                      label="序号"
                      type="index"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      prop="patientName"
                      label="姓名"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="patiIdentity"
                      label="身份证号"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="sex"
                      label="性别"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      prop="ageTemp"
                      label="年龄"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      prop="SurCode"
                      label="手术编号"
                      width="160">
                    </el-table-column>
                    <el-table-column
                      prop="surStartDateTime"
                      label="手术开始日期"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="surCathRoomName"
                      label="导管间"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="BMI"
                      label="BMI"
                      width="120" v-if="tabList.showTabel">
                    </el-table-column>
                    <el-table-column
                      prop="tb"
                      label="体表面积"
                      width="120" v-if="tabList.showTabel">
                    </el-table-column>
                    <el-table-column
                      prop="PunctuerName"
                      label="穿刺部位"
                      width="120" v-if="tabList.showTabel">
                    </el-table-column>
                    <el-table-column
                      prop="GMType"
                      label="供血优势"
                      width="120" v-if="tabList.showTabel">
                    </el-table-column>
                    <el-table-column
                      prop="bridge"
                      label="桥血管"
                      width="120" v-if="tabList.showTabel">
                    </el-table-column>
                    <el-table-column
                      prop="lmtStr"
                      label="左主干情况"
                      width="120" v-if="tabList.showTabel">
                    </el-table-column>
                    <el-table-column
                      prop="ladStr"
                      label="前降支情况"
                      width="130" v-if="tabList.showTabel">
                    </el-table-column>
                    <el-table-column
                      prop="lcxStr"
                      label="回旋支情况"
                      width="130" v-if="tabList.showTabel">
                    </el-table-column>
                    <el-table-column
                      prop="rcaStr"
                      label="右冠情况"
                      width="130" v-if="tabList.showTabel">
                    </el-table-column>
                    <el-table-column
                      prop="radioGraphicResult"
                      label="造影结论"
                      width="300" v-if="tabList.showTabel">
                    </el-table-column>
                    <el-table-column
                      prop="specialEquipment"
                      label="特殊器材"
                      width="310" v-if="tabList.showTabel">
                    </el-table-column>
                    <el-table-column
                      prop="isForking"
                      label="有无分叉病变"
                      width="120" v-if="tabList.showTabel">
                    </el-table-column>
                  </el-table>
                  <div style="float: right">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="tabList.page"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="tabList.pagesize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tabList.total">
                    </el-pagination>
                  </div>
                </div>
              </el-col>
              <el-col :span="24" v-if="tabList.dataChart">
                <div>
                  <el-form>
                    <el-form-item label="展示报表:">
                      <el-select v-model="tabList.statisticsVos" size="mini" placeholder="请选择" style="width:110px"
                                 clearable @change="selectVal">
                        <el-option
                          v-for="item in tabList.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
              <el-col :span="12" v-show="showChartPie">
                <div id="echarts" :style="{width: '500px', height: '500px'}"></div>
              </el-col>
              <el-col :span="12" v-show="showChartY">
                <div id="echarts2" :style="{width: '500px', height: '500px'}"></div>
              </el-col>
              <el-col :span="12" v-show="showChartS">
                <div id="echarts3" :style="{width: '1800px', height: '500px'}"></div>
              </el-col>
              <el-col :span="12" v-show="showChartSd">
                <div id="echarts4" :style="{width: '1800px', height: '500px'}"></div>
              </el-col>
              <el-col :span="12" v-show="showChartYS">
                <div id="echarts5" :style="{width: '500px', height: '500px'}"></div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="18" :offset="1" v-if="tabList.screenTabPage">
          <div style="margin-bottom: 10px">
            <el-button type="primary" size="mini" plain @click="selectDataShow">选择要展示的数据项</el-button>
            <el-button type="primary" size="mini" plain @click="exportProject">导出</el-button>
          </div>
          <div v-if="tabList.screenShowPage">
            <div v-if="tabList.lesionTab">
              <el-table
                :data="tabList.lessionTabData"
                style="width: 100%;" height="650" border stripe highlight-current-row>
                <el-table-column
                  label="序号"
                  type="index"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="Name"
                  label="病变标识"
                  width="80" v-if="tabList.shuttleInfo.indexOf(0) === -1">
                </el-table-column>
                <el-table-column
                  prop="MainLocationFrom"
                  label="血管段"
                  width="120" v-if="tabList.shuttleInfo.indexOf(1) === -1">
                </el-table-column>
                <el-table-column
                  prop="Quanbise"
                  label="是否闭塞"
                  width="50" v-if="tabList.shuttleInfo.indexOf(2) === -1">
                </el-table-column>
                <el-table-column
                  prop="Xiazhailv"
                  label="狭窄率"
                  width="70" v-if="tabList.shuttleInfo.indexOf(3) === -1">
                </el-table-column>
                <el-table-column
                  prop="Zhijianeizaixiazhai"
                  label="支架内在狭窄"
                  width="160" v-if="tabList.shuttleInfo.indexOf(4) === -1">
                </el-table-column>
                <el-table-column
                  prop="NoFenchaType"
                  label="单支类型"
                  width="120" v-if="tabList.shuttleInfo.indexOf(5) === -1">
                </el-table-column>
                <el-table-column
                  prop="LengthFanwei"
                  label="长度范围"
                  width="120" v-if="tabList.shuttleInfo.indexOf(6) === -1">
                </el-table-column>
                <el-table-column
                  prop="Xueshuan"
                  label="血栓"
                  width="120" v-if="tabList.shuttleInfo.indexOf(7) === -1">
                </el-table-column>
                <el-table-column
                  prop="Qianxiangxueliu"
                  label="前向血流"
                  width="120" v-if="tabList.shuttleInfo.indexOf(8) === -1">
                </el-table-column>
                <el-table-column
                  prop="Gaihua"
                  label="钙化"
                  width="120" v-if="tabList.shuttleInfo.indexOf(9) === -1">
                </el-table-column>
                <el-table-column
                  prop="Chengjiao"
                  label="分叉成角"
                  width="120" v-if="tabList.shuttleInfo.indexOf(10) === -1">
                </el-table-column>
                <el-table-column
                  prop="Shuangfencha"
                  label="分叉(三叉)病变分型"
                  width="150" v-if="tabList.shuttleInfo.indexOf(11) === -1">
                </el-table-column>
                <el-table-column
                  prop="LocationFrom"
                  label="闭塞起始血管段"
                  width="120" v-if="tabList.shuttleInfo.indexOf(12) === -1">
                </el-table-column>
                <el-table-column
                  prop="Dunxingcanduan"
                  label="钝型残端"
                  width="120" v-if="tabList.shuttleInfo.indexOf(13) === -1">
                </el-table-column>
                <el-table-column
                  prop="Qiaoxueguan"
                  label="桥血管"
                  width="120" v-if="tabList.shuttleInfo.indexOf(14) === -1">
                </el-table-column>
                <el-table-column
                  prop="canzhaoxueguanzhijing"
                  label="参照血管直径"
                  width="120" v-if="tabList.shuttleInfo.indexOf(15) === -1">
                </el-table-column>
                <el-table-column
                  prop="bingbianchangdu"
                  label="病变长度"
                  width="120" v-if="tabList.shuttleInfo.indexOf(16) === -1">
                </el-table-column>
                <el-table-column
                  prop="shuqianminguanqiangzhijing"
                  label="术前最小官腔直径"
                  width="150" v-if="tabList.shuttleInfo.indexOf(17) === -1">
                </el-table-column>
                <el-table-column
                  prop="xiazhaichengdu"
                  label="狭窄程度"
                  width="120" v-if="tabList.shuttleInfo.indexOf(18) === -1">
                </el-table-column>
                <el-table-column
                  prop="Qcaxuaguanzhijing"
                  label="术前参照血管直径"
                  width="150" v-if="tabList.shuttleInfo.indexOf(19) === -1">
                </el-table-column>
                <el-table-column
                  prop="Qcabingbianchangdu"
                  label="术前病变长度"
                  width="120" v-if="tabList.shuttleInfo.indexOf(20) === -1">
                </el-table-column>
                <el-table-column
                  prop="Qcaxiazhai"
                  label="术前狭窄程度"
                  width="120" v-if="tabList.shuttleInfo.indexOf(21) === -1">
                </el-table-column>
                <el-table-column
                  prop="Qcaminzhijing"
                  label="QCA术前最小官腔直径"
                  width="200" v-if="tabList.shuttleInfo.indexOf(22) === -1">
                </el-table-column>
                <el-table-column
                  prop="Qcaafterxiazhaichengdu"
                  label="球囊预处理后狭窄程度"
                  width="200" v-if="tabList.shuttleInfo.indexOf(23) === -1">
                </el-table-column>
                <el-table-column
                  prop="Qcaafterminzhijing"
                  label="球囊预处理后最小宫腔直径"
                  width="200" v-if="tabList.shuttleInfo.indexOf(24) === -1">
                </el-table-column>
                <el-table-column
                  prop="Chulijishu"
                  label="处理技术"
                  width="120" v-if="tabList.shuttleInfo.indexOf(25) === -1">
                </el-table-column>
              </el-table>
              <div style="float: right" v-if="tabList.lesionTab">
                <el-pagination
                  @size-change="lessionHandleSizeChange"
                  @current-change="lessionHandleCurrentChange"
                  :current-page="tabList.lessionPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="tabList.lessionPagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="tabList.totalLession">
                </el-pagination>
              </div>
            </div>
            <div v-if="tabList.resultTab">
              <el-table
                :data="tabList.resultTabData"
                style="width: 100%;" height="650" border stripe highlight-current-row>
                <el-table-column
                  label="序号"
                  type="index"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="SurCode"
                  label="手术号"
                  width="200" v-if="tabList.shuttleResultInfo.indexOf(0) === -1">
                </el-table-column>
                <el-table-column
                  prop="position"
                  label="部位"
                  width="120" v-if="tabList.shuttleResultInfo.indexOf(1) === -1">
                </el-table-column>
                <el-table-column
                  prop="equipment"
                  label="器材"
                  width="200" v-if="tabList.shuttleResultInfo.indexOf(2) === -1">
                </el-table-column>
                <el-table-column
                  prop="TIMI"
                  label="TIMI血流"
                  width="100" v-if="tabList.shuttleResultInfo.indexOf(3) === -1">
                </el-table-column>
              </el-table>
              <div style="float: right" v-if="tabList.resultTab">
                <el-pagination
                  @size-change="resultHandleSizeChange"
                  @current-change="resultHandleCurrentChange"
                  :current-page="tabList.resultPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="tabList.resultPagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="tabList.totalResult">
                </el-pagination>
              </div>
            </div>
            <div v-if="tabList.productTab">
              <el-table
                :data="tabList.productTabData"
                style="width: 100%;" height="650" border stripe highlight-current-row>
                <el-table-column
                  label="序号"
                  type="index"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="SurCode"
                  label="手术号"
                  width="80" v-if="tabList.shuttleProductInfo.indexOf(0) === -1">
                </el-table-column>
                <el-table-column
                  prop="Time"
                  label="使用日期"
                  width="120" v-if="tabList.shuttleProductInfo.indexOf(1) === -1">
                </el-table-column>
                <el-table-column
                  prop="LargeClass"
                  label="器材类别"
                  width="50" v-if="tabList.shuttleProductInfo.indexOf(2) === -1">
                </el-table-column>
                <el-table-column
                  prop="SmallClass"
                  label="细分类别"
                  width="50" v-if="tabList.shuttleProductInfo.indexOf(3) === -1">
                </el-table-column>
                <el-table-column
                  prop="ProductName"
                  label="名称"
                  width="160" v-if="tabList.shuttleProductInfo.indexOf(4) === -1">
                </el-table-column>
                <el-table-column
                  prop="ProductStyle"
                  label="规格"
                  width="120" v-if="tabList.shuttleProductInfo.indexOf(5) === -1">
                </el-table-column>
                <el-table-column
                  prop="ProductModel"
                  label="型号"
                  width="120" v-if="tabList.shuttleProductInfo.indexOf(6) === -1">
                </el-table-column>
                <el-table-column
                  prop="providerName"
                  label="品牌厂家"
                  width="120" v-if="tabList.shuttleProductInfo.indexOf(7) === -1">
                </el-table-column>
              </el-table>
              <div style="float: right" v-if="tabList.productTab">
                <el-pagination
                  @size-change="productHandleSizeChange"
                  @current-change="productHandleCurrentChange"
                  :current-page="tabList.productPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="tabList.productPagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="tabList.totalProduct">
                </el-pagination>
              </div>
            </div>
          </div>
          <div style="margin-top: 30px">
            <el-button type="primary" size="mini" plain @click="selectDataShowProject">数据项分组</el-button>
            <el-checkbox v-model="tabList.listInfo" style="margin-left: 30px" @change="changeList">列表</el-checkbox>
            <el-checkbox v-model="tabList.histogram" @change="changeHistogram">柱状图</el-checkbox>
            <el-checkbox v-model="tabList.pieChart" @change="changePieChart">饼状图</el-checkbox>
            <label style="color: #606266;font-weight: 500;font-size: 14px;">数据查询
              <el-select placeholder="请选择" size="mini" clearable filterable v-model="tabList.sizeInfo"
                         style="width:110px;margin-left: 10px">
                <el-option value="10"
                           label="10"/>
                <el-option value="20"
                           label="20"/>
              </el-select>
            </label>
            <el-button type="primary" size="mini" plain @click="selectDataEcport">导出数据</el-button>
          </div>
          <div style="margin-top: 10px">
            <div style="float: left">
              <!------病变信息分类------->
              <div>
                <div v-if="(tabList.lesionInfos === 'Quanbise' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Quanbise"
                      label="是否病变"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Xiazhailv' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Xiazhailv"
                      label="狭窄率"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'FenzhiName' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="FenzhiName"
                      label="分支血管名"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Zhijianeizaixiazhai' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Zhijianeizaixiazhai"
                      label="支架内在狭窄"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'NoFenchaType' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="NoFenchaType"
                      label="病变类型"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'BiseTime' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="BiseTime"
                      label="闭塞时间"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Bisehounixiangxueliu' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Bisehounixiangxueliu"
                      label="闭塞之后逆向血管"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'LengthFanwei' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="LengthFanwei"
                      label="长度范围"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Xueshuan' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Xueshuan"
                      label="血栓"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Qianxiangxueliu' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Qianxiangxueliu"
                      label="前向血流"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Gaihua' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Gaihua"
                      label="钙化"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Shuangfencha' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Shuangfencha"
                      label="分叉病变分型"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Sanfenchabingbian' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Sanfenchabingbian"
                      label="三叉病变节段"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'LocationFrom' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="LocationFrom"
                      label="闭塞起始血管段"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Dunxingcanduan' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Dunxingcanduan"
                      label="钝型残端"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Qiaoxueguan' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Qiaoxueguan"
                      label="血管桥（病变中）"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'canzhaoxueguanzhijing' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="canzhaoxueguanzhijing"
                      label="参照血管直径"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'bingbianchangdu' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="bingbianchangdu"
                      label="病变长度"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'shuqianminguanqiangzhijing' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="shuqianminguanqiangzhijing"
                      label="术前最小官腔直径"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'xiazhaichengdu' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="xiazhaichengdu"
                      label="狭窄程度"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Qcaxuaguanzhijing' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Qcaxuaguanzhijing"
                      label="术前参照血管直径"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Qcabingbianchangdu' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Qcabingbianchangdu"
                      label="术前病变长度"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Qcaxiazhai' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Qcaxiazhai"
                      label="术前狭窄程度"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Qcaminzhijing' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Qcaminzhijing"
                      label="QCA术前最小官腔直径"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Qcaafterxiazhaichengdu' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Qcaafterxiazhaichengdu"
                      label="球囊预处理后狭窄"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Qcaafterminzhijing' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Qcaafterminzhijing"
                      label="球囊预处理后最小官腔直径"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'Chulijishu' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="Chulijishu"
                      label="处理技术"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.lesionInfos === 'isFencha' && tabList.listInfo === true)">
                  <el-table
                    :data="lessionGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="isFencha"
                      label="有无分叉病变"
                      width="100">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!------器材信息分类------->
              <div>
                <div v-if="(tabList.productInfos === 'ProductName' && tabList.listInfo === true)">
                  <el-table
                    :data="productGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="ProductName"
                      label="器材名称"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.productInfos === 'ProductStyle' && tabList.listInfo === true)">
                  <el-table
                    :data="productGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="ProductStyle"
                      label="规格"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.productInfos === 'ProductModel' && tabList.listInfo === true)">
                  <el-table
                    :data="productGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="ProductModel"
                      label="型号"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.productInfos === 'LargeClass' && tabList.listInfo === true)">
                  <el-table
                    :data="productGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="LargeClass"
                      label="大类名称"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.productInfos === 'SmallClass' && tabList.listInfo === true)">
                  <el-table
                    :data="productGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="SmallClass"
                      label="小类名称"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.productInfos === 'ManufacturerName' && tabList.listInfo === true)">
                  <el-table
                    :data="productGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="num"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="ManufacturerName"
                      label="厂家品牌"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!------手术结果信息分类------->
              <div>
                <div v-if="(tabList.resultInfos === 'LmSacculus' && tabList.listInfo === true)">
                  <el-table
                    :data="resultGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="LmSacculus"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="左主干球囊数"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.resultInfos === 'LmSupport' && tabList.listInfo === true)">
                  <el-table
                    :data="resultGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="LmSupport"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="左主干支架数"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.resultInfos === 'LADSacculus' && tabList.listInfo === true)">
                  <el-table
                    :data="resultGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="LADSacculus"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="前降支球囊数"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.resultInfos === 'LADSupport' && tabList.listInfo === true)">
                  <el-table
                    :data="resultGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="LADSupport"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="前降支支架数"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.resultInfos === 'LCXSacculus' && tabList.listInfo === true)">
                  <el-table
                    :data="resultGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="LCXSacculus"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="回旋支球囊数"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.resultInfos === 'LCXSupport' && tabList.listInfo === true)">
                  <el-table
                    :data="resultGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="LCXSupport"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="回旋支支架数"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.resultInfos === 'RCASacculus' && tabList.listInfo === true)">
                  <el-table
                    :data="resultGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="RCASacculus"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="右冠球囊数"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="(tabList.resultInfos === 'RCASupport' && tabList.listInfo === true)">
                  <el-table
                    :data="resultGroup"
                    border stripe highlight-current-row>
                    <el-table-column
                      prop="RCASupport"
                      label="数量"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="num"
                      label="右冠支架数"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
            <div style="float: left">
              <!------病变信息分类------->
              <div v-show="tabList.histogram === true && (this.tabList.lesionInfos === 'Quanbise'
          || this.tabList.lesionInfos === 'Xiazhailv'
          || this.tabList.lesionInfos === 'FenzhiName'
          || this.tabList.lesionInfos === 'Zhijianeizaixiazhai'
          || this.tabList.lesionInfos === 'NoFenchaType'
          || this.tabList.lesionInfos === 'BiseTime'
          || this.tabList.lesionInfos === 'Bisehounixiangxueliu'
          || this.tabList.lesionInfos === 'LengthFanwei'
          || this.tabList.lesionInfos === 'Xueshuan'
          || this.tabList.lesionInfos === 'Qianxiangxueliu'
          || this.tabList.lesionInfos === 'Gaihua'
          || this.tabList.lesionInfos === 'Shuangfencha'
          || this.tabList.lesionInfos === 'Sanfenchabingbian'
          || this.tabList.lesionInfos === 'LocationFrom'
          || this.tabList.lesionInfos === 'Dunxingcanduan'
          || this.tabList.lesionInfos === 'Qiaoxueguan'
          || this.tabList.lesionInfos === 'canzhaoxueguanzhijing'
          || this.tabList.lesionInfos === 'bingbianchangdu'
          || this.tabList.lesionInfos === 'shuqianminguanqiangzhijing'
          || this.tabList.lesionInfos === 'xiazhaichengdu'
          || this.tabList.lesionInfos === 'Qcaxuaguanzhijing'
          || this.tabList.lesionInfos === 'Qcabingbianchangdu'
          || this.tabList.lesionInfos === 'Qcaxiazhai'
          || this.tabList.lesionInfos === 'Qcaminzhijing'
          || this.tabList.lesionInfos === 'Qcaafterxiazhaichengdu'
          || this.tabList.lesionInfos === 'Qcaafterminzhijing'
          || this.tabList.lesionInfos === 'Chulijishu'
          || this.tabList.lesionInfos === 'isFencha')" id="echartsLession1"
                   :style="{width: '500px', height: '500px'}"></div>
              <!------器材信息分类------->
              <div v-show="tabList.histogram === true && (this.tabList.productInfos === 'ProductName'
          || this.tabList.productInfos === 'ProductStyle'
          || this.tabList.productInfos === 'ProductModel'
          || this.tabList.productInfos === 'LargeClass'
          || this.tabList.productInfos === 'SmallClass'
          || this.tabList.productInfos === 'ManufacturerName')" id="echartsProduct"
                   :style="{width: '500px', height: '500px'}"></div>
              <!------手术结果信息分类------->
              <div v-show="tabList.histogram === true && (this.tabList.resultInfos === 'LmSacculus'
          || this.tabList.resultInfos === 'LmSupport'
          || this.tabList.resultInfos === 'LADSacculus'
          || this.tabList.resultInfos === 'LADSupport'
          || this.tabList.resultInfos === 'LCXSacculus'
          || this.tabList.resultInfos === 'LCXSupport'
          || this.tabList.resultInfos === 'RCASacculus'
          || this.tabList.resultInfos === 'RCASupport')" id="echartsResult1"
                   :style="{width: '500px', height: '500px'}"></div>
            </div>
            <div style="float: left">
              <!------病变信息分类------->
              <div v-show="tabList.pieChart === true && (this.tabList.lesionInfos === 'Quanbise'
          || this.tabList.lesionInfos === 'Xiazhailv'
          || this.tabList.lesionInfos === 'FenzhiName'
          || this.tabList.lesionInfos === 'Zhijianeizaixiazhai'
          || this.tabList.lesionInfos === 'NoFenchaType'
          || this.tabList.lesionInfos === 'BiseTime'
          || this.tabList.lesionInfos === 'Bisehounixiangxueliu'
          || this.tabList.lesionInfos === 'LengthFanwei'
          || this.tabList.lesionInfos === 'Xueshuan'
          || this.tabList.lesionInfos === 'Qianxiangxueliu'
          || this.tabList.lesionInfos === 'Gaihua'
          || this.tabList.lesionInfos === 'Shuangfencha'
          || this.tabList.lesionInfos === 'Sanfenchabingbian'
          || this.tabList.lesionInfos === 'LocationFrom'
          || this.tabList.lesionInfos === 'Dunxingcanduan'
          || this.tabList.lesionInfos === 'Qiaoxueguan'
          || this.tabList.lesionInfos === 'canzhaoxueguanzhijing'
          || this.tabList.lesionInfos === 'bingbianchangdu'
          || this.tabList.lesionInfos === 'shuqianminguanqiangzhijing'
          || this.tabList.lesionInfos === 'xiazhaichengdu'
          || this.tabList.lesionInfos === 'Qcaxuaguanzhijing'
          || this.tabList.lesionInfos === 'Qcabingbianchangdu'
          || this.tabList.lesionInfos === 'Qcaxiazhai'
          || this.tabList.lesionInfos === 'Qcaminzhijing'
          || this.tabList.lesionInfos === 'Qcaafterxiazhaichengdu'
          || this.tabList.lesionInfos === 'Qcaafterminzhijing'
          || this.tabList.lesionInfos === 'Chulijishu'
          || this.tabList.lesionInfos === 'isFencha')" id="pieLession1"
                   :style="{width: '500px', height: '500px'}"></div>
              <!------器材信息分类------->
              <div v-show="tabList.pieChart === true && (this.tabList.productInfos === 'ProductName'
          || this.tabList.productInfos === 'ProductStyle'
          || this.tabList.productInfos === 'ProductModel'
          || this.tabList.productInfos === 'LargeClass'
          || this.tabList.productInfos === 'SmallClass'
          || this.tabList.productInfos === 'ManufacturerName')" id="pieProduct1"
                   :style="{width: '500px', height: '500px'}"></div>
              <!------手术结果信息分类------->
              <div v-show="tabList.pieChart === true && (this.tabList.resultInfos === 'LmSacculus'
          || this.tabList.resultInfos === 'LmSupport'
          || this.tabList.resultInfos === 'LADSacculus'
          || this.tabList.resultInfos === 'LADSupport'
          || this.tabList.resultInfos === 'LCXSacculus'
          || this.tabList.resultInfos === 'LCXSupport'
          || this.tabList.resultInfos === 'RCASacculus'
          || this.tabList.resultInfos === 'RCASupport')" id="pieResult1"
                   :style="{width: '500px', height: '500px'}"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="tabList.dialogVisible"
      width="40%"
      :close-on-click-modal='false'
      :lock-scroll='false'
      :show-close='false'>
      <div v-if="tabList.lessionDia">
        <label style="margin-bottom: 5px">病变信息未选数据</label>
        <el-transfer :titles="['病变信息已选数据', '病变信息可选数据']" @change="rightChange" v-model="tabList.lessionValue"
                     :data="tabList.lessionData"/>
      </div>
      <div v-if="tabList.productDia">
        <label style="margin-bottom: 5px">器材信息未选数据</label>
        <el-transfer :titles="['器材信息已选数据', '器材信息可选数据']" @change="rightChangeProduct" v-model="tabList.productValue"
                     :data="tabList.productData"/>
      </div>
      <div v-if="tabList.resultDia">
        <label style="margin-bottom: 5px">手术结果未选数据</label>
        <el-transfer :titles="['手术结果已选数据', '手术结果可选数据']" @change="rightChangeResult" v-model="tabList.resultValue"
                     :data="tabList.resultData"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tabList.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeData">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="tabList.dialogVisibleProject"
      width="40%"
      :close-on-click-modal='false'
      :lock-scroll='false'
      :show-close='false'>
      <div v-if="tabList.lessionProjectDia">
        <label style="margin-bottom: 5px">病变信息未选数据</label>
        <el-transfer :titles="['病变信息已选数据', '病变信息可选数据']" @left-check-change="leftChange($event)"
                     @change="changeLession($event)" @right-check-change="rightChangeLession($event)" :isradio=true
                     v-model="tabList.lessionProjectValue"
                     :data="tabList.lessionProjectData"/>
      </div>
      <div v-if="tabList.productProjectDia">
        <label style="margin-bottom: 5px">器材信息未选数据</label>
        <el-transfer :titles="['器材信息已选数据', '器材信息可选数据']" @left-check-change="leftChangeProduct($event)"
                     @change="changeProduct($event)" v-model="tabList.productProjectValue"
                     :data="tabList.productProjectData"/>
      </div>
      <div v-if="tabList.resultProjectDia">
        <label style="margin-bottom: 5px">手术结果未选数据</label>
        <el-transfer :titles="['手术结果已选数据', '手术结果可选数据']" @left-check-change="leftChangeResult($event)"
                     @change="changeResult($event)" v-model="tabList.resultProjectValue"
                     :data="tabList.resultProjectData"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tabList.dialogVisibleProject = false">取 消</el-button>
        <el-button type="primary" @click="closeDataProject">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import Api from '../../api'
  import {mapGetters, mapState} from 'vuex'
  import selectVo from '../../models/selectVo'
  import screenVo from '../../models/screenInfo'
  import ShowPage from '../../views/statistics/showPage' //
  import disShowFrom from '../../models/disabled' //
  export default {
    data () {
      const generateData = _ => {
        const data = []
        const lessions = ['病变标识', '血管段', '是否闭塞', '狭窄率', '支架内再狭窄', '单支类型', '长度范围',
          '血栓', '前向血流', '钙化', '分叉成角', '分叉(三叉)病变分型', '闭塞起始血管段', '钝型残端', '桥血管', '参照血管直径', '病变长度',
          '术前最小官腔直径', '狭窄程度', '术前参照血管直径', '术前病变长度', '术前狭窄程度', 'QCA术前最小官腔直径', '球囊预处理后狭窄程度',
          '球囊预处理后最小宫腔直径', '处理技术']
        lessions.forEach((lession, index) => {
          data.push({
            label: lession,
            key: index
          })
        })
        return data
      }
      const productData = _ => {
        const data = []
        const lessions = ['器材类别', '细分类别', '名称', '规格', '型号',
          '品牌厂家']
        lessions.forEach((lession, index) => {
          data.push({
            label: lession,
            key: index
          })
        })
        return data
      }
      const resultData = _ => {
        const data = []
        const lessions = ['手术号', '部位', '器材', 'TIMI血流']
        lessions.forEach((lession, index) => {
          data.push({
            label: lession,
            key: index
          })
        })
        return data
      }
      const generateProjectData = _ => {
        const data = []
        const lessions = ['是否闭塞', '狭窄率', '分支血管名', '支架内在狭窄', '病变类型', '闭塞时间', '闭塞之后逆向血管',
          '长度范围', '血栓', '前向血流', '钙化', '分叉病变分型', '三叉病变节段', '闭塞起始血管段', '钝型残端', '血管桥(病变中)', '参照血管直径',
          '病变长度', '术前最小官腔直径', '狭窄程度', '术前参照血管直径', '术前病变长度', '术前狭窄程度', 'QCA术前最小官腔直',
          '球囊预处理后狭窄', '球囊预处理后最小官腔直径', '处理技术', '有无分叉病变']
        // const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
        lessions.forEach((lession, index) => {
          data.push({
            label: lession,
            key: index
          })
        })
        return data
      }
      const productProjectData = _ => {
        const data = []
        const lessions = ['器材名称', '规格', '型号', '大类名称', '小类名称',
          '厂家品牌']
        lessions.forEach((lession, index) => {
          data.push({
            label: lession,
            key: index
          })
        })
        return data
      }
      const resultProjectData = _ => {
        const data = []
        const lessions = ['左主干球囊数', '左主干支架数', '前降支球囊数', '前降支支架数', '回旋支球囊数', '回旋支支架数', '右冠球囊数', '右冠支架数']
        lessions.forEach((lession, index) => {
          data.push({
            label: lession,
            key: index
          })
        })
        return data
      }
      return {
        tabList: {
          showPageNum: 1, // 筛选数据要显示的禁用表单
          lessionValue: [], // 弹出框病变
          lessionData: generateData(), // 弹出病变
          productData: productData(),
          productValue: [],
          resultData: resultData(),
          resultValue: [],
          lessionProjectValue: [],
          lessionProjectData: generateProjectData(),
          productProjectValue: [],
          productProjectData: productProjectData(),
          resultProjectValue: [],
          resultProjectData: resultProjectData(),
          dialogVisible: false,
          dialogVisibleProject: false,
          loading: false,
          pagesize: 10,
          page: 1,
          lessionPagesize: 10, // 病变信息
          lessionPage: 1,// 病变信息
          resultPagesize: 10,// 手术结果
          resultPage: 1,// 手术结果信息
          productPagesize: 10,// 器材信息
          productPage: 1,// 器材信息
          total: 0,
          totalLession: 0,
          totalResult: 0,
          totalProduct: 0,
          activeNames: ['1', '2', '3', '4', '5'],
          screenActiveNames: ['1', '2', '3'],
          openValue: false,
          tablePage: false,
          dataChart: false,
          openMoreValue: false,
          moreVal: false,
          selectTabPage: true, // 查询统计页面
          screenTabPage: false, // 筛选统计页面
          selectTabScreen: false,
          // 筛选页面，筛选条件显示隐藏
          surgeryOne: true,
          radioOne: true,
          lesionOne: true,
          surgeryTwo: true,
          equipmentTwo: true,
          showTabel: false, // 显示表格
          hideFrom: true, // 显示表单
          screenDis: true, // 筛选数据
          getScreen: true, // 筛选按钮
          screenShowPage: false, // 筛选数据显示
          statisticsVos: '', // 查询统计表
          lesionTab: false, // 病变表格
          resultTab: false, // 手术结果表格
          productTab: false, // 器材表格
          lessionDia: false,
          productDia: false,
          resultDia: false,
          lessionProjectDia: false,
          productProjectDia: false,
          resultProjectDia: false,
          productShow: false, // 器材
          labelList: [],
          screenDimensionality: '', // 筛选维度
          screenSelectInfo: '', // 筛选传入数据
          shuttle: [],
          shuttleProduct: [],
          shuttleResult: [],
          leftShuttle: [],
          shuttleInfo: [],
          shuttleProductInfo: [],
          shuttleResultInfo: [],
          listInfo: [], // 列表
          histogram: [], // 柱状图
          pieChart: [], // 饼状图
          sizeInfo: '10',
          sizeNum: '',
          // 数据项分组
          lesionInfos: '',
          productInfos: '',
          resultInfos: '',
          exportInfo: null, // 导出所有
          exportSuccee: null,
          statisticsVo: {
            surStartDateTime: '',
            // admitDateTime: '',
            // admitDateTimeTo: '',
            surStartDateTimeTo: '',
            param: ''
          },
          options: [{
            value: 'sex',
            label: '性别'
          }, {
            value: 'age',
            label: '年龄'
          }, {
            value: 'surStartDateTime',
            label: '手术日期'
          }, {
            value: 'surType',
            label: '手术类型'
          }, {
            value: 'doctorName',
            label: '医生'
          }, {
            value: 'GMType',
            label: '供血优势'
          }, {
            value: 'rCAFaYu',
            label: '血管发育'
          }, {
            value: 'radioGraphicResult',
            label: '造影结论'
          }, {
            value: 'isCto',
            label: '是否CTO'
          }, {
            value: 'largeClass',
            label: '器材大类'
          }, {
            value: 'manufacturerName',
            label: '厂家品牌'
          }, {
            value: 'support',
            label: '支架'
          }, {
            value: 'sacculus',
            label: '球囊'
          }, {
            value: 'fluPatientNum',
            label: '随访人数'
          }, {
            value: 'fluStatus',
            label: '随访情况'
          }],
        },
        selectVo: new selectVo(), // 查询信息
        scrVo: new screenVo(),
        disShowFrom: new disShowFrom(),
        equipmentList: {
          level: '',
          filters: []
        },
        tabData: [],
        tabDataAll: [],
        lessionTabData: [], // 病变信息
        resultTabData: [], // 手术结果信息
        productTabData: [], // 器材信息
        lessionTabDataAll: [], // 病变信息
        resultTabDataAll: [], // 手术结果信息
        patientTabDataAll: [], // 手术结果信息
        productTabDataAll: [], // 器材信息
        lessionGroup: [], // 病变信息分组
        resultGroup: [], // 手术结果信息分组
        productGroup: [], // 器材信息分组
        SmallClassInfo: '', // 器材小类ß
        // 字典获取
        dictionariesList: {},
        showInfoVo: '', // 显示的禁用信息
        showChartPie: false,
        showChartY: false,
        showChartS: false,
        showChartSd: false,
        showChartYS: false,
        comProductName1: []
      }
    },
    methods: {
      // 数据分页
      handleSizeChange (val) {
        this.tabList.pagesize = val
        this.getSelect()
      },
      handleCurrentChange (val) {
        this.tabList.page = val
        this.getSelect()
      },
      // 病变分页
      lessionHandleSizeChange (val) {
        this.tabList.lessionPagesize = val
        this.getSelect()
      },
      lessionHandleCurrentChange (val) {
        this.tabList.lessionPage = val
        this.getSelect()
      },
      // 手术结果分页
      resultHandleSizeChange (val) {
        this.tabList.resultPagesize = val
        this.getSelect()
      },
      resultHandleCurrentChange (val) {
        this.tabList.resultPage = val
        this.getSelect()
      },
      // 器材分页
      productHandleSizeChange (val) {
        this.tabList.productPagesize = val
        this.getSelect()
      },
      productHandleCurrentChange (val) {
        this.tabList.productPage = val
        this.getSelect()
      },
      // 查询
      getSelect (currentPage) {
        let voArr = []
        // ---------手术基本信息---------
        if (this.selectVo.BMI !== '') {
          if (this.selectVo.BMI === '<=18.4' || this.selectVo.BMI === '>=28.0') {
            // BMI
            let BMI = [{
              type: 'FILTER',
              tablename: 'TEV_PV1',
              filtername: 'BMI',
              operater: '',
              filtervalue: this.selectVo.BMI
            }]
            voArr.push(BMI)
            this.equipmentList.filters = voArr
          } else if (this.selectVo.BMI === '18.5-23.9' || this.selectVo.BMI === '24.0-27.9') {
            // BMI
            let BMI = [{
              type: 'FILTER',
              tablename: 'TEV_PV1',
              filtername: 'BMI',
              operater: 'between',
              filtervalue: this.selectVo.BMI
            }]
            voArr.push(BMI)
            this.equipmentList.filters = voArr
          }
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.tb !== '' && this.selectVo.tb !== 0 && this.selectVo.tb !== undefined) {
          // 体表面积
          let tb = [{
            type: 'FILTER',
            tablename: 'TEV_PV1',
            filtername: 'tb',
            operater: '>=',
            filtervalue: this.selectVo.tb
          }]
          voArr.push(tb)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.tbTo !== '' && this.selectVo.tbTo !== 0 && this.selectVo.tbTo !== undefined) {
          // 体表面积
          let tbTo = [{
            type: 'FILTER',
            tablename: 'TEV_PV1',
            filtername: 'tb',
            operater: '<=',
            filtervalue: this.selectVo.tbTo
          }]
          voArr.push(tbTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.SurType.length > 0) {
          // 手术类型
          let SurTypeInfo = this.selectVo.SurType
          SurTypeInfo = '\'' + SurTypeInfo.join('\',\'') + '\''
          let SurType = [{
            type: 'FILTER',
            tablename: 'SURBASEINFO',
            filtername: 'SurType',
            operater: 'in',
            filtervalue: SurTypeInfo
          }]
          voArr.push(SurType)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.SurStartDateTime !== '') {
          // 手术日期开始
          let SurStartDateTime = [{
            type: 'FILTER',
            tablename: 'TEV_PV1',
            filtername: 'SurStartDateTime',
            operater: '>=',
            filtervalue: this.selectVo.SurStartDateTime
          }]
          voArr.push(SurStartDateTime)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.SurStartDateTimeTo !== '') {
          // 手术日期结束
          let SurStartDateTimeTo = [{
            type: 'FILTER',
            tablename: 'TEV_PV1',
            filtername: 'SurStartDateTime',
            operater: '<=',
            filtervalue: this.selectVo.SurStartDateTimeTo
          }]
          voArr.push(SurStartDateTimeTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.ageTemp !== '' && this.selectVo.ageTemp !== 0 && this.selectVo.ageTemp !== undefined) {
          // 年龄开始
          let ageTemp = [{
            type: 'FILTER',
            tablename: 'AGE',
            filtername: 'ageTemp',
            operater: '>=',
            filtervalue: this.selectVo.ageTemp
          }]
          voArr.push(ageTemp)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.ageTempTo !== '' && this.selectVo.ageTempTo !== 0 && this.selectVo.ageTempTo !== undefined) {
          // 年龄结束
          let ageTempTo = [{
            type: 'FILTER',
            tablename: 'AGE',
            filtername: 'ageTemp',
            operater: '<=',
            filtervalue: this.selectVo.ageTempTo
          }]
          voArr.push(ageTempTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        // ---------造影信息-------------
        if (this.selectVo.GMType !== '') {
          // 供血优势
          let GMType = [{
            type: 'FILTER',
            tablename: 'SURRADIOGRAPHIC',
            filtername: 'GMType',
            operater: '=',
            filtervalue: this.selectVo.GMType
          }]
          voArr.push(GMType)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.LCAFaYu !== '') {
          // 左冠状动脉发育
          let LCAFaYu = [{
            type: 'FILTER',
            tablename: 'SURRADIOGRAPHIC',
            filtername: 'LCAFaYu',
            operater: '=',
            filtervalue: this.selectVo.LCAFaYu
          }]
          voArr.push(LCAFaYu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.RCAFaYu !== '') {
          // 右冠状动脉发育
          let RCAFaYu = [{
            type: 'FILTER',
            tablename: 'SURRADIOGRAPHIC',
            filtername: 'RCAFaYu',
            operater: '=',
            filtervalue: this.selectVo.RCAFaYu
          }]
          voArr.push(RCAFaYu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Jiwangzhijiaying.length > 0) {
          // 支架影位置
          let JiwangzhijiayingInfo = this.selectVo.Jiwangzhijiaying
          JiwangzhijiayingInfo = '\'' + JiwangzhijiayingInfo.join('\',\'') + '\''
          let Jiwangzhijiaying = [{
            type: 'FILTER',
            tablename: 'SURRADIOGRAPHIC',
            filtername: 'Jiwangzhijiaying',
            operater: 'in',
            filtervalue: JiwangzhijiayingInfo
          }]
          voArr.push(Jiwangzhijiaying)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.BridgeVascular === '静脉桥') {
          // 桥血管
          let BridgeVascular = [{
            type: 'FILTER',
            tablename: 'surbridgeinfo',
            filtername: 'BridgeEnd',
            operater: 'like',
            filtervalue: 'SVG'
          }]
          voArr.push(BridgeVascular)
          this.equipmentList.filters = voArr
        } else if (this.selectVo.BridgeVascular === '动脉桥') {
          let brArr = [
            {
              type: 'FILTER',
              tablename: 'surbridgeinfo',
              filtername: 'BridgeEnd',
              operater: 'like',
              filtervalue: 'IMA'
            },
            {
              type: 'FILTER',
              tablename: 'surbridgeinfo',
              filtername: 'BridgeEnd',
              operater: 'like',
              filtervalue: 'RIDIAL'
            },
            {
              type: 'FILTER',
              tablename: 'surbridgeinfo',
              filtername: 'BridgeEnd',
              operater: 'like',
              filtervalue: '肠系膜动脉'
            }
          ]
          voArr.push(brArr)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.RadioGraphicResult.length > 0) {
          // 造影结论
          let RadioGraphicResultInfo = this.selectVo.RadioGraphicResult
          let arr = [[]]
          for (var i = 0; i < RadioGraphicResultInfo.length; i++) {
            let obj = {
              type: 'FILTER',
              tablename: 'SURRADIOGRAPHIC',
              filtername: 'RadioGraphicResult',
              operater: 'like',
              filtervalue: ''
            }
            obj.filtervalue = RadioGraphicResultInfo[i]
            //  一定要在循环体内部创建空对象，每循环一次就创建一个 如果在外部申请对象，得到的永远只有一个
            arr[0].push(obj)
            this.equipmentList.filters.push(arr[0])
          }
          // RadioGraphicResultInfo = '\'' + RadioGraphicResultInfo.join('\',\'') + '\''
        } else {
          this.equipmentList.filters = voArr
        }
        // 病变信息查询数据
        if (this.selectVo.MainLocationFrom.length > 0) {
          // 血管位置
          let MainLocationFromInfo = this.selectVo.MainLocationFrom
          MainLocationFromInfo = MainLocationFromInfo.join(',')
          let MainLocationFrom = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'MainLocationFrom',
            operater: 'likein',
            filtervalue: MainLocationFromInfo
          }]
          voArr.push(MainLocationFrom)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Quanbise !== '') {
          //  是否闭塞
          let Quanbise = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Quanbise',
            operater: '=',
            filtervalue: this.selectVo.Quanbise
          }]
          voArr.push(Quanbise)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.XiazhailvFrom !== '' && this.selectVo.XiazhailvFrom !== 0 && this.selectVo.XiazhailvFrom !== undefined) {
          //  狭窄率
          let XiazhailvFrom = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'XiazhailvFrom',
            operater: '>=',
            filtervalue: this.selectVo.XiazhailvFrom
          }]
          voArr.push(XiazhailvFrom)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.XiazhailvTo !== '' && this.selectVo.XiazhailvTo !== 0 && this.selectVo.XiazhailvTo !== undefined) {
          //  狭窄率
          let XiazhailvTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'XiazhailvTo',
            operater: '<=',
            filtervalue: this.selectVo.XiazhailvTo
          }]
          voArr.push(XiazhailvTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.FenzhiName !== '') {
          // 分支血管名称
          let FenzhiName = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'FenzhiName',
            operater: '=',
            filtervalue: this.selectVo.FenzhiName
          }]
          voArr.push(FenzhiName)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Zhijianeizaixiazhai !== '') {
          // 支架内在狭窄
          let Zhijianeizaixiazhai = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Zhijianeizaixiazhai',
            operater: '=',
            filtervalue: this.selectVo.Zhijianeizaixiazhai
          }]
          voArr.push(Zhijianeizaixiazhai)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.lesionsType.length > 0) {
          // 病变类型
          let lesionsTypeInfo = this.selectVo.lesionsType
          lesionsTypeInfo = '\'' + lesionsTypeInfo.join('\',\'') + '\''
          let lesionsType = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'NoFenchaType',
            operater: 'in',
            filtervalue: lesionsTypeInfo
          }]
          voArr.push(lesionsType)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.BiseTime.length > 0) {
          // 闭塞时间
          let BiseTimeInfo = this.selectVo.BiseTime
          BiseTimeInfo = '\'' + BiseTimeInfo.join('\',\'') + '\''
          let BiseTime = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'BiseTime',
            operater: 'in',
            filtervalue: BiseTimeInfo
          }]
          voArr.push(BiseTime)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Bisehounixiangxueliu.length > 0) {
          // 闭塞之后逆向血管
          let BisehounixiangxueliuInfo = this.selectVo.Bisehounixiangxueliu
          BisehounixiangxueliuInfo = '\'' + BisehounixiangxueliuInfo.join('\',\'') + '\''
          let Bisehounixiangxueliu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Bisehounixiangxueliu',
            operater: 'in',
            filtervalue: BisehounixiangxueliuInfo
          }]
          voArr.push(Bisehounixiangxueliu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.LengthFanwei.length > 0) {
          // 长度范围
          let infoFanwei = this.selectVo.LengthFanwei
          infoFanwei = '\'' + infoFanwei.join('\',\'') + '\''
          let LengthFanwei = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'LengthFanwei',
            operater: 'in',
            filtervalue: infoFanwei
          }]
          voArr.push(LengthFanwei)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Xueshuan !== '') {
          // 血栓
          let Xueshuan = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Xueshuan',
            operater: '=',
            filtervalue: this.selectVo.Xueshuan
          }]
          voArr.push(Xueshuan)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Qianxiangxueliu.length > 0) {
          // 前向血流
          let QianxiangxueliuInfo = this.selectVo.Qianxiangxueliu
          QianxiangxueliuInfo = '\'' + QianxiangxueliuInfo.join('\',\'') + '\''
          let Qianxiangxueliu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qianxiangxueliu',
            operater: 'in',
            filtervalue: QianxiangxueliuInfo
          }]
          voArr.push(Qianxiangxueliu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Gaihua.length > 0) {
          // 钙化
          let GaihuaInfo = this.selectVo.Gaihua
          GaihuaInfo = '\'' + GaihuaInfo.join('\',\'') + '\''
          let Gaihua = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Gaihua',
            operater: 'in',
            filtervalue: GaihuaInfo
          }]
          voArr.push(Gaihua)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Shuangfencha.length > 0) {
          // 分叉病变分型
          let ShuangfenchaInfo = this.selectVo.Shuangfencha
          ShuangfenchaInfo = '\'' + ShuangfenchaInfo.join('\',\'') + '\''
          let Shuangfencha = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Shuangfencha',
            operater: 'in',
            filtervalue: ShuangfenchaInfo
          }]
          voArr.push(Shuangfencha)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Sanfenchabingbian.length > 0) {
          // 三叉病变节段
          let SanfenchabingbianInfo = this.selectVo.Sanfenchabingbian
          SanfenchabingbianInfo = '\'' + SanfenchabingbianInfo.join('\',\'') + '\''
          let Sanfenchabingbian = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Sanfenchabingbian',
            operater: 'in',
            filtervalue: SanfenchabingbianInfo
          }]
          voArr.push(Sanfenchabingbian)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.LocationFrom.length > 0) {
          // 闭塞起始血管段
          let LocationFromInfo = this.selectVo.LocationFrom
          LocationFromInfo = '\'' + LocationFromInfo.join('\',\'') + '\''
          let LocationFrom = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'LocationFrom',
            operater: 'in',
            filtervalue: LocationFromInfo
          }]
          voArr.push(LocationFrom)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Dunxingcanduan !== '') {
          // 钝型残端
          let Dunxingcanduan = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Dunxingcanduan',
            operater: '=',
            filtervalue: this.selectVo.Dunxingcanduan
          }]
          voArr.push(Dunxingcanduan)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Qiaoxueguan !== '') {
          // 血管桥(病变中)
          let Qiaoxueguan = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qiaoxueguan',
            operater: '=',
            filtervalue: this.selectVo.Qiaoxueguan
          }]
          voArr.push(Qiaoxueguan)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.canzhaoxueguanzhijing !== '' && this.selectVo.canzhaoxueguanzhijing !== 0 && this.selectVo.canzhaoxueguanzhijing !== undefined) {
          //  参照血管直径开始
          let canzhaoxueguanzhijing = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'canzhaoxueguanzhijing',
            operater: '>=',
            filtervalue: this.selectVo.canzhaoxueguanzhijing
          }]
          voArr.push(canzhaoxueguanzhijing)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.canzhaoxueguanzhijingTo !== '' && this.selectVo.canzhaoxueguanzhijingTo !== 0 && this.selectVo.canzhaoxueguanzhijingTo !== undefined) {
          //  参照血管直径结束
          let canzhaoxueguanzhijingTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'canzhaoxueguanzhijing',
            operater: '<=',
            filtervalue: this.selectVo.canzhaoxueguanzhijingTo
          }]
          voArr.push(canzhaoxueguanzhijingTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.bingbianchangdu !== '' && this.selectVo.bingbianchangdu !== 0 && this.selectVo.bingbianchangdu !== undefined) {
          //  病变长度开始
          let bingbianchangdu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'bingbianchangdu',
            operater: '>=',
            filtervalue: this.selectVo.bingbianchangdu
          }]
          voArr.push(bingbianchangdu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.bingbianchangduTo !== '' && this.selectVo.bingbianchangduTo !== 0 && this.selectVo.bingbianchangduTo !== undefined) {
          //  病变长度结束
          let bingbianchangduTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'bingbianchangdu',
            operater: '<=',
            filtervalue: this.selectVo.bingbianchangduTo
          }]
          voArr.push(bingbianchangduTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.shuqianminguanqiangzhijing !== '' && this.selectVo.shuqianminguanqiangzhijing !== 0 && this.selectVo.shuqianminguanqiangzhijing !== undefined) {
          //  术前最小官腔直径开始
          let shuqianminguanqiangzhijing = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'shuqianminguanqiangzhijing',
            operater: '>=',
            filtervalue: this.selectVo.shuqianminguanqiangzhijing
          }]
          voArr.push(shuqianminguanqiangzhijing)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.shuqianminguanqiangzhijingTo !== '' && this.selectVo.shuqianminguanqiangzhijingTo !== 0 && this.selectVo.shuqianminguanqiangzhijingTo !== undefined) {
          //  术前最小官腔直径结束
          let shuqianminguanqiangzhijingTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'shuqianminguanqiangzhijing',
            operater: '<=',
            filtervalue: this.selectVo.shuqianminguanqiangzhijingTo
          }]
          voArr.push(shuqianminguanqiangzhijingTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.xiazhaichengdu !== '' && this.selectVo.xiazhaichengdu !== 0 && this.selectVo.xiazhaichengdu !== undefined) {
          //  狭窄程度开始
          let xiazhaichengdu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'xiazhaichengdu',
            operater: '>=',
            filtervalue: this.selectVo.xiazhaichengdu
          }]
          voArr.push(xiazhaichengdu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.xiazhaichengduTo !== '' && this.selectVo.xiazhaichengduTo !== 0 && this.selectVo.xiazhaichengduTo !== undefined) {
          //  狭窄程度结束
          let xiazhaichengduTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'xiazhaichengdu',
            operater: '<=',
            filtervalue: this.selectVo.xiazhaichengduTo
          }]
          voArr.push(xiazhaichengduTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Qcaxuaguanzhijing !== '' && this.selectVo.Qcaxuaguanzhijing !== 0 && this.selectVo.Qcaxuaguanzhijing !== undefined) {
          //  术前参照血管直径开始
          let Qcaxuaguanzhijing = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'shuqianminguanqiangzhijing',
            operater: '>=',
            filtervalue: this.selectVo.Qcaxuaguanzhijing
          }]
          voArr.push(Qcaxuaguanzhijing)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.QcaxuaguanzhijingTo !== '' && this.selectVo.QcaxuaguanzhijingTo !== 0 && this.selectVo.QcaxuaguanzhijingTo !== undefined) {
          //  术前参照血管直径结束
          let QcaxuaguanzhijingTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'shuqianminguanqiangzhijing',
            operater: '<=',
            filtervalue: this.selectVo.QcaxuaguanzhijingTo
          }]
          voArr.push(QcaxuaguanzhijingTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Qcabingbianchangdu !== '' && this.selectVo.Qcabingbianchangdu !== 0 && this.selectVo.Qcabingbianchangdu !== undefined) {
          //  术前病变长度开始
          let Qcabingbianchangdu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcabingbianchangdu',
            operater: '>=',
            filtervalue: this.selectVo.Qcabingbianchangdu
          }]
          voArr.push(Qcabingbianchangdu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.QcabingbianchangduTo !== '' && this.selectVo.QcabingbianchangduTo !== 0 && this.selectVo.QcabingbianchangduTo !== undefined) {
          //  术前病变长度结束
          let QcabingbianchangduTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcabingbianchangdu',
            operater: '<=',
            filtervalue: this.selectVo.QcabingbianchangduTo
          }]
          voArr.push(QcabingbianchangduTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Qcaxiazhai !== '' && this.selectVo.Qcaxiazhai !== 0 && this.selectVo.Qcaxiazhai !== undefined) {
          //  术前狭窄程度开始
          let Qcaxiazhai = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaxiazhai',
            operater: '>=',
            filtervalue: this.selectVo.Qcaxiazhai
          }]
          voArr.push(Qcaxiazhai)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.QcaxiazhaiTo !== '' && this.selectVo.QcaxiazhaiTo !== 0 && this.selectVo.QcaxiazhaiTo !== undefined) {
          //  术前狭窄程度结束
          let QcaxiazhaiTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaxiazhai',
            operater: '<=',
            filtervalue: this.selectVo.QcaxiazhaiTo
          }]
          voArr.push(QcaxiazhaiTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Qcaminzhijing !== '' && this.selectVo.Qcaminzhijing !== 0 && this.selectVo.Qcaminzhijing !== undefined) {
          //  QCA术前最小官腔直径开始
          let Qcaminzhijing = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaminzhijing',
            operater: '>=',
            filtervalue: this.selectVo.Qcaminzhijing
          }]
          voArr.push(Qcaminzhijing)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.QcaminzhijingTo !== '' && this.selectVo.QcaminzhijingTo !== 0 && this.selectVo.QcaminzhijingTo !== undefined) {
          //  QCA术前最小官腔直径结束
          let QcaminzhijingTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaminzhijing',
            operater: '<=',
            filtervalue: this.selectVo.QcaminzhijingTo
          }]
          voArr.push(QcaminzhijingTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Qcaafterxiazhaichengdu !== '' && this.selectVo.Qcaafterxiazhaichengdu !== 0 && this.selectVo.Qcaafterxiazhaichengdu !== undefined) {
          //  球囊预处理后狭窄程度开始
          let Qcaafterxiazhaichengdu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaafterxiazhaichengdu',
            operater: '>=',
            filtervalue: this.selectVo.Qcaafterxiazhaichengdu
          }]
          voArr.push(Qcaafterxiazhaichengdu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.QcaafterxiazhaichengduTo !== '' && this.selectVo.QcaafterxiazhaichengduTo !== 0 && this.selectVo.QcaafterxiazhaichengduTo !== undefined) {
          //  球囊预处理后狭窄程度结束
          let QcaafterxiazhaichengduTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaafterxiazhaichengdu',
            operater: '<=',
            filtervalue: this.selectVo.QcaafterxiazhaichengduTo
          }]
          voArr.push(QcaafterxiazhaichengduTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Qcaafterminzhijing !== '' && this.selectVo.Qcaafterminzhijing !== 0 && this.selectVo.Qcaafterminzhijing !== undefined) {
          //  球囊预处理后最小官腔直径开始
          let Qcaafterminzhijing = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaafterminzhijing',
            operater: '>=',
            filtervalue: this.selectVo.Qcaafterminzhijing
          }]
          voArr.push(Qcaafterminzhijing)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.QcaafterminzhijingTo !== '' && this.selectVo.QcaafterminzhijingTo !== 0 && this.selectVo.QcaafterminzhijingTo !== undefined) {
          //  球囊预处理后最小官腔直径结束
          let QcaafterminzhijingTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaafterminzhijing',
            operater: '<=',
            filtervalue: this.selectVo.QcaafterminzhijingTo
          }]
          voArr.push(QcaafterminzhijingTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.Chulijishu.length > 0) {
          //  处理技术
          let ChulijishuInfo = this.selectVo.Chulijishu
          ChulijishuInfo = '\'' + ChulijishuInfo.join('\',\'') + '\''
          let Chulijishu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Chulijishu',
            operater: 'in',
            filtervalue: ChulijishuInfo
          }]
          voArr.push(Chulijishu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.NoFenchaType === '有') {
          //  有无分叉病变（数据库填了就是没有分叉
          let NoFenchaType = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'NoFenchaType',
            operater: '!=',
            filtervalue: ""
          }]
          voArr.push(NoFenchaType)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.NoFenchaType === '无') {
          //  有无分叉病变（数据库填了就是没有分叉
          let NoFenchaType = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'NoFenchaType',
            operater: '=',
            filtervalue: ""
          }]
          voArr.push(NoFenchaType)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        // ----------手术结果查询数据--------
        if (this.selectVo.LeftTrunkBalloon !== '' && this.selectVo.LeftTrunkBalloon !== 0 && this.selectVo.LeftTrunkBalloon !== undefined) {
          //  左主干球囊数开始
          let LeftTrunkBalloon = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'LeftTrunkBalloon',
            operater: '>||<',
            filtervalue: 'LMT,球囊,' + this.selectVo.LeftTrunkBalloon + ',' + this.selectVo.LeftTrunkBalloonTo
          }]
          voArr.push(LeftTrunkBalloon)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.LeftMainSupport !== '' && this.selectVo.LeftMainSupport !== 0 && this.selectVo.LeftMainSupport !== undefined) {
          //  左主干支架数开始
          let LeftMainSupport = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'LeftMainSupport',
            operater: '>||<',
            filtervalue: 'LMT,支架,' + this.selectVo.LeftMainSupport + ',' + this.selectVo.LeftMainSupportTo
          }]
          voArr.push(LeftMainSupport)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.AnteriorDescendingBalloon !== '' && this.selectVo.AnteriorDescendingBalloon !== 0 && this.selectVo.AnteriorDescendingBalloon !== undefined) {
          //  前降支球囊数开始
          let AnteriorDescendingBalloon = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'AnteriorDescendingBalloon',
            operater: '>||<',
            filtervalue: 'LAD,球囊,' + this.selectVo.AnteriorDescendingBalloon + ',' + this.selectVo.LeftMainSupportTo
          }]
          voArr.push(AnteriorDescendingBalloon)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.AnteriorDescendingSupport !== '' && this.selectVo.AnteriorDescendingSupport !== 0 && this.selectVo.AnteriorDescendingSupport !== undefined) {
          //  前降支支架数开始
          let AnteriorDescendingSupport = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'AnteriorDescendingSupport',
            operater: '>||<',
            filtervalue: 'LAD,支架,' + this.selectVo.AnteriorDescendingSupport + ',' + this.selectVo.AnteriorDescendingSupportTo
          }]
          voArr.push(AnteriorDescendingSupport)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.CyclotronBalloon !== '' && this.selectVo.CyclotronBalloon !== 0 && this.selectVo.CyclotronBalloon !== undefined) {
          //  回旋支球囊数开始
          let CyclotronBalloon = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'CyclotronBalloon',
            operater: '>||<',
            filtervalue: 'LCX,球囊,' + this.selectVo.CyclotronBalloon + ',' + this.selectVo.CyclotronBalloonTo
          }]
          voArr.push(CyclotronBalloon)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.CyclotronSupport !== '' && this.selectVo.CyclotronSupport !== 0 && this.selectVo.CyclotronSupport !== undefined) {
          //  回旋支支架数开始
          let CyclotronSupport = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'CyclotronSupport',
            operater: '>||<',
            filtervalue: 'LCX,支架,' + this.selectVo.CyclotronSupport + ',' + this.selectVo.CyclotronSupportTo
          }]
          voArr.push(CyclotronSupport)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.RightCoronaryBalloon !== '' && this.selectVo.RightCoronaryBalloon !== 0 && this.selectVo.RightCoronaryBalloon !== undefined) {
          //  右冠球囊数开始
          let RightCoronaryBalloon = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'RightCoronaryBalloon',
            operater: '>||<',
            filtervalue: 'RCA,球囊,' + this.selectVo.RightCoronaryBalloon + ',' + this.selectVo.RightCoronaryBalloonTo
          }]
          voArr.push(RightCoronaryBalloon)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.RightCoronarySupport !== '' && this.selectVo.RightCoronarySupport !== 0 && this.selectVo.RightCoronarySupport !== undefined) {
          //  右冠支架数开始
          let RightCoronarySupport = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'RightCoronaryBalloon',
            operater: '>||<',
            filtervalue: 'RCA,支架,' + this.selectVo.RightCoronarySupport + ',' + this.selectVo.RightCoronaryBalloonTo
          }]
          voArr.push(RightCoronarySupport)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        // 器材信息查询数据
        // ---------器材信息---------
        if (this.selectVo.ProductName !== '') {
          // 器材名称
          let ProductName = [{
            type: 'FILTER',
            tablename: 'stkproduct',
            filtername: 'ProductName',
            operater: '=',
            filtervalue: this.selectVo.ProductName
          }]
          voArr.push(ProductName)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.ProductModel !== '') {
          //  型号
          let ProductModel = [{
            type: 'FILTER',
            tablename: 'stkproduct',
            filtername: 'ProductModel',
            operater: '=',
            filtervalue: this.selectVo.ProductModel
          }]
          voArr.push(ProductModel)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.ProductStyle !== '') {
          //  规格
          let ProductStyle = [{
            type: 'FILTER',
            tablename: 'stkproduct',
            filtername: 'ProductStyle',
            operater: '=',
            filtervalue: this.selectVo.ProductStyle
          }]
          voArr.push(ProductStyle)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.LargeClass.length > 0) {
          // 大类别
          let LargeClassInfo = this.selectVo.LargeClass
          LargeClassInfo = '\'' + LargeClassInfo.join('\',\'') + '\''
          let LargeClass = [{
            type: 'FILTER',
            tablename: 'stkproduct',
            filtername: 'LargeClass',
            operater: 'in',
            filtervalue: LargeClassInfo
          }]
          voArr.push(LargeClass)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.SmallClass.length > 0) {
          // 小类别
          let SmallClassInfo = this.selectVo.SmallClass
          SmallClassInfo = '\'' + SmallClassInfo.join('\',\'') + '\''
          let SmallClass = [{
            type: 'FILTER',
            tablename: 'stkproduct',
            filtername: 'SmallClass',
            operater: 'in',
            filtervalue: SmallClassInfo
          }]
          voArr.push(SmallClass)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.selectVo.providername.length > 0) {
          // 厂家
          let ProvidernameInfo = this.selectVo.providername
          ProvidernameInfo = '\'' + ProvidernameInfo.join('\',\'') + '\''
          let providername = [{
            type: 'FILTER',
            tablename: 'stkprovider',
            filtername: 'providername',
            operater: 'in',
            filtervalue: ProvidernameInfo
          }]
          voArr.push(providername)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.MainLocationFrom.length > 0) {
// 血管位置
          let MainLocationFromInfo = this.scrVo.MainLocationFrom
          MainLocationFromInfo = MainLocationFromInfo.join(',')
          let MainLocationFrom = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'MainLocationFrom',
            operater: 'likein',
            filtervalue: MainLocationFromInfo
          }]
          voArr.push(MainLocationFrom)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Quanbise !== '') {
//  是否闭塞
          let Quanbise = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Quanbise',
            operater: '=',
            filtervalue: this.scrVo.Quanbise
          }]
          voArr.push(Quanbise)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.XiazhailvFrom !== '' && this.scrVo.XiazhailvFrom !== 0 && this.scrVo.XiazhailvFrom !== undefined) {
//  狭窄率
          let XiazhailvFrom = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'XiazhailvFrom',
            operater: '>=',
            filtervalue: this.scrVo.XiazhailvFrom
          }]
          voArr.push(XiazhailvFrom)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.XiazhailvTo !== '' && this.scrVo.XiazhailvTo !== 0 && this.scrVo.XiazhailvTo !== undefined) {
//  狭窄率
          let XiazhailvTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'XiazhailvTo',
            operater: '<=',
            filtervalue: this.scrVo.XiazhailvTo
          }]
          voArr.push(XiazhailvTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.FenzhiName !== '') {
// 分支血管名称
          let FenzhiName = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'FenzhiName',
            operater: '=',
            filtervalue: this.scrVo.FenzhiName
          }]
          voArr.push(FenzhiName)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Zhijianeizaixiazhai !== '') {
// 支架内在狭窄
          let Zhijianeizaixiazhai = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Zhijianeizaixiazhai',
            operater: '=',
            filtervalue: this.scrVo.Zhijianeizaixiazhai
          }]
          voArr.push(Zhijianeizaixiazhai)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.lesionsType.length > 0) {
// 病变类型
          let lesionsTypeInfo = this.scrVo.lesionsType
          lesionsTypeInfo = '\'' + lesionsTypeInfo.join('\',\'') + '\''
          let lesionsType = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'NoFenchaType',
            operater: 'in',
            filtervalue: lesionsTypeInfo
          }]
          voArr.push(lesionsType)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.BiseTime.length > 0) {
// 闭塞时间
          let BiseTimeInfo = this.scrVo.BiseTime
          BiseTimeInfo = '\'' + BiseTimeInfo.join('\',\'') + '\''
          let BiseTime = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'BiseTime',
            operater: 'in',
            filtervalue: BiseTimeInfo
          }]
          voArr.push(BiseTime)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Bisehounixiangxueliu.length > 0) {
// 闭塞之后逆向血管
          let BisehounixiangxueliuInfo = this.scrVo.Bisehounixiangxueliu
          BisehounixiangxueliuInfo = '\'' + BisehounixiangxueliuInfo.join('\',\'') + '\''
          let Bisehounixiangxueliu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Bisehounixiangxueliu',
            operater: 'in',
            filtervalue: BisehounixiangxueliuInfo
          }]
          voArr.push(Bisehounixiangxueliu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.LengthFanwei.length > 0) {
// 长度范围
          let infoFanwei = this.scrVo.LengthFanwei
          infoFanwei = '\'' + infoFanwei.join('\',\'') + '\''
          let LengthFanwei = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'LengthFanwei',
            operater: 'in',
            filtervalue: infoFanwei
          }]
          voArr.push(LengthFanwei)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Xueshuan !== '') {
// 血栓
          let Xueshuan = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Xueshuan',
            operater: '=',
            filtervalue: this.scrVo.Xueshuan
          }]
          voArr.push(Xueshuan)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Qianxiangxueliu.length > 0) {
// 前向血流
          let QianxiangxueliuInfo = this.scrVo.Qianxiangxueliu
          QianxiangxueliuInfo = '\'' + QianxiangxueliuInfo.join('\',\'') + '\''
          let Qianxiangxueliu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qianxiangxueliu',
            operater: 'in',
            filtervalue: QianxiangxueliuInfo
          }]
          voArr.push(Qianxiangxueliu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Gaihua.length > 0) {
// 钙化
          let GaihuaInfo = this.scrVo.Gaihua
          GaihuaInfo = '\'' + GaihuaInfo.join('\',\'') + '\''
          let Gaihua = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Gaihua',
            operater: 'in',
            filtervalue: GaihuaInfo
          }]
          voArr.push(Gaihua)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Shuangfencha.length > 0) {
// 分叉病变分型
          let ShuangfenchaInfo = this.scrVo.Shuangfencha
          ShuangfenchaInfo = '\'' + ShuangfenchaInfo.join('\',\'') + '\''
          let Shuangfencha = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Shuangfencha',
            operater: 'in',
            filtervalue: ShuangfenchaInfo
          }]
          voArr.push(Shuangfencha)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Sanfenchabingbian.length > 0) {
// 三叉病变节段
          let SanfenchabingbianInfo = this.scrVo.Sanfenchabingbian
          SanfenchabingbianInfo = '\'' + SanfenchabingbianInfo.join('\',\'') + '\''
          let Sanfenchabingbian = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Sanfenchabingbian',
            operater: 'in',
            filtervalue: SanfenchabingbianInfo
          }]
          voArr.push(Sanfenchabingbian)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.LocationFrom.length > 0) {
// 闭塞起始血管段
          let LocationFromInfo = this.scrVo.LocationFrom
          LocationFromInfo = '\'' + LocationFromInfo.join('\',\'') + '\''
          let LocationFrom = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'LocationFrom',
            operater: 'in',
            filtervalue: LocationFromInfo
          }]
          voArr.push(LocationFrom)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Dunxingcanduan !== '') {
// 钝型残端
          let Dunxingcanduan = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Dunxingcanduan',
            operater: '=',
            filtervalue: this.scrVo.Dunxingcanduan
          }]
          voArr.push(Dunxingcanduan)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Qiaoxueguan !== '') {
// 血管桥(病变中)
          let Qiaoxueguan = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qiaoxueguan',
            operater: '=',
            filtervalue: this.scrVo.Qiaoxueguan
          }]
          voArr.push(Qiaoxueguan)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.canzhaoxueguanzhijing !== '' && this.scrVo.canzhaoxueguanzhijing !== 0 && this.scrVo.canzhaoxueguanzhijing !== undefined) {
//  参照血管直径开始
          let canzhaoxueguanzhijing = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'canzhaoxueguanzhijing',
            operater: '>=',
            filtervalue: this.scrVo.canzhaoxueguanzhijing
          }]
          voArr.push(canzhaoxueguanzhijing)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.canzhaoxueguanzhijingTo !== '' && this.scrVo.canzhaoxueguanzhijingTo !== 0 && this.scrVo.canzhaoxueguanzhijingTo !== undefined) {
//  参照血管直径结束
          let canzhaoxueguanzhijingTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'canzhaoxueguanzhijing',
            operater: '<=',
            filtervalue: this.scrVo.canzhaoxueguanzhijingTo
          }]
          voArr.push(canzhaoxueguanzhijingTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.bingbianchangdu !== '' && this.scrVo.bingbianchangdu !== 0 && this.scrVo.bingbianchangdu !== undefined) {
//  病变长度开始
          let bingbianchangdu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'bingbianchangdu',
            operater: '>=',
            filtervalue: this.scrVo.bingbianchangdu
          }]
          voArr.push(bingbianchangdu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.bingbianchangduTo !== '' && this.scrVo.bingbianchangduTo !== 0 && this.scrVo.bingbianchangduTo !== undefined) {
//  病变长度结束
          let bingbianchangduTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'bingbianchangdu',
            operater: '<=',
            filtervalue: this.scrVo.bingbianchangduTo
          }]
          voArr.push(bingbianchangduTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.shuqianminguanqiangzhijing !== '' && this.scrVo.shuqianminguanqiangzhijing !== 0 && this.scrVo.shuqianminguanqiangzhijing !== undefined) {
//  术前最小官腔直径开始
          let shuqianminguanqiangzhijing = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'shuqianminguanqiangzhijing',
            operater: '>=',
            filtervalue: this.scrVo.shuqianminguanqiangzhijing
          }]
          voArr.push(shuqianminguanqiangzhijing)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.shuqianminguanqiangzhijingTo !== '' && this.scrVo.shuqianminguanqiangzhijingTo !== 0 && this.scrVo.shuqianminguanqiangzhijingTo !== undefined) {
//  术前最小官腔直径结束
          let shuqianminguanqiangzhijingTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'shuqianminguanqiangzhijing',
            operater: '<=',
            filtervalue: this.scrVo.shuqianminguanqiangzhijingTo
          }]
          voArr.push(shuqianminguanqiangzhijingTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.xiazhaichengdu !== '' && this.scrVo.xiazhaichengdu !== 0 && this.scrVo.xiazhaichengdu !== undefined) {
//  狭窄程度开始
          let xiazhaichengdu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'xiazhaichengdu',
            operater: '>=',
            filtervalue: this.scrVo.xiazhaichengdu
          }]
          voArr.push(xiazhaichengdu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.xiazhaichengduTo !== '' && this.scrVo.xiazhaichengduTo !== 0 && this.scrVo.xiazhaichengduTo !== undefined) {
//  狭窄程度结束
          let xiazhaichengduTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'xiazhaichengdu',
            operater: '<=',
            filtervalue: this.scrVo.xiazhaichengduTo
          }]
          voArr.push(xiazhaichengduTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Qcaxuaguanzhijing !== '' && this.scrVo.Qcaxuaguanzhijing !== 0 && this.scrVo.Qcaxuaguanzhijing !== undefined) {
//  术前参照血管直径开始
          let Qcaxuaguanzhijing = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'shuqianminguanqiangzhijing',
            operater: '>=',
            filtervalue: this.scrVo.Qcaxuaguanzhijing
          }]
          voArr.push(Qcaxuaguanzhijing)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.QcaxuaguanzhijingTo !== '' && this.scrVo.QcaxuaguanzhijingTo !== 0 && this.scrVo.QcaxuaguanzhijingTo !== undefined) {
//  术前参照血管直径结束
          let QcaxuaguanzhijingTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'shuqianminguanqiangzhijing',
            operater: '<=',
            filtervalue: this.scrVo.QcaxuaguanzhijingTo
          }]
          voArr.push(QcaxuaguanzhijingTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Qcabingbianchangdu !== '' && this.scrVo.Qcabingbianchangdu !== 0 && this.scrVo.Qcabingbianchangdu !== undefined) {
//  术前病变长度开始
          let Qcabingbianchangdu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcabingbianchangdu',
            operater: '>=',
            filtervalue: this.scrVo.Qcabingbianchangdu
          }]
          voArr.push(Qcabingbianchangdu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.QcabingbianchangduTo !== '' && this.scrVo.QcabingbianchangduTo !== 0 && this.scrVo.QcabingbianchangduTo !== undefined) {
//  术前病变长度结束
          let QcabingbianchangduTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcabingbianchangdu',
            operater: '<=',
            filtervalue: this.scrVo.QcabingbianchangduTo
          }]
          voArr.push(QcabingbianchangduTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Qcaxiazhai !== '' && this.scrVo.Qcaxiazhai !== 0 && this.scrVo.Qcaxiazhai !== undefined) {
//  术前狭窄程度开始
          let Qcaxiazhai = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaxiazhai',
            operater: '>=',
            filtervalue: this.scrVo.Qcaxiazhai
          }]
          voArr.push(Qcaxiazhai)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.QcaxiazhaiTo !== '' && this.scrVo.QcaxiazhaiTo !== 0 && this.scrVo.QcaxiazhaiTo !== undefined) {
//  术前狭窄程度结束
          let QcaxiazhaiTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaxiazhai',
            operater: '<=',
            filtervalue: this.scrVo.QcaxiazhaiTo
          }]
          voArr.push(QcaxiazhaiTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Qcaminzhijing !== '' && this.scrVo.Qcaminzhijing !== 0 && this.scrVo.Qcaminzhijing !== undefined) {
//  QCA术前最小官腔直径开始
          let Qcaminzhijing = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaminzhijing',
            operater: '>=',
            filtervalue: this.scrVo.Qcaminzhijing
          }]
          voArr.push(Qcaminzhijing)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.QcaminzhijingTo !== '' && this.scrVo.QcaminzhijingTo !== 0 && this.scrVo.QcaminzhijingTo !== undefined) {
//  QCA术前最小官腔直径结束
          let QcaminzhijingTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaminzhijing',
            operater: '<=',
            filtervalue: this.scrVo.QcaminzhijingTo
          }]
          voArr.push(QcaminzhijingTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Qcaafterxiazhaichengdu !== '' && this.scrVo.Qcaafterxiazhaichengdu !== 0 && this.scrVo.Qcaafterxiazhaichengdu !== undefined) {
//  球囊预处理后狭窄程度开始
          let Qcaafterxiazhaichengdu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaafterxiazhaichengdu',
            operater: '>=',
            filtervalue: this.scrVo.Qcaafterxiazhaichengdu
          }]
          voArr.push(Qcaafterxiazhaichengdu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.QcaafterxiazhaichengduTo !== '' && this.scrVo.QcaafterxiazhaichengduTo !== 0 && this.scrVo.QcaafterxiazhaichengduTo !== undefined) {
//  球囊预处理后狭窄程度结束
          let QcaafterxiazhaichengduTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaafterxiazhaichengdu',
            operater: '<=',
            filtervalue: this.scrVo.QcaafterxiazhaichengduTo
          }]
          voArr.push(QcaafterxiazhaichengduTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Qcaafterminzhijing !== '' && this.scrVo.Qcaafterminzhijing !== 0 && this.scrVo.Qcaafterminzhijing !== undefined) {
//  球囊预处理后最小官腔直径开始
          let Qcaafterminzhijing = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaafterminzhijing',
            operater: '>=',
            filtervalue: this.scrVo.Qcaafterminzhijing
          }]
          voArr.push(Qcaafterminzhijing)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.QcaafterminzhijingTo !== '' && this.scrVo.QcaafterminzhijingTo !== 0 && this.scrVo.QcaafterminzhijingTo !== undefined) {
//  球囊预处理后最小官腔直径结束
          let QcaafterminzhijingTo = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Qcaafterminzhijing',
            operater: '<=',
            filtervalue: this.scrVo.QcaafterminzhijingTo
          }]
          voArr.push(QcaafterminzhijingTo)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.Chulijishu.length > 0) {
//  处理技术
          let ChulijishuInfo = this.scrVo.Chulijishu
          ChulijishuInfo = '\'' + ChulijishuInfo.join('\',\'') + '\''
          let Chulijishu = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'Chulijishu',
            operater: 'in',
            filtervalue: ChulijishuInfo
          }]
          voArr.push(Chulijishu)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.NoFenchaType === '有') {
//  有无分叉病变（数据库填了就是没有分叉
          let NoFenchaType = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'NoFenchaType',
            operater: '!=',
            filtervalue: ""
          }]
          voArr.push(NoFenchaType)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.NoFenchaType === '无') {
//  有无分叉病变（数据库填了就是没有分叉
          let NoFenchaType = [{
            type: 'FILTER',
            tablename: 'SURLESION',
            filtername: 'NoFenchaType',
            operater: '=',
            filtervalue: ""
          }]
          voArr.push(NoFenchaType)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
// ----------手术结果查询数据--------
        if (this.scrVo.LeftTrunkBalloon !== '' && this.scrVo.LeftTrunkBalloon !== 0 && this.scrVo.LeftTrunkBalloon !== undefined) {
//  左主干球囊数开始
          let LeftTrunkBalloon = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'LeftTrunkBalloon',
            operater: '>||<',
            filtervalue: 'LMT,球囊,' + this.scrVo.LeftTrunkBalloon + ',' + this.scrVo.LeftTrunkBalloonTo
          }]
          voArr.push(LeftTrunkBalloon)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.LeftMainSupport !== '' && this.scrVo.LeftMainSupport !== 0 && this.scrVo.LeftMainSupport !== undefined) {
//  左主干支架数开始
          let LeftMainSupport = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'LeftMainSupport',
            operater: '>||<',
            filtervalue: 'LMT,支架,' + this.scrVo.LeftMainSupport + ',' + this.scrVo.LeftMainSupportTo
          }]
          voArr.push(LeftMainSupport)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.AnteriorDescendingBalloon !== '' && this.scrVo.AnteriorDescendingBalloon !== 0 && this.scrVo.AnteriorDescendingBalloon !== undefined) {
//  前降支球囊数开始
          let AnteriorDescendingBalloon = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'AnteriorDescendingBalloon',
            operater: '>||<',
            filtervalue: 'LAD,球囊,' + this.scrVo.AnteriorDescendingBalloon + ',' + this.scrVo.LeftMainSupportTo
          }]
          voArr.push(AnteriorDescendingBalloon)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.AnteriorDescendingSupport !== '' && this.scrVo.AnteriorDescendingSupport !== 0 && this.scrVo.AnteriorDescendingSupport !== undefined) {
//  前降支支架数开始
          let AnteriorDescendingSupport = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'AnteriorDescendingSupport',
            operater: '>||<',
            filtervalue: 'LAD,支架,' + this.scrVo.AnteriorDescendingSupport + ',' + this.scrVo.AnteriorDescendingSupportTo
          }]
          voArr.push(AnteriorDescendingSupport)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.CyclotronBalloon !== '' && this.scrVo.CyclotronBalloon !== 0 && this.scrVo.CyclotronBalloon !== undefined) {
//  回旋支球囊数开始
          let CyclotronBalloon = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'CyclotronBalloon',
            operater: '>||<',
            filtervalue: 'LCX,球囊,' + this.scrVo.CyclotronBalloon + ',' + this.scrVo.CyclotronBalloonTo
          }]
          voArr.push(CyclotronBalloon)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.CyclotronSupport !== '' && this.scrVo.CyclotronSupport !== 0 && this.scrVo.CyclotronSupport !== undefined) {
//  回旋支支架数开始
          let CyclotronSupport = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'CyclotronSupport',
            operater: '>||<',
            filtervalue: 'LCX,支架,' + this.scrVo.CyclotronSupport + ',' + this.scrVo.CyclotronSupportTo
          }]
          voArr.push(CyclotronSupport)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.RightCoronaryBalloon !== '' && this.scrVo.RightCoronaryBalloon !== 0 && this.scrVo.RightCoronaryBalloon !== undefined) {
//  右冠球囊数开始
          let RightCoronaryBalloon = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'RightCoronaryBalloon',
            operater: '>||<',
            filtervalue: 'RCA,球囊,' + this.scrVo.RightCoronaryBalloon + ',' + this.scrVo.RightCoronaryBalloonTo
          }]
          voArr.push(RightCoronaryBalloon)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.RightCoronarySupport !== '' && this.scrVo.RightCoronarySupport !== 0 && this.scrVo.RightCoronarySupport !== undefined) {
//  右冠支架数开始
          let RightCoronarySupport = [{
            type: 'FILTER',
            tablename: 'SURRESULTEMP',
            filtername: 'RightCoronaryBalloon',
            operater: '>||<',
            filtervalue: 'RCA,支架,' + this.scrVo.RightCoronarySupport + ',' + this.scrVo.RightCoronaryBalloonTo
          }]
          voArr.push(RightCoronarySupport)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
// 器材信息查询数据
// ---------器材信息---------
        if (this.scrVo.ProductName !== '') {
// 器材名称
          let ProductName = [{
            type: 'FILTER',
            tablename: 'stkproduct',
            filtername: 'ProductName',
            operater: '=',
            filtervalue: this.scrVo.ProductName
          }]
          voArr.push(ProductName)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.ProductModel !== '') {
//  型号
          let ProductModel = [{
            type: 'FILTER',
            tablename: 'stkproduct',
            filtername: 'ProductModel',
            operater: '=',
            filtervalue: this.scrVo.ProductModel
          }]
          voArr.push(ProductModel)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.ProductStyle !== '') {
//  规格
          let ProductStyle = [{
            type: 'FILTER',
            tablename: 'stkproduct',
            filtername: 'ProductStyle',
            operater: '=',
            filtervalue: this.scrVo.ProductStyle
          }]
          voArr.push(ProductStyle)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.LargeClass.length > 0) {
// 大类别
          let LargeClassInfo = this.scrVo.LargeClass
          LargeClassInfo = '\'' + LargeClassInfo.join('\',\'') + '\''
          let LargeClass = [{
            type: 'FILTER',
            tablename: 'stkproduct',
            filtername: 'LargeClass',
            operater: 'in',
            filtervalue: LargeClassInfo
          }]
          voArr.push(LargeClass)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.SmallClass.length > 0) {
// 小类别
          let SmallClassInfo = this.scrVo.SmallClass
          SmallClassInfo = '\'' + SmallClassInfo.join('\',\'') + '\''
          let SmallClass = [{
            type: 'FILTER',
            tablename: 'stkproduct',
            filtername: 'SmallClass',
            operater: 'in',
            filtervalue: SmallClassInfo
          }]
          voArr.push(SmallClass)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        if (this.scrVo.providername.length > 0) {
// 厂家
          let ProvidernameInfo = this.scrVo.providername
          ProvidernameInfo = '\'' + ProvidernameInfo.join('\',\'') + '\''
          let providername = [{
            type: 'FILTER',
            tablename: 'stkprovider',
            filtername: 'providername',
            operater: 'in',
            filtervalue: ProvidernameInfo
          }]
          voArr.push(providername)
          this.equipmentList.filters = voArr
        } else {
          this.equipmentList.filters = voArr
        }
        this.tabList.loading = true
        let page = ''
        let pagesize = ''
        let levelInfo = {
          level: '',
          filters: this.equipmentList.filters
        }
        if (this.tabList.lesionTab === true) {
          page = this.tabList.lessionPage
          pagesize = this.tabList.lessionPagesize
          levelInfo.level = 'SURLESION'
        } else if (this.tabList.resultTab === true) {
          page = this.tabList.resultPage
          pagesize = this.tabList.resultPagesize
          levelInfo.level = 'SURRESULT'
          // ---------手术结果---------
        } else if (this.tabList.productTab === true) {
          page = this.tabList.productPage
          pagesize = this.tabList.productPagesize
          levelInfo.level = 'stkproduct'
        } else if (this.tabList.selectTabPage === true) {
          page = this.tabList.page
          pagesize = this.tabList.pagesize
          levelInfo.level = 'SURBASEINFO'
        }
        if (currentPage === undefined) {
          Api.getSelectVo(page, pagesize, levelInfo).then(res => {
            if (res) {
              this.tabList.loading = false
              this.$message({
                message: '获取成功!',
                type: 'success'
              })
              if (res.prePage === 1) {
                this.tabData = res.list
                this.tabList.total = res.total
              } else if (res.prePage === 2) {
                this.tabList.lessionTabData = res.list // 病变信息
                this.tabList.totalLession = res.total
              } else if (res.prePage === 3) {
                this.tabList.productTabData = res.list // 器材信息
                this.tabList.totalProduct = res.total
              } else if (res.prePage === 4) {
                this.tabList.resultTabData = res.list // 手术结果信息
                this.tabList.totalResult = res.total
              }
              this.tabList.screenDis = false
            } else {
              this.tabList.loading = false
              this.$message({
                message: '获取失败!',
                type: 'warning'
              })
            }
          })
        } else if (currentPage === 2) {
          page = 0
          pagesize = 0
          Api.getSelectVo(page, pagesize, levelInfo).then(res => {
            // this.exportSelect()
            if (res) {
              this.tabList.loading = false
              this.$message({
                message: '获取成功!',
                type: 'success'
              })
              if (res.prePage === 1) {
                this.tabDataAll = res.list
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  // 需要导出的数据
                  let exlData = this.tabDataAll
                  this.excelData = JSON.parse(JSON.stringify(exlData)) // 为了防止在处理导出数据的时候影响到表格数据，这里需要深拷贝！！
                  this.export2Excel()
                }).catch(() => {
                  // this.$message.error('导出操作出现了异常，请稍后重试！')
                })
              }
              this.tabList.screenDis = false
              this.tabList.total = res.total
            } else {
              this.tabList.loading = false
              this.$message({
                message: '获取失败!',
                type: 'warning'
              })
            }
          })
        } else if (currentPage === 3) {
          page = 0
          pagesize = 0
          Api.getSelectVo(page, pagesize, levelInfo).then(res => {
            // this.exportSelect()
            if (res) {
              this.tabList.loading = false
              this.$message({
                message: '获取成功!',
                type: 'success'
              })
              if (res.prePage === 2) {
                this.tabList.lessionTabDataAll = res.list // 病变信息
                this.tabList.totalLession = res.total
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  // 需要导出的数据
                  let exlData1 = this.tabList.lessionTabDataAll
                  if (this.tabList.lesionTab === true) {
                    this.excelDataLesion = JSON.parse(JSON.stringify(exlData1)) // 为了防止在处理导出数据的时候影响到表格数据，这里需要深拷贝！！
                    this.exportLesionExcel()
                  }
                }).catch(() => {
                  // this.$message.error('导出操作出现了异常，请稍后重试！')
                })
                // totalLession
                // totalResult
                // totalProduct
              } else if (res.prePage === 3) {
                this.tabList.productTabDataAll = res.list // 器材信息
                this.tabList.totalProduct = res.total
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  // 需要导出的数据
                  let exlData2 = this.tabList.productTabDataAll
                  if (this.tabList.productTab === true) {
                    this.excelDataProduct = JSON.parse(JSON.stringify(exlData2)) // 为了防止在处理导出数据的时候影响到表格数据，这里需要深拷贝！！
                    this.exportProductExcel()
                  }
                }).catch(() => {
                  // this.$message.error('导出操作出现了异常，请稍后重试！')
                })
              } else if (res.prePage === 4) {
                this.tabList.resultTabDataAll = res.list // 手术结果信息
                this.tabList.totalResult = res.total
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  // 需要导出的数据
                  let exlData3 = this.tabList.resultTabDataAll
                  if (this.tabList.resultTab === true) {
                    this.excelDataResult = JSON.parse(JSON.stringify(exlData3)) // 为了防止在处理导出数据的时候影响到表格数据，这里需要深拷贝！！
                    this.exportResultExcel()
                  }
                }).catch(() => {
                  // this.$message.error('导出操作出现了异常，请稍后重试！')
                })
              }
              this.tabList.screenDis = false
            } else {
              this.tabList.loading = false
              this.$message({
                message: '获取失败!',
                type: 'warning'
              })
            }
          })
        } else if (currentPage === 4) {
          Api.getSelectGroup(levelInfo).then(res => {
            if (res) {
              this.tabList.loading = false
              this.$message({
                message: '获取成功!',
                type: 'success'
              })
              this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                // 需要导出的数据
                let exlData4 = res
                this.excelDataPatient = JSON.parse(JSON.stringify(exlData4)) // 为了防止在处理导出数据的时候影响到表格数据，这里需要深拷贝！！
                this.exportPatientExcel()
              }).catch(() => {
                // this.$message.error('导出操作出现了异常，请稍后重试！')
              })
              this.tabList.screenDis = false
            } else {
              this.tabList.loading = false
              this.$message({
                message: '获取失败!',
                type: 'warning'
              })
            }
          })
        }
      },
      // 统计维度
      PieList (chartData) {
        // 绘制图表
        let dom = document.getElementById('echarts')
        let myChart = this.echarts.init(dom)
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          toolbox: {
            show: true,
            left: 'center',
            feature: {
              saveAsImage: {}
            }
          },
          label: {
            formatter: '{a} {b} : {c} ({d}%)',
            backgroundColor: '#eee',
            borderColor: '#aaa',
          },
          series: {
            name: '',
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            data: chartData,
            animation: true,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        })
      },
      PieList2 (yCto, nCto, y, s) {
        // 绘制图表
        let dom5 = document.getElementById('echarts5')
        let myChart5 = this.echarts.init(dom5)
        myChart5.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          toolbox: {
            show: true,
            left: 'center',
            feature: {
              saveAsImage: {}
            }
          },
          label: {
            formatter: '{a} {b} : {c} ({d}%)',
            backgroundColor: '#eee',
            borderColor: '#aaa',
          },
          series: {
            name: '',
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            data: [
              {value: yCto, name: y},
              {value: nCto, name: s}
            ],
            animation: true,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        })
      },
      axisList (chartData, treeData) {
        let dom2 = document.getElementById('echarts2')
        let myChart2 = this.echarts.init(dom2)
        myChart2.setOption({
          toolbox: {
            show: true,
            left: 'center',
            feature: {
              saveAsImage: {}
            }
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            formatter: '{a} <br/>{b} : {c}',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: treeData,
              interval: 0,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 0,
                rotate: 30
              }
            }
          ],
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [
            {
              label: '',
              name: this.tabList.labelList,
              barGap: 0,
              type: 'bar',
              barWidth: '60%',
              animation: true,
              data: chartData
            }
          ],
          label: {
            show: true,
            position: 'top',
            formatter: '{c}'　　　　//这是关键，在需要的地方加上就行了
          }
        })
      },
      axisList2 (chartData, treeData) {
        let dom3 = document.getElementById('echarts3')
        let myChart3 = this.echarts.init(dom3)
        app.config = {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15
        }
        var labelOption = {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          // formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
        myChart3.setOption({
          toolbox: {
            show: true,
            left: 'center',
            feature: {
              saveAsImage: {}
            }
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            formatter: '{a} <br/>{b} : {c}',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: treeData,
              max: 20,
              interval: 0,
              axisLine: {
                show: false
              },
              axisTick: {
                show: true,
                length: 5
              },
              axisLabel: {
                interval: 0,
                rotate: 30
              }
            }
          ],
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          series: [
            {
              label: '',
              name: this.tabList.labelList,
              barGap: 0,
              type: 'bar',
              barWidth: '60%',
              animation: true,
              data: chartData
            }
          ],
          label: {
            show: true,
            position: 'top',
            formatter: '{c}'　　　　//这是关键，在需要的地方加上就行了
          }
        })
      },
      axisList3 (doctorName1, doctorName2, doctorName3, doctorName4, treeData) {
        let dom4 = document.getElementById('echarts4')
        let myChart4 = this.echarts.init(dom4)
        myChart4.setOption({
          toolbox: {
            show: true,
            left: 'center',
            feature: {
              saveAsImage: {}
            }
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            formatter: '{a} <br/>{b} : {c}',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: treeData,
              max: 20,
              interval: 0,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
            }
          ],
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          dataZoom: [
            {
              show: true,
              start: 0,
              end: 7
            },
            {
              type: 'inside',
              start: 0,
              end: 7
            }
          ],
          series: [
            {
              label: '术者',
              name: '术者',
              type: 'bar',
              barWidth: 40,
              color: '#003366',
              left: '2%',
              animation: true,
              data: doctorName4
            },
            {
              label: '一助',
              // label: this.tabList.labelList,
              name: '一助',
              type: 'bar',
              barWidth: 40,
              left: '2%',
              color: '#3398DB',
              animation: true,
              data: doctorName1
            },
            {
              label: '二助',
              name: '二助',
              type: 'bar',
              barWidth: 40,
              left: '2%',
              color: '#006699',
              animation: true,
              data: doctorName2
            }, {
              llabel: '三助',
              name: '三助',
              type: 'bar',
              barWidth: 40,
              color: '#4cabce',
              left: '2%',
              animation: true,
              data: doctorName3
            }
          ],
          label: {
            show: true,
            name: '',
            position: 'top',
            formatter: '{a} {c}'　　　　//这是关键，在需要的地方加上就行了
          }
        })
      },
      // r统计维度
      selectVal (val) {
        this.loading = true
        let Vo = this.tabList.options
        for (let i = 0; i < Vo.length; i++) {
          if (Vo[i].value === val) {
            this.tabList.labelList = Vo[i].label
          }
        }
        let vo = this.tabList.statisticsVo
        this.tabList.statisticsVo.param = val
        this.tabList.statisticsVo.surStartDateTime = this.selectVo.SurStartDateTime
        this.tabList.statisticsVo.surStartDateTimeTo = this.selectVo.SurStartDateTimeTo
        if (val === '') {
          this.loading = false
          this.showChartPie = false
          this.showChartY = false
          this.showChartS = false
          this.showChartSd = false
        } else {
          Api.getSelectStatistics(vo).then(res => {
            if (res) {
              this.loading = false
              this.$message({
                message: this.tabList.labelList + '获取成功!',
                type: 'success'
              })
              let chartData = []
              let treeData = []
              let doctorName1 = []
              let doctorName2 = []
              let doctorName3 = []
              let doctorName4 = []
              let yCto = []
              let nCto = []
              let yLabel = '是CTO'
              let nLabel = '否CTO'
              let yFlu = '已入组'
              let nFlu = '未入组'
              // let labelLists = []
              if (val === 'sex' || val === 'age') {
                this.showChartPie = true
                this.showChartY = true
                this.showChartS = false
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key], name: key})
                  treeData.push(key)
                })
                this.PieList(chartData)
                this.axisList(chartData, treeData)
              } else if (val === 'doctorName') {
                this.showChartPie = false
                this.showChartY = false
                this.showChartS = false
                this.showChartSd = true
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  doctorName1.push({value: res[key].一助})
                  doctorName2.push({value: res[key].二助})
                  doctorName3.push({value: res[key].三助})
                  doctorName4.push({value: res[key].术者})
                  treeData.push(res[key].DoctorName)
                })
                this.axisList3(doctorName1, doctorName2, doctorName3, doctorName4, treeData)
              } else if (val === 'rCAFaYu') {
                this.showChartPie = true
                this.showChartY = true
                this.showChartS = false
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key], name: key})
                  treeData.push(key)
                })
                this.PieList(chartData)
                this.axisList(chartData, treeData)
              } else if (val === 'radioGraphicResult') {
                this.showChartPie = true
                this.showChartY = true
                this.showChartS = false
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key], name: key})
                  treeData.push(key)
                })
                this.PieList(chartData)
                this.axisList(chartData, treeData)
              } else if (val === 'fluStatus') {
                this.showChartPie = true
                this.showChartY = true
                this.showChartS = false
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key], name: key})
                  treeData.push(key)
                })
                this.PieList(chartData)
                this.axisList(chartData, treeData)
              } else if (val === 'isCto') {
                this.showChartPie = false
                this.showChartY = false
                this.showChartS = false
                this.showChartSd = false
                this.showChartYS = true
                Object.keys(res).forEach(function (key) {
                  yCto.push(res[key].dic_value, yLabel)
                  nCto.push(res[key].number, nLabel)
                })
                this.PieList2(yCto, nCto, yLabel, nLabel)
              } else if (val === 'fluPatientNum') {
                this.showChartPie = false
                this.showChartY = false
                this.showChartS = false
                this.showChartSd = false
                this.showChartYS = true
                Object.keys(res).forEach(function (key) {
                  yCto.push(res[key].dic_value, yFlu)
                  nCto.push(res[key].number, nFlu)
                })
                this.PieList2(yCto, nCto, yFlu, nFlu)
              } else if (val === 'largeClass') {
                this.showChartPie = false
                this.showChartY = true
                this.showChartS = false
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key].number, name: res[key].dic_value})
                })
                for (let i = 0; i < res.length; i++) {
                  treeData.push(res[i].dic_value)
                }
                this.axisList(chartData, treeData)
              } else if (val === 'manufacturerName') {
                this.showChartPie = false
                this.showChartY = false
                this.showChartS = true
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key].number, name: res[key].dic_value})
                })
                for (let i = 0; i < res.length; i++) {
                  treeData.push(res[i].dic_value)
                }
                this.axisList2(chartData, treeData)
              } else if (val === 'support') {
                this.showChartPie = false
                this.showChartY = false
                this.showChartS = true
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key].number, name: res[key].dic_value})
                })
                for (let i = 0; i < res.length; i++) {
                  treeData.push(res[i].dic_value)
                }
                this.axisList2(chartData, treeData)
              } else if (val === 'sacculus') {
                this.showChartPie = false
                this.showChartY = false
                this.showChartS = true
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key].number, name: res[key].dic_value})
                })
                for (let i = 0; i < res.length; i++) {
                  treeData.push(res[i].dic_value)
                }
                this.axisList2(chartData, treeData)
              } else if (val === 'surStartDateTime') {
                this.showChartPie = true
                this.showChartY = false
                this.showChartS = true
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key].number, name: res[key].dic_value})
                })
                this.PieList(chartData)
                for (let i = 0; i < res.length; i++) {
                  treeData.push(res[i].dic_value)
                }
                this.axisList2(chartData, treeData)
              } else if (val === 'surType') {
                this.showChartPie = true
                this.showChartY = false
                this.showChartS = true
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key].number, name: res[key].dic_value})
                })
                this.PieList(chartData)
                for (let i = 0; i < res.length; i++) {
                  treeData.push(res[i].dic_value)
                }
                this.axisList2(chartData, treeData)
              } else if (val === 'GMType') {
                this.showChartPie = true
                this.showChartY = true
                this.showChartS = false
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key].number, name: res[key].dic_value})
                })
                this.PieList(chartData)
                for (let i = 0; i < res.length; i++) {
                  treeData.push(res[i].dic_value)
                }
                this.axisList(chartData, treeData)
              }
            } else {
              this.loading = true
              this.$message({
                message: '获取失败!',
                type: 'warning'
              })
            }
          })
        }
      },
      // 查询范围
      numChange1 () {
        // 体表面积
        if (this.selectVo.tb !== '' && (this.selectVo.tbTo === 0 || this.selectVo.tbTo !== '')) {
          this.selectVo.tbTo = this.selectVo.tb
        }
      },
      numChange2 () {
        // 手术时病人年龄
        if (this.selectVo.ageTemp !== '' && (this.selectVo.ageTempTo === 0 || this.selectVo.ageTempTo !== '')) {
          this.selectVo.ageTempTo = this.selectVo.ageTemp
        }
      },
      numChange3 () {
        // 狭窄率
        if (this._MainLocationFrom.XiazhailvFrom !== '' && (this._MainLocationFrom.XiazhailvTo === 0 || this._MainLocationFrom.XiazhailvTo !== '')) {
          this._MainLocationFrom.XiazhailvTo = this._MainLocationFrom.XiazhailvFrom
        }
      },
      numChange4 () {
        // 参照血管直径
        if (this._MainLocationFrom.canzhaoxueguanzhijing !== '' && (this._MainLocationFrom.canzhaoxueguanzhijingTo === 0 || this._MainLocationFrom.canzhaoxueguanzhijingTo !== '')) {
          this._MainLocationFrom.canzhaoxueguanzhijingTo = this._MainLocationFrom.canzhaoxueguanzhijing
        }
      },
      numChange5 () {
        // 病变长度
        if (this._MainLocationFrom.bingbianchangdu !== '' && (this._MainLocationFrom.bingbianchangduTo === 0 || this._MainLocationFrom.bingbianchangduTo !== '')) {
          this._MainLocationFrom.bingbianchangduTo = this._MainLocationFrom.bingbianchangdu
        }
      },
      numChange6 () {
        // 术前最小官腔直径
        if (this._MainLocationFrom.shuqianminguanqiangzhijing !== '' && (this._MainLocationFrom.shuqianminguanqiangzhijingTo === 0 || this.selectVo.shuqianminguanqiangzhijingTo !== '')) {
          this._MainLocationFrom.shuqianminguanqiangzhijingTo = this._MainLocationFrom.shuqianminguanqiangzhijing
        }
      },
      numChange7 () {
        // 狭窄程度
        if (this._MainLocationFrom.xiazhaichengdu !== '' && (this._MainLocationFrom.xiazhaichengduTo === 0 || this._MainLocationFrom.xiazhaichengduTo !== '')) {
          this._MainLocationFrom.xiazhaichengduTo = this._MainLocationFrom.xiazhaichengdu
        }
      },
      numChange8 () {
        // 术前参照血管直径
        if (this._MainLocationFrom.Qcaxuaguanzhijing !== '' && (this._MainLocationFrom.QcaxuaguanzhijingTo === 0 || this._MainLocationFrom.QcaxuaguanzhijingTo !== '')) {
          this._MainLocationFrom.QcaxuaguanzhijingTo = this._MainLocationFrom.Qcaxuaguanzhijing
        }
      },
      numChange9 () {
        // 术前病变长度
        if (this._MainLocationFrom.Qcabingbianchangdu !== '' && (this._MainLocationFrom.QcabingbianchangduTo === 0 || this._MainLocationFrom.QcabingbianchangduTo !== '')) {
          this._MainLocationFrom.QcabingbianchangduTo = this._MainLocationFrom.Qcabingbianchangdu
        }
      },
      numChange10 () {
        // 术前狭窄程度
        if (this._MainLocationFrom.Qcaxiazhai !== '' && (this._MainLocationFrom.QcaxiazhaiTo === 0 || this._MainLocationFrom.QcaxiazhaiTo !== '')) {
          this._MainLocationFrom.QcaxiazhaiTo = this._MainLocationFrom.Qcaxiazhai
        }
      },
      numChange11 () {
        // QCA术前最小官腔直径
        if (this._MainLocationFrom.Qcaminzhijing !== '' && (this._MainLocationFrom.QcaminzhijingTo === 0 || this._MainLocationFrom.QcaminzhijingTo !== '')) {
          this._MainLocationFrom.QcaminzhijingTo = this._MainLocationFrom.Qcaminzhijing
        }
      },
      numChange12 () {
        // 球囊预处理后狭窄程度
        if (this._MainLocationFrom.Qcaafterxiazhaichengdu !== '' && (this._MainLocationFrom.QcaafterxiazhaichengduTo === 0 || this._MainLocationFrom.QcaafterxiazhaichengduTo !== '')) {
          this._MainLocationFrom.QcaafterxiazhaichengduTo = this._MainLocationFrom.Qcaafterxiazhaichengdu
        }
      },
      numChange13 () {
        // 球囊预处理后最小官腔直径
        if (this._MainLocationFrom.Qcaafterminzhijing !== '' && (this._MainLocationFrom.QcaafterminzhijingTo === 0 || this._MainLocationFrom.QcaafterminzhijingTo !== '')) {
          this._MainLocationFrom.QcaafterminzhijingTo = this._MainLocationFrom.Qcaafterminzhijing
        }
      },
      numChange14 () {
        // --------手术结果信息--------
        // 左主干球囊数
        if (this._MainLocationFrom.LeftTrunkBalloon !== '' && (this._MainLocationFrom.LeftTrunkBalloonTo === 0 || this._MainLocationFrom.LeftTrunkBalloonTo !== '')) {
          this._MainLocationFrom.LeftTrunkBalloonTo = this._MainLocationFrom.LeftTrunkBalloon
        }
      },
      numChange15 () {
        // 左主干支架数
        if (this._MainLocationFrom.LeftMainSupport !== '' && (this._MainLocationFrom.LeftMainSupportTo === 0 || this._MainLocationFrom.LeftMainSupportTo !== '')) {
          this._MainLocationFrom.LeftMainSupportTo = this._MainLocationFrom.LeftMainSupport
        }
      },
      numChange16 () {
        // 前降支球囊数
        if (this._MainLocationFrom.AnteriorDescendingBalloon !== '' && (this._MainLocationFrom.AnteriorDescendingBalloonTo === 0 || this._MainLocationFrom.AnteriorDescendingBalloonTo !== '')) {
          this._MainLocationFrom.AnteriorDescendingBalloonTo = this._MainLocationFrom.AnteriorDescendingBalloon
        }
      },
      numChange17 () {
        // 前降支支架数
        if (this._MainLocationFrom.AnteriorDescendingSupport !== '' && (this._MainLocationFrom.AnteriorDescendingSupportTo === 0 || this._MainLocationFrom.AnteriorDescendingSupportTo !== '')) {
          this._MainLocationFrom.AnteriorDescendingSupportTo = this._MainLocationFrom.AnteriorDescendingSupport
        }
      },
      numChange18 () {
        // 回旋支球囊数
        if (this._MainLocationFrom.CyclotronBalloon !== '' && (this._MainLocationFrom.CyclotronBalloonTo === 0 || this._MainLocationFrom.CyclotronBalloonTo !== '')) {
          this._MainLocationFrom.CyclotronBalloonTo = this._MainLocationFrom.CyclotronBalloon
        }
      },
      numChange19 () {
        // 回旋支支架数
        if (this._MainLocationFrom.CyclotronSupport !== '' && (this._MainLocationFrom.CyclotronSupportTo === 0 || this._MainLocationFrom.CyclotronSupportTo !== '')) {
          this._MainLocationFrom.CyclotronSupportTo = this._MainLocationFrom.CyclotronSupport
        }
      },
      numChange20 () {
        // 右冠球囊数
        if (this._MainLocationFrom.RightCoronaryBalloon !== '' && (this._MainLocationFrom.RightCoronaryBalloonTo === 0 || this._MainLocationFrom.RightCoronaryBalloonTo !== '')) {
          this._MainLocationFrom.RightCoronaryBalloonTo = this._MainLocationFrom.RightCoronaryBalloon
        }
      },
      numChange21 () {
        // 右冠支架数
        if (this._MainLocationFrom.RightCoronarySupport !== '' && (this._MainLocationFrom.RightCoronarySupportTo === 0 || this._MainLocationFrom.RightCoronarySupportTo !== '')) {
          this._MainLocationFrom.RightCoronarySupportTo = this._MainLocationFrom.RightCoronarySupport
        }
      },
      // 查询大类
      selectLargeClass () {
      },
      selectLargeClassVal (e) {
        this.dictionariesList.largeClassVal = ''
        this.dictionariesList.largeClassVal = '\'' + e.join('\',\'') + '\''
      },
      // 查询小类
      selectSmallClass () {
        Api.getAllSmallClass(this.dictionariesList.largeClassVal).then(res => {
          if (res) {
            this.$message({
              message: '获取成功!',
              type: 'success'
            })
            this.SmallClassInfo = res
            // this.dictionariesList.SmallClassInfo = res
          } else {
            this.$message({
              message: '获取失败!',
              type: 'warning'
            })
          }
        })
      },
      // 重置
      resetClick (formName) {
        this.selectVo = new selectVo()
      },
      // 展示查询列表
      openTable (val) {
        if (val === false) {
          this.tabList.tablePage = false
          this.tabList.dataChart = false
          this.tabList.moreVal = false
        } else if (val === true) {
          this.tabList.tablePage = true
          this.tabList.dataChart = true
          this.tabList.moreVal = true
        }
      },
      // 显示表格更多信息
      openMoreTable (val) {
        if (val === false) {
          this.tabList.showTabel = false
        } else if (val === true) {
          this.tabList.showTabel = true
        }
      },
      // 导出查询内容列表
      exportSelect () {
        this.getSelect(2)
      },
      // 参数配置
      export2Excel () {
        var that = this;
        require.ensure([], () => {
          const {export_json_to_excel} = require('../vendor/Export2Excel') //这里必须使用绝对路径，这个文件就是之前那两个依赖的JS
          const tHeader = [
            '患者姓名', '身份证号', '性别',
            '年龄', '手术编号', '手术开始日期',
            '导管间', 'BMI', '体表面积',
            '穿刺部位', '供血优势', '桥血管',
            '左主干情况', '前降支情况', '回旋支情况', '右冠情况',
            '造影结论', '特殊器材', '有无分叉病变'
          ] // 导出的表头名（key）
          const filterVal = [
            'patientName', 'patiIdentity', 'sex',
            'age', 'SurCode', 'surStartDateTime',
            'surCathRoomName', 'BMI', 'tb',
            'PunctuerName', 'GMType', 'bridge',
            'lmtStr', 'ladStr', 'lcxStr', 'rcaStr',
            'radioGraphicResult', 'specialEquipment', 'isForking'
          ]; // 导出的表头字段名（value）
          const list = that.excelData
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, `统计表`) // 导出的表格名称，根据需要自己命名
        })
      },
      /**
       * 数据格式化
       * @param filterVal
       * @param jsonData
       */
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => {
          v.monthStart = this.dateFormatter(v.monthStart) // 在这里为时间字段值进行单独的格式化
          v.monthEnd = this.dateFormatter(v.monthEnd)
          return filterVal.map(j => v[j])
        })
      },
      dateFormatter (str) {
        if (!str) {
          return ""
        }
        return this.$dateFormat(str, "yyyy-MM-dd") // 具体实现在下面，大家想怎么处理这个函数都随意，只要能够格式化自己想要格式化的字段就行
      },
      disFn () {
        if (this.selectVo.BMI !== '') {
          // BMI
          this.disShowFrom.BMI = false
        }
        if (this.selectVo.tb !== 0) {
          // 体表面积
          this.disShowFrom.tb = false
        }
        if (this.selectVo.SurType.length > 0) {
          // 手术类型
          this.disShowFrom.SurType = false
        }
        if (this.selectVo.SurStartDateTime !== '') {
          // 手术日期开始
          this.disShowFrom.SurStartDateTime = false
        }
        if (this.selectVo.ageTemp !== 0) {
          // 年龄开始
          this.disShowFrom.ageTemp = false
        }
        // ---------造影信息-------------
        if (this.selectVo.GMType !== '') {
          // 供血优势
          this.disShowFrom.GMType = false
        }
        if (this.selectVo.LCAFaYu !== '') {
          // 左冠状动脉发育
          this.disShowFrom.LCAFaYu = false
        }
        if (this.selectVo.RCAFaYu !== '') {
          // 右冠状动脉发育
          this.disShowFrom.RCAFaYu = false
        }
        if (this.selectVo.Jiwangzhijiaying.length > 0) {
          // 支架影位置
          this.disShowFrom.Jiwangzhijiaying = false
        }
        if (this.selectVo.BridgeVascular !== '') {
          // 桥血管
          this.disShowFrom.BridgeVascular = false
        }
        if (this.selectVo.RadioGraphicResult.length > 0) {
          // 造影结论
          this.disShowFrom.RadioGraphicResult = false
        }
        // ---------病变信息---------
        if (this.selectVo.MainLocationFrom.length > 0) {
          // 血管位置
          this.disShowFrom.MainLocationFrom = false
        }
        if (this.selectVo.Quanbise !== '') {
          //  是否闭塞
          this.disShowFrom.Quanbise = false
        }
        if (this.selectVo.XiazhailvFrom !== 0) {
          //  狭窄率
          this.disShowFrom.XiazhailvFrom = false
        }
        if (this.selectVo.FenzhiName !== '') {
          // 分支血管名称
          this.disShowFrom.FenzhiName = false
        }
        if (this.selectVo.Zhijianeizaixiazhai !== '') {
          // 支架内在狭窄
          this.disShowFrom.Zhijianeizaixiazhai = false
        }
        if (this.selectVo.lesionsType.length > 0) {
          // 病变类型
          this.disShowFrom.lesionsType = false
        }
        if (this.selectVo.BiseTime.length > 0) {
          // 闭塞时间
          this.disShowFrom.BiseTime = false
        }
        if (this.selectVo.Bisehounixiangxueliu.length > 0) {
          // 闭塞之后逆向血管
          this.disShowFrom.Bisehounixiangxueliu = false
        }
        if (this.selectVo.LengthFanwei.length > 0) {
          // 长度范围
          this.disShowFrom.LengthFanwei = false
        }
        if (this.selectVo.Xueshuan !== '') {
          // 血栓
          this.disShowFrom.Xueshuan = false
        }
        if (this.selectVo.Qianxiangxueliu.length > 0) {
          // 前向血流
          this.disShowFrom.Qianxiangxueliu = false
        }
        if (this.selectVo.Gaihua.length > 0) {
          // 钙化
          this.disShowFrom.Gaihua = false
        }
        if (this.selectVo.Shuangfencha.length > 0) {
          // 分叉病变分型
          this.disShowFrom.Shuangfencha = false
        }
        if (this.selectVo.Sanfenchabingbian.length > 0) {
          // 三叉病变节段
          this.disShowFrom.Sanfenchabingbian = false
        }
        if (this.selectVo.LocationFrom.length > 0) {
          // 闭塞起始血管段
          this.disShowFrom.LocationFrom = false
        }
        if (this.selectVo.Dunxingcanduan !== '') {
          // 钝型残端
          this.disShowFrom.Dunxingcanduan = false
        }
        if (this.selectVo.Qiaoxueguan !== '') {
          // 血管桥(病变中)
          this.disShowFrom.Qiaoxueguan = false
        }
        if (this.selectVo.canzhaoxueguanzhijing !== 0) {
          //  参照血管直径开始
          this.disShowFrom.canzhaoxueguanzhijing = false
        }
        if (this.selectVo.bingbianchangdu !== 0) {
          //  病变长度开始
          this.disShowFrom.bingbianchangdu = false
        }
        if (this.selectVo.shuqianminguanqiangzhijing !== 0) {
          //  术前最小官腔直径开始
          this.disShowFrom.shuqianminguanqiangzhijing = false
        }
        if (this.selectVo.xiazhaichengdu !== 0) {
          //  狭窄程度开始
          this.disShowFrom.xiazhaichengdu = false
        }
        if (this.selectVo.Qcaxuaguanzhijing !== 0) {
          //  术前参照血管直径开始
          this.disShowFrom.Qcaxuaguanzhijing = false
        }
        if (this.selectVo.Qcabingbianchangdu !== 0) {
          //  术前病变长度开始
          this.disShowFrom.Qcabingbianchangdu = false
        }
        if (this.selectVo.Qcaxiazhai !== 0) {
          //  术前狭窄程度开始
          this.disShowFrom.Qcaxiazhai = false
        }
        if (this.selectVo.Qcaminzhijing !== 0) {
          //  QCA术前最小官腔直径开始
          this.disShowFrom.Qcaminzhijing = false
        }
        if (this.selectVo.Qcaafterxiazhaichengdu !== 0) {
          //  球囊预处理后狭窄程度开始
          this.disShowFrom.Qcaafterxiazhaichengdu = false
        }
        if (this.selectVo.Qcaafterminzhijing !== 0) {
          //  球囊预处理后最小官腔直径开始
          this.disShowFrom.Qcaafterminzhijing = false
        }
        if (this.selectVo.Chulijishu.length > 0) {
          //  处理技术
          this.disShowFrom.Chulijishu = false
        }
        if (this.selectVo.NoFenchaType !== '') {
          //  有无分叉病变（数据库填了就是没有分叉
          this.disShowFrom.NoFenchaType = false
        }
        // ---------手术结果---------
        if (this.selectVo.LeftTrunkBalloon !== 0) {
          //  左主干球囊数开始
          this.disShowFrom.LeftTrunkBalloon = false
        }
        if (this.selectVo.LeftMainSupport !== 0) {
          //  左主干支架数开始
          this.disShowFrom.LeftMainSupport = false
        }
        if (this.selectVo.AnteriorDescendingBalloon !== 0) {
          //  前降支球囊数开始
          this.disShowFrom.AnteriorDescendingBalloon = false
        }
        if (this.selectVo.AnteriorDescendingSupport !== 0) {
          //  前降支支架数开始
          this.disShowFrom.AnteriorDescendingSupport = false
        }
        if (this.selectVo.CyclotronBalloon !== 0) {
          //  回旋支球囊数开始
          this.disShowFrom.CyclotronBalloon = false
        }
        if (this.selectVo.CyclotronSupport !== 0) {
          //  回旋支支架数开始
          this.disShowFrom.CyclotronSupport = false
        }
        if (this.selectVo.RightCoronaryBalloon !== 0) {
          //  右冠球囊数开始
          this.disShowFrom.RightCoronaryBalloon = false
        }
        if (this.selectVo.RightCoronarySupport !== 0) {
          //  右冠支架数开始
          this.disShowFrom.RightCoronarySupport = false
        }
        // ---------器材信息---------
        if (this.selectVo.ProductName !== '') {
          // 器材名称
          this.disShowFrom.ProductName = false
        }
        if (this.selectVo.ProductModel !== '') {
          //  型号
          this.disShowFrom.ProductModel = false
        }
        if (this.selectVo.ProductStyle !== '') {
          //  规格
          this.disShowFrom.ProductStyle = false
        }
        if (this.selectVo.LargeClass.length > 0) {
          // 大类别
          this.disShowFrom.LargeClass = false
        }
        if (this.selectVo.SmallClass.length > 0) {
          this.disShowFrom.SmallClass = false
        }
        if (this.selectVo.providername.length > 0) {
          this.disShowFrom.providername = false
        }
      },
      disShowFn () {
        if (this.selectVo.BMI !== '') {
          // BMI
          this.disShowFrom.BMI = true
        }
        if (this.selectVo.tb !== '') {
          // 体表面积
          this.disShowFrom.tb = true
        }
        if (this.selectVo.SurType.length > 0) {
          // 手术类型
          this.disShowFrom.SurType = true
        }
        if (this.selectVo.SurStartDateTime !== '') {
          // 手术日期开始
          this.disShowFrom.SurStartDateTime = true
        }
        if (this.selectVo.ageTemp !== '') {
          // 年龄开始
          this.disShowFrom.ageTemp = true
        }
        // ---------造影信息-------------
        if (this.selectVo.GMType !== '') {
          // 供血优势
          this.disShowFrom.GMType = true
        }
        if (this.selectVo.LCAFaYu !== '') {
          // 左冠状动脉发育
          this.disShowFrom.LCAFaYu = true
        }
        if (this.selectVo.RCAFaYu !== '') {
          // 右冠状动脉发育
          this.disShowFrom.RCAFaYu = true
        }
        if (this.selectVo.Jiwangzhijiaying.length > 0) {
          // 支架影位置
          this.disShowFrom.Jiwangzhijiaying = true
        }
        if (this.selectVo.BridgeVascular !== '') {
          // 桥血管
          this.disShowFrom.BridgeVascular = true
        }
        if (this.selectVo.RadioGraphicResult.length > 0) {
          // 造影结论
          this.disShowFrom.RadioGraphicResult = true
        }
        // ---------病变信息---------
        if (this.selectVo.MainLocationFrom.length > 0) {
          // 血管位置
          this.disShowFrom.MainLocationFrom = true
        }
        if (this.selectVo.Quanbise !== '') {
          //  是否闭塞
          this.disShowFrom.Quanbise = true
        }
        if (this.selectVo.XiazhailvFrom !== '') {
          //  狭窄率
          this.disShowFrom.XiazhailvFrom = true
        }
        if (this.selectVo.FenzhiName !== '') {
          // 分支血管名称
          this.disShowFrom.FenzhiName = true
        }
        if (this.selectVo.Zhijianeizaixiazhai !== '') {
          // 支架内在狭窄
          this.disShowFrom.Zhijianeizaixiazhai = true
        }
        if (this.selectVo.lesionsType.length > 0) {
          // 病变类型
          this.disShowFrom.lesionsType = true
        }
        if (this.selectVo.BiseTime.length > 0) {
          // 闭塞时间
          this.disShowFrom.BiseTime = true
        }
        if (this.selectVo.Bisehounixiangxueliu.length > 0) {
          // 闭塞之后逆向血管
          this.disShowFrom.Bisehounixiangxueliu = true
        }
        if (this.selectVo.LengthFanwei.length > 0) {
          // 长度范围
          this.disShowFrom.LengthFanwei = true
        }
        if (this.selectVo.Xueshuan !== '') {
          // 血栓
          this.disShowFrom.Xueshuan = true
        }
        if (this.selectVo.Qianxiangxueliu.length > 0) {
          // 前向血流
          this.disShowFrom.Qianxiangxueliu = true
        }
        if (this.selectVo.Gaihua.length > 0) {
          // 钙化
          this.disShowFrom.Gaihua = true
        }
        if (this.selectVo.Shuangfencha.length > 0) {
          // 分叉病变分型
          this.disShowFrom.Shuangfencha = true
        }
        if (this.selectVo.Sanfenchabingbian.length > 0) {
          // 三叉病变节段
          this.disShowFrom.Sanfenchabingbian = true
        }
        if (this.selectVo.LocationFrom.length > 0) {
          // 闭塞起始血管段
          this.disShowFrom.LocationFrom = true
        }
        if (this.selectVo.Dunxingcanduan !== '') {
          // 钝型残端
          this.disShowFrom.Dunxingcanduan = true
        }
        if (this.selectVo.Qiaoxueguan !== '') {
          // 血管桥(病变中)
          this.disShowFrom.Qiaoxueguan = true
        }
        if (this.selectVo.canzhaoxueguanzhijing !== '') {
          //  参照血管直径开始
          this.disShowFrom.canzhaoxueguanzhijing = true
        }
        if (this.selectVo.bingbianchangdu !== '') {
          //  病变长度开始
          this.disShowFrom.bingbianchangdu = true
        }
        if (this.selectVo.shuqianminguanqiangzhijing !== '') {
          //  术前最小官腔直径开始
          this.disShowFrom.shuqianminguanqiangzhijing = true
        }
        if (this.selectVo.xiazhaichengdu !== '') {
          //  狭窄程度开始
          this.disShowFrom.xiazhaichengdu = true
        }
        if (this.selectVo.Qcaxuaguanzhijing !== '') {
          //  术前参照血管直径开始
          this.disShowFrom.Qcaxuaguanzhijing = true
        }
        if (this.selectVo.Qcabingbianchangdu !== '') {
          //  术前病变长度开始
          this.disShowFrom.Qcabingbianchangdu = true
        }
        if (this.selectVo.Qcaxiazhai !== '') {
          //  术前狭窄程度开始
          this.disShowFrom.Qcaxiazhai = true
        }
        if (this.selectVo.Qcaminzhijing !== '') {
          //  QCA术前最小官腔直径开始
          this.disShowFrom.Qcaminzhijing = true
        }
        if (this.selectVo.Qcaafterxiazhaichengdu !== '') {
          //  球囊预处理后狭窄程度开始
          this.disShowFrom.Qcaafterxiazhaichengdu = true
        }
        if (this.selectVo.Qcaafterminzhijing !== '') {
          //  球囊预处理后最小官腔直径开始
          this.disShowFrom.Qcaafterminzhijing = true
        }
        if (this.selectVo.Chulijishu.length > 0) {
          //  处理技术
          this.disShowFrom.Chulijishu = true
        }
        if (this.selectVo.NoFenchaType !== '') {
          //  有无分叉病变（数据库填了就是没有分叉
          this.disShowFrom.NoFenchaType = true
        }
        // ---------手术结果---------
        if (this.selectVo.LeftTrunkBalloon !== '') {
          //  左主干球囊数开始
          this.disShowFrom.LeftTrunkBalloon = true
        }
        if (this.selectVo.LeftMainSupport !== '') {
          //  左主干支架数开始
          this.disShowFrom.LeftMainSupport = true
        }
        if (this.selectVo.AnteriorDescendingBalloon !== '') {
          //  前降支球囊数开始
          this.disShowFrom.AnteriorDescendingBalloon = true
        }
        if (this.selectVo.AnteriorDescendingSupport !== '') {
          //  前降支支架数开始
          this.disShowFrom.AnteriorDescendingSupport = true
        }
        if (this.selectVo.CyclotronBalloon !== '') {
          //  回旋支球囊数开始
          this.disShowFrom.CyclotronBalloon = true
        }
        if (this.selectVo.CyclotronSupport !== '') {
          //  回旋支支架数开始
          this.disShowFrom.CyclotronSupport = true
        }
        if (this.selectVo.RightCoronaryBalloon !== '') {
          //  右冠球囊数开始
          this.disShowFrom.RightCoronaryBalloon = true
        }
        if (this.selectVo.RightCoronarySupport !== '') {
          //  右冠支架数开始
          this.disShowFrom.RightCoronarySupport = true
        }
        // ---------器材信息---------
        if (this.selectVo.ProductName !== '') {
          // 器材名称
          this.disShowFrom.ProductName = true
        }
        if (this.selectVo.ProductModel !== '') {
          //  型号
          this.disShowFrom.ProductModel = true
        }
        if (this.selectVo.ProductStyle !== '') {
          //  规格
          this.disShowFrom.ProductStyle = true
        }
        if (this.selectVo.LargeClass.length > 0) {
          // 大类别
          this.disShowFrom.LargeClass = true
        }
        if (this.selectVo.SmallClass.length > 0) {
          this.disShowFrom.SmallClass = true
        }
        if (this.selectVo.providername.length > 0) {
          this.disShowFrom.providername = true
        }
      },
      // 筛选数据
      selectDataClick () {
        // ---------手术基本信息---------
        this.disFn()
        this.tabList.surgeryOne = false
        this.tabList.radioOne = false
        this.tabList.lesionOne = false
        this.tabList.surgeryTwo = false
        this.tabList.equipmentTwo = false
        this.tabList.selectTabPage = false
        // this.tabList.screenTabPage = true
        this.tabList.selectTabScreen = true
        this.tabList.showPageNum = 2
      },
      // 筛选页面
      // 筛选条件
      changeScreen (val) {
        this.tabList.listInfo = false
        this.tabList.histogram = false
        this.tabList.pieChart = false
        this.tabList.screenTabPage = true
        // 病变信息
        if (val === '1') {
          this.tabList.lessionDia = true
          this.tabList.productDia = false
          this.tabList.resultDia = false
          this.tabList.lessionProjectDia = true
          this.tabList.productProjectDia = false
          this.tabList.resultProjectDia = false
          this.tabList.screenSelectInfo = val
          this.tabList.lesionOne = true
          this.tabList.surgeryTwo = false
          this.tabList.equipmentTwo = false
          // 显示数据表格
          this.tabList.lesionTab = true // 病变表
          this.tabList.resultTab = false // 手术结果表格
          this.tabList.productTab = false // 器材表格
          // 显示筛选
          this.tabList.getScreen = false
          // this.getSelect()
        } else if (val === '2') {
          // 器材信息
          this.tabList.lesionOne = false
          this.tabList.surgeryTwo = false
          this.tabList.equipmentTwo = true
          // 显示数据表格
          this.tabList.lesionTab = false // 病变表
          this.tabList.resultTab = false // 手术结果表格
          this.tabList.productTab = true // 器材表格
          // 显示筛选
          this.tabList.getScreen = false
          this.tabList.lessionDia = false
          this.tabList.productDia = true
          this.tabList.resultDia = false
          this.tabList.lessionProjectDia = false
          this.tabList.productProjectDia = true
          this.tabList.resultProjectDia = false
          // this.getSelect()
        } else if (val === '3') {
          // 手术信息
          this.tabList.lesionOne = false
          this.tabList.surgeryTwo = true
          this.tabList.equipmentTwo = false
          // 显示数据表格
          this.tabList.lesionTab = false // 病变表
          this.tabList.resultTab = true // 手术结果表格
          this.tabList.productTab = false // 器材表格
          // 显示筛选
          this.tabList.lessionDia = false
          this.tabList.productDia = false
          this.tabList.resultDia = true
          this.tabList.lessionProjectDia = false
          this.tabList.productProjectDia = false
          this.tabList.resultProjectDia = true
          // this.getSelect()
          // 显示筛选
          this.tabList.getScreen = false
        } else if (val === '') {
          this.tabList.lesionOne = false
          this.tabList.surgeryTwo = false
          this.tabList.equipmentTwo = false
        }
      },
      // 筛选
      getScreen () {
        this.tabList.screenShowPage = true
        this.getSelect()
      },
      // 重置
      resetScreenClick (formName) {
        this.scrVo = new screenVo()
      },
      // 返回查询页面
      goBackClick () {
        this.disShowFn()
        this.tabList.lesionTab = false // 病变表
        this.tabList.resultTab = false // 手术结果表格
        this.tabList.productTab = false // 器材表格
        this.tabList.surgeryOne = true
        this.tabList.radioOne = true
        this.tabList.lesionOne = true
        this.tabList.surgeryTwo = true
        this.tabList.equipmentTwo = true
        this.tabList.selectTabPage = true
        this.tabList.screenTabPage = false
        this.tabList.screenShowPage = false
        this.tabList.selectTabScreen = false
        this.tabList.screenDis = false
        this.tabList.screenDimensionality = ''
        this.tabList.listInfo = false
        this.tabList.histogram = false
        this.tabList.pieChart = false
        this.tabList.screenTabPage = false
        this.tabList.getScreen = true
        this.scrVo = new screenVo()
      },
      // 导出维度数据
      exportProject () {
        this.getSelect(3)
      },
      // 导出病人列表
      exportPatient () {
        this.getSelect(4)
      },
      // 导出数据项分组
      selectDataEcport () {
        this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 需要导出的数据
          let exlData1 = this.lessionGroup
          let exlData2 = this.productGroup
          let exlData3 = this.resultGroup
          if (this.tabList.lessionProjectDia === true) {
            this.excelDataLesionGroup = JSON.parse(JSON.stringify(exlData1)) // 为了防止在处理导出数据的时候影响到表格数据，这里需要深拷贝！！
            if (this.tabList.lesionInfos === 'Quanbise') {
              this.exportLesionExcelGroup1('是否闭塞', 'Quanbise')
            } else if (this.tabList.lesionInfos === 'Xiazhailv') {
              this.exportLesionExcelGroup1('狭窄率', 'Xiazhailv')
            } else if (this.tabList.lesionInfos === 'FenzhiName') {
              this.exportLesionExcelGroup1('分支血管名', 'FenzhiName')
            } else if (this.tabList.lesionInfos === 'Zhijianeizaixiazhai') {
              this.exportLesionExcelGroup1('支架内在狭窄', 'Zhijianeizaixiazhai')
            } else if (this.tabList.lesionInfos === 'NoFenchaType') {
              this.exportLesionExcelGroup1('病变类型', 'NoFenchaType')
            } else if (this.tabList.lesionInfos === 'BiseTime') {
              this.exportLesionExcelGroup1('闭塞时间', 'BiseTime')
            } else if (this.tabList.lesionInfos === 'Bisehounixiangxueliu') {
              this.exportLesionExcelGroup1('闭塞之后逆向血管', 'Bisehounixiangxueliu')
            } else if (this.tabList.lesionInfos === 'LengthFanwei') {
              this.exportLesionExcelGroup1('长度范围', 'LengthFanwei')
            } else if (this.tabList.lesionInfos === 'Xueshuan') {
              this.exportLesionExcelGroup1('血栓', 'Xueshuan')
            } else if (this.tabList.lesionInfos === 'Qianxiangxueliu') {
              this.exportLesionExcelGroup1('前向血流', 'Qianxiangxueliu')
            } else if (this.tabList.lesionInfos === 'Gaihua') {
              this.exportLesionExcelGroup1('钙化', 'Gaihua')
            } else if (this.tabList.lesionInfos === 'Shuangfencha') {
              this.exportLesionExcelGroup1('分叉病变分型', 'Shuangfencha')
            } else if (this.tabList.lesionInfos === 'Sanfenchabingbian') {
              this.exportLesionExcelGroup1('三叉病变节段', 'Sanfenchabingbian')
            } else if (this.tabList.lesionInfos === 'LocationFrom') {
              this.exportLesionExcelGroup1('闭塞起始血管段', 'LocationFrom')
            } else if (this.tabList.lesionInfos === 'Dunxingcanduan') {
              this.exportLesionExcelGroup1('钝型残端', 'Dunxingcanduan')
            } else if (this.tabList.lesionInfos === 'Qiaoxueguan') {
              this.exportLesionExcelGroup1('血管桥(病变中)', 'Qiaoxueguan')
            } else if (this.tabList.lesionInfos === 'canzhaoxueguanzhijing') {
              this.exportLesionExcelGroup1('参照血管直径', 'canzhaoxueguanzhijing')
            } else if (this.tabList.lesionInfos === 'bingbianchangdu') {
              this.exportLesionExcelGroup1('病变长度', 'bingbianchangdu')
            } else if (this.tabList.lesionInfos === 'shuqianminguanqiangzhijing') {
              this.exportLesionExcelGroup1('术前最小官腔直径', 'shuqianminguanqiangzhijing')
            } else if (this.tabList.lesionInfos === 'xiazhaichengdu') {
              this.exportLesionExcelGroup1('狭窄程度', 'xiazhaichengdu')
            } else if (this.tabList.lesionInfos === 'Qcaxuaguanzhijing') {
              this.exportLesionExcelGroup1('术前参照血管直径', 'Qcaxuaguanzhijing')
            } else if (this.tabList.lesionInfos === 'Qcabingbianchangdu') {
              this.exportLesionExcelGroup1('术前病变长度', 'Qcabingbianchangdu')
            } else if (this.tabList.lesionInfos === 'Qcaxiazhai') {
              this.exportLesionExcelGroup1('术前狭窄程度', 'Qcaxiazhai')
            } else if (this.tabList.lesionInfos === 'Qcaminzhijing') {
              this.exportLesionExcelGroup1('QCA术前最小官腔直径', 'Qcaminzhijing')
            } else if (this.tabList.lesionInfos === 'Qcaafterxiazhaichengdu') {
              this.exportLesionExcelGroup1('球囊预处理后狭窄', 'Qcaafterxiazhaichengdu')
            } else if (this.tabList.lesionInfos === 'Qcaafterminzhijing') {
              this.exportLesionExcelGroup1('球囊预处理后最小官腔直径', 'Qcaafterminzhijing')
            } else if (this.tabList.lesionInfos === 'Chulijishu') {
              this.exportLesionExcelGroup1('处理技术', 'Chulijishu')
            } else if (this.tabList.lesionInfos === 'isFencha') {
              this.exportLesionExcelGroup1('有无分叉病变', 'isFencha')
            }
          } else if (this.tabList.productProjectDia === true) {
            this.excelDataProductGroup = JSON.parse(JSON.stringify(exlData2)) // 为了防止在处理导出数据的时候影响到表格数据，这里需要深拷贝！！
            if (this.tabList.productInfos === 'ProductName') {
              this.exportProductExcelGroup1('器材名称', 'ProductName')
            } else if (this.tabList.productInfos === 'ProductStyle') {
              // this.exportProductExcelGroup2()
              this.exportProductExcelGroup1('规格', 'ProductStyle')
            } else if (this.tabList.productInfos === 'ProductModel') {
              this.exportProductExcelGroup1('型号', 'ProductModel')
            } else if (this.tabList.productInfos === 'LargeClass') {
              this.exportProductExcelGroup1('大类名称', 'LargeClass')
            } else if (this.tabList.productInfos === 'SmallClass') {
              this.exportProductExcelGroup1('小类名称', 'SmallClass')
            } else if (this.tabList.productInfos === 'ManufacturerName') {
              this.exportProductExcelGroup1('厂家品牌', 'ManufacturerName')
            }
          } else if (this.tabList.resultProjectDia === true) {
            this.excelDataResultGroup = JSON.parse(JSON.stringify(exlData3)) // 为了防止在处理导出数据的时候影响到表格数据，这里需要深拷贝！！
            if (this.tabList.resultInfos === 'LmSacculus') {
              this.exportResultExcelGroup1('左主干球囊数', 'LmSacculus')
            } else if (this.tabList.resultInfos === 'LmSupport') {
              this.exportResultExcelGroup1('左主干支架数', 'LmSupport')
            } else if (this.tabList.resultInfos === 'LADSacculus') {
              this.exportResultExcelGroup1('前降支球囊数', 'LADSacculus')
            } else if (this.tabList.resultInfos === 'LADSupport') {
              this.exportResultExcelGroup1('前降支支架数', 'LADSupport')
            } else if (this.tabList.resultInfos === 'LCXSacculus') {
              this.exportResultExcelGroup1('回旋支球囊数', 'LCXSacculus')
            } else if (this.tabList.resultInfos === 'LCXSupport') {
              this.exportResultExcelGroup1('回旋支支架数', 'LCXSupport')
            } else if (this.tabList.resultInfos === 'RCASacculus') {
              this.exportResultExcelGroup1('右冠球囊数', 'RCASacculus')
            } else if (this.tabList.resultInfos === 'RCASupport') {
              this.exportResultExcelGroup1('右冠支架数', 'RCASupport')
            }
          }
        }).catch(() => {
          // this.$message.error('导出操作出现了异常，请稍后重试！')
        })
      },
      // 导出查询内容列表
      // 参数配置
      // 导出病人列表
      exportPatientExcel () {
        var that = this;
        require.ensure([], () => {
          const {export_json_to_excel} = require('../vendor/Export2Excel') //这里必须使用绝对路径，这个文件就是之前那两个依赖的JS
          const tHeader = [
            '患者姓名', '性别', '出生日期', '身份证号', '患者编号'
          ] // 导出的表头名（key）
          const filterVal = [
            'PatientName', 'Sex', 'DateTimeOfBirth',
            'PatiIdentity', 'PatientIdentifierList'
          ] // 导出的表头字段名（value）
          const list = that.excelDataPatient
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, `统计表`) // 导出的表格名称，根据需要自己命名
        })
      },
      exportLesionExcel () {
        var that = this;
        require.ensure([], () => {
          const {export_json_to_excel} = require('../vendor/Export2Excel') //这里必须使用绝对路径，这个文件就是之前那两个依赖的JS
          const tHeader = [
            '病变标识', '血管段', '是否闭塞',
            '狭窄率', '支架内在狭窄', '单支类型',
            '长度范围', '血栓', '前向血流',
            '钙化', '分叉成角', '分叉(三叉)病变分型',
            '闭塞起始血管段', '钝型残端', '桥血管', '参照血管直径',
            '病变长度', '术前最小官腔直径', '狭窄程度', '术前参照血管直径', '术前病变长度', '术前狭窄程度', 'QCA术前最小官腔直径', '球囊预处理后狭窄程度', '球囊预处理后最小宫腔直径', '处理技术'
          ] // 导出的表头名（key）
          const filterVal = [
            'Name', 'MainLocationFrom', 'Quanbise',
            'Xiazhailv', 'Zhijianeizaixiazhai', 'NoFenchaType',
            'LengthFanwei', 'Xueshuan', 'Qianxiangxueliu',
            'Gaihua', 'Chengjiao', 'Shuangfencha',
            'LocationFrom', 'Dunxingcanduan', 'Qiaoxueguan', 'canzhaoxueguanzhijing',
            'bingbianchangdu', 'shuqianminguanqiangzhijing', 'xiazhaichengdu', 'Qcaxuaguanzhijing',
            'Qcabingbianchangdu', 'Qcaxiazhai', 'Qcaminzhijing', 'Qcaafterxiazhaichengdu', 'Qcaafterminzhijing',
            'Chulijishu'
          ] // 导出的表头字段名（value）
          const list = that.excelDataLesion
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, `统计表`) // 导出的表格名称，根据需要自己命名
        })
      },
      exportProductExcel () {
        var that = this;
        require.ensure([], () => {
          const {export_json_to_excel} = require('../vendor/Export2Excel') //这里必须使用绝对路径，这个文件就是之前那两个依赖的JS
          const tHeader = [
            '手术号', '使用日期', '器材类别',
            '细分类别', '名称', '规格',
            '型号', '品牌厂家'
          ] // 导出的表头名（key）
          const filterVal = [
            'SurCode', 'Time', 'LargeClass',
            'SmallClass', 'ProductName', 'ProductStyle',
            'ProductModel', 'providerName'
          ] // 导出的表头字段名（value）
          const list = that.excelDataProduct
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, `统计表`) // 导出的表格名称，根据需要自己命名
        })
      },
      exportResultExcel () {
        var that = this;
        require.ensure([], () => {
          const {export_json_to_excel} = require('../vendor/Export2Excel') //这里必须使用绝对路径，这个文件就是之前那两个依赖的JS
          const tHeader = [
            '手术号', '部位', '器材',
            'TIMI血流'
          ] // 导出的表头名（key）
          const filterVal = [
            'SurCode', 'position', 'equipment',
            'TIMI'
          ] // 导出的表头字段名（value）
          const list = that.excelDataResult
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, `统计表`) // 导出的表格名称，根据需要自己命名
        })
      },
      // 导出数据项分组
      exportLesionExcelGroup1 (num, name) {
        var that = this;
        require.ensure([], () => {
          const {export_json_to_excel} = require('../vendor/Export2Excel') //这里必须使用绝对路径，这个文件就是之前那两个依赖的JS
          const tHeader = ['数量', num] // 导出的表头名（key）
          const filterVal = ['num', name] // 导出的表头字段名（value）
          const list = that.excelDataLesionGroup
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, `统计表`) // 导出的表格名称，根据需要自己命名
        })
      },
      exportProductExcelGroup1 (num, name) {
        var that = this;
        require.ensure([], () => {
          const {export_json_to_excel} = require('../vendor/Export2Excel') //这里必须使用绝对路径，这个文件就是之前那两个依赖的JS
          const tHeader = ['数量', num]
          // 导出的表头名（key）
          const filterVal = ['num', name]
          // 导出的表头字段名（value）
          const list = that.excelDataProductGroup
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, `统计表`) // 导出的表格名称，根据需要自己命名
        })
      },
      exportResultExcelGroup1 (num, name) {
        var that = this;
        require.ensure([], () => {
          const {export_json_to_excel} = require('../vendor/Export2Excel') //这里必须使用绝对路径，这个文件就是之前那两个依赖的JS
          const tHeader = ['数量', num] // 导出的表头名（key）
          const filterVal = ['num', name] // 导出的表头字段名（value）
          const list = that.excelDataResultGroup
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, `统计表`) // 导出的表格名称，根据需要自己命名
        })
      },
      // 选择要展示的数据
      selectDataShow () {
        this.tabList.dialogVisible = true
      },
      // 数据项分组
      selectDataShowProject () {
        this.tabList.dialogVisibleProject = true
      },
      //弹出框
      closeData () {
        this.tabList.dialogVisible = false
        if (this.tabList.screenDimensionality === '1') {
          this.tabList.shuttleInfo = this.tabList.shuttle
        } else if (this.tabList.screenDimensionality === '2') {
          this.tabList.shuttleProductInfo = this.tabList.shuttleProduct
        } else if (this.tabList.screenDimensionality === '3') {
          this.tabList.shuttleResultInfo = this.tabList.shuttleResult
        }
      },
      closeDataProject () {
        let levelInfo = {
          level: '',
          filters: this.equipmentList.filters
        }
        // this.productInfos
        let sizes = parseInt(this.tabList.sizeInfo)
        if (this.tabList.lessionProjectDia === true) {
          levelInfo.level = 'SURLESION'
          Api.getLesiontVo(sizes, this.tabList.lesionInfos, levelInfo).then(res => {
            if (res) {
              this.$message({
                message: '获取成功!',
                type: 'success'
              })
              this.lessionGroup = res // 器材信息
              let lessionName1 = []
              let pieLession1 = []
              let pieLession2 = []
              let pieLession3 = []
              let pieLession4 = []
              let pieLession5 = []
              let pieLession6 = []
              let pieLession7 = []
              let pieLession8 = []
              let pieLession9 = []
              let pieLession10 = []
              let pieLession11 = []
              let pieLession12 = []
              let pieLession13 = []
              let pieLession14 = []
              let pieLession15 = []
              let pieLession16 = []
              let pieLession17 = []
              let pieLession18 = []
              let pieLession19 = []
              let pieLession20 = []
              let pieLession21 = []
              let pieLession22 = []
              let pieLession23 = []
              let pieLession24 = []
              let pieLession25 = []
              let pieLession26 = []
              let pieLession27 = []
              let pieLession28 = []
              let treeLession1 = []
              let treeLession2 = []
              let treeLession3 = []
              let treeLession4 = []
              let treeLession5 = []
              let treeLession6 = []
              let treeLession7 = []
              let treeLession8 = []
              let treeLession9 = []
              let treeLession10 = []
              let treeLession11 = []
              let treeLession12 = []
              let treeLession13 = []
              let treeLession14 = []
              let treeLession15 = []
              let treeLession16 = []
              let treeLession17 = []
              let treeLession18 = []
              let treeLession19 = []
              let treeLession20 = []
              let treeLession21 = []
              let treeLession22 = []
              let treeLession23 = []
              let treeLession24 = []
              let treeLession25 = []
              let treeLession26 = []
              let treeLession27 = []
              let treeLession28 = []
              this.tabList.dialogVisibleProject = false
              let lesionInfos = this.tabList.lesionInfos
              Object.keys(res).forEach(function (key) {
                lessionName1.push({value: res[key].num})
                treeLession1.push(res[key].Quanbise)
                treeLession2.push(res[key].Xiazhailv)
                treeLession3.push(res[key].FenzhiName)
                treeLession4.push(res[key].Zhijianeizaixiazhai)
                treeLession5.push(res[key].NoFenchaType)
                treeLession6.push(res[key].BiseTime)
                treeLession7.push(res[key].Bisehounixiangxueliu)
                treeLession8.push(res[key].LengthFanwei)
                treeLession9.push(res[key].Xueshuan)
                treeLession10.push(res[key].Qianxiangxueliu)
                treeLession11.push(res[key].Gaihua)
                treeLession12.push(res[key].Shuangfencha)
                treeLession13.push(res[key].Sanfenchabingbian)
                treeLession14.push(res[key].LocationFrom)
                treeLession15.push(res[key].Dunxingcanduan)
                treeLession16.push(res[key].Qiaoxueguan)
                treeLession17.push(res[key].canzhaoxueguanzhijing)
                treeLession18.push(res[key].bingbianchangdu)
                treeLession19.push(res[key].shuqianminguanqiangzhijing)
                treeLession20.push(res[key].xiazhaichengdu)
                treeLession21.push(res[key].Qcaxuaguanzhijing)
                treeLession22.push(res[key].Qcabingbianchangdu)
                treeLession23.push(res[key].Qcaxiazhai)
                treeLession24.push(res[key].Qcaminzhijing)
                treeLession25.push(res[key].Qcaafterxiazhaichengdu)
                treeLession26.push(res[key].Qcaafterminzhijing)
                treeLession27.push(res[key].Chulijishu)
                treeLession28.push(res[key].isFencha)
                pieLession1.push({value: res[key].num, name: res[key].Quanbise})
                pieLession2.push({value: res[key].num, name: res[key].Xiazhailv})
                pieLession3.push({value: res[key].num, name: res[key].FenzhiName})
                pieLession4.push({value: res[key].num, name: res[key].Zhijianeizaixiazhai})
                pieLession5.push({value: res[key].num, name: res[key].NoFenchaType})
                pieLession6.push({value: res[key].num, name: res[key].BiseTime})
                pieLession7.push({value: res[key].num, name: res[key].Bisehounixiangxueliu})
                pieLession8.push({value: res[key].num, name: res[key].LengthFanwei})
                pieLession9.push({value: res[key].num, name: res[key].Xueshuan})
                pieLession10.push({value: res[key].num, name: res[key].Qianxiangxueliu})
                pieLession11.push({value: res[key].num, name: res[key].Gaihua})
                pieLession12.push({value: res[key].num, name: res[key].Shuangfencha})
                pieLession13.push({value: res[key].num, name: res[key].Sanfenchabingbian})
                pieLession14.push({value: res[key].num, name: res[key].LocationFrom})
                pieLession15.push({value: res[key].num, name: res[key].Dunxingcanduan})
                pieLession16.push({value: res[key].num, name: res[key].Qiaoxueguan})
                pieLession17.push({value: res[key].num, name: res[key].canzhaoxueguanzhijing})
                pieLession18.push({value: res[key].num, name: res[key].bingbianchangdu})
                pieLession19.push({value: res[key].num, name: res[key].shuqianminguanqiangzhijing})
                pieLession20.push({value: res[key].num, name: res[key].xiazhaichengdu})
                pieLession21.push({value: res[key].num, name: res[key].Qcaxuaguanzhijing})
                pieLession22.push({value: res[key].num, name: res[key].Qcabingbianchangdu})
                pieLession23.push({value: res[key].num, name: res[key].Qcaxiazhai})
                pieLession24.push({value: res[key].num, name: res[key].Qcaminzhijing})
                pieLession25.push({value: res[key].num, name: res[key].Qcaafterxiazhaichengdu})
                pieLession26.push({value: res[key].num, name: res[key].Qcaafterminzhijing})
                pieLession27.push({value: res[key].num, name: res[key].Chulijishu})
                pieLession28.push({value: res[key].num, name: res[key].isFencha})
              })
              if (lesionInfos === 'Quanbise') {
                this.LessionT1(lessionName1, treeLession1)
                this.PieLession1(pieLession1)
              } else if (lesionInfos === 'Xiazhailv') {
                this.LessionT1(lessionName1, treeLession2)
                this.PieLession1(pieLession2)
              } else if (lesionInfos === 'FenzhiName') {
                this.LessionT1(lessionName1, treeLession3)
                this.PieLession1(pieLession3)
              } else if (lesionInfos === 'Zhijianeizaixiazhai') {
                this.LessionT1(lessionName1, treeLession4)
                this.PieLession1(pieLession4)
              } else if (lesionInfos === 'NoFenchaType') {
                this.LessionT1(lessionName1, treeLession5)
                this.PieLession1(pieLession5)
              } else if (lesionInfos === 'BiseTime') {
                this.LessionT1(lessionName1, treeLession6)
                this.PieLession1(pieLession6)
              } else if (lesionInfos === 'Bisehounixiangxueliu') {
                this.LessionT1(lessionName1, treeLession7)
                this.PieLession1(pieLession7)
              } else if (lesionInfos === 'LengthFanwei') {
                this.LessionT1(lessionName1, treeLession8)
                this.PieLession1(pieLession8)
              } else if (lesionInfos === 'Xueshuan') {
                this.LessionT1(lessionName1, treeLession9)
                this.PieLession1(pieLession9)
              } else if (lesionInfos === 'Qianxiangxueliu') {
                this.LessionT1(lessionName1, treeLession10)
                this.PieLession1(pieLession10)
              } else if (lesionInfos === 'Gaihua') {
                this.LessionT1(lessionName1, treeLession11)
                this.PieLession1(pieLession11)
              } else if (lesionInfos === 'Shuangfencha') {
                this.LessionT1(lessionName1, treeLession12)
                this.PieLession1(pieLession12)
              } else if (lesionInfos === 'Sanfenchabingbian') {
                this.LessionT1(lessionName1, treeLession13)
                this.PieLession1(pieLession13)
              } else if (lesionInfos === 'LocationFrom') {
                this.LessionT1(lessionName1, treeLession14)
                this.PieLession1(pieLession14)
              } else if (lesionInfos === 'Dunxingcanduan') {
                this.LessionT1(lessionName1, treeLession15)
                this.PieLession1(pieLession15)
              } else if (lesionInfos === 'Qiaoxueguan') {
                this.LessionT1(lessionName1, treeLession16)
                this.PieLession1(pieLession16)
              } else if (lesionInfos === 'canzhaoxueguanzhijing') {
                this.LessionT1(lessionName1, treeLession17)
                this.PieLession1(pieLession17)
              } else if (lesionInfos === 'bingbianchangdu') {
                this.LessionT1(lessionName1, treeLession18)
                this.PieLession1(pieLession18)
              } else if (lesionInfos === 'shuqianminguanqiangzhijing') {
                this.LessionT1(lessionName1, treeLession19)
                this.PieLession1(pieLession19)
              } else if (lesionInfos === 'xiazhaichengdu') {
                this.LessionT1(lessionName1, treeLession20)
                this.PieLession1(pieLession20)
              } else if (lesionInfos === 'Qcaxuaguanzhijing') {
                this.LessionT1(lessionName1, treeLession21)
                this.PieLession1(pieLession21)
              } else if (lesionInfos === 'Qcabingbianchangdu') {
                this.LessionT1(lessionName1, treeLession22)
                this.PieLession1(pieLession22)
              } else if (lesionInfos === 'Qcaxiazhai') {
                this.LessionT1(lessionName1, treeLession23)
                this.PieLession1(pieLession23)
              } else if (lesionInfos === 'Qcaminzhijing') {
                this.LessionT1(lessionName1, treeLession24)
                this.PieLession1(pieLession24)
              } else if (lesionInfos === 'Qcaafterxiazhaichengdu') {
                this.LessionT1(lessionName1, treeLession25)
                this.PieLession1(pieLession25)
              } else if (lesionInfos === 'Qcaafterminzhijing') {
                this.LessionT1(lessionName1, treeLession26)
                this.PieLession1(pieLession26)
              } else if (lesionInfos === 'Chulijishu') {
                this.LessionT1(lessionName1, treeLession27)
                this.PieLession1(pieLession27)
              } else if (lesionInfos === 'isFencha') {
                this.LessionT1(lessionName1, treeLession28)
                this.PieLession1(pieLession28)
              }
            } else {
              this.$message({
                message: '获取失败!',
                type: 'warning'
              })
            }
          })
        } else if (this.tabList.productProjectDia === true) {
          levelInfo.level = 'stkproduct'
          Api.getProductVo(sizes, this.tabList.productInfos, levelInfo).then(res => {
            if (res) {
              this.$message({
                message: '获取成功!',
                type: 'success'
              })
              this.productGroup = res // 器材信息
              let productName1 = []
              let treeProduct1 = []
              let treeProduct2 = []
              let treeProduct3 = []
              let treeProduct4 = []
              let treeProduct5 = []
              let treeProduct6 = []
              let pieProduct1 = []
              let pieProduct2 = []
              let pieProduct3 = []
              let pieProduct4 = []
              let pieProduct5 = []
              let pieProduct6 = []
              this.tabList.dialogVisibleProject = false
              Object.keys(res).forEach(function (key) {
                productName1.push({value: res[key].num})
                treeProduct1.push(res[key].ProductName)
                treeProduct2.push(res[key].ProductStyle)
                treeProduct3.push(res[key].ProductModel)
                treeProduct4.push(res[key].LargeClass)
                treeProduct5.push(res[key].SmallClass)
                treeProduct6.push(res[key].ManufacturerName)
                pieProduct1.push({value: res[key].num, name: res[key].ProductName})
                pieProduct2.push({value: res[key].num, name: res[key].ProductStyle})
                pieProduct3.push({value: res[key].num, name: res[key].ProductModel})
                pieProduct4.push({value: res[key].num, name: res[key].LargeClass})
                pieProduct5.push({value: res[key].num, name: res[key].SmallClass})
                pieProduct6.push({value: res[key].num, name: res[key].ManufacturerName})
              })
              let infos = this.tabList.productInfos
              if (infos === 'ProductName') {
                this.productT1(productName1, treeProduct1)
                this.Pieproduct1(pieProduct1)
              } else if (infos === 'ProductStyle') {
                this.productT1(productName1, treeProduct2)
                this.Pieproduct1(pieProduct2)
              } else if (infos === 'ProductModel') {
                this.productT1(productName1, treeProduct3)
                this.Pieproduct1(pieProduct3)
              } else if (infos === 'LargeClass') {
                this.productT1(productName1, treeProduct4)
                this.Pieproduct1(pieProduct4)
              } else if (infos === 'SmallClass') {
                this.productT1(productName1, treeProduct5)
                this.Pieproduct1(pieProduct5)
              } else if (infos === 'ManufacturerName') {
                this.productT1(productName1, treeProduct6)
                this.Pieproduct1(pieProduct6)
              }
            } else {
              this.$message({
                message: '获取失败!',
                type: 'warning'
              })
            }
          })
        } else if (this.tabList.resultProjectDia === true) {
          // this.resultGroup = res
          levelInfo.level = 'SURRESULT'
          Api.getRecultVo(sizes, this.tabList.resultInfos, levelInfo).then(res => {
            if (res) {
              this.$message({
                message: '获取成功!',
                type: 'success'
              })
              this.resultGroup = res // 器材信息
              let resultName1 = []
              let treeResult1 = []
              let treeResult2 = []
              let treeResult3 = []
              let treeResult4 = []
              let treeResult5 = []
              let treeResult6 = []
              let treeResult7 = []
              let treeResult8 = []
              let pieResult1 = []
              let pieResult2 = []
              let pieResult3 = []
              let pieResult4 = []
              let pieResult5 = []
              let pieResult6 = []
              let pieResult7 = []
              let pieResult8 = []
              this.tabList.dialogVisibleProject = false
              let resultInfos = this.tabList.resultInfos
              Object.keys(res).forEach(function (key) {
                resultName1.push({value: res[key].num})
                treeResult1.push(res[key].LmSacculus)
                treeResult2.push(res[key].LmSupport)
                treeResult3.push(res[key].LADSacculus)
                treeResult4.push(res[key].LADSupport)
                treeResult5.push(res[key].LCXSacculus)
                treeResult6.push(res[key].LCXSupport)
                treeResult7.push(res[key].RCASacculus)
                treeResult8.push(res[key].RCASupport)
                pieResult1.push({value: res[key].num, name: res[key].LmSacculus})
                pieResult2.push({value: res[key].num, name: res[key].LmSupport})
                pieResult3.push({value: res[key].num, name: res[key].LADSacculus})
                pieResult4.push({value: res[key].num, name: res[key].LADSupport})
                pieResult5.push({value: res[key].num, name: res[key].LCXSacculus})
                pieResult6.push({value: res[key].num, name: res[key].LCXSupport})
                pieResult7.push({value: res[key].num, name: res[key].RCASacculus})
                pieResult8.push({value: res[key].num, name: res[key].RCASupport})
              })
              if (resultInfos === 'LmSacculus') {
                this.ResultT1(resultName1, treeResult1)
                this.PieResult1(pieResult1)
              } else if (resultInfos === 'LmSupport') {
                this.ResultT1(resultName1, treeResult2)
                this.PieResult1(pieResult2)
              } else if (resultInfos === 'LADSacculus') {
                this.ResultT1(resultName1, treeResult3)
                this.PieResult1(pieResult3)
              } else if (resultInfos === 'LADSupport') {
                this.ResultT1(resultName1, treeResult4)
                this.PieResult1(pieResult4)
              } else if (resultInfos === 'LCXSacculus') {
                this.ResultT1(resultName1, treeResult5)
                this.PieResult1(pieResult5)
              } else if (resultInfos === 'LCXSupport') {
                this.ResultT1(resultName1, treeResult6)
                this.PieResult1(pieResult6)
              } else if (resultInfos === 'RCASacculus') {
                this.ResultT1(resultName1, treeResult7)
                this.PieResult1(pieResult7)
              } else if (resultInfos === 'RCASupport') {
                this.ResultT1(resultName1, treeResult8)
                this.PieResult1(pieResult8)
              }
            } else {
              this.$message({
                message: '获取失败!',
                type: 'warning'
              })
            }
          })
        }
      },
      // 病变 柱状图
      LessionT1 (lessionName1, treeLession) {
        let dom1 = document.getElementById('echartsLession1')
        let myChart1 = this.echarts.init(dom1)
        myChart1.setOption({
          toolbox: {
            show: true,
            left: 'center',
            feature: {
              saveAsImage: {}
            }
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            formatter: '{a} <br/>{b} : {c}',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: treeLession,
              interval: 0,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 0,
                rotate: 30
              }
            }
          ],
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [
            {
              label: '数量',
              name: '数量',
              type: 'bar',
              barWidth: 40,
              color: '#003366',
              left: '2%',
              animation: true,
              data: lessionName1
            }
          ],
          label: {
            show: true,
            position: 'top',
            formatter: '{c}'　　　　//这是关键，在需要的地方加上就行了
          }
        })
      },
      PieLession1 (pieLession) {
        // 绘制图表
        let dom1 = document.getElementById('pieLession1')
        let myChart1 = this.echarts.init(dom1)
        myChart1.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          toolbox: {
            show: true,
            left: 'center',
            feature: {
              saveAsImage: {}
            }
          },
          label: {
            formatter: '{a} {b} : {c} ({d}%)',
            backgroundColor: '#eee',
            borderColor: '#aaa',
          },
          series: {
            name: '',
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            data: pieLession,
            animation: true,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        })
      },
      productT1 (productName1, treeProduct) {
        let dom = document.getElementById('echartsProduct')
        let myChart = this.echarts.init(dom)
        myChart.setOption({
          toolbox: {
            show: true,
            left: 'center',
            feature: {
              saveAsImage: {}
            }
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            formatter: '{a} <br/>{b} : {c}',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: treeProduct,
              interval: 0,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 0,
                rotate: 30
              }
            }
          ],
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [
            {
              label: '数量',
              name: '数量',
              type: 'bar',
              barWidth: 40,
              color: '#003366',
              left: '2%',
              animation: true,
              data: productName1
            }
          ],
          label: {
            show: true,
            position: 'top',
            formatter: '{c}'　　　　//这是关键，在需要的地方加上就行了
          }
        })
      },
      Pieproduct1 (pieProduct) {
        let dom1 = document.getElementById('pieProduct1')
        let myChart1 = this.echarts.init(dom1)
        myChart1.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          toolbox: {
            show: true,
            left: 'center',
            feature: {
              saveAsImage: {}
            }
          },
          label: {
            formatter: '{a} {b} : {c} ({d}%)',
            backgroundColor: '#eee',
            borderColor: '#aaa',
          },
          series: {
            name: '',
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            data: pieProduct,
            animation: true,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        })
      },
      ResultT1 (resultName1, treeResult) {
        let dom1 = document.getElementById('echartsResult1')
        let myChart1 = this.echarts.init(dom1)
        myChart1.setOption({
          toolbox: {
            show: true,
            left: 'center',
            feature: {
              saveAsImage: {}
            }
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            formatter: '{a} <br/>{b} : {c}',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: resultName1,
              interval: 0,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 0,
                rotate: 30
              }
            }
          ],
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [
            {
              label: '数量',
              name: '数量',
              type: 'bar',
              barWidth: 40,
              color: '#003366',
              left: '2%',
              animation: true,
              data: treeResult
            }
          ],
          label: {
            show: true,
            position: 'top',
            formatter: '{c}'　　　　//这是关键，在需要的地方加上就行了
          }
        })
      },
      PieResult1 (pieResult) {
        // 绘制图表
        let dom1 = document.getElementById('pieResult1')
        let myChart1 = this.echarts.init(dom1)
        myChart1.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          toolbox: {
            show: true,
            left: 'center',
            feature: {
              saveAsImage: {}
            }
          },
          label: {
            formatter: '{a} {b} : {c} ({d}%)',
            backgroundColor: '#eee',
            borderColor: '#aaa',
          },
          series: {
            name: '',
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            data: pieResult,
            animation: true,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        })
      },
      changeList (val) {
        this.tabList.listInfo = val
      },
      changeHistogram (val) {
        this.tabList.histogram = val
      },
      changePieChart (val) {
        this.tabList.pieChart = val
      },
      rightChange (val) {
        this.tabList.shuttle = val
      },
      rightChangeProduct (val) {
        this.tabList.shuttleProduct = val
      },
      rightChangeResult (val) {
        this.tabList.shuttleResult = val
      },
      leftChange (e) {
        let len = this.tabList.lessionProjectData.length
        if (e.length === 0) {
          for (let i = 0; i < len; i++) {
            this.tabList.lessionProjectData[i].disabled = false
          }
        } else {
          for (let i = 0; i < len; i++) {
            this.tabList.lessionProjectData[i].disabled = true
          }
          this.tabList.lessionProjectData[e[0]].disabled = false
        }
      },
      rightChangeLession (e) {
      },
      changeLession (e) {
        this.tabList.productInfos = ''
        this.tabList.resultInfos = ''
        if (e[0] === 0) {
          this.tabList.lesionInfos = 'Quanbise'
        } else if (e[0] === 1) {
          this.tabList.lesionInfos = 'Xiazhailv'
        } else if (e[0] === 2) {
          this.tabList.lesionInfos = 'FenzhiName'
        } else if (e[0] === 3) {
          this.tabList.lesionInfos = 'Zhijianeizaixiazhai'
        } else if (e[0] === 4) {
          this.tabList.lesionInfos = 'NoFenchaType'
        } else if (e[0] === 5) {
          this.tabList.lesionInfos = 'BiseTime'
        } else if (e[0] === 6) {
          this.tabList.lesionInfos = 'Bisehounixiangxueliu'
        } else if (e[0] === 7) {
          this.tabList.lesionInfos = 'LengthFanwei'
        } else if (e[0] === 8) {
          this.tabList.lesionInfos = 'Xueshuan'
        } else if (e[0] === 9) {
          this.tabList.lesionInfos = 'Qianxiangxueliu'
        } else if (e[0] === 10) {
          this.tabList.lesionInfos = 'Gaihua'
        } else if (e[0] === 11) {
          this.tabList.lesionInfos = 'Shuangfencha'
        } else if (e[0] === 12) {
          this.tabList.lesionInfos = 'Sanfenchabingbian'
        } else if (e[0] === 13) {
          this.tabList.lesionInfos = 'LocationFrom'
        } else if (e[0] === 14) {
          this.tabList.lesionInfos = 'Dunxingcanduan'
        } else if (e[0] === 15) {
          this.tabList.lesionInfos = 'Qiaoxueguan'
        } else if (e[0] === 16) {
          this.tabList.lesionInfos = 'canzhaoxueguanzhijing'
        } else if (e[0] === 17) {
          this.tabList.lesionInfos = 'bingbianchangdu'
        } else if (e[0] === 18) {
          this.tabList.lesionInfos = 'shuqianminguanqiangzhijing'
        } else if (e[0] === 19) {
          this.tabList.lesionInfos = 'xiazhaichengdu'
        } else if (e[0] === 20) {
          this.tabList.lesionInfos = 'Qcaxuaguanzhijing'
        } else if (e[0] === 21) {
          this.tabList.lesionInfos = 'Qcabingbianchangdu'
        } else if (e[0] === 22) {
          this.tabList.lesionInfos = 'Qcaxiazhai'
        } else if (e[0] === 23) {
          this.tabList.lesionInfos = 'Qcaminzhijing'
        } else if (e[0] === 24) {
          this.tabList.lesionInfos = 'Qcaafterxiazhaichengdu'
        } else if (e[0] === 25) {
          this.tabList.lesionInfos = 'Qcaafterminzhijing'
        } else if (e[0] === 26) {
          this.tabList.lesionInfos = 'Chulijishu'
        } else if (e[0] === 27) {
          this.tabList.lesionInfos = 'isFencha'
        }
        let len = this.tabList.lessionProjectData.length
        if (e[0] !== undefined) {
          for (let i = 0; i < len; i++) {
            this.tabList.lessionProjectData[i].disabled = true
          }
          this.tabList.lessionProjectData[e[0]].disabled = false
        } else {
          for (let i = 0; i < len; i++) {
            this.tabList.lessionProjectData[i].disabled = false
          }
        }
      },
      leftChangeProduct (e) {
        let len = this.tabList.productProjectData.length
        if (e.length === 0) {
          for (let i = 0; i < len; i++) {
            this.tabList.productProjectData[i].disabled = false
          }
        } else {
          for (let i = 0; i < len; i++) {
            this.tabList.productProjectData[i].disabled = true
          }
          this.tabList.productProjectData[e[0]].disabled = false
        }
      },
      changeProduct (e) {
        this.tabList.lesionInfos = ''
        this.tabList.resultInfos = ''
        if (e[0] === 0) {
          this.tabList.productInfos = 'ProductName'
        } else if (e[0] === 1) {
          this.tabList.productInfos = 'ProductStyle'
        } else if (e[0] === 2) {
          this.tabList.productInfos = 'ProductModel'
        } else if (e[0] === 3) {
          this.tabList.productInfos = 'LargeClass'
        } else if (e[0] === 4) {
          this.tabList.productInfos = 'SmallClass'
        } else if (e[0] === 5) {
          this.tabList.productInfos = 'ManufacturerName'
        }
        let len = this.tabList.productProjectData.length
        if (e[0] !== undefined) {
          for (let i = 0; i < len; i++) {
            this.tabList.productProjectData[i].disabled = true
          }
          this.tabList.productProjectData[e[0]].disabled = false
        } else {
          for (let i = 0; i < len; i++) {
            this.tabList.productProjectData[i].disabled = false
          }
        }
      },
      leftChangeResult (e) {
        let len = this.tabList.resultProjectData.length
        if (e.length === 0) {
          for (let i = 0; i < len; i++) {
            this.tabList.resultProjectData[i].disabled = false
          }
        } else {
          for (let i = 0; i < len; i++) {
            this.tabList.resultProjectData[i].disabled = true
          }
          this.tabList.resultProjectData[e[0]].disabled = false
        }
      },
      changeResult (e) {
        this.tabList.lesionInfos = ''
        this.tabList.productInfos = ''
        // resultGroup
        if (e[0] === 0) {
          this.tabList.resultInfos = 'LmSacculus'
        } else if (e[0] === 1) {
          this.tabList.resultInfos = 'LmSupport'
        } else if (e[0] === 2) {
          this.tabList.resultInfos = 'LADSacculus'
        } else if (e[0] === 3) {
          this.tabList.resultInfos = 'LADSupport'
        } else if (e[0] === 4) {
          this.tabList.resultInfos = 'LCXSacculus'
        } else if (e[0] === 5) {
          this.tabList.resultInfos = 'LCXSupport'
        } else if (e[0] === 6) {
          this.tabList.resultInfos = 'RCASacculus'
        } else if (e[0] === 7) {
          this.tabList.resultInfos = 'RCASupport'
        }
        let len = this.tabList.resultProjectData.length
        if (e[0] !== undefined) {
          for (let i = 0; i < len; i++) {
            this.tabList.resultProjectData[i].disabled = true
          }
          this.tabList.resultProjectData[e[0]].disabled = false
        } else {
          for (let i = 0; i < len; i++) {
            this.tabList.resultProjectData[i].disabled = false
          }
        }
      }
    },
    mounted () {
    },
    created () {
      Api.getAllLargeClass().then(res => {
        if (res) {
          // 手术类型
          this.dictionariesList = res
        }
      })
    },
    computed: {
      ...mapGetters({}),
      ...mapState({}),
      _MainLocationFrom: {
        get () {
          if (this.tabList.selectTabPage === true) {
            return this.selectVo
          }
          if (this.tabList.selectTabScreen === true) {
            return this.scrVo
          }
        },
        set (val) {
          if (this.tabList.selectTabPage === true) {
            this.selectVo = val
          }
          if (this.tabList.selectTabScreen === true) {
            this.scrVo = val
          }
        }
      }
    },
    components: {
      'show-page': ShowPage
    }
  }
</script>

<style scoped>
  /deep/ .el-collapse-item__header {
    color: #409EFF;
    font-size: 14px;
    font-weight: 800;
  }

  /deep/ .el-transfer-panel {
    width: 250px;
  }

  /deep/ .el-transfer-panel .el-transfer-panel__header {
    display: none;
  }

  .separator {
    color: teal;
    /*padding: 0 2px 0 2px*/
  }

  .content {
    margin: 0 10px 10px 0;
    background-color: rgb(230, 242, 242)
  }

  .slips {
    line-height: 40px;
    margin-left: 20px;
  }

  .block {
    display: inline-block;
    background: teal;
    width: 5px;
    height: 40px;
    float: left
  }
</style>
