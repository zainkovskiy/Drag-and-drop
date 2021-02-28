function drop() {
    const block = document.querySelector('.product');
    const item = block.querySelectorAll('.item');

    for (const elem of item) {
        elem.draggable = true;
    }

    block.addEventListener('dragstart', (event) => {
        event.target.classList.add('select');
    })

    block.addEventListener('dragend', (event) => {
        event.target.classList.remove('select');
    })

    block.addEventListener('dragover', (event) => {
        event.preventDefault();
        const activeElem = block.querySelector('.select');
        let currentElem = event.target;

        if (event.target.tagName !== "DIV") {
            currentElem = currentElem.parentElement;
        }
        const isMoveable = activeElem !== currentElem &&
            currentElem.classList.contains(`item`);

        if (!isMoveable) {
            return;
        }
        const nextElem = (currentElem === activeElem.nextElementSibling) ? currentElem.nextElementSibling : currentElem;

        block.insertBefore(activeElem, nextElem);
    })
}
drop();

class Editor {
    constructor(container = '.product') {
        this.container = container;
        this.data = '';
        this.button = null;
        this.titile = '';
        this.setButton();
        this.setTitle();
    }
    setButton() {
        const block = document.querySelector(this.container);
        block.addEventListener('click', event => {
            if (event.target.tagName === 'H3' && event.target.dataset.name) {
                this.data = event.target.dataset.name;
                let button_selector = `.${this.data}_btn`;
                this.button = document.querySelector(button_selector);
                this.button.classList.add('btn');
            } else if (this.button === null) {
                return;
            } else {
                this.button.classList.remove('btn');
            }
        })
    }
    setTitle() {
        const block = document.querySelector(this.container);
        block.addEventListener('click', event => {
            if (event.target.tagName === 'INPUT') {
                let title_selector = `.editor_${this.data}`;
                this.title = document.querySelector(title_selector);
                const text = this.title.innerHTML;
                this.button.classList.remove('btn');
                console.log(text);
                // $.ajax({
                //     url: 'server.php',
                //     type: 'POST',
                //     data: 'title =' +text,
                // });
            } else {
                return;
            }
        })
    }
}
new Editor();