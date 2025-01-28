
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
/* モーダル (メガメニュー mega-menu) */
// 開閉の際にアニメーションを付与。
// 『閉じるボタン(×アイコン)』を押した時だけでなく、モーダルの外枠をクリックした時もモーダルが閉じるように実装。

// // モーダルを開く処理
// document.querySelectorAll(".js-modal-open").forEach(function(button) {
//   button.addEventListener("click", function(e) {
//     e.preventDefault();
//     var modalNumber = this.getAttribute("data-modal");
//     var modal = document.querySelector(".js-mega-menu-modal-" + modalNumber);
//     modal.showModal();
//     modal.classList.add("is-visible");  // クラスを追加してアニメーションを適用
//     document.documentElement.classList.add("is-fixed");

//     // モーダルの枠外をクリックした時の処理を追加
//     modal.addEventListener('click', function(event) {
//       if (event.target === modal) {
//         closeModal(modal);
//       }
//     });
//   });
// });

// // モーダルを閉じる処理
// document.querySelectorAll(".js-modal-close").forEach(function(button) {
//   button.addEventListener("click", function(e) {
//     e.preventDefault();
//     var modalNumber = this.getAttribute("data-modal");
//     var modal = document.querySelector(".js-mega-menu-modal-" + modalNumber);
//     closeModal(modal);
//   });
// });

// // モーダルを閉じる共通処理
// // function closeModal(modal) {
// //   modal.classList.remove("is-visible");  // クラスを削除してアニメーションを適用
// //   // アニメーションが終わるのを待ってからモーダルを閉じる
// //   setTimeout(function() {
// //     modal.close();
// //   }, 200);  // アニメーションの時間と同じに設定
// //   document.documentElement.classList.remove("is-fixed");
// // }

// // モーダルを閉じる共通処理 (requestAnimationFrameを使用 → 『setTimeout』を使うと、アニメーションがカクつく可能性があるから。)
// function closeModal(modal) {
//   modal.classList.remove("is-visible");  // クラスを削除してアニメーションを適用

//   const animationDuration = 200;  // アニメーションの時間 (200ms)
//   let startTime = null;

//   // アニメーションが終わるのを待ってからモーダルを閉じる処理
//   function waitForAnimation(time) {
//     if (!startTime) startTime = time;  // 初回呼び出し時に開始時間をセット
//     const elapsedTime = time - startTime;

//     if (elapsedTime >= animationDuration) {
//       modal.close();  // アニメーション終了後にモーダルを閉じる
//       document.documentElement.classList.remove("is-fixed");
//     } else {
//       requestAnimationFrame(waitForAnimation);  // アニメーションの進行を監視し続ける
//     }
//   }

//   requestAnimationFrame(waitForAnimation);  // 初回のフレームをリクエスト
// }



// モーダルを開く処理
document.querySelectorAll(".js-modal-open").forEach(function (button) {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    const modalNumber = this.getAttribute("data-modal");
    const modal = document.querySelector(".js-mega-menu-modal-" + modalNumber);

    modal.showModal();
    modal.classList.add("is-visible");
    document.documentElement.classList.add("is-fixed");

    // モーダル外枠をクリックした場合に閉じる
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });
});

// モーダルを閉じる処理
document.querySelectorAll(".js-modal-close").forEach(function (button) {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    const modalNumber = this.getAttribute("data-modal");
    const modal = document.querySelector(".js-mega-menu-modal-" + modalNumber);

    closeModal(modal);
  });
});

// メガメニュー内のリンククリック時の処理
document.querySelectorAll(".nav2__contents a, .nav-sub2__title, .list2__item").forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    const isAnchorLink = href.startsWith("#") || (href.includes(window.location.pathname.replace(/\/$/, "/index.html")) && href.includes("#"));
    const modal = this.closest(".mega-menu");

    if (isAnchorLink) {
      e.preventDefault();

      const targetId = href.split("#")[1];
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }

      if (modal) {
        closeModal(modal);
      }
    } else {
      if (modal) {
        closeModal(modal);
      }
    }
  });
});

// モーダルを閉じる共通処理
function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("is-visible");

  const animationDuration = 200;
  setTimeout(() => {
    modal.close();
    document.documentElement.classList.remove("is-fixed");
  }, animationDuration);
}



/* -------------------------------------------------------------------------------- */
/*  headerのスクロール検知 (下にスクロールした時は非表示に。上にスクロールした時は表示する)  */
// headerはページ上部に固定。 (CSSで制御)
// fixedでは、headerの下にheaderの真下の要素が潜り込んでしまうため、「headerの高さ」と「headerの真下にある要素(セクション)」を自動検知し、headerの真下にある要素に『margin-top』でheaderの高さ分を付与してページの見た目を保つ制御。(headerの真下のセクションを自動検知する事で全ページで適用可能なコード)
// fvまではheaderを表示し、fvを超えた時にheaderを非表示にする。
// fvが存在しないページ(TOPページ以外)も考慮し、fvが存在しない場合でもエラーにならず、スクロールに応じてheaderの表示・非表示を切り替える仕様に。
// アンカーリンクで画面下から上にスムーススクロールされる際の上スクロールは、上スクロール判定にならない(headerが表示されない)ように。
// footerなどに記述している、他ページへのアンカーリンクでの遷移時を指定しているリンク先について、そのページ内で押した場合でも上スクロール判定にならない(headerが表示されない)ように。
// 【注意点】：スクロールの時間に合わせて1000msを調整してください。これが短すぎると、スクロール途中でheaderが表示される可能性があります。
function adjustSectionPadding() {
  const header = document.querySelector('.header'); // ヘッダーを取得
  const nextElement = header.nextElementSibling; // ヘッダーの次の要素を取得

  if (nextElement) {
    const headerHeight = header.offsetHeight; // ヘッダーの高さを取得
    nextElement.style.marginTop = `${headerHeight}px`; // 次の要素に余白を追加
  }
}

