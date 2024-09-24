
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる


});


/* -------------------------------------------------------------------------------- */
/* サブメニューの表示 */
// 『.header__link』にhoverした際に、『is-service』や『.is-company』を付与している項目の場合は、それらに対応するサブメニュー(.sub-menu)を表示する。
// また、サブメニュー自体にhoverした場合もサブメニューを表示し続ける。
// サブメニュー自体にhoverしている間は、その項目に対応する『.header__link』の擬似要素(beforeとafter)に『.active』クラスを付与して、『.header__link』の擬似要素も表示されたままにする。(CSSでも制御)

// サブメニューを表示する関数
function showSubMenu(subMenu, headerLink) {
  subMenu.style.opacity = '1';
  subMenu.style.visibility = 'visible';

  // ナビゲーションリンクにもactiveクラスを付与して擬似要素を表示し続ける
  headerLink.classList.add('active');
}

// サブメニューを非表示にする関数
function hideSubMenu(subMenu, headerLink) {
  subMenu.style.opacity = '0';
  subMenu.style.visibility = 'hidden';

  // ナビゲーションリンクからactiveクラスを削除
  headerLink.classList.remove('active');
}

// メニューリンクとサブメニューを関連付ける関数
function setupHoverEvents(linkClass, menuClass) {
  const headerLinks = document.querySelectorAll(`.header__link.${linkClass}`);
  const subMenus = document.querySelectorAll(`.sub-menu.${menuClass}`);

  headerLinks.forEach((headerLink, index) => {
    const subMenu = subMenus[index];

    // メニューリンクにhoverしたときのイベント設定
    headerLink.addEventListener('mouseenter', () => showSubMenu(subMenu, headerLink));
    headerLink.addEventListener('mouseleave', () => hideSubMenu(subMenu, headerLink));

    // サブメニュー自体にhoverしたときのイベント設定
    subMenu.addEventListener('mouseenter', () => showSubMenu(subMenu, headerLink));
    subMenu.addEventListener('mouseleave', () => hideSubMenu(subMenu, headerLink));
  });
}

// is-company と is-service の両方に対応
setupHoverEvents('is-company', 'is-company');
setupHoverEvents('is-service', 'is-service');


/* -------------------------------------------------------------------------------- */
/* swiper (スワイパー) fv */
const fvSwiper = new Swiper(".js-fv-swiper", {
  loop: true,
  effect: 'slide',

  centeredSlides: true, // アクティブなスライドを中央に配置する
  slidesPerView: 'auto', // スライドの幅をCSSで指定
  spaceBetween: 72,

  speed: 2000,  // 切り替わる最中のスピード(ミリ秒)
  autoplay: {  // 自動再生ON
    delay: 4000,  // 次のスライドに切り替わるまでの時間
    disableOnInteraction: false,  // ユーザーがドラッグなどの操作をしても自動再生が止まらないように。
  },
});


/* -------------------------------------------------------------------------------- */
/* swiper (スワイパー) caseセクション */
const caseSwiper = new Swiper(".js-case-swiper", {
  loop: true,

  slidesPerView: 'auto', // スライドの幅をCSSで指定
  spaceBetween: 67,

  grabCursor: true,  // PCでホバー時にマウスカーソルを「掴む」マークに。

  speed: 1500,  // 切り替わる最中のスピード(ミリ秒)
  autoplay: {  // 自動再生ON
    delay: 3500,  // 次のスライドに切り替わるまでの時間
    disableOnInteraction: false,  // ユーザーがドラッグなどの操作をしても自動再生が止まらないように。
  },

  breakpoints: {
    900: {  // 900px以上の場合 (PC時)
      spaceBetween: 40,
    },
  },

  // 「前へ」「次へ」ボタン (Navigation arrows)（矢印のオプション指定）
  navigation: {
    nextEl: '.js-case-next',
    prevEl: '.js-case-prev',
  },

  // ページネーション (pagination)（スライドの総数と現在のスライドが何番目か表示させる）：『1/5』のように。
  pagination: {
    el: '.js-case-pagination',
    type: "fraction", // 枚数表示
    // clickable: true, // ページネーションの丸(ドット)をクリックしてもスライド可能に。
  },
});


// ページネーションの『1/5』の部分の、『/』だけにスタイルを当てるために、「custom-slash」というspanタグで囲うように指定。(CSSだけでは制御不可能)
document.addEventListener("DOMContentLoaded", function() {
  // ページネーション内の`/`部分を特定してクラスを付与
  const pagination = document.querySelector('.swiper-pagination-fraction');
  if (pagination) {
    pagination.childNodes.forEach((node, index) => {
      if (node.nodeType === 3 && node.textContent.trim() === '/') {
        // テキストノードを<span>に置き換える
        const span = document.createElement('span');
        span.classList.add('custom-slash'); // 任意のクラスを追加
        span.textContent = '/'; // '/'を設定

        // テキストノードを置き換える
        pagination.replaceChild(span, node);
      }
    });
  }
});


/* -------------------------------------------------------------------------------- */






/* ================================================================================ */
/*  アニメーション  */
/* ================================================================================ */
/* テキストを、フェードで1文字ずつ表示させる */
// ※ <span>タグで1文字ずつ囲む処理をする際に、<br>タグは1文字ずつ<span>で囲む対象から外す処理も。

