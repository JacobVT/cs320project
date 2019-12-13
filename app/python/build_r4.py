# Noah Scarbrough

import os
import json

ignore = ['black_', 'blue_', 'brown_', 'cyan_', 'gray_', 'green_', 'light_blue_', 'light_gray_', 'lime_', 'magenta_', 'orange_', 'pink_', 'purple_', 'red_', 'white_', 'yellow_', 'acacia_', 'birch_', 'dark_oak_', 'jungle_', 'spruce_']
database = {}
recipes = os.listdir('recipes')
missing = { 'bucket': 'items/bucket_empty', 'rail': 'blocks/rail_normal', 'fishing_rod': 'items/fishing_rod_uncast', 'wood_door': 'items/door_wood', 'bow': 'items/bow_standby', 'milk_bucket': 'items/bucket_milk', 'redstone': 'items/redstone_dust', 'dye': 'items/dye_powder_white', 'glass_pane': 'blocks/glass', 'glass_bottle': 'items/potion_bottle_empty', 'iron_door': 'items/door_iron', 'detector_rail': 'blocks/rail_detector', 'activator_rail': 'blocks/rail_activator', 'map': 'items/map_empty', 'hopper_minecart': 'items/minecart_hopper', 'gold_carrot': 'items/carrot_golden', 'redstone_torch': 'blocks/redstone_torch_on', 'writable_book': 'items/book_writable', 'compass': 'items/compass_23', 'tnt_minecart': 'items/minecart_tnt', 'speckled_melon': 'items/melon_speckled', 'tripwire_hook': 'blocks/trip_wire_source', 'pumpkin_seeds': 'items/seeds_pumpkin', 'gold_apple': 'items/apple_golden', 'furnace_minecart': 'items/minecart_furnace', 'chest_minecart': 'items/minecart_chest', 'red_mushroom': 'blocks/mushroom_red', 'brown_mushroom': 'blocks/mushroom_brown', 'gold_rail': 'blocks/rail_golden', 'book': 'items/book_normal', 'armor_stand': 'items/wooden_armorstand', 'clock': 'items/clock_53', 'boat': 'items/oak_boat', 'melon_seeds': 'items/seeds_melon', 'torch': 'blocks/torch_on', 'slime_ball': 'items/slimeball', 'fermented_spider_eye': 'items/spider_eye_fermented', 'minecart': 'items/minecart_normal' }

def allow(phrase):
    for word in ignore:
        if word in phrase:
            return False
    return True

def find_image(name):
    if os.path.exists('textures/wiki/' + name + '.png'):
        return 'textures/wiki/' + name + '.png'
    elif os.path.exists('textures/blocks/' + name + '.png'):
        return 'textures/blocks/' + name + '.png'
    elif os.path.exists('textures/items/' + name + '.png'):
        return 'textures/items/' + name + '.png'
    elif 'golden' in name:
        return find_image(name.replace('golden', 'gold'))
    elif 'wooden' in name:
        return find_image(name.replace('wooden', 'wood'))
    elif name in missing:
        if os.path.exists('textures/' + missing[name] + '.png'):
            return 'textures/' + missing[name] + '.png'
        else:
            print('Warning, invalid path ' + missing[name] + ' for ' + name + '. Skipping.')
    print(', \'' + name + '\': \'items/\'')
    return 'textures/items/barrier.png'

def readable(name):
    phrase = []
    for word in name.split('_'):
        phrase.append(word.capitalize())
    return ' '.join(phrase)

database['recipes'] = {}
database['items'] = {}
items = set([])
for recipe in recipes:
    if recipe != 'fire_charge.json' and allow(recipe):
        f = open('recipes/' + recipe)
        data = json.load(f)
        f.close()
        items = items.union({data['result']['item'].split(':')[1]})
        ingredients = ['_', '_', '_', '_', '_', '_', '_', '_', '_']
        if 'pattern' in data:
            pattern = 1
            for i in range(len(data['pattern'])):
                for j in range(len(list(data['pattern'][i]))):
                    if list(data['pattern'][i])[j] == ' ':
                        ingredients[(i * 3) + j] = '_'
                    else:
                        ingredients[(i * 3) + j] = list(data['pattern'][i])[j]
            for i in range(9):
                if ingredients[i] != '_':
                    if isinstance(data['key'][ingredients[i]], dict):
                        ingredients[i] = data['key'][ingredients[i]]['item'].split(':')[1]
                    else:
                        ingredients[i] = data['key'][ingredients[i]][0]['item'].split(':')[1]
                    items = items.union({ingredients[i]})
        else:
            pattern = 0
            for i in range(len(data['ingredients'])):
                ingredients[i] = data['ingredients'][i]['item'].split(':')[1]
                items = items.union({ingredients[i]})
        database['recipes'][data['result']['item'].split(':')[1]] = { 'ingredients': ingredients, 'pattern': pattern }
for item in items:
    database['items'][item] = { 'display': readable(item), 'imgpath': find_image(item) }


database['index'] = {}
for recipe in database['recipes']:
    for item in set(database['recipes'][recipe]['ingredients']):
        if item != '_':
            if item in database['index']:
                database['index'][item]['recipes'].append(recipe)
            else:
                database['index'][item] = { 'recipes': [recipe] }
    
for recipe in database['recipes']:
    new_ingredients = [[database['recipes'][recipe]['ingredients'][0], database['recipes'][recipe]['ingredients'][1], database['recipes'][recipe]['ingredients'][2]], [database['recipes'][recipe]['ingredients'][3], database['recipes'][recipe]['ingredients'][4], database['recipes'][recipe]['ingredients'][5]], [database['recipes'][recipe]['ingredients'][6], database['recipes'][recipe]['ingredients'][7], database['recipes'][recipe]['ingredients'][8]]]
    database['recipes'][recipe]['ingredients'] = new_ingredients

f = open('mc_r4.json', 'w')
json.dump(database, f)
f.close()
