const got = require("got");
// ziskani obsahu blogu
module.exports = async function getBlog() {
    let blogArr;
    let url =
      // "https://strapi.bibinoapp.com/blog-articles?_where[0][IsPublished]=true&_where[1][MainPagePromo]=true";
    "https://strapi.bibinoapp.com/blog-articles?_where[0][IsPublished]=true&_sort=Date:DESC&_limit=3";
    try {
      const blog = await got(url).json();
      // console.log(blog);
      let firstIII = blog.slice(0, 3);
      return firstIII;
    } catch (error) {
    //   console.log(error);
      blogArr = { err: error };
    }
    return blogArr;
  };