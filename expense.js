document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    
    // Initialize expenses array from local storage or empty array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    // Function to render expenses
    function renderExpenses() {
        // Clear the list first
        expenseList.innerHTML = '';
        
        // Render each expense
        expenses.forEach(function(expense, index) {
            const li = document.createElement('li');
            li.innerHTML = `<span>${expense.text}: $${expense.amount}</span><span class="delete" data-id="${index}">X</span>`;
            expenseList.appendChild(li);
        });
        
        // Save expenses to local storage
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
    
    // Render initial expenses
    renderExpenses();
    
    // Event listener for adding an expense
    expenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = document.getElementById('expense').value;
        const amount = parseFloat(document.getElementById('amount').value);
        
        if(text.trim() && amount) {
            const expense = {
                text,
                amount
            };
            expenses.push(expense);
            renderExpenses();
            expenseForm.reset();
        } else {
            alert('Please enter valid text and amount');
        }
    });
    
    // Event listener for deleting an expense
    expenseList.addEventListener('click', function(e) {
        if(e.target.classList.contains('delete')) {
            const index = e.target.dataset.id;
            expenses.splice(index, 1);
            renderExpenses();
        }
    });
});
