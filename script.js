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

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transaction")) || []
    }, 

    set(transaction) {
        localStorage.setItem("dev.finances:transaction", JSON.stringify(transaction))
    }
}

const Transaction = {

    all: Storage.get(),

    add(transaction){
        this.all.push(transaction)

        App.reload()
    },

    remove(index){
        this.all.splice(index, 1)

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
    formatAmount(value) {
        value = Number(value) * 100
        
        return value
    },

    formatDate(date) {
        date = date.split('-').reverse().join('-').replace(/-/g, '/')

        return date
    },

    formatCurrency(value) {
        let signal = Number(value) < 0 ? '-' : '+' 
        if (Number(value) === 0) {
            signal = ''
        }
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return signal +' '+ value
    }
}

const Form = {
 
 formDescription : document.querySelector('input#description'),
 formAmount : document.querySelector('input#amount'),
 formDate : document.querySelector('input#date'),
 
 getValues() {

        return {
                description: this.formDescription.value,
                amount: this.formAmount.value,
                date: this.formDate.value
        }

    },

    validateFields() {

        const { description, amount, date } = this.getValues()

        if (description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === "") 
        {
                throw new Error('Todos os campos precisam ser preenchidos!')
        }

    },

    formatValues() {
        let { description, amount, date} = this.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    clearForm() {
        this.formDescription.value = ""
        this.formAmount.value = ""
        this.formDate.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            //verificar se todas as infoemaçẽos foram preenchidas
            //this.validateFields()
            
            //formatar os dados pra salvamento
            const transaction = this.formatValues()
            
            //salvar os dados
            Transaction.add(transaction)
            
            //apagar os dados do formulário
            this.clearForm()
            
            //fechar o modal
            Modal.close()

        } catch (error) {
           alert(error) 
        }

    }
}

const App = {
    init() {
        Transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index)
        })

        DOM.updateBalance()

        Storage.set(Transaction.all)
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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index
        DOM.transactionsContainer.appendChild(tr)
    },

    

    innerHTMLTransaction(transaction, index) {

        const cssClass = transaction.amount > 0 ? 'income' : 'expense'
    
        const html = `
                <td class="description">${transaction.description}</td>
                <td class=${cssClass}> ${Utils.formatCurrency(transaction.amount)}</td>
                <td class="date">${transaction.date}</td>
                <td>
                    <a href="#">
                        <img onclick="Transaction.remove(${index})" src="./assets//minus.svg" alt="Remover Transação" />
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





    