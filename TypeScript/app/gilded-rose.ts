export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const amountOfItems = this.items.length;

    // Loop through all items
    for (let i = 0; i < amountOfItems; i++) {
      const item = this.items[i];
      const name = item.name;

      // Is item is not Aged Brie and Backstage passes to a TAFKAL80ETC concert
      if (
        name != "Aged Brie" &&
        name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        // Is quality is greater than 0
        if (item.quality > 0) {
          // Is item is not Sulfuras, Hand of Ragnaros
          if (name != "Sulfuras, Hand of Ragnaros") {
            this.decreaseQualityByOne(item);
          }
        }
      } else {
        // Is quality is less than 50
        if (item.quality < 50) {
          this.increaseQualityByOne(item);
          // Is item is Backstage passes to a TAFKAL80ETC concert
          if (name == "Backstage passes to a TAFKAL80ETC concert") {
            // Is sellIn is less than 11
            if (item.sellIn < 11) {
              // Is quality is less than 50
              if (item.quality < 50) {
                this.increaseQualityByOne(item);
              }
            }
            // Is sellIn is less than 6
            if (item.sellIn < 6) {
              // Is quality is less than 50
              if (item.quality < 50) {
                this.increaseQualityByOne(item);
              }
            }
          }
        }
      }
      // Is item is not Sulfuras, Hand of Ragnaros
      if (name != "Sulfuras, Hand of Ragnaros") {
        // Decrease sellIn by 1
        item.sellIn = item.sellIn - 1;
      }
      // Is sellIn is less than 0
      if (item.sellIn < 0) {
        // Is item is not Aged Brie
        if (name != "Aged Brie") {
          // Is item is not Backstage passes to a TAFKAL80ETC concert
          if (name != "Backstage passes to a TAFKAL80ETC concert") {
            // Is quality is greater than 0
            if (item.quality > 0) {
              // Is item is not Sulfuras, Hand of Ragnaros
              if (name != "Sulfuras, Hand of Ragnaros") {
                this.decreaseQualityByOne(item);
              }
            }
          } else {
            // Set quality to 0
            item.quality = item.quality - item.quality;
          }
        } else {
          // Is quality is less than 50
          if (item.quality < 50) {
            this.increaseQualityByOne(item);
          }
        }
      }
    }

    return this.items;
  }

  // Increase quality by 1
  increaseQualityByOne(item: Item) {
    item.quality = item.quality + 1;
  }

  // Decrease quality by 1
  decreaseQualityByOne(item: Item) {
    item.quality = item.quality - 1;
  }
}
