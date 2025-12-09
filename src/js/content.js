export const controlsContent = [
  {
    id: 'essential',
    enableSwitcher: false,
    content: {
      default: {
        title: 'Essential',
        description:
          "Enables the core functionality on our websites, such as navigation, access to secure areas, video players and payments. Our websites cannot function properly without these cookies; they can only be disabled by changing your browser preferences.",
        activeText: 'Always active',
      },
      zh: {
        title: '必要性',
        description:
          '启用网站核心功能，例如导航，访问安全区域，视频播放器和支付。没有这些cookie网站不能正常工作；它们仅可通过修改浏览器偏好设置禁用。',
        activeText: '默认接受',
      },
      ja: {
        title: 'エッセンシャル',
        description:
          '当社ウェブサイトの基本的な機能（ナビゲーション、保護された情報へのアクセス、動画プレーヤー、支払いなど）を有効にするために必要なクッキーです。これらのクッキーが無効になっている場合、当社ウェブサイトは正しく動作しません。 これらはブラウザ設定の変更によってのみ無効化できます。',
        activeText: '常に有効',
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
          'Collects information on usage on our websites, for example, which pages are most frequently visited.',
      },
      zh: {
        title: '表现性',
        description: '网站使用信息收集，例如哪些网页被频繁访问。',
      },
      ja: {
        title: 'パフォーマンス',
        description:
          '当社ウェブサイトの利用状況（例：どのページの訪問頻度が高いかなど）に関する情報を収集します。',
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
          'Recognizes you when you return to our websites. This enables us to personalize content, greet you by name, remember your preferences, and helps you share pages on social networks.',
      },
      zh: {
        title: '功能性',
        description:
          '当你返回到我们网站时能识别您。这使得我们能个性化内容，欢迎您，记住您的偏好设置，以及帮助您分享网页到社交媒体。',
      },
      ja: {
        title: '機能性',
        description:
          '再訪時にユーザーを識別し、パーソナライズされたコンテンツの表示、お客様のお名前を用いた挨拶メッセージ、ユーザー設定の記憶を可能にします。また、ソーシャルネットワークでページを共有しやすくする機能にも使用されます。',
      },
    },
  }
];

export const content = {
  default: {
    notification: {
      title: 'Your tracker settings',
      body1:
        'We use cookies and similar methods to recognize visitors and remember preferences. We also use them to measure campaign effectiveness and analyze traffic on our websites. By selecting ‘Accept‘, you consent to the use of these methods by us and trusted third parties. For further details or to change your consent choices at any time see our <a href="https://canonical.com/legal/data-privacy?cp=hide#cookies">cookie policy</a>.',
      buttonManage: 'Manage your tracker settings',
      buttonAcceptAll: 'Accept all',
    },
    manager: {
      title: 'Tracking choices',
      body1:
        'We use cookies to recognize visitors and remember your preferences. They enhance user experience, personalize content and ads, provide social media features, measure campaign effectiveness, and analyze traffic on our websites.',
      body2:
        'Select the types of trackers you consent to, both by us, and third parties. Learn more at <a href="https://canonical.com/legal/data-privacy?cp=hide#cookies">data privacy: cookie policy</a> - you can change your choices at any time from the footer of the site.',
      acceptAll: 'Accept all',
      SavePreferences: 'Save preferences',
    },
  },

  zh: {
    notification: {
      title: '您的追踪器设置',
      body1:
        '我们使用 cookie 和相似的方法来识别访问者和记住访问者的偏好设置，并用来衡量活动的效果和分析 Canonical 旗下所有网站的流量。选择”接受“，您同意我们和受信的第三方来使用这些资料。更多细节或者随时变更您的选择，请阅读我们的<a href="https://canonical.com/legal/data-privacy?cp=hide#cookies"> cookie 策略</a>。',
      buttonManage: '管理您的追踪器设置',
      buttonAcceptAll: '接受',
    },
    manager: {
      title: '追踪选项',
      body1: '我们使用cookie来识别访问者和记住您的偏好设置 它们增强用户体验，使内容和广告个性化，提供社交媒体功能，衡量活动效果和网站流量分析。',
      body2:
        '选择您同意授予我们和受信的第三方的追踪类型。点击<a href="https://canonical.com/legal/data-privacy?cp=hide#cookies">数据隐私：cookie策略</a>了解更多，您可以在网站底部随时更改您的选择。',
      acceptAll: '接受全部',
      SavePreferences: '保存偏好设置',
    },
  },

  ja: {
    notification: {
      title: 'トラッキング機能の設定',
      body1:
        '当社は、訪問者を識別し、設定を記憶するために<a href="https://canonical.com/legal/data-privacy?cp=hide#cookies">クッキー</a>および類似の手法を使用しています。また、キャンペーンの効果測定や当社ウェブサイト上のトラフィックの分析にもクッキーを利用します。',
      body2:
        '「同意」を選択すると、当社および信頼できる第三者によるこれらの手法の利用に同意したものとみなされます。詳細や同意設定の変更は、いつでも当社のクッキーポリシーでご確認いただけます。',
      buttonManage: 'トラッキング機能の設定の管理',
      buttonAcceptAll: '同意する',
    },
    manager: {
      title: 'トラッキング機能の選択',
      body1:
        '当社は、訪問者を識別し、設定を記憶するためにクッキーおよび類似の手法を使用しています。これらの手法は、ユーザー体験の向上、パーソナライズされたコンテンツや広告の表示、ソーシャルメディア機能の提供、キャンペーン効果の測定、そして当社ウェブサイト上のトラフィック分析にも役立ちます。',
      body2:
        '当社および信頼できる第三者による、どの種類のトラッキング機能を利用することに同意されるかを選択してください。詳細は<a href="https://canonical.com/legal/data-privacy?cp=hide#cookies" /> データプライバシー：クッキーポリシー</a> をご覧ください。設定は、当社ウェブサイトのフッターからいつでも変更できます。',
      acceptAll: 'すべて同意',
      SavePreferences: '設定を保存',
    },
  },
};
