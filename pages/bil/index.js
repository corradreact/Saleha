import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { useRouter } from 'next/router';

const Crud = () => {

    const router =  useRouter()
    const [listbank, set_listbank] = useState([])

    useEffect(() => {
        hit_api()
    }, [])

    const hit_api = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

        await fetch("https://toyyibpay.com/api/getBankFPX", requestOptions)
        .then(response => response.json())
        .then(result => {
            // condition
            if(result.length > 0 ) {
                set_listbank(result)
            }
            console.log(result)
        })
        .catch(error => console.log('error', error));
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    
                    <div className="header" onClick={() => set_listbank(listbank + 1)}>
                        <h5 className="m-0">Bil / Senarai Bil</h5>
                    </div> 
                </div>
                <div className="card" style={{backgroundColor: 'skyblue'} }>
                    <div className="header"  onClick={() => alert('Success!')}>
                        <h5 className="m-0">Cukai Taksiran</h5>
                        <span className=''>Senarai Bil Cukai Taksiran</span>
                    </div>
                </div>
                <div className="card" style={{backgroundColor: 'Cyan'} }>
                    <div className="header" onClick={() => router.push('/')}>
                        <h5 className="m-0">Lesen</h5>
                    </div>
                </div>

                <div className="card" style={{backgroundColor: 'Cyan'} }>
                    <div className="header" >
                        <h5 className="m-0">Result</h5>
                    </div>
                    <div className="header" >
                        <h5 className="m-0">
                        {
                            // loop listbank
                            listbank.length > 0 && listbank.map((item, index) =>
                            <div key={index}>
                                <p>
                                    {index + 1}. Bank Name: {item.NAME}
                                </p>

                            </div>
                            )
                        }
                        </h5>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Crud;
