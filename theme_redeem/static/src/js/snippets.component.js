/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.cursorCircle = publicWidget.Widget.extend({
    selector: 'body',

    start: function () {
        let circle = document.getElementById('cursor-circle');
        if (!circle) {
            circle = document.createElement('div');
            circle.id = 'cursor-circle';
            document.body.appendChild(circle);
        }

        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.pageX;
            mouseY = e.pageY;
        });

        function moveCircle() {
            circle.style.left = mouseX - 15 + 'px';
            circle.style.top = mouseY - 15 + 'px';
            requestAnimationFrame(moveCircle);
        }

        moveCircle();
    }
});

publicWidget.registry.verticalCarousel = publicWidget.Widget.extend({
    selector: '.js_vertical_carousel',

    start: function () {
        this._super.apply(this, arguments);
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoPlayTimer = null;
        this.autoPlayDelay = 4000; // 4 seconds

        this.carouselItems = this.$el.find('.carousel-item');
        this.prevBtn = this.$el.find('.nav-prev');
        this.nextBtn = this.$el.find('.nav-next');

        if (this.carouselItems.length > 0) {
            this._bindEvents();
            this._startAutoPlay();
            this._updateNavigation();
        }

        return Promise.resolve();
    },

    _bindEvents: function () {
        // Navigation button events
        this.prevBtn.on('click', this._goToPrevious.bind(this));
        this.nextBtn.on('click', this._goToNext.bind(this));

        // Pause auto-play on hover
        this.$el.on('mouseenter', this._pauseAutoPlay.bind(this));
        this.$el.on('mouseleave', this._resumeAutoPlay.bind(this));

        // Keyboard navigation
        $(document).on('keydown', this._handleKeyboard.bind(this));

        // Touch/swipe support
        this._bindTouchEvents();
    },

    _bindTouchEvents: function () {
        let startY = 0;
        let endY = 0;
        const threshold = 50;

        this.$el.on('touchstart', function (e) {
            startY = e.originalEvent.touches[0].clientY;
        });

        this.$el.on('touchend', function (e) {
            endY = e.originalEvent.changedTouches[0].clientY;
            const deltaY = startY - endY;

            if (Math.abs(deltaY) > threshold) {
                if (deltaY > 0) {
                    // Swiped up - go to next
                    this._goToNext();
                } else {
                    // Swiped down - go to previous
                    this._goToPrevious();
                }
            }
        }.bind(this));
    },

    _handleKeyboard: function (e) {
        // Only handle keyboard events when carousel is in viewport
        if (!this._isInViewport()) return;

        switch (e.keyCode) {
            case 38: // Up arrow
                e.preventDefault();
                this._goToPrevious();
                break;
            case 40: // Down arrow
                e.preventDefault();
                this._goToNext();
                break;
        }
    },

    _isInViewport: function () {
        const rect = this.$el[0].getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    _goToPrevious: function () {
        if (this.isAnimating) return;

        this.currentIndex = this.currentIndex === 0 ? this.carouselItems.length - 1 : this.currentIndex - 1;
        this._showSlide(this.currentIndex);
    },

    _goToNext: function () {
        if (this.isAnimating) return;

        this.currentIndex = this.currentIndex === this.carouselItems.length - 1 ? 0 : this.currentIndex + 1;
        this._showSlide(this.currentIndex);
    },

    _showSlide: function (index) {
        if (this.isAnimating) return;

        this.isAnimating = true;

        // Remove active class from all items
        this.carouselItems.removeClass('active');

        // Add active class to current item
        $(this.carouselItems[index]).addClass('active');

        // Update navigation state
        this._updateNavigation();

        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    },

    _updateNavigation: function () {
        // Update ARIA labels for accessibility
        this.prevBtn.attr('aria-label', 'Previous step');
        this.nextBtn.attr('aria-label', 'Next step');

        // Update button states (optional - remove if you want circular navigation)
        // this.prevBtn.prop('disabled', this.currentIndex === 0);
        // this.nextBtn.prop('disabled', this.currentIndex === this.carouselItems.length - 1);
    },

    _startAutoPlay: function () {
        this._clearAutoPlay();
        this.autoPlayTimer = setInterval(() => {
            this._goToNext();
        }, this.autoPlayDelay);
    },

    _pauseAutoPlay: function () {
        this._clearAutoPlay();
    },

    _resumeAutoPlay: function () {
        this._startAutoPlay();
    },

    _clearAutoPlay: function () {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    },

    destroy: function () {
        this._clearAutoPlay();
        $(document).off('keydown', this._handleKeyboard.bind(this));
        this._super.apply(this, arguments);
    }
});
