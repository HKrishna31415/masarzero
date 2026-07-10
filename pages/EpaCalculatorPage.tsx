import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  BookOpen,
  Calculator,
  ChevronDown,
  FlaskConical,
  Gauge,
  Info,
  Percent,
  Thermometer,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTranslation } from '../context/TranslationContext';

type UnitSystem = 'metric' | 'imperial';
type TankType = 'aboveground' | 'underground';
type UnitOverride = 'global' | UnitSystem;
type MathMlProps = React.HTMLAttributes<HTMLElement> & {
  display?: string;
  xmlns?: string;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      math: MathMlProps;
      mfrac: MathMlProps;
      mi: MathMlProps;
      mn: MathMlProps;
      mo: MathMlProps;
      mrow: MathMlProps;
      msub: MathMlProps;
      msup: MathMlProps;
    }
  }
}

const LB_PER_KG = 2.2046226218;
const FT3_PER_M3 = 35.3146667215;
const L_PER_GAL = 3.785411784;
const L_PER_BBL = 158.987294928;
const L_PER_M3 = 1000;
const PSIA_PER_KPA = 0.1450377377;
const KPA_PER_PSIA = 1 / PSIA_PER_KPA;
const GAS_CONSTANT_METRIC = 8.314462618;
const GASOLINE_DENSITY_KG_L = 0.74;
const GASOLINE_DENSITY_LB_GAL = GASOLINE_DENSITY_KG_L * L_PER_GAL * LB_PER_KG;
const DEFAULT_GASOLINE_DISTILLATION_SLOPE = 3;
const DEFAULT_STAGE2_REFUELING_FACTOR_LB_PER_1000_GAL = 11;
const MAX_DAILY_VAPOR_TEMP_RANGE_C = 60;

