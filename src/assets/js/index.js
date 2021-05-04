function Tab(node) {
    var self = this;
    self.nodeSelector = node;
    if (!self.nodeSelector) {return}

    self.node = document.querySelector(self.nodeSelector);

    if (!self.node.querySelectorAll('[data-button-tab]').length) {return;}

    self.btnSwitchList = [].slice.call(self.node.querySelectorAll('[data-button-tab]'));
    self.tab = [].slice.call(self.node.querySelectorAll('[data-content-tab]'));

    self.btnSwitchList.forEach(function (btn, ind) {
        btn.addEventListener('click', function () {
            var name = this.dataset.buttonTab;

            self.tab.forEach(function (el) {
                el.classList.remove('active');
            });

            self.btnSwitchList.forEach(function (el) {
                el.classList.remove('active');
            });

            self.node.querySelector('[data-content-tab="' + name + '"]').classList.add('active');
            this.classList.add('active');
        });
    })
}

function PopupBuyOneClick (node) {
    let self = this;

    self.popup = document.querySelector(node);

    if(self.popup) {
        self.substrate = self.popup.querySelector('[data-popup="substrate"]');
        self.btnClose = self.popup.querySelectorAll('[data-popup="button close"]');
    }


    if (!(self.popup && self.btnClose.length && self.substrate)) { return; }

    self.open = function () {
        self.popup.style.display = "block";
        self.substrate.style.display = "block";

        setTimeout(function () {
            self.popup.classList.add('open');
        },10);
    };

    self.close = function () {
        self.popup.classList.remove('open');

        setTimeout(function () {
            self.popup.style.display = "none";
            self.substrate.style.display = "none";
        },310);
    };

    for (let i = 0; i < self.btnClose.length; i++) {
        self.btnClose[i].addEventListener("click", self.close);
    }

    self.substrate.addEventListener("click", self.close);

    return {
        open: self.open,
        close: self.close
    }
}

function GroupSliders(slider_1, slider_2, btnPrev, btnNext) {
    var _s = this;
    _s.btnPrev = document.getElementById(btnPrev) || btnPrev;
    _s.btnNext = document.getElementById(btnNext) || btnNext;
    _s.slider_1 = slider_1;
    _s.slider_2 = slider_2;

    _s.nextSlide = function () {
        _s.slider_1.slideTo(_s.slider_1.activeIndex + 1);
    }

    _s.prevSlide = function () {
        _s.slider_1.slideTo(_s.slider_1.activeIndex - 1);
    }

    _s.clickedSlide = function () {
        var timesArray = [];

        for (let i = 0; i < _s.slider_2.slides.length; i++) {
            _s.slider_2.slides[i].addEventListener('click', function () {
                _s.slider_1.slideTo(i);
                _s.slider_2.slideTo(i);
            });

            _s.slider_2.slides[i].addEventListener('mouseenter', function () {
                timesArray[i] = setTimeout(function () {
                    _s.slider_1.slideTo(i);
                },500);
            });

            _s.slider_2.slides[i].addEventListener('mouseleave', function () {
                clearTimeout(timesArray[i]);
            });
        }
    }

    if (_s.btnPrev) {
        _s.btnPrev.addEventListener('click', _s.prevSlide);
    }

    if (_s.btnNext) {
        _s.btnNext.addEventListener('click', _s.nextSlide);
    }

    _s.clickedSlide();
}

