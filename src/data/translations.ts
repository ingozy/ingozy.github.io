export const translations = {
  zh: {
    nav: {
      home: '首页',
      projects: '项目',
      techStack: '技术栈',
      contact: '联系我',
    },
    hero: {
      role: '独立开发者',
      bio: '专注于 AI 工具与 AI × 硬件在生活和工作场景中的落地，相信好的技术应该让人更自由。',
      contact: '联系我',
      keywords: ['AI工作流搭建', '产品设计', '网页开发', '游戏设计'],
    },
    projects: {
      title: '项目作品',
      watchDemo: '观看演示',
      livePreview: '实时预览',
      video: '视频',
      interactive: '可交互',
      paused: '暂停开发',
    },
    techStack: {
      title: '技术栈',
      subtitle: '通过 AI 协作独立完成从产品设计、前端交互到后端服务的全栈交付',
    },
    footer: {
      role: '独立开发者 · AI 产品构建者',
      bio: '前腾讯游戏策划 → AI 辅助独立开发',
      navigation: '导航',
      contact: '联系方式',
      weChat: '微信',
      email: '邮箱',
      top: '顶部',
      hint: '欢迎项目合作与工作机会咨询',
      copyNote: '加好友请备注来源',
    },
    modal: {
      close: '关闭 (ESC)',
      loading: '加载中...',
      desktopTip: '建议在桌面端查看以获得最佳体验',
      videosCount: '个视频片段',
      contactTitle: '联系我',
      copy: '复制',
      copied: '已复制',
    },
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      techStack: 'Tech Stack',
      contact: 'Contact',
    },
    hero: {
      role: 'Indie Developer',
      bio: 'Focused on bringing AI tools and AI × hardware into everyday life and work. I believe good technology should set people free.',
      contact: 'Contact Me',
      keywords: ['AI Workflows', 'Product Design', 'Web Development', 'Game Design'],
    },
    projects: {
      title: 'Projects',
      watchDemo: 'Watch Demo',
      livePreview: 'Live Preview',
      video: 'Video',
      interactive: 'Interactive',
      paused: 'Development Paused',
    },
    techStack: {
      title: 'Tech Stack',
      subtitle: 'Independently delivering full-stack work from product design to frontend interaction and backend services, with AI as a collaborator.',
    },
    footer: {
      role: 'Indie Developer · AI Product Builder',
      bio: 'Ex-Tencent Game Designer → AI-Assisted Indie Developer',
      navigation: 'Navigation',
      contact: 'Contact',
      weChat: 'WeChat',
      email: 'Email',
      top: 'Top',
      hint: 'Open to collaborations and job opportunities',
      copyNote: 'Please mention how you found me',
    },
    modal: {
      close: 'Close (ESC)',
      loading: 'Loading...',
      desktopTip: 'Best experienced on desktop',
      videosCount: 'video clips',
      contactTitle: 'Contact Me',
      copy: 'Copy',
      copied: 'Copied',
    },
  },
} as const;

export type Translations = typeof translations;
export type Language = keyof typeof translations;
