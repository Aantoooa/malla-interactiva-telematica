document.addEventListener('DOMContentLoaded', () => {
    const courses = document.querySelectorAll('.course-box');

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
        });
    });
});