// ページ読み込みとリサイズ時に余白調整
window.addEventListener('DOMContentLoaded', adjustSectionPadding);
window.addEventListener('resize', adjustSectionPadding);

// スクロール時のヘッダー制御
const fv = document.querySelector('.fv');
const header = document.querySelector('.header');
let lastScrollY = window.scrollY; // 最後のスクロール位置
let isAnchorScrolling = false; // アンカーリンクスクロール中フラグ
const TOP_SCROLL_THRESHOLD = 15; // ページ上部付近のスクロール位置閾値

// アンカーリンククリック時の処理
function handleAnchorClick(e, targetElement) {
  e.preventDefault(); // デフォルトのリンク動作を無効化
  isAnchorScrolling = true; // アンカーリンクスクロール中に設定

  // ヘッダーを非表示にする
  header.classList.add('hidden');

  // スムーススクロール
  targetElement.scrollIntoView({ behavior: 'smooth' });

  // タイマーを設定して一定時間後にフラグを解除
  setTimeout(() => {
    isAnchorScrolling = false; // フラグ解除
  }, 800); // スクロール時間に応じて調整
}

// ページ遷移時にハッシュがあれば処理
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash; // 現在のURLのハッシュ部分を取得
  if (hash) {
    const targetElement = document.querySelector(hash); // ハッシュに対応する要素を取得
    if (targetElement) {
      handleAnchorClick({ preventDefault: () => {} }, targetElement); // ページ遷移時もアンカーリンク処理
    }
  }
});

// ページ内のアンカーリンククリック時に処理を追加
document.querySelectorAll('a[href^="#"], a[href*=".html#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href'); // リンクのhref属性を取得
    const hash = href.split('#')[1]; // ハッシュ部分を抽出
    const targetElement = document.querySelector(`#${hash}`); // 対象要素を取得

    if (targetElement) {
      handleAnchorClick(e, targetElement); // アンカーリンククリック時の処理
    }
  });
});

// スクロールイベントの制御
window.addEventListener('scroll', () => {
  if (isAnchorScrolling) return; // アンカーリンクスクロール中は何もしない

  const currentScrollY = window.scrollY;

  // ページ上部付近でのスクロール判定を無効化
  if (currentScrollY <= TOP_SCROLL_THRESHOLD) {
    // ページ上部付近では常にヘッダーを表示
    header.classList.remove('hidden');
    lastScrollY = currentScrollY; // 現在の位置を更新
    return;
  }

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
    // ファーストビューが存在しない場合の処理
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
  spaceBetween: 16,  // SP時

  breakpoints: {
    900: {  // 900px以上の場合 (PC時)
      spaceBetween: 72,
    },
  },

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
  spaceBetween: 32,

  breakpoints: {
    900: {  // 900px以上の場合 (PC時)
      spaceBetween: 67,
    },
  },

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
/* トップへ戻るボタン */
// 画面を少し(今回は100px)スクロールした時に表示(通常は非表示)
const pageTop = document.querySelector("#js-top-btn");

window.addEventListener("scroll", function () {
  if (100 < window.scrollY) {  // 100px
    pageTop.classList.add("is-show");
  } else {
    pageTop.classList.remove("is-show");
  }
});


/* -------------------------------------------------------------------------------- */
/* SP時の「footer」内の『アコーディオンメニュー』 */
jQuery(".js-accordion-1").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).closest('.nav__contents').hasClass("is-open")) {  // 最も近い『.nav__contents』が『.is-open』を持っている場合
    jQuery(this).closest('.nav__contents').removeClass("is-open");
    jQuery(this).parent().next().slideUp();  // 親要素の隣にある要素をスライドアップ
  } else {
    jQuery(this).closest('.nav__contents').addClass("is-open");
    jQuery(this).parent().next().slideDown();
  }
});


/* -------------------------------------------------------------------------------- */
/* SP時の「メガメニュー」内の『アコーディオンメニュー』 */
jQuery(".js-accordion-2").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).closest('.nav2__contents').hasClass("is-open")) {  // 最も近い『.nav2__contents』が『.is-open』を持っている場合
    jQuery(this).closest('.nav2__contents').removeClass("is-open");
    jQuery(this).parent().next().slideUp();  // 親要素の隣にある要素をスライドアップ
  } else {
    jQuery(this).closest('.nav2__contents').addClass("is-open");
    jQuery(this).parent().next().slideDown();
  }
});


/* -------------------------------------------------------------------------------- */
/* ページ遷移アニメーション (フェード) (jQuery) */
// 『TOPページ以外』のページの<body>タグに、ページ遷移時に『fade』クラスを追加する事で、ページ遷移時にフェードイン-アウトのアニメーションを実装。
// TOPページには『オープニングアニメーション』があるため不要。
(function ($) {
  'use strict';
  $(window).on('load', function() {
    // 現在のURLのパスが'/'でない場合（TOPページでない場合）
    if (window.location.pathname !== '/') {
      $('body').addClass('fade');
    }
  });
})(jQuery);




/* -------------------------------------------------------------------------------- */
/* toggle(アコーディオン)：事業紹介ページなど */
// ※絶対に、GSAPの記述より前に書く必要あり。
jQuery(".js-accordion").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).parent().hasClass("is-open")) {
    jQuery(this).parent().removeClass("is-open");
    jQuery(this).next().slideUp();
  } else {
    jQuery(this).parent().addClass("is-open");
    jQuery(this).next().slideDown();
  }
});


/* -------------------------------------------------------------------------------- */
/* スムーススクロール */
// ページ上部に固定しているヘッダー(header)の高さも考慮。
// document.addEventListener('DOMContentLoaded', function () {
//   // href属性の「#」で始まるリンクを全て取得
//   const links = document.querySelectorAll('a[href^="#"]');
//   // ヘッダーの高さを動的に取得する（クラス名で指定）
//   const header = document.querySelector('.header'); // ヘッダー要素を取得

