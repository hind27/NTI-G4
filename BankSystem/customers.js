customers = getCustomers()
addbtn = document.querySelector('#addbBtn')
showAllBtn = document.querySelector('#showAllBtn')
showBtn = document.querySelector('#showBtn')
singleCustomer = document.querySelector('#singleCustomer')
withdraw=document.querySelector('#withDrawBtn')




document.querySelector('#addForm').addEventListener('submit',function(e){
    e.preventDefault()
    const ele = e.target.elements
    let user = {
        accNum : Date.now(),
        cName: ele.cName.value,
        balance: ele.balance.value
    }
    addCustomer(user)
    this.reset()
    showHide()
})

function getCustomers(){
    return(JSON.parse(localStorage.getItem('customers')) || [])
}
const saveCustomers = function(){
    localStorage.setItem('customers', JSON.stringify(customers))
}

const addCustomer = function(customer){
    customers.push(customer)
    saveCustomers()
}
createNewElement = (elementName,parent,txt='', classes='') =>{
    element = document.createElement(elementName)
    if(classes!='') element.className = classes
    if(txt!='')element.textContent = txt
    parent.appendChild(element)
    return element
}


showAllCustomers = ()=>{
    let tableBody = document.querySelector('tbody')
    tableBody.innerText=''
    customers.forEach((element,i)=>{
        tr = createNewElement('tr',tableBody )
        td1  = createNewElement('td', tr, element.accNum )  
        td2  = createNewElement('td', tr, element.cName )   
        td3  = createNewElement('td', tr, element.balance )  
        td3=createNewElement('td',tr)
        td4=createNewElement('td',tr)
        btnDel = createNewElement('button', td3,'delete','btn btn-danger')     
        btnedit = createNewElement('button', td4, 'Edit','btn btn-success')    
        btnDel.addEventListener('click' ,(e)=>{
            if (i>-1) {          
            customers.splice(i , 1)
            saveCustomers(customers)
            tableBody.textContent=''
            showAllCustomers()
        } })
        btnedit.addEventListener('click', (e)=>{
            console.log(i)
            editCustomer(i)
            });
    
         });
}


const editCustomer = function(i){
    let tableBody = document.querySelector('tbody')
    document.querySelector('#Formedit').classList.remove('d-none')
    document.querySelector('#editForm').addEventListener('submit',(e)=>{
            e.preventDefault()
            const ele = e.target.elements
            let balance=ele.balance.value
            customers[i]['cName']=ele.cName.value
            customers[i]['balance']=balance
        saveCustomers(customers)
        tableBody.textContent=''
        showAllCustomers()
        this.reset()
    })
   }

//formsearch
showsinglecustomer= ()=>{
    document.querySelector('#singleCustomer').classList.remove('d-none')
   
        searchkey=document.getElementById('searchTerm').value
            console.log('searchkey:' ,searchkey)
        for (let x = 0; x < customers.length; x++) {
            console.log( 'indexs :', x ,customers[x]['accNum'])
            if (customers[x]['accNum'] == searchkey) {
                div = createNewElement('div', singleCustomer)
                span = createNewElement('span', div, customers[x]['accNum'])
                h3 = createNewElement('h3', div, customers[x]['cName'])
                h4 = createNewElement('h4', div, customers[x]['balance'])
               return
            } else {
                singleCustomer.textContent = ''
                div = createNewElement('div', singleCustomer, 'Not Found', 'bg-danger')

            }
           
        }
    }      


withDraw = () => {
    document.querySelector('#BalanceWithdraw').classList.remove('d-none')
    document.querySelector('#witdrawform').onsubmit = (e) => {
        e.preventDefault()
        searchkey = document.getElementById('balAfterwithdraw').value
        amount = document.getElementById('withdraw').value
        console.log('searchkey:', searchkey)
        for (let i= 0; i < customers.length; i++) {
            console.log('indexs :', i, customers[i]['accNum'])
            if (customers[i]['accNum'] == searchkey) {
                newbalance = customers[i]['balance'] - amount
                const ele = e.target.elements
               
                customers[i]['balance']= newbalance
                div = createNewElement('div', BalanceWithdraw)
                h3 = createNewElement('h3', div, newbalance)
                return
            }
        }
    }

}

const showHide = function(btnName,sectionId,txt1, txt2) {
    document.querySelectorAll('section').forEach((section, index)=>{
        if(index!=0) section.classList.add('d-none')
    })
    if(btnName.innerText == txt1 ){
        btnName.textContent=txt2
        document.querySelector(`#${sectionId}`).classList.remove('d-none');
    }else{
        btnName.textContent=txt1
    }
    
}

addbtn.addEventListener('click', function(){
    showHide(addbtn, 'addCustomer', 'Add Customer','Hide Customer')
})
showAllBtn.addEventListener('click',function(e){
    showHide(showAllBtn, 'allCustomers', 'Show All Customers','Hide Customers')
    showAllCustomers();
})

showBtn.addEventListener('click',function(e){
    showHide(showBtn,'searchForm', 'Show Customer','Hide Customer') 
    showsinglecustomer();  
})
withdraw.addEventListener('click' ,function(e){
    showHide(withdraw,'withDraw', 'Show Balance','Hide Balance') 
     withDraw();
})