const copy = {
  en: {
    badge: 'EPA Vapor Loss Estimate',
    title: 'Estimate evaporative vapor loss and recovered throughput.',
    description:
      'A technical calculator for standing loss, working loss, recovery efficiency, and recovered liquid as a percentage of annual throughput. Metric inputs are converted into the EPA-style imperial equations so the assumptions stay visible.',
    metric: 'Metric',
    imperial: 'Imperial',
    modelBasis: 'Combined vapor model',
    modelBasisHelp: 'Adds Stage I unloading vapor and storage tank breathing. It does not add the old storage working-loss shortcut on top of Stage I, because that would double-count filling displacement.',
    stage1Model: 'Stage I unloading',
    storageModel: 'Storage breathing',
    stage1Note: 'This view combines AP-42 Chapter 5.2 Stage I unloading with AP-42 Chapter 7.1 storage breathing. UST breathing is reduced, not deleted, so diurnal venting and Stage III-style concerns stay visible.',
    tankType: 'Tank type',
    aboveground: 'Aboveground fixed roof',
    underground: 'Underground storage tank',
    undergroundNote: 'For USTs, AP-42 Chapter 7.1 historically allows a zero-breathing assumption, but this calculator keeps a reduced breathing component so diurnal venting can be stress-tested.',
    standingTitle: 'Standing loss inputs',
    standingSubtitle: 'Daily breathing loss from vapor space expansion.',
    vaporSpace: 'Vapor space volume',
    vaporDensity: 'Vapor density',
    vaporDensityHelp: 'Use site-specific vapor density when available. This is where PM/ZRT vapor density logic belongs.',
    expansion: 'Breathing expansion factor',
    saturation: 'Saturation factor',
    ustBreathingReduction: 'UST breathing reduction',
    workingTitle: 'Working loss inputs',
    workingSubtitle: 'Filling loss from annual liquid throughput.',
    stage1Title: 'Stage I unloading inputs',
    stage1Subtitle: 'AP-42 5.2 loading loss from gasoline displaced during tanker unloading.',
    loadingSaturation: 'Loading saturation factor',
    bulkTemp: 'Bulk liquid temperature',
    loadingLossFactor: 'Loading loss factor',
    throughput: 'Annual throughput',
    converted: 'Converted for the EPA-style equation as',
    vaporPressure: 'True vapor pressure',
    tvpHelperTitle: 'True vapor pressure helper',
    tvpHelperSubtitle: 'Estimate gasoline TVP from RVP and fuel temperature.',
    reidVaporPressure: 'Reid vapor pressure',
    distillationSlope: 'ASTM D86 10%-70% slope',
    estimatedTvp: 'Estimated TVP',
    useEstimatedTvp: 'Use estimated TVP',
    autoTvp: 'Auto TVP',
    manualTvp: 'Manual TVP',
    effectiveTvp: 'Calculation TVP',
    tvpAboveAtmosphere: 'Estimated TVP is above atmospheric pressure. At this temperature the fuel is outside the normal AP-42 loading-loss planning range; lab data or a process safety model should replace this estimate.',
    tvpHelperNote: 'Uses the AP-42 7.1 refined petroleum stock correlation: P = exp(A - B / T). Lab TVP or site fuel data should override this planning estimate.',
    molecularWeight: 'Molecular weight',
    turnover: 'Turnover',
    product: 'Product',
    temperatureTitle: 'Temperature assistant',
    temperatureSubtitle: 'Estimate the storage-breathing Ke from daily thermal and vapor-pressure swing.',
    tempRange: 'Daily vapor temperature range',
    avgTemp: 'Average liquid surface temperature',
    pressureRange: 'Daily vapor pressure range',
    ventRange: 'Breather vent pressure range',
    atmPressure: 'Average atmospheric pressure',
    siteElevation: 'Site elevation',
    suggestedKe: 'Suggested Ke for breathing expansion',
    useSuggested: 'Use suggested Ke',
    recoveryTitle: 'Recovery settings',
    recoverySubtitle: 'Estimate captured liquid and remaining emissions.',
    efficiency: 'VRU recovery efficiency',
    liquidDensity: 'Recovered liquid density',
    fieldTarget: 'SGS / field target',
    fieldTargetHelp: 'Measured recovered liquid as a percent of delivered throughput. This is the client and investor-facing KPI.',
    standingLoss: 'Standing loss',
    generatedVapor: 'Generated vapor',
    storageBreathing: 'Storage breathing',
    combinedTotal: 'Combined total',
    standingDetail: 'Annual breathing loss estimate.',
    workingLoss: 'Working loss',
    workingDetail: 'Annual filling displacement loss.',
    totalLoss: 'Total vapor loss',
    totalDetail: 'Storage breathing plus Stage I unloading.',
    recoveredLiquid: 'Recovered liquid',
    recoveredPerDay: 'recovered per day.',
    profileTitle: 'Loss and recovery profile',
    chartUnit: 'Chart unit',
    throughputLabel: 'Throughput',
    recoveryOutput: 'Recovery output',
    recoveredMass: 'Recovered mass',
    uncaptured: 'Uncaptured emissions',
    liquidEquivalent: 'liquid equivalent.',
    throughputRecovery: 'Throughput recovery rate',
    throughputRecoveryHelp: 'Recovered liquid divided by annual liquid throughput.',
    fieldTargetKpi: 'Field target recovery',
    targetImplied: 'Target implied recovery',
    targetGap: 'Gap to field target',
    benchmarkTitle: 'Benchmark band',
    benchmarkRange: 'Common field range',
    benchmarkHelp: '0.15%-0.29% is shown as a liquid-equivalent loss range against annual throughput, not as a universal EPA constant.',
    currentModel: 'Current model',
    defaultTitle: 'Where the defaults come from',
    defaultBody:
      'The numeric starting values come from your EPA-formula PDF and a gasoline Stage I case: 1,200,000 gal/yr throughput, 6.4 psia vapor pressure, vapor molecular weight 66, and gasoline-like liquid density of 0.74 kg/L. Storage mode can reproduce the aboveground PDF example; Stage I mode focuses on UST truck-drop vapor displacement.',
    temperatureBody:
      'Temperature impacts the result twice: warmer fuel increases true vapor pressure, which raises working loss, and daily temperature swing expands the headspace vapor, which raises Ke and standing loss. The assistant estimates Ke as thermal expansion plus vapor-pressure expansion, reduced by the breather vent pressure range.',
    wisdomBody:
      'The 0.15%-0.29% wisdom usually comes from converting annual vapor mass back into liquid-equivalent gasoline, then dividing by delivered throughput. SGS-style field recovery like 0.5% is also a throughput-normalized liquid recovery metric, so the page now treats it as a target comparison.',
    formulas: {
      standing: 'Uses vapor space, vapor density, vapor expansion, and saturation assumptions to estimate annual breathing loss.',
      working: 'Combined planning view adds Stage I unloading to storage breathing. The historical fixed-roof working-loss shortcut is not added here to avoid double-counting filling displacement.',
      stage1: 'AP-42 5.2 loading loss: LL = 12.46 * S * P * M / T, in lb per 1,000 gallons loaded.',
      recovery: 'Converts captured vapor mass back to liquid equivalent using recovered product density.',
    },
    sourcesTitle: 'Source notes',
    sourceAp42: 'EPA AP-42 Chapter 5.2 covers petroleum transportation and marketing losses, loading methods, saturation factors, recovery controls, and collection/control efficiency.',
    sourceStorage: 'EPA AP-42 Chapter 7.1 is the broader organic liquid storage tank method used for fixed-roof standing and working storage losses. Its current working-loss method is more detailed than the historical 0.0010 shortcut.',
    sourceUnderground: 'For underground horizontal tanks, AP-42 Chapter 7.1 says to assume no breathing or standing losses because earth insulation limits diurnal temperature change, with no working-loss modification required.',
    sourcePdf: 'The default scenario follows the two-page EPA evaporation formula note you supplied.',
    chinaNote: 'China has gasoline station vapor recovery standards such as GB 20952 for emission limits and vapor recovery system performance/testing. Treat them as compliance/testing references unless a project gives a specific Chinese emissions inventory equation.',
    notPermitting:
      'This calculator estimates planning-level vapor mass and liquid-equivalent recovery. It is not a substitute for site-specific AP-42 tank modeling, certified emissions testing, or permitting calculations.',
    info: {
      vaporSpace: 'Headspace volume above the liquid. Higher headspace means more vapor inventory can expand and vent.',
      vaporDensity: 'Hydrocarbon vapor mass per headspace volume. Depends on molecular weight, vapor pressure, temperature, and compressibility.',
      expansion: 'AP-42-style daily breathing expansion factor. This is not the liquid-to-vapor expansion ratio.',
      saturation: 'Storage Ks is a vapor-space saturation correction bounded from 0 to 1. It only scales storage breathing, not Stage I unloading. Values above 1 belong to AP-42 loading saturation S, not storage Ks.',
      ustBreathingReduction: 'Planning discount applied only to storage breathing for underground tanks. Use 0% for no UST discount or 100% for the older AP-42 zero-breathing assumption.',
      throughput: 'Annual product delivered into the tank. The working-loss equation uses barrels per year internally.',
      loadingSaturation: 'AP-42 5.2 saturation factor S. Dedicated vapor-balance service commonly uses 1.00; splash loading can be higher.',
      bulkTemp: 'AP-42 5.2 uses absolute bulk liquid temperature in Rankine. Hotter fuel lowers the denominator but often also comes with higher vapor pressure.',
      vaporPressure: 'True vapor pressure at bulk liquid temperature. It rises strongly with fuel temperature and volatility.',
      reidVaporPressure: 'RVP is measured at 100 F and is commonly available for gasoline. It is not the same as TVP, but AP-42 provides a correlation for refined petroleum stocks.',
      distillationSlope: 'AP-42 Table 7.1-2 uses 3.0 as a default distillation slope for motor gasoline.',
      molecularWeight: 'Average molecular weight of gasoline vapor. AP-42 sample calculations commonly use 66 for gasoline vapors.',
      tempRange: 'Daily vapor-space temperature swing used for the thermal-expansion part of suggested Ke. Larger swings increase suggested breathing expansion.',
      avgTemp: 'Average vapor/liquid surface temperature used as the absolute temperature denominator in the suggested Ke thermal term.',
      pressureRange: 'Daily true-vapor-pressure swing used for the pressure-expansion part of suggested Ke. Hotter daytime fuel usually raises this swing.',
      atmPressure: 'Computed from site elevation using a standard-atmosphere approximation. Higher elevation lowers atmospheric pressure and raises breathing sensitivity.',
      siteElevation: 'Elevation above sea level. The calculator converts it to average atmospheric pressure for the suggested Ke pressure term.',
      ventRange: 'Pressure/vacuum vent opening band absorbed before vapor is released. A larger P/V vent setting reduces suggested Ke.',
      turnover: 'Adjustment for tank turnover and vapor saturation behavior.',
      product: 'Product-specific correction factor. Keep at 1.0 for a simple gasoline planning case unless a specific factor is known.',
      efficiency: 'Overall recovery setting for this planning view. For a rigorous model, separate collection efficiency, control efficiency, and downtime.',
      liquidDensity: 'Used to convert recovered vapor mass into liquid-equivalent volume.',
    },
    chartNames: {
      standing: 'Standing',
      working: 'Working',
      recovered: 'Recovered',
      uncaptured: 'Uncaptured',
    },
  },
  'zh-CN': {
    badge: 'EPA 蒸发损失估算',
    title: '估算蒸发蒸气损失与回收吞吐率。',
    description:
      '用于估算静置损失、作业损失、回收效率，以及回收液体占年度吞吐量比例的技术计算器。公制输入会转换到 EPA 风格的英制公式中，便于核对假设。',
    metric: '公制',
    imperial: '英制',
    modelBasis: '组合蒸气模型',
    modelBasisHelp: '叠加 Stage I 卸油蒸气与储罐呼吸损失。不会再把旧的储罐作业损失快捷式叠加到 Stage I 上，以免重复计算装填置换。',
    stage1Model: 'Stage I 卸油',
    storageModel: '储罐呼吸损失',
    stage1Note: '本视图组合 AP-42 第 5.2 章 Stage I 卸油与 AP-42 第 7.1 章储罐呼吸。地下储罐呼吸会被折减而不是删除，以保留昼夜排气和 Stage III 类问题。',
    tankType: '储罐类型',
    aboveground: '地上固定顶罐',
    underground: '地下储罐',
    undergroundNote: '对于地下储罐，AP-42 第 7.1 章历史上允许采用零呼吸假设；本计算器保留折减后的呼吸分量，以便评估昼夜排气。',
    standingTitle: '静置损失输入',
    standingSubtitle: '由气相空间膨胀造成的每日呼吸损失。',
    vaporSpace: '气相空间体积',
    vaporDensity: '蒸气密度',
    vaporDensityHelp: '有现场数据时请使用现场蒸气密度。PM/ZRT 蒸气密度逻辑属于这里。',
    expansion: '呼吸膨胀系数',
    saturation: '饱和系数',
    ustBreathingReduction: '地下储罐呼吸折减',
    workingTitle: '作业损失输入',
    workingSubtitle: '由年度液体吞吐量产生的装填置换损失。',
    stage1Title: 'Stage I 卸油输入',
    stage1Subtitle: 'AP-42 5.2 中油罐车向地下储罐卸油时的汽油置换装载损失。',
    loadingSaturation: '装载饱和系数',
    bulkTemp: '主体液体温度',
    loadingLossFactor: '装载损失因子',
    throughput: '年度吞吐量',
    converted: '已转换为 EPA 风格公式所需的',
    vaporPressure: '真实蒸气压',
    tvpHelperTitle: '真实蒸气压助手',
    tvpHelperSubtitle: '根据 RVP 和燃油温度估算汽油 TVP。',
    reidVaporPressure: '雷德蒸气压',
    distillationSlope: 'ASTM D86 10%-70% 斜率',
    estimatedTvp: '估算 TVP',
    useEstimatedTvp: '使用估算 TVP',
    autoTvp: '自动 TVP',
    manualTvp: '手动 TVP',
    effectiveTvp: '计算用 TVP',
    tvpAboveAtmosphere: '估算 TVP 已高于大气压。在该温度下，燃油已超出 AP-42 装载损失规划估算的正常范围，应使用实验室数据或过程安全模型替代。',
    tvpHelperNote: '使用 AP-42 7.1 精制石油产品相关式：P = exp(A - B / T)。有实验室 TVP 或现场燃油数据时应优先使用。',
    molecularWeight: '分子量',
    turnover: '周转系数',
    product: '产品系数',
    temperatureTitle: '温度助手',
    temperatureSubtitle: '根据每日温度和蒸气压波动估算储罐呼吸 Ke。',
    tempRange: '每日蒸气温度范围',
    avgTemp: '平均液面温度',
    pressureRange: '每日蒸气压范围',
    ventRange: '呼吸阀压力范围',
    atmPressure: '平均大气压',
    siteElevation: '场地海拔',
    suggestedKe: '呼吸膨胀建议 Ke',
    useSuggested: '使用建议 Ke',
    recoveryTitle: '回收设置',
    recoverySubtitle: '估算捕集液体和剩余排放。',
    efficiency: 'VRU 回收效率',
    liquidDensity: '回收液体密度',
    fieldTarget: 'SGS / 现场目标',
    fieldTargetHelp: '回收液体占交付吞吐量的百分比。这是客户和投资人最关心的 KPI。',
    standingLoss: '静置损失',
    generatedVapor: '生成蒸气',
    storageBreathing: '储罐呼吸',
    combinedTotal: '组合总量',
    standingDetail: '年度呼吸损失估算。',
    workingLoss: '作业损失',
    workingDetail: '年度装填置换损失。',
    totalLoss: '总蒸气损失',
    totalDetail: '储罐呼吸加 Stage I 卸油。',
    recoveredLiquid: '回收液体',
    recoveredPerDay: '每日回收。',
    profileTitle: '损失与回收概况',
    chartUnit: '图表单位',
    throughputLabel: '吞吐量',
    recoveryOutput: '回收输出',
    recoveredMass: '回收质量',
    uncaptured: '未捕集排放',
    liquidEquivalent: '液体当量。',
    throughputRecovery: '吞吐量回收率',
    throughputRecoveryHelp: '回收液体除以年度液体吞吐量。',
    fieldTargetKpi: '现场目标回收率',
    targetImplied: '目标对应回收量',
    targetGap: '距离现场目标',
    benchmarkTitle: '基准区间',
    benchmarkRange: '常见现场范围',
    benchmarkHelp: '0.15%-0.29% 显示为相对年度吞吐量的液体当量损失范围，并不是通用 EPA 常数。',
    currentModel: '当前模型',
    defaultTitle: '默认值来源',
    defaultBody:
      '数值初始值来自你提供的 EPA 公式 PDF 和汽油 Stage I 场景：1,200,000 gal/yr 吞吐量、6.4 psia 蒸气压、蒸气分子量 66，以及 0.74 kg/L 的汽油类液体密度。储罐模式可复现地上罐 PDF 示例；Stage I 模式聚焦地下储罐油罐车卸油置换蒸气。',
    temperatureBody:
      '温度会从两个方向影响结果：燃油越热，真实蒸气压越高，作业损失越大；每日温差会让气相空间膨胀，提高 Ke 和静置损失。温度助手用热膨胀加蒸气压膨胀，并扣除呼吸阀压力范围来估算 Ke。',
    wisdomBody:
      '0.15%-0.29% 这类经验值通常来自把年度蒸气质量换算成汽油液体当量，再除以交付吞吐量。SGS 现场数据中的 0.5% 也是吞吐量归一化的液体回收指标，因此页面现在把它作为目标进行对比。',
    formulas: {
      standing: '使用气相空间、蒸气密度、蒸气膨胀和饱和假设估算年度呼吸损失。',
      working: '组合规划视图把 Stage I 卸油与储罐呼吸相加。这里不再叠加历史固定顶罐作业损失快捷式，以避免重复计算装填置换。',
      stage1: 'AP-42 5.2 装载损失：LL = 12.46 * S * P * M / T，单位为每 1,000 加仑装载量的磅数。',
      recovery: '使用回收产品密度，将捕集蒸气质量转换为液体当量。',
    },
    sourcesTitle: '来源说明',
    sourceAp42: 'EPA AP-42 第 5.2 章涵盖石油运输与营销损失、装载方式、饱和系数、回收控制以及收集/控制效率。',
    sourceStorage: 'EPA AP-42 第 7.1 章是固定顶罐静置和作业储存损失的更完整方法，其当前作业损失方法比历史 0.0010 快捷式更详细。',
    sourceUnderground: '对于地下卧式罐，AP-42 第 7.1 章说明由于土壤保温限制昼夜温差，可假设无呼吸或静置损失，作业损失无需修正。',
    sourcePdf: '默认场景来自你提供的两页 EPA 蒸发公式说明。',
    chinaNote: '中国有加油站油气回收相关标准，例如 GB 20952，用于排放限值和油气回收系统性能/检测。除非项目提供具体中国排放清单公式，否则应把它们作为合规和检测参考。',
    notPermitting: '本计算器用于规划级蒸气质量和液体当量回收估算，不能替代现场 AP-42 储罐建模、认证排放测试或许可计算。',
    info: {
      vaporSpace: '液面上方的气相空间。气相空间越大，可膨胀并排出的蒸气库存越多。',
      vaporDensity: '单位气相空间中的烃类蒸气质量，受分子量、蒸气压、温度和压缩性影响。',
      expansion: 'AP-42 风格的每日呼吸膨胀系数。它不是液体到蒸气的体积膨胀比。',
      saturation: '1.0 表示完全饱和蒸气。较低值代表高周转或停留时间较短造成的较稀蒸气。',
      ustBreathingReduction: '仅用于地下储罐呼吸损失的规划折减。0% 表示不折减；100% 表示旧的 AP-42 零呼吸假设。',
      throughput: '年度进入储罐的产品量。作业损失公式内部使用每年桶数。',
      loadingSaturation: 'AP-42 5.2 的饱和系数 S。专用气相平衡服务通常用 1.00；飞溅装载可能更高。',
      bulkTemp: 'AP-42 5.2 使用 Rankine 绝对主体液体温度。燃油越热分母越小，但通常也伴随更高蒸气压。',
      vaporPressure: '在主体液体温度下的真实蒸气压，会随燃油温度和挥发性升高而明显增加。',
      reidVaporPressure: 'RVP 在 100 F 条件下测量，汽油通常可获得该数据。它不同于 TVP，但 AP-42 为精制石油产品提供了相关式。',
      distillationSlope: 'AP-42 表 7.1-2 对车用汽油采用 3.0 作为默认蒸馏斜率。',
      molecularWeight: '汽油蒸气平均分子量。AP-42 示例计算常用 66。',
      tempRange: '用于建议 Ke 热膨胀项的每日气相空间温度摆幅。摆幅越大，建议呼吸膨胀越高。',
      avgTemp: '用于建议 Ke 热膨胀项分母的平均气相/液面绝对温度。',
      pressureRange: '用于建议 Ke 压力膨胀项的每日真实蒸气压摆幅。较热的白天燃油通常会提高该摆幅。',
      atmPressure: '由场地海拔按标准大气近似计算。海拔越高，大气压越低，呼吸敏感性越高。',
      siteElevation: '高于海平面的场地海拔。计算器将其转换为建议 Ke 压力项使用的平均大气压。',
      ventRange: '压力/真空呼吸阀在释放蒸气前吸收的开启压力带。设定越大，建议 Ke 越低。',
      turnover: '用于修正储罐周转和蒸气饱和行为。',
      product: '产品修正系数。简单汽油规划场景可保持 1.0，除非有特定系数。',
      efficiency: '此规划视图中的总体回收设置。严谨模型应拆分收集效率、控制效率和停机时间。',
      liquidDensity: '用于把回收蒸气质量转换成液体当量体积。',
    },
    chartNames: {
      standing: '静置',
      working: '作业',
      recovered: '回收',
      uncaptured: '未捕集',
    },
  },
  ar: {
    badge: 'تقدير فقد البخار وفق EPA',
    title: 'قدّر فقد البخار المتبخر ونسبة الاسترداد من الإنتاجية.',
    description:
      'حاسبة تقنية للفقد الساكن، وفقد التعبئة، وكفاءة الاسترداد، وحجم السائل المسترد كنسبة من الإنتاجية السنوية. تُحوّل المدخلات المترية إلى معادلات EPA ذات الأساس الإمبراطوري حتى تبقى الافتراضات واضحة.',
    metric: 'متري',
    imperial: 'إمبراطوري',
    modelBasis: 'نموذج بخار مركب',
    modelBasisHelp: 'يجمع بخار تفريغ Stage I مع تنفس خزان التخزين. لا يضيف اختصار فقد التعبئة القديم فوق Stage I حتى لا يحدث احتساب مزدوج لإزاحة التعبئة.',
    stage1Model: 'تفريغ Stage I',
    storageModel: 'تنفس خزان التخزين',
    stage1Note: 'يجمع هذا العرض بين تفريغ Stage I من AP-42 الفصل 5.2 وتنفس الخزان من AP-42 الفصل 7.1. تنفس UST يتم تخفيضه لا حذفه، حتى تبقى تهوية التغير اليومي ومخاوف Stage III ظاهرة.',
    tankType: 'نوع الخزان',
    aboveground: 'خزان ثابت فوق الأرض',
    underground: 'خزان تخزين تحت الأرض',
    undergroundNote: 'بالنسبة إلى UST، يسمح AP-42 الفصل 7.1 تاريخيا بفرضية عدم وجود تنفس، لكن هذه الحاسبة تبقي مكون تنفس مخفضا لاختبار التهوية اليومية.',
    standingTitle: 'مدخلات الفقد الساكن',
    standingSubtitle: 'فقد التنفس اليومي الناتج عن تمدد مساحة البخار.',
    vaporSpace: 'حجم مساحة البخار',
    vaporDensity: 'كثافة البخار',
    vaporDensityHelp: 'استخدم كثافة البخار الخاصة بالموقع عند توفرها. منطق PM/ZRT لكثافة البخار ينتمي إلى هذا الحقل.',
    expansion: 'عامل تمدد التنفس',
    saturation: 'عامل التشبع',
    ustBreathingReduction: 'تخفيض تنفس UST',
    workingTitle: 'مدخلات فقد التعبئة',
    workingSubtitle: 'فقد الإزاحة الناتج عن الإنتاجية السائلة السنوية.',
    stage1Title: 'مدخلات تفريغ Stage I',
    stage1Subtitle: 'فقد التحميل وفق AP-42 5.2 من بخار البنزين المزاح أثناء تفريغ الشاحنة إلى UST.',
    loadingSaturation: 'عامل تشبع التحميل',
    bulkTemp: 'حرارة السائل الكلية',
    loadingLossFactor: 'عامل فقد التحميل',
    throughput: 'الإنتاجية السنوية',
    converted: 'تم التحويل لمعادلة EPA إلى',
    vaporPressure: 'ضغط البخار الحقيقي',
    tvpHelperTitle: 'مساعد ضغط البخار الحقيقي',
    tvpHelperSubtitle: 'تقدير TVP للبنزين من RVP وحرارة الوقود.',
    reidVaporPressure: 'ضغط ريد البخاري',
    distillationSlope: 'ميل ASTM D86 10%-70%',
    estimatedTvp: 'TVP المقدر',
    useEstimatedTvp: 'استخدم TVP المقدر',
    autoTvp: 'TVP تلقائي',
    manualTvp: 'TVP يدوي',
    effectiveTvp: 'TVP المستخدم في الحساب',
    tvpAboveAtmosphere: 'TVP المقدر أعلى من الضغط الجوي. عند هذه الحرارة يصبح الوقود خارج نطاق تقدير AP-42 التخطيطي لفقد التحميل، ويجب استخدام بيانات مختبرية أو نموذج سلامة عملية.',
    tvpHelperNote: 'يستخدم علاقة AP-42 7.1 للمنتجات البترولية المكررة: P = exp(A - B / T). بيانات TVP المختبرية أو بيانات الوقود في الموقع يجب أن تتقدم على هذا التقدير التخطيطي.',
    molecularWeight: 'الوزن الجزيئي',
    turnover: 'عامل الدوران',
    product: 'عامل المنتج',
    temperatureTitle: 'مساعد الحرارة',
    temperatureSubtitle: 'تقدير Ke الخاص بتنفس الخزان من تغير الحرارة وضغط البخار اليومي.',
    tempRange: 'مدى حرارة البخار اليومي',
    avgTemp: 'متوسط حرارة سطح السائل',
    pressureRange: 'مدى ضغط البخار اليومي',
    ventRange: 'مدى ضغط صمام التنفس',
    atmPressure: 'متوسط الضغط الجوي',
    siteElevation: 'ارتفاع الموقع',
    suggestedKe: 'Ke المقترح لتمدد التنفس',
    useSuggested: 'استخدم Ke المقترح',
    recoveryTitle: 'إعدادات الاسترداد',
    recoverySubtitle: 'تقدير السائل الملتقط والانبعاثات المتبقية.',
    efficiency: 'كفاءة استرداد VRU',
    liquidDensity: 'كثافة السائل المسترد',
    fieldTarget: 'هدف SGS / الموقع',
    fieldTargetHelp: 'السائل المسترد كنسبة من الإنتاجية المسلمة. هذا هو مؤشر العميل والمستثمر.',
    standingLoss: 'الفقد الساكن',
    generatedVapor: 'البخار المتولد',
    storageBreathing: 'تنفس التخزين',
    combinedTotal: 'الإجمالي المركب',
    standingDetail: 'تقدير فقد التنفس السنوي.',
    workingLoss: 'فقد التعبئة',
    workingDetail: 'فقد الإزاحة السنوي أثناء التعبئة.',
    totalLoss: 'إجمالي فقد البخار',
    totalDetail: 'تنفس التخزين مع تفريغ Stage I.',
    recoveredLiquid: 'السائل المسترد',
    recoveredPerDay: 'مسترد يوميا.',
    profileTitle: 'ملف الفقد والاسترداد',
    chartUnit: 'وحدة الرسم',
    throughputLabel: 'الإنتاجية',
    recoveryOutput: 'مخرجات الاسترداد',
    recoveredMass: 'الكتلة المستردة',
    uncaptured: 'انبعاثات غير ملتقطة',
    liquidEquivalent: 'مكافئ سائل.',
    throughputRecovery: 'نسبة الاسترداد من الإنتاجية',
    throughputRecoveryHelp: 'السائل المسترد مقسوما على الإنتاجية السائلة السنوية.',
    fieldTargetKpi: 'هدف الاسترداد الميداني',
    targetImplied: 'الاسترداد المطلوب للهدف',
    targetGap: 'الفجوة إلى هدف الموقع',
    benchmarkTitle: 'نطاق مرجعي',
    benchmarkRange: 'نطاق ميداني شائع',
    benchmarkHelp: 'يُعرض 0.15%-0.29% كنطاق فقد بمكافئ سائل مقابل الإنتاجية السنوية، وليس كثابت عام من EPA.',
    currentModel: 'النموذج الحالي',
    defaultTitle: 'مصدر القيم الافتراضية',
    defaultBody:
      'القيم الرقمية الابتدائية مأخوذة من ملف EPA الذي قدمته ومن حالة بنزين Stage I: إنتاجية 1,200,000 gal/yr، وضغط بخار 6.4 psia، ووزن جزيئي 66، وكثافة بنزين قريبة من 0.74 kg/L. وضع التخزين يمكن أن يعيد مثال الخزان فوق الأرض؛ وضع Stage I يركز على بخار الإزاحة أثناء تفريغ الشاحنة إلى UST.',
    temperatureBody:
      'تؤثر الحرارة مرتين: ارتفاع حرارة الوقود يزيد ضغط البخار الحقيقي فيرفع فقد التعبئة، والمدى الحراري اليومي يمدد بخار الفراغ فيرفع Ke والفقد الساكن. يقدّر المساعد Ke من التمدد الحراري وتمدد ضغط البخار مع طرح مدى ضغط صمام التنفس.',
    wisdomBody:
      'غالبا ما تأتي قاعدة 0.15%-0.29% من تحويل كتلة البخار السنوية إلى مكافئ بنزين سائل ثم قسمتها على الإنتاجية المسلمة. وقراءة SGS مثل 0.5% هي أيضا مؤشر استرداد سائل منسوب إلى الإنتاجية، لذلك يعرضها النموذج الآن كهدف مقارنة.',
    formulas: {
      standing: 'يستخدم مساحة البخار، وكثافة البخار، وتمدد البخار، وافتراضات التشبع لتقدير فقد التنفس السنوي.',
      working: 'العرض التخطيطي المركب يجمع تفريغ Stage I مع تنفس التخزين. لا يضاف اختصار فقد التعبئة التاريخي هنا لتجنب احتساب إزاحة التعبئة مرتين.',
      stage1: 'فقد التحميل وفق AP-42 5.2: LL = 12.46 * S * P * M / T بوحدة رطل لكل 1,000 غالون محمل.',
      recovery: 'يحوّل كتلة البخار الملتقط إلى مكافئ سائل باستخدام كثافة المنتج المسترد.',
    },
    sourcesTitle: 'ملاحظات المصدر',
    sourceAp42: 'يغطي EPA AP-42 الفصل 5.2 فقد النقل والتسويق للمنتجات البترولية وطرق التحميل وعوامل التشبع وضوابط الاسترداد وكفاءة الجمع/التحكم.',
    sourceStorage: 'EPA AP-42 الفصل 7.1 هو المنهج الأوسع لفقد الخزانات ذات السقف الثابت. طريقة فقد التعبئة الحالية أكثر تفصيلا من اختصار 0.0010 التاريخي.',
    sourceUnderground: 'بالنسبة للخزانات الأفقية تحت الأرض، ينص AP-42 الفصل 7.1 على افتراض عدم وجود فقد تنفسي أو ساكن لأن عزل التربة يحد من تغير الحرارة اليومي، ولا يلزم تعديل فقد التعبئة.',
    sourcePdf: 'يتبع السيناريو الافتراضي مذكرة معادلة التبخر من EPA التي أرسلتها.',
    chinaNote: 'لدى الصين معايير لاسترداد أبخرة محطات الوقود مثل GB 20952 لحدود الانبعاثات وأداء/اختبار أنظمة الاسترداد. استخدمها كمرجع امتثال واختبار ما لم يقدم المشروع معادلة جرد صينية محددة.',
    notPermitting: 'هذه الحاسبة لتقدير تخطيطي لكتلة البخار والاسترداد بمكافئ سائل، وليست بديلا لنمذجة AP-42 الخاصة بالموقع أو الاختبارات المعتمدة أو حسابات التصاريح.',
    info: {
      vaporSpace: 'حجم الفراغ فوق السائل. كلما زاد الفراغ زاد مخزون البخار القابل للتمدد والتنفيس.',
      vaporDensity: 'كتلة بخار الهيدروكربون لكل حجم فراغ، وتتأثر بالوزن الجزيئي وضغط البخار والحرارة والانضغاطية.',
      expansion: 'عامل تمدد التنفس اليومي بأسلوب AP-42. هذا ليس نسبة تمدد السائل إلى البخار.',
      saturation: '1.0 يعني بخارا مشبعا بالكامل. القيم الأقل تمثل بخارا أخف بسبب دوران أعلى أو زمن مكوث أقل.',
      ustBreathingReduction: 'خصم تخطيطي يطبق فقط على تنفس الخزان تحت الأرض. استخدم 0% بدون خصم أو 100% لفرضية AP-42 القديمة بعدم وجود تنفس.',
      throughput: 'كمية المنتج السنوية الداخلة إلى الخزان. تستخدم معادلة فقد التعبئة البراميل سنويا داخليا.',
      loadingSaturation: 'عامل التشبع S من AP-42 5.2. الخدمة المخصصة بتوازن البخار تستخدم غالبا 1.00، أما التحميل بالرش فقد يكون أعلى.',
      bulkTemp: 'يستخدم AP-42 5.2 حرارة السائل المطلقة برانكين. الوقود الأعلى حرارة يخفض المقام وغالبا يصاحبه ضغط بخار أعلى.',
      vaporPressure: 'ضغط البخار الحقيقي عند حرارة السائل، ويزداد بقوة مع حرارة الوقود وتطايره.',
      reidVaporPressure: 'يقاس RVP عند 100 F وغالبا ما يكون متاحا للبنزين. ليس هو نفسه TVP، لكن AP-42 يوفر علاقة للمنتجات البترولية المكررة.',
      distillationSlope: 'يستخدم AP-42 Table 7.1-2 القيمة 3.0 كميل تقطير افتراضي لبنزين السيارات.',
      molecularWeight: 'متوسط الوزن الجزيئي لبخار البنزين. تستخدم أمثلة AP-42 غالبا القيمة 66.',
      tempRange: 'تأرجح حرارة فراغ البخار اليومي المستخدم في جزء التمدد الحراري من Ke المقترح. التأرجح الأكبر يزيد تمدد التنفس المقترح.',
      avgTemp: 'متوسط حرارة البخار/سطح السائل المستخدم كمقام حرارة مطلقة في حد Ke الحراري.',
      pressureRange: 'تأرجح ضغط البخار الحقيقي اليومي المستخدم في جزء تمدد الضغط من Ke المقترح.',
      atmPressure: 'يحسب من ارتفاع الموقع بتقريب الغلاف الجوي القياسي. الارتفاع الأعلى يخفض الضغط الجوي ويرفع حساسية التنفس.',
      siteElevation: 'ارتفاع الموقع فوق مستوى البحر. تحوله الحاسبة إلى متوسط ضغط جوي لحد الضغط في Ke المقترح.',
      ventRange: 'نطاق فتح صمام الضغط/الفراغ قبل إطلاق البخار. الإعداد الأكبر يخفض Ke المقترح.',
      turnover: 'تصحيح لسلوك دوران الخزان وتشبع البخار.',
      product: 'عامل تصحيح حسب المنتج. أبقه 1.0 لحالة بنزين تخطيطية ما لم تتوفر قيمة محددة.',
      efficiency: 'إعداد الاسترداد الكلي لهذا العرض التخطيطي. في النموذج الدقيق افصل كفاءة الجمع وكفاءة التحكم والتوقف.',
      liquidDensity: 'يستخدم لتحويل كتلة البخار المسترد إلى حجم مكافئ سائل.',
    },
    chartNames: {
      standing: 'ساكن',
      working: 'تعبئة',
      recovered: 'مسترد',
      uncaptured: 'غير ملتقط',
    },
  },
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const toKg = (lb: number) => lb / LB_PER_KG;
const toLb = (kg: number) => kg * LB_PER_KG;
const cToK = (c: number) => c + 273.15;
const cToR = (c: number) => (c * 1.8 + 32) + 459.67;
const cToF = (c: number) => c * 1.8 + 32;
const fToC = (f: number) => (f - 32) / 1.8;

const estimateGasolineTvpPsia = (rvpPsia: number, temperatureC: number, distillationSlope: number) => {
  if (rvpPsia <= 0 || distillationSlope <= 0) return 0;
  const slopeRoot = Math.sqrt(distillationSlope);
  const rvpLog = Math.log(rvpPsia);
  const a = 15.64 - 1.854 * slopeRoot - (0.8742 - 0.3280 * slopeRoot) * rvpLog;
  const b = 8742 - 1042 * slopeRoot - (1049 - 179.4 * slopeRoot) * rvpLog;
  return Math.exp(a - b / cToR(temperatureC));
};

const calculateVaporDensityKgM3 = (molecularWeight: number, vaporPressureKpa: number, vaporTemperatureC: number) => {
  const vaporTemperatureK = cToK(vaporTemperatureC);
  if (vaporTemperatureK <= 0) return 0;
  return vaporPressureKpa * molecularWeight / (GAS_CONSTANT_METRIC * vaporTemperatureK);
};

const estimateAtmosphericPressureKpa = (elevationM: number) => {
  const boundedElevationM = clamp(elevationM, -500, 9000);
  return 101.325 * Math.pow(1 - 2.25577e-5 * boundedElevationM, 5.25588);
};

const InfoBubble = ({ text }: { text: string }) => {
  const tooltipRef = useRef<HTMLSpanElement | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [position, setPosition] = useState<{ left: number; top: number; placement: 'above' | 'below' } | null>(null);

  const showTooltip = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const width = Math.min(288, window.innerWidth - 24);
    setAnchorRect(rect);
    setPosition({
      left: clamp(rect.right - width, 12, Math.max(12, window.innerWidth - width - 12)),
      top: clamp(rect.bottom + 8, 12, Math.max(12, window.innerHeight - 12)),
      placement: 'below',
    });
  };

  const hideTooltip = () => {
    setAnchorRect(null);
    setPosition(null);
  };

  useLayoutEffect(() => {
    if (!anchorRect || !position || !tooltipRef.current) return;

    const margin = 12;
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const fitsBelow = anchorRect.bottom + 8 + tooltipRect.height <= window.innerHeight - margin;
    const nextPlacement: 'above' | 'below' = fitsBelow ? 'below' : 'above';
    const naturalTop = fitsBelow ? anchorRect.bottom + 8 : anchorRect.top - tooltipRect.height - 8;
    const nextPosition = {
      left: clamp(anchorRect.right - tooltipRect.width, margin, Math.max(margin, window.innerWidth - tooltipRect.width - margin)),
      top: clamp(naturalTop, margin, Math.max(margin, window.innerHeight - tooltipRect.height - margin)),
      placement: nextPlacement,
    };

    if (
      Math.abs(nextPosition.left - position.left) > 0.5 ||
      Math.abs(nextPosition.top - position.top) > 0.5 ||
      nextPosition.placement !== position.placement
    ) {
      setPosition(nextPosition);
    }
  }, [anchorRect, position, text]);

  return (
    <span className="inline-flex">
      <button
        type="button"
        onMouseEnter={event => showTooltip(event.currentTarget)}
        onMouseLeave={hideTooltip}
        onFocus={event => showTooltip(event.currentTarget)}
        onBlur={hideTooltip}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-emerald-300 outline-none transition-colors hover:border-emerald-400/40 hover:bg-emerald-500/10 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/25"
        aria-label={text}
      >
        <Info size={13} />
      </button>
      {position && typeof document !== 'undefined' && createPortal(
        <span
          ref={tooltipRef}
          className="pointer-events-none fixed z-[10020] max-h-[min(18rem,calc(100vh-1.5rem))] w-[min(18rem,calc(100vw-1.5rem))] overflow-y-auto rounded-lg border border-white/10 bg-[#111827] p-3 text-xs leading-relaxed text-gray-200 shadow-xl"
          style={{
            left: position.left,
            top: position.top,
          }}
        >
          {text}
        </span>,
        document.body
      )}
    </span>
  );
};