//   // 取得したリンクを1つずつ処理を実行する
//   links.forEach((link) => {
//     // リンクをクリックしたら処理を実行する
//     link.addEventListener('click', (e) => {
//       // リンクイベントをキャンセルする
//       e.preventDefault();
//       // クリックしたリンクのhref属性を取得
//       const href = link.getAttribute('href');
//       // 目的のセクションを取得
//       const targetSection = document.querySelector(href);
//       // 画面の上からセクションのtop位置までの垂直方向の距離
//       const sectionTop = targetSection.getBoundingClientRect().top;
//       // 現在位置を取得
//       const currentPos = window.scrollY;
//       // ヘッダーの高さ（動的に取得）
//       const headerHeight = header ? header.offsetHeight : 0;
//       // 現在位置から目的のsectionまでのスクロール量
//       const target = sectionTop + currentPos - headerHeight;
//       // 特定の位置までスクロールさせる
//       window.scrollTo({
//         top: target, // 目的の位置のY座標を指定
//         behavior: 'smooth', // スクロールの動きを指定
//       });
//     });
//   });
// });


/* -------------------------------------------------------------------------------- */
// ※別ページの遷移先のid部分にアンカーリンクで飛ぶ場合に、アニメーションのせいでDOMが最初に非表示になっている要素の場合だとしっかりアンカーリンク先に飛ばない時がある為、それでもしっかりそのアンカーリンク先に飛ぶようにする指定。
// (ページ読み込み完了時に処理)
// window.addEventListener("load", function() {
//   const hash = window.location.hash;
//   if (hash) {
//     const targetElement = document.querySelector(hash);

//     if (targetElement) {
//       // GSAPのアニメーションがあれば強制的に完了させる
//       gsap.to(targetElement, { y: 0, autoAlpha: 1, duration: 0 });

//       // アンカーリンク先にスムーズにスクロール
//       targetElement.scrollIntoView({ behavior: "smooth" });
//     }
//   }
// });


/* スムーススクロール (ページ遷移アニメーションとGSAPアニメーションを両方考慮した指定) */
// ※ページ遷移アニメーションのためのJSが邪魔して上手くスクロールされないため、ページ遷移後にスムーススクロールを強制的に実行する
// ※別ページの遷移先のid部分にアンカーリンクで飛ぶ場合に、GSAPアニメーション(フワッと表示など)のせいでDOMが最初に非表示になっている要素の場合だとしっかりアンカーリンク先に飛ばない時がある為、それでもしっかりそのアンカーリンク先に飛ぶようにする指定。
// headerの高さも考慮。
// document.addEventListener("DOMContentLoaded", function () {
//   const header = document.querySelector(".header"); // ヘッダー要素
//   const animationDelay = 300; // ページ遷移アニメーションの待機時間

//   // 指定されたハッシュリンクにスクロールする処理
//   function scrollToHash(hash) {
//     const targetElement = document.querySelector(hash); // ハッシュに対応する要素
//     if (!targetElement) {
//       console.warn(`Target element for hash "${hash}" not found.`);
//       return; // 要素がない場合は中断
//     }

//     // GSAPを利用して非表示状態の要素を強制的に表示
//     if (typeof gsap !== "undefined") {
//       gsap.to(targetElement, { y: 0, autoAlpha: 1, duration: 0 }); // アニメーション即完了
//     }

//     // スムーズスクロール（ヘッダーの高さを考慮）
//     setTimeout(() => {
//       const sectionTop = targetElement.getBoundingClientRect().top; // 要素の画面上位置
//       const currentPos = window.scrollY; // 現在のスクロール位置
//       const headerHeight = header ? header.offsetHeight : 0; // ヘッダー高さ
//       const target = sectionTop + currentPos - headerHeight; // スクロール先計算

//       window.scrollTo({
//         top: target,
//         behavior: "smooth", // スムーススクロール
//       });
//     }, animationDelay); // 遷移アニメーション時間分待機
//   }

//   // DOMContentLoaded時点でのハッシュ処理
//   const hash = window.location.hash;
//   if (hash) {
//     scrollToHash(hash);
//   }

//   // ページ完全読み込み後の追加処理
//   window.addEventListener("load", function () {
//     if (hash) {
//       scrollToHash(hash); // 再実行してより確実に
//     }
//   });
// });


/* スムーススクロール (ページ遷移アニメーションとGSAPアニメーションを両方考慮した指定) */
// ※ページ遷移アニメーションのためのJSが邪魔して上手くスクロールされないため、ページ遷移後にスムーススクロールを強制的に実行する
// ※別ページの遷移先のid部分にアンカーリンクで飛ぶ場合に、GSAPアニメーション(フワッと表示など)のせいでDOMが最初に非表示になっている要素の場合だとしっかりアンカーリンク先に飛ばない時がある為、それでもしっかりそのアンカーリンク先に飛ぶようにする指定。
// headerの高さは考慮しない。
document.addEventListener("DOMContentLoaded", function () {
  const animationDelay = 300; // ページ遷移アニメーションの待機時間

  // 指定されたハッシュリンクにスクロールする処理
  function scrollToHash(hash) {
    const targetElement = document.querySelector(hash); // ハッシュに対応する要素
    if (!targetElement) {
      console.warn(`Target element for hash "${hash}" not found.`);
      return; // 要素がない場合は中断
    }

    // GSAPを利用して非表示状態の要素を強制的に表示
    if (typeof gsap !== "undefined") {
      gsap.to(targetElement, { y: 0, autoAlpha: 1, duration: 0 }); // アニメーション即完了
    }

    // スムーズスクロール
    setTimeout(() => {
      targetElement.scrollIntoView({ behavior: "smooth" }); // スムーススクロール
    }, animationDelay); // 遷移アニメーション時間分待機
  }

  // DOMContentLoaded時点でのハッシュ処理
  const hash = window.location.hash;
  if (hash) {
    scrollToHash(hash);
  }

  // ページ完全読み込み後の追加処理
  window.addEventListener("load", function () {
    if (hash) {
      scrollToHash(hash); // 再実行してより確実に
    }
  });
});





