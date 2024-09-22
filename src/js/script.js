
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

