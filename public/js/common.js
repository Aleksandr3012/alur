"use strict";

//
let div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад", 
			}, 
		}); 
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		// fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed")); 
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed")); 
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume() {
		//ultimate tabs
		let cTabs = document.querySelectorAll('.tabs');
		for (let tab of cTabs){
			let Btns = tab.querySelectorAll('.tabs__btn')
			let contentGroups = tab.querySelectorAll('.tabs__wrap');

			for (let btn of Btns){
				btn.addEventListener('click', function (){

					for (let btn of Btns){
						btn.classList.remove('active');
					}
					this.classList.add('active');

					let index = [...Btns].indexOf(this);
					//-console.log(index);

					for (let cGroup of contentGroups){
						let contentItems = cGroup.querySelectorAll('.tabs__content');

						for (let item of contentItems){
							item.classList.remove('active');
						}
						contentItems[index].classList.add('active');
					}
				})
			}
		}
	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+380-66-00-00-000").mask(InputTel);
	},
	// /inputMask

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume();
	JSCCommon.mobileMenu();
	JSCCommon.makeDDGroup();
	// JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.getCurrentYear('.currentYear');
	
	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		// pagination: {
		// 	el: ' .swiper-pagination',
		// 	type: 'bullets',
		// 	clickable: true,
		// 	// renderBullet: function (index, className) {
		// 	// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// 	// }
		// },
	};

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	$('.searchBlock__toggle--js').on('click', function() {
		$(this).toggleClass('active').parent().find('.searchBlock__hidden--js').toggleClass('active');
	});

	$('.accardion__btn').on('click', function() {
		$(this).toggleClass('active').parents('.accardion--js').find('.accardion__hidden--js').toggleClass('active');
	});

	function fixedStip(){
		let fixedStrip = document.querySelector('.fixedBlock');
		if(!fixedStrip) return

		window.addEventListener("scroll", toggleFixedStrip.bind(undefined, fixedStrip), {passive:  true});
		toggleFixedStrip(fixedStrip);
	}
	function toggleFixedStrip(fixedStrip){
		if (window.scrollY > calcVh(50)){
			$(fixedStrip).addClass('active');
		}
		else{
			$(fixedStrip).removeClass('active');
		}
	}
	function calcVh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	}
	fixedStip();

	var options = {
		useEasing : true,
		useGrouping : true,
		separator : ' ',
		decimal : ','
	}

	// Ми в цифрах параметры
	try{
		var count1 = new countUp("count1--js", 0, 1500, 0, 4, options);
		var count2 = new countUp("count2--js", 0, 5, 0, 4, options);
		var count3 = new countUp("count3--js", 0, 150, 0, 4, options);
		var count4 = new countUp("count4--js", 0, 19, 0, 4, options);

		var counterBlock = document.querySelector('.countWrap--js');

		var Visible = function (target) {
			// Все позиции элемента
			var targetPosition = {
					top: window.pageYOffset + target.getBoundingClientRect().top,
					left: window.pageXOffset + target.getBoundingClientRect().left,
					right: window.pageXOffset + target.getBoundingClientRect().right,
					bottom: window.pageYOffset + target.getBoundingClientRect().bottom
				},
				// Получаем позиции окна
				windowPosition = {
					top: window.pageYOffset,
					left: window.pageXOffset,
					right: window.pageXOffset + document.documentElement.clientWidth,
					bottom: window.pageYOffset + document.documentElement.clientHeight
				};

			if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
				targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
				targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
				targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
				// Если элемент полностью видно, то запускаем следующий код
				count1.start();
				count2.start();
				count3.start();
				count4.start();
			};
		};

		// Запускаем функцию при прокрутке страницы
		window.addEventListener('scroll', function() {
			Visible (counterBlock);
		});

		// А также запустим функцию сразу. А то вдруг, элемент изначально видно
		Visible (counterBlock);
	}
	catch{
		// remake it with some ifs
		console.log('remake it with some ifs');
	}

	//luckyone js
	let sServSlider = new Swiper('.sServ-slider-js', {
		observer: true,
		observeParents: true,
		spaceBetween: 20,

		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});
	//console.log(sServSlider);

	//end luckyone js
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
