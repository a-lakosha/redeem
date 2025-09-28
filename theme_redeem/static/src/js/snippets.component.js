/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.cursorCircle = publicWidget.Widget.extend({
    selector: 'body', // يشتغل على كل الصفحات

    start: function () {
        // إنشاء الدائرة لو مش موجودة
        let circle = document.getElementById('cursor-circle');
        if (!circle) {
            circle = document.createElement('div');
            circle.id = 'cursor-circle';
            document.body.appendChild(circle);
        }

        // تحريك الدائرة بسلاسة
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
