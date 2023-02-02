/* 2023-01-31 김찬기 만듬 */
export default class InputRange {
    constructor(el, options, callBack) {
        this.input = el;

        //default
        this.label = false;
        this.min = this.input.min ? Number(this.input.min) : 0;
        this.max = this.input.max ? Number(this.input.max) : 1;
        this.step = this.input.step ? Number(this.input.step) : null;
        this.ticks = false;
        this.unit = '';
        this.callBack = callBack;

        if (options) {
            Object.entries(options).map(([key, value]) => (this[key] = value));
        }

        this.init();
        this.init_apperance();
        this.event();
    }

    init() {
        if (!this.input.value) {
            this.input.value = 0;
        }

        if (this.max) {
            this.input.max = this.max;
        }

        if (this.min) {
            this.input.min = this.min;
        }
    }

    init_apperance() {
        //container 만들기
        this.generateContainer();

        //라벨 만들기
        this.label && this.renderLabel();

        //눈금 만들기
        this.ticks && this.renderTicks();
    }

    generateContainer() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('custom-range-wrapper');

        this.input.parentNode.insertBefore(this.wrapper, this.input);
        this.wrapper.appendChild(this.input);
    }

    renderLabel() {
        this.labelEl = document.createElement('label');
        this.labelEl.classList.add('label');

        this.labelEl.innerHTML = `${this.get()} ${this.unit}`;
        this.wrapper.appendChild(this.labelEl);

        //첫 value로 셋팅
        this.set(this.input.value);
    }

    renderTicks() {
        const ticks = [];
        const step = this.step ? this.step : this.max;

        for (let i = 0; i <= this.max; i = i + step) {
            ticks.push(i);
        }

        const lists = ticks.map(
            (item) => `<li class="tick-item" data-value="${item}">${item}${this.unit}</li>`
        );
        const ul = document.createElement('ul');

        ul.classList.add('range-ticks');
        ul.innerHTML = lists.join('');
        ul.querySelectorAll('.tick-item').forEach((item) => {
            const value = item.dataset.value;
            const percent = (value / this.max) * 100;
            item.style.left = `${percent}%`;

            item.addEventListener('click', (e) => {
                this.set(value);
                this.callBack(value);
            });
        });

        this.wrapper.appendChild(ul);
    }

    get() {
        return this.input.value;
    }

    getPercent() {
        return (this.input.value / this.max) * 100;
    }

    set(value) {
        this.input.value = value;

        const percent = this.getPercent();
        this.input.style.background = `linear-gradient(to right, #2F27AF 0%, #2F27AF ${percent}%, #eee ${percent}%, #eee 100%)`;
        this.labelEl.innerHTML = `${value} ${this.unit}`;
        this.labelEl.style.left = `${percent}%`;
    }

    event() {
        this.input.addEventListener('input', (e) => {
            this.set(e.target.value);
        });
    }

    detory() {
        this.wrapper.remove();
    }
}
