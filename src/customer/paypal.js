import React, { useEffect, useRef } from 'react'
import ReactDOM from "react-dom"
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function PayPal(props) {
    // const paypal = useRef()
    // useEffect(() => {
    //     window.paypal.Buttons({
    //         createOrder: (data, actions, err) => {
    //             return actions.order.create({
    //                 intent: "CAPTURE",
    //                 purchase_units: [{
    //                     description: "Cool looking table ",
    //                     amount: {
    //                         current_code: "CAD",
    //                         value: 50.0
    //                     }
    //                 }]
    //             })
    //         },
    //         onApprove: async (data, actions) => {
    //             const order = await actions.order.capture()
    //             console.log(order)
    //         },
    //         onError: (err) => {
    //             console.log(err)
    //         }
    //     }).render(paypal.current)
    // }, [])

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: (props.TongTien / 22826).toFixed(2), // 1USD = 22826,2 VND
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        props.taodondathangonline()
        return actions.order.capture();

    };


    return (
        <div >
            <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </div>
    )
}