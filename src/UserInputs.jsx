import React from "react";

class UserInputs extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            debtInput: 20000,
            interestInput:5,
            monthlyInterest:0,
            remainingDebt:0,
            minPay:0,
            remainingPayments:0,
        }
    }

    // set states for sliders
    handleChange =  (e) => {
        this.setState({[`${e.target.name}`]:e.target.value})
    }
   

    captureData = () => {
        // initial data
        const{debtInput, interestInput} = this.state
        let debt = (debtInput *1);
        let annualInt = interestInput / 100;
        let monthlyInt = annualInt / 12;
        let monthlyIntPay = monthlyInt * debt
        let minTotalPay = monthlyIntPay + (debt * 0.01)
        let totalPayoff = minTotalPay + (debt * 1);

        this.setState({
            monthlyInterest: monthlyInt * debt, 
            remainingDebt: (debt *1), 
            minPay: minTotalPay, 
            remainingPayments: debt / minTotalPay
        });
        // send min pay to parent
        this.props.getData(minTotalPay, debt, totalPayoff);
        
    }
    calcDebt= () => {
    if (this.state.remainingDebt > 100) {
        const{ interestInput, remainingDebt} = this.state
        const {payment} = this.props;

        let annualInt = interestInput / 100;
        let monthlyInt = annualInt / 12;
        let monthlyIntPay = monthlyInt * remainingDebt
        let newMinPay = monthlyIntPay + (remainingDebt * 0.01)
        let principlePaid = payment - monthlyIntPay
        let newDebt= remainingDebt - principlePaid
        let totalPayoff = newMinPay + newDebt;

        this.setState({
            monthlyInterest: monthlyInt * newDebt, 
            remainingDebt: (newDebt * 1), 
            minPay: newMinPay, 
            remainingPayments: newDebt / principlePaid
        });
        // Send min pay to parent
        this.props.getData(newMinPay, newDebt, totalPayoff);
        }
    else {
        const{remainingDebt} = this.state
        const {payment} = this.props;

        
        let newDebt= remainingDebt - (payment)
        let newMinPay = (remainingDebt * 0.01) + newDebt
        let totalPayoff = (remainingDebt * 0.01) + newDebt

        this.setState({
            remainingDebt: (newDebt * 1), 
            minPay: newMinPay, 
            remainingPayments: newDebt / newMinPay
        });

        this.props.getData(newMinPay, newDebt, totalPayoff);
        }
    } 
    reset=()=>{
        this.setState({ 
            debtInput: 20000, 
            interestInput:5, 
            monthlyInterest:0, 
            remainingDebt:0, 
            minPay:0, 
            remainingPayments:0,})
    }

    render() {
        
        const {debtInput, interestInput, remainingDebt, minPay, remainingPayments } = this.state;
        
        const inputData = [
            {header:'Total Debt', label: `$${debtInput}`, name:'debtInput', type:"range",min:"1000", 
            max:"100000", value: debtInput ,step:'500', onChange: this.handleChange , className:"slider", id:"debtRange"},
            {header:'Total Yearly Interest', label: `${interestInput}%`, name:'interestInput', type:"range",min:"1", 
            max:"20", value: interestInput ,step:'0.1', onChange: this.handleChange , className:"slider", id:"interestRange"}
        ]
        return (
   
        <div>    
            <div className='container inputs'>
                {inputData.map((item) => 
                <div>
                    <h2>{item.header}</h2>
                    <div className='total'>{item.label}</div>
                    <input 
                        name={item.name}
                        type={item.type} 
                        min={item.min} 
                        max={item.max} 
                        value={item.value} 
                        step={item.step}
                        onChange= {item.onChange} 
                        className={item.className} 
                        id={item.id}/>
                </div>
                )}

                <button className='button' onClick={this.captureData}>Calculate</button>
            </div>
            <div className='data-container container'>
                <div className='data'>
                    <div>
                        <h5>Debt Remaining: </h5>
                        <div className='subtext'>Original Debt minus principal paid</div>
                        <span className='min-pay'>${remainingDebt.toFixed(2)}</span>

                        <h5>Minimum Payment: </h5>
                        <div className='subtext'>Monthly interest plus 1% payment on principal</div>
                        <div className='subtext'><b>Monthly Interest: ${this.state.monthlyInterest.toFixed(2)}</b></div>
                        <span className='min-pay'>${minPay.toFixed(2)}</span>

                        <h5>Number of Payments Left:</h5>
                        <div className='subtext'>Based on last monthly payment</div>
                        <span className='number-left'>{remainingPayments.toFixed(1)}</span>
                   
                    </div>
                </div>
            </div>
        </div> 
        
       
        )
    }
}

export default UserInputs;