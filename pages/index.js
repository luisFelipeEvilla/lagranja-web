import styles from '../styles/Home.module.css'
import TableComponent from '../components/Table';
import { DarkThemeToggle } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Cookies from 'cookies';
export default function Home(props) {
  const [suppliers, setSuppliers] = useState(props.suppliers);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      let info = [];
      suppliers.forEach(supplier => {
        let acidMilk = 0;
        let milk = 0;

        supplier.products.forEach(product => {
          product.name === "Leche ácida" ? acidMilk += product.quantity : milk += product.quantity;
        })

        const information = {
          name: supplier.firstName + " " + supplier.lastName,
          acidMilk: acidMilk,
          milk: milk
        }

        info.push(information);
      });

      setData(info);
      setLoading(false);
    }
  }, [])


  const headers = ["Nombre", "Leche ácida", "Leche entera"]
  const fields = ["name", "acidMilk", "milk",];

  return (
    <div className={styles.container}>
      <DarkThemeToggle />
      {
        !loading ? <TableComponent
          headers={headers}
          fields={fields}
          data={data}
          searchField={"name"}> 
        </TableComponent> : null
      }

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