const formatNumber = (value: number, digits = 0, locale = 'en-US') =>
  new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);

const decimalPlacesForStep = (step: number) => {
  if (!Number.isFinite(step)) return 4;
  const stepText = String(step);
  if (!stepText.includes('.')) return 0;
  return Math.min(6, stepText.split('.')[1]?.length ?? 0);
};

const toEditableNumberText = (value: number, step: number) => {
  if (!Number.isFinite(value)) return '';
  const digits = Math.max(decimalPlacesForStep(step), 4);
  return Number(value.toFixed(digits)).toString();
};

const parseNumberDraft = (draft: string) => {
  const cleaned = draft.replace(/,/g, '').trim();
  if (!cleaned || cleaned === '-' || cleaned === '.' || cleaned === '-.') return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
};

const InputField = ({
  label,
  value,
  onChange,
  unit,
  unitOptions,
  selectedUnit,
  onUnitChange,
  step = 1,
  min = 0,
  max,
  helper,
  info,
  disabled = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  unitOptions?: Array<{ value: UnitOverride; label: string }>;
  selectedUnit?: UnitOverride;
  onUnitChange?: (value: UnitOverride) => void;
  step?: number;
  min?: number;
  max?: number;
  helper?: string;
  info?: string;
  disabled?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(() => toEditableNumberText(value, step));
  const formattedValue = formatNumber(value, Math.max(decimalPlacesForStep(step), 0));

  useEffect(() => {
    if (!isEditing) {
      setDraft(toEditableNumberText(value, step));
    }
  }, [isEditing, step, value]);

  const boundValue = (nextValue: number) => Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min, nextValue));

  const commitDraft = () => {
    const parsed = parseNumberDraft(draft);
    if (parsed === null) {
      if (!draft.replace(/,/g, '').trim()) {
        const nextValue = boundValue(min);
        onChange(nextValue);
        setDraft(toEditableNumberText(nextValue, step));
        return;
      }
      setDraft(toEditableNumberText(value, step));
      return;
    }

    const nextValue = boundValue(parsed);
    onChange(nextValue);
    setDraft(toEditableNumberText(nextValue, step));
  };

  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-gray-200">
          <span>{label}</span>
          {info && <InfoBubble text={info} />}
        </span>
        {unitOptions && selectedUnit && onUnitChange ? (
          <select
            value={selectedUnit}
            onChange={event => onUnitChange(event.target.value as UnitOverride)}
            className="h-8 shrink-0 rounded-full border border-white/10 bg-[#101827] px-2 text-[11px] font-bold text-emerald-200 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
          >
            {unitOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : null}
      </span>
      <span className="relative block">
        <input
          type="text"
          inputMode="decimal"
          value={isEditing ? draft : formattedValue}
          disabled={disabled}
          onFocus={event => {
            const input = event.currentTarget;
            setIsEditing(true);
            setDraft(toEditableNumberText(value, step));
            requestAnimationFrame(() => input.select());
          }}
          onChange={event => {
            const nextDraft = event.target.value;
            if (/^-?[\d,]*\.?\d*$/.test(nextDraft)) {
              setDraft(nextDraft);
              const parsed = parseNumberDraft(nextDraft);
              if (parsed !== null) onChange(boundValue(parsed));
            }
          }}
          onBlur={() => {
            commitDraft();
            setIsEditing(false);
          }}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.currentTarget.blur();
            }
          }}
          className="h-11 w-full rounded-lg border border-white/10 bg-[#070c18] px-3 pr-24 font-mono text-sm text-white outline-none transition-colors placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-gray-400 disabled:opacity-75 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 max-w-20 -translate-y-1/2 truncate rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 text-[11px] font-black leading-none text-emerald-200">
          {unit}
        </span>
      </span>
      {helper && <span className="mt-2 block text-xs leading-relaxed text-gray-400">{helper}</span>}
    </label>
  );
};

