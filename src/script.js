const loader = {
    delays: {
        exit: 1000,
        remove: 500
    },
    element: document.querySelector('[data-loading]'),
    remove() {
        loader.element.dataset.loading = false
        setTimeout(() => loader.element.remove(), loader.delays.remove);
    },
    exit() {
        loader.element.dataset.loading = true
        setTimeout(loader.remove, loader.delays.exit);
    },
    start() {
        window.addEventListener('load', loader.exit);
    }
}
loader.start();

const polaroid = {
    elements: {
        modal: modal,
        figure: modal.querySelector('figure'),
        img: modal.querySelector('img'),
        close: modal.querySelector('button')
    },
    captions: {
        loading: 'Carregando...',
        loaded: ''
    },
    actions: {
        loaded() {
            polaroid.elements.figure.dataset.alt = polaroid.captions.loaded;
        },
        reveal(href, caption) {
            polaroid.captions.loaded = caption;
            polaroid.elements.img.src = href
        },
        clear() {
            polaroid.elements.img.src = '';
            polaroid.elements.figure.dataset.alt = polaroid.captions.loading;
        },
        open(href, caption) {
            polaroid.actions.reveal(href, caption),
            polaroid.elements.modal.showModal();
        },
        close() {
            polaroid.elements.modal.close();
        },
    },
    events: {
        check(e) {
            const href = e.target.dataset.href;
            if (href) {
                const alt = e.target.alt;
                polaroid.actions.open(href, alt);
            }
        },
        backdrop(e) {
            const rect = e.target.getBoundingClientRect();
            const { top, right, bottom, left } = rect;
            const clickedOutside = top == 0 || right == 0 || bottom == 0  || left == 0;
            if (clickedOutside) {
                polaroid.actions.close();
            }
        },
        bind() {
            document.addEventListener('click', polaroid.events.check);
            
            const { modal, img, close } = polaroid.elements;
            modal.addEventListener('close', polaroid.actions.clear);
            modal.addEventListener('click', polaroid.events.backdrop);
            img.addEventListener('load', polaroid.actions.loaded);
            close.addEventListener('click', polaroid.actions.close);
        }
    },
    start() {
       polaroid.events.bind();
    }
};

polaroid.start();