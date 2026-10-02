# M.U Pizzeria POS

A modern restaurant point-of-sale and automated billing workflow built from the original Java console billing project.

## Overview

The original project was a Java console application for a pizza shop with:

- pizza selection
- extra toppings
- sides and beverages
- coupon validation
- CGST and SGST calculation
- payment-method selection

The current version preserves that billing logic while redesigning the experience into a browser-based POS interface suitable for a portfolio demo.

## Current Features

- Multi-category restaurant menu
- Menu search
- Category filtering
- Pizza customization
- Extra topping selection
- Per-item quantity controls
- Persistent active cart using Local Storage
- Coupon validation
- Original `MU50` 50% discount flow
- Automated subtotal calculation
- CGST at 2.5%
- SGST at 2.5%
- Final total calculation
- Card, PayPal, wallet, and cash payment selection
- Completed-order workflow
- Persistent order history
- Order IDs and timestamps
- Responsive POS interface

## Billing Logic

The bill is calculated in this order:

```text
Menu subtotal
- Coupon discount, when applicable
= Taxable subtotal
+ CGST 2.5%
+ SGST 2.5%
= Final total
```

The demo retains the original project's coupon code:

```text
MU50
```

When valid, it applies a 50% discount before GST is calculated.

## Pizza Customization

Pizza items can be customized before being added to the order.

Available extra toppings currently include:

- Paneer
- Olives
- Mushroom
- Jalapeño

Each extra topping adds ₹60, consistent with the original Java billing logic.

## Order Workflow

A user can:

1. Browse or search the menu
2. Choose a pizza and customize toppings
3. Add sides, beverages, or desserts
4. Adjust item quantities
5. Apply a coupon
6. Review the tax breakdown
7. Select a payment method
8. Complete the order
9. Review completed orders in order history

The payment selector is a demo workflow and does not process a real payment.

## Persistence

The current cart and completed-order history are stored in browser Local Storage.

This allows the prototype to preserve operational state without requiring a backend.

## Tech Stack

- React
- Vite
- Lucide React
- CSS
- Browser Local Storage

## Run Locally

```bash
git clone https://github.com/DhritiGada/Automated-Billing-System-for-a-Pizza-Shop.git
cd Automated-Billing-System-for-a-Pizza-Shop
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

Production files are generated in:

```text
dist/
```

## Project Evolution

The original Java implementation remains in the repository as `pizza.java` and `pizza.class`.

The new React application modernizes the same core restaurant billing problem into a deployable POS and order-operations experience while preserving the original discount, tax, menu, and payment concepts.
