import { Table, } from 'flowbite-react';
import { useState } from 'react';

const TableComponent = ({ headers, fields, data, searchField }) => {
    const [showData, setShowData] = useState(data);
    const handleSearch = (event) => {
        const search = event.target.value.toLocaleLowerCase();

        const dataFiltered = data.filter(data => {
            if (data[searchField].toLocaleLowerCase().includes(search)) return data;
        })

        setShowData(dataFiltered);
    }

    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            {
                searchField ? <div className="p-4">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" onChange={handleSearch} id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar proveedor" />
                    </div>
                </div> : <p></p>
            }

            <Table hoverable={true} className="text-center">
                <Table.Head>
                    {
                        headers.map((header, index) => (
                            <Table.HeadCell key={index}>
                                {header}
                            </Table.HeadCell>
                        ))
                    }
                </Table.Head>
                <Table.Body className="dark:bg-slate-800">
                    {
                        showData.map((data, index) => (
                            <Table.Row key={index}>
                                {
                                    fields.map((field, index) => (
                                        <Table.Cell key={index}>
                                            {data[field]}
                                        </Table.Cell>
                                    ))
                                }
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>

    )
}

export default TableComponent;