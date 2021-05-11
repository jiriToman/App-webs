const outHtml = require("./outHtml");
const getBlog = require("./getBlog");
const cache = require("./cache");

const blogKey = "blogPreview";

module.exports = async function cacheBlog() {
    let blogSimple;
    let blogArticles = await getBlog();
    if (!blogArticles.err) {
      blogSimple = blogArticles.map((article) => {
        return {
          slug: article.Slug,
          title: article.Title,
          html: outHtml(article.Text),
          date: article.Date,
          imgUrl: article.Image.url,
          imgAlt: article.Image.alternativeText,
        };
      });
      cache.setCache(blogKey, blogSimple);
    } else {
      blogSimple = blogArticles;
    }
  
    return blogSimple;
  };