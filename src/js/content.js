export const controlsContent = [
  {
    id: 'essential',
    showSwitcher: false,
    content: {
      default: {
        title: 'Essential',
        description:
          "Enables the site's core functionality, such as navigation, access to secure areas, video players and payments. The site cannot function properly without these cookies; they can only be disabled by changing your browser preferences.",
      },
      zh: {
        title: '必要性',
        description:
          '启用网站核心功能，例如导航，访问安全区域，视频播放器和支付。没有这些cookie网站不能正常工作；它们仅可通过修改浏览器偏好设置禁用。',
      },
    },
  },
  {
    id: 'performance',
    showSwitcher: true,
    content: {
      default: {
        title: 'Performance',
        description:
          'Collects information on site usage, for example, which pages are most frequently visited.',
      },
      zh: {
        title: '表现性',
        description: '网站使用信息收集，例如哪些网页被频繁访问。',
      },
    },
  },
  {
    id: 'functionality',
    showSwitcher: true,
    content: {
      default: {
        title: 'Functionality',
        description:
          'Recognises you when you return to our site. This enables us to personalise content, greet you by name, remember your preferences, and helps you share pages on social networks.',
      },
      zh: {
        title: '功能性',
        description:
          '当你返回到我们网站时能识别您。这使得我们能个性化内容，欢迎您，记住您的偏好设置，以及帮助您分享网页到社交媒体。',
      },
    },
  },
];

export const content = {
  default: {
    notification: {
      title: 'Your tracker settings',
      body1:
        'We use cookies and similar methods to recognise visitors and remember preferences. We also use them to measure campaign effectiveness and analyse site traffic.',
      body2:
        'By selecting ‘Accept‘, you consent to the use of these methods by us and trusted third parties.',
      body3:
        'For further details or to change your consent choices at any time see our <a href="https://ubuntu.com/legal/data-privacy#cookies">cookie policy</a>.',
      buttonAccept: 'Accept all and visit site',
      buttonManage: 'Manage your tracker settings',
    },
    manager: {
      title: 'Tracking choices',
      body1:
        'We use cookies to recognise visitors and remember your preferences.',
      body2:
        'They enhance user experience, personalise content and ads, provide social media features, measure campaign effectiveness, and analyse site traffic.',
      body3:
        'Select the types of trackers you consent to, both by us, and third parties.',
      body4:
        'Learn more at <a href="https://ubuntu.com/legal/data-privacy#cookies">data privacy: cookie policy</a> - you can change your choices at any time from the footer of the site.',
      acceptAll: 'Accept all',
      acceptAllHelp: 'This will switch all toggles "ON".',
      SavePreferences: 'Save preferences',
    },
  },

  zh: {
    notification: {
      title: '您的追踪器设置',
      body1:
        '我们使用cookie和相似的方法来识别访问者和记住偏好设置。我们也用它们来衡量活动的效果和网站流量分析。',
      body2: '选择”接受“，您同意我们和受信的第三方来使用这些方式。',
      body3:
        '更多内容或者随时地变更您的同意选择，请点击我们的 <a href="https://ubuntu.com/legal/data-privacy#cookies">cookie策略</a>.',
      buttonAccept: '接受全部和访问网站',
      buttonManage: '管理您的追踪器设置',
    },
    manager: {
      title: '追踪选项',
      body1: '我们使用cookie来识别访问者和记住您的偏好设置',
      body2:
        '它们增强用户体验，使内容和广告个性化，提供社交媒体功能，衡量活动效果和网站流量分析。',
      body3: '选择您同意授予我们和受信的第三方的追踪类型。',
      body4:
        '点击<a href="https://ubuntu.com/legal/data-privacy#cookies">数据隐私：cookie策略</a>了解更多，您可以在网站底部随时更改您的选择。',
      acceptAll: '接受全部',
      acceptAllHelp: '这将把全部开关变为”开启“。',
      SavePreferences: '保存偏好设置',
    },
  },
};
