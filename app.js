const { default: test } = require("node:test");

const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;

  // creamos el constructor con array vacio
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(nuevoObjeto) {
    let { title, description, price, img, code, stock } = nuevoObjeto;
    // validamos cada campo
    if (!title || !description || !price || !img || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }
    // validamos codigo unico
    if (this.products.some((item) => item.code === code)) {
      console.log("El codigo debe ser unico, lo estas repitiendo");
      return;
    }

    // aqui creamos el nuevo objeto con todos los datos que me piden

    const newProduct = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      code,
      stock,
    };

    this.products.push(newProduct);
    await this.guardarArchivo(this.products);
  }
  getProducts() {
    console.log(this.products);
  }

  async getProductById(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      const productoBuscado = arrayProductos.find(
        (producto) => producto.id === id
      );

      if (!productoBuscado) {
        console.log("No se encontro el producto");
      } else {
        console.log("producto encontrado ");
        return productoBuscado;
      }
    } catch (error) {
      console.log("error al leer el archivo", error);
    }
  }
  // leemos un producto
  async leerArchivo() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("error al leer un archivo", error);
    }
  }
  // guardamos un producto
  async guardarArchivo(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("error al guardar el archivo", error);
    }
  }

  // para actalizar productos
  async updateProduct(id, productAtualizado) {
    try {
      const arrayProductos = await this.leerArchivo();
      const index = arrayProductos.findIndex((p) => p.id === id);

      if (index !== -1) {
        arrayProductos.splice(index, 1, productAtualizado);
        await this.guardarArchivo(arrayProductos);
      } else {
        console.log("no se encontro el elemento a actualizar");
      }
    } catch (error) {
      console.log("error al actualizar el producto", error);
    }
  }
  async deletproduct(id, productAtualizado) {
    try {
      const arrayProductos = await this.leerArchivo();
      const index = arrayProductos.findIndex((p) => p.id === id);

      if (index !== -1) {
        arrayProductos.splice(index, 1);
        await this.guardarArchivo(arrayProductos);
      } else {
        console.log("no se encontro el elemento a borrar");
      }
    } catch (error) {
      console.log("error al borrar el producto", error);
    }
  }
  async deletAllProducts(id, productAtualizado) {
    try {
      const arrayProductos = await this.leerArchivo();
      const index = arrayProductos.findIndex((p) => p.id === id);

      if (index !== -1) {
        arrayProductos.splice(index);
        await this.guardarArchivo(arrayProductos);
      } else {
        console.log("no se encontro el elemento a borrar");
      }
    } catch (error) {
      console.log("error al borrar el producto", error);
    }
  }
}

// testing

// const manager = new ProductManager("./productos.json");

// manager.getProducts();

// const fiambres = {
//   title: "Jamon",
//   description: "Cocido",
//   price: 700,
//   img: "sin imagen para mostrar",
//   code: "abc123",
//   stock: "30",
// };
// manager.addProduct(fiambres);

// const cremosos = {
//   title: "Punta de Agua",
//   description: "Cremoso",
//   price: 3200,
//   img: "sin imagen para mostrar",
//   code: "abc124",
//   stock: "40",
// };

// manager.addProduct(cremosos);

// manager.getProducts();
// async function testeamosId() {
//   const productoBuscado = await manager.getProductById(2);
//   console.log(productoBuscado);
// }
// testeamosId();

// const bebida = {
//   title: "manaos",
//   description: "cola",
//   price: 900,
//   img: "sin imagen para mostrar",
//   code: "abc123",
//   stock: "30",
// };

// async function testeamosActualizar() {
//   await manager.updateProduct(1, bebida);
// }

// testeamosActualizar();

// async function testeamosBorrarProducto() {
//   await manager.deletproduct(1);
// }

// testeamosBorrarProducto();

/*
fuera de consigna hice el borrado de varios productos por Id, ya que el eliminar producto por id solo me eliminaba 
un id en especifico pero no 2, siempre me dejaba un producto al querer hacerlo doble espero que si lo ven bien
ok, sino no afecte jajaja
*/

// async function testeamosBorrarProducto() {
//   await manager.deletAllProducts(1, 2);
//   console.log("productos borrado exitosamente, eres un Genio");
// }

// testeamosBorrarProducto();