/* -------------------------------------------------------------------------------- */
/* 『円弧スライダー』 */
// 『slick slider』を使用。
// PC時のスライドの大きさはJSで指定。SP時のスライドの大きさはCSSのscaleで制御。
// (「lunch.html」の points セクション)

$(function () {

  /*―――――――――――――――――――――――――――――――――――――――――――――
  /* メインスライダー
  ――――――――――――――――――――――――――――――――――――――――――――――*/
  $('.rotate-slider').slick({
    autoplay: true,
    speed: 800,  // 切り替わる時間(回転する速さ)：ここの値は変更せず、下の『slide.style.transition』の部分で調整する事。
    autoplaySpeed: 4000,  // 次のスライドに切り替わるまでの時間
    dots: true,
    infinite: true,
    centerMode: true,
    variableWidth: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    cssEase: 'ease',
    swipe: false,
    asNavFor: ".slider-sub",
    appendDots: $('.pagination-dots'),  // 任意のクラス内にドットを挿入
    arrows: false,
  });

  // クリックしたスライドに遷移するようにする指定
  $('.rotate-slider__item img').on('click', function () {
    const slick_index = $(this).closest('.rotate-slider__item').data('slick-index');
    $('.rotate-slider').slick('slickGoTo', slick_index);
  });

  /*―――――――――――――――――――――――――――――――――――――――――――――
  /* サブ部分(カードに対応するコンテンツとページネーションの親の部分)
  ――――――――――――――――――――――――――――――――――――――――――――――*/
  $('.slider-sub').slick({
    fade: true,
    asNavFor: ".rotate-slider",
    arrows: false,
    swipe: false,
    adaptiveHeight: true,  // カードに対応するコンテンツ(テキストやボタン)に応じて、サブ部分(カードに対応するコンテンツとページネーションの親要素)の高さが自動で調整されるようにする指定。
  });


  /*―――――――――――――――――――――――――――――――――――――――――――――
  /* 回転アニメーションに関するjs
  ――――――――――――――――――――――――――――――――――――――――――――――*/
  const slide_width = 338;  // スライド1枚の横幅
  const control_gap = 11;  //間隔調整 (ここの値を大きくすれば、スライドの間隔が小さくなる。)
  const slides = document.querySelectorAll('.rotate-slider__item');
  const totalSlides = slides.length + control_gap;
  const angleStep = 360 / (totalSlides);
  const radius = 0;

  $('.rotate-slider__item').css({
    width: slide_width + 'px'
  })

  let isTransitioning = false;  // スライド移動中かどうかを追跡するフラグ

  function updateSlidePositions(currentIndex = 0) {
    slides.forEach((slide, index) => {
      const dataIndex = $(slide).data('slick-index');
      const normalizedIndex = (dataIndex % totalSlides + totalSlides) % totalSlides;
      const angle = angleStep * (normalizedIndex - currentIndex);
      const radian = angle * (Math.PI / 180);

      slide.style.transform = `rotate(${angle}deg) translate(${radius}px)`;
      slide.style.transition = 'transform 0.5s ease';  // ここで、スライドの切り替わるスピードを調整可能 (短い方が自然)
    });
  }

  const initialIndex = $('.slick-current').data('slick-index') % totalSlides;
  updateSlidePositions(initialIndex);

  $('.rotate-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    isTransitioning = true;  // スライド移動開始
    const nextIndex = nextSlide % totalSlides;
    updateSlidePositions(nextIndex);
  });

  $('.rotate-slider').on('afterChange', function (event, slick, currentSlide) {
    isTransitioning = false;  // スライド移動完了
  });

  $('.slick-dots li').on('click', function () {
    if (!isTransitioning) { // スライドが移動中でない場合のみ処理を実行
      const dotIndex = $(this).index();
      updateSlidePositions(dotIndex);
      $('.rotate-slider').slick('slickGoTo', dotIndex);  // slickGoTo メソッドを使用してスライドを変更
    }
  });

});

/* -------------------------------------------------------------------------------- */
/* 「inquiry.html」の『お問い合わせフォーム』の送信完了時に『thanksページ(thanks.html)』に飛ぶようにする */
// バリデーションも付与。
// セレクトボックス(ドロップダウンリスト)も必須項目に。
document.addEventListener('DOMContentLoaded', function () {
  // 『送信ボタン』を取得
  const sendButton = document.querySelector('.form__sendbtn');

  if (sendButton) {
    sendButton.addEventListener('click', function (event) {
      const form = document.querySelector('.contact__form');
      const selectPrefecture = document.getElementById('your-47prefectures');
      let isValid = true;

      // チェックボックスグループの必須検証関数
      function isCheckboxGroupValid(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
        return Array.from(checkboxes).some(checkbox => checkbox.checked);
      }

      // チェックボックスグループの検証対象
      const checkboxGroups = [
        'your-category',          // お問い合わせ内容
        'your-discovery_method',  // 弊社をどこで知りましたか？
      ];

      // チェックボックスグループの検証
      for (const group of checkboxGroups) {
        if (!isCheckboxGroupValid(group)) {
          isValid = false;
          break;
        }
      }

      // セレクトボックスの検証（未選択状態かを確認）
      if (selectPrefecture.value === "") {  // valueが空なら未選択とみなす
        isValid = false;
      }

      // 入力が全て正しく、チェックボックスの検証もパスしたかを確認
      if (!form.checkValidity() || !isValid) {
        event.preventDefault();  // 標準の送信動作を防止
        alert('必須項目をすべて入力してください。');  // 1回のアラートのみ表示
      } else {
        event.preventDefault(); // 標準の送信動作を防止
        window.location.href = 'thanks.html'; // thanks.htmlに遷移
      }
    });
  }
});








