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
  }

}
export default{
  routerBreadcrumb
}