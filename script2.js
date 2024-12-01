window.addEventListener('load', function () {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const task = input.value.trim(); // Trim to remove extra spaces
        if (task === '') {
            alert('Please enter a task');
            return;
        }

        // Create task element
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        // Task content container
        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');
        task_el.appendChild(task_content_el);

        // Input field for the task
        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');
        task_content_el.appendChild(task_input_el);

        // Edit button
        const edit_el = document.createElement('button');
        edit_el.classList.add('edbutton');
        edit_el.textContent = 'Edit';
        task_content_el.appendChild(edit_el);

        // Delete button
        const delete_el = document.createElement('button');
        delete_el.classList.add('edbutton');
        delete_el.textContent = 'Delete';
        task_content_el.appendChild(delete_el);

        // Add task to the list
        list_el.appendChild(task_el);

        // Attach event listeners to the current buttons

        // Edit functionality
        edit_el.addEventListener('click', function () {
            if (task_input_el.hasAttribute('readonly')) {
                task_input_el.removeAttribute('readonly'); // Enable editing
                task_input_el.focus(); // Automatically focus input field
                edit_el.textContent = 'Save'; // Change button text to "Save"
            } else {
                task_input_el.setAttribute('readonly', 'readonly'); // Make input readonly again
                edit_el.textContent = 'Edit'; // Change button text back to "Edit"
            }
        });

        // Delete functionality
        delete_el.addEventListener('click', function () {
            list_el.removeChild(task_el);
        });

        // Clear the input field after adding a task
        input.value = '';
    });
});
