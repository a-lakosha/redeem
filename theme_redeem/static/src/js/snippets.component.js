/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.verticalCarousel = publicWidget.Widget.extend({
    selector: '.js_vertical_carousel',

    start: function () {
        this._super.apply(this, arguments);
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoPlayTimer = null;
        this.autoPlayDelay = 4000; // 4 seconds

        this._refreshItems();
        this._bindEvents();
        this._bindEditorEvents();

        if (this.carouselItems.length > 0) {
            this._startAutoPlay();
            this._updateNavigation();
            // Initialize the first slide with proper states
            this._showSlide(this.currentIndex);
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

        // Remove all position classes from all items
        this.carouselItems.removeClass('active pos-1 pos-2 pos-3 pos-minus-1 pos-minus-2 pos-minus-3');

        const totalItems = this.carouselItems.length;

        // Apply position-based classes for smooth transitions
        this.carouselItems.each((itemIndex, item) => {
            const $item = $(item);

            // Calculate relative position from current active index
            let relativePosition = itemIndex - index;

            // Handle circular positioning
            if (relativePosition > totalItems / 2) {
                relativePosition -= totalItems;
            } else if (relativePosition < -totalItems / 2) {
                relativePosition += totalItems;
            }

            // Apply position-based classes
            if (relativePosition === 0) {
                $item.addClass('active');
            } else if (relativePosition === -1) {
                $item.addClass('pos-minus-1');
            } else if (relativePosition === 1) {
                $item.addClass('pos-1');
            } else if (relativePosition === -2) {
                $item.addClass('pos-minus-2');
            } else if (relativePosition === 2) {
                $item.addClass('pos-2');
            } else if (relativePosition <= -3) {
                $item.addClass('pos-minus-3');
            } else if (relativePosition >= 3) {
                $item.addClass('pos-3');
            }
        });

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
    },

    //--------------------------------------------------------------------------
    // Dynamic Item Management
    //--------------------------------------------------------------------------

    /**
     * Refresh carousel items cache
     */
    _refreshItems: function () {
        this.carouselItems = this.$el.find('.vertical-carousel-item');
        this.prevBtn = this.$el.find('.nav-prev');
        this.nextBtn = this.$el.find('.nav-next');
    },

    /**
     * Bind editor-specific events
     */
    _bindEditorEvents: function () {
        // Listen for carousel updates from editor
        this.$el.on('carousel_updated', this._onCarouselUpdated.bind(this));
    },

    /**
     * Handle carousel update from editor
     */
    _onCarouselUpdated: function () {
        this._refreshItems();

        // Ensure current index is valid
        if (this.currentIndex >= this.carouselItems.length) {
            this.currentIndex = 0;
        }

        // Restart with new items
        this._clearAutoPlay();
        if (this.carouselItems.length > 0) {
            this._showSlide(this.currentIndex);
            this._startAutoPlay();
            this._updateNavigation();
        }
    },

    /**
     * Add new carousel item
     */
    addCarouselItem: function (stepData) {
        const newIndex = this.carouselItems.length + 1;
        const stepNumber = String(newIndex).padStart(2, '0');

        const newItemHtml = `
            <div class="vertical-carousel-item" data-step="${newIndex}">
                <div class="step-number">${stepNumber}</div>
                <h3 class="step-title">${stepData.title || 'New Step Title'}</h3>
                <p class="step-description">${stepData.description || 'Add your step description here.'}</p>
            </div>
        `;

        this.$el.find('.vertical-carousel').append(newItemHtml);
        this._onCarouselUpdated();
    },

    /**
     * Remove carousel item by index
     */
    removeCarouselItem: function (index) {
        if (this.carouselItems.length > 1 && index < this.carouselItems.length) {
            $(this.carouselItems[index]).remove();
            this._updateItemNumbers();
            this._onCarouselUpdated();
        }
    },

    /**
     * Move item up in order
     */
    moveItemUp: function (index) {
        if (index > 0) {
            const $item = $(this.carouselItems[index]);
            const $prevItem = $(this.carouselItems[index - 1]);
            $item.insertBefore($prevItem);
            this._updateItemNumbers();
            this._onCarouselUpdated();
        }
    },

    /**
     * Move item down in order
     */
    moveItemDown: function (index) {
        if (index < this.carouselItems.length - 1) {
            const $item = $(this.carouselItems[index]);
            const $nextItem = $(this.carouselItems[index + 1]);
            $item.insertAfter($nextItem);
            this._updateItemNumbers();
            this._onCarouselUpdated();
        }
    },

    /**
     * Update step numbers after reordering
     */
    _updateItemNumbers: function () {
        this._refreshItems();
        this.carouselItems.each((index, item) => {
            const $item = $(item);
            const stepNumber = String(index + 1).padStart(2, '0');
            $item.attr('data-step', index + 1);
            $item.find('.step-number').text(stepNumber);
        });
    },

    /**
     * Toggle auto-play
     */
    toggleAutoPlay: function (enabled) {
        if (enabled) {
            this._startAutoPlay();
        } else {
            this._clearAutoPlay();
        }
    },

    /**
     * Set animation speed
     */
    setAnimationSpeed: function (speed) {
        this.autoPlayDelay = parseInt(speed) || 4000;
        if (this.autoPlayTimer) {
            this._clearAutoPlay();
            this._startAutoPlay();
        }
    }
});
