<template>
  <section v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-row id="demo">
      <el-col :span="24">
        <div class="content">
          <span class="block"></span>
          <span class="slips">报表统计</span>
        </div>
      </el-col>
      <el-col :span="24" v-show='false'>
        <div>
          <el-form inline size="mini">
            <!--            <el-form-item label="住院时间:" label-width="100px">-->
            <!--              <el-date-picker type="date" size="mini" placeholder="开始时间" style="width:200px"-->
            <!--                              v-model='dateTime.admitDateTime'-->
            <!--                              value-format="yyyy-MM-dd" format="yyyy-MM-dd">-->
            <!--              </el-date-picker>-->
            <!--              <span class="separator">至</span>-->
            <!--              <el-date-picker type="date" size="mini" placeholder="结束时间" style="width:200px"-->
            <!--                              v-model='dateTime.admitDateTimeTo'-->
            <!--                              value-format="yyyy-MM-dd" format="yyyy-MM-dd">-->
            <!--              </el-date-picker>-->
            <!--            </el-form-item>-->
            <el-form-item label="手术时间:" label-width="200px">
              <el-date-picker type="date" size="mini" placeholder="开始时间" style="width:200px"
                              v-model='dateTime.surStartDateTime'
                              value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
              <span class="separator">至</span>
              <el-date-picker type="date" size="mini" placeholder="结束时间" style="width:200px"
                              v-model='dateTime.surStartDateTimeTo'
                              value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-button type="primary" size="mini" plain icon="el-icon-search" @click="getStatistics()">查询</el-button>
            <el-button type="primary" size="mini" icon="el-icon-folder-opened" @click="exportClick()">导出</el-button>
          </el-form>
        </div>
      </el-col>
      <el-col :span="24" v-show='false'>
        <div id="pdfDom">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            highlight-current-row
            stripe>
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="patientName"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="patiIdentity"
              label="身份证号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              width="100">
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              width="100">
            </el-table-column>
            <el-table-column
              prop="admitDateTime"
              label="入院日期"
              width="200">
            </el-table-column>
            <el-table-column
              prop="surStartDateTime"
              label="手术日期"
              width="200">
            </el-table-column>
            <el-table-column
              prop="PunctuerName"
              label="穿刺部位"
              width="200">
            </el-table-column>
            <el-table-column
              prop="GMType"
              label="供血优势"
              width="200">
            </el-table-column>
            <el-table-column
              prop="lmtStr"
              label="左主干情况"
              width="200">
            </el-table-column>
            <el-table-column
              prop="ladStr"
              label="前降支情况"
              width="200">
            </el-table-column>
            <el-table-column
              prop="lcxStr"
              label="回旋支"
              width="200">
            </el-table-column>
            <el-table-column
              prop="rcaStr"
              label="右冠"
              width="200">
            </el-table-column>
            <el-table-column
              prop="IVUS"
              label="IVUS"
              width="200">
            </el-table-column>
            <el-table-column
              prop="IABP"
              label="IABP"
              width="200">
            </el-table-column>
            <el-table-column
              prop="xuanMo"
              label="旋磨"
              width="200">
            </el-table-column>
            <el-table-column
              prop="OCT"
              label="OCT"
              width="200">
            </el-table-column>
            <el-table-column
              prop="chouXi"
              label="血栓抽吸"
              width="200">
            </el-table-column>
            <el-table-column
              prop="support"
              label="球囊规格型号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="sacculus"
              label="支架规格型号"
              width="200">
            </el-table-column>
          </el-table>
        </div>
        <!--工具条-->
        <div style="float: right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[20, 30, 40, 50, 60, 70, 80, 90]" :page-size="pagesize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="24">
        <div>
          <el-form inline size="mini">
            <!--            <el-form-item label="住院时间:" label-width="100px">-->
            <!--              <el-date-picker type="date" size="mini" placeholder="开始时间" style="width:200px"-->
            <!--                              v-model='dateTime.admitDateTime'-->
            <!--                              value-format="yyyy-MM-dd" format="yyyy-MM-dd">-->
            <!--              </el-date-picker>-->
            <!--              <span class="separator">至</span>-->
            <!--              <el-date-picker type="date" size="mini" placeholder="结束时间" style="width:200px"-->
            <!--                              v-model='dateTime.admitDateTimeTo'-->
            <!--                              value-format="yyyy-MM-dd" format="yyyy-MM-dd">-->
            <!--              </el-date-picker>-->
            <!--            </el-form-item>-->
            <el-form-item label="手术时间:" label-width="200px">
              <el-date-picker type="date" size="mini" placeholder="开始时间" style="width:200px"
                              v-model='dateTime.surStartDateTime'
                              value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
              <span class="separator">至</span>
              <el-date-picker type="date" size="mini" placeholder="结束时间" style="width:200px"
                              v-model='dateTime.surStartDateTimeTo'
                              value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-button type="primary" size="mini" plain icon="el-icon-search" @click="getStatistics()">查询</el-button>
          </el-form>
        </div>
        <div>
          <el-form inline size="mini">
            <el-form-item label="统计维度:" label-width="200px">
              <el-select v-model="statisticsVos" placeholder="请选择" clearable @change="selectVal">
                <el-option
                  v-for="item in options"
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
        <div id="echarts" :style="{width: '800px', height: '500px'}"></div>
      </el-col>
      <el-col :span="12" v-show="showChartY">
        <div id="echarts2" :style="{width: '500px', height: '500px'}"></div>
      </el-col>
      <el-col :span="24" v-show="showChartS">
        <div id="echarts3" :style="{width: '1800px', height: '500px'}"></div>
      </el-col>
      <el-col :span="24" v-show="showChartSd">
        <div id="echarts4" :style="{width: '1800px', height: '500px'}"></div>
      </el-col>
      <el-col :span="24" v-show="showChartYS">
        <div id="echarts5" :style="{width: '800px', height: '500px'}"></div>
      </el-col>
      <!--      <el-col :span="24">-->
      <!--        <div>-->
      <!--          <el-divider><i class="el-icon-s-data" style="color: teal"></i></el-divider>-->
      <!--        </div>-->
      <!--      </el-col>-->
    </el-row>
  </section>
