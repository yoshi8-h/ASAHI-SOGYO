
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる


});

/* -------------------------------------------------------------------------------- */
/* サブメニューの表示 */
// 『.header__link』と『.is-company』を持つ要素をhoverした時に、サブメニュー(『.sub-menu』と『.is-company』を持つ要素)を表示する。
// document.querySelector('.header__link.is-company').addEventListener('mouseenter', function() {
//   document.querySelector('.sub-menu.is-company').style.opacity = '1';
//   document.querySelector('.sub-menu.is-company').style.visibility = 'visible';
// });

// // hoverが外れた時にサブメニューを非表示
// document.querySelector('.header__link.is-company').addEventListener('mouseleave', function() {
//   document.querySelector('.sub-menu.is-company').style.opacity = '0';
//   document.querySelector('.sub-menu.is-company').style.visibility = 'hidden';
// });


// // サブメニューを表示する関数
// function showSubMenu() {
//   const subMenu = document.querySelector('.sub-menu.is-company');
//   subMenu.style.opacity = '1';
//   subMenu.style.visibility = 'visible';
// }

// // サブメニューを非表示にする関数
// function hideSubMenu() {
//   const subMenu = document.querySelector('.sub-menu.is-company');
//   subMenu.style.opacity = '0';
//   subMenu.style.visibility = 'hidden';
// }

// // メニューリンクにhoverしたときのイベント設定
// const headerLinkCompany = document.querySelector('.header__link.is-company');
// headerLinkCompany.addEventListener('mouseenter', showSubMenu);
// headerLinkCompany.addEventListener('mouseleave', hideSubMenu);

// // サブメニュー自体にhoverしたときのイベント設定
// const subMenu = document.querySelector('.sub-menu.is-company');
// subMenu.addEventListener('mouseenter', showSubMenu); // マウスをサブメニューに乗せたときも表示
// subMenu.addEventListener('mouseleave', hideSubMenu);




// // サブメニューを表示する関数
// function showSubMenu() {
//   const subMenu = document.querySelector('.sub-menu.is-service');
//   subMenu.style.opacity = '1';
//   subMenu.style.visibility = 'visible';
// }

// // サブメニューを非表示にする関数
// function hideSubMenu() {
//   const subMenu = document.querySelector('.sub-menu.is-service');
//   subMenu.style.opacity = '0';
//   subMenu.style.visibility = 'hidden';
// }

// // メニューリンクにhoverしたときのイベント設定
// const headerLink = document.querySelector('.header__link.is-service');
// headerLink.addEventListener('mouseenter', showSubMenu);
// headerLink.addEventListener('mouseleave', hideSubMenu);

// // サブメニュー自体にhoverしたときのイベント設定
// const subMenu = document.querySelector('.sub-menu.is-service');
// subMenu.addEventListener('mouseenter', showSubMenu); // マウスをサブメニューに乗せたときも表示
// subMenu.addEventListener('mouseleave', hideSubMenu);


// // サブメニューを表示する関数
// function showSubMenu() {
//   const subMenu = document.querySelector('.sub-menu.is-company');
//   subMenu.style.opacity = '1';
//   subMenu.style.visibility = 'visible';
// }

// // サブメニューを非表示にする関数
// function hideSubMenu() {
//   const subMenu = document.querySelector('.sub-menu.is-company');
//   subMenu.style.opacity = '0';
//   subMenu.style.visibility = 'hidden';
// }

// // メニューリンクにhoverしたときのイベント設定
// const headerLink = document.querySelector('.header__link.is-company');
// headerLink.addEventListener('mouseenter', showSubMenu);
// headerLink.addEventListener('mouseleave', hideSubMenu);

// // サブメニュー自体にhoverしたときのイベント設定
// const subMenu = document.querySelector('.sub-menu.is-company');
// subMenu.addEventListener('mouseenter', showSubMenu); // マウスをサブメニューに乗せたときも表示
// subMenu.addEventListener('mouseleave', hideSubMenu); // マウスがサブメニューから離れたら非表示




// ==========================================
// サブメニューを表示する関数
function showSubMenu(subMenu) {
  subMenu.style.opacity = '1';
  subMenu.style.visibility = 'visible';
}

// サブメニューを非表示にする関数
function hideSubMenu(subMenu) {
  subMenu.style.opacity = '0';
  subMenu.style.visibility = 'hidden';
}

// メニューリンクとサブメニューを関連付ける関数
function setupHoverEvents(linkClass, menuClass) {
  const headerLinks = document.querySelectorAll(`.header__link.${linkClass}`);
  const subMenus = document.querySelectorAll(`.sub-menu.${menuClass}`);

  headerLinks.forEach((headerLink, index) => {
    const subMenu = subMenus[index];

    // メニューリンクにhoverしたときのイベント設定
    headerLink.addEventListener('mouseenter', () => showSubMenu(subMenu));
    headerLink.addEventListener('mouseleave', () => hideSubMenu(subMenu));

    // サブメニュー自体にhoverしたときのイベント設定
    subMenu.addEventListener('mouseenter', () => showSubMenu(subMenu));
    subMenu.addEventListener('mouseleave', () => hideSubMenu(subMenu));
  });
}

