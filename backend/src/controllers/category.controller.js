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
    res.status(500).json({ message: 'Server error.' });
  }
};

// Lista todas as categorias
exports.getAllCategories = async (req, res) => {
  try {
    let categories = await Category.find().sort({ name: 1 }).lean();

    // If geolocation info is available, prioritize the matching country
    if (req.location) {
      const countryName = req.location.countryName?.toLowerCase();
      const countryCode = req.location.countryCode2?.toLowerCase();

      const priority = [];
      const others = [];
      categories.forEach((cat) => {
        const slug = cat.slug.toLowerCase();
        const name = cat.name.toLowerCase();
        if (
          slug === countryName ||
          slug === countryCode ||
          name === countryName ||
          name === countryCode
        ) {
          priority.push(cat);
        } else {
          others.push(cat);
        }
      });
      categories = [...priority, ...others];
    }

    res.json(categories);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Mantido para compatibilidade com código legado
exports.getCategories = exports.getAllCategories;

// Obtém categoria pelo slug amigável utilizado nas URLs
exports.getCategoryBySlug = async (req, res) => {
  try {
    const cat = await Category.findOne({ slug: req.params.slug }).lean();
    if (!cat) return res.status(404).json({ message: 'Category not found.' });
    res.json(cat);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id).lean();
    if (!cat) return res.status(404).json({ message: 'Category not found.' });
    res.json(cat);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, parentId, metaTitle, metaDescription } = req.body;
    const updates = { name, metaTitle, metaDescription };
    if (name) updates.slug = slugify(name, { lower: true, strict: true });
    if (parentId !== undefined) updates.parent = parentId;

    const cat = await Category.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!cat) return res.status(404).json({ message: 'Category not found.' });
    res.json(cat);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found.' });
    res.json({ message: 'Category removed.' });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};
