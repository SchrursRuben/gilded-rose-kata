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
      const isLegendary = name.match("Sulfuras, Hand of Ragnaros");

      if (isLegendary) continue;

      if (isAgedBrie) {
        this.increaseQualityByOne(item);
        this.decreaseSellInByOne(item);
        if (item.sellIn < 0) {
          this.increaseQualityByOne(item);
        }
      } else {
        if (!isBackstagePassToTAFKAL80ETC) {
          this.decreaseQualityByOne(item);
        } else {
          this.increaseQualityByOne(item);
          // If sellIn is less than 11
          if (item.sellIn < 11) {
            this.increaseQualityByOne(item);
          }
          // If sellIn is less than 6
          if (item.sellIn < 6) {
            this.increaseQualityByOne(item);
          }
        }
        this.decreaseSellInByOne(item);
      }

      // Is sellIn is less than 0
      if (item.sellIn < 0) {
        if (isBackstagePassToTAFKAL80ETC) {
          item.quality = 0;
        } else {
          this.decreaseQualityByOne(item);
        }
      }
    }

    return this.items;
  }

  increaseQualityByOne(item: Item) {
    item.quality < 50 && item.quality++;
  }

  decreaseQualityByOne(item: Item) {
    item.quality > 0 && item.quality--;
  }

  decreaseSellInByOne(item: Item) {
    item.sellIn--;
  }
}
