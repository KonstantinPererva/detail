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
                    slidesPerView: 5,
                },
                360: {
                    slidesPerView: 5,
                },
                992: {
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

