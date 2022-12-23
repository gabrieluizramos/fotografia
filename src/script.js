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
        bind() {
            document.addEventListener('click', polaroid.events.check);
            polaroid.elements.close.addEventListener('click', polaroid.actions.close);
            polaroid.elements.img.addEventListener('load', polaroid.actions.loaded);
            polaroid.elements.modal.addEventListener('close', polaroid.actions.clear);
        }
    },
    start() {
       polaroid.events.bind();
    }
};

polaroid.start();