/* ================================================================================ */
/*  アニメーション  */
// ※jQueryなどの制御の記述は、GSAPの記述より前に書く必要あり。
/* ================================================================================ */

/* オープニングアニメーション (ローディング) */
// ランチャームが回っている (GIF動画)
// 『ローディング中...』の文字は、1文字ずつ上に少し上がり、時間が経つと1文字ずつ順番に元の位置に下がってくるアニメーション。
// 以下の処理で1文字ずつ<span>タグで囲った文字を、動かすために『※CSSでinline要素以外にする指定』が必要。
//      ↓↓↓
// サイトに1番最初に訪れた時のみ表示するように。(2回目以降、つまり、他の下層ページに移動してからまたTOPページに戻る時は、アニメーションが発火しないようにする)
// 他のページ(TOPページではなく、下層ページ)に最初からアクセスして、その後、TOPページに移動した場合も、アニメーションが発火するようにする。
// タブを1度閉じたら、また再度アクセスする時はアニメーションが発火するように。(セッションストレージという仕組みを使用。)

// // 各文字をspanで包む関数
// function wrapTextInSpan(selector) {
//   const element = document.querySelector(selector);

//   // elementが存在する場合のみ処理を実行
//   if (element) {
//     const text = element.textContent; // テキストを取得
//     const wrappedText = text.split('').map(char => `<span>${char}</span>`).join(''); // 各文字をspanでラップ
//     element.innerHTML = wrappedText; // 新しいHTMLに置き換え
//   }
// }

// // DOMが完全にロードされた後にアニメーションを設定
// document.addEventListener('DOMContentLoaded', function() {
//   // .opening__text のテキストをspanでラップする
//   wrapTextInSpan('.opening__text'); // // 上で定義した『各文字をspanで包む関数』を実行。 → .opening__textのテキストをspanでラップ

//   // GSAPアニメーションの実装
//   gsap.timeline({ repeat: -1, repeatDelay: 1 }) // 無限ループ。ループの繰り返しの間隔は1秒。
//   .fromTo(".opening__text span", {y: 0}, { y: -10, stagger: 0.1, delay:0.4, duration: 0.4, ease: "liner"})
//   .fromTo(".opening__text span", { y: -10}, {y: 0, stagger: 0.1, duration: 0.4, ease: "liner"},'-=.5')  // 最後の文字が上がりきる前に最初の文字が下がり始めるように、少し食い気味に発火。

//   // 上で作った『オープニング画面』を、非表示に。
//   gsap.ticker.lagSmoothing(false);  // 別タブを開いている間もアニメーションが進むように
//   gsap.fromTo('.opening', {autoAlpha:1}, {autoAlpha:0, duration:1.0, delay:2.2, ease:'power4.out'})
// });


/* オープニングアニメーション (ローディング) */
// ランチャームが回っている (GIF動画)
// 『ローディング中...』の文字は、1文字ずつ上に少し上がり、時間が経つと1文字ずつ順番に元の位置に下がってくるアニメーション。
// 以下の処理で1文字ずつ<span>タグで囲った文字を、動かすために『※CSSでinline要素以外にする指定』が必要。
//      ↓↓↓
// サイトに1番最初に訪れた時のみ表示するように。(2回目以降、つまり、他の下層ページに移動してからまたTOPページに戻る時は、アニメーションが発火しないようにする)
// 他のページ(TOPページではなく、下層ページ)に最初からアクセスして、その後、TOPページに移動した場合も、アニメーションが発火するようにする。
// タブを1度閉じたら、また再度アクセスする時はアニメーションが発火するように。(セッションストレージという仕組みを使用。)
function wrapTextInSpan(selector) {
  const element = document.querySelector(selector);

  if (element) {
    const text = element.textContent; // テキストを取得
    const wrappedText = text.split('').map(char => `<span>${char}</span>`).join(''); // 各文字を<span>でラップ
    element.innerHTML = wrappedText; // 新しいHTMLに置き換え
  }
}

// ローディングアニメーションの設定
function runOpeningAnimation() {
  // .opening__textのテキストを<span>でラップ
  wrapTextInSpan('.opening__text');

  // GSAPアニメーションの実行
  const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  timeline
    .fromTo(".opening__text span", { y: 0 }, { y: -10, stagger: 0.1, delay: 0.4, duration: 0.4, ease: "liner" })
    .fromTo(".opening__text span", { y: -10 }, { y: 0, stagger: 0.1, duration: 0.4, ease: "liner" }, '-=0.5');

  // オープニング画面を非表示に
  gsap.ticker.lagSmoothing(false); // 別タブでも動作するように
  gsap.fromTo('.opening', { autoAlpha: 1 }, { autoAlpha: 0, duration: 1.0, delay: 2.2, ease: 'power4.out' });
}

// 初回訪問チェック
document.addEventListener('DOMContentLoaded', function () {
  const isTopVisited = sessionStorage.getItem('topVisited'); // セッションストレージのフラグを取得

  if (!isTopVisited) {
    // 初回訪問時のみアニメーションを実行
    runOpeningAnimation();
    sessionStorage.setItem('topVisited', 'true'); // セッションストレージにフラグを設定
  } else {
    // 初回以外の処理
    document.querySelector('.opening').style.display = 'none'; // .openingを非表示
  }
});