const FormulaCard = ({ title, formula, children }: { title: string; formula: React.ReactNode; children: React.ReactNode }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
    <p className="text-sm font-bold text-white">{title}</p>
    <div className="mt-2 overflow-x-auto rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-3 text-emerald-200">
      {formula}
    </div>
    <p className="mt-3 text-xs leading-relaxed text-gray-400">{children}</p>
  </div>
);

const MathDisplay = ({ children }: { children: React.ReactNode }) => (
  <div className="min-w-max text-center text-[1.05rem] leading-relaxed">
    <math display="block" xmlns="http://www.w3.org/1998/Math/MathML">
      {children}
    </math>
  </div>
);

const ComputedRow = ({ label, value, detail }: { label: string; value: string; detail?: string }) => (
  <div className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2">
    <div className="flex items-baseline justify-between gap-3">
      <p className="text-xs font-semibold text-gray-300">{label}</p>
      <p className="font-mono text-sm font-black text-white">{value}</p>
    </div>
    {detail && <p className="mt-1 text-xs leading-relaxed text-gray-400">{detail}</p>}
  </div>
);

const SwitchButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-lg border px-3 py-2 text-xs font-black transition-colors ${
      active
        ? 'border-emerald-400/40 bg-emerald-400 text-black'
        : 'border-white/10 bg-white/[0.04] text-gray-200 hover:border-emerald-400/30 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const CollapsibleSection = ({
  icon: Icon,
  title,
  subtitle,
  children,
  tone = 'emerald',
  defaultOpen = true,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tone?: 'emerald' | 'teal' | 'cyan' | 'amber' | 'sky';
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const toneClasses: Record<NonNullable<typeof tone>, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-300',
    teal: 'bg-teal-500/10 text-teal-300',
    cyan: 'bg-cyan-500/10 text-cyan-300',
    amber: 'bg-amber-500/10 text-amber-300',
    sky: 'bg-sky-500/10 text-sky-300',
  };

  return (
    <details open={open} onToggle={event => setOpen(event.currentTarget.open)} className="group rounded-xl border border-white/10 bg-[#0b1120] p-5">
      <summary className="-m-2 flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg p-2 outline-none transition-colors hover:bg-white/[0.035] focus-visible:ring-2 focus-visible:ring-emerald-400/40 [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 items-center gap-3">
          <span className={`rounded-lg p-2 ${toneClasses[tone]}`}>
            <Icon size={18} />
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-white">{title}</span>
            {subtitle && <span className="mt-1 block text-xs leading-relaxed text-gray-400">{subtitle}</span>}
          </span>
        </span>
        <ChevronDown size={18} className="shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-5 grid gap-4">
        {children}
      </div>
    </details>
  );
};

