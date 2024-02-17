const { ObjectId } = require("mongodb")

const emailData = [
    {
        name: 'Tater Tots',
        tags: ['Soy', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Vegan Breakfast Sausage Patty',
        tags: ['Halal Ingredients', 'Soy', 'Vegan', 'Wheat / Gluten'],
        location: 'Parkside'
    },
    {
        name: 'Oatmeal',
        tags: ['Halal Ingredients', 'Vegan', 'Wheat / Gluten'],
        location: 'Parkside'
    },
    {
        name: 'Assorted Fruits',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Dairy Free Vegan Coconut Yogurt Available Upon Request',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Diced Tofu',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Chopped Bell Peppers',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Chopped Onion',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Chopped Tomatoes',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Baby Spinach',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Sliced Mushrooms',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Pickled Jalapenos',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Black Olives',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Spicy Salsa Verde',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Spicy Salsa Molcajete',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'AAZ Roasted Potatoes',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'AAZ Steamed Kale',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Assorted French Fries',
        tags: ['Soy', 'Vegan', 'Wheat / Gluten'],
        location: 'Parkside'
    },
    {
        name: 'Diced Tofu',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Plain Rice Noodles',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Shredded Cabbage',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Shredded Carrots',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Bean Sprouts',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Tamari Soy Sauce',
        tags: ['Soy', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Lemon Wedges',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Chile Garlic Sauce',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Assorted Fruits',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Smoky Lentil, Kidney Bean and Veggie Chili',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Braised White Beans with Sundried Tomatoes',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Roasted Brussels Sprouts',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Steamed Farro',
        tags: ['Halal Ingredients', 'Vegan', 'Wheat / Gluten'],
        location: 'Parkside'
    },
    {
        name: 'Plain Pasta',
        tags: ['Halal Ingredients', 'Vegan', 'Wheat / Gluten'],
        location: 'Parkside'
    },
    {
        name: 'AAZ Steamed White Rice',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Braised White Beans with Sundried Tomatoes',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Red Lentils',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Roasted Yellow Squash',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Sautéed Green Beans',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Rice Pilaf',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Plain Pasta',
        tags: ['Halal Ingredients', 'Vegan', 'Wheat / Gluten'],
        location: 'Parkside'
    },
    {
        name: 'Assorted French Fries',
        tags: ['Soy', 'Vegan', 'Wheat / Gluten'],
        location: 'Parkside'
    },
    {
        name: 'Diced Tofu',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Plain Rice Noodles',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Shredded Cabbage',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Shredded Carrots',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Bean Sprouts',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Tamari Soy Sauce',
        tags: ['Soy', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Lemon Wedges',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Chile Garlic Sauce',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Assorted Fruits',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Parkside'
    },
    {
        name: 'Assorted Berries',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Grapefruit',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Oatmeal',
        tags: ['Halal Ingredients', 'Vegan', 'Wheat / Gluten'],
        location: 'Village'
    },
    {
        name: 'Black Bean Tofu Breakfast Tostadas with Guacamole',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Vegan Breakfast Sausage Patty',
        tags: ['Halal Ingredients', 'Soy', 'Vegan', 'Wheat / Gluten'],
        location: 'Village'
    },
    {
        name: 'Steamed Squash Blend',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Dairy Free Vegan Coconut Yogurt Available Upon Request',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Tofu',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Chopped Bell Peppers',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Chopped Tomatoes',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Chopped Onion',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Baby Spinach',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Sliced Mushrooms',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Oatmeal',
        tags: ['Halal Ingredients', 'Vegan', 'Wheat / Gluten'],
        location: 'Village'
    },
    {
        name: 'Assorted Hand Fruit',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Olive Oil',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {name: 'Balsamic Vinegar', tags: ['Vegan'], location: 'Village'},
    {
        name: 'Golden Italian Dressing',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Cucumber Lemon Agave Chia Water',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Lettuce',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Sliced Tomatoes',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Dill Pickles',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Sliced French Bread',
        tags: ['Halal Ingredients', 'Vegan', 'Wheat / Gluten'],
        location: 'Village'
    },
    {
        name: 'Little Northern Bakehouse Allergen Free Bread Available Upon Request',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Assorted French Fries',
        tags: ['Soy', 'Vegan', 'Wheat / Gluten'],
        location: 'Village'
    },
    {
        name: 'Pickled Jalapenos',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Sliced Green Onions',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Kabocha and Kale Miso Sesame Soba Noodle Bowl',
        tags: ['Sesame', 'Soy', 'Vegan', 'Wheat / Gluten'],
        location: 'Village'
    },
    {
        name: 'Smoky BBQ Tofu',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Sloppy Lentils',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Plain Green Tea Soba Noodles',
        tags: ['Halal Ingredients', 'Vegan', 'Wheat / Gluten'],
        location: 'Village'
    },
    {
        name: 'Plain Rice Noodles',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Edamame',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Shredded Carrots',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Corn Kernals',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Bean Sprouts',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Sliced Green Onions',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Sesame Seeds',
        tags: ['Halal Ingredients', 'Sesame', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Vegan Spicy Mayo',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Tamari Sesame Ginger Sauce',
        tags: ['Sesame', 'Soy', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Pineapple Tamari Fried Rice',
        tags: ['Halal Ingredients', 'Sesame', 'Soy', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Steamed Coconut Quinoa',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Steamed Edamame',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Mirin Braised Mushrooms',
        tags: ['Vegan'],
        location: 'Village'
    },
    {
        name: 'Assorted Nuts',
        tags: ['Halal Ingredients', 'Tree Nuts', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Chopped Peanuts',
        tags: ['Halal Ingredients', 'Peanuts', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Assorted Fruits',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Unsweetened Shredded Coconut',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Acai Sorbet',
        tags: ['Halal Ingredients', 'Soy', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Assorted Fruits',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
    {
        name: 'Olive Oil',
        tags: ['Halal Ingredients', 'Vegan'],
        location: 'Village'
    },
]

const user = {
    _id: new ObjectId('65cb1b51ed8a8ea832f6b474'),
    owner_id: '65cb1b51ed8a8ea832f6b473',
    email: 'aarondzhang33@gmail.com',
    isActive: true,
    tags: {
        EGGS: false,
        FISH: false,
        FOOD_NOT_ANALYZED_FOR_ALLEGENS: false,
        HALAL_INGREDIENTS: false,
        PEANUTS: false,
        PORK: false,
        SESAME: false,
        SHELLFISH: false,
        SOY: false,
        TREE_NUTS: false,
        VEGAN: true,
        VEGETARIAN: false,
        WHEAT_GLUTEN: false
    },
    keywords: [
        {
            _id: new ObjectId('65cc36b3a334d479a972de39'),
            summary: 'salmon',
            owner_id: '65cb1b51ed8a8ea832f6b473'
        },
        {
            _id: new ObjectId('65ce65f627aa8b296febe186'),
            summary: 'poke',
            owner_id: '65cb1b51ed8a8ea832f6b473'
        }
    ]
}

module.exports = {emailData, user};
