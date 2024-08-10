
const fs = require('fs').promises;


async function writeProducts(products) {
    try {
        await fs.writeFile('./products.json', JSON.stringify(products));
        console.log('Products saved successfully');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}


async function readProducts() {
    try {
        const data = await fs.readFile('./products.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return [];  
    }
}


async function addProduct(newProduct) {
    const products = await readProducts();
    products.push(newProduct);
    await writeProducts(products);
}

async function editProduct(id, updatedProduct) {
    const products = await readProducts();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        await writeProducts(products);
    } else {
        console.log(`Product with ID ${id} not found`);
    }
}

async function deleteById(array, id) {
  
    const updatedProducts = array.filter(item => item.id !== id);
    await writeProducts(updatedProducts);
  }

(async () => {
    

   await  writeProducts([{ id: 1, name: 'product 1', price: 10 }]);
 
    await addProduct({ id: 2, name: 'product 2', price: 20 });
    await addProduct({ id: 3, name: 'product 3', price: 30 });

    await editProduct(1, { name: 'Updated Product 1', price: 15 });
    const products = await readProducts();
   
    await deleteById(products, 2);

  
    const checkProduct =await readProducts();
    console.log(checkProduct);
})();
