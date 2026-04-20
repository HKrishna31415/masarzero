
import React, { useState, useMemo } from 'react';
import { useTranslation } from '../context/TranslationContext';
import Globe from '../components/Globe';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from '../components/ProjectModal';
import { Project } from '../types/appTypes';
import { Building, Globe as GlobeIcon, Activity, Wind, Zap, Search, MapPin, Signal, Radio, ChevronRight } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import VectorBorderCard from '../components/VectorBorderCard';

const projects: Project[] = [
  { 
    name: 'Brazil Test Unit',
    location: 'Santos, Brazil',
    countryCode: 'BR',
    coordinates: [-23.9608, -46.3331],
    operator: 'MasarZero',
    vru_model: 'GEVLR-2',
    status: 'Online',
    annual_revenue: '$3.5M',
    co2_reduction: '9,800 tons/year',
    image: '/otherinstalls/brazilinstall.png',
    images: ['/otherinstalls/brazilinstall.png']
  },
  { 
    name: 'North American Hub',
    location: 'Silicon Valley, USA',
    countryCode: 'US',
    coordinates: [37.7749, -122.4194],
    operator: 'SASCO US',
    vru_model: 'MZ-9000 Pro',
    status: 'Online',
    annual_revenue: '$4.2M',
    co2_reduction: '12,500 tons/year',
    image: '/appscreenshots/dashboardss.png',
    images: []
  },
  { 
    name: 'Station Install',
    location: 'Muscat, Oman',
    countryCode: 'OM',
    coordinates: [23.5859, 58.4059],
    operator: 'MasarZero',
    vru_model: 'GEVLR-3',
    status: 'Online',
    annual_revenue: '$5.8M',
    co2_reduction: '15,200 tons/year',
    image: '/otherinstalls/omaninstall.png',
    images: ['/otherinstalls/omaninstall.png']
  },
  { 
    name: 'Saudi Station Portfolio',
    location: 'Riyadh, Saudi Arabia',
    countryCode: 'SA',
    coordinates: [24.7136, 46.6753],
    operator: 'MasarZero',
    vru_model: 'GEVLR-3',
    status: 'Online',
    annual_revenue: '$8.2M',
    co2_reduction: '28,000 tons/year',
    image: '/saudiinstalls/abhainstall.jpeg',
    images: ['/saudiinstalls/abhainstall.jpeg']
  },
  { 
    name: 'Bahrain Test Unit',
    location: 'Manama, Bahrain',
    countryCode: 'BH',
    coordinates: [26.0667, 50.5577],
    operator: 'MasarZero',
    vru_model: 'GEVLR-3',
    status: 'Online',
    annual_revenue: '$7.1M',
    co2_reduction: '25,000 tons/year',
    image: '/otherinstalls/bahraininstall.jpeg',
    images: ['/otherinstalls/bahraininstall.jpeg']
  },
  { 
    name: 'Jordan Retail Station',
    location: 'Amman, Jordan',
    countryCode: 'JO',
    coordinates: [31.9454, 35.9284],
    operator: 'MasarZero',
    vru_model: 'GEVLR-3',
    status: 'Online',
    annual_revenue: '$2.9M',
    co2_reduction: '7,500 tons/year',
    image: '/otherinstalls/jordaninstall.jpeg',
    images: ['/otherinstalls/jordaninstall.jpeg']
  },
  { 
    name: 'Tunisia Retail Station',
    location: 'Tunis, Tunisia',
    countryCode: 'TN',
    coordinates: [36.8065, 10.1815],
    operator: 'MasarZero',
    vru_model: 'GEVLR-2',
    status: 'Online',
    annual_revenue: '$3.1M',
    co2_reduction: '8,200 tons/year',
    image: '/otherinstalls/tunisiainstall.jpg',
    images: ['/otherinstalls/tunisiainstall.jpg']
  },
  { 
    name: 'Sri Lanka Retail Station',
    location: 'Colombo, Sri Lanka',
    countryCode: 'LK',
    coordinates: [6.9271, 79.8612],
    operator: 'MasarZero',
    vru_model: 'GEVLR-2',
    status: 'Online',
    annual_revenue: '$4.5M',
    co2_reduction: '11,800 tons/year',
    image: '/otherinstalls/srilankainstall2.jpg',
    images: ['/otherinstalls/srilankainstall2.jpg']
  },
  { 
    name: 'Thailand Retail Station',
    location: 'Bangkok, Thailand',
    countryCode: 'TH',
    coordinates: [13.7563, 100.5018],
    operator: 'MasarZero',
    vru_model: 'GEVLR-2',
    status: 'Online',
    annual_revenue: '$3.4M',
    co2_reduction: '9,200 tons/year',
    image: '/otherinstalls/thailandinstall.png',
    images: ['/otherinstalls/thailandinstall.png']
  },
  { 
    name: 'Cambodia Retail Station',
    location: 'Phnom Penh, Cambodia',
    countryCode: 'KH',
    coordinates: [11.5449, 104.8922],
    operator: 'MasarZero',
    vru_model: 'GEVLR-2',
    status: 'Online',
    annual_revenue: '$2.5M',
    co2_reduction: '6,200 tons/year',
    image: '/otherinstalls/cambodiainstall.jpg',
    images: ['/otherinstalls/cambodiainstall.jpg']
  },
  { 
    name: 'Korea Retail Program',
    location: 'Multiple Sites, South Korea',
    countryCode: 'KR',
    coordinates: [35.1796, 129.0756],
    operator: 'S-Oil',
    vru_model: 'MZ-1 Portfolio',
    status: 'Online',
    annual_revenue: '$6.2M',
    co2_reduction: '18,500 tons/year',
    image: '/koreainstalls/twomachineskorea.jpeg',
    images: [
      '/koreainstalls/twomachineskorea.jpeg',
      '/koreainstalls/ansansupermanstation.png',
      '/koreainstalls/baekjaestatoinjeonju.png',
      '/koreainstalls/batmanstationsuwon.png',
      '/koreainstalls/cloverstationincheon.png',
      '/koreainstalls/ironmanstationyongin.png',
      '/koreainstalls/newtownanseong.png',
      '/koreainstalls/supermananyongin.png',
      '/koreainstalls/sinsunganseong.png',
      '/koreainstalls/yonginsoilgyeonggi.png',
      '/koreainstalls/myeongpum.png'
    ],
    installations: [
      {id: 1, kr_name: '아리랑주유소', en_name: 'Arirang', address: '582 1-sunhwan-ro, Heungdeok-gu, Cheongju', date: 'Feb 17, 2023'},
      {id: 2, kr_name: '뉴타운주유소', en_name: 'New Town', address: '862 Anseongmachum-daero, Anseong-si', date: 'Mar 01, 2023'},
      {id: 3, kr_name: '신성주유소', en_name: 'Sinsung', address: '511 Jungang-ro, Anseong-si', date: 'Mar 01, 2023'},
      {id: 4, kr_name: '거봉주유소', en_name: 'Geobong', address: '1546 Seodong-daero, Anseong-si', date: 'Mar 02, 2023'},
      {id: 5, kr_name: '진사주유소', en_name: 'Jinsa', address: '536 Seodong-daero, Gongdo-eup, Anseong', date: 'Mar 02, 2023'},
      {id: 6, kr_name: '공도주유소', en_name: 'Gongdo', address: '438 Seodong-daero, Gongdo-eup, Anseong', date: 'Mar 03, 2023'},
      {id: 7, kr_name: '안성주유소', en_name: 'Anseong', address: '400 Seodong-daero, Gongdo-eup, Anseong', date: 'Mar 03, 2023'},
      {id: 8, kr_name: '대왕주유소', en_name: 'Daewang', address: '609 Sujeong-ro, Sujeong-gu, Seongnam-si', date: 'Mar 16, 2023'},
      {id: 9, kr_name: '명품주유소', en_name: 'Myeongpum', address: '653 Guseong-ro, Sujeong-gu, Seongnam-si', date: 'Mar 16, 2023'},
      {id: 10, kr_name: '동천주유소', en_name: 'Dongcheon', address: '506 Suji-ro, Suji-gu, Yongin-si', date: 'Mar 20, 2023'},
      {id: 11, kr_name: '슈퍼맨주유소', en_name: 'Superman', address: '20 Mandeok-ro, Giheung-gu, Yongin-si', date: 'Mar 20, 2023', lat: 37.0, lng: 118.3 },
      {id: 12, kr_name: '배트맨주유소', en_name: 'Batman', address: '120 Gwonseon-ro, Gwonseon-gu, Suwon-si', date: 'Mar 25, 2023', lat: 34.5, lng: 117.2 },
      {id: 13, kr_name: '아이언맨주유소', en_name: 'Iron Man', address: '88 Jungbu-daero, Yongin-si', date: 'Mar 27, 2023', lat: 36.9, lng: 117.8 },
      {id: 14, kr_name: '백제주유소', en_name: 'Baekjae', address: '450 Baekje-daero, Jeonju-si', date: 'Apr 02, 2023', lat: 36.3, lng: 116.5 },
      {id: 15, kr_name: '클로버주유소', en_name: 'Clover', address: '12 Inju-daero, Michuhol-gu, Incheon', date: 'Apr 05, 2023'}
    ]
  },
  { 
    name: 'KSM-1000 Portfolio',
    location: 'Multiple Sites, China',
    countryCode: 'CN',
    coordinates: [36.0, 104.0],
    operator: 'KSM Industrial',
    vru_model: 'KSM-1000 Series',
    status: 'Online',
    annual_revenue: '$12.4M',
    co2_reduction: '42,000 tons/year',
    image: '/chinainstalls/ksm installs/ksm1.png',
    images: [
      '/chinainstalls/ksm installs/ksm1.png',
      '/chinainstalls/ksm installs/ksm2.png',
      '/chinainstalls/ksm installs/ksm3.png',
      '/chinainstalls/ksm installs/ksm4.png',
      '/chinainstalls/ksm installs/ksm5.png',
      '/chinainstalls/ksm installs/ksm6.png',
    ],
    installations: [
      { id: 1,  kr_name: '山东航瀚石油',      en_name: 'Shandong Hanghan Petroleum',       address: 'Shandong, China',          date: 'Condensation + Adsorption — 500 m³/h — 200#',                                          lat: 36.6, lng: 117.0 },
      { id: 2,  kr_name: '辽宁泛海科技',      en_name: 'Liaoning Fanhai Technology',       address: 'Liaoning, China',          date: 'Condensation (−110°C) + Adsorption — 200 m³/h — Chemical',                            lat: 41.8, lng: 123.4 },
      { id: 3,  kr_name: '江苏千红石化',      en_name: 'Jiangsu Qianhong Petrochemical',   address: 'Jiangsu, China',           date: 'Condensation — 400 m³/h — Aromatics',                                                  lat: 32.1, lng: 119.5 },
      { id: 4,  kr_name: '内蒙榕鑫科技',      en_name: 'Inner Mongolia Rongxin Tech',      address: 'Inner Mongolia, China',    date: 'Condensation + Adsorption — 800 m³/h — Aromatics',                                     lat: 40.8, lng: 111.7 },
      { id: 5,  kr_name: '山东中浩建能源',    en_name: 'Shandong Zhonghaojian Energy',     address: 'Shandong, China',          date: 'Condensation + Adsorption + RTO — 2000 m³/h — Gasoline/Diesel',                        lat: 36.4, lng: 116.8 },
      { id: 6,  kr_name: '山东利源环境',      en_name: 'Shandong Liyuan Environment',      address: 'Shandong, China',          date: '4-Stage Condensation + Adsorption — 150 m³/h — Aromatics',                             lat: 36.7, lng: 117.5 },
      { id: 7,  kr_name: '山东聊城国家能源',  en_name: 'Shandong Liaocheng National Energy', address: 'Liaocheng, Shandong',    date: 'Condensation + Adsorption — 200 m³/h — Diesel',                                        lat: 36.5, lng: 115.9 },
      { id: 8,  kr_name: '湖南怀化机场',      en_name: 'Hunan Huaihua Airport',            address: 'Huaihua, Hunan',           date: 'Condensation + Adsorption — 100 m³/h — Jet Fuel',                                      lat: 27.6, lng: 110.0 },
      { id: 9,  kr_name: '海南石华',          en_name: 'Hainan Shihua',                    address: 'Hainan, China',            date: '4-Stage Condensation + Adsorption — 300 m³/h — Aromatics',                             lat: 20.0, lng: 110.3 },
      { id: 10, kr_name: '东方宏业',          en_name: 'Dongfang Hongye',                  address: 'China',                    date: 'Condensation — 1200 m³/h',                                                             lat: 35.0, lng: 118.0 },
      { id: 11, kr_name: '山东鲁翔石化',      en_name: 'Shandong Luxiang Petrochemical',   address: 'Shandong, China',          date: 'Condensation + Adsorption — 200 m³/h — 200#' },
      { id: 12, kr_name: '迪创化工',          en_name: 'Dichuang Chemical',                address: 'China',                    date: 'Condensation — 240 m³/h — Toluene' },
      { id: 13, kr_name: '山东晨光石化',      en_name: 'Shandong Chenguang Petrochemical', address: 'Shandong, China',          date: 'Condensation + Adsorption — 200 m³/h — Solvent Oil' },
      { id: 14, kr_name: '山东星宇',          en_name: 'Shandong Xingyu (1)',              address: 'Shandong, China',          date: 'Condensation — 400 m³/h — Dichloromethane' },
      { id: 15, kr_name: '山东星宇',          en_name: 'Shandong Xingyu (2)',              address: 'Shandong, China',          date: 'Condensation — 400 m³/h — Dichloromethane' },
      { id: 16, kr_name: '东营海欣仓储',      en_name: 'Dongying Haixin Storage (1)',      address: 'Dongying, Shandong',       date: 'Desulfurization + Condensation + Adsorption — 1500 m³/h — Crude Oil' , lat: 37.4, lng: 118.7 },
      { id: 17, kr_name: '东营海欣仓储',      en_name: 'Dongying Haixin Storage (2)',      address: 'Dongying, Shandong',       date: 'Condensation + Adsorption — 1700 m³/h — Refined Oil' , lat: 37.4, lng: 118.8 },
      { id: 18, kr_name: '东营海欣仓储',      en_name: 'Dongying Haixin Storage (3)',      address: 'Dongying, Shandong',       date: 'Desulfurization + Condensation + Adsorption — 2000 m³/h — Crude Oil' , lat: 37.5, lng: 118.7 },
      { id: 19, kr_name: '东营海欣港务',      en_name: 'Dongying Haixin Port',             address: 'Dongying, Shandong',       date: 'Condensation + Adsorption — 3000 m³/h — Refined Oil' , lat: 37.5, lng: 118.9 },
      { id: 20, kr_name: '万通石化',          en_name: 'Wantong Petrochemical',            address: 'China',                    date: 'Condensation + Adsorption — 1700 m³/h — Refined Oil' , lat: 36.8, lng: 118.1 },
      { id: 21, kr_name: '金顺油品',          en_name: 'Jinshun Oil Products',             address: 'China',                    date: 'Desulfurization + Condensation + Adsorption — 3000 m³/h — Crude Oil' , lat: 37.2, lng: 118.5 },
      { id: 22, kr_name: '中浩建管道科技',    en_name: 'Zhonghaojian Pipeline Tech',       address: 'China',                    date: 'Condensation + Adsorption — 3000 m³/h — Refined Oil' , lat: 36.5, lng: 117.3 },
      { id: 23, kr_name: '东营永达科技',      en_name: 'Dongying Yongda Technology',       address: 'Dongying, Shandong',       date: 'Condensation + Adsorption — 300 m³/h — 200#' , lat: 37.3, lng: 118.6 },
      { id: 24, kr_name: '北海缘',            en_name: 'Beihaiyuan',                       address: 'China',                    date: 'Condensation + Adsorption — 200 m³/h — 200#' , lat: 21.5, lng: 109.1 },
      { id: 25, kr_name: '上海中远海运',      en_name: 'Shanghai COSCO Shipping',          address: 'Shanghai, China',          date: 'Condensation + Adsorption — 200 m³/h — Oil Pit Exhaust' , lat: 31.2, lng: 121.5 },
      { id: 26, kr_name: '龙口丰达油库',      en_name: 'Longkou Fengda Oil Depot',         address: 'Longkou, Shandong',        date: 'Condensation + Adsorption — 500 m³/h — Gasoline/Diesel' , lat: 37.6, lng: 120.5 },
      { id: 27, kr_name: '河北斐然 (1)',      en_name: 'Hebei Feiran (1)',                 address: 'Hebei, China',             date: 'Condensation + Adsorption — 300 m³/h — Gasoline/Diesel' , lat: 38.0, lng: 114.5 },
      { id: 28, kr_name: '河北斐然 (2)',      en_name: 'Hebei Feiran (2)',                 address: 'Hebei, China',             date: 'Condensation + Adsorption — 500 m³/h — Gasoline/Diesel' , lat: 38.1, lng: 114.6 },
      { id: 29, kr_name: '中航工业',          en_name: 'AVIC (Aviation Industry Corp)',    address: 'China',                    date: 'Condensation + Adsorption — 400 m³/h — Jet Fuel' , lat: 39.9, lng: 116.4 },
      { id: 30, kr_name: '东方宏业 (尾气)',   en_name: 'Dongfang Hongye (Tail Gas)',       address: 'China',                    date: 'Condensation + Adsorption — 200 m³/h — Dichloromethane' , lat: 35.1, lng: 118.2 },
      { id: 31, kr_name: '东营市晨光化工',    en_name: 'Dongying Chenguang Chemical',      address: 'Dongying, Shandong',       date: 'Condensation + Adsorption — 300 m³/h — Naphtha/Solvent Oil' , lat: 37.4, lng: 118.5 },
      { id: 32, kr_name: '东营市德泉化工',    en_name: 'Dongying Dequan Chemical',         address: 'Dongying, Shandong',       date: 'Condensation + Adsorption — 50 m³/h — Solvent Oil' , lat: 37.3, lng: 118.4 },
      { id: 33, kr_name: '青岛锐丰源',        en_name: 'Qingdao Ruifengyuan',              address: 'Qingdao, Shandong',        date: 'Condensation — 250 m³/h — Refined Oil' , lat: 36.1, lng: 120.4 },
      { id: 34, kr_name: '安徽徽州正杰',      en_name: 'Anhui Huizhou Zhengjie',           address: 'Anhui, China',             date: 'Condensation — 100 m³/h — Methanol' , lat: 29.9, lng: 118.3 },
      { id: 35, kr_name: '利津县津强化工',    en_name: 'Lijin Jinqiang Chemical',          address: 'Lijin, Shandong',          date: 'Condensation + Adsorption — 300 m³/h — Naphtha/Solvent Oil' , lat: 37.5, lng: 118.3 },
      { id: 36, kr_name: '盐城大丰港成品油',  en_name: 'Yancheng Dafeng Port Oil',         address: 'Yancheng, Jiangsu',        date: 'Condensation + Adsorption — 300 m³/h — Diesel' , lat: 33.2, lng: 120.5 },
      { id: 37, kr_name: '中国石油大港石化',  en_name: 'CNPC Dagang Petrochemical',        address: 'Tianjin, China',           date: 'Condensation — 1100 m³/h — Gasoline/Diesel' , lat: 38.9, lng: 117.4 },
      { id: 38, kr_name: '利津县国邦化工',    en_name: 'Lijin Guobang Chemical',           address: 'Lijin, Shandong',          date: 'Condensation + Adsorption — 300 m³/h — Solvent Oil' , lat: 37.5, lng: 118.2 },
      { id: 39, kr_name: '山东星宇 (尾气)',   en_name: 'Shandong Xingyu (Tail Gas)',       address: 'Shandong, China',          date: 'Condensation — 200 m³/h — Dichloromethane' , lat: 36.4, lng: 116.7 },
      { id: 40, kr_name: '东营市垦利区景瑞',  en_name: 'Dongying Kenli Jingrui',           address: 'Dongying, Shandong',       date: 'Condensation + Adsorption — 300 m³/h — Solvent Oil' , lat: 37.6, lng: 118.6 },
      { id: 41, kr_name: '中国启源',          en_name: 'China Qiyuan',                     address: 'China',                    date: 'Condensation + Adsorption — 1000 m³/h — Methanol' , lat: 34.0, lng: 108.9 },
      { id: 42, kr_name: '内蒙古蒙联',        en_name: 'Inner Mongolia Menglian',          address: 'Inner Mongolia, China',    date: 'Condensation + Adsorption — 400 m³/h — Isooctane' , lat: 41.0, lng: 110.0 },
      { id: 43, kr_name: '山东林创',          en_name: 'Shandong Linchuang',               address: 'Shandong, China',          date: 'Condensation + Adsorption — 1200 m³/h — C10 Aromatics' , lat: 36.8, lng: 117.1 },
      { id: 44, kr_name: '信昌科技',          en_name: 'Xinchang Technology',              address: 'China',                    date: 'Condensation + Adsorption — 500 m³/h — Chemical' , lat: 29.5, lng: 120.9 },
      { id: 45, kr_name: '大连蒙连',          en_name: 'Dalian Menglian',                  address: 'Dalian, Liaoning',         date: 'Condensation + Adsorption — 500 m³/h — Gasoline/Naphtha/Isooctane/Ethanol/MTBE' , lat: 38.9, lng: 121.6 },
      { id: 46, kr_name: '山东环球',          en_name: 'Shandong Huanqiu',                 address: 'Shandong, China',          date: 'Condensation + Adsorption — 200 m³/h — Refined Oil' , lat: 36.5, lng: 117.9 },
      { id: 47, kr_name: '湖南石化',          en_name: 'Hunan Petrochemical',              address: 'Hunan, China',             date: 'Condensation — 2400 m³/h — Toluene' , lat: 28.2, lng: 112.9 },
      { id: 48, kr_name: '中矿云工',          en_name: 'Zhongkuang Yungong',               address: 'China',                    date: 'Condensation + Adsorption — 600 m³/h — Methanol' , lat: 39.9, lng: 116.3 },
      { id: 49, kr_name: '山东广源达',        en_name: 'Shandong Guangyuanda',             address: 'Shandong, China',          date: 'Condensation + Adsorption — 200 m³/h — 200# Solvent Oil' , lat: 36.6, lng: 117.4 },
      { id: 50, kr_name: '山西聚和鑫',        en_name: 'Shanxi Juhexin',                   address: 'Shanxi, China',            date: 'Condensation + Adsorption — 200 m³/h — Tire Pyrolysis Oil' , lat: 37.9, lng: 112.5 },
      { id: 51, kr_name: '安康五里油库',      en_name: 'Ankang Wuli Oil Depot',            address: 'Ankang, Shaanxi',          date: 'Condensation + Adsorption — 500 m³/h — Refined Oil' , lat: 32.7, lng: 109.0 },
      { id: 52, kr_name: '镇江索普',          en_name: 'Zhenjiang Suopu',                  address: 'Zhenjiang, Jiangsu',       date: 'Condensation + Adsorption — 360+1240 m³/h — Vinyl Acetate' , lat: 32.2, lng: 119.4 },
      { id: 53, kr_name: '扬州华伦',          en_name: 'Yangzhou Hualun',                  address: 'Yangzhou, Jiangsu',        date: 'Condensation — 1200 m³/h — C10' , lat: 32.4, lng: 119.4 },
      { id: 54, kr_name: '天津和一',          en_name: 'Tianjin Heyi (Mobile)',            address: 'Tianjin, China',           date: 'Condensation + Adsorption — 500 m³/h — Chemical (Mobile Unit)' , lat: 39.1, lng: 117.2 },
      { id: 55, kr_name: '上海永疆',          en_name: 'Shanghai Yongjiang',               address: 'Shanghai, China',          date: 'Condensation — 2500 m³/h — Toluene/Methanol/DMF/Ethylene' , lat: 31.3, lng: 121.6 },
      { id: 56, kr_name: '庆阳长庆油田',      en_name: 'Qingyang Changqing Oilfield',      address: 'Qingyang, Gansu',          date: 'Condensation + Adsorption — 60 m³/h — Propylene Oxide' , lat: 35.7, lng: 107.6 },
      { id: 57, kr_name: '中煤陕西能源',      en_name: 'China Coal Shaanxi Energy',        address: 'Shaanxi, China',           date: 'Condensation + Adsorption — 420 m³/h — Methanol/DMTO/MTBE/Hexane' , lat: 34.3, lng: 108.9 },
    ]
  },
  { 
    name: 'Shanghai Manufacturing Facility',
    location: 'Shanghai, China',
    countryCode: 'CN',
    coordinates: [31.2304, 121.4737],
    operator: 'Aramco Services',
    vru_model: 'MZ-9000 Pro',
    status: 'Online',
    annual_revenue: '$5.5M',
    co2_reduction: '18,000 tons/year',
    image: '/chinainstalls/whiteunitchina.JPG',
    images: ['/chinainstalls/whiteunitchina.JPG', '/factorypictures/machinesinfactory.pic.jpg']
  },
  { 
    name: 'Cambodia Port Ops',
    location: 'Phnom Penh, Cambodia',
    countryCode: 'KH',
    coordinates: [11.5449, 104.8922],
    operator: 'Aramco',
    vru_model: 'MZ-9000 Pro',
    status: 'Online',
    annual_revenue: '$2.5M',
    co2_reduction: '6,200 tons/year',
    image: '/otherinstalls/largeinstall.png',
    images: ['/otherinstalls/largeinstall.png']
  },
  { 
    name: 'Vietnam Industrial Zone',
    location: 'Ho Chi Minh City, Vietnam',
    countryCode: 'VN',
    coordinates: [10.8231, 106.6297],
    operator: 'Aramco Logistics',
    vru_model: 'MZ-9000 Pro',
    status: 'Online',
    annual_revenue: '$3.8M',
    co2_reduction: '10,500 tons/year',
    image: '/saudiinstalls/abhainstall.jpeg',
    images: ['/saudiinstalls/abhainstall.jpeg']
  },
];

