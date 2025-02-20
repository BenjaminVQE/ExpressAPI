import Product from "../models/Product.js";

export async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "Aucun produits trouvés",
      });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des produits",
      error,
    });
  }
}

export async function getProductById(req, res) {
  try {
    const { id } = req.params; // Récupérer l'ID du produit depuis les paramètres de l'URL
    const product = await Product.findByPk(id); // Trouver le produit par son ID

    if (!product) {
      return res.status(404).json({
        message: "Produit non trouvé",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du produit",
      error,
    });
  }
}

export async function createProduct(req, res) {
  try {
    const { brand, model, weight, stock, description, price } = req.body;

    if (!brand || !model || !weight || !stock || !description || !price) {
      return res.status(400).json({
        message: "Tous les champs sont requis",
      });
    }

    const newProduct = await Product.create({
      brand,
      model,
      weight,
      stock,
      description,
      price,
    });

    res.status(201).json({
      message: "Produit créé avec succès",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création du produit",
      error: error.message || error,
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    let product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: "Produit non trouvé",
      });
    }

    await product.update(req.body);

    res
      .status(200)
      .json({ message: "Produit mis à jour avec succès", data: product });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des produits",
      error,
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: "Produit non trouvé",
      });
    }

    Product.destroy({
      where: {
        id: id,
      },
    });
    res.status(201).json({
      message: "Produit supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du produit",
      error: error.message || error,
    });
  }
}

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
