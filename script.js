document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const courses = document.querySelectorAll('.course-box');
    const modalOverlay = document.getElementById('course-modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalCredits = document.getElementById('modal-credits');
    const modalType = document.getElementById('modal-type');
    const modalHours = document.getElementById('modal-hours');
    const modalDescription = document.getElementById('modal-description');

    // Función para abrir el modal y llenarlo con datos
    const openModal = (course) => {
        // Obtener el nombre del curso del HTML interno
        const courseName = course.querySelector('strong').nextSibling.textContent.trim();
        modalTitle.textContent = courseName;

        // Llenar el modal con datos de los atributos data-*
        modalCredits.textContent = course.dataset.credits || 'No disponible';
        modalType.textContent = course.dataset.type || 'No disponible';
        modalHours.textContent = course.dataset.hours || 'No disponible';
        modalDescription.textContent = course.dataset.description || 'No hay descripción.';

        // Mostrar el modal
        modalOverlay.classList.add('show-modal');
    };

    // Función para cerrar el modal
    const closeModal = () => {
        modalOverlay.classList.remove('show-modal');
    };

    // Event listener para cada curso
    courses.forEach(course => {
        course.addEventListener('click', () => {
            // 1. Limpiar todos los resaltados previos
            courses.forEach(c => {
                c.classList.remove('selected', 'prerequisite');
            });

            // 2. Resaltar la asignatura seleccionada
            course.classList.add('selected');

            // 3. Obtener y resaltar los prerrequisitos
            const prerequisites = course.dataset.prerequisites;
            if (prerequisites) {
                const prereqArray = prerequisites.split(',');
                prereqArray.forEach(prereqId => {
                    const prereqElement = document.getElementById(prereqId.trim());
                    if (prereqElement) {
                        prereqElement.classList.add('prerequisite');
                    }
                });
            }
            
            // 4. Abrir la ventana modal con la información del curso
            openModal(course);
        });
    });

    // Event listeners para cerrar el modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        // Cierra el modal solo si se hace clic en el fondo oscuro
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
});
