// Android アプリ版の案内カード。3つのページの最初の画面の下に置く。
// 文言とリンクはここだけで直せるように、1つのファイルにまとめている。
//
// - iPhone / iPad には出さない（Android 版しかないため）
// - 「×」で閉じると、その端末では二度と出さない（localStorage。使えない環境では毎回出るだけ）
// - 練習の進行中（カード引き・ラウンド画面）には出さない。置く側で setup 画面だけに入れる
// - 文言は Android 版の無料の範囲で書く。ミックス優先は Android 版では Pro なので書かない
(function () {
  var STORE_URL =
    'https://play.google.com/store/apps/details?id=com.as1studio.tennisdraw' +
    '&referrer=utm_source%3Dhtml_draw%26utm_medium%3Dweb%26utm_campaign%3Dapp_promo';
  var DISMISS_KEY = 'tennisAppPromoDismissed';

  function isIOS() {
    var ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/i.test(ua)) return true;
    // iPadOS は Mac として名乗るので、タッチの有無で見分ける
    return /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  }

  function wasDismissed() {
    try { return localStorage.getItem(DISMISS_KEY) === '1'; } catch (e) { return false; }
  }

  function AppPromo() {
    var h = React.createElement;
    var state = React.useState(function () { return isIOS() || wasDismissed(); });
    var hidden = state[0], setHidden = state[1];
    if (hidden) return null;

    var dismiss = function () {
      try { localStorage.setItem(DISMISS_KEY, '1'); } catch (e) {}
      setHidden(true);
    };

    return h('div', {
      style: {
        position: 'relative', marginTop: 24, padding: '16px 16px 14px',
        background: '#FFFFFF', borderRadius: 14, border: '1.5px solid #C6E0CF',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)', textAlign: 'left',
        fontFamily: "'Segoe UI', system-ui, sans-serif", width: '100%',
      },
    },
      h('button', {
        onClick: dismiss, 'aria-label': 'この案内を閉じる',
        style: {
          position: 'absolute', top: 6, right: 6, width: 32, height: 32,
          border: 'none', background: 'none', color: '#4B7A5E',
          fontSize: 18, lineHeight: '32px', cursor: 'pointer',
        },
      }, '×'),
      h('div', {
        style: { fontSize: 11, fontWeight: 700, color: '#4B7A5E', letterSpacing: 1.5, marginBottom: 4 },
      }, 'お知らせ'),
      h('div', {
        style: { fontSize: 16, fontWeight: 900, color: '#0F2D1C', marginBottom: 6, paddingRight: 28 },
      }, 'Android アプリ版ができました'),
      h('div', {
        style: { fontSize: 13, color: '#0F2D1C', lineHeight: 1.7, marginBottom: 12 },
      },
        '途中から来た人・先に帰る人への対応、「1つ前に戻る」、',
        '組み合わせを通知に表示（スマホの鍵を開けずに確認）など、練習会がもっと楽になります。',
        '基本の機能は無料です（広告あり）。'
      ),
      h('a', {
        href: STORE_URL, target: '_blank', rel: 'noopener',
        style: {
          display: 'block', textAlign: 'center', padding: '12px', borderRadius: 10,
          background: '#1A6B3C', color: '#FFFFFF', fontWeight: 800, fontSize: 15,
          textDecoration: 'none',
        },
      }, 'Google Play で見る'),
      h('div', {
        style: { fontSize: 11, color: '#4B7A5E', marginTop: 8, textAlign: 'center' },
      }, 'Android 13 以上・この HTML 版もこれまでどおり使えます')
    );
  }

  window.AppPromo = AppPromo;
})();
