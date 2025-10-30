export const controlsContent = [
  {
    id: 'essential',
    enableSwitcher: false,
    content: {
      default: {
        title: 'Strictly necessary',
        description:
          "These are cookies that are required to properly operate our website or provide necessary functions relating to the services you request. They include, for example, cookies enabling you to securely log into our website, subscribe to our services or make use of e-billing services. These cookies cannot be disabled.",
      },
      zh: {
        title: '必要性',
        description:
          '启用网站核心功能，例如导航，访问安全区域，视频播放器和支付。没有这些cookie网站不能正常工作；它们仅可通过修改浏览器偏好设置禁用。',
      },
      ja: {
        title: 'エッセンシャル',
        description:
          '移動、保護されている情報へのアクセス、動画再生、支払など、サイトの基本的な機能が有効になります。これらのクッキーが有効になっていない（お使いのブラウザの設定を変更することによってクッキーが無効化されている）場合、サイトは正しく表示されません。',
      },
    },
  },
  {
    id: 'functionality',
    enableSwitcher: true,
    content: {
      default: {
        title: 'Functional',
        description:
          'Recognises you when you return to our site. This enables us to personalise content, greet you by name, remember your preferences, and helps you share pages on social networks.',
      },
      zh: {
        title: '功能性',
        description:
          '当你返回到我们网站时能识别您。这使得我们能个性化内容，欢迎您，记住您的偏好设置，以及帮助您分享网页到社交媒体。',
      },
      ja: {
        title: '機能性',
        description:
          'お客様がサイトを再訪問したときに、お客様であることを認識します。この設定では、お客様に合わせたコンテンツの表示、お客様のお名前を用いたあいさつメッセージの表示、お客様の傾向の記録を当社が行えるようになります。また、お客様がソーシャルネットワークでページをシェアできるようになります。',
      },
    },
  },
  {
    id: 'performance',
    enableSwitcher: true,
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
      ja: {
        title: 'パフォーマンス',
        description:
          'サイトの利用状況に関する情報を収集します。例として、どのページの訪問頻度が高いかのような情報です。',
      },
    },
  }
];

export const content = {
  default: {
    notification: {
      title: 'We use cookies to provide you with a better online experience',
      body1:
        'To learn more about how we use cookies, please see our <a href="https://canonical.com/legal/data-privacy?cp=hide#cookies">Privacy Policy</a>.',
      body2:
        'You can choose to accept all cookies, reject all non-essential cookies, or manage your preferences.',
      buttonManage: 'Manage preferences',
      buttonAcceptEssential: 'Accept essential cookies only',
      buttonAcceptAll: 'Accept all',
    },
    manager: {
      title: 'Privacy choices',
      body1:
        'Our websites use cookies to enhance your user experience, remember your preferences, personalize content and ads, measure campaign effectiveness, and analyze site traffic. Some of these cookies transmit information to third parties. Our <a href="https://canonical.com/legal/data-privacy?cp=hide#cookies">Privacy Policy</a> provides more information about our cookie use and how you can update your choices.',
      body2:
        'You can choose not to allow some types of cookies, by managing your preferences at any time:',
      acceptAll: 'Accept all',
      SavePreferences: 'Save preferences',
    },
  },

  zh: {
    notification: {
      title: '您的追踪器设置',
      body1:
        '我们使用cookie和相似的方法来识别访问者和记住偏好设置。我们也用它们来衡量活动的效果和网站流量分析。',
      body2: '选择”接受“，您同意我们和受信的第三方来使用这些方式。',
      buttonManage: '管理您的追踪器设置',
      buttonAcceptEssential: '仅接受必要',
      buttonAcceptAll: '接受全部和访问网站',
    },
    manager: {
      title: '追踪选项',
      body1: '我们使用cookie来识别访问者和记住您的偏好设置',
      body2:
        '它们增强用户体验，使内容和广告个性化，提供社交媒体功能，衡量活动效果和网站流量分析。',
      acceptAll: '接受全部',
      SavePreferences: '保存偏好设置',
    },
  },

  ja: {
    notification: {
      title: 'トラッキング機能の設定',
      body1:
        '当社は、当社のウェブサイトを訪問された方の識別や傾向の記録を行うために、クッキーおよび類似の手法を利用します。また、キャンペーンの効果の測定やサイトのトラフィックの分析にもクッキーを利用します。',
      body2:
        '「同意」を選択すると、当社および信頼できる第三者による上記の手法の利用に同意したものとみなされます。',
      buttonManage: 'トラッキング機能の設定の管理',
      buttonAcceptEssential: 'エッセンシャルのみ同意',
      buttonAcceptAll: 'すべて同意してサイトにアクセス',
    },
    manager: {
      title: 'トラッキング機能の選択',
      body1:
        '当社は、当社のウェブサイトを訪問された方の識別や傾向の記録を行うために、クッキーを利用します。',
      body2:
        'クッキーは、お客様の利便性の向上、お客様に合わせたコンテンツや広告の表示、ソーシャルメディア機能の提供、キャンペーンの効果の測定、サイトのトラフィックの分析に役立ちます。',
      acceptAll: 'すべて同意',
      SavePreferences: '設定を保存',
    },
  },
};
