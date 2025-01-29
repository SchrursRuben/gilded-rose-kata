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
    // Loop through all items
    for (const item of this.items) {
      const name = item.name;
      const isAgedBrie = name.match("Aged Brie");
      const isBackstagePassToTAFKAL80ETC = name.match(
        "Backstage passes to a TAFKAL80ETC concert"
      );
      const isSulfuras = name.match("Sulfuras, Hand of Ragnaros");

      if (!isAgedBrie && !isBackstagePassToTAFKAL80ETC) {
        // Is quality is greater than 0
        if (item.quality > 0) {
          // Is item is not Sulfuras, Hand of Ragnaros
          if (!isSulfuras) {
            this.decreaseQualityByOne(item);
          }
        }
      } else {
        // Is quality is less than 50
        if (item.quality < 50) {
          this.increaseQualityByOne(item);
          if (isBackstagePassToTAFKAL80ETC) {
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
      if (!isSulfuras) {
        // Decrease sellIn by 1
        item.sellIn = item.sellIn - 1;
      }
      // Is sellIn is less than 0
      if (item.sellIn < 0) {
        if (!isAgedBrie) {
          if (!isBackstagePassToTAFKAL80ETC) {
            // Is quality is greater than 0
            if (item.quality > 0) {
              // Is item is not Sulfuras, Hand of Ragnaros
              if (!isSulfuras) {
                this.decreaseQualityByOne(item);
              }
            }
          } else {
            // Set quality to 0
            item.quality = 0;
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
