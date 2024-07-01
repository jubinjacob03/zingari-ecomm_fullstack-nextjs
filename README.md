# Zingari Ecommerce Website NextJS

This is a freelance project focused on building a fully functional ecommerce website using NextJS.

## Introduction

This project harnesses the power of Next.js to build a robust and efficient full-stack application. The frontend and backend are seamlessly connected using a comprehensive API for CRUD operations, with MongoDB as the database. User authentication is handled via Google Auth and JWT, while Stripe is integrated for payment processing. Additionally, Tailwind CSS is used to create a beautiful and responsive user interface.

## Features

- **User Authentication**: Secure login and registration using Google Auth and JWT.
- **Payment Integration**: Seamless payment processing with Stripe.
- **Database**: CRUD operations connected to a MongoDB database.
- **Tailwind CSS**: Elegant and responsive UI design.
- **E-commerce Functionality**:
  - Cart view
  - Product page
  - Order placing
- **Admin Panel**: Separate Next.js application for admin functionalities such as order tracking and product management.

## Installation

1. Clone the repository:
```sh
   git clone https://github.com/jubinjacob03/zingari-ecomm_fullstack-nextjs.git
```

> [!IMPORTANT]
> You have to create an <em><strong>.env</strong></em> file for the credentials to be used, failing to do so renders the project unusable. Therefore after successfully cloning the repo, add your credentials to connect with the services used !!!
---
```bash
MONGODB_URI = "key"
GOOGLE_ID = "key"
GOOGLE_SECRET = "key"
NEXTAUTH_SECRET= "key"
STRIPE_KEY = "key"
STRIPE_PKEY = "key"
SUCCESS_URL = "redirect_url_for_stripe_webhook"
STRIPE_WEBHOOK_SECRET = "key"
FEATURED_PRODUCT_ID = "ObjectId"
COLLECTION_PRODUCT_ID = "ObjectId"
NEXT_PUBLIC_COVERSLIDE = "imglink"
NEXT_PUBLIC_SECONDSLIDE = "imglink"
NEXT_PUBLIC_TOPSIZECHART = "imglink"
NEXT_PUBLIC_BOTTOMSIZECHART= "imglink"
```
> [!CAUTION]
> The App is compatible with node 18 (LTS) or higher, use nvm to run in separate environment if needed !
---

```bash
# If using nvm
nvm use 18.0.0
```
---

# Auto Generated

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