const StatWidget = ({ icon: Icon, label, value, subtext, color }: any) => (
    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4 min-w-[200px] hover:border-cyan-500/30 transition-colors group">
        <div className={`p-3 rounded-lg bg-white/5 ${color} group-hover:scale-110 transition-transform`}>
            <Icon size={20} />
        </div>
        <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{label}</p>
            <div className="text-xl font-bold text-white font-mono">{value}</div>
            {subtext && <p className="text-[10px] text-gray-500">{subtext}</p>}
        </div>
    </div>
);

const ProjectListItem = ({ project, onClick }: { project: Project, onClick: () => void }) => (
    <div 
        onClick={onClick}
        className="group cursor-pointer flex items-center justify-between p-2 border-b border-white/5 hover:bg-white/10 transition-colors first:rounded-t-lg last:rounded-b-lg last:border-0 bg-black/20 backdrop-blur-sm"
    >
        <div className="flex items-center gap-2 overflow-hidden">
             <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${project.status === 'Online' ? 'bg-green-500 shadow-[0_0_4px_#22c55e]' : 'bg-yellow-500'}`} />
             <div className="truncate">
                <h4 className="text-[10px] font-bold text-gray-200 group-hover:text-cyan-300 transition-colors font-mono uppercase truncate">{project.name}</h4>
                <div className="flex items-center gap-1 text-[9px] text-gray-600 uppercase tracking-tight">
                    <span>{project.countryCode}</span>
                    <span className="text-gray-800">|</span>
                    <span>{project.vru_model}</span>
                </div>
             </div>
        </div>
        
        <div className="text-right shrink-0 pl-2">
            <div className="text-[10px] font-mono font-bold text-cyan-500/70 group-hover:text-cyan-400">
                {project.annual_revenue !== 'N/A' ? project.annual_revenue : '--'}
            </div>
        </div>
    </div>
);

const GlobalPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const totalSites = projects.length;
  const activeCountries = new Set(projects.map(p => p.countryCode)).size;
  const totalRevenue = projects.reduce((acc, curr) => {
      const val = parseFloat(curr.annual_revenue.replace(/[^0-9.]/g, ''));
      return isNaN(val) ? acc : acc + val;
  }, 0);

  const filteredProjects = projects.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectClick = (projectData: any) => {
    let project: Project | undefined;
    
    if ('geometry' in projectData) {
         project = projects.find(p => 
            p.coordinates[0] === projectData.geometry.coordinates[1] &&
            p.coordinates[1] === projectData.geometry.coordinates[0]
        );
    } else {
        project = projectData as Project;
    }

    if (project) {
        setSelectedProject(project);
    }
  };
  
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleCountryDoubleClick = (countryCode: string) => {
    const countryProjects = projects.filter(project => project.countryCode === countryCode);
    if (countryProjects.length === 1) {
      setSelectedProject(countryProjects[0]);
    }
  };

  return (
    <section className="h-screen w-screen relative flex items-center justify-center overflow-hidden bg-[#000212]">
      
      {/* --- 3D Globe Layer --- */}
      <div className="absolute inset-0 z-0">
        <Globe projects={projects} onProjectClick={handleProjectClick} onCountryDoubleClick={handleCountryDoubleClick} />
      </div>

      {/* --- HUD Overlay Layer --- */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col p-4 md:p-8 pt-36 md:pt-40 pb-24 md:pb-8 justify-end">
        
        {/* Main Layout */}
        <div className="flex-1 flex flex-col md:flex-row justify-between items-end gap-6">
            
            {/* Bottom Left: Stats Telemetry */}
            <motion.div 
                className="hidden md:flex flex-col gap-3 pointer-events-auto w-64 mb-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <StatWidget 
                    icon={Building} 
                    label={t('pages.global.stats.activeSites')} 
                    value={<AnimatedCounter to={totalSites} />} 
                    color="text-cyan-400" 
                />
                <StatWidget 
                    icon={GlobeIcon} 
                    label={t('pages.global.stats.marketsOnline')} 
                    value={<AnimatedCounter to={activeCountries} />} 
                    color="text-purple-400" 
                />
                 <StatWidget 
                    icon={Zap} 
                    label={t('pages.global.stats.globalRevenue')} 
                    value={<AnimatedCounter to={totalRevenue} prefix="$" suffix="M" fractionDigits={1} />} 
                    subtext={t('pages.global.stats.annualRunRate')}
                    color="text-green-400" 
                />
                 <StatWidget 
                    icon={Wind} 
                    label={t('pages.global.stats.carbonOffset')} 
                    value={<AnimatedCounter to={73.5} suffix="k" fractionDigits={1} />} 
                    subtext={t('pages.global.stats.metricTonsYear')}
                    color="text-blue-400" 
                />
            </motion.div>

            {/* Right Panel: Real-Time Feed (Project List) */}
            <motion.div 
                className="w-full md:w-72 flex flex-col gap-0 pointer-events-auto h-[40vh] md:h-[50vh] rounded-xl overflow-hidden border border-white/10 bg-[#050714]/90 backdrop-blur-md shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {/* Panel Header */}
                <div className="p-2 border-b border-white/10 bg-white/5">
                    {/* Search Bar Only - Removed Title */}
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder={t('pages.global.feed.filterSignal')} 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded py-1 pl-7 pr-2 text-[10px] text-white focus:outline-none focus:border-cyan-500/50 transition-colors placeholder-gray-600 font-mono"
                        />
                        <Search size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                </div>

                {/* Scrollable List */}
                <div className="overflow-y-auto custom-scrollbar flex-1">
                    {filteredProjects.map(project => (
                        <ProjectListItem 
                            key={project.name} 
                            project={project} 
                            onClick={() => handleProjectClick(project)} 
                        />
                    ))}
                </div>
                
                <div className="p-1.5 border-t border-white/5 text-[8px] text-center text-gray-700 font-mono uppercase">
                    {t('pages.global.feed.scanningSector')}
                </div>
            </motion.div>

        </div>
      </div>

      {/* --- Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>

      {/* Mobile Stats Bar (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-white/10 p-4 grid grid-cols-3 gap-2 z-20">
           <div className="text-center">
                <p className="text-[9px] text-gray-400 uppercase font-bold">{t('pages.global.modal.sites')}</p>
                <p className="font-bold text-white text-lg">{totalSites}</p>
           </div>
           <div className="text-center border-l border-white/10">
                <p className="text-[9px] text-gray-400 uppercase font-bold">{t('header.nav.global')}</p>
                <p className="font-bold text-white text-lg">{activeCountries}</p>
           </div>
           <div className="text-center border-l border-white/10">
                <p className="text-[9px] text-gray-400 uppercase font-bold">Rev.</p>
                <p className="font-bold text-emerald-400 text-lg">${totalRevenue.toFixed(1)}M</p>
           </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </section>
  );
};

export default GlobalPage;
