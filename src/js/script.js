
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
/* headerのスクロール検知 (下にスクロールした時は非表示に。上にスクロールした時は表示する) */
// headerはページ上部に固定。 (CSSで制御)
// fixedでは、headerの下にheaderの真下の要素が潜り込んでしまうため、「headerの高さ」と「headerの真下にある要素(セクション)」を自動検知し、headerの真下にある要素に『margin-top』でheaderの高さ分を付与してページの見た目を保つ制御。(headerの真下のセクションを自動検知する事で全ページで適用可能なコード)
// fvまではheaderを表示し、fvを超えた時にheaderを非表示にする。
// fvが存在しないページも考慮し(TOPページ以外)、fvが存在しない場合でもエラーにならず、スクロールに応じてheaderの表示・非表示を切り替える仕様に。

// ヘッダーの高さを取得して、headerの真下のセクションの上に余白を追加する
// ヘッダーの高さを取得して、headerの真下のセクションの上に余白を追加する
// ヘッダーの高さを取得して、headerの真下のセクションの上に余白を追加する
function adjustSectionPadding() {
  const header = document.querySelector('.header'); // ヘッダーを取得
  const nextElement = header.nextElementSibling; // ヘッダーの次にある要素（最初のセクション）を取得

  if (nextElement) {
    const headerHeight = header.offsetHeight; // ヘッダーの高さを取得

    // 最初のセクションにヘッダーの高さ分の余白を追加
    nextElement.style.marginTop = `${headerHeight}px`;
  }
}

// ページが読み込まれた時と、ウィンドウがリサイズされた時に実行
window.addEventListener('DOMContentLoaded', adjustSectionPadding);
window.addEventListener('resize', adjustSectionPadding);

// ファーストビューが存在するか確認し、その高さを取得する
const fv = document.querySelector('.fv');
const header = document.querySelector('.header');
let lastScrollY = window.scrollY; // スクロールの位置を保持

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (fv) {
    const fvHeight = fv.offsetHeight; // ファーストビューの高さを取得

    if (currentScrollY > fvHeight) {
      // ファーストビューを超えた時
      if (currentScrollY > lastScrollY) {
        // 下にスクロールしている時はヘッダーを非表示
        header.classList.add('hidden');
      } else {
        // 上にスクロールしている時はヘッダーを表示
        header.classList.remove('hidden');
      }
    } else {
      // ファーストビュー内にいる時は常にヘッダーを表示
      header.classList.remove('hidden');
    }
  } else {
    // .fvが存在しない場合の処理
    if (currentScrollY > lastScrollY) {
      // 下にスクロールしている時はヘッダーを非表示
      header.classList.add('hidden');
    } else {
      // 上にスクロールしている時はヘッダーを表示
      header.classList.remove('hidden');
    }
  }

  lastScrollY = currentScrollY; // 現在のスクロール位置を保存
});


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
/* モーダル (メガメニュー mega-menu) */
// 開閉の際にアニメーションを付与。
// 『閉じるボタン(×アイコン)』を押した時だけでなく、モーダルの外枠をクリックした時もモーダルが閉じるように実装。

// モーダルを開く処理
document.querySelectorAll(".js-modal-open").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    var modal = document.querySelector(".js-mega-menu-modal-" + modalNumber);
    modal.showModal();
    modal.classList.add("is-visible");  // クラスを追加してアニメーションを適用
    document.documentElement.classList.add("is-fixed");

    // モーダルの枠外をクリックした時の処理を追加
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });
});

// モーダルを閉じる処理
document.querySelectorAll(".js-modal-close").forEach(function(button) {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    var modalNumber = this.getAttribute("data-modal");
    var modal = document.querySelector(".js-mega-menu-modal-" + modalNumber);
    closeModal(modal);
  });
});

// モーダルを閉じる共通処理
function closeModal(modal) {
  modal.classList.remove("is-visible");  // クラスを削除してアニメーションを適用
  // アニメーションが終わるのを待ってからモーダルを閉じる
  setTimeout(function() {
    modal.close();
  }, 200);  // アニメーションの時間と同じに設定
  document.documentElement.classList.remove("is-fixed");
}


/* -------------------------------------------------------------------------------- */
// トップへ戻るボタン
// 画面を少し(今回は100px)スクロールした時に表示(通常は非表示)
const pageTop = document.querySelector("#js-top-btn");

window.addEventListener("scroll", function () {
  if (100 < window.scrollY) {  // 100px
    pageTop.classList.add("is-show");
  } else {
    pageTop.classList.remove("is-show");
  }
});






/* ================================================================================ */
/*  アニメーション  */
/* ================================================================================ */
/* オープニングアニメーション (ローディング) */
// ランチャームが回っている (GIF動画)
// 『ローディング中...』の文字は、1文字ずつ上に少し上がり、時間が経つと1文字ずつ順番に元の位置に下がってくるアニメーション。
// 以下の処理で1文字ずつ<span>タグで囲った文字を、動かすために『※CSSでinline要素以外にする指定』が必要。

// 各文字をspanで包む関数
function wrapTextInSpan(selector) {
  const element = document.querySelector(selector);
  const text = element.textContent; // テキストを取得
  const wrappedText = text.split('').map(char => `<span>${char}</span>`).join(''); // 各文字をspanでラップ
  element.innerHTML = wrappedText; // 新しいHTMLに置き換え
}

// 上で定義した『各文字をspanで包む関数』を実行。 → .opening__textのテキストをspanでラップ
wrapTextInSpan('.opening__text');

// アニメーションの実装
document.addEventListener('DOMContentLoaded', function() {
  // 『オープニング画面』を作成
  gsap.timeline({ repeat: -1, repeatDelay: 1 }) // 無限ループ。ループの繰り返しの間隔は1秒。
  .fromTo(".opening__text span", {y: 0}, { y: -10, stagger: 0.1, delay:0.4, duration: 0.4, ease: "liner"})
  .fromTo(".opening__text span", { y: -10}, {y: 0, stagger: 0.1, duration: 0.4, ease: "liner"},'-=.5')  // 最後の文字が上がりきる前に最初の文字が下がり始めるように、少し食い気味に発火。

  // 上で作った『オープニング画面』を、非表示に。
  gsap.ticker.lagSmoothing(false);  // 別タブを開いている間もアニメーションが進むようになる。
  gsap.fromTo('.opening', {y:'0%'}, {y:'-100%', duration:2, delay:2, ease:'power4.out'})
});


/* -------------------------------------------------------------------------------- */
/* 背景が先に上からトリミングが外れる形で表示され、その後、文字がフワッと上から下にフェードインして表示される */
// TOPページのFV。
// ※ローディング画面が終わった後に実行するようにするために、『delay』で大幅(3.0s)に実行を遅延。

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
    .fromTo(bg, {'clipPath':'inset(0 0 100% 0)'}, {'clipPath':'inset(0 0 0% 0)',delay:3.0, duration:.6, ease:"out"})
    .fromTo(text, {y:-20, autoAlpha:0}, {y:0, autoAlpha:1},'-=.27')

  });
});


/* -------------------------------------------------------------------------------- */
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
