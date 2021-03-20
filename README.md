# 高三八班 API node.JS 版

## 作业看板后端 API

### 获取作业

有两个接口可以获取今天的作业

#### 获取全部作业

```
GET /api/homework
```

示例返回数据

```json
{
    "c": "默写逍遥游全文",
    "m": "一节黄皮一节绿皮",
    "e": "完成赢在阅读",
    "p": "这段话是没有意义的，因为写了你也不可能做物理作业",
    "b": "大粉接下去做十页",
    "z": "准备好明天要送的礼物"
}
```

#### 获取指定学科作业

```
GET /api/homework/{c|m|e|p|b|z}
```

示例返回数据

```
GET /api/homework/b
```

```
大粉接下去做十页
```

### 设定作业

```
POST /api/homework
```

请求体

```json
{
    "c": "默写逍遥游全文",
    "m": "一节黄皮一节绿皮",
    "e": "完成赢在阅读",
    "p": "这段话是没有意义的，因为写了你也不可能做物理作业",
    "b": "大粉接下去做十页",
    "z": "准备好明天要送的礼物"
}
```

返回

```json
{
    "code": 200
}
```

能自动确定修改那些作业设置，如果发送如下数据，则物理作业将保持原样

```json
{
    "c": "默写逍遥游全文",
    "m": "一节黄皮一节绿皮",
    "e": "完成赢在阅读",
    "b": "大粉接下去做十页",
    "z": "准备好明天要送的礼物"
}
```


### C15 Edition of C8API
Is a extended version of C8API, replacing the original version and more features are added.
Compatible with both original version and C15Edit of C8UI.

Now the schedule in C8UI is moved to data/schedule.jconf of C8API.
Line 1 is for Monday, 2 is for Tuesday, and so on.
Spaces are not needed between two Courses.

```
Course1,Course2,Course3,...
Course4,Course5,Course6,...
```

Tb(DutySchedule) is now added into function Schedule.
Config file: data/tb.jconf
Temporary File (Auto generated): data/curr.int

```json
{
	"Person1,Person2",
	"Person3,Person4"
}
```

Because the control panel of this function is not implemented yet, you can directly change the content of the temp file to take effect.

```
0,2021-3-17
```

The first argument is ( Group num - 1 ), the second is the current date.
Any different time from that of the local computer will lead to the next group be shown after a refresh on C8UI.