// is-company と is-service の両方に対応
setupHoverEvents('is-company', 'is-company');
setupHoverEvents('is-service', 'is-service');
// ==========================================






// // サブメニューを表示する関数
// function showSubMenu(headerLink, subMenu) {
//   subMenu.style.opacity = '1';
//   subMenu.style.visibility = 'visible';
//   headerLink.classList.add('hover'); // header__linkにhoverクラスを追加
// }

// // サブメニューを非表示にする関数
// function hideSubMenu(headerLink, subMenu) {
//   subMenu.style.opacity = '0';
//   subMenu.style.visibility = 'hidden';
//   headerLink.classList.remove('hover'); // header__linkからhoverクラスを削除
// }

// // メニューリンクとサブメニューを関連付ける関数
// function setupHoverEvents(linkClass, menuClass) {
//   const headerLinks = document.querySelectorAll(`.header__link.${linkClass}`);
//   const subMenus = document.querySelectorAll(`.sub-menu.${menuClass}`);

//   headerLinks.forEach((headerLink, index) => {
//     const subMenu = subMenus[index];

//     // メニューリンクにhoverしたときのイベント設定
//     headerLink.addEventListener('mouseenter', () => showSubMenu(headerLink, subMenu));
//     headerLink.addEventListener('mouseleave', () => hideSubMenu(headerLink, subMenu));

//     // サブメニュー自体にhoverしたときのイベント設定
//     subMenu.addEventListener('mouseenter', () => showSubMenu(headerLink, subMenu)); // サブメニュー上にマウスが乗っても表示
//     subMenu.addEventListener('mouseleave', () => hideSubMenu(headerLink, subMenu)); // サブメニューから離れたら非表示
//   });
// }

// // is-company と is-service の両方に対応
// setupHoverEvents('is-company', 'is-company');
// setupHoverEvents('is-service', 'is-service');






// // サブメニューを表示する関数
// function showSubMenu(headerLink, subMenu) {
//   subMenu.style.opacity = '1';
//   subMenu.style.visibility = 'visible';
//   headerLink.classList.add('hover'); // header__linkにhoverクラスを追加
// }

// // サブメニューを非表示にする関数
// function hideSubMenu(headerLink, subMenu) {
//   subMenu.style.opacity = '0';
//   subMenu.style.visibility = 'hidden';
//   headerLink.classList.remove('hover'); // header__linkからhoverクラスを削除
// }

// // メニューリンクとサブメニューを関連付ける関数
// function setupHoverEvents(linkClass, menuClass) {
//   const headerLinks = document.querySelectorAll(`.header__link.${linkClass}`);
//   const subMenus = document.querySelectorAll(`.sub-menu.${menuClass}`);

//   headerLinks.forEach((headerLink, index) => {
//     const subMenu = subMenus[index];

//     // メニューリンクにhoverしたときのイベント設定
//     headerLink.addEventListener('mouseenter', () => showSubMenu(headerLink, subMenu));
//     headerLink.addEventListener('mouseleave', () => hideSubMenu(headerLink, subMenu));

//     // サブメニュー自体にhoverしたときのイベント設定
//     subMenu.addEventListener('mouseenter', () => showSubMenu(headerLink, subMenu)); // サブメニュー上にマウスが乗っても表示
//     subMenu.addEventListener('mouseleave', () => hideSubMenu(headerLink, subMenu)); // サブメニューから離れたら非表示
//   });
// }

// // is-company と is-service の両方に対応
// setupHoverEvents('is-company', 'is-company');
// setupHoverEvents('is-service', 'is-service');







// // サブメニューを表示する関数
// function showSubMenu(headerLink, subMenu) {
//   subMenu.style.opacity = '1';
//   subMenu.style.visibility = 'visible';
//   headerLink.classList.add('is-hover'); // header__linkにis-hoverクラスを追加
// }

// // サブメニューを非表示にする関数
// function hideSubMenu(headerLink, subMenu) {
//   subMenu.style.opacity = '0';
//   subMenu.style.visibility = 'hidden';
//   headerLink.classList.remove('is-hover'); // header__linkからis-hoverクラスを削除
// }

// // メニューリンクとサブメニューを関連付ける関数
// function setupHoverEvents(linkClass, menuClass) {
//   const headerLinks = document.querySelectorAll(`.header__link.${linkClass}`);
//   const subMenus = document.querySelectorAll(`.sub-menu.${menuClass}`);

//   headerLinks.forEach((headerLink, index) => {
//     const subMenu = subMenus[index];

//     // メニューリンクにhoverしたときのイベント設定
//     headerLink.addEventListener('mouseenter', () => showSubMenu(headerLink, subMenu));
//     headerLink.addEventListener('mouseleave', () => hideSubMenu(headerLink, subMenu));

//     // サブメニュー自体にhoverしたときのイベント設定
//     subMenu.addEventListener('mouseenter', () => showSubMenu(headerLink, subMenu)); // サブメニュー上にマウスが乗っても表示
//     subMenu.addEventListener('mouseleave', () => hideSubMenu(headerLink, subMenu)); // サブメニューから離れたら非表示
//   });
// }

// // is-company と is-service の両方に対応
// setupHoverEvents('is-company', 'is-company');
// setupHoverEvents('is-service', 'is-service');










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
