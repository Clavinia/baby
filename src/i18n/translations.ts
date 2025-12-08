export type Language = 'es' | 'en'

export interface Translations {
  meta: {
    title: string
    description: string
  }
  header: {
    title: string
    description: string
    disclaimerLabel: string
    disclaimer: string
  }
  board: {
    title: string
    subtitle: string
    namePlaceholder: string
    instruction: string
  }
  sections: {
    alergenos: string
    otrosSabores: string
    frutas: string
    vegetales: string
    proteinas: string
    hidratos: string
    lacteos: string
  }
  footer: {
    madeWith: string
    by: string
    rights: string
  }
  buttons: {
    print: string
    changeLanguage: string
  }
  foodItems: {
    alergenos: string[]
    otrosSabores: string[]
    frutas: string[]
    vegetales: string[]
    proteinas: string[]
    hidratos: string[]
    lacteos: string[]
  }
}

export const translations: Record<Language, Translations> = {
  es: {
    meta: {
      title: 'Primeros Alimentos',
      description: 'Tablón interactivo para documentar los primeros alimentos de tu bebé.',
    },
    header: {
      title: 'Primeros Alimentos del bebé',
      description: 'Esta herramienta te ayuda a documentar y hacer seguimiento de los primeros alimentos que introduces a tu bebé. ¡Es muy fácil de usar! Simplemente ve marcando cada día la comida que le das. Un alimento se considera aceptado tu peque lo consume con cierto éxito al menos 5 veces.',
      disclaimerLabel: 'Aviso',
      disclaimer: 'los datos que anotes en esta web se guardan en tu navegador y no se envían a ningún servidor, lo que significa que cuando cambies de dispositivo o navegador, los datos se perderán, pero también puedes imprimir el tablón para llevarlo siempre contigo.',
    },
    board: {
      title: 'Primeros alimentos',
      subtitle: 'Tablón del bebé',
      namePlaceholder: 'Nombre',
      instruction: 'Un alimento marcado 5 veces es considerado como un alimento aceptado.',
    },
    sections: {
      alergenos: 'Alérgenos',
      otrosSabores: 'Otros Sabores',
      frutas: 'Frutas',
      vegetales: 'Vegetales',
      proteinas: 'Proteína',
      hidratos: 'Hidratos',
      lacteos: 'Lácteos',
    },
    footer: {
      madeWith: 'Hecho con amor por',
      by: 'Clavinia / Carmen L. Seva',
      rights: 'Todos los derechos reservados.',
    },
    buttons: {
      print: 'Imprimir',
      changeLanguage: 'Cambiar idioma',
    },
    foodItems: {
      alergenos: ['Cacahuete', 'Huevos', 'Kiwi', 'Leche', 'Mariscos', 'Nuez', 'Pescado', 'Sésamo', 'Soja', 'Trigo'],
      otrosSabores: ['Aceite de coco', 'Canela', 'Jengibre', 'Nuez moscada', 'Orégano', 'Perejil', 'Pesto', 'Romero'],
      frutas: [
        'Aguacate',
        'Albaricoque',
        'Arándano',
        'Banana',
        'Ciruelo morado',
        'Ciruelo rojo',
        'Frambuesa',
        'Fresa',
        'Higo',
        'Kiwi',
        'Lima',
        'Limón',
        'Mandarina',
        'Mango',
        'Manzana',
        'Melocotón',
        'Melón',
        'Mora',
        'Naranja',
        'Nectarina',
        'Papaya',
        'Pera',
        'Piña',
        'Plátano',
        'Tomate',
        'Uva',
        'Uvas pasas',
        'Zarzamora',
      ],
      vegetales: [
        'Ajo',
        'Apio',
        'Batata',
        'Berenjena',
        'Brócoli',
        'Calabacín',
        'Calabaza',
        'Cebolla',
        'Champiñón',
        'Col',
        'Coliflor',
        'Espárragos',
        'Espinacas',
        'Guisantes',
        'Judía verde',
        'Maíz',
        'Patata',
        'Pepino',
        'Pimiento',
        'Remolacha',
        'Zanahoria',
        'Zanahoria blanca',
      ],
      proteinas: [
        'Alubias',
        'Atún',
        'Cerdo',
        'Cordero',
        'Gambas',
        'Garbanzos',
        'Huevo',
        'Hummus',
        'Lentejas',
        'Mant. almendra',
        'Mant. cacahuete',
        'Pavo',
        'Pescado blanco',
        'Pollo',
        'Salmón',
        'Ternera',
        'Tofu',
      ],
      hidratos: ['Arroz', 'Avena', 'Cebada', 'Cuscús', 'Pan', 'Pan de molde', 'Pasta', 'Pastel de arroz', 'Quinoa', 'Tortita'],
      lacteos: ['Crema agria', 'Leche', 'Natillas', 'Q. parmesano', 'Queso cheddar', 'Queso cottage', 'Ricotta', 'Yogur'],
    },
  },
  en: {
    meta: {
      title: 'First Foods',
      description: 'Interactive board to document your baby\'s first foods.',
    },
    header: {
      title: 'Baby\'s First Foods',
      description: 'This tool helps you document and track the first foods you introduce to your baby. It\'s very easy to use! Simply mark each day the food you give them. A food is considered accepted when your little one consumes it with some success at least 5 times.',
      disclaimerLabel: 'Notice',
      disclaimer: 'the data you enter on this website is stored in your browser and is not sent to any server, which means that when you change devices or browsers, the data will be lost, but you can also print the board to always carry it with you.',
    },
    board: {
      title: 'First foods',
      subtitle: 'Baby\'s board',
      namePlaceholder: 'Name',
      instruction: 'A food marked 5 times is considered an accepted food.',
    },
    sections: {
      alergenos: 'Allergens',
      otrosSabores: 'Other Flavors',
      frutas: 'Fruits',
      vegetales: 'Vegetables',
      proteinas: 'Protein',
      hidratos: 'Carbs',
      lacteos: 'Dairy',
    },
    footer: {
      madeWith: 'Made with love by',
      by: 'Clavinia / Carmen L. Seva',
      rights: 'All rights reserved.',
    },
    buttons: {
      print: 'Print',
      changeLanguage: 'Change language',
    },
    foodItems: {
      alergenos: ['Peanut', 'Eggs', 'Kiwi', 'Milk', 'Shellfish', 'Nuts', 'Fish', 'Sesame', 'Soy', 'Wheat'],
      otrosSabores: ['Coconut oil', 'Cinnamon', 'Ginger', 'Nutmeg', 'Oregano', 'Parsley', 'Pesto', 'Rosemary'],
      frutas: [
        'Avocado',
        'Apricot',
        'Blueberry',
        'Banana',
        'Purple plum',
        'Red plum',
        'Raspberry',
        'Strawberry',
        'Fig',
        'Kiwi',
        'Lime',
        'Lemon',
        'Mandarin',
        'Mango',
        'Apple',
        'Peach',
        'Melon',
        'Blackberry',
        'Orange',
        'Nectarine',
        'Papaya',
        'Pear',
        'Pineapple',
        'Plantain',
        'Tomato',
        'Grape',
        'Raisins',
        'Blackberry',
      ],
      vegetales: [
        'Garlic',
        'Celery',
        'Sweet potato',
        'Eggplant',
        'Broccoli',
        'Zucchini',
        'Pumpkin',
        'Onion',
        'Mushroom',
        'Cabbage',
        'Cauliflower',
        'Asparagus',
        'Spinach',
        'Peas',
        'Green beans',
        'Corn',
        'Potato',
        'Cucumber',
        'Bell pepper',
        'Beetroot',
        'Carrot',
        'White carrot',
      ],
      proteinas: [
        'Beans',
        'Tuna',
        'Pork',
        'Lamb',
        'Shrimp',
        'Chickpeas',
        'Egg',
        'Hummus',
        'Lentils',
        'Almond butter',
        'Peanut butter',
        'Turkey',
        'White fish',
        'Chicken',
        'Salmon',
        'Beef',
        'Tofu',
      ],
      hidratos: ['Rice', 'Oats', 'Barley', 'Couscous', 'Bread', 'Sliced bread', 'Pasta', 'Rice cake', 'Quinoa', 'Pancake'],
      lacteos: ['Sour cream', 'Milk', 'Custard', 'Parmesan cheese', 'Cheddar cheese', 'Cottage cheese', 'Ricotta', 'Yogurt'],
    },
  },
}

