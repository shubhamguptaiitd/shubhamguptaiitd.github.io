// Settings shared by every file in src/frameworks/.
// A framework gets its own page at /frameworks/<file name>/ only once it is marked `published: true`;
// until then it shows on the Frameworks page with a note that detailed use cases are on the way.
export default {
  tags: ["frameworks"],
  layout: "layouts/framework.njk",
  eleventyComputed: {
    permalink: (data) => (data.published ? `/frameworks/${data.page.fileSlug}/` : false),
  },
};
