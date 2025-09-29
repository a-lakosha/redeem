/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Plugin } from "@html_editor/plugin";
import { BuilderAction } from "@html_builder/core/builder_action";
import { withSequence } from "@html_editor/utils/resource";
import { SNIPPET_SPECIFIC, SNIPPET_SPECIFIC_END } from "@html_builder/utils/option_sequence";

// Utility functions for vertical carousel management
function updateItemNumbers(carouselEl) {
    const items = carouselEl.querySelectorAll('.vertical-carousel-item');
    items.forEach((item, index) => {
        const stepNumber = String(index + 1).padStart(2, '0');
        item.setAttribute('data-step', index + 1);
        const stepNumberEl = item.querySelector('.step-number');
        if (stepNumberEl) {
            stepNumberEl.textContent = stepNumber;
        }
    });
}

function triggerUpdate(carouselEl) {
    // Trigger carousel widget update
    carouselEl.dispatchEvent(new CustomEvent('carousel_updated'));
    
    // Reset position classes
    const items = carouselEl.querySelectorAll('.vertical-carousel-item');
    items.forEach(item => {
        item.classList.remove('active', 'pos-1', 'pos-2', 'pos-3', 'pos-minus-1', 'pos-minus-2', 'pos-minus-3');
    });
    
    // Set first item as active
    if (items.length > 0) {
        items[0].classList.add('active');
    }
}

class VerticalCarouselOption extends Plugin {
    static id = "verticalCarouselOption";
    static dependencies = [
        "dom",
        "history",
        "operation",
        "selection",
        "builderOptions",
    ];

    resources = {
        builder_options: [
            withSequence(SNIPPET_SPECIFIC, {
                template: "theme_redeem.VerticalCarouselItemsOption",
                selector: ".js_vertical_carousel",
            }),
        ],
        builder_actions: {
            AddCarouselItemAction,
            RemoveCarouselItemAction,
            SetCarouselSpeedAction,
        },
        on_snippet_dropped_handlers: ({ snippetEl }) => {
            updateItemNumbers(snippetEl);
        },
        on_cloned_handlers: ({ cloneEl }) => {
            updateItemNumbers(cloneEl);
        },
    };
}

export class AddCarouselItemAction extends BuilderAction {
    static id = "addCarouselItem";

    apply({ editingElement }) {
        const items = editingElement.querySelectorAll('.vertical-carousel-item');
        const newIndex = items.length + 1;
        const stepNumber = String(newIndex).padStart(2, '0');
        
        const newItemHtml = `
            <div class="vertical-carousel-item" data-step="${newIndex}" data-js="VerticalCarouselItem">
                <div class="step-number">${stepNumber}</div>
                <h3 class="step-title">New Step Title</h3>
                <p class="step-description">Add your step description here.</p>
            </div>
        `;
        
        const carouselContainer = editingElement.querySelector('.vertical-carousel');
        if (carouselContainer) {
            carouselContainer.insertAdjacentHTML('beforeend', newItemHtml);
            updateItemNumbers(editingElement);
            triggerUpdate(editingElement);
        }
    }
}

export class RemoveCarouselItemAction extends BuilderAction {
    static id = "removeCarouselItem";

    apply({ editingElement }) {
        const items = editingElement.querySelectorAll('.vertical-carousel-item');
        if (items.length > 1) {
            const lastItem = items[items.length - 1];
            lastItem.remove();
            updateItemNumbers(editingElement);
            triggerUpdate(editingElement);
        }
    }
}

export class SetCarouselSpeedAction extends BuilderAction {
    static id = "setVerticalCarouselSpeed";
    
    apply({ editingElement, value }) {
        // Find the carousel widget and update its speed
        const widgetEl = editingElement.querySelector('.js_vertical_carousel');
        if (widgetEl) {
            widgetEl.dataset.carouselSpeed = value * 1000;
        }
    }
    
    getValue({ editingElement }) {
        const widgetEl = editingElement.querySelector('.js_vertical_carousel');
        return widgetEl ? (parseInt(widgetEl.dataset.carouselSpeed) || 4000) / 1000 : 4;
    }
}

registry.category("website-plugins").add(VerticalCarouselOption.id, VerticalCarouselOption);