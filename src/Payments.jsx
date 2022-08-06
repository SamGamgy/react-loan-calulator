import React from 'react'
import UserInputs from './UserInputs'


class Payments extends React.Component {
    constructor(props) {
        super(props)

        this.child = React.createRef()

        this.state={
            input:0,
            list: [],
            totalPaid:0,
            minPay:0,
            debtLeft:0,
            totalPayoff:0,
            isModal:false,
            
        }
    }

    handleChange= (e) => {
        this.setState({input:parseFloat(e.target.value)})
    }

    onClick=()=> {

        this.calcTotal()

        if (this.state.input.toFixed(2) === this.state.totalPayoff) {
            this.popUp();
        }
        else if (this.state.input > (this.state.totalPayoff)) {
            alert(`Your payment cannot be greater than the amount owed`)
        }
        else if (this.state.input >= (this.state.debtLeft)) {
            alert(`Your payment cannot be greater than your Remaining Debt. 
            If you want to payoff your entire loan, you must pay off Remaining Debt + Interest + a 1% Principal Paymet.Current Payoff Total: $${this.state.totalPayoff} `)
        }
        else if (this.state.input >= (this.state.minPay.toFixed(2))){
        this.createLi();
        this.updatePay();
        this.child.current.calcDebt();
        }
        else{alert(`Payments must be greater than or equal to ${this.state.minPay.toFixed(2)}`)}
    }

   
    createLi = () => {
        let newItem = {
            label: this.state.input,
            id: Date.now(),
        }
        
        this.setState(prevState => ({
            list:[...prevState.list, newItem]
        }))
    }

    updatePay=() =>{
        this.setState({totalPaid: this.state.totalPaid + this.state.input
        })
    }
     getData=(minimumPay, debt, totalPayoff)=>{
         this.setState({
            minPay: minimumPay, 
            debtLeft: debt.toFixed(2),
            totalPayoff: totalPayoff.toFixed(2)
        });
     }
     calcTotal = () => {
        let calcTotal = (this.state.debtLeft*1) + (this.state.minPay*1)
        this.setState({totalPayoff: calcTotal.toFixed(2)})
     }
     popUp = () => {
        this.setState({isModal:true,})
     }
    
     reset = () => {
        this.setState({
            input:0,
            list:[],
            totalPaid:0,
            minPay:0,
            debtLeft:0,
            totalPayoff:0,
            isModal:false,
        });

        this.child.current.reset();
     }
    render() {
        let {list, totalPaid, input, minPay, debtLeft, totalPayoff} = this.state;
        
        const modalVisible = this.state.isModal ? 'is-visible' : '' ;

        return(
        <header className="App-header">  
            <div className={`modal ${modalVisible}`}> 
            <h1>Congratulations! <br/>Your Loan is Paid Off!</h1>
            <button class='button' onClick={this.reset}>Reset</button>
            </div>  
            <div className='pay container'>
            
                <h3>Payments</h3>
                <input 
                    type="number"
                    step='0.01'
                    min={minPay.toFixed(2)}
                    max={debtLeft}
                    value={input}
                    placeholder='90'
                    onChange={this.handleChange}/>
                <button className='button' onClick={this.onClick}>Log Payment</button>
                <div className='subtext'>Minimum Payment : {minPay.toFixed(2)}</div>
                <div className='subtext'>Loan Payoff Amount : {totalPayoff}</div>
                <h3>Log</h3>
                <ol className='log'>
                {list.map((item) => <li key={item.id}>${item.label}</li>)}
                </ol>
                <h5>Total Amount Paid:</h5>
                <span className='number-left'>{totalPaid.toFixed(2)}</span>
            </div>
            <UserInputs 
            ref={this.child} 
            payment ={input} 
            childFunc = {this.childFunc}
            getData = {this.getData}/>
        </header>
        )
    }
}

export default Payments
