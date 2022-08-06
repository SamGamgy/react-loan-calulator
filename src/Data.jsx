import React from "react";

class Data extends React.Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }

    render() {


        // grab debt and interest value from button, and not from state. Debt has to by locally dynamic and not staying the same with the slider
        const {debt, interest, payment} = this.props;
        const interestDecimal = interest / 100;
        const annualInterest = debt * interestDecimal;
        const monthlyInterest = annualInterest / 12;
        const minPay = monthlyInterest + (debt/100);
        const remainingDebt = (debt * 1) + monthlyInterest - payment;
        const payLeft = debt / (debt/100);
        // this.props.data(minPay)

        return(
            <div className='data-container container'>
                <div className='data'>
                    <div>
                        <h5>Debt Remaining: </h5>
                        <div className='subtext'>Original Debt minus payments logged</div>
                        <span className='min-pay'>{debt}</span>

                        <h5>Minimum Payment: </h5>
                        <div className='subtext'>Minimum 1% payment on principal</div>
                        <span className='min-pay'>{minPay.toFixed(2)}</span>

                        <h5>Number of Payments Left:</h5>
                        <div className='subtext'>Based on minimum payments</div>
                        <span className='number-left'>{payLeft.toFixed(1)}</span>
                   
                    </div>
                </div>
            </div>
        )


    }
}


export default Data