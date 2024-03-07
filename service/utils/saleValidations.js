const saleValidation = (saleItens, productCartId, productBd) =>{

    const missingProducts = productCartId.filter(
        (item) => productBd.findIndex((product) => product.id === item) === -1
      );
    
      if (missingProducts.length > 0) {
        const errorMessage = `Product not found with id: ${missingProducts.toString()}`;
        return {
          errorMessage: errorMessage,
          value: missingProducts,
        };
      }
    
      const verifyStock = saleItens.reduce((accumulator, currentItem) => {
        const product = productBd.find((prod) => prod.id === currentItem.id_product);
        if (product.stock < currentItem.quantity) {
          accumulator.push(currentItem);
        }
        return accumulator;
      }, []);
    
      const stockProductId = verifyStock.map((product) => product.id_product);
    
      if (stockProductId.length > 0) {
        const errorMessage = `Out of stock ${stockProductId}`;
        return {
          errorMessage: errorMessage,
          value: stockProductId,
        };
      }
    
      const verifyPrice = saleItens.reduce((accumulator, currentItem) => {
        const product = productBd.find((prod) => prod.id === currentItem.id_product);
        if (product.price !== currentItem.unique_price) {
          accumulator.push(currentItem);
        }
        return accumulator;
      }, []);
    
      const priceProductId = verifyPrice.map((product) => product.id_product);
    
      if (priceProductId.length > 0) {
        const errorMessage = `Wrong price: ${priceProductId}`;
        return {
          errorMessage: errorMessage,
          value: priceProductId,
        };
      }

      return {
        errorMessage: "",
        value: ""
      }
}

export default saleValidation