/* -------------------------------------------------------------------------------- */
/* ページ遷移アニメーション (フェード) */
window.addEventListener('load', function() {
  const openingTL = gsap.timeline();
  openingTL
  .fromTo('.page-shift',{autoAlpha:1},{autoAlpha:0,delay:.28})  // delayで、アニメーションの秒数を指定。(durationはアニメーションにかける長さのため、白色が消え始めるまでの時間を指定したからdelayで指定する)
  .set('.opening',{autoAlpha:0})  // 「.opening」が、透明だが(要素として)前面に表示されてしまっているから、それを消す為の記述。
})


/* -------------------------------------------------------------------------------- */
/* １つの要素をフワッと下から出現 */
// ページ先頭にある場合のみ、発火位置を調整するためのクラス『is-top-element』も同時に付与するかどうかで、scrollTriggerの発火位置(start)を調整できるようにしている。→ 修正依頼にて、やはりページ遷移した際にすぐに発火するようにして欲しいとの事だったので、95%に修正。
// →ページの先頭付近にある要素は、scrollTriggerでスクロールしてアニメーションが発火する位置を、元から超えているため、画面リロード時に、すでにアニメーションが発火された状態になってしまっているため、それを防ぐ方法。
document.addEventListener('DOMContentLoaded', function() {
  const fadeInUps = document.querySelectorAll(".js-fadeInUp");  // ページ内の、このアニメーションをさせたい全ての要素を取得

  fadeInUps.forEach(item => {
    let isTopElement = item.classList.contains("is-top-element");  // クラスも同時に持っているか判定

    gsap.fromTo(item, {y:20, autoAlpha:0}, {y:0, autoAlpha:1, scrollTrigger:{
        trigger: item,
        start: isTopElement ? 'top 95%' : 'top 70%',  // 『is-top-element』クラスも同時に付与されている要素のみ、発火位置を下め(50%)に調整。→ページの先頭付近にある要素は、scrollTriggerでスクロールしてアニメーションが発火する位置を、元から超えているため、画面リロード時に、すでにアニメーションが発火された状態になってしまっているため、それを防ぐ方法。→ 修正依頼にて、やはりページ遷移した際にすぐに発火するようにして欲しいとの事だったので、95%に修正。
        // markers:{
        //   startColor: "green",
        // },
      }
    });
  });

});

/* １つの要素をフワッと上から下に出現 */
document.addEventListener('DOMContentLoaded', function() {
  const fadeInUps = document.querySelectorAll(".js-fadeInDown");  // ページ内の、このアニメーションをさせたい全ての要素を取得

  fadeInUps.forEach(item => {
    gsap.fromTo(item, {y:-30, autoAlpha:0}, {y:0, autoAlpha:1, scrollTrigger:{
        trigger: item,
        start: 'top 70%',
        // markers:{
        //   startColor: "green",
        // },
      }
    });
  });

});

/* １つの要素をフワッと左から右に出現 */
document.addEventListener('DOMContentLoaded', function() {
  const fadeInRights = document.querySelectorAll(".js-fadeInRight");  // ページ内の、このアニメーションをさせたい全ての要素を取得

  fadeInRights.forEach(item => {
    gsap.fromTo(item, {x:-30, autoAlpha:0}, {x:0, autoAlpha:1, scrollTrigger:{
        trigger: item,
        start: 'top 70%',
        // markers:{
        //   startColor: "green",
        // },
        end: 'top 20%',   // アニメーション終了タイミングを設定
        toggleActions: 'play none none none', // アニメーションの挙動制御
      }
    });
  });

});


/* １つの要素をフワッと右から左に出現 */
document.addEventListener('DOMContentLoaded', function() {
  const fadeInLefts = document.querySelectorAll(".js-fadeInLeft");  // ページ内の、このアニメーションをさせたい全ての要素を取得

  fadeInLefts.forEach(item => {
    gsap.fromTo(item, {x:30, autoAlpha:0}, {x:0, autoAlpha:1, scrollTrigger:{
        trigger: item,
        start: 'top 70%',
        // markers:{
        //   startColor: "green",
        // },
      }
    });
  });

});


/* -------------------------------------------------------------------------------- */
/* 複数枚のカードを時差でフワッと下から出現 (左から順番に時差で) */

document.addEventListener('DOMContentLoaded', function() {

  // ページ内の全てのカードコンテナ(複数枚カードのコンテナ。PC時にトリガーとなる要素)を取得
  const cardContainers = document.querySelectorAll(".js-cards-fadeInUp-trigger");

  cardContainers.forEach(container => {
    const cards = container.querySelectorAll(".js-card-fadeInUp");  // そのコンテナ内のカードを全て取得
    gsap.fromTo(cards, {y:40, autoAlpha:0}, {y:0, autoAlpha:1, stagger:.09, scrollTrigger:{
        trigger: container,
        start: 'top 70%',
        // markers:{
        //   startColor: "green",
        // },
      }
    });
  });

});


/* -------------------------------------------------------------------------------- */
/* 1つの親要素に囲まれた複数枚の要素を時差でフワッと下から出現 (順番に時差で) */
// 事業紹介ページのタイトル部分など。
// 「.is-top-element」クラスを同時に持つ要素は、発火位置が95%になる。それ以外の要素は60%で発火

// document.addEventListener('DOMContentLoaded', function() {

//   // ページ内の全ての要素のコンテナ(複数の要素のコンテナ。トリガーとなる要素)を取得
//   const elementContainers = document.querySelectorAll(".js-elements-fadeInUp-trigger");

//   elementContainers.forEach(container => {
//     const elements = container.querySelectorAll(".js-element-fadeInUp");  // そのコンテナ内の要素を全て取得
//     gsap.fromTo(elements, {y:40, autoAlpha:0}, {y:0, autoAlpha:1, stagger:.3, scrollTrigger:{
//         trigger: container,
//         start: 'top 60%',
//         // markers:{
//         //   startColor: "green",
//         // },
//       }
//     });
//   });

