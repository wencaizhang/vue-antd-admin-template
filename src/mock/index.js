import Mock from 'mockjs'

Mock.mock('/api/demo', {
  "results|10": [{

    "id|1-100.1-10": 1,
    "phone|+1": 202111,
    "name": {
      "first": /[a-z][A-Z][0-9]/,
      "last": /[a-z][A-Z][0-9]/,
    },

    "size|+1": 202111,

    "string|1-10": "★",
    "string2|3": "★★",

    "boolean|1": true,
    "regexp": /[a-z][A-Z][0-9]/,
    "absolutePath": "@/string @/user/name",
    "object|2": {
      "310000": "上海市",
      "320000": "江苏省"
    },
    "array|1": ["AMD"]
  }]
})

