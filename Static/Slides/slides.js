let slides;
let currentSlideId = 0;
let maxSlide = 0;

let slides_ui;
let dot_holder;
let btn_next;
let btn_previous;

let enabled = true;

/// Обновить состояние галереи, чтобы в окне просмотра отображался текущий слайд
function updateUI() {
    // отобразить текущий слайд
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlideId)}%)`;
    });

    // Обновить подпись к элементу
    document.getElementById("slides_caption_text").textContent = slides[currentSlideId].dataset["caption"];

    // Обновить "точки", чтобы была выделена точка, отчечающая за текущий слайд
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => {
            dot.classList.remove("active");
        }
    );
    dots[currentSlideId].classList.add("active");
}

/// Скрыть элементы управления галереей
function hideUI() {
    enabled = false;
    slides_ui.style.opacity = "0.1";
    slides_ui.style.pointerEvents = "none";
}

/// Показать элементы управления галереей
function showUI() {
    enabled = true;
    slides_ui.style.opacity = "1";
    slides_ui.style.pointerEvents = "auto";
}

/// Создать элементы управления галереей и добавить их на страницу
function createUI() {
    slides_ui = document.createElement("div");
    slides_ui.classList.add("slides_ui");

    dot_holder = document.createElement("div");
    dot_holder.id = "dot_holder";

    btn_next = document.createElement("button");
    btn_next.classList.add("btn_next");
    btn_next.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';

    btn_previous = document.createElement("button");
    btn_previous.classList.add("btn_previous");
    btn_previous.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';

    slides_ui.appendChild(dot_holder);
    slides_ui.appendChild(btn_next);
    slides_ui.appendChild(btn_previous);

    document.querySelector(".slides").appendChild(slides_ui);
}

/// Сразу перейти на слайд с указанным индексом
function changeSlide(id) {
    currentSlideId = id;
    updateUI();
}

/// Переключится на соседний слайд вперед или назад
function goToNeighbourSlide(direction) {
    if (direction === "next") {
        if (currentSlideId === maxSlide) {
            currentSlideId = 0;
        } else {
            currentSlideId++;
        }
    } else if (direction === "previous") {
        if (currentSlideId === 0) {
            currentSlideId = maxSlide;
        } else {
            currentSlideId--;
        }
    }

    updateUI();
}

/// Подготовить "точки" для элементов галереи
function createDots() {
    slides.forEach((slide, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.dataset["slide"] = index;
        dot_holder.appendChild(dot);

        dot.addEventListener("click", function () {
            if (!enabled) return;
            changeSlide(index);
        });
    });
}

/// Подготовить галерею для работы
function prepareSlides() {
    // Найти все элементы галереи на странице и записать их в переменную slides
    slides = document.querySelectorAll(".slide");
    // Установить текущий элемент в 0
    currentSlideId = 0;

    // Установить максимальное количество элементов в переменную maxSlide
    maxSlide = slides.length - 1;

    // Для каждого элемента, сдвинуть его на 100% ширины по оси X относительно предыдущего создав
    // эффект 'пояса' слайдов. Первый слайд будет виден сразу.
    slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${indx * 100}%)`;
    });

    createUI();

    btn_next.addEventListener("click", function () {
        if (!enabled) return;
        goToNeighbourSlide("next");
    });

    btn_previous.addEventListener("click", function () {
        if (!enabled) return;
        goToNeighbourSlide("previous");
    });

    // Подключить обработчики событий для видео после подгрузки всех видео
    window.addEventListener("loadYTVideos", function () {
        // Подписаться на событие изменения состояния каждого видео
        window.videos.forEach((video) => {
            video.addEventListener("onStateChange", function (event) {
                if (event.data === YT.PlayerState.PLAYING) {
                    // Когда видео начинает воспроизводиться, скрыть UI
                    hideUI();
                } else {
                    // Когда видео останавливается, показать UI
                    showUI();
                }
            });
        });
    });

    // Добавить "точки" в UI галереи
    createDots();

    // Обновить UI
    updateUI();
}

// Подготовить галерею после загрузки страницы
window.addEventListener("load", prepareSlides);