const Post = require('../models/Post');
const slugify = require('slugify');

exports.createPost = async (req, res) => {
  try {
    const {
      title,
      body,
      category,
      metaTitle,
      metaDescription,
      status = 'draft'
    } = req.body;

    const slug = slugify(title, { lower: true, strict: true });
    const now = new Date();

    const post = await Post.create({
      title,
      slug,
      body,
      category,
      author: req.user.sub,   // assume equipe/admin
      status,
      metaTitle,
      metaDescription,
      publishedAt: status === 'published' ? now : null,
      updatedAt: now
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { q, category, status, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (status) filter.status = status;

    const posts = await Post.find(filter)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

exports.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).lean();
    if (!post) return res.status(404).json({ message: 'Post não encontrado.' });
    res.json(post);
  } catch {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.title) {
      updates.slug = slugify(updates.title, { lower: true, strict: true });
    }
    updates.updatedAt = new Date();
    if (updates.status === 'published' && !updates.publishedAt) {
      updates.publishedAt = new Date();
    }

    const post = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!post) return res.status(404).json({ message: 'Post não encontrado.' });
    res.json(post);
  } catch {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post não encontrado.' });
    res.json({ message: 'Post removido.' });
  } catch {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};