const EpaCalculatorPage: React.FC = () => {
  const { language } = useTranslation();
  const c = copy[language] ?? copy.en;
  const locale = language === 'zh-CN' ? 'zh-CN' : language === 'ar' ? 'ar' : 'en-US';
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [unitOverrides, setUnitOverrides] = useState<Record<string, UnitOverride>>({});
  const [tankType, setTankType] = useState<TankType>('underground');
  const [tankCount, setTankCount] = useState(1);
  const [typicalTankCapacityL, setTypicalTankCapacityL] = useState(40_000);
  const [averageTankFillPercent, setAverageTankFillPercent] = useState(75);
  const [manualVaporDensity, setManualVaporDensity] = useState(false);
  const [manualVaporDensityKgM3, setManualVaporDensityKgM3] = useState(1.2);
  const [expansionFactor, setExpansionFactor] = useState(0.0156);
  const [saturationFactor, setSaturationFactor] = useState(1);
  const [ustBreathingReduction, setUstBreathingReduction] = useState(85);
  const [throughputL, setThroughputL] = useState(4_542_494);
  const [vaporPressureKpa, setVaporPressureKpa] = useState(44.1);
  const [useAutoTvp, setUseAutoTvp] = useState(true);
  const [molecularWeight, setMolecularWeight] = useState(66);
  const [loadingSaturationFactor, setLoadingSaturationFactor] = useState(1);
  const [bulkLiquidTempC, setBulkLiquidTempC] = useState(26.7);
  const [reidVaporPressureKpa, setReidVaporPressureKpa] = useState(82.7);
  const [distillationSlope, setDistillationSlope] = useState(DEFAULT_GASOLINE_DISTILLATION_SLOPE);
  const [tempRangeC, setTempRangeC] = useState(12);
  const [avgLiquidTempC, setAvgLiquidTempC] = useState(26.7);
  const [pressureRangeKpa, setPressureRangeKpa] = useState(1.2);
  const [breatherVentRangeKpa, setBreatherVentRangeKpa] = useState(0);
  const [siteElevationM, setSiteElevationM] = useState(0);
  const [ambientTempC, setAmbientTempC] = useState(50);
  const [terminalFuelTempC, setTerminalFuelTempC] = useState(20);
  const [solarAbsorptivity, setSolarAbsorptivity] = useState(0.75);
  const [solarIrradianceWM2, setSolarIrradianceWM2] = useState(1000);
  const [sunExposedAreaM2, setSunExposedAreaM2] = useState(90);
  const [tankerSurfaceAreaM2, setTankerSurfaceAreaM2] = useState(90);
  const [wallHeatTransferCoeff, setWallHeatTransferCoeff] = useState(50);
  const [driveHours, setDriveHours] = useState(2);
  const [tankerFuelMassKg, setTankerFuelMassKg] = useState(24_000);
  const [gasolineHeatCapacityJKgC, setGasolineHeatCapacityJKgC] = useState(2_220);
  const [showFuelTemperatureDetails, setShowFuelTemperatureDetails] = useState(false);
  const [recoveryEfficiency, setRecoveryEfficiency] = useState(99);
  const [liquidDensityKgL, setLiquidDensityKgL] = useState(GASOLINE_DENSITY_KG_L);
  const [fieldTargetRecoveryRate, setFieldTargetRecoveryRate] = useState(0.5);
  const [stage2ThroughputShare, setStage2ThroughputShare] = useState(0);
  const [stage2ReturnEfficiency, setStage2ReturnEfficiency] = useState(90);
  const [stage2RefuelingFactor, setStage2RefuelingFactor] = useState(DEFAULT_STAGE2_REFUELING_FACTOR_LB_PER_1000_GAL);

  useEffect(() => {
    setSaturationFactor(current => clamp(current, 0, 1));
  }, []);

  const values = useMemo(() => {
    const activeTankCount = Math.max(1, Math.round(tankCount));
    const connectedTankCapacityL = activeTankCount * Math.max(0, typicalTankCapacityL);
    const weightedConnectedFillPercent = clamp(averageTankFillPercent, 0, 100);
    const connectedTankUllageM3 = Math.max(0, connectedTankCapacityL / L_PER_M3 * (1 - weightedConnectedFillPercent / 100));
    const computedVaporSpaceM3 = connectedTankUllageM3;
    const vaporSpaceM3 = computedVaporSpaceM3;
    const atmosphericPressureKpa = estimateAtmosphericPressureKpa(siteElevationM);
    const reidVaporPressurePsia = reidVaporPressureKpa * PSIA_PER_KPA;
    const estimatedTvpPsia = estimateGasolineTvpPsia(reidVaporPressurePsia, bulkLiquidTempC, distillationSlope);
    const estimatedTvpKpa = estimatedTvpPsia * KPA_PER_PSIA;
    const calculationVaporPressureKpa = useAutoTvp ? estimatedTvpKpa : vaporPressureKpa;
    const vaporDensityAutoKgM3 = calculateVaporDensityKgM3(molecularWeight, calculationVaporPressureKpa, avgLiquidTempC);
    const vaporDensityKgM3 = manualVaporDensity ? manualVaporDensityKgM3 : vaporDensityAutoKgM3;
    const vaporSpaceFt3 = vaporSpaceM3 * FT3_PER_M3;
    const vaporDensityLbFt3 = vaporDensityKgM3 * LB_PER_KG / FT3_PER_M3;
    const standingLossLbRaw = 365 * vaporSpaceFt3 * vaporDensityLbFt3 * expansionFactor * saturationFactor;
    const breathingMultiplier = tankType === 'underground' ? 1 - clamp(ustBreathingReduction, 0, 100) / 100 : 1;
    const storageBreathingLossLb = standingLossLbRaw * breathingMultiplier;
    const throughputBbl = throughputL / L_PER_BBL;
    const throughputGal = throughputL / L_PER_GAL;
    const vaporPressurePsia = calculationVaporPressureKpa * PSIA_PER_KPA;
    const bulkLiquidTempR = cToR(bulkLiquidTempC);
    const loadingLossLbPerThousandGal =
      bulkLiquidTempR > 0 ? 12.46 * loadingSaturationFactor * vaporPressurePsia * molecularWeight / bulkLiquidTempR : 0;
    const stage1LossLb = loadingLossLbPerThousandGal * (throughputGal / 1000);
    const stage2ReturnedLossLb =
      stage2RefuelingFactor * (throughputGal / 1000) * (clamp(stage2ThroughputShare, 0, 100) / 100) * (clamp(stage2ReturnEfficiency, 0, 100) / 100);
    const abovegroundStorageBreathingLossLb = standingLossLbRaw;
    const undergroundStorageBreathingLossLb = standingLossLbRaw * (1 - clamp(ustBreathingReduction, 0, 100) / 100);
    const abovegroundTotalLossLb = stage1LossLb + stage2ReturnedLossLb + abovegroundStorageBreathingLossLb;
    const undergroundTotalLossLb = stage1LossLb + stage2ReturnedLossLb + undergroundStorageBreathingLossLb;
    const tankTypeTotalDeltaLb = abovegroundTotalLossLb - undergroundTotalLossLb;
    const tankTypeTotalDeltaPercent = abovegroundTotalLossLb > 0 ? (tankTypeTotalDeltaLb / abovegroundTotalLossLb) * 100 : 0;
    const stage1SharePercent = abovegroundTotalLossLb > 0 ? (stage1LossLb / abovegroundTotalLossLb) * 100 : 0;
    const standingLossLb = storageBreathingLossLb;
    const workingLossLb = stage1LossLb;
    const stage2ReturnedLossKg = toKg(stage2ReturnedLossLb);
    const standingLossKg = toKg(standingLossLb);
    const workingLossKg = toKg(workingLossLb);
    const totalLossKg = standingLossKg + workingLossKg + stage2ReturnedLossKg;
    const totalLossLb = standingLossLb + workingLossLb + stage2ReturnedLossLb;
    const storageBreathingSharePercent = totalLossKg > 0 ? (standingLossKg / totalLossKg) * 100 : 0;
    const efficiency = clamp(recoveryEfficiency, 0, 100) / 100;
    const recoveredKg = totalLossKg * efficiency;
    const unrecoveredKg = totalLossKg - recoveredKg;
    const recoveredLiters = liquidDensityKgL > 0 ? recoveredKg / liquidDensityKgL : 0;
    const unrecoveredLiters = liquidDensityKgL > 0 ? unrecoveredKg / liquidDensityKgL : 0;
    const vaporInventoryKg = vaporSpaceM3 * vaporDensityKgM3;
    const vaporInventoryLiquidLiters = liquidDensityKgL > 0 ? vaporInventoryKg / liquidDensityKgL : 0;
    const throughputRecoveryRate = throughputL > 0 ? (recoveredLiters / throughputL) * 100 : 0;
    const fieldTargetLiters = throughputL * (fieldTargetRecoveryRate / 100);
    const fieldTargetKg = fieldTargetLiters * liquidDensityKgL;
    const fieldTargetGap = throughputRecoveryRate - fieldTargetRecoveryRate;
    const dailyRecoveredLiters = recoveredLiters / 365;
    const totalLiquidEquivalentGal = totalLossLb / GASOLINE_DENSITY_LB_GAL;
    const totalLossPercent = throughputGal > 0 ? (totalLiquidEquivalentGal / throughputGal) * 100 : 0;
    const suggestedKeRaw =
      cToK(avgLiquidTempC) > 0 && atmosphericPressureKpa > calculationVaporPressureKpa
        ? tempRangeC / cToK(avgLiquidTempC) + (pressureRangeKpa - breatherVentRangeKpa) / (atmosphericPressureKpa - calculationVaporPressureKpa)
        : expansionFactor;
    const suggestedKe = clamp(suggestedKeRaw, 0, 0.99);
    const overallUA = Math.max(0, wallHeatTransferCoeff) * Math.max(0, tankerSurfaceAreaM2);
    const solarHeatInputW = clamp(solarAbsorptivity, 0, 1) * Math.max(0, solarIrradianceWM2) * Math.max(0, sunExposedAreaM2);
    const solAirLiftC = overallUA > 0 ? solarHeatInputW / overallUA : 0;
    const solAirTempC = ambientTempC + solAirLiftC;
    const fuelThermalMassJC = Math.max(0, tankerFuelMassKg) * Math.max(0, gasolineHeatCapacityJKgC);
    const driveSeconds = Math.max(0, driveHours) * 3600;
    const heatupExponent = fuelThermalMassJC > 0 ? -(overallUA / fuelThermalMassJC) * driveSeconds : 0;
    const estimatedDeliveredFuelTempC = solAirTempC - (solAirTempC - terminalFuelTempC) * Math.exp(heatupExponent);

    return {
      standingLossKg,
      activeTankCount,
      connectedTankCapacityL,
      connectedTankUllageM3,
      weightedConnectedFillPercent,
      computedVaporSpaceM3,
      vaporSpaceM3,
      vaporSpaceFt3,
      vaporDensityAutoKgM3,
      vaporDensityKgM3,
      vaporDensityLbFt3,
      vaporInventoryKg,
      vaporInventoryLiquidLiters,
      storageBreathingReduction: clamp(ustBreathingReduction, 0, 100),
      storageBreathingSharePercent,
      abovegroundStorageBreathingLossKg: toKg(abovegroundStorageBreathingLossLb),
      undergroundStorageBreathingLossKg: toKg(undergroundStorageBreathingLossLb),
      abovegroundTotalLossKg: toKg(abovegroundTotalLossLb),
      undergroundTotalLossKg: toKg(undergroundTotalLossLb),
      tankTypeTotalDeltaKg: toKg(tankTypeTotalDeltaLb),
      tankTypeTotalDeltaPercent,
      stage1SharePercent,
      workingLossKg,
      stage2ReturnedLossKg,
      stage2ReturnedLossLbPerThousandGal: stage2RefuelingFactor * (clamp(stage2ThroughputShare, 0, 100) / 100) * (clamp(stage2ReturnEfficiency, 0, 100) / 100),
      totalLossKg,
      recoveredKg,
      unrecoveredKg,
      recoveredLiters,
      unrecoveredLiters,
      throughputRecoveryRate,
      fieldTargetRecoveryRate,
      fieldTargetLiters,
      fieldTargetKg,
      fieldTargetGap,
      dailyRecoveredLiters,
      throughputBbl,
      throughputGal,
      vaporPressurePsia,
      atmosphericPressureKpa,
      calculationVaporPressureKpa,
      reidVaporPressurePsia,
      estimatedTvpPsia,
      estimatedTvpKpa,
      loadingLossLbPerThousandGal,
      totalLossPercent,
      suggestedKe,
      solAirTempC,
      solAirLiftC,
      solarHeatInputW,
      overallUA,
      fuelThermalMassJC,
      heatupExponent,
      estimatedDeliveredFuelTempC,
    };
  }, [
    ambientTempC,
    avgLiquidTempC,
    breatherVentRangeKpa,
    averageTankFillPercent,
    tankCount,
    typicalTankCapacityL,
    expansionFactor,
    fieldTargetRecoveryRate,
    driveHours,
    gasolineHeatCapacityJKgC,
    loadingSaturationFactor,
    liquidDensityKgL,
    manualVaporDensity,
    manualVaporDensityKgM3,
    molecularWeight,
    pressureRangeKpa,
    recoveryEfficiency,
    reidVaporPressureKpa,
    saturationFactor,
    siteElevationM,
    solarAbsorptivity,
    solarIrradianceWM2,
    stage2RefuelingFactor,
    stage2ReturnEfficiency,
    stage2ThroughputShare,
    tankType,
    tempRangeC,
    terminalFuelTempC,
    sunExposedAreaM2,
    tankerFuelMassKg,
    tankerSurfaceAreaM2,
    throughputL,
    ustBreathingReduction,
    useAutoTvp,
    vaporPressureKpa,
    wallHeatTransferCoeff,
    bulkLiquidTempC,
    distillationSlope,
  ]);

  const n = (value: number, digits = 0) => formatNumber(value, digits, locale);
  const effectiveUnit = (key: string) => unitOverrides[key] === 'metric' || unitOverrides[key] === 'imperial' ? unitOverrides[key] as UnitSystem : unitSystem;
  const setUnitOverride = (key: string, value: UnitOverride) => setUnitOverrides(current => ({ ...current, [key]: value }));
  const unitChoices = [
    { value: 'global' as UnitOverride, label: unitSystem === 'metric' ? 'Global: metric' : 'Global: imperial' },
    { value: 'metric' as UnitOverride, label: 'Metric' },
    { value: 'imperial' as UnitOverride, label: 'Imperial' },
  ];
  const displayMass = (kg: number, digits = 0) =>
    unitSystem === 'metric' ? `${n(kg, digits)} kg` : `${n(toLb(kg), digits)} lb`;
  const displayVolume = (liters: number, digits = 0) =>
    unitSystem === 'metric' ? `${n(liters, digits)} L` : `${n(liters / L_PER_GAL, digits)} gal`;
  const displayThroughput = unitSystem === 'metric'
    ? `${n(throughputL, 0)} L/yr`
    : `${n(throughputL / L_PER_GAL, 0)} gal/yr`;
  const displayVaporSpace = (m3: number, digits = 2) =>
    effectiveUnit('vaporSpace') === 'metric' ? `${n(m3, digits)} m3` : `${n(m3 * FT3_PER_M3, 0)} ft3`;
  const displayTankCapacity = (liters: number) =>
    effectiveUnit('tankCapacity') === 'metric' ? `${n(liters, 0)} L` : `${n(liters / L_PER_GAL, 0)} gal`;

  const chartData = [
    { name: c.storageBreathing, value: unitSystem === 'metric' ? values.standingLossKg : toLb(values.standingLossKg), fill: '#10b981' },
    { name: c.generatedVapor, value: unitSystem === 'metric' ? values.workingLossKg : toLb(values.workingLossKg), fill: '#14b8a6' },
    ...(values.stage2ReturnedLossKg > 0
      ? [{ name: 'Stage II returned', value: unitSystem === 'metric' ? values.stage2ReturnedLossKg : toLb(values.stage2ReturnedLossKg), fill: '#38bdf8' }]
      : []),
    { name: c.chartNames.recovered, value: unitSystem === 'metric' ? values.recoveredKg : toLb(values.recoveredKg), fill: '#22d3ee' },
    { name: c.chartNames.uncaptured, value: unitSystem === 'metric' ? values.unrecoveredKg : toLb(values.unrecoveredKg), fill: '#f59e0b' },
  ];

  return (
    <section className="min-h-screen bg-[#000212] pb-16 pt-40 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute inset-x-0 top-36 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1800px] flex-col px-4">
        <div className="mb-3 flex shrink-0 flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="min-w-0"
          >
            <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
              <Wind size={14} />
              {c.badge}
            </span>
            <h1 className="max-w-4xl text-2xl font-black tracking-tight text-white md:text-3xl">
              {c.title}
            </h1>
            <p className="mt-2 hidden max-w-3xl text-sm leading-relaxed text-gray-300 xl:block">
              {c.description}
            </p>
          </motion.div>
        </div>

        <div className="z-30 mb-3 shrink-0 rounded-xl border border-white/10 bg-[#07111d]/96 p-3 backdrop-blur-xl">
          <div className="grid gap-3 xl:grid-cols-[minmax(220px,0.8fr)_minmax(260px,1fr)_minmax(320px,1.1fr)_minmax(180px,0.7fr)] xl:items-center">
            <div className="rounded-lg border border-white/10 bg-[#0b1120] p-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">Units</p>
              <div className="mt-2 grid grid-cols-2 gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
                {(['metric', 'imperial'] as UnitSystem[]).map(system => (
                  <button
                    key={system}
                    type="button"
                    onClick={() => setUnitSystem(system)}
                    className={`h-10 rounded-md px-3 text-sm font-black transition-colors ${
                      unitSystem === system ? 'bg-emerald-400 text-black' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {system === 'metric' ? c.metric : c.imperial}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0b1120] p-3">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                {c.modelBasis}
                <InfoBubble text={c.modelBasisHelp} />
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-white">
                {c.stage1Model} + optional Stage II returned + {c.storageModel}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-gray-400">Ke affects storage breathing only; Stage I follows delivered volume.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0b1120] p-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">{c.tankType}</p>
              <div className="mt-2 grid grid-cols-2 gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
                {(['underground', 'aboveground'] as TankType[]).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTankType(type)}
                    className={`min-h-10 rounded-md px-3 py-2 text-xs font-black transition-colors ${
                      tankType === type ? 'bg-emerald-400 text-black' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {type === 'underground' ? c.underground : c.aboveground}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-100/80">{c.throughputRecovery}</p>
              <p className="mt-2 font-mono text-2xl font-black text-white">{n(values.throughputRecoveryRate, 3)}%</p>
              <p className="mt-1 text-xs leading-relaxed text-emerald-50/75">{displayVolume(values.recoveredLiters)} recovered</p>
            </div>
          </div>
        </div>

        <div className="mb-3 shrink-0 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm leading-relaxed text-emerald-50">
          {c.stage1Note}
        </div>

        <div className="mb-3 grid shrink-0 gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr] xl:hidden">
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-100">{c.throughputRecovery}</p>
              <InfoBubble text={c.throughputRecoveryHelp} />
            </div>
            <p className="mt-3 font-mono text-5xl font-black leading-none text-white">{n(values.throughputRecoveryRate, 3)}%</p>
            <p className="mt-3 text-sm leading-relaxed text-emerald-50/80">{displayVolume(values.recoveredLiters)} {c.recoveredLiquid.toLowerCase()}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0b1120] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">{c.fieldTargetKpi}</p>
            <p className="mt-3 font-mono text-3xl font-black text-white">{n(values.fieldTargetRecoveryRate, 3)}%</p>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">{c.fieldTargetHelp}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0b1120] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">{c.targetImplied}</p>
            <p className="mt-3 font-mono text-3xl font-black text-white">{displayVolume(values.fieldTargetLiters)}</p>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">{displayMass(values.fieldTargetKg)} {c.liquidEquivalent}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0b1120] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">{c.targetGap}</p>
            <p className={`mt-3 font-mono text-3xl font-black ${values.fieldTargetGap >= 0 ? 'text-emerald-300' : 'text-amber-300'}`}>
              {values.fieldTargetGap >= 0 ? '+' : ''}{n(values.fieldTargetGap, 3)}%
            </p>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">{c.combinedTotal}</p>
          </div>
        </div>

        <div className="grid gap-6 xl:h-[calc(100vh-13rem)] xl:min-h-[680px] xl:overflow-hidden xl:grid-cols-[minmax(0,1fr)_minmax(360px,500px)]">
          <div className="min-w-0 space-y-6 rounded-xl border border-white/10 bg-[#07111d]/70 p-3 xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain">
            <CollapsibleSection
              icon={Gauge}
              title={c.standingTitle}
              subtitle={tankType === 'underground' ? c.undergroundNote : c.standingSubtitle}
              tone="emerald"
            >
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-bold text-white">
                        Connected tank group
                        <InfoBubble text="Use one grouped estimate for similar connected tanks. Tank count scales total capacity and headspace; it does not create separate throughput events." />
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-gray-400">
                        Model similar connected tanks as one group.
                      </p>
                      <p className="mt-2 rounded-lg border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs leading-relaxed text-amber-50/85">
                        Tank count changes vapor inventory and breathing only. To change the throughput recovery rate, change annual station throughput or fuel properties; extra ullage mainly gives displaced vapors more volume to balance pressure.
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-right">
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/70">Multiplier</p>
                        <p className="font-mono text-2xl font-black text-white">x{values.activeTankCount}</p>
                      </div>
                      <select
                        value={unitOverrides.tankCapacity ?? 'global'}
                        onChange={event => setUnitOverride('tankCapacity', event.target.value as UnitOverride)}
                        className="h-9 rounded-lg border border-white/10 bg-[#07111d] px-2 text-xs font-bold text-emerald-200 outline-none focus:border-emerald-400/50"
                        aria-label="Tank capacity unit"
                      >
                        {unitChoices.map(choice => (
                          <option key={choice.value} value={choice.value}>{choice.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4 h-4 overflow-hidden rounded-full border border-white/10 bg-[#07111d]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                      style={{ width: `${clamp(values.weightedConnectedFillPercent, 0, 100)}%` }}
                    />
                  </div>
                  <div className="grid gap-3 rounded-lg border border-white/10 bg-[#07111d] p-3 lg:grid-cols-[0.7fr_1fr_0.8fr] lg:items-end">
                    <InputField
                      label="Tank count"
                      value={values.activeTankCount}
                      unit="tanks"
                      step={1}
                      min={1}
                      onChange={value => setTankCount(Math.max(1, Math.round(value)))}
                      info="Number of similar tanks in this grouped storage estimate."
                    />
                    <InputField
                      label="Typical capacity"
                      value={effectiveUnit('tankCapacity') === 'metric' ? typicalTankCapacityL : typicalTankCapacityL / L_PER_GAL}
                      unit={effectiveUnit('tankCapacity') === 'metric' ? 'L each' : 'gal each'}
                      step={effectiveUnit('tankCapacity') === 'metric' ? 1000 : 100}
                      onChange={value => setTypicalTankCapacityL(Math.max(0, effectiveUnit('tankCapacity') === 'metric' ? value : value * L_PER_GAL))}
                      info="Nominal liquid storage capacity for one typical tank in this group."
                    />
                    <InputField
                      label="Average fill"
                      value={averageTankFillPercent}
                      unit="%"
                      step={1}
                      onChange={value => setAverageTankFillPercent(clamp(value, 0, 100))}
                      info="Average liquid inventory across this tank group."
                    />
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <ComputedRow label="Connected capacity" value={displayTankCapacity(values.connectedTankCapacityL)} detail={`${displayTankCapacity(typicalTankCapacityL)} x ${values.activeTankCount}`} />
                    <ComputedRow label="Average fill" value={`${n(values.weightedConnectedFillPercent, 0)}%`} />
	                    <ComputedRow
	                      label="Active vapor space"
	                      value={displayVaporSpace(values.computedVaporSpaceM3)}
	                      detail={`Model uses: ${displayVaporSpace(values.vaporSpaceM3)}`}
	                    />
	                  </div>
	                </div>
                <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
                  <InputField
                    label={`${c.expansion} Ke`}
                    value={expansionFactor}
                    unit="unitless"
                    step={0.0001}
                    onChange={setExpansionFactor}
                    helper="This is the active Ke used by the storage-breathing equation."
                    info={c.info.expansion}
                  />
                  <InputField
                    label={`${c.saturation} Ks`}
                    value={saturationFactor}
                    unit="unitless"
                    step={0.01}
                    min={0}
                    max={1}
                    onChange={value => setSaturationFactor(clamp(value, 0, 1))}
                    helper="Storage Ks is capped at 1. Use the Stage I loading saturation factor S for splash/turbulent loading values above 1."
                    info={c.info.saturation}
                  />
                  <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 p-3 lg:min-w-44">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-amber-200">{c.suggestedKe}</p>
                    <p className="mt-1 font-mono text-2xl font-black leading-none text-white">{n(values.suggestedKe, 4)}</p>
                    <button
                      type="button"
                      onClick={() => setExpansionFactor(values.suggestedKe)}
                      className="mt-3 w-full rounded-lg bg-amber-300 px-3 py-2 text-xs font-black text-black transition-colors hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-100"
                    >
                      {c.useSuggested}
                    </button>
                  </div>
                </div>
                <p className="rounded-lg border border-white/10 bg-white/[0.035] p-3 text-xs leading-relaxed text-gray-300">
                  Saturation factor scales only the storage-breathing line item, currently {n(values.storageBreathingSharePercent, 2)}% of combined vapor loss. Stage I unloading stays unchanged because it is calculated from delivered liquid volume and vapor pressure.
                </p>
                {tankType === 'underground' && (
                  <InputField
                    label={c.ustBreathingReduction}
                    value={ustBreathingReduction}
                    unit="%"
                    step={1}
                    onChange={setUstBreathingReduction}
                    info={c.info.ustBreathingReduction}
                  />
                )}
            </CollapsibleSection>

            <CollapsibleSection
              icon={Activity}
              title={c.stage1Title}
              subtitle={c.stage1Subtitle}
              tone="teal"
            >
                <InputField
                  label={c.throughput}
                  value={effectiveUnit('throughput') === 'metric' ? throughputL : throughputL / L_PER_GAL}
                  unit={effectiveUnit('throughput') === 'metric' ? 'L/yr' : 'gal/yr'}
                  unitOptions={unitChoices}
                  selectedUnit={unitOverrides.throughput ?? 'global'}
                  onUnitChange={value => setUnitOverride('throughput', value)}
                  step={effectiveUnit('throughput') === 'metric' ? 1000 : 100}
                  onChange={value => setThroughputL(effectiveUnit('throughput') === 'metric' ? value : value * L_PER_GAL)}
                  helper={`${c.converted} ${n(values.throughputBbl, 0)} bbl/yr.`}
                  info={c.info.throughput}
                />
                <InputField
                  label={c.loadingSaturation}
                  value={loadingSaturationFactor}
                  unit="S"
                  step={0.01}
                  onChange={setLoadingSaturationFactor}
                  info={c.info.loadingSaturation}
                />
                <InputField
                  label={c.bulkTemp}
                  value={effectiveUnit('bulkTemp') === 'metric' ? bulkLiquidTempC : cToF(bulkLiquidTempC)}
                  unit={effectiveUnit('bulkTemp') === 'metric' ? 'C' : 'F'}
                  unitOptions={unitChoices}
                  selectedUnit={unitOverrides.bulkTemp ?? 'global'}
                  onUnitChange={value => setUnitOverride('bulkTemp', value)}
                  step={0.1}
                  onChange={value => setBulkLiquidTempC(effectiveUnit('bulkTemp') === 'metric' ? value : fToC(value))}
                  helper={`${c.loadingLossFactor}: ${n(values.loadingLossLbPerThousandGal, 3)} lb/1,000 gal.`}
                  info={c.info.bulkTemp}
                />
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-white">{c.tvpHelperTitle}</h3>
                          <p className="mt-1 text-xs leading-relaxed text-emerald-50/70">{c.tvpHelperSubtitle}</p>
                        </div>
                        <Thermometer size={18} className="mt-1 shrink-0 text-emerald-300" />
                      </div>
                      <div className="grid gap-4">
                        <InputField
                          label={c.reidVaporPressure}
                          value={effectiveUnit('pressure') === 'metric' ? reidVaporPressureKpa : values.reidVaporPressurePsia}
                          unit={effectiveUnit('pressure') === 'metric' ? 'kPa' : 'psia'}
                          unitOptions={unitChoices}
                          selectedUnit={unitOverrides.pressure ?? 'global'}
                          onUnitChange={value => setUnitOverride('pressure', value)}
                          step={effectiveUnit('pressure') === 'metric' ? 0.1 : 0.01}
                          onChange={value => setReidVaporPressureKpa(effectiveUnit('pressure') === 'metric' ? value : value * KPA_PER_PSIA)}
                          info={c.info.reidVaporPressure}
                        />
                        <InputField
                          label={c.distillationSlope}
                          value={distillationSlope}
                          unit="S"
                          step={0.1}
                          onChange={setDistillationSlope}
                          info={c.info.distillationSlope}
                        />
                        <div className="rounded-lg border border-white/10 bg-[#07111d] p-3">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">{c.estimatedTvp}</p>
                              <p className="mt-1 font-mono text-2xl font-black text-white">
                                {effectiveUnit('pressure') === 'metric' ? `${n(values.estimatedTvpKpa, 2)} kPa` : `${n(values.estimatedTvpPsia, 3)} psia`}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                if (useAutoTvp) {
                                  setVaporPressureKpa(values.estimatedTvpKpa);
                                  setUseAutoTvp(false);
                                } else {
                                  setUseAutoTvp(true);
                                }
                              }}
                              className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-black text-black transition-colors hover:bg-emerald-300"
                            >
                              {useAutoTvp ? c.manualTvp : c.autoTvp}
                            </button>
                          </div>
                          <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-100/70">{c.effectiveTvp}</p>
                            <p className="mt-1 font-mono text-sm text-white">
                              {effectiveUnit('pressure') === 'metric' ? `${n(values.calculationVaporPressureKpa, 2)} kPa` : `${n(values.vaporPressurePsia, 3)} psia`}
                            </p>
                          </div>
                          {values.calculationVaporPressureKpa >= values.atmosphericPressureKpa && (
                            <p className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-xs leading-relaxed text-amber-100">
                              {c.tvpAboveAtmosphere}
                            </p>
                          )}
                          <p className="mt-3 text-xs leading-relaxed text-emerald-50/65">{c.tvpHelperNote}</p>
                        </div>
                      </div>
                </div>
                <InputField
                  label={c.vaporPressure}
                  value={effectiveUnit('pressure') === 'metric' ? values.calculationVaporPressureKpa : values.vaporPressurePsia}
                  unit={effectiveUnit('pressure') === 'metric' ? 'kPa' : 'psia'}
                  unitOptions={unitChoices}
                  selectedUnit={unitOverrides.pressure ?? 'global'}
                  onUnitChange={value => setUnitOverride('pressure', value)}
                  step={effectiveUnit('pressure') === 'metric' ? 0.1 : 0.01}
                  onChange={value => {
                    setUseAutoTvp(false);
                    setVaporPressureKpa(effectiveUnit('pressure') === 'metric' ? value : value * KPA_PER_PSIA);
                  }}
                  disabled={useAutoTvp}
                  helper={useAutoTvp ? c.tvpHelperSubtitle : undefined}
                  info={c.info.vaporPressure}
                />
                <div className="grid gap-4">
                  <InputField label={c.molecularWeight} value={molecularWeight} unit="Mv" step={0.1} onChange={setMolecularWeight} info={c.info.molecularWeight} />
                </div>
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-white">Vapor density</p>
                      <p className="mt-1 text-xs leading-relaxed text-cyan-50/70">
                        Hydrocarbon vapor mass per gas volume, auto-calculated from TVP, molecular weight, and vapor temperature.
                      </p>
                    </div>
                    <SwitchButton active={manualVaporDensity} onClick={() => setManualVaporDensity(!manualVaporDensity)}>
                      {manualVaporDensity ? 'Manual density' : 'Auto density'}
                    </SwitchButton>
                  </div>
                  <ComputedRow
                    label="Computed vapor density"
                    value={effectiveUnit('vaporDensity') === 'metric' ? `${n(values.vaporDensityAutoKgM3, 3)} kg/m3` : `${n(values.vaporDensityAutoKgM3 * LB_PER_KG / FT3_PER_M3, 4)} lb/ft3`}
                    detail={`Active: ${effectiveUnit('vaporDensity') === 'metric' ? `${n(values.vaporDensityKgM3, 3)} kg/m3` : `${n(values.vaporDensityLbFt3, 4)} lb/ft3`}`}
                  />
                  <div className="mt-3 grid gap-2">
                    <ComputedRow
                      label="Vapor inventory liquid equivalent"
                      value={displayVolume(values.vaporInventoryLiquidLiters, 2)}
                      detail={`${displayVaporSpace(values.vaporSpaceM3)} vapor inventory`}
                    />
                  </div>
                  <p className="mt-3 rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-relaxed text-amber-50/80">
                    This is a hydrocarbon mass-balance view. Mixed gas ratios such as 1:40 include air and process mixing, so they belong in equipment sizing, not this AP-42 recovery KPI.
                  </p>
                  {manualVaporDensity && (
                    <div className="mt-4">
                      <InputField
                        label="Manual vapor density override"
                        value={effectiveUnit('vaporDensity') === 'metric' ? manualVaporDensityKgM3 : manualVaporDensityKgM3 * LB_PER_KG / FT3_PER_M3}
                        unit={effectiveUnit('vaporDensity') === 'metric' ? 'kg/m3' : 'lb/ft3'}
                        unitOptions={unitChoices}
                        selectedUnit={unitOverrides.vaporDensity ?? 'global'}
                        onUnitChange={value => setUnitOverride('vaporDensity', value)}
                        step={effectiveUnit('vaporDensity') === 'metric' ? 0.01 : 0.001}
                        onChange={value => setManualVaporDensityKgM3(effectiveUnit('vaporDensity') === 'metric' ? value : value / LB_PER_KG * FT3_PER_M3)}
                        helper={c.vaporDensityHelp}
                        info={c.info.vaporDensity}
                      />
                    </div>
                  )}
                </div>
            </CollapsibleSection>

            <CollapsibleSection
              icon={Wind}
              title="Stage II returned vapor"
              subtitle="Optional vehicle-refueling vapor returned to the UST for Stage III recovery."
              tone="sky"
              defaultOpen={stage2ThroughputShare > 0}
            >
                <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-relaxed text-amber-50/85">
                  Keep this at 0% unless the site has Stage II vapor return. This simple bucket adds returned vehicle-refueling vapor only; it does not model ORVR excess-air effects, vacuum enrichment, or spillage.
                </div>
                <div className="rounded-lg border border-red-300/20 bg-red-400/10 p-3 text-xs leading-relaxed text-red-50/85">
                  Without Stage III or another UST vapor-control outlet, Stage II can increase station vent losses by moving vehicle refueling vapor or excess air back into the UST vapor space.
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <InputField
                    label="Stage II share of throughput"
                    value={stage2ThroughputShare}
                    unit="%"
                    step={1}
                    onChange={value => setStage2ThroughputShare(clamp(value, 0, 100))}
                    info="Percent of station throughput dispensed through Stage II vapor-return nozzles."
                  />
                  <InputField
                    label="Returned to UST"
                    value={stage2ReturnEfficiency}
                    unit="%"
                    step={1}
                    onChange={value => setStage2ReturnEfficiency(clamp(value, 0, 100))}
                    info="Fraction of the vehicle-refueling vapor factor routed back into the UST vapor system."
                  />
                  <InputField
                    label="Refueling vapor factor"
                    value={stage2RefuelingFactor}
                    unit="lb/1k gal"
                    step={0.1}
                    onChange={value => setStage2RefuelingFactor(Math.max(0, value))}
                    info="EPA AP-42 average uncontrolled vehicle refueling displacement factor is 11 lb/1,000 gal."
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <ComputedRow
                    label="Stage II returned vapor"
                    value={displayMass(values.stage2ReturnedLossKg)}
                    detail={`${n(values.stage2ReturnedLossLbPerThousandGal, 3)} lb/1,000 gal effective`}
                  />
                  <ComputedRow
                    label="Model basis"
                    value="Optional"
                    detail="Adds to Stage III recoverable load only when Stage II share is above 0%; without Stage III this returned vapor can become extra UST vent loss."
                  />
                </div>
            </CollapsibleSection>

            <CollapsibleSection
              icon={Thermometer}
              title={c.temperatureTitle}
              subtitle={c.temperatureSubtitle}
              tone="amber"
	              defaultOpen={false}
		            >
	              <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-4">
	                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
	                  <div>
	                    <p className="text-sm font-bold text-white">Tanker fuel temperature estimate</p>
	                    <p className="mt-1 text-xs leading-relaxed text-amber-50/75">
	                      Converts ambient/solar exposure into bulk fuel temperature using tanker thermal inertia.
	                    </p>
	                  </div>
	                  <SwitchButton active={showFuelTemperatureDetails} onClick={() => setShowFuelTemperatureDetails(!showFuelTemperatureDetails)}>
	                    {showFuelTemperatureDetails ? 'Hide assumptions' : 'Assumptions'}
	                  </SwitchButton>
	                </div>
	                <div className="grid gap-4 sm:grid-cols-2">
	                  <InputField
	                    label="Ambient temperature"
	                    value={effectiveUnit('temp') === 'metric' ? ambientTempC : cToF(ambientTempC)}
	                    unit={effectiveUnit('temp') === 'metric' ? 'C' : 'F'}
	                    unitOptions={unitChoices}
	                    selectedUnit={unitOverrides.temp ?? 'global'}
	                    onUnitChange={value => setUnitOverride('temp', value)}
	                    step={0.1}
	                    onChange={value => setAmbientTempC(effectiveUnit('temp') === 'metric' ? value : fToC(value))}
	                    info="Ambient air temperature around the tanker during transport."
	                  />
	                  <InputField
	                    label="Terminal fuel temperature"
	                    value={effectiveUnit('temp') === 'metric' ? terminalFuelTempC : cToF(terminalFuelTempC)}
	                    unit={effectiveUnit('temp') === 'metric' ? 'C' : 'F'}
	                    unitOptions={unitChoices}
	                    selectedUnit={unitOverrides.temp ?? 'global'}
	                    onUnitChange={value => setUnitOverride('temp', value)}
	                    step={0.1}
	                    onChange={value => setTerminalFuelTempC(effectiveUnit('temp') === 'metric' ? value : fToC(value))}
	                    info="Fuel temperature when loaded at the terminal."
	                  />
	                </div>
	                {showFuelTemperatureDetails && (
	                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
	                    <InputField
	                      label="Solar absorptivity"
	                      value={solarAbsorptivity}
	                      unit="alpha"
	                      step={0.05}
	                      min={0}
	                      max={1}
	                      onChange={value => setSolarAbsorptivity(clamp(value, 0, 1))}
	                      info="Dimensionless tanker shell absorptivity. Darker or dirtier aluminum absorbs more solar heat."
	                    />
	                    <InputField
	                      label="Solar irradiance"
	                      value={solarIrradianceWM2}
	                      unit="W/m2"
	                      step={50}
	                      onChange={setSolarIrradianceWM2}
	                      info="Solar power incident on the tanker surface."
	                    />
	                    <InputField
	                      label="Sun-exposed top area"
	                      value={sunExposedAreaM2}
	                      unit="m2"
	                      step={1}
	                      onChange={setSunExposedAreaM2}
	                      info="Projected tanker surface area exposed directly to sunlight."
	                    />
	                    <InputField
	                      label="Total shell area"
	                      value={tankerSurfaceAreaM2}
	                      unit="m2"
	                      step={1}
	                      onChange={setTankerSurfaceAreaM2}
	                      info="Total heat-transfer area of the tanker shell."
	                    />
	                    <InputField
	                      label="Wall heat-transfer coefficient"
	                      value={wallHeatTransferCoeff}
	                      unit="W/m2 C"
	                      step={1}
	                      onChange={setWallHeatTransferCoeff}
	                      info="Overall heat-transfer coefficient through tanker wall and boundary layer."
	                    />
	                    <InputField
	                      label="Highway drive time"
	                      value={driveHours}
	                      unit="hr"
	                      step={0.25}
	                      onChange={setDriveHours}
	                      info="Time available for tanker skin heat transfer into the bulk fuel."
	                    />
	                    <InputField
	                      label="Fuel mass"
	                      value={tankerFuelMassKg}
	                      unit="kg"
	                      step={500}
	                      onChange={setTankerFuelMassKg}
	                      info="Default approximates an 8,500 gal gasoline tanker load."
	                    />
	                    <InputField
	                      label="Gasoline heat capacity"
	                      value={gasolineHeatCapacityJKgC}
	                      unit="J/kg C"
	                      step={10}
	                      onChange={setGasolineHeatCapacityJKgC}
	                      info="Specific heat capacity of gasoline. Default is 2,220 J/kg C."
	                    />
	                    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3 sm:col-span-2">
	                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-100/75">Ke detail inputs</p>
	                      <p className="mt-1 text-xs leading-relaxed text-amber-50/70">
	                        These only affect the suggested storage-breathing Ke. They do not change the model until you apply suggested Ke, and even then they move only storage breathing.
	                      </p>
	                      <div className="mt-3 grid gap-4 sm:grid-cols-2">
	                        <InputField
	                          label={c.tempRange}
	                          value={effectiveUnit('temp') === 'metric' ? tempRangeC : tempRangeC * 1.8}
	                          unit={effectiveUnit('temp') === 'metric' ? 'C' : 'F'}
	                          unitOptions={unitChoices}
	                          selectedUnit={unitOverrides.temp ?? 'global'}
	                          onUnitChange={value => setUnitOverride('temp', value)}
	                          step={0.1}
	                          min={0}
	                          max={effectiveUnit('temp') === 'metric' ? MAX_DAILY_VAPOR_TEMP_RANGE_C : MAX_DAILY_VAPOR_TEMP_RANGE_C * 1.8}
	                          onChange={value => setTempRangeC(clamp(effectiveUnit('temp') === 'metric' ? value : value / 1.8, 0, MAX_DAILY_VAPOR_TEMP_RANGE_C))}
	                          info={c.info.tempRange}
	                        />
	                        <InputField
	                          label={c.avgTemp}
	                          value={effectiveUnit('temp') === 'metric' ? avgLiquidTempC : cToF(avgLiquidTempC)}
	                          unit={effectiveUnit('temp') === 'metric' ? 'C' : 'F'}
	                          unitOptions={unitChoices}
	                          selectedUnit={unitOverrides.temp ?? 'global'}
	                          onUnitChange={value => setUnitOverride('temp', value)}
	                          step={0.1}
	                          onChange={value => setAvgLiquidTempC(effectiveUnit('temp') === 'metric' ? value : fToC(value))}
	                          info={c.info.avgTemp}
	                        />
	                        <InputField
	                          label={c.pressureRange}
	                          value={effectiveUnit('pressure') === 'metric' ? pressureRangeKpa : pressureRangeKpa * PSIA_PER_KPA}
	                          unit={effectiveUnit('pressure') === 'metric' ? 'kPa' : 'psia'}
	                          unitOptions={unitChoices}
	                          selectedUnit={unitOverrides.pressure ?? 'global'}
	                          onUnitChange={value => setUnitOverride('pressure', value)}
	                          step={0.01}
	                          onChange={value => setPressureRangeKpa(effectiveUnit('pressure') === 'metric' ? value : value * KPA_PER_PSIA)}
	                          info={c.info.pressureRange}
	                        />
	                        <InputField
	                          label={c.siteElevation}
	                          value={effectiveUnit('elevation') === 'metric' ? siteElevationM : siteElevationM * 3.280839895}
	                          unit={effectiveUnit('elevation') === 'metric' ? 'm' : 'ft'}
	                          unitOptions={unitChoices}
	                          selectedUnit={unitOverrides.elevation ?? 'global'}
	                          onUnitChange={value => setUnitOverride('elevation', value)}
	                          step={effectiveUnit('elevation') === 'metric' ? 10 : 50}
	                          min={effectiveUnit('elevation') === 'metric' ? -500 : -1640}
	                          max={effectiveUnit('elevation') === 'metric' ? 9000 : 29500}
	                          onChange={value => setSiteElevationM(clamp(effectiveUnit('elevation') === 'metric' ? value : value / 3.280839895, -500, 9000))}
	                          info={c.info.siteElevation}
	                        />
	                        <InputField
	                          label={c.ventRange}
	                          value={effectiveUnit('pressure') === 'metric' ? breatherVentRangeKpa : breatherVentRangeKpa * PSIA_PER_KPA}
	                          unit={effectiveUnit('pressure') === 'metric' ? 'kPa' : 'psia'}
	                          unitOptions={unitChoices}
	                          selectedUnit={unitOverrides.pressure ?? 'global'}
	                          onUnitChange={value => setUnitOverride('pressure', value)}
	                          step={0.01}
	                          onChange={value => setBreatherVentRangeKpa(effectiveUnit('pressure') === 'metric' ? value : value * KPA_PER_PSIA)}
	                          info={c.info.ventRange}
	                        />
	                      </div>
	                    </div>
	                  </div>
	                )}
	                <div className="mt-4 rounded-lg border border-white/10 bg-[#07111d]/70 p-3">
	                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
	                    <div>
	                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-amber-100/70">Estimated delivered fuel temperature</p>
	                      <p className="mt-1 font-mono text-2xl font-black text-white">
	                        {effectiveUnit('temp') === 'metric' ? `${n(values.estimatedDeliveredFuelTempC, 1)} C` : `${n(cToF(values.estimatedDeliveredFuelTempC), 1)} F`}
	                      </p>
	                      <p className="mt-1 text-xs leading-relaxed text-amber-50/70">
	                        Sol-air {effectiveUnit('temp') === 'metric' ? `${n(values.solAirTempC, 1)} C` : `${n(cToF(values.solAirTempC), 1)} F`}; thermal mass {n(values.fuelThermalMassJC / 1_000_000, 1)} MJ/C.
	                      </p>
	                    </div>
	                    <button
	                      type="button"
	                      onClick={() => {
	                        setAvgLiquidTempC(values.estimatedDeliveredFuelTempC);
	                        setBulkLiquidTempC(values.estimatedDeliveredFuelTempC);
	                      }}
	                      className="shrink-0 rounded-lg bg-amber-300 px-4 py-2 text-xs font-black text-black transition-colors hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-100"
	                    >
	                      Use fuel temp
	                    </button>
	                  </div>
	                </div>
		              </div>
	              <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3">
	                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
	                  <p className="text-xs leading-relaxed text-amber-50/85">
	                    Suggested Ke = daily temperature swing / absolute temperature + net vapor-pressure swing / available pressure head. Current suggestion: <span className="font-mono font-black text-white">{n(values.suggestedKe, 4)}</span>.
	                  </p>
	                  <button
	                    type="button"
	                    onClick={() => setExpansionFactor(values.suggestedKe)}
	                    className="shrink-0 rounded-lg bg-amber-300 px-4 py-2 text-xs font-black text-black transition-colors hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-100"
	                  >
	                    {c.useSuggested}
	                  </button>
	                </div>
                <p className="mt-3 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs leading-relaxed text-amber-50/80">
                  {c.atmPressure}: <span className="font-mono font-black text-white">{effectiveUnit('pressure') === 'metric' ? `${n(values.atmosphericPressureKpa, 1)} kPa` : `${n(values.atmosphericPressureKpa * PSIA_PER_KPA, 2)} psia`}</span>, computed from site elevation.
                </p>
	              </div>
            </CollapsibleSection>

            <CollapsibleSection
              icon={Percent}
              title={c.recoveryTitle}
              subtitle={c.recoverySubtitle}
              tone="cyan"
            >
                <InputField label={c.efficiency} value={recoveryEfficiency} unit="%" step={0.1} onChange={setRecoveryEfficiency} info={c.info.efficiency} />
                <InputField
                  label={c.fieldTarget}
                  value={fieldTargetRecoveryRate}
                  unit="%"
                  step={0.01}
                  onChange={setFieldTargetRecoveryRate}
                  helper={c.fieldTargetHelp}
                />
                <InputField
                  label={c.liquidDensity}
                  value={effectiveUnit('liquidDensity') === 'metric' ? liquidDensityKgL : liquidDensityKgL * L_PER_GAL * LB_PER_KG}
                  unit={effectiveUnit('liquidDensity') === 'metric' ? 'kg/L' : 'lb/gal'}
                  unitOptions={unitChoices}
                  selectedUnit={unitOverrides.liquidDensity ?? 'global'}
                  onUnitChange={value => setUnitOverride('liquidDensity', value)}
                  step={effectiveUnit('liquidDensity') === 'metric' ? 0.01 : 0.1}
                  onChange={value => setLiquidDensityKgL(effectiveUnit('liquidDensity') === 'metric' ? value : value / (L_PER_GAL * LB_PER_KG))}
                  info={c.info.liquidDensity}
                />
            </CollapsibleSection>
          </div>

          <div className="min-w-0 space-y-4 rounded-xl border border-white/10 bg-[#07111d]/70 p-3 xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain">
            <div className="rounded-xl border border-white/10 bg-[#07111d]/95 p-4 backdrop-blur">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-100">{c.recoveryOutput}</p>
                  <h2 className="mt-1 text-lg font-black text-white">Live results</h2>
                </div>
                <InfoBubble text="This panel stays focused on the client-facing throughput KPI, then shows the mass balance and the few model drivers that explain it." />
              </div>
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-100">{c.throughputRecovery}</p>
                  <InfoBubble text={c.throughputRecoveryHelp} />
                </div>
                <p className="mt-3 font-mono text-5xl font-black leading-none text-white">{n(values.throughputRecoveryRate, 3)}%</p>
                <p className="mt-3 text-sm leading-relaxed text-emerald-50/80">{displayVolume(values.recoveredLiters)} {c.recoveredLiquid.toLowerCase()}</p>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <ComputedRow label={c.fieldTargetKpi} value={`${n(values.fieldTargetRecoveryRate, 3)}%`} detail={`${displayVolume(values.fieldTargetLiters)} target implied`} />
                <ComputedRow label={c.targetGap} value={`${values.fieldTargetGap >= 0 ? '+' : ''}${n(values.fieldTargetGap, 3)}%`} detail={values.fieldTargetGap >= 0 ? 'Model is above target.' : 'Model is below target.'} />
              </div>
              <div className="mt-4 grid gap-2">
                <ComputedRow label={c.combinedTotal} value={displayMass(values.totalLossKg)} detail={`Stage I + Stage II returned + storage breathing. ${n(values.totalLossPercent, 3)}% of throughput.`} />
                <ComputedRow label={c.recoveredMass} value={displayMass(values.recoveredKg)} detail={`${displayVolume(values.dailyRecoveredLiters, 1)} ${c.recoveredPerDay}`} />
                <ComputedRow label={c.uncaptured} value={displayMass(values.unrecoveredKg)} />
              </div>
              <div className="mt-4 grid gap-2">
                <ComputedRow label="Stage I vapor" value={displayMass(values.workingLossKg)} detail={`${n(values.loadingLossLbPerThousandGal, 3)} lb/1,000 gal`} />
                <ComputedRow label={c.storageBreathing} value={displayMass(values.standingLossKg)} detail={`Ke ${n(expansionFactor, 4)}; ullage ${displayVaporSpace(values.vaporSpaceM3)}`} />
                {stage2ThroughputShare > 0 && (
                  <ComputedRow label="Stage II returned" value={displayMass(values.stage2ReturnedLossKg)} detail={`${n(values.stage2ReturnedLossLbPerThousandGal, 3)} lb/1,000 gal effective`} />
                )}
              </div>
              {stage2ThroughputShare > 0 && (
                <p className="mt-3 rounded-lg border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-relaxed text-amber-50/85">
                  Stage II returned vapor is only beneficial here because the model assumes Stage III recovery; without Stage III it can raise UST vent emissions.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0b1120] p-5">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="flex items-center gap-2 font-bold text-white">
                      <Calculator size={18} className="text-emerald-300" />
                      {c.profileTitle}
                    </h2>
                    <p className="mt-1 text-xs text-gray-400">
                      {c.chartUnit}: {unitSystem === 'metric' ? 'kg/yr' : 'lb/yr'}.
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-right">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">{c.throughputLabel}</p>
                    <p className="font-mono text-sm text-white">{displayThroughput}</p>
                  </div>
                </div>
                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={value => n(Number(value) / 1000, 0) + 'k'} tickLine={false} axisLine={false} />
                      <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px' }}
                        formatter={(value: number) => [n(value, 0), unitSystem === 'metric' ? 'kg/yr' : 'lb/yr']}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {chartData.map(item => (
                          <Cell key={item.name} fill={item.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
                        <FormulaCard
                          title={c.stage1Model}
                          formula={
                            unitSystem === 'metric' ? (
                              <MathDisplay>
                                <mrow>
                                  <msub><mi>m</mi><mi>Stage I</mi></msub>
                                  <mo>=</mo>
                                  <mn>1.203</mn><mo>&#215;</mo><msup><mn>10</mn><mn>-4</mn></msup>
                                  <mo>&#x2062;</mo><mi>S</mi><mo>&#x2062;</mo><mi>P</mi><mo>&#x2062;</mo><mi>M</mi><mo>&#x2062;</mo>
                                  <mfrac><mi>Q</mi><mi>T</mi></mfrac>
                                </mrow>
                              </MathDisplay>
                            ) : (
                              <MathDisplay>
                                <mrow>
                                  <msub><mi>L</mi><mi>L</mi></msub>
                                  <mo>=</mo>
                                  <mfrac>
                                    <mrow><mn>12.46</mn><mo>&#x2062;</mo><mi>S</mi><mo>&#x2062;</mo><mi>P</mi><mo>&#x2062;</mo><mi>M</mi></mrow>
                                    <mi>T</mi>
                                  </mfrac>
                                </mrow>
                              </MathDisplay>
                            )
                          }
                        >
                          {c.formulas.stage1}
                        </FormulaCard>
                        <FormulaCard
                          title={c.storageBreathing}
                          formula={
                            <MathDisplay>
                              <mrow>
                                <msub><mi>{unitSystem === 'metric' ? 'm' : 'L'}</mi><mi>S</mi></msub>
                                <mo>=</mo>
                                <mn>365</mn><mo>&#x2062;</mo>
                                <msub><mi>V</mi><mi>V</mi></msub><mo>&#x2062;</mo>
                                <msub><mi>W</mi><mi>V</mi></msub><mo>&#x2062;</mo>
                                <msub><mi>K</mi><mi>E</mi></msub><mo>&#x2062;</mo>
                                <msub><mi>K</mi><mi>S</mi></msub><mo>&#x2062;</mo>
                                <mo>(</mo><mn>1</mn><mo>-</mo><msub><mi>R</mi><mi>UST</mi></msub><mo>)</mo>
                              </mrow>
                            </MathDisplay>
                          }
                        >
                          {c.formulas.standing}
                        </FormulaCard>
                        <FormulaCard
                          title={c.combinedTotal}
                          formula={
                            <MathDisplay>
                              <mrow>
                                <msub><mi>L</mi><mi>Total</mi></msub>
                                <mo>=</mo>
                                <msub><mi>L</mi><mi>Stage I</mi></msub>
                                <mo>+</mo>
                                <msub><mi>L</mi><mi>Stage II</mi></msub>
                                <mo>+</mo>
                                <msub><mi>L</mi><mi>Storage</mi></msub>
                              </mrow>
                            </MathDisplay>
                          }
                        >
                          Combined planning view adds Stage I unloading, optional Stage II returned vapor, and storage breathing.
                        </FormulaCard>
                        <FormulaCard
                          title={c.throughputRecovery}
                          formula={
                            <MathDisplay>
                              <mrow>
                                <mi>Recovery</mi>
                                <mo>=</mo>
                                <mfrac>
                                  <mrow><mi>Recovered</mi><mo>&#x2062;</mo><mi>liquid</mi></mrow>
                                  <mi>Throughput</mi>
                                </mfrac>
                              </mrow>
                            </MathDisplay>
                          }
                        >
                          {c.formulas.recovery}
                        </FormulaCard>
                      </div>
          
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                        <h2 className="flex items-center gap-2 font-bold text-white">
                          <FlaskConical size={18} className="text-emerald-300" />
                          {c.defaultTitle}
                        </h2>
                        <div className="mt-4 grid gap-3 text-sm leading-relaxed text-gray-300 md:grid-cols-3">
                          <p>{c.defaultBody}</p>
                          <p>{c.temperatureBody}</p>
                          <p>{c.wisdomBody}</p>
                          <p className="md:col-span-3">{c.notPermitting}</p>
                        </div>
                        <div className="mt-5 grid gap-3 text-xs leading-relaxed text-gray-400 md:grid-cols-4">
                          <a className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-gray-300 transition-colors hover:border-emerald-400/40 hover:text-white" href="https://www.epa.gov/sites/default/files/2020-09/documents/5.2_transportation_and_marketing_of_petroleum_liquids.pdf" target="_blank" rel="noopener noreferrer">
                            <strong className="block text-emerald-300">{c.sourcesTitle}: AP-42 5.2</strong>
                            {c.sourceAp42}
                          </a>
                          <a className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-gray-300 transition-colors hover:border-emerald-400/40 hover:text-white" href="https://www.epa.gov/air-emissions-factors-and-quantification/ap-42-fifth-edition-volume-i-chapter-7-liquid-storage-0" target="_blank" rel="noopener noreferrer">
                            <strong className="block text-emerald-300">{c.sourcesTitle}: AP-42 7.1</strong>
                            {c.sourceStorage} {c.sourceUnderground}
                          </a>
                          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-gray-300">
                            <strong className="block text-emerald-300">{c.sourcesTitle}: PDF</strong>
                            {c.sourcePdf}
                          </div>
                          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-gray-300">
                            <strong className="block text-emerald-300">{c.sourcesTitle}: China</strong>
                            {c.chinaNote}
                          </div>
                        </div>
                      </div>
        </div>
      </div>
      <div className="fixed inset-x-3 bottom-3 z-40 rounded-xl border border-emerald-400/30 bg-[#07111d]/95 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.42)] backdrop-blur xl:hidden">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/70">{c.throughputRecovery}</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{n(values.throughputRecoveryRate, 3)}%</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/70">{c.recoveredLiquid}</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{displayVolume(values.recoveredLiters)}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/70">{c.targetGap}</p>
            <p className={`mt-1 font-mono text-lg font-black ${values.fieldTargetGap >= 0 ? 'text-emerald-300' : 'text-amber-300'}`}>
              {values.fieldTargetGap >= 0 ? '+' : ''}{n(values.fieldTargetGap, 3)}%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EpaCalculatorPage;
