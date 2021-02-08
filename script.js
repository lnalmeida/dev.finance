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
        description: 'Criação App',
        amount: -20000,
        date: '05/01/2021',
    },

]

const Transaction = {

    all: transactions,

    add(transaction){
        this.all.push(transaction)

        App.reload()
    },

    incomes() {
        let incomes = 0
        //pegar todas as transações
        this.all.forEach(transaction => {
            //para cada transação maior que 0, 
            if(transaction.amount > 0) {
                //somar essa transação a uma variável
                incomes += transaction.amount
            }
            
        })
       //retornar a variável
       return incomes
    },

    expenses() {
        //Somar as saídas
        let expenses = 0
        //pegar todas as transações
        this.all.forEach(transaction => {
            //para cada transação maior que 0, 
            if(transaction.amount < 0) {
                //somar essa transação a uma variável
                expenses += transaction.amount
            }
            
        })
        return expenses
    },

    total() {
        //Subtrai as saidas das entradas
        //pegar o total de Entradas
        let totalIncomes = this.incomes()
        //pegar o total de saidas
        let totalExpenses = this.expenses()
        //subtrair saidas de Entradas
        let total = (totalIncomes + totalExpenses)
        //retornar variável 
        return total
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

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
    },

    reload() {
        DOM.clearTransactions()
        App.init()
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
    },

    colorBalance() {
        
        let cssClass = ''
            
        if (Transaction.total() > 0 ) {
               document.querySelector('.card.total').classList.remove('negative')
               cssClass = 'positive' 
            }  
            else {
                document.querySelector('.card.total').classList.remove('positive')
                cssClass = 'negative'
            }

            document.querySelector('.card.total').classList.add(cssClass)
                
    },

    updateBalance() {

        this.colorBalance()
        
        const incomeDisplay = document.getElementById('incomeDisplay')
        const expenseDisplay = document.getElementById('expenseDisplay')
        const totalDisplay = document.getElementById('totalDisplay')
        
        incomeDisplay.innerHTML = Utils.formatCurrency(Transaction.incomes())
        expenseDisplay.innerHTML = Utils.formatCurrency(Transaction.expenses())
        totalDisplay.innerHTML = Utils.formatCurrency(Transaction.total())

        
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }

}

App.init()

Transaction.add(
     {
         id: 5,
         description: 'Equipamentos',
         amount: -700000,
         date: '05/01/2021',
     }
)

Transaction.add(
    {
         id: 6,
         description: 'Consultoria',
         amount: 400000,
         date: '07/01/2021',
     }
)

App.reload()

    