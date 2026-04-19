import type { TestSection } from './acceptanceTestData';

export const acceptanceTestDataZhCN: TestSection[] = [
  {
    id: 'fat-test', title: 'FAT 测试', longTitle: '工厂验收测试（FAT）',
    purpose: '本节在制造商工厂使用，用于验证新建设备在发货至客户现场前符合所有合同和设计规范。',
    checklistSections: [
      { title: '1.1 文件与准备审查', checkpoints: [
        '已批准的用户需求规范（URS）、P&ID 和技术规范可用。',
        '最终机械、电气和软件图纸完整并与制造单元匹配。',
        '材料认证、焊接记录、电机数据表和压力容器证书（如适用）齐全有效。',
        'FAT 中使用的所有测试设备和内部传感器/仪表均有有效校准证书。',
        '最终操作、维护和安全手册完整，推荐备件清单已核实。',
        'FAT 测试程序和验收标准已由制造商和客户正式批准。',
      ].map((criteria, i) => ({ id: `1.1.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
      { title: '1.2 外观、机械和结构检查', checkpoints: [
        '设备无可见损坏、锈蚀和锋利边缘，涂装和表面质量可接受。',
        '关键物理尺寸（占地面积、高度、公用设施位置）与总布置图一致。',
        '所有主要组件（电机、泵、阀门）按 P&ID 正确标记和标牌。',
        '焊接、支撑和结构稳定性良好，紧固件紧固且扭矩正确。',
        '所有运动部件（轴、轴承、齿轮）正确安装、对齐并运行顺畅。',
        '关键维护接入点、过滤单元和润滑点易于接触。',
      ].map((criteria, i) => ({ id: `1.2.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
      { title: '1.3 电气和控制系统检查', checkpoints: [
        '电气面板接线整洁、固定、正确捆扎，并按图纸清晰标记。',
        '所有非载流金属部件正确且一致地接地。',
        '保险丝、断路器和过载继电器额定值正确且安装到位。',
        '所有数字和模拟输入/输出信号已单独测试并与 I/O 列表核实。',
        'PLC/DCS/HMI 软件/固件版本已确认为最新批准版本。',
      ].map((criteria, i) => ({ id: `1.3.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
      { title: '1.4 功能和性能测试（模拟条件）', checkpoints: [
        '完整的自动启动和停止过程无误执行。',
        '所有阀门、泵和执行器可在手动模式下单独正确控制。',
        '主要生产序列正确运行所有定义步骤/阶段（必要时使用模拟材料或公用设施）。',
        '关键过程报警已模拟，系统响应（视觉、听觉、记录）已核实。',
        '安全和过程联锁已测试以确认功能。',
        '使用干氮气进行泄漏测试。',
      ].map((criteria, i) => ({ id: `1.4.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
      { title: '1.5 安全和合规测试', checkpoints: [
        '所有急停按钮已物理测试，确保立即安全停机。',
        '能量隔离点已确认并为锁定/挂牌程序清晰标记。',
        '在最坏情况下测试阻火器。',
      ].map((criteria, i) => ({ id: `1.5.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
    ]
  },
  {
    id: 'delivery', title: '交付', longTitle: '交付清单',
    purpose: '本节在设备到达客户现场时使用，用于验证设备完整无损地到达。',
    checklistSections: [
      { title: '2.1 收货检查', checkpoints: [
        '检查设备是否有运输过程中可能发生的外部损坏（箱子或包装）。',
        '装箱单和包装清单上的所有箱子、盒子和托盘均已清点。',
        '运输文件（提单、装箱单、商业发票）齐全正确。',
        '倾斜指示器和防震传感器（如使用）已检查并记录状态。',
        '在拆箱前对设备进行拍照记录。',
        '设备已移至客户指定的安全、防风雨暂存区。',
        '散装组件和零件箱已与装箱单核对清点。',
      ].map((criteria, i) => ({ id: `2.1.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
    ]
  },
  {
    id: 'sat-test', title: 'SAT 测试', longTitle: '现场验收测试（SAT）',
    purpose: '本节在设备安装并连接到现场公用设施后使用。它在实际运行环境中使用真实生产材料验证设备性能。',
    checklistSections: [
      { title: '3.1 安装和启动前验证', checkpoints: [
        '检查设备是否有拆箱后运输和搬运过程中造成的损坏。',
        '设备正确定位、调平并固定/锚固到地板或基础上。',
        '所有现场公用设施（电力、压缩空气、水、排水）已正确安全连接。',
        '现场条件（温度、湿度、振动）在设备规定的运行范围内。',
        '在开始 SAT 前，已核实 FAT 中发现的所有未解决项目均已处理。',
      ].map((criteria, i) => ({ id: `3.1.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
      { title: '3.2 系统集成和接口测试', checkpoints: [
        '设备使用现场永久电源成功上电（确认电压/相位稳定性）。',
        '与客户控制系统（SCADA、MES、历史记录仪）的通信链路已建立并验证稳定。',
        '与相邻生产设备的数据交换和物理联锁已测试并确认功能正常。',
        '远程诊断和监控功能（如规定）已验证在客户网络上正常工作。',
      ].map((criteria, i) => ({ id: `3.2.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
      { title: '3.3 性能和运行验证', checkpoints: [
        '设备使用实际材料和现场公用设施运行完整自动序列。',
        '设备达到规定的关键绩效指标（KPI）吞吐量。',
        '最终产品质量参数已测量并符合规范。',
        '已完成约定的连续运行测试（如 4 至 8 小时），无关键故障干预。',
        '真实世界报警（如储罐液位低）已触发，系统正确响应和恢复。',
      ].map((criteria, i) => ({ id: `3.3.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
      { title: '3.4 最终审查、培训和签署', checkpoints: [
        '核心运营团队展示了设备启动、停机和错误恢复的熟练程度。',
        '维护团队展示了预防性维护（PM）任务和零件更换程序的熟练程度。',
        '所有最终竣工图纸、完成的 FAT/SAT 协议和运营许可证已提供给客户。',
        '客户正式签署 SAT 完成文件，授权设备用于生产。',
      ].map((criteria, i) => ({ id: `3.4.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
    ]
  },
  {
    id: 'maintenance', title: '维护', longTitle: '维护移交',
    purpose: '本节确保所有必要的备件、工具、文档和知识正式移交给客户的维护团队。',
    checklistSections: [
      { title: '4.1 移交清单', checkpoints: [
        '推荐备件的完整清单已交付并在现场核实。',
        '维护所需的所有专用工具、夹具和固定装置已移交。',
        '最终预防性维护（PM）计划和程序已提供并审查。',
        '识别所有润滑点和规定润滑剂的综合润滑计划和图表可用。',
        '客户维护团队已接受常见故障排除和维修任务的实操培训。',
        '技术支持和备件订购的联系信息已提供并清晰可见。',
      ].map((criteria, i) => ({ id: `4.1.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
    ]
  },
  {
    id: 'training', title: '培训', longTitle: '培训验证',
    purpose: '本节记录所有必要人员（操作员、维护人员等）已对新设备进行了充分培训。',
    checklistSections: [
      { title: '5.1 培训清单', checkpoints: [
        '设备启动、正常操作和停机程序的操作员培训已完成。',
        '所有计划预防性维护（PM）任务的维护团队培训已完成。',
        '关键人员已接受常见故障和报警恢复程序的故障排除培训。',
        '安全培训（包括急停、锁定/挂牌和特定危险意识）已完成。',
        '所有培训手册、指南和数字资源已移交，团队知晓其位置。',
        '已举行正式问答环节，客户团队的所有重要问题均已解答并记录。',
      ].map((criteria, i) => ({ id: `5.1.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
    ]
  },
  {
    id: 'maint-schedule', title: '维护计划', longTitle: '维护计划',
    purpose: '此页面作为交互式持续日志，用于跟踪设备的所有预防性维护活动。',
    checklistSections: [
      { title: '每日', checkpoints: ['检查异常噪音或振动...', '目视检查制冷剂泄漏迹象...'].map((c, i) => ({ id: `每日-${i+1}`, criteria: c, checked: false, notes: '', lastCompleted: null })) },
      { title: '每周', checkpoints: ['擦拭设备外壳...', '确保通风口和格栅畅通...'].map((c, i) => ({ id: `每周-${i+1}`, criteria: c, checked: false, notes: '', lastCompleted: null })) },
      { title: '每月', checkpoints: ['检查风扇叶片和电机...'].map((c, i) => ({ id: `每月-${i+1}`, criteria: c, checked: false, notes: '', lastCompleted: null })) },
      { title: '每季度', checkpoints: ['清洁冷凝器和蒸发器盘管...', '检查制冷剂充注量...'].map((c, i) => ({ id: `每季度-${i+1}`, criteria: c, checked: false, notes: '', lastCompleted: null })) },
      { title: '每年', checkpoints: ['进行全面泄漏测试...', '检查压缩机油位...', '进行离线电机绝缘测试...', '润滑电机轴承...', '打开底部面板并清洁...', '目视检查管道...', '排放并更换油泵油...'].map((c, i) => ({ id: `每年-${i+1}`, criteria: c, checked: false, notes: '', lastCompleted: null })) },
      { title: '每2000小时', checkpoints: ['重新润滑油泵轴承...'].map((c, i) => ({ id: `每2000小时-${i+1}`, criteria: c, checked: false, notes: '', lastCompleted: null })) },
      { title: '定期', checkpoints: ['清洁不锈钢/GRP 管道...'].map((c, i) => ({ id: `定期-${i+1}`, criteria: c, checked: false, notes: '', lastCompleted: null })) },
    ]
  },
  {
    id: 'commissioning', title: '调试', longTitle: '最终调试与移交',
    purpose: '这是项目的最后阶段，确保所有合同义务已履行，所有文档已最终确定，设备正式移交用于生产。',
    checklistSections: [
      { title: '7.1 移交清单', checkpoints: [
        'FAT、SAT 和交付中的所有遗留问题已正式关闭并核实。',
        '最终完整的竣工文档集已移交并被客户接受。',
        '操作员和维护人员的所有必要培训已完成并记录出勤情况。',
        '所有培训手册、演示文稿和支持材料的数字和实体副本已移交给客户。',
        '已提供综合备件采购指南，包括非专有物品的供应商联系方式和零件编号。',
        '现场备件库存的最终签署和正式验收已由客户完成。',
        '制造商的官方质保证书已收到，开始和结束日期已正式记录。',
        '提出质保索赔的程序和联系信息已清晰记录并提供给维护团队。',
        '设备保险证明（如运输、安装、责任险）已收到并归档。',
        '所有项目可交付成果均已按原合同和工作范围完成。',
        '系统已正式移交给运营部门用于生产。',
        '最终项目完成和验收证书已由所有必要方签署。',
      ].map((criteria, i) => ({ id: `7.1.${i+1}`, criteria, checked: false, notes: '', lastCompleted: null })) },
    ]
  },
];
