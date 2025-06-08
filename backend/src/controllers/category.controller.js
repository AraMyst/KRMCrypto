const Category = require('../models/Category');
const slugify = require('slugify');

exports.createCategory = async (req, res) => {
  try {
    const { name, parentId, metaTitle, metaDescription } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const category = await Category.create({
      name,
      slug,
      parent: parentId || null,
      metaTitle,
      metaDescription
    });

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.json(categories);
  } catch {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id).lean();
    if (!cat) return res.status(404).json({ message: 'Categoria não encontrada.' });
    res.json(cat);
  } catch {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, parentId, metaTitle, metaDescription } = req.body;
    const updates = { name, metaTitle, metaDescription };
    if (name) updates.slug = slugify(name, { lower: true, strict: true });
    if (parentId !== undefined) updates.parent = parentId;

    const cat = await Category.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!cat) return res.status(404).json({ message: 'Categoria não encontrada.' });
    res.json(cat);
  } catch {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Categoria não encontrada.' });
    res.json({ message: 'Categoria removida.' });
  } catch {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};
