export const generateUserErrorInfo = () => {
    return `a`
  }

  export const generateAddProductErrorInfo = (product) => {
    return `Para agregar un producto se requiere:
    title y se obtuvo: ${product.title}
    description y se obtuvo: ${product.description}
    code y se obtuvo: ${product.code}
    price y se obtuvo: ${product.price}
    stock y se obtuvo: ${product.stock}
    category y se obtuvo: ${product.category}
    thumbnail y se obtuvo: ${product.thumbnail}

    `
  }

  // Ocurrió un error al momento de registrar el usuario
  // Campos esperados:
  // first_name y se obtuvo: ${user.first_name}
  // last_name y se obtuvo:${user.last_name}
  // email y se obtuvo: ${user.email}
  // age y se obtuvo: ${user.age}