function PopupSlider(srcList,ind) {
    var self = this;

    self.srcList = srcList;
    self.ind = ind;
    self.header = null;
    self.body = null;
    self.title = null;
    self.btnClose = null;
    self.btnPrev = null;
    self.btnNext = null;
    self.popup = null;
    self.slider_1 = null;
    self.slider_2 = null;
    self.wrBigPhoto = null;
    self.wrMinPhoto = null;
    self.transition = 300;

    self.createPopup = function () {
        self.popup = document.createElement('div');
        self.popup.classList.add('popupSliders');
        self.popup.append(self.header);
        self.popup.append(self.body);

        document.body.append(self.popup);
        self.popup.style.transition = self.transition + 'ms';
    }

    self.removePopup = function () {
        self.popup.style.opacity = '0';

        setTimeout(function () {
            self.popup.remove();
        },self.transition)
    }

    self.createHeader = function () {
        self.header = document.createElement('div');
        self.header.classList.add('popupHeader');

        self.header.append(self.title);
        self.header.append(self.btnClose);
    }

    self.createBody = function () {
        self.body = document.createElement('div');
        self.body.classList.add('popupBody');

        self.body.append(self.wrMinPhoto);
        self.body.append(self.wrBigPhoto);
    }

    self.createTitle = function () {
        var name = document.querySelector('.detail-name-goods').innerHTML;

        self.title = document.createElement('div');
        self.title.classList.add('popupTitle');
        self.title.append(name);
    }

    self.createButtonClose = function () {
        self.btnClose = document.createElement('div');
        self.btnClose.classList.add('popupBtnClose');
        self.btnClose.innerHTML = '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.918579 2.83276L2.94077 0.810571L27.6895 25.5593L25.6673 27.5815L0.918579 2.83276Z" fill="#1C71B8"/><path d="M25.6674 0.810547L27.6896 2.83274L2.94081 27.5815L0.918621 25.5593L25.6674 0.810547Z" fill="#1C71B8"/></svg>'

        self.btnClose.addEventListener('click', self.removePopup);
    }

    self.createSliderMinPhoto = function () {
        self.wrMinPhoto = document.createElement('div');
        self.wrMinPhoto.classList.add('sliderWrapperMinContent');

        self.btnPrev = document.createElement('div');
        self.btnPrev.classList.add('sliderMinNavigationBtnRrev');
        self.btnPrev.innerHTML = '<svg width="26" viewBox="0 0 57 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M55.4902 26.905C55.8767 27.2915 56.0698 27.7745 56.0698 28.3059C56.0698 28.8373 55.8767 29.3204 55.4902 29.7069C54.7172 30.4799 53.4612 30.4799 52.6883 29.7069L28.0505 5.06922L3.41289 29.7069C2.63995 30.4799 1.3839 30.4799 0.61096 29.7069C-0.161987 28.934 -0.161987 27.6779 0.61096 26.905L26.6496 0.866361C27.4225 0.0933738 28.6785 0.0933738 29.4515 0.866361L55.4902 26.905Z" fill="#1C71B8" /></svg>'

        self.btnNext = document.createElement('div');
        self.btnNext.classList.add('sliderMinNavigationBtnNext');
        self.btnNext.innerHTML = '<svg width="26" viewBox="0 0 57 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.579625 3.38165C0.19317 2.99517 -2.01327e-05 2.51208 -2.01327e-05 1.98068C-2.01327e-05 1.44927 0.19317 0.966185 0.579625 0.579707C1.35261 -0.193236 2.60865 -0.193236 3.38156 0.579707L28.0193 25.2174L52.6569 0.579707C53.4299 -0.193236 54.6859 -0.193236 55.4589 0.579707C56.2318 1.35265 56.2318 2.6087 55.4589 3.38165L29.4202 29.4203C28.6473 30.1932 27.3913 30.1932 26.6183 29.4203L0.579625 3.38165Z" fill="#1C71B8" /></svg>'

        var container = document.createElement('div');
        container.classList.add('sliderMinContainer');
        container.classList.add('swiper-container');

        var wrapper = document.createElement('div');
        wrapper.classList.add('sliderMinWrapper');
        wrapper.classList.add('swiper-wrapper');

        for (let i = 0; i < self.srcList.length; i++) {
            var slide = document.createElement('div');
            slide.classList.add('sliderMinSlide');
            slide.classList.add('swiper-slide');

            var img =  document.createElement('img');
            img.src = self.srcList[i];

            slide.append(img);
            wrapper.append(slide);
        }

        container.append(wrapper);
        self.wrMinPhoto.append(self.btnPrev);
        self.wrMinPhoto.append(container);
        self.wrMinPhoto.append(self.btnNext);

        setTimeout(function () {
            self.slider_2 = new Swiper ('.sliderMinContainer', {
                speed: 600,
                spaceBetween: 15,
                simulateTouch: false,
                direction: 'vertical',
                slidesPerView: 'auto',
                initialSlide: self.ind,
            });
        },10)
    }

    self.createSliderBigPhoto = function () {
        self.wrBigPhoto = document.createElement('div');
        self.wrBigPhoto.classList.add('sliderWrapperBigContent');

        var btnPrev = document.createElement('div');
        btnPrev.classList.add('sliderBigNavigationBtnRrev');
        btnPrev.innerHTML = '<svg width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4154 3.23076C16.1539 2.4923 16.1539 1.2923 15.4154 0.553839C15.0462 0.184608 14.5846 -5.72205e-06 14.0769 -5.72205e-06C13.6154 -5.72205e-06 13.1077 0.184608 12.7385 0.553839L0.553854 12.7385C0.184624 13.1077 5.72205e-06 13.5692 5.72205e-06 14.0769C5.72205e-06 14.5846 0.184624 15.0461 0.553854 15.4154L12.7385 27.6C13.4769 28.3385 14.6769 28.3385 15.4154 27.6C16.1539 26.8615 16.1539 25.6615 15.4154 24.9231L4.56924 14.0769L15.4154 3.23076Z" fill="#1C71B8" /></svg>';

        var btnNext = document.createElement('div');
        btnNext.classList.add('sliderBigNavigationBtnNext');
        btnNext.innerHTML = '<svg width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.553846 24.9231C-0.184615 25.6615 -0.184615 26.8615 0.553846 27.6C0.923077 27.9692 1.38462 28.1538 1.89231 28.1538C2.35385 28.1538 2.86154 27.9692 3.23077 27.6L15.4154 15.4154C15.7846 15.0462 15.9692 14.5846 15.9692 14.0769C15.9692 13.5692 15.7846 13.1077 15.4154 12.7385L3.23077 0.553846C2.49231 -0.184615 1.29231 -0.184615 0.553846 0.553846C-0.184615 1.29231 -0.184615 2.49231 0.553846 3.23077L11.4 14.0769L0.553846 24.9231Z" fill="#1C71B8" /></svg>'

        var container = document.createElement('div');
        container.classList.add('sliderBigContainer');
        container.classList.add('swiper-container');

        var wrapper = document.createElement('div');
        wrapper.classList.add('sliderBigWrapper');
        wrapper.classList.add('swiper-wrapper');

        for (let i = 0; i < self.srcList.length; i++) {
            var slide = document.createElement('div');
            slide.classList.add('sliderBigSlide');
            slide.classList.add('swiper-slide');

            var img =  document.createElement('img');
            img.src = self.srcList[i];

            slide.append(img);
            wrapper.append(slide);
        }

        container.append(wrapper);
        self.wrBigPhoto.append(btnPrev);
        self.wrBigPhoto.append(container);
        self.wrBigPhoto.append(btnNext);

        setTimeout(function () {
            self.slider_1 = new Swiper ('.sliderBigContainer', {
                speed: 600,
                spaceBetween: 15,
                initialSlide: self.ind,

                on: {
                    init: function () {
                        self.activeSlide(this.activeIndex);
                    },
                    slideChange: function () {
                        self.activeSlide(this.activeIndex);
                    }
                },

                navigation: {
                    prevEl: '.sliderBigNavigationBtnRrev',
                    nextEl: '.sliderBigNavigationBtnNext'
                }
            });
        },10);
    }

    self.activeSlide = function (ind) {
        var _s = this;
        _s.ind = ind;

        for (let i = 0; i < self.slider_2.slides.length; i++) {
            self.slider_2.slides[i].classList.remove('slide-active');
        }

        self.slider_2.slides[_s.ind].classList.add('slide-active');
        self.slider_2.slideTo(_s.ind);

        self.btnPrev.classList.remove('swiper-button-disabled');
        self.btnNext.classList.remove('swiper-button-disabled');

        if (_s.ind == self.slider_2.slides.length - 1) {
            self.btnNext.classList.add('swiper-button-disabled');
        }

        if (_s.ind == 0) {
            self.btnPrev.classList.add('swiper-button-disabled');
        }
    }

    self.init = function () {
        self.createTitle();
        self.createButtonClose();
        self.createHeader();
        self.createSliderMinPhoto();
        self.createSliderBigPhoto();
        self.createBody();
        self.createPopup();
        setTimeout(function () {
            new GroupSliders(self.slider_1,self.slider_2,self.btnPrev,self.btnNext);
            self.popup.style.opacity = '1';
        },10)
    }

    self.init();
}


