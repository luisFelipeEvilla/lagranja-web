import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TableComponent from '../components/Table';
import { DarkThemeToggle} from 'flowbite-react';
export default function Home() {
  const suppliers = [
    {
      name: "luis",
      acid: 4,
      milk: 0,
      quantity: 2
    },
    {
      name: "felipe",
      acid: 5,
      milk: 0,
      quantity: 4
    },
    {
      name: "Natalia",
      acid: 6,
      milk: 0,
      type: "Leche"
    }
  ]

  const headers = ["Nombre", "Leche ácida", "Leche entera"]
  const fields = ["name", "acid", "milk",];

  return (
    <div className={styles.container}>
      <DarkThemeToggle />
        <TableComponent
          headers={headers}
          fields={fields}
          data={suppliers}
          searchField={"name"}>
        </TableComponent>
    </div>
  )
}
