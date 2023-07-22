const carouselContainer = document.querySelector(".carousel-container");
const testimonialsWrapper = document.querySelector(".testimonials-wrapper");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const pagination = document.querySelector(".pagination");

let currentSlide = 0;

nextButton.addEventListener("click", () => {
    currentSlide++;
    updateCarousel();
});

prevButton.addEventListener("click", () => {
    currentSlide--;
    updateCarousel();
});

function updateCarousel() {
    const slideWidth = carouselContainer.querySelector(".testimonial").offsetWidth;
    testimonialsWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    updatePagination();
}

function updatePagination() {
    const testimonials = document.querySelectorAll(".testimonial");
    const numTestimonials = testimonials.length;

    // Cria a paginacao com os pontos
    pagination.innerHTML = "";
    for (let i = 0; i < numTestimonials; i++) {
        const dot = document.createElement("span");
        dot.addEventListener("click", () => {
            currentSlide = i;
            updateCarousel();
        });
        if (i === currentSlide) {
            dot.classList.add("active");
        }
        pagination.appendChild(dot);
    }

    // Desabilita o botão de avanço quando for o último depoimento
    nextButton.disabled = currentSlide === numTestimonials - 1;
    // Desabilita o botão de voltar quando for o primeiro depoimento
    prevButton.disabled = currentSlide === 0;
}

// Verificar se há espaço suficiente para fazer o efeito de carrossel
function checkCarouselSpace() {
    const carousel = document.querySelector(".testimonials-carousel");
    const testimonials = document.querySelectorAll(".testimonial");
    const carouselWidth = carousel.clientWidth;
    let testimonialsWidth = 0;

    testimonials.forEach(testimonial => {
        testimonialsWidth += testimonial.clientWidth;
    });

    if (testimonialsWidth > carouselWidth) {
        nextButton.style.display = "block";
    } else {
        nextButton.style.display = "none";
    }
}

// Chame a função quando a página for carregada e redimensionada
window.addEventListener("load", () => {
    updateCarousel();
    checkCarouselSpace();
});
window.addEventListener("resize", () => {
    updateCarousel();
    checkCarouselSpace();
});