// });

document.addEventListener('DOMContentLoaded', function () {
  // ページ内の全ての要素のコンテナを取得
  const elementContainers = document.querySelectorAll(".js-elements-fadeInUp-trigger");

  elementContainers.forEach(container => {
    // コンテナに『.is-top-element』クラスがあるかを判定
    const isTopElement = container.classList.contains("is-top-element");

    // コンテナ内のアニメーション対象要素を取得
    const elements = container.querySelectorAll(".js-element-fadeInUp");

    elements.forEach(element => {
      // GSAPのアニメーション設定
      gsap.fromTo(element,{ y: 40, autoAlpha: 0 },{y: 0,autoAlpha: 1,stagger: 0.3,
          scrollTrigger: {
            trigger: container,
            start: isTopElement ? 'top 95%' : 'top 60%', // コンテナのクラスで発火位置を調整
            // markers: {
            //   startColor: "green",
            // },
          }
        }
      );
    });
  });

});



/* -------------------------------------------------------------------------------- */
/* 1つの親要素に囲まれた複数個の要素を時差でフワッと上から出現 (順番に時差で) */
// 『ランチャームとは』ページの、テキスト部分。
// スクロールトリガーはなし。

document.addEventListener('DOMContentLoaded', function() {

  // ページ内の全ての要素のコンテナ(複数の要素のコンテナ。トリガーとなる要素)を取得
  const elementContainersTopToBottom = document.querySelectorAll(".js-elements-fadeInDown-trigger");

  elementContainersTopToBottom.forEach(container => {
    const elements = container.querySelectorAll(".js-element-fadeInDown");  // そのコンテナ内の要素を全て取得
    gsap.fromTo(elements, {y:-25, autoAlpha:0}, {y:0, autoAlpha:1, stagger:.2, delay:1.3});
  });

});


/* -------------------------------------------------------------------------------- */
/* 背景が先に上からトリミングが外れる形で表示され、その後、文字がフワッと上から下にフェードインして表示される */
// TOPページのFV。
//      ↓↓↓
// ※最初は、オープニングアニメーション(ローディング画面)が終わった後に実行するようにするために、『delay』で大幅(2.6s)に実行を遅延させて対応していたが、
// オープニングアニメーションが、サイトに1番最初に訪れた時のみ表示するように変更になったため、(2回目以降、つまり、他の下層ページに移動してからまたTOPページに戻る時は、アニメーションが発火しないようにする)
// 同様にして、このTOPページのFVアニメーションも、最初の1度目のみ、2.6s遅延するようにして、かつ、2回目以降は、ページ遷移アニメーションがあるため、「1.2s」の遅延にする記述。
// (タブを1度閉じたら、また再度アクセスする時はアニメーションが発火するように。(セッションストレージという仕組みを使用。))
// (他のページ(TOPページではなく、下層ページ)に最初からアクセスして、その後、TOPページに移動した場合も、アニメーションが2.6s遅延して発火するようにする。)

// document.addEventListener('DOMContentLoaded', function() {
//   const downBgToTexts = document.querySelectorAll(".js-down-bg-to-text");  // ページ内の、このアニメーションをさせたい全ての要素を取得

//   downBgToTexts.forEach(downBgToText => {
//     let bg = downBgToText.querySelectorAll('.js-down-bg');
//     let text = downBgToText.querySelectorAll('.js-down-text');

//     let tl = gsap.timeline({scrollTrigger:{
//       trigger: downBgToText,
//       start: 'top 70%',
//       // markers:{
//       //   startColor: "green",
//       // },
//     }});
//     tl  // 先にトリミングが外れて背景が表示され、その後、テキストがフェードインで表示される
//     .fromTo(bg, {'clipPath':'inset(0 0 100% 0)'}, {'clipPath':'inset(0 0 0% 0)',delay:2.6, duration:.6, ease:"out"})
//     .fromTo(text, {y:-20, autoAlpha:0}, {y:0, autoAlpha:1},'-=.27')

//   });
// });

document.addEventListener('DOMContentLoaded', function () {
  const downBgToTexts = document.querySelectorAll(".js-down-bg-to-text"); // ページ内の対象要素を取得
  const isFvVisited = sessionStorage.getItem('fvVisited'); // セッションストレージのフラグを取得

  const delayTime = !isFvVisited ? 2.6 : 1.2; // 初回訪問時は2.6秒、それ以降は1.2秒の遅延

  downBgToTexts.forEach(downBgToText => {
    let bg = downBgToText.querySelectorAll('.js-down-bg');
    let text = downBgToText.querySelectorAll('.js-down-text');

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: downBgToText,
        start: 'top 70%',
        // markers: {
        //   startColor: "green",
        // },
      }
    });

    tl  // 背景とテキストのアニメーション
      .fromTo(bg, { 'clipPath': 'inset(0 0 100% 0)' }, { 'clipPath': 'inset(0 0 0% 0)', delay: delayTime, duration: 0.6, ease: "out" })
      .fromTo(text, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, '-=.27');
  });

  // セッションストレージにフラグを保存
  if (!isFvVisited) {
    sessionStorage.setItem('fvVisited', 'true');
  }
});



/* -------------------------------------------------------------------------------- */
/* 背景が先に上からトリミングが外れる形で表示され、その後、文字がフワッと上から下にフェードインして表示される */
// 『ランチャームとは？ページ』の、birthセクション。
// これはdelayでの遅延はなし。(遅延ありは上で実装しているから、『2』としている)

document.addEventListener('DOMContentLoaded', function() {
  const downBgToTexts2 = document.querySelectorAll(".js-down-bg-to-text-2");  // ページ内の、このアニメーションをさせたい全ての要素を取得

  downBgToTexts2.forEach(downBgToText => {
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
    .fromTo(bg, {'clipPath':'inset(0 0 100% 0)'}, {'clipPath':'inset(0 0 0% 0)', duration:.6, ease:"out"})
    .fromTo(text, {y:-20, autoAlpha:0}, {y:0, autoAlpha:1},'-=.27')

  });
});


