import styles from '../styles/Home.module.css'
import TableComponent from '../components/Table';
import { DarkThemeToggle } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Cookies from 'cookies';
import cookieCutter from 'cookie-cutter';

import { getSuppliers } from '../lib/suppliers/getSuppliers';
import { getInfoSuppliers } from '../lib/suppliers/infoSuppliers';

export default function Home(props) {
  const [suppliers, setSuppliers] = useState(props.suppliers);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(new Date);

  const headers = ["Nombre", "Leche ácida", "Leche entera"]
  const fields = ["name", "acidMilk", "milk",];

  useEffect(() => {
    setData(getInfoSuppliers(suppliers));
    setLoading(false);
  }, [suppliers]);

  useEffect(() => {
    if (dateRange) {
      const { from, to} = dateRange;

      if (from && to) {
        const jwt = cookieCutter.get('token');
  
        setLoading(true);
        getSuppliers(jwt, from, to).then(suppliers => {
          setSuppliers(suppliers)
        });
      }
    }
  }, [dateRange]);

  return (
    <div className={styles.container}>
      <DarkThemeToggle />
      {
        !loading ? <TableComponent
          headers={headers}
          fields={fields}
          data={data}
          searchField={"name"}
          dateFilter={true}
          dateRange={dateRange}
          setDateRange={setDateRange}
        >
        </TableComponent> : null
      }
    </div>
  )
}

export async function getServerSideProps({ req, res }) {


  const cookies = new Cookies(req, res);

  const token = cookies.get('token');

  const suppliers = await getSuppliers(token);

  return {
    props: {
      suppliers
    }
  }
}