window.addEventListener('load', function () {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => createTaskElement(task.text, task.date));

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const task = input.value.trim();
        const date = new Date().toLocaleDateString(); // Get the current date
        if (task === '') {
            alert('Please enter a task');
            return;
        }
        createTaskElement(task, date);

        // Save the task and date in localStorage
        savedTasks.push({ text: task, date: date });
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        input.value = ''; // Clear the input field
    });

    function createTaskElement(taskText, taskDate) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = `${taskText} (${taskDate})`; // Include task text and date
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

                // Update localStorage with the edited task
                const index = savedTasks.findIndex(item => item.text === taskText && item.date === taskDate);
                if (index !== -1) {
                    savedTasks[index].text = task_input_el.value.replace(` (${taskDate})`, '');
                    localStorage.setItem('tasks', JSON.stringify(savedTasks));
                }
            }
        });

        // Delete functionality
        delete_el.addEventListener('click', function () {
            list_el.removeChild(task_el);

            // Remove the task from localStorage
            const index = savedTasks.findIndex(item => item.text === taskText && item.date === taskDate);
            if (index !== -1) {
                savedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(savedTasks));
            }
        });
    }
});
