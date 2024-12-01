window.addEventListener('load', function () {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    // Load tasks from localStorage when the page loads
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => createTaskElement(task));

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const task = input.value.trim();
        if (task === '') {
            alert('Please enter a task');
            return;
        }
        createTaskElement(task);

        // Save the task in localStorage
        savedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        input.value = ''; // Clear the input field
    });

    function createTaskElement(task) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');
        task_content_el.appendChild(task_input_el);

        const edit_el = document.createElement('button');
        edit_el.classList.add('edbutton');
        edit_el.textContent = 'Edit';

        const delete_el = document.createElement('button');
        delete_el.classList.add('edbutton');
        delete_el.textContent = 'Delete';

        task_content_el.appendChild(edit_el);
        task_content_el.appendChild(delete_el);
        task_el.appendChild(task_content_el);
        list_el.appendChild(task_el);

        // Edit functionality
        edit_el.addEventListener('click', function () {
            if (task_input_el.hasAttribute('readonly')) {
                task_input_el.removeAttribute('readonly');
                edit_el.textContent = 'Save';
                task_input_el.focus();
            } else {
                task_input_el.setAttribute('readonly', 'readonly');
                edit_el.textContent = 'Edit';

                // Update localStorage with edited task
                const index = savedTasks.indexOf(task);
                if (index !== -1) {
                    savedTasks[index] = task_input_el.value;
                    localStorage.setItem('tasks', JSON.stringify(savedTasks));
                }
            }
        });

        // Delete functionality
        delete_el.addEventListener('click', function () {
            list_el.removeChild(task_el);

            // Remove the task from localStorage
            const index = savedTasks.indexOf(task);
            if (index !== -1) {
                savedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(savedTasks));
            }
        });
    }
});
