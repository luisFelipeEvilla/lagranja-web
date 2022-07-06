import Cookies from 'cookies';
import jsCookie from 'js-cookie'; 
import { useState } from 'react';
import { Modal} from 'flowbite-react'
import ModalComponent from '../components/Modal';

export default function Collect(props) {
    const [activeSuppliers, setActiveSuppliers] = useState(props.suppliers.filter(supplier => supplier.isActive));
    const [suppliers, setSuppliers] = useState(activeSuppliers);
    const [totalMilk, setTotalMilk] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalMessages, setModalMessages] = useState("");

    const tableId = "collection-table";
    
    const handleSearch = (event) => {
        const search = event.target.value.toLocaleLowerCase();

        const supplierToShow = activeSuppliers.filter(supplier => {
            const name = supplier.firstName + ' ' + supplier.lastName;

            if (name.toLocaleLowerCase().includes(search)) return supplier;
        })

        setSuppliers(supplierToShow);
    }

    const handleChangeQuantity = async (event, supplier_id) => {
        const table: HTMLTableElement = document.querySelector(`#${tableId}`);

        const rows = Array.from(table.tBodies[0].rows);

        const total = await rows.reduce((previosValue, currentValue) => {
            const value = currentValue.cells[2].querySelector('input').value;

            if (value !== null && value.length > 0) {

                return previosValue + parseInt(value);
            }

            return previosValue;
        }, 0);

        setTotalMilk(total);
    }

    const handleSubmit = async () => {
        setSuppliers(activeSuppliers);

        const table: HTMLTableElement = document.querySelector(`#${tableId}`);

        const rows = Array.from(table.tBodies[0].rows);

        const products = rows.map((row, index) => {
            const product = {
                supplier: suppliers[index]._id,
                name: row.cells[1].querySelector('select').value,
                quantity: parseInt(row.cells[2].querySelector('input').value)
            }

            return product;
        })

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

        
        const token = jsCookie.get('token');
        setShowModal(true);
        
        const response:Response = await fetch(`${API_BASE_URL}/collections`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + token,
               "Content-Type": 'application/json'
            },
            body: JSON.stringify(products)
        })
        
        if (response.status === 200) {
            setShowModal(true);
            setModalMessages("Información almacenada correctamente");
        } else {
            const result = await response.json();
            setShowModal(true);
            setModalMessages(`Error almacenado información: \n ${result.message}`)
        }
        
    }    
    return (
        <div className="p-6 dark">
            {
                showModal ?  <ModalComponent message={modalMessages} showModal={showModal} setShowModal={setShowModal}/> : <p></p>
            }
           
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="p-4">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" onChange={handleSearch} id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar proveedor" />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" id={tableId}>
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Proveedor
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tipo de leche
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cantidad (Lts)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            suppliers.map(supplier => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {supplier.firstName + " " + supplier.lastName}
                                    </td>
                                    <td className="px-4 py-4">
                                        <select className="min-w-fit block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-type">
                                            <option>Leche</option>
                                            <option>Leche ácida</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <input onChange={event => handleChangeQuantity(event, supplier)} 
                                        className=" appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                         id="grid-quantity" type="number" placeholder="Litros de leche" defaultValue={0}/>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot className='text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <td className='px-6 py-3'>
                                Total
                            </td>
                            <td>
                            </td>
                            <td className='px-6 py-3'>
                                {totalMilk}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className='flex items-center justify-center w-screen py-4'>
                <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-700 text-white font-bold w-40 py-2 px-4 rounded'>
                    Enviar
                </button>
            </div>
        </div>
    )
}

export async function getServerSideProps({ req, res }) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const cookies = new Cookies(req, res);

    const token = cookies.get('token');
    const response = await fetch(`${API_BASE_URL}/suppliers`, {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    const suppliers = await response.json();

    return {
        props: {
            suppliers
        }
    }
}