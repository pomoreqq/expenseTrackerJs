class Expense{
    constructor(name,amount,category,date,description = '') {
        if(!name || !amount || !category || !date) {
            throw new Error('You must provide all needed data')
        }

        if (typeof name !== 'string') {
            throw new Error('name must be a string')
        }

        if( typeof amount !== 'number' || amount <= 0) {
            throw new Error('amount must be a number')
        }

        if (typeof description !== 'string') {
            throw new Error('description must be a string')
        }

        if (typeof category !== 'string') {
            throw new Error('category must be a string')
        }

        
        if (this.validateDate(date)) {
            this.date = date
        } else {
            throw new Error('date must be in format YYYY-MM-DD')
        }

        this.name = name
        this.amount = amount
        this.category = category
        this.date = date
        this.description = description
    }


    

    validateDate(expenseDate) {
        const date = new Date(expenseDate)
        return !isNaN(date.getDate())
    }   
}



class ExpenseCollection{
    constructor() {
        this.expenseList = []
        
    }

    getExpenseList() {
        return this.expenseList
    }

    addExpense(expense) {
        this.expenseList.push(expense)
        
    }

    deleteExpense(index) {
        this.expenseList.splice(index,1)
       
    }


    editExpense(id,keyToEdit, newValue) {
        const expenseToEdit = this.expenseList[id]

        if(!expenseToEdit) {
            throw new Error('Expense not found')
        }

        if(!expenseToEdit.hasOwnProperty(keyToEdit)) {
            throw new Error('invalid key')
        }

        expenseToEdit[keyToEdit] = newValue
        this.saveToLocalStorage()
        return expenseToEdit

    }

    filterExpensesByCategory(category) {
        if (category === '') {
            throw new Error('fill category')
        }
        const isTrue = this.expenseList.some(expense=> expense.category === category)
        if(isTrue) {
            return this.expenseList.filter(expense => expense.category === category)
        } else {
            throw new Error('category doesnt exist')
        }

        
    }

   sortByDates() {
    return this.expenseList.sort((a,b) => new Date(a.date) - new Date(b.date))
   }

  sumOfAmount() {
   return this.expenseList.reduce((sum,currentValue) => sum + currentValue.amount,0) 
  }

}


const expense1 = new Expense("Groceries", 100, "Food", "2024-09-10", "Weekly groceries");
const expense2 = new Expense("Gas", 50, "Transport", "2024-09-12", "Fuel for car");
const expense3 = new Expense("Rent", 800, "Housing", "2024-09-01", "Monthly rent");
const expense4 = new Expense("Gym Membership", 40, "Health", "2024-09-05", "Monthly gym fee");
const expense5 = new Expense("Movie Night", 30, "Entertainment", "2024-09-08", "Cinema with friends");


const arrayOfExpenses = [expense1,expense2,expense3,expense4,expense5]

const newExpenseList = new ExpenseCollection()


arrayOfExpenses.forEach(item => newExpenseList.addExpense(item))

console.log(newExpenseList.sumOfAmount())
