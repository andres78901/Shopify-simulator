# Shopify Simulator Documentation
# Shopify Simulator Framework - Prueba Técnica Gradiweb

## Descripción
Landing page desarrollada siguiendo el diseño propuesto para desktop y responsive, usando el framework Shopify Simulator y Liquid. Cumple todos los requisitos técnicos y visuales solicitados.

## Instalación
1. Clona el repositorio:
  ```sh
git clone https://github.com/andres78901/Shopify-simulator.git
```
2. Instala dependencias:
  ```sh
npm install
```
3. Compila los assets:
  ```sh
npm run build
```
4. Ejecuta el servidor local (si aplica):
  ```sh
npm start
```

## Estructura
- `sections/` - Componentes modulares en Liquid (header, topbar, hero-banner, product-carousel, collections, footer)
- `snippets/` - Tarjetas de producto
- `src/` - Lógica JS y estilos SASS/BEM
- `config/` - Configuración editable (settings_data.json)
- `data/` - Productos y colecciones
- `assets/` - Imágenes y recursos

## Detalles técnicos
- **HTML/CSS/SASS:** Semántica, BEM, modularidad, variables y mixins.
- **JS:** Lógica limpia y reutilizable (sticky header, scroll, carrusel, animaciones).
- **Webpack:** Optimizado para producción y desarrollo, soporta SASS y assets.
- **Liquid:** Uso de configuraciones dinámicas y renderizado modular.
- **Accesibilidad:** Roles, labels y estructura clara.
- **GitHub:** Commits claros, ramas y PRs recomendados.

## Personalización
- Edita textos, links e imágenes en `config/settings_data.json`.
- Agrega productos y colecciones en `data/products.json` y `data/collections.json`.

## Milla extra
- Animaciones, efectos y detalles visuales añadidos para mejorar la experiencia.

## Contacto
Para dudas técnicas, contacta a Gradiweb.
Welcome to **Shopify Simulator**, a lightweight environment designed to help developers explore Shopify's Liquid templating language and dynamic section-based architecture. This project simulates Shopify's core functionalities, enabling developers to practice creating reusable components, iterating through data, and working with dynamic settings.

---

## **Project Structure**

```
/simulator
├── /config
│   ├── settings_schema.json      # Defines configurable settings for sections
│   ├── settings_data.json        # Stores dynamic data for rendering sections
├── /data
│   ├── products.json             # Sample product data
│   ├── collections.json          # Sample collection data
├── /public
│   ├── styles.css                # Compiled CSS file
│   ├── main.js                   # Compiled JavaScript file
├── /sections
│   ├── featured-products.liquid  # Main section rendering product lists
├── /snippets
│   ├── product-card.liquid       # Reusable snippet for individual product cards
├── /templates
│   ├── index.liquid              # Main template file
├── /src
│   ├── styles.scss               # Base SASS file
│   ├── app.js                    # Base JavaScript logic
├── /assets                       # Images for products, banners, and collections
├── package.json
├── webpack.config.js
├── server.js
```

---

## **Liquid Basics**

Liquid is a templating language used in Shopify to dynamically render content. Below are the key concepts you'll use in this simulator:

### **Sections**

Sections are modular components that render specific parts of a page. For example, the `featured-products.liquid` file is a section that displays a list of products. Sections can:

- Access dynamic data from `settings_data.json`.
- Be configured through a schema defined in `settings_schema.json`.

Example:

```liquid
<section class="featured-products">
  <h2>{{ settings['featured-products'].settings.heading }}</h2>
</section>
```

### **Snippets**

Snippets are reusable components, such as a product card. You can include a snippet using the `{% render %}` tag:

Example:

```liquid
<div class="product-list">
  {% for product in products %}
    {% render 'product-card', product: product %}
  {% endfor %}
</div>
```

### **Iterating Over Objects**

Liquid allows you to iterate over arrays, such as products or collections:

```liquid
<ul>
  {% for product in products %}
    <li>{{ product.title }} - ${{ product.price }}</li>
  {% endfor %}
</ul>
```

### **Filters**

Filters are used to manipulate output. Some common filters:

- `capitalize`: Capitalizes the first letter.
- `date`: Formats a date.
- `money`: Formats a number as currency.

Example:

```liquid
{{ product.price | money }}
{{ product.created_at | date: "%B %d, %Y" }}
```

---

## **Dynamic Configuration**

### **Schema (`settings_schema.json`)**

The schema defines the settings available for a section. While it's necessary in Shopify, it might not be required here.

### **Data (`settings_data.json`)**

This file contains the dynamic values for settings

## **Setup Instructions**

### **Install Dependencies**

```bash
npm install
```

### **Run the Server**

```bash
npm start
```

### **Build Styles and Scripts**

```bash
npm run build
```

---

## **Additional Notes**

### **Assets**

All product, banner, and collection images are stored in the `/assets` folder. Refer to the `data/products.json` and `data/collections.json` files for mappings.

### **Testing the Application**

Visit `http://localhost:3000` in your browser to view the simulator in action.

---

Feel free to customize the simulator further to match your requirements. Happy coding! 🚀

For more information about Liquid, refer to the [official Liquid documentation](https://liquidjs.com/tutorials/intro-to-liquid.html).
