// Site-wide settings, used in every page's <head>, the nav, the footer and the social icons.
export default {
  url: "https://drshubhamgupta.com",
  title: "Shubham Gupta",
  lang: "en",
  description:
    "Shubham Gupta — VP Data Science at Info Edge (Naukri, Jeevansathi) and PhD in Computer Science from IIT Delhi. " +
    "Research in temporal graph representation learning, generative modeling, recommendation systems, and LLMs. " +
    "Publications in AAAI, ICML, SIGIR, TMLR, LOG and more. Writes Network Effect Labs, essays on network effects in business.",
  ogImage: "/assets/img/prof_pic.jpg",

  // Kept in two parts so the full address never appears in the HTML; a small script on the page joins them
  // into a working mailto link, which keeps it away from scrapers that only read the HTML.
  email: { user: "shubhamgupta5893", domain: "gmail.com" },
  scholarUrl: "https://scholar.google.com/citations?user=pW_LwFQAAAAJ",
  githubUrl: "https://github.com/shubhamguptaiitd",
  linkedinUrl: "https://www.linkedin.com/in/shubhamgupta5",
  xUrl: "https://x.com/shubhamgupta583",

  // Order of the nav links after "About".
  nav: [
    { title: "Publications", url: "/publications/" },
    { title: "Writing", url: "/writing/" },
    { title: "Quotes", url: "/quotes/" },
  ],
};
