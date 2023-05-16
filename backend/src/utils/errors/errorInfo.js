export const generateAddProductToCartErrorInfo = (pid) => {
  return `El producto que solicitó no se encuentra en la base de datos, id ingresado: ${pid}`
}

export const generateAddProductErrorInfo = (product) => {
  return `Para agregar un producto se requiere:
    title y se obtuvo: ${product.title}
    description y se obtuvo: ${product.description}
    code y se obtuvo: ${product.code}
    price y se obtuvo: ${product.price}
    stock y se obtuvo: ${product.stock}
    category y se obtuvo: ${product.category}
    thumbnail y se obtuvo: ${product.thumbnails}
    `
}

