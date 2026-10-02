# Pizzeria Operations POS

## Live Demo

[Open Pizzeria Operations POS](https://mu-pizzeria-pos.vercel.app/)

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
- Dine-in, takeaway, and delivery order modes
- Customer and table/address capture
- Pizza size selection
- Crust selection
- Extra topping selection
- Kitchen notes for customized items
- Per-item quantity controls
- Persistent active cart using Local Storage
- Coupon validation
- Original `MU50` 50% discount flow
- Automated subtotal calculation
- CGST at 2.5%
- SGST at 2.5%
- Delivery fee calculation
- Final total calculation
- Card, PayPal, wallet, and cash payment selection
- Kitchen handoff workflow
- Order status progression from New to Completed
- Persistent order history
- Daily order, open-order, and revenue metrics
- Order IDs and timestamps
- Expanded 20-item demo menu with product photography
- Previous and Next catalog navigation
- Items-per-page controls for 6, 9, or 12 products
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

## Menu Experience

The current catalog includes 20 demo items across pizzas, sides, beverages, and desserts. The interface supports:

- Product photography displayed without forced cropping or hover zoom
- Menu search
- Category filtering
- Previous and Next page navigation
- Page indicators and visible-item ranges
- Items-per-page options for 6, 9, or 12 products

## Order Modes

The POS supports three service modes:

- **Dine-in** with table number capture
- **Takeaway**
- **Delivery** with delivery-address capture and a demo delivery fee

These details are stored with the order and remain visible in order operations.

## Kitchen Workflow

After checkout, an order enters the kitchen workflow with the status:

```text
New → Preparing → Ready → Completed
```

The Orders panel can advance each order through these stages.

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
3. Choose dine-in, takeaway, or delivery
4. Add customer, table, or address details
5. Add sides, beverages, or desserts
6. Adjust item quantities
7. Apply a coupon
8. Review GST, discounts, delivery fees, and total
9. Select a payment method
10. Send the order to the kitchen
11. Advance the order through New, Preparing, Ready, and Completed
12. Review order history and daily operational metrics

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

The original Java implementation remains in the repository as `pizza.java` and `pizza.class`. Its console text used the name `M.U Pizzeria`; the source does not define what `M.U` stands for, so the modern interface uses the clearer product name **Pizzeria Operations POS**.

The new React application modernizes the same core restaurant billing problem into a deployable POS and order-operations experience while preserving the original discount, tax, menu, and payment concepts.


## Deployment

The current application is deployed on Vercel:

[https://mu-pizzeria-pos.vercel.app/](https://mu-pizzeria-pos.vercel.app/)
