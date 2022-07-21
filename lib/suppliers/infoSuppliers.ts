export const getInfoSuppliers = (suppliers) => {
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

    return info;
}