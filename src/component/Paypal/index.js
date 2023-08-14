import React from 'react';
import { PAYPAL_ID, USD } from '../../util/constant';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from 'react-redux';
import { fetchDataBookingTicket } from './duck/action';
import Swal from 'sweetalert2';
export default function PaypalComponents(props) {
    const { lstSeat, total, closeModal } = props;
    const dispatch = useDispatch();
    return (
        <PayPalScriptProvider options={{ "client-id": PAYPAL_ID }}>
            <div>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: (total() / USD).toFixed(2) // Số tiền thanh toán
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then(function (details) {
                            // Thực hiện các xử lý sau khi thanh toán hoàn tất
                            if (details.status === 'COMPLETED') {
                                //Xử lý khi thành công 
                                dispatch(fetchDataBookingTicket(lstSeat, closeModal));
                            }
                            else {
                                // Xử lý khi thất bại
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Opps..',
                                    text: 'Thanh toán không thành công',
                                })
                            }
                        });
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
}