window.addEventListener('DOMContentLoaded', function() {
  let splitTargets = document.querySelectorAll(".js-splitText");  // ターゲットとなる要素を全て取得

  // 文字１つ１つを、spanタグで分割
  splitTargets.forEach(function(target) {
    let newText = '';  // 生成する要素を格納する為の変数
    let spanText = target.innerHTML;  // 要素のHTMLを取得

    // 正規表現を使って、<br>タグを特別な処理で除外
    spanText.split(/(<br\s*\/?>)/).forEach(function(part) {
      if (part === "<br>" || part === "<br/>" || part === "<br />") {
        // <br>タグはそのまま保持
        newText += part;
      } else {
        // それ以外の部分を1文字ずつ分割して<span>で囲む
        part.split('').forEach(function(char) {
          newText += '<span>' + char + '</span>';
        });
      }
    });

    target.innerHTML = newText;  // 加工した新しいHTMLを元の要素に代入
  });


  // パターン1
  let targets1 = document.querySelectorAll(".js-text-fadein-1");
  targets1.forEach(function(target) {
    let spans = target.querySelectorAll('span');
    gsap.fromTo(spans, {autoAlpha:0}, {autoAlpha:1, stagger:.05, scrollTrigger:{
      trigger: spans,
      start: 'top 50%',
      // markers:{
      //   startColor: "blue",
      // },
    }
    });
  })

  // パターン2 (パターン1より少し遅れて表示)
  let targets2 = document.querySelectorAll(".js-text-fadein-2");
  targets2.forEach(function(target) {
    let spans = target.querySelectorAll('span');
    gsap.fromTo(spans, {autoAlpha:0}, {autoAlpha:1, delay:.3, stagger:.05, scrollTrigger:{
      trigger: spans,
      start: 'top 50%',
      // markers:{
      //   startColor: "blue",
      // },
    }
    });
  })

  // パターン3 (フェードの間隔短め)
  let targets3 = document.querySelectorAll(".js-text-fadein-3");
  targets3.forEach(function(target) {
    let spans = target.querySelectorAll('span');
    gsap.fromTo(spans, {autoAlpha:0}, {autoAlpha:1, stagger:.02, scrollTrigger:{
      trigger: spans,
      start: 'top 90%',
      // markers:{
      //   startColor: "blue",
      // },
    }
    });
  })

})


/* -------------------------------------------------------------------------------- */
/* 背景が先に上からトリミングが外れる形で表示され、その後、文字がフワッと上から下にフェードインして表示される */
document.addEventListener('DOMContentLoaded', function() {
  const downBgToTexts = document.querySelectorAll(".js-down-bg-to-text");  // ページ内の、このアニメーションをさせたい全ての要素を取得

  downBgToTexts.forEach(downBgToText => {
    let bg = downBgToText.querySelectorAll('.js-down-bg');
    let text = downBgToText.querySelectorAll('.js-down-text');

    let tl = gsap.timeline({scrollTrigger:{
      trigger: downBgToText,
      start: 'top 70%',
      // markers:{
      //   startColor: "green",
      // },
    }});
    tl  // 先にトリミングが外れて背景が表示され、その後、テキストがフェードインで表示される
    .fromTo(bg, {'clipPath':'inset(0 0 100% 0)'}, {'clipPath':'inset(0 0 0% 0)', duration:.5, ease:"out"})
    .fromTo(text, {y:-20, autoAlpha:0}, {y:0, autoAlpha:1},'-=.1')

  });
});


/* -------------------------------------------------------------------------------- */
/* スクロール (小さなランチャームが泳ぐように下にスクロール移動) (無限ループ(繰り返す)) */
document.addEventListener('DOMContentLoaded', function() {
  const scrollDowns = document.querySelectorAll(".js-scroll-down");  // ページ内の、このアニメーションをさせたい全ての要素を取得

  scrollDowns.forEach(scrollDown => {
    let item = scrollDown.querySelector('.js-scroll-item');

    let tl = gsap.timeline({
      repeat: -1,  // 無限ループ
      repeatDelay: 1.0,  // 無限ループの間隔を設定
    });
    tl  // 先にトリミングが外れて背景が表示され、その後、テキストがフェードインで表示される
    .fromTo(item, {rotate:'10deg'}, {rotate:'-10deg', duration:.07, ease:"liner"})
    .fromTo(item, {rotate:'-10deg'}, {rotate:'10deg', duration:.07, ease:"liner"})
    .fromTo(item, {rotate:'10deg'}, {rotate:'-10deg', duration:.07, ease:"liner"})
    .fromTo(item, {rotate:'-10deg'}, {rotate:'10deg', duration:.07, ease:"liner"})
    .fromTo(item, {rotate:'10deg'}, {rotate:'-10deg', duration:.07, ease:"liner"})
    .fromTo(item, {rotate:'-10deg'}, {rotate:'10deg', duration:.07, ease:"liner"})
    .fromTo(item, {rotate:'10deg'}, {rotate:'-10deg', duration:.07, ease:"liner"})
    .fromTo(item, {rotate:'-10deg'}, {rotate:'0deg', duration:.07, ease:"liner"})
    // .fromTo(item, {rotate:'10deg'}, {rotate:'-10deg', duration:.1, ease:"liner"})
    // .fromTo(item, {rotate:'-10deg'}, {rotate:'0deg', duration:.1, ease:"liner"})

    .fromTo(item, {y:0,}, {y:125, ease:"out"},'+=.4')

  });
});
