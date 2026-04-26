# 🗄️ My First Database in Production

## 📌 From Localhost to the Cloud
As part of my learning journey in Month 2 of the roadmap, I made the leap from having my database living on my computer (`localhost`) to hosting it on the internet. This is what the industry calls using a **DBaaS (Database as a Service)**, finally allowing me to separate my application code from the actual data.

## 🚀 Why I Chose TiDB Cloud (Starter Plan)
While researching free options to host personal projects and portfolios, I decided to go with **TiDB Cloud** using their free "Starter" plan. I chose it for a couple of highly practical reasons for my current stage of development:

1. **MySQL Compatible:** Prisma connects to this database exactly the same way it did on my local machine. I didn't have to change a single line of my application logic to make it work.
2. **Generous and Always-On:** Unlike other free databases that "spin down" or hibernate if they don't receive traffic for a few days, this service stays active without me having to log in and manually wake it up.
3. **Perfect Limits for Learning:** Their free monthly quota is incredible for starting out. They give you up to **5 clusters** per organization. Every month, you get **5 GiB of row storage** and **50 million Request Units (RUs)**. It's almost impossible to exhaust that with a practice project!
4. **Protection Against Surprise Charges:** If for some reason my API went viral and consumed all the free resources for the month, the database doesn't charge me automatically. Instead, it enters a "**Throttled**" state; it denies new connections and slows down existing ones until the next month, which gives me great peace of mind.

## 🔌 What I Learned During Setup
Connecting the API to the cloud presented a couple of interesting challenges that taught me a lot about infrastructure:

* **The `sys` Database Error:** When trying to sync Prisma for the first time, TiDB rejected the connection because I tried to write to the default database (`sys`). I learned that this database is the internal "brain" of the system where it stores its metrics. I had to modify the URL in my `.env` to create and point to my own database (I named it `delivery_db`).
* **SSL Security:** I discovered that the production connection URL requires a special parameter (`?sslaccept=strict`) at the end. This ensures that all database information travels encrypted and secure over the internet.
* **Synchronization:** Once the `.env` was configured correctly, running the `npx prisma db push` command felt like magic. In about 11 seconds, Prisma read my local `schema.prisma` file, connected to a remote server on AWS, and automatically built my entire table structure (`User`, `Product`, `Order`, etc.) in the cloud.
