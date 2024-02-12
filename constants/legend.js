const LegendConstants = Object.freeze({
    EGGS : 'Eggs',
    FISH : 'Fish',
    FOOD_NOT_ANALYZED_FOR_ALLERGENS : 'Food Not Analyzed for Allergens',
    HALAL_INGREDIENTS : 'Halal Ingredients',
    PEANUTS : 'Peanuts',
    PORK : 'Pork',
    SESAME : 'Sesame',
    SHELLFISH : 'Shellfish',
    SOY : 'Soy',
    TREE_NUTS : 'Tree Nuts',
    VEGAN : 'Vegan',
    VEGETARIAN : 'Vegetarian',
    WHEAT_GLUTEN : 'Wheat / Gluten',
})

const LegendConstantsFlipped = Object.freeze({
    'Eggs' : 'EGGS',
    'Fish' : 'FISH',
    'Food Not Analyzed for Allergens' : 'FOOD_NOT_ANALYZED_FOR_ALLERGENS',
    'Halal Ingredients': 'HALAL_INGREDIENTS',
    'Peanuts': 'PEANUTS',
    'Pork': 'PORK',
    'Sesame': 'SESAME',
    'Shellfish': 'SHELLFISH',
    'Soy': 'SOY',
    'Tree Nuts': 'TREE_NUTS',
    'Vegan': 'VEGAN',
    'Vegetarian': 'VEGETARIAN',
    'Wheat / Gluten': 'WHEAT_GLUTEN',
})

const Locations = {
    PARKSIDE : '518',
    VILLAGE : '27229',
    EVK : '514',
}

const LocationsFlipped = {
     '518': "Parkside",
    '27229': "Village",
    '514': 'EVK',
}

module.exports = {LegendConstants, LegendConstantsFlipped, Locations, LocationsFlipped}
