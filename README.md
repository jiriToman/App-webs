# Bibino & Barkio web

The part of the [Bibino website](https://bibinoapp.com) and
[Barkio website](https://barkio.com) created by Jiri Toman in [Express](http://expressjs.com/) and Handlebars.js via [hbs](https://www.npmjs.com/package/hbs).

Web is build in such a way that it's easy to reuse for future similar apps websites.
(Project started as a request to build static pages serving different languages via js server > due to success, employers watnted to be able to use diferent themes based on deployment/config file > After that employers wanted to present data from app-specific servers > junior colleague arrived and worked on feature specific(Gift card, Blog, Account) react builds connecting to the mobile & desktop application servers. That were served as a static pages by my Express. server.)

## Important notes to js

The web is caching blog, prices and special promotions from our server for set period of time.
If the data is cached (for the specific country code) it is served directly otherwise it is cached and served to user.

For the main page the blog size is cut to the first three sentences for the article previews and then cached.

Active promotion links:
```
/pricing/black_friday
/pricing/offer_20_off
```
Most of the functions and Handlebars.js-helpers are mostly isolated outside and required automatically by [require-all](https://www.npmjs.com/package/require-all). 

## Getting Started

Install dependencies:

```
npm install
```

To start the development server on [http://localhost:8000](http://localhost:8000) run:

```
// bibino version
  npm run dev-bibino-test

// barkio version
  npm run dev-barkio-test
```

## Environment

I am loading environment variables with the [cross-env](https://www.npmjs.com/package/cross-env) package 

With the environment variables, we are specifying which app (Barkio/Bibino) and what environment (development/production) we want to load together with all the other app specific values.


## Production:

To start the web with production servers on [http://localhost:3000](http://localhost:3000) run:

```
npm run start-bibino-production
// or
npm run start-barkio-production
```
To use test servers run :

```
npm run start-bibino-test
// or
npm run start-barkio-test
```

### Some specifics of the web:

#### styling

We were using [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/) for our responsive layout. The main styling is done Sass  [Sass](https://sass-lang.com/) that is compiled into CSS via [Gulp](https://www.npmjs.com/package/gulp) by running before making any change in the scss file ```gulp watchScss```, our themes are specified in `./Appname/resources/sass`.

Some specific infromation : 
We are switching the lightmode darkmode via sass function tied to @media (prefers-color-scheme: dark) See `Appname/resources/sass/colors.scss`
Typography sizes over breakponts are standardized via @mixin and map function. See `Appname/resources/sass/colors.scss`

#### Localization

Our translations live in `.Appname/locales`

Localization is handled with [i18next](https://www.i18next.com/) and its [i18next-express-middleware](https://github.com/i18next/i18next-express-middleware. We added some custom redirect behavior to fit our needs.

In some partials/views the more complex Handlebars.js helpers/function are required - this causes conflicts [i18next-express-middleware] and I have coded some i18next specific helpers to deal with this issue.



#### String imports


#### See Handlebars.js Documentation:

- [Next.js Documentation](https://nextjs.org/docs)
