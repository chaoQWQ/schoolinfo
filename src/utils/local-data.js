const routerBreadcrumb = {
  // 比赛信息
  competitionList: {
    list: [
      {name: "首页", path: "/"},
      {name: "比赛信息", path: ""}
    ]
  },
  competitionDetail: {
    list: [
      {name: "首页", path: "/"},
      {name: "比赛信息", path: "/competition"},
      {name: "活动详情", path: ""}
    ]
  },
  competitionInsert:{
    list:[
      {name: "首页", path: "/"},
      {name: "比赛信息", path: "/competition"},
      {name: "发布比赛", path: ""}
    ]
  },
  societyActivityList:{
    list: [
      {name: "首页", path: "/"},
      {name: "社团活动", path: ""}
    ]
  },
  societyActivityDetail: {
    list: [
      {name: "首页", path: "/"},
      {name: "社团活动", path: "/societyActivity"},
      {name: "活动详情", path: ""}
    ]
  },
  societyActivityInsert:{
    list:[
      {name: "首页", path: "/"},
      {name: "社团活动", path: "/societyActivity"},
      {name: "发布活动", path: ""}
    ]
  },
  volunteerList:{
    list: [
      {name: "首页", path: "/"},
      {name: "志愿活动", path: ""}
    ]
  },
  volunteerDetail: {
    list: [
      {name: "首页", path: "/"},
      {name: "志愿活动", path: "/volunteer"},
      {name: "活动详情", path: ""}
    ]
  },
  volunteerInsert:{
    list:[
      {name: "首页", path: "/"},
      {name: "志愿活动", path: "/volunteer"},
      {name: "发布活动", path: ""}
    ]
  }
}
const compTypeList=[
  {
      "name": "创业大赛",
      "id": 1
  },
  {
      "name": "营销策划",
      "id": 2
  },
  {
      "name": "金融比赛",
      "id": 3
  },
  {
      "name": "广告创意",
      "id": 4
  },
  {
      "name": "设计比赛",
      "id": 5
  },
  {
      "name": "IT应用开发",
      "id": 6
  },
  {
      "name": "文学演讲",
      "id": 7
  },
  {
      "name": "播音主持",
      "id": 8
  },
  {
      "name": "动漫书画",
      "id": 9
  },
  {
      "name": "影视摄影",
      "id": 10
  },
  {
      "name": "学科学术",
      "id": 11
  },
  {
      "name": "科技大赛",
      "id": 12
  },
  {
      "name": "公益大赛",
      "id": 13
  },
  {
      "name": "舞蹈武术",
      "id": 14
  },
  {
      "name": "模特大赛",
      "id": 15
  },
  {
      "name": "体育竞技",
      "id": 16
  },
  {
      "name": "选秀歌唱",
      "id": 17
  },
  {
      "name": "游戏竞技",
      "id": 18
  },
  {
      "name": "其他比赛",
      "id": 19
  }]

  const volunteerServiceTypeList=[
    {
      "name": "社区服务",
      "id": 1     
    },
    {
      "name": "生态环保",
      "id": 2     
    },
    {
      "name": "助老助残",
      "id": 3     
    },
    {
      "name": "关爱儿童",
      "id": 4     
    },
    {
      "name": "赛会服务",
      "id": 5     
    },
    {
      "name": "法律咨询",
      "id": 6     
    },
    {
      "name": "教育培训",
      "id": 7     
    },
    {
      "name": "医疗卫生",
      "id": 8     
    },
    {
      "name": "文化艺术",
      "id": 9     
    },
    {
      "name": "心理咨询",
      "id": 10     
    },
    {
      "name": "信息宣传",
      "id": 11     
    },
    {
      "name": "网络维护",
      "id": 12     
    },
    {
      "name": "礼仪接待",
      "id": 13     
    },
    {
      "name": "外语翻译",
      "id": 14     
    },
    {
      "name": "摄影摄像",
      "id": 15     
    }
  ]
export default{
  routerBreadcrumb,
  compTypeList,
  volunteerServiceTypeList
}