</template>

<script>
  import Api from '../../api'
  // import htmlToPdf from '@/common/js/htmlToPdf';
  export default {
    data () {
      return {
        tableInfo: true,
        // tabPosition: 'left',
        loading: false,
        htmlTitle: '数据统计',
        tableData: [],
        statisticsVos: '',
        pagesize: 20,
        page: 1,
        Num0: 0,
        Num1: 1,
        total: 0,
        labelList: [],
        showChartPie: false,
        showChartY: false,
        showChartS: false,
        showChartSd: false,
        showChartYS: false,
        pickerOptions1: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        pickerOptions2: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        // 时间
        dateTime: {
          surStartDateTime: '',
          // admitDateTime: '',
          // admitDateTimeTo: '',
          surStartDateTimeTo: ''
        },
        statisticsVo: {
          surStartDateTime: '',
          // admitDateTime: '',
          // admitDateTimeTo: '',
          surStartDateTimeTo: '',
          param: ''
        },
        //要导出的报表的list
        exportList: [],
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
        chartData: '',
        msg: 'Welcome to Your Vue.js App',
        DefaultData: {
          exportExcelMax: '9'
        },
        table_data: []
      }
    },
    methods: {
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
        // app.config = {
        //   rotate: 90,
        //   align: 'left',
        //   verticalAlign: 'middle',
        //   position: 'insideBottom',
        //   distance: 15
        // }
        // var labelOption = {
        //   show: true,
        //   position: app.config.position,
        //   distance: app.config.distance,
        //   align: app.config.align,
        //   verticalAlign: app.config.verticalAlign,
        //   rotate: app.config.rotate,
        //   // formatter: '{c}  {name|{a}}',
        //   fontSize: 16,
        //   rich: {
        //     name: {
        //       textBorderColor: '#fff'
        //     }
        //   }
        // }
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
              name: this.labelList,
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
                length:5
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
              name: this.labelList,
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
              // label: this.labelList,
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
      handleSizeChange (val) {
        this.pagesize = val
        this.getStatistics()
      },
      handleCurrentChange (val) {
        this.page = val
        this.getStatistics()
      },
      // 接口获取
      // 查询
      getStatistics (currentPage) {
        // 重置当前页
        if (currentPage) {
          this.page = currentPage
        }
        let para = this.dateTime
        this.loading = true
        Api.getSelectVo(para, this.page, this.pagesize).then(res => {
          if (res) {
            this.loading = false
            this.$message({
              message: '获取成功!',
              type: 'success'
            })
            this.tableData = res.list
            this.total = res.total
          } else {
            this.loading = false
            this.$message({
              message: '获取失败!',
              type: 'warning'
            })
          }
        })
      },
      // r统计维度
      selectVal (val) {
        this.loading = true
        let Vo = this.options
        for (let i = 0; i < Vo.length; i++) {
          if (Vo[i].value === val) {
            this.labelList = Vo[i].label
          }
        }
        let vo = this.statisticsVo
        this.statisticsVo.param = val
        this.statisticsVo.surStartDateTime = this.dateTime.surStartDateTime
        this.statisticsVo.surStartDateTimeTo = this.dateTime.surStartDateTimeTo
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
                message: this.labelList + '获取成功!',
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
                  // console.log(chartData)
                })
                this.PieList(chartData)
                Object.keys(res).forEach(function (key) {
                  treeData.push(key)
                })
                this.axisList(chartData, treeData)
              } else if (val === 'doctorName') {
                this.showChartPie = false
                this.showChartY = false
                this.showChartS = false
                this.showChartSd = true
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  doctorName1.push({value: res[key].一助})
                })
                Object.keys(res).forEach(function (key) {
                  doctorName2.push({value: res[key].二助})
                })
                Object.keys(res).forEach(function (key) {
                  doctorName3.push({value: res[key].三助})
                })
                Object.keys(res).forEach(function (key) {
                  doctorName4.push({value: res[key].术者})
                })
                console.log(doctorName4)
                Object.keys(res).forEach(function (key) {
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
                })
                this.PieList(chartData)
                Object.keys(res).forEach(function (key) {
                  treeData.push(key)
                })
                this.axisList(chartData, treeData)
              } else if (val === 'radioGraphicResult') {
                this.showChartPie = true
                this.showChartY = true
                this.showChartS = false
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key], name: key})
                })
                this.PieList(chartData)
                Object.keys(res).forEach(function (key) {
                  treeData.push(key)
                })
                this.axisList(chartData, treeData)
              } else if (val === 'fluStatus') {
                this.showChartPie = true
                this.showChartY = true
                this.showChartS = false
                this.showChartSd = false
                this.showChartYS = false
                Object.keys(res).forEach(function (key) {
                  chartData.push({value: res[key], name: key})
                })
                this.PieList(chartData)
                Object.keys(res).forEach(function (key) {
                  treeData.push(key)
                })
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
                  // console.log({name: res[key].dic_value})
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
      exportClick () {
        let para = this.dateTime
        let pages = 0
        let pageSizes = 0
        let exlData = []
        this.loading = true
        Api.getSelectVo(para, pages, pageSizes).then(res => {
          if (res) {
            this.loading = false
            this.$message({
              message: '获取成功!',
              type: 'success'
            })
            exlData = res.list
            this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 需要导出的数据
              this.excelData = JSON.parse(JSON.stringify(exlData)); // 为了防止在处理导出数据的时候影响到表格数据，这里需要深拷贝！！
              this.export2Excel()
            }).catch(() => {
              this.$message.error('导出操作出现了异常，请稍后重试！')
            })
          } else {
            this.loading = false
            this.$message({
              message: '获取失败!',
              type: 'warning'
            })
          }
        })
      },
      // 参数配置
      export2Excel () {
        var that = this;
        require.ensure([], () => {
          const {export_json_to_excel} = require('../vendor/Export2Excel'); //这里必须使用绝对路径，这个文件就是之前那两个依赖的JS
          const tHeader = [
            '姓名', '身份证号', '性别',
            '年龄', '入院日期', '手术日期',
            '穿刺部位', '供血优势', '左主干情况',
            '前降支情况', '回旋支', '右冠',
            'IVUS', 'IABP', '旋磨', 'OCT', '血栓抽吸', '球囊规格型号', '支架规格型号'
          ]; // 导出的表头名（key）
          const filterVal = [
            'patientName', 'patiIdentity', 'sex',
            'age', 'admitDateTime', 'surStartDateTime',
            'PunctuerName', 'GMType', 'lmtStr',
            'ladStr', 'lcxStr', 'rcaStr',
            'IVUS', 'IABP', 'xuanMO', 'OCT', 'chouXi', 'support', 'sacculus'
          ]; // 导出的表头字段名（value）
          const list = that.excelData;
          const data = that.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, `统计表`);// 导出的表格名称，根据需要自己命名
        })
      },
      /**
       * 数据格式化
       * @param filterVal
       * @param jsonData
       */
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => {
          v.monthStart = this.dateFormatter(v.monthStart); // 在这里为时间字段值进行单独的格式化
          v.monthEnd = this.dateFormatter(v.monthEnd);
          return filterVal.map(j => v[j])
        })
      },
      
      dateFormatter (str) {
        if (!str) {
          return "";
        }
        return this.$dateFormat(str, "yyyy-MM-dd") // 具体实现在下面，大家想怎么处理这个函数都随意，只要能够格式化自己想要格式化的字段就行
      }
      // this.$dateFormat(str, "yyyy-MM-dd")
      //     export default (date, fmt) => {
      //   //如果是时间戳的话那么转换成Date类型
      //   if (typeof date === 'number') {
      //     date = new Date(date)
      //   } else if (typeof date === 'string') {
      //     date = new Date(parseInt(date))
      //   }
      //
      //   let o = {
      //     //月份
      //     "M+": date.getMonth() + 1,
      //     //日
      //     "d+": date.getDate(),
      //     //小时
      //     "h+": date.getHours(),
      //     //分
      //     "m+": date.getMinutes(),
      //     //秒
      //     "s+": date.getSeconds(),
      //     //季度
      //     "q+": Math.floor((date.getMonth() + 3) / 3),
      //     //毫秒
      //     "S": date.getMilliseconds()
      //   };
      //   if (/(y+)/.test(fmt))
      //     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
      //   for (let k in o)
      //     if (new RegExp("(" + k + ")").test(fmt))
      //       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
      //   return fmt
      // }
    },
    mounted () {
      this.PieList()
      this.axisList()
    },
    computed: {},
    components: {}
  }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }
  
  .el-table .success-row {
    background: #f0f9eb;
  }
  
  .content {
    margin: 0 10px 10px 10px;
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
  
  .separator {
    color: teal;
    padding: 0 10px 0 10px
  }
</style>
