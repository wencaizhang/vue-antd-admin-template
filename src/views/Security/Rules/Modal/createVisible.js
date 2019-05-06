/**
# 创建规则

不同的规则，显示不同的字段

1. 定制xxx

方向、端口类型（端口号/端口范围）、远程（CIDR/安全组和IP类型）

5. 特殊类型：定制 ICMP

方向、类型、编码、远程（CIDR/安全组和IP类型）

2. ALL

方向、远程（CIDR/安全组和IP类型）

3. 指定类（如 http、ssh）

远程（CIDR/安全组和IP类型）

4. 特殊类型：其他协议

方向、IP协议、远程（CIDR/安全组和IP类型）

*/

const visible = {
  // 规则始终显示
  custom: {
    direction: true,  // 方向
    port: true,  // 端口类型
    remote: true,  // 远程
  },
  icmp: {
    direction: true,
    type: true,  // 类型
    encoding: true,  // 编码
    remote: true,
  },
  other: {
    direction: true,
    ipName: true,  // IP协议
    remote: true,
  },
  all: {
    direction: true,
    remote: true,
  },
  assign: {
    remote: true,
  }
};

export default visible