document.addEventListener("DOMContentLoaded", function () {
    new Tab('.detail-tabs');

    var srcArray = [];

    if (document.querySelectorAll('.photo-slide img').length) {
        var img = document.querySelectorAll('.photo-slide img');

        for (let i = 0; i < img.length; i++) {
            srcArray.push(img[i].dataset.zoom);
        }
    }

    var slider_1 = null;
    var slider_2 = null;

    var btnPrev = null;
    var btnNext = null;

    if (document.querySelector('#photoSliderContainer')) {
        slider_1 = new Swiper ('#photoSliderContainer', {
            speed: 600,
            spaceBetween: 15,
            on: {
                slideChange: function () {
                    activeSlide(this.activeIndex,btnPrev,btnNext);
                }
            }
        });

        function showSliderPopup(slider,srcArr) {
            var _s = this;
            _s.slider = slider;
            _s.src = srcArr;
            if (window.innerWidth > 991) {
                for (let i = 0; i < _s.slider.slides.length; i++) {
                    _s.slider.slides[i].addEventListener('click', function () {
                        new PopupSlider(_s.src, i);
                    });
                }
            }
        }

        showSliderPopup(slider_1,srcArray);
    }

    if (document.querySelector('#minPhotoSliderContainer')) {
        slider_2 = new Swiper ('#minPhotoSliderContainer', {
            speed: 600,
            spaceBetween: 10,
            simulateTouch: false,
            breakpoints: {
                320: {
                    slidesPerView: 3,
                },
                400: {
                    slidesPerView: 4,
                },
                480: {
                    slidesPerView: 5,
                }
            }
        });
    }

    function activeSlide(ind,btnPrev,btnNext) {
        var _s = this;
        _s.ind = ind;
        _s.btnPrev = btnPrev;
        _s.btnNext = btnNext;

        for (let i = 0; i < slider_2.slides.length; i++) {
            slider_2.slides[i].classList.remove('slide-active');
        }

        slider_2.slides[_s.ind].classList.add('slide-active');
        slider_2.slideTo(_s.ind);

        if (_s.btnPrev && _s.btnNext) {
            _s.btnPrev.classList.remove('swiper-button-disabled');
            _s.btnNext.classList.remove('swiper-button-disabled');

            if (_s.ind == slider_2.slides.length - 1) {
                _s.btnNext.classList.add('swiper-button-disabled');
            }

            if (_s.ind == 0) {
                _s.btnPrev.classList.add('swiper-button-disabled');
            }
        }
    }

//init btnPrev btnNext
    if (document.getElementById('minPhotoPrev') && document.getElementById('minPhotoNext')) {
        btnPrev = document.getElementById('minPhotoPrev');
        btnNext = document.getElementById('minPhotoNext');

        //show button slider
        function showButton() {
            var navigation = document.querySelectorAll('.min-photo-slider-navigation');

            function show() {
                btnPrev.style.display = "flex";
                btnNext.style.display = "flex";
                btnPrev.classList.remove("right");
            }

            function hide() {
                btnPrev.style.display = "none";
                btnNext.style.display = "none";
                btnPrev.classList.add("right");
            }

            function test() {
                if (window.innerWidth > 991 && slider_1.slides.length > 5) {
                    show();
                } else if (window.innerWidth <= 991 && slider_1.slides.length > 5) {
                    show();
                } else {
                    hide();
                }
            }

            test();
        }

        showButton();

        window.addEventListener('resize', showButton);
    }

//init GroupSliders
    if (slider_1 && slider_2) {
        new GroupSliders(slider_1,slider_2,btnPrev,btnNext);

        activeSlide(slider_1.activeIndex,btnPrev,btnNext);
    }

    if (document.querySelectorAll('.photo-goods-card img').length) {
        function showDrift() {
            let img = document.querySelectorAll('.photo-goods-card img');

            if (window.innerWidth > 1024 && !isMobile.any()) {
                for (let i = 0; i < img.length; i++) {
                    img[i].drift = new Drift(img[i], {
                        paneContainer: document.querySelector('.detail-zoom'),
                        inlinePane: 900,
                        inlineOffsetY: -85,
                        containInline: true,
                        hoverBoundingBox: true,
                        zoomFactor: 4,
                    });
                }
            }
        }

        showDrift();
    }

//popup buyOneClick

    let popupBuyOneClick = new PopupBuyOneClick('[data-popup="buyOneClick"]');

    let btnOpenPopup = document.querySelectorAll('.button-detail-buy-one-click');

    if (btnOpenPopup.length) {
        for (let i = 0; i < btnOpenPopup.length; i++) {
            btnOpenPopup[i].addEventListener('click', function () {
                popupBuyOneClick.open();
            })
        }
    }


// drift zoom

    if (document.querySelectorAll('.photo-slide img').length) {
        function showDrift() {
            let img = document.querySelectorAll('.photo-slide img');

            if (window.innerWidth > 1024) {
                for (let i = 0; i < img.length; i++) {
                    img[i].drift = new Drift(img[i], {
                        paneContainer: document.querySelector('.detail-zoom'),
                        inlinePane: 900,
                        inlineOffsetY: -85,
                        containInline: true,
                        hoverBoundingBox: true,
                        zoomFactor: 4,
                    });
                }
            }
        }

        showDrift();
    }

});

