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

const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const polaroid = {
    controls: {
        arrows: {
            [ARROW_LEFT]: 'prev',
            [ARROW_RIGHT]: 'next'
        }
    },
    state: {
        open: false,
        count: 0,
    },
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
            polaroid.actions.reveal(href, caption);
            polaroid.elements.modal.showModal();
            polaroid.state.open = true;

            const [_images, section, category, name] = href.split('/');
            let path = name.endsWith('.webp') ? [section, category] : [section, category, name];
            path = path.join('/');
            const images = document.querySelectorAll(`section img[src*="${path}"]`);

            polaroid.state.count = images.length;
        },
        close() {
            polaroid.elements.modal.close();
            polaroid.state.open = false;
            polaroid.state.count = 0;
        },
        carousel: {
            getCurrentImageNumber(image) {
                const number = Number(image.split('/').pop().split('.')[0].split('-').pop());
                
                return number;
            },
            getNewImage(image, from, to) {
                const newImage = image.replace(`-${from}.`, `-${to}.`);
    
                return newImage;
            },
            rotate(to) {
                if (!polaroid.state.open) return;
    
                let img = polaroid.elements.img.src;
                const current = polaroid.actions.carousel.getCurrentImageNumber(img);
    
                const next = current + 1 > polaroid.state.count ? 1 : current + 1;
                const prev = current - 1 < 1 ? polaroid.state.count : current - 1;
                const actions = {next, prev};
    
                img = polaroid.actions.carousel.getNewImage(img, current, actions[to]);
                polaroid.actions.reveal(img, polaroid.captions.loaded);
            }
        },
    },
    events: {
        check(e) {
            const element = e.target;
            const clickable = element.classList.contains('clickable');
            if (clickable) {
                const image = element.querySelector('img');
                const href = image.dataset.href;
                const alt = image.alt;
                polaroid.actions.open(href, alt);
            }

            const key = e.keyCode;
            if(polaroid.controls.arrows[key]){
                const action = polaroid.controls.arrows[key];
                polaroid.actions.carousel.rotate(action);
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
            document.addEventListener('keydown', polaroid.events.check);
            
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