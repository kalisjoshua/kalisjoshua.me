const HREF =
  "https://medium.com/gender-inclusivit/why-i-put-pronouns-on-my-email-signature-and-linkedin-profile-and-you-should-too-d3dc942c8743";
const title = "Why I put my pronouns on my email signature and you should too.";

const pronouns = (name: string, href = HREF) =>
  `${name} <small><a href="${href}" title="${title}">he/him/his</a></small>`;

export { HREF, pronouns };
