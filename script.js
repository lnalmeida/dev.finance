const Modal = {
    open() {
        //Abrir modal
        //adiciona a classe active ao modal
        document
        .querySelector('.modal-overlay')
        .classList.add('active')
    },

    close() {
        //Fechar o modal
        //remove a classe active do modal
        document
        .querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -30000,
        date: '05/01/2021',
    },

    {
        id: 2,
        description: 'Desenvolvimento de Site',
        amount: 500000,
        date: '05/01/2021',
    },

    {
        id: 3,
        description: 'Aluguel',
        amount: -110000,
        date: '05/01/2021',
    },

    {
        id: 4,
        description: 'Internet',
        amount: -20000,
        date: '05/01/2021',
    }
]

const Transaction = {

    incomes() {
        //Soma as entradas
        let totalIncomes = 0
        totalIncomes = transaction.amount > 0 ? transactions.reduce(totalIncomes, transaction.amount) : 0
        return totalIncomes
    },

    expenses() {
        //Somar as saídas
    },

    total() {
        //Subtrai as saidas das entradas
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : '+'
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return signal +' '+ value
    }
}

const DOM =  {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    

    innerHTMLTransaction(transaction) {

        const cssClass = transaction.amount > 0 ? 'income' : 'expense'
    
        const html = `
                <td class="description">${transaction.description}</td>
                <td class=${cssClass}> ${Utils.formatCurrency(transaction.amount)}</td>
                <td class="date">${transaction.date}</td>
                <td>
                    <a href="#">
                        <img src="./assets//minus.svg" alt="Remover Transação" />
                    </a>
                </td>
        `
    return html
    }

}

transactions.forEach(transaction => {
    DOM.addTransaction(transaction)
})

console.log(Transaction.incomes())
    