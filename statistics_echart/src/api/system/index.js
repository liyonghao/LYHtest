import axios from 'axios'

export default {
  // 字典-查询
  getAllLargeClass: () => {
    return axios.post('/interface/selectLargeClass').then(res => res.data)
  },
  getAllSmallClass: (classcode) => {
    return axios.post('/interface/selectSmallClass', classcode, {
      params: {
        code: classcode,
      }
    }).then(res => res.data)
  },
  // 字典-查询器材小类
  getSelectVo: (page, size, selectVo) => {
    return axios.post('/interface/select', selectVo, {
      params: {
        page: page,
        size: size
      }
    }).then(res => res.data)
  },
  getSelectStatistics: (statisticsVos) => {
    return axios.post('/interface/selectByDimension', statisticsVos, {
      params: {
        param: statisticsVos
      }
    }).then(res => res.data)
  },
  getSelect: (VoList) => {
    return axios.post('/interface/select', VoList, {
      params: {
        param: VoList
      }
    }).then(res => res.data)
  },
   // 筛选条件查询
  getScreenVo: (page, size, screenVo) => {
    return axios.post('/interface/selectLession', screenVo, {
      params: {
        page: page,
        size: size
      }
    }).then(res => res.data)
  },
  // 数据项分组---器材
  getProductVo: (size, groupParam, productVo) => {
    return axios.post('/interface/groupByProduct', productVo, {
      params: {
        size:size,
        groupParam: groupParam
      }
    }).then(res => res.data)
  },
  getLesiontVo: (size, groupParam, LessionVo) => {
    return axios.post('/interface/groupByLession', LessionVo, {
      params: {
        size:size,
        groupParam: groupParam
      }
    }).then(res => res.data)
  },
  getRecultVo: (size, groupParam, productVo) => {
    return axios.post('/interface/groupByResult', productVo, {
      params: {
        size:size,
        groupParam: groupParam
      }
    }).then(res => res.data)
  },
  getSelectGroup: (selectGroup) => {
    return axios.post('/interface/selectGroupByPatientUid', selectGroup, {
    }).then(res => res.data)
  },
}