/* -------------------------------------------------------------------------------- */
/* テキストを、フェードで1文字ずつ表示させる */
// ※ <span>タグで1文字ずつ囲む処理をする際に、<br>タグは1文字ずつ<span>で囲む対象から外す。
// ※ <span>タグで1文字ずつ囲む処理をする際にその分割処理から除外する<br>タグについて、<br>にclassが付与されていても除外対象だと判別されるように実装。
// パターン1には、ページ先頭にある場合のみ、発火位置を調整するためのクラス『is-top-element』も同時に付与するかどうかで、scrollTriggerの発火位置(start)を調整できるようにしている。
// →ページの先頭付近にある要素は、scrollTriggerでスクロールしてアニメーションが発火する位置を、元から超えているため、画面リロード時に、すでにアニメーションが発火された状態になってしまっているため、それを防ぐ方法。

window.addEventListener('DOMContentLoaded', function() {
  let splitTargets = document.querySelectorAll(".js-splitText");  // ターゲットとなる要素を全て取得

  // 文字１つ１つを、spanタグで分割
  splitTargets.forEach(function(target) {
    let newText = '';  // 生成する要素を格納する為の変数
    let spanText = target.innerHTML;  // 要素のHTMLを取得

    // 正規表現を使って、<br>タグを特別な処理で除外（クラスやスペースも含める）
    spanText.split(/(<br[^>]*>)/).forEach(function(part) {
      if (part.match(/<br[^>]*>/)) {
        // <br>タグ（クラス付き含む）はそのまま保持
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
    let isTopElement = target.classList.contains("is-top-element");  // 『.is-top-element』クラスも、『.js-text-fadein-1』と同時に持っているか判定
    gsap.fromTo(spans, {autoAlpha:0}, {autoAlpha:1, stagger:.05, scrollTrigger:{
      trigger: spans,
      start: isTopElement ? 'top 95%' : 'top 50%',  // 『.is-top-element』クラスも同時に付与されている要素のみ、発火位置を下め(40%)に調整。→ページの先頭付近にある要素は、scrollTriggerでスクロールしてアニメーションが発火する位置を、元から超えているため、画面リロード時に、すでにアニメーションが発火された状態になってしまっているため、それを防ぐ方法。→ 修正依頼にて、やはりページ遷移した際にすぐに発火するようにして欲しいとの事だったので、95%に修正。
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

  // パターン4 (アニメーションの発動を、少し遅らせる(lunch.htmlの。ページ遷移アニメーションの分遅らせる。かつ、スクロールトリガーを無しに。『ランチを』の文字))
  let targets4 = document.querySelectorAll(".js-text-fadein-4");
  targets4.forEach(function(target) {
    let spans = target.querySelectorAll('span');
      gsap.fromTo(spans, {autoAlpha:0}, {autoAlpha:1, delay:1.17, stagger:.05});
  })

  // パターン4 (アニメーションの発動を、少し遅らせる(lunch.htmlの。ページ遷移アニメーションの分遅らせる。かつ、スクロールトリガーを無しに。『チャーミングに。』の文字))
  let targets5 = document.querySelectorAll(".js-text-fadein-5");
  targets5.forEach(function(target) {
    let spans = target.querySelectorAll('span');
    gsap.fromTo(spans, {autoAlpha:0}, {autoAlpha:1, delay:1.4, stagger:.05});
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

    .fromTo(item, {y:0,}, {y: '7.8125rem', ease:"out"},'+=.4')  // 位置制御のために『rem』で制御 (125px / 16px = 7.8125rem)

  });
});


// /* -------------------------------------------------------------------------------- */
// /* 文字を強調するアニメーションのために、『is-act』というクラスを付与。(アニメーションはCSSのキーフレームで設定。) */
document.addEventListener('DOMContentLoaded', function() {
  let triggersStrong = document.querySelectorAll(".js-trigger-strong");

  triggersStrong.forEach(function(trigger) {
    gsap.to(trigger, {
      scrollTrigger: {
        trigger: trigger,
        start: "top 80%",
        toggleClass: { targets: trigger, className: "is-act" },
        once: true,  // 一度だけ実行
        // markers: {
        //   startColor: "blue",
        // },
      }
    });
  });
});


/* -------------------------------------------------------------------------------- */
/* 点線が伸びていくアニメーション (『ランチャームとはページ』のsvg) */

// 下からトリミングが外れる (上から出現) の、この『ランチャームとはページ』のsvgが伸びる場合専用！！
// アニメーションにかかる『秒数』を長く設定するから！
// 『-webkit-clip-path』も付与して、safariにも対応。
document.addEventListener('DOMContentLoaded', function() {
  const trimmingToTopItemsClearlyLong = document.querySelectorAll(".js-trimming-to-top-clearly-long");  // ページ内の、このアニメーションをさせたい全ての要素を取得

  trimmingToTopItemsClearlyLong.forEach(topItem => {
    gsap.fromTo(topItem,{'clipPath':'inset(0 0 100% 0)','-webkit-clip-path':'inset(0 0 100% 0)'},{'clipPath':'inset(0 0 0% 0)','-webkit-clip-path':'inset(0 0 0% 0)', duration: 13.0, ease:"linear", scrollTrigger:{
        trigger: topItem,
        start: 'top 60%',
        // end: 'bottom 20%',  // 要素が画面からほぼ消える位置でアニメーションが完了
        toggleActions: 'play none none none',  // スクロール時の動作を指定
        once: true,  // 一度だけ実行
        // markers:{
        //   startColor: "green",
        // },
      }
    });
  });
});
