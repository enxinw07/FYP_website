document.getElementById('loadCsvBtn').addEventListener('click', loadCsvData);

function loadCsvData() {
    // Path to the CSV file
    const csvFilePath = 'reviews.csv';

    // Fetching the CSV file
    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            const tableBody = document.querySelector('#dataTable tbody');
            tableBody.innerHTML = ''; // Clear any existing data

            // Retrieve the selected prompt from localStorage
            const selectedPrompt = localStorage.getItem('selectedPrompt') || 'Default Prompt: Write a review...';
            const promptText = `Our Prompt: ${selectedPrompt}`;

            // Create a new row to display the prompt
            const promptRow = document.createElement('tr');
            const promptCell = document.createElement('td');
            promptCell.setAttribute('colspan', '4'); // Span across all table columns
            promptCell.textContent = promptText;
            promptCell.style.fontWeight = 'bold'; // Make the prompt text bold
            promptRow.appendChild(promptCell);
            tableBody.appendChild(promptRow);

            const rows = data.split('\n').slice(1); // Skip the header row

            rows.forEach(row => {
                const columns = row.split(',');

                // Creating a new row and adding columns
                const tr = document.createElement('tr');
                columns.forEach(column => {
                    const td = document.createElement('td');
                    td.textContent = column.trim();
                    tr.appendChild(td);
                });

                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error loading CSV data:', error));
}
